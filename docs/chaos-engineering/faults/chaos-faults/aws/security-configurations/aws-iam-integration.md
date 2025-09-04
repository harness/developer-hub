---
id: aws-iam-integration
title: Use IAM roles for authentication
sidebar_position: 4
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/aws-iam-integration
---

## Authentication methods

There are two methods available for HCE to authenticate itself with AWS and obtain the necessary permissions that are specific to the targeted services:

* **Recommended: IAM Roles for Service Accounts (IRSA)**

  IRSA leverages an OpenID Connect (OIDC) provider for authentication. This method is applicable when the execution plane is installed on an Amazon EKS cluster. With IRSA, you have these benefits:

    - **Least privilege:** Using IRSA avoids extending permissions for the pods on the node, such as restricting the node IAM role for pods from making an AWS API call. You can scope IAM permissions to a service account, and this way, only pods that use that service account have access to those permissions.

    - **Credential isolation:** An experiment can only retrieve credentials for the IAM role associated with a particular service account. This experiment does not have access to credentials for other experiments belonging to other pods.

  This topic focuses on this authentication method.

* **Kubernetes Secret**

  This approach involves providing the necessary credentials through Kubernetes secrets. The advantage of this method is its compatibility with any cluster and platform. It is explained in the "notes" section of the experiment documentation.

## Account terminology and summary of steps for IAM integration

### Account terminology

In this topic, Harness refers to three types of accounts:

* **The experiment service account:** A Kubernetes service account created when you install a chaos infrastructure on your EKS cluster. This is the account that executes and controls chaos experiments. Its default name is `litmus-admin`, however you can use a different name.

* **AWS source account:** This AWS account also resides where you install a chaos infrastructure, and serves as the host for the EKS cluster. This account enables Harness CE to access resources across multiple target accounts.

* **Target accounts:** These are AWS accounts where you'll run experiments against resources and services to intentionally disrupt them. You can have many target accounts.

### Summary of steps for IAM integration

To use IRSA for AWS authentication, you:

1. [Enable the experiment service account to access AWS resources](#enable-the-experiment-service-account-to-access-aws-resources). This enables the Kubernetes service account used to control experiments to access resources across multiple AWS target accounts.

1. [Set up your target AWS accounts for IRSA](#set-up-your-target-accounts-for-irsa). The target accounts are the ones where you will run your chaos experiments.

1. [Establish a trust relationship](#establish-trust-between-the-aws-source-account-and-target-accounts) between the AWS source account and target accounts.

1. [Remove any references to secrets](#remove-all-secret-references-from-experiment-definitions) in chaos experiments.

## Enable the experiment service account to access AWS resources

Chaos experiments are initiated and controlled through this service account (usually named `litmus-admin`). You must enable this account to access AWS resources.

Follow the steps below to enable the experiment service account to access AWS resources.

### Step 1: Create an OIDC provider for your EKS cluster

You must create an IAM OpenID Connect (OIDC) identity provider for your cluster with `eksctl`. You only need to do this once for a cluster. For more information, go to [AWS documentation to set up an OIDC provider](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

To create an OIDC provider for your EKS cluster:

1. Run the following command to check if your cluster has an existing IAM OIDC provider.

  ```bash
  aws eks describe-cluster --name <your-cluster-name> --query "cluster.identity.oidc.issuer" --output text
  ```

  **Example output:**

  ```bash
  https://oidc.eks.us-west-1.amazonaws.com/id/D054E55B6947B1A7B3F200297789662C
  ```

  In the above example `us-west-1` is the region, and `D054E55B6947B1A7B3F200297789662C` is the OIDC provider ID.

1. Run the following command to list the IAM OIDC providers available to this account.

  ```bash
  aws iam list-open-id-connect-providers | grep <Provider_ID>
  ```

  Where: `Provider_ID` is the value returned from the output of the previous command. In our example, this value is `D054E55B6947B1A7B3F200297789662C`.

1. If no IAM OIDC identity provider is available for this account, create one for your cluster using the following command.

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

:::tip
* By default, chaos infrastructure associated with your chaos experiment has `litmus-admin` as a chaos service account. Based on the chaos experiment you wish to execute, you can configure the policy and attach the policy to a role, and go to [step 2](#associate-the-iam-role-with-the-experiment-service-account). Refer to [AWS superset policy](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to know more.
* If you wish to create a custom service account, you can create one and configure the policy and attach the policy with a role.
* For more information, go to [AWS IAM documentation](https://docs.aws.amazon.com/transfer/latest/userguide/requirements-roles.html).
:::

### Step 2: Configure the trust relationship of the IAM role in the source account

Configure the trust relationship in the IAM role associated with your experiment service account in the AWS source account. This step is required for both single-account and cross-account IRSA configurations.

Edit the trust relationship in the IAM role you created in Step 1.

You can find the JSON for the trust relationship in **AWS IAM > *ROLE_NAME* > Trust relationship** tab.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::<SOURCE_ACCOUNT_ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<OIDC_PROVIDER_ID>"
            },
            "Action": "sts:AssumeRoleWithWebIdentity"
        }
    ]
}
```

Where:
- `<SOURCE_ACCOUNT_ID>`: Your AWS source account ID
- `<REGION>`: The AWS region of your EKS cluster  
- `<OIDC_PROVIDER_ID>`: The OIDC provider ID from your EKS cluster

### Step 3: Associate the IAM role with the experiment service account

Associate the IAM role you created in Step 1 by annotating the experiment service account (usually `litmus-admin`). This will give it the required access to AWS resources.

To associate the IAM role to the experiment service account, run this command:

```bash
kubectl annotate serviceaccount -n <experiment_service_account_namespace> <experiment_service_account_name> \
eks.amazonaws.com/role-arn=arn:aws:iam::<account_ID>:role/<IAM_role_name>
```

:::note
- The default name for the experiment service account is `litmus-admin` and the namespace for chaos infrastructure is `HCE`, however, you can use different names.
- For the cluster autoscaler experiment, annotate the experiment service account in the `kube-system` namespace.
:::

### Step 4: Verify the association of the IAM role with the experiment service account

To verify the association between the experiment service account (`litmus-admin`) and the IAM role:

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

## Set up your target accounts for IRSA

:::info Setup Methods
This guide covers two methods for setting up target accounts for IRSA. Use the selector below to choose your preferred method:
- **OIDC Method**: Traditional approach using OIDC providers in each target account
- **Assume Role Method**: Simplified approach that eliminates the need for OIDC providers in target accounts
:::

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    "OIDC Method": {
      path: "/chaos-engineering/faults/chaos-faults/aws/security-configurations/content/aws-iam-integration/oidc-method.md"
    },
    "Assume Role Method": {
      path: "/chaos-engineering/faults/chaos-faults/aws/security-configurations/content/aws-iam-integration/assume-role-method.md"
    }
  }}
  toc = {toc}
/>