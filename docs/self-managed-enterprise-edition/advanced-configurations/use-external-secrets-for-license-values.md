---
title: Use external secrets for license values
description: Harness Self-Managed Enterprise Edition supports Kubernetes-based external secrets for Harness license values.
sidebar_position: 3
---

Kubernetes external secrets enable Kubernetes resources to use external data stores securely. You can use Kubernetes-based external secrets for Harness Self-Managed Enterprise Edition license values in your Helm charts.

:::info important
This feature is currently in beta. For more information about beta features, go to [Beta, Limited GA, and GA definitions](/docs/get-started/beta-preview-ga/).

Contact [Harness Support](mailto:support@harness.io) to get your Harness Self-Managed Enterprise Edition license files.

:::

The following values are available in `global.license.secrets.kubernetesSecrets`.
   - `secretName`: Name of the Kubernetes secrets containing Harness license keys
   - `keys.CG_LICENSE`: Name of the secret key containing a FirstGen License
   - `keys.NG_LICENSE`: Name of the secret key containing a NextGen License
   
      ```yaml
         global:
           license:
             cg: ''
             ng: ''
             secrets:
               kubernetesSecrets:
                 - secretName: ""
                   keys:
                     CG_LICENSE: ""
                     NG_LICENSE: ""
      ```

## Configure an external secret as a Harness license value

To configure a Kubernetes-based external secret as a a NextGen Harness license value, do the following:

1. Create a Kubernetes secret that includes your NextGen Harness license.

2. Update your `override.yaml` file to include the following.
   
   ```yaml
         global:
           license:
             secrets:
               kubernetesSecrets:
                 - secretName: "harness-license"
                   keys:
                     NG_LICENSE: "ng"
    ```

