---
title: CISA KEV
description: Learn how Harness STO surfaces CISA Known Exploited Vulnerabilities (KEV) status to help you prioritize actively exploited CVEs.
sidebar_label: CISA KEV
sidebar_position: 6
---

Harness STO helps you prioritize security issues based on real-world exploitation risk. For issues with a [Common Vulnerabilities and Exposures (CVE)](https://www.cve.org/) identifier, STO shows whether the CVE appears in the [CISA Known Exploited Vulnerabilities (KEV) catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog). Use this signal on the **Issues** page and **Vulnerabilities** tab to focus remediation on CVEs [CISA](https://www.cisa.gov/) has confirmed are actively exploited.

:::note

- **Feature flag:** This feature is behind `STO_ISSUE_KEV`. Contact [Harness Support](mailto:support@harness.io) to enable it.
- **CVE requirement:** CISA KEV applies only to issues with a CVE ID.
- **Catalog updates:** CISA updates the catalog several times per week. STO refreshes each CVE's KEV status from the latest catalog snapshot.

:::

## What is CISA KEV?

The U.S. [Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov/) publishes a catalog of vulnerabilities with evidence of active exploitation. When a CVE appears in [KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog), CISA has confirmed active exploitation in the wild.

## What STO shows

STO exposes a single **Yes** or **No** signal for each CVE-associated finding:

- **Yes:** The CVE appears in the CISA KEV catalog. CISA confirms active exploitation.
- **No:** CISA has not listed this CVE as actively exploited. The finding may still be Critical or have a public exploit.

## View and filter CISA KEV in STO

STO displays CISA KEV on the **Issues** page and the **Vulnerabilities** tab. You can inspect the signal on an individual issue or filter the full list.

1. Go to the [**Issues**](/docs/security-testing-orchestration/view-security-test-results/issues) page at the project level, or open the [**Vulnerabilities**](/docs/security-testing-orchestration/view-security-test-results/view-scan-results) tab for a pipeline execution.
2. Select an issue from the list and In the **Issue Details** side pane, locate the **CISA KEV** field. It shows **Yes** or **No**.

<DocImage path={require('./static/cisa-kev.png')} width="100%" height="100%" title="Click to view full size image" />

## How CISA KEV relates to other signals

Each prioritization signal measures a different aspect of risk. Use the list below to understand what each signal means and when to use it.

- **[CISA KEV](/docs/security-testing-orchestration/risk-and-priortization/cisa-kev#what-sto-shows):** Indicates whether CISA has confirmed active exploitation of this CVE and listed it in the KEV catalog.
- **[EPSS score](/docs/security-testing-orchestration/risk-and-priortization/epss-score):** Estimates the statistical likelihood that this CVE will be exploited in the next 30 days.
- **[Reachability](/docs/security-testing-orchestration/harness-security-scanners/sast#static-reachability):** Indicates whether the vulnerable code path is reachable in your application based on static analysis.
- **[Exploitability](/docs/security-testing-orchestration/risk-and-priortization/epss-score)** (scanner-specific): Indicates whether the scanner has found evidence of a known exploit or proof-of-concept for this CVE.
- **[Severity (CVSS)](/docs/security-testing-orchestration/key-concepts/severities):** Rates the theoretical impact of the vulnerability if it is exploited, independent of whether exploitation has occurred.

## Enforce OPA policy

You can block pipelines when scan results include more CISA KEV issues than your team allows using an [OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#warn-or-block-vulnerabilities-based-on-cisa-kev-count). Go to **Account Settings**, select **Policies**, and search for the CISA KEV policy under **Security Tests** Entity.
