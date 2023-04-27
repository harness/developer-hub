---
title: Override TAS manifests, config files, and variables
description: Configure your environment to override settings of the Harness TAS services that use the environment, thereby making the environment dictate TAS manifests, variables, and config file values.
sidebar_position: 3
---

A Tanzu Application Service (TAS) service and environment are used together when you set up a pipeline to deploy your TAS app. You can configure your environment to override settings of the Harness TAS services that use the environment, thereby making the environment dictate TAS manifests, variables, and config file values.

For example, a TAS service uses a `manifest.yaml` file that specifies specific routes, but an environment might need to change the routes because it is deploying the app in the manifest to a QA space.

## Override TAS manifests

You can override service manifests from inside a pipeline or from an environment level. When the service is deployed to that environment, the environment's manifests will override the service's manifests.

```mdx-code-block
import Tabs from '@theme/Tabs';   
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
<TabItem value="Within a pipeline" label="Within a pipeline" default>
```

To override manifests for all services used with an environment, do the following.

1. In a pipeline deploy stage, go to the **Environments** tab.
2. Edit an existing environment or add **+ New Environment**.
3. In **Environment Overrides**, select **+ New Manifest Override**.
4. Specify a manifest type, and select **Continue**. 
   
   You can select Values YAML, OpenShift Param, Kustomize Patches, Helm Repo Overide, TAS Manifest, TAS Vars, and TAS AutoScaler manifest types.

   ![manifest override](./static/manifest-override.png)

5. Follow the same steps as you would when adding a manifest in a service, and then select **Submit**.

```mdx-code-block
</TabItem>
<TabItem value="At an environment level" label="At an environment level">
```

To override the manifests of specific services' deployed to an environment, do the following.

1. In **Environments**, select an environment.
2. In the environment's **Service Overrides** tab, select **New configuration overrides**.
3. In **Service**, select a service.
4. In **Override Type**, select **Manifest**, and then select **New Manifest Override**.
5. Specify a manifest type, and select **Continue**. 
   
   You can select Values YAML, OpenShift Param, Kustomize Patches, Helm Repo Overide, TAS Manifest, TAS Vars, and TAS AutoScaler manifest types.

   ![manifest override](./static/manifest-override.png)

6. Follow the same steps as you would when adding a manifest in a service, and then select **Submit**.

```mdx-code-block
</TabItem>    
</Tabs>
```
## Override config files

You can override service config files from inside a pipeline or from an environment level. When the service is deployed to that environment, the environment's config files will override the service's config files.

```mdx-code-block
import Tabs3 from '@theme/Tabs';   
import TabItem3 from '@theme/TabItem';
```
```mdx-code-block
<Tabs3>
<TabItem3 value="Within a pipeline" label="Within a pipeline" default>
```

To override config files for all services used with an environment, do the following.

1. In a pipeline deploy stage, go to the **Environments** tab.
2. Edit an existing environment or add **+ New Environment**.
3. In **Environment Overrides**, select **+ New Config File Override**.
4. Follow the same steps as you would when adding a config file in a service, and then select **Submit**.

```mdx-code-block
</TabItem3>
<TabItem3 value="At an environment level" label="At an environment level">
```

To override the config files of specific services' deployed to an environment, do the following.

1. In **Environments**, select an environment.
2. In the environment's **Service Overrides** tab, select **New configuration overrides**.
3. In **Service**, select a service to override.
4. In **Override Type**, select **Config File**, and then select **New Config File Override**.
5. In **Config File Selection**, select the config file to override, and then select **Override**.
   
   ![](./static/config-file-override.png)

6. Follow the steps to select the override file, and then select **Submit**.

```mdx-code-block
</TabItem3>    
</Tabs3>
```

## Override variables 

You can override service variables from inside a pipeline or from an environment level. When the service is deployed to that environment, the environment's variables will override the service's variables.

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```
```mdx-code-block
<Tabs2>
<TabItem2 value="Within a pipeline" label="Within a pipeline">
```

To override the variables for all services used with an environment, do the following.

1. In a pipeline deploy stage, go to the **Environments** tab.
2. Edit an existing environment or add **+ New Environment**.
3. In **Environment Overrides>** **Advanced (Optional)**, select **+ New Variable**.
4. In **New Variable**, select a variable type, then enter a name for the variable.
5. Enter a variable value.
6. Select **Save**.

```mdx-code-block
</TabItem2>
<TabItem2 value="At an environment level" label="At an environment level">
```

You can override the variables of specific services' deployed to an environment.

1. In **Environments**, select an environment.
2. In the environment's **Service Overrides** tab, select **New configuration overrides**.
3. In **Service**, select a service.
4. In **Override Type**, select **Variable**, and then select **New Variable Override**.
5. In **Add Variable**, select the variable name, and enter an override value. 
6. Select **Submit**.

```mdx-code-block
</TabItem2>    
</Tabs2>
```