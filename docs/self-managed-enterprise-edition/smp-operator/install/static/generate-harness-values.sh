#!/bin/bash
#
# generate-harness-values.sh
#
# Extracts values from running Harness helm release and generates
# --pi-set commands for clustermgr install-pi
#
# Usage:
#   ./generate-harness-values.sh [-n namespace] [-r release]
#
# Output Files:
#   - tfi-values.yaml: cluster.tfi.* (modules, license, db passwords)
#   - harness-values.yaml: helm values (global, harness sections)
#   - pi-commands.txt: install commands referencing above files
#

set -e

# Defaults
NAMESPACE="harness"
RELEASE="harness"
OUTPUT_FILE=""

usage() {
    cat << EOF
Usage: $(basename "$0") [OPTIONS]

Extract values from Harness helm release and generate --pi-set commands.

OPTIONS:
  -n, --namespace   Kubernetes namespace (default: harness)
  -r, --release     Helm release name (default: harness)
  -o, --output      Output file (default: stdout)
  -h, --help        Show this help

EXAMPLES:
  # Generate commands to stdout
  $(basename "$0")

  # Generate commands to file
  $(basename "$0") -o pi-set-commands.txt

  # Use with different namespace
  $(basename "$0") -n my-namespace -r my-release

OUTPUT FILES:
  tfi-values.yaml:
    cluster:
      tfi:
        ci: true
        cd: false
        harnessLicense: "..."
        postgresqlPassword: "..."
        mongodbPassword: "..."

  harness-values.yaml:
    global: ...
    harness: ...

  pi-commands.txt:
    --pi-values tfi-values.yaml
    --pi-set-file cluster.helmValues.harness=harness-values.yaml
EOF
    exit 0
}

log_info() {
    echo "[INFO] $*" >&2
}

log_error() {
    echo "[ERROR] $*" >&2
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--namespace)
            NAMESPACE="$2"
            shift 2
            ;;
        -r|--release)
            RELEASE="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        -h|--help)
            usage
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Tool paths - tools are in ../tools relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLS_DIR="${SCRIPT_DIR}/../tools"

# Find helm
if [ -x "${TOOLS_DIR}/helm" ]; then
    HELM="${TOOLS_DIR}/helm"
elif command -v helm &>/dev/null; then
    HELM="helm"
else
    log_error "helm not found in ${TOOLS_DIR} or PATH"
    exit 1
fi

# Find kubectl or oc
if [ -x "${TOOLS_DIR}/kubectl" ] && "${TOOLS_DIR}/kubectl" version --client &>/dev/null 2>&1; then
    KUBECTL="${TOOLS_DIR}/kubectl"
elif kubectl version --client &>/dev/null 2>&1; then
    KUBECTL="kubectl"
elif oc version --client &>/dev/null 2>&1; then
    KUBECTL="oc"
else
    log_error "kubectl/oc not found in ${TOOLS_DIR} or PATH"
    exit 1
fi

# Find yq
if [ -x "${TOOLS_DIR}/yq" ]; then
    YQ="${TOOLS_DIR}/yq"
elif command -v yq &>/dev/null; then
    YQ="yq"
else
    log_error "yq not found in ${TOOLS_DIR} or PATH"
    exit 1
fi

# Get helm values
log_info "Getting helm values from release '$RELEASE' in namespace '$NAMESPACE'..."
HELM_VALUES=$(mktemp)
trap "rm -f $HELM_VALUES" EXIT

if ! $HELM get values "$RELEASE" -n "$NAMESPACE" > "$HELM_VALUES" 2>/dev/null; then
    log_error "Failed to get helm values. Is the release installed?"
    exit 1
fi

# Get database passwords early (before any file processing)
POSTGRES_PASSWORD=$($KUBECTL -n "$NAMESPACE" get secret postgres -o jsonpath='{.data.postgres-password}' 2>/dev/null | base64 -d 2>/dev/null || true)
MONGO_PASSWORD=$($KUBECTL -n "$NAMESPACE" get secret mongodb-replicaset-chart -o jsonpath='{.data.mongodb-root-password}' 2>/dev/null | base64 -d 2>/dev/null || true)
MINIO_PASSWORD=$($KUBECTL -n "$NAMESPACE" get secret minio -o jsonpath='{.data.root-password}' 2>/dev/null | base64 -d 2>/dev/null || true)

log_info "Extracting values..."

# Function to output (to file or stdout)
output() {
    if [ -n "$OUTPUT_FILE" ]; then
        echo "$@" >> "$OUTPUT_FILE"
    else
        echo "$@"
    fi
}

# Clear output file if specified
if [ -n "$OUTPUT_FILE" ]; then
    > "$OUTPUT_FILE"
fi

# Determine output directory
if [ -n "$OUTPUT_FILE" ]; then
    OUTPUT_DIR=$(dirname "$OUTPUT_FILE")
else
    OUTPUT_DIR="."
fi

# === Part 1: Generate tfi-values.yaml (cluster.tfi.*) ===
TFI_VALUES_FILE="${OUTPUT_DIR}/tfi-values.yaml"

log_info "Generating tfi-values.yaml..."

cat > "$TFI_VALUES_FILE" << 'YAML_HEADER'
# Traceable Installer TFI Values
# Use with: -f tfi-values.yaml
#
# Contains: module flags, license, database passwords, additionalFeatureFlags
YAML_HEADER

echo "" >> "$TFI_VALUES_FILE"
echo "cluster:" >> "$TFI_VALUES_FILE"
echo "  tfi:" >> "$TFI_VALUES_FILE"

# Module flags
MODULES="ci cd ccm sto srm ff chaos scs dbops code iacm idp"
for mod in $MODULES; do
    val=$($YQ eval ".global.${mod}.enabled // false" "$HELM_VALUES")
    if [ "$val" = "true" ]; then
        echo "    ${mod}: true" >> "$TFI_VALUES_FILE"
    else
        echo "    ${mod}: false" >> "$TFI_VALUES_FILE"
    fi
done

# License
LICENSE=$($YQ eval '.global.license.ng // ""' "$HELM_VALUES")
if [ -n "$LICENSE" ] && [ "$LICENSE" != "null" ]; then
    echo "    harnessLicense: \"$LICENSE\"" >> "$TFI_VALUES_FILE"
fi

# Database passwords
if [ -n "$POSTGRES_PASSWORD" ]; then
    echo "    postgresqlPassword: \"$POSTGRES_PASSWORD\"" >> "$TFI_VALUES_FILE"
else
    log_info "PostgreSQL password not found in secrets"
fi

if [ -n "$MONGO_PASSWORD" ]; then
    echo "    mongodbPassword: \"$MONGO_PASSWORD\"" >> "$TFI_VALUES_FILE"
else
    log_info "MongoDB password not found in secrets"
fi

if [ -n "$MINIO_PASSWORD" ]; then
    echo "    minioPassword: \"$MINIO_PASSWORD\"" >> "$TFI_VALUES_FILE"
else
    log_info "MinIO password not found in secrets"
fi

# Feature flags (platform.harness-manager.featureFlags.ADDITIONAL)
ADDITIONAL_FLAGS=$($YQ eval '.platform."harness-manager".featureFlags.ADDITIONAL // ""' "$HELM_VALUES")
if [ -n "$ADDITIONAL_FLAGS" ] && [ "$ADDITIONAL_FLAGS" != "null" ]; then
    FLAGS_NL=$(printf '%s' "$ADDITIONAL_FLAGS" | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$' | sort -u)
    {
        echo "    additionalFeatureFlags: |"
        echo "$FLAGS_NL" | sed 's/^/      /'
    } >> "$TFI_VALUES_FILE"
fi

# === Part 2: Generate harness-values.yaml (helm values) ===
HARNESS_VALUES_FILE="${OUTPUT_DIR}/harness-values.yaml"

log_info "Generating harness-values.yaml..."

# Strip "USER-SUPPLIED VALUES:" header from helm output
sed -i.bak '/^USER-SUPPLIED VALUES:$/d' "$HELM_VALUES"
rm -f "${HELM_VALUES}.bak"

# Create harness-values.yaml - keep FULL helm values as-is
# PI expects: global: → cluster.helm.global.*, rest → cluster.helm.harness.*
cat > "$HARNESS_VALUES_FILE" << 'YAML_HEADER'
# Harness Helm Values for Traceable Installer
# Use with: --pi-set-file cluster.helmValues.harness=harness-values.yaml
#
# Note: Module flags (cd, ci, etc.) are in --pi-set cluster.tfi.* commands
YAML_HEADER

# Add global section WITHOUT module flags (they're in --pi-set cluster.tfi.*)
# Remove: ci, cd, ccm, sto, srm, ff, chaos, scs, dbops, code, iacm, idp, license
echo "" >> "$HARNESS_VALUES_FILE"
echo "global:" >> "$HARNESS_VALUES_FILE"
$YQ eval '.global | del(.ci) | del(.cd) | del(.ccm) | del(.sto) | del(.srm) | del(.ff) | del(.chaos) | del(.scs) | del(.dbops) | del(.code) | del(.iacm) | del(.idp) | del(.license)' "$HELM_VALUES" | sed 's/^/  /' >> "$HARNESS_VALUES_FILE"

# Add harness section (everything except global: platform, srm, etc.)
NON_GLOBAL=$($YQ eval 'del(.global)' "$HELM_VALUES")
if [ -n "$NON_GLOBAL" ] && [ "$NON_GLOBAL" != "null" ] && [ "$NON_GLOBAL" != "{}" ]; then
    echo "" >> "$HARNESS_VALUES_FILE"
    echo "harness:" >> "$HARNESS_VALUES_FILE"
    echo "$NON_GLOBAL" | sed 's/^/  /' >> "$HARNESS_VALUES_FILE"
fi

# === Part 3: Generate pi-commands.txt ===
output "# Generated PI install parameters to use in clustermgr command"
output "# Release: $RELEASE, Namespace: $NAMESPACE"
output "# Generated: $(date)"
output ""
output "# TFI values (modules, license, db passwords)"
output "--pi-values $TFI_VALUES_FILE"
output ""
output "# Helm values in user/values.yaml of harness chart"
output "--pi-set-file cluster.helmValues.harness=$HARNESS_VALUES_FILE"
output ""

log_info "Done!"
log_info "Generated files:"
log_info "  - $TFI_VALUES_FILE (modules, license, db passwords)"
log_info "  - $HARNESS_VALUES_FILE (helm values)"
if [ -n "$OUTPUT_FILE" ]; then
    log_info "  - $OUTPUT_FILE (install commands)"
fi
