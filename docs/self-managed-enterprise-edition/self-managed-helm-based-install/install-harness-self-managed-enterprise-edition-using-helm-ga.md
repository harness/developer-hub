---
title: Install Harness Self-Managed Enterprise Edition using Helm
description: This document explains how to use Helm to install, upgrade or uninstall Harness Self-Managed Enterprise Edition. This document describes an installation on Google Kubernetes Engine (GKE). The same in…
# sidebar_position: 2
helpdocs_topic_id: 6tblwmh830
helpdocs_category_id: 66qbyn7ugu
helpdocs_is_private: false
helpdocs_is_published: true
---

This document explains how to use Helm to install, upgrade or uninstall Harness Self-Managed Enterprise Edition. This document describes an installation on Google Kubernetes Engine (GKE). The same installation process, however, applies to installations on Kubernetes versions 1.*x* and later.

Helm package manager provides a declarative approach to Kubernetes application management in which software packages are specified as “charts.” For more information, see the [Helm documentation](https://helm.sh/docs/).

## Download Harness Helm chart

To download Harness Helm chart for the installation of Self-Managed Enterprise Edition, see <https://github.com/harness/helm-charts>.

Harness Helm chart is available for demonstration and production environments.

## Update the override.yaml file

Depending on your target environment, you'll need to update the override.yaml file to specify a load balancer or to specify the Harness modules to be deployed.

### Add a load balancer

Use the following procedure to add a load balancer.

**To add the URL for a load balancer**

1. In the values.yaml file, set the `global.loadbalancerURL` field to the URL of your load balancer. This is the URL you use for Harness.

   ```
   global:  
    # -- Harness Application URL  
    loadbalancerURL: http://<load-balancer-IP-address>  
    host_name: "<load-balancer-IP-address>"
   ```

2. Set the `host_name` field to the IP address of the load balancer.

3. Save the file.

### Deploy Harness modules

Harness Helm chart includes Harness Platform components. You can add modules by editing the override.yaml file.

The following components are enabled by default:

* Harness CD - Next Generation
* Harness CI
* Harness Security Testing Orchestration (STO)

You can conditionally disable or enable the CI and STO modules by specifying a boolean value in the `enabled` field of the YAML:

#### CI module

```
ci:
# -- Enable to deploy CI to your cluster
enabled: true
```

#### STO module

```
sto:
# -- Enable to deploy STO to your cluster
enabled: true
```

## Install the Helm chart

To use the charts, you must install Helm. To get started with Helm, see the [Helm documentation](https://helm.sh/docs/). After you install Helm, follow the instructions below.

**To install the Helm chart**

1. Add the repository.

   ``` 
   $ helm repo add harness https://harness.github.io/helm-charts
   ```

2. Create a namespace for your installation.  

   ```
   $ kubectl create namespace <namespace>
   ```

3. Modify the override.yaml file with your environment settings.

4. Install the Helm chart.  

   ```
   $ helm install my-release harness/harness-prod -n <namespace> -f override.yaml
   ```

## Verify installation

After the installation completes, the services that were installed are enumerated with their status.

![](./static/install-harness-self-managed-enterprise-edition-using-helm-ga-00.png)

The services that appear depend on the modules that were installed.

**To verify installation**

1. Review the list of services.
2. In your browser, type the following instruction: 

   ``` 
   http://localhost/auth/#/signup
   ```

   If the installation was successful, the Harness **Sign up** page appears.

## Upgrade the Helm chart

Use the following instructions to upgrade the chart to a new release. 

**To upgrade the chart**

1. Use the following command to obtain the release name for the earlier release. 

   ``` 
   $ helm ls -n <namespace>
   ```

2. Retrieve the values for the earlier release.  
   ```
   $ helm get values my-release > old_values.yaml
   ```

3. Change the values of the old\_values.yaml file as required.

4. Use the `helm upgrade` command to update the chart. 

   ```
   $ helm upgrade my-release harness/harness-demo -n <namespace> -f old_values.yaml
   ```

## Uninstall the Helm chart

To remove the Kubernetes components associated with the chart and delete the release, uninstall the chart.

**To uninstall the chart**

* Uninstall and delete the `my-release` deployment:

  ```  
  $ helm uninstall my-release -n <namespace>
  ```

