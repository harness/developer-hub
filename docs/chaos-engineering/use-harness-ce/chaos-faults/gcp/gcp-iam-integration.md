---
id: gcp-iam-integration
title: Use IAM roles for authentication
sidebar_position: 2
redirect_from:
    - /docs/chaos-engineering/chaos-faults/gcp/gcp-iam-integration
---

This section describes the methods of providing service accounts to authenticate your GCP cluster to execute GCP chaos experiments.

You can authenticate with GCP using a service account before accessing the target resources to apply chaos.
1. The first method of providing the service account credentials to your experiment is using a service account key.
2. The second method is applicable if you are using a GKE cluster. In this case, you can authenticate with the GCP using a keyless medium.

Hence, you can provide the service account credentials to your GKE cluster in two ways:

1. **Using Secrets:** You can create a secret that contains the GCP service account in your GKE cluster. This is utilized by the experiment to authenticate access to your GCP resources.

2. **IAM integration:** While using a GKE cluster, you can bind a GCP service account to a Kubernetes service account as an IAM policy, which can then be used by the experiment for keyless authentication using [GCP Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).

## Why should I use IAM integration for GCP authentication?
You can make a Google API request using a GCP IAM service account, wherein the service account serves as an identity that is used by the application to make calls to Google APIs.

As an application developer, you can create individual IAM service accounts for each application and download and save the keys as a Kubernetes secret (which you have to manually rotate).

### Drawbacks
* This is a time-consuming process.
* The service account keys last for 10 years only (or until you manually rotate them).
* High management costs of key inventory and rotation.
* An attacker may cause a security breach and access the account using an unaccounted key.

Hence, HCE does not recommend using service account keys as secrets to authenticate GKE workloads.

## Authenticate GCP using Workload Identity
Workload Identity allows you to restrict the possible **blast radius** of a security breach while enforcing the principle of least privilege across your environment. It accomplishes this by automating workload authentication best practices.

### Benefits of Workload Identity

* It eliminates the need for workarounds, simplifying the implementation of security best practices.
* Your tasks have the permissions they require to fulfill their role with the principle of least privilege. This minimises the breadth of a potential compromise.
* It doesn't limit the lifetime of service account keys since credentials supplied to the Workload Identity are valid for a short time, decreasing the blast radius in the case of a compromise.
* The risk of unintentional credential disclosure due to a human mistake is greatly reduced because Google controls the namespace service account credentials for you.
* You don't have to manually rotate these credentials.

## How do I enable service accounts to access GCP resources?

You can follow the steps from the [GCP documentation for Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to enable service account access.

### Step 1: Enable Workload Identity
Enable Workload Identity on clusters and node pools using the Google Cloud CLI or the Google Cloud Console. You must enable the Workload Identity at the cluster level before you can enable the Identity on node pools.

Workload Identity can be enabled for an existing cluster as well as a new cluster.

* To enable Workload Identity on a new cluster, run the following command:

    ```
    gcloud container clusters create CLUSTER_NAME \
    --region=COMPUTE_REGION \
    --workload-pool=PROJECT_ID.svc.id.goog
    ```

* To enable Workload Identity on a node pool when you have the node pool name:

    ```
    gcloud container node-pools update CLUSTER_NAME_NODE_POOL_NAME --cluster=CLUSTER_NAME --zone us-west1-a --workload-metadata-from-node=GKE_METADATA
    ```
    
        - To list the node pools that would help identify the node pool name in the cluster,
        
            ```
            gcloud container node-pools list --cluster=CLUSTER_NAME --zone us-west1-a --project <PROJECT_ID>
            ```
    
        - To verify that Workload Identity is enabled on a node pool, 

            ```
            gcloud container node-pools describe CLUSTER_NAME_NODE_POOL_NAME --cluster=CLUSTER_NAME --zone us-west1-a
            ```

Replace the following:
* **CLUSTER_NAME:** The name of your new cluster.
* **COMPUTE_REGION:** The compute engine region of your cluster. For zonal clusters, use `--zone=COMPUTE_ZONE`.
* **PROJECT_ID:** Your Google Cloud project ID.

* To enable Workload Identity on an existing cluster, run the following command:

```
gcloud container clusters update CLUSTER_NAME \
--region=COMPUTE_REGION \
--workload-pool=PROJECT_ID.svc.id.goog
```

Replace the following:
* **CLUSTER_NAME:** The name of your new cluster.
* **COMPUTE_REGION:** The compute engine region of your cluster. For zonal clusters, use `--zone=COMPUTE_ZONE`.
* **PROJECT_ID:** Your Google Cloud project ID.

### Step 2: Configure HCE to use Workload Identity

Assuming that you have already installed the relevant HCE chaos infrastructure in your GKE cluster as well as the Kubernetes service account you want to use for your GCP experiments, execute the following steps:.

1. Get credentials for your cluster by executing the below command:

```
gcloud container clusters get-credentials CLUSTER_NAME
```

* Replace `CLUSTER_NAME` with the name of your cluster that has Workload Identity enabled.

2. Create an IAM service account for your application or use an existing IAM service account instead. You can use any IAM service account for any project in your organisation.
* For Config Connector, apply the IAMServiceAccount object to your selected service account.

* To create a new IAM service account using the gcloud CLI, run the following command:

```
gcloud iam service-accounts create GSA_NAME \
--project=GSA_PROJECT
```

Replace the following:
* **GSA_NAME:** The name of the new IAM service account.
* **GSA_PROJECT:** The project ID of the Google Cloud project for your IAM service account.


3. Ensure that this service account has all the roles required to interact with the compute engine resources, which include VM instances and persistent disks depending on the GCP experiments that you want to execute.
* To grant additional roles, use the following command:

```
gcloud projects add-iam-policy-binding PROJECT_ID \
--member "serviceAccount:GSA_NAME@GSA_PROJECT.iam.gserviceaccount.com" \
--role "ROLE_NAME"
```

Replace the following:
* **PROJECT_ID:** Your Google Cloud project ID.
* **GSA_NAME:** The name of your IAM service account.
* **GSA_PROJECT:** The project ID of the Google Cloud project of your IAM service account.
* **ROLE_NAME:** The IAM role to assign to your service account, such as roles/spanner.viewer.

4. Allow the Kubernetes service account to be used for the GCP experiments to impersonate the GCP IAM service account. You can achieve this by adding an IAM policy binding between the two service accounts. This binding allows the Kubernetes service account to act as the IAM service account. Below is the command to bind the service accounts:

```
gcloud iam service-accounts add-iam-policy-binding GSA_NAME@GSA_PROJECT.iam.gserviceaccount.com \
--role roles/iam.workloadIdentityUser \
--member "serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]"
```

Replace the following:
* **GSA_NAME:** The name of your IAM service account.
* **GSA_PROJECT:** The project ID of the Google Cloud project of your IAM service account.
* **KSA_NAME:** The name of the service account to be used for HCE GCP experiments.
* **NAMESPACE:** The namespace in which the Kubernetes service account to be used for HCE GCP experiments is present.

:::tip
For default HCE setup, **KSA_NAME** is **litmus-admin**.
:::

5. Annotate the Kubernetes service account to be used for HCE GCP experiments with the email address of the GCP IAM service account. Below is the command:\

```
kubectl annotate serviceaccount KSA_NAME \
--namespace NAMESPACE \
iam.gke.io/gcp-service-account=GSA_NAME@GSA_PROJECT.iam.gserviceaccount.com
```

Replace the following:
* **KSA_NAME:** The name of the service account to be used for HCE GCP experiments.
* **NAMESPACE:** The namespace in which the Kubernetes service account to be used for HCE GCP experiments is present.
* **GSA_NAME:** The name of your IAM service account.
* **GSA_PROJECT:** The project ID of the Google Cloud project of your IAM service account.

### Step 3: Update ChaosEngine manifest

* Add the following value to the ChaosEngine manifest field `.spec.experiments[].spec.components.nodeSelector` to schedule the experiment pod on nodes that use the Workload Identity.

`iam.gke.io/gke-metadata-server-enabled: "true"`

### Step 4: Update the ChaosExperiment manifest

* Remove `cloud-secret` from `.spec.definition.secrets` in the ChaosExperiment manifest since you will not use a secret to provide your GCP Service Account credentials.

This way, you can execute your GCP experiments with a **keyless authentication** mechanism provided by GCP using Workload Identity.

## How do I disable IAM service accounts from accessing GCP resources?
To stop using the Workload Identity, revoke access to the GCP IAM service account and disable Workload Identity on the cluster.

### Step 1: Revoke access to the IAM service account
* To revoke access to the GCP IAM service account, execute the following command:

```
gcloud iam service-accounts remove-iam-policy-binding GSA_NAME@GSA_PROJECT.iam.gserviceaccount.com \
--role roles/iam.workloadIdentityUser \
--member "serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]"
```

Replace the following:
* **PROJECT_ID:** The project ID of the GKE cluster.
* **NAMESPACE:** The namespace in which the Kubernetes service account to be used for HCE GCP experiments is present.
* **KSA_NAME:** The name of the service account to be used for HCE GCP experiments.
* **GSA_NAME:** The name of the IAM service account.
* **GSA_PROJECT:** The project ID of the IAM service account.

:::note
It takes up to 30 minutes for cached tokens to expire.
:::

* Remove the annotation from the service account being used for HCE GCP experiments using the following command:

```
kubectl annotate serviceaccount KSA_NAME \
--namespace NAMESPACE iam.gke.io/gcp-service-account-
```

### Step 2: Disable Workload Identity

* Disable Workload Identity on each node pool using the following command:

```
gcloud container node-pools update NODEPOOL_NAME \
--cluster=CLUSTER_NAME \
--workload-metadata=GCE_METADATA
```

* Repeat this command for every node pool in the cluster.

* Disable Workload Identity in the cluster using the following command:

```
gcloud container clusters update CLUSTER_NAME \
--disable-workload-identity
```
