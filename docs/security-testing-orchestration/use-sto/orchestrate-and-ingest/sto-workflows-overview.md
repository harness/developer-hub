---
title: STO ingestion workflows
description: STO supports three workflows for ingesting data --  run a local scan (orchestrated), ingest results from a shared folder (ingestion-only), and download results from an external scanner (data-load).
sidebar_position: 10
helpdocs_topic_id: cjqnd71y07
helpdocs_category_id: utstv3qzqt
helpdocs_is_private: false
helpdocs_is_published: true
---

STO supports three different workflows to ingest scan results into a pipeline:

- [Orchestrated workflows](#orchestrated-workflows-in-sto)
- [Ingestion-only workflows](#ingestion-only-workflows-in-sto)
- [Extraction workflows](#extraction-workflows-in-sto)

### Orchestrated workflows in STO

You can set up a fully orchestrated workflow in one Security step that runs the scan and ingests the results. This is the easiest workflow to implement and is good for running scans with default settings.

For more information, go to [Run an Orchestrated Scan in an STO Pipeline](run-an-orchestrated-scan-in-sto.md).

### Ingestion-only workflows in STO

A Security step ingests scan results generated in a previous step, or outside the pipeline. This provides the most flexibility. You can ingest results from highly targeted scans that address specific use cases. You can also ingest results from scanners that currently have no STO integration. Ingestion-only workflows provide the most flexibility and robustness, but might require more work to set up.

An ingestion-only workflow requires at least two steps:

1. A Run step saves the scan data to a shared folder. The Run step might run a scan locally or download scan results from an external tool.
2. A Security step ingests the data from the shared folder.

For more information, go to [Ingest Scan Results into an STO Pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md). 

### Extraction workflows in STO

Extraction scans are a sub-category of orchestrated scans. Instead of running a scan, the Security step pulls issues from an external source. Specifically, you configure the Security Step to download from the external tool rather than running an orchestrated scan. This workflow is supported for scanners that support downloading results via an API endpoint.

![](../static/sto-workflows-overview-04.png)

