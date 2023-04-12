---
title: Kubernetes steps timeouts and deadline parameters
description: How Timeouts relate to the Kubernetes deadline parameter.
sidebar_position: 6
helpdocs_topic_id: rsyh1cl5q0
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how Harness Timeout settings relate to the Kubernetes deadline parameter.

Every step in a Harness Kubernetes Deploy stage includes a **Timeout** setting. This setting determines how long Harness attempts to run the step before failing the step and initiating the step or stage [Failure Strategy](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps).

When setting step **Timeout** settings, it's important to know that Kubernetes has an optional deadline parameter that specifies the number of seconds you want Kubernetes to wait for your Deployment to progress before the system reports back that the Deployment has [failed progressing](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#failed-deployment).

The Kubernetes deadline parameter `.spec.progressDeadlineSeconds` is an optional field that performs this function. 

See [Progress Deadline Seconds](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#progress-deadline-seconds) from Kubernetes.

Once the deadline has been exceeded, the Deployment controller adds a DeploymentCondition with the following attributes to the status of the resource (Deployment's `.status.conditions`):

* `type: Progressing`
* `status: "False"`
* `reason: ProgressDeadlineExceeded`

For example:


```bash
Status : demoservice2-deploy-app1   error: deployment "demoservice2-deploy-app1" exceeded its progress deadline
```

The Deployment controller will keep retrying the Deployment. This defaults to `600`. 

If you are using the Kubernetes deadline parameter `.spec.progressDeadlineSeconds` option, ensure that you identify whether a timeout is the result of that parameter or the Harness step **Timeout** setting.

