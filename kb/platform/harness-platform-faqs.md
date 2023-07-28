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
