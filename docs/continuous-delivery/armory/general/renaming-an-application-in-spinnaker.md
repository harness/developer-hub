---
title: Renaming An Application in Spinnaker
---


Question:
Can I Rename An Application in Spinnaker?
Answer:
No, and yes. Can you, yes. Should you, no. The preferred approach is to create a new application and copy and paste your pipelines over from the other application.
A primary reason of why not to rename the application is because Spinnaker names resources based on your application name. For example if you have a deployment stage, it will deploy the resources based on the application name. If you change the application name, there is a chance you could orphan those resources.

