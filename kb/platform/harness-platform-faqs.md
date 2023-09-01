---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
# sidebar_position: 2
---
# FAQ


### Vault

I have a secret that is connected to vault.

How would i view it? Do i need to connect to vault?

For security reasons you would need to connect to Vault to view the secrets.  You can use them however.

[https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/)

[https://developer.harness.io/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/](https://developer.harness.io/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/)

[https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/)

You can reference the secrets using the following as a guide

[https://developer.harness.io/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier)

### Terraform

#### I'm getting an error "missing expected [" whereas I did not get it before

You might get the error below because Harness standardized to move from using maps to sets of strings for tags

```
Planning failed. Terraform encountered an error while generating this plan.
Error: missing expected [
...
Error: Terraform exited with code 1.
Error: Process completed with exit code 1.
```

To fix this update your state file to change the tags field from a map to a set of strings for example `"tags": {}` to `"tags": []`

### What RBAC permissions do users executing pipeline tasks using API need? 

The simple answer is that a user executing pipeline tasks either it is to modify or execute pipeline, will need the same permissions when running via API as if they were running the same tasks through the Harness UI. 

### How can I resolve environment variables in JEXL conditions?

Unfortunately, JEXL conditions do not support the direct usage of environment variables. The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.

### What is the Perpretual Task(PT) Iterator delay (Max delay from PT created, to PT being assigned if delegate is available) ?

Max delay is 60s, we run pt iterator every 60s for task assignment

### What is the delegate poll interval for new PT tasks. (Max delay from PT being assigned to delegate picking it up and executing it, say there is only 1 delegate) ?

It depends on task to task, you can find the interval for your task in perpetualTaskScheduleConfig in dms db

### Can we check the past connectivity of delegates, Whether the delegates we available at a particular time?

Yes , this can be checked via delegate logs.

### If there are some users that were manually added to the account, then will they get removed once the SCIM integration is configured/enabled for the account?

No, manually added users will not be removed after SCIM integration added, they would continue to be part of account.

### What happens if the same user was manually added first and is part of the SCIM?

If the same user was manually added first and now pushed from SCIM, it would be marked externally managed, and from that point onwards this user would be updated through SCIM (i.e. name, email of user would get updated through SCIM).

### Do we have any notification when delegates enter an expired state in NextGen ?

No, as of now we don't support but it is in our roadmap.

### Do we have some kind of dashboards where I can track my current status of delegates ?

Yes , you can setup prometheus to get the metrics . For more Information on setting that up, please go through the following [Documentation](https://developer.harness.io/docs/platform/delegates/manage-delegates/delegate-metrics)

### Does delegates logs are only sent to Harness or can I also query delegate logs in my own cloud logging system ?

By default, delegate logs are only sent to Harness and it can be enabled/disabled using this env variable - `STACK_DRIVER_LOGGING_ENABLED
`. To know more about this, please go through the following [Documentation](https://developer.harness.io/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled)

### I have setup SAML Successfully , but it doesn't populate in Link to SSO inside usergroup 

You need to Enable Authorization in your SAML post that you need to enable SAML.

### I have FF PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES enabled, but still I am getting emails when I add a user in an Org/Project

The FF `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` works for UserInvite case. For cases where a User is added as member to a UserGroup, a separate notification is sent which is not dependent on this FF.

### I have a large list of users to fetch but the API has a limit of 100 it takes lot of time, Do we have any alternative ?

To retrieve the list of users from API, you can use the following curl command.

```bash
curl --location --request GET 'https://app.harness.io/gateway/api/users?accountId=<AccountId>&limit=3000&offset=0' \
--header 'accept: application/json, text/plain, */*' \
--header 'authorization: Bearer ${token}' \
```
### Can same Github Repository be used for Different Projects with GitX Enabled?

Yes you can add multiple projects to the same repository, GitX is entity based not project based .

### Can Harness Support Group at any point of time have write access to our account ?

No , Harness will never have any write access to your account.

### Is auto-upgrade available for ECS delegates ?

We only support auto upgrade for delegates in K8s Infra.

### Is SAML single logout url supported ?

Yes it is supported, this can be configured while setting up SAML.

### What is the Idle Session Timeout ? Can it be configured ?

The idle session timeout is of 24 hours, we also support configuring the session timeout, it can be acheived by visiting Account Setting.

### When does the old replicas get clear out post getting disconnected for immutable delegates ?

They get cleared out in 6 hours post getting disconnected . 

### Do we support auto upgrade in Helm type delegates ?

Yes we support auto upgrade in both these type delegates . This can be acheived by following `upgrader.enabled=true` while running the install command .

### Do we log the GET Calls in our Audit Logs ?

We don't support Audit Trails for read API request like GET .

### I have my Environment at Org/Project/Accunt Level can I git sync them ? 

No, we can not at this moment .

### Is there a way to exclude a delegate from taking a task?

There is no way as of now to exclude delegates from picking up tasks for other pipelines.

### What is the difference between the delegate YAMLs of account vs org vs project?

We differentiate the delegate YAML based on the value of `DELEGATE_TOKEN`

### There are ‘Delegate Profiles’ for delegates in the CG. There are 'Startup Script' in it. What the equivalent of that in NG

You can make use of INIT_SCRIPT as below while launching delegate:
https://developer.harness.io/docs/first-gen/firstgen-platform/account/manage-delegates/run-initialization-scripts-on-delegates/

### How to find User login activity in Harness

You can filter and find user login activity in Audit trail(Both in CG and NG)

### How to Secure storage of the Delegate Token

You can Store delegate tokens as Kubernetes secrets: : https://developer.harness.io/docs/platform/delegates/secure-delegates/store-delegate-tokens-as-secrets/
You can also store the token in vault and can reference the token in yaml:  https://developer.harness.io/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-rotate-tokens 

### Not seeing any data for newly added User

Please check the User group assigned to User, If user is not assigned to any User Group/Role they will not be able to access/see any relevant data.

### What is the chart name for helm delegate

Chart name is  harness-delegate-ng you can see the metadata content as below and also the repo:
https://app.harness.io/storage/harness-download/harness-helm-charts/ 
https://github.com/harness/delegate-helm-chart

### Do we have any expiry for 2FA secret

No there is no expiry for 2FA secret

### Is there any way to automatically accept invite for local login User

No, It’s not possible as initially user need to use invite email to set their password. This is only possible while using saml for authentication.

### Is there any ability for an admin user to assume the same role as an alternate user for testing out permission issues?

No, There is no such option currently. To debug permission related issues need to check the Group and Roles assigned to user

### Getting error “User is not authorized to access the account. Please contact your admin” while trying to accept the invite and setting up local login password

The most common reason for this failure is your account has domain whitelisting applied and the domain used in your username is not in allowed list and ideally in this case you will able to see "DOMAIN_WHITELIST_FILTER_CHECK_FAILED" in network tab 

### Rate limiting in Harness

Harness internally imposed a limit to allow a certain number of requests per minute as well as per second.

The limit we have imposed is if an account exceeds 350 QPM or 350/60 = 5.833 QPS then the requests will be throttled for all the external facings APIs.
There are 14 external facing API resources and this limit applies to all those APIs.
```
350 QPM and 5.833 QPS
```
The limit gets imposed based on QPM as well as QPS.
The Ratelimiter decides on what seconds out of the 60 for every minute which 50 seconds it will allow 6 QPS and rest 10 seconds allow only 5.

While running queries you might sometimes observe 429s that is because of the above limit.
```
429 - Server Errors : The rate limit is exceeded.
```

### Error's with OKTA SCIM Provisioning

We usually see issues related to SCIM provisioning with OKTA and below are Steps you need to validate for the same.
Validate the SCIM Connector Base Url , sometimes we mistake it with the SAMl url.
```
URL: https://app.harness.io/gateway/ng/api/scim/account/<account_id>
```
Also when you create the personal access token. Make sure it has the required the role bindings(admin).

### Graphql API query to list executions with details between a specific time range 

```
{
    executions(filters:[{startTime:{operator:AFTER, value:1643285847000}},{endTime:{operator:BEFORE,value:1656332247000}}], limit:30) {
      pageInfo {
           limit
           offset
       total
     }
     nodes {
            startedAt
            endedAt
     tags {
           name
           value
     }
       id
       application {
                    id
                    name
     }
      status
     cause {
    ... on ExecutedByUser {
             user {
                   email
      }
     }
    ... on ExecutedByTrigger {
       trigger {
                id
                name
       }
      }
     }
    ... on PipelineExecution {
      pipeline {
                id
                name
     }
     memberExecutions{
      nodes{
    ... on WorkflowExecution{
       workflow{
                id
                name
     }
      id
     artifacts {
                buildNo
     artifactSource {
                     name
      }
     }
     outcomes{
      nodes{
    ... on DeploymentOutcome{
          service{
                  id
                  name
     }
          environment{
                      id
                      name
            }
           }
          }
         }
        }
       }
      }
     }
    ... on WorkflowExecution {
       workflow {
                 id
                 name
     }
              id
       artifacts {
                  buildNo
    artifactSource {
                  name
       }
      }
    outcomes{
             nodes{
    ... on DeploymentOutcome{
             service{
                     id
                     name
     }
             environment{
                         id
                         name
        }
          }
         }
        }
       }
      }
     }
    }
```

### 2FA not working and user is unable to login

A user can either request the admin to resend the 2FA and user can reset the 2FA in authenticator app or use the https://totp.danhersam.com/ to enter the secret key and generate the code to login.

### Permissions needed for SCIM token

The mandatory permission in the role which needs to be assigned to the Service Account to perform the SCIM operation with the token would be: With only the User / User Group permission to the service account the Token created could perform the SCIM operations.

### Disable Local Login in Harness Account

You will need to reach to Harness Support to enable the Feature Flag DISABLE_LOCAL_LOGIN in order to disable local login for the account.

### API to fetch all the users in the Harness

```
curl --location --request GET 'https://app.harness.io/gateway/api/users?accountId=enter_accountid_here&limit=3000&offset=0' \
--header 'authority: app.harness.io' \
--header 'accept: application/json, text/plain, */*' \
--header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
--header 'adrum: isAjax:true' \
--header 'authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx' \
--header 'referer: https://vanitytest.harness.io/' \
--header 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'sec-fetch-dest: empty' \
--header 'sec-fetch-mode: cors' \
--header 'sec-fetch-site: same-origin'
```

### Unable to see the Launch Next Gen button on First Gen UI after logging in.

There are permissions for the User group "Hide NextGen Button" under Account Permission in any User Group. Make sure this is toggled to Off else you won't see the Luanch Next Gen option in the UI. 

### User login issue in case of user being part of multiple account

In case you are a part of multiple account and 1 account has SAML login and other has Username/Password. User must make sure that the SAML account is set as default account, else it wont work with SAML login as the login mechanism of the default account is taken into consideration. 


### Are delegate tokens stored in MongoDB?

Yes, the delegate tokens are stored in MongoDB

### Should we store the token that hasn't been generally available yet in the secret manager?

No, we don't use the customer secret manager to encrypt delegate tokens. Rather than storing the token in plain text, we leverage Harness' internal encryption mechanism. This mechanism enables us to store the token's encrypted value in the database. This approach enhances security and mitigates potential risks associated with storing sensitive information.

### Do we have any static limit in NG like CG(pipeline/service creation etc)?

No, we don't have limit on pipeline creation, we do have limit for entities creation for free/community tier, but no limits for enterprise.

### Is there a limit to the number of triggers a pipeline can have?

There is no limit on number of triggers for pipeline.

### Can we raise the parallel stage limit for a customer?

These limits are important for the stability of our systems, the limit is set at 30 for parallel stages for enterprise customer.

### do we have the ability in NG to alert/notify when a delegate is down?

No we don't have the ability as of now.

### I am unable to delete the connector as its referenced by an entity but the entity is no longer present.

This can be easily acheived by enabling Force Delete option in default settings.

### What is the convention of creating a default token for delegate ?

The default token is named using the convention of level at which it is being called for eg `default_token/org/project`

### Can the delegate token be deleted ?

The delegate token cannot be deleted it can be only revoked and the revoked tokens get deleted in 30 days.

### When we add a delegate tag via a api why that tag disappears when the delegate is restarted?

The delegate tags disapper as it will not be there in original delegate yaml which was used to start delegate.

### My delegate is restarting and in logs this is coming up "Failed to find field for io.kubernetes.client.openapi.models.V1JSONSchemaProps.x-kubernetes-list-map-keys"

You should create the delegate with the minimum recommened resources to solve this issue.

### Is there a functionality to auto accept invite for username/password login?

It's present for saml based login because authentication is taken care by SAML provider. In password need login we need the user to create a password in Harness.

### Do we have documentation for installing a custom certificate in a K8-based delegate?

Yes we can install custom certificates on K8-Based Delegate, refer to this [Documentation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/)

### What happens with the rejected tasks in delegate ?

Delegate reject tasks or fail to acquire tasks when CPU and memory reach above a certain threshold if flag `DYNAMIC_REQUEST_HANDLING` is set as true in the yaml.

### Can we set the delegate to reject new tasks if x% of memory is being consumed?

Yes you can choose to specify what threshold to reject the task using the flag `DELEGATE_RESOURCE_THRESHOLD`, otherwise, the  default value is 70%.

### What is the behavior when DYNAMIC_REQUEST_HANDLING is set to false or not set at all when memory reaches 100% ?

 It will not try to acquire any task. Once the resource level goes down it will start accepting tasks again. There will be no crash of delegates or shut down of delegates during this case.

### If project level users, does not have access to account level secrets, they should not be able to access it. What could be done so that project level user won't be able to access account level secrets? How is it Handled by RBAC while using expressions?

There is a feature flag `PIE_USE_SECRET_FUNCTOR_WITH_RBAC` when enabled can help you acheive the same.

### How can we prevent users with project scope access to account-level secrets?

This can be changed by modifying the role bindings of "All Account Users" user group and assign any other Role and ResourceGroup as per their need.

### Do we have support for auto-upgrade of delegate for docker type ?

No, we don't have auto-upgrade for docker delegate, but you can update your docker delegate image once the newer version is released by Harness 

### Do we have rate limit For FirstGen, exporting deployment logs? Can this be removed or modified per account?

Yes , we do have rate limits, more information can be read over here [Documentation](https://developer.harness.io/docs/platform/rate-limits). We cannot remove rate limits per account , but you can always request for an increase.

### Is there a way to get a secret as base64 encoded?

No there isn't any such support for getting secrets as base64, but you can store the value as base64 encoded secret and then get the value using the expression `secrets.getValue("my_secret")`.

### In pipeline chaining, Is it possible to reference a child's variables, in the parent pipeline without using outputs?

We can refer to child execution expression in parent pipeline only via outputs using the following expression `<+pipeline.stages.child.pipeline.stages.b_stage.spec.artifacts.primary.tag>`.

### Is create-namespace option available in Harness while deploying chart?

You can point to a manifest file containing just the namespace yaml. This means you can create a Kubernetes YAML file that defines only the namespace you want to use for your application. Even a shell script step would be simple enough in this case, and use a kubectl command directly. This suggests that using a shell script as a step in your deployment process to apply the namespace YAML file is straightforward. You can use the kubectl command in the shell script to create the namespace.

### Where can we download the helm chart for delegate manually and not using helm commands?

The helm chart for delegate can be found at the below location:[here](https://github.com/harness/delegate-helm-chart/tree/main/harness-delegate-ng)

### I have a custom delegate and trying to execute the script, script is executing as a root user how can I change the user 

In the Delegate YAML, you need to modify the "runAsUser" field, which is currently set to 0, indicating that the script runs as the root user.

### How can I list all delegates in account?

You can use list delegate API: [here](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/listDelegates)

### How can I revert the "externally managed" status of these user groups if they were indeed managed by SCIM earlier?

If these user groups were previously provisioned via SCIM and marked as "externally managed," you can updte it by updating the "externally managed" field back to false via terraform or API.

### Possibility of renaming Project identifier

Project Identifier can't be renamed as it is set when the project is created. We can always rename the Project Name but not the identifier.

### This documentation https://developer.harness.io/docs/platform/delegates/manage-delegates/delegate-metrics/ shows the following metric available: io_harness_custom_metric_task_execution_time. What does it represent? Seconds? Milliseconds?

The time it takes to complete a task (in seconds)

### We have a user group named Ex:"Test", where the team members are given access to edit cloud providers. Even though Manage Cloud Provider option is enabled, User from that User Group are not able to edit.

You will need to check the Usage Scope , as even if the User Group has permissions , the Usage scope if has a different application added apart from the ones specifed at User Group then the users won't be able to edit the Cloud Providers. 

### Delegate mTLS Support

Currently, mTLS is only supported for Kubernetes type delegate. We will be adding support for Helm and docker delegate in furture. 
Harness Supports both Loose and Strict mode

### How to check the edition in NextGen(SMP)

You can check the version by running the below command : 
```
helm list -n namespace
```
It will show the App version which is the version of your Harness edition

### Do we have documentation for network setup or Harness Deployment Architecture?

Yes we do have documentation for Harness deployment architecture, refer to this [Documentation](https://medium.com/harness-engineering/harness-deployment-architecture-a667fe359342).

### Do we have either a Splunk option or another public cloud option like GCS for audit log streaming?

We donot have this option as of now. 

### Can the delegate upgrader job be set to point to a custom private registry?

Yes, delegate upgrader job can be set to point to a custom private registry, refer to this [Documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Can we set `SCM_SKIP_SSL = true` while working on docker delegate?

Yes, we can add it when running the docker delegate with -e option, refer to [Documentation](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci#scm-request-failed-with-unknown).


### Will user can create one more project under the project ?
As per the current design you can not create project under the project. The project is the whole separate entity which can't be created inside another project.

### How to customized build pipeline. Ex: Create a script to clone the repo from TFS?
User can run a script in a run step of a build pipeline as detailed in this [doc](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) and you should be able to clone the repo.

### How the active service count will show in License subscription?
We show the service usage account for the last 30 days.