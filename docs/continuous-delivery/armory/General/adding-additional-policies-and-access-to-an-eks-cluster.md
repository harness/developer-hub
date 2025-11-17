---
title: Adding Additional Policies and Access to an EKS Cluster
---

## Introduction
As environments become more complex and additional security requirements are necessary for the nods and cluster of the environment, some fundamental basics of policies and permissions should be considered for the environment. 
Depending on the particular security policy of the environment

## Prerequisites
Access to the cluster, roles and policy for the AWS environment

## Instructions
When deploying the EKS environment, IAM Roles are usually used to manage the security and access available to the environment.  The roles and permissions associated to allow Spinnaker to interact with the AWS environment are tied to the **EKS Cluster Node IAM Role** which can be found at:
* Log in to the AWS Management Console* Go to the EKS Administration portal* On the left menu select **Clusters **under **Amazon EKS** and select the appropriate cluster name* Click on the **Configuration** tab, then the **Compute** tab* Click on the appropriate **Node Group*** In the information for the Node Group, there will be an entry regarding the **Node IAM Role ARN**. Access needs to be provided to this role so that the cluster can access the appropriate resources (e.g. **Secrets Manager** or **S3 Buckets** for the storage of Secrets)

