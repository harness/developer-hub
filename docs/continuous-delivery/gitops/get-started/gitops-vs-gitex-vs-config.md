---
title: Harness GitOps vs Harness Git Experience vs Config as Code
description: This topic describes key differences between Harness GitOps, Harness Git Experience and Config as Code
---

Harness has multiple Git-based features and it's important to understand the differences:

* **Harness GitOps:** Manages infrastructure and service deployments by syncing the desired state from Git to the live cluster state. Changes in the source manifest repo automatically trigger synchronization, enabling both cluster bootstrapping and full-service deployments. For more details visit [Harness GitOps Basics](./harness-git-ops-basics)
* **Config-as-Code:** Harness supports full [YAML-based configuration of pipelines](/docs/platform/pipelines/harness-yaml-quickstart) and other Harness entities. Harness Pipeline Studio provides an integrated YAML editor with hints and autocomplete, making it easy to define and manage configurations.
* **Harness Git Experience:** Synchronizes pipelines and other entities with Git repositories, allowing changes to be managed directly in Git or through the Harness Manager UI. For more details, visit the [Harness Git Experience overview](/docs/platform/git-experience/git-experience-overview).