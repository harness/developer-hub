---
title: How to utilize Canary analysis in other Appications within Spinnaker
---

## Introduction
Canary is a deployment strategy in which a change is partially rolled out, then evaluated against the current deployment (baseline) according to a set guideline.  The strategy administrators determine the guidelines that follow a pass/fail response.
Canary deployments are used to ensure that the new deployment is within the guidelines at a point in time of the deployment.  This check determines if the rest of the deployment can continue.  This evaluation uses key metrics chosen when the Canary deployment was configured.
For more information about setting up Canary analysis, please visit our Armory Docs page:
[https://docs.armory.io/armory-enterprise/spinnaker-user-guides/canary/kayenta-canary-use/](https://docs.armory.io/armory-enterprise/spinnaker-user-guides/canary/kayenta-canary-use/)
However, there may come a time when the Canary Analysis results will be used in other applications in the environment.

## Prerequisites
Canary analysis and the Kayenta service will need to be enabled in the Spinnaker environment. 
The steps to enable it can be found here:
[https://docs.armory.io/armory-enterprise/spinnaker-user-guides/canary/kayenta-canary-use/](https://docs.armory.io/armory-enterprise/spinnaker-user-guides/canary/kayenta-canary-use/))
 
 

## Instructions
```App A```'s Canary config will need to be utilized within ```App B```'s canary analysis results. 

### Enable Canary in App B
(Please note that this may already be available in the Spinnaker application)
* Login to Spinnaker
* Navigate to ```Applications``` then select ```App B```
* Navigate to ```Config``` on the left pane of the Spinnaker application then, select ```Features```
* Check ```Canary``` then save changes
* On the left pane of the Spinnaker application the ```Canary configs``` will now be available to ```App B```

#### Utilize the Canary Config from App A in a pipeline for App B 
* Navigate to a pipeline that needs to utilize the ```Canary config``` created in ```App A```
* Select ```Configure``` the select ```Add stage```
* In the ```Type``` option, choose ```Canary analysis```
* A configuration section named ```Canary Analysis Configuration``` will be a part of the configuration of the stage.  In the ```Config name```, use the drop-down to select the Canary config created in App A. 

Please note that while App B can now utilize the application, it will not be able to edit the Canary Config, unless the below changes are made to provide permissions to allow the application to make the edit.
 
#### Allow App B to edit the config from App A

### Steps 
* Login into the Spinnaker account* Navigate to ```Applications``` then select ```App A```
* Navigate to ```Canary configs``` then select the ```Canary config``` that ```App B``` will utilize 
* Select ```JSON``` and then ```edit```
* Navigate to the ```Applications``` section in the **JSON** file and add ```App B``` to the listed ```Applications```.
Now ```App B``` will be able to edit the Canary config file created in ```App A```

