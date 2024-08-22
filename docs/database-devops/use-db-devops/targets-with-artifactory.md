---
title: Using Artifactory Connector with Optional Archive Path Field
sidebar_label: Using Artifactory Connector with Optional Archive Path Field
displayed_sidebar: dbdevopsbeta
description: Using Target Paths with Artifactory.
# sidebar_position: 10
---

## Overview

This document outlines the process for utilizing the Artifactory connector to download a zip file containing change logs and how to specify the optional archive path field to point to the root change log inside that zip file.[2] This integration allows for a seamless transition from using a Git repository to an Artifactory instance for managing database change logs.

## Artifactory Connector

The Artifactory connector enables users to download build artifacts, including change logs, directly from an Artifactory repository. This approach provides a more controlled and consistent environment for managing database changes, as artifacts can be versioned and stored securely.

### Key Benefits:
 - Centralized storage of build artifacts.
 - Version control and traceability of change logs.
 - Reduced dependency on Git repositories for change log management.

## Downloading from Artifactory

When using the Artifactory connector, the following steps should be followed to download a zip file containing the change logs:

1. **Configure the Artifactory Connector**: Ensure that the Artifactory connector is properly set up in your pipeline configuration. This includes specifying the Artifactory URL and any necessary authentication credentials.

2. **Specify the Target Path**: In the pipeline configuration, you will need to specify the target path where the zip file will be downloaded. This is typically the location within your build environment where you want the artifacts to reside.

3. **Download the Zip File**: Trigger the pipeline to download the zip file from Artifactory. The connector will handle the retrieval of the specified artifact.

## Using the Optional Archive Path Field

Once the zip file is downloaded, you must specify the optional archive path field to point to the root change log inside the zip file. This is crucial for ensuring that the pipeline can locate and utilize the change log effectively.

### Steps to Specify the Archive Path:

1. **Locate the Archive Path Field**: In your pipeline configuration, find the field labeled "Archive Path" or "Optional Archive Path."

2. **Enter the Path**: Input the path to the root change log within the downloaded zip file. This path should be relative to the root of the zip file. For example, if your zip file structure is as follows:
   ```
   my-changelog.zip
   ├── changelog/
   │   ├── v1.0/
   │   │   └── changelog.sql[24]
   │   └── v1.1/
   │       └── changelog.sql
   ```
   You would specify `changelog/v1.0/changelog.sql` as the archive path if you want to point to the change log for version 1.0.

3. **Validate the Configuration**: Ensure that the specified path is correct and that the change log exists at that location within the zip file. This validation step is crucial to avoid runtime errors during the pipeline execution.

## Conclusion

By utilizing the Artifactory connector and specifying the optional archive path field, users can effectively manage their database change logs in a more structured and reliable manner. This integration not only enhances the deployment process but also ensures that change logs are versioned and easily accessible.

For any further questions or assistance regarding the Artifactory connector or the archive path configuration, please reach out to your DevOps team or consult the relevant documentation.