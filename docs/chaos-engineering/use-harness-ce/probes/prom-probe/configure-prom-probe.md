---
title: Configure Prometheus probe
sidebar_position: 20
description: Configure Prometheus probe
---

This topic describes the configuration and usage of Prometheus probe.

1. Provide the name, and click **Configure Details**.

    ![](./static/name-1.png)

2. **Prometheus Endpoint** is a mandatory field, when it is not a managed Prometheus. 

    ![](./static/details-2.png)

3. In case of managed Prometheus, populate authorization and TLS config, and skip providing a value for the **Prometheus Endpoint**.

    ![](./static/auth-3.png)

4. Provide the **Prometheus Query** type, and query if relevant. Ensure that the strings inside the query are enclosed within backslash ("/").

    ![](./static/query-4.png)

5. Specify the data comparison fields, and click **Configure Properties**.

    ![](./static/comparison-5.png)

6. Specify probe properties such as timeout, interval, and so on. Click **Create Probe**.

    ![](./static/properties-6.png)
