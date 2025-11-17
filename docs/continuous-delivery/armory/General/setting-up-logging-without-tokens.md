---
title: Setting up Logging without Tokens
---

## Introduction
In some environments, customers may find that they want to set up logging without Tokens or Security.  If Tokens are not available, Logging can still be set up, although it is not recommended in generally due to possible security risks.

## Prerequisites
Customers should look to set up the logging endpoint with the following additional instructions
[https://docs.armory.io/armory-enterprise/armory-admin/observe/integrations-logging/](https://docs.armory.io/armory-enterprise/armory-admin/observe/integrations-logging/)

## Instructions
Customers looking to set up logging can remove the need for a token in the definition as per the following example.  Once again, it is not recommended due to general security best practices.
````
spec:
  spinnakerConfig:
    profiles:
      echo: 
        rest:
          enabled: true
          endpoints:
          - wrap: true
            url: ":/services/collector/event?"
            template: '{"event":{{event}} }'
          insecure: true
````