---
title: Troubleshoot CI
description: Harness CI troubleshooting tool, guidance, and FAQs.
sidebar_position: 10
helpdocs_topic_id: jx7ew69ypa
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

[AIDA](./aida.md) and [debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode.md) can help you troubleshoot errors and other issues in Harness CI.

For troubleshooting guidance and questions related to Harness CI, go to the [Continuous Integration Knowledge Base](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs).

For troubleshooting guidance for the Harness Platform, delegates, connectors, secrets, or other modules go to the [Platform Knowledge Base](https://developer.harness.io/kb/platform) or [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

For additional support, you can [contact Harness Support](mailto:support@harness.io) or visit the [Harness Community](https://developer.harness.io/community).

## Connector connection test failures

If your connector connection tests (preflight checks) fail due to network restrictions, split DNS configurations, proxy setups, or restrictive firewall policies, but you know the connector will work at runtime, you can configure Harness to skip the connection validation.

To skip connector preflight checks, you need both:

1. **Account-level feature flag enabled**: Contact [Harness Support](mailto:support@harness.io) to enable the `CI_IGNORE_TEST_CONNECTION` feature flag for your account.
2. **Connector YAML configuration**: Add `ignoreTestConnection: true` to your connector's YAML configuration.

When both the feature flag and YAML property are enabled, connection tests will always return as "Successful" without performing actual connectivity validation.

For more information and example configurations, go to:

- [Create a connector using YAML - Skip connector preflight checks](/docs/platform/connectors/create-a-connector-using-yaml#optional-skip-connector-preflight-checks)
- [Connect to a Git repository - Connection tests fail due to network restrictions](/docs/platform/connectors/code-repositories/connect-to-code-repo#connection-tests-fail-due-to-network-restrictions)
- [CI FAQ - How can I skip connector preflight checks?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#how-can-i-skip-connector-preflight-checks-when-they-fail-due-to-network-restrictions)

:::warning

Use this feature carefully. Skipping connection tests means Harness won't validate whether the connector credentials are correct or if the remote service is accessible. Only use this when you're certain the connector will work at runtime despite failing preflight checks.

:::
