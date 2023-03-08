---
title: View builds
description: You can inspect builds and monitor ongoing builds.
sidebar_position: 10
helpdocs_topic_id: sof7n3qjap
helpdocs_category_id: flam7377aq
helpdocs_is_private: false
helpdocs_is_published: true
---

From the **Builds** page, you can inspect past builds and monitor the progress of ongoing builds.

![CI Build list.](./static/ci-builds-list.png)

The **Builds** page lists provides the following details about current and past builds:

* **Pipeline Name:** The name of the pipeline that ran and the build number (**Execution Id**). Select the pipeline name to go to the build details page.
* **Status:** The build status, such as running, failed, or success.
* **Trigger:** How the build started, whether by a webhook trigger or manually. Builds triggered by webhooks can include a link to the PR or commit that started the build.
* **Executed By:** The name of the user that started the build.
* **Runtime:** How long the build ran.

## Source code repository links

Builds triggered by webhooks can include a link to the PR or commit that started the build.

![A build on the Builds list that was triggered by a commit. There is a link to the triggering commit.](./static/ci-builds-list-sc-link.png)

Similarly, if a pull request triggers a build, you can follow the **Details** link from the PR's Git status to the build details page in Harness.

![A PR's Git status with a link to a Harness CI build.](./static/ci-builds-gh-pr-link.png)
