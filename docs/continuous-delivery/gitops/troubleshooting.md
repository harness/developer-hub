---
title: Troubleshooting Harness GitOps
description: Learn how to resolve Harness GitOps issues.
sidebar_label: Troubleshooting
sidebar_position: 900
redirect_from:
  - /docs/continuous-delivery/gitops/gitops-ref/troubleshooting
---

This documentation lists issues encountered when installing and using Harness GitOps and describes how to resolve them.

## Installation errors

### Error: "Agent took too long to respond"

You might encounter the error `the Agent took too long to respond` when installing the Harness GitOps Agent with an existing Argo CD instance.

The error indicates that the Harness GitOps Agent is unable to connect to Redis or to the Argo CD Repo Server and needs additional `NetworkPolicy` settings.

Add the following `podSelector` settings to the `NetworkPolicy` objects defined in your existing Argo CD *argocd-redis* and *argocd-repo-server* services.

The following table lists the `NetworkPolicy` objects for HA and non-HA Agents, and includes the YAML before and after the new `podSelector` is added.

| **NetworkPolicy** | **HA Agent** |
| --- | --- |
| `argocd-redis-ha-proxy-network-policy` | ![](./static/argocd-redis-ha-proxy-network-policy.png) |
| `argocd-repo-server-network-policy` | ![](./static/argocd-repo-server-network-policy.png)  |
|  | **Non-HA Agent** |
| `argocd-redis-network-policy` | ![](./static/argocd-redis-network-policy.png)  |
| `argocd-repo-server-network-policy` | ![](./static/argocd-repo-server-network-policy-nonha.png)  |

### Error: "Forbidden: seccomp may not be set provider"

If you see the error `Forbidden: seccomp may not be set provider`, remove the following block from all Argo CD configuration files that have a `kind: deployment` key-value pair.

```
seccompProfile:
  type: RuntimeDefault
```

## Operational Errors

### Error: "Finalizer detected"

The message `failed to delete app in argo: failed to execute delete app task: rpc error: code = Unknown desc = finalizer detected,` indicates that the application you are trying to delete has a finalizer. If a finalizer is used, Argo CD does not delete the application until its resources are deleted. Therefore, the Harness GitOps Agent reconciles the existing application. 

To delete the application, remove the finalizer or delete its resources. Removing the finalizer should lead to the app being deleted automatically. For more information about the Argo CD app deletion finalizer, go to the [Argo CD documentation](https://argo-cd.readthedocs.io/), switch to the [supported Argo CD version](/docs/continuous-delivery/cd-integrations), and then perform a search for the app deletion finalizer.

### Error: Unable to delete or create app due to "error: create not allowed while custom resource definition is terminating"

During creation or deletion of any GitOps app, if the process fails with the message `failed to create app in argo: failed to execute create app task: rpc error: code = Unknown desc = error creating application: create not allowed while custom resource definition is terminating`, or some similar message about CRD being stuck in termination state, the cause is most likely due to some CRD resource pending deletion due to it having a finalizer.

In order for this CRD to complete termination, the finalizer from the pending resource needs to be removed. 

Possible CRD's causing this could most likely be one of these three: `applications.argoproj.io`, `applicationsets.argoproj.io` or 
`appprojects.argoproj.io`

Execute the following command to get pending resources for the CRD that are stuck in termination. (You can check the status of any CRD using `kubectl get crd` and then check any of these using `kubectl describe crd <crd_name>`.)

```
$ kubectl get <CRD> -n <namespace>
```

```
$ kubectl patch <CRD> <stuckresourcename> -n <namespace> --type json --patch="[{ \"op\": \"remove\", \"path\": \"/metadata/finalizers\" }]"
```

For example if the CRD `applications.argoproj.io` is stuck in the `TERMINATING` state in the `harness` namespace, this is how you can verify and patch it's resource causing it to be stuck.

```
$ kubectl get applications.argoproj.io -n harness

NAME        STATUS     SYNC
test-app    Unknown    Unknown
```

```
$ kubectl patch applications.argoproj.io test-app -n harness --type json --patch="[{ \"op\": \"remove\", \"path\": \"/metadata/finalizers\" }]"

applications.argoproj.io/test-app patched
```

This will now let the CRD `applications.argoproj.io` terminate gracefully.

:::note

CRD's are cluster-scoped and the resources themselves can be cluster or namespace-scoped, so pay attention to usage of `-n(namespace flag)` while executing these commands.

:::

If multiple resources are causing this error, you can use something similar to [this](https://github.com/argoproj/argo-cd/issues/1329#issuecomment-1247176754) to fix it.

### Issue: Agent degraded when installing a Bring Your Own Argo CD (BYOA) agent with a Helm chart

Execute the following script with the name of the agent as the argument. The agent name should be as shown in the Harness GitOps UI:

```
#!/bin/sh
#Extract values from the existing ConfigMap argocd-cmd-params-cm
REDIS_SERVER=$(kubectl get configmap -n argocd argocd-cmd-params-cm -o json | jq -r ‘.data[“redis.server”]‘)
ARGOCD_SERVER_REPO_SERVER=$(kubectl get configmap -n argocd argocd-cmd-params-cm -o json | jq -r ‘.data[“repo.server”]‘)
configmap_name=$1
agent_name=$1
echo $REDIS_SERVER
echo $ARGOCD_SERVER_REPO_SERVER
kubectl patch configmap -n argocd “$configmap_name” --type merge -p ‘{“data”: {“ARGOCD_SERVER_REPO_SERVER”: “‘$ARGOCD_SERVER_REPO_SERVER’“, “REDIS_SERVER”: “‘$REDIS_SERVER’“, “GITOPS_ARGOCD_REDIS_HA”: “redis-ha”, “GITOPS_ARGOCD_REDIS_HA_PROXY”: “redis-ha-haproxy”}}'
#comment the below command if ha mode is not used
kubectl patch deployment $configmap_name -n argocd --type=json -p=‘[{“op”: “replace”, “path”: “/spec/template/spec/containers/0/command”, “value”: [“/app/agent”, “--redis”, “‘”${REDIS_SERVER}“‘”]}]’
#Restart agent
kubectl rollout restart deployment -n argocd $agent_name
```

After you execute the script, verify that the script made the following changes to the ConfigMap. Where applicable, angle brackets (`<` and `>`) have been used to indicate where your release name should appear:

```
ARGOCD_SERVER_REPO_SERVER: “<YOUR_RELEASE_NAME>-argocd-repo-server:8081”
REDIS_SERVER: “<YOUR_RELEASE_NAME>-argocd-redis-ha-haproxy:6379"
GITOPS_ARGOCD_REDIS_HA: “redis-ha”
GITOPS_ARGOCD_REDIS_HA_PROXY: “redis-ha-haproxy”
```

### Error: "rpc error: code = InvalidArgument desc = existing cluster spec is different;"

This error indicates that the GitOps entity you are trying to create exists. It might exist in one of the following locations:

- A different scope (account, organization, or project) in Harness.

- A different Argo CD project that is not mapped to a Harness project.
  

### Issue: "rpc error: code = Unknown desc = error testing repository connectivity: authorization failed"

This error occurs when an agent is unable to connect to a repo:

- Ensure to review Github account rate limitations before attempting to connect to a repo.

- To manage rate limiting in GitHub, see [Enabling rate limits for Git](https://docs.github.com/en/enterprise-server@3.10/admin/configuration/configuring-user-applications-for-your-enterprise/configuring-rate-limits#enabling-rate-limits-for-git).

## Error: GitOps agent pod stuck in CrashLoopBackoff

### Issue: This is an unauthorized agent. Sleeping for 15 minutes and then shutting down, please check your settings on HarnessUI

This issue occurred as the token in the agent’s YAML did not match the public key in the GitOps service database. The GitOps agent goes into a CrashLoopBackoff state due to an authentication failure with the GitOps service. 

This problem typically surfaces after re-enabling authentication if the agent previously operated in unauthenticated mode.

- Ensure the agent's YAML file is updated with the correct authentication token, matching the public key in the database. After updating the YAML file, redeploy the agent to authenticate it properly. 


