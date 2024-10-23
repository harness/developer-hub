---
title: Shared Configuration Repository
---


Question:
How do you use the same or multiple Spinnaker installations to deploy to multiple AWS accounts while sharing a single configuration repository?
Answer:
Having multiple Spinnaker installations, with multiple AWS accounts, share the same configuration repository is possible. First let’s cover a few things that need to be baselined, after that we can jump over to our docs for more details.
Spinnaker Environment:
This is where Spinnaker (the service) lives. Usually correlated with an appropriate DNS entry. ex: [https://spinnaker.yourcompany.com](https://spinnaker.yourcompany.com/). This is useful for different levels of isolations. There’s multiple methods of isolations you can do: multiple clouds (Kubernetes, AWS), AWS accounts, Kubernetes namespaces, different VPCs, or even just different instances with new datastores.
Deployment Target:
This is where Spinnaker is configured to deploy *to*. This is useful for managing applications across different cloud providers, accounts.
Documentation
With the above understanding jump over to our documentation:[https://docs.armory.io/admin-guides/shared_configuration_repo/](https://docs.armory.io/admin-guides/shared_configuration_repo/)

