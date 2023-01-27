---
title: Connect to Your Repos and Target SSH Platforms
description: Traditional (SSH) deployments typically pull application packages from artifact servers and then deploy to target virtual machines on a cloud platform. They can also target physical servers. Harness…
sidebar_position: 20
helpdocs_topic_id: mk5pjqyugc
helpdocs_category_id: td451rmlr3
helpdocs_is_private: false
helpdocs_is_published: true
---

Traditional (SSH) deployments typically pull application packages from artifact servers and then deploy to target virtual machines on a cloud platform. They can also target physical servers. Harness supports connecting and deploying to all target types.

This topic covers the steps needed to connect Harness to your artifact servers and target environments.

### Before You Begin

* [Traditional Deployments (SSH) Overview](../concepts-cd/deployment-types/traditional-deployments-ssh-overview.md)
* [Harness Delegate Overview](../../firstgen-platform/account/manage-delegates/delegate-installation.md)
* [Harness Key Concepts](../../starthere-firstgen/harness-key-concepts.md)

### Step 1: Set Up a Harness Delegate

The Delegate needs to be able to connect to the artifact server or repository containing the file, and the target host where the file will be deployed. Typically, the Delegate is installed on a host in the same subnet as the target host.

For steps on installing the Delegate, see [Harness Delegate Overview](../../firstgen-platform/account/manage-delegates/delegate-installation.md).

For AWS, you can install the Delegate on an EC2 instance and then have the Harness Cloud Provider assume the IAM role used by the Delegate host. For more information, see Delegate Selectors in [Select Delegates for Specific Tasks with Selectors](../../firstgen-platform/account/manage-delegates/select-delegates-for-specific-tasks-with-selectors.md).

### Step 2: Connect to Your Artifact Server

Harness retrieves the package file from an artifact source using a Harness Artifact Server and deploys it to the target host using a Cloud Provider. 

See [Add Artifact Servers](../../firstgen-platform/account/manage-connectors/configuring-artifact-server.md).

### Step 3: Connect to Your Cloud Provider or Physical Server

You connect Harness to the target environment for your deployment. This can be a VM in the cloud or a physical server.

See [Add Cloud Providers](../../firstgen-platform/account/manage-connectors/cloud-providers.md) and [Add Physical Data Center as Cloud Provider](../../firstgen-platform/account/manage-connectors/add-physical-data-center-cloud-provider.md).

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

