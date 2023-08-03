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
