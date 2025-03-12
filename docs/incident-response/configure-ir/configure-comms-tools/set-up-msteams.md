---
title: Microsoft Teams Configuration
sidebar_label: Microsoft Teams Configuration
sidebar_position: 1
description: Learn how to connect Microsoft Teams to Harness Incident Response for streamlined communication.
menu_position: 5
---

# Set Up Microsoft Teams

One of the first steps in **configuring Harness Incident Response** is setting up your communication channels. Connecting Microsoft Teams enables seamless **incident collaboration, notifications, and automation**.

---

## Prerequisites  

Before configuring the integration, ensure:  

- You have **Microsoft Teams admin permissions** to install and authorize third-party apps.  
- Your **Harness account** has the necessary permissions to configure communication tools.  
- Your **Microsoft Teams organization settings** allow external app integrations.  

---

## Add a Microsoft Teams Connector  

You can add a **Teams Connector** at the **Project**, **Org**, or **Account** level. This guide covers adding it at the **Project level**, but the process is similar for other levels.

### Steps to Add a Microsoft Teams Connector  

1. In **Project Setup**, navigate to **Connectors**.  
2. Click **New Connector**, then select **Microsoft Teams**.  
3. Enter a **Name** for the connector.  
4. Click **Continue**.  
5. In **Microsoft Teams URL**, enter the webhook URL for your Teams channel.  

   :::note  
   To retrieve your Teams **webhook URL**, follow Microsoft's [Create an Incoming Webhook](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) guide.  
   :::  

6. In **Authentication**, select one of the following methods:  
   - **OAuth Authentication** – Authorize via Microsoft OAuth for secure API access.  
   - **Webhook Integration** – Use an incoming webhook for basic event-based integration.  

---

## Configure Authentication  

### **1. OAuth Authentication**  

1. Click **Sign in with Microsoft** to authenticate your Teams account.  
2. Grant the requested permissions to enable incident automation.  
3. Select the **Teams channel** where Harness Incident Response should send notifications.  
4. Click **Save & Continue**.  

### **2. Webhook Integration**  

1. Copy the **incoming webhook URL** from your Teams channel.  
2. Paste the URL into the **Webhook URL** field in Harness.  
3. Click **Test Connection** to verify the integration.  
4. Click **Save & Continue**.  

---

## Set Up Delegates  

1. Select the **Harness Delegate(s)** for Microsoft Teams connectivity.  
2. Click **Save and Continue**.  
3. Harness will **test the connection**.  

<!-- Uncomment and replace with actual image when available -->  
<!-- ![Microsoft Teams Connection Test](../static/connect-to-teams.png) -->  

4. Click **Finish**.  

The **Microsoft Teams Connector** is now listed in **Connectors**.

---

## Next Steps  

- [Using Microsoft Teams for Incident Management](#)  
- [Configuring Automation for Microsoft Teams](#)  
- [Managing Teams Permissions for Incident Collaboration](#)  