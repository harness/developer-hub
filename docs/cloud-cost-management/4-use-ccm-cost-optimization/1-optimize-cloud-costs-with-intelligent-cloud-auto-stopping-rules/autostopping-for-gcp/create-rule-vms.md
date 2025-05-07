---
title: AutoStopping Rules for GCE VMs
description: This topic describes how to create an AutoStopping Rule for GCP.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites
   * You must provide the required permissions to Harness to create an instance in your GCP account.
   * You must provide the required permissions to read the secrets and fetch the certificates stored in the secret for TLS-based flows.
   * Ensure that you reserve some IPs if you intend to allocate elastic IP while creating an AutoStopping proxy.

## Creating an AutoStopping Rule for RDS

1. In Harness, navigate to **Cloud Costs** module -> **AutoStopping Rules**
2. Click **New AutoStopping Rule**
3. Select **GCP** as your cloud provider. Choose an existing GCP connector or click **New Connector** to [create one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp). 

After this, there are 3 simple steps to set up your AutoStopping rule:

<Tabs>
<TabItem value="configuration" label="Step 1: Configuration">

1. Enter a **Name** for your rule
2. Set the **Idle Time** - how long an instance should be inactive before stopping
3. In the **Resources to be managed by the AutoStopping rules** section, select "Compute Engine VM(s)". 
4. Click on **+ Add an instance**. Add the instances that you want to manage by this rule.
5.  Set up Advanced Configuration: 
    - Hide Progress Page: This is especially useful when the service is invoked by an automation system, as it prevents misinterpretation of the progress page as the intended response from a service that is onboarded to AutoStopping.
    - Dry-Run: Toggle the button if you wish to evaluate this feature without terminating your cloud resources. For more information, go to Evaluate AutoStopping rules in dry-run mode.
    - Dependencies: Link your rule to other AutoStopping rules when resources depend on each other.
    - Fixed Schedules: Create fixed schedules to automatically start or stop your instances at specific times. 


</TabItem>
<TabItem value="access" label="Step 2: Setup Access">

Choose how users will access your VM instances:

- **Setup Access for TCP workload or SSH/RDP**: If the underlying applications running on the resources managed by AutoStopping Rule are accessed via TCP, SSH or RDP.
- You could skip this step for now and use the CLI to set up access. Go to [Use the Harness CLI to access resources through SSH/RDP](create-autostopping-rules-aws.md#use-the-harness-cli-to-access-resources-through-sshrdp) for details.

If you need to access the resources managed by this AutoStopping rule using TCP or SSH/RDP HTTPS URL, you need to perform the following steps:

1. Choose an AutoStopping Proxy from the **Specify AutoStopping Proxy** dropdown list to set up access or create a [new one](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/autostopping-proxy).
2. Toggle SSH or RDP to specify the listening ports. The port number is autopopulated based on the security group.
3. Specify the source port numbers and the target TCP ports your application is listening to. If the source port is not specified, a random port will be generated at the backend. This auto-generated port will continue to be used as long as the target port remains unchanged or unless the user explicitly modifies the source port.
4. Click **Next**.

- **Set up Access for HTTP/HTTPS workload**: 
If you need to access the resources managed by this AutoStopping rule using an HTTP or HTTPS URL, you need to perform the following steps:

1. Choose an existing AutoStopping Proxy from the dropdown list to set up access or create a [new one](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/autostopping-proxy)
6. Click **Next**.


</TabItem>
<TabItem value="review" label="Step 3: Review">


In Review, verify all the configuration details and click **Save Rule**. To edit any of the configuration settings, click **EDIT** and modify the settings.

Your AutoStopping rule is listed under the AutoStopping Rules dashboard.

</TabItem>
</Tabs>


