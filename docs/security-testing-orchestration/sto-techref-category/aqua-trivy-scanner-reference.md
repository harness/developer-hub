---
title: Aqua Trivy scanner reference
description: Image scans with Aqua Trivy
sidebar_position: 30
helpdocs_topic_id: 079248uzcu
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

 You can set up a Security step with [Aqua Trivy](https://aquasecurity.github.io/trivy) to detect vulnerabilities and misconfigurations in your container images.

### Important Notes

* STO supports container scans only with Aqua Trivy.

### Scan types

STO supports the following `policy_type` settings for Aqua-Trivy:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](../use-sto/ingest-scan-results-into-an-sto-pipeline.md).

### Required Settings

* `product_name` = `aqua-trivy`
* `scan_type` = `containerImage`
* `product_config_name` — Specify one of the following:
	+ `aqua-trivy` — Run the Trivy image scanner with default settings.
	+ `aqua-trivy-debug` — Run the Trivy image scanner in Debug mode.
* `container_domain` — The image registry domain, for example `docker.io`
* `container_project` — The image owner and project, for example `harness/delegate`
* `container_tag` — The tag of the image to scan, for example `latest`
* `container_type` — Set to `local_image`, `docker_v2`, `jfrog_artifactory`, or `aws_ecr`  

The following settings are also required, depending on the container type:
+ if `container_type` = `docker_v2`
	- `container_access_id`: Username
	- `container_access_token`: Password/Token
+ if `container_type` = `aws_ecr`
	- `container_access_id`: Username
	- `container_access_token`: Password/Token
	- `container_region`: Image registry AWS region
+ if `container_type` = `jfrog_artifactory`
	- `container_access_id`: Username
	- `container_access_token`: Password/Token

