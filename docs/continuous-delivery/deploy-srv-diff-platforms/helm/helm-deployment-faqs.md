---
title: Helm Deployment FAQs
description: This topic lists some FAQs related to Native and Harness managed Helm deployment
sidebar_position: 6
---

This article addresses some frequently asked questions about Helm and Native Helm deployments in Harness.

### How can I deploy a specific resource in a Helm chart as part of Harness managed Helm rolling deployment?

If it is a Helm deployment managed by Harness, you can use an Apply Step.

You can take a specific file from the manifest and execute it separately from the normal deployment (before or after). To prevent the file from being included in the main part of the deployment, you include `# harness.io/skip-file-for-deploy` at the top of the file.

### How do I run a Helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment, you can leverage the Shell Script step and run the `Helm uninstall release-name` command from the delegate onto the cluster. To run the shell script onto the required cluster, you need to specify the Kubernetes cluster credentials for the delegate.

For this use case, within the shell script, you can simply reference credentials as `${HARNESS_KUBE_CONFIG_PATH}`:

`export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test`

With this method, even when running the shell script on the delegate host, it can refer to the credentials of the Kubernetes cloud provider used inside the infrastructure definition associated with the workflow.

### Can I override some values in the Helm chart during the deployment of a service in Kubernetes?

Yes, you can override values in the Helm chart during the service deployment in Kubernetes.

### How can I use values files to override Helm chart values during deployment?

You can define your input values in separate files, known as values files. These files can be stored and optionally tracked in Git. Harness allows you to specify these values files in the Harness service definition used during the deployment.

### What is the advantage of using values files over the '--set' option for Helm chart overrides?

Using values files provides a more organized and maintainable way to manage overrides in Helm charts. It is considered a best practice, and it allows you to easily track and version your input values for deployments.

### Does Harness have cache layer for the Helm chart repo index during deployment steps?

Harness uses a caching mechanism to create a cache folder (based on the Harness connector Id) and store the repositories.yaml file.

### How can we access the Helm repo name from the Helm connector?

Harness does not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in a Harness custom deployment template.

For normal usage Harness can make an API call to get the connector details and get the repo name from the "HelmRepoUrl" attribute.

### Can I use Helm charts from public repositories like Helm Hub with Harness?

Yes, you can use Helm charts from public Helm repositories like Helm Hub. Harness allows you to specify the Helm repository URL and chart version when configuring your deployment.

### Is it possible to use Helm hooks in Harness Helm deployments?

Yes, you can use Helm hooks in Helm deployments managed by Helm. This is available via the **Native Helm** service type.

Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process.

### What are deployment failed because the release name was invalid errors?

The "invalid release name" error is due to the length of the release name exceeding the maximum limit of 53 characters.

This limitation is imposed by [Helm](https://Helm.sh/docs/chart_template_guide/getting_started/#adding-a-simple-template-call).

To resolve this issue, please ensure that your release name falls within the 53 character range.

You can achieve this by using the following expression in **Release Name** to shorten the release name: `<+<+INFRA_KEY>.substring(0,7)>`.

### Troubleshoot 401 Not Authorized issue with Helm connector.

First, ensure the credentials that you have passed to the Helm HTTP or OCI connector are still valid.

You can also `exec` into your Harness Delegate and run the `Helm repo add` command on the delegate to manually fetch the repo to see if the delegate can pull it.

### The K8s delete command is not working with Native Helm.

The K8s delete command/step does not work with Native Helm deployment because Harness has different logic to maintain versioning and rollback for Native Helm and k8s. In the case of the Native Helm, if the deployment fails, we’ll uninstall it ourselves. However, if the user wants to pass some command flags with uninstall, that can be passed by selecting uninstall and passing the relevant command flags. 

Go to [Uninstall command flag](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts/#uninstall-command-flag) for more details.


### How do I run Helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment, you can leverage the shell script step and run the Helm uninstall ```release-name``` command from the delegate onto the cluster.
To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate. 

For this use case within the shell script, you can simply reference credentials as $\{HARNESS_KUBE_CONFIG_PATH}.

```export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test```

With this, even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.


### How release: \{\{ .Release.Name }} help in steady state check in Helm deployment?

We perform a pod fetch based on this label, which allows us to show the deployed pods in the step output and also track the same for instance sync. If we don't add these, both won't work as expected.

For more details, go to [Steady state check](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/native-Helm-quickstart/#spec-requirements-for-steady-state-check-and-versioning).


### Can I override some values in the Helm chart during the deployment of a service in Kubernetes?

Yes, you can override values in the Helm chart during the service deployment in Kubernetes.


### How can I use the values files to override Helm chart values during deployment?

You can define your input values in separate files known as values files. These files can be stored and optionally tracked in Git. Harness allows you to specify these values files in your service definition, which will be used during the deployment.


### What is the advantage of using values files over '--set' option for Helm chart overrides?

Using values files provides a more organized and maintainable way to manage overrides in Helm charts. It is considered a best practice, and it allows you to easily track and version your input values for deployments.


### Why it is that you cannot use OCI Helm registries with Helm Chart triggers?
OCI Helm does let us poll the repository for changes, we can get a list of chart versions, but we cannot poll and detect a new version. This capability hasn't been built by OCI Helm


### Does Harness have cache layer for the Helm chart repo index during deployment steps?

We have a caching mechanism where we create a cache folder (based on connectorID) and store the ```repositories.yaml``` file there.


### How can we deploy a specific resource in a Helm chart as part of rolling deployment?

If it is a Kubernetes/Helm, you can use an Apply Step
 
Please refer more on this in [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step/)
 
You can take a specific file from the manifest and execute it separately (before or after) the normal deployment.  To prevent the file from being included in the normal part of the deployment, you would include this ```# harness.io/skip-file-for-deploy``` at the top of the file.


### Can I use Helm charts with Harness GitOps?

Yes, Harness GitOps supports Helm charts for defining and deploying Kubernetes applications. You can version-control Helm charts in your Git repository and use Harness to manage the deployment lifecycle.


### Can I download pipeline or step execution logs via the UI? 

Yes, you can. First we will need to enable this Feature Flag on your account ```SPG_LOG_SERVICE_ENABLE_DOWNLOAD_LOGS```. After this Feature Flag is enabled, a Downloads logs selector will be available in the edit pipeline (3 dots on top right panel of pipeline execution screen). 

For more details please see: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts/#service-hooks).


### Service hooks for Kubernetes and Helm deployments to fetch Helm Chart dependencies. 

This is possible.

For more details please see: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts/#service-hooks).

### How can we access Helm repo name from the Helm connector?

We do not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in custom deployment template. For normal usage we can make an api call to get the connector details and get the repo name from the "HelmRepoUrl" attribute.

### Is it possible to use Helm hooks in Harness Helm deployments?

Yes, you can use Helm hooks in Harness Helm deployments. Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process.

### How can customer execute a `Helm dependency update` command with Helm Command Flags ?

For this specific use case please refer to our documentation [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts/#use-case-add-private-repositories-as-a-Helm-chart-dependency).


### What do the fetch files step do in rollout deployment?

The Fetch files task in the Rollout Deployment step leverages the GitHub connector configured in the service to fetch the manifests. Harness will also render and resolve any of the Harness variables defined in the values.yaml file of the service and add them to the manifest/Helm chart using Go/Helm templating. 

Harness fetches any secrets referenced in the values.yaml file and resolves them in the manifest. Harness masks secret output in its logs.


### Is there a built-in Harness variable for the Helm chart version in the pipeline?

Yes, you can use the expression \<+trigger.manifest.version> to have the new chart version that initiated the Trigger passed in as the version to deploy. This expression can reference the chart version in your pipeline stage steps.

For non-trigger-based execution, you can use the expression \<+manifests.MANIFEST_ID.Helm.version> to reference the Helm chart version in your pipeline stage steps. The MANIFEST_ID is located in service.serviceDefinition.spec.manifests.manifest.identifier in the Harness service YAML. You can also use Harness variable expressions or runtime inputs to pass in the Helm chart version at execution.


### Why one cannot configure multiple manifests in non-Helm environment?

At present, we only support Helm K8s and Helm deployments ( not charts as they are treated as artifacts) with multiple manifest services because , allowing for all swimlanes can cause a mega service that can deploy multiple applications and can cause problem in management of the same.


### Limitations of Helm Chart dependencies on Git Source Repositories

Helm chart dependencies are not supported in Git source repositories. Helm chart dependencies are supported in Helm Chart Repositories.

### How can I use Canary with native Helm deployment strategy?

You can only perform a rolling deployment strategy for Native Helm(no canary or blue-green).


### How can one use HELM expressions?

Please follow the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#Helm-chart-expressions).


### What are the options for passing Helm flag in First Gen?

Helm flags can be passed in first gen at workflow level under "Configure Helm deploy" Option. We can also pass command flags under service inside chart specification option.

### What is the difference between Helm flag options at workflow level and service level in First Gen?

The Helm flag configured at workflow level needs to be not command specific otherwise the command can fail. It will also be applied to all the Helm commands. The command flag passed at service level are tagged to a specific command. So they will be added only to that specific command. Hence here we can use command specific flags as well.

### Is there a way to avoid using Helm template command in Kubernetes Helm deployment?

For kubernetes Helm we will always run the template command as this is how we get the rendered manifest. The workflow using kubernetes Helm perform the final deployment using the rendered manifest and kubectl commands.
 
If we do not want to use template command we need to be using native Helm type of deployment.


### How to get Helm chart version from Helm based triggers?

The Helm version is part of the trigger payload. The expression that conatains the Helm version is `<+trigger.manifest.version>` .


### After a successful deployment with the namespace "x" and another failed deployment with the same namespace (x), we switched the namespace and now it seems it cannot properly do a Helm history.

You can enable the Ignore Release History Failed Status option to have Harness ignore these errors and proceed with install/upgrade. More on this can be referred here: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/native-Helm-quickstart/#ignore-release-history-failed-status).


### We want our Helm deployments through Harness to wait for the objects to be in the ready state and then only exit with status. Currently, it is executing Helm upgrade and exiting but we wanted to run something like this: Helm upgrade --install --atomic --timeout 20m \<release_name> \<chart_name> How can we do this with Harness?

Using --atomic and --timeout flags to the Helm command in the "Command" field of the "Helm Deployment" step. This should work to ensure that the deployment waits for the objects to be in the ready state and then exits with status.
 
However, please note that the --timeout flag specifies the time to wait for any individual Kubernetes operation (like creating a pod or service) to complete, not the time to wait for all objects to be in the ready state. So if you have a large number of objects to deploy, you may need to increase the timeout value accordingly.
 
Also, please make sure that your Helm chart includes the necessary readiness probes for your objects to be considered ready by Kubernetes. Harness will wait for the readiness probes to pass before considering the deployment successful.


### Helm Pipeline is failing with Helm: not found error.

Check the Helm version you are trying to use is installed on selected delegate and also you can print and check $PATH variable if Helm binary path is set correctly.

### How does Harness handle Helm chart dependencies in a Command Template?

Harness automatically resolves and manages Helm chart dependencies when executing Helm commands based on your Helm Command Template configuration.


### Is it possible to get through an expression the uninstall flags from a Helm service?

One can try below example to find and uninstall the same :
```sh
commandFlagsJson='<+json.format(<+pipeline.stages.deploy.spec.manifests.Helm_hello_world.commandFlags>)>'
commandType=$(echo $commandFlagsJson | jq '.[] | select(.commandType=="Uninstall") | .flag')

echo $commandType
```


### How to read files under project's Helm folder during project deployment?

We do not have a way to read the values file directly and access any variables from the same. It can only be read as part of the service deployment.

If you need to access the file values you need to pull the file from your repo in a shell script step and then publish the corresponding value as output variable. 



### Do we have a way to optionally exclude some values file fetch in the manifest based on condition?

Currently we do not have a way to exclude or make the values file list optional. If you run a Helm deployment by specifying a values.yaml and if the yaml does not exist it will fail the deployment.


### Why we are not getting values for new Helm manifest variables?

The feature to get the newer variables for Helm manifest (currently behind CDS_HELM_FETCH_CHART_METADATA_NG)requires delegate versions to be 801xx or newer. If there is any delegate in the account which is older we do not enable the feature and the variables will not be populated even if the task runs on a newer version of delegate.



### Is there a way to force Helm deployments to use Helm upgrade command instead of Helm install for first Helm deployment?

Harness by default while performing the Helm deployment look for any previous installation, if it does not find one it consider the current deployment as first and then runs the Helm install command. From the next run it will run the Helm upgrade command, this behaviour is not configurable.

### Is it considered an error when using Helm template "--show-only` `templates/secret.yaml my-chart" results in an empty manifest, even though the template exists, and how can one prevent or handle this error message?

It will be feasible for them to consider adding a line at the top of their manifests to prevent rendering to be empty when using Helm template `--show-only`. This approach would not only address the error but also provide the advantage of skipping these objects during deployment. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/ignore-a-manifest-file-during-deployment/#ignore-a-manifest)



### How Can I Leverage the Uninstall Helm Flag Within a Custom Script?

While it's not officially supported, you can obtain all Helm flags used in the Service step. Here's an example of how to retrieve them: `<+pipeline.stages.deploy.spec.manifests.Helm_hello_world.commandFlags>`


### What recommendation can be made if a service's chart is currently on V3?

Yes, If the chart is v3 in service should be same.
Note! If your development team still uses Helm 2, you can reintroduce the binary on the delegate. Harness is not responsible for any vulnerabilities or risks that might result from reintroducing the Helm 2 binary. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts/#important-notes)


### What is the default release name used for k8s/Helm deployment done via Harness pipeline?

The default release name is ```release-<+INFRA_KEY_SHORT_ID>```


### Does Harness support OpenTofu native steps in Continuous Module?

No, Harness does not yet support OpenTofu native steps due to less usage to Terraform.
Please read more on Native Helm in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/native-Helm-quickstart/).


### What limitations in Go template rendering of manifests compared to Helm have been identified, and how has the decision been made to address this issue by running it as a Helm job ?

Helm template can render the manifests but Go template cannot. There are limitations in the go template. One may run it as a Helm job.
**Note**
- In case of Helm template and application of network policy update with usage of Blue-Green or Canary deployments, please try to run the apply step and apply the network policies before deploying
  Please read more on Apply Step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/)


### In a Helm deployment with custom certificates, what is essential regarding DNS-compliant keys? ? How should delegates be restarted after modifying the secret for changes to take effect ?

Please follow below suggestions:

- Ensure that the secret containing custom certificates adheres strictly to DNS-compliant keys, avoiding underscores primarily. Following any modification to this secret, it is imperative to restart all delegates to seamlessly incorporate the changes.
- Helm Installation Command:
```sh
Helm upgrade -i nikkelma-240126-del --namespace harness-delegate-ng --create-namespace \
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
Please read more on Custom Certs in the following [Documentation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### How to define Helm values files as optional during a deployment?

Currently, we don't support this feature. We're currently working on this feature as a long-term one. For more information, go to [Allow Helm Values files on Deploys to be Optional](https://ideas.harness.io/continuous-delivery/p/allow-Helm-values-files-on-deploys-to-be-optional).


### How does the default release naming scheme work when deploying multiple Helm charts with the same infrastructure definition?

When deploying multiple Helm charts using the same infrastructure definition, the default release naming scheme can potentially use the same release name for each chart. However, Harness allows for customization of the release name using pipeline variables or runtime inputs. This flexibility ensures that each deployment can have a unique release name, preventing any confusion during the upgrade or rollback of charts.


### Can we utilize kubernetes pruning for kubernetes Helm deployments?

Kubernetes Helm deployments are similar to native kubernetes deployment once the template is rendered from the Helm chart. Hence we can take advantage of the pruning functionality for the templates which we want to remove if not present in the rendered manifest template.


### Do we have pruning functionality available for native Helm deployments?

Helm natively takes care of removing any template changes that is done to the chart between two Helm release. Hence we need not do any explicit action as Helm implicitly takes care of removing these resources.


### Can we checkout Helm repos completely and not just the chart for Helm chart manifest?

In the Helm manifest configuration we specify the Helm chart and only the charts are pulled as part of the fetch. Also even if we specify the manifest from source repo they need to confirm to standard Helm directory structure. If there are any config files in the repo that needs to be accessed for deployment it is recommended to fetch the files separately.


### Does native Helm deployment support any plugin functionality?

We do not have any built in plugin support for Helm deployments however we do have service hooks which can be used for any such functionality like using Helm secrets.


### When Helm step runs install and upgrade command?

For any Helm deployment it first tries to check if there is any existing Helm release, if it does not find any release it treats the deployment as first deployment and runs the Helm install command. If it finds the existing release it runs Helm upgrade command.


###  Is there a variable available to indicate the Helm v2 path for installation on the delegate ?

Below following could be the required solution for the same :

- One needs to install path via the INIT_SCRIPT field
```yaml
name: INIT_SCRIPT
          value: ""
```

- After the installation of the binary, export it to PATH
- Unlike FirstGen, variables are now not present for Helm2 and Helm3 for immutable delegates
**Note : One can’t have the same delegate using v2 and v3 for Helm**

Please read more on Helm2 in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/native-Helm-quickstart/#Helm-2-in-native-Helm)


### Is it normal for the k8sdelete step with the release name option to delete only specific entities, unlike Helm uninstall, when the chart was initially deployed using the native Helm option?

The current behavior is as expected. Initially, only Kubernetes delete with the release name label was supported. However, a feature request has been made to support Helm uninstall or delete, which would be a separate type of step.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources/)


### For Helm Subchart support, if there are multiple Subcharts, is there a way to define and manage these additional Subcharts beyond the single field provided?

The utilization of Multiple Helm Charts facilitates the deployment of individual standalone Helm Charts via a single service. These charts, akin to artifact sources, correspond to Helm Charts per environment. The Sub Chart feature becomes particularly beneficial when users possess an umbrella chart with dependencies, as exemplified in the provided [GitHub repository](https://github.com/thisrohangupta/custom-remote-test-repo/tree/main/parent-chart/charts). Upon accessing`/charts/`, both the primary chart and child chart can be obtained.
One can also configure the YAML to add additional sub chart dependencies.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts#using-subcharts)


### How I can add runtime generated override file to a service before Helm rendering?

The values file resolution will only happen once the actual deployment step runs. We can add values.yaml override from file store or any other source repo in the manifest and update the values.yaml using api call or cli with dynamic information. If we want to use any output variable from the pipeline we can use the same expression directly in the values.yaml and while fetching the file the expressions will be resolved. We just need to ensure that the steps from where the output variable expressions are copied executes before the actual deployment step runs.


### What does fetch file step in Helm deployment actually fetch?

The fetch file step in the Helm deployment fetches all the values.yaml and expands any variable expression that have been used inside the values.yaml.


### How do we pass the initScript for delegates which are installed using default delegate Helm chart?

We can create a values.yaml file and provide the initScript in that values.yaml and use this as a values.yaml override in Helm install command for delegate.


### Is there a way to test the deletion of resources removed/renamed in the Helm chart?
Yes, you can test the deletion of resources removed/renamed in the Helm chart by using the --prune flag with the Helm upgrade command. This flag will remove any resources that are no longer defined in the chart. You can also use the --dry-run flag to simulate the upgrade and see what changes will be made without actually applying them.


### How I can add runtime generated override file to a service before Helm rendering?
You can add an override file at runtime in service override or by utilizing override v2 enabled for your account. You can specify the path and branch of the override file during runtime. This is how you can perform overrides in the service before Helm rendering."


### What is the recommended way to name Kubernetes jobs in Harness pipelines when using Rolling Deployment and native Helm deployment for the same chart?

When deploying Kubernetes jobs in Harness pipelines, especially when utilizing Rolling Deployment alongside native Helm deployment for the same chart, it's essential to adopt a consistent naming convention for jobs to ensure successful tracking and management. While applying a unique suffix such as `{{ now | unixEpoch }}` can facilitate parallel job execution during Rolling Deployment, it can lead to tracking issues when Helm renders the chart with a different job name.

The recommended approach is to use a naming convention that accounts for both scenarios.

For Rolling Deployment, maintaining a unique suffix like `{{ now | unixEpoch }}` is suitable.

For Native Helm deployment, it's advisable to utilize a name that remains consistent across deployments, such as `job-migration-db-{{ .Release.Revision }}`.


### How can I configure the delegate to utilize a new version of the Helm binary?

To integrate a new version of the Helm binary with the delegate:

1. Install the desired version of the Helm binary on the delegate host.
2. Set `HELM3_PATH` environment variable to point to the location of the newly installed Helm binary.

   This can be accomplished by adding the following lines to the delegate's YAML file:

   ```
   - name: HELM3_PATH
     value: /path/to/new/Helm/binary
   ```

   Replace `/path/to/new/Helm/binary` with the actual path to the newly installed Helm binary.

3. Restart the delegate to apply the changes.


### Why am I getting UPGRADE FAILED when trying to deploy my Helm Chart?

```
Error: UPGRADE FAILED: unable to build kubernetes objects from current release manifest: resource mapping not found for name: "$RESOURCE_NAME" namespace: "" from "": no matches for kind "HorizontalPodAutoscaler" in version "autoscaling/v2beta2" ensure CRDs are installed first
```

This error happens if you have recently upgraded your Kubernetes Cluster without ensuring that your Helm Releases' API Versions are supported in the new Kubernetes Cluster version. When attempting to upgrade them after, Helm will throw the above error due to the deprecated API no longer existing in the current Kubernetes Cluster. To fix this, you'll need to upgrade the API Version on the Helm Release manually by following the steps in the [Helm Documentation](https://Helm.sh/docs/topics/kubernetes_apis/#updating-api-versions-of-a-release-manifest).

To avoid this in the future, please make sure to perform any Helm Release upgrades prior to upgrading your Kubernetes Cluster. A detailed list of deprecated and supported Kubernetes APIs can be found in the [Kubernetes Documentation](https://kubernetes.io/docs/reference/using-api/deprecation-guide/).


### Helm Deploy failing with null pointer exception.

This error usually occurs when running a Helm deployment on an expired delegate. You will run into errors in case of expired delegates. [Upgrade the delegate to the latest version](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration) and retry the execution.


### Does Harness support Helm hooks (excluding service hooks) similar to the support provided in First Gen?

No, Harness does not support Helm hooks in Kubernetes deployments in the same way as in First Gen.

The recommended approach in both First Gen and NextGen is to remove Helm hooks and integrate them as shell script steps within the workflow. This method is applicable in both generations of Harness.

For unchanged utilization of Helm hooks, native Helm deployment can be chosen. However, native Helm's ability to process hooks and deploy simultaneously is limited. This limitation stems from Helm's post-render functionality, which prevents Harness from processing hooks effectively.

For detailed instructions on integrating Helm charts in Kubernetes deployments with Harness, please refer to the Harness [documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/kubernetes-deployments/use-Helm-chart-hooks-in-kubernetes-deployments/).


### Harness is pulling old Helm dependencies that are not in the Chart.yaml.

Check the following:
* Service configuration.
* Whether you have configured the override.
* Whether the chart is getting pulled from the correct location.
* List of manifests.


### Can I design a pipeline to deploy Helm charts hosted in a remote private Helm registry and using Kustomize to patch the Helm charts?

Native Helm doesn't support Kustomize; however, you could use [service hooks](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/Helm/deploy-Helm-charts/#service-hooks) for this.


### Why have two charts been deployed in my cluster after running a Helm deployment two times?
Helm chart deployment is release-specific. If the release names are different between two deployments it sees the new deployment as a new release and does not consider the one which was already installed and goes ahead and installs a new chart under the new release. This is default Helm behavior.


### How do I handle chart dependencies if the dependent chart is in a different repo?
If you are adding your dependency chart in a source repo you will have to clone it separately as part of the pre hook on delegate. Also, in Charts.yaml when you are mentioning the dependency you will need to specify the path of dependency chart where you downloaded.
As the dependency update is a command run by using Helm it will be able to resolve the file path you provide if you have already downloaded the dependency chart.

### How do I run Helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment, you can leverage the shell script step and run the helm uninstall ```release-name``` command from the delegate onto the cluster.
To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate. 

For this use case within the shell script, you can simply reference credentials as $\{HARNESS_KUBE_CONFIG_PATH}.

```export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test```

With this, even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.

### What are the differences between Native Helm Deployment in FirstGen and NextGen Harness?

Here are a few key differences between Native Helm Deployment in FirstGen and NextGen Harness:

* Versioning: Harness NextGen supports versioning of Helm deployments. This allows you to track changes to your deployments and roll back to previous versions if necessary. Harness FirstGen does not support versioning of Helm deployments.
* Rollback: Harness NextGen supports rollbacks of Helm deployments. This allows you to roll back to a previous version of your deployment if something goes wrong. Harness FirstGen does not support rollbacks of Helm deployments.
* Helm 3: Harness NextGen supports Helm 3. Harness FirstGen supports both Helm 2 and Helm 3.

#### Is the "Enable Native Helm steady state for jobs" option a default setting for the steady state check?

This selection is solely for verifying the steady state of a Kubernetes Job deployed via the Helm chart.

### What is the CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG flag?

The CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG is a Harness-specific implementation designed to wait for native Helm deployments until the pods have come up and are ready. This implementation also logs events from clusters, providing more detailed information about the deployment status.

### How does CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG differ from using the --wait flag in Helm?

Event Logging: The key difference is that CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG logs events from the cluster, giving detailed insights into the deployment process, whereas the --wait flag does not provide any events.

Functionality: Both methods effectively wait for the pods to become ready, but the Harness flag provides additional logging information.

### Is there any configuration required on the user side to enable CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG?

No, there is no need to add any annotations in the deployment YAML to enable CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG. It is a built-in feature that can be utilized without additional configuration.

### If my native Helm deployment fails, will the rollback delete resources created during the failed install/upgrade that are not in the rollback revision?

Yes, the Helm rollback will restore the previous release version. This means only the resources from the last successful release will exist after the rollback. Any new resources created during the failed install/upgrade will be deleted if they are not part of the previous successful release.

### How does Harness handle Helm chart hooks?

Harness don’t handle helm hooks from our side in any way.

### What happens if a deployment doesn't reach a steady state with CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG enabled?

If a deployment doesn't reach a steady state, CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG will log the events and errors that occur, helping you diagnose and resolve the issues that prevented the deployment from completing successfully.

### How to execute helm lookup expression in helm template?
We can pass the helm template command option  `--dry-run=server`. These command options can be added in the helm manifest advanced configruation.

#### How to execute helm lookup expression in helm template?
We can pass the helm template command option "--dry-run=server". These command options can be added in the helm manifest advanced configruation.

#### Is it possible to provide custom priority order for values.yaml while providing multiple values yaml file?
We do not have any way to provide customer ordering. We follow a bottom up approach for values yaml priority in case of multiple values yaml provided where the last one gets the highest priority.

#### What happens if we do not pass any chart version to helm deployment having manifest with runtime input option for chart version?
### Is it possible to provide custom priority order for values.yaml while providing multiple values yaml file?
We do not have any way to provide customer ordering. We follow a bottom up approach for values yaml priority in case of multiple values yaml provided where the last one gets the highest priority.

### What happens if we do not pass any chart version to helm deployment having manifest with runtime input option for chart version?
If chart version is not provided as runtime input the deployment is done using the latest chart version available for the specified chart in the given repo.

#### Can we make provided values yaml optional?
Currently we do not have a way to make the provided values yaml optional or pick selective values yaml from the configuration.

#### How can we configure a manifest that can use multiple values yaml based on user selection?
We can make the path of values yaml while configuring the service as an expression and use the input from user to populate the path of the file. So you can have vlaues1.yaml , values2.yaml,values3.yaml in the same github repo .
In the configuration rather than specifying the filename for the override value yaml directly you can give the name of the values yaml as input. 

#### How to run helm upgrade command by passing a custom file which is stored in vault?
You can make use of service hooks in this scenario. I am sharing a documentation which has a sample usage of service hook.
 
You can extend this as per your scenario to use to download the file from vault and pass it as a flag option for helm upgrade command.
 
https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks

#### Why the helm deploy step is missing advanced flag option?

If you are using kubernetes helm you can use the same flag configuration as at the end of the day we render the manifest and run kubectl command to apply the manifest hence the same flag configurations are present there as well in rollout step configruation.
 
However if you are using native helm we use helm commands for the deployment and only the helm command options are available. Also these are available as part of manifest itself.