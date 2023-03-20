---
title: Kubernetes Execution Plane
sidebar_position: 1
---
Harness execution plane for Kubernetes includes the Kubernetes chaos infrastructure components such as:
1. **Workflow controller**: The Argo Workflow Controller responsible for the creation of the chaos experiment.
2. **Chaos operator**: Chaos operator executes the individual faults in an experiment. It leverages the Kubernetes operator pattern to interpret the fault configuration, execute the fault and its probes (if defined), and populate its result post the execution.
3. **Subscriber:** Serves as the link between the **execution plane** and the **control plane**. Its responsibilities include performing a health check on all the components in the chaos execution plane, creating a chaos experiment CR from a chaos experiment template, watching for chaos experiment events during its execution, and sending the chaos experiment result to the control plane.
4. **Chaos exporter:** An optional component that facilitates external observability in HCE. This is achieved by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus database for processing and analysis.
5. **Event tracker:** An optional component capable of triggering an automated chaos experiment based on a set of conditions defined for any given resource in the cluster. It manages EventTrackerPolicy CR, which is a set of conditions validated by the event tracker. If the current state of the tracked resources matches the state defined in the EventTrackerPolicy CR, the chaos experiment is triggered. This feature can only be used if GitOps is enabled.
