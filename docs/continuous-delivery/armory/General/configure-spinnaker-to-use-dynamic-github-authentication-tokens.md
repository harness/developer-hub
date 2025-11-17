---
title: Configure spinnaker to use dynamic Github authentication tokens
---

## Introduction
An organization may choose to have a rotation policy for the Github tokens to improve security.
In such scenarios, changes to the token are to be automatically reflected in Clouddriver without any restarts. Starting ***Armory release v2.26.2***, the GitHub, GitLab, and GitRepo artifact providers support token files that are dynamically updated. The token file is automatically reloaded when Armory Enterprise makes a request.
Please refer to the release notes for more details [https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-2/#artifacts](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-2/#artifacts).


## Prerequisites
Below are the prerequisites to have the dynamic Github tokens configured with spinnaker
* Armory Spinnaker version 2.26.2 or higher.* Process to rotate the Github tokens. Rotation of tokens are assumed to be the responsibility of the customer. This can be achieved by leveraging the Github rest APIs. 

## Instructions
Once the above prerequisites are met, follow the below instructions to configure the dynamic tokens for Github on operator based installations
Specify the path of the ```tokenFile: ```under the path ```spec.spinnakerConfig.config.artifacts.github .```This is the path where the token file shall reside under the clouddriver pod(s).  The field ```tokenFile: ```supports encrypted secret references. For instance, lets assume that the path form the token file is ```/tmp/github/github-token ```
```
spec:
  spinnakerConfig:
    config:     
      artifacts:
        github:
          enabled: true
          accounts:
          - name: gitrepo
            username: xxx
            tokenFile: encrypted:k8s!n:git-hub-dynamic-token!k:github-token #This field support "encrypted" secret references​
```
Create a secret containing the Github auth token which is ```base64 ```encoded.
```
apiVersion: v1
kind: Secret
metadata:
  name: git-token
data:
  github-token: XXXXXXXXX​
Mount the secret and add the service settings for Clouddriver under ```spec.spinnakerConfig.service-settings.clouddriver.kubernetes``` as shown below
spec:
  spinnakerConfig:
    service-settings:
      clouddriver:
       kubernetes:
          volumes:
           - id: git-token
             mountPath: /tmp/github
             type: secret​
```
* Apply the above changes and deploy Clouddriver.
* It can be seen that the Clouddriver pod now has the Github token under ```/tmp/github/github-token```.
* If there is a change in the token, the secret in which the token resides has to be updated so that file on the Clouddriver pod automatically reflects the change. Clouddriver service ideally refers the token file before making any calls to Github and hence any changes to the token shall immediately take effect and would not require any Clouddriver restart. 





