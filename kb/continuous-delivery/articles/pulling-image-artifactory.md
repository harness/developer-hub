---
title: Fetching images from Artifactory artifact source via API
---

# Introduction
This knowledge base article discuss some important points regarding fetching image from artfiactories via API.

Harness uses same API for any artifactory ``/v2/repositories/{imageName}/tags`` in short it fetches tags on a per-image basis. In other words, it pulls only the tags associated with the particular image or file path mentioned in the service configuration.

:::note
For pulling Docker images from Docker repos, Harness is restricted by the limits of the Docker repo. For example, [Docker Hub limits](https://docs.docker.com/docker-hub/download-rate-limit/).
This limitation is predefined by dockerhub and apply regardless of whether you're pulling images using the Harness user interface or through the API.
:::
:::note
The maximum number of artifact image tags fetched by Harness that is 10000.
This limitation apply for any other artifactories.
:::
