---
title: FLUSHALL on Spinnaker's Redis Cache
---


Question:
Should I do a Redis ```flushall``` on my Redis database?
Answer:
Before we go into the details, a good rule of thumb is to never use ```flushall``` with Spinnaker. Now let me explain why, and what issues we have seen.
First it’s important to know how Redis plays a role in Spinnaker. Redis has three primary functions:
* As a cache for [Igor](https://github.com/spinnaker/igor)
* As a cache for [Clouddriver](https://github.com/spinnaker/clouddriver)
* As a queue for [Orca](https://github.com/spinnaker/orca)
More Details:
* Igor provides a single point of integration with Jenkins, Travis and Git repositories ( BitBucket, Stash, and Github ) within Spinnaker. Igor keeps track of the credentials for multiple Jenkins and/or Travis hosts and sends events to [echo](https://github.com/spinnaker/echo) whenever build information has changed.
* Orca is the orchestration engine for Spinnaker. It is responsible for taking a pipeline or task definition and managing the stages and tasks, coordinating the other Spinnaker services. Orca pipelines are composed of stages which in turn are composed of tasks. The tasks of a stage share a common context and can publish to a global context shared across the entire pipeline allowing multiple stages to co-ordinate. For example a bake stage publishes details of the image it creates which is then used by a deploy stage. Orca persists a running execution to Redis.
* Many of Spinnakers micros services poll the provider system quite frequently, in order to be less taxing, Clouddriver and Igor will poll the provider for necessary information roughly every 30 seconds and store that information on Redis. This helps reduce the impact Spinnaker has on the provider system.

