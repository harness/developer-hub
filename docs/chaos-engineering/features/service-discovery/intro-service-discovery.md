---
title: Introduction
sidebar_position: 1
description: An introduction to service discovery and its significance
---

This section introduces you to **service discovery** for **Kubernetes infrastructure**, its significance and its purpose.

### What is a discovered service?
An entity in the Harness platform/control plane that corresponds to a Kubernetes service on the users' cluster. The discovered service object definition consists of child attributes including details of the workload resource powering the service as well as the details of connections made from/to it.

### Why is service disocvery required?

Large enterprises deal with hundreds of deployed services. Monitoring these services or incorporating chaos engineering on these services would require building a database of these services and the relationship between these services, which is time consuming. This is where service discovery comes into picture: Instead of building a database with the services, **automatically discover services** and the relationship between them.

### How does HCE discover services?
HCE performs the following steps to discover services in your cluster:
1. Scan your Kubernetes cluster periodically (you can define the interval or ad-hoc).
2. Build a common database of services that describes the relationship between the services.
3. Provide APIs to group the discovered services into a map, wherein the map represents a topological view of an application.

### How does HCE leverage discovered services?
HCE tests the resilience of the application, and HCE uses the discovered services to:

- Identify the various available services in the chaos module, that is, the chaos targets in the Kubernetes cluster which could have been deployed by Harness or by other means.
- Record the resources backing the above services (logical resources such as deployment, pods, containers, processes, FQDNs, ports as well as physical resources such as nodes, storage etc.)
- Highlight the position of a given service and its respective lineage within the topology view.

As a HCE user, service discovery simplifies your decision making around:

- Which service to target?
- Which chaos faults to inject on a target service?
- What validations and health checks to perform while executing chaos faults?

As a consequence, you will find the resilience of your service (with the help of resilience coverage reports, service-level resilience scores and other such metrics).


### Advantages
Reduces overhead of creating a database with services
User-friendly
Increased adoption



## Next steps

- [Create discovery agent](/docs/chaos-engineering/features/service-discovery/service-discovery-usage#customize-discovery-agent)
- [Edit discovery agent](/docs/chaos-engineering/features/service-discovery/service-discovery-usage#edit-discovery-agent)
- [Delete discovery agent](/docs/chaos-engineering/features/service-discovery/service-discovery-usage#delete-discovery-agent)