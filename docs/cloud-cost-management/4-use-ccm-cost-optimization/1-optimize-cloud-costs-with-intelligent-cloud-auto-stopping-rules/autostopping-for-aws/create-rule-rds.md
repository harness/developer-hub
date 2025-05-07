---
title: AutoStopping Rules for AWS RDS
description: This topic describes how to create AutoStopping Rules for Amazon Relational Database Service (RDS).
sidebar_position: 6
helpdocs_topic_id: ryk2e3ujpn
helpdocs_category_id: biypfy9p1i
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/autostopping-for-rds
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

* Read the following topics in [Set up Cloud Cost Management for AWS](../../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md): 

    * Access to CUR. See Cost and Usage Reports (CUR) and CCM Requirements.
    * Permissions to create a cross-account role. See AWS Access Permissions.
    * Permissions for AWS Resource Optimization Using AutoStopping Rules. See AWS resource optimization using AutoStopping rules.
* The database that will be onboarded must be able to start and stop. Harness AutoStopping cannot manage certain DB instances, such as serverless ones, because they cannot be started or stopped.

## Creating an AutoStopping Rule for RDS

1. In Harness, navigate to **Cloud Costs** module -> **AutoStopping Rules**
2. Click **New AutoStopping Rule**
3. Select **AWS** as your cloud provider. Choose an existing AWS connector or click **New Connector** to [create one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws). 

After this, there are 3 simple steps to set up your AutoStopping rule:

<Tabs>
<TabItem value="configuration" label="Step 1: Configuration">

1. Enter a **Name** for your rule
2. Set the **Idle Time** - how long an instance should be inactive before stopping
3. In the **Resources to be managed by the AutoStopping rules** section, select "RDS". 
4. Click on **Add RDS Instance**.
5.  Set up Advanced Configuration: 
    - Hide Progress Page: This is especially useful when the service is invoked by an automation system, as it prevents misinterpretation of the progress page as the intended response from a service that is onboarded to AutoStopping.
    - Dry-Run: Toggle the button if you wish to evaluate this feature without terminating your cloud resources. For more information, go to Evaluate AutoStopping rules in dry-run mode.
    - Dependencies: Link your rule to other AutoStopping rules when resources depend on each other.
    - Fixed Schedules: Create fixed schedules to automatically start or stop your instances at specific times. 


</TabItem>
<TabItem value="access" label="Step 2: Setup Access">

1. In **Setup Access**, select **Proxy** from drop-down list or [create a new one](docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/autostopping-proxy).
2. Select Source Port and Target Port.
3. Click on Next.

</TabItem>
<TabItem value="review" label="Step 3: Review">


In Review, verify all the configuration details and click **Save Rule**. To edit any of the configuration settings, click **EDIT** and modify the settings.

Your AutoStopping rule is listed under the AutoStopping Rules dashboard.

</TabItem>
</Tabs>


## Use Harness AutoStopping CLI to Keep the RDS Instance(s) Running

You can also use Harness AutoStopping CLI to query the archived database using your own database client. Basically you're leveraging Harness CLI to keep the RDS instance(s) running.

1. From the AutoStopping dashboard, click on the RDS rule.
2. In **Download CLI**, select your operating system to download the Harness CLI for your system.
   
     ![](./static/create-auto-stopping-rules-for-rds-79.png)
3. Click **Download CLI**.
4. Run the following command to connect to an RDS database.  

```
harness connect --host hostname --port 5432
```
  
The above command will start the RDS database if it is not running and set up a secure tunnel to it. This command will output the connection details to which you can connect your database client.
5. As an example, in the case of Postgres, the following command can be used to connect to the database.  

```
psql -h localhost -p port-received-from-above -u postgres
```
  
As soon as your database client is disconnected, AutoStopping will consider it as idleness and shut down the database after the configured idle time.

