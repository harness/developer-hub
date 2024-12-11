---
title: Execution repository compression rollback
---

## Problem Description

[Spinnaker Orca Pull Request #4620](https://github.com/spinnaker/orca/pull/4620) introduced improvements for handling 
large payloads by storing compressed bodies in the database. Unfortunately, in the case of a rollback to a version
which does not support compression - Spinnaker will fail to render executions, because the `body` would effectively be 
empty, as it would be store in a corresponding entry as `compressed_body` in a table with `_compressed_executions` 
appended.

## Workaround
Below you will find a set of scripts which would help decompress the `compressed_body` into the corresponding `body` 
field matching the `id` of the record.

### Backup script

```bash
#!/bin/bash

# Copyright 2024 Harness, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -euo pipefail

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1"
}

# Check if required tools are installed
check_tool() {
    if ! command -v "$1" &>/dev/null; then
        log "Error: $1 is not installed, please install it to proceed."
        exit 1
    fi
}

check_tool "mysql"
check_tool "mysqldump"

# Variables
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASS=""
DB_NAME=""
BACKUP_DIR="backup"
THRESHOLD_MB=100

# Usage function
usage() {
    echo "Usage: $0 --db-host <host> --db-port <port> --db-user <user> --db-pass <password> --db-name <name> --backup-dir <dir> [--threshold <mb>]"
    exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --db-host) DB_HOST="$2"; shift ;;
        --db-port) DB_PORT="$2"; shift ;;
        --db-user) DB_USER="$2"; shift ;;
        --db-pass) DB_PASS="$2"; shift ;;
        --db-name) DB_NAME="$2"; shift ;;
        --backup-dir) BACKUP_DIR="$2"; shift ;;
        --threshold) THRESHOLD_MB="$2"; shift ;;
        *) usage ;;
    esac
    shift
done

# Ensure required parameters are set
if [[ -z $DB_HOST || -z $DB_PORT || -z $DB_USER || -z $DB_PASS || -z $DB_NAME || -z $BACKUP_DIR ]]; then
    usage
fi

tables=("pipelines" "pipeline_stages" "pipelines_compressed_executions" "pipeline_stages_compressed_executions" \
        "orchestrations" "orchestration_stages" "orchestrations_compressed_executions" "orchestration_stages_compressed_executions")


total_size=0

log "Starting backup process..."
mkdir -p "$BACKUP_DIR" || { log "Error: Could not create backup directory."; exit 1; }

for table in "${tables[@]}"; do
    # Check if the table exists
    table_exists=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -e \
        "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = '$DB_NAME' AND TABLE_NAME = '$table';" | tail -n 1)

    if [[ "$table_exists" -eq 0 ]]; then
        log "Warning: Table $table does not exist. Skipping..."
        continue
    fi

    # Calculate table size
    size=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -e \
        "SELECT ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS size_mb FROM information_schema.TABLES WHERE TABLE_NAME = '$table';" | tail -n 1 | tr -d '[:space:]')

    total_size=$(echo "$total_size + ${size:-0}" | bc)

    # Backup table
    log "Backing up table: $table (Size: ${size}MB)"

    # Prompt user if the backup exceeds the threshold
    if (( $(echo "$size > $THRESHOLD_MB" | bc -l) )); then
        read -p "Backup exceeds ${THRESHOLD_MB}MB. Continue? (y/n): " confirm
        if [[ "$confirm" != "y" ]]; then
            log "Warning: Backup of $table has been skipped..."
            continue
        fi
    fi

    mysqldump -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" --skip-lock-tables --skip-add-drop-table --skip-add-locks --no-create-db --no-create-info --no-tablespaces "$DB_NAME" "$table" > "$BACKUP_DIR/${table}_backup.sql" || {
        log "Error: Failed to back up table $table."
        exit 1
    }
done

log "Backup completed successfully. Total size: ${total_size}MB."
```

### Rollback script

```bash
#!/bin/bash

# Copyright 2024 Harness, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -euo pipefail

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1"
}

# Check if required tools are installed
check_tool() {
    if ! command -v "$1" &>/dev/null; then
        log "Error: $1 is not installed, please install it to proceed."
        exit 1
    fi
}

check_tool "gunzip"
check_tool "mysql"
check_tool "xxd"
check_tool "zlib-flate" # apk add qpdf

# Variables
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASS=""
DB_NAME=""
DRY_RUN=false

# Usage function
usage() {
    echo "Usage: $0 --db-host <host> --db-port <port> --db-user <user> --db-pass <password> --db-name <name> [--dry-run]"
    exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --db-host) DB_HOST="$2"; shift ;;
        --db-port) DB_PORT="$2"; shift ;;
        --db-user) DB_USER="$2"; shift ;;
        --db-pass) DB_PASS="$2"; shift ;;
        --db-name) DB_NAME="$2"; shift ;;
        --dry-run) DRY_RUN=true ;;
        *) usage ;;
    esac
    shift
done

# Ensure required parameters are set
if [[ -z $DB_HOST || -z $DB_PORT || -z $DB_USER || -z $DB_PASS || -z $DB_NAME ]]; then
    usage
fi

# Check if local_infile is enabled
local_infile_status=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -sse "SHOW GLOBAL VARIABLES LIKE 'local_infile';" | awk '{print $2}')
if [[ "$local_infile_status" != "ON" ]]; then
    log "Error: MySQL 'local_infile' is not enabled. Please enable it and try again."
    exit 1
fi

log "MySQL 'local_infile' is enabled. Proceeding with the script."

# Rollback logic
tables=("pipeline_stages_compressed_executions" "pipelines_compressed_executions"
        "orchestration_stages_compressed_executions" "orchestrations_compressed_executions")

for compressed_table in "${tables[@]}"; do
    # Check if the table exists
    table_exists=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -sse "
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_schema = '$DB_NAME' AND table_name = '$compressed_table';
    ")

    if [[ $table_exists -eq 0 ]]; then
        log "Table $compressed_table does not exist. Skipping."
        continue
    fi

    target_table="${compressed_table%_compressed_executions}"
    compression_type=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -sse "
        SELECT DISTINCT compression_type
        FROM $compressed_table;
    ")

    if [[ -z $compression_type ]]; then
        log "No compression type found for $compressed_table. Skipping."
        continue
    elif [[ $compression_type != "GZIP" && $compression_type != "ZLIB" ]]; then
        log "Unknown compression type $compression_type for $compressed_table. Skipping."
        continue
    fi

    log "Processing table $compressed_table with compression type $compression_type."

    # Fetch records
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -e "
        SELECT id, HEX(compressed_body)
        FROM $compressed_table;
    " | while read -r id hex_body; do
        # Skip header
        if [[ "$id" == "id" ]]; then
            continue
        fi

        # Convert hex to binary
        echo "$hex_body" | xxd -r -p > temp_compressed_body.bin

        # Decompress binary data
        if [[ $compression_type == "GZIP" ]]; then
            decompressed_body=$(gunzip -c < temp_compressed_body.bin 2>/dev/null)
        elif [[ $compression_type == "ZLIB" ]]; then
            decompressed_body=$(zlib-flate -uncompress < temp_compressed_body.bin 2>/dev/null)
        fi

        if [[ $? -ne 0 ]]; then
            log "Error: Decompressing data for ID $id in $compressed_table failed. Skipping."
            continue
        fi

        # Validate JSON
        echo "$decompressed_body" | jq . >/dev/null 2>&1
        if [[ $? -ne 0 ]]; then
            log "Error: Invalid JSON for ID $id in $compressed_table. Skipping."
            continue
        fi

        log "Successfully decompressed and validated JSON for ID $id."

        if $DRY_RUN; then
            log "Dry-run mode: Would update $target_table for ID $id."
            log "First 100 characters of decompressed JSON: ${decompressed_body:0:100}"
        else
            # Write Base64-encoded JSON to a temporary file without line wrapping (important)
            echo "$decompressed_body" | base64 -w 0 > temp_decompressed_body.b64

            # Because the decompressed body may be large, in order to avoid reaching ARG_MAX, do:
            # 1. Create a temporary table
            # 2. Load data into the temporary table
            # 3. Update the target table
            # 4. Drop the temporary table
            mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" --local-infile=1 -e "
                CREATE TEMPORARY TABLE temp_table (decompressed_body LONGTEXT);
                CREATE INDEX idx_temp_table_body ON temp_table (decompressed_body(255));
                LOAD DATA LOCAL INFILE 'temp_decompressed_body.b64'
                INTO TABLE temp_table;
                UPDATE $target_table
                JOIN temp_table ON TRUE
                SET body = FROM_BASE64(temp_table.decompressed_body)
                WHERE id = '$id';
                DROP TEMPORARY TABLE temp_table;
            " || log "Error: Failed to update $target_table for ID $id."
        fi
    done

    # Cleanup temporary files
    rm -f temp_compressed_body.bin temp_decompressed_body.b64
done

log "Rollback process completed."
```

### Restore backup script

```bash
#!/bin/bash

# Copyright 2024 Harness, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -euo pipefail

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1"
}

# Check if required tools are installed
check_tool() {
    if ! command -v "$1" &>/dev/null; then
        log "Error: $1 is not installed, please install it to proceed."
        exit 1
    fi
}

check_tool "mysql"

# Variables
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASS=""
DB_NAME=""
BACKUP_DIR="backup"

# Usage function
usage() {
    echo "Usage: $0 --db-host <host> --db-port <port> --db-user <user> --db-pass <password> --db-name <dbname> [--backup-dir <dir>]"
    exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --db-host) DB_HOST="$2"; shift ;;
        --db-port) DB_PORT="$2"; shift ;;
        --db-user) DB_USER="$2"; shift ;;
        --db-pass) DB_PASS="$2"; shift ;;
        --db-name) DB_NAME="$2"; shift ;;
        --backup-dir) BACKUP_DIR="$2"; shift ;;
        *) usage ;;
    esac
    shift
done

# Ensure required parameters are set
if [[ -z "$DB_HOST" || -z "$DB_PORT" || -z "$DB_USER" || -z "$DB_PASS" || -z "$DB_NAME" ]]; then
    usage
fi

tables=("pipelines" "pipeline_stages" "pipelines_compressed_executions" "pipeline_stages_compressed_executions" \
        "orchestrations" "orchestration_stages" "orchestrations_compressed_executions" "orchestration_stages_compressed_executions")

log "Starting restore process..."

for table in "${tables[@]}"; do
    backup_file="$BACKUP_DIR/$table.sql"
    if [[ -f "$backup_file" ]]; then
        log "Restoring table: $table"
        mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$backup_file"
    else
        log "Backup file not found for table: $table. Skipping."
    fi
done

log "Restore process completed successfully."
```

### Example Usage
1. Connect to an environment with access to the database
2. Create the backup script and make a backup of the tables using it, if the option of restoring the data is needed
3. Create the rollback script
4. Run the script with the `--dry-run` option to ensure that there are no errors, and that the decompressed JSONs look valid
5. Execute the script without the `--dry-run` option
6. Validate that the executions are now visible in the UI
