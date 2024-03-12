---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
sidebar_position: 2
---

# Harness Platform FAQs

### I have a secret that is connected to Vault. Do I need to connect to Vault to view it?

For security reasons, access to the secrets requires a connection to Vault. However, you are allowed to use them. For more information, go to the following:

- [Add a HashiCorp Vault secret manager](/docs/platform/secrets/secrets-management/add-hashicorp-vault/)

- [Reference existing secret manager secrets](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/)

- [Harness secrets management overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/)

You can reference the secrets using the following as a guide.

[Reference the secret by identifier](/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier)

### Why am I getting a "missing expected [" error when I didn't get it before?

You might get the error below because Harness standardized to move from using maps to sets of strings for tags.

```
Planning failed. Terraform encountered an error while generating this plan.
Error: missing expected [
...
Error: Terraform exited with code 1.
Error: Process completed with exit code 1.
```

To fix this, update your state file to change the tags field from a map to a set of strings, for example `"tags": {}` to `"tags": []`.

### How can I resolve environment variables in JEXL conditions?

Unfortunately, JEXL conditions do not support the direct usage of environment variables. The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.

### What is the Perpetual Task (PT) iterator delay (Max delay from PT created, to PT being assigned if delegate is available)?

The max delay is 60 seconds. Harness runs the PT iterator every 60 seconds for task assignment.

### What is the delegate poll interval for new PT tasks. (Max delay from PT being assigned to delegate picking it up and executing it, say there is only 1 delegate)?

It depends on task to task, you can find the interval for your task in the `perpetualTaskScheduleConfig` in the dms db.

### Can I verify if delegates were available at a specific time and check their past connectivity?

Yes, you can check delegate logs for this information.

### If there are some users that were manually added to the account, then will they get removed once the SCIM integration is configured/enabled for the account?

No, manually added users will not be removed after SCIM integration added, they would continue to be part of account.

### What happens if the same user was manually added first and is part of the SCIM?

If the same user was manually added first and now pushed from SCIM, it would be marked externally managed, and from that point onwards this user would be updated through SCIM (i.e. name, email of user would get updated through SCIM).

### Do we have any notification when delegates enter an expired state in NextGen?

We currently do not offer support for this feature. However, it is included in our roadmap for future development.

### Do we have a dashboard where I can track the current status of my delegate?

Yes , you can set up Prometheus to get the metrics. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics).

### Does delegates logs are only sent to Harness or can I also query delegate logs in my own cloud logging system?

By default, delegate logs are only sent to Harness and it can be enabled/disabled using this env variable - `STACK_DRIVER_LOGGING_ENABLED`. For more information, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).

### I have set up SAML successfully. Why doesn't the link populate to SSO inside the user group?

You need to enable authorization in your SAML.

### I have the PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES feature flag enabled, why am I still getting emails when I add a user in an Org/Project?

The `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` feature flag works for user invites. When a user is added as member to a user group, a separate notification is sent, which is not dependent on this feature flag.

### I have a large list of users to fetch, but the API has a limit of 100 and takes lot of time. Do I have an alternative?

To retrieve the list of users from API, you can use the following curl command.

```bash
curl --location --request GET 'https://app.harness.io/gateway/api/users?accountId=<AccountId>&limit=3000&offset=0' \
--header 'accept: application/json, text/plain, */*' \
--header 'authorization: Bearer ${token}' \
```

### Can the same Github Repository be used for different projects with GitX Enabled?

Yes, you can add multiple projects to the same repository. GitX is entity-based, not project-based.

### Does Harness Support ever have write access to our account?

No, Harness will never have any write access to your account.

### Is auto-upgrade available for ECS delegates?

No, we only support auto upgrade for Kubernetes delegates.

### Is SAML single logout URL supported?

Yes it is supported. You can configure this while setting up SAML.

### What is the Idle Session Timeout? Can it be configured?

The idle session timeout is 24 hours. You can configure the session timeout via **Account Settings**.

### When does the old replicas get clear out post getting disconnected for immutable delegates?

They are cleared out in 6 hours after they're disconnected. For more information, go to [Delete replica pods](/docs/platform/delegates/manage-delegates/delete-a-delegate/#delete-replica-pods).

### Do we support auto upgrade in Helm type delegates?

Yes, we support auto upgrade in both these type delegates. This can be achieved by following `upgrader.enabled=true` while running the install command.

### Do we log the GET Calls in our Audit Logs?

We don't support Audit Trails for read API request like GET.

### I have my Environment at Org/Project/Account Level can I Git sync them?

No, this isn't currently supported.

### Is there a way to exclude a delegate from taking a task?

There is no way as of now to exclude delegates from picking up tasks for other pipelines.

### What is the difference between the delegate YAMLs of account vs org vs project?

We differentiate the delegate YAML based on the value of `DELEGATE_TOKEN`.

### There are ‘Delegate Profiles’ for delegates in the FirstGen. There are 'Startup Script' in it. What is the equivalent in NextGen?

You can use `INIT_SCRIPT` when launching the delegate. For more information, go to [Install a delegate with third-party tool custom binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/).

### How can I find User login activity in Harness?

You can filter and find user login activity in the Audit trail (in both FirstGen and NextGen).

### How can I securely store my delegate tokens?

You can store delegate tokens as Kubernetes secrets. For more information, go to [Store delegate tokens as secrets](/docs/platform/delegates/secure-delegates/store-delegate-tokens-as-secrets/).

You can also store the token in vault and reference the token in YAML. For more information, go to [Rotate tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-rotate-tokens).

### Why don't I see data for a new user?

Check the user group assigned to the user. If the user isn't assigned to any user group/role, they will not be able to view or access any relevant data.

### What is the Helm delegate chart name?

The Helm chart name is `harness-delegate-ng`. You can access the metadata and the repo below.

- https://app.harness.io/storage/harness-download/harness-helm-charts/ 
- https://github.com/harness/delegate-helm-chart

### Is there an expiry for 2FA secrets?

No, there is no expiry for 2FA secrets.

### Is there any way to automatically accept an invite for local login users?

No, it’s not possible because initially, the user must use the invite email to set their password. This is only possible when using SAML authentication.

### Is there any ability for an admin user to assume the same role as an alternate user for testing permission issues?

No, there is no such option currently. To debug permission related issues, check the groups and roles assigned to user.

### What causes the “User is not authorized to access the account. Please contact your admin” when trying to accept the invite and set up a local login password?

The most common reason for this failure is your account has domain whitelisting applied, and the domain used in your username is not in the allowed list. In this case, you can see the `DOMAIN_WHITELIST_FILTER_CHECK_FAILED` on the **Network** tab.

### How is rate limiting applied in Harness?

Harness internally imposed a limit to allow a certain number of requests per minute as well as per second.

The limit we have imposed is if an account exceeds 350 QPM or 350/60 = 5.833 QPS, then the requests will be throttled for all the external facing APIs.

There are 14 external facing API resources, and this limit applies to all those APIs.

```
350 QPM and 5.833 QPS
```

The limit gets imposed based on QPM as well as QPS.

The Ratelimiter decides on what seconds out of the 60 for every minute which 50 seconds it will allow 6 QPS and rest 10 seconds allow only 5.

While running queries you might sometimes observe 429s that is because of the above limit.

```
429 - Server Errors : The rate limit is exceeded.
```

### Why do I receive errors with Okta SCIM provisioning?

Below are the steps you can use to troubleshoot SCIM provisioning with Okta.

Validate the SCIM Connector Base URL. This can be mistaken with the SAMl URL.

```
URL: https://app.harness.io/gateway/ng/api/scim/account/<account_id>
```

Also, when you create the personal access token, make sure it has the required the role bindings (admin).

### What is the Graphql API query to list executions with details between a specific time range?

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

### What are the required permissions for SCIM tokens?

To perform SCIM operation with a token, the Service Account needs to have the mandatory permission in the role. Only the User/User Group permission should be assigned to the service account to perform SCIM operations with the created token.

### How can I disable Local Login in my Harness account?

Contact [Harness Support](mailto:support@harness.io) to enable the feature flag `DISABLE_LOCAL_LOGIN` to disable local login for the account.

### Which API fetches all the users in Harness?

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

### Why don't I have the Launch Next Gen button in the First Gen UI after logging in?

There are permissions for the User group **Hide NextGen Button** under Account Permission in any User Group. Make sure this is toggled to **Off**, or you won't see the **Launch Next Gen** option in the UI.

### What causes user login issues when users are part of multiple accounts?

If you have multiple accounts and one of them uses SAML login while the others use username and password, you need to ensure that the SAML account is set as the default account. Otherwise, the SAML login mechanism won't work as Harness considers the login mechanism of the default account only.

### Are delegate tokens stored in MongoDB?

Yes, the delegate tokens are stored in MongoDB.

### Should we store the token that hasn't been generally available yet in the secret manager?

No, we don't use the customer secret manager to encrypt delegate tokens. Rather than storing the token in plain text, we leverage Harness' internal encryption mechanism. This mechanism enables us to store the token's encrypted value in the database. This approach enhances security and mitigates potential risks associated with storing sensitive information.

### Do we have any static limit in NextGen like FirstGen (pipeline/service creation etc)?

No, we don't have limit on pipeline creation. We do have a limit for entity creation for the free/community tier, but no limits for the enterprise tier.

### Is there a limit to the number of triggers a pipeline can have?

There is no limit to the number of triggers for a pipeline.

### Can we raise the parallel stage limit for a customer?

These limits are important for the stability of our systems. The limit is set at 30 for parallel stages for enterprise customers.

### Do we have the ability in NextGen to alert/notify when a delegate is down?

No, we don't currently have this feature.

### Why can't I delete a connector referenced by an entity that is no longer present?

You can delete a connector referenced by an entity that is no longer present by enabling the **Force Delete** option in default settings.

### What is the naming convention used when creating a default delegate token?

The default token is named using the convention of the level at which it is being called, for example, `default_token/org/project`.

### Can I delete my delegate token?

The delegate token cannot be deleted, it can be only revoked. Revoked tokens are deleted after 30 days.

### When we add a delegate tag via API, why does the tag disappear when the delegate is restarted?

The delegate tags disappear because they are not in the original delegate YAML that was used to start the delegate.

### When my delegate is restarting, why do I see "Failed to find field for io.kubernetes.client.openapi.models.V1JSONSchemaProps.x-kubernetes-list-map-keys" in logs?

You should create the delegate with the minimum recommended resources to solve this issue. For more information, go to [Delegate sizes](/docs/platform/delegates/delegate-concepts/delegate-overview#delegate-sizes).

### Is there functionality to auto-accept invites for username/password login?

No. This option is available for SAML-based logins because authentication is handled by the SAML provider. For username/password logins, you must create a password in Harness.

### Do we have documentation for installing a custom certificate in a Kubernetes-based delegate?

Yes you can install custom certificates for Kubernetes delegates. For more information, go to [Install delegates with custom certs](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### What happens to tasks rejected by the delegate?

Delegate reject tasks or fail to acquire tasks when CPU and memory reach above a certain threshold if the flag `DYNAMIC_REQUEST_HANDLING` is set as true in the YAML.

### Can we set the delegate to reject new tasks if x% of memory is being consumed?

Yes, you can specify what threshold to reject the task using the flag `DELEGATE_RESOURCE_THRESHOLD`, otherwise, the default value is 80%. For more information, go to [Configure delegate resource threshold](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).

### What is the behavior when DYNAMIC_REQUEST_HANDLING is set to false or not set at all when memory reaches 100% ?

It will not try to acquire any task. Once the resource level goes down it will start accepting tasks again. There will be no crash of delegates or shut down of delegates during this case.

### If project level users don't have access to account-level secrets, they should not be able to access them. What can I do so that project level users won't be able to access account-level secrets? How is this handled by RBAC when using expressions?

The feature flag `PIE_USE_SECRET_FUNCTOR_WITH_RBAC` when enabled can help you achieve this.

### How can we prevent users with project scope access to account-level secrets?

This can be changed by modifying the role bindings of the All Account Users user group and assigning any other Role and ResourceGroup as per their need.

### Does Harness support auto-upgrade for Docker delegates?

No, auto-upgrade is not an option for Docker delegates. You can update your Docker delegate image when Harness releases a newer version.

### Do we have rate limit For FirstGen, exporting deployment logs? Can this be removed or modified per account?

Yes, Harness enforces rate limits. For more information, go to [Rate limits](/docs/platform/rate-limits). We cannot remove rate limits per account, but you can always request an increase.

### Is there a way to get a secret as base64-encoded?

No there isn't support for getting secrets as base64, but you can store the value as a base64-encoded secret and then get the value using the expression `secrets.getValue("my_secret")`.

### Is create-namespace option available in Harness while deploying chart?

You can point to a manifest file containing just the namespace YAML. This means you can create a Kubernetes YAML file that defines only the namespace you want to use for your application. Even a shell script step would be simple enough in this case, and use a kubectl command directly. This suggests that using a shell script as a step in your deployment process to apply the namespace YAML file is straightforward. You can use the kubectl command in the shell script to create the namespace.

### Where can we download the Helm chart for delegate manually and not using Helm commands?

The delegate Helm chart is available [here](https://github.com/harness/delegate-helm-chart/tree/main/harness-delegate-ng).

### I have a custom delegate and I'm trying to execute the script, but the script is executing as a root user. How can I change the user?

In the delegate YAML, you need to modify the `runAsUser` field, which is set to 0, indicating that the script runs as the root user.

### How can I list all delegates in account?

You can use the [list delegate API](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/listDelegates).

### How can I revert the "externally managed" status of user groups if they were indeed managed by SCIM earlier?

If user groups were previously provisioned via SCIM and marked as "externally managed," you can update it by updating the "externally managed" field back to false via Terraform or API.

### Can I rename the project identifier?

No, the project identifier can't be renamed because it is set when the project is created. You can rename the project, but not the identifier.

### Is the io_harness_custom_metric_task_execution_time in seconds or milliseconds?

The time it takes to complete a task (in seconds). For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).

### We have a user group named Ex:"Test", where the team members are given access to edit cloud providers. Even though Manage Cloud Provider option is enabled, User from that User Group are not able to edit.

Check the usage scope. Even if the user group has permissions, if the usage scope has a different application added apart from the ones specified, then the users won't be able to edit the cloud providers.

### Delegate mTLS Support

Currently, mTLS is only supported for Kubernetes delegated. We will be adding support for Helm and Docker delegates in the future. Harness supports both Loose and Strict mode.

### How do I check the version in Harness Self-Managed Enterprise Edition?

You can check the version by running the command below.

```
helm list -n namespace
```

It will show the app version, which is the version of your Harness edition.

### Do you have documentation for network setup or Harness Deployment Architecture?

Yes, we do have documentation for Harness deployment architecture, refer to this [Documentation](https://medium.com/harness-engineering/harness-deployment-architecture-a667fe359342).

### Do you have either a Splunk option or another public cloud option like GCS for audit log streaming?

No, we don't currently have this option.

### Can I set the delegate upgrader job to point to a custom private registry?

Yes, the delegate `upgrader` job can be set to point to a custom private registry. For more information, go to [Use automatic upgrade with custom delegate images](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Can I set SCM_SKIP_SSL while working on Docker delegate?

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

### Can I create another project under the project?

As per the current design, you can't create a project under the project. The project is a separate entity that can't be created inside another project.

### How can I customize a build pipeline? For example, how can I create a script to clone the repo from TFS?

You can run a script in a run step of a build pipeline, as detailed in this [Run step settings](/docs/continuous-integration/use-ci/run-step-settings), and you should be able to clone the repo.

### How does the active service count show in License subscription?

We show the service usage account for the last 30 days.

### When we try to open a Git-enabled pipeline, why doesn't the branch dropdown display all the branches?

This behavior is expected when there are many branches in the repo due to pagination. To select branches that are not listed, try entering the full branch name manually. This should allow you to open the pipeline from that branch.

### How many branches are listed in the branch dropdown UI when we try to open a Git-enabled pipeline?

We typically list 20-30 branches, depending on the Git provider. Fetching all branches would be time-consuming.

### Where can we add the env attributes for delegate during Helm chart installation?

Delegate deployment for Helm chart installation is configured to pick the environment variable from ConfigMap. Check the name of the ConfigMap in the chart deployment YAML, the attribute is envFrom and edit the ConfigMap to add the corresponding environment variables.

### How does a delegate identify its scope for registration?

While installing delegates, we do not explicitly configure it to connect at the account, organization, or project scope. It is decided based on the scope of the delegate token. If the token is from the project scope, the delegate will register at the project level. This also applies to the organization and account level.

### Will the delegate continue to work if we delete the delegate token being used?

The delegate registration is only valid till the delegate token with which it has registered is available and not expired/revoked. If the delegate token is deleted, the delegate registration will no longer be valid, and it will fail authorization.

### How many types of API tokens are there?

There are two types of API tokens, one can be created at the user profile level. These are prefixed with `pat.xxxx....`, meaning personal account token. The second one can be created at the service account level, which is prefixed as `sat.xxxxx....`, meaning service account token.

### How do we assign permission to the API tokens?

We do not assign permission directly to the account tokens. They inherit permissions from the user if they are created at the user profile level, or the service account if they are created at service account level.

### What are Harness Conditional Alerts and Notifications?

Conditional alerts are a useful tool, which you can use to trigger notifications on specific conditions that are met or exceeded.

For more information, go to [Create conditional alerts](/docs/platform/dashboards/create-conditional-alerts/).

### Why am I receiving a 429 error response with regards to rate limits?

Harness has several rate limiters on the platform. Sending multiple requests in quick succession will generate the 429 response. For more information, go to [Rate limits](/docs/platform/rate-limits/).

### Do we have docs for the infrastructure requirements to install Harness Self-Managed Enterprise Edition?

Yes, for more information, go to [Production environment deployment infrastructure](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/harness-helm-chart#production-environment-deployment-infrastructure).

### What is required permission to add a SMTP configuration? I am getting a "Missing permission core_smtp_edit on smtp" error when I try to add Authentication Settings or Account Settings.

The permission needed for this Account Admin. Currently, only an Account Admin can edit the SMTP configuration.

### Does Harness allow you to set 2 AMIs with different CPU architecture?

Harness doesn't allow this in the same ASG.

### How can you control on-demand or spot provisioning within ASG group / target?

We supported spotinst ASG in FirstGen and we also have spotinst for NG also, to know more about it please read the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment).

### Can I pull in from multiple different Okta providers for multiple different teams with different RBAC/group needs?

No, we support only one SSO provider at a time, which is configured at the account level.

### Will the Cloud Connector propagate the tags to AWS calls?

No, The cloud connector will not propagate the tags to AWS while making calls.

### Where can we see the logs of AWS calls?

We have limited logging for the AWS calls.

### How do delegate selectors work in connectors?

The delegate selector in a connector always works as AND and not OR. Let's say you have delegate A named "ABC" and delegate B named "BCD". In the connector selector options, you will need to give only 1 tag, either "ABC" or "BCD". If you need to have multiple delegates there, then you will need to add custom tags to the delegate and specify the common one in the selector.

### If the value for secret starts with # for reference secrets

In case you value start with # in case of reference secrets, always use Double quotes as “#” is a special character to represent comments and it will work as expected.

Ex: The value for the secret is say "#7767test"
`echo "<+secrets.getValue("account.aaaatestaaatest")>" `

### Can I delete a user in the UI that was provisioned via SCIM?

Admins can delete users from the Harness UI, even if the user is provisioned via SCIM. However, this feature should only be used if the user is in a state where the SCIM app was removed, and hence the user cannot be removed. 

It's important to note that if the user is a part of multiple accounts, deleting them from one account will not remove their backend entry, and they may still exist in other accounts. If you try to re-provision the user from the SCIM app, you may encounter errors as the user is still present with the same user ID in the backend. 

To avoid these issues, you will need to remove the user completely from the SCIM app and provision them again as a new user.

### Is their a way to check which delegates are running at a particular time?

You can review the delegate logs to find the task that it was executing around a given time frame.

### Why am I getting an "IllegalArgumentException: kubectl is not installed for version V1_13. Available versions are: []" error?

You might receive this error if you are using minimal delegate images. Install the kubectl version and check to see if the $PATH is updated correctly.

### Why is the delegate not coming up and returning a no space left error?

When starting delegates, Harness installs some third party binaries(kubectl, Helm, etc.). These binaries require space. Make sure the delegate machine has sufficient remaining disk space.

### Is there a tool available for unit testing Harness rego policies before deployment?

No, we don't provide a dedicated tool for testing Harness rego policies. However, you can use the general-purpose testing tool provided by Open Policy Agent (OPA) to test your policies. More details can be found in the Policy Testing with [OPA documentation](https://www.openpolicyagent.org/docs/latest/cli/#opa-eval).

### How can I assign the same delegate replica to all steps in my pipeline?

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

### Does the NextGen platform support the same cron syntax for triggers as the FirstGen platform?

Yes, the NextGen platform supports both the QUARTZ and UNIX syntax formats for cron triggers. For more information, go to [Schedule Pipelines Using Cron Triggers](/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#schedule-the-trigger).

### Can I get user group and user lists in CSV or Excel?

No, we don't support that feature currently.

### What are the differences between delegate tag formats?

- *`yy.mm.xxxxx.minimal`*: This tag represents the minimal image format, which is recommended for production usage. It stands out due to its absence of high or critical vulnerabilities, making it a secure choice. Furthermore, this image format is lighter than the default option because it doesn't have the default binaries installed.
- *`yy.mm.xxxxx`*: This format corresponds to the standard delegate image. It includes all the default binaries and is a suitable choice for users who are relatively new to Harness and do not have stringent security requirements. This image provides a comprehensive set of tools and functionalities for general usage.
- `1.0.8XXX`X`: This format denotes an older version of the delegate, often referred to as the legacy delegate. New Harness accounts no longer include this delegate version, and users are strongly encouraged to migrate to the standard delegate for better compatibility, performance, and security.

For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

### Does Harness have OOTB roles at the project level?

Yes, we do have a Project Admin role built in and also no ability to delete built in roles. Org and Project specific built-in roles are available only after the corresponding entity is created, and they are only available in the respective scope.

### Why are delegates added to the blocklist?

The purpose behind the blocklisting of delegates is to ensure that every delegate task undergoes one or more validation/capability checks. When a task is assigned, we check if we have previously validated the delegate's capabilities. If the validation was done within the past 6 hours, it is considered valid. 

However, if it has been more than 6 hours or if it's the first time, we perform the validation again. If the validation fails, the delegate is blocklisted for 5 minutes for the same criteria. If another task with the same criteria is assigned during these 5 minutes, the delegate will be blocklisted for it as well. So, it's important to check which validation criteria were added to the task and which validation is failing.

### What are the Kubernetes version requirements for delegate installations?

We try to support all the active Kubernetes releases (that’s last 3 releases according to our versioning policy), i.e. we support anything that’s not EOL.

### Can we increase the daily deployment limit to 10000 for a customer?

Yes, we are capable of increasing the daily deployment limit > 10000 per day.

### How do delegates share information like a Helm Chart and its contents on the same stage?

To share information like a Helm Chart and its contents among delegates, there are two steps. First, download the `values.yaml` files on any of the delegates (it could be just one or more depending upon how many `values.yaml` files have been configured) and pass them to the next step. Then, the delegate downloads the Helm chart and uses the `values.yaml` files that were passed by the previous step. For instance, Delegate 1 can execute Fetch Files and pass the values/manifests to Delegate 2 that will execute the Helm Install/Apply.

### How do delegates communicate with each other when they are sharing information?

Delegates don't communicate with each other. They go through Harness Manager to retrieve the result of the tasks performed by another delegate.

### Are customer files stored in the manager during execution while Delegate 1 is communicating directly with Delegate 2?

Harness doesn't store customer manifest files in Harness Manager. Only `values.yaml` files are passed through Harness Manager.

### Are secrets in `values.yaml` files rendered in Harness Manager?

No, these secrets are never rendered in Harness Manager. They are only rendered in the delegate.

### Is it possible to define per User Groups who can/can’t open support tickets?

Currently anyone in the account can open a ticket, and access is not restricted.

### How can I see who's logged into my account?

You can use the audit trail. For more information, go to [Audit trail](/docs/platform/governance/audit-trail/).

### Is there documentation on installing and upgrading the Harness Self-Managed Enterprise Edition cluster?

Yes. For more information, go to [Install using Helm](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga) and [Upgrade the Helm chart](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/upgrade-helm-chart).

### How do I retrieve the correct author's email on a GitHub Pull Request Event?

When you push commits from the command line, the email address that you have configured in [Git](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address) is associated with your commits. However, for web-based operations, GitHub provides an option to maintain privacy regarding your email address. To ensure that you can fetch the correct user email through the expression `<codebase.gitUserEmail>`, you will need to disable the ["Keep my email addresses private"](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address) option in your GitHub settings.

### Why is my commitSha resolving as null on manual runs?

The expression `<+trigger.commitSha>` is available when the event comes from a Git operation. Instead, use the expression `<+codebase.commitSha>` for parsing manual triggers.

### How can I prevent lockouts when using SSO for login?

To prevent lockouts or in the case of OAuth downtime, a user in the Harness Administrators Group can utilize the [Local Login](https://developer.harness.io/docs/platform/authentication/single-sign-on-sso-with-oauth/#harness-local-login) URL [http://app.harness.io/auth/#/local-login] to log in and update the OAuth settings.
For the Harness production cluster _prod-3_, the local login URL is [https://app3.harness.io/auth/#/local-login].

### How can I autoscale a delegate using HPA?

By default, Helm delegates have autoscaling disabled, which you can enable by setting the value `autoscaling.enabled=false`. For Kubernetes delegates, you need to write an HPA manifest to scale the delegate's replicas.

### When defining a secret with a dollar sign, why does the shell print the secret partially?

Harness doesn't allow the `$` symbol in your secret value. If your secret value includes this symbol, you must use single quotes when you use the expression in a script.

### How can I access comprehensive information on Harness Security, including disaster recovery procedures, infrastructure details, and policies?

For in-depth insights into Harness' security practices, including disaster recovery procedures, infrastructure aspects, and policies, we recommend visiting our [Trust Center](https://trust.harness.io/). This centralized resource is designed to provide you with all the necessary information regarding the security measures we have in place to safeguard your data and operations.

### How do we provision users with pre-defined or custom roles?

With Harness, users and groups can be created automatically via SCIM. Permissions in Harness are granted via roles. You can use built-in roles or create your own at every Harness level (Account, Organization, and Project). You can assign roles to groups, and assigning roles to groups gives all the users in the group the permissions spelled out in the role. For more information, go to [Role-Based Access Control (RBAC) in Harness](/docs/platform/role-based-access-control/rbac-in-harness/).

### My delegate shows that it will expire in 2 months. Will it shut down after it expires?

Harness follows an N-3 support policy for delegates, which means we support the current version and the three preceding versions. With a new version released approximately every two weeks, each update brings enhanced features and general fixes. For instance, if you have version `24.03.XXXXX` installed, all images from `24.01.XXXXX` to `24.03.XXXXX` are supported. Delegate expiration doesn't imply that the delegate ceases to function. However, it may lead to potential issues if the backend advances significantly, causing the delegate to lose backward compatibility. To avoid this, we recommend upgrading the delegate at least once per quarter if you don't have [automatic upgrades](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#how-automatic-upgrade-works-in-the-kubernetes-manifest) enabled.

### How do I create a custom URL for my Harness account?

If you want a vanity URL, you can reach out through to Harness Support and request to create a custom subdomain, for instance: `mycompany.harness.io`.

### How do I identify files changed in a Git push event?

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

### What rate limiting policy does Harness employ for API requests?

Harness imposes a rate limiting policy on API requests to ensure system stability. This policy sets a limit of 350 queries per minute (QPM) and 5.833 queries per second (QPS) for all external-facing APIs.

### How is the rate limit calculated?

The rate limit is imposed based on both QPM (queries per minute) and QPS (queries per second). If an account exceeds 350 QPM or 5.833 QPS, the requests will be throttled for all external-facing APIs.

### How does the Rate Limiter work within a minute?

Within a minute, the Rate Limiter dynamically allocates time intervals. For 50 seconds, it allows up to 6 QPS, and for the remaining 10 seconds, it restricts the rate to 5 QPS.

### What happens when the rate limit is exceeded?

If the rate limit is exceeded during API requests, you may encounter HTTP status code 429 (Server Errors) indicating that the rate limit has been exceeded. This is a temporary restriction, and it is recommended to wait until the rate limit resets before making additional requests.

### How can I pass input variables to pipelines using a custom Curl trigger in Harness?

You can pass input variables to a pipeline using a custom Curl trigger in Harness by making a POST request to the Webhook URL associated with the pipeline trigger. You can include your custom variables as JSON data in the request body. Here's an example command:

```shell
curl -X POST -H 'content-type: application/json' \
--url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=&orgIdentifier=default&projectIdentifier=CD_Docs&pipelineIdentifier=Triggers&triggerIdentifier=Custom' \
-d '{"sample_key": "sample_value"}'
```

Replace `{"sample_key": "sample_value"}` with your custom variables, such as `{"tag": "stable-perl"}`, which can be declared as part of the pipeline and provided as runtime inputs when triggering the pipeline.

### What should I do if I want to update an existing User Group in Harness, but I encounter an error preventing me from saving the changes?

If you encounter an error when attempting to save changes to an existing User Group in Harness, particularly an error related to the Harness Identifier, it may be due to a restriction on naming Entity identifiers. According to Harness design specifications, certain characters, such as hyphens (e.g., "-"), are not allowed in Entity identifiers.

### Why am I experiencing this issue with User Groups?

This issue can occur if a User Group was provisioned via SCIM (System for Cross-domain Identity Management) before October 2022, and it contained a hyphen ("-") in its name. At that time, the hyphen was allowed, but the design restrictions have since changed.

### What is the recommended resolution for this issue?

To resolve this issue, you need to de-provision the affected User Group from Harness and then provision the same User Group again. This will create a new Harness Identifier for the group, ensuring that any naming restrictions are applied correctly, and it should no longer contain hyphens or other disallowed characters.

### Why is the Harness Delegate instance status showing Expiring in 2 months but the latest version is valid for 3 months?

For the delegates with an immutable image type, the instance status will show Expiring in 2 months only, it's the expected behavior.

### Why am I not seeing my deployments on the Overview page of the project?

Please check the timeframe for the page. By default the timeframe is set to 30 days. You can adjust this to a different time frame.

### Harness dashboard is not showing a previous deployment, why?

Please check the timeframe for the dashboard page. By default Harness sets this value at 30 days. It is possible that the deployment was executed before this timeframe.

### When we recommend setting POLL_FOR_TASKS to true in a non production environment?

For customers who do not want to take the web socket path due to any infrastructure challenges, we recommend enabling `POLL_FOR_TASKS`.
For customers with polling enabled, delegate checks with Harness for any task to execute based on the interval set, versus web socket communication being immediate.

### Does polling mode only work for legacy delegates and not delegates with an immutable image type?

Currently, by default polling is only supported for legacy delegates, not for delegates with an immutable type. Polling mode works for delegates with an immutable when you add `POLL_FOR_TASK` as `true` in the delegate YAML.

### What does Delegate Identifier=DETECTING mean?

`Delegate Identifier=DETECTING` is auto upgrade which can be on or off, for more information, go to [Determine if automatic upgrade is enabled](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#determine-if-automatic-upgrade-is-enabled).

### What is cron job in the Kubernetes manifest, and why is it needed?

The Kubernetes manifest has a component called upgrader. The upgrader is a cron job that runs every hour. Every time it runs, it makes a call to Harness Manager to determine which delegate version is published for the account. The cron job is required for the auto upgrade flow.

### How can we disable cron job?

If you need to disable auto upgrade, first run the following command to suspend auto-upgrade on the installed image:

```
kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>
```

Then, in the delegate manifest, locate the `CronJob` resource. In the resource spec, set the suspend field to true `spec: --suspend: true`.

### Why don't I see Dashboards in my Harness Self-Managed Enterprise Edition installation?

Dashboards are a licensed functionality. If you don't have a current license, dashboards are not available in your installation.

### Connector error causing pipeline failure

Connectors are often tied to a secret, such as a password or SSH key, that can expire. Expired credentials are a common cause of execution failures with connector errors. If your build fails due to a connector error, check your connector's configuration to confirm that the credentials aren't expired.

### How can I avoid pulling Harness Delegate images from a public repo?

You can add a special Harness Container Image Registry connector to your Harness account. With this connector, the delegate pulls these images from the Harness Container Image Registry only.

For more information, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/)

### Does Harness support Google cloud functions in FirstGen and NextGen?

Yes, Harness supports Google cloud functions in both FirstGen and NextGen.

For more information, go to [Google cloud functions](/docs/faqs/continuous-delivery-faqs/#google-cloud-functions)

### How can I use Harness CD with Google Cloud Functions?

Harness CD pipelines help you to orchestrate and automate your [Google Cloud Function deployments](/docs/continuous-delivery/get-started/cd-tutorials/gcp-cloud-func) and push updated functions to Google Cloud.

### Why am I getting the "Unsupported block type with the Run on Remote Workspace" error?

It might be due to the configuration. Try this instead for the Terraform config file:

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

For more information, go to [Run on remote workspace](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#run-on-remote-workspace).


### What are delegate rings?

Harness uses the ring methodology, which is a popular approach in software release management for delegate releases. There are four rings, and to mitigate any adverse effects that may arise from new delegate releases, each Harness account is assigned a specific ring that corresponds to the latest delegate version for that account.

### I have automatic upgrade on in my delegate. Why is my delegate version behind what's listed as the latest version in Docker Hub?

Harness uses the ring methodology commonly used in software release management for delegate releases. The version for your account can be overridden to use the latest in Docker Hub using the [override delegate image tag API](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/overrideDelegateImageTag).

### Why does the reset password link keep sending me back to the login page?

The account password authentication might be disabled with another auth enabled, such as Active Directory. Reach out to your Active Directory Administrator in that case to reset it.

### How can I restore deleted projects?

Unfortunately, we don't soft delete entities and hard delete them. Therefore they can't be easily restored. Some entities can be restored using YAML from the audit trail.

### We don't have certain projects, but the Harness Terraform modules continue to read them. How can we remove unwanted data that exists in Harness?

This data could be in the state file if changes were made outside of the it. Inspect your state file.

### I am getting an "Error Summary Invalid request: At least 1 valid user group is required in Approval". What causes this error?

The variable being passed for the Approvers > User Groups is potentially invalid or at the wrong scope.

### Can I use the delegate image from my immutable image type delegate and replace it in the YAML for the statefulset from the legacy delegate?

This is not supported. Delegates with an immutable image type should be run with delegate YAML generated from the UI, which will generate a deployment if the delegate is [enabled for the account](https://apidocs.harness.io/tag/Accounts#operation/isImmutableDelegateEnabled).

Here is an [example manifest file for NextGen](/docs/platform/delegates/install-delegates/overview/#example-manifest-file).

### Why do I get a 400 error when creating a connector via the Create Connector API?

When using the [Create Connector API](https://apidocs.harness.io/tag/Connectors/#operation/createConnector), invalid characters (such as parenthesis) in the name can cause Bad Request (400) errors, such as:

```
requests.exceptions.HTTPError: 400 Client Error: Bad Request for url https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=\<ACCOUNT_IDENTIFIER>?
```

### Doe Harness support TLS 1.3?

Both the Harness Delegate & SaaS support TLS 1.3, the default TLS version. It is worth noting that each specific task implementation can create its own separate HTTP client, which can advertise any TLS version of its choice. The connector check uses the task-specific HTTP client rather than the delegate's HTTP client. Some tasks prefer to use TLSv1.2 in certain use cases, perhaps due to legacy reasons. However, it is possible that this might change in the future, and full TLS 1.3 support might eventually be rolled out. As of now, certain connectors still prefer TLS 1.2.

### Is there a tool to migrate from FirstGen to NextGen?

Yes. You can use the [migrator tool](https://harness.github.io/migrator/).

### Is there a timeline of when I need to upgrade to NextGen by from FirstGen?

Yes. For more information, go to [Timeline](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd/#timeline).

### Where can I find the source code to the Harness Delegate?

[Here is the link](https://github.com/harness/harness-core/tree/develop/260-delegate) to the source code for the delegate.

### Where can I find the source of the Helm chart for the delegate?

[Here is the source](https://app.harness.io/storage/harness-download/delegate-helm-chart/) of the Helm chart for the delegate.

### Where can I find delegate release notes?

For information about Harness Delegate features, go to the [Delegate release notes](/release-notes/delegate).

### Why is automatic upgrade turned off for my delegate?

It could be it was disabled through `kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>`, or the cronjob was deleted, or the cronjob never existed (the Kubernetes audit logs can help you find out if it exists).

### Is there documentation for the list Harness allowlists for Google GCP?

Yes. For more information, go to [GitOps allowlist](https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/).

### Is there a feature to route info/error diagnostics through the Harness network?

At this time, the feature is not yet available. The delegate sends information and error diagnostic logs directly to the Harness Stackdriver in the Google Cloud. This traffic does not go through the Harness network, but directly to the Google Cloud network. However, if you prefer not to send diagnostic logs, there is an option to disable this feature.

For more information, go to [Delegate logs](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-logs).

### Is there documentation for adding and referencing text secrets?

Yes. For more information, go to [Reference the secret by identifier](/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier).

### What is the expression we can use if we want to use secret in a script?

If you want to use a secret in script, you can use the expression `<+secrets.getValue("account.mySecret")>`.

### The Harness Delegate config-watcher is causing heavy usage of disk space and causing alerts in prod nodes. How can we increase the watcher memory settings?

You can overwrite the watcher memory setting via `WATCHER_JAVA_OPTS`. If you want to increase the memory for watcher, you can add the following in the delegate YAML env section `- name: WATCHER_JAVA_OPTS value: "-Xmx512M"`.

### Can scope creation happen during delegate install?

Delegate scope is decided by the scope of delegate token. For more information, go to [Delegate scope](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-scope).

### Is it possible to increase the client side timeout when getting pods for a Kubernetes delegate?

Yes, you can increase the step timeout.

### How can we enable the feature flag DELEGATE_TASK_CAPACITY?

For information about this feature flag, go to [Delegate task capacity](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-task-capacity).

### Do we need to provide both sso_group_id and sso_group_name, and if so, should they match?

Yes, you must provide both. The value provided for both `sso_group_id` and `sso_group_name` should be same.

### Why does the Okta login goe to the FirstGen interface?

Change the Default Experience to Harness Next generation under **Account Overview**.

### How do I scale delegate replicas?

You can update autoscaling parameters in your `values.yaml` file.

```yaml
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

For more information, go to [Autoscale using replicas](/docs/platform/delegates/manage-delegates/auto-scale-using-replicas/).

### Why aren't approval notifications getting triggered when the correct user group is selected?

Please check and verify if the user group selected has any channel (email/slack, etc.) is configured under Notification Preferences.

For more information, go to [Notification settings](/docs/platform/notifications/notification-settings/).

### Do I need to enable authorization for SSO to work while setting up SAML?

Authorization is used for group mapping. It's optional and not required for SSO login to work.

### How do I use a custom Helm3 version in the FirstGen legacy delegate?

You can install the latest version and set the env variable to the binary path `HELM3_PATH=/opt/harness-delegate/client-tools/helm`.

### For the delegates hosted on Azure VM, which authentication method should we use when setting up a vault connector?

For Hashicorp Vault, there are 5 types of Auth supported. Except AWS Auth and Token (not recommended because they need periodic renewal), any of other 3 work, depending on your setup and preference. For more information, go to [Add Hashicorp Vault step 2 overview](/docs/platform/secrets/secrets-management/add-hashicorp-vault#step-2-overview).

### How can we export all FirstGen information: deployments, services, env, etc. that have been deployed?

Go to [Export deployment logs](/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/export-deployment-logs/) and [Use API audit trails](https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-audit-trails-api/).

### Are trial accounts able to use the GitHub connector to attach their GitHub account?

Trial accounts are able to use the same functionality as paid accounts during the trial time period.

### At what port are the delegate Prometheus metrics exposed?

The delegate Prometheus metrics are exposed on the port 3460 in the running delegate container.

### How do I check for the listen ports on the delegate if netstat is not installed?

You can run the command `lsof -nP -iTCP -sTCP:LISTEN`, install netstat, or bake it into the delegate image.

### What Prometheus metrics are exposed on the delegate?

For a list of Prometheus metrics exposed on the Harness Delegate, go to [Delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).

### The Harness Delegate went down, and I didn't get a notification via Prometheus that it was in a disconnected state. Why not?

When the Harness Delegate pod goes down, its exposed metrics endpoint also goes down. These metrics can be helpful in notifying you of lost connectivity between Harness Manager and the delegate pod. However, it should be noted that your Prometheus server can also notify you of the same issue.

### What API can I use to check the delegate connectivity status?

You can use the [list delegates API](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/listDelegates).

### Legacy delegates aren't starting up and creating a .hprof file in the container. What should I do?

For the statefulset, updating the environment variable `WATCHER_JAVA_OPTS` with `-Xmx512m` might help.

### Deploy stage requires a service defined. Can I set up a pipeline without a service defined at a stage?

Yes, you can use the custom stage. This is a selection you can make initially while defining a pipeline stage.

### How can I execute a simple Shell or Bash script step?

With a custom stage, you don't need to define a service. This is the preferred method to execute a shell or bash script step.

### Is there a way to create delegate tokens via API calls in which we can do the API call for token creation and use in personalized way?

Yes there is way to create delegate tokens via API calls. For more information, go to the [Create delegate token API documentation](https://apidocs.harness.io/tag/Delegate-Token-Resource#operation/createDelegateToken).

### Does Harness support Workload identity federation for authentication?

Harness supports workload identify for Google Secret Manager.

### Can I use alphanumeric characters in delegate names?

Yes, you can use alphanumeric characters, but the name can't start or end with a number.

### Can you give details about recent changes to Harness Self-Managed Enterprise Edition?

Yes, you can refer to the [release notes](/release-notes/self-managed-enterprise-edition).

### Can I use expressions in delegate tags in NextGen like I used custom selectors in delegates in FirstGen?

Yes, expressions in delegate selections are supported. You can pass expressions during delegate selection in a pipeline. This will be resolved to the value of that variable. If that value is present as a tag in a delegate, then that delegate will be selected.

### Why am I getting an "Error: Rate limit reached for tasks with rank IMPORTANT. Current task count 5985 and max limit 5000"?

This could happen when manager iterator is not running, there is a limit of 5000 delegate tasks at a time per account, but if iterator is not running, it will not get deleted automatically and this error is returned.

### Can we limit our account/org access only to our users and not to Harness users (even read-only access)?

This feature is currently available in FirstGen. You can use `Restrict users to email domains` feature and only and set your email domain only. You must enable the feature flag `LIMITED_ACCESS_FOR_HARNESS_USER_GROUP`.

### The user is blocked because of entry not cleared for his prod2 account from gateway, What could be possible steps to login?

The user can directly login using deep link, https://app.harness.io/ng/account/AccountId/main-dashboard.

### The user is unable to log in, they're getting unable to log in with SSO when we have SSO enabled on the account.

This is a very common scenario when users get this issue. The reason behind this is mostly that the User has signed up for a personal account or part of a different account that doesn't have the SSO enabled which is set as his default account. Hence User can log in using a username and password. If he has forgotten his password, he can always use the forgot password and then try to log in.

### Why can't I set up/reset MFA?

When the 2FA is set as force enabled on the account level by an admin of the account. The users will have to setup the 2FA for their profile.

It can enabled by scanning the QR code sent in the email or using the secret key also sent in the same email using any authenticator app.

### Why can't I decrypt secrets from Harness Secret Manager

If you encounter decryption errors while working with a secret in your pipeline, try testing the secret using a shell script and print it. Note that the secret will always be printed in an encrypted format, denoted by '**\*\*\***', so you do not have to worry about the value being revealed. This step will help you determine if the issue lies with the secret itself or the way it is being referenced.

### Why can't I access other accounts when a user is part of multiple accounts?

At times, you might encounter an issue where you are unable to access your non-default account in a scenario where you are part of multiple accounts. This occurs due to a login mechanism that only works for the default account. However, you can still attempt to access your desired account by using a deep link. The deep link refers to the full URL of the account they wish to access.
`https://app.harness.io/ng/account/**accountidhere**/main-dashboard`

### Why aren't Slack notifications working?

Begin by troubleshooting and validating the Slack webhook, then check the notification settings at the pipeline or user group level.

When executing the pipeline don't select the option for notifying only me.

### Harness NG project admin permission after creating a project

When you create a project using the API, by default the project inherits the project admin permissions on creation from the service account where the API token was generated.

### How do I verify Harness API token validity?

When creating a token in Harness under Service Account, the duration of the token's validity depends on how the token was set up. If you have specified an expiry date, the token will be valid until that date. However, if you want the token to never expire, you can choose the **No Expiration** option for the token's expiration date.

### Why did I receive "VAULT operation error: Decryption failed after 3 retries for secret"?

Sometimes, you might encounter errors while executing pipelines. These errors could be due to issues with the network or the delegate's connection to the Vault where the secret is created. The first step is to verify that the delegates are operational and that the connectors used in the pipelines are connected properly. If the connectivity test fails, log in to the delegate and attempt to reach the connector URL from there.

### Can I update an email address in a user account?

If users are provisioned via SCIM, then you can update the email in the SSO provider end and they will get updated in Harness.

If the users were added manually, you must remove them and add the new emails.

### Problems enabling mTLS - Error [IOException: Unexpected response code for CONNECT: 403]

When mTLS has been enabled for your delegates, you might see the 403 errors, this could be due to the proxy not resolving harness domain app.harness.io from the delegate.

### Will creating an Admin role at the account level and assigning it to a resource group with scope for a specific Harness org grant admin access only to that org?

Create a user with limited access at the account level, then add them as an admin at the organization level to manage RBAC at that scope.

### How do I change my identity provider to Okta from another provider?

When setting up a new Okta SAML and migrating users to it, it is necessary to configure Harness as detailed in the above document. This requires obtaining the metadata XML file from Okta. 

Harness user permissions are managed by User Groups within Harness. When it comes to authorization, the user groups from the SAML app are linked to Harness Local User groups.

For more information, go to [Single Sign-On (SSO) with SAML](/docs/platform/authentication/single-sign-on-saml/).

### Is there an easy way to see the de-factor roles/permissions assigned to a user?

You can view all permissions for a user by going to Access Control --> Search for the User click on it. Click on Role Bindings and you can see permissions for the user with the scope, All, Account, Organization and Organizations with Projects in one place.

If you need to see the permissions inside of a role say Account Viewer or any custom-created role and same with Resource Group then you will always need to individually click on that specific role/ resource group as it's not shown on the user permission page.

We only show the Account/Project/Organization level permissions with the role-resource group with where it is assigned at and assigned through in case of a User group or directly.

But you can view all of them together by selecting the scope to All instead of Individual.

### I need to create an AWS Secrets Manager reference type secret. I am not sure how to accomplish it. Is the "secret_manager_identifier" for the AWS Secrets Manager secret name?

Remember that the `secret_manager_identifier` refers to the identifier of your AWS secret manager, which you have added in Harness as a connector. It's important to note that the secrets must be stored in the same scope of the secret manager. For instance, if you have account secrets, they should be stored in the account secret manager.

### What is the default delegate token behavior?

Token revocation is done server side. We have a 20 minutes cache, so the delegate will be disconnected within 20 minutes of the token removal on the server side.

The token is used in heartbeat but is loaded at the delegate process startup. Changing the token delegate side requires a restart of the delegate process (cycle).

### How do I view the secrets value stored in Harness Secrets Manager?

The secrets saved in Harness are encrypted, which means that their values can't be viewed from the Harness UI. However, there is a way to print the secrets using a pipeline execution. You can create a shell script execution and add two different shell script steps, making sure to specify the same delegate selector.

In shell script 1:

```
echo "text secret is: " \<+secrets.getValue("printsecret")> >> /tmp/abc.txt
```

Here `printsecret` is the secret name.

In shell script 2:

```
cat /tmp/abc.txt
```

The first shell script output will be:

```
text secret is: **************
```

The second shell script output will print the value for the secret:

```
text secret is: hellohello
```

Also, if you try to do the cat in the first step, it won't print the secret in plain text.

### How can we forcibly disconnect a delegate and delete it as admin?

As customers manage their Harness Delegates in their own infrastructure, Harness cannot control them. In Harness's architecture, the delegates in your infrastructure connect to Harness Manager. For more information, go to [Harness Platform components](/docs/get-started/harness-platform-architecture/#harness-platform-components).

To remove the delegate from your infrastructure, you need to stop the delegate service. Alternatively, you can revoke the token used by the delegate which will disconnect and automatically delete it in 7 days.

### How does Harness handle data deletion for customers?

The process of cleaning up a customer's data is triggered when their account expires, or they offboard.

### How do I check the delegate disconnected status in the API?

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

### How do I deploy a delegate in Amazon ECS for Harness NextGen?

The Harness Delegate is a software that gets installed in your environment which connects to Harness Manager and performs Continuous Delivery/Continuous Integration tasks.

In Harness NextGen, ECS delegate can be deployed as a Docker delegate both for ECS and ECS Fargate. This tutorial shows you how to install the Harness Delegate in an ECS cluster as an ECS service to enable the Delegate to connect to your AWS resources.

https://discuss.harness.io/t/how-to-deploy-delegate-in-amazon-ecs-for-harness-ng/13056

### What is the Harness hosted GitOps IP address?

Access to Kubernetes clusters that are behind strict firewalls and are not accessible from the public internet is controlled through authorized IP addresses. To allow access to these clusters, Harness provides a list of IP addresses that need to be configured on the clusters.

For more information, go to [GitOps allowlist](/docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/).

### How can I get information about a delegate's connection to Harness?

The delegate initiates communication on its startup to the Harness Platform. There is also a heartbeat connection every 60 seconds from the delegate to the delegate harness to notify that it is running.

### What is the logic behind the six-letter account identifier that Harness uses while creating the delegate?

This identifier refers to your Harness account is necessary to link old and new pod lifecycles and will be treated differently as pod names and IPs change.

### How does Vault agent secret manager work with vault?

The below article explains how secret manager works with vault:

https://discuss.harness.io/t/vault-how-to-use-the-new-vault-agent-integration-method-with-harness/784

### How does Harness prevent tampering of artifacts and instructions from customer infrastructure? Is TLS used for integrity checking?

Details are below for the protection of Artifact Sources related to SSH/WinRm for NextGen.

#### Artifactory

For downloading artifacts from Artifactory to delegate, Harness uses `org.jfrog.artifactory.client:artifactory-java-client-api:jar:2.9.1`.

This is the [maven repo](https://mvnrepository.com/artifact/org.jfrog.artifactory.client/artifactory-java-client-services/2.9.1). There are known vulnerabilities in this version of the library. We are currently working on updating to a secure version. If the Artifactory URL is https, calls are secured with TLS.

#### AWS S3

For downloading artifacts from AWS S3 to delegate, Harness uses `com.amazonaws:aws-java-sdk-s3:1.12.261`.

There aren't any reported vulnerabilities in [the repo](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3/1.12.261).
AWS SDK makes HTTP calls in a secure way using TLS.

#### Azure

For downloading artifacts from Azure to delegate, Harness uses `okhttp-4.9.2.jar`. There are known vulnerabilities in this version of the library. We are currently working on updating to a secure version. https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp/4.9.2

Updating this library will be a significant and time-consuming process, which may take several weeks to complete.

#### Jenkins

For downloading artifacts from Jenkins to delegate, Harness uses `using com.offbytwo.jenkins:jenkins-client:0.3.9`.

#### Nexus

For downloading artifacts from Nexus to delegate, Harness uses `javax.net.ssl.HttpsURLConnection` from the Java SDK.
When downloading artifacts, Harness uses SSL.

Artifacts will be downloaded on the delegate, and it should be safe if the network where delegates are running is secure.

One note here, the chosen cipher suits depend on the remote server. During the SSL handshake, the “server hello” message contains the cipher suite chosen by the server from the list provided by the client (the Harness side).

### How do I make config changes to increase memory consumption in the delegate YAML?

You will have to make config changes in your delegate YAML to increase memory consumption. This can be done by setting the value in `JAVA_OPTS` to increase the Xmx value.

### What is the Xmx value in the JAVA_OPTS setting?

The Xmx value is a parameter used to specify the maximum heap size for a Java virtual machine (JVM) when running a Java application. It determines the amount of memory the application can use for its operations.

```
name: JAVA_OPTS
value: "-Xms64M -Xmx8192M"
```

### What is the API used to pull a list of users and their roles from a specific project?

You can refer these docs [here](https://apidocs.harness.io/tag/Project-Role-Assignments#operation/get-project-scoped-role-assignments).

### Are there RBAC permissions on Audit Trail in NextGen like there are in FirstGen?

This feature is not currently in NextGen, but we do have viewer permissions in place.

### What is advisable to retain your current configuration during the Harness installation process?

Harness recommends that you keep your existing Java KeyStore in place during the installation process. Updating the KeyStore may cause issues with your delegate. For more information, go to [Install delegates with custom certs](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### What is linkedSsId in SSO groups?

`linkedSsoId` is the uuid of SSO setting creating in Harness.

### What is the purpose of linkedSsoDisplayName?

`LinkedSsoDisplayName` is the same SSO setting name in Harness. For SAML the value provided for both ssoGroupId and ssoGroupName should be same.

### How can we implement an approval mechanism for authorizing the deletion of marked accounts to prevent accidental deletions and ensure that the right accounts are flagged for deletion?

The implementation of this feature is currently pending. Presently, the ability to mark accounts for deletion is allowed through the "update account" permission in the admin tool, which has been granted to a wide range of users.

### How are Create APIs supposed to work as if we are creating API it won't be having permission and will return false? How do we restrict creation of resources?

There are two types of scope, one is complete scope (which indicates ALL) and the other is specific.

- To allow creation of entity in certain scope, it means allowing to creation that entity at complete Scope level (which indicates ALL).
- If the use case is to allow Create Governance policy at scope and restrict edit to specific policies then ideally we should split it into specific Create and Edit permissions.
- And then define 2 Role Assignments.
  One with Create and All Governance policy.
  One with Edit and Specific selected Governance policies.

### What is difference between terminationGracePeriodSeconds and preStopHook?

- `TerminationGracePeriodSeconds` - This is used to allow the main process (delegate) to delay the shutdown so that this process can perform some cleanup. The key here is that container shutdown is delayed by UP TO the specified duration. This works by delegate specifically handling SIGTERM kill signal.

- `preStopHook` - This is used to allow any other kind of cleanup outside of the main process (e.g. one wants to save files, make database backup etc..). This hook runs IN PARALLEL to the terminationGracePeriodSeconds not before, but before delegate process shutdown is triggered (i.e. before delegate process receives SIGTERM). So if the grace period expires the hook will be killed as well.

### What is the impact of having one less delegate instance during a task with a long terminationGracePeriodSeconds for reasons other than upgrades?

Having one less delegate instance during a task with a long `terminationGracePeriodSeconds` for reasons other than upgrades can impact the availability of delegate resources. Other tasks may fail to get scheduled because there are not enough delegates available to handle them. This can lead to inefficiencies and delays in task processing. It's crucial to consider the potential impact on the overall system and task scheduling when using extended termination grace periods.

### What environment variable or Java option should be configured to stop exposure in the Gateway container when JWT is getting exposed?

- create a ConfigMap containing the new logback.xml (everything set to level=WARN )
- mount it wherever and pass:
  `-Dlogging.config=file:/path/to/mounted/logback.xml`
  to the JVM via JAVA_OPTS in config.

### How can I find the status (failed/pass) and reason for verification step using graphQL API?

Use the workflow/pipeline grapnel API for execution. The `failureDetails` field includes this information.

### Why am I redirected after login to FirstGen when I enabled NextGen?

Make sure you have set the Default Experience as NextGen on the Account overview page.

### Is the Harness FirstGen/NextGen SAML setting shared?

Yes, if you have configured SAML on FirstGen, the same setting is used for login to NextGen.

### How do I migrate a user from FirstGen to NextGen?

Users are migrated automatically once NextGen is enabled.

### How can I add an admin in a newly-enabled NextGen account?

Users from your FirstGen Administrators group are automatically assigned as admin role in NextGen. You can then create/update other roles in NextGen.

### What is the role of PROXY_HOST in the proxy.config?

This is the host address of the proxy you want to configure.

### If we enable proxy for a delegate, does that mean it includes all "Connectors" communications - artifact servers, source repo providers, collaboration providers, and cloud providers?

Yes, that’s correct, any outbound connection made via the delegate through Harness will use that proxy.

### Can you manage org level entities at the account level?

This is a use case of user-group inheritance.

- Create User Group at account scope.
- Inherit User Group at each Organization scope and create appropriate role binding.
- When trying to onboard new user to all this Orgs, add that user in the User Group to provide access to all Orgs.
- This user group is still managed at the Account scope.

For more information, go to [Create groups by inheritance](/docs/platform/role-based-access-control/add-user-groups#create-groups-by-inheritance).

### Does Harness plan to support AsyncAPI specs (for messaging) in Harness APIs?

This has not been planned yet.

### How are events generated on Harness Platform?

Audit Trail displays a record for each event of the Harness account, Modules, or Harness entities. For more information, go to [Audit trail](/docs/platform/governance/audit-trail/).

### Is there documentation for delegate sizing guidelines?

Yes, for more information go to [Delegate sizes](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-sizes) and [Delegate requirements](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-requirements/).

### Can a Golang service provide a secret reference directly to an internal API and receive the decrypted secret?

Yes, there is an internal API for that, with the limitation that only the secrets stored in Harness Built in Secret manager can be retrieved. You can refer [here](https://harness.atlassian.net/wiki/spaces/PLATFORM/pages/21192704698/Secrets+Decryption+API+Via+Manager). Please note that if the secret is stored in vault or customer’s secret manager then this won’t work.

### Can I have an API to perform the operation of IP allowlist?

These are APIs to create/update IP allowlist https://apidocs.harness.io/tag/IP-Allowlist#operation/create-ip-allowlist-config, Also you can refer [here](https://developer.harness.io/docs/platform/security/add-manage-ip-allowlist/).

### Can we point auto update to our Helm chart? Can we point auto update to a different registry?

You can set auto upgrade to true in the Helm command and control the upgrade and the repository. For more information, go to [Use automatic upgrade with custom delegate images](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Can I use a "bindSecret" in Harness LDAP settings to avoid using an inline password, as suggested in the API documentation?

No, you cannot use a `bindSecret` in Harness LDAP settings to avoid using an inline password in NG LDAP. Currently, Harness NextGen LDAP only allows the use of an "INLINE" password. The appearance of `bindSecret` in the API documentation is due to a shared bean between FirstGen and NextGen, and in FirstGen, support for secret references is available. However, Harness NextGen LDAP still requires an inline password, and this limitation should be considered when configuring LDAP settings in your environment.

### Can I create a delegate token with the same name as a previous token that I deleted?

No, it is not possible to use the same name within 30 days of revocation. There is a 30-day deletion TTL after token revocation.

### How can I automatically start a delegate when running as a Docker container?

Docker provides restart policies to control whether your containers start automatically when they exit, or when Docker restarts. Restart policies start linked containers in the correct order. Docker recommends that you use restart policies, and avoid using process managers to start containers.
Including the flag `--restart` in the docker run command will configure it to always restart, unless the container is explicitly stopped, or the daemon restarts.

If restart policies don't suit your needs, such as when processes outside Docker depend on Docker containers, you can use a process manager such as upstart, systemd, or supervisor instead.

To use a process manager, configure it to start your container or service using the same docker start or docker service command you would normally use to start the container manually. Consult the documentation for the specific process manager for more details.

**Warning:** Don't combine Docker restart policies with host-level process managers, as this creates conflicts.

This information was provided by [Docker documentation](https://docs.docker.com/config/containers/start-containers-automatically/).

### Perpetual Task was not assigned to my delegate, what is most probably cause?

Generally, when a perpetual task wasn't assigned to any delegates, probably you have a conflicting delegate selector. When you use connectors like secret manager, git connector along with a delegate selector in the step, mind that the manager can combine selectors from those connectors and step in order to select the most appropriate delegate selector. Review your configurations in order to make sure the selectors are matching.

### Is it possible to store a Shell Script Provision in a Git provider?

At the moment, you can only store Shell Script provisions in two ways: either as inline code or within the Harness file store. Regrettably, the option to store them directly in a Git provider like GitHub or Bitbucket is not available.

### Is it possible to access vault secrets across different regions?

As long as your vault server in a specific region permits access from a delegate in another region, it should function properly. You can even attempt to retrieve secrets directly from this delegate host outside of Harness to resolve any access issues, and it should work with Harness as well. Additionally, you have the option to create separate connectors for each region.

### Is there a difference between NextGen delegates and FirstGen delegates?

We have many architectural changes between our legacy delegate, which was deployed as a StatefulSet, in comparison to the new-generation delegates, also known as immutable delegates, which are deployed as Deployment-type resources.

Legacy delegates used to have both a watcher and a delegate process; however, immutable delegates only have one delegate process. The base OS has also changed. It was Ubuntu for legacy delegate images, but now it is RHEL for immutable delegate images.

Immutable delegates work with the first generation as well. If you have an immutable delegate installation in your first generation, you can reuse it with your next-generation instance. You will need to regenerate the token in the next generation and enable the "next gen" attribute of the delegate to true.

However, if you have legacy delegates in your first generation, you will require new delegate installations.

### How do I deactivate Harness Secrets Manager via API?

Unfortunately, at this time, there is no API or Terraform approach to achieve this configuration.

### Is there a way to obtain data on monthly active users (MAU) on the Harness platform?

You can retrieve information about user logins from the audit log. If you need to do this through an API, we have an audit log API available. However, we do not have a consolidated view or report of all the users who have accessed the Harness platform. Nevertheless, you can use the audit log information mentioned above to obtain this data.

### Can I safely use API Endpoints marked as beta?

API Endpoints labeled as beta have been tested by our teams and are generally safe for consumption. However, we caution against using them for critical workloads, as they are not classified as stable yet.

### Can the delegate's StatefulSet be scaled?

Yes, you can scale the delegate StatefulSet. For more information, go to [Autoscale using replicas](/docs/platform/delegates/manage-delegates/auto-scale-using-replicas).

### Why is the delegate image based on UBI instead of Ubuntu?

1. **Security:** UBI is considered a more secure option compared to Ubuntu in today's landscape. It benefits from Red Hat's rigorous security practices and is designed to be more resilient against vulnerabilities.
2. **Compatibility:** When you are running workloads on OpenShift, using UBI-based images is often the preferred choice. In some scenarios, Red Hat may even mandate the use of UBI-based images. This ensures compatibility and support within the OpenShift environment.
3. **Customer Demand:** We have received numerous requests from our customers to provide UBI-based images due to their security and compatibility advantages. In response to these requests, we have published UBI-based legacy delegate images.
4. **Consistency:** We are not only transitioning our delegate to UBI but also all of our SaaS offerings. This provides a consistent and unified environment across our services.
   While UBI is the preferred choice, we want to emphasize that we do provide a Dockerfile for building an Ubuntu-based delegate image if you have specific requirements.

### What is RBAC and how do I manage users and roles?

Harness NextGen platform utilizes Role-Based Access Control (RBAC). Additional details on RBAC can be found in this blog post:

[https://www.harness.io/blog/user-role-management]

### What are the main components of RBAC?

RBAC uses Principals, Resource Groups, and Roles to control access.

Principals are entities taking action in the system. These include users, user groups, and service accounts.

Resource Groups define what objects can be acted on. Objects include organizations, projects, pipelines, connectors, users, and more.

Roles define what actions can be taken on objects. Actions include view, create, edit, delete, and so on.

### What is Role Binding and how does it relate to Harness RBAC?

Role binding refers to the process of assigning roles and resource groups to principals (users, user groups, and service accounts). Role binding can be configured at all scopes.

### Are there any built-in roles that I can utilize?

Yes, for more information on built-in roles, go to [RBAC in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/).

### What is the best way to implement the Harness RBAC?

Following a workflow can be a useful process for implementing and understanding RBAC:

To configure RBAC in Harness, you must:

1. Create roles.
2. Create resource groups and, optionally, apply RBAC.
3. Create user groups, create service accounts, and add users.
4. Assign roles and resource groups to users, user groups, and service accounts.
5. If you have not already done so, configure authentication.

### Is there additional information on built-in roles for Harness RBAC?

Yes, for more information, go to [Built-in roles](/docs/platform/role-based-access-control/add-manage-roles#built-in-roles).

### What is a Resource Group?

Resource groups are an RBAC component that defines the objects that a user or service account can access. Objects are any Harness resource, including projects, pipelines, connectors, secrets, delegates, environments, users, and more.

More information on Harness Resource Group and managing this can be found here: [https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups]

### What integration does Harness offer with SCIM providers?

Harness integrates with multiple third-party SCIM providers

Okta SCIM: [https://developer.harness.io/docs/platform/role-based-access-control/provision-users-with-okta-scim]
Azure AD SCIM: [https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim]
OneLogin SCIM: [https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim]

### What is Just-in-time user provisioning?

Automated provisioning eliminates repetitive tasks related to manual provisioning and simplifies user management.

Just-in-time (JIT) provisioning in Harness lets you provision users automatically when they first sign-in to Harness through SAML SSO. Harness supports JIT provisioning only for new users logging in through an IdP, such as Okta.

JIT is currently behind the feature flag `PL_ENABLE_JIT_USER_PROVISION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 

### Is there an overview doc on Harness RBAC and permissions?

Yes. For more information, go to [Permissions reference](/docs/platform/role-based-access-control/permissions-reference).

### How can I install Terraform on the delegate?

1. microdnf install yum
2. yum install unzip
3. curl -O -L https://releases.hashicorp.com/terraform/1.6.1/terraform_1.6.1_linux_amd64.zip
4. unzip terraform_1.6.1_linux_amd64.zip
5. mv ./terraform /usr/bin/
6. terraform --version

For more information, go to [Common delegate initialization scripts](/docs/platform/delegates/delegate-reference/common-delegate-profile-scripts).

### How can I install the AWS CLI in delegate?

1. curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

2. microdnf install yum

3. yum install unzip

4. unzip awscliv2.zip

5. ./aws/install

For more information, go to [Common delegate initialization scripts](/docs/platform/delegates/delegate-reference/common-delegate-profile-scripts).

### Can I configure RBAC for the environment based on the stage?

No, as per the current design, you can only configure RBAC for an environment based on environment type.

### How can I install a delegate without root permission?

Our delegate will get installed without root permissions by default, you don't need to make any changes.

### Can user install the docker delegate with rootless docker?

Yes, you can install the rootless Docker after you install the Docker delegate.

### Can we have multiple Docker delegates under same delegate name?

When you have the same name for multiple delegates, they appear under one group and are treated as multiple instances of that specific delegate. Whenever that delegate name gets selected, any instance registered under the name can be picked for executing the task.

### Can Docker delegates be auto upgraded?

When you deploy a Helm or Kubernetes delegate, a cron job is created which enables automatic upgrades of the delegate. However, this is not the case with Docker delegates. Therefore, if you want to upgrade the delegate, you must manually change the Docker delegate image.

### What is the base OS for delegates with an immutable image type?

Immutable image type delegates are based on RHEL ubi8 minimal image. Legacy delegates were based on Ubuntu.

### Do we have delegate metrics in case of legacy delegates as well?

Custom delegate metrics are only available for delegates with an immutable image type, there is no custom metric for legacy delegates. Also for delegates with an immutable image type, the custom metrics are available from delegate version 23.05.79311 and later.

### Where do delegates look for third party client utilities?

The delegates with an immutable image type look for third party client utilities in the PATH location during startup. Hence any third party utility that is installed in a delegate is expected to be either present in the default PATH location or the path to the binary added in the environment variable PATH.

### How can I find out which user is running the delegate?

You can exec into the pod and run the command below to find out which user currently owns the delegate process:

```
ps -ef | grep delegate
```

### How do I check the custom metrics currently being published by delegate?

Delegates have a metrics API endpoint you can access on the delegate host for checking available metrics. Below is the sample curl:

```
curl localhost:30109/api/metrics
```

### What is the health API endpoint for delegates with an immutable image type?

Delegates with an immutable image type have a health API endpoint on which delegate health related information is related. Below is a sample curl:

```
curl localhost:30109/api/health
```

### How do I pass JVM arguments for watcher processes?

Watcher processes for delegates use JVM options from the environment variable `WATCHER_JAVA_OPTS`. Any custom JVM argument that you want to pass to the watcher process can be configured in the `WATCHER_JAVA_OPTS` variable in the init script.

### How do I pass jvm arguments for delegate processes?

Delegate processes pick the JVM options from the `JVM_OPTS` environment variable. If you want to pass any custom JVM arguments for the delegate process, you can configure it in the `JVM_OPTS` environment variable. One example is below:

```yaml
env:
  - name: JAVA_OPTS
    value: "-Xms2G"

```

### Does the delegate process write Google Cloud logs by default?

The delegate JVM process is not configured to write the Google Cloud logs by default. If you need to configure Google Cloud logs, you must pass the JVM arguments. In the below sample argument, the options can be modified as per the need for Google Cloud logs:

```
JAVA_OPTS='-Xlog:gc*=debug:file=/var/jvm/gc.log'
```

### Can a delegate be connected to FirstGen and NextGen at the same time?

A delegate can only be connected to one manager instance at a time. Therefore, the same delegate cannot be connected to both the first-gen and next-gen instance of the same account.

### How can I migrate GCP/AWS KMS secrets from FirstGen to NextGen?

To migrate encrypted records from an old KMS (FirstGen) to a new one (NextGen), fetch the Data Encryption Key (DEK) from the old KMS, decrypt the data, re-encrypt it with the new KMS, update the records, and ensure security and compliance. Connectivity between NextGen and the old KMS is essential.

### Is there a way to find an enabled feature flag in the UI?

This feature will be available soon.

### Do proxy settings apply to both HTTP delegate commands and raw socket connects during capability checks?

Proxy settings typically work for HTTP delegate commands, enabling you to route HTTP traffic through a proxy server. However, in the case of capability checks, such as raw socket connects, proxy settings might not apply.
Enable the feature flag `CDS_USE_HTTP_CHECK_IGNORE_RESPONSE_INSTEAD_OF_SOCKET_NG` to solve the issue.

### Is it a standard practice to notify customers 30 days in advance when there are changes to allowed IP addresses?

Harness doesn't change IPs without 30 days notice to customers. If a security emergency requires a change, you will be notified. For more information, go to [Allowlist Harness SaaS IPs](/docs/platform/references/allowlist-harness-domains-and-ips/#allowlist-harness-saas-ips).

### Is the feature flag PL_ENABLE_MULTIPLE_IDP_SUPPORT available and enabled to use?

Yes it is enabled. For more information, go to [Configure multiple SAML providers](/docs/platform/authentication/multiple-identity-providers/#configure-multiple-saml-providers).

### Do we have an automatic upgrades for ECS delegates?

No, automatic upgrades are not currently available for Docker delegates.

### What do I do if the production delegate is down because of using legacy delegate and an old watcher version?

- Re-deploy legacy delegate by pulling the fresh "latest" image. This will make sure that you get most recent watcher.
- We can revert the delegate version in the ring to unblock.
- You can use immutable delegate.

### How can I resolve the error "not supported by windows" when working in CCM POV?

If this is a mixed node cluster then the delegate needs to run on Linux nodes. You can use selector in your delegate YAML to make sure that Linux nodes are selected. For more information, go to [Assign pod node](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) in the Kubernetes documentation.

### Whenever I switch my Harness account, I encounter a login prompt, captcha, and the message "too many invalid login attempts, account blocked" despite having no invalid login attempts. Why does this happen?

This issue may arise due to several reasons:

- Authentication Requirement: If you are not a part of the Harness Support group, you may need to re-authenticate while switching accounts. This is a standard security measure.
- Resetting Password: It is possible that when you attempt to reset your password, it only affects the login attempt value in one cluster and not the other one. This discrepancy in the reset process can lead to login issues.

Ensure you are properly authenticated when switching accounts.

### What is the default QPS limit?

The default limit of QPS is: 50 QPM per manager* Num of managers(3) =>Total 50*3 QPM = 2.5 QPS.

### Is there a way to upgrade the volumes created when installing Harness with Helm from gp2 to gp3?

Volume types are controlled by storage class, Harness doe not control them.
You can modify the storage class setting by the [link](https://kubernetes.io/docs/concepts/storage/storage-classes/#aws-ebs) but you would lose the data if aws doesn't support direct upgrade from gp2 to gp3.

### Is there a plan to integrate Git into Harness Self-Managed Enterprise Edition?

Yes, it will be integrated soon.

### Is it possible to attach a delegate to a custom IAM role during installation in the EKS cluster?

Yes, for more information, go to [Harness AWS connector settings](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#harness-aws-connector-settings).

### Can I send a single email invitation to a user for both account-level limited permissions and organization-level admin privileges?

You can efficiently manage user invitations by combining account-level limited permissions and Organization-level admin privileges in a single email. During the invitation process, grant the necessary permissions at the Account level, ensuring they encompass all child permissions, providing access to all organizations and projects. Simultaneously, grant admin permissions to the specific Organization at the Account level without the need for a separate invitation. This allows users to receive a unified invitation email when added to the organization as org admins, streamlining the acceptance process.

### Can administrators bulk approve and activate users who are in a "Pending Invitation" status, transitioning them to "Active Users" collectively rather than individually?

Certainly. If the account authentication mechanism is configured as SSO, and the FF `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is enabled, users will be automatically enabled upon invitation. However, if the account authentication mechanism is USER_PASSWORD, each individual user needs to accept the invite to set their login password, as automatic enabling is not applicable in this case. The method of account authentication determines the user activation process, with SSO streamlining the activation for users, while USER_PASSWORD requires individual acceptance for password setup.

### Can we get information about the types of tasks of delegates, what each of them is responsible for?

The task types are internal tasks for various tasks a pipeline generates. Harness continually introduces new task types and removes old ones. We don't currently document these task type changes.

### Do build_source tasks use the delegate task quota?

Build source tasks do use the quota. These are tasks for artifact collection. They are only present in CurrentGen. These tasks are not fired in NextGen.

### Can I see who invited a user?

Yes, you can find user invite actions in the audit trail.

### Is there any other way to remove a test user group created with externallyManaged=true other than remove it by a mongodb query set externallyManaged=false?

It is recommended to update the user group in the database before deleting it from the UI. This can be done by changing the externallyManaged flag from true to false. It is not advisable to delete the user group directly from the database, especially if it is part of a hierarchy like an account user group inside an Org/Project. Updating the flag first and then deleting it through the UI ensures a more controlled and comprehensive handling of the user group removal, taking into account any dependencies in the hierarchy. Please note that this cannot be updated using API, but deletion from UI will soon be allowed.

### How does Harness handle sensitive information, such as secrets, to prevent exposure in logs?

When using secrets for sensitive information, the platform automatically obfuscates or masks the values in logs and other outputs. This measure ensures that sensitive information remains protected and is not exposed in plaintext within logs.

### When making service-to-service calls, is it recommended to reuse the Bearer token received from the calling service's API in the Authorization Header for the destination service's platform API?

In service-to-service scenarios, a best practice is to transmit only the principal information without including the Authorization Header. This allows the destination service to handle authorization based on the provided principal details. Additionally, users have the flexibility to designate whether the call is Privileged or non-Privileged. For non-Privileged access, maintaining the principal as the end user is often suitable. Users are encouraged to refer to the platform's official documentation for comprehensive guidance on token creation and authentication for platform API calls. If further assistance is needed, contacting the platform's support team is recommended.

### Do we have documentation to implement ACL checks in log-service?

Yes, you can refer to these [docs](https://apidocs.harness.io/tag/Access-Control-List#operation/getAccessControlList).

### How can I perform a load test on a Kubernetes delegate?

You can implement autoscaling using replicas. For more information, go to [Auto scale using replicas](/docs/platform/delegates/manage-delegates/auto-scale-using-replicas/). The autoscaling will be based on the workload instead of the number of tasks. Additionally, it can execute any type of deployment or run shell scripts that utilize CPU and memory:

- based on which metric you use for HPA (we recommend cpu/memory) Kubernetes will scale up/down the pod.
- when pod is scaled down, the delegate pod will stop taking new task and finish what its executing before terminating.

### Can I centrally identify and remove resources created by a user who had admin access but now has non-admin permissions?

Currently this centralized feature is not available and will be available soon. However, you can leverage the Audit Trail feature to track all actions performed by the user over a specified time. This way, you can identify the resources they created during their admin access.
Audit trails are available at the Account and Organization levels, allowing you to determine the resources created by the user. To restrict the user's admin access, you need to remove their admin permissions at every scope (account, org, project). Once admin permissions are revoked, the user won't have the authority to perform admin operations.

### What rate limits are enforced for NextGen?

Rate limits for requests/day:

- Any call: Harness allows 5000 requests every 10 seconds (30,000 requests per minute) per IP address.
- API calls: Harness allows 1000 requests per API key per minute.
- Large requests (character size > 500,000): 1 payload every 10 seconds.

For more information, go to [Rate limits](/docs/platform/rate-limits/).

### Can I set up audit log streaming without using a Delegate agent? Are there options to stream logs directly from the cloud platform using IAM roles or other methods?

For the current streaming workflow, the primary option is to use the AWS connector, which requires the use of a Delegate. Unfortunately, audit log streaming is currently only supported via Delegate, and there is no direct option to stream logs from the cloud platform using IAM roles or other methods.
You can refer to this [documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/) for further information.

### What is the workflow for secrets, specifically the potential exposure of production secrets? Do secrets pulled by a delegate ever flow back to the Harness platform?

Yes, the secrets pulled by a delegate during pipeline execution do not make their way back to the Harness platform. Delegates connect to various secret managers as the pipeline progresses, but the secret information itself is not sent to Harness. This ensures that production secrets remain secure and are not exposed within the Harness platform. You can refer to these [docs](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

### Will we push up the Ubuntu immutable delegate to DockerHub?

No, our Dockerfiles are made public on GitHub so that you have the option to modify and build them according to your needs. We do not push the Ubuntu immutable delegate images to Docker Hub; instead, you can access and customize the Dockerfiles from our GitHub repository.

### Does Harness plan to add support for multiple account Ids for SMP?

Currently SMP is single account only, multiple account support is yet to come.

### Do we have docs for permissions references?

Yes, for more information, go to:

- [API permissions reference](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference/)
- [RBAC permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/)

### How can we disable version override for a specific delegate?

Version override is not controlled from the UI. If we need to disable version override, it will apply to the entire account. You for more information about delegate upgrades, go to [Delegate upgrades and expiration](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/).

### Can I access the Harness API from a React app, and how can I handle CORS issues when making API calls with the x-api-key header?

Yes, the Harness API is accessible from React (or any JavaScript library) apps. However, when encountering CORS (Cross-Origin Resource Sharing) issues, it's crucial to understand that browsers make pre-flight CORS requests, especially when the host origin and the server origin are different.

To resolve CORS issues:

- Same Origin: If your UI and API share the same origin (e.g., UI and API both on app.harness.io), there won't be CORS calls.
- Different Origin: If your app is on a different origin (e.g., example.com/harness) and makes non-GET requests to app.harness.io/api/, the browser initiates a pre-flight request.
- Server Configuration: Ensure your API server includes the necessary CORS headers, such as access-control-allow-origin and access-control-allow-headers, to explicitly allow the requesting origin and any custom headers like x-api-key.

By configuring your server to allow the necessary origins and headers, you can address CORS issues when making API calls from your React app. This ensures a smooth interaction with the Harness API while securing your application.

### Can I configure an alternate location for delegate logs?

It is not possible to configure the delegate logs path. However, you can create a symlink for the `delegate.log` files and store them in a different directory using the `INIT_SCRIPT` environment variable. To do this, simply replace `YOUR_PATH` with the directory where you want to store your log files in the example below.

```yaml
- name: INIT_SCRIPT
          value: "mkdir YOUR_PATH && ln -s YOUR_PATH/newdelegate.log delegate.log"
```

After you create your delegate, you can verify your log file path.

### Can we customize the SSH configuration when using a Git connector set by SSH?

For Git API-based communications, SSH is not used at all. Instead, we rely exclusively on token-based communication. Specifically for Git tasks, especially on GitX, tokens are utilized as they are executed through APIs. However, for other types of connections, SSH configurations are employed. It's important to note that for any connector, the standard practice involves selecting "API Access" and providing tokens exclusively.

### How can I resolve serialization errors when integrating NG Audits for ModuleLicense collection with multiple child classes in YamlDTOs?

The serialization issue in NextGen Audits for ModuleLicense collection arises when using entity objects instead of DTOs in the YAML for Audit Service. The problem is that entity objects lack JsonSubTypes, causing the Jackson ObjectMapper to struggle with determining the appropriate subType for conversion. The resolution is to utilize DTOs, which inherently possess the JsonSubTypes property, ensuring smooth serialization and deserialization processes in the Audit Service.

It's essential to note that the Audit Service doesn't directly serialize or deserialize YAML; instead, it expects the old and new YAML as strings. However, the choice of using DTOs over entity objects is crucial for resolving any potential serialization challenges. Always ensure that the service generating audits has access to all required DTOs to prevent code duplication and facilitate efficient integration with NG Audits.

### Why isn't the Helm binary path added to the system's PATH by default for delegates with an immutable image type?

There are two versions of the Helm binary installed on the delegate, but neither is set to the system's PATH by default. This behavior is currently specific to the Ubuntu image. However, users have the option to set the PATH as desired using the init script in the delegate YAML. Additionally, they can install custom binaries or create their own delegate image to address this.

### Is there a standardized default user access experience across all installation flows (K8S, Docker, Helm, Terraform)?

No, there is currently a variation, with Kubernetes delegates defaulting to root with securityContext, while Docker delegates use a non-root default user (user 1001).

### Is root user access required by default for adding custom binaries?

You can choose not to run as root. For custom binaries, root access is not required, you can cURL the binary and put it in the path.

### How can I hide Harness built-in roles (Harness managed roles), and is it possible to hide account scope roles?

Enabling the flags (`PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE` and `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`) will hide project and org scope roles. However, there is currently no way to hide account-level roles. This decision was not implemented due to the potential restriction that once we enable FF for the account, nobody will be able to see managed roles, including account admin.

### If a user has a connector with delegate selector X, and the connector uses a secret from a secret manager with delegate selector Y, but delegates with selector X lack access to this secret manager, is this use-case supported?

Our priorities are configured as follows: [Step > Step Group > Stage > Pipeline > Connector]. In this scenario, the user can override at the pipeline (or any higher level), but without that override, it will result in a failure.

### How do I set up SMTP with AWS SES?

Go to the [AWS documentation on SMTP credentials](https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html) to create SMTP credentials using the SES console. Then, supply those SMTP credentials in your [Harness SMTP connector configuration](/docs/platform/notifications/add-smtp-configuration).

### Is it possible to hide Project/Org level default built-in roles?

Yes, it's possible with the feature flag `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE and PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### How do I upgrade a legacy Docker delegate to use a new image version?

You can update the image tag by referring to the latest tag's URL `https://hub.docker.com/r/harness/delegate/tags` and providing it while running Docker.

### How do I check to see if the delegate is set to auto upgrade?

You can go to Delegates list page check under the **AUTO UPGRADE** column to see if it is ON.

For more information, go to [Determine if automatic upgrade is enabled](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#determine-if-automatic-upgrade-is-enabled).

### Is it possible to hide account-level default built-in roles?

No, currently it is not possible to disable roles as it would prevent anyone, including the account admin, from seeing managed roles.

### What are Harness built-in and custom variables? 

They are a way to refer to something in Harness such as an entity name or a configuration setting. 

### What is the correct syntax for the Regex Extract build-in variable?

```
regex.extract("v[0-9]+.[0-9]+", artifact.fileName)
```

### What are the statuses of nodes using the Harness looping Strategy?

Running, Failed, and Success

### What is the account name in the authenticator APP When Setting up 2FA?

The account name shown in the authenticator app when setting up 2FA is coming from the company name set for your account. If you want to have a specific name, you must get your company name for the account updated.

### 2FA enable / disable for individual and account level

The 2FA is either enabled by default for the account or any user can also enable it particularly for his user which can be done from the user profile.
But once the 2FA is enabled by the user it also needs to be disabled by that particular as account won't be able to disable the 2FA for the specific user.

### Vanity URL issues

When a vanity URL is enabled for an account using SAML login, you must update your ACS URL with your vanity URL. For example, if your original ACS URL is `https://app.harness.io/gateway/api/users/saml-login?accountId=xxxxxxxxxxxxxxxx`, after enabling a vanity URL, you must update it to something like `https://VANITYURL.harness.io/gateway/api/users/saml-login?accountId=xxxxxxxxxxxxxx`.

### How can I restore user groups that I accidentally deleted?

If you mistakenly delete some user groups from the Harness UI, there is currently no way to recover them as they are also removed from our backend collection. However, if the user groups were provisioned through SCIM, then you can always synchronize them again.

### Why do users lose access to user groups after logging into Harness using SAML?

This scenario is possible for the SAML based linked User Groups as the SAML based user group sync always takes place on the user login action.
Hence there were any changes made from the SAML SSO Group Claims or may be the group was removed from the app and hence harness does the sync at next login.

### Resetting the 2FA from Harness

This only the account admins can do for Users, when the admin needs to go to Account Settings--> Access Control -- Users

Right click on the 3 dots on the extreme right end of a user and then click on email new 2fa option.

### Users unable to the first time when added using the JIT (Just in time user provisioning)

The issue occurs when after your user is setup via JIT and first time user directly tries to login via the Harness URL (app.harness.io), As the when you setup the JIT (Just in time user provisioning) reference : https://developer.harness.io/docs/platform/role-based-access-control/provision-use-jit/

The user needs to first go to his SAML SSO app and click on Harness icon tile from there as this will provision the user in Harness UI.

### Error while adding Users to Harness from Harness UI

Sometime when you try to add a Harness User from Harness UI , you get error for adding the user.
You can open the developer tools and check the API call for the error and see the response.
It could be possible due to user creation limit. You can either resolve it by removing unused Users from your account or reach out to Harness Support get the limit validated as per your license.

### How do I get an x-api-key for making an API call?

You need to create a new token under API key. For more information, go to [Authentication](https://apidocs.harness.io/#section/Introduction/Authentication) in the API documentation.

### How do I check which delegate was assigned for task

You can select the step under any stage and on right side under details tab you will be able to see delegate assigned as well the delegate selection task logs will provide more details which all delegates were eligible and from where selector was originated etc

### How do I pass xmx and pms value for delegate to use max and min memory allocation pool?

env:
    - name: JAVA_OPTS
      value: "-Xms64M -Xmx2G"

### Scim Provisioned User Group has - in name which was removed from identifier but still allowed as name

The - is not allowed character for identifier so it was removed while creating the identifier while name can have that so its allowed for name

### What does the promql query specifically check, and why is it still non-zero even after a successful token renewal?

The query checks for failed tasks related to token renewal.

```
io_harness_custom_metric_task_failed{task_type="NG_VAULT_RENEW_TOKEN"} > 0
```

The non-zero value may persist as it represents the count of failed tasks, which doesn't reset after successful renewals.

### What is the purpose of the liveStatus expression in Harness, and how does it differ from stageStatus?

The `liveStatus` expression is designed for use within step groups under a matrix. Unlike stageStatus, which doesn't consider running or completed steps under a matrix, liveStatus calculates the status of steps, including those in the running or completed state

### Can we manually reset the delegate metrics which is being scraped by Prometheus?

Manual reset isn't supported. However all the metrics get reset when the delegate restarts

### How user can make sure the build artifacts that go to harness will come from protected branches before production deployment?

You can select the Artifact filter option and provide the expression as per your need in the Artifact source config of the service.

### We have delegate monitoring setup and we're not clear on what types of tasks delegates are reporting on in the metrics.

The task types are internal tasks for various tasks a pipeline generates. for example, a pipeline can generate tasks for secret decryption during the shell script execution and they are internal to harness. We keep introducing new task types and removing old ones.

### Do these build_source tasks use the delegate task quota? Sometimes their number is really huge.

Build source tasks do use the quota. these are tasks for artifact collections. they are only present in FirstGen and next gen these tasks are never fired.

### How does the system differentiate between delegate name and tag?

A delegate name is a unique identifier for a registered delegate in Harness Manager, while delegate tags are descriptors that are added to the delegate before the registration process. All delegates with the tag are selected when a tag is common for two or more delegates.

### We have about 500 users who were somehow granted the Admin role on the Account Level as individuals. We need to remove this role from them - is there an efficient way to do this?

You can use this [API] (https://apidocs.harness.io/tag/Account-Roles#operation/update-role-acc) and create a script to update the user roles.

### Why are "-" removed from UserGroup identifiers?

The removal of hyphens from UserGroup identifiers is in line with the harness UI convention, where identifiers cannot contain hyphens. This practice ensures consistency and prevents the use of invalid characters in identifiers. While hyphens are allowed in UserGroup names, they are automatically removed from identifiers during creation through SCIM to adhere to the specified naming conventions.

### Currently, our SCIM integration is connected to the First Gen instance/URL, and we lack user groups in the NextGen console. Do we need a separate application for NextGen SCIM integration?

Yes, for NextGen SCIM integration and to have user groups, it's advisable to set up a distinct SCIM application for the NextGen instance. This ensures that SCIM integration is properly configured for the NextGen environment, allowing for seamless user group management while maintaining compatibility with the First Gen setup.

### Is there a way to reset the delegate custom metric?

No, all metrics reset when you restart the delegate.

### Why aren't new delegates considered during task execution, leading to potential inefficiencies in scaling for matrix/parallel deployments?

Tasks currently poll for delegates at the start, and if initial delegates are unavailable, they won't be redirected to new ones created by scaling policies. The system broadcasts to eligible delegates determined during task processing. However, not repolling for available delegates during task execution may limit true "task-based scaling for Kubernetes delegates." Consideration for dynamically scaling with new delegates during ongoing tasks could enhance efficiency.

### What is the difference between staged and active permissions?

- Staging

  - Permission is added in permissions.yml with the status - STAGING. It cannot be added to roles nor it is shown in the UI.
    Access control check will always return true if asked whether this permission is available to the user (not enforced).

- Active
  - The status of the permission is changed to ACTIVE in the YAML file. The experimental flag is removed from the permission. Access control checks are now enforced on the new permission.

### Is there any documentation we have around the APIs which we can use to fetch user details given userId?

Yes you can refer here, [documentation](https://apidocs.harness.io/tag/User#operation/getUsers).

### Do we support referencing a ldap secret?

No, we don’t support ldap secret engine.

### Does a Vault connector accepts configuration for only one Vault secret engine?

Yes the support is only for one secret engine per connector.

### Do we have grafana dashboard in SMP for monitoring delegate tasks?

No, we do not have these dashboards in SMP yet.

### How long is an invitation for workshop accounts valid?

It should be valid for 30 days.

### Can I set an auto cleanup TTL for disconnected delegates to disappear from the user UI?

The TTL (Time To Live) for legacy delegates is set to 7 days. In the case of immutable delegates, deletion occurs automatically upon delegate shutdown.

### Is it now possible to have Secrets and Secret Connectors in different scopes, or do they still need to be in the same scope?

It's possible to have in different scope like we can have a SM at account level and the secret using that SM at the project scope.

### Do we to support authorization with API tokens?

APIs token are used for both authentication and authorization. Refer to these docs, [here](https://developer.harness.io/docs/platform/role-based-access-control/add-and-manage-service-account#manage-api-keys).

### Can you link the docs to the API endpoint used to authorize a user with API token?

We have only one API for access check either if you perform Authorization using Bearer Token or Api key token.

- [documentation 1](https://apidocs.harness.io/tag/Access-Control-List#operation/getAccessControlList)
- For API tokens categories: Service Account v/s Personal access tokens, please refer to understand it. [documentation 2](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/).

### In FirstGen custom secrets decrypt, is there retry logic? Does Harness cache the secret value?

- We execute three retries to fetch a secret.
- We don’t cache the secret value for security reasons.

### How is the version of the Immutable Delegate Docker Image managed and released to SMP?

The release of the Immutable Delegate version to SMP involves setting the `IMMUTABLE_DELEGATE_DOCKER_IMAGE` version as an environment variable in the manager. When users download the YAML, this version is read from the environment variable, and SaaS utilizes pipelines to update MongoDB entries. During pod startup in SMP, the environment values are populated in the database, facilitating the direct retrieval of the Immutable Delegate version.

### If the DELEGATE_RESOURCE_THRESHOLD is set to zero, does the delegate reject all tasks?

No, if `DELEGATE_RESOURCE_THRESHOLD` is set to zero, it behaves as if the feature is off, and the delegate acquires tasks as normal without rejection. Also, we have the default `DELEGATE_RESOURCE_THRESHOLD` value as 80.

### Currently a Vault connector accepts configuration for only one Vault secret engine. Is there any plan to explore how one Vault connector can be used for multiple Vault secret engines at the same time

As of now only one Vault secret engine can be configured for Vault connector and in Future we might support multiple Vault secret engine but currently its not possible

### What are the different ways I can add users to Harness Platform?

You can create user in below ways:

1. UI: Account Admin can add user directly via UI
2. SCIM: You can setup scim to provision user
3. Terraform Provider: You can use Harness terraform provider https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_user

### We would like to enforce the life time of api token ( My profile -> My API keys -> Token) is 24 hours.

An Api key is created with Minimum of 30 days and you can not set any duration less than that, you can rotate the token if you want at any time

### Can we add Custom Selector in the harness delegate chart for legacy delegates?

For legacy delegates we do not have a way to specify delegate selector or delegate tags in the delegate helm chart. We do have an api to get the selectors as well as update it for the delegates. More details can be found here:

https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-delegate-selector-api/

### Can a service account created at project level be assigned permissions to access account level resource ?

We can not create a project level service account and provide permission for account level resources. Hence this will not have access to any account level resources.

If you would like to use service account only you can create a account level service account and then give project level role bindings to it corresponding to the project as well as role binding for account level templates.

### How do I run a Harness docker delegate in detached mode?

Docker provides a -d flag option for running the containers in detached mode. So when we are running the Harness Delegate Docker run command we can add the option to get the console back and the container will continue to run in detach mode. For example below is a sample delegate run command:

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

### Why the task_failed_total metric for delegate is not reporting data despite step failure ?

The task failed is when something unhandled happens, like a NPE in a task or issue at framework level. A valid failure like shell script exited with error code is not a task failure. Prometheus only shows the metric which are at least once recorded.

### Why do we need core_delegate_delete permission for revoking delegate token?

The api call that we make for  revoking the delegate token makes the delegate which are using it not register anymore and hence delete delegate permission is required for revoking the token as well.

### Do we provide customized docker images for delegate?

We do not provide any customized docker images for delegates however we do have our delegate docker file in the public repo below. This can be used as a sample reference to add any utility to the image:
```
https://github.com/harness/delegate-dockerfile/tree/main
```

### Can we use immutable delegate image in the statefulset deployment yaml for delegates ?  

We can not use immutable delegate image in the statefulset deployment yaml that we had for legacy delegates. Both the delegates are architecturally different. The immutable delegates must be used with their own deployment yaml.


### Is there a way to enable more granular level for delegate logs?

We do not have additional log level settings for delegate than what it logs by default.

### How do I sync LDAP groups manually if the linked user group isn't syncing?

You can Navigate to Authentication tab and go to LDAP setting and try Synchronize User group option.

### While trying to link sso group, not getting the option for user group

Check and confirm if group authorization is enabled for saml setup configured, than only you will see the sso provide details under drop down

### How do I capture SAML Tracer information?

You can install SAML Tracer extension in your browser its available for all browsers. 
With the SAML-tracer extension running one needs to do the following:

1. At the login page hit "X Clear" in SAML tracer(top left) and then perform a login attempt.
2. When the login session is captured hit "Export" and attach this export to the ticket.

### In case multiple Harness instances and setup with SAML App redirecting to a different Harness instance instead of one expected.

In case you have say Sandbox and production Harness instances and you are using the Azure SAML APP which also has multiple Harness apps. 
It is important to specify the Entity ID below the Authorization in Harness UI while creating the SAML App integration. 

### How do I inspect my certificates for delegate certificate issues? 

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

### Delegate fails to register with handshake exceptions. 

While creating a delegate it might start to register and then fail with SSLHandshakeException. 

To resolve the handshake exception, do the following:

Run to the command below to test the certificate chain you used to install Harness Manager.
```
curl -cacerts path/to/ca-certs/file https://<MANAGER_HOST>/api/account/<ACCOUNT_ID>/status
```
Then Install the certificate on the delegate

Reference : https://developer.harness.io/docs/platform/delegates/troubleshooting/certificate-issues#handshake-exception

### Delegate connectivity issues because of proxy IP.

While configuring the delegate proxy , many times we specify the Proxy Host IP and not the PROXY_HOST. 
We always recommend to have the PROXY_HOST and not IP as in case your IP changes to a new IP , your delegate will start to fail causing issues.

### Why am I getting an error while creating a template using a service account token generated under a project?

You are likely using a token scoped to a project when creating a resource at the account level, the same applies to a project token while creating a resource at the organization level. To create resources across different levels (account/organization/project), your token must be at a higher level or at the same level as the scope.

### Why is my Terraform plugin crashing when using the Harness provider?

Generally, this issue is related to a bug in our provider. Before opening a ticket, please try using the latest provider version. Run your script again to see if the problem persists. If the issue continues, please proceed to open a support ticket for further assistance.

### How should complex expressions be correctly utilized?

When using a complex expression, ensure the expression is wrapped within `<+ >`. For example: `<+<+org.name>.toLowerCase()>/<+<+project.name>.toLowerCase()>>`.

### How can I retrieve a specific type of connector across multiple accounts, organizations, and projects using the API?

Unfortunately, it's only possible to retrieve all connectors within a specific scope, the following attribute `includeAllConnectorsAvailableAtScope` allows you to retrieve easily all connectors above the project scope using the API Method `Fetches the list of Connectors corresponding to the request's filter criteria`.

### How can user build debug delegate image ?

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

If you want to publish this in Docker Hub, then in place of gcr use your private Docker Hub, do a docker login before pushing image.
Also there is a GitHub PR trigger to publish immutable delegate from your changes: `trigger publish-delegate`

### What do we need to backup to recover quickly when Harness infrastructure is lost?

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours. Back up recommendation is to use Velero tool. You can refer to mentioned doc for further info [docs](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-restore-helm).

### If the infrastructure is lost, how should it be restored?

Back up and restore covers Harness specific things only, it does not cover infrastructure loss. If that happens expectation is to have a working k8s cluster ready to restore harness namespace.

### Do user permissions in Harness with JIT provisioning and SAML authentication inherit from the SAML provider, or do they require separate configuration in the Harness Account?

No, user permissions in Harness with JIT provisioning and SAML authentication do not inherit from the SAML provider. Permissions need to be explicitly configured in the Harness Account. The JIT provisioning process ensures that users are dynamically created in Harness based on SAML authentication, but their permissions within Harness need to be set up independently.

### Does Harness support permission mapping or inheritance from external systems in any Single Sign-On (SSO) model?

No, Harness does not support permission mapping or inheritance from external systems, including in various Single Sign-On (SSO) models. User permissions must be explicitly configured within the Harness Account, and as of now, there is no support for permission discovery or synchronization from external systems. All permissions need to be manually configured within the Harness Account.

### How does SCIM work in Harness, and what are its limitations?

SCIM in Harness is primarily used for user provisioning and de-provisioning. It simplifies user management but has limitations. SCIM does not handle role bindings or permissions directly. Admins must manage role bindings and permissions within Harness separately, even when using SCIM for user provisioning.

### Does Role-Based Access Control (RBAC) apply to Git Bi-Directional Sync in Harness?

 No, RBAC settings specific to Git Bi-Directional Sync are not available. The RBAC of the entity is used, and there are no individual role bindings for fine-grained control over bi-directional sync. As of now, the options for controlling bi-directional sync are limited to enabling or disabling it.

### What is the default timeout for custom secret manager script timeout? Can the timeout be configurable?

It defaults to 60 seconds. Timeout is not configurable.

### Why is kinit (from the krb5-workstation package) not included in our immutable image for non-root users, leading customers to bake it in themselves?

The decision to exclude kinit from our immutable image is primarily driven by concerns related to image bloat. We maintain a specific set of binaries, including Delegate-required SDKs, in the Delegate to address the specific use cases of our Continuous Delivery (CD) customers. By excluding non-essential binaries, we aim to optimize image size and streamline the image for CD workflows. You can refer the [docs](https://developer.harness.io/docs/platform/delegates/delegate-reference/delegate-required-sdks).

### Can customers enable root privileges to add the kinit binary to the image?

Enabling root privileges to add the kinit binary is an option, but it may pose security concerns for some customers. The exclusion of kinit in the immutable image aligns with security considerations and is designed to provide a minimal and secure image for CD use cases. If customers have specific security requirements, they may consider installing the required binaries, such as kinit from the krb5-workstation package, manually, even in an air-gapped environment.
You can refer the [docs](https://developer.harness.io/docs/platform/delegates/install-delegates/enable-root-user-privileges-to-add-custom-binaries).

### Are metrics for the Docker Delegate published, and how can Prometheus scraping be configured?

Yes, metrics for the Docker Delegate are published. To enable Prometheus scraping, you would likely need to open a port on the container and bind it to the Delegate metric port. This allows Prometheus, running separately, to scrape and collect metrics from the Docker Delegate.

### Why am I receiving a 400 status code error with an "unsuccessful HTTP call" message when using a Jira step in Harness?

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

### What steps can we take to prevent encountering 429 errors when utilizing DockerHub connectors in Harness?

 If you are facing 429 rate limiting errors when attempting to pull Docker images from DockerHub using Harness, you can mitigate this issue by adjusting your authentication settings:

1. **Authentication Method:** By default, Harness utilizes anonymous access to the Harness Docker Hub for image pulls.

2. **Switch to Username and Password Authentication:** To overcome rate limiting issues, select "Username and Password" as your authentication method in your Docker connector configuration.

3. **Provide Login Details:** Once you've selected "Username and Password" authentication, enter your DockerHub login credentials (username and password) in the connector settings.

By configuring Harness to use your DockerHub credentials, you ensure that you have the necessary access privileges to pull images without encountering rate limiting issues.

These adjustments will help you avoid 429 errors and ensure a smoother experience when working with DockerHub connectors in Harness.

### How Do Delegates Share Information Like Helm Chart Contents Within the Same Stage?

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

### What should we put (if anything) in the "JIT Validation Key" and "JIT Validation Value" fields when JIT provisioning is enabled in SAML?

This can either be left blank, as it is not required, or you can add a Key (aka saml attribute) to expect, along with the value of the attribute/key to expect, in this way you can have some users that send this defined attribute and others that do not which allows you to selectively provision users via JIT

### What is the default entityID (audience restriction) the Service Provider endpoint(ACS URL) uses when not defined?

The default entityID is `app.harness.io` unless otherwise specified.

### Unable to refer Custom Secret manager template stored in GIT

Currently, we do not support reference of Custom Secret manager template stored in GIT, please create inline template and you will be able to refer those

### Upon successful azure saml login for prod account harness is redirecting to stage/dev account

Please check if entity id is set correctly in case if you are using multiple account, as if you are using vanity url then the entity id needs to be set accordingly while setting up saml in Harness as well as on azure side

### What will be entity id in case of on-prem setup or if vanity url is used

In case of above it needs to be the domain used to access harness(example : vanity.harness.io) 

### Why can't I view projects?

Please check if you have required Role and permission granted to view Projects, you can reach out to your account admin to confirm the permission granted for your account

### I want to share delegate from one project to another?

In this case you can install the delegate on org level if both project are under same org, otherwise need to install delegate on Account level. As delegate installed under project has scope limited to same project

### How do I sign out of Harness?

Select **My profile** on the bottom left, and then select **Sign Out**.

### I can see that a legacy delegate is a statefulset object, what does this mean? and what's the major difference from Deployment type?

**StatefulSet:**
- **Purpose:** StatefulSets are designed for stateful applications that require stable network identities and stable storage.
Instances: StatefulSets maintains a sticky identity for each pod. Each pod has a unique and stable hostname, allowing for persistent storage and network identities.

- **Naming:** Pods in a StatefulSet get named predictably and consistently, which is often based on an index.

- **Scaling:** Scaling stateful applications may involve more complex operations due to the need for stable identities. Pods are typically created in sequential order, and scaling may involve specific considerations for data migration or coordination.

**Key Difference:**
The major difference between a Deployment and a StatefulSet lies in how they handle the identity and state of the pods:

- **StatefulSet** provides stable identities: Pods in a StatefulSet have stable and predictable identities, making them suitable for applications that require persistent storage and network identifiers.
- **Deployment** is more suitable for stateless applications: Deployments are well-suited for applications where each instance is interchangeable, and statelessness is a design principle.

### What is exit status 127 in a delegate pod?

In a Kubernetes context, when you see an exit code of 127, it is typically associated with issues related to the execution of container commands within a pod. Here are some common scenarios in a Kubernetes context:

**Command or Binary Not Found:**
- The container might be trying to execute a command or binary that is not installed or not available in the container's filesystem. Ensure that the necessary commands or binaries are included in the container image.

**Incorrect Path or Command Name:**
- If there's a mistake in the path or the name of the command specified in the Kubernetes pod definition, it could result in a 127 exit code. Double-check the command configuration in your pod specification.

**Permissions Issues:**
- Ensure that the container has the necessary permissions to execute the specified command. This includes both file system permissions within the container and the user permissions under which the container is running.

**Image or Container Initialization Failures:**
- If the container fails to start or initialize properly, it might result in a 127 exit code. Check the container logs for any error messages that might indicate initialization issues.
When debugging a pod with an exit code of 127, you can inspect the pod logs to get more details about what went wrong. Use the following command to view the logs for a specific pod:

```
kubectl logs <pod-name>
```

Replace `<pod-name>` with the actual name of your pod. Examining the logs can provide insights into the specific command or process that failed and help you diagnose and resolve the issue.

### Where are the settings for individual user email notifications?

The notifications on Harness are configured on the User Group to which the user is attached. All the notification preferences are displayed there:
- https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#edit-notification-preferences

### Why am I experiencing issues when creating a secret with the same name that was deleted recently?
First, when you tried to delete a resource in Harness, we soft-deleted it so you were not able to re-use the same identifier. Now this is not happening anymore, but in case you still experiencing issues, you can either keep the same name but change only the identifier or enable the Force Delete so you can delete the resource with no existent references issues on the process:

- https://developer.harness.io/docs/platform/references/entity-deletion-reference/#force-delete

### What's the Harness variable replacement for a service name?

For this scenario, you can use the following variable: `<+service.name>`

### How is the ingress.yaml file used?

In Kubernetes, an Ingress resource is used to manage external access to services within a cluster. The Ingress resource allows you to define how external HTTP/S traffic should be directed to your services, enabling you to expose services to the external world and define routing rules.

An Ingress resource is typically defined in a YAML file, often named ingress.yaml. This file specifies the configuration for routing external traffic to different services based on rules such as hostnames, paths, and backend services.

By using Ingress, you can manage external access to your services more flexibly than using raw services or NodePort services. It provides a way to route traffic based on various criteria and allows you to handle SSL termination and other features. Keep in mind that the actual implementation of Ingress may vary depending on the Kubernetes cluster, as different cluster providers may have different Ingress controllers.

### How do I verify my account?

Harness has identified an increase in the unauthorized usage of the free pipeline minutes Harness makes available on Harness Cloud. To combat such unauthorized usage, Harness requires that you use your work email, not your personal email, to register your account.
 
If you face this issue on an account that was registered using your work mail ID, please reach out to our support team and share the execution URL where you got this error so we can review it further.

### Does harness AIDA support APIs for developers to create custom AI/ML solutions?

No! AIDA does not offer Rest APIs to be used by Harness Users.

### How do I extend the timeout duration for a custom secret manager?

To increase the timeout duration in a custom secret manager, adjust the settings in the connector's details step. This timeout setting, measured in seconds, determines how long the system will wait to fetch secrets from the custom provider. If fetching the secret exceeds this duration, the process is interrupted and results in failure. The default timeout value is set to 20 seconds. To avoid such interruptions, you can modify this value to a higher number as per your requirements.

### Can secrets access be scoped by environments?

Currently, the functionality to restrict access to secrets based on individual environments is not available. However, a potential alternative is to structure your account by dividing environments across different organizational projects. This method won't directly scope secrets to specific environments, but it can help in managing access by associating secrets with the relevant organizational context, thus maintaining a level of separation and control.

### How can CCM Admin roles be removed from users who were directly assigned these rRoles?

In the past, as part of our product strategy, we granted all users the CCM Admin role by default. This policy has since been changed. If customers wish to revoke these role assignments, they will need to identify the affected users, retrieve their role assignments via API, and then proceed to bulk delete these specific role assignments.

### Where are the settings for an individual user email notifications?

Currently, we don’t support individual user e-mail notifications.

### How can we export users from Harness?

Currently, we do not support a direct functionality for exporting all users. To export users from Harness, you can utilize our API method getUsers.

### How can I export all AutoStopping rules?

Currently, we do not support a direct functionality for exporting all AutoStopping rules. To create a report of all your AutoStopping rules, we recommend using our API method ```List AutoStopping Rules```.

### Is it possible to use Vault AWS Credentials generation along with AWS Connector?

Unfortunately, we don't support this feature. Though a custom secret manager can be leverage to get credentials on the fly, where you can write any logic.

### I’m not receiving an e-mail to register my TOPT token. What should I do?

Please, reach out to Harness Support in order to receive manually your TOPT token. Once you receive the token will be able to register it in any authenticator app that you prefer. Additionally, if you aren’t receiving the token through e-mail, it may be a potential issue with your SMTP provider.

### How can I receive a notification when the delegate’s heartbeat connectivity fails?

At present, we do not support direct notifications for failures in the delegate's heartbeat connectivity. However, you can effectively monitor your delegate using Prometheus metrics, which is a functionality we do support.

### Where is the currently set session inactive timeout value located?

You can find this value on the Authentication page (right below the Overview menu on the left), the field will be at the bottom of the page: ```Session Inactivity Timeout (in minutes)```.

### How can I extend the time before a delegate is disconnected from the manager when the API token is revoked?

This is not configurable; once the token is revoked, the delegate will get disconnected immediately. However, you can have a delegate in the account running continuously, which can execute all tasks. This way, when you revoke tokens for other delegates for testing, there will be at least one delegate in the account available to run the task.

### What is the ETA/process for adding another admin user to our Harness account if the user with admin access gets locked?

In emergencies like SAML/LDAP issues, it's recommended to have a local admin user for account access. If a functional account gets locked, Harness can grant admin permissions to an existing account user, but can't create a new admin user. It's advised to maintain at least two local admin users. In such situations, raising an urgent Harness ticket is necessary. The process, involving backend database updates and multiple approvals, typically takes a couple of hours to grant admin permissions to an existing user.

### Does Harness allow storing custom secret manager templates in Git?

No we don’t allow it to be stored in Git.

### Can we use persistent volume as tmpdir for delegate?

Yes, we can use it.

### How can we remove legacy delegate and use immutable delegate instead of legacy?

You can stop legacy delegate and download new yaml from ui and install immutable delegate as immutable is enabled by default.

### Do we have docs for delegate install and for adding GCP connector?

Yes, we do have docs:

- Installation of delegate : [here](https://developer.harness.io/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp/).
- Addition of GCP connector : [here](https://developer.harness.io/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp/).

### Can we store secrets from sources other than the Harness Secrets Manager in the Custom Secrets Manager (CSM)?

No, Currently, the Custom Secrets Manager (CSM) is designed to work exclusively with the Harness Secrets Manager. It does not support direct references to secrets from other external sources. The integration with the Harness Secrets Manager provides a secure and centralized way to manage and retrieve secrets within the Harness platform.

### Why is Harness designed to exclusively integrate with the Harness Secrets Manager and not allow direct references to secrets from external sources?

Our previous setup allowed configurations where credentials from one secret manager were stored within another, resulting in complexities that could be challenging to navigate. Moreover, these configurations might introduce vulnerabilities, posing potential security risks.

### How can we use the external secret managers to store secrets?

Harness uses connectors to external secret managers (e.g. Google Secret Manager or Hashicorp Vault) to resolve/store secrets used by pipelines and elsewhere in the Harness platform. To to connect to custom secret manger we need a secret credential and that credential use to connect to custom secret manager should be stored in harness secret manager.

### Is there the hard technical limit for entities in NextGen?

There are no hard technical limit for entities in NextGen, [docs](https://developer.harness.io/docs/platform/references/harness-entity-reference), but we have performance data on the specified test environment, [here](https://developer.harness.io/docs/self-managed-enterprise-edition/performance-reports/).

### Could we get some specific around when it can be expected for the kubectl version to be update in the default harness/delegate image?

We are in the process of upgrading the Kubectl version. It will be soon reflected.

### Can I update my role with the following permission core_governancePolicySets_delete using UI, as it is working through API?

Yes, you're able to set these permissions through API because these are onboarded, but the backend is currently not using them in the intended way. Hence we've removed them from the UI. We're working on releasing this feature soon.

### Do we have a limit to how many users an account can have?

yes, license plays a role which sets a limit on the number of users. we won’t let you go over the license count.

### What is the Query to check existing limit of users a account can have?

```
db.getCollection('allowedLimits').find({key: "CREATE_USER", accountId: "<account_id_of_customer>"})
```

### Do we support localization in Harness Platform?

No, localization is not currently supported.

### What does delegate resource threshold DYNAMIC_REQUEST_HANDLING do?

 By default delegate task capacity is purely based on the number of tasks which is not ideal as some tasks consume far less resources than the others. Enabling `DYNAMIC_REQUEST_HANDLING` would make delegate take tasks based on the available resources (CPU/Memory) instead, so if delegate is overloaded it would reject a task (default is 80% cpu/mem). If either CPU or Mem is at 80% or more, delegate would reject the task.

### What causes the delegate Out-of-memory error, and how can I fix it?

The delegate throws an error indicating `java.lang.OutOfMemoryError` or that the delegate has run out of heap space. The container has run out of memory or the delegate has exceeded heap space. Review the container's memory usage. Harness recommends that you use `Xms` and `Xmx` or `MinRAMPercentage` and `MaxRAMPercentage` JVM arguments to adjust the heap size of the delegate. You can provide these arguments via the `JAVA_OPTS` environment variable when you set up the delegate.

### How can the user remove the single disconnected delegate pod?

The disconnected delegate pod will automatically removed after the 7 days from the disconnection.

### What do we need to backup for SMP setup? Is there an optional backup target?

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours.

### How do you perform SMP backups?

Back up recommendation is to use the Velero tool

### If the infrastructure is lost where the harness is deployed, how should it be restored?

Back up and restore covers Harness specific things only, it does not cover infrastructure loss. If that happens expectation is to have a working k8s cluster ready to restore the harness namespace.

### If it is difficult to implement SMP full backups, I would like to get individual Backups.

We would recommend full backups rather than individual Backups.

### Is there a way the user can run all the steps on one specific delegate pod?

Yes, user can run all the steps on one specific delegate pod. Doc: https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/

### Unable to view shell script content used in pipeline

If you are using a step template, you will need to navigate to the template and switch to the yaml view, and you will be able to see the content.

### Create Connector API seems to not work for orgs and failing with the error INVALID_IDENTIFIER_REF while trying to create a vault connector.

Please check and confirm if the token used here is proper and you are using the org or account prefix before passing the secret reference.

### Is it possible to change the company name for my Harness Account?

Yes, please open a support ticket to request the name change.

### How do I install Harness Delegate using Azure ACI?

You can use the following repository as a sample to install it through Terraform. [Terraform Example](https://gist.github.com/rssnyder/40ebf23bc352a2fbf75005239367abcd).

### How often does Harness upgrade the kubectl binary version within the delegate?

We don’t have an exact period for when these upgrades occur, but we maintain a list of [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies/). You can customize the kubectl binary version using ```INIT_SCRIPT```.

### Can we add a Custom Selector in the Harness Delegate chart for legacy delegates?

For legacy delegates, we do not have a way to specify delegate selectors or delegate tags in the delegate Helm chart. We do have an API to get the selectors as well as update it for the delegates. For more information, go to [Use delegate selector](/docs/first-gen/firstgen-platform/techref-category/api/use-delegate-selector-api/).

### Can a service account created at project level be assigned permissions to access account level resource?

We can not create a project level service account and provide permission for account level resources. Hence this will not have access to any account level resources.

If you would like to use service account only you can create a account level service account and then give project level role bindings to it corresponding to the project as well as role binding for account level templates.

### Why the task_failed_total metric for delegate is not reporting data despite step failure?

The task failed is when something unhandled happens, like a NPE in a task or issue at framework level. A valid failure like shell script exited with error code is not a task failure. Prometheus only shows the metric which are at least once recorded.

### Why do we need core_delegate_delete permission for revoking delegate token?

The api call that we make for revoking the delegate token makes the delegate which are using it not register anymore and hence delete delegate permission is required for revoking the token as well.

### Do we provide customized docker images for delegate?

We do not provide any customized docker images for delegates however we do have our delegate docker file in the public repo below. This can be used as a sample reference to add any utility to the image:
```
https://github.com/harness/delegate-dockerfile/tree/main
```

### Can we use a delegate with immutable image type in the statefulset deployment YAML for delegates?

We can not use an immutable image type delegate in the statefulset deployment YAML that we had for legacy delegates. The delegates are architecturally different. Delegates with an immutable type must be used with their own deployment YAML.

### Is there a way to enable more granular level for delegate logs?

We do not have additional log level settings for delegate than what it logs by default. 

### Can we use custom temp space to be used by delegate?

We can make use of environment variable TMPDIR on the delegate and use any directory as path to be used for temp storage.

```
- name: TMPDIR
  value: /opt/harness-delegate/deployvol/tmp

```

### Is there an SMP database query to validate whether a user was provisioned via SCIM or manually?

Yes, you can use the following queries. Replace the `accountid` with the actual account ID.

This query returns results for users that were provisioned via SCIM.

```
db.getCollection('users').find({"userAccountLevelDataMap.xxxxxxxaccountidxxxxxx.sourceOfProvisioning.NG":"SCIM"})
```

This query for `MANUAL` returns results for users provisioned that were provisioned through the UI.

```
db.getCollection('users').find({"userAccountLevelDataMap.xxxxxxxaccountidxxxxxx.sourceOfProvisioning.NG":"MANUAL"})
```

### I'm a user of multiple accounts. Why am I getting an error when I try to redirect to a specific account?

You can directly access the following URL. 

`https://app.harness.io/ng/account/xxxaccountidxxxx/settings/overview`

This will direct you to your specific account. You can then sign in and change your default account.

### Is the DelegateManagerGrpcClientModule utilized for delegate connection to the manager over gRPC?

The `DelegateManagerGrpcClientModule` facilitates gRPC communication between the delegate and the manager. However, while it's involved in tasks such as sending task executions and serving as a fallback mechanism for sending task responses, it's recommended to consult the CI team for confirmation on its specific usage, as there might be additional or alternative configurations in place.

### Which resource currently incorporates Audit Trail RBAC?

Audit Trail Role-Based Access Control (RBAC) is included in the resource that allows you to edit the Audit View permission within a role. By default, the Audit view permission is enabled for managed roles such as Account Viewer, Account Admin, Org Viewer, and Org Admin. Suppose you want to disable Audit View for your users. In that case, you must create a role with Audit view permission disabled and all other view permissions enabled and change the role binding of All Organization Users or All Account Users user groups to the new role, thereby denying Audit View Permission for all users. If you want to enable Audit View for a user, you can assign the default Organization Viewer or Account Viewer role to the user or user group based on the scope.

### Has a method been devised for migrating projects from organizations, and what about migrating services from projects?

 There is ongoing work on a project migration feature allowing projects to be moved from one organization to another within an account, but it's not yet complete. However, a Clone entities script exists that enables you to clone your entities from one project in one organization to another project in another organization.

### Is it possible to configure the delegate to continue running tasks for an additional 1-2 minutes after revoking the delegate?

No, it is not configurable. After revoking the token, the delegate will disconnect within 5 minutes. If there are any tasks running, those that can complete within 5 minutes will finish successfully, but tasks taking longer than 5 minutes will fail.

### Why would a Helm delegate fail to start, as indicated by the error message: Pod "xxxxxx" is invalid: spec.containers[0].resources.requests: Invalid value: "1": must be less than or equal to cpu limit?

The error message suggests that the pod for the Helm delegate failed to start due to an invalid CPU resource request, indicating that the CPU request exceeds the limit set for the container.
To resolve the issue:
- Identify the cause: The error indicates an invalid CPU resource request, possibly exceeding the container's CPU limit.
- Check Helm chart modifications: If modifications were made to the Helm chart locally, they might have caused discrepancies in deployed values. Utilize the Helm template to inspect YAML values for debugging.
- Adjust namespace limits: If applicable, ensure that there are no namespace limits conflicting with the Helm delegate installation. If found, consider changing the namespace to resolve the issue.

### Where is the Kubernetes configuration (KubeConfig) stored on the delegate if it's being utilized for Terraform (TF) Kubernetes steps?

The Kubernetes configuration (KubeConfig) on the delegate is typically stored at `${HARNESS_KUBE_CONFIG_PATH}`. For more information, go to [Harness variables](/docs/platform/variables-and-expressions/harness-variables/#kubernetes).
However, if you're unable to locate it at the specified path or within the delegate pod, it's important to confirm whether you're using built-in Terraform steps or running the Terraform CLI in a script and what stage type is being employed. For Terraform dynamic provisioning of infrastructure, you must create a Terraform file without the kube_config specification. In this scenario, since the Kubernetes connector is utilized, the delegate autonomously determines the context for Terraform.

### Is mTLS supported between the delegate and connectors in Harness?

No, mTLS isn't supported between the delegate and connectors in Harness. While mTLS is implemented between the delegate and Harness Manager, connectors act as logical entities facilitating connections between Harness Manager and external systems via the delegate. As such, there's no direct connection between connectors and the delegate that requires securing via mTLS.

### When the NextGen delegate updater job terminates a delegate, does it consider whether jobs are running, and what is the associated grace period?

Yes, the NextGen delegate updater job accounts for running jobs before terminating a delegate. A termination grace period of 10 minutes is set. For more information, go to [Graceful delegate shutdown process](/docs/platform/delegates/delegate-concepts/graceful-delegate-shutdown-process/). 
Upon updating the delegate image, the updater will spin up a new delegate, wait for it to become healthy, and then terminate the old pod. The old pod will stop accepting new tasks, allowing currently executing tasks to finish within the 10-minute grace period before force termination.

### When retrieving audit logs for ingestion into a SIEM tool, what are the considerations between using Audit Streaming via S3 bucket versus Audit trail via API?

The choice between Audit Streaming and Audit trail primarily depends on convenience and infrastructure support. If you are already using S3, you can seamlessly publish audit logs to it. Conversely, API-based access necessitates building state management to handle querying for the latest logs and manage failures. However, in terms of the data itself, there is no difference between the two methods.

### How are inactive delegates managed in Harness NextGen, and what is the behavior of Kubernetes deployments when a node is shut down and restarted?

In Harness NextGen, inactive delegates are automatically removed from the UI either immediately if gracefully shut down or within 6 hours if not. Kubernetes deployments running on a shutdown node will spin up on another available node upon restart, following Kubernetes deployment controller behavior. When the node restarts, Kubernetes will start the pod, which will register and then reappear in the UI. It's important to note that during the period of node shutdown, the delegate will not be visible in the UI. Delegates that are entirely deleted from a node will also disappear from the UI within 6 hours, and this timing cannot be changed.

### What is the extent of Harness' integration with Microsoft Graph API and its permissions requirements for controlling access to resources like users, groups, mail, etc.?

The Harness application utilizes Microsoft Graph API for fetching a list of security groups when users exceed attribute limits in AAD (Microsoft Entra ID). Additionally, there's integration for SAML Group Authorization. It's important to note that there might be a need to pass the x-api-key header with a token (SAT/PAT) for invoking the Harness API from Microsoft tools.

### Can priorityClassName be set on delegate pods using the delegate Helm Chart field to assign appropriate priorities?

Currently, you can't set the `priorityClassName` on delegate pods using the delegate **Helm Chart** field.

### Why might a customer experience issues with their delegate unable to find the Helm utility, which resolves after delegate restarts, and could this be related to frequent gRPC Quota exceeded errors?

The issue of the delegate being unable to find the Helm utility could be related to the binary being deleted or a change in the PATH environment variable. It's worth investigating if any steps or pipelines running on the delegate might be causing this. Additionally, the frequent gRPC Quota exceeded errors are likely unrelated and do not result in any loss of functionality.

### Is there a way to disable auto-upgrade for legacy delegates in Harness?

No, you can't disable auto-upgrade for legacy delegates. However, Harness recommends that you use delegates with an immutable image type, which has the auto-upgrade off feature. For legacy delegates, in case of incidents or emergencies, you can temporarily use an older delegate version until the underlying issue is resolved, but this is only for a limited time. For more information on turning off auto-upgrade for Kubernetes immutable image type delegates, go to [Disable automatic upgrade on an installed delegate image
](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#disable-automatic-upgrade-for-installed-delegate-image).

### How does the DELEGATE_TASK_CAPACITY feature flag affect the behavior of CI run steps in Harness?

The `DELEGATE_TASK_CAPACITY` feature flag allows you to configure the maximum number of tasks that can run simultaneously. For instance, if `DELEGATE_TASK_CAPACITY` is set to 2 and there are 6 tasks running in parallel, Harness Manager will execute only 2 tasks at a time. However, if `DELEGATE_TASK_CAPACITY` is not configured, all 6 tasks will run in parallel.

### When do delegates expire and what does this mean for their compatibility?

Delegates expire six months (24 weeks) from the date the delegate image was released on DockerHub. Although delegate expiration doesn't stop them from working immediately, issues may arise if the backend has advanced too far ahead, rendering the delegate no longer forward-compatible. While delegates are backward compatible, it's highly recommended to upgrade at least once every six months to ensure optimal performance and compatibility.

#### Are AWS KMS secrets stored in AWS or Harness?

Harness stores the secret in its Harness store and retrieves the encryption keys from KMS.

#### Can we use an encryption method other than the default with AWS secret manager?

No. When using the AWS secret manager, the default encryption is used. If you have to use a custom encryption, you must use the AWS KMS secret manager. 

#### Can I do additional encoding of the Harness Delegate token?
No, the additional encoding is not supported on the delegate token.

#### In network security policies, what Harness IPs do I need to allowlist to connect to Harness?
For a list of Harness IPs to allow, go to [Allowlist Harness domains and IPs](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips).

#### While using AWS, KMS secrets are stored on the AWS or Harness end?

Harness stores the secret in its Harness store and retrieves the encryption keys from KMS.

#### Can we use any other encryption (other than the default one) while using the AWS secret manager?

No, while using AWS Secret Manager, default encryption will be used. If you have to use custom encryption, then you need to use AWS KMS Secret Manager.

#### Getting error for no secret found although there is valid secret with identifier 
```
 InvalidRequestException: No secret found with identifier + [atiitmsservicedbpasswordstage]
```

Please check and confirm if secret with this identifier is present on same project level as if the secret is at org or account level than need to add prefix org/account.idenifier while accessing the secret

#### How do I check the pipeline ID in the UI?

To check the pipeline ID in the Harness UI, you can look at the URL of the pipeline you've selected. The unique identifier is present in the URL if you select the pipeline as `/pipelines/mypipeline/`. You can also find it in the YAML view under `identifier` as shown below:

```yaml
pipeline:
  name: Test pipeline
  identifier: mypipeline
```

#### Is there an API to create overrides?

To create overrides via the Harness API, you can use the service override API. For more information, go to [Service overrides](https://apidocs.harness.io/tag/ServiceOverrides) in the API documentation.

#### How do I sign out of Harness?

To sign out of Harness, select **My Profile**, and then select **Sign Out** at the bottom left of the screen.

#### What is the service ID naming convention?

The naming convention for all identifiers in Harness is case sensitive. Identifiers must start with a letter or underscore, followed by letters, numbers, underscores, or dollar signs. For more information, go to [Entity identifier reference](/docs/platform/references/entity-identifier-reference).

#### How can I get all services using a cURL command?

To get all services using a cURL command, you can use the `getServiceList` API and make a cURL request using a valid token. For more information, go to [getServiceList](https://apidocs.harness.io/tag/Services#operation/getServiceList) in the API documentation.

#### How do I trigger an Azure pipeline?

To trigger an Azure pipeline, you can use the script step and invoke/trigger any pipeline using a cURL or webhook.

#### What's the Harness variable replacement for a service name?

To replace the service name with a Harness variable, use `<+service.name>`.

#### Can I create an input variable as a checkbox?

To create an input variable as a checkbox, use allowed values to provide a fixed range of acceptable values for a runtime input. Use multiple selections if you want to choose one or more values from the list of allowed values


#### Do we have account level delegate?
Yes, we offer account-level delegates. You can create them by navigating to Account Settings > Account Resources > Delegate.

#### Is there any Harness API to create overrides?
You can use this API to create overrides - https://apidocs.harness.io/tag/ServiceOverrides#operation/createServiceOverride


#### Is there any jexl expressions to get all projects environment?
We currently don't have a Jexl expression to retrieve all environments, but you can utilize the API endpoint to fetch all environments:https://apidocs.harness.io/tag/Monitored-Services#operation/getEnvironments


#### Does the DELEGATE_RESOURCE_THRESHOLD checks the memory threshold on the request resource or limit resource of the delegate pod?

DELEGATE_RESOURCE_THRESHOLD checks the memory threshold on the request resource.

#### Does the docker delegate also show expiry message in UI if the image is older than expiry threshold ?

Yes, the docker delegates also will show expiry status in the UI if the image is beyond expiry threshold.