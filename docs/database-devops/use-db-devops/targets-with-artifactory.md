---
title: Using Artifactory Connector with Optional Archive Path Field
sidebar_label: Using Artifactory Connector with Optional Archive Path Field
displayed_sidebar: dbdevopsbeta
description: Using Target Paths with Artifactory.
# sidebar_position: 10
---

## Overview

This document outlines the process for utilizing the Artifactory connector to download a zip file containing change logs and how to specify the optional archive path field to point to the root change log inside that zip file.[2] This integration allows for a seamless transition from using a Git repository to an Artifactory instance for managing database change logs.



### Key Benefits:

 - Centralized storage of build artifacts.
 - Version control and traceability of change logs.
 - Reduced dependency on Git repositories for change log management.

### Using the Artifactory Connector

To use the Artifactory connector effectively:

 1. **Configure the Connector**: In your DB DevOps project
 settings, select the Artifactory connector and provide necessary
 authentication details.
 
 2. **Specify the Archive Path**: In the "Path to Archive File (Optional)" field, enter the path to the archive in your
 Artifactory repository.
 
 3. **Set the Schema File Path**: In the "Path to Schema File"
 field, enter the relative path to the changelog file within the
 archive.
 4. **Save and Apply**: After entering the paths, save your configuration.
 
 When the pipeline runs, it will:
 
 1. Download the specified archive from Artifactory
 2. Extract the archive
 3. Locate the changelog file using the provided schema file path
 4. Execute the changes described in the changelog

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

By correctly configuring the "Path to Archive File (Optional)" and "Path to Schema File" fields, you can efficiently manage your database change logs stored in Artifactory. This approach provides version control, traceability, and centralized storage for your database schema changes.

For any further questions or assistance regarding the Artifactory connector or the archive path configuration, please reach out to your DevOps team or consult the relevant documentation.
