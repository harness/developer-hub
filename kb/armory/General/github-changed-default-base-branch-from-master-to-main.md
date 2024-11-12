---
title: GitHub Changed (default) Base Branch from "master" to "main"
---

## Issue
[As of Oct 1st, 2020, Github has changed their (default) base branches from "master" to "main"](https://github.com/github/renaming) .  Any new repos created by users will now use "main" as the (default) base branch.**Existing repos are unaffected.**

Artifacts and dinghyfiles coming from GitHub will need to be adjusted by adding additional configuration, until updates to Spinnaker are released to accommodate these changes. 

## Cause
GitHub should be set as a provider, for example:
[Connecting Spinnaker to GitHub as an Artifact Source](https://docs.armory.io/docs/armory-admin/artifacts-github-connect/)[Using GitHub Artifacts](https://docs.armory.io/docs/spinnaker-user-guides/artifacts-github-use/)[Steps to Configure Github as Pipeline as Code](https://docs.armory.io/docs/armory-admin/dinghy-enable/#steps-to-follow-to-configure-pipelines-as-code)

