---
title: Jira Configuration
sidebar_label: Jira Configuration
sidebar_position: 2
description: Learn how to connect Jira to Jira Incident Response.
---
# Connect to Jira

Harness integrates with **Jira** via the **Harness Jira Connector**, allowing you to create, update, and use Jira issues in approval steps.

## Prerequisites

Before configuring the integration, ensure:

- Your **Jira REST API account** has permissions to create and edit issues in relevant projects.  
- The **Administer Jira** permission includes all necessary rights (or **Administrator/Member** in [Jira Next-Gen](https://confluence.atlassian.com/jirasoftwarecloud/overview-of-permissions-in-next-gen-projects-959283605.html)).  
- When setting up the **Jira Connector**, enter your **full email address** in the **Username** field.  
- Additional permissions guidance:  
  - [Operation Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#permissions)  
  - [Managing Project Permissions](https://confluence.atlassian.com/adminjiracloud/managing-project-permissions-776636362.html#Managingprojectpermissions-Projectpermissionsoverview)  

---

## Add a Jira Connector

Jira Connectors can be added at the **Project**, **Org**, or **Account** level. This guide covers adding it at the **Project level**, but the process is similar for other levels.

### Steps to Add a Jira Connector

1. In **Project Setup**, navigate to **Connectors**.
2. Click **New Connector**, then select **Jira**.
3. Enter a **Name** for the connector.
4. Click **Continue**.
5. In **Jira URL**, enter the base URL (e.g., `https://mycompany.atlassian.net`).

   :::note
   If using **on-premises Jira** with HTTPS redirects, ensure the HTTPS URL is used.  
   For details, see Atlassian’s [Base URL Configuration Guide](https://confluence.atlassian.com/adminjiraserver071/configuring-the-base-url-802593107.html).
   :::

---

## Configure Authentication

Jira Connectors support **two authentication methods**:

### **1. Username & API Key**

1. Enter your **Jira Username** (must be your full email address).
2. Provide the **API Key** (stored as a Harness [Text Secret](/docs/platform/secrets/add-use-text-secrets)).
3. To generate an API Key, refer to [Manage API Tokens for Atlassian](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
4. Click **Continue**.

### **2. Personal Access Token (PAT)**

:::important
This feature requires **Harness Delegate version 78707**.
:::

To use a **Personal Access Token (PAT)**:

1. Store the PAT as an **encrypted text secret** in Harness.
2. Select the secret in the Jira Connector setup.

```yaml
connector:
   name: jiraPat
   identifier: jiraPat
   description: ""
   orgIdentifier: default
   projectIdentifier: myproject
   type: Jira
   spec:
     jiraUrl: https://jira.dev.example.io/
     delegateSelectors:
       - test
     auth:
       type: PersonalAccessToken
       spec:
         patRef: pat
```
:::important
Jira only supports Personal Access Tokens (PATs) for Server versions.
See [Atlassian’s Guide on PATs](https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html).
:::

## Set Up Delegates
1.	Select the Harness Delegate(s) for Jira connectivity.
2.	Click Save and Continue.
3.	Harness will test the connection.
