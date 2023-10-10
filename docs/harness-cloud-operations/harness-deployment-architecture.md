title: Harness Deployment Architecture
description: Deployment Architecture of our platform

We will primarily focus on Harness deployment architecture and dataflow in this blog post. The subsequent blog posts would focus on the deployment process and incident management, and alerting.

The below picture captures the deployment architecture for our core product. We have the primary Kubernetes cluster running in GKE in the us-west1 region spread across multiple zones. We also have the identical passive failover cluster in the us-west2 region. The Atlas Managed Mongo database running in us-west1 with DR setup in us-west2 serves as the primary backend for our product. We use GCP Memorystore Redis as well as Enterprise Redis for caching and GCP Datastore for storing activity logs as well as TimescaleDB for our custom dashboards and continuous efficiency use cases.

import harness_deployment_architecture from ./static/deployment_architecture.png
<img src={harness_deployment_architecture} alt="Harness Deployment Architecture"/>
