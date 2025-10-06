---
title: Catalog Auto-Discovery with Harness CD Services
description: Steps to use Catalog Ingestion API to ingest metadata and use the information on catalog overview and workflows
sidebar_position: 1
sidebar_label: Harness CD
---

## Overview

This document provides information on how to use the Harness IDP Catalog Auto-Discovery integration to sync Harness CD services to IDP Catalog. This integration populates your IDP Catalog with your CD services, enabling you to easily sync, view, and manage your Harness CD services directly in Catalog. All these services are populated as IDP service entities with a real-time sync between both IDP service entities and CD services. 

## Before you begin
Ensure you have all the prerequisites before you begin: 
1. This integration is behind this feature flag **`IDP_CATALOG_CD_AUTO_DISCOVERY`**. Contact Harness support to enable this feature flag. 
2. Harness CD is enabled for your account. This must be the same account you are using to access and use Harness IDP.  

## Catalog Auto-Discovery with Harness CD

### 1. Enable the Harness CD Auto-Discovery Integration 
To start with, follow the given instructions: 
1. Go to **Configure** in your Harness IDP. 
2. Go to **Integrations**. Click **Enable** in the Harness CD services integration card to enable this integration. This will enable the integration for your account. 

:::info
Ensure that you use the same account to enable this integration for which you have Harness CD enabled. This integration fetches data from the same CD account. 
:::

### 2. Sync Harness CD Services to IDP Catalog
Once the integration is enabled, you have to sync your Harness CD services to IDP Catalog. 
- **IDP entities**: All your CD services are populated in the IDP Catalog as IDP entities with the given metadata:
    - `kind: Component` 
    - `type: Service`. 
- **IDP entity fields population**: IDP entities are populated and synced with CD services with the given input fields: 
    - `name`
    - `identifier`
    - `description`
    - `tags`
    
    This data is always fetched and synced with Harness CD services. No changes can be made for these fields in IDP entities. These fields can only be changed in Harness CD. 
- **Uni-directional sync**: There's a real-time sync between IDP entities and CD services. Any changes to the CD service are reflected in the IDP entity. This sync is uni-directional (CD service -> IDP entity). Any changes to the IDP entity are not reflected in the CD service.
- **RBAC**: You'll also be able to access and sync services from all the same projects and organizations, that you have permissions for in Harness CD. RBAC configured for your account will stay the same for IDP entities and CD services. 

Follow the given instructions to sync your Harness CD services in IDP Catalog:
1. Once you have enabled the integration, click on **Edit** in the same integration card. 
2. You can select from 2 scopes to sync Harness CD services from: 
    - **All Scopes**: Sync all your CD services across the account (all organizations and projects). 
    - **Particular Organizations & Projects**: Sync your CD services from some specific organizations and projects. To do this, select the project or organization from the drop-down. 
3. Click on **Save Changes** to sync all the services. 

And that's it. Your CD services are now synced to IDP Catalog. 

To know more about suspending auto-discovery of CD services, go to [Suspend Auto-Discovery](/docs/internal-developer-portal/catalog/catalog-discovery/harness-cd.md#4-suspend-auto-discovery). 

### 3. View & Manage CD Services in IDP Catalog 
To view and manage your CD services in IDP Catalog, make sure you have completed the above steps. Once you have synced your CD services, go to IDP Catalog and search for any specific CD service. You'll find it in the IDP Catalog with all data synced from your CD service. 

#### View your CD Service in IDP 
- Go to IDP Catalog and open the specific CD service you want to check. 
- You can view all the data synced from your CD service in the IDP entity. 
- The **CI/CD** plugin is automatically configured for this entity with the CD service. 
- You can also open this IDP entity in CD by clicking on this **Open in Harness CD** button from the entity overview card. 

:::info 
Note that you won't be able to change the IDP entity fields populated from Harness CD directly. These fields can only be changed in Harness CD. Go to [IDP entity fields population](/docs/internal-developer-portal/catalog/catalog-discovery/harness-cd.md#2-sync-harness-cd-services-to-idp-catalog) to know more. 
:::

#### Check the IDP entity reference in CD 
- Go to Harness CD and open the specific CD service created. 
- Go to **Referenced by** section of that specific entity. 
- You can check and open the IDP entity created and synced with respect to that specific CD service. 


### 4. Suspend Auto-Discovery
You can suspend auto-discovery of Harness CD services by following the given instructions: 
1. Go to **Configure** -> **Integrations** -> **Harness CD**. Click on **Edit**. 
2. Select **Suspend Auto-discovery**. Click on **Save Changes**. 

And that's it. Your CD services are now suspended from auto-discovery. 


