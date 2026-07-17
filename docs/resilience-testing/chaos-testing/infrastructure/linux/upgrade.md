---
title: Upgrade Linux infrastructure
sidebar_label: Upgrade infrastructure
sidebar_position: 20
description: Upgrade Linux chaos infrastructure on SaaS or self-managed platform (SMP).
redirect_from:
  - /docs/resilience-testing/chaos-testing/infrastructure/content/upgrade/linux
  - /docs/resilience-testing/chaos-testing/infrastructure/upgrade
  - /docs/resilience-testing/chaos-testing/infrastructure/upgrade-infra
  - /docs/chaos-engineering/chaos-infrastructure/upgrade-infra
  - /docs/chaos-engineering/features/chaos-infrastructure/upgrade-infra
  - /docs/chaos-engineering/features/chaos-infrastructure/upgrade-infra/
  - /docs/chaos-engineering/guides/infrastructures/upgrade-infra
---

Run the commands on the VM where the Linux chaos infrastructure is installed. The path differs between SaaS and self-managed platform (SMP).

## SaaS

1. Fetch `INFRA_ID` and `ACCESS_KEY` from the existing config:

    ```bash
    INFRA_ID=$(sed -n 's/^infraID: "\(.*\)"/\1/p' /etc/linux-chaos-infrastructure/config.yaml)
    ACCESS_KEY=$(sed -n 's/^accessKey: "\(.*\)"/\1/p' /etc/linux-chaos-infrastructure/config.yaml)
    ```

2. Uninstall the current version:

    ```bash
    /etc/linux-chaos-infrastructure/uninstall.sh
    ```

3. Install the new version. Get the binary URL from the Linux infrastructure page in the Harness UI, then run:

    ```bash
    sudo https://app.harness.io/public/shared/tools/chaos/linux/1.50.0/install.sh \
      | bash /dev/stdin \
        --infra-id "$INFRA_ID" \
        --access-key "$ACCESS_KEY" \
        --server-url https://<YOUR_IP>/chaos/lserver/api
    ```

    Replace `1.50.0` with the target version and `<YOUR_IP>` with your cluster address.

## SMP

1. Raise a [Harness support](https://support.harness.io) ticket to get the `offline-linux-installer` tarball.
2. Copy and extract the tarball on the target VM, then `cd` into the extracted directory.
3. Fetch `INFRA_ID` and `ACCESS_KEY` from the existing config:

    ```bash
    INFRA_ID=$(sed -n 's/^infraID: "\(.*\)"/\1/p' /etc/linux-chaos-infrastructure/config.yaml)
    ACCESS_KEY=$(sed -n 's/^accessKey: "\(.*\)"/\1/p' /etc/linux-chaos-infrastructure/config.yaml)
    ```

4. Uninstall the current version with `/etc/linux-chaos-infrastructure/uninstall.sh`.
5. Install the new version:

    ```bash
    sudo ./install.sh \
      --infra-id "$INFRA_ID" \
      --access-key "$ACCESS_KEY" \
      --server-url https://<YOUR_IP>/chaos/lserver/api
    ```

This same command works in air-gapped environments once the installer is on the VM.
