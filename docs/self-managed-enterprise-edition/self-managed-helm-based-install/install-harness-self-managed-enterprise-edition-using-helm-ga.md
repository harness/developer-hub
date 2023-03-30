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

## Download the Harness Helm chart

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

<!-- PR-1002 -->
The Platform component and below module is enabled by default:

* Harness Continuous Deployment (CD) - Next Generation

The below Harness modules can be enabled or disabled conditionally: 

* Harness Continuous Integration (CI)
* Harness Security Testing Orchestration (STO)
* Harness Service Reliability Management (SRM)
* Harness Feature Flags (FF)

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

### Add a Harness license

Harness Self-Managed Enterprise Edition needs a license to be provisioned for the Harness NextGen platform. Please contact Harness Support to procure the license and add it to the override.yaml file.
```
  license:
    # -- Insert CG License String to enable CG license
    cg: ''
    # -- Insert NG License String to enable NG license
    ng: ''
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

## Verify the installation

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

<!-- PR-1000 -->
## Images for disconnected networks

If your cluster is in an air-gapped environment, your deployment requires the following images:

- docker.io/harness/gitops-service-signed:v0.62.4
- docker.io/harness/learning-engine-onprem-signed:66700
- docker.io/bitnami/minio:2022.8.22-debian-11-r0
- docker.io/bitnami/mongodb:4.4.15
- docker.io/bitnami/postgresql:14.4.0-debian-11-r9
- docker.io/harness/accesscontrol-service-signed:78001
- docker.io/harness/batch-processing-signed:78605-000
- docker.io/harness/cdcdata-signed:78426
- docker.io/harness/ce-anomaly-detection-signed:12
- docker.io/harness/ce-cloud-info-signed:0.22.0
- docker.io/harness/ce-nextgen-signed:78700-000
- docker.io/harness/ci-manager-signed:2804
- docker.io/harness/ci-scm-signed:release-114-ubi
- docker.io/harness/cv-nextgen-signed:78426
- docker.io/harness/dashboard-service-signed:v1.53.0.0
- docker.io/harness/delegate-proxy-signed:78312
- docker.io/harness/error-tracking-signed:5.14.2
- docker.io/harness/et-collector-signed:5.14.0
- docker.io/harness/event-service-signed:77317
- docker.io/harness/ff-pushpin-signed:1.0.3
- docker.io/harness/ff-pushpin-worker-signed:1.945.0
- docker.io/harness/ff-server-signed:1.945.0
- docker.io/harness/gateway-signed:2000149
- docker.io/harness/helm-init-container:latest
- docker.io/harness/le-nextgen-signed:67500
- docker.io/harness/looker-signed:23.2.31
- docker.io/harness/manager-signed:78426
- docker.io/harness/mysql:enterprise-server-8.0.32
- docker.io/harness/ng-ce-ui:0.26.3
- docker.io/harness/policy-mgmt:v1.49.0
- docker.io/harness/stocore-signed:v1.31.3
- docker.io/harness/stomanager-signed:79001-000
- docker.io/harness/telescopes-signed:10100
- docker.io/harness/ti-service-signed:release-149
- docker.io/harness/ui-signed:78400
- docker.io/harness/verification-service-signed:78426
- docker.io/ubuntu:20.04
- docker.io/harness/template-service-signed:78426
- docker.io/harness/ff-postgres-migration-signed:1.945.0
- docker.io/harness/ff-timescale-migration-signed:1.945.0
- docker.io/harness/helm-init-container:latest
- docker.io/harness/log-service-signed:release-18
- docker.io/harness/nextgenui-signed:0.339.19
- docker.io/harness/ng-auth-ui-signed:1.3.3
- docker.io/harness/ng-manager-signed:78426
- docker.io/harness/pipeline-service-signed:1.21.13
- docker.io/harness/platform-service-signed:78202
- docker.io/harness/redis:6.2.7-alpine
- docker.io/harness/ti-service-signed:release-149
- docker.io/timescale/timescaledb-ha:pg13-ts2.9-oss-latest
- docker.io/harness/ci-addon:1.16.4
- docker.io/harness/gitops-agent:v0.42.0
- docker.io/haproxy:2.0.25-alpine
- docker.io/redis:6.2.6-alpine
- docker.io/harness/delegate:latest
- docker.io/harness/upgrader:latest
- docker.io/harness/delegate:23.03.78312
- docker.io/harness/ci-lite-engine:1.16.4
- docker.io/bewithaman/s3:latest
- docker.io/harness/sto-plugin:latest
- docker.io/harness/upgrader:latest
- docker.io/curlimages/curl:latest

## Chart values

For details about the chart values, explanations of the default values, and descriptions of the fields, go to [https://github.com/harness/helm-charts#values](https://github.com/harness/helm-charts#values).


<!-- PR-1000 -->
