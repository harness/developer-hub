---
title: Maven settings.xml
description: Information about settings.xml in Harness CI.
sidebar_position: 70
helpdocs_topic_id: 2hpamxaqf0
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/modify-and-override-build-settings-before-a-build
  - /docs/continuous-integration/use-ci/run-tests/modify-and-override-build-settings-before-a-build
---

This topic provides guidance on storing and using Maven `settings.xml` with Harness CI. It is not exhaustive. This information is provided primarily to address some specific use cases for `settings.xml`.

## Where do I store Maven project settings.xml in Harness CI?

There are several options for handling `settings.xml` in Harness CI:

* Store `settings.xml` externally from Harness, such as in a version control repo, and then [use a Git Clone or Run step to clone that repo (or subdirectory of a repo) into your pipeline](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#add-a-git-clone-or-run-step).
* Store `settings.xml` as a file secret in Harness and then use a shell script in a Run step to copy the file to the relevant directory when your build runs.
* Store values for `settings.xml` as text secrets, and then add those values to a new `settings.xml` file that is created when your build runs. An example of this is shown in [Override secrets in settings.xml at runtime](#override-secrets-in-settingsxml-at-runtime).

You can use expressions to reference secrets in step commands, such as:

```
cat > settings.xml <<- EOM
<+secrets.getValue("account.[settingsXMLSecretID]")>
EOM
```

If you need to share `settings.xml` with multiple steps in the same stage, declare it in **Shared Paths**. For more information, go to [Share data between steps in a stage](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/).

## Override secrets in settings.xml at runtime

Use the following steps to override secrets in a [Maven settings.xml file](https://maven.apache.org/settings.html) by modifying the [Build stage settings](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings) when the pipeline runs.

These steps assume you have an understanding of the [Harness Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview) or that you know how to [add your own secrets manager](https://developer.harness.io/docs/platform/get-started/tutorials/add-secrets-manager). You should also be familiar with [adding text secrets](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets), [adding file secrets](https://developer.harness.io/docs/platform/secrets/add-file-secrets), and [adding SSH secrets](https://developer.harness.io/docs/platform/secrets/add-use-ssh-secrets).

### Create a secret at the account scope

Create a [text secret](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets) at the [account scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) that contains the content of your `settings.xml` file.

You need permissions to create, edit, and view secrets at the account scope to be able to do this. For more information, go to the [Permission Reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference).

1. Go to **Account Settings**, select **Account Resources**, and then select **Secrets**.
2. Select **New Secret**, and then select **Text**.
1. Enter a **Secret Name**, such as `settingsXML`. Take note of the **ID**. You need it to reference the secret in your pipeline.
4. In **Secret Value**, paste the XML settings content from your `settings.xml` file, and then select **Save**.

![](../static/modify-and-override-build-settings-before-a-build-09.png)

## Transcribe the text secret into settings.xml

Create a new `settings.xml` file in the Harness working directory (`/harness`) and include a command in your pipeline to assign the value of your settings XML text secret to that file. To do this, modify the [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings) or [Test step](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/tests-v2) where your Maven tests run.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="run" label="Run or Test step" default>

If your Maven tests run in a **Run** or **Test** step, add the following to the **Command**:

```
cat > settings.xml <<- EOM
<+secrets.getValue("account.settingsXML")>
EOM
```

</TabItem>
  <TabItem value="run-tests" label="Run Tests step (deprecated)">

If your Maven tests run in a **Run Tests** step, add the following to the **Pre-Command**:

```
cat > settings.xml <<- EOM
<+secrets.getValue("account.settingsXML")>
EOM
```

</TabItem>
</Tabs>

### Modify the Maven test command

Once the `settings.xml` file exists in the Harness working directory, Maven can read your text secret from this file if you run `mvn test` with the `-s` flag. For example:

```
mvn test -s settings.xml
```

### Optional: Use the .m2 directory

If your `settings.xml` file is in the `~/.m2/` directory, Maven can read the secrets from the default location and you don't need to run `mvn test` with `-s` flag.

For example, if you can use the following command to transcribe the [settings.xml text secret](#transcribe-the-text-secret-into-settingsxml) to `~/.m2/`:

```
cat > ~/.m2/settings.xml <<- EOM
<+secrets.getValue("account.settingsXML")>
EOM
```

And then you only need `mvn test` to run the test.
