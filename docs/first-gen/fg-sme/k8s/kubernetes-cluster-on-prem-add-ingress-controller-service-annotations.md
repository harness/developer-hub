---
title: Add Ingress Controller Annotations
description: In Harness Self-Managed Enterprise Edition - Kubernetes Cluster, you can annotate the Ingress controller to customize its behavior. Annotations are done in the KOTS admin tool's Nginx Ingress Control…
sidebar_position: 30
helpdocs_topic_id: 4602gl9ds3
helpdocs_category_id: 9tb4tsgko5
helpdocs_is_private: false
helpdocs_is_published: true
---

In Harness Self-Managed Enterprise Edition - Kubernetes Cluster, you can annotate the Ingress controller to customize its behavior.

To add annotations, use the Nginx Ingress Controller Service Annotations settings in the KOTS admin tool. 

### Step 1: Open Advanced Configurations

In the KOTS admin tool, click **Config**.

![](./static/kubernetes-cluster-on-prem-add-ingress-controller-service-annotations-23.png)

Click **Advanced Configurations**.

![](./static/kubernetes-cluster-on-prem-add-ingress-controller-service-annotations-24.png)

Click **Advanced Configurations**.

![](./static/kubernetes-cluster-on-prem-add-ingress-controller-service-annotations-25.png)

Scroll down to **Nginx Ingress Controller Service Annotations**.

![](./static/kubernetes-cluster-on-prem-add-ingress-controller-service-annotations-26.png)

### Step 2: Annotate Nginx Ingress Controller Service

In **Nginx Ingress Controller Service Annotations**, enter your annotations. For more information on adding annotations to Kubernetes ingress controllers, see [Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/) in the NGINX documentation, and [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) in the [Kubernetes documentation](https://kubernetes.io/docs/home/).

Click **Save Config**.

### Step 3: Deploy

Click **Version History** in the top nav.

Click **Deploy** for the new version.

