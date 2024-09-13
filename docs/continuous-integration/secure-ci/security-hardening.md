---
title: Security hardening for Harness CI
description: Best practices and features to help you build securely with Harness CI.
sidebar_position: 10
---

Harness offers features that help you build securely with Harness CI. Combine these features with known industry best practices.

The information is targeted at Harness CI. It is not a comprehensive explanation of all security features and capabilities throughout all Harness products, such as [Harness STO](/docs/security-testing-orchestration).

## Access control

[Harness RBAC](/docs/platform/role-based-access-control/rbac-in-harness) helps you control access to your Harness account, organizations, and projects. For [authentication](/docs/platform/authentication/authentication-overview), Harness supports SSO and 2FA log-in methods, as well as SAML authentication through various IDPs.

## Branch protection and PR checks

Failed CI pipelines don't inherently block PR merges. Harness can [send pipeline statuses to your PRs](/docs/continuous-integration/use-ci/codebase-configuration/scm-status-checks), but you must configure branch protections and checks (such as protection rules, CODEOWNERS, linting, and other checks or restrictions) *in your source control provider*.

## SLSA

With Harness CI, you can use the [Harness Supply Chain Security (SCS) module](/docs/software-supply-chain-assurance) to generate, manage, store, and enforce SBOM and SLSA Provenance.

You can also [run scripts in Run steps](../use-ci/run-step-settings) to generate SBOM and SLSA Provenance, and then [upload those artifacts](../use-ci/build-and-upload-artifacts/build-and-upload-an-artifact/#upload-artifacts).

## Secrets

Store tokens, passwords, and other sensitive data as [secrets](/docs/category/secrets) and then [use expressions to reference secrets](/docs/platform/secrets/add-file-secrets#reference-an-encrypted-file-secret) in your pipelines. For example, you can use an expression as the value for a variable:

```
APP_STORE_PASSWORD=<+secrets.getValue("my_app_store_password_secret")>
```

When you use secrets and variables in your CI pipelines, it is important to understand how those secrets appear in build logs. For example, secrets in [Run step output variables](/docs/continuous-integration/use-ci/run-step-settings/#output-variables) are exposed in logs. For information about secrets masking and sanitization, go to:

* [Secrets in output, secrets sanitization](/docs/platform/secrets/add-file-secrets/#secrets-in-outputs)
* [Line breaks and shell-interpreted characters](/docs/platform/secrets/add-file-secrets/#line-breaks-and-shell-interpreted-characters)
* [Secrets and log sanitization](/docs/platform/secrets/secrets-management/secrets-and-log-sanitization)

For more information about managing secrets in Harness, go to:

* [Secrets documentation](/docs/category/secrets)
* [Authenticate GCP secrets in scripts](./authenticate-gcp-key-in-run-step)
* [Override secrets in settings.xml at runtime](/kb/continuous-integration/articles/maven-settings-xml)

## Tokens and keys

Harness APIs use Harness API keys and tokens to authenticate requests. Make sure to create tokens with the appropriate permission scopes. Tokens inherit permissions from the account used to create them. For more information, go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys).

You can store tokens and keys from non-Harness providers as [secrets in Harness](#secrets). Harness provides information about required permissions for third-party tokens and keys when relevant, such as authentication credentials for [Git connectors](/docs/platform/connectors/code-repositories/connect-to-code-repo#code-repo-connector-permissions-and-access); however, this is limited to the permissions necessary for successful integration with Harness.

For information about creating keys/tokens for a specific provider or tool, refer to the documentation for that provider or tool.

## Network security

For network security and private networking, Harness offers features such as:

* [IP allowlists](/docs/platform/security/add-manage-ip-allowlist)
* [Secure connect for Harness Cloud](./secure-connect)
* [OIDC](#oidc)

## OIDC

You can use OpenID Connect (OIDC) with Harness CI.

With Harness Cloud, you can leverage the [OIDC connectivity mode](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference#use-openid-connect-oidc) in your [GCP connectors](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp). You can then use OIDC-enabled GCP connectors in GCP-related steps, such as the [Build and Push to GAR step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-gar). You can also [Configure OIDC with GCP WIF for builds on Harness Cloud](/docs/continuous-integration/secure-ci/configure-oidc-gcp-wif-ci-hosted).

Not all step types support GCP connectors. However, you might need to perform operations with OIDC in steps that don't support GCP connectors. For example, if you use a Run step to pull artifacts from GAR with OIDC, you need the OIDC token in the Run step to successfully pull the artifact. In these cases, you can [use the GCP OIDC plugin to generate a GCP access token from an OIDC token](./gcp-oidc-token-plugin.md).

OIDC is also available in other areas of Harness, such as in the [platform-agnostic Kubernetes cluster connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference/#openid-connect) and in other Harness modules.

## FAQ and troubleshooting

* [Can I reference a secret type output variable exported from a CD custom stage in a CI stage?](https://developer.harness.io/kb/continuous-integration/continuous-integration-faqs#can-i-reference-a-secret-type-output-variable-exported-from-a-cd-or-custom-stage-in-ci-stage)
* [Secrets with line breaks and shell-interpreted characters](/kb/continuous-integration/continuous-integration-faqs/#secrets-with-line-breaks-and-shell-interpreted-special-characters)
