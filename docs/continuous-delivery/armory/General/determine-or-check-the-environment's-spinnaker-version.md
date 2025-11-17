---
title: Determine or Check the Environment's Spinnaker Version
---


### Question:
How to find out the version of Spinnaker that the environment is running at? 
Answer:
Besides checking the deployment configuration in Halyard or Operator, it is also possible to just check from either Gate, or the Spinnaker console.  
When running on AWS go to the Gate endpoint, (e.g. ```https://spinnaker.armory.io:8084```) and head to the ```/armory/versions``` subdirectory (e.g. ```https://spinnaker.armory.io:8084/armory/versions```)
It can also be determined via the Spinnaker environment console.  Navigate to your Deck endpoint, and it can be verified by clicking on the upper right corner ```Help``` icon and then viewing the version shown, as per the example below:

