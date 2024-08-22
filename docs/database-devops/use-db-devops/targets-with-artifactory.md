---
title: Using Target Paths with Artifactory
sidebar_label: Overview
displayed_sidebar: dbdevopsbeta
description: Using Target Paths with Artifactory.
# sidebar_position: 10
---

# Using Target Paths with Artifactory

Welcome to the Harness Database DevOps (DB DevOps) onboarding guide. This topic introduces you to the powerful capabilities of DB DevOps using Harness and guides you through key functionalities that streamline and secure your database management tasks.

Feature Description
Given a db schema with artifactory source type
When db schema has been provided with an optional archivePath
And changeLog location provided within the archive
Then the Artifactory download plugin should download the archive, unzip
And then the apply / rollback should be executed with the specified changeLog.

