---
title: Accessing the Spinnaker REST API using HTTPie and jq
---

## Introduction
This article advises about how to use ```HTTPie``` to access the ```Spinnaker REST API```. It provides guidelines about using the Spinnaker API programmatically.

## Prerequisites
The ```Spinnaker REST API``` can be accessed using ```HTTPie```. The results can be filtered and formatted by ```jq```.The following are the prerequisites for accessing the Spinnaker API in this KB:
* The Spinnaker API (Gate) URL.* Download and install of HTTPie: [https://httpie.io/](https://httpie.io/) and jq: [https://stedolan.github.io/jq/download/](https://stedolan.github.io/jq/download/)
**Note: **For long term use, consider the use of ```x509 certificates``` for Spinnaker to make the calls. For development cases, a session cookie after logging in to Spinnaker can be used to test the ```REST API``` call.
In the examples below, a session cookie will be used.

## Instructions
## Attain a session cookie
* Log on to the ```Deck GUI```.
* Open the **Developer Tools** of your browser.
* Go to the **Network** tab -> find the call to **user** on the left tab.
* Look for the **Request Headers** and the **cookie** parameter. This cookie will need to be set when making API calls.
* Note that this cookie does expire after some time and is not permanent.
## Using the Spinnaker REST API
In the following examples we have set the parameters as follows:
**Gate URL**
GATE=http://x.x.x.x

# Spinnaker Gate Session Cookie, below is just an example.
SPINCOOK='Cookie:SESSION=YjdhNDg3NmQtZjE5Zi00xxxxxxxxxx'  

# Spinnaker pipeline ID, below is just an example.
PIPEID='01EWXEEZTZPX09FE86XA7S75BA'

# Spinnaker Application Name
APP=spintest

# Create httpie session named test. Then use the session name for all the following calls. 
# Setting verify to no will skip host SSL certificate verification.
# This setting should only be used if GATE is using a self-signed certificate.
# This will eliminate having to pass the cookie which gets tricky
eval http --verify=no --session=test $GATE/applications "'"$SPINCOOK"'"

# create/update applications and projects (see example below for min-app-create.json)
eval http --verify=no --session=test POST $GATE/tasks 

The following is an example of ```min-app-create.json``` file which will create an application ```app1``` with minimal configuration and can be used as a test.
```
 {
   "job": [
       {
           "type": "createApplication",
           "application": {
               "cloudProviders": "kubernetes",
               "instancePort": 80,
               "providerSettings": {
                   "aws": {
                       "useAmiBlockDeviceMappings": false
                   }
               },
               "name": "app1",
               "email": "app@example.com",
               "permissions": {
                   "READ": [
                       "superadmins",
                       "qa"
                   ],
                   "EXECUTE": [
                       "superadmins"
                   ],
                   "WRITE": [
                       "superadmins"
                   ]
               }
           },
           "user": "test_user"
       }
   ],
   "application": "app1",
   "description": "Create Application: app1"
}
```
For more information on the Spinnaker API please refer to: [https://spinnaker.io/reference/api](https://spinnaker.io/reference/api) and [https://docs.armory.io/docs/spinnaker-user-guides/writing-scripts/](https://docs.armory.io/docs/spinnaker-user-guides/writing-scripts/).

