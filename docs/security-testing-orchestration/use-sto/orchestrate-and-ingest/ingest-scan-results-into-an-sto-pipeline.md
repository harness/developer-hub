---
title: Run an Ingestion-Only scan in an STO Pipeline
description: With ingestionOnly, the scanner saves the results to a shared folder. The pipeline then ingests this data and analyzes, deduplicates, and displays the results.
sidebar_label: Ingestion-only workflows
sidebar_position: 30
helpdocs_topic_id: d24n34qdbk
helpdocs_category_id: utstv3qzqt
helpdocs_is_private: false
helpdocs_is_published: true
---

You can run scans in a separate Run step, or outside Harness entirely, and ingest the results into your pipelines. This enables you to create advanced workflows that aren't possible with orchestrated scans. You can run custom scans with advanced settings that address specific security requirements. You can ingest results from multiple scans into the same pipeline, aggregate and deduplicate the data, and view all your results in a single pane of glass.

 To ingest scan results from outside a Security or scanner step, you set up your pipeline as follows:

1. A Run step saves scan results to a shared folder. The step might run the scan locally or download results from an external source.

2. A [Security step or scanner template](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#security-steps-and-scanner-templates-in-sto) ingests the results from the shared folder. Then it analyzes, deduplicates, and displays the results.

For a complete list of supported scanners, go to [Harness STO scanner support
](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#harness-sto-scanner-support). If your scanner isn't listed, you can still ingest your scan results into STO. 

- If your scanner can publish to SARIF format, go to [Ingest SARIF scan results into STO](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data). 

- For other scanners, go to [Ingest Results from Custom or Unsupported Scanners](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners.md). 


### Example workflows 

Here are some example workflows that illustrate how to set up an ingestion pipeline:

- [SAST code scans using Semgrep](/tutorials/security-tests/sast-scan-semgrep)
- [Run STO scans using GitHub Action and Drone Plugin steps](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-scans-using-github-actions)
- [Example workflow: Ingest SARIF data from a Checkmarx GitHub Action scan](/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference)
- [Create a build-scan-push pipeline (STO only)](/tutorials/security-tests/build-scan-push-sto-only)


### See Also

* [STO Ingestion Workflows](./sto-workflows-overview.md)
- [Ingest SARIF scan results into STO](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data)
* [Ingest Results from Custom or Unsupported Scanners](./ingesting-issues-from-other-scanners.md)
* [Security Step Settings Reference](../../sto-techref-category/security-step-settings-reference.md)

