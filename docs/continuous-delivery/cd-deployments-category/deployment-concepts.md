---
title: Deployment Concepts and Strategies
description: This topic describes common deployment strategies.
sidebar_position: 1
helpdocs_topic_id: 0zsf97lo3c
helpdocs_category_id: etz0u5kujd
helpdocs_is_private: false
helpdocs_is_published: true
---

You have likely heard terms like *blue/green* and *canary* when it comes to deploying code and applications into production. These are common deployment strategies, available in Harness CD as stage strategies, along with others.

This topic will explain these strategies to give you an idea of how to approach deployments in Harness, and to help you decide what strategy is best for you.

## Rolling Deployment

With a Rolling Deployment, all nodes within a single environment are incrementally added one-by-one or in N batches (as defined by a window size) with a new service/artifact version.

![](./static/deployment-concepts-00.png)

### When to use Rolling Deployments

* When you need to support both new and old deployments.
* Load balancing scenarios that require reduced downtime.

One use of Rolling deployments is as the stage following a Canary deployment in a deployment pipeline. For example, in the first stage you can perform a Canary deployment to a QA environment and verify each group of nodes and, once successful, you perform a Rolling to production.

#### Pros

* Simple, relatively simple to rollback, less risk than Basic deployment.
* Gradual app rollout with increasing traffic.

#### Cons

* Verification gates between nodes difficult and slow.
* App/DB needs to support both new and old artifacts. Manual checks/verification at each increment could take a long time.
* Lost transactions and logged-off users are also something to take into consideration.

![](https://harnessio.wpengine.com/wp-content/uploads/2018/02/Rolling2.png)

See [Create a Kubernetes Rolling Deployment](../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md).

## Blue/Green Deployment

With Blue/Green Deployment, two identical environments for staging and production traffic run simultaneously with different versions of the service.

QA and UAT are typically done on the stage environment. When satisfied, traffic is flipped (via a load balancer) from the prod environment (current version) to the stage environment (new version).

You can then decommission the old environment once deployment is successful.

Some vendors call this a red/black deployment.

![](./static/deployment-concepts-01.png)

### When to use Blue/Green Deployments

* When you want to perform verification in a full production environment.
* When you want zero downtime.

#### Pros

* Simple, fast, well understood, and easy to implement: the switch is almost instantaneous.
* Less risk relative to other deployment strategies.
* Rapid rollback (flip traffic back to old environment)

#### Cons

* Replicating a production environment can be complex and expensive (i.e. microservice downstream dependencies).
* QA/UAT test coverage may not identify all anomalies & regressions in blue environment.
* An outage or SPOF could have wide-scale business impact before rollback kicks in.
* Current transactions and sessions will be lost due to the physical switch from one machine serving the traffic to another one.
* Database compatibility (schema changes, backward compatibility).

![](https://harnessio.wpengine.com/wp-content/uploads/2018/02/BlueGreen2.png)

See:

* [Create a Kubernetes Blue Green Deployment](../cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md)

## Canary Deployment

With Canary Deployment, all nodes in a single environment are incrementally updated in small phases, with each phase requiring a verification/gate to proceed to the next phase.

![](./static/deployment-concepts-02.png)

### When to use Canary Deployments

When you want to verify whether the new version of the application is working correctly in your production environment.

This is currently the most common way to deploy apps/services into production.

#### Pros

* Deploy in small phases (e.g. 2%, 10%, 25%, 50,%, 75%, 100%).
* Lowest risk relative to all other deployment strategies (reduce business exposure).
* Test in production with real users & use cases.
* Run & compare two service versions side-by-side.
* Cheaper than blue/green, because there is no need to have two production environments.
* Fast and safe rollback.

#### Cons

* Scripting canary deployments can be complex (Harness automates this process).
* Manual verification can take time (Harness automates this process with Continuous Verification).
* Required monitoring and instrumentation for testing in production (APM, Log, Infra, End User, etc).
* Database compatibility (schema changes, backward compatibility).

![](https://harnessio.wpengine.com/wp-content/uploads/2018/02/Canary2.png)

For Kubernetes, Harness does this a little different.

In Phase 1 we do a canary to the same group but we leave the production version alone. We just use other instances. Then we delete our canary version in Phase 1.

In Phase 2 we do a rolling deployment with the production version and scale down the older version.

![](./static/deployment-concepts-03.png)

See:

* [Create a Kubernetes Canary Deployment](../cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment.md)

## Which Deployment Strategy Should I Use?

It depends entirely on the type of application/service and environment. Most Harness customers are currently using blue/green or canary deployments for mission-critical applications.

In many cases, customers are migrating from blue/green to canary so they can test in production with minimal business impact.

You can also combine many of the above deployment strategies into a single strategy.

## Next Steps

* Harness [Quickstarts](../../getting-started/quickstarts.md).

