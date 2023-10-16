---
title: Harness Deployment Architecture
description: Deployment Architecture of Harness platform
sidebar_label: Harness Deployment Architecture
---

We will primarily focus on Harness deployment architecture and dataflow in this blog post. 

The below picture captures the deployment architecture for our core platform. We have the primary Kubernetes cluster running in GKE in the us-west1 region spread across multiple zones. We also have the identical passive failover cluster in the us-west2 region. The Atlas Managed Mongo database running in us-west1 with DR setup in us-west2 serves as the primary backend for our product. We use GCP Memorystore Redis as well as Enterprise Redis for caching and GCP Datastore for storing activity logs as well as TimescaleDB for our custom dashboards and continuous efficiency use cases.

![deployment_architecture](https://github.com/suryabhagvat/developer-hub/assets/60754301/48065dde-c008-422b-b3b9-1053c86460a7)

The core components that make up the Harness CD product are Harness Cloud and Harness Delegates. Users sign up and download delegate manifest from Harness Cloud (web UI) and install it in their local environment. Once Harness Delegate is installed and granted proper privileges, it will talk to Harness Cloud to retrieve tasks and perform them in the local environment.

All Harness services are deployed in GCP. Services are deployed in Kubernetes Cluster, under the control of Ingress Controllers. Ingress Controllers handles all TSL terminations and make up different backends based on the service types and managed by Google Cloud Load Balancing (GCLB). For example, the “Nginx Ingress Controller” shown in the diagram indicates the primary Harness service backends, while the “Admin Ingress Controller” indicates the internal admin tool’s backend. Atlas Mongo serves as the database for corresponding Harness services via VPC peering. Harness also uses CDN from GCS Multi-Region Buckets to distribute delegate jars and client tools.

The failover site in us-west2 serves as the mechanism for us to do a traffic shift if GCP has some issues specific to their managed services in a zone or the region. Failover Cluster shown in the diagram is a dedicated Kubernetes cluster which usually runs at 0 pods for all services. In the case of a service outage in GCP in us-west1 or one of its zones, we can scale up the pods running in us-west2, and the traffic can be flipped over to us-west2 in around 20–25 minutes. We currently make use of Terraform to do the traffic shift.

One thing to note here is that whether we are running in us-west1 or us-west2, we still connect to the Mongo in the us-west1 region. There is an additional overhead and latency when the application running in us-west2 connects to Mongo and Timescale in us-west1. The Mongo database in us-west2 serves for a Disaster recovery kind of scenario, where the entire region has issues. In this case, we can flip both the application and the database to us-west2. The production operations team exercises flipping traffic for the product once or twice in a quarter and for the Mongo database once every six months.

One final thing to mention is we have our customer accounts spread across three different logically separated namespaces (which are also physically separated in different node pools) within our primary Kubernetes cluster, and each is having its own database instance. We have Prod-1, where most of our customer accounts reside, Prod-2, where we have both our paying and trial customers, and finally, Prod-3, where we have different timelines for our daily deployment process. From a Production operations point of view, it’s all production for us; our committed uptime is the same for all of our customers in these namespaces.
