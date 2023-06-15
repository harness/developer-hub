---
title: Creating a GitOps Cluster with IAM role
description: This topic describes how to create a Harness GitOps cluster in Amazon EKS and deploy to it using an IAM role.
sidebar_position: 2
helpdocs_topic_id: pptv7t53i9
helpdocs_category_id: 013h04sxex
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create a Harness GitOps cluster in Amazon EKS and deploy to it using an IAM role.

## What is an IAM Role?

In AWS (Amazon Web Services), IAM stands for Identity and Access Management. IAM allows you to manage user access and permissions to various AWS services and resources. Specifically, it is a set of permissions that you can assign to AWS resources or to an AWS service. It is not associated with a specific user or group, but rather with a resource or service.

IAM roles are commonly used in scenarios where you want to grant permissions to AWS services or resources, rather than individual users. They are used to define the set of permissions that a service or resource needs to perform specific tasks or access certain resources within your AWS environment.

This tutorial covers how to handle the setup of Harness GitOps Agent in a multicluster AWS environment and deploy to clusters by letting the Agent assume an IAM role. 

:::note

Currently, this feature is behind the feature flag, `GITOPS_IAM`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
Also note that GitOps Clusters with IAM role can only be created on a GitOps Agent that is installed in Amazon EKS.

:::

## Objective

The setup we'll be creating is the following:

1. A management cluster that will host the Harness GitOps Agent.

2. An AWS IAM role ***role/ArgoCD*** that the GitOps Agent will assume.

3. A testing cluster that we'll deploy a guestbook application into.

4. An AWS IAM role ***role/Deployer*** that has permissions to deploy applications in your testing cluster.

![](static/create-cluster-iam-86.png)

## Prerequisites

Prerequisites An AWS account ready to receive a couple of new VPC's with EKS clusters.

1. [awscli](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) installed and configured for your account

2. [eksctl](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl) installed

3. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed

## Creating a Management Cluster

### Provision the management cluster

We'll create two clusters in a single AWS account. The configuration will also work with cross-account and multi-cluster setups, by setting the proper trust relations between IAM roles.

`eksctl create cluster --name management --with-oidc`

The above command creates the management cluster and everything it needs to function (VPC, security groups, EC2 nodegroup, etc). This command can take quite some time to complete (10 to 20 minutes).

We've created the management cluster with an oidc provider. The AWS Authenticator packaged with Harness GitOps Agent will use this provider to acquire a token. With this it can assume the AWS IAM role ***role/ArgoCD*** that we'll create next.

### Creating AWS IAM role
Now lets create an AWS IAM role that GitOps Agent can use. 

First set our AWS account ID and the OIDC_PROVIDER of the management cluster as environment variables:

`AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)`

`OIDC_PROVIDER=$(aws eks describe-cluster --name management --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\/\///")`


Create a trust.json file with the variables you set. Herein we also reference the GitOps Agent namespace and make it so all argocd clusterroles can assume the AWS IAM role we'll create in the next step ***(system:serviceaccount:iam:\*)***

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
          "${OIDC_PROVIDER}:sub": "system:serviceaccount:argocd:*"
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
aws iam create-role --role-name ArgoCD --assume-role-policy-document file://trust.json --description "IAM Role to be used by ArgoCD to gain AWS access"
```

Finally we'll create an inline policy that gives the IAM role the ability to assume other roles. We need this so ArgoCD can assume the Deployer role we'll create later.

(We could also use the ArgoCD role directly for that purpose, but I find having a separate role to use to Deploy resources into the testing cluster to be more flexible and more secure.)

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

You can use the AWS web console to check the role we just created. The main thing to note is that we created this role so that the service accounts (kubernetes) that ArgoCD uses in the management cluster have an AWS IAM Role to assume through the OIDC provider.

### Setting up Harness GitOps Agent

Install ArgoCD Create a namespace for argocd in the management cluster

```
kubectl create namespace argocd

wget
https://raw.githubusercontent.com/argoproj/argo-cd/v1.8.3/manifests/install.yaml

kubectl -n argocd apply -f install.yaml After the install is completed
you should see several pods running:

kubectl -n argocd get pods 
```


### Patch ArgoCD 

In order to instruct ArgoCD to use the role we defined earlier, we need to annotate the kubernetes service accounts ArgoCD used with the ARN of the role. The kubectl patch command provides us with an easy way to adjust a kubernetes resource:

```
kubectl -n argocd patch serviceaccount argocd-application-controller --type=json \
    -p="[{\"op\": \"add\", \"path\": \"/metadata/annotations/eks.amazonaws.com~1role-arn\", \"value\": \"arn:aws:iam::${AWS_ACCOUNT_ID}:role/ArgoCD\"}]"

kubectl -n argocd patch serviceaccount argocd-server --type=json \
    -p="[{\"op\": \"add\", \"path\": \"/metadata/annotations/eks.amazonaws.com~1role-arn\", \"value\": \"arn:aws:iam::${AWS_ACCOUNT_ID}:role/ArgoCD\"}]"
```

It is important that the annotations show the correct ARN of the ArgoCD
Role otherwise ArgoCD won't know which AWS IAM role to assume. Check the
service accounts are changed correctly with:

```
kubectl -n argocd describe serviceaccount argocd-server

kubectl -n argocd describe serviceaccount argocd-application-controller
```

Patch the deployments to set the securityContext/fsGroup to 999 so the
user of the docker image can actually use IAM Authenticator. You need
this because the IAM Authenticator will try mount a secret on
/var/run/secrets/eks.amazonaws.com/serviceaccount/token. If the correct
fsGroup (999 corresponds to the argocd user) isn't set, this will fail.

```
kubectl -n argocd patch deployment argocd-server --type=json  \
    -p='[{"op": "add", "path": "/spec/template/spec/securityContext/fsGroup", "value": 999}]'

kubectl -n argocd patch statefulset argocd-application-controller --type=json \
    -p='[{"op": "add", "path": "/spec/template/spec/securityContext/fsGroup", "value": 999}]'
```

After the patching of the deployment and the statefulset you should see
the application-controller and argocd-server pods restart.

## Creating testing cluster 

### Provision the testing cluster 

Now we've got a working management cluster with ArgoCD installed we need to start setting up our testing cluster where ArgoCD will deploy to. We'll create another cluster with everything it needs again, so please execute this command

`eksctl create cluster --name testing`

The management cluster we created earlier was created with an oidc provider. We won't need that on the testing cluster. We do however need an AWS IAM Role capable to deploy applications inside this cluster.

### Create AWS IAM Role 
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

## Deploy Guestbook application 

### Register testing cluster 

We need to register the testing cluster with ArgoCD to be able to create applications that will deploy to it. We'll do that by registering a secret with all the specific cluster details and deploying that secret into the management cluster.

To be able to do this we need:

Server: the http endpoint of the kubernetes api of the server

caData: the corresponding public certificate if the kubernetes api

roleArn: the role ArgoCD will have to assume to be able to deploy on
this cluster.

```
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)

CLUSTER_ENDPOINT=$(aws eks describe-cluster --name testing --query "cluster.endpoint" --output text)

CLUSTER_CERT=$(aws eks describe-cluster --name testing --query "cluster.certificateAuthority.data" --output text)

read -r -d '' TESTING_CLUSTER <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: testing-cluster
  labels:
    argocd.argoproj.io/secret-type: cluster
type: Opaque
stringData:
  name: testing
  server: ${CLUSTER_ENDPOINT}
  config: |
    {
      "awsAuthConfig": {
          "clusterName": "testing",
          "roleARN": "arn:aws:iam::${AWS_ACCOUNT_ID}:role/Deployer"
      },
      "tlsClientConfig": {
        "caData": "${CLUSTER_CERT}"
      }
    }
EOF

echo "${TESTING_CLUSTER}" > testing-cluster.yml && cat testing-cluster.yml
```

Confirm that the file shows the proper cluster roleArn, certificate and endpoint.

Switch the kubectl context back to the management cluster:

`kubectl config use-context $(kubectl config get-contexts -o=name | grep management)`

Finally register the cluster with ArgoCD:

`kubectl -n argocd apply -f testing-cluster.yml`

You should be able to find it in the UI of ArgoCD now, with a status of 'unknown'.

### Register Guestbook application 

We'll use a publicly available guestbook application to try out our setup. We can simply add the application and it's public repository with a single argocd command:

Be sure the ArgoCD admin interface is available by opening up your extra terminal and running:

argocd app create guestbook \--repo
https://github.com/argoproj/argocd-example-apps.git \--path guestbook
\--dest-namespace default \--dest-name testing \--directory-recurse

If you visit the UI you should see a guestbook application that is out of sync. Sync it to let ArgoCD create the kubernetes resources inside the testing cluster.

Now this is the basic working setup, you can finetune this in many ways.

For example in the trust relationship of role/ArgoCD we've set it up so that all roles inside the argocd namespace are allowed to assume role/ArgoCD. You can change that so that only the specific argocd-server and application-controller roles are trusted. That however is an exercise left for the reader.

## Clean up eksctl delete cluster management

eksctl delete cluster testing

aws iam delete-role \--role-name Deployer

aws iam delete-role-policy \--role-name ArgoCD \--policy-name AssumeRole

aws iam delete-role \--role-name ArgoCD 

Some resources may take a while to delete themselves, even after the delete commands return. This is due to the nature of how AWS cleans up resources like EC2 instances and security groups. You may want to check that any EKS clusters are deleted and any EC2 nodes are in the terminated state.
