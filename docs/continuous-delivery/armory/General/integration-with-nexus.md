---
title: Integration with Nexus
---

## Introduction
The following instructions provide a sample configuration to integrate Spinnaker with Nexus as an artifact repository.

## Prerequisites
1. Nexus as an artifact repository2. Kubernetes Operator with Kustomize templates in a deployment.

## Instructions
In Operator, the following configuration change can be made under: ```spec.spinnakerConfig.config.repository``` to enable connection to the Nexus repository needed.  
Please ensure that the following values below are adjusted to match the repository's values:
* baseUrl* repo* nodeId* username* password
````
spec:
  spinnakerConfig:
    config:
      repository:
       nexus:
        enabled: true
        searches:
        - name: Armorytest # Example. Please name as necessary
          permissions:
            READ:
            - '[]'
            WRITE:
            - '[]'
          baseUrl: https://armory.io # Example. Please use the correct URL
          repo: testrepo 
          nodeId: testNodeID
          username: testuser
          password: testpassword
````
Please note that this is from preliminary testing and only to provide a lead on what the configuration may look like. Any issues related to Nexus may be filed through Spinnaker Github Issue Tracker as a New Issue/Feature with the OSS community[https://github.com/spinnaker/spinnaker/issues](https://github.com/spinnaker/spinnaker/issues)

