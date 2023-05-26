---
id: aws-iam-integration
title: Using IAM roles for authentication
sidebar_position: 2
---

## Authentication methods

There are two methods available for Harness CE to authenticate itself with AWS and obtain the necessary permissions that are specific to the targeted services:

**[Recommended] IAM Roles for Service Accounts (IRSA)** 

IRSA leverages an OpenID Connect (OIDC) provider for authentication. This method is applicable when the execution plane is installed on an Amazon EKS cluster. With IRSA, you have these benefits:

  - **Least privilege:** Using IRSA avoids extending permissions for the pods on the node, such as restricting the node IAM role for pods from making an AWS API call. You can scope IAM permissions to a service account, and then only pods that use that service account have access to those permissions.

  - **Credential isolation:** An experiment can only retrieve credentials for the IAM role associated with a particular service account. This experiment does not have access to credentials for other experiments belonging to other pods.

This topic focuses on this authentication method.

**Kubernetes Secret** 

  This approach involves providing the necessary credentials through Kubernetes secrets. The advantage of this method is its compatibility with any cluster and platform. It is explained in the Notes section of the experiment docs.

### Summary of steps for IAM integration

To use IRSA for AWS authentication, you:

1. [Enable service accounts to access AWS resources](#enable-service-accounts-to-access-aws-resources). The service account acts as the host for your EKS cluster, and enables CE to access resources across multiple AWS target accounts.

1. [Set up your target AWS accounts for IRSA](#set-up-your-target-accounts-for-irsa). The target accounts are the ones where you will run your chaos experiments.

## Enable service accounts to access AWS resources

Chaos experiments are initiated and controlled through a service account. You must enable this account, and other service accounts that need it, to access AWS resources. Follow the steps below to enable these accounts to access AWS resources.

### Step 1: Create an OIDC provider for your cluster

You must create an IAM OpenID Connect (OIDC) identity provider for your cluster with `eksctl`. You only need to do this once for a cluster. For more information, go to [AWS documentation to set up an OIDC provider](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

To create an OIDC provider for a cluster:

1. Run the following command to check if your cluster has an existing IAM OIDC provider.

  ```bash
  aws eks describe-cluster --name <your-cluster-name> --query "cluster.identity.oidc.issuer" --output text
  ```

  **Example output:**

  ```bash
  https://oidc.eks.us-west-1.amazonaws.com/id/D054E55B6947B1A7B3F200297789662C
  ```

  In the above example `us-west-1` is the region.

1. List the IAM OIDC providers in your account. 

  Run the following command, and replace `EXAMPLED539D4633E53DE1B716D3041E` (including brackets `<>`) with the value returned from the output of the previous command. In our example, this value is `<D054E55B6947B1A7B3F200297789662C>`.

  ```bash
  aws iam list-open-id-connect-providers | grep <EXAMPLED539D4633E53DE1B716D3041E>
  ```

1. If no IAM OIDC identity provider is available for your account, create one for your cluster using the following command
  ```bash
  eksctl utils associate-iam-oidc-provider --cluster <your-cluster-name> --approve
  ```

  **Example output:**

  ```
  2021-09-07 14:54:01 [ℹ]  eksctl version 0.52.0
  2021-09-07 14:54:01 [ℹ]  using region us-west-1
  2021-09-07 14:54:04 [ℹ]  will create IAM Open ID Connect provider for cluster "udit-cluster-11" in "us-west-1"
  2021-09-07 14:54:05 [✔]  created IAM Open ID Connect provider for cluster "litmus-demo" in "us-west-1"
  ```

### Step 2: Create an IAM role and policy for your service account 

Create an IAM policy with the permissions that you would like the experiment to have. There are several ways to create a new IAM permission policy. For more information, go to [AWS IAM documentation](https://docs.aws.amazon.com/transfer/latest/userguide/requirements-roles.html). 

Use the `eksctl` command to create the IAM permission policy. For example:

```bash
eksctl create iamserviceaccount \
--name <service_account_name> \
--namespace <service_account_namespace> \
--cluster <cluster_name> \
--attach-policy-arn <IAM_policy_ARN> \
--approve \
--override-existing-serviceaccounts
```

### Step 3: Associate an IAM role with other service accounts

Define the IAM role for every Kubernetes service account in your cluster that requires access to AWS resources.

To do so, add the following annotation to the service account:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
```

You can also annotate the experiment service account using this command:

```bash
kubectl annotate serviceaccount -n <SERVICE_ACCOUNT_NAMESPACE> <SERVICE_ACCOUNT_NAME> \
eks.amazonaws.com/role-arn=arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
```

:::note   
1. Annotating the `litmus-admin` service account in the `HCE` namespace works for most experiments. 
2. For the cluster autoscaler experiment, annotate the service account in the `kube-system` namespace.
:::

### Step 4: Verify the experiment service account associates with the IAM role

To verify the association between the service account and the IAM role: 

1. Run an experiment and describe one of the pods. 

1. Verify whether the `AWS_WEB_IDENTITY_TOKEN_FILE` and `AWS_ROLE_ARN` environment variables exist. For example:

  ```bash
  kubectl exec -n litmus <ec2-terminate-by-id-z4zdf> env | grep AWS
  ```
  **Example output:**
  ```
  AWS_VPC_K8S_CNI_LOGLEVEL=DEBUG
  AWS_ROLE_ARN=arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
  AWS_WEB_IDENTITY_TOKEN_FILE=/var/run/secrets/eks.amazonaws.com/serviceaccount/token
  ```

### Step 5: Configure the experiment CR

Since you have already configured IAM for the experiment service account, you won't have to create a secret and mount it with the experiment CR (enabled by default). 

To remove the secret mount, remove these lines from the experiment YAML:

```yaml
secrets:
- name: cloud-secret
    mountPath: /tmp/
```

## Set up your target accounts for IRSA

Target accounts are the accounts susceptible to chaos experiments, so their services can be intentionally disrupted or manipulated. The chaos experiments are initiated and controlled through a service account. 

### Step 1: Create an IAM role in each AWS target account

Create an IAM role in each AWS account to provide the required permissions (policy) for accessing the desired resources. This step allows you to grant permissions for chaos injection targeting various AWS services. You have the flexibility to define the level of permissions you wish to assign to the HCE.

### Step 2: Set up the OIDC provider in all target accounts

To add the OIDC provider to different target accounts:

1. Determine your OIDC URL.

    1. Open the AWS Management Console and navigate to the Amazon EKS service.
    1. Select your EKS cluster that corresponds to the OIDC provider.
    1. Click on the "Configuration" tab.
    1. Under the "OpenID Connect (OIDC)" section, locate the "Issuer URL."
    
      An example Issuer URL will look like this:

      ```
      https://oidc.eks.us-east-2.amazonaws.com/id/FOSBW293U0Q92423BR43290RU
      ```
1. Navigate to the target account in the IAM dashboard.
1. In the account dashboard, select **Identity Providers**, and then select **Add Provider**.
1. In the *Add and Identity provider* screen, for **Provider type**, select **OpenID Connect**. 
1. Provide the required details of the OIDC provider from the source account. 
    
    * **Provider URL:** Use the URL you retrieved in Step 1. 
    * **Audience:** Specify `sts.amazonaws.com`.

1. Select **Add provider**.

### Step 3: Configure a trust relationship on each target account [[[Is this overlapping with the first existing part?]]]

<<<< I think this is a missing step in the first part >>>>


