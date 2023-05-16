---
title: Build and Push to ECR Error
---

# How Can I Troubleshoot Pipeline Execution Error With The Delegate In An EKS Cluster & The AWS Connector Configured Using IRSA

### Module

- Harness CI

### Environment

- Infrastructure: Kubernetes
- OS: Linux

### Issue

- The pipeline will pull the images from private repositories from ECR but when you try to push the application image using the **“Build and Push to ECR”** You get the following error:

```
+ /kaniko/executor --dockerfile=/harness/docker/Dockerfile --context=dir:///harness/ --destination=<aws-account-id>.dkr.ecr.sa-east-1.amazonaws.com/hermod:latest --snapshotMode=redo --digest-file=/kaniko/digest-file
error checking push permissions -- make sure you entered the correct tag name, and that you are authenticated correctly, and try again: checking push permission for "<aws-account-id>.dkr.ecr.sa-east-1.amazonaws.com/hermod:latest": Post "https://<aws-account-id>.dkr.ecr.sa-east-1.amazonaws.com/v2/hermod/blobs/uploads/": EOF
exit status 1
```

### Resolution

- Configure the service account in the advanced infrastructure configuration & addition of a run step before the Build & Push to ECR Step.

### Diagnostic Steps

- First: Configure the service account in the advanced infrastructure configuration:

```
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

- Create a Run step before the “Build and Push to ECR” step to run the command:

```
aws ecr get-login-password --region <aws_region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com
```