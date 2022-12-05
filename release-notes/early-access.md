---
title: Early Access
sidebar_position: 2
---

# Early Access

## November 29, 2022

This release does not include new features.

## Fixed issues

The environment name doesn't resolve if all clusters are selected in a pipeline. (CDS-45156)
This issue has been resolved.
The items on the Template > Step Template page are overlapping. (CDS-45003)
This issue has been resolved.
The Nexus fields do not render when the Nexus artifact source is selected as the primary artifact. (CDS-44950)
This issue has been resolved.
A new artifact trigger cannot be created because an input set is required. (CDS-44883)
To resolve this issue, the Git Sync condition was updated to the new URL-based parameter along with the backward-compatible condition.
When using multiple GitOps clusters, variables are not being populated for all of the clusters. (CDS-44834)
This issue has been resolved.
When creating an S3 artifact, a Null Pointer Exception shows if both the bucket name and the file path are empty. (CDS-44660)
An appropriate error now appears in this situation.
When editing a secret, the Verify Connection screen closes prematurely. (CDS-43874)
This issue has been fixed.
The artifact.metadata.url is null for the Nexus3 artifact Docker repository format. (CDS-43863)
The URL was added to the metadata so it can now be accessed using artifact.metadata.url.
A drop-down selector for the image path in an ECR artifact source is not available. (CDS-43673)
A drop-down selector is available now.
Pipeline variables are not being translated in HTTP step assertions and output variables. (CDS-43200)
Previously, only HTTP response expressions could be used in an HTTP step assertion. Now, users can use pipeline and other expressions in assertions and use them with HTTP response expressions.
Instance sync does not work with Jenkins artifacts when a service is updated. (CDS-43144)
Previously, from the delegate task, the last successful build was fetched, but the build was not verified. The build is now verified, which resolves this issue.
The UI crashes when the artifact name is null. (CDS-44598)
The validation of the artifact name was missing, which allowed the user to submit the artifact without a name. This caused the null checks to fail and the UI to crash.
Validations for the artifact name and an extra null check were added to prevent this issue.
The ECS Harness file store console view does not show fetch manifests. (CDS-44196)
This issue has been fixed.
