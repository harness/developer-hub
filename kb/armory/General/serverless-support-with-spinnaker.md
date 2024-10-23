---
title: Serverless Support with Spinnaker
---


Question:
Does Spinnaker support Serverless or other FAAS technologies?
Answer:
At the moment Spinnaker doesn’t have any native support for Serverless technologies. If these are a critical part of your deployment workflow you can always utilize Jenkins to do these as part of your application rollout. Since Spinnaker has a native integration with Jenkins, you can create jobs that roll out your Serverless function and trigger them as part of your Pipeline, making them *feel* native. This is one of the many ways to make Spinnaker more extensible. 
**Related Documentation:**[Working with Jenkins](https://docs.armory.io/user-guides/working-with-jenkins/)
Armory is currently exploring what Serverless support might look like within Spinnaker so if you have any ideas or feedback, be sure to let us know at [https://go.armory.io/ideas](https://go.armory.io/ideas).

