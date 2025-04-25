---
title: Enable auto-upgrades for existing Docker Delegates
description: This topic describes how to migrate existing docker delegates to enable automatic upgrades for them.
sidebar_position: 10
---

# Enable auto-upgrades for existing Docker Delegates

Harness now supports [automatic upgrades for Docker delegates](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#docker-delegate) using the **Docker Delegate Upgrader**. If you have already running Docker delegates, you can use the script provided below to enable the upgrader for your delegates.

:::info
The following approach will only be applicable to Docker delegates that were brought up directly using the `docker run` command and not for the ones that were started using **Docker Compose**, **Docker Swarm** etc.
:::

## How It Works

This script performs the following actions:

1. Identifies Harness delegates with the `DELEGATE_NAME` environment variable. If this environment variable is not set, upgrader will not be able to upgrade such delegates. 
2. Starts a lightweight upgrader container for each eligible delegate. The script will run one upgrader for every unique value of `DELEGATE_NAME` environment variable. 
3. Publishes the status of upgrade for every eligible Docker Delegate.

Once run, the upgrader enables periodic checks and automatic updates (if available) for each delegate.

## Run the helper Script

Save the following script to a file. Let's say `enable-upgrader.sh`:

<details>
<summary>Script</summary>

```
#!/bin/bash

echo "🔍 Scanning all running containers for Harness delegates with DELEGATE_NAME..."

running_containers=$(docker ps --filter "status=running" --format "{{.ID}}")

started_upgraders=()
patched_count=0

for container_id in $running_containers; do
  env_vars=$(docker inspect "$container_id" --format '{{range .Config.Env}}{{println .}}{{end}}')
  DELEGATE_NAME=$(echo "$env_vars" | grep '^DELEGATE_NAME=' | cut -d'=' -f2-)
  DELEGATE_TOKEN=$(echo "$env_vars" | grep '^DELEGATE_TOKEN=' | cut -d'=' -f2-)
  ACCOUNT_ID=$(echo "$env_vars" | grep '^ACCOUNT_ID=' | cut -d'=' -f2-)
  MANAGER_HOST_AND_PORT=$(echo "$env_vars" | grep '^MANAGER_HOST_AND_PORT=' | cut -d'=' -f2-)

  if [ -z "$DELEGATE_NAME" ]; then
    echo "🚫 Container $container_id skipped: no DELEGATE_NAME found."
    continue
  fi

  if [[ " ${started_upgraders[@]} " =~ " ${DELEGATE_NAME} " ]]; then
    echo "🔁 Upgrader for DELEGATE_NAME='$DELEGATE_NAME' already handled. Skipping..."
    continue
  fi

  if docker ps --format '{{.Names}}' | grep -q "^${DELEGATE_NAME}-upgrader$"; then
    echo "⚠️ Upgrader container '${DELEGATE_NAME}-upgrader' already running. Skipping creation."
  else
    echo "🚀 Starting upgrader container for '$DELEGATE_NAME'..."
    docker run -d --cpus=0.1 --memory=100m \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -e ACCOUNT_ID="$ACCOUNT_ID" \
      -e MANAGER_HOST_AND_PORT="$MANAGER_HOST_AND_PORT" \
      -e UPGRADER_WORKLOAD_NAME="$DELEGATE_NAME" \
      -e UPGRADER_TOKEN="$DELEGATE_TOKEN" \
      -e SCHEDULE="0 */1 * * *" \
      us-docker.pkg.dev/gar-prod-setup/harness-public/harness/upgrader:latest

    echo "✅ Upgrader started for '$DELEGATE_NAME'"
    patched_count=$((patched_count + 1))
  fi

  started_upgraders+=("$DELEGATE_NAME")
done

echo "🎉 Finished. Total new upgraders started: $patched_count"
```

</details>

Make the script executable and run it:

```
chmod +x enable-upgrader.sh
./enable-upgrader.sh
```

---

Example Output

```bash
🔍 Scanning all running containers for Harness delegates with DELEGATE_NAME...
🚀 Starting upgrader container for 'my-delegate'...
Unable to find image 'us-west1-docker.pkg.dev/gar-setup/docker/upgrader:STO_SCAN' locally
STO_SCAN: Pulling from gar-setup/docker/upgrader
42b08cdb6b32: Pull complete
0d5086ce5582: Pull complete
Digest: sha256:ef4df5e448b10e5702f0a4fb6c199f50bd2e3592271272b6f2c55c5e0cb71625
Status: Downloaded newer image for us-west1-docker.pkg.dev/gar-setup/docker/upgrader:latest
1543159cab2f300d3aab3b9446cd5172916a395463f6c4d6f8304e55fc0361ca
✅ Upgrader started for 'my-delegate'
🔁 Upgrader for DELEGATE_NAME='docker-delegate' already handled. Skipping...
🎉 Finished. Total new upgraders started: 1
```
