---
title: AWS Named Profile For Chaos
---

## Introduction

- An AWS profile is used to manage different users (settings and credentials) to perform the AWS API operations. HCE support the AWS profile feature which enables the user to run AWS faults with the desired named profile, so in case you want to run different fault with different profiles OR if you want to categorize the credentials for fault based on the environment/team/blast radius control using this you can easily do that.

- Multiple named profiles can be stored in the AWS credentials files as shown below. You can specify one default profile that is used when no profile is explicitly referenced.

```bash
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[dev]
aws_access_key_id=AKERI44QH8DHBEXAMPLE
aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

### To prepare multiple profiles for HCE ,follow the below mentioned steps:

#### 1. Prepare Kubernetes secret

- To get authenticated with AWS cloud you can use the Kubernetes secret with AWS credentials. Here is a sample Kubernetes secret with multiple named profiles.

_secret.yaml_

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

- It is recommended to use the secret name the same as `cloud-secret`, if you want to use a custom name then you would need to update the experiment manifest and you may need to use your own default healthcheck probes.

#### 2. Provide AWS profile in the experiment

- Once you have created the secret and are ready to launch your AWS fault, you need to add a custom env `AWS_PROFILE` in the fault with a value containing the profile name you want to use for that particular fault, for example, if I want to execute the fault with `dev` profile I need to set up the `AWS_PROFILE` env to `dev`. By default, the `default` profile will be used to run the faults.

