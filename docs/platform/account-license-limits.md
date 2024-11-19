---
title: Platform resource Limits
description: Learn about the platform resource limits applied in the Harness Platform.
sidebar_position: 31
---

The Harness Platform enforces limits at account level to ensure optimal performance and system stability. These limits help manage resources and ensure that accounts operate within defined thresholds.

:::info note 
Account limits define the maximum number of specific resources or entities that can be created under a particular account. Once the limits are reached, no additional entities can be created.
:::

Harness account limits are specfied below:

| Resource Type       | Maximum Limit | Description                                                           |
|---------------------|---------------|-----------------------------------------------------------------------|
| Secrets             | 250,000       | Maximum number of secrets that can be created in an account.          |
| Users               | 90,000        | Maximum number of users that can be added to an account.              |
| User Groups         | 50,000        | Maximum number of user groups that can be created in an account.      | 
| Variables           | 90,000        | Maximum number of variables that can be created in an account.        |
| Projects            | 12,500        | Maximum number of projects that can be created in an account.         |
| Organizations       | 5,000         | Maximum number of organizations that can be created in an account.    |
| Connectors          | 75,000        | Maximum number of connectors that can be created in an account.       |
| Service Accounts    | 6,000         | Maximum number of service accounts that can be created in an account. |
| API Keys            | 6,000         | Maximum number of API keys that can be created in an account.         |
| Tokens              | 6,000         | Maximum number of tokens that can be created in an account.           |

:::info important 
Harness reserves the right to modify these limits at any time to ensure platform stability and resource management. 
:::
