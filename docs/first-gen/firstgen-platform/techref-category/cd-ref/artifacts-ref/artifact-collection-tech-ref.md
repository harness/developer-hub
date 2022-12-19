---
title: Artifact Collection Tech Ref
description: This topic lists useful reference information for Harness artifact collection. Artifact History is Synced Every Two Hours. Harness will sync with your artifact repositories every two hours to ensure…
sidebar_position: 10
helpdocs_topic_id: 3rz2d3g5qu
helpdocs_category_id: r5npnj7dwx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists useful reference information for Harness artifact collection.

### Artifact History is Synced Every Two Hours

Harness will sync with your artifact repositories every two hours to ensure Harness artifact cache is in sync with the repos.

If you deploy an artifact in Harness and see an artifact that you know is deleted in your repo, the artifact has been deleted within the two hours time frame.

The two hour time frame is the result of limitations of third-party APIs and repos.

You can manually or programmatically sync (and delete old artifacts from the Harness cache) using the Harness API.

See [Sync and Clean Up Artifact Stream using the Harness API](../../api/sync-and-clean-up-artifact-stream-using-the-harness-api.md).

### See Also

* [Add Specs and Artifacts using a Harness Service](../../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md)
* [Using Custom Artifact Sources](../../../../continuous-delivery/model-cd-pipeline/setup-services/custom-artifact-source.md)
* [Service Types and Artifact Sources](../../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md)
* [Add a Docker Image](../../../../continuous-delivery/model-cd-pipeline/setup-services/add-a-docker-image-service.md)
* [Add an Azure DevOps Artifact Source](../../../../continuous-delivery/model-cd-pipeline/setup-services/add-an-azure-dev-ops-artifact-source.md)
* [Built-in Variables List](../../variables/built-in-variables-list.md)

