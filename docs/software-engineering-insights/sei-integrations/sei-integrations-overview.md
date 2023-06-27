---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 10
---

* Ingestion satellite: For integration on-premise systems and applications
* Automated integrations (incl droneci and harnessng)
* Jenkins plugin
* Custom CI/CD integrations

<!-- Integrations are handled in connectors -->

<!-- Jira connector requires installing SEI app -->

Connectors contain the information necessary to integrate and work with third-party tools, such as Git providers and artifact repos. For example, a GitHub connector authenticates with a GitHub account and/or repo and fetches files as part of a deploy stage. Harness uses connectors at pipeline runtime to authenticate and run operations in external tools.

Connectors require different permissions depending on your build environment and the tasks your pipeline performs. For example, if your pipeline builds and pushes an image to Docker Hub, you need a connector that can connect to the Docker Hub repo and push images.

For more information, go to the Harness Platform documentation on [Connectors](/docs/category/connectors).
