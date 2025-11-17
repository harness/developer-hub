---
title: Github trigger matches multiple artifacts on trigger (.tf files)
---

## Issue
An organization may run into an issue where they have a pipeline setup which triggers on change in Github Enterprise. The expected artifact should look similar to this.
````
- displayName: "changed terraform file"

      id: changed-terraform-file

      defaultArtifact:

        customKind: true

        id: default-tf-artifact

      matchArtifact:

        name: ".*\\.tf.*"

        type: github/file

      useDefaultArtifact: true
````
This will work fine when there is only one commit with a change in one ```*.tf``` file, but it fails as soon as there are multiple commits with changes in multiple ```*.tf``` files. Here is an example error code.

````
Failed on startup: Expected artifact ExpectedArtifact(matchArtifact=Artifact(type=github/file, customKind=false, name=.*\.tf.*, version=null, location=null, reference=null, metadata={}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=true, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=default-tf-artifact}, artifactAccount=null, provenance=null, uuid=null), id=changed-terraform-file, boundArtifact=null) matches multiple artifacts [Artifact(type=github/file, customKind=false, name=main.tf, version=dc461903a063ce78fbf4d6f9ce8ccda6696db6cf, location=null, reference=https://git01.pfsfhq.com/api/v3/repos/ops/terraform-demo/contents/main.tf, metadata={}, artifactAccount=null, provenance=null, uuid=null), Artifact(type=github/file, customKind=false, name=test.tf, version=dc461903a063ce78fbf4d6f9ce8ccda6696db6cf, location=null, reference=https://git01.pfsfhq.com/api/v3/repos/ops/terraform-demo/contents/test.tf, metadata={}, artifactAccount=null, provenance=null, uuid=null)]
````

## Cause
This was at the time an intended behaviour for Spinnaker environments using Github Enterprise. There has been a community outreach regarding this issue and as a result, changes have been implemented.
The following is a similar and related Github Issue that was used as a foundation for the work done. [https://github.com/spinnaker/spinnaker/issues/3643](https://github.com/spinnaker/spinnaker/issues/3643)

