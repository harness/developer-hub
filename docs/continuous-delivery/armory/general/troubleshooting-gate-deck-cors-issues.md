---
title: Troubleshooting Gate/Deck CORS Issues
---

## Introduction
If you’re trying to hook up Spinnaker Gate and Deck and using different hostnames/domains for Gate and Deck, and you’re experiencing CORS issues (where Gate is refusing connections from Deck), you may need to modify Gate to support CORS from your Deck FQDN.


## Prerequisites
N/A

## Instructions
For example, if you’re using ```[gate.domain.com](http://gate.domain.com/)``` for your Gate, and ```[spinnaker.domain.com](http://spinnaker.domain.com/)``` for your Deck, then go into your halconfig, ```.hal/config```, into the relevant security section of your Halyard deployment configuration, and add the ```corsAccessPattern``` field, like this:
deploymentConfigurations:
- name: default
...  ...
  security:
    apiSecurity:
      ssl:
        enabled: false
      overrideBaseUrl: https://gate.domain.com
      corsAccessPattern: https://spinnaker.domain.com
    uiSecurity:
      ssl:
        enabled: false
      overrideBaseUrl: https://spinnaker.domain.com

