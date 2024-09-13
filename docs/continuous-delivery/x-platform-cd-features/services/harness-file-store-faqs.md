---
title: Harness File store Frequently Asked Question
description: Harness File store FAQs
---
### How can I upload a file to a specific folder in the Harness file store from a pipeline stage using PowerShell script?

You can achieve this by invoking the Harness API using PowerShell. The API endpoint you need to use is: [API Endpoint](https://apidocs.harness.io/tag/File-Store#operation/create)

### Is there a way to generate a dynamic file with some information in one stage of the pipeline and consume that file content in a different pipeline stage?

For CI:

Go to this [Documentation](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/) for more details.

For CD:

You can use API to create a file in Harness file store and then refer it to other stage. For more details, go to [API documentation](https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders).

Or, you can just write a file on the delegate and use the same delegate.

### How to properly pass tag inputs in api call for harness file store ?

For Harness file store tags are key value pairs and hence they need to be specified in the similar way , below is an example of how this needs to be specified:

```tags=[{"key":"tag","value":"value"}]```

### How do I write to file store ?

You can use API to create/update files in the file store [Documentation](https://apidocs.harness.io/tag/File-Store#operation/update)

### Can we access the file from Harness file store as a file ?

The contents of the file in the Harness file store can be read as ```<+fileStore.getAsString("filename")>``` . However if we need it as a file itself we will need to write it back to a file in the step and then use it:
```
cat>>filename.txt<<EOF
<+fileStore.getAsString("filenameInHarnessFileStore")>
EOF
```
### Is the expression \<+configFile.getAsBase64("myFile")> only supported when using service config file and not a config file in File Store? 

Yes, It works for config files added to the service and not any config file from the file store. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store/#reference-files-in-the-file-store-using-an-expression).

### How to pass values from CI of Pipeline A console logs to CD Pipeline of Pipeline B
The only way you can achieve this is to store this first pipeline output variable in file store or in git config then you can pull the same in your pipeline B. There is no built-in variable to achieve this use case in Harness.

### How to store filesize like we have dump for around 3GB to 5GB in the Harness file store?
If your dump file is between 3GB to 5GB, you may need to split it into multiple files before uploading to Harness file storage.

### Do we have a inline values override in next gen? 

We do not have a separate option for inline values yaml override. However in Next gen we allow to use values override from Harness file store. So we can create the values yaml override in harness file store and add it in the values override configruation.

### To store my shell script when I use Harness File Store I don't see any option like Bitbucket, or GitHub.

As of today, we have only two options to select the shell script provision script. That is inline and Harness file store.

### we have a config file which is required for a CLI tool ran using a custom shell script. Is it possible to somehow store this file within harness rather than directly on the delegate and reference it in the custom shell script execution?

You can use API [API]https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders to create or fetch files from Harness file store in the shell script.

### Is there a way to use one yaml file stored in git repo and use it in two different projects?

We cannot as the pipeline YAML has details like project identifier, Org Identifier which is unique.But you can create a pipeline-level template at the account level and use it in all projects.


### How to share files between CD stages?
1st Option: You can use API to create a file in the harness file store and then refer it to another stage. https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders
2nd Option: You can just write a file on the delegate and use the same delegate.

### How I can add runtime generated override file to a service before helm rendering?

The values file resolution will only happen once the actual deployment step runs. We can add values.yaml override from file store or any other source repo in the manifest and update the values.yaml using api call or cli with dynamic information. If we want to use any output variable from the pipeline we can use the same expression directly in the values.yaml and while fetching the file the expressions will be resolved. We just need to ensure that the steps from where the output variable expressions are copied executes before the actual deployment step runs.

### What pattern should be specified for the scopedFilePath parameter in this API call ?

The scopedFilePath parameter value depends on the file's scope:

- For a file on the project level, use scopedFilePath = `/path/to/file`.
- For a file on the organization level, use scopedFilePath = `org:/path/to/file`.
- For a file on the account level, use scopedFilePath = `account:/path/to/file`.
Remember to encode `/path/to/file` as `%2Fpath%2Fto%2Ffile`. Populate query arguments based on the file's storage location and identifiers such as accountIdentifier, orgIdentifier, and projectIdentifier.

Please read more on this in the following [Documentation](https://apidocs.harness.io/tag/File-Store#operation/getFileContentUsingScopedFilePath)
