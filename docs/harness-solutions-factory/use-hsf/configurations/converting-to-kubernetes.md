---
title: Convert your HSF installation to use Kubernetes
description: Move your Harness Solutions Factory installation from Harness Cloud build infrastructure to your own Kubernetes build infrastructure.
sidebar_position: 50
redirect_from:
  - /kb/reference-architectures/hsf/htl/converting-to-kubernetes
  - /docs/harness-solutions-factory/configurations/converting-to-kubernetes
---

## When to use this

By default, HSF runs on Harness Cloud build infrastructure. Convert your
installation to use Kubernetes when any of the following apply:

- **You are standardizing CI/CD execution on Kubernetes** across your environment and want HSF's pipelines to run consistently with the rest of your infrastructure.
- **Your organization requires build infrastructure to run inside your own network** (VPC, on-prem cluster, etc.) rather than on Harness-hosted runners, for compliance or security reasons.
- **Your registry is not reachable from Harness Cloud.** If your private registry (for example JFrog, ECR, ACR) is only accessible from your internal Kubernetes network, pipelines that pull images, including the IaCM `harness_terraform_vm` image, fail on Harness Cloud regardless of which connector is configured at the Org or Project level. This is the most common reason customers need this conversion.

---

## Convert to Kubernetes

1. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
2. Open the `Infrastructure` module and choose `Workspaces`
3. Find and select the `Harness Pilot Light` workspace
4. Navigate to the `Variables` tab and choose `OpenTofu Variables`
5. Edit `kubernetes_connector` to provide an existing Kubernetes connector reference.
_**Note**: The connector will need to be scoped to the correct location where the connector exists. Prefix with `account.` or `org.` depending on its location._
6. Optionally add the following variables based on your target build infrastructure
    * `kubernetes_namespace` to modify the namespace into which the pods will be deployed
    * `kubernetes_serviceaccount` to modify the service account which the pods will be assigned
    * `kubernetes_node_selectors` to modify the node selector which the pods will use
    * `kubernetes_override_image_connector` to modify the image connector used to pull built-in steps images

:::note
If you specify a custom default image connector via `kubernetes_override_image_connector` you will need to make sure the Harness built-in images are moved to your registry as well. 

Go to [Override Image Connector](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md#override-image-connector) for more information. 
:::

:::note
Additional details around the various options and variables can be found in the `pilot-light` directory of the Harness Solutions Factory repository
:::

7. Navigate to pipelines

:::note Registry-restricted environments
If your private registry is only reachable from your internal
Kubernetes network, running the `Manage Pilot Light` pipeline as-is may fail.
This happens because IaCM pulls the `harness_terraform_vm` image using the
account-level `harnessImage` connector by default, regardless of any
Org-level Docker connector you have configured for HSF images. Harness Cloud
build infrastructure will not be able to reach a registry that is only
accessible from your internal network.

Before running the pipeline in the next step, manually edit the
`Manage Pilot Light` pipeline to use your Kubernetes-scoped connector for the
relevant image pull step(s). This ensures the pipeline can retrieve the
images it needs during the conversion itself.

If you are pulling from a private registry rather than Docker Hub, confirm
you have mirrored the current image versions listed above. Stale images in
your registry are a common secondary cause of failures at this step.
:::

8. Run the pipeline `Manage Pilot Light` to apply the changes.

_**STOP**: Changing the Kubernetes connector in this workspace only modifies it for the core resources and does not change the underlying connection for the engine pipelines. After the pipeline `Manage Pilot Light` executes, continue these steps_

9. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
10. Open the `Infrastructure` module and choose `Workspaces`
11. Find and select the `Harness Solutions Factory` workspace
12. Navigate to the `Variables` tab and choose `OpenTofu Variables`
13. Edit `kubernetes_connector` to provide an existing Kubernetes connector reference. _**Note**: The connector will need to be scoped to the correct location where the connector exists. Prefix with `account.` or `org.` depending on its location._
14. Optionally, edit `kubernetes_namespace` to modify the namespace into which the pods will be deployed.

:::note
Additional details around the various options and variables can be found in the `solutions-factory` directory of the Harness Solutions Factory repository
:::

15. Navigate to pipelines
16. Run the pipeline `Deploy Solutions Factory` to apply the changes.

:::note
If you are using custom internal certificates and see this error "[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Missing Authority Key Identifier", you will need to go into **both** Solutions Factory and Pilot Light workspaces and set `hsf_plugin_ssl_verify_x509_strict` to false and apply. 

This will still enforce certificates but not in strict mode.

Related: [Configuring a Kubernetes build farm to use self-signed certificates](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)
:::