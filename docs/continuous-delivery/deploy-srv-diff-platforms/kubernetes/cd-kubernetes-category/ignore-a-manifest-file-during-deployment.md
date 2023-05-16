---
title: Ignore a manifest file during deployment
description: Apply manifests separately using the Harness Apply step.
sidebar_position: 5
helpdocs_topic_id: jyv7jbr8pg
helpdocs_category_id: qfj6m1k2c4
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to ignore manifests for the primary deployment and apply them separately using the Apply step.

You might have manifest files for resources that you do not want to deploy as part of the main deployment.

Instead, you can tell Harness to ignore these files and then apply them separately using the Harness [Apply step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step). Or you can simply ignore them and deploy them later.

## Before you begin

* [Add Kubernetes Manifests](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests)
* [Kubernetes Deployments Overview](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview)

## Visual summary

The following image shows how you can ignore a Jobs manifest and then apply it separately using the Apply step.

![](./static/ignore-a-manifest-file-during-deployment-17.png)

## What workloads can I deploy?

See [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes).

## Limitations

* Kubernetes objects and resources deployed by the Apply step are not versioned or rolled back automatically by Harness.

## Ignore a manifest

You add your manifest files to the stage's **Service** section in **Manifests**. You can add manifests individually or by simply adding their parent folder:

![](./static/ignore-a-manifest-file-during-deployment-18.png)

To ignore a resource file that is in the directory in the Service **Manifests** section, you add the comment `# harness.io/skip-file-for-deploy` to the **top** of the file.

For example, here is a ConfigMap file using the comment:

![](./static/ignore-a-manifest-file-during-deployment-19.png)

Now, when this Pipeline is run, this ConfigMap resource will not be applied.

The comment `# harness.io/skip-file-for-deploy` must be at the **top** of the file. If it is on the second line it will not work and the resource will be deployed as part of the main Workflow rollout.

## Apply ignored resource

The Apply step will apply any resource in a Service **Manifests** explicitly. You must provide the path and name of the file in **Apply**, and Harness will deploy the resource.

For details on the Apply Step, see [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step).

For example, the following image shows a Jobs resource in a Service **Manifests** section that uses the ignore comment `# harness.io/skip-file-for-deploy` so that the stage does not apply it, and the **Apply** step that specifies the same Jobs resource:

![](./static/ignore-a-manifest-file-during-deployment-20.png)

The **File Path** setting in the Apply step must include the folder name and the file name. In the above example, the folder **jobs** is included with the file name **job.yaml**: `jobs/job.yaml`.

The path in **File Path** must be relative to the path you specified for the manifest in the Service **Manifests** section. 

For example, if the path in **Manifests** is `default-k8s-manifests/Manifests/Files/templates` and the Job manifests is in `default-k8s-manifests/Manifests/Files/templates/jobs/job.yaml` you must enter `jobs/job.yaml` in **File Path**.

You can include multiple resource files in the Apply step **File Path** setting.

If you apply the ignore comment `# harness.io/skip-file-for-deploy` to a resource but do not use the resource in an **Apply** step, the resource is never deployed.