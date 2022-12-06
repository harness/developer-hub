---
title: Install Cloud Foundry CLI Versions on the Harness Delegate
description: The host running the Harness Delegate must run the Cloud Foundry CLI in order to execute the CF commands used by Harness during a Tanzu Application Service (TAS) deployment. You can follow the steps…
sidebar_position: 190 
helpdocs_topic_id: 8tsb75aldu
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

The host running the Harness Delegate must run the Cloud Foundry CLI in order to execute the CF commands used by Harness during a Tanzu Application Service (TAS) deployment.

You can follow the steps in [Installing the cf CLI](https://docs.pivotal.io/pivotalcf/2-3/cf-cli/install-go-cli.html) from Tanzu to install the CLI, or you can also use a Delegate Profile to install the CLI, as described in this topic.

The version of the CF CLI you install on the Delegate should always match the TAS features you are using in your Harness TAS deployment. For example, if you are using `buildpacks` in your manifest.yml in your Harness Service, the CLI you install on the Delegate should be version 3.6 or later.

This topic provides examples of Delegate Profile scripts that install CF CLI 6 and 7:

* [Review: Using CF CLI Versions](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#review-using-cf-cli-versions)
* [Review: Delegate Capability Check for CF CLI](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#review-delegate-capability-check-for-cf-cli)
	+ [Limitations](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#limitations)
* [Select the CF CLI Version in a Harness Service](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#select-the-cf-cli-version-in-a-harness-service)
* [Install the CF CLI on Harness Delegates using a Package Manager](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#install-the-cf-cli-on-harness-delegates-using-a-package-manager)
	+ [CF CLI 6](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#cf-cli-6)
	+ [CF CLI 7](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#cf-cli-7)
* [Install the CF CLI on Harness Delegates using a Compressed Binary](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#install-the-cf-cli-on-harness-delegates-using-a-compressed-binary)
	+ [CF CLI 6](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#cf-cli-6-2)
	+ [CF CLI 7](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#cf-cli-7-2)
* [Install Two Different CF CLI Versions using a Compressed Binary](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#install-two-different-cf-cli-versions-using-a-compressed-binary)
	+ [CF CLI 6](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#cf-cli-6-3)
	+ [CF CLI 7](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#cf-cli-7-3)
	+ [Package Managers take Precedence over Compressed Binary](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md#package-managers-take-precedence-over-compressed-binary)

### Review: Using CF CLI Versions

Setting up Harness to use CF CLI versions involves the following steps:

1. Install the CF CLI version on a Delegate manually or using a [Delegate Profile](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_profiles).
2. Set the CF CLI version on the Harness Service(s) you are using for TAS deployments.

Details and options for these steps are described below.

### Review: Delegate Capability Check for CF CLI

Once you have installed the CF CLI on a Delegate using a [Delegate Profile](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_profiles), and set the CF CLI version on the Harness Services (both steps are described below), the Harness Delegate performs the following capability check at deployment runtime:

1. When the Workflow starts, the Delegate capability check determines whether a specific version is installed on available Delegates.  
The required version is determined by whether or not the **Enable CF CLI 7** option is selected in the Harness Service being deployed.Currently, the **Enable CF CLI 7** feature is behind the Feature Flag `CF_CLI7`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
2. The Delegate capability check executes the `cf --version` command on the Delegates to verify the required version.
3. If the result of the version command is empty, the appropriate Delegate env variable is examined: for CF 6 `CF_CLI6_PATH` and for CF 7 `CF_CLI6_PATH`.
4. If there is no installed required version on the Delegate, the `No eligible Delegate ….` error message appears in Harness.
5. If the capability check finds a Delegate with the installed required version, the Delegate task is sent to that Delegate and the capability check results are recorded and valid for the next **6 hours**.

#### Limitations

In some cases, you might have uninstalled a CF CLI version and then installed a different version within the 6 hour capability check window.

In these cases, the Delegate might be looking for the old version. If so, you will see errors like: `Unable to find CF CLI version on delegate, requested version: v6` or `Unable to find CF CLI version on delegate, requested version: v7`.

### Select the CF CLI Version in a Harness Service

After you have installed the CF CLI on a Delegate using a [Delegate Profile](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_profiles), you must select the CF CLI version in the Harness Service you are using for your TAS deployment.

![](./static/install-cloud-foundry-cli-6-and-7-on-harness-delegates-22.png)

* **CF CLI 6:** By default, Harness uses CF CLI 6. If you are using CF CLI 6, then ensure that the **Enable CF CLI 7** setting is not selected.
* **CF CLI 7:** To use CF CLI 7, select **Enable CF CLI 7**.

Currently, the **Enable CF CLI 7** feature is behind the Feature Flag `CF_CLI7`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### Install the CF CLI on Harness Delegates using a Package Manager

Two different CF versions cannot be installed on the same Delegate using a package manager, but it can be done using compressed binaries.Create a [Delegate Profile](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_profiles).

Add the following script to the Delegate Profile:

#### CF CLI 6

This script installs CF CLI 6 and `autoscaler` and `Create-Service-Push` plugins:


```
apt-get install wget  
wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -  
echo "deb https://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list  
apt-get update  
apt-get install cf-cli  
  
# autoscaler plugin  
# download and install pivnet  
wget -O pivnet github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;  
pivnet login --api-token=<replace with api token>  
  
# download and install autoscaler plugin by pivnet  
pivnet download-product-files --product-slug='pcf-app-autoscaler' --release-version='2.0.295' --product-file-id=912441  
cf install-plugin -f autoscaler-for-pcf-cliplugin-linux64-binary-2.0.295  
  
# install Create-Service-Push plugin from community  
cf install-plugin -r CF-Community "Create-Service-Push"  
  
# verify cf version  
cf --version  
  
# verify plugins  
cf plugins
```
Apply the Delegate Profile to the Delegate(s) that will be used for your TAS deployment.

The output of `cf --version` should be:


```
cf version 6.53.0+8e2b70a4a.2020-10-01
```
The output of `cf plugins` should be:


```
App Autoscaler        2.0.295   autoscaling-apps              Displays apps bound to the autoscaler  
App Autoscaler        2.0.295   autoscaling-events            Displays previous autoscaling events for the app  
App Autoscaler        2.0.295   autoscaling-rules             Displays rules for an autoscaled app  
App Autoscaler        2.0.295   autoscaling-slcs              Displays scheduled limit changes for the app  
App Autoscaler        2.0.295   configure-autoscaling         Configures autoscaling using a manifest file  
App Autoscaler        2.0.295   create-autoscaling-rule       Create rule for an autoscaled app  
App Autoscaler        2.0.295   create-autoscaling-slc        Create scheduled instance limit change for an autoscaled app  
App Autoscaler        2.0.295   delete-autoscaling-rule       Delete rule for an autoscaled app  
App Autoscaler        2.0.295   delete-autoscaling-rules      Delete all rules for an autoscaled app  
App Autoscaler        2.0.295   delete-autoscaling-slc        Delete scheduled limit change for an autoscaled app  
App Autoscaler        2.0.295   disable-autoscaling           Disables autoscaling for the app  
App Autoscaler        2.0.295   enable-autoscaling            Enables autoscaling for the app  
App Autoscaler        2.0.295   update-autoscaling-limits     Updates autoscaling instance limits for the app  
Create-Service-Push   1.3.2     create-service-push, cspush   Works in the same manner as cf push, except that it will create services defined in a services-manifest.yml file first before performing a cf push.
```
#### CF CLI 7

This script installs CF CLI 7 and `autoscaler` and `Create-Service-Push` plugins:


```
apt-get install wget  
wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -  
echo "deb https://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list  
sudo apt-get update  
sudo apt-get install cf7-cli  
  
# autoscaler plugin  
# download and install pivnet  
wget -O pivnet github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;  
pivnet login --api-token=<replace with api token>  
  
# download and install autoscaler plugin by pivnet  
pivnet download-product-files --product-slug='pcf-app-autoscaler' --release-version='2.0.295' --product-file-id=912441  
cf install-plugin -f autoscaler-for-pcf-cliplugin-linux64-binary-2.0.295  
  
# install Create-Service-Push plugin  
# unable to use Create-Service-Push from community repo due to following error  
# https://github.com/dawu415/CF-CLI-Create-Service-Push-Plugin/issues/13  
wget https://github.com/dawu415/CF-CLI-Create-Service-Push-Plugin/releases/download/1.3.2/CreateServicePushPlugin.linux64  
cf install-plugin CreateServicePushPlugin.linux64  
  
# verify cf version  
cf --version  
  
# verify plugins  
cf plugins
```
Apply the Delegate Profile to the Delegate(s) that will be used for your TAS deployment.

The output of `cf --version` should be:


```
cf version 7.2.0+be4a5ce2b.2020-12-10
```
The output of `cf plugins` should be the same as the output for CF CLI 6.

### Install the CF CLI on Harness Delegates using a Compressed Binary

Two different CF versions cannot be installed on the same Delegate using a package manager, but it can be done using compressed binaries.Create a [Delegate Profile](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_profiles).

Add the following script to the Delegate Profile:

#### CF CLI 6

This script installs the CF CLI 6 compressed binary and `autoscaler` and `Create-Service-Push` plugins:


```
# download compressed binary  
curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github&version=v6" | tar -zx  
  
# ...move it to /usr/local/bin or a location you know is in your $PATH  
mv cf /usr/local/bin  
  
# autoscaler plugin  
# download and install pivnet  
apt-get install wget  
wget -O pivnet github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;  
pivnet login --api-token=<replace with api token>  
  
# download and install autoscaler plugin by pivnet  
pivnet download-product-files --product-slug='pcf-app-autoscaler' --release-version='2.0.295' --product-file-id=912441  
cf install-plugin -f autoscaler-for-pcf-cliplugin-linux64-binary-2.0.295  
  
# install Create-Service-Push plugin from community  
cf install-plugin -r CF-Community "Create-Service-Push"  
  
# verify cf version  
cf --version  
  
# verify plugins  
cf plugins
```
If there is a requirement to install a specific CLI version, update the `version` path param in the above download URL with a specific version.

Let’s say you want to install `version=6.52.0` . The download URL should be `https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github&version=6.52.0`.

Apply the Delegate Profile to the Delegate(s) that will be used for your Tanzu deployment.

#### CF CLI 7

This script installs the CF CLI 7 compressed binary, `autoscaler` and `Create-Service-Push` plugins:


```
# download compressed binary  
curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&version=v7&source=github" | tar -zx  
  
# ...move it to /usr/local/bin or a location you know is in your $PATH, ("cf" is symlink)  
mv cf7 /usr/local/bin  
mv cf /usr/local/bin  
  
# autoscaler plugin  
# download and install pivnet to /tmp  
apt-get install wget  
wget -O pivnet github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;  
pivnet login --api-token=<replace with api token>  
  
# download and install autoscaler plugin by pivnet  
pivnet download-product-files --product-slug='pcf-app-autoscaler' --release-version='2.0.295' --product-file-id=912441  
cf install-plugin -f autoscaler-for-pcf-cliplugin-linux64-binary-2.0.295  
  
# install Create-Service-Push plugin  
# unable to use Create-Service-Push from community repo due to following error  
# https://github.com/dawu415/CF-CLI-Create-Service-Push-Plugin/issues/13  
wget https://github.com/dawu415/CF-CLI-Create-Service-Push-Plugin/releases/download/1.3.2/CreateServicePushPlugin.linux64  
cf install-plugin CreateServicePushPlugin.linux64  
  
# verify cf version  
cf --version  
  
# verify plugins  
cf plugins
```
When you download and extract the package, you will get the CF CLI 7 executable (**cf7**) and its symlink (**cf**). The symlink must also be moved to the same location as the executable as it is used in the **CF CLI Command** step that use `cf`.If there is a requirement to install a specific CLI version, update the `version` path param from the above download URL with a specific version.

Let’s say you want to install `version=7.2.0` . The download URL should be `https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github&version=7.2.0`

Apply the Delegate Profile to the Delegate(s) that will be used for your Tanzu deployment.

### Install Two Different CF CLI Versions using a Compressed Binary

Let's look at a few use cases using two different CF CLI version compressed binaries:

* Install one CLI version by package manager and another version using a compressed binary on the same Delegate.
* Install both versions using compressed binaries.
* Install a compressed binary where a security scan is done and included a security fix.

In order to satisfy the above cases, we can use the following approach.

Create a [Delegate Profile](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_profiles).

Add the following script to the Delegate Profile:

#### CF CLI 6

This script installs the CF CLI 6 compressed binary and `autoscaler` and `Create-Service-Push` plugins:


```
# download compressed binary, provide url to compressed binary  
curl -L "<url-to-commpressed-cli6-binary>" | tar -zx  
  
# ...move it to path on your file system  
mv cf /<path-to-cli6-binary>  
  
# autoscaler plugin  
# download and install pivnet  
apt-get install wget  
wget -O pivnet github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;  
pivnet login --api-token=<replace with api token>  
  
# download and install autoscaler plugin by pivnet  
pivnet download-product-files --product-slug='pcf-app-autoscaler' --release-version='2.0.295' --product-file-id=912441  
<path-to-cli6-binary> install-plugin -f autoscaler-for-pcf-cliplugin-linux64-binary-2.0.295  
  
# install Create-Service-Push plugin from community  
<path-to-cli6-binary> install-plugin -r CF-Community "Create-Service-Push"  
  
# verify cf version  
<path-to-cli6-binary> --version  
  
# verify plugins  
<path-to-cli6-binary> plugins
```
`<path-to-cli6-binary>` should include the full path to CF. For example, if you install `cf` to the location `/home/cflibs/v6/`, then `<path-to-cli6-binary>` should be replaced by `/home/cflibs/v6/cf`.Apply the Delegate Profile to the Delegate(s) that will be used for your TAS deployment.

Update the `CF_CLI6_PATH` env variable in Delegate config file and start/restart the Delegate.

The value of the `CF_CLI6_PATH` env variable should be `<path-to-binary-cf>` , for example `CF_CLI6_PATH=/home/cflibs/v6/cf`.

#### CF CLI 7

This script installs the CF CLI 7 compressed binary and `autoscaler` and `Create-Service-Push` plugins:


```
# download compressed binary, provide url to compressed binary  
curl -L "<url-to-commpressed-cli7-binary>" | tar -zx  
  
# ...move it to path on your file system  
mv cf7 /<path-to-cli7-binary>  
mv cf /<path-to-cli7-binary>  
  
# autoscaler plugin  
# download and install pivnet  
apt-get install wget  
wget -O pivnet github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;  
pivnet login --api-token=<replace with api token>  
  
# download and install autoscaler plugin by pivnet  
pivnet download-product-files --product-slug='pcf-app-autoscaler' --release-version='2.0.295' --product-file-id=912441  
<path-to-cli7-binary> install-plugin -f autoscaler-for-pcf-cliplugin-linux64-binary-2.0.295  
  
# install Create-Service-Push plugin  
# unable to use Create-Service-Push from community repo due to following error  
# https://github.com/dawu415/CF-CLI-Create-Service-Push-Plugin/issues/13  
wget https://github.com/dawu415/CF-CLI-Create-Service-Push-Plugin/releases/download/1.3.2/CreateServicePushPlugin.linux64  
<path-to-cli7-binary> install-plugin CreateServicePushPlugin.linux64  
  
# verify cf version  
<path-to-cli7-binary> --version  
  
# verify plugins  
<path-to-cli7-binary> plugins
```
When you download and extract the package, you will get the CF CLI 7 executable (**cf7**) and its symlink (**cf**). The symlink must also be moved to the same location as the executable as it is used in the **CF CLI Command** step that use `cf`.`<path-to-cli7-binary>` should include the full path to CF. For example, if you install `cf` to the location `/home/cflibs/v7/`, then `<path-to-cli7-binary>` should be replaced by `/home/cflibs/v7/cf`.Apply the Delegate Profile to the Delegate(s) that will be used for your TAS deployment.

Update the `CF_CLI7_PATH` env variable in the Delegate config file and start/restart the Delegate.

The value of the `CF_CLI7_PATH` env variable should be `<path-to-binary-cf>` , for example `CF_CLI7_PATH=/home/cflibs/v7/cf`.

#### Package Managers take Precedence over Compressed Binary

Two different CF versions cannot be installed on the same Delegate by using a package manager, but it can be done using compressed binaries.

If you install the same CF CLI versions on the same Delegate, one by a package manager and another using a compressed binary, the CF installed by CF package manager takes precedence over the compressed binary during the Delegate capability check.

#### Notes

* The two different binary versions should be installed in different folders and different locations and the commands in the **CF CLI Command** step should be updated for these.  
For example, if you install one version in `home/cfcli/cf` and a different version in `home/cfcli/cf7`, when Harness tries to execute CF CLI commands in the **CF CLI Command** step that simply use `cf`, it will aways use the `home/cfcli/cf` version.
* If you install plugins for one version you do not need to install then for the second version. Plugins should be compatible for both versions.

