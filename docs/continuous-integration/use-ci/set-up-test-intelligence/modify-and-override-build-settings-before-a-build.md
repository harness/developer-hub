---
title: Override secrets in settings.xml at runtime
description: Override Maven settings before a build runs.
sidebar_position: 70
helpdocs_topic_id: 2hpamxaqf0
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

Use the following steps to override secrets in a [Maven settings.xml file](https://maven.apache.org/settings.html) by modifying the [Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md) when the pipeline runs.

These steps assume you have an understanding of the [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) or that you know how to [add your own secrets manager](/docs/platform/secrets/secrets-management/add-secrets-manager). You should also be familiar with [adding text secrets](/docs/platform/secrets/add-use-text-secrets), [adding file secrets](/docs/platform/secrets/add-file-secrets), and [adding SSH secrets](/docs/platform/secrets/add-use-ssh-secrets).

## Create a secret at the account scope

Create a [text secret](/docs/platform/secrets/add-use-text-secrets) at the [account scope](/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) that contains the content of your `settings.xml` file.

You need permissions to create, edit, and view secrets at the account scope to be able to do this. For more information, go to the [Permission Reference](/docs/platform/role-based-access-control/permissions-reference).

1. Go to **Account Settings**, select **Account Resources**, and then select **Secrets**.
2. Select **New Secret**, and then select **Text**.
1. Enter a **Secret Name**, such as `settingsXML`. Take note of the **ID**. You need it to reference the secret in your pipeline.
4. In **Secret Value**, paste the XML settings content from your `settings.xml` file.

   ![](./static/modify-and-override-build-settings-before-a-build-09.png)

5. Select **Save**.

## Transcribe the text secret into settings.xml

Create a new `settings.xml` file in the Harness working directory (`/harness`) and include a command in your pipeline to assign the value of your settings XML text secret to that file. To do this, modify the [Run step](../run-ci-scripts/run-step-settings.md) or [Run Tests step](./set-up-test-intelligence.md) where your Maven tests run.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="run" label="Run step" default>
```

If your Maven tests run in a **Run** step, add the following to the **Command**:

```
echo '<+secrets.getValue("account.[settingsXMLSecretID]")>' > settings.xml
```

```mdx-code-block
  </TabItem>
  <TabItem value="run-tests" label="Run Tests step">
```

If your Maven tests run in a **Run Tests** step, add the following to the **Pre-Command**:

```
echo '<+secrets.getValue("account.settingsXML")>' > settings.xml
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Modify the mvn test command

Once the `settings.xml` file exists in the Harness working directory, Maven can read your text secret from this file if you run `mvn test` with the `-s` flag. For example:

```
mvn test -s settings.xml
```

## Optional: Use the .m2 directory

If your `settings.xml` file is in the `~/.m2/` directory, Maven can read the secrets from the default location and you don't need to run `mvn test` with `-s` flag.

For example, if you can use the following command to [transcribe the text secret](#transcribe-the-text-secret-into-settingsxml) to `~/.m2/`:

```
echo '<+secrets.getValue("account.settingsXML")>' > ~/.m2/settings.xml
```

And then you only need `mvn test` to run the test.
