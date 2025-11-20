---
title: Securing Webhook Endpoints
---

## Introduction
Administrators may want to secure pipeline webhook endpoints in Armory CD Self-Hosted.  The requirement usually comes from two perspectives:
* Users should be authenticated to access the system/environment* The endpoint must be secured so an unauthorized person or service won't trigger the pipeline.  Either accidentally or maliciously

## Prerequisites
A third-party integration, such as Okta, Github, Keycloak, or any other authentication service, with OAuth authentication, is enabled.  Please ensure only one method is active.  (e.g., Do not mix SAML and OAuth)

## Instructions
Admins can secure the pipeline webhooks under the Spinnaker's Gate profile by adding the following configuration in their SpinnakerService YAML:
spec:
  spinnakerConfig:
    profiles:
      gate:
        webhooks:
          defaultAuthEnabled: true
📍 Be advised it will take the default authentication enabled. 
If SAML is enabled as an authentication mechanism and you want to trigger the pipelines via a webhook from another system or service, use OAuth instead.SAML relies on browser redirection(javascript) and can cause problems with the configuration.
 
Just for reference, there are other ways to secure the pipeline endpoint for webhooks as well:
 
**Using a custom payload**
Admins can define in the "Automated triggers" some specific payloads like ```id``` and a ```secret```. 
This way, the pipeline invocation will have a secret token securing it.
[More info here](https://spinnaker.io/docs/guides/user/pipeline/triggers/webhooks/)
 
**Custom Webhook Stages**
Custom Webhook stages are typically used to make quick API calls to an external system as part of a pipeline.
[More info here](https://spinnaker.io/docs/guides/operator/custom-webhook-stages/)

