---
title: Pulling images from Artifactory
---

# Introduction
This knowledge base article discuss some important points regarding pulling image from artfiactories. 

Harness has following limitations for docker repos and image tags:-
1. For pulling Docker images from Docker repos, Harness is restricted by the limits of the Docker repo. For example, [Docker Hub limits](https://docs.docker.com/docker-hub/download-rate-limit/).
:::note
 This limitation is predefined by dockerhub and apply regardless of whether you're pulling images using the Harness user interface or through the API.
:::
2. The maximum number of artifact image tags fetched by Harness that is 10000.
:::note
 This limitation apply for any other artifactories.
:::
3. Harness uses same API for any artifactory ``/api/docker/{repo-key}/v2/{image name}/tags/list `` in short it fetches tags on a per-image basis. In other words, it pulls only the tags associated with the particular image or file path mentioned in the service configuration.