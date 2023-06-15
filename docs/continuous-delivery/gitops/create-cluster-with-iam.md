---
title: Creating a GitOps Cluster with IAM role
description: This topic describes how to create a Harness GitOps cluster in Amazon EKS and deploy Applications to it using an IAM role.
sidebar_position: 2
---

This topic describes how to create a Harness GitOps cluster in Amazon EKS and deploy to it using an IAM role.

## What is an IAM Role?

In AWS (Amazon Web Services), IAM stands for Identity and Access Management. IAM allows you to manage user access and permissions to various AWS services and resources. Specifically, it is a set of permissions that you can assign to AWS resources or to an AWS service. It is not associated with a specific user or group, but rather with a resource or service.

IAM roles are commonly used in scenarios where you want to grant permissions to AWS services or resources, rather than individual users. 

This tutorial covers how to handle the setup of a Harness GitOps Agent in a multi-cluster AWS environment and deploy to those clusters by letting the Agent assume an IAM role. 

:::note

Currently, this feature is behind the feature flag, `GITOPS_IAM`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Also note that GitOps Clusters with IAM role can only be created for a GitOps Agent that is installed in Amazon EKS.

:::

## Objective

The setup we'll be creating is the following:

1. A management cluster that will host the Harness GitOps Agent.

2. An AWS IAM role **role/ArgoCD** that the GitOps Agent will assume first.

3. A testing cluster that we'll deploy a guestbook application into.

4. An AWS IAM role **role/Deployer** that has permissions to deploy applications in your testing cluster.

![](static/create-cluster-iam-86.png)

## Prerequisites

An AWS account ready to receive a couple of new VPC's with EKS clusters. Make sure you also have the following:

1. [awscli](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) installed and configured for your account

2. [eksctl](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl) installed

3. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed

## Creating a Management Cluster

### Provision the management cluster

We'll create two clusters in a single AWS account. The configuration will also work with cross-account and multi-cluster setups, by setting the proper trust relations between IAM roles.

The command below creates the management cluster and everything it needs to function (VPC, security groups, EC2 nodegroup, etc). This command can take quite some time to complete (10 to 20 minutes).

`eksctl create cluster --name management --with-oidc`

We've created the management cluster with an oidc provider. The AWS Authenticator packaged with Harness GitOps Agent will use this provider to acquire a token. With this it can assume the AWS IAM role **role/ArgoCD** that we'll create next.

### Creating an AWS IAM role for your GitOps Agent
Now let's create an AWS IAM role that your GitOps Agent can use. 

We first set our AWS account ID and the OIDC_PROVIDER of the management cluster as environment variables:

`AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)`

`OIDC_PROVIDER=$(aws eks describe-cluster --name management --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\/\///")`


Now, create a trust.json file with the variables you have set. Herein we also reference the namespace you will deploy your GitOps Agent to and make it so all clusterroles can assume the AWS IAM role we'll create in the next step **(system:serviceaccount:iam:\*)**
```
read -r -d '' TRUST_RELATIONSHIP <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringLike": {
          "${OIDC_PROVIDER}:sub": "system:serviceaccount:iam:*"
        }
      }
    }
  ]
}
EOF


echo "${TRUST_RELATIONSHIP}" > trust.json && cat trust.json 
```

Make sure trust.json includes the proper AWS_ACCOUNT_ID and OIDC_PROVIDER. We will use trust.json while creating the AWS IAM Role:

```
aws iam create-role --role-name ArgoCD --assume-role-policy-document file://trust.json --description "IAM Role to be used by Harness GitOps Agent to gain AWS access"
```

Finally we'll create an inline policy that gives the IAM role the ability to assume other roles. We need this so that GitOps Agent can assume the Deployer role we'll create later.

(We could also use the ArgoCD role directly for that purpose, but having a separate role to use to Deploy resources into the testing cluster is generally more flexible and more secure.)

```
read -r -d '' POLICY <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AssumeRole",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "*"
        }
    ]
}
EOF

echo "${POLICY}" > policy.json && cat policy.json

aws iam put-role-policy --role-name ArgoCD --policy-name AssumeRole --policy-document file://policy.json
```

You can use the AWS web console to check the role we just created. The main thing to note is that we created this role so that the service accounts (kubernetes) that the Agent uses in the management cluster have an AWS IAM Role to assume through the OIDC provider.

### Setting up Harness GitOps Agent

Create a namespace for Harness GitOps Agent in the management cluster.

`kubectl create namespace iam`

Please refer to [Installing a GitOps Agent](install-a-harness-git-ops-agent.md) for a tutorial on how to create a Harness GitOps Agent.

### Patch GitOps Agent

In order to instruct GitOps Agent to use the role we defined earlier, we need to annotate the kubernetes service accounts the Agent used with the ARN of the role. 

```
kubectl -n iam patch serviceaccount argocd-application-controller --type=json \
    -p="[{\"op\": \"add\", \"path\": \"/metadata/annotations/eks.amazonaws.com~1role-arn\", \"value\": \"arn:aws:iam::${AWS_ACCOUNT_ID}:role/ArgoCD\"}]"

kubectl -n iam patch serviceaccount gitops-agent --type=json \
    -p="[{\"op\": \"add\", \"path\": \"/metadata/annotations/eks.amazonaws.com~1role-arn\", \"value\": \"arn:aws:iam::${AWS_ACCOUNT_ID}:role/ArgoCD\"}]"
```

It is important that the annotations show the correct ARN of the ArgoCD Role otherwise the Agent won't know which AWS IAM role to assume. Check the service accounts are changed correctly with:

```
kubectl -n iam describe serviceaccount gitops-agent

kubectl -n iam describe serviceaccount argocd-application-controller
```

Patch the deployments to set the securityContext/fsGroup to 999 so the user of the docker image can actually use IAM Authenticator. You need this because the IAM Authenticator will try mount a secret on /var/run/secrets/eks.amazonaws.com/serviceaccount/token. If the correct fsGroup (999 corresponds to the argocd user) isn't set, this will fail.

```
kubectl -n iam patch deployment gitops-agent --type=json  \
    -p='[{"op": "add", "path": "/spec/template/spec/securityContext/fsGroup", "value": 999}]'

kubectl -n iam patch statefulset argocd-application-controller --type=json \
    -p='[{"op": "add", "path": "/spec/template/spec/securityContext/fsGroup", "value": 999}]'
```

After the patching of the deployment and the statefulset you should see the application-controller and gitops-agent pods restart.

Please ensure that the GitOps Agent is healthy and connected before proceeding any further.

## Creating testing cluster 

### Provision the testing cluster 

Now we've got a working management cluster with GitOps Agent installed, we need to start setting up our testing cluster where GitOps Agent will deploy to. We'll create another cluster with everything it needs again, so please execute this command

`eksctl create cluster --name testing`

The management cluster we created earlier was created with an oidc provider. We won't need that on the testing cluster. We do however need an AWS IAM Role capable to deploy applications inside this cluster.

### Create AWS IAM Role to deploy Applications
We want the ArgoCD role to be able to assume the Deployer role.Thats why we also create a trust relationship for the ArgoCD role. (In a multi account setup you would change this trust relationship to reference the ArgoCD role in the account that holds the management cluster, and you would place the Deployer role in the same account as the testing cluster.)

```
read -r -d '' TRUST_TESTING <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${AWS_ACCOUNT_ID}:role/ArgoCD"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
EOF

echo "${TRUST_TESTING}" > trust-testing.json && cat trust-testing.json
```
Make sure the AWS_ACCOUNT_ID is the correct account for the ArgoCD Role using the following:

```
aws iam create-role --role-name Deployer --assume-role-policy-document file://trust-testing.json --description "IAM Role to be used by AWS to Deploy in the testing cluster"

eksctl create iamidentitymapping --cluster testing  --arn arn:aws:iam::${AWS_ACCOUNT_ID}:role/Deployer --group system:masters --username deployer
```

### Register testing cluster in Harness

We need to register the testing cluster with Harness to be able to create applications that will deploy to it. 

To be able to do this we need:
- Master URL: The HTTP endpoint of the Kubernetes API of the server.
- Role ARN: The role your GitOps Agent will have to assume to be able to deploy on this cluster.
- Certificate Authority Data: The corresponding public certificate if the Kubernetes API.

In the Harness Platform, click on GitOps -> Settings -> Clusters and create a new Cluster. For Authentication, click **Use IRSA**. 
IRSA stands for IAM Roles for Service Accounts.

![](static/create-cluster-iam-87.png)

You should be able to successfully create a cluster in Harness with a connection status of 'unknown'.

### Deploy Applications to your cluster

Now, you should be able to deploy Applications to your cluster via Harness. For understanding how to do this, please refer to [Add a Harness GitOps Application](harness-cd-git-ops-quickstart.md#step-4-add-a-harness-gitops-application)
