---
title: CISA KEV
description: Learn how Harness STO surfaces CISA Known Exploited Vulnerabilities (KEV) status to help you prioritize actively exploited CVEs.
sidebar_label: CISA KEV
sidebar_position: 6
---

Harness STO helps you prioritize security issues based on real-world exploitation risk. For issues with a [Common Vulnerabilities and Exposures (CVE)](https://www.cve.org/) identifier, STO shows whether the CVE appears in the [CISA Known Exploited Vulnerabilities (KEV) catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog). Use this signal on the **Issues** page and **Vulnerabilities** tab to focus remediation on CVEs [CISA](https://www.cisa.gov/) has confirmed are actively exploited.

:::info CISA KEV requirements

- **Feature flag:** This feature is behind `STO_ISSUE_KEV`. Contact [Harness Support](mailto:support@harness.io) to enable it.
- **CVE requirement:** CISA KEV applies only to issues with a CVE ID.
- **Catalog updates:** CISA updates the catalog several times per week. STO refreshes each CVE's KEV status from the latest catalog snapshot.

:::

---

## What is CISA KEV?

The U.S. [Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov/) publishes a catalog of vulnerabilities with evidence of active exploitation. When a CVE appears in [KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog), CISA has confirmed active exploitation in the wild.

---

## What STO shows

STO exposes a single **Yes** or **No** signal for each CVE-associated finding:

- **Yes:** The CVE appears in the CISA KEV catalog. CISA confirms active exploitation.
- **No:** CISA has not listed this CVE as actively exploited. The finding may still be Critical or have a public exploit.

---

## View and filter CISA KEV in STO

STO displays CISA KEV on the **Issues** page and the **Vulnerabilities** tab. You can inspect the signal on an individual issue or filter the full list.

1. Go to the [**Issues**](/docs/security-testing-orchestration/view-security-test-results/issues) page at the project level, or open the [**Vulnerabilities**](/docs/security-testing-orchestration/view-security-test-results/view-scan-results) tab for a pipeline execution.
2. Select an issue from the list. In the **Issue Details** side pane, locate the **CISA KEV** field. It shows **Yes** or **No**.
