The SEI Job Reporter Plugin, monitors all job runs. As soon as a job run completes it sends the info about job run and failed logs back to SEI SaaS.

This plugin does not perform any periodic push. It gathers information about job stages and steps.

* If a job run fails and has no stages, the plugin captures the failed job run logs.
* If the job has stages but no steps, it captures logs for the failed stages.
* If the job has steps, it captures logs for the failed steps.

The plugin does not capture logs for any successful job, stage, or step. The plugin supports the failure triage feature.

| Dependency Name                        | Direct Dependency/Indirect Dependency | Version | URL                                                                                                              |
| - | - | - | - |
| Favorite                               | Indirect                              | 2.3.2   | [https://plugins.jenkins.io/favorite](https://plugins.jenkins.io/favorite)                                       |
| Variant                                | Indirect                              | 1.3     | [https://plugins.jenkins.io/variant](https://plugins.jenkins.io/variant)                                         |
| REST Implementation for Blue Ocean     | Direct                                | 1.23.2  | [https://plugins.jenkins.io/blueocean-rest-impl](https://plugins.jenkins.io/blueocean-rest-impl)                 |
| Common API for Blue Ocean              | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-commons](https://plugins.jenkins.io/blueocean-commons)                     |
| REST API for Blue Ocean                | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-rest](https://plugins.jenkins.io/blueocean-rest)                           |
| Design Language                        | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/jenkins-design-language](https://plugins.jenkins.io/jenkins-design-language)         |
| Blue Ocean Core JS                     | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-core-js](https://plugins.jenkins.io/blueocean-core-js)                     |
| Web for Blue Ocean                     | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-web](https://plugins.jenkins.io/blueocean-web)                             |
| JWT for Blue Ocean                     | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-jwt](https://plugins.jenkins.io/blueocean-jwt)                             |
| Pipeline implementation for Blue Ocean | Direct                                | 1.23.2  | [https://plugins.jenkins.io/blueocean-pipeline-api-impl](https://plugins.jenkins.io/blueocean-pipeline-api-impl) |
| Pipeline SCM API for Blue Ocean        | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-pipeline-scm-api](https://plugins.jenkins.io/blueocean-pipeline-scm-api)   |
| HTML Publisher                         | Indirect                              | 1.23    | [https://plugins.jenkins.io/htmlpublisher](https://plugins.jenkins.io/htmlpublisher)                             |
| Dashboard for Blue Ocean               | Direct                                | 1.23.2  | [https://plugins.jenkins.io/blueocean-dashboard](https://plugins.jenkins.io/blueocean-dashboard)                 |
| Pub-Sub "light" Bus                    | Indirect                              | 1.13    | [https://plugins.jenkins.io/pubsub-light](https://plugins.jenkins.io/pubsub-light)                               |

### Config as Code Settings

#### Requirements

* Jenkins version should be **2.426.3** or higher.
* Use the plugin version **1.0.33** or higher of SEI Job Reporter Jenkins plugin.

#### Step-by-step instructions

To configure the SEI Job Reporter plugin in Jenkins using Configuration as Code (JCasC), follow the instructions below:

1. Locate the `jenkins.yaml` configuration file and insert the following configuration under the `unclassified` section of the `jenkins.yaml` file:

    ```yaml
    propelo-job-reporter:
        levelOpsApiKey: "<SEI_API_KEY>"
        levelOpsPluginPath: "<PLUGIN_PATH>"
        trustAllCertificates: "true" or "false"
        jenkinsInstanceName: "<INSTANCE_NAME>"
        jenkinsUserName: "<USERNAME>" # For Blue Ocean Plugin
        jenkinsUserToken: "<USER_TOKEN>" # For Blue Ocean Plugin
        applicationType: <APPLICATION_TYPE> # eg. SEI_LEGACY
        jenkinsBaseUrl: <BASE_URL_OF_INSTANCE> # eg. https://jenkins-instance.harness.io
    ```

    Here's an example `jenkins.yaml` file

    ```yaml
    jenkins:
    nodeMonitors:
    - "architecture"
    - "clock"
    - diskSpace:
        freeSpaceThreshold: "1GiB"
        freeSpaceWarningThreshold: "2GiB"
    - "swapSpace"
    - tmpSpace:
        freeSpaceThreshold: "1GiB"
        freeSpaceWarningThreshold: "2GiB"
    - "responseTime"
    numExecutors: 2
    globalCredentialsConfiguration:
    appearance:
    security:
    unclassified:
    mailer:
    propelo-job-reporter:
        levelOpsApiKey: "<SEI_API_KEY>"
        levelOpsPluginPath: "<PLUGIN_PATH>"
        trustAllCertificates: "true" or "false"
        jenkinsInstanceName: "<INSTANCE_NAME>"
        jenkinsUserName: "<USERNAME>" # For Blue Ocean Plugin <OPTIONAL>
        jenkinsUserToken: "<USER_TOKEN>" # For Blue Ocean Plugin <OPTIONAL>
        applicationType: <APPLICATION_TYPE> # eg. SEI_LEGACY
        jenkinsBaseUrl: <BASE_URL_OF_INSTANCE> # eg. https://jenkins-instance.harness.io
    tool:
    git:
        installations:
        - home: "git"
        name: "Default"
    mavenGlobalConfig:
        globalSettingsProvider: "standard"
        settingsProvider: "standard"
    ```

1. Specify the **applicationType** based on the environment:
   
   * **Prod 1:** `SEI_HARNESS_PROD_1`
   * **Prod 2:** `SEI_HARNESS_PROD_2`
   * **Prod 3:** `SEI_HARNESS_PROD_3`

By following these steps, you can properly configure the **SEI Job Reporter plugin** using **Jenkins Configuration as Code**. Make sure to replace placeholder values like `<SEI_API_KEY>`, `<PLUGIN_PATH>`, `<INSTANCE_NAME>`, and more with actual data relevant to your Jenkins environment.

:::warning
The **SEI Job Reporter plugin** installation is not supported directly by JCasC itself. For more details, refer to the official [Jenkins Configuration as Code documentation](https://github.com/jenkinsci/configuration-as-code-plugin/tree/master#installing-plugins).
:::