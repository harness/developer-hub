---
title: Git Clone Step
description: A Git Clone step is useful when you want to include multiple repositories in your build. Each step clones its repo to the pipeline workspace along with the cloned codebase.
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: nl3ixvew4o
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Git Clone step, which clones a repo to the pipeline workspace.

This step is useful when you want to include multiple repositories in your build. For example, suppose you maintain your code files in one repo and your build files (such as Dockerfiles) in a separate repo. In this case, you can set up your Build stage to [clone your code files](../use-ci/codebase-configuration/create-and-configure-a-codebase.md) and add a Git Clone step to clone your build files into your pipeline workspace.

### Name

The unique name for this step.

### Id

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### Connector

The connector to your code repo. See [Code Repo Connectors](https://docs.harness.io/category/xyexvcc206).

### Repository

The code repo to add to the build. You need to specify this If the connector URL points to a Git account (such as `https://github.com/my-account/`) rather than to a repo within the account.

### Build Type, Git Branch, Git Tag

The branch or commit from the cloned repo that you want to include in the build.

These settings apply only to the repo specified in the Git Clone step. They are independent of the equivalent pipeline build settings, which apply to the Codebase object for the build stage.  
To ensure that the repo in a Git Clone Step uses the same branch or commit as the main codebase, you use the run time variables `<+codebase.branch>` and `<+codebase.tag>`. See [Built-in CI Codebase Variables Reference](built-in-cie-codebase-variables-reference.md).

### Clone Directory

The target path in the pipeline workspace where you want to clone the repo.

You cannot specify `/harness/` as a target for a Git Clone step because this folder is reserved for the repo defined in the Codebase object of the Build stage.You can set up your Build stage to use a custom workspace volume and share data across steps in your Build stage. See the Workspace section in [CI Build Stage Settings](ci-stage-settings.md).

### Additional Configuration

Configure the following options to add additional configuration for the Step.

#### Depth

The number of commits to fetch when the clones the repo.

For manual Triggers, the default Depth is 50 (each `git clone` operation fetches the most recent 50 commits). A setting of 0 fetches all commits in the branch. 

For all other Trigger types, the default Depth is 0 (fetch all commits to the branch).

For details, see <https://git-scm.com/docs/git-clone>.

#### SSL Verify

If **True** (the default), the Pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. You should set this to **False** only if you have a known issue with the certificate and are willing to run your builds anyway.

If you want to use self-signed certificates in your build infrastructure, see [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

#### Run as User

Set the value to specify the user id for all processes in the pod, running in containers. See [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set container resources

Maximum resources limit values for the resources used by the container at runtime.

##### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed: you can specify one hundred millicpu as `0.1` or `100m`. See [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

##### Timeout

Timeout for the step. Once the timeout is reached, the step fails, and the Pipeline execution continues.ACL

### See Also

* [Create and Configure a Codebase](../use-ci/codebase-configuration/create-and-configure-a-codebase.md)
* [Clone and Process Multiple Codebases in the Same Pipeline](../use-ci/run-ci-scripts/clone-and-process-multiple-codebases-in-the-same-pipeline.md)

