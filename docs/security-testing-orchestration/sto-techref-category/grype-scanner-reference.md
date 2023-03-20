---
title: Grype scanner reference
description: Image scans with Grype
sidebar_position: 156
---

 You can set up a Security step with [Grype](https://github.com/anchore/grype) to detect vulnerabilities and misconfigurations in your container images.

### Important Notes

* STO supports Grype scans of containers and repositories.
* STO supports [orchestrated scans](../use-sto/run-an-orchestrated-scan-in-sto.md) and [ingestionOnly scans](../use-sto/ingest-scan-results-into-an-sto-pipeline.md) scans  with Grype. 

### Required Settings

* `product_name` = `grype`
* `policy_type` = `orchestratedScan`
* `scan_type` = `repository` or `container`
* `product_config_name` = `default`
* `container_domain` — The image registry domain, for example `docker.io`
* `container_project` — The image owner and project, for example `harness/delegate`
* `container_tag` — The tag of the image to scan, for example `latest`
* `container_type` — Set to `local_image`, `docker_v2`, `jfrog_artifactory`, or `aws_ecr`  

The following settings are also required, depending on the container type:
+ if `container_type` = `docker_v2`
	- `container_access_id`: Username
	- `container_access_token`: Password/token 
+ if `container_type` = `aws_ecr`
	- `container_access_id`: Username
	- `container_access_token`: Password/token 
	- `container_region`: Image registry AWS region
+ if `container_type` = `jfrog_artifactory`
	- `container_access_id`: Username
	- `container_access_token`: Password/token


<!-- CONTAINERS --------------------------------------------------------------------------- -->

## Container Image scan settings

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />


<!-- REPOS --------------------------------------------------------------------------- -->

### Repository scan settings

```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

<!-- LEGACY INSTANCE  --------------------------------------------------------------------------- 

### Instance settings 

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

<!-- LEGACY CONFIGS  --------------------------------------------------------------------------- 


```mdx-code-block
import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';
```

<StoLegacyConfig  />


<!-- INSTANCES  --------------------------------------------------------------------------- -->