---
title: Getting Started with Perspectives
description: Learn how to set up and use Perspectives to organize cloud resources according to your business needs.
sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Before getting started with Perspectives, ensure you have:

* An active Harness Cloud Cost Management (CCM) account
* Administrative access to your cloud provider account(s)
* Necessary permissions to create and manage connectors in Harness

## Quick Setup Process

<div className="quick-setup-container" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
  <div className="setup-step" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px', textAlign: 'center'}}>
    <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>1</div>
    <div style={{fontWeight: 'bold'}}>Connect Cloud Provider</div>
    <div>Create CCM connector for your cloud account</div>
  </div>
  <div className="setup-step" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px', textAlign: 'center'}}>
    <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>2</div>
    <div style={{fontWeight: 'bold'}}>Wait for Data Ingestion</div>
    <div>Data processing takes ~24 hours</div>
  </div>
  <div className="setup-step" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px', textAlign: 'center'}}>
    <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>3</div>
    <div style={{fontWeight: 'bold'}}>Access & Create</div>
    <div>View default and create custom perspectives</div>
  </div>
</div>

## Creating CCM Connectors

To start using Perspectives, connect your cloud provider accounts to Harness CCM by creating the appropriate connector and ingesting the data from external sources. After this, wait for the data ingestion process to complete (approximately 24 hours) and then you can see the default perspectives.

| Cloud Provider | Setup Guide |
|:--------------|:-----------|
| **AWS** | [Complete AWS Connector Setup Guide](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws) |
| **Azure** | [Complete Azure Connector Setup Guide](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure) |
| **GCP** | [Complete GCP Connector Setup Guide](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp) |
| **Kubernetes** | [Complete Kubernetes Connector Setup Guide](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes) |
| **External Data** (Beta) | [External Cost Data Ingestion Guide](/docs/cloud-cost-management/get-started/onboarding-guide/external-data-ingestion) |

:::tip
You can connect multiple cloud providers and external data sources and use them together in a single Perspective to get a unified view of all your cloud costs in one place.
:::

## Accessing Default Perspectives

After connecting your cloud provider and waiting for data ingestion (approximately 24 hours):

1. Navigate to the **Perspectives** page in your Harness CCM dashboard
2. Look for the **By Harness** filter in the top-left corner to view all default perspectives

## Creating Your First Perspective

To create a custom perspective that matches your business needs, see [Creating a Perspective](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective).

## Next Steps

Once your cloud providers are connected and data is flowing, you can:

* [Learn Key Concepts](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts) 
* [Create a Perspective](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective).
