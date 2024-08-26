---
title: Nexus- Could not parse error response Unexpected character ('<' (code 60))- expected a valid value 
---

## Issue
Customers may experience the following when trying to use Spinnaker with Nexus.  They may find that there is a 401 Unauthorized response.
Clouddriver shows that the caching agent logs contain ```operative-docker``` registries with no errors:
2021-10-19 05:30:36.441  INFO 1 --- [ecutionAction-8] .d.r.p.a.DockerRegistryImageCachingAgent : Describing items in operative-docker/DockerRegistryImageCachingAgent[1/2]
2021-10-19 05:30:36.450  INFO 1 --- [ecutionAction-8] .d.r.p.a.DockerRegistryImageCachingAgent : Caching 2474 tagged images in operative-docker/DockerRegistryImageCachingAgent[1/2]
2021-10-19 05:30:36.450  INFO 1 --- [ecutionAction-8] .d.r.p.a.DockerRegistryImageCachingAgent : Caching 2474 image ids in operative-docker/DockerRegistryImageCachingAgent[1/2]
 
Below are messages that were provided by ```operative.com``` from Nexus.  No other errors can be found via Spinnaker. 
2021-09-12 06:17:42,136+0000 WARN  ....]  .....org.sonatype.nexus.repository.docker.internal.orient.DockerProxyFacetImpl - Could not parse error response Unexpected character ('
 

## Cause
This could be as a result of a disabled account on Nexus.  Customers should look to review and audit their Nexus accounts.

