---
title: Secure CI
description: Best practices and features to help you build securely with Harness CI.
sidebar_position: 10
---

Harness offers features that help you build securely with Harness CI. Combine these features with known industry best practices.

## Branch protection and PR checks

- Code module ?
- Branch protection/PR checks (link)
- CODEOWNERS

## SLSA

With Harness CI, you can use the [Harness Software Supply Chain Assurance (SSCA) module](/docs/software-supply-chain-assurance) to generate, manage, store, and enforce SBOM and SLSA Provenance.

You can also [run scripts in Run steps](../use-ci/run-ci-scripts/run-step-settings) to generate SBOM and SLSA Provenance, and then [upload those artifacts](../use-ci/build-and-upload-artifacts/build-and-upload-an-artifact/#upload-artifacts).

## Secrets

Store tokens, passwords, and other sensitive data as [secrets](/docs/category/secrets) and then [use expressions to reference secrets](/docs/platform/secrets/add-file-secrets#reference-an-encrypted-file-secret) in your pipelines. For example, you can use an expression as the value for a variable:

```
APP_STORE_PASSWORD=<+secrets.getValue("my_app_store_password_secret")>
```

When you use secrets and variables in your CI pipelines, it is important to understand how those secrets appear in build logs. For example, secrets in [Run step output variables](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/#output-variables) are exposed in logs. For more information about secrets masking and sanitization, go to:

* [Harness Platform - Secrets in output, secrets sanitization](/docs/platform/secrets/add-file-secrets/#secrets-in-outputs)
* [Harness Platform - Line breaks and shell-interpreted characters](/docs/platform/secrets/add-file-secrets/#line-breaks-and-shell-interpreted-characters)
* [Harness Platform - Secrets and log sanitization](https://developer.harness.io/docs/platform/secrets/secrets-management/secrets-and-log-sanitization)

For information about managing secrets in Harness, go to:

* [Harness Platform - Secrets documentation](/docs/category/secrets)
* [Authenticate GCP secrets in scripts](./authenticate-gcp-key-in-run-step)
* [CI Knowledge Base - Override secrets in settings.xml at runtime](/kb/continuous-integration/articles/maven-settings-xml)

## Tokens

- harness tokens (links) - how to generate, understand token permissions
- External tokens in secrets - understand scope
- OIDC

## Access control

[Harness RBAC](/docs/platform/role-based-access-control/rbac-in-harness) helps you control access to your Harness account, organizations, and projects. For [authentication](), Harness supports SSO and 2FA log-in methods, as well as SAML authentication through various IDPs.

## Network security

For network security and private networking, Harness supports the following:

* [IP allowlists](/docs/platform/Security/add-manage-ip-allowlist)

- allowlists (link)
- Private networking with Harness-hosted runners: Harness Cloud secure connect (add to Harness Cloud page or create separate page)
- OIDC

## FAQs and troubleshooting

- Add tiles to CI landing page for security & mobile dev
- FAQs about secrets, security, etc.

* [Can I reference a secret type output variable exported from a CD custom stage in a CI stage?](https://developer.harness.io/kb/continuous-integration/continuous-integration-faqs#can-i-reference-a-secret-type-output-variable-exported-from-a-cd-or-custom-stage-in-ci-stage)
* [Secrets with line breaks and shell-interpreted characters](/kb/continuous-integration/continuous-integration-faqs/#secrets-with-line-breaks-and-shell-interpreted-special-characters)
