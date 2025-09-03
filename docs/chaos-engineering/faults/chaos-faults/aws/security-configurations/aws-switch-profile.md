---
title: AWS secret-based authentication
sidebar_position: 2
description: Manage different users to perform AWS API calls
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/aws/security-configurations/aws-switch-profile
- /docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-switch-profile
---
This section describes how different users are managed to perform AWS API calls.

An AWS profile is used to manage different users (settings and credentials) to perform the AWS API operations. HCE supports the AWS profile feature which enables you to run AWS faults with the desired named profile. This feature comes into play when you want to run multiple faults with different profiles or categorize the credentials for fault based on the environment or team or blast radius control.

You can store multiple named profiles in the AWS credentials files as shown below. When no profile is explicitly referenced, you can specify a default profile.

```bash
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[dev]
aws_access_key_id=AKERI44QH8DHBEXAMPLE
aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

## Prepare multiple profiles for HCE

### 1. Prepare Kubernetes secret

- To get authenticated with AWS cloud you can use the Kubernetes secret with AWS credentials. Here is a sample Kubernetes secret `secret.yaml` with multiple named profiles.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-secret
  namespace: <CHAOS-NAMESPACE>
type: Opaque
stringData:
  cloud_config.yml: |-
    [default]
    aws_access_key_id = AKIAIOSFODNN7EXAMPLE
    aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

    [dev]
    aws_access_key_id = AKERI44QH8DHBEXAMPLE
    aws_secret_access_key = je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY

    [qa]
    aws_access_key_id = AKERSD4QH8DHBEXAMMAN
    aws_secret_access_key = kemSdGbClwBF/westrwk/h3yCo8nvbEXAMPLEKEY
```

- Replace the `<CHAOS-NAMESPACE>` with the namespace where you have installed the chaos infrastructure, also provide your named profiles (here it is `default`, `dev`, and `qa`) with the appropriate credentials.

- Create the secret using `kubectl apply -f secret.yaml`

- HCE recommends you use the same secret name as the `cloud-secret`. If you want to use a custom name, then you would need to update the experiment manifest, and you may need to use your own default healthcheck probes.

### 2. Provide AWS profile in the experiment

- Once you have created the secret and are ready to launch your AWS fault, you need to add a custom env `AWS_PROFILE` in the fault with a value containing the profile name you want to use for that particular fault. For example, if you want to execute the fault with a `dev` profile, then set up the `AWS_PROFILE` env to `dev`. By default, the `default` profile will be used to run the faults.

