---
title: Continuous Delivery  FAQs
description: Frequently asked questions about Harness Continuous Delivery (CD).
# sidebar_position: 2
---
# FAQ

This article addresses some frequently asked questions about Harness Continuous Delivery (CD).



#### How to use the "for" condition while using jexl condition for the trigger?

Suppose that trigger payload has multiple records and you want to search for a particular string so you can make use of jexl for loop to iterate the list and match a string as below:

`for (item : <+trigger.payload.commits>) { if (item.message == "mymessage") {return true;} }; return false;`


#### How to use the token for OCI repo in AWS ECR as the token by default expires every 12 hours?

We can set up the AWS Secret Manager connector, then save the ECR auth token into it. Set up automatic token rotation (say at 10hr intervals) within AWS secret manager. Then have the Harness connector link to that AWS SecretManager secret, so it pulls a fresh token every time.


#### In First Gen we use WINDOWS_RUNTIME_PATH while setting up a runtime directory, what is the corresponding way in Next Gen?

In NG we are not using any setup variables anymore, since it is Harness's internal step where we basically create a temp dir for the execution. We are creating a working directory in the Command Init unit on this %USERPROFILE% location.


#### In templateInput window why do we only show variables that have runtime input and not the ones which have a static value for input?

We only show runtime because we intend to show the user what is required of them for input.
The form gets too long if we expose all the fixed values and we only require in the form the ones which need input and not what has already defined values.


#### How do we clean the state file for Terraform if there is no remote backend configured?

For the terraform step if the remote backend is not configured, the state file is being managed by Harness and it maps to the provisioner identifier itself. Hence the only way to get rid of the state file is to change the provisioner identifier in this scenario.

#### How to use reference modules in sub-directories as part of a Terraform step? 

In Harness, users may want to reference sub-modules as part of a Terraform step. Here is a sample code as part of the tf file that can be utilized:

module "transit-gateway" {
  source = "git::https://gitlab.com/rubrik-octo/lab/source-modules.git//site-deploy/transit-gateway"
}

Here you see a single git repository named 'source-modules, that has multiple modules inside various folders. By using the '//' at the end of the source location, you can instruct Terraform to checkout a specific folder. 


#### Do we need to install jq library in delegate machine or harness itself providing jq by default?

Harness by default does not provide by default the jq on delegate host. You need to add the below command in your INIT_SCRIPT for this.

```microdnf install jq```

#### Can plan from terraform step be encrypted using a read only secret manager ?

For encrypting terraform plan with the selected secret manager we need the ability to write the encrypted plan to the secret manager and hence read only secret manager will not work for this scenario.


#### What operations are performed as part of the cleanup step in ssh command task.

For SSH, we by default add an initialize step and a clean step apart from command execution step. As part of the cleanup step we we delete the working directory that lies within /tmp on the remote connected host.





#### Why the "Always Execute this Step” condition does not always run in the CD pipeline?

Always execute step runs regardless of success or failure but in order to trigger this condition on failure the previous step should be considered as failure, if the error is rolled back then it is not considered a failure. Hence, the next step's Conditional Execution is not executed. Therefore, a failure strategy such as “Mark as failure” or "ignore failure" is required.


#### Can we retain more than 2 older release secrets and config maps?

No, Harness uses a fixed limit of 2 in its release history cleanup logic. This value cannot be changed. 

See - https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes


#### What happens if my manifest files are changed during pipeline execution, will harness pick the latest file?

The files are fetched only during the execution step i.e. during rollout. if the files are changed and committed before the "Fetch file" step is executed in the rollout phase, Harness will pick the latest file.


#### Can I encrypt the Token/Secret passed in the INIT_SCRIPT?

Directly this cannot be encrypted but this use can be achieved by creating the k8s secret for the credentials and referring them in the init script.

**example** -

``` aws_access_key=kubectl get secrets/pl-credentials --template={{.data.aws_access_key}} | base64 -d```
```aws_secret_key= kubectl get secrets/pl-credentials --template={{.data.aws_secret_key}} | base64 -d```


Another approach would be saving the value in Harness's secret manager/any other secret manager and referencing it in the script.
Check this for more info - https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets


#### K8s delete command is not working with the native helm?

The K8s delete command/step does not work with native helm deployment because Harness has different logic to maintain versioning and rollback for native helm and k8s.In the case of the native helm, If the deployment fails, we’ll uninstall it ourselves. However, if the user wants to pass some command flags with Uninstall, that can be passed by selecting Uninstall and passing the relevant command flags. 

Check this for more details - https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#uninstall-command-flag


#### How do I run helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment. you can leverage the shell script step and run the helm uninstall ```release-name``` command from the delegate onto the cluster.
To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate. 

For this use case within the shell script, you can simply reference credentials as ${HARNESS_KUBE_CONFIG_PATH}

```export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test```

With this even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.


