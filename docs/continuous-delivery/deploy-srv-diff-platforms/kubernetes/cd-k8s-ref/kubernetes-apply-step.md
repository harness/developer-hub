---
title: Kubernetes Apply step
description: How to deploy independent workloads.
sidebar_position: 2
helpdocs_topic_id: xd6o61wp8u
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes settings for the Kubernetes Apply step.

The Apply step is used to deploy workloads outside of the primary and sidecar workloads of the deployment.

For example, you might want to deploy an additional resource only after Harness has verified the deployment of the main resources in the **Manifests** section.

For the topic on using the step, go to [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step).

## What workloads can I deploy?

Go to [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes) for more information.

## Rolling vs Apply

The following table lists the differences between the Rolling Deployment step (default in a Rolling strategy) and the Apply step (which may be used with any strategy).

|                             | **Jobs** | **Rollback** |
| --------------------------- | -------- | ------------ |
| **Rolling Deployment step** | No       | Yes          |
| **Apply step**              | Yes      | No           |

## Name

The name for the Apply step.

The step Id is automatically generated from the name and used to reference the step using its Fully Qualified Name (FQN), like `<+execution.steps.[step Id].name>`.

For example, if the step Id is **Apply**, the FQN for the step settings are:

- `<+execution.steps.Apply.name>`
- `<+execution.steps.Apply.spec.filePaths>`
- `<+execution.steps.Apply.spec.skipDryRun>`
- `<+execution.steps.Apply.spec.skipSteadyStateCheck>`
- `<+execution.steps.Apply.timeout>`

## Apply manifests from a remote source

### Demo Video

<!-- Video:
https://www.loom.com/share/492afdbb9cb8484980b6d1617830a399?sid=90c41fc9-a556-44e0-82e4-59206bbf493e-->
<DocVideo src="https://www.loom.com/share/492afdbb9cb8484980b6d1617830a399?sid=90c41fc9-a556-44e0-82e4-59206bbf493e" />

Harness provides two options for applying Kubernetes manifests:

- **Service Option**: When you configure from the service, you can provide a file path within the manifest source repository configured in the service definition.
- **Remote Option**: When you configure the remote option, you can provide a Harness Git connector, a repo location, and a file path to apply any kind of Kubernetes manifest. Harness allows you to provide a values.yaml as well for templating in the configuration.

When **Remote Manifest** is selected, you will see this in the logs:

```
Trying to fetch default values yaml file for manifest with identifier: [APPLY_STEP_MANIFEST_SOURCE_ID]

Fetching K8sManifest files with identifier: APPLY_STEP_MANIFEST_SOURCE_ID
Git connector Url: https://github.com/wings-software/PipelinesNgAutomation.git
Branch: tarun-test-3

Fetching following Files :
- k8s/manifests/k8s/basicManifests/templates/values.yaml
No values.yaml found for manifest with identifier: APPLY_STEP_MANIFEST_SOURCE_ID.

Fetching K8sManifest files with identifier: APPLY_STEP_MANIFEST_SOURCE_ID
Git connector Url: https://github.com/wings-software/PipelinesNgAutomation.git
Branch: tarun-test-3

Fetching following Files :
- k8s/manifests/k8s/basicManifests/values.yaml
Successfully fetched following files:
- k8s/manifests/k8s/basicManifests/values.yaml

Git Fetch Files completed successfully.

Starting Kubernetes Apply

Fetching K8sManifest files with identifier: APPLY_STEP_MANIFEST_SOURCE_ID
Git connector Url: https://github.com/wings-software/PipelinesNgAutomation.git
Branch: tarun-test-3

Fetching manifest files at path:
- k8s/manifests/k8s/basicManifests/templates
- k8s/manifests/k8s/basicManifests/simple-manifest-2/deployment.yaml
Successfully fetched following files:
- k8s/manifests/k8s/basicManifests/simple-manifest-2/deployment.yaml
- k8s/manifests/k8s/basicManifests/templates/deployment.yaml
- k8s/manifests/k8s/basicManifests/templates/service.yaml
- k8s/manifests/k8s/basicManifests/templates/namespace.yaml

...


kubectl --kubeconfig=config apply --filename=manifests.yaml
namespace/tarun-ng configured
secret/githubsdas configured
secret/githubsdas-dockercfg unchanged
configmap/githubsdas unchanged
service/githubsdas-svc unchanged
deployment.apps/githubsdas unchanged
deployment.apps/myapp-deployment-2 unchanged

Done.
```

## File Path Configuration for Service Option

Enter the path to a manifest file.

**File Path** has the following requirements:

- The path to the manifest for the Apply step must be subordinate to the path for the manifest in the **Manifests** section of the Service Definition. The manifest cannot be in the same folder as **Manifests**.
- The path must include the folder name and the file name.

In the following example, the path used in the **Manifests** section of the Service Definition is `default-k8s-manifests/Manifests/Files/templates/`. The **Apply** step uses a Job manifest in the subfolder `jobs/job.yaml`.

![](./static/kubernetes-apply-step-00.png)

You can enter multiple file paths in File Path. Simply click **Add file**

## Timeout

How long Harness should run this step before failing it. Enter a minimum of 10m to account for network activity in your target environment.

## Skip dry run

By default, Harness uses the `--dry-run` flag on the `kubectl apply` command during the **Initialize** step of this command, which prints the object that would be sent to the cluster without really sending it.

If the **Skip Dry Run** option is selected, Harness will not use the `--dry-run` flag.

## Skip steady state check

By default, Harness checks to see if a deployed workload has reached steady state.

If you select this option, Harness will not check that the workload has reached steady state.

## Skip K8s manifest(s) rendering

By default, Harness uses Go templating and a values.yaml for templating manifest files.

In some cases, you might not want to use Go templating because your manifests use some other formatting.

Use the **Skip K8s Manifest(s) Rendering** option if you want Harness to skip rendering your manifest files using Go templating.

For details, go to [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step).

## Advanced Settings

See the following:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

## See also

- [Add a Kubernetes Sidecar Container](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-kubernetes-sidecar-container)

## FAQ

### Where does the Harness Kubernetes Apply step run by default?

In a Kubernetes or Native Helm deployment type, the Apply step runs in the target cluster namespace specified in the Harness pipeline stage **Infrastructure** under **Environment**.

### How do I configure the Apply step to run in a different namespace then the one defined in the infrastructure definition?

Any namespace in the manifest you are deploying takes precedence over the namespace specified in the Harness stage **Infrastructure**.

You can use a values.yaml file to specify the namespace and reference it in the manifest.

In an Apply step, you can override this values.yaml and specify a different namespace for that particular Apply step.

### Can the Apply Step render empty manifest files?

No, the Kubernetes apply step cannot render empty files. This results in a step failure. The manifest needs to have complete and defined resources to apply.
