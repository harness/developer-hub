---
title: CCM Only Delegate
description: A Helm chart with parameters that ensure the Delegate is only used for CCM.
---

# Overview
Because Delegates are a Harness platform offering, they can potentially be used for other modules other than CCM. In this example, we are setting specific parameters to ensure that the service account of the Delegate is read only and preventing the running of scripts:

```
--set k8sPermissionsType=CLUSTER_VIEWER \
--set-json custom_envs='[{"name":"BLOCK_SHELL_TASK","value":"true"}]'
```

## Helm Chart
```
helm upgrade -i helm-delegate --namespace harness-delegate-ng --create-namespace \
  harness-delegate/harness-delegate-ng \
  --set delegateName=helm-delegate \

  # Can be found in the Account Settings page.
  --set accountId=< Your Harness Account ID > \

  # can be found by going to Account Settings > Account Resources > Delegates > Tokens and either copy the 
  # default_token or by creating a new specific token for this install 
  #(https://developer.harness.io/docs/platform/delegates/install-delegates/overview/#create-a-new-delegate-token)
  --set delegateToken=< Your Harness Delegate Token > \

  # Prod1 = https://app.harness.io/, Prod2 = https://app.harness.io/gratis, Prod3 = https://app3.harness.io
  --set managerEndpoint=https://app3.harness.io \

  # Get latest version inside of Harness UI.  Account Settings -> Delegates
  --set delegateDockerImage=harness/delegate:24.04.82901 \
  
  --set replicas=1 \
  --set upgrader.enabled=true \

  # Sets the service account of the delegate to read only
  --set k8sPermissionsType=CLUSTER_VIEWER \

  # Provisions a cluster role with these permissions https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/templates/ccm/cost-access.yaml
  --set ccm.visibility=true \
  
  # Prevent the delegate from being used for running scripts
  --set-json custom_envs='[{"name":"BLOCK_SHELL_TASK","value":"true"}]'
  ```