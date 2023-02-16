---
title: Build and push an artifact
description: Once you've defined a build farm in the CI stage's infrastructure, you can add a Build and Push step to build your codebase and push the artifact to a repo.
sidebar_position: 20
helpdocs_topic_id: 8l31vtr4hi
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

Once you've defined a build farm in the CI stage's infrastructure, you can add a Build and Push step to build your codebase and push the artifact to a repo. The following repos are supported:

* Docker
* Azure Container Registry (ACR)
* Google Container Registry (GCR)
* Amazon Elastic Container Registry (ECR)

This topic describes a simple one-step build workflow that does not include testing. It builds the code in a build farm, and then pushes it to a repo.

For details about Build and Push step settings, go to the [CI technical reference](/docs/category/ci-technical-reference).

### Before you begin

You should have an understanding of the following:

* Harness' [Key concepts](../../../getting-started/learn-harness-key-concepts.md)
* How to [Set up build infrastructure](/docs/category/set-up-build-infrastructure).
* How to create pipelines. If you haven't created a pipeline before, try one of these tutorials:
  * [CI pipeline tutorial](../../ci-quickstarts/ci-pipeline-quickstart.md)
  * [Get started for free with the fasted CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).
* [CI stage settings](../../ci-technical-reference/ci-stage-settings.md)

### Visual summary

The following video shows how to set up a Build and Push step.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" />


<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/v3A4kF1Upqo/hqdefault.jpg"><iframe width="200" height="150" src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div -->

### Step 1: Create the CI stage

In your Harness Pipeline, click **Add Stage**, and then click **Build**.


### Step 2: Add the Codebase


Do one of the following:


* If this is the first CI stage in the pipeline, in the CI stage settings, enable **Clone Codebase**.
* If you have an existing pipeline with a CI stage, click **Codebase** on the right.


In **Connector**, select an existing Connector to your codebase repo, or create a new one. See [Code Repo Connectors](/docs/category/code-repo-connectors).


You can see the URL for the repo account below **Repository Name**. Don't add the URL into **Repository Name**.


In **Repository Name**, enter the name of the repo containing the codebase.


For example, if the account URL is `https://github.com/mycompany` and the repo in that account is `myapp`, you can simply enter `myapp` in **Repository Name**.


You specify the codebase repo here, but you enter the Git branch or tag when you deploy the Pipeline.


### Step 3: Define the Build Farm Infrastructure


In the CI stage **Infrastructure**, define the build farm for the codebase.


The following example uses a Kubernetes cluster build farm.


In **Select a Kubernetes Cluster**, select or create a Kubernetes Connector. This Connector connects Harness to the cluster to use as the build farm. See [Kubernetes Cluster Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).


In **Namespace**, enter the Kubernetes namespace to use. You can use a text string, a Runtime Input (`<+input>`), or an expression. See [Runtime Inputs](../../../platform/20_References/runtime-inputs.md).


See [Define Kubernetes Cluster Build Infrastructure](../set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).


### Step 4: Add the Build and Push Step


In the stage's **Execution**, add a Build and Push step. For all Build and Push steps, you select or create a connector for the target repo, add repo-specific information, and specify Dockerfile information. For information about the Build and Push step settings, go to the reference topic that corresponds with your registry provider:

* Docker: [Build and Push to Docker Registry Step](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md)
* Azure Container Registry (ACR): Use [Build and Push to Docker Registry Step](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md)
* Google Container Registry (GCR): [Build and Push to GCR Step](../../ci-technical-reference/build-and-push-to-gcr-step-settings.md)
* Amazon Elastic Container Registry (ECR): [Build and Push to ECR Step Settings](../../ci-technical-reference/build-and-push-to-ecr-step-settings.md)

<details>
<summary>Optional: Add a tag using Harness Expression</summary>

When you push the image to a repo, you tag the image so you can identify it later.

For example, in one stage you push the image, and, in a later stage, you use the image name and tag to pull it and run integration tests on it.

You can tag the image in any way, but a Harness expression can be very useful.

Here's an example:

![](./static/build-and-upload-an-artifact-10.png)

The `<+pipeline.sequenceId>` provides a variable tags you can use to reference this image in future stages by using syntax such as: `harnessdev/ciquickstart:<+pipeline.sequenceId>`.

If you have a [Background step](../../ci-technical-reference/background-step-settings.md) in a later stage in your pipeline, you can use the `<+pipeline.sequenceId>` variable to identify the image without needing a fixed value.

![](./static/build-and-upload-an-artifact-11.png)

The `<+pipeline.sequenceId>` is a built-in Harness variable that represents the **Build Id** number, for example `Build Id: 9`.

After the pipeline runs, you can see the Build Id:

![](./static/build-and-upload-an-artifact-15.png)

This Build Id tags the image you push in one stage of your Pipeline, and pulls the image in future stages of your pipeline.

You'll also see the Id as the tag on the image in your repo:

![](./static/build-and-upload-an-artifact-12.png)

</details>

<details>
<summary>Optional: Build a Docker image without pushing</summary>

Suppose you want to test the Dockerfile used in your Codebase and verify that the resulting image is correct, before you push it to your Docker repository. To enable this in your Pipeline, do the following.

1. In your CI Pipeline, go to the Build Stage that includes the Build and Push an Image to Docker Repository step that you want to customize.
2. In the Build Stage Overview, expand the Advanced pane.
3. Click Add Variable and enter the following:
	1. NAME = **PLUGIN\_NO\_PUSH**
	2. TYPE = **String**
	3. VALUE = **true**
4. Save and run the Pipeline.

</details>

### Step 5: Specify Codebase Branch or Tag at Pipeline Execution

Once you click **Run Pipeline**, provide the Git branch or tag to use for the execution.

![](./static/build-and-upload-an-artifact-13.png)

Enter the branch or tag and click **Run Pipeline**.

### Step 6: View the Results

You can see the logs for the Build and Push Step in the Pipeline as it runs.

Here's an example that pushes to a Docker repository:

```
/kaniko/executor --dockerfile=Dockerfile --context=dir://. --destination=cretzman/ciquickstart:13
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Built cross stage deps: map[]
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Executing 0 build triggers
Unpacking rootfs as cmd ADD go-sample-app /bin/ requires it.
LABEL maintainer="John Doe <john.doe@example.com>"
Applying label maintainer=John Doe <john.doe@example.com>
Using files from context: [/step-exec/workspace/go-sample-app]
ADD go-sample-app /bin/
Taking snapshot of files...
ENTRYPOINT ["/bin/go-sample-app"]
```

On Docker Hub, you can see the image that you pushed.

![](./static/build-and-upload-an-artifact-14.png)

In your Harness project's **Builds**, you can see the build listed.

### YAML example

Here's an example of the YAML for a pipeline that has a stage with a Build and Push step:

```
pipeline:
  name: CI Quickstart
  identifier: CI_Quickstart
  properties:
    ci:
      codebase:
        connectorRef: account.CI_Quickstart
        repoName: goHelloWorldServer
        build: <+input>
  stages:
    - stage:
        name: Build Test and Push
        identifier: Build_Test_and_Push
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and push image to DockerHub
                  identifier: Build_and_push_image_to_DockerHub
                  spec:
                    connectorRef: account.Docker_Quickstart
                    repo: cretzman/ciquickstart
                    tags:
                      - <+pipeline.sequenceId>
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: account.cidelegate
              namespace: harness-delegate-uat
          serviceDependencies: []
  projectIdentifier: CI_Quickstart
  orgIdentifier: default

```


### See also

* [Run Step Settings](../../ci-technical-reference/run-step-settings.md)


