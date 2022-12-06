---
title: Select Kubernetes Namespaces based on InfraMapping
description: Set up a single Harness Kubernetes Service to be used with multiple namespaces.
sidebar_position: 200
helpdocs_topic_id: 5xm4z4q3d8
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

Hardcoding the namespaces in Harness Service manifests forces you to have separate Services for each namespace.

Instead of setting namespaces in the manifests in a Harness Service, you can use a Harness variable expression to reference Kubernetes namespaces in Harness Infrastructure Definitions. When a Workflow is run, the namespace in the Infrastructure Definition is applied to all manifests in the Service.

This allows you to set up a *single* Harness Kubernetes Service to be used with multiple namespaces.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Add the Namespace Expression](#step_1_add_the_namespace_expression)
* [Step 2: Enter the Namespace in the Infrastructure Definition](#step_2_enter_the_namespace_in_the_infrastructure_definition)
* [Next Steps](#next_steps)

### Before You Begin

* [Define Kubernetes Manifests](define-kubernetes-manifests.md)
* [Create Kubernetes Namespaces based on InfraMapping](create-kubernetes-namespaces-based-on-infra-mapping.md)

### Step 1: Add the Namespace Expression

1. In your Harness Kubernetes Service, click **values.yaml**.
2. In the `namespace` key, use the variable expression `${infra.kubernetes.namespace}`:


```
namespace: ${infra.kubernetes.namespace}
```
In a manifest file for the Kubernetes Namespace object, use the namespace value like this:


```
apiVersion: v1  
kind: Namespace  
metadata:  
  name: {{.Values.namespace}}
```
If you omit the `namespace` key and value from a manifest in your Service, Harness automatically uses the namespace you entered in the Harness Environment [Infrastructure Definition](https://docs.harness.io/article/n39w05njjv-environment-configuration#add_an_infrastructure_definition) settings **Namespace** field.The Harness variable `${infra.kubernetes.namespace}` refers to the namespace entered in the Harness Environment Infrastructure Definition settings **Namespace** field.

![](./static/create-kubernetes-namespaces-based-on-infra-mapping-27.png)

### Step 2: Enter the Namespace in the Infrastructure Definition

1. In each Infrastructure Definition **Namespace** setting, enter the namespace you want to use.

When the Service using `${infra.kubernetes.namespace}` is deployed, Harness will replace `${infra.kubernetes.namespace}` with the value entered in the Infrastructure Definition **Namespace** setting, creating a Kubernetes Namespace object using the name.

Next, Harness will deploy the other Kubernetes objects to that namespace.

### Next Steps

* [Create Kubernetes Namespaces with Workflow Variables](create-kubernetes-namespaces-with-workflow-variables.md)

