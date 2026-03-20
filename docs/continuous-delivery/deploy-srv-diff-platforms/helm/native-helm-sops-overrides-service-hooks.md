---
title: SOPS and values overrides in Native Helm service hooks
description: Decrypt SOPS-encrypted Helm values overrides using Native Helm service hooks, with per-task override directories and optional custom override files.
sidebar_position: 5
---

For **Native Helm** deployments, Harness writes Helm values override files to a **per-task directory** before your **Fetch files** post-hooks run. This lets your service hooks decrypt overrides — for example with [Mozilla SOPS](https://github.com/mozilla/sops) — before Helm template, install, and upgrade commands consume them.

Previously, Harness wrote Native Helm overrides to a shared delegate directory with hash-based filenames, and hooks ran before those files existed. That made it unreliable to decrypt service-defined overrides with SOPS inside a hook.

:::note

The feature flag `CDS_HELM_IMPROVED_SOPS_SUPPORT_FOR_SERVICE_HOOKS` controls this behavior. Contact [Harness Support](mailto:support@harness.io) to enable it.

**Minimum delegate version:** `26.03.88700` or later.

:::

## How the override workflow works

- **Write-once overrides:** Harness writes override files once, after preparing the chart and **before** the **Fetch files** post-hook executes. It reuses the same file paths for every subsequent Helm operation in that task, so in-place decryption is never overwritten.
- **Per-task isolation:** Overrides live under the deployment working directory instead of a global shared folder, eliminating cross-deployment contention and producing predictable paths.
- **Hook-visible paths:** Your service hooks can read, modify, and even replace the Harness-written files. Hooks can also supply additional override files through an environment variable (see [OVERRIDE_FILES](#override_files) below).

## Environment variables

### VALUES_OVERRIDE_DIRECTORY

Points to the directory where Harness places override YAML files. Harness names them sequentially — `override-0.yaml`, `override-1.yaml`, and so on.

Use this variable in **Fetch files** post-hooks to locate and decrypt the overrides (for example, `sops -d -i $VALUES_OVERRIDE_DIRECTORY/override-0.yaml`).

### MANIFEST_FILES_DIRECTORY and values-overrides

You can also reference the override directory as `$MANIFEST_FILES_DIRECTORY/values-overrides` when your task layout supports it. Prefer `$VALUES_OVERRIDE_DIRECTORY` when available, so your scripts stay aligned with the delegate implementation.

### OVERRIDE_FILES

After your hook completes, Harness reads the **`OVERRIDE_FILES`** environment variable — a comma-separated list of additional YAML override file paths — and passes them to Helm alongside the Harness-written overrides.

**Path rules:**

- **Absolute paths:** Harness uses them as-is.
- **Relative paths:** Harness resolves them against the task working directory (not necessarily `$MANIFEST_FILES_DIRECTORY`).
- **Delimiter:** Comma only — paths cannot contain commas.
- **No pre-validation:** Harness does not check whether the files exist before running Helm. Missing files surface as Helm errors.

Use `OVERRIDE_FILES` when you want decrypted copies in separate files instead of in-place decryption, or when your hook generates overrides dynamically.

## Example: decrypt Harness overrides in place

This **Fetch files** post-hook iterates over the override directory and decrypts any SOPS-encrypted files in place. Adjust the SOPS backend and key configuration for your environment:

```yaml
hooks:
  - postHook:
      identifier: decrypt_sops
      storeType: Inline
      actions:
        - FetchFiles
      store:
        content: |-
          VALUES_DIRECTORY="${VALUES_OVERRIDE_DIRECTORY:-$MANIFEST_FILES_DIRECTORY/values-overrides}"
          if [ ! -d "$VALUES_DIRECTORY" ]; then
            echo "Error: Directory $VALUES_DIRECTORY not found."
            exit 1
          fi
          for file in "$VALUES_DIRECTORY"/*.yaml "$VALUES_DIRECTORY"/*.yml; do
            [ -e "$file" ] || continue
            if grep -q "sops:" "$file" && grep -q "ENC\[AES256_GCM" "$file"; then
              echo "Decrypting SOPS file $file..."
              sops -d -i "$file"
            else
              echo "Skipping $file (no SOPS metadata found)."
            fi
          done
```

## Example: supply extra override files with OVERRIDE_FILES

Service hooks run in the delegate task working directory. Use `$(pwd)` or an explicit path such as `/tmp` for generated files:

```yaml
hooks:
  - postHook:
      identifier: decrypt_sops
      storeType: Inline
      actions:
        - FetchFiles
      store:
        content: |-
          WORK_DIR="$(pwd)"
          cat > "$WORK_DIR/override-file1.yaml" <<EOF
          override: "override-value-1"
          EOF
          cat > "$WORK_DIR/override-file2.yaml" <<EOF
          override: "override-value-2"
          EOF
          export OVERRIDE_FILES="$WORK_DIR/override-file1.yaml,$WORK_DIR/override-file2.yaml"
```

Avoid spaces after commas in `OVERRIDE_FILES` — use a tight comma-separated list unless your paths intentionally include leading spaces.

## Backward compatibility

When the feature flag is **disabled**, Native Helm follows the previous behavior for writing override files. Your existing pipelines continue to work without changes.

## Related topics

- [Service hooks](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/service-hooks)
- [Deploy Native Helm using Harness](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart)
- [Deploy Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts) — covers SOPS and encrypted values for the **Kubernetes** (Harness-managed Helm) deployment type. The encryption concepts are similar, but the deployment flow and override mechanics differ from Native Helm.
