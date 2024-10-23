---
title: Authenticate Against Jenkins
---

## Introduction
If you have are trying to authenticate Spinnaker against a Jenkins master that has some third party authentication set up, you have to create an API token for Spinnaker to authenticate against Jenkins.

## Prerequisites
Access to Jenkins Administration

## Instructions
* Log into Jenkins* Click on your username (in the top right)* Click on “Configure” (on the left)* Under the “API Token” section, click on “Add new Token”, and “Generate” and record the generated token* Record your username (should be in the URL for the current page - if you’re at [https://jenkins.domain.com/user/justinrlee/configure](https://jenkins.domain.com/user/justinrlee/configure), then the username is, as an example, ```janesmith```)Add the Jenkins master to Spinnaker with this:
```
hal config ci jenkins enable
 echo  | hal config ci jenkins master add  \
     --address https://jenkins.domain.com \
     --username  \
     --password

     # Password will be read from stdin​
```
For example, if the generated token is ```1234567890abcdefghijklmnopqrstuvwx```, and your username is ```janesmith``` and you want to identify the Jenkins master as ```jenkins-prod```, then you’d run something like this:
```
 echo 1234567890abcdefghijklmnopqrstuvwx | hal config ci jenkins master add jenkins-prod \
     --address https://jenkins.domain.com \
     --username janesmith \
     --password​
```
* Also, don’t forget to configure the CSRF stuff: [https://www.spinnaker.io/setup/ci/jenkins/#configure-jenkins-and-spinnaker-for-csrf-protection](https://www.spinnaker.io/setup/ci/jenkins/#configure-jenkins-and-spinnaker-for-csrf-protection)

