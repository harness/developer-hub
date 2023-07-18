

| Topic | Material |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|** 1. Harness Basics, Platform Entities, and Key Concepts **                                                                  ||
| Describe continuous integration fundamentals (important stages or steps) | [Harness CI](https://developer.harness.io/tutorials/ci-pipelines/fastest-ci/#harness-ci) |
| Describe Artifacts and Packages (from jar to container image, helm, etc) | [CI concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts/) |
| Describe and explain the "Pipeline, Stages, Step Groups, Steps" schema | [Key concepts](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts/) |
| Describe Harness hierarchy "Account, Organizations, Projects" | [Key concepts](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts/) |
| Trigger the build pipeline via API - With or without inputset | [Harness API quickstart](https://developer.harness.io/docs/platform/resource-development/apis/api-quickstart/) |
| Configure Artifact Repos - can be cont registry, object store, jfrog, nexus, etc. | [Connect to an Artifact Repo](https://developer.harness.io/docs/platform/connectors/connect-to-an-artifact-repo/) |
| Describe Build Infrastructures and Platforms | [Which build infrastructure is right for me?](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/) |
| Configure Build Infrastructures and Platforms | [Which build infrastructure is right for me?](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/) |
| CI Build Infrastructures & Different Options Available | [Which build infrastructure is right for me?](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/) |
| Harness Cloud - Describe Supported platform and OS (Linux, Mac, Windows) | [Which build infrastructure is right for me?](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/) |
| Describe Ephemeral Environments | [Get started with Harness Cloud](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart) |
| Describe Harness Cloud Build Infrastructure | [Get started with Harness Cloud](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart) |
| Describe Connectors (you can use Source Providers, Artifact Repos, Cloud Providers, etc) | [Connectors](https://developer.harness.io/docs/category/connectors) |
| Configure a Git Connector | [GitHub connector settings reference](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference) |
| Configure a DockerHub Connector | [Connect to Harness container image registry Using Docker connector](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/) |
| Describe Harness Delegate role for the CI capability | [CI Pipeline Basics](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-pipeline-basics) |
| Secrets Management - How to retrieve and render secrets using Harness Expressions | [Add/Use Text Secrets](https://developer.harness.io/docs/platform/security/add-use-text-secrets/) |
| Configure and use Variables and Expressions - JEXL String methods | [Built-in CI codebase variables reference](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/built-in-cie-codebase-variables-reference/) |
| Describe built-in variables | [Harness Variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/) |
| Describe built-in CI codebase variables. | [Built-in CI codebase variables reference](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/built-in-cie-codebase-variables-reference/) |
| Describe the Harness Manager | [Platform Architecture](https://developer.harness.io/docs/getting-started/harness-platform-architecture/) |
| Install a Harness Delegate | [Platform Architecture](https://developer.harness.io/docs/getting-started/harness-platform-architecture/) |
| Describe Delegate Task Selection | [Delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/) |
| Describe what's required for a K8s Build environment | [Kubernetes deployments basics](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview) |
| Describe what Stage and Step represents in a K8s build env | [Stage and step conditional execution settings](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/) |
| Describe how Stage steps share network context and workdir (via volumes and shared paths) | [Stage and step conditional execution settings](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/) |
| Project Variables | [Add a Variable](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable/) |
| Install software on the delegate with initialization scripts (INIT_SCRIPT) or build your own Delegate | [Docker delegate environment variables](https://developer.harness.io/docs/platform/delegates/delegate-reference/docker-delegate-environment-variables/) |
|** 2. Harness CI Pipelines and its Features **                                                                  ||
| Perform Codebase configuration | [Create and configure a codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) |
| Describe Shared Paths in depth (what is, how Harness does via volumes) | [Share CI data across steps and stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/) |
| Configure Shared Paths | [Share CI data across steps and stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/) |
| Step Library - Configure a Plugin Step | [Plugin step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/plugin-step-settings-reference/) |
| Describe Caching and Caching Intelligence | [Cache Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) |
| Configure Caching and Caching Intelligence (Save and Restore in a Stage, probably) | [Cache Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) |
| Describe Harness Test Intelligence | [Get started with Test Intelligence](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts) |
| Configure Harness Test Intelligence | [Enable Test Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-test-intelligence/) |
| Configure Triggers for CI (git-based, etc) including elaborating on Trigger Conditions | [Trigger pipelines using Git events](https://developer.harness.io/docs/platform/triggers/trigger-pipelines-using-custom-payload-conditions/) |
| Configure custom webhook triggers | [Trigger deployments using custom triggers](https://developer.harness.io/docs/platform/Triggers/trigger-deployments-using-custom-triggers) |
| Configure Input Sets and Overlays | [Input Sets](https://developer.harness.io/docs/platform/Pipelines/input-sets) |
| Configure Failure Strategies | [Define a failure strategy on stages and steps](https://developer.harness.io/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) |
| Perform a Conditonal Execution | [Stage and step conditional execution settings](https://developer.harness.io/docs/platform/Pipelines/w_pipeline-steps-reference/step-skip-condition-settings) |
| Describe Looping Strategies (Matrix, Repeat, Parallelism) | [Looping strategies overview -- matrix, repeat, and parallelism](https://developer.harness.io/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) |
| Configure Looping Strategies (Matrix, Repeat, Parallelism) | [Best Practices for Looping Strategies](https://developer.harness.io/docs/platform/Pipelines/best-practices-for-looping-strategies) |
| Describe Flow Control and Barriers | [Controlling resource usage with Barriers, Resource Constraints, and Queue steps](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/controlling-deployments-with-barriers-resource-constraints-and-queue-steps/) |
| Configure Flow Control and Barriers | [Controlling resource usage with Barriers, Resource Constraints, and Queue steps](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/controlling-deployments-with-barriers-resource-constraints-and-queue-steps/) |
| Advanced Options - Describe Timeout Settings | [Define a failure strategy on stages and steps](https://developer.harness.io/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) |
| Advanced Options - Describe selective stage(s) executions | [Run specific stages in pipeline](https://developer.harness.io/docs/platform/Pipelines/run-specific-stage-in-pipeline) |
| Configure Notifications - Based on Pipeline Events | [Add a pipeline notification strategy](https://developer.harness.io/docs/continuous-delivery/cd-advanced/cd-notifications/notify-users-of-pipeline-events/) |
| Describe how to run Steps on Host vs Containers (can use Harness Cloud to make it simpler) | [CI Concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts) |
| Configure to send PR Status updates | [Harness GitOps ApplicationSet and PR pipeline tutorial](https://developer.harness.io/docs/continuous-delivery/gitops/harness-git-ops-application-set-tutorial/) |
| Configure outputs from one step to another | [Run Tests step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/configure-run-tests-step-settings/) |
| Step Library - Describe Save and Restore Cache in the Pipeline | [Share and cache CI data](https://developer.harness.io/docs/category/share-and-cache-ci-data) |
| Step Library - Configure Save and Restore Cache in the Pipeline | [Share and cache CI data](https://developer.harness.io/docs/category/share-and-cache-ci-data) |
| Step Library - Describe Background Steps | [Background step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/background-step-settings) |
| Step Library - Configure a Background Step) - adding steps to a stage | [Background step settings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/background-step-settings) |
| Step Library - Describe Git Clone Step (versus the Codebase one) | [CI Git Clone Step](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/ci-git-clone-step/) |
| Step Library - Configure a Git Clone Step | [CI Git Clone Step](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/ci-git-clone-step/) |
| Perform Integration test from Host versus from a Container | [Port Bindings](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/background-step-settings/#port-bindings) |
| Describe Chained Pipelines | [Pipeline Chaining](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/) |
| Configure Chained Pipelines | [Pipeline Chaining](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/) |
| Describe GitHub Actions support | [Use the GitHub Actions Drone plugin](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie/) |
| Configure a GitHub Actions Step | [Use the GitHub Actions Drone plugin](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie/) |
| Understand How to Parallel Steps in a Stage - K8s infra - Describe Limit vs Requests | [Speed up CI test pipelines using parallelism](https://developer.harness.io/docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism/) |
|** 3. RBAC, Best Practices, and Small Configuration Tasks **                                                                  ||
| Elaborate on Anonymous Docker Image pulls and its risks. | [Connect to Harness container image registry Using Docker connector](https://developer.harness.io/docs/platform/connectors/connect-to-harness-container-image-registry-using-docker-connector/#step-2-enter-credentials) |
| Debug a Pipeline step by running the step locally (troubleshooting) | [Troubleshooting CI](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci) |
| Configure Git Experience for CI (pipeline) | [Harness Git Experience quickstart](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities/) |
| Credentials and Permissions - Configure or Elaborate on User and Groups for Acc, Org, Project levels | [Role Based Access Control](https://developer.harness.io/docs/category/role-based-access-control) |
| Describe Set Container Resources​ - Limit Memory and Limit CPU | [Set Container Resources](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/run-step-settings/#set-container-resources) |
| Descibe What Security Actions Are Available | [Authentication overview](https://developer.harness.io/docs/platform/authentication/authentication-overview/) |
| Describe OAuth and SAML Integrations | [Single Sign-On (SSO) with SAML](https://developer.harness.io/docs/platform/Authentication/single-sign-on-saml) |
| Describe SAML + SCIM (automatic provisioning) | [Provision users and groups using Azure AD (SCIM)](https://developer.harness.io/docs/platform/Authentication/provision-users-and-groups-using-azure-ad-scim) |
| Describe RBAC in User Groups X Roles (Role Bindings) | [Role-based access control overview](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) |
| Describe RBAC and Role Bindings for Service Account | [Harness RBAC components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#harness-rbac-components) |
| Describe Resource Groups | [Harness RBAC components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#harness-rbac-components) |
| Configure Resource Groups | [Harness RBAC components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#harness-rbac-components) |
| RBAC - Describe Roles | [Harness RBAC components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#harness-rbac-components) |
| RBAC - Configure Roles | [Harness RBAC components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#harness-rbac-components) |
| Describe and Configure Tags (use it to filter entities in the UI and API) | [Tags reference](https://developer.harness.io/docs/platform/references/tags-reference/) |
| Pipeline Studio - Describe the Execution History Tab | [View and compare pipeline executions](https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/) |
|** 4. Enterprise - Policy-based Governance (OPA), Dashboards, and Pipeline Templatization **                                                                  ||
| Describe Templates for Harness CI | [Templates](https://developer.harness.io/docs/platform/templates/template/) |
| Configure Templates for Harness CI | [Templates](https://developer.harness.io/docs/platform/templates/template/) |
| Describe Policy as Code (OPA, Rego) | [Harness Policy As Code overview](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/) |
| Configure Policy as Code - Apply in any common use case (OPA, Rego) | [Harness Policy As Code overview](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/) |
| Enforce Gov in a Pipeline with a Step (OPA) | [Harness Policy As Code overview](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/) |
| Account Audit Trail - Describe Use Cases | [Audit Trail](https://developer.harness.io/docs/platform/governance/audit-trail/audit-trail/) |
| Describe Custom Dashboards (Looker, Enterprise) | [Dashboards Overview](https://developer.harness.io/docs/platform/dashboards/dashboards-overview/) |
