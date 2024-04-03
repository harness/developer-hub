---
title: Helm deployments overview
description: High-level view of Harness Helm deployments and Harness' options for users to perform Helm Deployments.
sidebar_position: 1
---

Harness supports Helm deployments as part of its Kubernetes swimlane. You can deploy Helm charts and subcharts to your target infrastructure using all of the common chart and artifact repositories and cloud platforms.

This topic explains Harness managed Helm and Helm managed Helm deployments, advantages and disadvantages of both approaches, and what option is best suited for your requirement. 
This topic explains Harness managed Helm and Helm managed Helm deployments, advantages and disadvantages of both approaches, and what option is best suited for your requirement. 

## Helm pipeline components

A Helm pipeline uses a Harness **Deploy** stage to deploy your Helm chart and artifact to your target cluster according to your steps.

Let's review the main components of a Harness Helm pipeline.

:::note

For a detailed explanation of Helm deployments, go to [Deploy Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts).

:::

<table>
	<tbody>
		<tr>
			<th></th>
			<th>Pipeline component</th>
			<th>Description</th>
		</tr>
		<tr>
			<td>What you want to deploy</td>
			<td>Service</td>
			<td>
            <ul>
               <li>The Helm chart and artifacts for your app.</li>
               <li>Harness connectors for your repositories.</li>
            </ul>
         </td>
		</tr>
		<tr>
			<td>Where you want to deploy</td>
			<td>Environment</td>
			<td>
            <ul>
               <li>The target cluster for your deployment.</li>
            </ul>
         </td>
		</tr>
		<tr>
			<td>How you want to deploy</td>
			<td>Execution steps</td>
			<td>
            <ul>
               <li>A <b>Deploy</b> stage includes the deployment strategy and steps.</li>
               <li>Pick a strategy and Harness automatically adds the required steps.</li>
               <li>Add custom steps to perform other tasks.</li>
            </ul>
         </td>
		</tr>
	</tbody>
</table>

## Deploying Helm charts managed by Harness

In a Harness managed Helm deployment, Harness fetches Helm chart and deploy it using Kubernetes `kubectl apply -f` command. This deployment method is a suitable option for users who are not fully invested in Helm and are not using its advanced features like Helm hooks, subcharts, and Helm dependencies. Such users can focus on Helm packaging the Kubernetes resources for you and publishing it to a target source. This approach gives you granular control on the Kubernetes resources, and how they're applied. You can specify which files you wish to skip for deployment, and prioritize which are created before the deployment, and so on. 

With more control over the Helm packaged Kubernetes resources, Harness has the luxury of orchestrating Canary and Blue Green deployments, and tracking the resources accordingly. Harness appends canary labels to a Canary deployed service. Harness identifies the primary and stage services' Kubernetes objects deployed and manages the labels and selectors so the correct resources receive traffic. This approach gives Harness further control to version your ConfigMaps and Secrets along with your deployed resources so you get the correct versions with your deployed resources.

In the event of rollback, because Harness tracks and control how the files are released, Harness can initiate a rollback based on the ConfigMap version that captures the state of your last successfully deployed service.

Here's a summary of the process:

1. Harness fetches the manifests from your Helm repository to the Harness Delegate.
   <details>
   <summary>Add different types of manifests</summary>

   Here's a showing you how to add different types of manifests. It also describes how to add Helm charts and multiple values YAML files in the same repo as the chart, or in separate repos.

   <!-- Video:
   https://www.youtube.com/watch?v=Wvr52UKDOJQ-->
   <DocVideo src="https://www.youtube.com/watch?v=Wvr52UKDOJQ" />

   </details>
2. Harness unzips the chart and runs a `helm template` over the Kubernetes resources packaged in the Helm chart.
3. On the same Harness Delegate, or a delegate that has access to the target Kubernetes Cluster, Harness proceeds to deploy the Helm chart using the `kubectl apply -f <+kubernetes.resource.yml>` command.
4. Once deployed, Harness manages and tracks the deployed Helm chart using the **Release Name**.

### Configuring Helm charts managed by Harness

1. Create a [Harness service](/docs/continuous-delivery/get-started/services-and-environments-overview#services) in your Harness project.
2. In service **Configuration**, under **Service Definition** > **Deployment Type**, select **Kubernetes**.
3. In **Manifests**, select **Add Manifest** and navigate to **Manifest Source** in your service, and configure Git, OCI Helm, or HTTP Helm.
4. Ensure that you have selected **Kubernetes** deployment type in your environment **Infrastructure Definition** as well.

For detailed steps on how to deploy Harness managed Helm charts, go to [Deploy Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts).

### Pros

- Harness can orchestrate the Helm chart deployment in a Canary and Blue Green strategy.
- Helm is now focused to package your resources, not deploy your resources. How you deploy and roll out your resources is now sequenced and managed by Harness.
- Versioning: Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets.
- Rollback: In the event of deployment failure, Harness Kubernetes deployments will roll back to the last successful version via the versioned ConfigMap generated by Harness.

### Cons

- Helm Hooks are not supported. You might want to split the Helm hooks into jobs.

## Deploying Helm charts managed by Helm (Native Helm deployment)

This approach is great when you are first moving to Harness. This requires minimal changes to your Helm package and deployment process. Harness just takes your existing Helm chart and deploys it to the target Kubernetes cluster that you specify for deployment.

This approach is also suitable if you want to deploy complex Helm charts with hooks, subcharts, and dependency charts because you need not break down your chart and sequence out the dependency charts before deploying the main Helm chart.

This approach also works well with the commodity Helm charts because you need not make any tweaks to the open source chart. Just supply a values.yaml file and Harness will perform the Helm fetch and Helm install.

Here's a summary of the process:  

1. Harness fetches the manifests from your Helm repository on to the Harness Delegate.
2. Harness unzips the chart, runs a `helm template` over the Kubernetes resources packaged in the Helm Chart.
3. On the same Harness Delegate, or a delegate that has access to the target Kubernetes cluster, Harness will proceed to deploy using the `helm install {YOUR_HELM_CHART}` or a `helm upgrade {YOUR HELM CHART}`.
4. After the deployment, Harness queries the deployed instances for tracking using the Helm client.

For detailed steps on Native Helm deployment, go to [Native Helm deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart).

### Pros

- Rollback: Harness does not perform rollback. Instead, Harness uses Helm's native rollback functionality. This approach works well if you want to use your existing setup.
- Harness will honor the user's pre and post install hooks configured in the Helm chart.

### Cons

- Versioning: Native Helm does not version deployments.
- No progressive deployment support, no blue green or canary deployment types are supported (coming soon).

### Configuring Native Helm 

1. Create a [Harness service](/docs/continuous-delivery/get-started/services-and-environments-overview#services) in your Harness project.
2. In service **Configuration**, under **Service Definition** > **Deployment Type**, select **Native Helm**.
3. In **Manifests**, select **Add Manifest** and navigate to **Manifest Source** in your service, and configure Git, OCI Helm, or HTTP Helm.
4. Ensure that you have selected **Native Helm** deployment type in your environment **Infrastructure Definition** as well.

## What is supported in both approaches?

### Optional: Trigger pipelines on new Helm chart published or on a new artifact image defined within the Helm chart

You can add a trigger to your Harness pipeline that will run the pipeline when the Helm chart or artifact version changes or is published to a repository.

For details, go to:

- [Trigger pipelines on new Helm chart](/docs/platform/triggers/trigger-pipelines-on-new-helm-chart)
- [Trigger pipelines on a new artifact](/docs/platform/triggers/trigger-on-a-new-artifact)
- [Triggers](/docs/category/triggers)

### Optional: Helm Chart to Manage Harness Delegates

Harness includes a Helm-based Harness Delegate but you can use any delegate type for Helm deployments.

Helm chart delegates are a great way to manage delegates at scale and via automation. The chart remains the same and you simply need to swap out the values.yaml for delegate installation.

You can parameterize much of the Helm Chart via Go Templating and pass in parameters via the values.yaml. This makes the Helm installation consistent and, depending on the team's requirements, you can pass in a values.yaml to spin up the delegate.

For steps on Helm delegates, go to [Delegate installation overview](/docs/platform/delegates/install-delegates/overview).

If you select to build your own delegate and include only those tools needed for Helm deployments, go to [Delegate-required SDKs](/docs/platform/delegates/delegate-reference/delegate-required-sdks/) to see what Kubernetes and Helm-related binaries are required.

### Supported integrations with Helm

For details on supported Helm versions, tooling, limitations, and repositories, go to [Supported CD features and integrations](/docs/continuous-delivery/cd-integrations).

## See also

### How can we deploy a specific resource in a helm chart as part of Harness managed Helm rolling deployment?

If it is a Helm deployment managed by Harness, you can use an Apply Step.

You can take a specific file from the manifest and execute it separately from the normal deployment (before or after). To prevent the file from being included in the main part of the deployment, you include `# harness.io/skip-file-for-deploy` at the top of the file.

### How do I run a Helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment, you can leverage the Shell Script step and run the `helm uninstall release-name` command from the delegate onto the cluster. To run the shell script onto the required cluster, you need to specify the Kubernetes cluster credentials for the delegate.

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

For normal usage Harness can make an API call to get the connector details and get the repo name from the "helmRepoUrl" attribute.

### Can I use Helm charts from public repositories like Helm Hub with Harness?

Yes, you can use Helm charts from public Helm repositories like Helm Hub. Harness allows you to specify the Helm repository URL and chart version when configuring your deployment.

### Is it possible to use Helm hooks in Harness Helm deployments?

Yes, you can use Helm hooks in Helm deployments managed by Helm. This is available via the **Native Helm** service type.

Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process.

### What are deployment failed because the release name was invalid errors?

The "invalid release name" error is due to the length of the release name exceeding the maximum limit of 53 characters.

This limitation is imposed by [Helm](https://helm.sh/docs/chart_template_guide/getting_started/#adding-a-simple-template-call).

To resolve this issue, please ensure that your release name falls within the 53 character range.

You can achieve this by using the following expression in **Release Name** to shorten the release name: `<+<+INFRA_KEY>.substring(0,7)>`.



