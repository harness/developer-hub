# Set up a self-managed platform in GCP
This document walks you through the steps required to set up CCM for GCP in a self-managed platform.

You need to perform the following tasks to set up CCM for GCP: 
1. Configure the prerequisites in GCP.
1. Setup data pipeline components using Terraform.
2. Deploy services using Helm Charts.
 Before performing these tasks, you need to add the required permissions, set up a service account user, and enable the required APIs.

## Configure the prerequisites in GCP

### Enable the required APIs in your GCP project
1. Log on to your GCP console. 
2. Select your GCP project and search for **Cloud Functions API**. 
3. Enable the required APIs in your GCP project.

:::important
You must have a `Editor` role to enable APIs in a project.
:::

```mdx-code-block
</TabItem>
<TabItem value="1" label="API">
```
You must enable the following APIs to set up Harness CCM. To learn how to enable these APIs, go to [Enabling an API in your Google Cloud project](https://cloud.google.com/endpoints/docs/openapi/enable-api).


```
Enable Cloudfunctions api (cloudfunctions.googleapis.com)
Enable cloud build api (cloudbuild.googleapis.com)
Enable cloud run admin api (run.googleapis.com)
Enable Artifact Registry API (artifactregistry.googleapis.com)
Enable BQ Data transfer api (bigquerydatatransfer.googleapis.com)
Enable storage transfer api (storagetransfer.googleapis.com)
Enable Cloud Pub/Sub api (pubsub.googleapis.com)
Enable Secret Manager API
```


```mdx-code-block
</TabItem>
<TabItem value="2" label="CLI">
```

```
$ gcloud services enable cloudfunctions.googleapis.com \
cloudbuild.googleapis.com \
run.googleapis.com \
artifactregistry.googleapis.com \
bigquerydatatransfer.googleapis.com \
storagetransfer.googleapis.com \
pubsub.googleapis.com \
secretmanager.googleapis.com \
cloudbilling.googleapis.com \
iamcredentials.googleapis.com \
container.googleapis.com \
```
```mdx-code-block
</TabItem>
</Tabs>
```
### Set up CCM-specific service account user

Create a Service Account in GCP. For example, harness-ccm-service-user@project-name.iam.gserviceaccount.com
You need to add the roles shown in the following screenshot to the service account (Principal) for different purposes. Go to [Manage access to projects, folders, and organizations](https://cloud.google.com/iam/docs/granting-changing-revoking-access) for more information.

<docimage path={require('./static/gcp-smp-role.png')} width="50%" height="50%" title="Click to view full size image" />

For the `Project IAM Admin` role, it is recommended to add the following conditions to allow assignment of only `pubsub admin` and `bq admin` roles.

<docimage path={require('./static/gcp-roles-condition.png')} width="50%" height="50%" title="Click to view full size image" />

## Deploying data pipeline components via Terraform

1. Download the TAR file.
2. Untar the file locally.
3. Modify top-level main.tf with this information:

 
```
variable "deployment" {
  type = string
  default = "onprem-prod-apple"
}

variable "projectId" {
  type = string
  default = "<enter here>"
}

variable "region" {
  type = string
  default = "us-central1"
}

variable "serviceAccount" {
  type = string
  default = "<enter here service account email>"
}

variable "awsS3Bucket" {
  type = string
  default = "harness-ccm-service-data-bucket-<accountid>"
}

variable "aws_secret_key" {
  type = string
  default = "<enter here>"
}

variable "aws_access_key" {
  type = string
  default = "<enter here>"
}
```
4. To apply this Terraform file, execute the following commands:

  1. cd to the folder
  2. terraform init to initiate
  3. terraform plan to create an execution plan
  4. terraform apply to execute the plan

```
Login to GCP via cli
$ gcloud auth application-default login

$ cd terraform-onprem

$ ls
./       ../      ce/      main.tf

<main.tf> should be modified at this point before proceeding further.

$ terraform init
Initializing modules...
- ce-cloudfunctions in ce

Initializing the backend...
...
...


$ terraform plan

$ terraform apply

Revoke ADC
$ gcloud auth application-default revoke
```
This sets up the following entities:

* ~89 resources on GCP.

  Pubsub topics, buckets, CFs, BQ tables, GCS transfer jobs

* Depending on how GCP auth is done, you might have to execute the following command to bind the service account with the user/sa through which you are executing the TF.

```
gcloud iam service-accounts add-iam-policy-binding <service-sa> \
  --member='user:<usersa>' --role='roles/iam.serviceAccountUser'
```
If you come across a missing permission error message on the spun up resources, assign the following roles to the specific cloud resources: 
* Grant the **Pubsub publisher** role on the **aws-billing-gcs pubsub** topic for the default storage transfer SA.
Example service account for storage transfer service: **project-<projectnumber>@storage-transfer-service.iam.gserviceaccount.com**  
* Grant the **storage.buckets.get** which is part of the **Storage Admin** role, permission on **awscustomerbillingdata-onprem-prod-** equivalent bucket for the default storage transfer SA.