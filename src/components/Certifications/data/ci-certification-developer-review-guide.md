


|Domain|Topic|Material |
| :- | :- | :- |
|**1. Harness Basics, Platform Entities, and Key Concepts**|||
||Describe continuous integration fundamentals (important stages or steps)|[Harness CI](https://developer.harness.io/tutorials/build-code/fastest-ci)|
||Describe Artifacts and Packages (from jar to container image, helm, etc)|[Harness CI Concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts)|
||Describe and explain the "Pipeline, Stages, *Step Groups*, Steps" schema|[Harness Key Concepts](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts)|
||Describe Harness hierarchy "Account, Organizations, Projects"|[Connect to an Artifact Repo](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts)|
||Describe Artifact Repos|[Connect to an Artifact Repo](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts)|
||Configure Artifact Repos|[Connect to an Artifact Repo](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts)|
||Describe Build Infrastructures and Platforms|[Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/)|
||Configure Build Infrastructures and Platforms|[Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/)|
||CI Build Infrastructures - Describe different options: Harness Cloud Hosted (VMs Hosted by Harness), Local Hosted (Customer's local machines - Docker or Host), Kubernetes Self-Hosted, VMs Self-Hosted (Cloud Providers)|[Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/)|
||Harness Cloud - Describe Supported platform and OS (Linux, Mac, Windows)|[Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/)|
||<p>Harness Cloud - Test on Harness Cloud build infrastructure - Where an each Stage is an ephemeral VM</p><p>Describe ephemeral environments (Part of the CI process to spin up environments to run tests)</p>|[Get started with Harness Cloud](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart)|
||Describe Connectors (you can use Source Providers, Artifact Repos, Cloud Providers, etc)|[Connectors](https://developer.harness.io/docs/category/connectors)|
||Configure a Git Connector|[Add a GitHub Connector](https://developer.harness.io/docs/platform/Connectors/add-a-git-hub-connector)|
||Configure a DockerHub Connector|[Connect to Harness Container Image Registry Using Docker Connector](https://developer.harness.io/docs/platform/Connectors/connect-to-harness-container-image-registry-using-docker-connector)|
||Describe Harness Delegate role for the CI capability|[CI pipeline basics](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-pipeline-basics)|
||Pipeline Studio vs YAML Structure (TBD, but that's important)|TBD|
||Secrets Management - Describe possible usages for Harness CI|[Add and Reference Text Secrets](https://developer.harness.io/docs/platform/security/add-use-text-secrets/)|
||Secrets Management - How to retrieve and render secrets using Harness Expressions|[Add and Reference Text Secrets](https://developer.harness.io/docs/platform/security/add-use-text-secrets/)|
||Describe Harness Variables and Expressions|[Built-in and Custom Harness Variables Reference](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/)|
||Configure and use Variables and Expressions|[Built-in CI codebase variables reference](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/)|
||Describe built-in variables|[Built-in and Custom Harness Variables Reference](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/)|
||Describe built-in CI codebase variables.|[Built-in CI codebase variables reference](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/built-in-cie-codebase-variables-reference/)|
||Describe Default Settings|[Default Settings](https://developer.harness.io/docs/platform/settings/default-settings/)|
||Configure Default Settings|[Default Settings](https://developer.harness.io/docs/platform/settings/default-settings/)|
||Identify types of artifacts (i.e., helm chart, library to Artifactory, npm library, docker image, and other use cases)|[Build and Upload Artifacts](https://developer.harness.io/docs/category/build-and-upload-artifacts)|
||Identify Scanning options (not including STO)|GAP|
||Describe the Harness Manager|[Harness Platform architecture](https://developer.harness.io/docs/getting-started/harness-platform-architecture/)|
||Describe the Harness Delegate|[Harness Platform architecture](https://developer.harness.io/docs/getting-started/harness-platform-architecture/)|
|**2. Harness CI Pipelines and its Features**|||
||Describe Harness Step Library for CI Stages|[CI Technical Reference](https://developer.harness.io/docs/category/ci-technical-reference)|
||Describe Codebase configuration|[Create and Configure a Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/)|
||Perform Codebase configuration|[Create and Configure a Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/)|
||Describe Shared Paths|[Share CI Data Across Steps and Stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/)|
||Configure Shared Paths|[Share CI Data Across Steps and Stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/)|
||Describe Drone/CI Plugins|[Plugin step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/plugin-step-settings-reference/)|
||Identify common Drone/CI Plugins|[Drone Plugins](https://plugins.drone.io/)|
||Step Library - Configure a Plugin Step|[Plugin step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/plugin-step-settings-reference/)|
||Describe Caching and Caching Intelligence|[Cache Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence)|
||Configure Caching and Caching Intelligence (Save and Restore in a Stage, probably)|[Share and Cache CI Data](https://developer.harness.io/docs/category/share-and-cache-ci-data)|
||Describe Remote Docker Layer Caching|[Optimizing CI Build Times](https://developer.harness.io/docs/continuous-integration/troubleshoot/optimizing-ci-build-times/)|
||Configure Remote Docker Layer Caching|[Optimizing CI Build Times](https://developer.harness.io/docs/continuous-integration/troubleshoot/optimizing-ci-build-times/)|
||Describe Harness Test Intelligence|[Enable Test Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-test-intelligence/)|
||Configure Harness Test Intelligence|[Test Intelligence](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts)|
||Describe Triggers for CI (git-based, etc)|[Trigger Pipelines using Git Event Payload Conditions](https://developer.harness.io/docs/platform/triggers/trigger-pipelines-using-custom-payload-conditions)|
||Configure Triggers for CI (git-based, etc) including elaborating on Trigger Conditions|<https://developer.harness.io/docs/platform/triggers/trigger-pipelines-using-custom-payload-conditions/>|
||Configure custom webhook triggers|[Trigger Pipelines using Git Event Payload Conditions](https://developer.harness.io/docs/platform/Triggers/trigger-deployments-using-custom-triggers)|
||Describe Input Sets and Overlays|[Input Sets and Overlays](https://developer.harness.io/docs/platform/Pipelines/input-sets)|
||Configure Input Sets and Overlays|[Input Sets and Overlays](https://developer.harness.io/docs/platform/Pipelines/input-sets)|
||Describe Failure Strategies|<p>[Step and Stage Failure Strategy References](https://developer.harness.io/docs/platform/Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings) </p><p>[Define a Failure Strategy on Stages and Steps](https://developer.harness.io/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) </p>|
||Configure Failure Strategies|<p>[Step and Stage Failure Strategy References](https://developer.harness.io/docs/platform/Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings) </p><p>[Define a Failure Strategy on Stages and Steps](https://developer.harness.io/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) </p>|
||Describe Conditional Execution|[Stage and Step Conditional Execution Settings](https://developer.harness.io/docs/platform/Pipelines/w_pipeline-steps-reference/step-skip-condition-settings)|
||Perform a Conditional Execution|[Stage and Step Conditional Execution Settings](https://developer.harness.io/docs/platform/Pipelines/w_pipeline-steps-reference/step-skip-condition-settings)|
||Describe Looping Strategies (Matrix, Repeat, Parallelism)|<p>[Looping Strategies Overview -- Matrix, Repeat, and Parallelism](https://developer.harness.io/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) </p><p>[Best Practices for Looping Strategies](https://developer.harness.io/docs/platform/Pipelines/best-practices-for-looping-strategies) </p>|
||Configure Looping Strategies (Matrix, Repeat, Parallelism)|<p>[Looping Strategies Overview -- Matrix, Repeat, and Parallelism](https://developer.harness.io/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) </p><p>[Best Practices for Looping Strategies](https://developer.harness.io/docs/platform/Pipelines/best-practices-for-looping-strategies)</p>|
||Advanced Options - Describe Timeout Settings|[Define a Failure Strategy on Stages and Steps](https://developer.harness.io/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps)|
||Advanced Options - Describe selective stage(s) executions|[Run Specific Stages in Pipeline](https://developer.harness.io/docs/platform/Pipelines/run-specific-stage-in-pipeline)|
||Describe Notifications - Based on Pipeline Events|[Add a Pipeline Notification Strategy](https://developer.harness.io/docs/continuous-delivery/cd-advanced/cd-notifications/notify-users-of-pipeline-events/)|
||Configure Notifications - Based on Pipeline Events|[Add a Pipeline Notification Strategy](https://developer.harness.io/docs/continuous-delivery/cd-advanced/cd-notifications/notify-users-of-pipeline-events/)|
||Describe how to run Steps on Host vs Containers (can use Harness Cloud to make it simpler)|[Harness CI concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts)|
||Configure to send PR Status updates|GAP, a good tutorial opportunity.|
||Describe how to **test** for Swimlanes (probably Java) with Harness Run Test Step (just unit test)|[Build, test, and publish a Docker Image for a Java HTTP server application](https://developer.harness.io/tutorials/build-code/ci-java-http-server)|
||Configure Run Tests Step - Java with Maven is suggested (test report, pre post commands) - just unit tests|[Build, test, and publish a Docker Image for a Java HTTP server application](https://developer.harness.io/tutorials/build-code/ci-java-http-server)|
||Configure outputs from one step to another|[Run Tests step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/configure-run-tests-step-settings/)|
||Step Library - Describe Save and Restore Cache in the Pipeline|[Share and Cache CI Data](https://developer.harness.io/docs/category/share-and-cache-ci-data)|
||Step Library - Configure Save and Restore Cache in the Pipeline|[Share and Cache CI Data](https://developer.harness.io/docs/category/share-and-cache-ci-data)|
||Step Library - Describe Background Steps|[Background step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/background-step-settings)|
||<p>Step Library - Configure a Background Step</p><p>Configure service dependencies (SQL instances, Elasticsearch, DIND, etc.) - adding steps to a stage</p>|<p>[Background step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/background-step-settings) </p><p>[Run Docker in Docker in a CI Stage](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage/) </p>|
||Step Library - Describe Git Clone Step (versus the Codebase one)|[Git Clone step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/ci-git-clone-step/)|
||Step Library - Configure a Git Clone Step|[Git Clone step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/ci-git-clone-step/)|
||Build an Artifact and send to an Artifact Repo|[Build and push an artifact](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact/)|
||Build a Container Image and send it to a Container Registry (such as DockerHub)|[Build and push an artifact](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact/)|
||Perform Integration test from Host versus from a Container - You can use the background step to start and expose your app|[Port Bindings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/background-step-settings/#port-bindings)|
||Describe Chained Pipelines|[Pipeline chaining in Harness](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/)|
||Configure Chained Pipelines|[Pipeline chaining in Harness](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/)|
||Describe GitHub Actions support|[Run GitHub Actions in CI pipelines](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie/)|
||Configure a GitHub Actions Step|[Run GitHub Actions in CI pipelines](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie/)|
|**3. Harness User Interface Features for CI**|||
||Describe the Overview Tab|[Harness UI Overview](https://developer.harness.io/docs/getting-started/harness-ui-overview/)|
||Describe the Build and Pipelines Tabs|[Harness UI Overview](https://developer.harness.io/docs/getting-started/harness-ui-overview/)|
||Describe and Configure Tags (use it to filter entities in the UI and API)|[Tags Reference](https://developer.harness.io/docs/platform/references/tags-reference/)|
||Pipeline Studio - Describe the Execution History Tab|[View and Compare Pipeline Executions](https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/)|
||Step - Describe Details, Inputs, Outputs|[Runtime Inputs](https://developer.harness.io/docs/platform/references/runtime-inputs/)|
|**4. RBAC, best practices, and small configuration tasks**|||
||Elaborate on Anonymous Docker Image pulls and its risks.|[Use a Docker Connector](https://developer.harness.io/docs/platform/connectors/connect-to-harness-container-image-registry-using-docker-connector/#step-2-enter-credentials)|
||Work with images with not all shells available|TBD|
||Debug a Pipeline step by running the step locally (troubleshooting)|[Troubleshoot Continuous Integration](https://developer.harness.io/docs/continuous-integration/troubleshoot/troubleshooting-ci/)|
||Describe Harness Cloud characteristics and its advantages|[Hosted Builds on VM Quickstart](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart)|
||Configure Git Experience for CI (pipeline)|[Harness Git Experience Quickstart](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities/)|
||Credentials and Permissions - Configure or Elaborate on User and Groups for Acc, Org, Project levels|[Role-based Access Control](https://developer.harness.io/docs/category/role-based-access-control)|
||Do a basic Delegate installation|[Install Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/)|
||Set Container Resources​ - Limit Memory and Limit CPU|[Run Step Settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/run-step-settings/#set-container-resources)|

















