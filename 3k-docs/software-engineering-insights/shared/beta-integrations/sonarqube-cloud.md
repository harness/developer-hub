SonarQube is an open-source platform for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.

This page describes the settings and permissions for the SEI SonarQube integration. Harness SEI supports both [Cloud](#add-the-integration) and Self-Managed (On-Prem) versions of SonarQube. 

The following settings are applicable to SonarQube Cloud.

### Requirements

Setting up the SEI SonarQube integration requires a **SonarQube API Token**, and the user creating the token must have **Administer System** permissions.
   
To configure permissions in SonarQube, go to **Administration**, then **Security**, and then **Global Permissions**. Due to the scope of access required, consider using a managed service account, rather than a personal user account, to create the token.

For instructions on creating API tokens, see the [official SonarQube documentation](https://docs.sonarsource.com/sonarqube/9.7/user-guide/user-account/generating-and-using-tokens/). Copy the key somewhere that you can retrieve it when you configure the integration.

:::info
If you have enabled an allowlist in your SonarQube account, certain Harness IP addresses must be added to it in order to allow communication between the Harness Platform and SonarQube. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integration can work correctly, refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall.
:::

### Add the integration

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **SonarQube** integration, and select **Install**.
4. Configure the following fields:

   * **URL:** Enter the URL of the server where SonarQube is running. For SonarQube Cloud, enter `https://sonarcloud.io`.
   * **Username:** The email address of the user that created the token in SonarQube.
   * **API Key:** Enter the SonarQube API token.
   * **Organization:** Enter your SonarQube **Organization Name**. For SonarQube Cloud, you can find your organization name under **My Account**. Note that **Organization Key** is different from the **Organization Name**.
   * **Project Keys:** Enter one or more project keys to ingest. If you want Harness SEI to ingest all projects, leave this field empty. Project keys are case sensitive.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags**: Optionally, add a description and relevant tags for the integration.
5. Save the integration.
6. Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.