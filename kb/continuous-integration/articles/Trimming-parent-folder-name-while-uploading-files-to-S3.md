---
title:  Trim parent folder name when uploading to S3
---

## Problem

With the [Upload Artifacts to S3 step](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings), the default behavior retains the parent folder name in file paths. However, there may be situations where you want to remove the parent folder name from the file path during the upload process.

## Solution

To trim the parent folder name when uploading files to S3, a [stage variable](https://developer.harness.io/docs/platform/pipelines/add-a-stage#stage-variables) named `PLUGIN_STRIP_PREFIX` to your deployment template or configuration. Set the value to the name of the parent folder that you want to eliminate from the file paths.

This variable specifies the parent folder name that needs to be removed from the file paths during the upload process. For example, assume you are uploading files with the following file structure:

```
Parent_Folder
  └── Child_Folder
      └── File.txt
```

If you want to remove the `Parent_Folder` name from the file paths during upload, set `PLUGIN_STRIP_PREFIX` to `Parent_Folder`.
