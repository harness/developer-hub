---
title: Code Repository release notes
sidebar_label: Code Repository
date: 2024-04-02T10:00
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/code-repository/rss.xml" />

These release notes describe recent changes to Harness Code Repository.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## January 2025

<!-- 24 Jan 24 -->

### Version 1.28.2

#### New features and enhancements

* Added Archive repository functionality
* Added networking and API support for SSH with git repositories
* Add checkbox for comment events and review events
* Support for Harness SMP - Self Managed Platform
* Support for Jira Cloud integration to link commits with issues
* List Status Checks for account/org/project

#### Fixed issues

* We need org view and edit permissions in order to create rules/labels on the account level

## August 2024

### Version 1.17.2

<!-- 26 Aug 24 -->

#### New features and enhancements

* Add routing and openapi related to labels
* Update CODE_PUBLIC_RESOURCE_CREATION_ENABLED value in config
* vanity url support should be false by default
* Add Update default-branch API
* remove stale moveAPI from open api
* Support Repo Migration APIs (create repo, import PRs, webhooks, and branch rules)
* Change OSV ignore list to allow list
* (Public Access) Enforce repo-review permission
* Improve SSH Configuration 
* Add PR Label Filtering Support
* add recursive search toggle

#### Fixed issues

* Fix pullreq count when applying label/value id filter
* (Swagger) Add Update default-branch API
* Fix missing empty type and color values validation
* Add restricted by query label count when using query and sanitize empty label (value) text
* styles issues in repo description and summary

## July 2024

### Version 1.14.0

<!-- 23 Jul 24 -->

#### New features and enhancements

* Fixed a bug where some users were not able to create a token
* Show Line level stats in PRs 
* Fix file history mapping and audit trail improvements

### Version 1.13.1

<!-- 15 Jul 24 -->

#### New features and enhancements

* PR Page Improvements 
* Azure Devops Import  
* Repo Summary
* Code suggestion in PR Comments
* Public Repository Support
* CODE IDP Integration

## April 2024

### Version 0.79.4

<!-- 02 Apr 24 -->

#### New features and enhancements

* You can [enable secret scans, vulnerability scans, and OPA policies for repos](/docs/code-repository/config-repos/security).
* Added a button to copy relative file paths.
* Added support for a `cmd/ctrl + enter` keyboard shortcut to submit a PR comment or description.
* Resolved comments in PRs are now collapsed by default.

## March 2024

### Version 0.75.0

<!-- 22 Mar 24 -->

#### New features and enhancements

* You can copy links to PR comments.
* You can view entire files in PR diff view.
* On the list of PRs, you can right-click and open a PR in a new tab or window.

### Version 0.72.4

<!-- 01 March 2024 -->

#### New features and enhancements

* [Harness AIDA Semantic Code Search](/docs/code-repository/work-in-repos/semantic-search): Use natural language queries to search your codebase.
* [Harness AIDA Pull Request Summary Generation](/docs/code-repository/pull-requests/aida-code-pr): Automatically create comprehensive and informative PR summaries.
* Change request resolution [branch rule](/docs/code-repository/): You can require change requests to be resolved before allowing PRs to be merged.
* Cancel [repository import](/docs/code-repository/config-repos/import-repo): You can cancel in-progress repository imports.

## January 2024

<!-- 22 Jan 2024 -->

### New features and enhancements

You can include videos in PR comments.

## Initial GA release

<!-- 04 Jan 2024 -->

### New features and enhancements

We are excited to announce that the [Harness Code Repository module](/docs/code-repository) is now generally available.

This initial GA release includes the following enhancements:

* Integration with Harness Git Experience.
* Configure triggers for Harness Code repos in the Visual editor in addition to existing support for the YAML editor.
* First-class support for Harness Code repos in pipeline codebase configuration.
* Status checks on PRs provide more detail about pipeline executions.
* Advanced keyword search for querying your codebase.

For information about all Harness Code functionality and features, go to the [Harness Code Repository documentation](/docs/code-repository).
