---
sidebar_position: 30
description: Deploy a Harness Delegate that uses Workload Identity to access Google Cloud Services
keywords: [google,delegate,terraform,gke,workload-identity]
---

# Install Delegate on Google Kubernetes Engine(GKE) With Workload Identity

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Overview

**Workload Identity** allows a Kubernetes service account in your GKE cluster to act as an Google IAM Service account. Pods that use the configured KSA automatically authenticate as the IAM service account when accessing Google Cloud APIs.

To learn more about **Workload Identity** check out the [blog](https://dev.to/kameshsampath/applying-workload-identity-with-a-demo-1bf9) that explains it with an example.

## CI Pipeline Scenario

- Builds [go](https://go.dev/) application, ideally you can build any application but go is taken as an example here.
- Package application build artifact as a container image
- Push the image to [Google Artifact Registry(**GAR**)](https://cloud.google.com/artifact-registry/).
- Cache the build artifacts, dependencies(go modules) on to [Google Cloud Storage(**GCS**)](https://cloud.google.com/storage/) to make build process faster and quicker.

## Tutorial

At the end of this tutorial you will learn how to ,

- [x] Enable Workload Identity on GKE.
- [x] Deploy Harness Delegate on to Workload Identity enabled GKE.
- [x] Build a simple CI pipeline to push image to Google Artifact Registry without using GCP Connectors/Secrets configured

## Glossary

| Abbreviation | Expansion
| :----:    |:----------:
| API | Application Programming Interface
| ACL | Access Control List|
| GAR | Google Artifact Registry
| GCS | Google Cloud Storage
| GKE | Google Kubernetes Engine
| GSA | Google Service Account
| IAM | Identity and Access Management
| KSA | Kubernetes Service Account
| RBAC| Role Based Access Control
| SA  | Service Account
| VPC | Virtual Private Cloud

### Pre-requisites

- A [Google Cloud Account](https://cloud.google.com) with a Service Account with roles:
    - `Kubernetes Engine Admin` - to create GKE cluster
    - `Service Account` roles used to create/update/delete Service Account
      - _iam.serviceAccounts.actAs_
      - _iam.serviceAccounts.get_
      - _iam.serviceAccounts.create_
      - _iam.serviceAccounts.delete_
      - _iam.serviceAccounts.update_
      - _iam.serviceAccounts.get_
      - _iam.serviceAccounts.getIamPolicy_
      - _iam.serviceAccounts.setIamPolicy_
      - (OR) simply you can add `Service Account Admin` and `Service Account User` roles
    - `Compute Network Admin`   - to create the VPC networks

#### Tools

Download and install the following tools locally on to your laptop,

- [Google Cloud SDK](https://cloud.google.com/sdk)
- [terraform](https://terraform.build)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [helm](https://helm.sh)
- [Taskfile](https://taskfile.dev)

## Download Sources

As we will be using terraform pipelines to deploy GKE and Harness Delegate clone the sources locally,

```shell
git clone https://github.com/harness-apps/workload-identity-gke-demo.git && cd "$(basename "$_" .git)"
export DEMO_HOME="$PWD"
```

## Environment Setup

### Variables

When working with Google Cloud the following environment variables helps in setting the right Google Cloud context like Service Account Key file, project etc., You can use [direnv](https://direnv.net) or set the following variables on your shell,

```shell
export GOOGLE_APPLICATION_CREDENTIALS="the google cloud service account key json file to use"
export CLOUDSDK_ACTIVE_CONFIG_NAME="the google cloud cli profile to use"
export GOOGLE_CLOUD_PROJECT="the google cloud project to use"
export KUBECONFIG="$DEMO_HOME/.kube/config"
```

You can find more information about gcloud cli configurations at <https://cloud.google.com/sdk/docs/configurations>.

As you may need to override few terraform variables that you don't want to check in to VCS, add them to a file called `.local.tfvars` and set the following environment variable to be picked up by terraform runs,

```shell
export TFVARS_FILE=.local.tfvars
```

Check the [Inputs](https://github.com/harness-apps/workload-identity-gke-demo#inputs) section for all possible terraform variables that are configurable.

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

### Create Environment

We will use terraform to create a GKE cluster with `WorkloadIdentity` enabled for its nodes,

```shell
task init
```

### Create GKE cluster

The terraform apply will creates a GKE Cluster,

```shell
task create_cluster
```

### Deploy Harness Delegate

The following section deploys a Harness Delegate on to our GKE cluster. To be able to successfully deploy a Harness Delegate we need update the following values in our `.local.tfvars` file,

- `harness_account_id`
- `harness_delegate_token`
- `harness_delegate_namespace`
- `harness_manager_endpoint`

- Use **Account Id** from Account Overview as the value for **harness_account_id**,

![account details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eom3g1bo25v0rc1iehjl.png)

- Use the **Harness Cluster Hosting Account** from the account details to find the matching endpoint URL. e.g for `prod-2` it is <https://app.harness.io/gratis> and set that as value for `harness_manager_endpoint`.

:::tip
You can find the endpoint corresponding to your **Harness Cluster Hosting Account** from <https://developer.harness.io/tutorials/platform/install-delegate/>
:::

- Copy the default token from **Projects** --> **Project Setup** --> **Delegates**(**Tokens**) and set it as value for `harness_delegate_token`.

![copy default token](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r0y1vxdxunxal3li1xug.png)

- `harness_delegate_name`: defaults to **harness-delegate**
- `harness_delegate_namespace`: defaults to **harness-delegate-ng**

With us having updated the `.local.tfvars`, run the following command to deploy the Harness Delegate,

```shell
task deploy_harness_delegate
```

:::note
It will take some time for delegate to come up and get connected.
:::

Wait for the delegate to be connected before proceeding to next steps. 

You can view status of the delegate from the **Project** --> **Project Setup** --> **Delegates** page,

![delegate status](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yrjd9xd1k3r2pa6g35c3.png)

You can also check the running Harness delegate pods by using `kubectl`,

```shell
kubectl get pods -n harness-delegate-ng    
```

The output should be something like the pod name may vary based on your `harness_delegate_name` value.

```text
NAME                                 READY   STATUS    RESTARTS   AGE
harness-delegate-6bfd78d5cb-5h8x9   1/1     Running   0          2m23s
```

As part of Harness Delegate we also did the following extra tasks,

- Created a Google Service Account(SA) `harness-delegate`.
- Add an IAM binding policy to `harness-delegate` SA, with the role `roles/iam.workloadIdentityUser` and a member "serviceAccount:$GOOGLE_CLOUD_PROJECT.svc.id.goog[default/harness-builder]".
- Add `harness-delegate` SA with role `roles/artifactregistry.createOnPushRepoAdmin` enabling it push images to Google Artifact Registry(GAR).
- Create a Kubernetes Service Account `harness-builder` annotated with `iam.gke.io/gcp-service-account` to `harness-delegate`, allowing it to impersonate the GSA thereby enabling it to push the built application image to GAR

## Build Application

Having deployed the Harness delegate, let us build a CI pipeline that will build and push the same [go app](https://github.com/harness-apps/workload-identity-gke-demo/tree/main/app) to GAR.

### Import Template

The sources already has [build stage](https://github.com/harness-apps/workload-identity-gke-demo/blob/main/.harness/ko_gar_build_push_1.yaml) template that can be used to create the CI pipeline.

Navigate to your Harness Account, **Account Overview** --> **Organizations** and select **default** organization.

![default org select](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j07f38navg5c3udfjwan.png)

From the Organization overview page select **Templates**,

![templates select](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2nii2f5wqwsr8lkvo5l1.png)

Click **New Template** and choose **Import From Git** option,

![import from git](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/me4lm1hzsqhuygwoid4t.png)

Fill the wizard with values as shown,

![import from git details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iff39t3r5tmaxr1fcrem.png)

:::note
If you want to use your fork of `harness-apps/workload-identity-gke-demo` then update _Repository_ with your fork.
:::

![import template successful](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0grrjx3t1mq74xje7tg0.png)

### Create Pipeline

Navigate to **Builds** --> **Pipelines**, click **Create Pipeline**.

![create pipeline](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5cyqbs2xb43l9uzyt2f.png)

Click **Add Stage** and click **Use template**, choose **ko_gar_build_push** template that we imported earlier and click **Use template** to complete import.

Enter details about the stage,

![stage details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ma34ba7s3dqw0y8qqlm1.png)

Click **Setup Stage** to crate the stage and fill other details i.e **Template Inputs**,

![template inputs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r6crm2c5ygs72juades6.png)

We use `default` namespace to run builder pods. The build pod runs with a Kubernetes Service Account(KSA) `harness-builder`.

:::note
The `harness-builder` KSA is mapped to Google IAM Service Account(GSA) `harness-delegate` to inherit the GCP roles using Workload Identity in this case to push the images to Google Artifact Registry(GAR).
:::

Click **Run** to run the pipeline to see the image build and pushed to GAR,

![Run Pipeline](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kbidxfctui4b3zmmoyuv.png)

As successful run would have pushed the image into GAR in this example its `asia-south1-docker.pkg.dev/pratyakshika/demos/lingua-greeter:latest`

![Build Success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hlo8z6klt1qtfidzgn8h.png)

## Cleanup

To clean up all the Google Cloud resources that were created as part of this demo, 

```shell
task destroy
```

## Summary

By using Workload Identity Delegate we have simplified and secured our CI pipelines which can now use any Google API services by configuring the GSA with right roles/permissions. The CI SaaS platform no longer need to store/update the Google API credentials.

Having deployed Workload Identity Delegate you can also do [keyless signing](https://docs.sigstore.dev/cosign/sign/#keyless-signing) of your container images using Google Application Credentials using [cosign](https://sigstore.dev).
