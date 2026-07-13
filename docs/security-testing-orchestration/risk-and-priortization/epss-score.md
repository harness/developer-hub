---
title: EPSS score
description: Learn how EPSS scores help prioritize vulnerabilities based on exploitation likelihood.
sidebar_label: EPSS Score
sidebar_position: 5
--- 

Harness STO helps you identify security issues early in the pipeline by shifting vulnerability management left. However, identifying vulnerabilities alone is not sufficient. Prioritizing them based on risk is equally important.

STO also surfaces [CISA KEV](/docs/security-testing-orchestration/risk-and-priortization/cisa-kev) status for CVE-associated issues. EPSS predicts exploitation likelihood; CISA KEV confirms whether CISA has documented active exploitation. Use both signals together when you prioritize remediation.

## What is EPSS score?

To support risk-based prioritization, Harness STO surfaces the **Exploit Prediction Scoring System (EPSS) score** directly on the Issues and Vulnerabilities page. EPSS score provides:

**Probability:** The likelihood (0–100%) that a [Common Vulnerabilities and Exposures (CVE)](https://www.cve.org/) will be exploited in the wild within the next 30 days.

**Percentile:** The relative ranking of the CVE’s exploitation likelihood compared to other CVEs.

Most vulnerabilities even those rated High or Critical by [Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/examples) are never exploited in the wild. A vulnerability may have a CVSS score of 9 or 10 but still be unlikely to be exploited where as EPSS takes a risk-based approach and helps you focus on vulnerabilities based on real world exploitation signals rather than theoretical impact alone.


:::note

- EPSS scores are updated once every 24 hours.
- All the issues with a CVE ID are assigned with a EPSS score.
- This feature is behind the feature flag `STO_ISSUE_EPSS`. Please contact [Harness Support](mailto:support@harness.io) to enable this feature.

:::


### Navigate to Issues Section


Select an issue from the list in the Issues section to open the Issue Details sideview pane. You can view the EPSS score for the issue which has CVE ID associated with it. You can also view the EPSS score in the [Vulnerabilities](/docs/security-testing-orchestration/view-security-test-results/view-scan-results) tab. Apply filters to sort vulnerabilities based on **EPSS probability** and **percentile**.

<DocImage path={require('./static/epss-score.png')} width="100%" height="100%" />

### Enforce OPA Policy

Block vulnerabilities based on EPSS probability and percentile using an [OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#warn-or-block-vulnerabilities-based-on-the-epss-score). Navigate to Account Settings, select Policies, and search for the EPSS policy. Open the policy and configure the maximum permitted EPSS threshold and percentile. Vulnerabilities exceeding the defined values will be blocked according to the policy configuration.

<DocImage path={require('./static/epss-policy.png')} width="100%" height="100%" />

