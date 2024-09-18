---
title: Scorecard Checks using Custom Data Source
description: Building Scorecard Custom Checks on Custom Data Sources in Harness IDP
sidebar_label: Custom Data Sources
sidebar_position: 40
---

<DocVideo src="https://www.youtube.com/embed/23hlHjhhYsQ" />

## Introduction

This video describes how you can create Scorecard Checks in Harness IDP on your custom data. This method uses the [Catalog Ingestion API](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api) to ingest the data into the Catalog and then creates a Custom Check on the ingested data.

**Steps**

1. Create a Custom Check using the Catalog Expressions Data Point
2. Ingesting Data into the Catalog using the API and a Python script
3. Use a Pipeline to trigger the ingestion API hourly

Watch the video above to see a working example. Here is a [sample Harness pipeline with a Python script for ingestion](https://github.com/harness-community/idp-samples/blob/main/idp-pipelines/Catalog_Ingestion_Pipeline.yaml).
