---
title: Add ingress controller annotations
description: In Harness Self-Managed Enterprise Edition Kubernetes Cluster, you can annotate the Ingress controller to customize its behavior.
# sidebar_position: 2
helpdocs_topic_id: zbqas64zn8
helpdocs_category_id: vu99714ib1
helpdocs_is_private: false
helpdocs_is_published: true
---

You can customize the behavior of the Nginx ingress controller with annotations. This topic explains how to use the KOTS admin tool to configure the ingress controller with annotations.

### Step 1: Open Advanced Configurations

In the KOTS admin tool, click **Config**.

![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-00.png)

Click **Advanced Configurations**.

![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-01.png)

Click **Advanced Configurations**.

![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-02.png)

Scroll down to **Nginx Ingress Controller Service Annotations**.

![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-03.png)

### Step 2: Annotate the ingress controller

Locate the **Nginx Ingress Controller Service Annotations** section**.** Type your annotations into the text area. For more information, see [NGINX Ingress Controller Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/) and [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) in Kubernetes.io.

Click **Save Config**.

### Step 3: Deploy

Click **Version History** in the top nav.

Click **Deploy** to update the ingress controller.

