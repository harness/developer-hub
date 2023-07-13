---
title: Continuous Delivery  FAQs
description: Frequently asked questions about Harness Continuous Delivery (CD).
# sidebar_position: 2
---
# FAQ

This article addresses some frequently asked questions about Harness Continuous Delivery (CD).



#### How to use for condition while using jexl condition for trigger?

Suppose that trigger payload has multiple records and you want to search for a particular string so you can make use of jexl for loop to iterate the list and match a string as below:

`for (item : <+trigger.payload.commits>) { if (item.message == "mymessage") {return true;} }; return false;`


#### How to use token for OCI repo in AWS ECR as the token by default expires every 12 hours ?

We can set up AWS Secret Manager connector, then save the ECR auth token into it. Set up automatic token rotation (say at 10hr intervals) within AWS secret manager. Then have the Harness connector link to that AWS SecretManager secret, so it pulls a fresh token every time.


#### In First Gen we use WINDOWS_RUNTIME_PATH while setting up runtime directory, what is the corresponding way in Next gen ?

In NG we are not using any setup variables anymore, since it is Harness internal step where we basically create temp dir for the execution. We are creating working directory in Command Init unit on this %USERPROFILE% location.


#### In templateInput window why we only show variables that have runtime input and not the ones which has static value for input?

We only show runtime because we intend to show the user what is required of them for input.
The form gets too long if we expose all the fixed values and we only require in the form the ones which need input and not what has already defined values.


#### How do we clean the  state file for terraform if there is no remote backend configrued ?

For the terrafrom step if remote backend is not configured, the state file is being managed by Harness and it maps to the provisioner identifier itself. Hence the only way to get rid of the state file is to change the provisioner identifier in this scenario.


#### How can only set of user able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/#select-approvers)


#### How Kubernetes Pruning option work during the deployment?

If you have enabled the Kubernetes Pruning in your deployment. In that case, it will remove any resources that were present in an old manifest but are no longer present in the manifest used for the current deployment.

For reference: [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/) 


#### How release: {{ .Release.Name }} will help in steady state check in helm deployment?

We perform a pod fetch based on this label, which allows us to show deployed pods in the step output and also track the same for instance sync. If we don't add these, both won't work as expected.

For reference: [Steady state check](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/#spec-requirements-for-steady-state-check-and-versioning)


#### Where we need to add release: {{ .Release.Name }}?

So, Any manifest object which creates the pod, you have to add this label in its spec. Adding it in Service, Deployment, StatefulSet and DaemonSet should be enough.


#### What does the release name mean in the Infrastructure?

The release name is used to create a harness release history object, which contains some metadata about the workloads. This helps us perform the steady state check.