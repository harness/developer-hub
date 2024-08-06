---
title: Database DevOps onboarding guide
description: A self-service onboarding guide for Harness DB DevOps.
displayed_sidebar: dbdevopsbeta
# sidebar_position: 4
# sidebar_label: Onboarding guide
---
<!-- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BetaIcon from 'img/icon_beta.svg';

<BetaIcon /> -->

# DB DevOps onboarding guide

Welcome to the Harness Database DevOps (DB DevOps) onboarding guide. This topic introduces you to the powerful capabilities of DB DevOps using Harness and guides you through key functionalities that streamline and secure your database management tasks.  

### Prerequisites

Before beginning the walkthroughs in this guide, ensure you have:

 - Access to a Harness account. 
 - A Kubernetes cluster, connected via a Harness delegate. 
    - You **must** ensure that your Kubernetes cluster has network access to the target database, as well as the Git repository containing your changelog. 
    - Your cluster must be set us as [build infrastructure](https://developer.harness.io/docs/category/set-up-kubernetes-cluster-build-infrastructures/) which can be tested by running the `git clone` step of a custom sgae. 
 - Credentials configured for your database:
    - If you are using **Oracle** connecting as the user `sys`, be aware that this is not currently supported. 
    - credentials need the ability to create/alter/query two tables named `DATABASECHANGELOG`, and `DATABASECHANGELOGLOCK` as well as the ability to update all data in these tables. Credentials also need the ability to execute whatever operations are in your SQL changelogs.
 - You must have an artifact repo configured that can pull these images from Docker hub: 
    - [plugins/drone-liquibase](https://hub.docker.com/r/plugins/drone-liquibase/tags). The tags vary by database. For example:
      - if you're deploying to MongoDB, opt to use [latest-mongo](https://hub.docker.com/r/plugins/drone-liquibase/tags)
      - if you're deploying to any other database, opt to use [latest](https://hub.docker.com/r/plugins/drone-liquibase/tags?page=&page_size=&ordering=&name=latest)
    - [harness/ci-addon](https://hub.docker.com/r/harness/ci-addon)
    - [harness/ci-lite-engine](https://hub.docker.com/r/harness/ci-lite-engine)
    - [harness/drone-git](https://hub.docker.com/r/harness/drone-git)
    - [plugins/download-artifactory:latest](https://hub.docker.com/r/plugins/download-artifactory)
 
## Create a Liquibase Changelog

Database DevOps currently supports deploying sql changes through a liquibase changelog. If you already use liquibase, you can skip to the section ‘Configuring Your DB Schema’. If you do not already use liquibase, we will walk you through creating a liquibase changelog. 

 1. Create a git repo in which to store your database schema definition.
 2. Create a folder named ‘sql’.
 3. Load all of your SQL files into this folder. Ensure their names are configured so that they are alphabetically in the order in which they should run.
 4. Immediately outside the sql folder, create a file named ‘changelog.yml’ with the following content. This file will be your changelog. It will include all sql files in the sql folder.

```
databaseChangeLog:
  - includeAll:
      path: sql
```

## Configuring your Database Schema

The database schema defines a set of SQL changes that can be deployed to one or more database instances. Here is how we will configure it:

 1. Login to your Harness account. 
 2. On the module picker, choose ‘DB DevOps’.
 3. In the left hand nav, choose ‘DB Schemas’. 
 4. Click ‘Add New DB Schema’:
    a. Give your schema a logical name to identify the database configuration that it represents.
    b. Under ‘Connector’ specify a connector for your Git repository, or create a new connector.
    c. Specify the path in this connector under which the liquibase changelog for this schema can be reached.
    d. If you also use Harness CD to deploy your services, you can optionally choose the name of the service that uses this database under ‘Associated Service'. This will allow you to easily see information about the database and its service side-by-side in reports in the future.
    e. Click ‘Add Schema’.

:::info
To learn more about Git connectors settings, reference this [Harness Git connector settings](../../platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference.md) documentation for more.
:::

## Connect your Database Instance 

Before we can deploy our Database Schema, we need to connect a database instance to which we can deploy it. Here’s how:

 1. Starting on the **DB Schemas** screen, You should see a row for your database schema. In the **DB Instances** column, click **New** to add a new database instance.
 2. For your selected branch, we recommend entering the name of your ‘main’ or ‘master’ branch. Some companies leverage GitOps practices where they use a different branch for each environment. If you are doing this for your application code, you can specify a different branch name here so that your database changes can follow the same workflow.
 3. Configure your DB Connector. A DB Connector is a set of credentials used to talk to a running database server.
  a. Click **Select Connector** followed by **New Connector**.
  b. Enter a name for the database to which we will deploy. Click **Continue**. 
  c. Enter a JDBC url that we can use to conenct to the database. 
  d. Enter a username and password for the database. The user *must* have the permissions covered in the [Prerequisites](#prerequisites) section. 
  e. Click **Continue**.
  f. Choose a [delegate](../../platform/delegates/delegate-concepts/delegate-overview.md) to connect to the database. This delegate must have network access to the database server. Click **Save and continue**.
  g. Harness will now test your connection. If the test passes successfully, click **Finish**.

  :::note
  We're aware of a known issue where this test will always fail. We are working to resolve this issue. *26th July 2024*
  :::

 4. *Optional*: Configure context. [Context](https://docs.liquibase.com/concepts/changelogs/attributes/contexts.html) can be used to deploy a different set of changes to different environments from the same branch of git. Inside the changelog, any given change can be labelled with one or more contexts. If you specify a context here, then only changes marked with that context will be deployed to this database instance. If you leave this field blank, than all changes will be deployed to this DB Instance. For example, if you only want changes marked as **Production** to be deployed to your **Production** DB Instance, you could give it the context **Production**. To have a corresponding staging instance get all changes, you would leave the context blank for staging.
 5. Click **Add Database Instance**.

## Configure your Deployment Pipeline

A deployment pipeline deploys your database changes when it runs. In addition to deploying your database, it can also deploy application changes, and have other logic such as requiring a manual approval. Here are some steps on how to create a simple pipeline that deploys a schema change to a database instance anytime it changes in git:

 1. Click **Pipelines**.
 2. Click **Create a Pipeline**.
 3. Enter a name for your pipeline, then click **Start**.
 4. Click **Add Stage**.
 5. Choose **Custom stage**.
 6. Choose **Add step group**.
 7. Click **Enable Containerized Stage**.
 8. Choose the Kubernetes cluster you'd like to run on.

  :::note
  Currently a pipeline will run using this kubernetes cluster, not the cluster specified in your database instance. *26th July 2024*
  :::

 9. Click **Add Step**.
 10. Choose the **DBSchemaApply** step under **DB DevOps**.
 11. For the step name, enter ‘Deploy Database Schema’.
 12. Specify the container registry from which to read the drone container images.
 13. In the step configuration, choose the schema and Instance to update.
 14. Click **Apply Changes**.
 15. Click **Save**.

To test your pipeline:

 1. Click **Run**.
 2. Wait for your pipeline to complete.

## Configure your pipeline to automatically deploy when Git changes


KNOWN ISSUE: currently triggers can not be opened from inside Harness DAtabasse DevOps

 1. Open the **Continuous Delivery & GitOps** module within Harness.
 2. Open **Pipelines** then choose your pipeline.
 3. Click **Triggers**, followed by **New Trigger**.
 4. Choose the git connector to listen for. This git connector will match the configuration you provided in your DB Schema.
 5. Under conditions, specify the branch name(s) that are used by DB Instance(s) updated by this pipeline.
 6. Under **Changed Files**, enter the path to your changelog, and any other files it references. You can leverage regex to reference other changed files. 
 7. Under the pipeline input, change **Tag** to **Expression**. After this step, enter the formula `<+trigger.commitSha>` which will read the `sha` from the triggering git commit.

## Conclusion

This onboarding guide has introduced you to the essential functionalities and initial setup processes of Harness Database DevOps (DB DevOps). Through this guide, you have explored the powerful capabilities of functionalities that streamline and secure your database management tasks, from connecting git connectors to configuring pipelines.
