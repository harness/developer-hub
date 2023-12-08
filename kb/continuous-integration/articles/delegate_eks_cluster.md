---
title: Build and Push to ECR error
---

# Harness CI pipeline execution errors with the delegate in an EKS cluster and the AWS connector using IRSA

## Conditions

* Module: Harness CI
* Environment:
   * Infrastructure: Kubernetes
   * OS: Linux
* Delegate location: EKS cluster
* AWS connector configuration: Uses IRSA

## Problem

The pipeline can pull images from private ECR repositories, but when you try to push an application image with the **Build and Push to ECR** step, you get the following error:

```
+ /kaniko/executor --dockerfile=/harness/docker/Dockerfile --context=dir:///harness/ \
--destination=<aws-account-id>.dkr.ecr.sa-east-1.amazonaws.com/hermod:latest --snapshotMode=redo \
--digest-file=/kaniko/digest-file
error checking push permissions -- make sure you entered the correct tag name, \
and that you are authenticated correctly, and try again: \
checking push permission for "<aws-account-id>.dkr.ecr.sa-east-1.amazonaws.com/hermod:latest": \
Post "https://<aws-account-id>.dkr.ecr.sa-east-1.amazonaws.com/v2/hermod/blobs/uploads/": EOF
exit status 1
```

## Solution

1. Configure the [Service account in the Kubernetes cluster build infrastructure settings](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#service-account-name). For example:

   ```yaml
   infrastructure:
     type: KubernetesDirect
     spec:
       connectorRef: test-connector
       namespace: harness-delegate-ng
       serviceAccountName: **harness-delegate-sa**
       automountServiceAccountToken: true
       nodeSelector: {}
       os: Linux
   ```

2. Before your **Build and Push to ECR** step, add a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) that runs the following command:

   ```
   aws ecr get-login-password --region <aws_region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com
   ```
