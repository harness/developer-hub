---
title: Restrict Application Creation
---

## Introduction
Before version 2.17, there was no way to prevent application creation in Spinnaker. In Armory Spinnaker 2.17 and later, Fiat can now control application creation through the use of a new permission option: ```CREATE```.
**Note**: When configuring permissions, you must explicitly configure permissions for each user role. The default for a user role is no permissions, which means it cannot perform any actions.
This document assumes that you have enabled and configured Fiat.
**This was tested on version 2.17 and may change in later versions.**

## Prerequisites
Fiat Needs to be Enabled

## Instructions
Fiat is the authorization (authz) microservice of Spinnaker, which looks for the permissions from different sources. In 2.17, a new sources were added, providing more flexibility for applying permissions. This page focuses on the ```prefix``` source to control permissions for any applications whose name starts with a given prefix. To use this functionality, you need to enable Fiat to use the new sources and set prefixes as one of the sources. ```auth.permissions.source.application.prefix```. 
Perform the following steps:
* In ```fiat-local.yml```, set the value for ```auth.permissions.provider.application``` parameter to ```aggregate```.Add prefixes as a source:

````````````
 auth.permissions.source.application.prefix:
   enabled: true
````````````

Define the permissions for a prefix:
 - prefix: 
   permissions:
    READ:
    - ""
    - ""
    - ""
    WRITE:
    - ""
    EXECUTE:
    - "user role n>"​
The below example does the following:

* Enables Fiat to read from the new sources.* Sets ```prefix``` as one of these new sources.* Defines the prefix ```apptest-x```.Defines permissions for all applications that match the prefix ```apptest-*``` based on roles:
* Add READ, WRITE and EXECUTE permissions to ```role-one```.* Add READ permissions to ```role-two```.



In the Halyard Profiles folder, in the``` fiat-local.yml``` file add to or create the file if it doesn't exist:
 auth.permissions.provider.application: aggregate
 auth.permissions.source.application.prefix:
   enabled: true
   prefixes:
    - prefix: "apptest-*"
      permissions:
        READ:
        - "role-one"
        - "role-two"
        WRITE:
        - "role-one"
        EXECUTE:
        - "role-one"
  ``````


As a result, any application that matches the prefix ```apptest-*``` with ```role-two``` are read-only.
To restrict application creation specifically, add ```fiat.restrictApplicationCreation``` and set it to ```true```:
**Note: Currently, the prefix source is the only source that support the CREATE permission.**In the Halyard Profiles folder, in the``` fiat-local.yml``` file:
 fiat.restrictApplicationCreation: true
 auth.permissions.provider.application: aggregate
 auth.permissions.source.application.prefix:
   enabled: true
   prefixes:
    - prefix: "*"
      permissions:
        CREATE:
        - "role-one"
        READ:
        - "role-one"
        - "role-two"
        WRITE:
        - "role-one"
        EXECUTE:
        - "role-one"

The above example assigns CREATE permission to users with the ```role-one``` role. Users without the ```role-one``` role cannot create any applications in Spinnaker because only ```role-one``` has CREATE permission.
* Finally, apply your configuration changes to Spinnaker by running the following command: ```hal deploy apply```.

