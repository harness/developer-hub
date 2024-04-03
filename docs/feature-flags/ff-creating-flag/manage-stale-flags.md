---
title: Manage stale flags
description: Identify and automatically open pull requests to remove stale feature flags from your code.
sidebar_position: 30
---

## Manage stale flags

Harness Feature Flags helps to identify stale flags and automates the process of removing them from your code.

Stale flags are flags that are no longer needed as the change behind them has been widely rolled out and no longer needs any control in production. Stale flags are flexible and can also be configured to a set amount of days set by the user for smoother Feature Flag management.

![An image of Harness Feature Flags Stales Flags UI](./static/ff-stales-flags-ui.png)

### The Different Flag States

To help manage your flags, here are the definitions of the different flag states:

 - Potentially Stale: 
 -- Any flag that meets any of these criteria (these are ORs, not ANDs)
 -- Has been disabled for more than 60 days 
 -- Is enabled but has not received any new targeting rules or rules updates or default rule changes for more than 60 days
 -- Is enabled but has not received any evaluations for more than 60 days

 - Enabled Flags:
 -- A flag that has been set to 'Enabled' or 'On'.

 - Active: 
 -- These are flags that have received evaluation data. 

 - Changed Last 24 Hours:
 -- Floats that have received new targeted rules or default rule changes recently.

 - Temporary:
 -- Any flag that is not marked as permanent. 

 - Permanent:
 -- Any flag marked as permanent.

### Navigating Flag Cleanup 

![A view of the Harness Feature Flags dashboard with the potentially stale flags filter selectd](./static/stale-flags-filter.png)

When viewing all flags marked as potentially stale, there are two options within Harness to help with Flag Cleasn-up:

 - **Mark as not stale** - This will remove the flag from the _potentially stale_ list for a period of 60 days. If the set criteria are met after 60 days, the flag will appear in the _potentially stale_ list again.

 - **Mark as Ready for Cleanup** - This will change the flag’s status to _ready for cleanup_ , which will appear in the UI and be used as a list for the flag cleanup pipeline.

Note that once a flag has been marked as _ready for cleanup_, you can still undo this decision by marking the flag as not stale.

## Automating Flag Cleanup

If you would like to automate the process of flag clean-up, here are some steps you can follow in order to put it in place:

### Pre-requisites

In order to leverage Harness’ flag cleanup automation pipeline, you will need the following:

- A valid cleanup [toml configuration file](https://github.com/harness/flag_cleanup/blob/unscripted/docs/1_understanding_rules.md).
- A Harness API key (so we can get the list of stale flags).
- A Dockerhub connector to download the cleanup plugin.
- [A git connector on Harness](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference/) - to connect to your code.
- A Github token to create the PR.

At this time, the following languages are supported for flag cleanup automation:

 - Java
 - Kotlin
 - Go

### Set up a flag cleanup pipeline

In order to use flag cleanup automation you will need to [import a pipeline template](https://developer.harness.io/docs/platform/git-experience/import-a-template-from-git/).

- The URL to import from is https://github.com/harness/flag_cleanup/blob/unscripted/docs/pipelines/flag_cleanup_pipeline.yaml
- Note that the identifier and the name must match

<DocVideo src="https://www.youtube.com/embed/sSP1nxrBwxo?si=dGI7vBmio6pfhWnX" />

### Training your cleanup configuration file

You will need update the rules file with the correct tree-sitter query.

<DocVideo src="https://www.youtube.com/embed/Y22vmMNwPYU?si=W-SHEQlHV-3cNYOg" />

### Secrets configuration for Gitub

- A Github connector to connect to the repo to clone down the code to cleanup. The [demo repo is here](https://github.com/harness/flag_cleanup) and the branch to use is “unscripted”.

![Step one of importing a pipeline template](./static/setting-up-cleanup-1.png)

- A Github token to allow the creation of PRs.

![Step two of importing a pipeline template](./static/setting-up-cleanup-2.png)

- A Harness API key to get the list of flags marked for cleanup.

![Step three of importing a pipeline template](./static/setting-up-cleanup-3.png)

- A Docker connector to pull down the plugin image.

![Step four of importing a pipeline template](./static/setting-up-cleanup-4.png)

### Run the flag cleanup pipeline

Here the pipeline is set up and our flags marked for cleanup. So now all we need to do is run the pipeline to do the cleanup.

- Select the repo for the codebase and the branch.

![Step one of running the flag cleanup pipeline](./static/running-cleanup-pipeline-1.png)

- Select the Github token, Github username, and Harness API Key.

![Step two of running the flag cleanup pipeline](./static/running-cleanup-pipeline-2.png)

- Select what code to run against. The example repo includes both Go and Java. These are the paths to run against the Go code:

![Step three of running the flag cleanup pipeline](./static/running-cleanup-pipeline-3.png)

- Select the DockerHub connector to pull down the plugin container, and then select **Run**.

![Step four of running the flag cleanup pipeline](./static/running-cleanup-pipeline-4.png)

As the pipeline runs, logs from the plugin show it getting the flags and performing the code changes.

![Output of cleanup pipline](./static/output-of-cleanup-pipeline.png)

You can then navigate to the PR and see the changes it made.
