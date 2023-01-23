---
title: Chaos Faults for Kubernetes
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

Kubernetes faults disrupt the resources running on a Kubernetes cluster. They can be categorized into pod-level faults and node-level faults.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

## Faults Introduction

Learn intelligent software delivery skills with step-by-step tutorials, interactive labs, videos and reference docs.

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="pod">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Pod memory hog

- Pod memory hog is a Kubernetes pod-level chaos fault that consumes memory resources in excess, resulting in a significant spike in the CPU/resource usage of a pod.
- This fault simulates a condition where the memory usage of an application spikes up unexpectedly.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="pod">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Pod CPU hog

- Pod CPU hog is a Kubernetes pod-level chaos fault that consumes CPU resources in excess, resulting in a significant spike in the CPU usage of a pod.
- This fault simulates a condition where the CPU resource usage of an application spikes up unexpectedly.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="pod">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Pod memory hog exec

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="pod">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Pod CPU hog exec

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="pod">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Pod network latency

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network loss

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod DNS error

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network duplication

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->


<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network corruption

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod DNS spoof

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->


<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod autoscaler

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View the uses of the experiment</summary>
    In the distributed system like kubernetes it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->


<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->