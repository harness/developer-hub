---
title: Override TAS manifests, variables, and config files
description: Configure your environment to override settings of the Harness TAS services that use the environment, thereby making the environment dictate TAS manifests, variables, and config file values.
sidebar_position: 3
---

A Tanzu Application Service (TAS) service and environment are used together when you set up a pipeline to deploy your TAS app. You can configure your environment to override settings of the Harness TAS services that use the environment, thereby making the environment dictate TAS manifests, variables, and config file values.

For example, a TAS service uses a `manifest.yaml` file that specifies specific routes, but an environment might need to change the routes because it is deploying the app in the manifest to a QA space.

### Variable override

You can overwrite service variables when one or more services are paired with an environment.

To overwrite a service variable:

1. In the Harness Service, note the name of the Service variable in **Config Variables**.
2. In the Harness Environment, click **Service Configuration Override**. The **Service Configuration Override** dialog appears.
3. In **Service**, select the Harness Service that contains the variable you want to overwrite. If you select **All Services**, you will have to manually enter the name of the variable you want to overwrite. The following steps use a single Service.  
	  
	When you have selected a Service, the **Override Type** options appear.
	
	
4. Click **Variable Override**.
5. In **Configuration Variable**, select the variable you want to overwrite.
6. In **Override Scope**, the only option is **Entire Environment**, currently.
7. In **Type**, select **Text** or **Encrypted Text**.
8. In **Override Value**, if you selected **Text** in **Type**, enter a new value. If you selected **Encrypted Text**, select an existing Encrypted Text secret. Encrypted Text secrets are set up in Harness [Secrets Management](../../firstgen-platform/security/secrets-management/secret-management.md).  
  
	When you are done, the dialog will look something like this:

	

9. Click **Submit**. The override is added to the Environment:



#

