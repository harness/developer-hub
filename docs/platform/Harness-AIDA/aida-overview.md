---
title: Overview of Harness AI Development Assistant (AIDA)
description: Learn about how AIDA improves your experience on the Harness platform.
sidebar_position: 2
---

<!-- :::info important
Currently, AIDA for CCM is a beta feature that is behind the feature flags `CCM_GOVERNANCE_GENAI_ENABLE`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.

AIDA is generally available for CI and STO.

::: -->

The Harness Platform leverages Harness AI Development Assistant (AIDA:tm:) to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.

Here are some key benefits of Harness AIDA:

- **Auto-recognition of failures in pipelines:** The root cause analysis (RCA) feature generates recommendations for step failures in pipelines. Harness bases these recommendations on the step logs and the context of the failed step. For more information, go to [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida).
- **Asset governance:** The asset governance feature assists you in drafting rules that are based on your requirements and aligned with your governance goals. Harness AIDA governance support also offers detailed descriptions of built-in rules. When you are creating policies, this feature facilitates informed decision-making by clarifying the purpose, scope, and implications of each rule. For more information, go to [Asset governance with AIDA](/docs/category/harness-aida-for-asset-governance).
- **Security remediation:** The security remediation feature identifies security vulnerabilities, describes them, and suggests remediations. For more information, go to [Remediations with AIDA](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations).

## AIDA in Harness modules

| Feature                                                                                                                          | Description                                                                                                        | Module   | Status              |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ------------------- |
| [Troubleshoot CI builds](/docs/continuous-integration/troubleshoot-ci/aida)                                                      | Resolve your build failures with AIDA's root cause analysis (RCA).                                                 | CI       | Generally available |
| Troubleshoot CD deployments                                                                                                      | Resolve your deployment failures with AIDA's root cause analysis (RCA).                                                 | CD       | Generally available |
| Harness Support                                                                                                      |  Efficiently browse and discover Harness features and documentation.                                         | Platform       | Generally available |
| [Generate governance rules](/docs/category/harness-aida-for-asset-governance)                                                    | Generate rules for asset governance accompanied with detailed descriptions to optimize your cloud spend.           | CCM      | Generally available |
| [Security remediation](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations) | Leverage AIDA to quickly analyze vulnerabilities and secure applications.                                          | STO      | Generally available |
| ChaosGuard                                                                                                                       | Generate conditions for your chaos experiments with ChaosGuard.                                                    | Chaos    | Generally available |
| Automate feature flags integration                                                                                               | Incorporate feature flags into your development process through tailored code generation for seamless integration. | FF       | Beta                |
| Dashboard Intelligence                                                                                                           | AIDA empowers you to craft customized dashboards with widget-level control through interactive prompts.            | Platform | Beta                |
| Policy As Code Assistant                                                                                                         | Generate and integrate Open Policy Agent (OPA) Rego policies to meet your compliance standards.                    | CD       | Development         |
| Semantic Search                                                                                                                  | Search code repositories to provide accurate and context-aware results in Harness CODE.                            | CODE     | Development         |

<!-- Currently, AIDA is available for CCM, CI, and STO. -->

<!-- To learn more about the AI capabilities in Harness, go to each module's AIDA documentation:

- CCM: [Asset governance with AIDA](/docs/category/harness-aida-for-asset-governance).
- CI: [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida).
- STO: [Remediations with AIDA](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations). -->

### Enable AIDA

To enable AIDA in your Harness account, go to **Account Settings**, select **Account Resources**, select the **Harness AIDA** tile, and then enable the **Harness AI Development Assistant (AIDA)** setting. Select **Allow Overrides** if you want to be able to enable/disable AIDA for individual projects.

Additionally, for AIDA for CCM, you must Contact [Harness Support](mailto:support@harness.io) to enable the feature flag for AIDA for CCM. You don't need to do this for CI or STO because AIDA is generally available for these modules.


## AIDA terms and data privacy information

Visit the following Harness Legal pages for information about AIDA data privacy and terms of use:

- [AIDA Terms](https://www.harness.io/legal/aida-terms)
- [AIDA Data Privacy](https://www.harness.io/legal/aida-privacy)
