---
title: Adding and Editing Inline Tanzu Manifest Files
description: When you create the PCF Service, the Manifests section is created and the default manifest.yml and vars.yml files are added.
sidebar_position: 40
helpdocs_topic_id: 3ekpbmpr4e
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

Manifests provide consistency and reproducibility, and help automate in deploying apps. For more information about manifest files, see [Deploying with Application Manifest](https://docs.pivotal.io/pivotalcf/2-4/devguide/deploy-apps/manifest.html) from Tanzu.When you create the Tanzu Application Service (TAS, formerly PCF) Service in Harness, the **Manifests** section is created and the default manifest.yml and vars.yml files are added.

The use of PCF in the default manifest.yml and vars.yml file is because TAS was formerly PCF.In this topic:

* [Before You Begin](https://docs.harness.io/article/3ekpbmpr4e-adding-and-editing-inline-pcf-manifest-files#before_you_begin)
* [Visual Summary](https://docs.harness.io/article/3ekpbmpr4e-adding-and-editing-inline-pcf-manifest-files#visual_summary)
* [Step 1: Edit vars.yaml file](https://docs.harness.io/article/3ekpbmpr4e-adding-and-editing-inline-pcf-manifest-files#step_1_edit_vars_yaml_file)
	+ [Change the TAS App Name](https://docs.harness.io/article/3ekpbmpr4e-adding-and-editing-inline-pcf-manifest-files#change_the_tas_app_name)
* [Step 2: Edit manifest.yml file](https://docs.harness.io/article/3ekpbmpr4e-adding-and-editing-inline-pcf-manifest-files#step_2_edit_manifest_yml_file)
* [Next Steps](https://docs.harness.io/article/3ekpbmpr4e-adding-and-editing-inline-pcf-manifest-files#next_steps)

### Before You Begin

* See [Connect to Your Target Tanzu Account](/article/nh4afrhvkl).
* See [Add Container Images for Tanzu Deployments](/article/jxsna1a0mi).
* For details on how Harness manages Tanzu app names, see [Tanzu App Naming](/article/hzyz7oc5k9-tanzu-app-naming-with-harness).

### Visual Summary

Here is an example showing how the variables in **manifest.yml** are given values in **vars.yml**:

![](./static/adding-and-editing-inline-pcf-manifest-files-71.png)You can also use variables for partial values. For example, you can specify `host` in your vars.yml file and `- route: ((host)).env.com` in your manifest.yml file.TAS Manifest deployments are a common TAS strategy. You can learn more about it in [Deploying with App Manifests](https://docs.pivotal.io/platform/application-service/2-7/devguide/deploy-apps/manifest.html) from TAS.

Harness supports all of the typical features of TAS manifests, as described in [Deploying with App Manifests](https://docs.pivotal.io/platform/application-service/2-7/devguide/deploy-apps/manifest.html) from TAS, but to deploy multiple apps, you will need to use multiple Harness Services.

### Step 1: Edit vars.yaml file

This file contains the following default variables and values:

* `PCF_APP_NAME: ${app.name}__${service.name}__${env.name}`
* `PCF_APP_MEMORY: 750M`
* `INSTANCES: 1`

These are referenced in the manifest.yaml file.

#### Change the TAS App Name

You can change the TAS app name here if you do not want Harness to generate one using a concatenation of the Harness Application, Service, and Environment names (`${app.name}__${service.name}__${env.name}`).

You can add more variables in vars.yaml and override them as described in [Using Harness Config Variables in Tanzu Manifests](/article/mutc1hz25o-using-harness-config-variables-in-pcf-manifests).

For details on how Harness manages Tanzu app names, see [Tanzu App Naming](/article/hzyz7oc5k9-tanzu-app-naming-with-harness).

### Step 2: Edit manifest.yml file

Define the default name, memory limit, and number of instances.

You can override variable values such as `((PCF_APP_NAME))`, `((APP_MEMORY))`, and `((INSTANCES))` in the **vars.yml** file.

### Next Steps

* [Upload Local and Remote Tanzu Resource Files](/article/i5jxqsbkt7-upload-local-and-remote-pcf-resource-files)
* [Using Harness Config Variables in Tanzu Manifests](/article/mutc1hz25o-using-harness-config-variables-in-pcf-manifests)

