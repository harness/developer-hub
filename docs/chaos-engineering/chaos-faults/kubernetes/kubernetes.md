---
id: kubernetes
title: Chaos Faults for Kubernetes (31)
---

Kubernetes faults disrupt the resources running on a Kubernetes cluster. They can be categorized into Pod-level faults and Node-level faults.

<!-- Custom component -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";

## Faults Introduction

Learn intelligent software delivery skills with step-by-step tutorials, interactive labs, videos and reference docs.

### Uses

```mdx-code-block
<FaultDetailsCard icon="/img/chaosfaults/k8s.svg">
```

### Pod Delete

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

```mdx-code-block
<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>
<accordion>
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>
```

```mdx-code-block
</FaultDetailsCard>
```
