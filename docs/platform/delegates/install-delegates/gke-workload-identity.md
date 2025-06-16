---
title: Install Harness Delegate on Google Kubernetes Engine (GKE) with Workload Identity
description: Deploy a Harness Delegate that uses Workload Identity to access Google Cloud Services
sidebar_position: 6
redirect_from:
  - /tutorials/platform/gke-workload-identity
---

[Workload Identity](https://dev.to/kameshsampath/applying-workload-identity-with-a-demo-1bf9) allows a Kubernetes Service Account (KSA) in your Google Kubernetes Engine (GKE) cluster to act as a Google Identity and Access Management (IAM) Service Account. Pods that use the configured KSA automatically authenticate as the IAM service account when accessing Google Cloud APIs.

This topic explains how to enable Workload Identity on GKE and deploy a Harness Delegate onto Workload Identity-enabled GKE. To demonstrate this, the examples in this topic use Terraform pipelines to deploy GKE and Harness Delegate, and it also builds a simple CI pipeline to push an image to Google Artifact Registry (GAR) without using Google Cloud Platform (GCP) connectors or configuring secrets.

Using a Workload Identity-enabled Harness Delegate can help simplify and secure your pipelines. With this setup, pipelines can use any Google API services by configuring the GSA with the correct roles and permissions, and you no longer need to store or update the Google API credentials in Harness. For example, after deploying a Workload Identity-enabled delegate, you can also do [keyless signing](https://docs.sigstore.dev/cosign/overview/#keyless-signing-of-a-container) of your container images using Google Application Credentials using [cosign](https://sigstore.dev).

## Prerequisites

To use GKE with Workload Identity, you need a [Google Cloud account](https://cloud.google.com) with a Service Account with the following roles:
* `Kubernetes Engine Admin`to create a GKE cluster.
* `Compute Network Admin` to create the virtual private cloud (VPC) networks.
* `Service Account Admin` and `Service Account User` roles or the specific `Service Account` roles used to create, update, or delete a Service Account:
   * _iam.serviceAccounts.actAs_
   * _iam.serviceAccounts.get_
   * _iam.serviceAccounts.create_
   * _iam.serviceAccounts.delete_
   * _iam.serviceAccounts.update_
   * _iam.serviceAccounts.get_
   * _iam.serviceAccounts.getIamPolicy_
   * _iam.serviceAccounts.setIamPolicy_

To follow along with the examples in this topic, you need the following tools:

- [Google Cloud SDK](https://cloud.google.com/sdk)
- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh)
- [Taskfile](https://taskfile.dev)

The examples in this topic use Terraform pipelines to deploy GKE and Harness Delegate. If you want to follow along, clone the sources locally:

```shell
git clone https://github.com/harness-apps/workload-identity-gke-demo.git && cd "$(basename "$_" .git)"
export DEMO_HOME="$PWD"
```

## Configure Google Cloud

1. When working with Google Cloud, the following environment variables help set the Google Cloud context, like Service Account Key file, project, and so on. You can use [direnv](https://direnv.net) or set these variables on your shell:

   ```shell
   export GOOGLE_APPLICATION_CREDENTIALS="the google cloud service account key json file to use"
   export CLOUDSDK_ACTIVE_CONFIG_NAME="the google cloud cli profile to use"
   export GOOGLE_CLOUD_PROJECT="the google cloud project to use"
   export KUBECONFIG="$DEMO_HOME/.kube/config"
   ```

   For more information about gcloud cli configurations, go to the [Google Cloud SDK documentation](https://cloud.google.com/sdk/docs/configurations).

2. You might need to override some Terraform variables that you don't want to check in to VCS. Add them to a file called `.local.tfvars` and set the following environment variable to be picked up by Terraform runs:

   ```shell
   export TFVARS_FILE=.local.tfvars
   ```

   Check the [Inputs](https://github.com/harness-apps/workload-identity-gke-demo#inputs) section for all possible Terraform variables that are configurable.

<details>
<summary>Example .local.tfvars</summary>

```hcl
project_id                 = "my-awesome-gcp-project"
region                     = "asia-south1"
cluster_name               = "wi-demos"
kubernetes_version         = "1.24."
harness_account_id         = "REPLACE WITH YOUR HARNESS ACCOUNT ID"
harness_delegate_token     = "REPLACE WITH YOUR HARNESS DELEGATE TOKEN"
harness_delegate_name      = "wi-demos-delegate"
harness_delegate_namespace = "harness-delegate-ng"
harness_manager_endpoint   = "https://app.harness.io/gratis"
```

</details>

2. Use Terraform to create a GKE cluster with `WorkloadIdentity` enabled for its nodes.

   ```shell
   task init
   ```

3. Use Terraform apply to create a GKE Cluster.

   ```shell
   task create_cluster
   ```

## Deploy the Harness Delegate

Deploy a Harness Delegate onto the GKE cluster.

1. To be able to successfully deploy a Harness Delegate, update the following values in the `.local.tfvars` file,

    - `harness_account_id`: Set this to your Harness Account ID, which you can find on your **Account Overview** page in Harness or in any Harness app URL.
    - `harness_delegate_token`: This is a [Harness Delegate token](https://developer.harness.io/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/).
    - `harness_delegate_name`: Defaults to `harness-delegate`.
    - `harness_delegate_namespace`: Defaults to `harness-delegate-ng`.
    - `harness_manager_endpoint`: Use the **Harness Cluster Hosting Account** from your **Account Overview** page to find the matching endpoint URL for this value. For example, the endpoint URL for `prod-2` is `https://app.harness.io/gratis`. For more information, go to [Install delegate](/docs/platform/get-started/tutorials/install-delegate).

3. To deploy the Harness Delegate, run `task deploy_harness_delegate`, and then wait while the delegate connects.

    You can check delegate status on the **Delegates** page in the Harness Platform.

    For Kubernetes delegates, you can also use `kubectl get pods -n harness-delegate-ng`. For running delegates, the output is something like:

    ```
    NAME                                 READY   STATUS    RESTARTS   AGE
    your-delegate name                   1/1     Running   0          2m23s
    ```

## Create Service Account and IAM binding 

This section outlines the steps to configure GKE Workload Identity, allowing workloads to securely access Google Cloud services using IAM roles.

1. Create a namespace for the Kubernetes service account. Alternatively, you can use the default namespace or an existing one.

   ```bash
      kubectl create namespace harness-delegate-ng
   ```
2. Create a Kubernetes service account for your application. You can use the default service account in the default namespace or an existing one.

   ```bash
      kubectl create serviceaccount harness-builder --namespace harness-delegate-ng
   ```
3. Create an IAM service account for your application or use an existing one. You can use any IAM service account from any project in your organization. For Config Connector, apply the IAMServiceAccount object to the selected service account.

   ```bash
      gcloud iam service-accounts create harness-delegate --project=your-gcp-project
   ```
4. Ensure that your IAM service account has the necessary [roles](https://cloud.google.com/iam/docs/understanding-roles). You can grant additional roles using the following command.

   ```bash
      gcloud projects add-iam-policy-binding your-gcp-project \
      --member "serviceAccount:harness-delegate@your-gcp-project.iam.gserviceaccount.com" \
      --role "roles/artifactregistry.createOnPushRepoAdmin"
   ```

5. Allow the Kubernetes service account to impersonate the IAM service account by adding an [IAM policy binding](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/add-iam-policy-binding) between them. This binding grants the Kubernetes service account permission to act as the IAM service account.

   ```bash
      gcloud iam service-accounts add-iam-policy-binding harness-delegate@your-gcp-project.iam.gserviceaccount.com \
      --role roles/iam.workloadIdentityUser \
      --member "serviceAccount:your-gcp-project.svc.id.goog[harness-delegate-ng/harness-builder]" \
      --project your-gcp-project
   ```

6. Annotate the Kubernetes service account with the IAM service account's email address.

   ```bash
      kubectl annotate serviceaccount harness-builder \
      --namespace harness-delegate-ng \
      iam.gke.io/gcp-service-account=harness-delegate@your-gcp-project.iam.gserviceaccount.com
   ```

7. Update your Pod spec to schedule workloads on nodes with Workload Identity enabled and use the annotated Kubernetes service account.

      ```bash
      spec:
         serviceAccountName: ksa
         nodeSelector:
            iam.gke.io/gke-metadata-server-enabled: "true"
      ```

8. Redeploy the pod or delegate to apply the changes.

## Verify the Workload Identity configuration.

1. Create a Pod that uses the annotated Kubernetes service account and run a curl command against the service accounts endpoint. Save the following configuration as harness-test.yaml:

   ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
      name: workload-identity-test
      namespace: harness-delegate-ng
      spec:
      containers:
      - image: google/cloud-sdk:slim
         name: workload-identity-test
         command: ["sleep","infinity"]
      serviceAccountName: ksa
      nodeSelector:
         iam.gke.io/gke-metadata-server-enabled: "true"
   ```
2. Deploy the Pod:

   ```bash
      kubectl apply -f harness-test.yaml
   ```

3. Start an interactive session in the Pod.

   ```bash
      kubectl exec -it workload-identity-test \
      --namespace harness-delegate-ng \
      -- /bin/bash
   ```

4. Verify the identity by running the following command inside the Pod:

   ```bash
      curl -H "Metadata-Flavor: Google" \
      http://[metadata.google.internal]/computeMetadata/v1/instance/service-accounts/default/email
   ```
   If Workload Identity is configured correctly, this command will return the email of the IAM service account associated with the Pod.

## Test it with a CI pipeline

Having deployed the Harness Delegate, you can use a CI pipeline to test the setup by building and pushing a [sample Go app](https://github.com/harness-apps/workload-identity-gke-demo/tree/main/app) to GAR.

This demo pipeline does the following:

- Builds a Go application. You can build any application, but Go is used as an example here.
- Packages the application build artifact as a container image.
- Pushes the image to GAR.
- Caches the build artifacts and dependencies (Go modules) onto GCS to make the build process faster in the future.

### Import the template

The demo repository used for this topic has a [build stage template](https://github.com/harness-apps/workload-identity-gke-demo/blob/main/.harness/ko_gar_build_push_1.yaml) that you can use to create the demo pipeline.

1. In your Harness account, go to **Account Overview**, select **Organizations**, and then select the default organization.
2. From the Organization overview page, select **Templates**.
3. Select **New Template**, and then select the **Import From Git** option.
4. Populate the **Import Template From Git** fields as follows:
   * Name: `ko_gar_build_push`
   * Version Label: `1`
   * Git Connector: Select or create a GitHub connector
   * Repository: Use the public demo repo or your personal fork of the demo repo, `harness-apps/workload-identity-gke-demo`
   * Git Branch: `main`
   * YAML Path: `.harness/ko_gar_build_push_1.yaml`
5. Select **Import**

### Create the pipeline

1. Go to the CI module (**Builds**), select **Pipeline**, and select **Create Pipeline**.
2. Select **Add Stage**, and then select **Use template**.
3. Select the `ko_gar_build_push` template you imported, and then select **Use template**.
4. Enter a **Stage Name**, select or create a codebase connector, and set the **Repository Name** to the public demo repo or your personal fork of the demo repo, `harness-apps/workload-identity-gke-demo`.
5. Select **Set Up Stage**, and then populate the **Template Inputs**:
   * Kubernetes Cluster: Select or create a Kubernetes cluster connector.
   * Namespace: `default`
   * Service Account Name: `harness-builder` (The `harness-builder` KSA is mapped to Google IAM Service Account (GSA) `harness-delegate` to inherit the GCP roles, using Workload Identity in this case to push the images to Google Artifact Registry (GAR).)
   * Environment Variable for Download Binaries step: Set the `REGISTRY_LIST` value as the path to your GAR registry list.
   * Environment Variable for Build and Push step: Set the `KO_DOCKER_REPO` value to the GAR repo where you want to push the image, such as `REGION-docker.pkg.dev/YOUR_USERNAME/YOUR_REPO`
6. Save and run the pipeline to build and push the image to GAR. You can check the build logs to see where the image was pushed.

## Clean up resources

To clean up all the Google Cloud resources that were created as part of this demo, you can run the following task:

```shell
task destroy
```
