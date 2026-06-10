---
id: lambda-function-layer-detach
title: Lambda function layer detach
sidebar_label: Lambda Function Layer Detach
description: Detach a specified Lambda layer from a target AWS Lambda function for a configurable duration and reattach it afterwards so you can test how the workload behaves when a shared dependency layer disappears.
keywords:
  - chaos engineering
  - lambda function layer detach
  - aws fault
  - lambda fault
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-function-layer-detach
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda function layer detach is an AWS chaos fault that removes a Lambda layer (`LAMBDA_FUNCTION_LAYER_ARN`) from a target function (`FUNCTION_NAME` in `REGION`) for `TOTAL_CHAOS_DURATION` seconds, then reattaches it. While the layer is detached, code in the function that depends on the layer's libraries, binaries, or assets fails at runtime.

Use this fault to test how a Lambda workload behaves when a shared dependency layer is removed: whether new invocations fail with a clear error, whether monitoring detects the failure, and whether downstream consumers degrade gracefully.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Dependency removal:** When the layer disappears, does the function fail fast with a clear "module not found" / "binary missing" error?
- **Library auditing:** Identify whether the function actually uses libraries provided by the layer (functions that succeed without the layer can drop the dependency).
- **Monitoring fidelity:** Do CloudWatch alarms on Lambda `Errors` fire within the SLA?
- **Downstream impact:** Do consumers downstream of the Lambda function degrade gracefully when invocations start failing?
- **Recovery:** When the layer is reattached, do new invocations succeed without manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and currently has `LAMBDA_FUNCTION_LAYER_ARN` attached.
- **Layer ARN:** `LAMBDA_FUNCTION_LAYER_ARN` is the full ARN including the version (for example `arn:aws:lambda:us-east-1:123456789012:layer:my-layer:5`).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Lambda (zip package) | Supported |
| AWS Lambda (container image) | Not supported (container images do not use layers) |
| AWS regions | Supported in every commercial region; pass the region in `REGION` |

---

## Permissions required

The IAM principal that the chaos pod uses (the credentials mounted from the Harness Secret Manager file secret, the IRSA role on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the following AWS actions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "lambda:UpdateFunctionConfiguration",
        "lambda:GetLayerVersion"
      ],
      "Resource": "*"
    }
  ]
}
```

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

---

## Authentication

The fault supports three credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager file secret | Chaos infrastructure runs outside EKS, or you want explicit static credentials | Upload the AWS credentials file as a **File Secret** in Harness Secret Manager and reference its identifier via `AWS_AUTHENTICATION_SECRET` |
| IAM Roles for Service Accounts (IRSA) | Chaos infrastructure runs in EKS and uses an OIDC-bound service account | No tunable changes; the chaos pod inherits the role automatically. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set it up |
| Assume role | The fault needs to act in a different account or with elevated permissions | Set `ASSUME_ROLE_ARN` to the role ARN; the chaos pod assumes the role on top of its base credentials |

When using the Harness Secret Manager method, the contents of the File Secret should be the AWS credentials file in the standard `~/.aws/credentials` format:

```ini
[default]
aws_access_key_id = REPLACE_WITH_ACCESS_KEY_ID
aws_secret_access_key = REPLACE_WITH_SECRET_ACCESS_KEY
```

Upload this file as a **File Secret** in Harness Secret Manager (Project Setup → Secrets → New File Secret), and pass the secret identifier in `AWS_AUTHENTICATION_SECRET` when configuring the fault.

---

## Fault tunables

Configure the following fault parameters when you add Lambda function layer detach to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `LAMBDA_FUNCTION_LAYER_ARN` | Full ARN (including version) of the layer to detach. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Reads the current layer list on `FUNCTION_NAME`, removes `LAMBDA_FUNCTION_LAYER_ARN` from the configuration, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original layer list.

---

## Expected behavior during fault execution

- New invocations of the function no longer have access to the layer's contents.
- Code paths that depend on the layer fail with `ModuleNotFoundError`, missing-binary errors, or other runtime errors.
- CloudWatch metric `Errors` rises if the workload exercises the affected code paths during the chaos window.
- Warm containers initialized before the detach continue to use the layer until they are recycled by Lambda.

:::info When the fault ends
The chaos pod restores the original layer configuration. New invocations have the layer available again.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lambda errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_lambda_errors_sum` and assert it rises during the chaos window.
- **Function logs:** Inspect CloudWatch Logs for module/import errors.
- **Downstream availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm the layer is detached and then reattached:

1. **Inspect function configuration.**

   ```bash
   aws lambda get-function-configuration \
     --region <region> \
     --function-name <name> \
     --query "Layers[].Arn"
   ```

   During the fault the listed layers should not include `LAMBDA_FUNCTION_LAYER_ARN`. After recovery the original layer should be back.

2. **Invoke the function and inspect the response.**

   ```bash
   aws lambda invoke --region <region> --function-name <name> /tmp/out.json
   cat /tmp/out.json
   ```

   Invocations that exercise layer-provided code should return an error during the chaos window.

3. **Check CloudWatch Logs.**

   ```bash
   aws logs tail --region <region> /aws/lambda/<name> --since 5m
   ```

   Look for missing-module or missing-binary errors.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original layer configuration on the function.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, run `aws lambda update-function-configuration --function-name <name> --layers <layer-arn-list> --region <region>` with the original layer list (recorded in the chaos pod logs).
- **Workload recovery:** Containers initialized during the chaos window are replaced on next cold start; warm containers may continue to operate normally until then.

---

## Limitations

- **Single layer per experiment:** The fault detaches one layer ARN per experiment. Run multiple experiments in sequence to detach multiple layers.
- **Container images unaffected:** Container-image-based Lambda functions do not use layers; this fault has no effect on them.
- **Layer version specificity:** `LAMBDA_FUNCTION_LAYER_ARN` must include the version (the ARN ends with `:<version>`). A bare layer ARN without a version is not valid.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda function layer detach fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunction, lambda:GetFunctionConfiguration, lambda:UpdateFunctionConfiguration, and lambda:GetLayerVersion."
/>

<Troubleshoot
  issue="LAMBDA_FUNCTION_LAYER_ARN not found on the function"
  mode="docs"
  fallback="The layer ARN must currently be attached to FUNCTION_NAME. Run 'aws lambda get-function-configuration --function-name <name> --region <region> --query Layers' to list the attached layers and confirm the ARN (including version) matches exactly."
/>

<Troubleshoot
  issue="Function continues to work normally without the layer"
  mode="docs"
  fallback="The function may not actually use the libraries provided by the layer, in which case removing it has no effect. Use the experiment as a deliberate audit: if no invocation fails, the layer is a candidate for removal in normal deployments to reduce package size."
/>

<Troubleshoot
  issue="Layer not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the layer may stay detached. Run 'aws lambda update-function-configuration --function-name <name> --layers <original-layer-arn-list> --region <region>' with the original layer list recorded in the chaos pod logs to restore."
/>

---

## Related faults

- [Lambda update function memory](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-memory): Test the function under tightened memory.
- [Lambda update function timeout](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-timeout): Test the function under tightened timeout.
- [Lambda update role permission](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-role-permission): Strip IAM permissions instead of a layer.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
