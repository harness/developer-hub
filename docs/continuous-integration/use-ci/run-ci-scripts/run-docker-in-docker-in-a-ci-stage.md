---
title: Run Docker-in-Docker in a CI Stage
description: You can run Docker-in-Docker as a Service Dependency in a CI Stage. This example illustrates using Docker-in-Docker to build and push an image in a Run step. This can be useful if you want to build f…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: ajehk588p4
helpdocs_category_id: 7ljl8n7mzn
helpdocs_is_private: false
helpdocs_is_published: true
---

You can run Docker-in-Docker (**dind**) in a CI Stage. This is useful whenever you need to run Docker commands as part of your build process. For example, you can build images from two separate codebases in the same Pipeline: one using a step such as [Build and Push an Image to Docker Registry](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md), and another using Docker commands in a Run step.

This topic illustrates a simple build-and-push workflow using Docker-in-Docker.

Docker-in-Docker must run in privileged mode to work properly. You need to be careful because this provides full access to the host environment. See [Runtime Privilege and Linux Capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities) in the Docker docs.  
Docker-in-Docker is not supported in Harness-hosted build infrastructures or on platforms (such as those running Windows containers) that don't support Privileged mode. 

### Before You Begin

To go through this workflow, you need the following:

* A familiarity with basic Harness CI concepts:
	+ [CI Pipeline Quickstart](../../ci-quickstarts/ci-pipeline-quickstart.md)
	+ [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)
* A familiarity with Build Stage settings:
	+ [CI Build Stage Settings](../../ci-technical-reference/ci-stage-settings.md)

### Step 1: Set Up the CI Stage

In your Harness Pipeline, click **Add Stage**. Then click **Build**.

In the Overview tab for the new Build Stage, configure the Stage as follows:

* For this example, disable **Clone Codebase**. You will be cloning a different codebase from the one referenced in the Codebase Object.
* Under Shared Paths, add the following:
	+ `/var/run`
	+ `/var/lib/docker`
* Under Advanced, add Stage Variables for your Docker Hub Personal Access Token and any other fields you want to parameterize. For passwords and Personal Access Tokens, select Secret as the variable type.

### Step 2: Define the Build Farm Infrastructure

In the CI Build stage > **Infrastructure** tab, define the build infrastructure for the codebase. See [Set Up Build Infrastructure](/docs/category/set-up-build-infrastructure).

### Step 3: Add a dind Background step

In the Execution tab, add a [Service Dependency Step](../../ci-technical-reference/configure-service-dependency-step-settings.md) and configure it as follows:

* **Name:** dind_Service.
* **Container Registry:** A connector to your Docker registry.
* **Image:** The image you want to use, such as [docker:dind](https://hub.docker.com/_/docker).
* **Optional Configuration:** Select **Privileged**. This is required for Docker-in-Docker.

### Step 4: Configure the Run Step

In the Execution tab, add a [Run Step](../../ci-technical-reference/run-step-settings.md) and configure it as follows:

* **Container Registry:** A Connector to your Docker registry.
* **Image:** The same image you specified for the Service Dependency.
* **Command:** Enter the shell commands you want to run in the dind container.

Once the container is started, the software inside the container takes time to initialize and start accepting connections. Give the service adequate time to initialize before trying to connect. You can use a `while` loop, as shown here:


```
  
while ! docker ps ;do   
      echo "Docker not available yet"  
done  
echo "Docker Service Ready"  
docker ps  

```
The following example code clones a Git repo, builds an image, and pushes the image to a Docker registry:


```
apk add git  
git --version  
git clone https://github.com/$GITHUB_USERNAME/$GITHUB_REPO  
cd $GITHUB_REPO  
  
echo $DOCKERHUB_PAT > my_password.txt  
cat my_password.txt | docker login --username $DOCKERHUB_USERNAME --password-stdin  
  
docker build -t $DOCKER_IMAGE_LABEL .  
docker tag $DOCKER_IMAGE_LABEL $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>  
docker push $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>
```
### Step 5: Run the Pipeline

Now you can run your Pipeline. You simply need to select the codebase.

1. Click **Save**.
2. Click **Run**.
3. If prompted, specify a Git branch, tag, or PR number.
4. Click **Run Pipeline** and check the console output to verify that the Pipeline runs as intended.

### Configure As Code: YAML

To configure your pipeline as YAML in CI, go to Harness **Pipeline Studio**, click **YAML**. Here’s is a working example of the workflow described in this topic. Modify the YAML attributes such as name, identifiers, codebase, connector refs, and variables as needed.


```
pipeline:
  name: dind-w-background-step
  identifier: dindwbackgroundstep
  projectIdentifier: myproject
  orgIdentifier: myorg
  tags: {}
  stages:
    - stage:
        name: build-bg
        identifier: buildbg
        type: CI
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Background
                  name: Background
                  identifier: Background
                  spec:
                    connectorRef: mydockerhubconnector
                    image: docker:dind
                    shell: Sh
                    privileged: true
              - step:
                  type: Run
                  name: Run
                  identifier: Run
                  spec:
                    connectorRef: mydockerhubconnector
                    image: docker:dind
                    shell: Sh
                    command: |-
                      while ! docker ps ;do   
                            echo "Docker not available yet"  
                      done  
                      echo "Docker Service Ready"  
                      docker ps 

                      apk add git  
                      git --version  
                      git clone https://github.com/john-doe/$GITHUB_REPO  
                      cd $GITHUB_REPO  
                        
                      echo $DOCKERHUB_PAT > my_password.txt  
                      cat my_password.txt | docker login --username $DOCKERHUB_USERNAME --password-stdin  
                        
                      docker build -t $DOCKER_IMAGE_LABEL .  
                      docker tag $DOCKER_IMAGE_LABEL $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>  
                      docker push $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>
                    privileged: false
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: docsexampledelegate
              namespace: harness-delegate-ng
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
            - /var/lib/docker
        variables:
          - name: DOCKERHUB_USERNAME
            type: String
            description: ""
            value: jdoe
          - name: DOCKERHUB_PAT
            type: Secret
            description: ""
            value: jdoedockerhubpat
          - name: GITHUB_USERNAME
            type: String
            description: ""
            value: john-doe
          - name: GITHUB_REPO
            type: String
            description: ""
            value: codebaseAlpha
          - name: GITHUB_PAT
            type: Secret
            description: ""
            value: johndoegithubpat
          - name: DOCKER_IMAGE_LABEL
            type: String
            description: ""
            value: dind-w-bg-step

```
### See Also

* [Run a Drone Plugin in CI](../use-drone-plugins/run-a-drone-plugin-in-ci.md)
* [CI Run Step Settings](../../ci-technical-reference/run-step-settings.md)

