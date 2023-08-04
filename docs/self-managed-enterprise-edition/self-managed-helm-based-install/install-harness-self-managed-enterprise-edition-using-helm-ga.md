---
title: Install using Helm
description: Learn how to use Helm to install Harness Self-Managed Enterprise Edition.
sidebar_position: 3
helpdocs_topic_id: 6tblwmh830
helpdocs_category_id: 66qbyn7ugu
helpdocs_is_private: false
helpdocs_is_published: true
---

This document explains how to use Helm to install, upgrade, or uninstall Harness Self-Managed Enterprise Edition. This document describes an installation on Google Kubernetes Engine (GKE). The same installation process, however, applies to installations on Kubernetes versions 1.*x* and later.

Helm package manager provides a declarative approach to Kubernetes application management in which software packages are specified as “charts.” For more information, go to the [Helm documentation](https://helm.sh/docs/).

:::info note
You can also install Harness Self-Managed Enterprise Edition in an air-gapped environment. For more information, go to [Install in air-gapped environment](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-an-air-gapped-environment/).
:::

## Role requirements

The account you use to install Harness Self-Managed Enterprise Edition must have the Account Admin role to create service accounts. For more information on role-based permissions, go to [Role-based access control overview](/docs/platform/role-based-access-control/rbac-in-harness/).

## Download the Harness Helm chart

To download the Harness Helm chart for the installation of Self-Managed Enterprise Edition, go to the [Harness Helm chart repo](https://github.com/harness/helm-charts/releases).

Harness Helm charts are available for demonstration and production environments.

## Update the override.yaml file

Helm chart values, default value definitions, and field descriptions are available in the [Harness Helm chart repo](https://github.com/harness/helm-charts#values).

Depending on your target environment, you'll need to update the `override.yaml` file to specify a load balancer or to specify the Harness modules to be deployed.

### Add a load balancer

Use the following procedure to add a load balancer.

To add the URL for a load balancer, do the following:

1. In the `values.yaml` file, set the `global.loadbalancerURL` field to the URL of your load balancer. This is the URL you use for Harness.

   ```
   global:
    # -- Harness Application URL
    loadbalancerURL: http://<load-balancer-IP-address>
   ```

2. Set the `host_name` field to the IP address of the load balancer.

3. Save the file.

### Deploy Harness modules

Harness Helm chart includes Harness Platform components. You can add modules by editing the `override.yaml` file.

<!-- PR-1002 -->
The Platform component and the module below is enabled by default:

* Harness Continuous Deployment (CD) - Next Generation

The Harness modules below can be enabled or disabled conditionally:

* Harness Continuous Integration (CI)
* Harness Security Testing Orchestration (STO)
* Harness Service Reliability Management (SRM)
* Harness Feature Flags (FF)
* Harness Continuous Error Tracking (CET)

<!-- PR-1002 -->

You can conditionally disable or enable the CI and STO modules by specifying a boolean value in the `enabled` field of the YAML:

#### Deploy the CI module

```
ci:
# -- Enable to deploy CI to your cluster
enabled: true
```

<!-- PR-1002 -->
#### Deploy the SRM module

```
srm:
# -- Enable to deploy SRM to your cluster
enabled: true
```
<!-- PR-1002 -->

#### Deploy the FF module

```
ff:
# -- Enable to deploy FF to your cluster
enabled: true
```

#### Deploy the STO module

```
sto:
# -- Enable to deploy STO to your cluster
enabled: true
```

#### Deploy the CE module

```
chaos:
# -- Enable to deploy Chaos Engineering (CE) to your cluster
enabled: true
```

#### Deploy the CET module

```
cet:
# -- Enable to deploy CET to your cluster
enabled: true
```

### Add a Harness license

Harness Self-Managed Enterprise Edition needs a license to be provisioned for the Harness NextGen platform. Contact [Harness Support](mailto:support@harness.io) to procure the license and add it to the `override.yaml` file.
```
  license:
    # -- Insert CG License String to enable CG license
    cg: ''
    # -- Insert NG License String to enable NG license
    ng: ''
```

## Install the Helm chart

To use the charts, you must install Helm. To get started with Helm, go to the [Helm documentation](https://helm.sh/docs/). After you install Helm, follow the instructions below.

To install the Helm chart, do the following:

1. Add the repository.

   ```
   helm repo add harness https://harness.github.io/helm-charts
   ```

2. Create a namespace for your installation.

   ```
   kubectl create namespace <namespace>
   ```

3. Modify the `override.yaml` file with your environment settings.

4. Install the Helm chart.

   ```
   helm install my-release harness/harness-prod -n <namespace> -f override.yaml
   ```

## Verify the installation

After the installation completes, the services that were installed are enumerated with their status.

![](./static/install-harness-self-managed-enterprise-edition-using-helm-ga-00.png)

The services that appear depend on the modules that were installed.

To verify installation, do the following:

1. Review the list of services.
2. In your browser, type the following instruction:

   ```
   http://localhost/auth/#/signup
   ```

   If the installation was successful, the Harness **Sign up** page appears.

## Helm chart values

For details about the chart values, explanations of the default values, and descriptions of the fields, go to [https://github.com/harness/helm-charts#values](https://github.com/harness/helm-charts#values).

<!-- PR-1000 -->

## Next steps

After installation is complete, you should create the initial Harness account, and then [create organizations and projects](../../platform/organizations-and-projects/create-an-organization.md).

To get started with the modules, review the following topics:

* For Harness Continuous Integration, go to [CI pipeline basics](../../continuous-integration/ci-quickstarts/ci-pipeline-basics.md).
* For Harness Continuous Delivery & GitOps, go to [CD overview and key concepts](/docs/continuous-delivery/get-started/cd-pipeline-basics.md).
* For Harness Security Testing Orchestration, go to [STO Basics](../../security-testing-orchestration/onboard-sto/security-testing-orchestration-basics.md).
* For Harness Chaos Engineering, go to [Get started with Harness Chaos Engineering](/docs/category/get-started-with-harness-chaos-engineering-ce).
* For Harness Continous Error Tracking, go to [CET Tutorials](/tutorials/error-tracking/)
