---
title: Run an Orchestration scan in an STO Pipeline
description: An orchestration scan is a fully automated workflow that scans an object and ingests the results into Harness in one Security step. Orchestration scans are the easiest to set up and are a great way to get started with STO.
sidebar_label: Orchestration scans
sidebar_position: 20
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


### Example workflows 

Here are some example workflows that illustrate how to set up an orchestration scan:

- [Container image scans with Aqua Trivy](/tutorials/security-tests/container-scan-aqua-trivy)
- [DAST app scans using Zed Attack Proxy (ZAP)](/tutorials/security-tests/dast-scan-zap)


### See also

- [Harness STO scanner support](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#harness-sto-scanner-support)
- [STO technical reference](/docs/category/sto-technical-reference)
- [Run an ingestion-only scan in an STO pipeline](ingest-scan-results-into-an-sto-pipeline.md)


