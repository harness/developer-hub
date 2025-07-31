---
title: Upgrading your Installation
description: As new enhancements are released by the Harness team, your installation will require updates to receive the new capabilities and templates.  Additionally, there are some post-deployment tuning steps that will need to be done to adjust your implementation to suit your needs.
---
As new enhancements are released by the Harness team, your installation will require updates to receive the new capabilities and templates.  Additionally, there are some post-deployment tuning steps that will need to be done to adjust your implementation to suit your needs.

## Upgrade your version of Harness Solutions Factory

1. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
2. Run the pipeline `Mirror Harness Official solutions Factory Repos`

    _**Note**: This pipeline will replicate the current released versions and changes from the Harness ISE team into your local repositories stored within your organization `Harness Platform Management`_
3. Run the pipeline `Manage Pilot Light` to implement the first phase of the update. This will update the core resources used by HSF
4. Run the pipeline `Deploy Solutions Factory` to finish the upgrade of the Solutions Factory engines.
5. Run the pipeline `Register IDP Templates` to synchronize the Harness Template Library workflows into your IDP installation

## Convert your HSF installation to use Kubernetes

1. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
2. Open the `Infrastructure` module and choose `Workspaces`
3. Find and select the `Harness Pilot Light` workspace
4. Navigate to the `Variables` tab and choose `OpenTofu Variables`
5. Edit `kubernetes_connector` to provide an existing Kubernetes connector reference. _**Note**: The connector will need to be scoped to the correct location where the connector exists. Prefix with `account.` or `org.` depending on its location._
6. Optionally, edit `kubernetes_namespace` to modify the namespace into which the pods will be deployed.

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
