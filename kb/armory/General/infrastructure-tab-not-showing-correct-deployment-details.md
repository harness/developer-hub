---
title: Infrastructure Tab not Showing Correct Deployment Details
---

## Issue
In a Spinnaker Application, multiple pipelines have been defined and successfully deployed. In this example, there are two deployments, (e.g, **svc-deployment-one** and **svc-deployment-two**)** **in the EKS cluster via Spinnaker.But under the **"Infrastructure" deployment tab** in the same Application, only **svc-deployment-one** can be seen.  The deployment **svc-deployment-two** does not show up in the tab. **svc-deployment-two** deployment was created in a separate Application from the original deployment. 

## Cause
Resource relationships (for example between applications and clusters) are managed using **Kubernetes Annotations**, and Spinnaker manages these using its [**Moniker library**](https://github.com/spinnaker/moniker)**;** a Frigga replacement aimed at making naming strategies within Spinnaker more flexible. Under the Moniker settings, it specifies the resource associated with a particular application or cluster, as explained in the Spinnaker doc: [https://spinnaker.io/reference/providers/kubernetes-v2/#moniker](https://spinnaker.io/reference/providers/kubernetes-v2/#moniker)

