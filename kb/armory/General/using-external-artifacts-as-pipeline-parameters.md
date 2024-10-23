---
title: Using external artifacts as pipeline parameters
---

## Introduction
As an organization, a user requires pipelines to be able to read the latest "Approved" version instead of just the latest "Built" version. This is a useful feature when dev or staging environments create a stable pipeline that must be reproduced in Prod.Example: "Approved" can mean that an organization has manually checked a pipeline's success (such as the latest stable docker version to use) on a non production Spinnaker.  This information is valuable for automation and efficiency.

## Prerequisites
An organization may have need to move marked/tagged information external to Spinnaker such as Docker Container Registries, Artifacts, URLs, or any such string information.
In order to achieve this, an organization must have a working version of Spinnaker as well as an externally called resource. In this example, we are using Docker Container IDs in order to pass the ID from a manual judgement stage to an automated stage.


## Instructions
In this example, we will take a manual test pipeline that confirms whether a docker image is stable or not. This docker image ID will then be passed onto a Production Spinnaker that runs off of a cronjob. 
* On the Manual Test pipeline, an organization will need to add a stage which includes adding a tag to the specific docker image. This is to create a value that an organization can reference for this process. It can be something like ```Approved``` or a more unique value that an organization will recognize. It may needed to add an additional stage ahead of this removing the tag from any previous Docker images so there aren't multiple docker images that have the tag. * On the pipeline on the production environment, an organization will need to add a ```find-tag``` stage which searches for the unique value you created in the previous step.* Once you have that unique ID, an organization can assign the docker image to only use the ```Approved``` tag vs just using the latest. This stage would search for the latest approved tag and use that docker image vs just going by the 'latest'. 
This allows companies to use a pre-prod or staging Spinnaker instance to approve Docker or other Values in a safe environment, and pass that information to a production environment.

