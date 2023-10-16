---
title: Add ingress controller annotations
description: Learn how to annotate the Ingress controller to customize its behavior for on-prem installations.
sidebar_position: 3
helpdocs_topic_id: zbqas64zn8
helpdocs_category_id: vu99714ib1
helpdocs_is_private: false
helpdocs_is_published: true
---

:::info note

This is an End of Life (EOL) notice for the KOTS installation method. This method is in maintenance mode as of May 31, 2023. 

Maintenance mode means the following:

- No new features will be added.
- Security and bug fixes will continue to be made. 

:::

You can customize the behavior of the Nginx Ingress controller with annotations. This topic explains how to use the KOTS admin tool to configure the Ingress controller with annotations.

**To add Ingress controller annotations**

1. In the KOTS admin tool, select **Config**.

    ![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-00.png)

2. Select **Advanced Configurations**.

    ![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-01.png)

3. Select **Advanced Configurations**.

    ![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-02.png)

4. Scroll down to **Nginx Ingress Controller Service Annotations**.

    ![](./static/kubernetes-cluster-self-managed-add-ingress-controller-service-annotations-03.png)

5. Type your annotations into the text area. 

    For more information, go to [NGINX Ingress Controller Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/) and [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) in Kubernetes.io.

6. Select **Save Config**.

7. Select **Version History** in the top nav.

8. Select **Deploy** to update the Ingress controller.

