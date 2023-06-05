---
title: Kubernetes Execution Plane
sidebar_position: 3
---
Harness execution plane for Kubernetes includes the Kubernetes chaos infrastructure components. These components are described below.
1. **Workflow controller**: The Argo Workflow Controller responsible for creating the chaos experiment.
2. **Chaos operator**: Leverages the Kubernetes operator pattern to interpret the fault configuration, execute the individual faults in an experiment, execute the fault and its probes (if they have been defined), and populate the result after the execution.
3. **Subscriber:** Serves as the link between the **execution plane** and the **control plane**. Its responsibilities include performing a health check on all the components in the chaos execution plane, creating a chaos experiment CR from a chaos experiment template, monitoring the events associated with the chaos experiment during its execution, and sending the chaos experiment results to the control plane.
4. **Chaos exporter:** Optional component that facilitates external observability in CE. This is achieved by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus database for processing and analysis.
5. **Event tracker:** Optional component capable of triggering an automated chaos experiment based on a set of conditions defined for any given resource in the cluster. It manages EventTrackerPolicy CR, which is a set of conditions validated by the event tracker. If the current state of the tracked resources matches the state defined in the EventTrackerPolicy CR, the chaos experiment is triggered. This feature can only be used if GitOps is enabled.