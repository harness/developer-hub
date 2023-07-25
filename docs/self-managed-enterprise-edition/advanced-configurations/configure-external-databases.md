---
title: Configure Harness Self Managed Enterprise Edition with external databases
description: Learn how to configure external databases for Harness Self-Managed Enterprise Edition installations.
sidebar_label: Configure external databases
# sidebar_position: 1
---

Harness uses an embedded database by default, which is suitable for evaluation or small to medium scale deployments. However, as your deployments scale and become critical for your organization, switching to a more robust external database solution is essential. 

Harness supports multiple databases when you deploy Harness Self Managed Enterprise Edition. To use an external database with Harness, you'll need to install and configure the database software as a self-managed solution or on a cloud instance. Once the external database is set up, you can configure Harness to connect to it. This involves specifying the database connection properties, such as the database URL, username, and password.

:::info note
The specific steps and procedures to set up an external database with Harness vary, depending on the version and your specific deployment environment. It's always best to refer to the official Harness documentation and consult the support resources for the most up-to-date and accurate information regarding database configuration for production-ready deployments.

You can choose some of the below databases to be external and others as internal.
:::

## MongoDB
[Self-managed solution](/tutorials/self-managed-enterprise-edition/use-an-external-mongodb-database)
