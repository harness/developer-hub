---
title: Capacity Provider Concepts
---


#### Capacity provider concepts and setup
[Capacity providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html#capacity-providers-concepts) define the kinds of capacity available to an ECS cluster, and the [capacity provider strategy](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CreateService.html#ECS-CreateService-request-capacityProviderStrategy) of the service determines how its tasks are spread across this capacity.
* Info on how to [set up an ECS cluster with FARGATE & FARGATE_SPOT](https://aws.amazon.com/blogs/aws/aws-fargate-spot-now-generally-available/) capacity providers.* Use the [DescribeClusters API](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DescribeClusters.html#API_DescribeClusters_RequestSyntax) to determine which capacity providers are available on a given cluster.
#### Relevant code in Spinnaker
At a high level, supporting capacity providers will involve:
* caching the providers available for each cluster within Clouddriver* Exposing capacity providers for a given cluster(s) via Gateretrieving them from Deck, and allowing the user to configure a capacity provider strategy with them for a given server group
* NOTE: An ECS service can't be created with both a capacity provider strategy *and* a launch type. Spinnaker should validate these settings are valid prior to creating the server group.
* providing those setting to ECS when deploying a new service
Similar ECS provider changes were made to implement Service Discovery:
* [spinnaker/clouddriver#3604](https://github.com/spinnaker/clouddriver/pull/3604)* [spinnaker/gate#786](https://github.com/spinnaker/gate/pull/786)* [spinnaker/deck#6899](https://github.com/spinnaker/deck/pull/6899)
#### Capacity Provider Strategies have been added to 2.24

