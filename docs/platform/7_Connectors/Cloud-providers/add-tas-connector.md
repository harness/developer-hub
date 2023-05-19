---
title: Add a Tanzu Application Service (TAS) connector
description: Connect Harness to your Tanzu accounts and spaces.
sidebar_position: 6
---

This topic describes how to set up the Harness Delegate in your TAS environment and add the cloud provider used to connect to your Tanzu cloud for deployment.

## Install the Harness Delegate

Harness Delegate is a service you run in your local network or VPC to connect your artifacts, TAS infrastructure, and any other providers with the Harness Manager.

Expand the following section to learn how to install the Harness Delegate.

<details>
<summary>Use the delegate installation wizard</summary>

1. In your Harness project, select **Project Setup**.
2. Select **Delegates**.
3. Select **Install a Delegate**.
4. Follow the instructions in the delegate installation wizard.

Use this [delegate installation wizard video](https://www.youtube.com/watch?v=yLMCxs3onH8) to guide you through the process.

</details>

```mdx-code-block
import DelegateInstall from '/tutorials/platform/install-delegate.md';
```

<details>
<summary>Use the terminal</summary>
<DelegateInstall />
</details>

To learn more, watch the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview) video.


## Install the Cloud Foundry Command Line Interface (cf CLI) on your Harness Delegate

After the delegate pods are created, you must edit your Harness Delegate YAML to install CF CLI v7, `autoscaler`, and `Create-Service-Push` plugins.

1. Open `delegate.yaml` in a text editor.
2. Locate the environment variable `INIT_SCRIPT` in the `Deployment` object.
   ```
   - name: INIT_SCRIPT  
   value: ""  
   ```
3. Replace `value: ""` with the following script to install CF CLI, `autoscaler`, and `Create-Service-Push` plugins.
   
   :::info
   
   Harness Delegate uses Red Hat–based distributions such as Red Hat Enterprise Linux (RHEL) or Red Hat Universal Base Image (UBI). Hence, we recommend that you use `microdnf` commands to install CF CLI on your delegate. If you are using a package manager in Debian-based distributions such as Ubuntu, use `apt-get` commands to install CF CLI on your delegate.
   
   :::

   :::info
   
   Make sure to use your API token for pivnet login in the following script.
   
   :::

```mdx-code-block
import Tabs from '@theme/Tabs';   
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
    <TabItem value="microdnf" label="microdnf" default>
```

   ```
   - name: INIT_SCRIPT  
   value: |
    # update package manager, install necessary packages, and install CF CLI v7
    microdnf update
    microdnf install yum
    microdnf install --nodocs unzip yum-utils
    microdnf install -y yum-utils
    echo y | yum install wget
    wget -O /etc/yum.repos.d/cloudfoundry-cli.repo https://packages.cloudfoundry.org/fedora/cloudfoundry-cli.repo
    echo y | yum install cf7-cli -y

    # autoscaler plugin
    # download and install pivnet
    wget -O pivnet https://github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;
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

```mdx-code-block
</TabItem>
<TabItem value="apt-get" label="apt-get">
```
   
   ```
   - name: INIT_SCRIPT  
   value: |
    # update package manager, install necessary packages, and install CF CLI v7
    apt-get install wget
    wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -
    echo "deb https://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list
    apt-get update
    apt-get install cf7-cli

    # autoscaler plugin
    # download and install pivnet
    wget -O pivnet https://github.com/pivotal-cf/pivnet-cli/releases/download/v0.0.55/pivnet-linux-amd64-0.0.55 && chmod +x pivnet && mv pivnet /usr/local/bin;
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
  
```mdx-code-block
</TabItem>    
</Tabs>
```
   
4. Apply the profile to the delegate profile and check the logs.

   The output for `cf --version` is `cf version 7.2.0+be4a5ce2b.2020-12-10`.

   Here is the output for `cf plugins`.
   
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
:::note
The CF Command script does not require `cf login`. Harness logs in by using the credentials in the TAS cloud provider set up in the infrastructure definition for the workflow executing the CF Command.
:::

## Add the Harness TAS provider

You can connect Harness to a TAS space by adding a TAS connector. 

Perform the following steps to add a TAS connector.

1. Open a Harness project, and then select **Connectors** under **Project Setup**.
2. Select **New Connector**, and select **Tanzu Application Service** under **Cloud Providers**.
4. Enter a connector name, enter an optional description and tag, and then select **Continue**.
   
   Harness automatically creates an **[ID](/docs/platform/References/entity-identifier-reference)** for the connector. The ID is based on the connector's name.
5. Enter the TAS **Endpoint URL**. For example, `https://api.system.tas-mycompany.com`.
6. In **Authentication**, select one of the following options:
    * **Plaintext** - Enter the username and password. For password, you can either create a new secret or use an existing one.
    * **Encrypted** - Enter the username and password. You can create a new secret for your username and password or use exiting ones.
7. Select **Continue**.
8. In **Connect to the provider**, select **Connect through a Harness Delegate**, and then select **Continue**.

   We don't recommend using the **Connect through Harness Platform** option here because you'll need a delegate later for connecting to your TAS environment. Typically, the **Connect through Harness Platform** option is a quick way to make connections without having to use delegates.
9.  In **Set Up Delegates**, select the **Connect using Delegates with the following Tags** option, and then enter the name of the [delegate](#install-the-harness-delegate) you created earlier.
10. Select **Save and Continue**.
11. Once the test connection succeeds, select **Finish**. 
    
    The connector now appears in the **Connectors** list.

