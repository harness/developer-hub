---
sidebar_position: 50
description: Deploy a Harness Delegate that uses Workload Identity to access Google Cloud Services
keywords: [Google,delegate,Terraform,GKE,workload identity]
title: Install Harness Delegate on Google Kubernetes Engine (GKE) With Workload Identity
---


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

**Workload Identity** allows a Kubernetes service account in your GKE cluster to act as a Google IAM Service account. Pods that use the configured KSA automatically authenticate as the IAM service account when accessing Google Cloud APIs.

To learn more about **Workload Identity** check out the [blog](https://dev.to/kameshsampath/applying-workload-identity-with-a-demo-1bf9) that explains it with an example.

At the end of this tutorial you will know how to:

- Enable Workload Identity on GKE.
- Deploy Harness Delegate onto Workload Identity-enabled GKE.
- Build a simple CI pipeline to push the image to Google Artifact Registry without using GCP connectors or configuring secrets.

## CI pipeline scenario

- Build a [Go](https://go.dev/) application. You can build any application, but Go is used as an example here.
- Package the application build artifact as a container image.
- Push the image to [Google Artifact Registry (**GAR**)](https://cloud.google.com/artifact-registry/).
- Cache the build artifacts and dependencies (Go modules) onto [Google Cloud Storage(**GCS**)](https://cloud.google.com/storage/) to make the build process faster.

## Glossary

Review the following terms and their abbreviations.

| Abbreviation | Meaning
| :----:    |:----------:
| API | Application Programming Interface
| ACL | Access Control List
| GAR | Google Artifact Registry
| GCS | Google Cloud Storage
| GKE | Google Kubernetes Engine
| GSA | Google Service Account
| IAM | Identity and Access Management
| KSA | Kubernetes Service Account
| RBAC| Role-based Access Control
| SA  | Service Account
| VPC | Virtual Private Cloud

### Pre-requisites

- A [Google Cloud Account](https://cloud.google.com) with a Service Account with the following roles:
    - `Kubernetes Engine Admin`to create a GKE cluster
    - `Service Account` roles used to create, update, or delete a Service Account
      - _iam.serviceAccounts.actAs_
      - _iam.serviceAccounts.get_
      - _iam.serviceAccounts.create_
      - _iam.serviceAccounts.delete_
      - _iam.serviceAccounts.update_
      - _iam.serviceAccounts.get_
      - _iam.serviceAccounts.getIamPolicy_
      - _iam.serviceAccounts.setIamPolicy_
      - (OR) simply you can add `Service Account Admin` and `Service Account User` roles
    - `Compute Network Admin` to create the VPC networks

#### Required tools

Download and install the following tools locally onto your laptop:

- [Google Cloud SDK](https://cloud.google.com/sdk)
- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh)
- [Taskfile](https://taskfile.dev)

## Download sources

As we will be using Terraform pipelines to deploy GKE and Harness Delegate, clone the sources locally:

```shell
git clone https://github.com/harness-apps/workload-identity-gke-demo.git && cd "$(basename "$_" .git)"
export DEMO_HOME="$PWD"
```

## Environment setup

### Variables

When working with Google Cloud, the following environment variables help in setting the right Google Cloud context like Service Account Key file, project etc. 

You can use [direnv](https://direnv.net) or set the following variables on your shell:

```shell
export GOOGLE_APPLICATION_CREDENTIALS="the google cloud service account key json file to use"
export CLOUDSDK_ACTIVE_CONFIG_NAME="the google cloud cli profile to use"
export GOOGLE_CLOUD_PROJECT="the google cloud project to use"
export KUBECONFIG="$DEMO_HOME/.kube/config"
```

You can find more information about gcloud cli configurations at <https://cloud.google.com/sdk/docs/configurations>.

As you may need to override a few Terraform variables that you don't want to check in to VCS, add them to a file called `.local.tfvars` and set the following environment variable to be picked up by Terraform runs:

```shell
export TFVARS_FILE=.local.tfvars
```

Check the [Inputs](https://github.com/harness-apps/workload-identity-gke-demo#inputs) section for all possible Terraform variables that are configurable.

An example `.local.tfvars` looks like,

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

### Create an environment

We will use Terraform to create a GKE cluster with `WorkloadIdentity` enabled for its nodes:

```shell
task init
```

### Create a GKE cluster

The Terraform apply creates a GKE Cluster:

```shell
task create_cluster
```

### Deploy a Harness Delegate

The following section deploys a Harness Delegate onto the GKE cluster. 

1. To be able to successfully deploy a Harness Delegate, update the following values in the `.local.tfvars` file,

    - `harness_account_id`
    - `harness_delegate_token`
    - `harness_delegate_namespace`
    - `harness_manager_endpoint`

    - Use **Account Id** from Account Overview as the value for **harness_account_id**,

    ![account details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eom3g1bo25v0rc1iehjl.png)

    - Use the **Harness Cluster Hosting Account** from the account details to find the matching endpoint URL. For example, for `prod-2` it is <https://app.harness.io/gratis> and set that as the value for `harness_manager_endpoint`.

    :::tip

    You can find the endpoint corresponding to your **Harness Cluster Hosting Account** from <https://developer.harness.io/tutorials/platform/install-delegate/>

    :::

2. Copy the default token from **Projects** --> **Project Setup** --> **Delegates**(**Tokens**) and set it as the value for `harness_delegate_token`.

    ![copy default token](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r0y1vxdxunxal3li1xug.png)

    - `harness_delegate_name`: defaults to **harness-delegate**
    - `harness_delegate_namespace`: defaults to **harness-delegate-ng**

3. Run the following command to deploy the Harness Delegate:

    ```shell
    task deploy_harness_delegate
    ```

    :::note

    It will take some time for the delegate to connect.

    :::

    Wait for the delegate to be connected before proceeding to the next steps. 

    You can view the status of the delegate from the **Project** --> **Project Setup** --> **Delegates** page.

    ![delegate status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yrjd9xd1k3r2pa6g35c3.png)

    You can also check the running Harness delegate pods by using `kubectl`:

    ```shell
    kubectl get pods -n harness-delegate-ng    
    ```

    The output should be something like the following. The pod name may vary based on your `harness_delegate_name` value.

    ```text
    NAME                                 READY   STATUS    RESTARTS   AGE
    harness-delegate-6bfd78d5cb-5h8x9   1/1     Running   0          2m23s
    ```

    As part of Harness Delegate we also did the following extra tasks:

    - Created a Google Service Account (SA) `harness-delegate`.
    - Added an IAM binding policy to the `harness-delegate` SA, with the role `roles/iam.workloadIdentityUser` and a member "serviceAccount:$GOOGLE_CLOUD_PROJECT.svc.id.goog[\default/harness-builder]".
    - Added a `harness-delegate` SA with the role `roles/artifactregistry.createOnPushRepoAdmin`, enabling it to push images to Google Artifact Registry(GAR).
    - Created a Kubernetes Service Account `harness-builder` annotated with `iam.gke.io/gcp-service-account` to `harness-delegate`, allowing it to impersonate the GSA thereby enabling it to push the built application image to GAR.

## Build the application

Having deployed the Harness Delegate, you can now build a CI pipeline that will build and push the same [Go app](https://github.com/harness-apps/workload-identity-gke-demo/tree/main/app) to GAR.

### Import a template

The sources already have a [build stage](https://github.com/harness-apps/workload-identity-gke-demo/blob/main/.harness/ko_gar_build_push_1.yaml) template that can be used to create the CI pipeline.

1. Navigate to your Harness Account, **Account Overview** --> **Organizations**, and then select **default** organization.

    ![default org select](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j07f38navg5c3udfjwan.png)

2. From the Organization overview page select **Templates**,

    ![templates select](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2nii2f5wqwsr8lkvo5l1.png)

3. Select **New Template**, and then select the **Import From Git** option,

    ![import from git](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/me4lm1hzsqhuygwoid4t.png)

4. Fill the wizard with values as shown:

    ![import from git details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iff39t3r5tmaxr1fcrem.png)

    :::note

    If you want to use your fork of `harness-apps/workload-identity-gke-demo`, then update _Repository_ with your fork.

    :::

    ![import template successful](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0grrjx3t1mq74xje7tg0.png)

### Create a pipeline

1. Navigate to **Builds** --> **Pipelines**, and then select **Create Pipeline**.

    ![create pipeline](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5cyqbs2xb43l9uzyt2f.png)

2. Select **Add Stage**, and then select **Use template**. Select the **ko_gar_build_push** template that we imported earlier, and then select **Use template** to complete the import.

3. Enter details about the stage:

    ![stage details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ma34ba7s3dqw0y8qqlm1.png)

4. Select **Setup Stage** to create the stage and fill other details, such as **Template Inputs**:

    ![template inputs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r6crm2c5ygs72juades6.png)

    We use `default` namespace to run builder pods. The build pod runs with a Kubernetes Service Account(KSA) `harness-builder`.

    :::note
    The `harness-builder` KSA is mapped to Google IAM Service Account (GSA) `harness-delegate` to inherit the GCP roles, using Workload Identity in this case to push the images to Google Artifact Registry (GAR).
    :::

5. Select **Run** to run the pipeline to see the image being built and pushed to GAR:

    ![Run Pipeline](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kbidxfctui4b3zmmoyuv.png)

    A successful run would have pushed the image into GAR. In this example it's `asia-south1-docker.pkg.dev/pratyakshika/demos/lingua-greeter:latest`

    ![Build Success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hlo8z6klt1qtfidzgn8h.png)

## Clean up resources

To clean up all the Google Cloud resources that were created as part of this demo, do the following:

```shell
task destroy
```

## Summary

By using Workload Identity Delegate we have simplified and secured our CI pipelines, which can now use any Google API services by configuring the GSA with the correct roles and permissions. The CI SaaS platform no longer needs to store or update the Google API credentials.

Having deployed Workload Identity Delegate, you can also do [keyless signing](https://docs.sigstore.dev/cosign/overview/#keyless-signing-of-a-container) of your container images using Google Application Credentials using [cosign](https://sigstore.dev).