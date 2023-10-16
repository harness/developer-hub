---
title: Connect chaos infrastructures
sidebar_position: 10
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Chaos infrastructure is a service that runs in your target environment and aids Harness Chaos Engineering (CE) in accessing and injecting chaos at cloud-native scale. There are different types of chaos infrastructure based on the target environments, such as Kubernetes, Linux VMs, etc. These chaos infrastructures can be installed as a Kubernetes service, as a Linux daemon, and so on, based on their type.

All the chaos infrastructure services adhere to the principle of least privilege, where the services execute with the minimum number of required permissions.

## Create an environment

You must create a new environment in Harness to specify where you want the chaos infrastructure to exist.

To create an environment:

1. In your Harness project, navigate to **Chaos > Environments**.

1. Select **+ New Environment**.

1. In the **Create a new environment** screen, specify a **Name** for the environment, and optionally a **Description** and a **Tag**. 
1. For **Environment type**, choose either **Production** or **Non-Production**, and then click **Create**.

  This creates a new environment.

  ![New Environment](./static/connect-chaos-infrastructures/new-environment.png)

## Add a Kubernetes chaos infrastructure

This section outlines the steps to add a chaos infrastructure to either a [Kubernetes](#add-a-kubernetes-chaos-infrastructure) or [Linux](#add-a-linux-chaos-infrastructure) environment.

You can either setup a chaos infrastructure on existing infrastructures that uses a Harness cluster connector, that is, Harness Kubernetes connector or install the chaos infrastructure on a new infrastructure.

To add a chaos infrastructure on an existing Harness Kubernetes connector:

1. In Harness, navigate to **Chaos > Environments**, and then select the environment you want to add chaos infrastructure to.

1. In  the environment details page, select **+ Enable Chaos**.

1. On the next screen, select where to add chaos infrastructure, and then select **Continue**.

  Select one of the following:

    * **On Existing Infrastructures** 
    * **On New Infrastructures**

2. If you selected **On Existing Infrastructures**, on the next screen, select any connector under the **Project**, **Organization**, or **Account** scope. (Otherwise skip this step.)

  ![Chaos Infrastructure in Existing Infra](./static/connect-chaos-infrastructures/chaos-infrastructure-in-existing-infra.png)

  :::info note
  A Harness Kubernetes connector with:
    * **Cluster-wide read/write access** can be used to set up chaos infrastructure in cluster scope and namespace scope.
    * **Specific namespace access** can be used to set up a chaos infrastructure in that specific Kubernetes namespace scope only.
    * **Cluster-wide read access** cannot be used to set up a chaos infrastructure.
  :::

1. Select **Continue**.

1. On the next screen, enter a **Name** for the chaos infrastructure, and optional **Description** and **Tags**, and then select **Next**.

  The Configure Chaos Infrastructure screen appears.

  ![Configure Chaos Infrastructure](./static/connect-chaos-infrastructures/configure-chaos-infrastructure.png)

1. Under **Choose Access Type**, choose one of the following modes.

    * **Cluster Wide:** This mode of infrastructure installation allows targeting resources across the entire cluster, in all the namespaces, as part of an experiment. 
    * **Namespace Mode:** This mode of infrastructure installation allows targeting resources only in the namespace where the chaos infrastructure is deployed.

    By default the installation will take place in the `hce` namespace and uses `hce` service account, which can be configured under the K8s cluster details.
    
    Optionally, you can also specify the node selectors and Kubernetes tolerations for chaos infrastructure deployment.

    :::tip
    - There can only be one cluster-wide chaos infrastructure per cluster.
    - There may be multiple namespace-scoped chaos infrastructures per cluster.
    :::

1. Select **Next**.

  The Deploying your Infrastructure screen appears. 

1. If you're deploying **on existing infrastructure**, select **Done**.  

  This is your final step. Harness installs the chaos infrastructure on your behalf.

1. If you're deploying on **new infrastructure**, you must run the given commands and/or download and apply the installation manifest YAML file.

    * **For cluster-wide access:** 

      1. Select **Download**, and then copy and run the `kubectl` command shown on your screen to install the chaos infrastructure.

      ![Cluster Wide Setup Infrastructure](./static/connect-chaos-infrastructures/cluster-wide-setup-infrastructure.png)

    * **For namespace access:** 

      1. Run the first `kubectl` command to create the target namespace.
      1. Run the second `kubectl` command to apply the chaos CRDs.
      1. Select **Download**, and then copy and run the third command to install the chaos infrastructure.

      ![Namespace Mode Setup Infrastructure](./static/connect-chaos-infrastructures/ns-mode-setup-infrastructure.png)

1. Select **Done**.

## Add a Linux chaos infrastructure

:::info note
If you're installing the chaos infrastructure alongside SElinux, you must add a policy module to enable `timedatectl`. SElinux is enabled by default in distributions such as **CentOS**, **SUSE Linux**, **RHEL**, and **Fedora** among others.

<details>

If you have enabled SELinux for your OS, you must add a policy module prior to the installation of the infrastructure to access `timedatectl`, which is used in the **linux-time-chaos** fault.

To add the policy module:

1. Create the file `timedatectlAllow.te` in your Linux machine as follows:

  ```te

  module timedatectlAllow 1.0;

  require {
          type systemd_timedated_t;
          type initrc_t;
          class dbus send_msg;
  }

  #============= systemd_timedated_t ==============
  allow systemd_timedated_t initrc_t:dbus send_msg;

  ```

1. Install the utilities that will help in compiling and packaging the policy module for your system. Here, we're using the yum package manager to install them:

  ```bash
  sudo yum install -y policycoreutils-python checkpolicy
  ```

1. After the installation of these packages, compile the policy module with the following command:

  ```bash
  sudo checkmodule -M -m -o timedatectlAllow.mod timedatectlAllow.te
  ```

  This creates the binary policy module file `timedatectlAllow.mod`. 

1. Use the policy module file from the previous step to create a policy module package:

  ```bash
  sudo semodule_package -o timedatectlAllow.pp -m timedatectlAllow.mod
  ```

  This creates the policy module package file `timedatectlAllow.pp`. 

1. Add the package file from the previous step alongside the other SELinux modules in your system:

  ```bash
  sudo semodule -i timedatectlAllow.pp
  ```

The SELinux policy module is now added, and you can proceed to install the infrastructure.

</details>
:::

To add a Linux chaos infrastructure:

1. In Harness, navigate to **Chaos > Environments**, and then select the environment you want to add chaos infrastructure to.

1. In the environment details page, under **Infrastructure type**, select **Linux**, and then select **+ Enable Chaos**.

  ![Create Infra](./static/connect-chaos-infrastructures/2.select-linux.png)

1. On the next screen, enter a **Name** for the infrastructure, and optionally, a **Description** and **Tags**. 

  ![Specify Details](./static/connect-chaos-infrastructures/3.configure-chaos.png)
  
  You can also specify the [advanced setup](./linux-chaos-infrastructure-advanced-management.md#advanced-setup) options for the infrastructure. 

1. Select **Next**.

  ![Execute Command](./static/connect-chaos-infrastructures/4.deploy-infra.png)

1. On the next screen, copy the command to set up Linux chaos access, select **Done**, and then execute the copied command on your Linux machine.

## Validate the chaos infrastructure installation

After the final step of adding chaos infrastructure, Harness takes some time to set up all the chaos infrastructure resources. Once everything is set up, the chaos infrastructure's connection status is `CONNECTED`.

![Infrastructure State](./static/connect-chaos-infrastructures/infrastructure-state.png)

That's it! Now you're all set to inject chaos into your infrastructure.