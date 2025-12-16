---
title: Converting your HSF installation to use Kubernetes
description: As new enhancements are released by the Harness team, your installation will require updates to receive the new capabilities and templates.  Additionally, there are some post-deployment tuning steps that will need to be done to adjust your implementation to suit your needs.
sidebar_position: 50
redirect_from: 
    - /kb/reference-architectures/hsf/htl/converting-to-kubernetes
---

1. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
2. Open the `Infrastructure` module and choose `Workspaces`
3. Find and select the `Harness Pilot Light` workspace
4. Navigate to the `Variables` tab and choose `OpenTofu Variables`
5. Edit `kubernetes_connector` to provide an existing Kubernetes connector reference. 
_**Note**: The connector will need to be scoped to the correct location where the connector exists. Prefix with `account.` or `org.` depending on its location._
6. Optionally add the following variables based on your target build infrastructure
    * `kubernetes_namespace` to modify the namespace into which the pods will be deployed
    * `kubernetes_serviceaccount` to modify the service account which the pods will be assigned
    * `kubernetes_node_selectors` to modify the node selector which the pods will user
    * `kubernetes_override_image_connector` to modify the image connector used to pull step images

:::note
If you specify a custom default image connector via `kubernetes_override_image_connector` you will need to make the following images avalible in your registry:

-   harnesssolutionfactory/harness-python-api-sdk:latest
-   harnesssolutionfactory/harness-cr-mirror-repositories:latest
-   harnesssolutionfactory/harness-token-rotation:latest
-   harnesssolutionfactory/harness-manage-iacm-workspace:latest
-   harnesssolutionfactory/harness-idp-resource-manager:latest
:::

_**Note**: Additional details around the various options and variables can be found in the `pilot-light` directory of the Harness Solutions Factory repository_

7. Navigate to pipelines
8. Run the pipeline `Manage Pilot Light` to apply the changes.

_**STOP**: Changing the Kubernetes connector in this workspace only modifies it for the core resources and does not change the underlying connection for the engine pipelines. After the pipeline `Manage Pilot Light` executes, continue these steps_

9. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
10. Open the `Infrastructure` module and choose `Workspaces`
11. Find and select the `Harness Solutions Factory` workspace
12. Navigate to the `Variables` tab and choose `OpenTofu Variables`
13. Edit `kubernetes_connector` to provide an existing Kubernetes connector reference. _**Note**: The connector will need to be scoped to the correct location where the connector exists. Prefix with `account.` or `org.` depending on its location._
14. Optionally, edit `kubernetes_namespace` to modify the namespace into which the pods will be deployed.

_**Note**: Additional details around the various options and variables can be found in the `solutions-factory` directory of the Harness Solutions Factory repository_

15. Navigate to pipelines
16. Run the pipeline `Deploy Solutions Factory` to apply the changes.