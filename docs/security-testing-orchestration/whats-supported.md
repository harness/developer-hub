---
title: What's supported in Harness STO
description: Supported STO features and integrations
sidebar_label: What's supported
sidebar_position: 05
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



This topic lists the supported STO features and integrations to scan your code repositories, container images, and other targets for security vulnerabilities. Harness STO is supported on the following platforms: 
- [Harness SaaS](#harness-saas)
- [Harness Self-Managed Enterprise Edition (SMP)](#harness-self-managed-enterprise-edition-smp)
- [Harness SMP in offline environments](#harness-smp-in-offline-environments)

## Harness SaaS


<Tabs>
  <TabItem value="Scanners">


<details>
<summary>Scanner categories</summary>


import StoSupportedCategories from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-categories.md';


<StoSupportedCategories />

</details>

<details>
<summary>Harness STO scanner support</summary>


import StoSupportedScanners from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-scanners.md';


<StoSupportedScanners />

</details>

<!-- details>
<summary>Scanner binaries used in STO container images</summary>


import StoSupportedBinaries from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-binaries.md';


<StoSupportedBinaries />

</details -->

<details>
<summary>Supported ingestion formats</summary>


import StoSupportedFormats from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-ingestion-formats.md';


<StoSupportedFormats />

</details>


</TabItem>
  <TabItem value="Data ingestion">



import StoSupportedMethods from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-methods.md';


<StoSupportedMethods />

In addition to ingesting scan data in the external scanner's native format, STO steps can also ingest data in [SARIF](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) and [Harness Custom JSON](/docs/security-testing-orchestration/custom-scanning/ingesting-issues-from-other-scanners) format.


</TabItem>
  <TabItem value="Build infrastructure">


####  Operating systems and architectures supported for STO


import StoInfraSupport from '/docs/security-testing-orchestration/sto-techref-category/shared/_supported-infrastructures.md';


<StoInfraSupport />



</TabItem>
  <TabItem value="Approvals / Ticketing">


Harness STO supports the following features for generating notifications and stopping pipelines in response to detected vulnerabilities:

- Each Security Test step has a [Fail on Severity](/docs/security-testing-orchestration/exemptions/exemption-workflows) setting that causes a pipeline build to fail if a Security Scan step detects one or more issues with the specified severity (Critical, High, Medium, etc.). You can also create [exemptions ("Ignore rules")](/docs/security-testing-orchestration/exemptions/exemption-workflows) for specific issues to override this behavior.

- You can also enforce [governance policies](/docs/security-testing-orchestration/policies/create-opa-policies) against scan results to stop pipelines automatically.

- You can configure STO to generate the following notifications automatically in response to issues detected in a scan:

  - [New Jira tickets](/docs/security-testing-orchestration/jira-integrations)  

  - [Email notifications](/docs/security-testing-orchestration/notifications/email-notifications) 
  
  - [Slack notifications](/docs/security-testing-orchestration/notifications/slack-notifications)



</TabItem>
<TabItem value="Governance">


Harness Policy As Code uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) as the central service to store and enforce policies for the different entities and processes across the Harness platform.

You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Currently, you can define and store policies directly in the OPA service in Harness.

Soon, you will be able to use remote Git or other repos (e.g. OCI-compatible registries) to define and store the policies used in Harness.

- [Use security test policies to stop STO pipelines automatically](/docs/security-testing-orchestration/policies/create-opa-policies)
- [Harness Policy As Code overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-quickstart)
- [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline)



</TabItem>
</Tabs>


## Harness Self-Managed Enterprise Edition (SMP)

All STO features supported in [Harness SaaS](#harness-saas) are also supported in Self-Managed Enterprise Edition with the following exceptions:
- Custom dashboards
- Harness AI Development Assistant (AIDA&trade;) for STO
- You cannot run SaaS-based scans if there is no connectivity between Harness and the external SaaS environment.  

## Harness SMP in offline environments

If you're running Harness Self-Managed Enterprise Edition in an offline environment, note the following:

- SaaS-based scanners require connectivity between Harness and the external SaaS environment. This means that you cannot run SaaS-based scans in offline environments.  

- All STO scanners are supported in both Harness SaaS and Self-Managed Enterprise Edition. Harness regularly updates the container images it uses to run STO scans. If you're running STO in an offline environment, Harness recommends that you download your STO images regularly to ensure that your scanners are up-to-date. For more information, go to  [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
