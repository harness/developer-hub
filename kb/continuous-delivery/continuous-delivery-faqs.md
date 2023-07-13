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


#### Do we need to install jq library in delegate machine or harness itself providing jq by default?

Harness by default does not provide by default the jq on delegate host. You need to add the below command in your INIT_SCRIPT for this.

```microdnf install jq```

#### Can plan from terraform step be encrypted using a read only secret manager ?

For encrypting terraform plan with the selected secret manager we need the ability to write the encrypted plan to the secret manager and hence read only secret manager will not work for this scenario.


#### What operations are performed as part of the cleanup step in ssh command task.

For SSH, we by default add an initialize step and a clean step apart from command execution step. As part of the cleanup step we we delete the working directory that lies within /tmp on the remote connected host.






