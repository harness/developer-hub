---
title: Generate AWS access tokens from OIDC tokens
description: Use the AWS OIDC token plugin to authenticate with AWS services using OIDC in Harness CI pipelines.
sidebar_position: 42
---

The [AWS OIDC plugin](https://github.com/harness-community/drone-aws-oidc) lets you authenticate with AWS services using [OIDC federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) instead of long-lived access keys. This is useful in Harness CI pipelines running on Harness Cloud or self-hosted delegates where temporary credentials are preferred.

## Prerequisites

- An AWS IAM Role configured with a federated identity provider using OIDC.
- OIDC configured in your AWS account (e.g., via IAM Identity Provider).
- The pipeline must be running in a context where Harness can issue an OIDC token (e.g., on a hosted delegate with OIDC enabled).
- The feature flag `CI_ENABLE_OUTPUT_SECRETS` must be enabled on your account. This flag is required for the plugin to write temporary credentials as output secrets. If it is not enabled, credentials will not be available in subsequent steps. Contact [Harness Support](mailto:support@harness.io) to enable this flag.
- This setup is supported on both Harness Cloud and Self-managed Kubernetes Infrastructure.

For more on configuring AWS for OIDC, refer to [AWS OIDC setup](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html).

## Example Pipeline Usage

```yaml
- step:
    type: Plugin
    name: assume-role-with-oidc
    identifier: assume_role_with_oidc
    spec:
      image: plugins/aws-oidc
      settings:
        iamRoleArn: arn:aws:iam::123456789012:role/harness-ci-role
        role_session_name: foo # defaults to harness-aws-oidc
        duration: 3600 # in seconds
```

This step uses the injected OIDC token from Harness to authenticate with AWS and assume the specified role. The plugin writes the following temporary credentials as **output variables**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

:::warning Important
The AWS OIDC plugin does **not** export credentials as plain environment variables that are automatically available in subsequent steps. Instead, it writes them as **output secrets**, which you must explicitly reference using Harness output variable expressions. If you attempt to use `AWS_ACCESS_KEY_ID` directly without mapping it through an output variable expression, the credentials will not be available and AWS API calls will fail with errors such as `AuthorizationHeaderMalformed`.
:::

## Inputs

| Key               | Required | Description                                                                 |
| ----------------- | -------- | --------------------------------------------------------------------------- |
| `iamRoleArn`      | ✅ Yes   | The ARN of the AWS IAM role to assume via OIDC.                             |
| `oidcTokenId`     | ✅ Yes   | The OIDC token to exchange for temporary AWS credentials.                   |
| `roleSessionName` | ❌ No    | Optional name for the assumed role session. Defaults to `harness-aws-oidc`. |
| `duration`        | ❌ No    | Optional duration (in seconds) for temporary credentials.                   |
| `logLevel`        | ❌ No    | Optional log level (e.g. `debug`, `info`, `warn`).                          |

## Use AWS credentials in subsequent steps

To use the temporary AWS credentials in downstream steps, you must pass them explicitly using Harness output variable expressions in the step's `envVariables` configuration. Replace `assume_role_with_oidc` with the identifier of your AWS OIDC plugin step.

Example:

```yaml
- step:
    type: Run
    name: Run AWS Command
    identifier: runAwsCommand
    spec:
      image: amazon/aws-cli
      shell: sh
      envVariables:
        AWS_ACCESS_KEY_ID: <+steps.assume_role_with_oidc.output.outputVariables.AWS_ACCESS_KEY_ID>
        AWS_SECRET_ACCESS_KEY: <+steps.assume_role_with_oidc.output.outputVariables.AWS_SECRET_ACCESS_KEY>
        AWS_SESSION_TOKEN: <+steps.assume_role_with_oidc.output.outputVariables.AWS_SESSION_TOKEN>
      command: aws s3 ls
```

## Related Links

[AWS OIDC plugin GitHub Repo](https://github.com/harness-community/drone-aws-oidc)

[Azure OIDC Token Plugin](/docs/continuous-integration/secure-ci/azure-oidc-token-plugin)

[GCP OIDC Token Plugin](/docs/continuous-integration/secure-ci/gcp-oidc-token-plugin)
