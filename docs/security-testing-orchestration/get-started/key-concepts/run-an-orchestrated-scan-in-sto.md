---
title: Run an Orchestration scan in an STO Pipeline
description: Scan a target and ingest the results in one step.
sidebar_label: Orchestration mode
sidebar_position: 70
redirect_from: 
  - /docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto
  - /docs/security-testing-orchestration/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto
helpdocs_topic_id: wk018r6x3g
helpdocs_category_id: utstv3qzqt
helpdocs_is_private: false
helpdocs_is_published: true
---

In an *orchestration scan*, you scan a target and ingest the results in one step. Orchestration scans are the easiest to set up and are a great way to get started with STO.

To set up an orchestration scan, you specify information such as:

* The scan tool and settings.
* Access credentials to access the object to scan (if the object is remote).
* Information about the object to scan. This information depends on the object type:
	+ Container image — image type, domain, owner, project, and tag
	+ Code repo — project and branch
	+ Instance (website) — identifier, environment, domain, path, protocol, port

STO supports orchestration scans for popular open-source scanners such as Aqua-Trivy and Bandit as well as commercial scanners such as SonarQube. For a complete list of supported scanners, go to [Harness STO scanner support](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#harness-sto-scanner-support).

## Example workflows

Here are some example workflows that illustrate how to set up an orchestration scan:

- [Container image scans with Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/trivy/container-scan-aqua-trivy)
- [DAST app scans using Zed Attack Proxy (ZAP)](/docs/security-testing-orchestration/sto-techref-category/zap/dast-scan-zap)

## See also

- [Harness STO scanner support](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#harness-sto-scanner-support)
- [Run an ingestion-only scan in an STO pipeline](./ingest-scan-results-into-an-sto-pipeline.md)
