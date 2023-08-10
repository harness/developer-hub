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
  <TabItem value="Ingestions">
```

<details><summary>Data ingestion methods</summary>

```mdx-code-block
import StoSupportedMethods from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-methods.md';
```

<StoSupportedMethods />

The scanner, targets, and scan approach combinations are covered in the next section.

</details>

```mdx-code-block
  </TabItem>
  <TabItem value="Infrastructures">
```

<details><summary>STO support by CI build infrastructure type</summary>

```mdx-code-block
import StoInfraSupport from '/docs/security-testing-orchestration/onboard-sto/shared/_supported-infrastructures.md';
```

<StoInfraSupport />

</details>

```mdx-code-block
  </TabItem>
  <TabItem value="Ticketing/Approvals">
```

```mdx-code-block
  </TabItem>
  <TabItem value="Governance">
```

```mdx-code-block
  </TabItem>
</Tabs>
```