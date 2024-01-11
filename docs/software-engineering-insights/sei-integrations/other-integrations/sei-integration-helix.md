---
title: SEI Helix integration
description: Integrate SEI with Helix.
sidebar_position: 120
sidebar_label: Helix Core
---

Perforce Helix Core is a version control software for large scale development environments. Helix Swarm allows geographically dispersed developers to coordinate their code review.

Use the SEI Helix integration to integrate SEI with remote Helix Core Server instances.

## Configure the SEI user

To transmit data from Helix to SEI, you must create an SEI user in your Helix Core Server instance.

1. To create a user in Helix Core Server, run `p4 user -f USERNAME`. Replace `USERNAME` with the desired username for your SEI user.
2. Assign at least `list` permission to the user. You must have `super` access to run `p4 protect` and modify user permissions.
3. Note the username and password for the SEI user. You need this information to configure the SEI Helix integration.

For more information, go to the Helix Core documentation on the [p4 user command](https://www.perforce.com/manuals/cmdref/Content/CmdRef/p4_user.html) and [p4 protect command](https://www.perforce.com/manuals/cmdref/Content/CmdRef/p4_protect.html#p4_protect).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Configure the integration


<Tabs>
  <TabItem value="cloud" label="Cloud" default>


1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Perforce Helix Server** integration, and select **Install**.
4. Enter your Helix Core Server instance specifications:

   * **Helix Core Server:** Enter the IP/hostname of your Helix Core Server instance.
   * **Helix Core Port:** Enter the port on which Helix Core Server is running.
   * **Username:** Enter the username of the SEI user you created in Helix Core Server.
   * **Password:** Enter the password of the SEI user.
   * **Helix Swarm URL:** If you want to integrate with Helix Swarm, enter your Helix Swarm URL. If you don't want to integrate with Helix Swarm, leave this field empty.
   * **Server Uses SSL:** Select this option if your Helix Core Server instance uses SSL.
   * **SSL Fingerprint:** Enter the fingerprint for your Helix Core Server instance. You can get the fingerprint by running `p4d -Gf`, if the value of [P4SSLDIR](https://www.perforce.com/manuals/cmdref/Content/CmdRef/P4SSLDIR.html) is set correctly.

   To integrate with the on-premises instances of Helix Core Server, you must use an [Ingestion Satellite](/docs/category/ingestion-satellite/).

5. Enter a **Name** for the integration. **Description** and **Tags** are optional.
6. Finish configuration and save the integration.


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Helix server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: helix
    url: '<HELIX_URL>' # p4javassl://https://<IP_ADDRESS>/:1666
    username: <HELIX_USERNAME>
    api_key: <HELIX_API_KEY>
    metadata:
      helix_swarm_url: '<HELIX_SWARM_URL>'
      ssl_enabled: true
      ssl_fingerprint: <SSL_FINGERPRINT>
      ssl_auto_accept: false
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>


## Add depot mappings

Depot mappings are required for your Helix Core data to be available in your SEI Insights.

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Find your new **Perforce Helix Server** integration and edit it.
4. Under **Repo Paths** add repo names and corresponding depot paths.

   * A **Repo Name** is a unique identifier that identifies the set of files under a depot.
   * A **Depot Path** is a Helix Core path.
