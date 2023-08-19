---
title: Continuous Integration(CI) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Integration(CI).
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ


#### Can we enable BuildKit support for the native build and push step?

Currently, our OOTB build and push step utilize Kaniko for building Docker images. To incorporate BuildKit support we would need to use dind build in a run step and more details about dind build can be reffered [here](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage/)


#### Account verification error for CI Builds (Free Trial account with hosted builds)

Recently Harness has been the victim of several Crypto attacks that use our freely hosted build to mine cryptocurrencies. Unfortunately, to protect our infrastructure, we now block the use of the cloud-hosted-builds infrastructure only to business domains and block it for general-use domains like Gmail, Hotmail, and Yahoo and other untrusted emails. 
 
To address these issues, you can do one of the following:
Provide your own build infrastructure (like a VM with docker or a Kubernetes cluster). We have no limitations on building using your own infrastructure.
Creating the Harness account with your work email and not a Gmail address will solve this problem.

#### How do I share data between steps in a CI stage?

We could use shared paths to allow steps within a stage to share data with each other. You can specify custom paths for data sharing or cache purposes. For more details on this please refer to https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages 

#### Is it possible to use different build infrastructures within a pipeline?

Yes, you can configure different build infrastructures for each stage within a pipeline. This flexibility allows you to use the most suitable infrastructure for each part of your CI workflow.

#### How can we configure a specific step to only run when a certain file, like a .toml configuration file, has changed in the repository?

To achieve conditional step execution based on changes to a specific file, you can set up webhook triggers with file-based conditions. Configure the trigger to activate the step only when the targeted file (e.g., config.toml) has been modified in the repository.

#### How can we share a failed step's output in a pull request comment as part of a CI pipeline execution?
Below given one of the methods with which we could achieve this.

- Modify the failed step's command to save output to a file: ```your_command 2>&1 | tee output_file.log```
- Read the file's content in a subsequent step which is configured to run always
- Use the GitHub API to add a comment to the pull request, including details from the file.

