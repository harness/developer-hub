---
title:  Trimming Parent Folder Name While Uploading Files to S3
---

## Problem

When uploading files to Amazon S3 using  ```Upload Artifacts to S3``` step, the default behavior is to retain the parent folder names in the file paths. However, there may be situations where you want to remove the parent folder name from the file path during the upload process.

## Solution

To trim down the parent folder name while uploading files to S3, follow these steps:

1. Add Stage Variable:

   In your deployment template or configuration, add a stage variable with the name ```PLUGIN_STRIP_PREFIX```. This variable will be used to specify the parent folder name that needs to be removed from the file paths.
2. Set the Value of ```PLUGIN_STRIP_PREFIX```:

   Assign the value of ```PLUGIN_STRIP_PREFIX``` to be the name of the parent folder that you want to eliminate from the file paths. This value will be used to manipulate the file paths during the upload process.
  
## Example:

Assume you have the following file structure:

```
Parent_Folder
  └── Child_Folder
      └── File.txt
```
If you want to remove the ```Parent_Folder``` name from the file paths during upload, set the ```PLUGIN_STRIP_PREFIX``` to ```Parent_Folder```
