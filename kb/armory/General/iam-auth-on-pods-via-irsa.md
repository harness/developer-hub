---
title: IAM auth on Pods via IRSA
---

## Introduction
EKS now has the ability to support ```sts:AssumeRole``` operations via cluster-based Service Accounts and with the use of the EKS backplane as an OIDC identity provider. 
[IAM Roles for Service Accounts](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) utilizes changes in the AWS identity APIs to recognize Kubernetes pods. This approach allows the usage of IAM roles at the pod level by building on the collaboration between an ```OpenID Connect (OIDC)``` identity provider and Kubernetes service account annotations.
This capability can be integrated into Armory Enterprise, and this eliminates the need for static credentials or an IAM profile. As such, individual Pods can assume an IAM role based on a simple annotation on the Service Account used by a given Pod. Armory Enterprise users should consider this feature if their security posture requires more granular IAM permissions on a per-service basis

## Prerequisites
The following are required:
* Creation of AWS role in accordance with the AWS documentation on [IAM roles for service accounts- Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) * Armory v2.26+

Note:IRSA requires a[ minimum version of the AWS SDK.](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) If the SDK version is not currently being utilized, you may [make the app IRSA-aware (in the pod).](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/)

## Instructions
To override the service accounts, the following example may be utilized:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      # Example for assigning service account to all Spinnaker pods
      spinnaker:
        kubernetes:
          serviceAccountName: spin-sa
      # Example of overriding service account for just Echo
      echo:
        kubernetes:
          serviceAccountName: spin-sa-echo
```

The service account would then need to have annotations applied for particular roles, as in the following example:
```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: spin-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::000000000000:role/my-spinnaker-role
```