---
title: Grype Scanner Reference
description: You can set up a Security step with Grype to detect vulnerabilities and misconfigurations in your container images.
sidebar_position: 35
---

 You can set up a Security step with [Grype](https://github.com/anchore/grype) to detect vulnerabilities and misconfigurations in your container images.

### Important Notes

* STO supports Grype scans of containers and repositories.
* STO supports [orchestrated scans](../use-sto/run-an-orchestrated-scan-in-sto.md) and [ingestionOnly scans](../use-sto/ingest-scan-results-into-an-sto-pipeline.md) scans  with Grype. 

### Required Settings

* `product_name` = `grype`
* `scan_type` = `orchestratedScan`
* `product_config_name` = `default`
* `container_domain` — The image registry domain, for example `docker.io`
* `container_project` — The image owner and project, for example `harness/delegate`
* `container_tag` — The tag of the image to scan, for example `latest`
* `container_type` — Set to `local_image`, `docker_v2`, `jfrog_artifactory`, or `aws_ecr`  

The following settings are also required, depending on the container type:
+ if `container_type` = `docker_v2`
	- `container_access_id`: Username
	- `container_access_token`: Password/token if `container_type` = `aws_ecr`
	- `container_region`: Image registry AWS region
+ if `container_type` = `jfrog_artifactory`
	- `container_access_id`: Username
	- `container_access_token`: Password/token

