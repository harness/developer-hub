---
title: Code Repository release notes
sidebar_label: Code Repository
date: 2025-08-21T10:00
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

## August 2025

<!-- August 18, 2025 -->

### Version 1.54.x

#### New features and enhancements

- Added target selection to Account, Org, and Project Branch/Tag rules, allowing users to include or exclude specific repos by name or pattern.
- Added audit log support for Tag Rules, Webhook CRUD operations, and bypassed tag actions.

## July 2025

<!-- July 16, 2025 -->

### Version 1.50.x

#### New features and enhancements
- Added support for tag rules in Harness Code Repository. Users can now restrict tag creation, deletion, and updates with pattern-based rules.
- Added support for including user groups in the bypass list for branch rules and tag rules.

<!-- July 03, 2025 -->

### Version 1.48.x

#### New features and enhancements

- Added a [banner prompting users to **Create PR**](/docs/code-repository/pull-requests/create-pr#compare--pull-request-banner) when a new branch is recently pushed.
- Added repository sort and scope filters to the repo list page. Users can now sort repositories and toggle between account, org, and project scopes to control visibility.

## June 2025

<!-- June 17, 2025 -->

### Version 1.46.x

#### New features and enhancements
- Added the ability to set favorite repositories across the account.

#### Fixed issues
- Resolved an issue where Markdown in Harness Code did not render images.

<!-- June 10, 2025 -->

### Version 1.45.x

#### New features and enhancements

* Added Audit logs for force push to the default branch.
* [PR dashboard](/docs/code-repository/pull-requests/prs-of-interest) enhancement.

## May 2025

<!-- May 27, 2025 -->

### Version 1.43.x

#### New features and enhancements

* Added support for [Git Large File Storage (LFS)](/docs/code-repository/work-in-repos/git-lfs) to enable versioning of large binary files in repositories.
* Added [Jira integration](/docs/code-repository/integrations/jira-integration) to enable visibility between code repository and issue tracking workflows.
  
<!-- May 20, 2025 -->

### Version 1.42.x

#### New features and enhancements 

* Added support for partial and shallow Git clones to improve performance and reduce footprint when cloning large multi-service repositories.

<!-- May 13, 2025 -->

### Version 1.41.x

#### New features and enhancements

* Added support to display the merge method used when merging a pull request.

* Added support to indicate if rules were bypassed during pull request merge.
 
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

## December 2024

### Version 1.26.2

#### New features and enhancements

* Added Recreate Replica API.
* Added **Rules API** for projects, organizations, and accounts.
* Added `go-get` middleware in the Git router.
* Updated Swagger for the **Delete PR Branch** API.
* Added scope info to webhooks.
* Ignored "not found" errors when deleting repositories.
* Added time and author filter parameters to the **List Commits** page.
* Updated Webhook for **Code Comments** to include all comment types.
* Renamed the **Review Submitted** Webhook Trigger.

#### Fixed issues

* Streamlined the **list-paths** Git operation to avoid message limits.
* Handled synchronization of an empty repository with a non-'main' default branch.
* Moved generated UI URLs to the new navigation.
* Fixed an issue with label unassign activity.
* Used space permissions in label and rules controllers.
* Changed space permissions for space rules to repository permissions.
* Resolved mentioned user IDs in email notifications.
* Fixed sanitization for the Webhook Trigger: **Pull Request Review Submitted**.
* Fixed string search issues involving '_' or '%'.
* Improved PR activity messages for force pushes.
* Included the PR author in the browser parameter in the PR listing page.
* Replaced `TypesRepository` with `RepoRepositoryOutput` in Swagger.

## November 2024

### Version 1.25.3

#### New features and enhancements

* Added support for **Labels** in the Migration Tool.
* Added account, organization, and project webhooks.
* Added an Audit Log for bypassed requests.
* Separated CODE Repo **Create/Edit** into distinct permissions.
* Added Code Owners status in the PR overview page.
* Added a new webhook type: **review_submitted**.
* Added a new webhook event for label assignment.
* Added an API for space-level webhook creation.
* Added support for **Code Owners** user groups.
* Updated error messages for forbidden access cases.
* Added an API to squash commits on a branch.
* Updated UI labels for the audit service.
* Added audit logging changes for commit, merge, branch creation, and deletion.

#### Fixed issues

* Increased ingress limits.
* Added environment variables to enable indexing and searching of large files.
* Fixed Swagger documentation for webhook execution and added branch restore.
* Updated code URL API.
* Fixed status checks displaying incorrect timestamps.
* Fixed an issue where resource names were missing.
* Handled errors for import-progress API failures.
* Expanded detection of repository not found cases in Git error parsing.
* Handled import-progress API responses when importing repositories via the migrator.

## October 2024

### Version 1.23.3

#### New features and enhancements

* Renamed **Gitness** to **Harness Open Source**.
* Added support for the **Fast Forward Merge strategy**.
* Added branch update rules: **block_branch_update**, **block_force_push**.
* Added a button to rebase PRs.
* Updated to the latest GitLeaks release.
* Added a missing PR activity type: reviewer-add.
* Added PR source branch delete/restore API.
* Added reviewer-add PR activity entry.

#### Fixed issues

* Fixed vanity URLs.
* Fixed PR links in the PR listing.
* Fixed rebase API rule checks.

## September 2024

### Version 1.21.4

#### New features and enhancements

* Updated Semantic Search and PR Summary from **GPT-3.5-Turbo** to **GPT-4o-Mini**.
* Added backend support for User Groups.
* Added support for Webhook Execution Logs.
* Added Branch Rules: User Group Support (Create and List).
* Added an option to delete branches for merged/closed PRs.
* Improved error messages for protection rule violations.
* Enabled auto-collapse for resolved code comments.
* Added repository descriptions and UI URLs in emitted webhook info.

#### Fixed issues

* Updated to the latest GitLeaks release.
* Added repo_review permission to JWT authentication with allowed resources.
* Fixed OpenAPI issues in repository listing.
* Ensured an empty list is returned when no repositories are present in a space.

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
