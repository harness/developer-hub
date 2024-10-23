---
title: Define Application attributes using Dinghy
---

## Introduction
Uses may want to define the application attributes as a part of their Dinghy process.  


## Prerequisites
Some attributes can only be defined if available.  For example, if the cloud provider doesn't exist, it cannot be defined otherwise an error may occur.  Likewise, for Permissions, customers must [follow group definitions defined and created in FIAT](https://docs.armory.io/armory-enterprise/armory-admin/fiat-create-permissions/).  Please note that these need to be created before adding as an attribute, or an error will occur.
It is recommended that customers use the Spinnaker Console UI to guide themselves on their available options and then to define based on what can be chosen through the UI.

## Instructions
Below is a sample of Application Attributes available
````
{
  "name": "AppExample-APP",
  "description": null,
  "email": "",
  "aliases": "",
  "repoType": "",
  "cloudProviders": [],
  "platformHealthOnly": "",
  "platformHealthOnlyShowOverride": "",
  "trafficGuards": [],
  "instancePort": "",
  "enableRestartRunningExecutions": "",
  "enableRerunActiveExecutions": "",
  "permissions": {
    "READ": [
    ],
    "WRITE": [
    ],
    "EXECUTE": [
    ]
  }
}
````
Customers can then define some of these attributes in the following method:
````
{
    "name": "AppExample-APP",
    "description": null,
    "email": "test@abc.com",
    "aliases": "",
    "repoType": "",
    "cloudProviders": [],
    "platformHealthOnly": "false",
    "platformHealthOnlyShowOverride": "false",
    "trafficGuards": [],
    "instancePort": "443",
    "enableRestartRunningExecutions": "false",
    "enableRerunActiveExecutions": "false",
    "permissions": {
      "READ": [
        "armory-devs",
        "armory-eng",
        "testexample2@armory.io",
        "testexample@armory.io"
      ],
      "WRITE": [
        "armory-eng",
        "testexample@armory.io"
      ],
      "EXECUTE": [
        "armory-eng",
        "testexample@armory.io"
      ]
    }
  }
````
