---
title: Kubernetes General FAQs
description: Frequently asked questions about Kubernetes deployments.
sidebar_position: 800
---

This article addresses some frequently asked questions about Kubernetes deployments in Harness.

### I'm getting "Secret in version "v1" cannot be handled as a Secret: illegal base64 data at input byte".  What does it mean?

Kubernetes secrets need to be encoded with base64.  If the encoding is wrong you might get this error.  If you're creating a Kubernetes secrets and it's not base64 encoded, then you can use stringData instead. For more information, go to [Constraints on Secret names and data](https://kubernetes.io/docs/concepts/configuration/secret/#restriction-names-data).


### Can I encrypt the Token/Secret passed in the INIT_SCRIPT?

It cannot be encrypted directly but this can be achieved by creating the k8s secret for the credentials and referring them in the init script.

**example** -

``` aws_access_key=kubectl get secrets/pl-credentials --template={{.data.aws_access_key}} | base64 -d```
```aws_secret_key= kubectl get secrets/pl-credentials --template={{.data.aws_secret_key}} | base64 -d```

Another approach would be saving the value in Harness's secret manager/any other secret manager and referencing it in the script.
Check for more info in [Documentation](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets).


### The K8s delete command is not working with Native Helm?

The K8s delete command/step does not work with Native Helm deployment because Harness has different logic to maintain versioning and rollback for Native Helm and k8s. In the case of the Native Helm, if the deployment fails, we’ll uninstall it ourselves. However, if the user wants to pass some command flags with uninstall, that can be passed by selecting uninstall and passing the relevant command flags. 

Go to [Uninstall command flag](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#uninstall-command-flag) for more details.


### How do I run Helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment, you can leverage the shell script step and run the helm uninstall ```release-name``` command from the delegate onto the cluster.
To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate. 

For this use case within the shell script, you can simply reference credentials as $\{HARNESS_KUBE_CONFIG_PATH}.

```export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test```

With this, even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.


### In the Rollout Deployment step, how does Harness retrieve the events in the Wait for Steady State phase?

During the "Wait for Steady State" phase, Harness uses the ```kubectl rollout status``` command to retrieve information directly from the Kubernetes API server. Harness continuously polls the Kubernetes API server while a rollout is in progress, ensuring that it remains updated until the rollout is either completed or encounters an error.


### When migrating from FirstGen to NextGen, will the release number of ConfigMaps and Secrets be reset to 1?

In the case of migrating from Harness FirstGen to Harness NextGen, the numbering of `ConfigMaps` and `Secrets` in Kubernetes will not be automatically reset to start from 1 again. The numbering is based on the release history and is incremented based on the latest release number.

When you migrate your application to Harness NextGen and continue to use the same release name as before, the versioning will not be reset. Harness will fetch the `ConfigMap` in the cluster that stores all the Harness releases with their respective numbers. It will retrieve the latest release number from the `ConfigMap` and increment it by 1 for the next deployment. If versioning is enabled, Harness will append `-<release-number>` to each `ConfigMap`/`Secret` declared in the manifest.

Therefore, if you migrate to Harness NextGen and use the same cluster and release name, the release number will not break. The numbering will continue based on the existing release history.

It's important to note that Harness provides a declarative rollback feature, which eliminates the need for resource versioning. This means that even if you don't maintain the numbering scheme, you can still perform rollbacks effectively using the declarative rollback feature provided by Harness.

For more information, go to [Harness Declarative Rollback](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#declarative-rollback).


### If I delete an infrastructure definition after deployments are done to it, what are the implications other than potential dashboard data loss for those deployments ?

At the moment there is no dependency on the instance sync and infrastructure definition. Infrastructure definition is used only to generate infrastructure details. The instance sync is done for service and environment. Only in case if any these are deleted, the instance sync will stop and delete instances.

:::info

If you are using the default release name format in Harness FirstGen as `release-${infra.kubernetes.infraId}`, it's important to note that when migrating to Harness NextGen, you will need to replace `${infra.kubernetes.infraId}` with the new expression. In Harness NextGen, a similar expression `<+INFRA_KEY>` is available for defining release names. However, it's crucial to understand that these expressions will resolve to completely different values compared to the expressions used in Harness FirstGen.

:::


### Error when release name is too long.

In the deployment logs in Harness, you may get an error similar to this:

```
6m11s Warning FailedCreate statefulset/release-xxx-xxx create Pod release-xxx-xxx-0 in StatefulSet release-xxx-xxx failed error: Pod "release-xxx-xxx-0" is invalid: metadata.labels: Invalid value: "release-xxx-xxx-xxx": must be no more than 63 characters
```

This is an error coming from the kubernetes cluster stating that the release name is too long.  This can be adjusted in the Environments section.
1. Select the environment in question.
2. Select infrastructure definitions, and select the name of the infrastructure definition.
3. Scroll down and expand **Advanced**, and then modify the release name to be something shorter.


### How Kubernetes pruning option work during the deployment?

If you have enabled the Kubernetes pruning in your deployment, it will remove any resources that were present in old manifests that are no longer present in the manifest used for the current deployment.

For more details, go to [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/).


### Is on-demand token generation valid for both Vault's Kubernetes auth type and app role-based auth?

No, on-demand token generation is only valid for app role-based auth.


### Is there a configuration option to preserve more than two older release secrets and config maps in Kubernetes deployments?

No. Currently, there is no configurable option to increase the number of older release secrets and config maps that can be preserved. The number of stored releases are fixed.


### How is the release history stored for Kubernetes deployments?

If declarative rollback is used, the release history is stored in secrets. Otherwise, it is stored in a single config map or secret.


### Can I override some values in the Helm chart during the deployment of a service in Kubernetes?

Yes, you can override values in the Helm chart during the service deployment in Kubernetes.


### In the declarative rollback, it will rollback also the secrets and config maps used in the last successful execution and can we retain more than 2 older release secrets and config maps?

During rollback, Harness reapplies the previous manifest. This is the declarative method, and it includes the ConfigMap and Secrets of the last known good state. Harness uses a fixed limit of 2 in its release history cleanup logic. This value cannot be changed. 
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes).


### How do I add annotations to the canary deployment

Annotations can be added to canary deployment by following either of these methods:

1. Use apply step to create the canary ingress rule. We do support additional values.yaml override with apply step and this can be used for shifting the traffic, for example:
   1. Create ingress template/ingress-canary:
      ```
      nginx.ingress.kubernetes.io/canary: true nginx.ingress.kubernetes.io/canary-by-header: always nginx.ingress.kubernetes.io/canary-by-header-value: x-checkout-canary nginx.ingress.kubernetes.io/canary-weight: {{.Values.weight}} ```
 
   2. Using apply step, apply templates/ingress-canary with values.yaml content:
      ```weight: 10```
 
   3. To progress, using apply step, apply template/ingress-canary with values.yaml content:
      ```weight: n```

2. If weight is a constant value and having a loose ingress resource is not an issue then  declare both primary and canary ingress in the manifest that will be applied during both canary and primary deployment. Since there wouldn’t be any changes to the ingress rules itself then there shouldn’t be any effect if they are going to reapply canary ingress in the primary deployment.

Our recommendation is to use the first option, anyway harness doesn’t track ingress rules so by using apply step you don’t lose anything.


### How do I delete k8s resources which are part of the release?

During deployment Harness creates a ConfigMap listing the resources of the release and uses the release name for tracking them. The release name is defined in the Infrastructure settings, in Cluster Details, in Advanced.
 
If this config map is deleted or if the resource is not deployed via Harness then we delete step won't be able to find the given resources.


### How can we deploy a specific resource in a helm chart as part of rolling deployment?

If it is a Kubernetes/Helm, you can use an Apply Step
 
Please refer more on this in [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step/)
 
You can take a specific file from the manifest and execute it separately (before or after) the normal deployment.  To prevent the file from being included in the normal part of the deployment, you would include this ```# harness.io/skip-file-for-deploy``` at the top of the file.


### If declarative rollback is enabled, will it rollback secrets and configmaps or we need to enable versioning ?

No, Versioning is not done when declarative rollback is enabled. Please refer more on this in following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning/)


### Can I use Helm charts with Harness GitOps?

Yes, Harness GitOps supports Helm charts for defining and deploying Kubernetes applications. You can version-control Helm charts in your Git repository and use Harness to manage the deployment lifecycle.


### Can I use the Harness GitOps Agent with different Kubernetes distributions?

Yes, the Harness GitOps Agent is designed to work with various Kubernetes distributions, including managed Kubernetes services like Amazon EKS, Google Kubernetes Engine (GKE), and Azure Kubernetes Service (AKS), as well as self-managed Kubernetes clusters.


###  Do we have the export manifests option in NG like we have in CG?

No, we have a dry-run step, that will export manifest for customer to use in other steps, but there is no option to inherit manifest.Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-dry-run/)


### Service hooks for Kubernetes and Helm deployments to fetch Helm Chart dependencies. 

This is possible.

For more details please see: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks)



### 2 Deployments in pipeline, is it possible for me to rollback the stage 1 deployment if the stage 2 tests returned errors?

We do have a pipeline rollback feature that is behind a feature flag. This might work better as you would be able to have both stages separate, with different steps, as you did before, but a failure in the test job stage could roll back both stages.
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines)
  
Also, for the kubernetes job, if you use the Apply step instead of Rollout then the step will wait for the job to complete before proceeding, and you would not need the wait step.


### Harness rollback deployments. 

Harness Rollback deployments initiate a rollback of the most recent successful deployment. Rollback deployments are currently supported by the following deployment types only (Kubernetes, Tanzu Application Services, Amazon ECS)


### What is Kustomize, and how does it relate to Harness Next-Gen?
Kustomize is a Kubernetes-native configuration management tool that simplifies the customization of Kubernetes manifests. In Harness Next-Gen, Kustomize is used to manage and customize Kubernetes manifests for deployments.


### What are Kustomize overlays, and why are they useful?
Kustomize overlays are a way to customize and extend Kubernetes manifests without modifying the original base manifests. Overlays allow you to apply environment-specific configurations, such as namespace, labels, and resource limits, to the base manifests, making it easier to manage different environments (e.g., dev, test, prod) within a single repository.


### What is the deployment process for Kustomize-based applications in Harness Next-Gen?
When you deploy a Kustomize-based application in Harness, Harness will automatically apply the specified overlay based on the target environment, ensuring that the Kustomized Kubernetes manifests are deployed correctly.


### What are the benefits of using Kustomize manifest with Harness Next-Gen for Kubernetes deployments?
Using Kustomize with Harness simplifies the management of Kubernetes manifests by providing a declarative and version-controlled approach to customizations. It ensures consistency across environments and simplifies the deployment process.


### How do I dynamically load values.yaml per environment?
Many of Harness's fields allow you to switch from a static field to an expression field. In your Helm chart/kubernetes manifests declaration, you can switch the values field to an expression field and use an expression like `<+env.name>-values.yaml`. Then, in your repository, create a value per environment.


### What annotations can be applied in Harness?

Harness provides several annotations that can be applied to Kubernetes resources. Here are the annotations and their purposes:

1. `harness.io/skip-versioning: "true"`:
   - Purpose: Use this annotation when versioning of a resource is not required. Harness stores this information in a ConfigMap in your Kubernetes cluster.
   - Reference: [Kubernetes Versioning and Annotations](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels/)

2. `harness.io/direct-apply: "true"|"false"`:
   - Purpose: Set this annotation to "true" to make a manifest an unmanaged workload. This is useful for scenarios like Canary and Blue-Green deployments where you want to deploy additional workloads as unmanaged.
   - Reference: [What can I deploy in Kubernetes?](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/)

3. `annotations: harness.io/primary-service: "true"` and `annotations: harness.io/stage-service: "true"`:
   - Purpose: Use these annotations when you have multiple services, and Harness needs to identify the primary service. These annotations are commonly used in Blue-Green Deployments.
   - Reference: [Create a Kubernetes Blue-Green deployment](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/)

4. `harness.io/skipPruning: "true"`:
   - Purpose: Apply this annotation to ensure that a resource is not pruned. This is typically used for resources deployed by Harness to prevent accidental removal.
   - Reference: [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/)

These annotations help customize and control how Harness manages and deploys resources in your Kubernetes environment.


### Can customer control **Skip Harness label selector** or they need to be simply added ? 

No, Harness will automatically change behavior.
The expected behavior is as follows: In the scenario where a canary deployment is initially performed and subsequently switched to a rolling deployment for the same service and manifest, users will no longer encounter the selector error.
Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments/)


### Is there a way to get Canary Deployments to deploy resources that aren't Kubernetes Deployments?

No. The above feature on to manage cronjobs in next-gen is yet to come.


### Kubernetes deployment is failing with error Invalid request: Failed to get namespace/ConfigMap/release-releaseid
Looks like while trying to fetch the release configmap the command is failing try running the command directly to see the behaviour on delegate host
kubectl get pods -n namespace
kubectl describe configmaps release-releaseid



### What is one possible reason for implementing a delegate per namespace in a Kubernetes cluster, particularly when multiple teams are operating out of the same cluster and don't want to grant cluster-admin access to all teams?

One reason to have a delegate per namespace is when multiple teams work within the same Kubernetes cluster. It's not feasible to grant cluster-admin access to every team, so instead, they can use Kubernetes connectors on a per-namespace basis.

An alternative approach is to use read-only delegates with service account tokens and the cluster master URL. However, if long-lived tokens are undesirable, teams can opt for a delegate per namespace in their respective projects, with Kubernetes connectors that choose the right delegate selector.


### What is Harness GitOps?

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync the state with your live Kubernetes cluster.
For more details please see [here](https://developer.harness.io/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics/)


### How to get the kubeconfig that a kubernetes deployment runs with?

The kubernetes cofiguration can be accessed in the same stage the kubernetes deployment ran. To access the configuration we can set the kubeconfig with below environment variable configuration and run the corresponding kubectl commands:

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl get configmaps
```


### Can we skip manually creating the kubeconfig when using the native EKS deployment method in AWS, since we provide connection details in the AWS connector?

Yes, we do not need to create the kubeconfig file manually. We just need to have this binary installed on the delegate `aws-iam-authenticator`. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-elastic-kubernetes-service-eks)


### Is there a way to avoid using helm template command in kubernetes helm deployment?

For kubernetes helm we will always run the template command as this is how we get the rendered manifest. The workflow using kubernetes helm perform the final deployment using the rendered manifest and kubectl commands.
 
If we do not want to use template command we need to be using native helm type of deployment.


### Can one deduce that the objective involves fetching files from S3 for deployment in this scenario?

Yes, one can try to use a service deployment and use our `Custom Remote Manifest Option` to fetch it.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-custom-remote-script-and-manifests/)


### Every time when I run kubernetes deployment, harness create new version of configmap even of there were no changes which force pods redeployment. Is there a way to specify for harness to create new configmap only when changes detected?

You can skip the versioning, it can be skipped by using these two ways:
 
1. Annotate the manifest provided in the Harness service's Manifests section with harness.io/skip-versioning: "true".
 
2. In the Harness service's Manifest Configuration page, select Manifests > Advanced, and then select the Skip Versioning checkbox.


### How to create an AWS connector using aws-iam-authenticator on EKS Cluster with webIdentityToken ?

Please read how to set AWS connector on EKS Cluster in this [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-elastic-kubernetes-service-eks)
Also, to align with AWS changes, it's important to note that the previous method of accomplishing this task has been deprecated in `kubectl version 1.21`. To address this, when utilizing the `Iam-authenticator plugin`, it is necessary to create a `Fargate profile` as part of the updated procedure.


### Is it possible to get a KUBECONFIG file in a shell script within Harness for K8s connectors ?

Yes, we have it documentated for the steps. Please refer to the following documentations on [Shell script include infrastructure](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#include-infrastructure-selectors) and [Shell script run K8s](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#running-kubernetes-commands-in-the-shell-script)


### What is the oldest version of kubernetes we support for the delegates for firstgen and nextgen ?

Oldest Kubectl Client version being used is `1.16`. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations/)


### We want our helm deployments through Harness to wait for the objects to be in the ready state and then only exit with status. Currently, it is executing helm upgrade and exiting but we wanted to run something like this: helm upgrade --install --atomic --timeout 20m \<release_name> \<chart_name> How can we do this with Harness?

Using --atomic and --timeout flags to the Helm command in the "Command" field of the "Helm Deployment" step. This should work to ensure that the deployment waits for the objects to be in the ready state and then exits with status.
 
However, please note that the --timeout flag specifies the time to wait for any individual Kubernetes operation (like creating a pod or service) to complete, not the time to wait for all objects to be in the ready state. So if you have a large number of objects to deploy, you may need to increase the timeout value accordingly.
 
Also, please make sure that your Helm chart includes the necessary readiness probes for your objects to be considered ready by Kubernetes. Harness will wait for the readiness probes to pass before considering the deployment successful.


### How does Harness GitOps ensure consistency between the desired state of infrastructure and its actual state?

Harness GitOps ensures consistency between the desired state of infrastructure and its actual state by continuously monitoring the desired state in Git and syncing it with the live state in the Kubernetes cluster using an operator. 

This ensures that the target state (cluster) is continually converged with the desired state (manifests), making the deployed applications and infrastructures fully-traceable and fully-versioned artifacts.


### How the order or precedence of file in the k8sdeploy component is used when multiple values yaml were used.
When using multiple values YAML files in Harness Kubernetes Services, the highest priority is given to the last file, and the lowest priority to the first file.


### Kubernetes Delegate Step Requires Service as Input

The K8s Delete Step requires a Service because it's configured in a deploy stage. The user needs to provide a service and Harness can delete the namespace, the release name, or a manifest file associated with the Service


### Do we have any Harness disaster recovery documentation for our internal process ?

Yes, Harness ensures disaster recovery with SaaS infrastructure spanning us-west1 and us-west2, featuring two Kubernetes clusters for seamless failover in case of GCP outage, connected to managed and external data services.
Please read more on the following in documentation on [Harness SaaS Architechture](https://developer.harness.io/docs/harness-cloud-operations/harness_saas_architecture/)


### Can we apply any Kubernetes Manifest without a Harness Kubernetes Service ?

Yes, One can apply any Kubernetes Manifest without a Harness Kubernetes Service . Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/#apply-manifests-from-a-remote-source). Also consider watching this video based on use case [here](https://www.loom.com/share/492afdbb9cb8484980b6d1617830a399?sid=8fc34aec-009c-491a-85f5-ffd5e062e4d0)


### How is a Helm Command Template different from a Helm Chart?

While a Helm Chart is a package of pre-configured Kubernetes resources, a Helm Command Template in Harness is designed specifically for executing Helm commands within a deployment.


### Can an environment have multiple infrastructure definitions?

Yes, an environment can contain multiple infrastructure definitions, each representing a specific VM, Kubernetes cluster, or target infrastructure. When selecting an environment in a pipeline, you can choose from these definitions.


### What is the proper method for constructing a Harness pipeline to execute a rolling restart of a service, analogous to the kubectl rollout restart deployment deploymentName command ?

Harness uses `patchManifest` stage type with `LAST_ROLLOUT = now()` in Spinnaker to achieve it today. Please read more on this in the Spinnaker [Documentation](https://spinnaker.io/docs/guides/user/kubernetes-v2/patch-manifest/)


### Is it necessary to associate the IAM (Identity and Access Management) with the Service Account (SA) for Kubernetes ?

Yes, it is required. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-elastic-kubernetes-service-eks)


### Why the pipeline gets failed with message **deployment exceeded it's progress deadline**?

When we deploy any workload in ouir kubernetes deployment after the deployment is done we run the wait for steady step during which we check for the status of the deployment done in kubernetes with help of kubectl command. If the command is not returning anything and it exceeds the task run time threshold on kubernetes we see this error message. Also as we were unable to confirm the status of the deployment due to above failure we mark the deployment as failure as well.


### How can one add custom certs using with custom truststore for delegate version later than 23.10.81202?

To add custom certificates for a Docker, Kubernetes, or Helm delegate with an immutable image type version later than 23.10.81202, you can follow these steps:

- Prepare the custom cert file(s). Certificates must be in PEM format
- Mount the file(s) to the /opt/harness-delegate/ca-bundle/ directory inside the delegate container
- Start the delegate with the root user

Please read more on this in the follwing [Documenatation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/#install-with-custom-certificates)


### Is it considered an error when using helm template "--show-only templates/secret.yaml my-chart" results in an empty manifest, even though the template exists, and how can one prevent or handle this error message ?

It will be feasible for them to consider adding a line at the top of their manifests to prevent rendering to be empty when using helm template `--show-only`. This approach would not only address the error but also provide the advantage of skipping these objects during deployment. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/ignore-a-manifest-file-during-deployment/#ignore-a-manifest)



### Does Harness provides drift detection for k8s non-gitops pipelines ?

No, this feature is still under development and not yet supported. We hope to deliver this soon !


### Do we need to add the SecurityContext for installing custom certs?

If you are already running the delegate as the root user, then this setting is not required. By default, if fsGroup is not set, Kubernetes will mount files with user=root and group=root. In this scenario, only the root user can read the file. Setting fsGroup to 1001 allows a non-root user to read the file. When starting a delegate without running as root and also setting fsGroup to 1001, the delegate can import certs into the Java trust store but is unable to import them into the underlying OS.


### What is the default release name used for k8s/helm dploymenet done via Harness pipeline?

The default release name is ```release-<+INFRA_KEY_SHORT_ID>```


### Why my Kubernetes rollout is replacing all pods from the old version without waiting for the new version to surge?

During a rollout, Harness does not change the behavior of how Kubernetes kills and starts pods. This depends on the strategy defined in the maxSurge and maxUnavailable attributes. Please, read Kubernetes documentation for more information.


### Why am I seeing this alert “No values.yaml found for manifest” in my deployment?

When deploying a Kubernetes application type, the system checks for a ```values.yaml``` file as part of the manifest, similar to how Helm evaluates its default values file. If you receive the alert ```no values.yaml found for manifest```, it simply means that your manifest doesn't include a ```values.yaml``` file. This file is not mandatory, and the alert is harmless.


###  If the Delegate uses a KubeConfig if we are leveraging KubeCTL, where is the KubeConfig stored on the Delegate on using Terraform ?

One may use the command : `export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}`. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#kubernetes-deployment-expressions)


### What is the recommended approach for implementing Terraform dynamic provisioning of infrastructure, specifically in relation to creating the Terraform file without the `kube_config` specification ?

The recommended approach for utilizing Terraform dynamic provisioning of infrastructure involves creating the Terraform file without including the `kube_config` specification. This practice ensures a more effective implementation of Terraform for dynamic infrastructure provisioning.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#kubernetes-deployment-expressions)


### What limitations in Go template rendering of manifests compared to Helm have been identified, and how has the decision been made to address this issue by running it as a Helm job ?

Helm template can render the manifests but Go template cannot. There are limitations in the go template. One may run it as a helm job.
**Note**
- In case of Helm template and application of network policy update with usage of Blue-Green or Canary deployments, please try to run the apply step and apply the network policies before deploying
  Please read more on Apply Step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/)


### What is the cutover strategy for canaries when the labels are immutable and the deployment pre-exists ?

Please follow below mentioned steps as a work around:
- deploy same version using Canary with name: `<name>-temp`
- delete deployment `<name>`
- deploy same version using Canary with name: `<name>`
- delete deployment `<name>-temp`
Deletion can be done manually with `kubectl`, or as a one-off in a Harness pipeline.


### In a Helm deployment with custom certificates, what is essential regarding DNS-compliant keys? ? How should delegates be restarted after modifying the secret for changes to take effect ?

Please follow below suggestions:

- Ensure that the secret containing custom certificates adheres strictly to DNS-compliant keys, avoiding underscores primarily. Following any modification to this secret, it is imperative to restart all delegates to seamlessly incorporate the changes.
- Helm Installation Command:
```sh
helm upgrade -i nikkelma-240126-del --namespace harness-delegate-ng --create-namespace \
  harness-delegate/harness-delegate-ng \
  --set delegateName=nikkelma-240126-del \
  --set accountId=_specify_account_Id_ \
  --set delegateToken=your_Delegatetoken_= \
  --set managerEndpoint=https://app.harness.io/gratis \
  --set delegateDockerImage=harness/delegate:version_mentioned \
  --set replicas=1 --set upgrader.enabled=true \
  --set-literal destinationCaPath=_mentioned_path_to_destination \
  --set delegateCustomCa.secretName=secret_bundle
```
- CA Bundle Secret Creation (Undesirable):
```sh
kubectl create secret generic -n harness-delegate-ng ca-bundle --from-file=custom_certs.pem=./local_cert_bundle.pem
```
- CA Bundle Secret Creation (Desirable, no underscore in first half of from-file flag):
```sh
kubectl create secret generic -n harness-delegate-ng ca-bundle --from-file=custom-certs.pem=./local_cert_bundle.pem
```
Please read more on Custom Certs in the following [Documentation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/)


### Step group variables not accessible between steps using stepGroup expression in container step

The Container Step creates its step group with the Init and Run steps during pipeline execution. The reason why the container step creates its own Step Group is, that the additional Init Step is needed to create a build pod with containers.

Since the inner container step group is created, the ```<+stepGroup>``` expression in the Container Step script refers to the inner step group, not to the outer Deployment Dry Run group. Hence, we can’t use ```<+stepGroup>``` in the container step to access the outer step group steps.

We need to use the following expressions to get the Deployment Dry Run group steps identifiers/names in the Container Step,

Get Deployment Dry Run step identifier:

```
<+execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.identifier>
or,
<+pipeline.stages.Test_Policy.spec.execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.identifier>

Get Deployment Dry Run step name:

<+execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.name>
or,
<+pipeline.stages.Test_Policy.spec.execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.name>
```


### Conditional service overrides or manifest overrides?

You can override at environment level:
https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-and-override-values-yaml-files
 
So you can create multiple yaml file and can use expression in yaml path to resolve correctly.
 
You can also override at runtime:
https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-and-override-values-yaml-files#override-values-at-runtime


### How does rollback works if there are any configuration related changes like change in env variable between earlier version and current version?

This will depend on your deployment type. Let's suppose you're using Kubernetes. As mentioned in the response to the first question, we're going to revert all the manifests that were changed using a declarative approach or the standard approach (Kubernetes default).
 
For example:
Declarative approach: kubectl apply -f (prevision version of manifest) instead of kubectl rollout undo
Standard: kubectl rollout undo
 
To enable declarative rollback, configure the Harness service options. These options are defined in the service because they are tied to the service's manifests.


### How to delete a job after its execution is complete?

You can add a shell script to check the job status before executing the Kubernetes Delete. To run kubectl commands, it's required to use the Harness Kubeconfig as an environment variable. Here's an example script for guidance:

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl wait --for=condition=complete job/myjob -n <+infra.namespace>
```


### Which command does Harness use to apply the manifests during a blue-green deployment?

We use a kubectl command similar to the one below: `kubectl --kubeconfig=config apply --filename=manifests.yaml --record`


### Can we utilise kubernetes pruning for kubernetes helm deployments?

Kubernetes helm deployments are similar to native kubernetes deployment once the template is rendered from the helm chart. Hence we can take advantage of the pruning functionality for the templates which we want to remove if not present in the rendered manifest template.


### Can we see the commit associated with the manifest harness pulls for a k8s deploy step ?

To fetch manifest commit id in service one can use the [expression](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables) `<+manifest.MANIFEST_ID.commitId>`. One can also go through delegate logs for morew suitable requests.


### Is there a method to execute `K8sBlueGreenStageScaleDown` across various stages within the deployment ? 

Yes, Harness supports execution of `K8sBlueGreenStageScaleDown` step in one stage with deployment in other.
Please find a suitable example in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/#add-the-execution-steps)


### Does Harness support Kubernetes traffic shifting for Istio ?

Yes, Kubernetes Traffic Shifting Support for Istio and other Open Source Service Mesh Providers
- One can now integrate with istio and generic service mesh interface providers like flomesh
- One can perform traffic shifting for Blue Green and Canary Deployments
- One generate the configuration for traffic shifting on the fly or you can bring your own traffic shifting definition

This feature is provided behind the `FF: CDS_K8S_TRAFFIC_ROUTING_NG`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/traffic-shifting-step/)


### Is there a method to configure the Harness GitOps agent auto updater to utilize our Artifactory proxy for Docker Hub, considering policy of not allowing Kubernetes clusters to access the public internet directly ?

Organizations can import the GitOps Image from the specified [Docker Hub repository](https://hub.docker.com/r/harness/gitops-agent/tags) into their JFrog Artifactory. However, utilizing the auto updater feature may not be feasible in this scenario. Nonetheless, manual copying of the image to the Artifactory and subsequent pulling from there remains an alternative approach.
Please read more on Harness GitOps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/)


### What is the impact on Kubernetes deployments when it comes to the immutability of labels?

Kubernetes labels are immutable. If a specific deployment object already exists in the cluster, you cannot change its labels.
- If the deployment object already exists before the Harness deployment, it might conflict with the default Harness Kubernetes canary deployment due to the use of the label `harness.io/track`.
- If you are deploying different Harness deployment objects to the same cluster, you might encounter a selector error.
Please read more on this in the following [Documentation on Invalid value LabelSelector](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments/)


### What are the constraints regarding Kustomize build commands within Harness, specifically in terms of supported commands and their functionality ?

Harness supports the Kustomize `build` command only. The Kustomize `build` command builds a kustomization target from a directory or URL.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/use-kustomize-for-kubernetes-deployments#limitations-1)


### What specific role does the **Add Deployment Repo Manifest** serve within the manifests for a Kubernetes service enabled with GitOps functionality?

The `Add Deployment Repo Manifest` primarily serves as a means to access additional repositories within the PR Pipeline. While the Release Repo is utilized directly by the pipeline, the Deployment Repo facilitates the retrieval of information from another repository, enhancing the pipeline's functionality and flexibility


### Is it normal for the k8sdelete step with the release name option to delete only specific entities, unlike helm uninstall, when the chart was initially deployed using the native helm option?

The current behavior is as expected. Initially, only Kubernetes delete with the release name label was supported. However, a feature request has been made to support Helm uninstall or delete, which would be a separate type of step.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources/)


### Does Harness support deleting a Service and automatically removing associated resources from Kubernetes?

Yes, Harness initially considered the request, but it was ultimately rejected. The majority of our users prefer to manage their Kubernetes clusters' cleanup processes independently. Uniformity across the platform is crucial, and introducing special actions within the delete service feature was deemed inappropriate. Instead, users can utilize a Kubernetes delete step by providing the manifest YAML or objects for cleanup, which aligns with current practices. For customers seeking cloud and infrastructure management capabilities, alternative solutions can be explored, such as those available through platforms like Spinnaker, which offer dedicated cloud management features.


### what is a stateful set

Stateful Blue-Green Deployment in Kubernetes is a method of updating applications in a way that reduces downtime and ensures data consistency, especially for applications that store data or have stateful components like databases [Doc] (https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/)


###  How to ensure a stage with a step group appears before a stage with a deployment of kubernetes

You can create a OPA policy to ensure this.


### What is ingress.yaml used for?

An ingress.yaml file in Kubernetes serves as a configuration blueprint for managing Ingress resources, which control external access to services within the cluster. These files contain settings defining rules for routing incoming HTTP and HTTPS traffic based on specified criteria such as hostnames and URL paths. Typically structured in YAML format, an ingress.yaml file outlines how requests from external sources are directed to different services within the Kubernetes cluster. This includes specifying which services handle traffic for particular hostnames or paths, along with any necessary configurations such as load balancing or SSL termination. In essence, ingress.yaml files provide a way to centrally manage and define the ingress behaviour for applications running in a Kubernetes environment, facilitating efficient routing and external access control.


### We need an option of kubectl replace command in kubernetes Rolling Deployment?

Currently, this feature is not available in the Harness Platform but there is an enhancement request for this in the [Harness ideas portal](https://harness-io.canny.io/continuous-delivery/p/need-an-option-of-kubectl-replace-command-in-kubernetes-rolling-deployment).


### What is the recommended way to name Kubernetes jobs in Harness pipelines when using Rolling Deployment and native Helm deployment for the same chart?

When deploying Kubernetes jobs in Harness pipelines, especially when utilizing Rolling Deployment alongside native Helm deployment for the same chart, it's essential to adopt a consistent naming convention for jobs to ensure successful tracking and management. While applying a unique suffix such as `{{ now | unixEpoch }}` can facilitate parallel job execution during Rolling Deployment, it can lead to tracking issues when Helm renders the chart with a different job name.

The recommended approach is to use a naming convention that accounts for both scenarios.

For Rolling Deployment, maintaining a unique suffix like `{{ now | unixEpoch }}` is suitable.

For Native Helm deployment, it's advisable to utilize a name that remains consistent across deployments, such as `job-migration-db-{{ .Release.Revision }}`.


### Why does a variable of type string get converted to an octal equivalent when passed to the manifest?

A variable that is of string type might be getting converted to an octal equivalent when being passed to a kubernetes manifest. Example: The variable `020724`  would be passed through as `8660`.

The go templating is converting to the octal equivalent if the numerical input starts with 0 before applying them to the cluster. Adding double quotes around the JEXL in the values.yaml file shall preserve the actual value (Example: `"<+pipeline.variables.date>"`).


### Why am I getting UPGRADE FAILED when trying to deploy my Helm Chart?

```
Error: UPGRADE FAILED: unable to build kubernetes objects from current release manifest: resource mapping not found for name: "$RESOURCE_NAME" namespace: "" from "": no matches for kind "HorizontalPodAutoscaler" in version "autoscaling/v2beta2" ensure CRDs are installed first
```

This error happens if you have recently upgraded your Kuberenetes Cluster without ensuring that your Helm Releases' API Versions are supported in the new Kubernetes Cluster version. When attempting to upgrade them after, Helm will throw the above error due to the deprecated API no longer existing in the current Kubernetes Cluster. To fix this, you'll need to upgrade the API Version on the Helm Release manually by following the steps in the [Helm Documentation](https://helm.sh/docs/topics/kubernetes_apis/#updating-api-versions-of-a-release-manifest).

To avoid this in the future, please make sure to perform any Helm Release upgrades prior to upgrading your Kubernetes Cluster. A detailed list of deprecated and supported Kubernetes APIs can be found in the [Kubernetes Documentation](https://kubernetes.io/docs/reference/using-api/deprecation-guide/).


### Does Harness support Helm hooks (excluding service hooks) similar to the support provided in First Gen?

No, Harness does not support Helm hooks in Kubernetes deployments in the same way as in First Gen.

The recommended approach in both First Gen and NextGen is to remove Helm hooks and integrate them as shell script steps within the workflow. This method is applicable in both generations of Harness.

For unchanged utilization of Helm hooks, native Helm deployment can be chosen. However, native Helm's ability to process hooks and deploy simultaneously is limited. This limitation stems from Helm's post-render functionality, which prevents Harness from processing hooks effectively.

For detailed instructions on integrating Helm charts in Kubernetes deployments with Harness, please refer to the Harness [documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/kubernetes-deployments/use-helm-chart-hooks-in-kubernetes-deployments/).


### Why aren't my old Kubernetes Resources not deleted when deploying a new version?

By default Harness does not remove resources from previous deployments. If you would like Harness to remove the older resources, you will need to enable the `Enable Kubernetes Pruning` option under the Optional Configuration in either the `K8sRollingDeploy` or `K8sBlueGreenDeploy` step.

For detailed instructions on how this functionality works, please check out the Harness documentation - [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/)



### Why am I getting a Forbidden error in the Harness console?

```
INFO 3/15/2024, 1:56:45 PM Starting job to create pod harness-pod-1234567 on harness namespace
ERROR 3/15/2024, 1:56:45 PM failed to watch pod event: Forbidden
```

This error occurs if the delegate doesn't have `get` permissions for pod events. To fix this, review the Role/ClusterRole bound to the delegate's Service Account and ensure that the proper permissions are specified. More information about our recommendation for Delegate Role Based Access Control in Kubernetes can be found in [Deploy using a custom role](https://developer.harness.io/docs/platform/delegates/install-delegates/overview/#deploy-using-a-custom-role).


### How do I adjust the kubectl rollout command in Harness?

You can export kubeconfig and can run the kubectl command manually by using the shell script step


### How do I get the logs from a Kubernetes job deployed via Helm?

You can view the detailed logs for the command applied (with manifest applied and status) in Execution. To view logs after deployment, use shell script and run the `kubectl logs` command after exporting kubeconfig.


### Can I run a containerized step group on a self-managed VM or local infrastructure?

No, containerized step group can only run on Kubernetes infrastructure.


### Can I pass a list or array to a path field in a Kubernetes Manifest?

Currently, to pass a list or array to a path field, you'll must enable the feature flag `CDS_ENABLE_NEW_PARAMETER_FIELD_PROCESSOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Once enabled, you can add an array to a path field in a Kubernetes Manifest by:

1. Creating a stage variable containing your list or array contents, such as `path1,path2,path3`.
2. Passing the array to the manifest by using the following expression:

   ```
   <+<+stage.variables.VARNAME>.split(",")>
   ```


### Can we use a Kubernetes connector to get the Kubernetes context in a shell step?
It is not possible currently to get the Kubernetes context from Kubernetes connector. If it is part of K8s deploy stage we have a option to use the kubeconfig created for the deploy stage, but we can not directly use the Kubernetes connector to get the kubeconfig and use it in the shell step.


### Why is my rendered manifest truncated in the logs?
We have a log limit for each log line. As the manifest entry is part of the a single log-line, if the manifest goes beyond the log line threshold it gets truncated.

You can access the full rendered manifest through manifests.yaml or kubernetes-dry-run-manifests.yaml using service hooks.
 
Below is example of a service hook command, you can add it as a post hook to template or pre hook to wait for steady state:
```
cp /opt/harness-delegate/repository/k8s/*/manifests-dry-run.yaml /opt/harness-delegate/test.yaml
```


### Why does my K8s deployment time out in 10 minutes while in **wait for steady state** when the step timeout is higher? 
This timeout is from the Kubernetes event check for steady state. Kubernetes listens for the event after the deployment to confirm if the rollout has been success or not. 
After its own threshold crosses it errors out with the below:
```
deployment spelling-grammar-llm-service-deployment exceeded its progress deadline
```
 
Therefore, we also consider it a failure and fail the pipeline as soon as Kubernetes throws the above error. You will need to check the application log for the pods on why they are not coming up within the specified threshold.


