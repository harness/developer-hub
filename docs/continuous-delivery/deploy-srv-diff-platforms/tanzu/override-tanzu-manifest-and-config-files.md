---
title: Override TAS manifests, config files, and variables
description: Configure your environment to override settings of the Harness TAS services that use the environment, thereby making the environment dictate TAS manifests, variables, and config file values.
sidebar_position: 3
---

A Tanzu Application Service (TAS) service and environment are used together when you set up a pipeline to deploy your TAS app. You can configure your environment to override settings of the Harness TAS services that use the environment, thereby making the environment dictate TAS manifests, variables, and config file values.

For example, a TAS service uses a `manifest.yaml` file that specifies specific routes, but an environment might need to change the routes because it is deploying the app in the manifest to a QA space.

## Override TAS manifests

To override the manifests of specific services deployed to an environment, do the following:

1. In **Environments**, select an environment.
2. In the environment's **Service Overrides** tab, select **New configuration overrides**.
3. In **Service**, select a service you want to override when it is deployed to the selected environment.
4. In **Override Type**, select **Manifest**, and then select **New Manifest Override**.
5. Specify a manifest type, and select **Continue**. 
   
   You can select TAS Manifest, TAS Vars, and TAS AutoScaler manifest types.

   ![manifest override](./static/manifest-override.png)

6. Follow the same steps as you would when adding a manifest in a service, and then select **Submit**.

## Override config files

To override the config files of specific services deployed to an environment, do the following:

1. In **Environments**, select an environment.
2. In the environment's **Service Overrides** tab, select **New configuration overrides**.
3. In **Service**, select a service you want to override when it is deployed to the selected environment.
4. In **Override Type**, select **Config File**, and then select **New Config File Override**.
5. In **Config File Selection**, select the config file to override, and then select **Override**.
   
   ![](./static/config-file-override.png)

6. Follow the steps to select the override file, and then select **Submit**.

## Override variables 

To override the variables of specific services deployed to an environment, do the following:

1. In **Environments**, select an environment.
2. In the environment's **Service Overrides** tab, select **New configuration overrides**.
3. In **Service**, select a service you want to override when it is deployed to the selected environment.
4. In **Override Type**, select **Variable**, and then select **New Variable Override**.
5. In **Add Variable**, select the variable name, and enter an override value. 
6. Select **Submit**.
