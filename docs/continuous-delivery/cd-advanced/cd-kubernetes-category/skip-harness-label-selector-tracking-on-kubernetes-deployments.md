---
title: Skip Harness Label Selector Tracking on Kubernetes Deployments
description: Prevent Harness from using its default Kubernetes label selector harness.io/track --  stable during canary deployments.
sidebar_position: 9
---

You can prevent Harness from using its default Kubernetes label selector `harness.io/track: stable` during canary deployments. Skipping this label can help when you have existing non-Harness deployed services or conflicts in naming. Currently, this feature is behind the feature flag `SKIP_ADDING_TRACK_LABEL_SELECTOR_IN_ROLLING`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 

### Review: Labels in Harness Kubernetes canary phases

Default Harness Kubernetes canary deployments are a two phase process that relies on deployment object labels for tracking. 

1. **Canary Phase:**
	1. Harness creates a canary version of the Kubernetes deployment object defined in your service definition **Manifests** section.
	2. All pods in the canary phase have the label `harness.io/track: canary`. Traffic could be routed to these pods using this label.
	3. Once that deployment is verified, the canary delete step deletes it by default.    
	Using this method, Harness provides a canary group as a way to test the new build, run your verification, and then roll out to the following primary group.
2. **Primary Phase:**
	1. Runs the actual deployment using a Kubernetes rolling update with the number of pods you specify in the **Manifests** files. For example, `replicas: 3`.
	2. All pods in the primary phase have the label `harness.io/track: stable`.

### Review: Invalid value LabelSelector

Kubernetes labels are immutable. If a specific deployment object already exists in the cluster, you cannot change its labels.

If the deployment object already exists before the Harness deployment, it might conflict with the default Harness Kubernetes canary deployment due to the use of the label `harness.io/track`.

If you are deploying different Harness deployment objects to the same cluster, you might encounter a selector error.


```
The Deployment “harness-example-deployment” is invalid: spec.selector:   
  Invalid value: v1.LabelSelector{MatchLabels:map[string]string{“app”:“harness-example”},   
  MatchExpressions:[]v1.LabelSelectorRequirement{}}: field is immutable
```

Most often, you can delete or rename the deployment object. In some case, you will experience downtime when the object restarts. 

As an alternative, you can force Harness to skip the `harness.io/track: stable` label in the canary deployment.

### Skipping the tracking label

Once the relevant feature flag is enabled, a Harness Kubernetes canary deployment works like this:

* If the deployment object already exists in the cluster without the `harness.io/track: stable`, Harness will not add the `harness.io/track: stable` label to the deployment object.
* If the deployment object already exists with the `harness.io/track: stable` label, Harness will not delete it.
* For any new deployment object, Harness will not add the `harness.io/track: stable` label.
