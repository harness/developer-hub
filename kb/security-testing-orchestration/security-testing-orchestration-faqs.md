---
title: Security Testing Orchestration (STO) FAQs
description: Frequently asked questions about Harness Security Testing Orchestration (STO).
sidebar_position: 2
---

### How do I prevent a user who requested an exemption from approving it?

To approve exemptions, users must have the **Approve/Reject** permission. Currently, Harness STO doesn't have a setting to prevent the user who requested the exemption from also approving it.

### Why is the STO Grype step throwing this exeption? "db could not be loaded: the vulnerability database was built n weeks ago (max allowed age is 5 days)" 

This exception indicates that the Grype step in the STO process is unable to load the vulnerability database due to its age exceeding the maximum allowed age of 5 days. If the environment where you're running these scans has restricted internet connectivity (firewalled), you must set up a local database for Grype to update itself. For comprehensive documentation for the initial setup, configuring the local database, and final configuration, go to [Set up Grype in air-gapped environments](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/grype/grype-setup-in-airgapped/).

While Harness updates the database every time it rebuilds the Grype image, this is primarily done for performance reasons. A fresher database requires less time and effort to update at runtime. However, this update is not sufficient to bypass the database access requirement, as the maximum allowed age is 5 days. You can temporarily disable the age check and run Grype with the database it ships with, but this is not recommended from a security standpoint. It's advisable to follow the provided instructions to resolve the database access issue in a more secure manner.

### Can't generate SonarQube report due to shallow clone

* Error message: `Shallow clone detected, no blame information will be provided. You can convert to non-shallow with 'git fetch --unshallow`
* Cause: If the [depth setting](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth) in your pipeline's codebase configuration is shallow, SonarQube can't generate a report. This is a [known SonarQube issue](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scm-integration/#known-issues).
* Solution: Change the `depth` to `0`.
