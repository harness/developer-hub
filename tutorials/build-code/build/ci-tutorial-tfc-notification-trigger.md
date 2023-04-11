---
sidebar_position: 9
title: Terraform notification triggers
description: Trigger CI pipeline using Terraform Cloud notifications using custom CI Webhooks.
keywords: [Hosted Build, Continuous Integration, Terraform, GitOps]
slug: /build-code/build/tfc-notification
---

# Trigger CI using Terraform Cloud Notification

Continuous Integration(CI) pipelines needs a **target** infrastructure to which the CI artifacts are deployed. The deployments are handled by CI or we can leverage Continuous Deployment pipelines. Modern day architecture uses automation tools like [terraform](https://terraform.io), [ansible](https://www.ansible.com/) to provision the target infrastructure, this type of provisioning is called [IaaC](https://en.wikipedia.org/wiki/Infrastructure_as_code).

Usually CI/CD and IaaC don't run in tandem. Many times we want to trigger the CI pipeline only when the **target** infrastructure is ready to bootstrap with software components that are required by CI/CD pipelines.

As part of this DIY blog let us tackle the aforementioned problem with an use case.

## Use Case

As CI/CD user I would like to provision a Kubernetes Cluster on Google Cloud Platform(GKE) using Terraform. The successful provision of the cluster should **notify** a CI pipeline to start bootstrapping [ArgoCD](https://argo-cd.readthedocs.io/en/stable/) on to GKE.

![Architecture Overview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a56swhyp5lzm9n5d9kpr.png)

## What you need ?

- A [Terraform Cloud Account](https://app.terraform.io/public/signup/account). Create a workspace on the terraform cloud to be used for this exercise.
- [Google Cloud Account](https://cloud.google.com) used to create the Google Kubernetes Engine(GKE) cluster.
- Though we can use any CI platform, for this demo we will use [Harness CI](https://www.harness.io/products/continuous-integration)as our CI platform. You can do a **free tier** signup from [here](https://app.harness.io/auth/#/signup/?module=ci&utm_source=internal&utm_medium=social&utm_campaign=community&utm_content=kamesh-tfc-ci-demos&utm_term=tutorial).

## Demo Sources

The demo uses the following git repositories a sources,

- IaaC [vanilla-gke](https://github.com/harness-apps/vanilla-gke): the terraform source repository that will be used with terraform cloud to provision GKE.
- Kubernetes manifests [bootstrap-argocd](https://github.com/harness-apps/bootstrap-gke): the repository that holds kubernetes manifests to bootstrap argo CD on to the GKE cluster

### Fork and Clone the Sources

To make fork and clone easier we will use [gh CLI](https://cli.github.com/). Download the add `gh` to your `$PATH`.

Let us create a directory where we want to place all our demo sources,

```shell
mkdir -p "$HOME/tfc-notification-demo"
cd "$HOME/tfc-notification-demo"
export DEMO_HOME="$PWD"
```

#### IaaC

Clone and fork `vanilla-gke` repo,

```shell
gh repo clone harness-apps/vanilla-gke
cd vanilla-gke
gh repo fork
export TFC_GKE_REPO="$PWD"
```

#### Bootstrap Argo CD Sources

Clone and fork `bootstrap-argocd` repo,

```shell
cd ..
gh repo clone harness-apps/bootstrap-argocd
cd bootstrap-argocd
gh repo fork
export ARGOCD_BOOTSTRAP_REPO="$PWD"
```

For rest of the blog we will reference the repositories `vanilla-gke` and `bootstrap-argocd` as `$TFC_GKE_REPO` and `$ARGOCD_BOOTSTRAP_REPO`.

## Harness CI

In the following sections we will define and create the resources required to define a CI pipeline using Harness platform.

### Create Harness Project

Create new harness project named `terraform_integration_demos` using Harness Web Console,

![New Harness Project](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x2xlbd9079oesmni06ut.png)

Update its details as shown,

![New Harness Project Details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6hw2w4j51yosjj3in819.png)

Follow the wizard leaving rest to defaults and on the last screen choose **Continuous Integration**,

![Use CI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j2emzksrd7wplaapqjlj.png)

Click **Go to Module** to go to project home page.

### Define New Pipeline

Click **Pipelines** to define a new pipeline,

![Get Started with CI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kgads8qcwj6t8y7oeg4m.png)

For this demo will be doing manual clone, hence disable the clone,

![Disable](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/af9r24aycvqp0noecy2o.png)

Click on **Pipelines** and delete the default **Build pipeline**,

![Delete Pipeline](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdmpydgk99elqufic570.png)

### Add `harnessImage` Docker Registry Connector

As part of pipelines we will be pulling image from DockerHub. `harnesImage` [Docker Registry Connector](ttps://developer.harness.io/docs/platform/connectors/connect-to-harness-container-image-registry-using-docker-connector) helps pulling the public Docker Hub images as an anonymous user.

Let us configure an `harnesImage` connector as described in docker registry connectors. The pipelines we create as part of the later section will use this connector.

### Configure GitHub

#### GitHub Credentials

Create a [GitHub PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for the account where you have have forked the repositories `$TFC_GKE_REPO` and `$ARGOCD_BOOTSTRAP_REPO`. We will refer to the token as `$GITHUB_PAT`.

From the **Project Setup** click **Secrets**,

![New Text Secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d21zbiyr2gdqjt4j0wrl.png)

Update the encrypted text secret details as shown,

![GitHub PAT Secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7bijo1z8gv5s99txxceq.png)

Click **Save** to save the secret,

![Project Secrets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qb5cu0a0bg5fk51w1o7z.png)

#### Connector

As we need to clone the sources from GitHub, we need to define a **GitHub Connector**, from the **Project Setup** click **Connectors**,

![New Connector](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gra2qdl6a7x66btz5jqk.png)

From connector list select **GitHub**,

![New GitHub Connector](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ktjszxdgilu44rn36my0.png)

Enter the name as **GitHub**,

![GitHub Connector Overview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cdlxl7h6wm4aa724bi8l.png)

Click **Continue** to enter the connector details,

![GitHub Connector Details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x13z7pzaslkj14uznd6g.png)

Click **Continue** and update the GitHub Connector credentials,

![GitHub Connector Credentials](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nx9y4cezd1899j4dl1qm.png)

When selecting the **Personal Access Token** make sure you select the `GitHub PAT` that we defined in previous section,

![GitHub PAT Secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iyf7wqipnwk9dx7zafpy.png)

Click **Continue** and use select **Connect through Harness Platform**,

![Connect through Harness Platform](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o99912vww36fbleygp9d.png)

Click **Save and Continue** to run the connection test, if all went well the connection should successful,

![GH Connection Success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2090ay6wtd98l1yb78kz.png)

## Google Cloud Service Account Secret

We need Google Service Account(GSA) credentials(JSON Key) to query the GKE cluster details and create resources on it.

### Set environment

```shell
export GCP_PROJECT="the Google Cloud Project where Kubernetes Cluster is created"
export GSA_KEY_FILE="path where to store the key file"
```

### Create SA

```shell
gcloud iam service-accounts create gke-user \
  --description "GKE User" \
  --display-name "gke-user"
```

### IAM Binding

Add permissions to the user to be able to provision kubernetes resources,

```shell
gcloud projects add-iam-policy-binding $GCP_PROJECT \
  --member="serviceAccount:$GSA_NAME@$GCP_PROJECT.iam.gserviceaccount.com" \
  --role="roles/container.admin"
```

### Download And Save GSA Key

:::note Important
Only security admins can create the JSON keys. Ensure the Google Cloud user you are using has **Security Admin** role.
:::

```shell
gcloud iam service-accounts keys create "${GSA_KEY_FILE}" \
    --iam-account="gke-user@${GCP_PROJECT}.iam.gserviceaccount.com"
```

### GSA Secret

Get back to the **Project Setup** click **Secrets**,

![New File Secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2jbw4oldn0x2729ypy9g.png)

Add the GSA secret details as shown,

![GSA Secret Details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ecn7fe4taun68wbzhhn2.png)

:::note Important
When you browse and select make sure you select the `$GSA_KEY_FILE` as the file for the secret.
:::

Click **Save** to save the secret,

![Project Secrets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y69kufxvkhg8ia8qxs0q.png)

## Terraform Workspace

On your terraform cloud account create a new workspace called **vanilla-gke**. Update the workspace settings to use Version Control and make it point to [$TFC_GKE_REPO](#iaac).

![TFC Workspace VCS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tuifarjnq1vxpf1h9dhd.png)

Configure the workspace with following variables,

![TFC Workspace Variables](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sxld08inhuftsu4r87l1.png)

For more details on available variables, check [Terraform Inputs](https://github.com/harness-apps/vanilla-gke#inputs).

:::note Important
The `GOOGLE_CREDENTIALS` is Google Service Account JSON Key with permissions to create GKE cluster. Please check the <https://github.com/harness-apps/vanilla-gke#pre-requisites> for the required roles and permissions. This key will be used by Terraform to create the GKE cluster. When you add the key to terraform variables, you need to make it as base64 encoded e.g. the following command does base64 encoding of `YOUR_GOOGLE_CREDENTIALS_KEY_FILE`

```shell
cat YOUR_GOOGLE_CREDENTIALS_KEY_FILE | tr -d \\n
```

:::

Lookup your terraform cloud organizations and save the value in to the variable `$TF_WORKSPACE`,

![TFC Cloud Organization](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d9txo4xjf5wukxi9pfp3.png)

We need Terraform API Token to pull the outputs of a terraform run. From your terraform user settings **Create an API token**,

![Terraform API Token](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ob5t70rajo04jz5arjyd.png)

Make sure to copy the value and save it to a variable named `$TF_TOKEN_app_terraform_io`. We will refer to this token as part of the Harness CI pipeline.

## Harness CI Pipeline

Getting back to Harness web console, navigate to your project **terraform_integration_demos**, click **Pipelines** and **Create a Pipeline** --> **Import From Git**,

![New CI Pipeline Import](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hrnqdphbjmgjsn4jaaia.png)

Update the pipeline details as shown,

![Pipeline Details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9cjbfq9n9akx1xcu21vl.png)

:::note Important
Make sure the **Name** of the pipeline is `bootstrap argocd pipeline` to make the import succeed with defaults.
:::

![Pipeline Import Successful](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mrr4uqouwsuwrw6ascw9.png)

Click the `bootstrap argocd pipeline` from the list to open the **Pipeline Studio** and click on the stage **Bootstrap Argo CD** to bring up the pipeline steps,

![Pipeline Steps](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/btazl7vzrl6n7r5y72ar.png)

You can click on each step to see the details.

The Pipeline uses the following secrets,

- `google_application_credentials` - the GSA credentials to manipulate GKE
- `terraform_cloud_api_token` - the value of `$TF_TOKEN_app_terraform_io`
- `terraform_workspace` - the value `$TF_WORKSPACE`
- `terraform_cloud_organization` - the value `$TF_CLOUD_ORGANIZATION`

We already added `google_application_credentials` secret as part of the [earlier](#gsa-secret) section. Following the similar pattern let us add the `terraform_cloud_api_token`, `terraform_workspace` and `terraform_cloud_organization` as text secrets.

:::tip
From the **Project Setup** click **Secrets**,
![New Text Secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d21zbiyr2gdqjt4j0wrl.png)
:::

Your project should now have the following list of secrets,

![all terraform secrets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/slblnj5atbig84djnat8.png)

:::tip
You can also skip adding `terraform_workspace` and `terraform_cloud_organization` as we can extract the values from the webhook payload using the expressions `<+trigger.payload.workspace_name>` and `<+trigger.payload.organization_name>` respectively.
:::

## Notification Trigger

For the Harness CI pipelines to listen to Terraform Cloud Events we need to define a **Trigger**, navigate back to pipelines and select the **bootstrap argocd pipeline** --> **Triggers**,

![Pipeline Triggers](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wi19na36updy8iw0rbcx.png)

Click **Add New Trigger** to add a new webhook trigger(Type: `Custom`),

![Custom Webhook Trigger](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/51m5842vy49r8j6v09mg.png)

On the **Configuration** page enter the name of the trigger to be `tfc notification`,

![TFC Notification Config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u7w3tjzgrnfjh7thfs7y.png)

Leave rest of the fields to defaults and click **Continue**, leave the **Conditions** to defaults and click **Continue**.

On the **Pipeline Input** update the **Pipeline Reference Branch** to be set to **main**

![Pipeline Input](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dqc6h0c3zolmsk1e958v.png)

:::note
The **Pipeline Reference Branch** does not have any implication with this demo as we do manual clone of resources.
:::

Click **Create Trigger** to create and save the trigger.

![Trigger List](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wb65schvss82ze38zeil.png)

### Copy Webhook URL

![Webhook URL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/awr2qr1rbvl3sp96ng6f.png)

Let us refer to this value as `$TRIGGER_WEBHOOK_URL`.

## Terraform Notification

On your terraform cloud console navigate to the workspace **Settings** --> **Notifications**,

![TFC Notifications](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4dz8cfedh4l15eti8wyi.png)

Click **Create Notification** and select **Webhook** as the **Destination**,

![Webhook](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vkuzrz1ooegbjhvan0ur.png)

Update the notification details as shown,

![TFC Webhook Details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rthp02u6nqt1elqkya0x.png)

Since we need to bootstrap argo CD only on create events we set the triggers to happen only on **Completed**,

![Trigger Events](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ztmiebchh4ybecx6pid.png)

Click **Create Notification** to finish the creation of notification.

![TFC Webhook Creation Success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5z8yl21d2uffup5u4ir5.png)

:::note
The creation would have fired a notification, if the cluster is not ready yet the pipeline would have failed.
:::

**Congratulations!!**. With this setup any new or updates that's done to the `$TFC_GKE_REPO` will trigger a plan and apply on Terraform Cloud. A **Completed** plan will trigger the `bootstrap argocd pipline` to run and apply the manifests from `$BOOTSTRAP_ARGOCD_REPO` on the GKE cluster.

An example of successful pipeline run

![Pipeline Success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1mxvq8tmtvi6hlhmzsd6.png)

## Summary

By using the terraform notifications feature we were able to make the CI pipelines listen to IaaC events and run the CI pipelines as needed.

![Notification Pattern](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a56swhyp5lzm9n5d9kpr.png)
