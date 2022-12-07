---
title: Artifact Collection Tech Ref
description: This topic lists useful reference information for Harness artifact collection. Artifact History is Synced Every Two Hours. Harness will sync with your artifact repositories every two hours to ensure…
# sidebar_position: 2
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

See [Sync and Clean Up Artifact Stream using the Harness API](/article/7tlyu5jesf-sync-and-clean-up-artifact-stream-using-the-harness-api).

### See Also

* [Add Specs and Artifacts using a Harness Service](/article/eb3kfl8uls-service-configuration)
* [Using Custom Artifact Sources](/article/jizsp5tsms-custom-artifact-source)
* [Service Types and Artifact Sources](/article/qluiky79j8-service-types-and-artifact-sources)
* [Add a Docker Image](/article/gxv9gj6khz-add-a-docker-image-service)
* [Add an Azure DevOps Artifact Source](/article/rbfjmko1og-add-an-azure-dev-ops-artifact-source)
* [Built-in Variables List](/article/aza65y4af6-built-in-variables-list)

