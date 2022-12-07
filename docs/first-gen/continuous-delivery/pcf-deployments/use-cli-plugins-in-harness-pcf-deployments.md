---
title: Use CLI Plugins in Harness Tanzu Deployments
description: Run Cloud Foundry plugins as a step in a Harness PCF Workflow.
sidebar_position: 160 
helpdocs_topic_id: ttu8ty2glb
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports Cloud Foundry CLI version 6 and 7. Support for version 7 is behind the Feature Flag `CF_CLI7`. You can read about it in [Add Container Images for Tanzu Deployments](add-container-images-for-pcf-deployments.md).Harness supports all Cloud Foundry plugins from the [CF plugin marketplace](https://plugins.cloudfoundry.org/), [Tanzu Network](https://network.pivotal.io/), and in-house, and enables you to run and use them in Harness TAS Workflow steps.

Harness also includes first-class support for the [App Autoscaler plugin](https://docs.pivotal.io/application-service/2-7/appsman-services/autoscaler/using-autoscaler-cli.html), enabling you to create it as part of your Harness Workflow, bind it to your app, and enable or disable it as needed. Here is the App Autoscaler option as part of the **App Setup** command.

![](./static/use-cli-plugins-in-harness-pcf-deployments-02.png)


### Before You Begin

* See [Connect to Your Target Tanzu Account](connect-to-your-target-pcf-account.md).
* See [Define Your Tanzu Target Infrastructure](define-your-pcf-target-infrastructure.md).

### Visual Summary

Harness runs CF plugins using the Workflow command **CF Command**. CF Command automatically sets the `CF_PLUGIN_HOME` directory, logs in (using the Harness TAS Cloud Provider), and runs the plugin using the script in CF Command.

![](./static/use-cli-plugins-in-harness-pcf-deployments-03.png)

### Review: Requirements for Running Plugins

To run plugins using CF Command, you must have the following:

* CF CLI Installed on Harness Delegates​
* Plugins Installed on Harness Delegates​
* Create-Service-Push Installed on Delegate

#### CF CLI Installed on Harness Delegates

Ensure that the Harness Delegate(s) used for your deployment have the correct version of the CF CLI installed. See [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).The CF CLI must be installed on the Harness Delegates used in deployment. This is a requirement for any TAS deployment with Harness.

The CF CLI can be installed on the Delegate(s) using a Delegate Profile script.

For more information, see [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).

In Harness, click **View Logs** to see the successful installation:

![](./static/use-cli-plugins-in-harness-pcf-deployments-04.png)

A single Delegate Profile can be used on all Delegates to ensure that any Delegates used have the CF CLI installed.

#### Plugins Installed on Harness Delegates

The plugin you want to run must be installed on the Harness Delegates that CF Command will use. You can tag a Harness Delegate and then select the Tag in the CF Command, ensuring that the CF Command runs your plugin on a Harness Delegate with the plugin installed.

![](./static/use-cli-plugins-in-harness-pcf-deployments-05.png)

You can install the plugin on the Harness Delegate using the same Delegate Profile you use to install the CF CLI on the Delegate(s).

Here is an example installing the CF CLI and [Create-Service-Push](https://plugins.cloudfoundry.org/#Create-Service-Push) plugin:


```
sudo wget -O /etc/yum.repos.d/cloudfoundry-cli.repo https://packages.cloudfoundry.org/fedora/cloudfoundry-cli.repo  
sudo yum -y install cf-cli  
  
echo y | cf install-plugin -r CF-Community "Create-Service-Push"
```
If you are using the Kubernetes, ECS, or Helm Delegates, you can select the Profile when you download a new Delegate script. Typically, you will be using a Shell Script Delegate for TAS deployments. In that case, simply apply the Profile to each new Delegate:

![](./static/use-cli-plugins-in-harness-pcf-deployments-06.png)

#### Create-Service-Push Installed on Delegate

The Create-Service-Push plugin must be installed on the Delegate(s) to use the App AutoScaler plugin. See [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).The [Create-Service-Push](https://plugins.cloudfoundry.org/#Create-Service-Push) plugin reads in a services' manifest.yml file, creates the services listed in it, and pushes an application. Create-Service-Push extends `cf push`.

If you want to create TAS services from the inline or remote manifest files set up in your Harness Service **Manifests** section, you need to have Create-Service-Push installed on the Delegate.

For example, you can see the `cf create-service-push` command used to run a plugin defined in the manifest here:

![](./static/use-cli-plugins-in-harness-pcf-deployments-07.png)

You can install the Create-Service-Push plugin in a Delegate Profile by itself:


```
echo y | cf install-plugin -r CF-Community "Create-Service-Push"
```
or in the Delegate Profile that installs the CF CLI:


```
sudo wget -O /etc/yum.repos.d/cloudfoundry-cli.repo https://packages.cloudfoundry.org/fedora/cloudfoundry-cli.repo  
sudo yum -y install cf-cli  
  
echo y | cf install-plugin -r CF-Community "Create-Service-Push"
```
Click **View Logs** to see the successful installation:


```
Searching CF-Community for plugin Create-Service-Push...  
Plugin Create-Service-Push 1.3.1 found in: CF-Community  
Attention: Plugins are binaries written by potentially untrusted authors.  
Install and use plugins at your own risk.  
Do you want to install the plugin Create-Service-Push? [yN]: y  
Starting download of plugin binary from repository CF-Community...  
  
 0 B / 9.82 MiB [------------------------------------------------------]   0.00% 9.82 MiB / 9.82 MiB [==============================================] 100.00% 0sInstalling plugin Create-Service-Push...  
OK  
  
Plugin Create-Service-Push 1.3.1 successfully installed.
```
### Step 1: Running CF Plugins Using the CF Command

Once the CF plugin has been installed on a Harness Delegate, you can simply add the CF Command to your Workflow to run the plugin.

1. In your TAS Workflow, decide where you want to execute a CF CLI command. If you want to run a plugin, you will likely want to add the CF Command to the **Setup** section.
2. click **Add Command**. **Add Command** appears.
3. Click **CF Command**. **CF Command** appears.

![](./static/use-cli-plugins-in-harness-pcf-deployments-08.png)

As the commented-out text states, the CF Command will perform the login steps of using the CF CLI. So you do not need to include login credentials in CF Command. CF Command will use the credentials set up in your Harness TAS Cloud Provider.

### Step 2: Script

Enter your CF CLI commands.

There are two built-in Harness TAS variables you can use to reference the manifest and vars files used by the plugin you want to run:

* If you are using inline Manifest files, the variable `${service.manifest}` refers to the folder containing your manifest files.

![](./static/use-cli-plugins-in-harness-pcf-deployments-09.png)

* If you are using remote Manifest files via a Git repo, `${service.manifest}` refers to the folder containing your manifest files and `${service.manifest.repoRoot}` refers to the root folder of the repo.

![](./static/use-cli-plugins-in-harness-pcf-deployments-10.png)

You can use the variables together to point to different locations. For example, here the manifest.yml file is one folder and the vars.yml is located using a path from the repo root folder:


```
cf create-service-push --service-manifest ${service.manifest}/manifest.yml --no-push --vars-file ${service.manifest.repoRoot}/QA/vars.yml  
cf plugins | grep autoscaling-apps
```
These variables appear when you type `${service` in **Script**:

![](./static/use-cli-plugins-in-harness-pcf-deployments-11.png)

Environment Service Overrides, such as [Tanzu Manifest Overrides](override-pcf-manifests-and-config-variables-and-files.md), do not apply to or override the `${service.manifest}` variable. The `${service.manifest}` variable only looks in the Harness Service.You can also use variables in your script to templatize paths to manifest files. For example, if your Workflow Environment were templatized (see [Template a Workflow](https://docs.harness.io/article/m220i1tnia-workflow-configuration#template_a_workflow)), you can use the Environment variable `${env.name}` in your path, like this:

`${service.manifest.repoRoot}/${env.name}/vars.yml`

When the Workflow is deployed, the user will have to provide a name for the Environment to use. The same name will be substituted for `${env.name}` in the path in your script.

This substitution can be useful if you have folder names in your remote Git repo that match Harness Environment names, such as QA and PROD. The same Workflow and CF Command can be used for both Environments and use manifest files in separate repo folders.

### Step 3: Delegate Selectors

Ensure that the Harness Delegate(s) used for your deployment have the correct version of the CF CLI installed. See [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).In order for the plugin in your script to execute, the Harness Delegate(s) running the script must have the plugin installed.

Unless all of your Harness Delegates have the plugin installed, you can refer to the specific Delegates with the plugin installed using [Delegate Selectors](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_selectors). Add the Delegate Selectors for the Delegates with the plugins installed.

![](./static/use-cli-plugins-in-harness-pcf-deployments-12.png)

If you do not add any Delegates Selectors to the CF Command, when the CF Command runs, Harness will only use Delegates that have the CF CLI installed.

However, if you are running plugins in CF Command, Harness cannot know which Delegates have the plugins installed.

This is why the Delegate Selectors setting ensures that CF Command only executes on Delegates that can run the plugins mentioned in the CF Command script.

### Review: Plugin Directory

Ensure that the Harness Delegate(s) used for your deployment have the correct version of the CF CLI installed. See [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).By default, the CF CLI stores plugins in `$CF_HOME/.cf/plugins`, which defaults to `$HOME/.cf/plugins`. For most cases, this location does not need to change.

To change the root directory of this path from `$CF_HOME`, set the `CF_PLUGIN_HOME` environment variable.

For example:

`export CF_PLUGIN_HOME='<path to plugin home>'`

You can set the `CF_PLUGIN_HOME` environment variable before you install the Delegate. This will ensure that the Delegate Profile that you use to install the CF CLI uses the new `CF_PLUGIN_HOME`.

For more information, see [Changing the Plugin Directory](https://docs.cloudfoundry.org/cf-cli/use-cli-plugins.html#plugin-directory) from Pivotal.

