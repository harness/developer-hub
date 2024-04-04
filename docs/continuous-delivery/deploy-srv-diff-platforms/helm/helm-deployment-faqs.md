---
title: General Helm deployment FAQs
description: This topic lists some FAQs related to Native and Harness managed Helm deployment
sidebar_position: 6
---

### How can I deploy a specific resource in a Helm chart as part of Harness managed Helm rolling deployment?

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

### Troubleshoot 401 Not Authorized issue with Helm connector

First, ensure the credentials that you have passed to the Helm HTTP or OCI connector are still valid.

You can also `exec` into your Harness Delegate and run the `helm repo add` command on the delegate to manually fetch the repo to see if the delegate can pull it.