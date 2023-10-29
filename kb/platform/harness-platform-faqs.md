---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
# sidebar_position: 2
---
# FAQ


#### Vault I have a secret that is connected to vault. How would i view it? Do i need to connect to vault?

For security reasons you would need to connect to Vault to view the secrets.  You can use them however.

[/docs/platform/secrets/secrets-management/add-hashicorp-vault/](/docs/platform/secrets/secrets-management/add-hashicorp-vault/)

[/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/)

[/docs/platform/secrets/secrets-management/harness-secret-manager-overview/](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/)

You can reference the secrets using the following as a guide

[/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier](/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier)

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

#### What RBAC permissions do users executing pipeline tasks using API need? 

The simple answer is that a user executing pipeline tasks either it is to modify or execute pipeline, will need the same permissions when running via API as if they were running the same tasks through the Harness UI. 

#### How can I resolve environment variables in JEXL conditions?

Unfortunately, JEXL conditions do not support the direct usage of environment variables. The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.

#### What is the Perpretual Task(PT) Iterator delay (Max delay from PT created, to PT being assigned if delegate is available) ?

Max delay is 60s, we run pt iterator every 60s for task assignment

#### What is the delegate poll interval for new PT tasks. (Max delay from PT being assigned to delegate picking it up and executing it, say there is only 1 delegate) ?

It depends on task to task, you can find the interval for your task in perpetualTaskScheduleConfig in dms db

#### Can we check the past connectivity of delegates, Whether the delegates we available at a particular time?

Yes , this can be checked via delegate logs.

#### If there are some users that were manually added to the account, then will they get removed once the SCIM integration is configured/enabled for the account?

No, manually added users will not be removed after SCIM integration added, they would continue to be part of account.

#### What happens if the same user was manually added first and is part of the SCIM?

If the same user was manually added first and now pushed from SCIM, it would be marked externally managed, and from that point onwards this user would be updated through SCIM (i.e. name, email of user would get updated through SCIM).

#### Do we have any notification when delegates enter an expired state in NextGen ?

No, as of now we don't support but it is in our roadmap.

#### Do we have some kind of dashboards where I can track my current status of delegates ?

Yes , you can setup prometheus to get the metrics . For more Information on setting that up, please go through the following [Documentation](/docs/platform/delegates/manage-delegates/delegate-metrics)

#### Does delegates logs are only sent to Harness or can I also query delegate logs in my own cloud logging system ?

By default, delegate logs are only sent to Harness and it can be enabled/disabled using this env variable - `STACK_DRIVER_LOGGING_ENABLED
`. To know more about this, please go through the following [Documentation](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled)

#### I have setup SAML Successfully , but it doesn't populate in Link to SSO inside usergroup 

You need to Enable Authorization in your SAML post that you need to enable SAML.

#### I have FF PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES enabled, but still I am getting emails when I add a user in an Org/Project

The FF `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` works for UserInvite case. For cases where a User is added as member to a UserGroup, a separate notification is sent which is not dependent on this FF.

#### I have a large list of users to fetch but the API has a limit of 100 it takes lot of time, Do we have any alternative ?

To retrieve the list of users from API, you can use the following curl command.

```bash
curl --location --request GET 'https://app.harness.io/gateway/api/users?accountId=<AccountId>&limit=3000&offset=0' \
--header 'accept: application/json, text/plain, */*' \
--header 'authorization: Bearer ${token}' \
```
#### Can same Github Repository be used for Different Projects with GitX Enabled?

Yes you can add multiple projects to the same repository, GitX is entity based not project based .

#### Can Harness Support Group at any point of time have write access to our account ?

No , Harness will never have any write access to your account.

#### Is auto-upgrade available for ECS delegates ?

We only support auto upgrade for delegates in K8s Infra.

#### Is SAML single logout url supported ?

Yes it is supported, this can be configured while setting up SAML.

#### What is the Idle Session Timeout ? Can it be configured ?

The idle session timeout is of 24 hours, we also support configuring the session timeout, it can be acheived by visiting Account Setting.

#### When does the old replicas get clear out post getting disconnected for immutable delegates ?

They get cleared out in 6 hours post getting disconnected . 

#### Do we support auto upgrade in Helm type delegates ?

Yes we support auto upgrade in both these type delegates . This can be acheived by following `upgrader.enabled=true` while running the install command .

#### Do we log the GET Calls in our Audit Logs ?

We don't support Audit Trails for read API request like GET .

#### I have my Environment at Org/Project/Accunt Level can I git sync them ? 

No, we can not at this moment .

#### Is there a way to exclude a delegate from taking a task?

There is no way as of now to exclude delegates from picking up tasks for other pipelines.

#### What is the difference between the delegate YAMLs of account vs org vs project?

We differentiate the delegate YAML based on the value of `DELEGATE_TOKEN`

#### There are ‘Delegate Profiles’ for delegates in the CG. There are 'Startup Script' in it. What the equivalent of that in NG

You can make use of INIT_SCRIPT as below while launching delegate:
/docs/first-gen/firstgen-platform/account/manage-delegates/run-initialization-scripts-on-delegates/

#### How to find User login activity in Harness

You can filter and find user login activity in Audit trail(Both in CG and NG)

#### How to Secure storage of the Delegate Token

You can Store delegate tokens as Kubernetes secrets: : /docs/platform/delegates/secure-delegates/store-delegate-tokens-as-secrets/
You can also store the token in vault and can reference the token in yaml:  /docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-rotate-tokens 

#### Not seeing any data for newly added User

Please check the User group assigned to User, If user is not assigned to any User Group/Role they will not be able to access/see any relevant data.

#### What is the chart name for helm delegate

Chart name is  harness-delegate-ng you can see the metadata content as below and also the repo:
https://app.harness.io/storage/harness-download/harness-helm-charts/ 
https://github.com/harness/delegate-helm-chart

#### Do we have any expiry for 2FA secret

No there is no expiry for 2FA secret

#### Is there any way to automatically accept invite for local login User

No, It’s not possible as initially user need to use invite email to set their password. This is only possible while using saml for authentication.

#### Is there any ability for an admin user to assume the same role as an alternate user for testing out permission issues?

No, There is no such option currently. To debug permission related issues need to check the Group and Roles assigned to user

#### Getting error “User is not authorized to access the account. Please contact your admin” while trying to accept the invite and setting up local login password

The most common reason for this failure is your account has domain whitelisting applied and the domain used in your username is not in allowed list and ideally in this case you will able to see "DOMAIN_WHITELIST_FILTER_CHECK_FAILED" in network tab 

#### Rate limiting in Harness

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

#### Error's with OKTA SCIM Provisioning

We usually see issues related to SCIM provisioning with OKTA and below are Steps you need to validate for the same.
Validate the SCIM Connector Base Url , sometimes we mistake it with the SAMl url.
```
URL: https://app.harness.io/gateway/ng/api/scim/account/<account_id>
```
Also when you create the personal access token. Make sure it has the required the role bindings(admin).

#### Graphql API query to list executions with details between a specific time range 

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

#### 2FA not working and user is unable to login

A user can either request the admin to resend the 2FA and user can reset the 2FA in authenticator app or use the https://totp.danhersam.com/ to enter the secret key and generate the code to login.

#### Permissions needed for SCIM token

The mandatory permission in the role which needs to be assigned to the Service Account to perform the SCIM operation with the token would be: With only the User / User Group permission to the service account the Token created could perform the SCIM operations.

#### Disable Local Login in Harness Account

You will need to reach to Harness Support to enable the Feature Flag DISABLE_LOCAL_LOGIN in order to disable local login for the account.

#### API to fetch all the users in the Harness

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

#### Unable to see the Launch Next Gen button on First Gen UI after logging in.

There are permissions for the User group "Hide NextGen Button" under Account Permission in any User Group. Make sure this is toggled to Off else you won't see the Luanch Next Gen option in the UI. 

#### User login issue in case of user being part of multiple account

In case you are a part of multiple account and 1 account has SAML login and other has Username/Password. User must make sure that the SAML account is set as default account, else it wont work with SAML login as the login mechanism of the default account is taken into consideration. 


#### Are delegate tokens stored in MongoDB?

Yes, the delegate tokens are stored in MongoDB

#### Should we store the token that hasn't been generally available yet in the secret manager?

No, we don't use the customer secret manager to encrypt delegate tokens. Rather than storing the token in plain text, we leverage Harness' internal encryption mechanism. This mechanism enables us to store the token's encrypted value in the database. This approach enhances security and mitigates potential risks associated with storing sensitive information.

#### Do we have any static limit in NG like CG(pipeline/service creation etc)?

No, we don't have limit on pipeline creation, we do have limit for entities creation for free/community tier, but no limits for enterprise.

#### Is there a limit to the number of triggers a pipeline can have?

There is no limit on number of triggers for pipeline.

#### Can we raise the parallel stage limit for a customer?

These limits are important for the stability of our systems, the limit is set at 30 for parallel stages for enterprise customer.

#### do we have the ability in NG to alert/notify when a delegate is down?

No we don't have the ability as of now.

#### I am unable to delete the connector as its referenced by an entity but the entity is no longer present.

This can be easily acheived by enabling Force Delete option in default settings.

#### What is the convention of creating a default token for delegate ?

The default token is named using the convention of level at which it is being called for eg `default_token/org/project`

#### Can the delegate token be deleted ?

The delegate token cannot be deleted it can be only revoked and the revoked tokens get deleted in 30 days.

#### When we add a delegate tag via a api why that tag disappears when the delegate is restarted?

The delegate tags disapper as it will not be there in original delegate yaml which was used to start delegate.

#### My delegate is restarting and in logs this is coming up "Failed to find field for io.kubernetes.client.openapi.models.V1JSONSchemaProps.x-kubernetes-list-map-keys"

You should create the delegate with the minimum recommened resources to solve this issue.

#### Is there a functionality to auto accept invite for username/password login?

It's present for saml based login because authentication is taken care by SAML provider. In password need login we need the user to create a password in Harness.

#### Do we have documentation for installing a custom certificate in a K8-based delegate?

Yes we can install custom certificates on K8-Based Delegate, refer to this [Documentation](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/)

#### What happens with the rejected tasks in delegate ?

Delegate reject tasks or fail to acquire tasks when CPU and memory reach above a certain threshold if flag `DYNAMIC_REQUEST_HANDLING` is set as true in the yaml.

#### Can we set the delegate to reject new tasks if x% of memory is being consumed?

Yes you can choose to specify what threshold to reject the task using the flag `DELEGATE_RESOURCE_THRESHOLD`, otherwise, the  default value is 70%.

#### What is the behavior when DYNAMIC_REQUEST_HANDLING is set to false or not set at all when memory reaches 100% ?

 It will not try to acquire any task. Once the resource level goes down it will start accepting tasks again. There will be no crash of delegates or shut down of delegates during this case.

#### If project level users, does not have access to account level secrets, they should not be able to access it. What could be done so that project level user won't be able to access account level secrets? How is it Handled by RBAC while using expressions?

There is a feature flag `PIE_USE_SECRET_FUNCTOR_WITH_RBAC` when enabled can help you acheive the same.

#### How can we prevent users with project scope access to account-level secrets?

This can be changed by modifying the role bindings of "All Account Users" user group and assign any other Role and ResourceGroup as per their need.

#### Do we have support for auto-upgrade of delegate for docker type ?

No, we don't have auto-upgrade for docker delegate, but you can update your docker delegate image once the newer version is released by Harness 

#### Do we have rate limit For FirstGen, exporting deployment logs? Can this be removed or modified per account?

Yes , we do have rate limits, more information can be read over here [Documentation](/docs/platform/rate-limits). We cannot remove rate limits per account , but you can always request for an increase.

#### Is there a way to get a secret as base64 encoded?

No there isn't any such support for getting secrets as base64, but you can store the value as base64 encoded secret and then get the value using the expression `secrets.getValue("my_secret")`.

#### In pipeline chaining, Is it possible to reference a child's variables, in the parent pipeline without using outputs?

We can refer to child execution expression in parent pipeline only via outputs using the following expression `<+pipeline.stages.child.pipeline.stages.b_stage.spec.artifacts.primary.tag>`.

#### Is create-namespace option available in Harness while deploying chart?

You can point to a manifest file containing just the namespace yaml. This means you can create a Kubernetes YAML file that defines only the namespace you want to use for your application. Even a shell script step would be simple enough in this case, and use a kubectl command directly. This suggests that using a shell script as a step in your deployment process to apply the namespace YAML file is straightforward. You can use the kubectl command in the shell script to create the namespace.

#### Where can we download the helm chart for delegate manually and not using helm commands?

The helm chart for delegate can be found at the below location:[here](https://github.com/harness/delegate-helm-chart/tree/main/harness-delegate-ng)

#### I have a custom delegate and trying to execute the script, script is executing as a root user how can I change the user 

In the Delegate YAML, you need to modify the "runAsUser" field, which is currently set to 0, indicating that the script runs as the root user.

#### How can I list all delegates in account?

You can use list delegate API: [here](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/listDelegates)

#### How can I revert the "externally managed" status of these user groups if they were indeed managed by SCIM earlier?

If these user groups were previously provisioned via SCIM and marked as "externally managed," you can updte it by updating the "externally managed" field back to false via terraform or API.

#### Possibility of renaming Project identifier

Project Identifier can't be renamed as it is set when the project is created. We can always rename the Project Name but not the identifier.

#### This documentation /docs/platform/delegates/manage-delegates/delegate-metrics/ shows the following metric available: io_harness_custom_metric_task_execution_time. What does it represent? Seconds? Milliseconds?

The time it takes to complete a task (in seconds)

#### We have a user group named Ex:"Test", where the team members are given access to edit cloud providers. Even though Manage Cloud Provider option is enabled, User from that User Group are not able to edit.

You will need to check the Usage Scope , as even if the User Group has permissions , the Usage scope if has a different application added apart from the ones specifed at User Group then the users won't be able to edit the Cloud Providers. 

#### Delegate mTLS Support

Currently, mTLS is only supported for Kubernetes type delegate. We will be adding support for Helm and docker delegate in furture. 
Harness Supports both Loose and Strict mode

#### How to check the edition in NextGen(SMP)

You can check the version by running the below command : 
```
helm list -n namespace
```
It will show the App version which is the version of your Harness edition

#### Do we have documentation for network setup or Harness Deployment Architecture?

Yes we do have documentation for Harness deployment architecture, refer to this [Documentation](https://medium.com/harness-engineering/harness-deployment-architecture-a667fe359342).

#### Do we have either a Splunk option or another public cloud option like GCS for audit log streaming?

We donot have this option as of now. 

#### Can the delegate upgrader job be set to point to a custom private registry?

Yes, delegate upgrader job can be set to point to a custom private registry, refer to this [Documentation](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

#### Can we set `SCM_SKIP_SSL = true` while working on docker delegate?

Yes, we can add it when running the docker delegate with -e option, refer to [Documentation](/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci#scm-request-failed-with-unknown).

#### Will user can create one more project under the project ?

As per the current design you can not create project under the project. The project is the whole separate entity which can't be created inside another project.

#### How to customized build pipeline. Ex: Create a script to clone the repo from TFS?

User can run a script in a run step of a build pipeline as detailed in this [doc](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) and you should be able to clone the repo.

#### How the active service count will show in License subscription?

We show the service usage account for the last 30 days.

#### When we try to open a git enabled pipeline, why the branch dropdown doesnt display all the branches? 

This behavior is expected when there are many branches in the repo due to pagination. To select branches that are not being listed, try entering the full branch name manually. This should allow you to open the pipeline from that branch

#### Howmany branches will be listed in branch dropdown UI when we try to open a git enabled pipeline?

We typically list 20 to 30 branches, depending on the git provider as fetching all branches would be time-consuming.

#### Where can we add the env attributes for delegate while doing helm chart installation ?

Delegate deployment for helm chart installation is configured to pick the evnironment variable from configmap. Check the name of the configmap in the chart deployment yaml, the attribute is envFrom and edit the configmap to add the corresponding environment variables.


#### How does delegate identify its scope for registration ?

While installing delegates we do not explicitely configure it to connect at account , organisation or project scope. It is decided based on the scope of the delegate token. If the token is from project scope the delegate will register at project level. Same goes with organisation and account level.

#### Will the delegate continue to work if we delete the delegate token being used ?

The delegate registration is only valid till the delegate token with which it has registered is available and not expired/revoked. If the delegate token is deleted the delegate registration will no longer be valid and it will fail authorization.

#### How many types of api token are there ?

There are two types of api token, one can be created at user profile level and they are prefixed with `pat.xxxx....` standing for personal account token. The second one can be created at service account level which is prefixed as `sat.xxxxx....` which stands for service account token.

#### How do we assign permission to the api tokens ?

We do not assign permission directly to the account tokens. They inherit the permissions from the user if they are created at the user profile level or the service account if they are created at service account level.


#### Harness Conditional Alerts and Notifications

Conditional alerts are a useful tool, which you can utilize to trigger notifications on specific conditions that are met or exceeded. 

See [https://developer.harness.io/docs/platform/dashboards/create-conditional-alerts/]

#### Receiving 429 error response with regards to rate limit

Harness has several rate limiters on the platform. Sending multiple requests in quick succession will generate the 429 response. 

See [https://developer.harness.io/docs/platform/rate-limits/]

#### Do we have docs for the infrastructure requirements for a user looking to install a Self Managed Platform (SMP) ?

Yes, we do have docs for installation of SMP, refer to this [Documentation](https://developer.harness.io/docs/self-managed-enterprise-edition/self-managed-helm-based-install/harness-helm-chart#production-environment-deployment-infrastructure).

#### What is the permission needed for adding SMTP configuration, I am getting error Missing permission core_smtp_edit on smtp while trying to add Authentication Settings or Account Settings?

The permission needed for this Account Admin and as of now only Account Admin can edit the SMTP configuration.

#### Does Harness allow you to set 2 AMI’s with different CPU architecture?

Harness doesn't allow in the same ASG.

#### How can you control on-demand or spot provisioning within ASG group / target?

We supported spotinst ASG in FG and we also have spotinst for NG also, to know more about it please read the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment).

#### Can I pull in from multiple different Okta providers for multiple different teams with different RBAC/group needs?

No, we support only one SSO provider at a time which is configured at account level.

#### Will Cloud Connector propagate the tags to AWS calls ?

No, The Cloud connector will not propagate the tags to AWS while making calls.

#### Where can we see the logs of AWS calls?

We have limited logging for the AWS Calls.

#### Delegate Selector in connector

The delegate selector in connector always works as AND and not OR. Say you have delegate A named "ABC" and delegate B named "BCD". In the connector selector options you will need to give only 1 tag either "ABC" or "BCD". In case you need to have multiple delegate there then you will need to add custom tags to the delegate and specify the common one in the sector. 

#### If the value for secret starts with # for reference scerets

In case you value start with # in case of reference secrets, always use Double quotes as “#” is a special character to represent comments and it will work as expected.

Ex: The value for the secret is say "#7767test"
```echo "<+secrets.getValue("account.aaaatestaaatest")>" ```

#### User deletion from UI when it is provisioned via SCIM

Harness now allows admin to delete users from Harness UI even if the user is provisioned via SCIM, this is only supposed to be used in case the Users ends up in a state the SCIM App was removed and hence the User can't be removed.
As this can cause issues if the User is a part of say 2 Accounts the backend entry for the user won't be removed and from that specific account it might removed. Now reprovisioning the User from SCIM app will give error as the user is still present with the same user id in backend. Hence you will need to remove the user completely from the SCIM app and provision him again as a new user. 

#### Is their a way we can check what delegates are running/doing any particular time.
You can review the delegate logs so ideally it should show the task that it was executing around the time frame.

#### Getting error IllegalArgumentException: kubectl is not installed for version V1_13. Available versions are: []
If you are using minimal delegate images than this error can come and need to install the kubectl version and check $PATh if its updated correctly

#### Delegate is not coming up with no space left error
While starting delegate we install some third party binaries(kubectl, helm etc) so those need some space so make sure delegate machne has some disk space left

#### Is there a tool available for unit testing Harness rego policies before deployment?
No, we don't provide a dedicated tool for testing Harness rego policies. However, you can use the general-purpose testing tool provided by Open Policy Agent (OPA) to test your policies. More details can be found in the Policy Testing with [OPA documentation](https://www.openpolicyagent.org/docs/latest/cli/#opa-eval).

#### How can I assign the same delegate replica to all steps in my pipeline?
While there isn't a dedicated configuration option for this purpose, you can output the environment variable $HOSTNAME in a Shell script and refer the delegate selector of the subsequent steps to that output.
**Short example:**
```
# Step 1
name: select_delegate
identifier: select_delegate
spec:
  spec:
    script: |
      HOST_SELECTOR=$HOSTNAME
  ...
  outputVariables:
    - name: HOST_SELECTOR
      type: String
      value: HOST_SELECTOR
# Step 2
name: use delegate
identifier: use_delegate
spec:
  ...
  delegateSelectors:
    - <+execution.steps.select_delegate.output.outputVariables.HOST_SELECTOR>
```

#### Does the NextGen platform support the same cron syntax for triggers as the FirstGen platform?
Yes, the NextGen platform supports both the QUARTZ and UNIX syntax formats for cron triggers. You can find further details in our documentation here: [Schedule Pipelines Using Cron Triggers](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#schedule-the-trigger).

#### Can I get user group and user lists in CSV or Excel?
No, we don't support that feature currently.

#### What are the differences between the delegate tags formats?
* `XX.XX.XXXXX.minimal`: This tag represents the minimal image format, which is recommended for production usage. It stands out due to its absence of high or critical vulnerabilities, making it a secure choice. Furthermore, this image format is lighter than the default option because it doesn't have the default binaries installed.
* `23.XX.8XXXX`: This format corresponds to the standard delegate image. It includes all the default binaries and is a suitable choice for users who are relatively new to Harness and do not have stringent security requirements. This image provides a comprehensive set of tools and functionalities for general usage.
* `1.0.8XXX`X`: This format denotes an older version of the delegate, often referred to as the legacy delegate. New Harness accounts no longer include this delegate version, and users are strongly encouraged to migrate to the standard delegate for better compatibility, performance, and security.


#### Do we not have OOTB roles at the project level?

Yes, we do have a Project Admin role built in and also no ability to delete built in roles. Org and Project specific built-in roles are available only after the corresponding entity is created and they are only available in the respective scope.

#### What is the reason of delegates to be blacklist?

The logic of blacklist of delegates is that every delegate task has one or more that one validation/capability check, when the task comes, we see if we ever has done validation for the capability. This is cached for 6 hours so if we have validated connectivity it will be valid for 6 hours, if this is the first time or 6 hours are passed, then will execute the validation logic, if the validation fails, the delegate is blacklisted for the criteria for 5 mins and if within five minutes a task with same critieria comes then delegate will be blacklisted for it.
So check what validation crieterias were added in the task and what validation is failing.

#### What are the  K8s version requirements for Delegate installations?

We try to support all the active K8S releases (that’s last 3 releases according to our versioning policy), i.e. we support anything that’s not EOL.

#### Can we increase the daily deployment limit to 10000 for a customer?

Yes, we are capable of increasing the daily deployment limit > 10000 per day.

#### How the delegates share information like a Helm Chart and its contents on the same stage?

It is divided in two steps first is to download the values.yaml files on any of the delegate (it could be just a 1 or more delegates depending upon how many values.yaml have been configured) and then pass them to the next step. Then delegate downloads the Helm chart and then use the values.yaml files that were passed by the previous step.
So,  Delegate 1 executed the Fetch Files will pass the values/manifests to Delegate 2 that will execute the Helm Install/Apply.

#### How do the delegates communicate with each other when they are sharing information?

The delegates don't communicate with each other. They go through the manager(Harness) to retrieve the result of the tasks performed by another delegate.

#### Do the customer files are stored in the manager during the execution while the Delegate 1 is communicating directly with Delegate 2?

We don't store the customer's manifest files in the Harness Manager. Only values.yaml files are passed through the Manager(Harness).

#### Do the secrets in values.yaml files are rendered on the manager(Harness)?

No, these secrets are never rendered on the manager(Harness). They only get rendered in the delegate.

#### Is it possible to define per User Groups who can/can’t open support tickets?

Currently anyone in the account would be able to open a ticket, and access is not restricted.

#### How can I see who's logged into my account?

You can use the audit trail (https://developer.harness.io/docs/platform/governance/audit-trail/)

#### Do we have any docs for install and upgrade the SMP cluster?

Yes, we have the docs, you can refer to this [Documentation](https://harness.atlassian.net/wiki/spaces/~63f950e3e76fc61320f65127/pages/21474541915/Internal+-+Install+and+upgrade+SMP?atlOrigin=eyJpIjoiOWJlMDhlNDJhZjM2NGUyN2E2MGU2ZDRkODQwZjUxZmQiLCJwIjoiY29uZmx1ZW5jZS1jaGF0cy1pbnQifQ).
#### How to retrieve the correct author's email on a GitHub Pull Request Event?
When you push commits from the command line, the email address that you have configured in [Git](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address) is associated with your commits. However, for web-based operations, GitHub provides an option to maintain privacy regarding your email address. To ensure that you can fetch the correct user email through the expression `<codebase.gitUserEmail>`, you will need to disable the ["Keep my email addresses private"](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address) option in your GitHub settings.

#### Why is my commitSha resolving as null on manual runs?
The expression `<+trigger.commitSha>` is available when the event comes from a Git operation. Instead, use the expression `<+codebase.commitSha>` for parsing manual triggers.

#### How can I specify my pipeline to select a delegate based on a tag?
In the advanced tab of your pipeline, you can add specific tags in the [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#delegate-tags) field.

#### How can I prevent lockouts when using SSO for login?
To prevent lockouts or in case of OAuth downtime, a user in the Harness Administrators Group can utilize the [Local Login](https://developer.harness.io/docs/platform/authentication/single-sign-on-sso-with-oauth/#harness-local-login) URL [http://app.harness.io/auth/#/local-login] to log in and update the OAuth settings.
For the Harness production cluster *prod-3*, the local login URL is [https://app3.harness.io/auth/#/local-login].

#### How can I autoscale a delegate using HPA?
By default, Helm delegates have autoscaling disabled, which you can enable by setting the value autoscaling.enabled=false. For Kubernetes delegates, you need to write an HPA manifest to scale the delegate's replicas.

#### When defining a secret with a dollar sign, the shell prints the secret partially
Harness doesn't allow the `$` symbol in your secret value. If your secret value includes this symbol, you must use single quotes when you use the expression in a script.

#### How can I access comprehensive information on Harness Security, including disaster recovery procedures, infrastructure details, and policies?
For in-depth insights into Harness' security practices, including disaster recovery procedures, infrastructure aspects, and policies, we recommend visiting our [Trust Center](https://trust.harness.io/). This centralized resource is designed to provide you with all the necessary information regarding the security measures we have in place to safeguard your data and operations.

#### How do we provision users with pre-defined or custom roles?
With Harness, users and groups can be created automatically via SCIM. Permissions in Harness are granted via roles. You can use built-in roles or create your own at every Harness level (Account, Organization, and Project). You can assign roles to groups, and assigning roles to groups gives all the users in the group the permissions spelled out in the role. You can read all about it here: [Role-Based Access Control (RBAC) in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/).

#### My delegate shows that it will expire in 2 months. Will my delegate be shut down after?
Harness follows an N-3 support policy for delegates, which means we support the current version and the three preceding versions. With a new version released approximately every two weeks, each update brings enhanced features and general fixes. For instance, if you have version `23.03.XXXXX` installed, all images from `23.01.XXXXX` to `23.03.XXXXX` are supported. Delegate expiration doesn't imply that the delegate ceases to function. However, it may lead to potential issues if the backend advances significantly, causing the delegate to lose backward compatibility. To avoid this, we recommend upgrading the delegate at least once per quarter if you don't have [automatic upgrades](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#how-automatic-upgrade-works-in-the-kubernetes-manifest) enabled.

#### How do I create a custom URL for my Harness account?
If you want a vanity URL, you can reach out through our support and request to create a custom subdomain, for instance: `mycompany.harness.io`.

#### How do I identify files changed in a git push event?
We don't support this feature natively, but you can write a similar script to the following:
```
# Get commits from the payload
commits='<+trigger.payload.commits>'

# Extract the values of added, removed, and modified attributes using string manipulation
added=$(echo "$commits" | sed -n 's/.*"added":\s*\(\[[^]]*\]\).*/\1/p')
removed=$(echo "$commits" | sed -n 's/.*"removed":\s*\(\[[^]]*\]\).*/\1/p')
modified=$(echo "$commits" | sed -n 's/.*"modified":\s*\(\[[^]]*\]\).*/\1/p')

# Remove the square brackets and quotes from the extracted values
added=$(echo "$added" | tr -d '[],"')
removed=$(echo "$removed" | tr -d '[],"')
modified=$(echo "$modified" | tr -d '[],"')

# Concatenate the values into an array
array=($added $removed $modified)

# Print the concatenated array
for element in "${array[@]}"; do
    echo "$element"
done
```

#### What rate limiting policy does Harness employ for API requests?

Harness imposes a rate limiting policy on API requests to ensure system stability. This policy sets a limit of 350 queries per minute (QPM) and 5.833 queries per second (QPS) for all external-facing APIs.

#### How is the rate limit calculated?

The rate limit is imposed based on both QPM (queries per minute) and QPS (queries per second). If an account exceeds 350 QPM or 5.833 QPS, the requests will be throttled for all external-facing APIs.

#### How does the Rate Limiter work within a minute?

Within a minute, the Rate Limiter dynamically allocates time intervals. For 50 seconds, it allows up to 6 QPS, and for the remaining 10 seconds, it restricts the rate to 5 QPS.

#### What happens when the rate limit is exceeded?

If the rate limit is exceeded during API requests, you may encounter HTTP status code 429 (Server Errors) indicating that the rate limit has been exceeded. This is a temporary restriction, and it is recommended to wait until the rate limit resets before making additional requests.

#### How can I pass input variables to pipelines using a custom Curl trigger in Harness?

You can pass input variables to a pipeline using a custom Curl trigger in Harness by making a POST request to the Webhook URL associated with the pipeline trigger. You can include your custom variables as JSON data in the request body. Here's an example command:

```shell
curl -X POST -H 'content-type: application/json' \
--url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=&orgIdentifier=default&projectIdentifier=CD_Docs&pipelineIdentifier=Triggers&triggerIdentifier=Custom' \
-d '{"sample_key": "sample_value"}'
```

Replace `{"sample_key": "sample_value"}` with your custom variables, such as `{"tag": "stable-perl"}`, which can be declared as part of the pipeline and provided as runtime inputs when triggering the pipeline.

#### What should I do if I want to update an existing User Group in Harness, but I encounter an error preventing me from saving the changes?

If you encounter an error when attempting to save changes to an existing User Group in Harness, particularly an error related to the Harness Identifier, it may be due to a restriction on naming Entity identifiers. According to Harness design specifications, certain characters, such as hyphens (e.g., "-"), are not allowed in Entity identifiers.

#### Why am I experiencing this issue with User Groups?

This issue can occur if a User Group was provisioned via SCIM (System for Cross-domain Identity Management) before October 2022, and it contained a hyphen ("-") in its name. At that time, the hyphen was allowed, but the design restrictions have since changed.

#### What is the recommended resolution for this issue?

To resolve this issue, you need to de-provision the affected User Group from Harness and then provision the same User Group again. This will create a new Harness Identifier for the group, ensuring that any naming restrictions are applied correctly, and it should no longer contain hyphens or other disallowed characters.
 
#### Why Harness delegate instance status is showing Expiring in 2 months but the latest version is valid for 3 months?

For the immutable delegate instance status we will show Expiring in 2 months only, it's the expected behaviour.


#### Why am I not seeing my deployments in the Overview page of the project? 

Please check the timeframe for the page. By default the timeframe is set to 30 days. You can adjust this to a different time frame. 

#### Harness dashboard is not showing a previous deployment, why? 

Please check the timeframe for the dashboard page. By default Harness sets this value at 30 days. It is possible that the deployment was executed before this timeframe. 

#### When we recommend setting `POLL_FOR_TASKS` to true in a non production environment?

For customers who do not want to take the web socket path due to any infrastructure challenges, we recommend enabling POLL_FOR_TASKS.
For customers with polling enabled, delegate checks with the harness for any task to execute based on the interval set, versus web socket communication being immediate.

#### Is polling mode works only for legacy delegates, not for immutable delegates?

Currently Polling only support for legacy delegates, not for immutable by default. Polling mode works for immutable delegate too, if you add `POLL_FOR_TASK` as true in yaml.

#### what does it mean by `Delegate Identifier=DETECTING`?

`Delegate Identifier=DETECTING` is auto upgrade which can be on or off, for more details you can refer here [Documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#determine-if-automatic-upgrade-is-enabled).

#### What is cron job in k8s manifest and why it is needed?

The Kubernetes manifest has a component called upgrader. The upgrader is a cron job that runs every hour. Every time it runs, it makes a call to Harness Manager to determine which delegate version is published for the account. The cronjob is required for Auto upgrade flow.

#### How can we disable cron job?

If you need auto upgrade to be disabled they can perform operations: First run the following command to suspend auto-upgrade on the installed image: `kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>` Secondly in the delegate manifest, locate the CronJob resource. In the resource spec, set the suspend field to true: `spec: --suspend: true` .

#### When do we have Services and Environments available at Org and Account Level in SMP?

This `CDS_OrgAccountLevelServiceEnvEnvGroup` FF is required to have Services and Environments available at Org and Account Level.

#### Why we do not see Dashboards in an SMP Installation?

Dashboard is a licensed functionality. To enable it you need to get a license.

#### How are Harness secrets tied to connectors. 

Customers should be mindful of the fact that connectors are often tied to a secret (password or sshkey) that may expire. This is often a common cause of execution failures with connector errors. 


#### How to avoid pulling Harness delegate images from a public repo?

You can add special Harness Container Image Registry connector to your Harness account. With this connector, the Delegate pulls these images from the Harness Container Image Registry only. 

See link for more details (https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/)


#### Does Harness Support Google cloud functions 1st Gen and 2nd Gen?
Yes, Harness supports both 1st gen and 2nd gen. 

See: (https://developer.harness.io/docs/faqs/continuous-delivery-faqs/#google-cloud-functions)

#### How can I use Harness CD with Google Cloud Functions?
Harness CD pipelines help you to orchestrate and automate your Google Cloud Function deployments and push updated functions to Google Cloud.

See: (https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func/)

#### I'm getting the error Unsupported block type with the Run on Remote Workspace (https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#run-on-remote-workspace)

It might be due to the configuration.  Try this instead for the terraform config file:
```
terraform {
  backend "remote" {
    hostname     = "http://app.terraform.io "
    organization = "your-organization"
    workspaces {
      name = "your-workspace"
    }
  }
}
```

#### What are delegate rings?

Harness uses the ring methodology commonly used in software release management for delegate releases.  There are 4 rings and to mimimize impact should issues occur on new delegate releases each Harness account is designated a specific ring which correlates to the latest delegate version for that account.

#### I have automatic upgrade on in my delegate.  Why is my delegate version behind what's listed as the latest version in dockerhub (https://hub.docker.com/r/harness/delegate/tags)?

Harness uses the ring methodology commonly used in software release management for delegate releases.  The version for your account could be overriden to use the latest in Dockerhub using the API: https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/overrideDelegateImageTag

#### The reset password link keeps sending me back to the login page. What gives?

In the account password authentication might be disabled with another auth enabled such as Active Directory.  Reach out to your Active Directory Administrator in that case to reset

#### How can I restore deleted projects and pipelines ?

Unfortunately, we don't soft delete entities and hard delete them.  Therefore there is no easy way to restore.  Some entities can be restored using YAML from the audit trail.

#### We don't have certain projects but the harness terraform modules continue to read them in. We want to remove these unwanted data if exist in harness. Please assist on it ?

Potentially they could still be in the state file if changes were made outside of the it.  Inspect your state file

#### I am getting an error as follows `Error Summary Invalid request: At least 1 valid user group is required in [Approval]`. What is that I am doing wrong here?

The variable being passed for the Approvers > User Groups is potentially invalid or at the wrong scope

#### Can I use the delegate image from my immutable delegate and replace it in the YAML for the statefulset from the legacy delegate ?

This is not supported.  The immutable delegate image should be run with delegate yaml generated from the UI which will generate a deployment if immutable delegate is enabled for the account https://apidocs.harness.io/tag/Accounts#operation/isImmutableDelegateEnabled

Here is an example manifest file for NextGen:
https://developer.harness.io/docs/platform/delegates/install-delegates/overview/#example-manifest-file

#### When creating a connector via the API (https://apidocs.harness.io/tag/Connectors#operation/createConnector)
We receive the following error
`requests.exceptions.HTTPError: 400 Client Error: Bad Request for url https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=<ACCOUNT_IDENTIFIER>?`

This could be due to using invalid characters in the name such as `()`

#### Is TLS 1.3 supported ?

Both the Harness Delegate & SaaS support TLS 1.3 and in fact this is the default TLS version.  Technically however each specific task implementation can create it’s own separate HTTP client that advertises whatever TLS version they choose and the connector check is using task specific HTTP client and not delegate's HTTP client. There are some tasks that are preferring TLSv1.2 in some use cases (possibly due to legacy reasons). Note that this may change in the future and full TLS 1.3 support can eventually be rolled out but as of yet there are some specific connectors that prefer TLS 1.2.

#### Is there a tool to migrate from FirstGen to NextGen ?

Yes.  You can use https://harness.github.io/migrator/

#### Is there a timeline of when I need to upgrade to NextGen by from FirstGen?

Yes.  It's outlined here in the documentation https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd/#timeline

#### Where can I find the source code to the Harness Delegate ?

Here is the link to the source code for the delegate:
https://github.com/harness/harness-core/tree/develop/260-delegate

#### Where can I find the source of the helm chart for the delegate ? 

Here is the source of the helm chart for the delegate:
https://app.harness.io/storage/harness-download/delegate-helm-chart/

#### Where can I find the release notes for the delegate ?

These would be the release notes for the delegate:
https://developer.harness.io/release-notes/delegate

#### Why is automatic upgrade turned off for my delegate ?

It could be it was disabled through `kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>` or the cronjob was deleted or the cronjob never existed (the kubernetes audit logs can help you find out about that last part)

#### Do we have documentation for correct list of harness that can whitelist for Google GCP?

Yes, we do have, you can refer here [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/).

#### Do we have a feature to route info/error diagnostics through harness network?

Currently this feature is not live yet, Delegate sends info/error diagnostic logs directly to harness Stackdriver in google cloud. This traffic doesn’t go through harness network, but difrectly to google cloud network. There is an option to disable this if customer doesn’t want to send diagnostic logs at all. 

#### Do we have a documentation for add and reference text secrets?

Yes, we do have, you can refer here [Documentation](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier).

#### What is the expression we can use if we want to use secret in script?

If you want to use a secret in script then you’ll have to use expression: `<+secrets.getValue("account.mySecret")>`.

#### The harness delegate config-watcher is causing heavy usage of disk space and causing alerts in prod nodes, how can we increase the watcher memory settings?

they can overwrite the watcher memory setting via `WATCHER_JAVA_OPTS`,  if you want to increase the memory for watcher they can add the following in the delegate yaml env section `- name: WATCHER_JAVA_OPTS value: "-Xmx512M"`

#### Can scope creation happen during delegate install?

scope of delegate is decided by the scope of delegate token. You can refer the documentation here[Documentation](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-scope).

#### Is it possible to increase the client side timeout when getting pods in K8s delegate?

Yes, you can increase the step timeout.

#### How can we enable the FF `DELEGATE_TASK_CAPACITY`?

You can refer the documentation here [Documentation](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-task-capacity).

#### Do we need to provide both `sso_group_id` and `sso_group_name` and should they match?

Yes we need to provide both, The value provided for both `sso_group_id` and `sso_group_name`  should be same.

#### OKTA login goes to gen1 interface
Need to change Default Experience to Harness Next generation under Account Overview

#### How to scale delegate replicas
You can update autoscaling parameters in values yaml
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80

#### Approval notification is not getting triggered inspire of correct user group is selected
Please check and verify if the user group selected has any channel(email/slack etc) is configured under Notification Preferences

#### Do we need to enable authorization for sso needs to work while setting up saml.
Authorization is used for group mapping and its optional and not required for sso login to work

#### How to use custom helm3 version in CG legacy delegate
You can install the latest version and need to set the env variable till the binary path HELM3_PATH=/opt/harness-delegate/client-tools/helm

#### For the delegates hosted on Azure VM, which authentication method should we use when setting up a vault connector?

For Hashicorp Vault there are the 5 types of Auth supported. Except AWS Auth and Token(not advised as needs periodic renewal) any of other 3 depending on your setup and preference should work. For more details you can refer [here](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault#step-2-overview).

#### How can we export all current gen information: deployments, services, env, etc, which has been deployed?

You can refer to these [documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/export-deployment-logs/) and for audit trail API [this](https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-audit-trails-api/).


#### Are trial accounts able to use the GitHub connector to attach their GitHub account?

Trial accounts should be able to use the same functionality as paid ones during the trial time period.


#### At what port are the delegate prometheus metrics exposed?

The delegate prometheus metrics are exposed on the port 3460 in the running delegate container

#### How do I check for the listen ports on the delegate if netstat is not installed?

You can run the command `lsof -nP -iTCP -sTCP:LISTEN` or install netstat or bake it into the delegate image

#### What prometheus metrics are exposed on the delegate?

The list of prometheus metrics exposed on the harness delegate are listed in the documentation at the following page https://developer.harness.io/docs/platform/delegates/manage-delegates/delegate-metrics/

#### The Harness delegate went down and I did not get any notification via prometheus that it was in a disconnected state.  What gives?

When the Harness delegate pod goes down so does it's exposed metrics endpoint as well.  The metrics here can help notify you if connectivity is lost between the Harness manager and the delegate pod itself (but obviously still present to your prometheus server to notify you as well)

#### What API can be used to check for delegate connectivity status?

The following API can be used to check for delegate connectivity status https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/listDelegates

#### For legacy delegates that are not starting up and creating a .hprof file in the container what should I do?

For the statefulset updating the environment variable "WATCHER_JAVA_OPTS" with "-Xmx512m" may help

#### Deploy stage requires a service defined. Can I set up a pipeline without a service defined at a stage? 

Yes, you can use the custom stage. This is a selection you can make initially while defining a Pipeline stage. 

#### What if I just want to execute a simple shell or bash script step, how can I do this?

With a custom stage, you do not need to define a service. This would be an ideal method of executing a shell or bash script step. 

#### Is there a way to create delegate tokens via API calls in which we can do the API call for token creation and use in personalized way?

Yes there is way to create delegate tokens via API calls, for details you can refer [here](https://apidocs.harness.io/tag/Delegate-Token-Resource#operation/createDelegateToken).

#### Do harness support Worklaod identity federation for authentication?

We support workload identify for Google Secret Manager.

#### Can we use alphanumberic on the delegate names?

Yes, you can use alphanumerics, but it should not start or end with a number.

#### Can you give details about recent changes to Harness Self-Managed Enterprise Edition?

Yes, you can refer to documentation [here](https://developer.harness.io/release-notes/self-managed-enterprise-edition/#self-managed-enterprise-edition).

#### If we have a main pipeline linked to a chain pipeline, when main pipeline gets executed which pipeline settings has precedence? For eg. main pipeline has notifications set, pipeline timeout set and chain pipeline is a template pipeline with notifications set, pipeline timeout set.

The notification/timeout settings for each entity will be honored as the pipeline progresses.

#### Can we use expressions in tags in delegates in NG like they used custom selectors in delegates in CG?

Yes, expression in delegate selections are supported. You can pass expression during delegate selection in pipeline. This will be resolved to the value of that variable. If that value is present as a tag in a delegate then that delegate will be selected.

#### What could be possible reason of getting the error `Error: Rate limit reached for tasks with rank IMPORTANT. Current task count 5985 and max limit 5000`?

This could happen when manager iterator is not running, there is a limit of 5000 delegate tasks at a time per account, but if iterator is not running, it will not get deleted automatically and this error arises.


#### Whether we can limit our account/org access only to our users and not to Harness users (even read-only access)?

This feature is currently available in CG, you can use `Restrict users to email domains` feature and only and set their email domain only. Also, there is a FF `LIMITED_ACCESS_FOR_HARNESS_USER_GROUP` which needs to be enabled.

#### The user is blocked because of entry not cleared for his prod2 account from gateway, What could be possible steps to login?

The user can directly login using deep link, https://app.harness.io/ng/account/AccountId/main-dashboard.

#### The user is unable to log in, they're getting unable to log in with SSO when we have SSO enabled on the account.

This is a very common scenario when users get this issue. The reason behind this is mostly that the User has signed up for a personal account or part of a different account that doesn't have the SSO enabled which is set as his default account. Hence User can log in using a username and password. If he has forgotten his password, he can always use the forgot password and then try to log in. 

#### Not viewing the Allowlist option under the account

The feature for allowlist is behind a Feature Flag PL_IP_ALLOWLIST_NG, kindly raise a ticket to get this enabled. 
You can refer to this [documentation](https://developer.harness.io/docs/platform/security/add-manage-ip-allowlist/)

#### Not able to setup/reset MFA

When the 2FA is set as force enabled on the account level by an admin of the account. The users will have to setup the 2FA for their profile. 
It can enabled by scanning the QR code sent in the email or using the secret key also sent in the same email using any authenticator app. 

#### Issue decrypting secret from Harness Secret Manager

When you are getting some errors for decryption of the secret in your pipeline. Always try to test the same secret using a shell script and try to print it.
The secret will always be printed in encrypted ******* so you don't have to worry about the value been shown but it will make sure to isolate the issue further if the secret itself is having the issue or the way it is been referenced. 

#### Issue while accessing other accounts when a user is part of multiple accounts.

Sometimes, this might happen due to some edge case where a user is somehow unable to access his other account when he is part of multiple accounts as the login mechanism works for the default account. The user can still try to get to his account (not the default one) by using the deep link. The deep link is nothing  y the full URL of the account he wants to access : 
https://app.harness.io/ng/account/**accountidhere**/main-dashboard

#### How to disable a pipeline

You can use the Deployment Freeze option :
 
[documentation](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/)

#### Slack Notifications are not working

In case your Slack notifications are not working, you can start by troubleshooting and validating the webhook for Slack and then check how the notifications are configured at the pipeline level or user group level. 
When executing the pipeline don't check the box for notifying only me. 

#### Harness NG project admin permission after creating a project

When you create a project using the API, by default the Project inherits the project admin permissions on creation from the Service Account where the API token was generated. 

#### Harness API Token validity

In Harness under Service Account when you create the token, the validity of the token depends on how the token was created. If you have specified the expiry date. In case you want the token to never expire you can set the expiration to No Expiration option. 

#### Providing Access to Specific Pipelines in Harness

You can make use of the RBAC [documentation](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/)
You can create a resource group and pick specific pipelines to have specific RBAC access to. 

#### Not able to remove a pipeline

In case of force deletion of Harness Resources : 
Account resources --> Default Settings and then under General enable the "Enable Force Delete of Harness Resources
and then try to delete the pipeline from Harness UI. This option is force deleted for entities. 

#### VAULT operation error: Decryption failed after 3 retries for secret

Someone times you see this error on the execution of the pipelines. We might have these errors due to the network the delegate is either down or has issues connecting to the Vault where the secret is created. The first thing is can do is validate the delegates are up and running go the connectors used in the pipelines and do a connectivity test. In case that fails then login to the delegate and try to reach the connector URL from the delegate.  

#### Can old email be changed in user account

If the Users are provisioned via SCIM then you can just update the email in the SSO provider end and they will get updated in Harness. 
If the users were added manually you will need to remove them and add the new emails. 

#### Problems enabling mTLS - Error [IOException: Unexpected response code for CONNECT: 403]

When mTLS has been enabled for your delegates, you might see the 403 errors, this could be due to the proxy not resolving harness domain app.harness.io from the delegate. 

#### I'm trying to confirm is that if I create a role at an account level with Administrator privileges. Then apply this to a particular resource group that only has scope for a specific Harness Organisation, won't this just provide admin access to this organization?

The advised way to achieve your use case is to create user with minimal access at account level then add the same user at required organisation level with the admin access so that you can control user RBAC at org level scope.

#### Changes identity provider to OKTA from some other provider

This is the document which talks about OKTA SAML setup with Harness : [documentation](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/), 
When you will be setting up a new OKTA SAML and then migrating your users to it,  You will need to setup the same with Harness as mentioned in the above document , as Harness needs the metadata XML file from OKTA with the configuration. 
 
The permissions for Harness are managed by the User Groups present in Harness. In case of authorization, the user groups from SAML app are linked to Harness Local User groups. 

#### Is there an easy way to see the de-factor roles/permissions assigned to a user

You can view all permissions for a user by going to Access Control --> Search for the User click on it. Click on Role Bindings and you can see permissions for the user with the scope, All, Account, Organisation and Organisations with Projects in one place. 
If you need to see the permissions inside of a role say Account Viewer or any custom-created role and same with Resource Group then you will always need to individually click on that specific role/ resource group as it's not shown on the user permission page. 
 
We only show the Account/Project/Organisation level permissions with the role-resource group with where it is assigned at and assigned through in case of a User group or directly. 

But you can view all of them together by selecting the scope to All instead of Individual. 

#### I need to create an AWS Secrets Manager reference type secret. I am not sure how to accomplish it. Is the "secret_manager_identifier" for the AWS Secrets Manager secret name?

The secret_manager_identifier will be the identifier if your AWS secret manager which you added in your Harness as a connector. 
Also, The secrets need to be stored in the same scope of the secret manager. So for account secrets they will be stored in the account secret manager.

#### RBAC for pipeline to hide few pipelines

We don't have the hide pipeline functionality. 
The way you can do this is to create a role and resource group with specific pipelines and assign it to the Users, the users can view the pipelines but will be able to execute them based on the Resource Group assignments. 

#### Delegate Token behaviour

Token revocation is done server side. We have a 20 minutes cache, so the delegate will be disconnected within 20 minutes of the token removal on the server side.
The Token is used in heartbeat but is loaded at the delegate process startup. Changing the token delegate side requires a restart of the delegate process (cycle).

#### How to view the secrets value stored in Harness Secrets Manager

As the secrets stored in Harness are saved as encrypted hence you can't see the value for those secrets from the Harness UI. 
There would be a tidy way to print it using a pipeline execution. 
 
Create a shellscript execution , add 2 different shell script steps, do specify the same delegate selector. 
In shell script 1 : 
```
echo "text secret is: " <+secrets.getValue("printsecret")> >> /tmp/abc.txt
```
Here printsecret is the secret name. 
 
in 2nd shell script : 
 ```
cat /tmp/abc.txt
 ```
The first shell script will output like : 
 ```
text secret is: **************
 ```
but the second one will print the value for the secret : 
``` 
text secret is: hellohello
 ```
Also, if you try to do the cat in the first step it won't print the secret in plain text. 

#### How can we forcibly disconnect a delegate and delete it as admin?

As Harness Delegates are managed by customers in their own infrastructure, Harness doesn't have any control on it. 
Harness can't control the delegates on your infrastructure. 
 
In Harness's architecture, the delegates in your infrastructure connect to the Harness Manager :
 
https://developer.harness.io/docs/getting-started/harness-platform-architecture/#harness-platform-components
 
Hence you will need to stop the delegate service in your infrastructure. 

There is another way to remove the delegate is, you will need to revoke the token used by the delegate and it will get disconnected and then auto-deleted in 7 days.

#### Is there a limit to the number of pipelines a project can have? What is the character limit on pipeline names?

We have no limit for pipeline creation. 
But the pipeline name character limit is 128 characters. 

#### Data Deletion handling for exiting customers

The process is simple when a customer account expires or leaves/churns/offboards. All the data for the customer is cleaned up after the expiry or churn/offboarding.

#### Delegate disconnected status in the API

```
{delegateList(filters: [{accountId: "xxxxx"}], limit: 10) {

    nodes {
      delegateName
      ip
      status 
      disconnected
      version
      hostName
      lastHeartBeat
     }
   }
 }

```

#### How to deploy Delegate in Amazon ECS for Harness NG

The Harness Delegate is a software that gets installed in your environment which connects to Harness Manager and performs Continuous Delivery/Continuous Integration tasks.
In the Harness NextGen, ECS delegate can be deployed as a docker delegate both for ECS and ECS Fargate. This tutorial shows you how to install the Harness Delegate in an ECS cluster as an ECS service to enable the Delegate to connect to your AWS resources.

https://discuss.harness.io/t/how-to-deploy-delegate-in-amazon-ecs-for-harness-ng/13056

#### I use a Slack bot to send messages about test job results. I couldn't find a variable for job URL

For the pipeline execution URL: <+pipeline.execution.url>
 
https://docs.harness.io/article/lml71vhsim-harness-variables#pipeline_execution_url

#### Harness Hosted Gitops IP Address

Access to Kubernetes clusters that are behind strict firewalls and are not accessible from the public internet is controlled through authorized IP addresses. To allow access to these clusters, Harness provides a list of IP addresses that need to be configured on the clusters.

https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/

#### Info of connected delegate when it's started connected to Harness

The delegate initiates communication on its startup to the Harness Platform. There is also a heartbeat connection every 60 seconds from the delegate to the delegate harness to notify that it is running.

#### Understand the logic behind the six-letter account identifier that Harness uses while creating the delegate

This identifier refers to your account, without this, we don't know how to link old pod lifecycles and new ones, hence we will treat them differently as pod names and pod IPs change. 

#### How Vault agent secret manager actually works with vault

The below article talks about how secret manager works with vault :

https://discuss.harness.io/t/vault-how-to-use-the-new-vault-agent-integration-method-with-harness/784

#### How Harness is able to prevent tampering of artifacts and instructions from the customer infrastructure. Sounds like TLS is used, but what specific integrity checking approach is used to check instructions are not changed in flight?

Details below for the protection details for the below Artifact Sources :
 
Related to SSH/WinRm NG
 
Artifactory
For downloading artifacts from Artifactory to delegate, we are using org.jfrog.artifactory.client:artifactory-java-client-api:jar:2.9.1
This is the maven repo : https://mvnrepository.com/artifact/org.jfrog.artifactory.client/artifactory-java-client-services/2.9.1 and we see that there are reported vulnerabilities for this lib version. We are working on updating the above lib to the version without vulnerabilities and we will be secure. If Artifactory URL is https, the calls are secure with TLS
 
AWS S3
For downloading artifacts from AWS S3 to delegate, we are using com.amazonaws:aws-java-sdk-s3:1.12.261 
We don't see any reported vulnerabilities : https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3/1.12.261 we are secure.
AWS SDK makes HTTP calls in a secure way using TLS
 
Azure
For downloading artifacts from Azure to delegate, we are using okhttp-4.9.2.jar, we see there are reported vulnerabilities and we are working to update this lib : https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp/4.9.2
One note here is that updating this lib will be a long significant process which could last more weeks.
 
Jenkins
For downloading artifacts from Jenkins to delegate, we are using com.offbytwo.jenkins:jenkins-client:0.3.9,
Can't find any info related to vulnerabilities.
 
Nexus
For downloading artifacts from Nexus to delegate, we are using javax.net.ssl.HttpsURLConnection from Java SDK.
When downloading artifacts we are using SSL and we are secure here.
 
Artifacts will be downloaded on the delegate and it should be safe if the network where delegates are running is secure.
 
One note here, the chosen cipher suits depend on the remote server. During the SSL handshake the “server hello” message contains the Cipher suite chosen by the server from the list provided by the client (our side).


#### How do I make config changes to increase memory consumption in a delegate YAML?

You will have to make config changes in your delegate YAML to increase memory consumption. This can be done by setting the value in JAVA_OPTS to increase the Xmx value

#### What is the Xmx value in the JAVA_OPTS setting?

The Xmx value is a parameter used to specify the maximum heap size for a Java virtual machine (JVM) when running a Java application. It determines the amount of memory the application can use for its operations.

```
name: JAVA_OPTS
value: "-Xms64M -Xmx8192M"
```

#### What is the API used to pull a list of users and their roles from a specific project?

You can refer these docs [here](https://apidocs.harness.io/tag/Project-Role-Assignments#operation/get-project-scoped-role-assignments).

#### Do we have RBAC permission on Audit Trail like we have in CG?

This feature is not in NG as of now, but we do have viewer permissions in place.

#### What is advisable to retain your current configuration during the Harness installation process?

Harness recommends that you keep your existing Java KeyStore in place during the installation process. Updating the KeyStore may cause issues with your delegate. For more on this please read the following [Documentation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/)

#### What is `linkedSsId` in SSO groups ?

`linkedSsoId`  is the uuid of SSO setting creating in Harness.

#### What is the purpose of `linkedSsoDisplayName` ?

`LinkedSsoDisplayName` is the same SSO setting name in Harness. For SAML the value provided for both ssoGroupId and ssoGroupName  should be same.

#### How can we implement an approval mechanism for authorizing the deletion of marked accounts to prevent accidental deletions and ensure that the right accounts are flagged for deletion?

The implementation of this feature is currently pending. Presently, the ability to mark accounts for deletion is allowed through the "update account" permission in the admin tool, which has been granted to a wide range of users.

#### How are Create APIs supposed to work as if we are creating API it won't be having permission and will return false? How do we restrict creation of resources?

There are two types of scope, one is complete scope(which indicates ALL) and the other is specific. 
- To allow creation of entity in certain scope, it means allowing to creation that entity at complete Scope level(which indicates ALL). 
- If the usecase is  to allow Create Goverance policy at scope and restrict edit to specific policies then ideally we should split it into specific Create and Edit permissions.
- And then define 2 Role Assignments.
One with Create and All Goverance policy.
One with Edit and Specific selected Goverance policies.

#### What is diffrence between `terminationGracePeriodSeconds` and `preStopHook` ?


- `TerminationGracePeriodSeconds`  - This is used to allow the main process (delegate) to delay the shutdown so that this process can perform some cleanup. The key here is that container shutdown is delayed by UP TO the specified duration. This works by delegate specifically handling SIGTERM kill signal.

-  `preStopHook` - This is used to allow any other kind of cleanup outside of the main process (e.g. one wants to save files, make database backup etc..). This hook runs IN PARALLEL to the terminationGracePeriodSeconds not before, but before delegate process shutdown is triggered (i.e. before delegate process receives SIGTERM). So if the grace period expires the hook will be killed as well.

#### What is the impact of having one less delegate instance during a task with a long terminationGracePeriodSeconds for reasons other than upgrades?

Having one less delegate instance during a task with a long `terminationGracePeriodSeconds` for reasons other than upgrades can impact the availability of delegate resources. Other tasks may fail to get scheduled because there are not enough delegates available to handle them. This can lead to inefficiencies and delays in task processing. It's crucial to consider the potential impact on the overall system and task scheduling when using extended termination grace periods.

#### What environment variable or Java option should be configured to stop exposure in the Gateway container when JWT is getting exposed?

- create a configmap containing the new logback.xml (everything set to level=WARN ) 
- mount it wherever and pass:
`-Dlogging.config=file:/path/to/mounted/logback.xml`
to the JVM via JAVA_OPTS in config.

#### We want to know the status (failed/pass) and reason for verification step using graphQL API
You can make use of workflow/pipeline grapnel api for execution and failureDetails field will give you desired information.

#### We have enabled NG but after login we are still getting redirected to CG
Make sure you have set the Default Experience as NG under  Account overview page

#### Does Harness CG/NG saml setting is shared 
Yes if you have configured SAML on CG same will be used for login to NG

#### How to migrate user from CG to NG
Users needs to be migrated automatically once NG is enabled

#### How can be add admin in newly enabled NG account
Users from CG Administrators group should be automatically assigned as admin role in NG, they can change and create/update other role etc in NG

#### what is the role of "PROXY_HOST" in proxy.config?
This is the host address of your proxy, which you want to configure

#### If we enable proxy in delegate does that mean it is including all communication of "Connectors" - Artifact Servers, Source Repo Providers, Collaboration Providers? and also Cloud Providers?
Yes that’s correct any outbound connection made via delegate through Harness will use that proxy

#### Is it possible that one can manage org level entities at account level?

This is usecase of user-group inheritance,

- Create User Group at account scope.
- Inherit User Group at each Organization scope and create appropriate role binding.
- When trying to onboard new user to all this Orgs, all you have to do is to add that user in User Group and that will provide you access to all Org.
- This UG would still be managed to Account Scope.

For more details you can refer this [doc](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups#create-groups-by-inheritance).

#### Do we plan to support AsyncAPI specs (for messaging) in our Harness APIs?

This has not been planned yet.

####  How events are generated on Harness platform?

Audit Trail displays a record for each event of the Harness account, Modules, or Harness entities. You can refer this [docs](https://developer.harness.io/docs/platform/governance/audit-trail/).

#### Do we have some documnetation to know about the delegate size guidelines ?
 
Youcan refer to the following, [documentation](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-sizes) and also [here](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-requirements/).

#### Can a Golang service directly provide a secret reference to an internal API and receive the decrypted secret ?

Yes, there is an internal API for that, with the limitation that only the secrets stored in Harness Built in Secret manager can be retrieved. You can refer [here](https://harness.atlassian.net/wiki/spaces/PLATFORM/pages/21192704698/Secrets+Decryption+API+Via+Manager). Please note that if the secret is stored in vault or customer’s secret manager then this won’t work.

#### Can i have a api to perform the operation of IP allowlist ?

These are APIs to create/update IP allowlist https://apidocs.harness.io/tag/IP-Allowlist#operation/create-ip-allowlist-config, Also you can refer [here](https://developer.harness.io/docs/platform/security/add-manage-ip-allowlist/).

#### Can we point auto update to our helm chart. Can we point auto update to a different registry?

You can set auto upgrade to true in the helm command and control the upgrade and the repository using [this](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

#### Can I use a "bindSecret" in Harness LDAP settings to avoid using an inline password, as suggested in the API documentation?

No, you cannot use a "bindSecret" in Harness LDAP settings to avoid using an inline password in NG LDAP. Currently, NG LDAP only allows for the use of an "INLINE" password. The appearance of "bindSecret" in the API documentation is due to a shared bean between CG and NG, and in CG, support for secret references is available. However, NG LDAP still requires an inline password, and this limitation should be considered when configuring LDAP settings in your environment.

#### Can we create a delegate token with the name using which it was previously created and then deleted ?

No it is not possible as same name is not possible within 30 days once it is revoked. There is a ttl for 30 days for deletion after revoke of token.

#### What is the expected behavior when a customer aborts a pipeline task, and what actions are taken to ensure a clean state in the system?

When you initiates an abort for a pipeline task, the expected behavior is to take actions to halt the task's execution as promptly as possible. 
we have a method, `io.harness.delegate.service.DelegateAgentServiceImpl#abortDelegateTask`, which is used to abort a task. This method typically leverages Thread.interrupt() to initiate the abort process. The key here is to interrupt or cancel the running task effectively.
An abort could leave the system in a potentially inconsistent or 'dirty' state, it's crucial to consider rollback procedures.
Delegate actions, such as canceling or ending running tasks, should play a central role in preventing system inconsistencies and maintaining system integrity.
=======
#### How to automatically start a delegate when running as a Docker container?

Docker provides restart policies to control whether your containers start automatically when they exit, or when Docker restarts. Restart policies start linked containers in the correct order. Docker recommends that you use restart policies, and avoid using process managers to start containers.
Including the flag `--restart` in the docker run command will configure it to always restart, unless the container is explicitly stopped, or the daemon restarts.
If restart policies don't suit your needs, such as when processes outside Docker depend on Docker containers, you can use a process manager such as upstart, systemd, or supervisor instead.
To use a process manager, configure it to start your container or service using the same docker start or docker service command you would normally use to start the container manually. Consult the documentation for the specific process manager for more details.
**Warning:** Don't combine Docker restart policies with host-level process managers, as this creates conflicts.
This information was provided by [Docker documentation](https://docs.docker.com/config/containers/start-containers-automatically/)

#### Which API Method to invoke a pipeline is the best when using multiple dynamic parameters?

It depends of your scenario. If you use the same set of inputs to invoke a pipeline, we recommend to use the API Method [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList). You can refer to an existing input set in the InputSet API method, so you don't need to specify all the parameters each time. For example, if you have a pre-defined input set for staging deployments, you can create an input set called "staging-inputset", as well as others for different environments. Then, you can use the `environment_name` to dynamically select the appropriate input set.
If your pipeline has a very specific context of each execution, where you need to pass different parameters on each execution, we commend to use the approach Execute a [Pipeline with Runtime Input YAML](https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetYaml).

#### Perpetual Task was not assigned to my delegate, what is most probably cause?

Generally, when a perpetual task wasn't assigned to any delegates, probably you have a conflicting delegate selector. When you use connectors like secret manager, git connector along with a delegate selector in the step, mind that the manager can combine selectors from those connectors and step in order to select the most appropriate delegate selector. Review your configurations in order to make sure the selectors are matching.

#### Is it possible to store a Shell Script Provision in a Git provider?

At the moment, you can only store Shell Script provisions in two ways: either as inline code or within the Harness file store. Regrettably, the option to store them directly in a Git provider like GitHub or Bitbucket is not available.

#### Is it possible to access vault secrets across different regions?

As long as your vault server in a specific region permits access from a delegate in another region, it should function properly. You can even attempt to retrieve secrets directly from this delegate host outside of Harness to resolve any access issues, and it should work with Harness as well. Additionally, you have the option to create separate connectors for each region.

#### Is there a difference between the NextGen delegates and the FirstGen delegates?

We have many architectural changes between our legacy delegate, which was deployed as a StatefulSet, in comparison to the new-generation delegates, also known as immutable delegates, which are deployed as Deployment-type resources.
Legacy delegates used to have both a watcher and a delegate process; however, immutable delegates only have one delegate process. The base OS has also changed. It was Ubuntu for legacy delegate images, but now it is RHEL for immutable delegate images.
Immutable delegates work with the first generation as well. If you have an immutable delegate installation in your first generation, you can reuse it with your next-generation instance. You will need to regenerate the token in the next generation and enable the "next gen" attribute of the delegate to true.
However, if you have legacy delegates in your first generation, you will require new delegate installations.

#### How to Deactivate Harness Secrets Manager Using API?

Unfortunately, at this time, there is no API or Terraform approach to achieve this configuration.

#### Is there a way to obtain data on monthly active users (MAU) on the Harness platform?

You can retrieve information about user logins from the audit log. If you need to do this through an API, we have an audit log API available. However, we do not have a consolidated view or report of all the users who have accessed the Harness platform. Nevertheless, you can use the audit log information mentioned above to obtain this data.

#### Can I safely utilize API Endpoints marked as beta?

API Endpoints labeled as beta have been tested by our teams and are generally safe for consumption. However, we caution against using them for critical workloads, as they are not classified as stable yet.

#### Can the Delegate's StatefulSet be scaled?

Yes, you can scale the Delegate StatefulSet. For more details, please refer to our autoscale documentation using replicas.

#### Why the delegate image is based on UBI instead of Ubuntu?

1. Security: UBI is considered a more secure option compared to Ubuntu in today's landscape. It benefits from Red Hat's rigorous security practices and is designed to be more resilient against vulnerabilities.
2. Compatibility: When you are running workloads on OpenShift, using UBI-based images is often the preferred choice. In some scenarios, Red Hat may even mandate the use of UBI-based images. This ensures compatibility and support within the OpenShift environment.
3. Customer Demand: We have received numerous requests from our customers to provide UBI-based images due to their security and compatibility advantages. In response to these requests, we have published UBI-based legacy delegate images.
4. Consistency: We are not only transitioning our delegate to UBI but also all of our SaaS offerings. This provides a consistent and unified environment across our services.
While UBI is the preferred choice, we want to emphasize that we do provide a Dockerfile for building an Ubuntu-based delegate image if you have specific requirements.

#### What is RBAC and how does one manage users and roles? 

Harness NextGen platform utilizes RBAC or Role-Based Access Control. Additional details on RBAC can be found in this blog post:

[https://www.harness.io/blog/user-role-management]


#### What are the main components of RBAC?

RBAC uses Principals, Resource Groups, and Roles to control access. 

Principals are entities taking action in the system. These include users, user groups, and service accounts.
Resource Groups define what objects can be acted on. Objects include organizations, projects, pipelines, connectors, users, and more.
Roles define what actions can be taken on objects. Actions include view, create, edit, delete, and so on.


#### What is Role Binding and how does it relate to Harness RBAC?

Role binding refers to the process of assigning roles and resource groups to principals (users, user groups, and service accounts). Role binding can be configured at all scopes.

#### Are there any built-in roles that I can utilize?

Yes, for more information on built-in roles, please see our RBAC doc: [https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/]



#### What is the best way of implementing the Harness RBAC?

Following a workflow can be a useful process for implementing and understanding RBAC: 

To configure RBAC in Harness, you must:

1. Create roles.
2. Create resource groups and, optionally, apply ABAC.
3. Create user groups, create service accounts, and add users.
4. Assign roles and resource groups to users, user groups, and service accounts.
5. If you have not already done so, configure authentication.

#### Is there additional information on build-in roles for Harness RBAC?

Yes, you can follow this doc on build-in roles: [https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles#built-in-roles]


#### What is a Resource Group?

Resource groups are an RBAC component that defines the objects that a user or service account can access. Objects are any Harness resource, including projects, pipelines, connectors, secrets, delegates, environments, users, and more.

More information on Harness Resource Group and managing this can be found here: [https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups]


#### What integration does Harness offer with SCIM providers? 

Harness integrates with multiple third-party SCIM providers

Okta SCIM: [https://developer.harness.io/docs/platform/role-based-access-control/provision-users-with-okta-scim]
Azure AD SCIM: [https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim]
OneLogin SCIM: [https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim]

#### What is Just-in-time user provisioning? 

Automated provisioning eliminates repetitive tasks related to manual provisioning and simplifies user management.

Just-in-time (JIT) provisioning in Harness lets you provision users automatically when they first sign-in to Harness through SAML SSO. Harness supports JIT provisioning only for new users logging in through an IdP, such as Okta.

JIT is currently behind a feature flag '''PL_ENABLE_JIT_USER_PROVISION'''

#### Is there an overview doc on Harness RBAC and permissions? 

Yes, please see this doc for more details [https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference]

