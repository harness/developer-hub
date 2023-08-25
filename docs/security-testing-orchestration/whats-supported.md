---
title: What's supported in Harness STO
description: Supported STO features and integrations
sidebar_label: What's supported
sidebar_position: 5
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```


This topic lists the supported STO features and integrations to scan your code repositories, container images, and other targets for security vulnerabilities. 


```mdx-code-block
<Tabs>
  <TabItem value="Scanners">
```

<details><summary>Scanner categories</summary>

```mdx-code-block
import StoSupportedCategories from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-categories.md';
```

<StoSupportedCategories />

</details>

<details><summary>Harness STO scanner support</summary>

```mdx-code-block
import StoSupportedScanners from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-scanners.md';
```

<StoSupportedScanners />

</details>


<details><summary>Scanner binaries used in STO container images</summary>

```mdx-code-block
import StoSupportedBinaries from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-binaries.md';
```

<StoSupportedBinaries />

</details>

```mdx-code-block
  </TabItem>
  <TabItem value="Data ingestion">
```

```mdx-code-block
import StoSupportedMethods from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-methods.md';
```

<StoSupportedMethods />

In addition to ingesting scan data in the external scanner's native format, STO steps can also ingest data in [SARIF](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) and [Harness Custom JSON](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners) format.

```mdx-code-block
  </TabItem>
  <TabItem value="Build infrastructure">
```

### STO support by CI build infrastructure type

```mdx-code-block
import StoInfraSupport from '/docs/security-testing-orchestration/onboard-sto/shared/_supported-infrastructures.md';
```

<StoInfraSupport />


```mdx-code-block
  </TabItem>
  <TabItem value="Approvals and ticketing">
```

Harness STO supports the following features for generating notifications and stopping pipelines in response to detected vulnerabilities:

- Each Security step has a [Fail on Severity](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows) setting that causes a pipeline build to fail if a Security Scan step detects one or more issues with the specified severity (Critical, High, Medium, etc.). You can also create [exemptions ("Ignore rules")](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows) for specific issues to override this behavior.

- You can also [governance policies](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/stop-pipelines-using-opa) and security scan results to stop pipelines automatically.

- You can set up STO to ([create Jira tickets automatically](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations) for issues detected during an STO build.  

- You can also [generate automated emails](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/email-notifications) for detected issues. 

```mdx-code-block
  </TabItem>
  <TabItem value="Governance">
```

Harness Policy As Code uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) as the central service to store and enforce policies for the different entities and processes across the Harness platform.

You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Currently, you can define and store policies directly in the OPA service in Harness.

Soon, you will be able to use remote Git or other repos (e.g. OCI-compatible registries) to define and store the policies used in Harness.

- [Harness Policy As Code overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-quickstart)
- [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline)


```mdx-code-block
  </TabItem>
</Tabs>
```
