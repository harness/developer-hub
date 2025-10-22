---
title: Configure Registries
description: Learn how to configure your artifact registries. 
sidebar_position: 30
---


## Artifact Registry Definition

To change your registry settings, go to the registry and select **Configuration**."

Here you can:
- Change your registry **Description**.
- Add a label under **Labels**.
- Manage configuration options relative to your registry type such as setting a security scanner for docker registries.
- Manage **Advanced** settings which includes setting an **Upstream Proxy**. 

## Security


<DocImage path={require('./static/securty-registry.png')} />

### Built-in Container Scanners

:::note
This feature is only available for docker and helm registries.
:::

When the [Harness Supply Chain Security module](/docs/software-supply-chain-assurance/) is enabled, artifacts in the Harness Artifact Registry are automatically scanned using AquaTrivy, the currently supported scanner. Built-in container scanning creates a pipeline to ensure every artifact is scanned upon entry. Additional scanner options will be introduced in the future.


### Policy Sets

:::note
This feature is only available for docker and helm registries.
:::

Policy Sets allow you to define a collection of rules that automatically evaluate and take action on your artifacts. In Artifact Registry, these rules are evaluated as part of the scan pipeline that is triggered automatically when artifacts are ingested. You can add multiple policy sets to a registry for comprehensive protection; for vulnerability enforcement in this context, the policy set must be a Security Tests policy set.
  
  :::tip
  Based on the vulnerabilities detected by the built-in container scanner, you can create a Security Tests policy set to automatically quarantine or block artifacts based on the severity of vulnerabilities found.
  :::

When an artifact violates a policy, it can be automatically quarantined to prevent it from being used in pipelines or downloaded by users. You can learn more about managing manually quarantined artifacts in the [Artifact Quarantine](/docs/artifact-registry/manage-artifacts/artifact-management.md#quarantine-an-artifact) section.


### Establish artifact filtering rules

Use these rules to establish which artifacts are allowed or blocked entry into your registry.

#### Allowed patterns

In **Allowed Patterns**, use a regex string to define which artifacts will be allowed into the registry. The regex will match against each incoming artifact and, if the match is successful, allow the push operation. 

In **Blocked Patterns**, use a regex string to define which artifacts will be blocked from the registry. The regex will match against each incoming artifact and, if the match is successful, disallow the push operation. 

**Example**:

If you wanted to set a registry to store only prod artifacts and block all dev artifacts you could:

- Set the **Allowed Patterns** regex to `.*-prod`.
- Set the **Blocked Patterns** regex to `dev-.*`.

This will allow in any artifact that ends with `-prod` and block any artifact that starts with `dev-`.



## Advanced settings

### Set an upstream proxy

After [creating an upstream proxy](/docs/artifact-registry/manage-registries/create-registry#create-an-upstream-proxy), you can set it in your artifact registry. To do so, follow these steps:

1. In your registry, select **Configuration**.
2. Open the **Advanced (Optional)** dropdown menu. 
3. Select **Configure Upstream**.
4. Under **Available upstream proxies**, you will see a list of available upstream proxies. Select as many as you would like. 
5. Under **Selected proxies**, you will see an ordered list of selected proxies for this registry. When the registry receives a request, the proxies will be *queried in order* from top to bottom.

![](./static/set-upstream-proxy-1.png)

*In the example above, when the registry is asked for an artifact, it will query the base registry, then `docs-docker-proxy`, then `custom-proxy`.*

6. Click **Save** in the top right corner. 


### Cleanup Policies

*Coming Soon*