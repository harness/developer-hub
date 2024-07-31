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

#### Can I get user group and user lists in CSV or Excel?
No, we don't support that feature currently.

#### What are the differences between the delegate tags formats?
* `XX.XX.XXXXX.minimal`: This tag represents the minimal image format, which is recommended for production usage. It stands out due to its absence of high or critical vulnerabilities, making it a secure choice. Furthermore, this image format is lighter than the default option because it doesn't have the default binaries installed.
* `23.XX.8XXXX`: This format corresponds to the standard delegate image. It includes all the default binaries and is a suitable choice for users who are relatively new to Harness and do not have stringent security requirements. This image provides a comprehensive set of tools and functionalities for general usage.
* `1.0.8XXX`X`: This format denotes an older version of the delegate, often referred to as the legacy delegate. New Harness accounts no longer include this delegate version, and users are strongly encouraged to migrate to the standard delegate for better compatibility, performance, and security.



#### What is the best way to confirm if a delegate has root access?

To check if the delegate has root access, check the delegate manifest file for the following:
spec:
    containers:
    - image: harness/delegate:ng
      imagePullPolicy: Always
      name: harness-delegate-instance
      securityContext:
        allowPrivilegeEscalation: false
        runAsUser: 0
		
This confirms that the delegate has root access.



#### Does a code repository connector with type: platform (SCM git operations done by Harness platform service) require a delegate to be installed in my Harness account for any type of Git/SCM operation?

No, only when the delegate connector type is selected would the delegate be required, Harness platform code repo connector handles all operations so long as your repository does not filter any of the IP addresses listed here: https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips/#harness-manager




#### I have a variable named this-var and have assigned a value to this variable.  However, when attemtping to use the variable, the value always returns null even though I confirmed the value was assigned to the variable through the Harness UI.  Why is a null value being returned for my this-var variable?

Harness recommends not using hyphens/dashes (-) in variable names because these characters can cause issues with headers and they aren't allowed in some Linux distributions and deployment-related software.

However, if you need to reference a custom variable that includes a period or hyphen/dash in the name, you must wrap the variable name in double quotes and use the get() method in the expression, such as .get("some-var").

For example: <+pipeline.variables.get("this-var")>




#### How can I use an output variable from one step and use it towards a different step in another stage within the same pipeline?

One can consider using the expression <+exportedVariables.getValue("OUTPUT_VARIABLE"> where OUTPUT_VARIABLE is the output variable being assigned from the corresponding step.

1. Assign an Output alias within the step where the output variable is needed.
	- Select the step and click on Optional Configuration.
	- Under Output alias (optional) section, assign the following items:
		- Publish Variable Names (alias): the name of the variable we will reference in other sections of the pipeline.
		- Scope: Select the scope of where this variable will need access to.
		- Execution Target: Select On Delegate.

2. Move to the stage/step where the output variable will need to be utilized.
	- Utilize the expression where it is needed to be referenced.
		- <+exportedVariables.getValue("pipeline.OUTPUT_VARIABLE.STEP_VARIABLE"> where STEP_VARIABLE is the variable being used inside the step we are looking to grab the value for.
		
		
		
#### There is a list of servers and need to only run commands in a pipeline to a specific servers configured in an environment.  What would be the best approach?

Use the <+input> command to obtain the server name from the user at runtime.  Then, utilize a different stage to confirm that the server is part of the list of available servers, and can note to the user if the server does not exist.

One can also define allowed values by appending the .allowedValues() method to <+input>. For example: <+input>.allowedValues(server1, server2).  This way, the user can select the server at runtime based on the values available to them.




#### I cannot push a commit to a specific file via the Harness UI. I switched branch to a branch that already exists in the git repository, and forced it to reload from git. When trying to add a branch definition to this stage template, it infinitely loops with the error, "There is a new version of this branch."

In order to correct the error, "There is a new version of this branch," perform the following tasks:
- Refresh the cache and reload the entities from Git by selecting the Reload from Git option.
- A pop-up appears to confirm reload of the entities from Git.  Select Confirm.

If these steps still do not fix the issue, try a dummy commit on GIT and let the Harness UI update via webhook. Then, once it's updated, you can try and commit anything on Harness UI and it should work as expected.

If these steps fail, please contact Harness support and provide them a HAR file from your browser.




#### How can we customize the manual approval step so that the timeout can be adjusted based on the amount of time the user needs before running out of time to approve the request?

Within the pipeline, update the timeout field within the manual approval step to <+input>.
Once the user runs the pipeline, the user will be prompted to enter the timeout length to give enough time for the approver to approve the request.  The execution will be paused until the step is approved or denied.



#### We have a pipeline where there are multiple stages.  Is there a way to set up for each stage be accessible by a particular group?

A pipeline admin can place approvals as the first step in each stage.  This way, the people/groups that need to have the work done for this stage must approve the step in order for the stage to continue processing its execution.
 
Here's a link to read about how to add a manual approval step/stage: https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/



#### User is attempting to use the Bitbucket connector, but is getting the error message: When performing an edit, the authenticated user must have an e-mail address.

Check the service account being used to sync between Bitbucket and Harness.  Bitbucket may have removed the service account's email address.  Bitbucket forces users to have an email address, so this will cause an error on the Harness side if the email address is not present.



#### Is there any circumstance where a task from a pipeline execution will be sent to a delegate that is terminated due to a recent shut down?

There is no way a terminated delegate pod can pick up any task. This is due to the task allocation being done when the delegate is reaching out to Harness indicating that the delegate is available to execute task.
 
If the delegate accepted the task then it will finish even if a shut down is initiated. It is guarded by graceful shutdown.




#### What is the best way to confirm if a delegate is up and running from the Harness UI?

The Harness UI shows the connectivity status based on the heartbeat check which happens every 5 minutes.  One can access the delegate section either in the admin, org, or project level settings to confirm if the delegate is up and running.



#### Will Just-in-time (JIT) provisioning work for the local Harness login instead of using SAML SSO?

JIT can work only for IdP-initiated login. Please make sure the account ID is set up correctly in the IdP to direct the user to go to correct account.



#### Will setting up Just-in-time (JIT) provisioning work out of the box once the IdP is configured for it?

A feature flag is required on the account in order for JIT to work on a Harness account.  Please contact support to enable PL_ENABLE_JIT_USER_PROVISION on the account in order for JIT provisioning to work successfully.



#### What is required from Harness when configuring SCIM provisioning?

Requirement to configure SCIM provisioning within Harness is as follows:
- Admin access to the IdP
- Account Admin access to Harness
- Harness API key (API keys inherit permissions from the user they are associated with)
- Unexpired token that has all Users and User Groups permissions

NOTE: If the API key being used is from a service account from the IdP, please ensure the service account has all Users and User Groups permissions.



#### What are the pros and cons of utilizing Kubernetes Helm charts managed by Harness?

The pros for using Kubernetes Helm charts managed by Harness are as follows:
- Harness can orchestrate the Helm chart deployment in a Canary and Blue Green strategy.
- Helm is now focused to package your resources, not deploy your resources. How you deploy and roll out your resources is now sequenced and managed by Harness.
- Versioning: Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets.
- Rollback: In the event of deployment failure, Harness Kubernetes deployments will roll back to the last successful version via the versioned ConfigMap generated by Harness.

The cons for using Kubernetes Helm charts managed by Harness are as follows:
- Helm Hooks are not supported. You might want to split the Helm hooks into jobs.



#### What are the pros and cons of utilizing Native Helm charts managed by Harness?

The pros for using Native Helm charts managed by Harness are as follows:
- Rollback: Harness does not perform rollback. Instead, Harness uses Helm's native rollback functionality. This approach works well if you want to use your existing setup.
- Harness will honor the user's pre and post install hooks configured in the Helm chart.

The cons for using Native Helm charts managed by Harness are as follows:
- Versioning: Native Helm does not version deployments.
- No progressive deployment support. Also, Blue/Green or Canary deployment types are not supported (coming soon).


#### Will notifications be sent when the configuration already exists but the notification channel is disabled?

No notifications will be sent for that channel if that notification channel is in a disabled state even if the configuration already exists.  Once the channel is re-enabled, notifications will be sent once again.


#### How can we temporarily disable a notification channel without removing the configuration settings.

To disable a given notification channel, in Harness, go to Account Settings > Account Resources > Default Settings > Notifications, and then turn off the corresponding toggle.


#### Is there a way to disable notifications for a specific org or project without affecting the account level settings?

By default, all notification channels are enabled on an account.  Organizations and projects in the account inherit the account-level settings.  To disable, go to the org or project level settings, access resources, then go to the Notifications section to disable the corresponding notification in question.


#### What kind of notifications will we receive after notification configuration is completed for delegate events?

The following notitfications are configurable for delegate events:
- A delegate disconnects from Harness
- A delegate expires
- A delegate is going to expire in 1, 2, 3, or 4 weeks prior



#### Delegate notifications are not available by default.  How can we enable this feature?

Please reach out to Harness support and ask to enable the feature flag PL_CENTRAL_NOTIFICATIONS to manage notifications for delegates.


#### A delegate event notification was created, however, they are not being triggered.  Why are the delegate event notifications not being triggered?

Delegate event notification rules can be created, however, they will not work if they are not enabled.

To enable a delegate event notification rule:
- In Harness, go to Account Settings, Organization Settings, or Project Settings, depending on the scope at which you want to enable notification rules.
- Under General, select Notifications Management. The Notification Management page opens to the Rules tab by default.
- Locate the rule you want to enable and enable the Status toggle. Harness confirms that you enabled the rule.


#### How can I temporarily disable a delegate event notification rule?

To disable a delegate event notification rule:
- In Harness, go to Account Settings, Organization Settings, or Project Settings, depending on the scope at which you want to disable a delegate event notification rule.
- Under General, select Notifications Management. The Notification Management page opens to the Rules tab by default.
- Locate the rule you want to disable and disable the Status toggle. Harness confirms that you disabled the rule.


#### How can I make changes to a delegate event notification rule?

To edit a delegate event notification rule:
- In Harness, go to Account Settings, Organization Settings, or Project Settings, depending on the scope at which you want to edit notifications.
- Under General, select Notifications Management. The Notification Management page opens to the Rules tab by default.
- Select More Options (⋮) for the notification you want to update, and then select Edit. The Edit Notification Setup wizard opens.
- Edit your notification information on the necessary screen, selecting Continue to step through the wizard until you reach the Set Channels screen, then select Submit to save your changes.


#### How can I delete a delegate event notification rule?

To delete a delegate event notification rule:
- In Harness, go to Account Settings, Organization Settings, or Project Settings, depending on the scope at which you want to delete an event notification.
- Under General, select Notifications Management. The Notification Management page opens to the Rules tab by default.
- Select More Options (⋮) corresponding to the notification you want to delete, and then select Delete. A confirmation dialog opens.
- Select Delete.


#### How can we use a repeating strategy to iterate over a list of values?

In order to to repeat a strategy for each value in a list, use 'items' to iterate over the list of values.  Use the expression <+repeat.item> in your stage/step settings to access values in the list.



#### How can we use a repeating strategy using multiple target hosts?

To run steps on multiple target hosts, use <+repeat.item> with the expression <+stage.output.hosts> to reference all of the hosts/pods/instances.


#### Is there a way to use a custom label for repeat stages and steps for repeating strategies?

Users can use the keyword nodeName when specifying your repeat items to define your stage and step naming convention.  Expressions are supported, which means users can customize the name as required.



#### Is there a way to configure looping strategies as runtime input?

Users can configure stage, step, and step group looping strategies as runtime input in your pipelines and templates.  To do this, users can go to the Looping Strategy settings to configure the looping strategy to be specified at runtime, select the Thumbtack icon, and change the input type to Runtime Input.



#### How can we setup a looping strategy expression to count iterations for each value?

Users can utilize a looping strategy expression to access the index values for each iteration of a step/stage produced by a looping strategy.

- <+strategy.iteration>: Current count within the loop.  Starts at zero.
- <+strategy.iterations>: Total number of iterations produced by the loop.



#### How can one get around to using indexed identifiers in looping strategies?

The index value of the iteration count is appended to the base stage/step identifier to create unique identifiers for each stage/step instance created by the looping strategy.  This is the reason why stages and steps cannot have the same identifier.  Users must use an expression that references the identifier of a stage/step instance in a looping strategy and use the identifier with the appended index value.

Example:
A stage with the identifier my_build_stage has a looping strategy applied.  The expression <+pipeline.stages.my_build_stage.variables> will not work. Instead, you must append the index value to the identifier in the expression, such as <+pipeline.stages.my_build_stage_0.variables>.



#### Is there a way to rename child nodes of a stages/steps/step groups looping strategy?

The identifierPostFix is a postfix added to the identifiers of nodes (stage/step/step group) during execution when the node is a child of the looping strategy. This ensures that all children of the looping strategy have unique identifiers.


#### In a looping strategy, what expression can be used to retrieve the identifierPostFix of the current node or parent node of the child of a looping strategy?

The expression <+strategy.identifierPostFix> retrieves the identifierPostFix of the current node or any parent node that is a child of the looping strategy.


#### In a looping strategy, what expression can be used to retrieve the identifierPostFix of the current step when the step is a child of a looping strategy?

The expression <+step.identifierPostFix> returns the identifierPostFix of the current step when the step is a child of a looping strategy.


#### In a looping strategy, what expression can be used to retrieve the identifierPostFix of a stage when the current node's stage is a child of a looping strategy?

The expression <+stage.identifierPostFix> retrieves the identifierPostFix of the stage when the current node's stage is a child of a looping strategy.


#### In a looping strategy, what expression can be used to return the identifierPostFix of the step group when the current node is under the step group?

The expression <+stepGroup.identifierPostFix> returns the identifierPostFix of the step group when the current node is under the step group, or when the current node is the step group itself, and that step group is a child of a looping strategy.


#### In a looping strategy, what expression can be used to retrieve the identifierPostFix for the node that is the child of a looping strategy from a specific identifier?

The expression <+strategy.node.STRATEGY_NODE_IDENTIFIER.identifierPostFix> retrieves the identifierPostFix for the node that is the child of a looping strategy with the identifier STRATEGY_NODE_IDENTIFIER.


#### In a looping strategy, what expression can be used to retrieve the values of any strategy expression associated with looping strategies at various levels?

Using the format <+strategy.node.STRATEGY_NODE_IDENTIFIER.*>, you can retrieve the values of any strategy expressions associated with looping strategies at various levels. This is useful when looping strategies are configured within nested levels.


#### What are the statuses of stages with looping strategies?

The status of a stage with looping strategy is based on the highest priority execution status among its child stages:
- Negative statuses takes precedence over positive status.
- If any one child stage has negative status, then the parent stage takes that negative status.
- If multiple child stages have negative statuses, the parent stage takes the negative status with the highest priority.
- If all child stages have a positive status, the parent stage takes the positive status with the highest priority.
