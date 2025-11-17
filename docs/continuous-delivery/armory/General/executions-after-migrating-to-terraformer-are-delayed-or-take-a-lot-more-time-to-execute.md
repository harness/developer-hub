---
title: Executions after Migrating to Terraformer are delayed or take a lot more time to execute
---

## Issue
When [enabling and migrating to Terraformer](https://docs.armory.io/armory-enterprise/armory-admin/terraform-enable-integration/) (Armory Enterprise's Terraform execution service), it is observed that there are delays in pipeline executions. Users may notice increases in time when utilizing pipelines in Spinnaker with Terraform integration.  Pipelines being run locally can run significantly quicker.
For the following example, an execution using Terraformer took approx ~1:40 to complete:
Workspace ".....-deploy-destroy-events-api" already exists
Switched to workspace "....deploy-destroy-events-api".
kubernetes_secret.cp_events_api_secrets_auth: Refreshing state... [id=default/cp-events-api-secrets-auth]
kubernetes_config_map.cp_events_api_indexes: Refreshing state... [id=default/cp-events-api-indexes]
kubernetes_service_account.cp_events_api: Refreshing state... [id=default/cp-events-api]
kubernetes_config_map.cp_events_api_env_vars: Refreshing state... [id=default/cp-events-api-env-vars]
kubernetes_service.cp_events_api: Refreshing state... [id=default/cp-events-api]
kubernetes_ingress.cp_events_api_internal: Refreshing state... [id=default/cp-events-api-internal]
kubernetes_deployment.cp_events_api: Refreshing state... [id=default/cp-events-api]

Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```



The same execution being attempted with local Terraform took approx ~35s to be completed
» time ./tf-apply.sh

Initializing the backend...

Initializing provider plugins...
- Reusing previous version of hashicorp/aws from the dependency lock file
- Reusing previous version of hashicorp/kubernetes from the dependency lock file
- Using previously-installed hashicorp/aws v3.55.0
- Using previously-installed hashicorp/kubernetes v2.4.1

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.

real	0m9.729s
user	0m2.635s
sys	0m0.381s
Switched to workspace "....-deploy-destroy-events-api".

real	0m4.379s
user	0m1.304s
sys	0m0.159s
Acquiring state lock. This may take a few moments...
kubernetes_service.cp_events_api: Refreshing state... [id=default/cp-events-api]
kubernetes_config_map.cp_events_api_env_vars: Refreshing state... [id=default/cp-events-api-env-vars]
kubernetes_service_account.cp_events_api: Refreshing state... [id=default/cp-events-api]
kubernetes_config_map.cp_events_api_indexes: Refreshing state... [id=default/cp-events-api-indexes]
kubernetes_secret.cp_events_api_secrets_auth: Refreshing state... [id=default/cp-events-api-secrets-auth]
kubernetes_ingress.cp_events_api_internal: Refreshing state... [id=default/cp-events-api-internal]
kubernetes_deployment.cp_events_api: Refreshing state... [id=default/cp-events-api]

Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Releasing state lock. This may take a few moments...

real	0m21.346s
user	0m7.172s
sys	0m1.329s
./tf-apply.sh  11.11s user 1.87s system 36% cpu 35.465 total
In both cases, no other actions are performed.

## Cause
The difference in time can be due to several reasons
* Execution within Spinnaker is reliant on network saturation and network availability, and this can significantly add time to the process* Terraformer executions also can be run in parallel (multiple people can be using the Terraformer service at one time)* Depending on where the source is located, the size of the repository hosting the Terraform files may have grown, and execution of the pipeline may not be optimized
It should be noted that the ```Monitor Run Terraform``` task fetches the Terraform files from the configured repository.  The execution of this task indicates if pulling from the repository (e.g. Github) is within expected execution time or not.  If the repository pull contains additional files not related to the Terraform code (e.g. image files, large archival files) this can lead to a delay in the execution.
After that, the ```initialize terraform``` would download the providers' configuration and plugin files (e.g. AWS libraries) based on the ```.tf``` files, before they are applied (or planned/destroyed). This execution occurs whenever a stage is executed and will add time to the execution, and is also dependant on how quickly the plugins/resources are downloaded.  This is because a pod execution is expected to have ephemeral resources, and the pod will need to ensure the resources are available each time. 
This differs from a local Terraform executions, because in local executions the init stage is not running each time, and it is expected that the plugins and modules may be pre-existing.  

