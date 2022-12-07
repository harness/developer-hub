---
title: Scope Secret Managers to Applications and Environments
description: You can limit the scope of Harness Secret Managers to specific Harness Applications and Environments. Once you set this up, the secrets stored in the Secret Manager may only be used in these Applicat…
# sidebar_position: 2
helpdocs_topic_id: e4ikpd00f6
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

You can limit the scope of Harness Secret Managers to specific Harness Applications and Environments. Once you set this up, the secrets stored in the Secret Manager may only be used in these Applications and Environments.

When used in combination with Harness User Groups Application Permissions, you can scope a Secret Manager's secrets and User Group to the same Applications and Environments.

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Review: Required Permissions](#review_required_permissions)
	+ [Account Permissions](#account_permissions)
	+ [Application Permissions](#application_permissions)
* [Review: Secrets Limitations](#review_secrets_limitations)
* [Review: Changing Secret Manager Scope](#review_changing_secret_manager_scope)
* [Step 1: Open the Harness Secret Manger](#step_1_open_the_harness_secret_manger)
* [See Also](#see_also)

### Before You Begin

* [What is Secrets Management?](/article/au38zpufhr-secret-management)
* [Add a Secrets Manager](/article/uuer539u3l-add-a-secrets-manager)
* [Managing Harness Secrets](/article/8bldcebkkf-managing-harness-secrets)

### Visual Summary

Here is a quick summary of how to scope secrets managers and secrets to Applications and Environments.

### Review: Required Permissions

To scope a Secret Manager, a Harness User must belong to a User Group with the following permissions.

#### Account Permissions

A User must belong to a User Group with the **Manage Secrets Managers** Account Permission enabled.

See [Managing Users and Groups (RBAC)](/article/ven0bvulsj-users-and-permissions).

#### Application Permissions

The Application Permissions in the User Group determine the Applications and Environments that can be used to scope a Secret Manager and use its secrets.

* **To scope the Secret Manager:** User Groups must have the **Update** permissions on the same Applications and Environments used in the Secret Manager scope.
* **To use and create secrets stored in the Secret Manager:** User Groups must have the **Read** permissions on the same Applications and Environments used in the Secret Manager scope.

### Review: Secrets Limitations

When you create a Harness Encrypted Text or File secret, you select the Secret Manager for the secret.

By default, Harness secrets inherit the same scope as the secret manager where they are stored.

If you choose to apply additional scoping rules to a secret, then the Applications and Environments in the secret's scope must be entirely contained within the scope applied to its Secrets Manager.

### Review: Changing Secret Manager Scope

When you change the scope on an existing Secrets Manager that already stores secrets, the new scope might conflict with scopes of its secrets.

In this case, Harness will ask you if you want the secrets to inherit the scope from the Secrets Manager or cancel the change.

As a result of the secret scope change, Workflows and Pipelines using these secrets might stop working.

Alternatively, you can resolve conflicting secrets scopes manually. Next, you can set the Secrets Manager Usage Scope so that there are no more conflicting secrets.

### Step 1: Open the Harness Secret Manger

You can scope a Secret Manager during or after you create it. In this example, we will change an existing Secret Manager:

1. In Harness, click **Security**, and then click **Secrets Management**.
2. In **Secrets Management**, click **Configure Secrets Managers**.
3. Click the name of the Secret Manager you want to scope.  
You can only change the scope of Secret Managers if your Harness User Group has the **Manage Secrets Managers** Account Permission enabled.
4. In **Usage Scope**, select the Applications and Environment types where this Secret Manager's secret may be used.
5. Click **Submit**.

### See Also

* Adding Secrets Managers
	+ [Add a Google Cloud KMS Secrets Manager](https://docs.harness.io/article/avo98eldl0-add-a-google-cloud-kms-secrets-manager)
	+ [Add an AWS Secrets Manager](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager)
	+ [Add an AWS KMS Secrets Manager](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager)
	+ [Add an Azure Key Vault Secrets](https://docs.harness.io/article/2nv0gy1wnh-azure-key-vault)
	+ [Add a HashiCorp Vault Secrets Manager](https://docs.harness.io/article/am3dmoxywy-add-a-hashi-corp-vault-secrets-manager)
* Managing Secrets
	+ [Use Encrypted Text Secrets](https://docs.harness.io/article/ygyvp998mu-use-encrypted-text-secrets)
	+ [Use Encrypted File Secrets](https://docs.harness.io/article/nt5vchhka4-use-encrypted-file-secrets)
	+ [Migrate Secrets between Secrets Managers](https://docs.harness.io/article/prjsaaev0c-migrate-secrets-between-secrets-managers)
	+ [Restrict Secrets Usage](https://docs.harness.io/article/e5q9qcho4y-restrict-secrets-usage)
	+ [Reference Existing Secrets](https://docs.harness.io/article/cwp7rlauzn-reference-existing-secrets)
	+ [Use Secrets in a Delegate Profile](https://docs.harness.io/article/imzgiz9h41-use-a-secret-in-a-delegate-profile)
	+ [Add SSH Keys](https://docs.harness.io/article/gsp4s7abgc-add-ssh-keys)
	+ [Use SSH Keys via Kerberos for Server Authentication](https://docs.harness.io/article/lx4wios62k-use-ssh-key-via-kerberos-for-server-authentication)
	+ [Add WinRM Connection Credentials](https://docs.harness.io/article/9fqa1vgar7-add-win-rm-connection-credentials)

