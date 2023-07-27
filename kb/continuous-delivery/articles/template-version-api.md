---
description: KB - Understanding template version API and it's working
title: Template version API
---
# Introduction

This knowledge base article provides a comprehensive understanding of the Template Version API and its functionality in managing templates. It explains the purpose of the API, highlights the difference between version and versionLabel, and provides examples of how to use the API for updating and creating template versions.

**Version**: The term "version" refers to the complete template, including all the elements specified in the YAML file. It represents the overall structure and content of the template.

**VersionLabel**: On the other hand, "versionLabel" is an identifier that uniquely identifies a particular version of a template. It serves as a label or tag associated with a specific iteration of the template.

It's important to note that while the Update Template API allows updating the template's content (version), it does not support modifying the versionLabel directly. However, you can create a new template version with a different versionLabel.


`We cannot update a versionLabel of template directly as it’s a unique property. But we can create a template with a new version.`

Below is an example API request to update a template version : 

```
curl -i -X PUT \
  'https://app.harness.io/template/api/templates/update/shell2/1.0?accountIdentifier=&orgIdentifier=string&projectIdentifier=string&branch=string&repoIdentifier=string&rootFolder=string&filePath=string&commitMsg=string&lastObjectId=string&resolvedConflictCommitId=string&baseBranch=string&connectorRef=string&setDefaultTemplate=false&comments=string' \
  -H 'Content-Type: application/yaml' \
  -H 'If-Match: string' \
  -H 'x-api-key: yourpattoken' \
  -d 'template:
    name: shell2
    identifier: shell2
    versionLabel: "1.0"
    type: Step
    tags: {}
    spec:
      timeout: 10m
      type: ShellScript
      spec:
        shell: Bash
        onDelegate: true
        source:
          type: Inline
          spec:
            script: echo "abhi"
        environmentVariables: []
        outputVariables: []
        
  '

```

Now to create new API version as you cannot update versionLabel :

```
curl -i -X POST \
  'https://app.harness.io/template/api/templates?accountIdentifier=&orgIdentifier=string&projectIdentifier=string&branch=string&repoIdentifier=string&rootFolder=string&filePath=string&commitMsg=string&isNewBranch=false&baseBranch=string&connectorRef=string&storeType=INLINE&repoName=string&setDefaultTemplate=false&comments=string&isNewTemplate=false' \
  -H 'Content-Type: application/yaml' \
  -H 'x-api-key: yourpattoken' \
  -d 'template:
    name: shell2
    identifier: shell2
    versionLabel: "3.0"
    type: Step
    tags: {}
    spec:
      timeout: 10m
      type: ShellScript
      spec:
        shell: Bash
        onDelegate: true
        source:
          type: Inline
          spec:
            script: echo "abhi"
        environmentVariables: []
        
  '

```
Make sure to change versionLabel above.