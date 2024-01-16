---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
# sidebar_position: 2
---

# FAQ

#### Vault I have a secret that is connected to vault. How would i view it? Do i need to connect to vault?

For security reasons you would need to connect to Vault to view the secrets. You can use them however.

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
You can also store the token in vault and can reference the token in yaml: /docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-rotate-tokens

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

Yes you can choose to specify what threshold to reject the task using the flag `DELEGATE_RESOURCE_THRESHOLD`, otherwise, the default value is 80%.

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

#### Can I set SCM_SKIP_SSL while working on Docker delegate?

Yes, you can add `SCM_SKIP_SSL=true` to the `environment` section of the delegate YAML.

For example, here is the `environment` section of a `docker-compose.yml` file with the `SCM_SKIP_SSL` variable:

```yaml
environment:
      - ACCOUNT_ID=XXXX
      - DELEGATE_TOKEN=XXXX
      - MANAGER_HOST_AND_PORT=https://app.harness.io
      - LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/
      - DEPLOY_MODE=KUBERNETES
      - DELEGATE_NAME=test
      - NEXT_GEN=true
      - DELEGATE_TYPE=DOCKER
      - SCM_SKIP_SSL=true
```

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
`echo "<+secrets.getValue("account.aaaatestaaatest")>" `

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

- `XX.XX.XXXXX.minimal`: This tag represents the minimal image format, which is recommended for production usage. It stands out due to its absence of high or critical vulnerabilities, making it a secure choice. Furthermore, this image format is lighter than the default option because it doesn't have the default binaries installed.
- `23.XX.8XXXX`: This format corresponds to the standard delegate image. It includes all the default binaries and is a suitable choice for users who are relatively new to Harness and do not have stringent security requirements. This image provides a comprehensive set of tools and functionalities for general usage.
- `1.0.8XXX`X`: This format denotes an older version of the delegate, often referred to as the legacy delegate. New Harness accounts no longer include this delegate version, and users are strongly encouraged to migrate to the standard delegate for better compatibility, performance, and security.

#### Do we not have OOTB roles at the project level?

Yes, we do have a Project Admin role built in and also no ability to delete built in roles. Org and Project specific built-in roles are available only after the corresponding entity is created and they are only available in the respective scope.

#### What is the reason of delegates to be blacklist?

The logic of blacklist of delegates is that every delegate task has one or more that one validation/capability check, when the task comes, we see if we ever has done validation for the capability. This is cached for 6 hours so if we have validated connectivity it will be valid for 6 hours, if this is the first time or 6 hours are passed, then will execute the validation logic, if the validation fails, the delegate is blacklisted for the criteria for 5 mins and if within five minutes a task with same critieria comes then delegate will be blacklisted for it.
So check what validation crieterias were added in the task and what validation is failing.

#### What are the K8s version requirements for Delegate installations?

We try to support all the active K8S releases (that’s last 3 releases according to our versioning policy), i.e. we support anything that’s not EOL.

#### Can we increase the daily deployment limit to 10000 for a customer?

Yes, we are capable of increasing the daily deployment limit > 10000 per day.

#### How the delegates share information like a Helm Chart and its contents on the same stage?

It is divided in two steps first is to download the values.yaml files on any of the delegate (it could be just a 1 or more delegates depending upon how many values.yaml have been configured) and then pass them to the next step. Then delegate downloads the Helm chart and then use the values.yaml files that were passed by the previous step.
So, Delegate 1 executed the Fetch Files will pass the values/manifests to Delegate 2 that will execute the Helm Install/Apply.

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
For the Harness production cluster _prod-3_, the local login URL is [https://app3.harness.io/auth/#/local-login].

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
commits='\<+trigger.payload.commits>'

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

#### Why we do not see Dashboards in an SMP Installation?

Dashboard is a licensed functionality. To enable it you need to get a license.

#### Connector error causing pipeline failure

Connectors are often tied to a secret, such as a password or SSH key, that can expire. Expired credentials are a common cause of execution failures with connector errors. If your build fails due to a connector error, check your connector's configuration to confirm that the credentials aren't expired.

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

It might be due to the configuration. Try this instead for the terraform config file:

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

Harness uses the ring methodology commonly used in software release management for delegate releases. There are 4 rings and to mimimize impact should issues occur on new delegate releases each Harness account is designated a specific ring which correlates to the latest delegate version for that account.

#### I have automatic upgrade on in my delegate. Why is my delegate version behind what's listed as the latest version in dockerhub (https://hub.docker.com/r/harness/delegate/tags)?

Harness uses the ring methodology commonly used in software release management for delegate releases. The version for your account could be overriden to use the latest in Dockerhub using the API: https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/overrideDelegateImageTag

#### The reset password link keeps sending me back to the login page. What gives?

In the account password authentication might be disabled with another auth enabled such as Active Directory. Reach out to your Active Directory Administrator in that case to reset

#### How can I restore deleted projects and pipelines ?

Unfortunately, we don't soft delete entities and hard delete them. Therefore there is no easy way to restore. Some entities can be restored using YAML from the audit trail.

#### We don't have certain projects but the harness terraform modules continue to read them in. We want to remove these unwanted data if exist in harness. Please assist on it ?

Potentially they could still be in the state file if changes were made outside of the it. Inspect your state file

#### I am getting an error as follows `Error Summary Invalid request: At least 1 valid user group is required in [Approval]`. What is that I am doing wrong here?

The variable being passed for the Approvers > User Groups is potentially invalid or at the wrong scope

#### Can I use the delegate image from my immutable delegate and replace it in the YAML for the statefulset from the legacy delegate ?

This is not supported. The immutable delegate image should be run with delegate yaml generated from the UI which will generate a deployment if immutable delegate is enabled for the account https://apidocs.harness.io/tag/Accounts#operation/isImmutableDelegateEnabled

Here is an example manifest file for NextGen:
https://developer.harness.io/docs/platform/delegates/install-delegates/overview/#example-manifest-file

#### 400 error when creating a connector via the Create Connector API.

When using the [Create Connector API](https://apidocs.harness.io/tag/Connectors/#operation/createConnector), invalid characters (such as parenthesis) in the name can cause Bad Request (400) errors, such as:

```
requests.exceptions.HTTPError: 400 Client Error: Bad Request for url https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=\<ACCOUNT_IDENTIFIER>?
```

#### Is TLS 1.3 supported ?

Both the Harness Delegate & SaaS support TLS 1.3 and in fact this is the default TLS version. Technically however each specific task implementation can create it’s own separate HTTP client that advertises whatever TLS version they choose and the connector check is using task specific HTTP client and not delegate's HTTP client. There are some tasks that are preferring TLSv1.2 in some use cases (possibly due to legacy reasons). Note that this may change in the future and full TLS 1.3 support can eventually be rolled out but as of yet there are some specific connectors that prefer TLS 1.2.

#### Is there a tool to migrate from FirstGen to NextGen ?

Yes. You can use https://harness.github.io/migrator/

#### Is there a timeline of when I need to upgrade to NextGen by from FirstGen?

Yes. It's outlined here in the documentation https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd/#timeline

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

they can overwrite the watcher memory setting via `WATCHER_JAVA_OPTS`, if you want to increase the memory for watcher they can add the following in the delegate yaml env section `- name: WATCHER_JAVA_OPTS value: "-Xmx512M"`

#### Can scope creation happen during delegate install?

scope of delegate is decided by the scope of delegate token. You can refer the documentation here[Documentation](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-scope).

#### Is it possible to increase the client side timeout when getting pods in K8s delegate?

Yes, you can increase the step timeout.

#### How can we enable the FF `DELEGATE_TASK_CAPACITY`?

You can refer the documentation here [Documentation](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-task-capacity).

#### Do we need to provide both `sso_group_id` and `sso_group_name` and should they match?

Yes we need to provide both, The value provided for both `sso_group_id` and `sso_group_name` should be same.

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

#### The Harness delegate went down and I did not get any notification via prometheus that it was in a disconnected state. What gives?

When the Harness delegate pod goes down so does it's exposed metrics endpoint as well. The metrics here can help notify you if connectivity is lost between the Harness manager and the delegate pod itself (but obviously still present to your prometheus server to notify you as well)

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
The secret will always be printed in encrypted **\*\*\*** so you don't have to worry about the value been shown but it will make sure to isolate the issue further if the secret itself is having the issue or the way it is been referenced.

#### Issue while accessing other accounts when a user is part of multiple accounts.

Sometimes, this might happen due to some edge case where a user is somehow unable to access his other account when he is part of multiple accounts as the login mechanism works for the default account. The user can still try to get to his account (not the default one) by using the deep link. The deep link is nothing y the full URL of the account he wants to access :
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
When you will be setting up a new OKTA SAML and then migrating your users to it, You will need to setup the same with Harness as mentioned in the above document , as Harness needs the metadata XML file from OKTA with the configuration.

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
echo "text secret is: " \<+secrets.getValue("printsecret")> >> /tmp/abc.txt
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

For the pipeline execution URL: \<+pipeline.execution.url>

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

`linkedSsoId` is the uuid of SSO setting creating in Harness.

#### What is the purpose of `linkedSsoDisplayName` ?

`LinkedSsoDisplayName` is the same SSO setting name in Harness. For SAML the value provided for both ssoGroupId and ssoGroupName should be same.

#### How can we implement an approval mechanism for authorizing the deletion of marked accounts to prevent accidental deletions and ensure that the right accounts are flagged for deletion?

The implementation of this feature is currently pending. Presently, the ability to mark accounts for deletion is allowed through the "update account" permission in the admin tool, which has been granted to a wide range of users.

#### How are Create APIs supposed to work as if we are creating API it won't be having permission and will return false? How do we restrict creation of resources?

There are two types of scope, one is complete scope(which indicates ALL) and the other is specific.

- To allow creation of entity in certain scope, it means allowing to creation that entity at complete Scope level(which indicates ALL).
- If the usecase is to allow Create Goverance policy at scope and restrict edit to specific policies then ideally we should split it into specific Create and Edit permissions.
- And then define 2 Role Assignments.
  One with Create and All Goverance policy.
  One with Edit and Specific selected Goverance policies.

#### What is diffrence between `terminationGracePeriodSeconds` and `preStopHook` ?

- `TerminationGracePeriodSeconds` - This is used to allow the main process (delegate) to delay the shutdown so that this process can perform some cleanup. The key here is that container shutdown is delayed by UP TO the specified duration. This works by delegate specifically handling SIGTERM kill signal.

- `preStopHook` - This is used to allow any other kind of cleanup outside of the main process (e.g. one wants to save files, make database backup etc..). This hook runs IN PARALLEL to the terminationGracePeriodSeconds not before, but before delegate process shutdown is triggered (i.e. before delegate process receives SIGTERM). So if the grace period expires the hook will be killed as well.

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

Make sure you have set the Default Experience as NG under Account overview page

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

#### How events are generated on Harness platform?

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

#### How can user install terraform on the delegate?

1. microdnf install yum
2. yum install unzip
3. curl -O -L https://releases.hashicorp.com/terraform/1.6.1/terraform_1.6.1_linux_amd64.zip
4. unzip terraform_1.6.1_linux_amd64.zip
5. mv ./terraform /usr/bin/
6. terraform --version

#### How can user install the aws cli in delegate?

1. curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

2. microdnf install yum

3. yum install unzip

4. unzip awscliv2.zip

5. ./aws/install

#### Can user able to configure RBAC for the environment based on the stage?

No, As per the current design user can only configure the RBAC for environment based on environment type.

#### How can user install without root permission?

Our delegate will get installed without root permissions by default, you don't need to make any changes for that.

#### Can user install the docker delegate with rootless docker?

Yes, you can install the rootless docker and after install the docker delegate.

#### Can we have multiple docker delegate under same delegate name?

When you have same name for multiple delegates they appear under one group and treated as multiple instances of that specific delegate. Whenever that delegate names get selected any instance registered under the name can be picked for executing the task.

#### Can docker delegates be auto upgraded?

Delegate auto upgrade occurs through the cron job that gets created when deploying a helm or a kubernetes delegate. We do not have any such cron in case of docker delegate and hence the image for docker delegate needs to be manually changed for delegate upgardes.

#### What is the base OS for immutable delegates?

Immutable delegates are based on RHEL ubi8 minimal image. On the other hand our legacy delegate were based on ubuntu.

#### Do we have delegate metrics in case of legacy delegates as well?

Custom delegate metrics are only available for immutable delegates, there is no custom metric for legacy delegates. Also for immutable delegates the custom metrics are available from the version 23.05.79311 onwards.

#### Where does delegate look for third party client utilities?

The immuatble delegates look for the third party client utilities in the PATH location during startup. Hence any third party utility that is installed in delegate is expected to be either present in the default PATH location or the path to the binary added in the environment variable PATH.

#### How to find out which user is running the delegate?

We can exec into the pod and run the below command to find out which user is currently owning the delegate process:

```
ps -ef | grep delegate
```

#### How to check the custom metrics currently being published by delegate?

Delegate has a metrics api end point which we can access on the delegate host for checking the delegate metrics available. Below is the sample curl:

```
curl localhost:30109/api/metrics
```

#### What is the health api end point for the immutable delegates?

Immutable delegates has a health api end point on which delegate health related information is related. Below is a sample curl for the same:

```
curl localhost:30109/api/health
```

#### How to pass jvm arguments for watcher process?

Watcher process for delegates uses jvm options from the environment variable WATCHER_JAVA_OPTS. Any custom jvm argument that we want to pass to watcher process can be configured in the WATCHER_JAVA_OPTS variable in the init script.

#### How to pass jvm arguments for delegates process?

Delegate process picks the jvm options from JVM_OPTS environment variable. If we want to pass any custom jvm arguments for the delegate process we can configure it in the JVM_OPTS environment variable. One example is below:

```
env:
  - name: JAVA_OPTS
    value: "-Xms2G"

```

#### Does delegate preocess write gc logs by default?

Delegate jvm process is not configured to write the gc logs by default. If we need to configure the gc logs we need to pass the jvm arguments for the same. For instance below are sample argument , the options can be modified as per the need for gc logs:

```
JAVA_OPTS='-Xlog:gc*=debug:file=/var/jvm/gc.log'
```

#### Can a delegate be connected to first gen and next gen at the same time?

A delegate at one time can be connected to only manager instance. Hence the same delegate can not be connected to both the first gen and next gen instance of the same account.

#### How can we do migration of GCP / AWS KMS secrets from FG to NG ?

To migrate encrypted records from an old KMS (FG) to a new one (NG), fetch the Data Encryption Key (DEK) from the old KMS, decrypt the data, re-encrypt it with the new KMS, update the records, and ensure security and compliance. Connectivity between NG and the old KMS is essential.

#### Is way to find the enabled feature flag and available one in UI?

This feature will be available soon.

#### Do proxy settings apply to both HTTP delegate commands and raw socket connects during capability checks?

Proxy settings typically work for HTTP delegate commands, enabling you to route HTTP traffic through a proxy server. However, in the case of capability checks, such as raw socket connects, proxy settings might not apply.
`CDS_USE_HTTP_CHECK_IGNORE_RESPONSE_INSTEAD_OF_SOCKET_NG` this feature flag should be enabled to solve the issue.

#### Is it a standard practice to notify you 30 days in advance whenever there are changes to our IP addresses?

We don't change IPs without 30 days notice to you all. If a security emergency requires a change, you will be notified. For more info you can refer [here](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips/#allowlist-harness-saas-ips).

#### Is the FF `PL_ENABLE_MULTIPLE_IDP_SUPPORT` available and enabled to use?

Yes it is enabled, you can refer to [this](https://developer.harness.io/docs/platform/authentication/multiple-identity-providers/#configure-multiple-saml-providers).

#### Do we have an automatic upgrades for ECS delegates?

No, we don't have auto upgrade for docker delegate so far.

#### What needs to follow if the production delegate is down because of using legacy delegate and a old watcher version ?

- Re-deploy legacy delegate by pulling the fresh "latest" image. This will make sure that you get most recent watcher.
- We can revert the delegate version in the ring to unblock.
- You can use immutable delegate.

#### What should be possible solution of the error `not supported by windows` while working in CCM POV ?

If this is a mixed node cluster then the delegate needs to run on Linux nodes. You can use selector in your delegate yaml to make sure that Linux nodes are selected. You can refer to this [docs](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) for more information.

#### Whenever I switch my Harness account, I encounter a login prompt, captcha, and the message `too many invalid login attempts, account blocked` despite having no invalid login attempts. Why does this happen?

This issue may arise due to several reasons:

- Authentication Requirement: If you are not a part of the Harness Support group, you may need to re-authenticate while switching accounts. This is a standard security measure.
- Resetting Password: It is possible that when you attempt to reset your password, it only affects the login attempt value in one cluster and not the other one. This discrepancy in the reset process can lead to login issues.

Ensure you are properly authenticated when switching accounts.

#### What is the default limit of QPS?

Default limit of QPS is: 50 QPM per manager* Num of managers(3) =>Total 50*3 QPM = 2.5 QPS.

#### Is there a way to upgrade the volumes created when installing Harness with Helm from gp2 to gp3?

Volume types are controlled by storage class, its not harness controlled.
You can modify the storage class setting by the [link](https://kubernetes.io/docs/concepts/storage/storage-classes/#aws-ebs) but you would lose the data if aws doesn't support direct upgrade from gp2 to gp3.

#### Is there a plan to integrate Git into our SMP?

Yes, it will be integrated soon.

#### Is it possible to attach delegate to a custom IAM role during installation in the EKS cluster?

Yes, you can refer to [this](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#harness-aws-connector-settings) documentation for details.

#### Can I send a single invitation email to a user for both Account-level limited permissions and Organization-level admin privileges?

You can efficiently manage user invitations by combining Account-level limited permissions and Organization-level admin privileges in a single email. During the invitation process, grant the necessary permissions at the Account level, ensuring they encompass all child permissions, providing access to all organizations and projects. Simultaneously, grant admin permissions to the specific Organization at the Account level without the need for a separate invitation. This allows users to receive a unified invitation email when added to the Organization as Org Admins, streamlining the acceptance process.

#### Can administrators bulk approve and activate users who are in a "Pending Invitation" status, transitioning them to "Active Users" collectively rather than individually?

Certainly. If the account authentication mechanism is configured as SSO, and the FF `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is enabled, users will be automatically enabled upon invitation. However, if the account authentication mechanism is USER_PASSWORD, each individual user needs to accept the invite to set their login password, as automatic enabling is not applicable in this case. The method of account authentication determines the user activation process, with SSO streamlining the activation for users, while USER_PASSWORD requires individual acceptance for password setup.

#### Can we get information about the types of tasks of delegates, what each of them is responsible for?

The task types are internal tasks for various tasks a pipeline generate. We keep introducing new tasks type and remove old ones as documenting each task type is not productive.

#### Do these build_source tasks use the delegate task quota?

Build source tasks do use the quota. these are tasks for artifact collections. they are only present in cg and next gen these tasks are never fired.

#### Can we able to see who invited a user?

Yes, you can find user invite actions in the audit trail.

#### Is there any other way to remove a test user group created with `externallyManaged=true` other than remove it by a mongodb query set `externallyManaged=false`?

Yes, a more preferable approach is to update the user group in the database by changing the externallyManaged flag from true to false. Following this, you can delete the user group from the UI. Deleting directly from the database might not be the optimal solution, especially if the user group is part of the hierarchy, such as an account user group inside an Org/Project. Updating the flag and then deleting through the UI ensures a more controlled and comprehensive handling of the user group removal, taking into account any dependencies in the hierarchy. This is not updatable using API, but soon deletion will be allowed from UI.

#### How does Harness handle sensitive information, such as secrets, to prevent exposure in logs?

When using secrets for sensitive information, the platform automatically obfuscates or masks the values in logs and other outputs. This measure ensures that sensitive information remains protected and is not exposed in plaintext within logs.

#### When making service-to-service calls, is it recommended to reuse the Bearer token received from the calling service's API in the Authorization Header for the destination service's platform API?

In service-to-service scenarios, a best practice is to transmit only the principal information without including the Authorization Header. This allows the destination service to handle authorization based on the provided principal details. Additionally, users have the flexibility to designate whether the call is Privileged or non-Privileged. For non-Privileged access, maintaining the principal as the end user is often suitable. Users are encouraged to refer to the platform's official documentation for comprehensive guidance on token creation and authentication for platform API calls. If further assistance is needed, contacting the platform's support team is recommended.

#### Do we have documentation to implement ACL checks in log-service?

Yes, you can refer to these [docs](https://apidocs.harness.io/tag/Access-Control-List#operation/getAccessControlList).

#### How to perform load test on k8s delegate?

You can implement Autoscale using replicas with the steps in this [docs](https://developer.harness.io/docs/platform/delegates/manage-delegates/auto-scale-using-replicas/). The autoscaling will be based on load not on number of tasks Or can do any kind of deployment or simply run shell scripts which uses cpu and memory.

- based on which metric you use for HPA (we recommend cpu/memory) kubernetes will scale up/down the pod.
- when pod is scaled down, the delegate pod will stop taking new task and finish what its executing before terminating.

#### Can I centrally identify and remove resources created by a user who had admin access but now has non-admin permissions?

Currcetly this centralised feature is not available and will be available soon. However, you can leverage the Audit Trail feature to track all actions performed by the user over a specified time. This way, you can identify the resources they created during their admin access.
Audit trails are available at the Account and Organization levels, allowing you to determine the resources created by the user. To restrict the user's admin access, you need to remove their admin permissions at every scope (account, org, project). Once admin permissions are revoked, the user won't have the authority to perform admin operations.

#### What rate limits are enforced for NG?

Rate limits for requests/day :

- Any call: Harness allows 5000 requests every 10 seconds (30,000 requests per minute) per IP address.
- API calls: Harness allows 1000 requests per API key per minute.
- Large requests (character size > 500,000): 1 payload every 10 seconds.

For more details you can refer to [documentation](https://developer.harness.io/docs/platform/rate-limits/).

#### Can I set up audit log streaming without using a Delegate agent? Are there options to stream logs directly from the cloud platform using IAM roles or other methods?

For the current streaming workflow, the primary option is to use the AWS connector, which requires the use of a Delegate. Unfortunately, audit log streaming is currently only supported via Delegate, and there is no direct option to stream logs from the cloud platform using IAM roles or other methods.
You can refer to this [documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/) for further information.

#### What is the workflow for secrets, especially concerning the potential exposure of production secrets? Do secrets pulled by a delegate ever flow back to the Harness platform?

Yes, the secrets pulled by a delegate during pipeline execution do not make their way back to the Harness platform. Delegates connect to various secret managers as the pipeline progresses, but the secret information itself is not sent to Harness. This ensures that production secrets remain secure and are not exposed within the Harness platform. You can refer to these [docs](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

#### Will we push up the Ubuntu immutable delegate to Dockerhub?

No, our Dockerfiles are made public on GitHub so that you have the option to modify and build them according to your needs. We do not push the Ubuntu immutable delegate images to Dockerhub; instead, you can access and customize the Dockerfiles from our GitHub repository.

#### Are we planning to add support for multiple account Id for SMP?

Currently SMP is single account only, multiple account support is yet to come.

#### How can we configure OIDC with GCP WIF for Harness CI Cloud builds?

Using the FF `PL_GCP_OIDC_AUTHENTICATION` you can configure the same, you can refer [here](https://developer.harness.io/tutorials/platform/configure-oidc-gcp-wif-ci-hosted), later on enable this functionality for Harness Delegate and AWS STS.

#### Do we have docs for permissions references?

Yes, you can refer these docs:

- [document1](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference/)
- [document2](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/)

#### How can we disable version override from specific delegate?

Version override is not controlled from UI. If we need to disable version override it will be for entire account. You can refer [here](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/) to know about delegates upgrades.

#### Can I access the Harness API from a React app, and how can I handle CORS issues when making API calls with the x-api-key header?

Yes, the Harness API is accessible from React (or any JavaScript library) apps. However, when encountering CORS (Cross-Origin Resource Sharing) issues, it's crucial to understand that browsers make pre-flight CORS requests, especially when the host origin and the server origin are different.

To resolve CORS issues:

- Same Origin: If your UI and API share the same origin (e.g., UI and API both on app.harness.io), there won't be CORS calls.
- Different Origin: If your app is on a different origin (e.g., example.com/harness) and makes non-GET requests to app.harness.io/api/, the browser initiates a pre-flight request.
- Server Configuration: Ensure your API server includes the necessary CORS headers, such as access-control-allow-origin and access-control-allow-headers, to explicitly allow the requesting origin and any custom headers like x-api-key.

By configuring your server to allow the necessary origins and headers, you can address CORS issues when making API calls from your React app. This ensures a smooth interaction with the Harness API while securing your application.

#### Can I configure an alternate location for delegate logs?

It is not possible to configure the delegate logs path. However, you can create a symlink for the `delegate.log` files and store them in a different directory using the `INIT_SCRIPT` environment variable. To do this, simply replace `YOUR_PATH` with the directory where you want to store your log files in the example below.

```yaml
- name: INIT_SCRIPT
          value: "mkdir YOUR_PATH && ln -s YOUR_PATH/newdelegate.log delegate.log"
```

After you create your delegate, you can verify your log file path.

#### Can we customize the SSH configuration when using a Git connector set by SSH?

For GIT API-based communications, SSH is not used at all. Instead, we rely exclusively on token-based communication. Specifically for GIT tasks, especially on GitX, tokens are utilized as they are executed through APIs. However, for other types of connections, SSH configurations are employed. It's important to note that for any connector, the standard practice involves selecting "API Access" and providing tokens exclusively.

#### How can I resolve serialization errors when integrating NG Audits for ModuleLicense collection with multiple child classes in YamlDTOs?

The serialization issue in NG Audits for ModuleLicense collection arises when using entity objects instead of DTOs in the YAML for Audit Service. The problem is that entity objects lack JsonSubTypes, causing the Jackson ObjectMapper to struggle with determining the appropriate subType for conversion. The resolution is to utilize DTOs, which inherently possess the JsonSubTypes property, ensuring smooth serialization and deserialization processes in the Audit Service.

It's essential to note that the Audit Service doesn't directly serialize or deserialize YAML; instead, it expects the old and new YAML as strings. However, the choice of using DTOs over entity objects is crucial for resolving any potential serialization challenges. Always ensure that the service generating audits has access to all required DTOs to prevent code duplication and facilitate efficient integration with NG Audits.

#### Why is the Helm binary path not added to the system's PATH by default for Immutable Delegates?

There are two versions of the Helm binary installed on the delegate, but neither is set to the system's PATH by default. This behavior is currently specific to the Ubuntu image. However, users have the option to set the PATH as desired using the init script in the delegate YAML. Additionally, they can install custom binaries or create their own delegate image to address this.

#### Is there a standardized default user access experience across all installation flows (K8S, Docker, Helm, Terraform)?

No, there is currently a variation, with K8S delegates defaulting to root with securityContext, while Docker delegates use a non-root default user (user 1001).

#### Is root user access required by default for adding custom binaries?

Users can choose not to run as root. For custom binaries, root access is not required, they can curl the binary and put it in the path.

#### How to hide Harness built-in roles (harness managed roles), and is it possible to hide account scope roles?

Enabling the flags (`PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE` and `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`) will hide project and org scope roles. However, there is currently no way to hide account-level roles. This decision was not implemented due to the potential restriction that once we enable FF for the account, nobody will be able to see managed roles, including account admin.

#### If a user has a connector with delegate selector X, and the connector uses a secret from a secret manager with delegate selector Y, but delegates with selector X lack access to this secret manager, is this use-case supported?

Our priorities are configured as follows: [Step > Step Group > Stage > Pipeline > Connector]. In this scenario, the user can override at the pipeline (or any higher level), but without that override, it will result in a failure.

#### How do I setup SMTP with AWS SES?

Go to the [AWS documentation on SMTP credentials](https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html) to create SMTP credentials using the SES console. Then, supply those SMTP credentials in your [Harness SMTP connector configuration](/docs/platform/notifications/add-smtp-configuration).

#### How to increase the concurrent pipeline execution limit

You can increase the limit unto 1000 by navigating to Account Settings --> Account Resource --> Default Settings --> Pipeline

#### Is it possible to hide Project/Org level default In-Built roles

Yes its possible and you need to ask Harness support to enable PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE and PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE. FF.

#### How to upgrade legacy docker delegate to use new image version

You can update the image tag by looking into latest tag https://hub.docker.com/r/harness/delegate/tags and can provide that while docker run command

#### How to check if Delegate is setup for auto Upgrade

You can go to delegate page and on right side check under AUTO UPGRADE Column if its showing ON

#### Is it possible to hide Account level default In-Built roles

No currently its not possible as if we try to disable the roles for account nobody will be able to see managed roles even including account admin.

#### What are Harness built-in and Custom Variables? 

They are a way to refer to something in Harness such as an entity name or a configuration setting. 

#### What is the correct syntax for the Regex Extract build-in variable?

'''regex.extract("v[0-9]+.[0-9]+", artifact.fileName)''' is the correct syntax

#### What are the statuses of nodes using the Harness looping Strategy?

Running, Failed, and Success

#### Not able to resume pipeline for some time post delegate release

For optimizations we keep a local cache of all connected delegates to execute tasks. The cache is refreshed every 3 minutes currently and hence it takes upto 3 mins for a new delegate to be eligible to execute a task once its connected. Since the delegate rollout is not a very frequent operation the 3 mins window was chosen and is in production for few years.

We can recommend having a grace period between bringing up a new delegate and terminating an old pod. We have minReadySeconds defined in the yaml which ensures that old pods die after 2 mins of new pod being in ready state. SInce this field was added later on, your delegate yaml may not have it. You could check this by downloading a new yaml for a delegate and add it so that the older pod doesn't get killed without new pod getting the traffic.

#### The Account name in the authenticator APP When Setting up 2FA

The account name show in the authenticator app when setting up 2FA is coming from the company name set for your account. In case you want to have a specifc name you will need to get your company name for the account updated.

#### 2FA enable / disable for inidividual and account level

The 2FA is either enabled by defualt for the account or any user can also enable it particularly for his user which can be done from the user profile.
But ocne the 2FA is enabled by the user it also needs to be disabled by that particular as account won't be able to disable the 2FA for the specifc user.

#### Vanity URL issues

When a vanity URL is enabled for an account using SAML login, you must update your ACS URL with your vanity URL. For example, if your original ACS URL is `https://app.harness.io/gateway/api/users/saml-login?accountId=xxxxxxxxxxxxxxxx`, after enabling a vanity URL, you must update it to something like `https://VANITYURL.harness.io/gateway/api/users/saml-login?accountId=xxxxxxxxxxxxxx`.

#### Restoring accidently deleted User Groups

If you accidently delete some User groups from the Harness UI. There is no way to restore them as it also gets deleted from our backend collection.
But if the User Groups were provisioned via SCIM then you can always resync the user groups.

#### When a user logs into Harness using SAML he loses access to User Groups.

This scenario is possible for the SAML Based linked User Groups as the SAML based user groupn sync alwas takes place on the user login action.
Hence there were any changes made from the SAML SSO Group Claims or may be the group was removed from the app and hence harness does the sync at next login.

#### Resetting the 2FA from Harness

This only the account admins can do for Users, when the admin needs to go to Account Setttings--> Access Control -- Users

Right click on the 3 dots on the extreme right end of a user and then click on email new 2fa option.

#### Users unable to the first time when added using the JIT (Just in time user provioning)

The issue occurs when after your user is setup via JIT and first time user irectly tries to login via the Harness URL (app.harness.io), As the when you setup the JIT (Just in time user provioning) reference : https://developer.harness.io/docs/platform/role-based-access-control/provision-use-jit/

The user needs to first go to his SAML SSO app and click on Harness icon tile from there as this will provision the user in Harness UI.

#### Error while adding Users to Harness from Harness UI

Sometime when you try to add a Harness User from Harness UI , you get error for adding the user.
You can open the developer tools and check the API call for the error and see the response.
It could be possible due to user creation limit. You can eitehr resolve it by removing unused Users from your account or reach out to Harness Support get the limit validated as per your licence.

#### How to get x-api-key for making api call

You need to create a new token under api key , you can follow https://apidocs.harness.io/#section/Introduction/Authentication for more details

#### How to check which delegate was assigned for task

You can select the step under any stage and on right side under details tab you will be able to see delegate assigned as well the delegate selection task logs will provide more details which all delegates were eligible and from where selector was originated etc

#### How to pass xmx and pms value for delegate to use max and min memory allocation pool

env:
    - name: JAVA_OPTS
      value: "-Xms64M -Xmx2G"

#### Scim Provisioned User Group has - in name which was removed from identifier but still allowed as name

The - is not allowed character for identifier so it was removed while creating the identifier while name can have that so its allowed for name

#### What does the promql query `io_harness_custom_metric_task_failed{task_type="NG_VAULT_RENEW_TOKEN"} > 0` specifically check, and why is it still non-zero even after a successful token renewal?

The query checks for failed tasks related to token renewal. The non-zero value may persist as it represents the count of failed tasks, which doesn't reset after successful renewals

#### What is the purpose of the `liveStatus` expression in Harness, and how does it differ from stageStatus?

The `liveStatus` expression is designed for use within step groups under a matrix. Unlike stageStatus, which doesn't consider running or completed steps under a matrix, liveStatus calculates the status of steps, including those in the running or completed state

#### Can we manually reset the delegate metrics which is being scraped by prmoetheus?

Manual reset isn't supported. However all the metrics get reset when the delegate restarts

#### Is the user can approve the pipeline through the API using token of service account?

The Service Account API token is not supported with Approval API, you need to use the personel access token.

#### How user can make sure the build artifacts that go to harness will come from protected branches before production deployment?

You can select the Artifact filter option and provide the expression as per your need in the Artifact source config of the service.

#### We have delegate monitoring setup and we're not clear on what types of tasks delegates are reporting on in the metrics.

The task types are internal tasks for various tasks a pipeline generates. for example, a pipeline can generate tasks for secret decryption during the shell script execution and they are internal to harness. We keep introducing new task types and removing old ones.

#### Do these build_source tasks use the delegate task quota? Sometimes their number is really huge.

Build source tasks do use the quota. these are tasks for artifact collections. they are only present in FG and next gen these tasks are never fired.

#### How does the system differentiate between delegate name and tag ?

A delegate name is a unique identifier for a registered delegate in Harness Manager, while delegate tags are descriptors that are added to the delegate before the registration process. All delegates with the tag are selected when a tag is common for two or more delegates.

#### We have about 500 users who were somehow granted the Admin role on the Account Level as individuals. We need to remove this role from them - is there an efficient way to do this?

You can use this [API] (https://apidocs.harness.io/tag/Account-Roles#operation/update-role-acc) and create a script to update the user roles.

#### Why are `-`removed from UserGroup identifiers?

The removal of hyphens from UserGroup identifiers is in line with the harness UI convention, where identifiers cannot contain hyphens. This practice ensures consistency and prevents the use of invalid characters in identifiers. While hyphens are allowed in UserGroup names, they are automatically removed from identifiers during creation through SCIM to adhere to the specified naming conventions.

#### Currently, our SCIM integration is connected to the First Gen instance/URL, and we lack user groups in the NextGen console. Do we need a separate application for NextGen SCIM integration?

Yes, for NextGen SCIM integration and to have user groups, it's advisable to set up a distinct SCIM application for the NextGen instance. This ensures that SCIM integration is properly configured for the NextGen environment, allowing for seamless user group management while maintaining compatibility with the First Gen setup.

#### Is there a way to reset the delegate custom metric?

No, all metrics reset when you restart the delegate.

#### Why aren't new delegates considered during task execution, leading to potential inefficiencies in scaling for matrix/parallel deployments?

Tasks currently poll for delegates at the start, and if initial delegates are unavailable, they won't be redirected to new ones created by scaling policies. The system broadcasts to eligible delegates determined during task processing. However, not repolling for available delegates during task execution may limit true "task-based scaling for Kubernetes delegates." Consideration for dynamically scaling with new delegates during ongoing tasks could enhance efficiency.

#### What is the difference between staged and active permissions?

- Staging

  - Permission is added in permissions.yml with the status - STAGING. It cannot be added to roles nor it is shown in the UI.
    Access control check will always return true if asked whether this permission is available to the user (not enforced).

- Active
  - The status of the permission is changed to ACTIVE in the YAML file. The experimental flag is removed from the permission. Access control checks are now enforced on the new permission.

#### Is there any documentation we have around the APIs which we can use to fetch user details given userId?

Yes you can refer here, [documentation](https://apidocs.harness.io/tag/User#operation/getUsers).

#### If we abort the pipeline and a step is being executed, will it be immediately stopped or it will finish the step task execution and after that abort the execution?

When you abort a pipeline, the pipeline will finish executing its current task and then stop execution. for furtther details you can refer [here](https://developer.harness.io/docs/platform/pipelines/abort-pipeline/#key-considerations).

#### Do we support referencing a ldap secret?

No, we don’t support ldap secret engine.

#### Does a Vault connector accepts configuration for only one Vault secret engine?

Yes the support is only for one secret engine per connector.

#### Do we have grafana dashboard in SMP for monitoring delegate tasks ?

No, we do not have these dashboards in SMP yet.

#### How long is an invitation for workshop accounts valid?

It should be valid for 30 days.

#### Can I set an auto cleanup TTL for disconnected delegates to disappear from the user UI?

The TTL (Time To Live) for legacy delegates is set to 7 days. In the case of immutable delegates, deletion occurs automatically upon delegate shutdown.

#### Is it now possible to have Secrets and Secret Connectors in different scopes, or do they still need to be in the same scope?

It's possible to have in different scope like we can have a SM at account level and the secret using that SM at the project scope.

#### Do we to support authorization with API tokens?

APIs token are used for both authentication and authorization. Refer to these docs, [here](https://developer.harness.io/docs/platform/role-based-access-control/add-and-manage-service-account#manage-api-keys).

#### Can you link the docs to the API endpoint used to authorize a user with API token?

We have only one API for access check either if you perform Authorization using Bearer Token or Api key token.

- [documentation 1](https://apidocs.harness.io/tag/Access-Control-List#operation/getAccessControlList)
- For API tokens categories: Service Account v/s Personal access tokens, please refer to understand it. [documentation 2](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/).

#### In CG custom secrets decrypt, Do we have retry logic? Do we cache the secret value?

- We execute three retries to fetch a secret.
- We don’t cache the secret value for security reasons.

#### How is the version of the Immutable Delegate Docker Image managed and released to SMP?

The release of the Immutable Delegate version to SMP involves setting the `IMMUTABLE_DELEGATE_DOCKER_IMAGE` version as an environment variable in the manager. When users download the YAML, this version is read from the environment variable, and SaaS utilizes pipelines to update MongoDB entries. During pod startup in SMP, the environment values are populated in the database, facilitating the direct retrieval of the Immutable Delegate version.

#### If DELEGATE_RESOURCE_THRESHOLD is set to zero, does the delegate reject all tasks?

No, if `DELEGATE_RESOURCE_THRESHOLD` is set to zero, it behaves as if the feature is off, and the delegate acquires tasks as normal without rejection. Also, we have the default `DELEGATE_RESOURCE_THRESHOLD` value as 80.

#### Currently a Vault connector accepts configuration for only one Vault secret engine. Is there any plan to explore how one Vault connector can be used for multiple Vault secret engines at the same time

As of now only one Vault secret engine can be configured for Vault connector and in Future we might support multiple Vault secret engine but currently its not possible

#### Diffrent ways to add users to Harness platform

You can create user in below ways:

1. UI: Account Admin can add user directly via UI
2. SCIM: You can setup scim to provision user
3. Terraform Provider: You can use Harness terraform provider https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_user

#### We would like to enforce the life time of api token ( My profile -> My API keys -> Token) is 24 hours.

An Api key is created with Minimum of 30 days and you can not set any duration less than that, you can rotate the token if you want at any time

#### Can we add Custom Selector in the harness delegate chart for legacy delegates?

For legacy delegates we do not have a way to specify delegate selector or delegate tags in the delegate helm chart. We do have an api to get the selectors as well as update it for the delegates. More details can be found here:

https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-delegate-selector-api/


#### Can a service account created at project level be assigned permissions to access account level resource ?

We can not create a project level service account and provide permission for account level resources. Hence this will not have access to any account level resources.

If you would like to use service account only you can create a account level service account and then give project level role bindings to it corresponding to the project as well as role binding for account level templates.

#### How to run harness docker delegate in detatched mode ?

Docker provides a -d flag option for running the containers in detatched mode. So when we are running the harness delegate docler run command we can add the option to get the console back and the contianer will continue to run in detatch mode. For example below is a sample delegate run command:

```
docker run  --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=xxx \
  -e DELEGATE_TOKEN=xxx= \
  -e DELEGATE_TAGS="" \
  -e LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/ \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:23.11.81406 -d
```

#### Why the task_failed_total metric for delegate is not repporting data despite step failure ?


The task failed is when something unhandled happens, like a NPE in a task or issue at framework level. A valid failure like shell script exited with error code is not a task failure. Prometheus only shows the metric which are at least once recorded.


#### Why do we need core_delegate_delete permission for revoking delegate token?

The api call that we make for  revoking the delegate token makes the delegate which are using it not register anymore and hence delete delegate permission is required for revoking the token as well.

#### Do we provide customized docker images for delegate?

We do not provide any customized docker images for delegates however we do have our delegate docker file in the public repo below. This can be used as a sample reference to add any utility to the image:
```
https://github.com/harness/delegate-dockerfile/tree/main
```


#### Can we use immuatable delegate image in the statefulset deployment yaml for delegates ? 

We can not use immutable delegate image in the statefulset deployment yaml that we had for legacy delegates. Both the delegates are architecturally different. The immutable delegates must be used with their own deployment yaml.


#### Is there a way to enable more granular level for delegate logs?

We do not have additional log level settings for delegate than what it logs by default. 
#### How to sync ldap groups manually if linked User group is not getting synced

You can Navigate to Authentication tab and go to ldap setting and try Synchronize User group option.

#### While trying to link sso group, not getting the option for user group

Check and confirm if group authorization is enabled for saml setup configured, than only you will see the sso provide details under drop down

#### How to capture SAML Tracer

You can install SAML Tracer extension in your browser its available for all browsers. 
With the SAML-tracer extension running one needs to do the following:

1. At the login page hit "X Clear" in SAML tracer(top left) and then perform a login attempt.
2. When the login session is captured hit "Export" and attach this export to the ticket.

#### In case multiple Harness instances and setup with SAML App redirecting to a different Harness instance instead of one expected.

In case you have say Sandbox and production Harness instances and you are using the Azure SAML APP which also has multiple Harness apps. 
It is important to specify the Entity ID below the Authorisation in Harness UI while creating the SAML App integration. 

#### How to inspect your certificates for delegate certificate issue. 

The below commands will hep you inspect your certificates. 

Inspect a certificate chain - x509 PEM file
```
Keytool -printcert -file /path/to/cert
```

```
openssl x509 -text -noout -in certificate.pem
```

Inspect a truststore file

```
keytool -list -v -keystore /path/to/truststore
```

#### Delegate fails to register with handshake exceptions. 

While creating a delegate it might start to register and then fail with SSLHandshakeException. 

To resolve the handshake exception, do the following:

Run to the command below to test the certificate chain you used to install Harness Manager.
```
curl -cacerts path/to/ca-certs/file https://<MANAGER_HOST>/api/account/<ACCOUNT_ID>/status
```
Then Install the certificate on the delegate

Reference : https://developer.harness.io/docs/platform/delegates/troubleshooting/certificate-issues#handshake-exception

#### Delegate connectivity issues because of proxy IP.

While configuring the delegate proxy , many times we specify the Proxy Host IP and not the PROXY_HOST. 
We always recommend to have the PROXY_HOST and not IP as in case your IP changes to a new IP , your delegate will start to fail causing issues. 

#### How to Avoid Hitting the GitHub API Rate Limit When Using Multiple Templates and Git-Stored Pipelines?

To minimize GitHub calls from Harness, enabling the bi-directional git experience may significantly reduce the number of requests.

#### Why am I getting an error while creating a template using a service account token generated under a project?

You are likely using a token scoped to a project when creating a resource at the account level, the same applies to a project token while creating a resource at the organization level. To create resources across different levels (account/organization/project), your token must be at a higher level or at the same level as the scope.

#### Why is my Terraform plugin crashing when using the Harness provider?

Generally, this issue is related to a bug in our provider. Before opening a ticket, please try using the latest provider version. Run your script again to see if the problem persists. If the issue continues, please proceed to open a support ticket for further assistance.

#### How should complex expressions be correctly utilized?

When using a complex expression, ensure the expression is wrapped within `<+ >`. For example: `<+<+org.name>.toLowerCase()>/<+<+project.name>.toLowerCase()>>`.

#### How can I retrieve a specific type of connector across multiple accounts, organizations, and projects using the API?

Unfortunately, it's only possible to retrieve all connectors within a specific scope, the following attribute `includeAllConnectorsAvailableAtScope` allows you to retrieve easily all connectors above the project scope using the API Method `Fetches the list of Connectors corresponding to the request's filter criteria`.

#### How can user build debug delegate image ?

You can build and push from local to gcr-play or any other place you want.
 - Copy delegate.jar from local machine (change Dockerfile-minimal in harness core)

``` 
COPY delegate.jar delegate.jar 
```

- Build image:
```./scripts/bazel/build_bazel_delegate.sh immutable
cd dockerization/delegate/
docker build -t us.gcr.io/gcr-play/delegate:<give your tag> -f Dockerfile-minimal .
docker push us.gcr.io/gcr-play/delegate:<your-tag>
```

If you want to publish this in dockerhub, then in place of gcr use your private dockerhub, do a docker login before pushing image.
Also there is a GitHub PR trigger to publish immutable delegate from your changes: `trigger publish-delegate`

#### What do we need to backup to recover quickly when Harness infrastructure is lost ?

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours. Back up recommendation is to use Velero tool. You can refer to mentioned doc for fuurther info [docs](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-restore-helm).

#### If the infrastructure is lost, how should it be restored?

Back up and restore covers Harness specific things only, it does not cover infrastructure loss. If that happens expectation is to have a working k8s cluster ready to restore harness namespace.

#### Do user permissions in Harness with JIT provisioning and SAML authentication inherit from the SAML provider, or do they require separate configuration in the Harness Account?

No, user permissions in Harness with JIT provisioning and SAML authentication do not inherit from the SAML provider. Permissions need to be explicitly configured in the Harness Account. The JIT provisioning process ensures that users are dynamically created in Harness based on SAML authentication, but their permissions within Harness need to be set up independently.

####  Does Harness support permission mapping or inheritance from external systems in any Single Sign-On (SSO) model?

No, Harness does not support permission mapping or inheritance from external systems, including in various Single Sign-On (SSO) models. User permissions must be explicitly configured within the Harness Account, and as of now, there is no support for permission discovery or synchronization from external systems. All permissions need to be manually configured within the Harness Account.

#### How does SCIM work in Harness, and what are its limitations?

SCIM in Harness is primarily used for user provisioning and de-provisioning. It simplifies user management but has limitations. SCIM does not handle role bindings or permissions directly. Admins must manage role bindings and permissions within Harness separately, even when using SCIM for user provisioning.

#### Does Role-Based Access Control (RBAC) apply to Git Bi-Directional Sync in Harness?

 No, RBAC settings specific to Git Bi-Directional Sync are not available. The RBAC of the entity is used, and there are no individual role bindings for fine-grained control over bi-directional sync. As of now, the options for controlling bi-directional sync are limited to enabling or disabling it.

#### What is the default timeout for custom secret manager script timeout? Can the timeout be configurable?

It defaults to 60 seconds. Timeout is not configurable.

#### Why is kinit (from the krb5-workstation package) not included in our immutable image for non-root users, leading customers to bake it in themselves?

The decision to exclude kinit from our immutable image is primarily driven by concerns related to image bloat. We maintain a specific set of binaries, including Delegate-required SDKs, in the Delegate to address the specific use cases of our Continuous Delivery (CD) customers. By excluding non-essential binaries, we aim to optimize image size and streamline the image for CD workflows. You can refer the [docs](https://developer.harness.io/docs/platform/delegates/delegate-reference/delegate-required-sdks).

####  Can customers enable root privileges to add the kinit binary to the image?

Enabling root privileges to add the kinit binary is an option, but it may pose security concerns for some customers. The exclusion of kinit in the immutable image aligns with security considerations and is designed to provide a minimal and secure image for CD use cases. If customers have specific security requirements, they may consider installing the required binaries, such as kinit from the krb5-workstation package, manually, even in an air-gapped environment.
You can refer the [docs](https://developer.harness.io/docs/platform/delegates/install-delegates/enable-root-user-privileges-to-add-custom-binaries).

#### Are metrics for the Docker Delegate published, and how can Prometheus scraping be configured?

Yes, metrics for the Docker Delegate are published. To enable Prometheus scraping, you would likely need to open a port on the container and bind it to the Delegate metric port. This allows Prometheus, running separately, to scrape and collect metrics from the Docker Delegate.

#### How can user only edit existing pipeline but should not be able to create any new pipeline?

You can create the Roles and Resource Group like below..
- Roles : Create/Edit,
- RG : Select the specific pipelines within RG that the user should be able to edit.
This will allow them to edit the pipelines that exists and can not create any new one. They need to select all the pipelines.

#### Why am I receiving a 400 status code error with an "unsuccessful HTTP call" message when using a Jira step in Harness?

The following 400 Invalid format error typically occurs when using a Jira step in Harness:

```
"Unsuccessful HTTP call: status code = 400, \
message = {"errorMessages": [,"errors": {"customfield_54321":"Invalid format. \
 Expected an array of objects with either an Option ID or an existing value."}]}"
```

Often, this is related to the configuration of a custom field. In this case, the custom field `customfield_54321` is an array field, and the provided value didn't match the expected format. It can also indicate that the Jira plugin in your Jira step isn't compatible with Harness because Harness doesn't provide the data in the required format for the plugin.


The error arises because the value being passed to Jira doesn't match the expected format. Jira expects the value to be in the format of an array of objects, and in the following example it has a String as its value:

```json
"customfield_54321": [
    {
        "id": "12345",
        "value": "Test Operations"
    }
]
```

The error message indicates that Harness doesn't support this specific Jira plugin, leading to the formatting issue.

If you encounter a similar problem with this Jira plugin or any other plugin, it is recommended to reach out to your Jira support team to explore potential solutions. They can provide the necessary guidance and support to ensure the smooth and efficient operation of your Jira instance.

#### What steps can we take to prevent encountering 429 errors when utilizing DockerHub connectors in Harness?

 If you are facing 429 rate limiting errors when attempting to pull Docker images from DockerHub using Harness, you can mitigate this issue by adjusting your authentication settings:

1. **Authentication Method:** By default, Harness utilizes anonymous access to the Harness Docker Hub for image pulls.

2. **Switch to Username and Password Authentication:** To overcome rate limiting issues, select "Username and Password" as your authentication method in your Docker connector configuration.

3. **Provide Login Details:** Once you've selected "Username and Password" authentication, enter your DockerHub login credentials (username and password) in the connector settings.

By configuring Harness to use your DockerHub credentials, you ensure that you have the necessary access privileges to pull images without encountering rate limiting issues.

These adjustments will help you avoid 429 errors and ensure a smoother experience when working with DockerHub connectors in Harness.

#### How Do Delegates Share Information Like Helm Chart Contents Within the Same Stage?

The process of sharing information between delegates within the same stage in Harness follows this flow:

1. **Task T1 - Downloading values.yaml File:**
   - Harness Manager creates Task T1, instructing it to download the `values.yaml` file.
   - Delegate1 is assigned Task T1, and it retrieves the `values.yaml` file from the designated source (e.g., Git/Remote).
   - Delegate1 then sends the contents of the `values.yaml` file back to Harness Manager.

2. **Task T2 - Downloading and Applying Manifest Files:**
   - After receiving the `values.yaml` file content, Harness Manager creates Task T2.
   - Task T2 includes the content of the `values.yaml` file.
   - Delegate2 is assigned Task T2.

3. **Delegate2's Actions:**
   - Delegate2 executes the following actions:
     - Downloads the manifest files from the specified source (e.g., Git, Remote, Helm Artifact Source).
     - Utilizes the content of the `values.yaml` file to render the manifest files, customizing them as needed.
     - Applies the rendered manifest files to the target cluster.

**Important Note:** The output of Task T1 (values Fetch task) is the content of the `values.yaml` file. This content is then passed to Task T2, enabling Delegate2 to use it in rendering and applying the manifest files.

This process ensures that delegates effectively share information and utilize it as required for the deployment process within the same stage.

#### What should we put (if anything) in the "JIT Validation Key" and "JIT Validation Value" fields when JIT provisioning is enabled in SAML?

This can either be left blank, as it is not required, or you can add a Key (aka saml attribute) to expect, along with the value of the attribute/key to expect, in this way you can have some users that send this defined attribute and others that do not which allows you to selectively provision users via JIT

#### What is the default entityID (audience restriction) the Service Provider endpoint(ACS URL) uses when not defined?

The Deafult entityID is `app.harness.io` unless otherwise specified.

#### Unable to refer Custom Secret manager template stored in GIT

Currently, we do not support reference of Custom Secret manager template stored in GIT, please create inline template and you will be able to refer those

#### Upon successful azure saml login for prod account harness is redirecting to stage/dev account

Please check if entity id is set correctly in case if you are using multiple account, as if you are using vanity url then the entity id needs to be set accordingly while setting up saml in Harness as well as on azure side

#### What will be entity id in case of on-prem setup or if vanity url is used

In case of above it needs to be the domain used to access harness(example : vanity.harness.io) 


#### How can I easily disable pipeline triggers

You can navigate to the trigger under pipeline and can toggle the enable button to disable the trigger on top left

####  I'm not able to view the projects

Please check if you have required Role and permission granted to view Projects, you can reach out to your account admin to confirm the permission granted for your account

#### I want to share delegate from one project to another?

In this case you can install the delegate on org level if both project are under same org, otherwise need to install delegate on Account level. As delegate installed under project has scope limited to same project

####  What permission do I need to see deployments for all projects?

You can create a role and add view permission for pipeline with account scope, you can find sample one as below for having execute permission similarly you can create one for just view access
https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#rbac-workflow-examples

####   How to signout?

You can click on My profile Under bottom left and you will able to see Sign Out option coming in.
