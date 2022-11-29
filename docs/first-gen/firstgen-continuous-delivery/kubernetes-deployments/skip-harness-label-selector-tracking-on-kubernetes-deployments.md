---
title: Skip Harness Label Selector Tracking on Kubernetes Deployments
description: Prevent Harness from using its default Kubernetes label selector harness.io/track --  stable during Canary deployments.
sidebar_position: 410 
helpdocs_topic_id: nce6e8s725
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the feature flag `SKIP_ADDING_TRACK_LABEL_SELECTOR_IN_ROLLING`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.You can prevent Harness from using its default Kubernetes label selector `harness.io/track: stable` during Canary deployments. Skipping this label can help when you have existing non-Harness deployed services or conflicts in naming.

### Review: Labels in Harness Kubernetes Canary Phases

Default Harness Kubernetes Canary deployments are a two phase process that relies on Deployment object labels for tracking. 

First, let's review the two phase Canary deployment:

1. **Canary Phase:**
	1. Harness creates a Canary version of the Kubernetes Deployment object defined in your Service Definition **Manifests** section.
	2. All pods in the Canary Phase have label the `harness.io/track: canary`. Traffic could be routed to these pods using this label.
	3. Once that Deployment is verified, the Canary Delete step deletes it by default.  
	Using this method, Harness provides a Canary group as a way to test the new build, run your verification, and then roll out to the following Primary group.
2. **Primary Phase:**
	1. Runs the actual Deployment using a Kubernetes Rolling Update with the number of pods you specify in the **Manifests** files (for example, `replicas: 3`).
	2. All pods in the Primary Phase have label `harness.io/track: stable`.

### Review: Invalid Value LabelSelector

Kubernetes labels are immutable. If a specific Deployment object already exists in the cluster, you cannot change its labels.

This can cause problems with the default Harness Kubernetes Canary deployments use of `harness.io/track` if the Deployment object already exists before the Harness deployment.

If you are deploying different Harness Deployment objects to the same cluster, you might encounter a Selector error such as this:


```
The Deployment “harness-example-deployment” is invalid: spec.selector:   
  Invalid value: v1.LabelSelector{MatchLabels:map[string]string{“app”:“harness-example”},   
  MatchExpressions:[]v1.LabelSelectorRequirement{}}: field is immutable
```
Most often, you can simply delete or rename the Deployment object. In some case, this can be a problem because you will have downtime when the object is restarted.

As an alternative, you can force Harness to skip the `harness.io/track: stable` label in the Canary deployment.

### Skipping the Tracking Label

Once the relevant feature flag is enabled, a Harness Kubernetes Canary deployment will work like this:

* If the Deployment object already exists in the cluster without the `harness.io/track: stable`, Harness will not add the `harness.io/track: stable` label to the Deployment object.
* If the Deployment object already exists with the `harness.io/track: stable` label, Harness will not delete it.
* For any new Deployment object, Harness will not add the `harness.io/track: stable` label.

 

 

