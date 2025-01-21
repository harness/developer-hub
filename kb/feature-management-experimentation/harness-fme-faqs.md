---
title: Feature Management & Experimentation (FME) FAQs
description: This article addresses some frequently asked questions about Harness FME.
sidebar_position: 2
---

<!-- not updated yet, these are copied from FF -->

## Licenses, installation, and initial setup

### What do I need in order to get started with Harness Feature Flag?

You need a GitHub account, and IDE or text editor, a Harness account with the Feature Flag module, and the ability to run `npm install` in your local environment.

### How do I install NPM?

Go to the [npm-install documentation](https://docs.npmjs.com/cli/v7/commands/npm-install) for information about installing NPM.

### How to get started with GitHub/Git and Feature Flags?

You need to clone your Git repository on your local machine using a `git clone` command, such as `git clone https://github.com/MY_ORG/MY_REPO.git`

### Can my development team generate and control feature flags solely through Git and Harness pipelines?

Yes, Harness offers a powerful Git-based workflow for FF management, providing flexibility and control to development teams.  The Harness Git Experience provides a seamless way to manage feature flags using Git. Here's how it works:

- **Git Experience with Feature Flags:** You can manage your Feature Flags directly from a YAML file in your Git repository. This approach allows you to leverage Git for FF management alongside the Harness Platform.
- **Two-Way Synchronization:** With Git Experience enabled, any changes you make to FF on the Harness Platform are committed to Git automatically. Similarly, any commits made in Git for FF are reflected in the Harness Platform. This two-way synchronization ensures that you can work on FF entirely within Git, within the Harness Platform, or even both simultaneously. Your changes are kept in sync across both platforms.

For instructions and more information, go to [Manage Feature Flags in Git Repositories](https://developer.harness.io/docs/feature-flags/use-ff/ff-creating-flag/manage-featureflags-in-git-repos).

If you have any further questions or need assistance, contact [Harness Support](mailto:support@harness.io) for additional guidance.

### How do I add a Feature Flags SDK to my project?

For an example of adding an SDK to a project, go to [Get started with an SDK](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/java-quickstart).

### How do I configure the source code for feature flags?

You need to have the source code level setup so that the application can communicate with Harness Feature Flags. For a walkthrough, go to [Get started with an SDK](https://developer.harness.io/docs/feature-flags/get-started/java-quickstart).