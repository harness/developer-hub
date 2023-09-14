

| Topic | Material |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------|
| **1. Introduction to Harness and Key Concepts** ||
| Understand continuous integration fundamentals, including critical stages or steps | [Harness CI](/tutorials/ci-pipelines/fastest-ci/#harness-ci) |
|Grasp the core concepts: "Pipeline, Stages, Step Groups, Steps" and Harness hierarchy "Account, Organizations, Projects" | [Key Concepts](/docs/get-started/key-concepts/) |
| Familiarize with Harness Manager and the role of Harness Delegate for CI capability | [CI Pipeline Basics](/docs/continuous-integration/get-started/key-concepts) |
| **2. Harness Build Infrastructure and Configuration** ||
| Explore Harness Cloud supported platforms, OS, and build infrastructures | [Use Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/) |
| Dive into CI Build Infrastructures and their diverse options | [Harness CI](/tutorials/ci-pipelines/fastest-ci/#harness-ci) |
| Understand Ephemeral Environments and the specific requirements for a K8s Build environment | [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/) |
| **3. Artifact Management and Connectivity** ||
| Grasp Artifacts and Packages spanning from jar to container image, helm, and more | [Artifacts Tab](/tutorials/ci-pipelines/publish/artifacts-tab/) |
| Describe and configure Artifact Repositories like cont registry, object store, jfrog, nexus, etc | [Connect to an Artifact repository](/docs/platform/connectors/artifact-repositories/connect-to-an-artifact-repo/) |
| Delve into Harness Connectors: configuration of Git, DockerHub, and more | [Connectors](/docs/category/connectors) |
| **4. Harness CI Pipelines and Advanced Features** ||
| Master Codebase configuration, shared paths, and step library, including plugin configurations | [Create and configure a codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) |
| Understand and set up advanced features like caching intelligence, test intelligence, and flow control | [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence/) |
| Configure pipeline features, including triggers, input sets, failure strategies, looping, and notifications | [Input sets and overlays](/docs/platform/pipelines/input-sets/) |
| **5. Pipeline Execution Strategies** ||
| Get to grips with execution environments: running steps on host vs. containers | [Stage and step conditional execution settings](/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-conditional-execution-settings/) |
| Manage outputs, PR status updates, and understand chained pipelines | [Output variables with chained pipeline](https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables/) |
| Delve into advanced options like timeouts, selective stage executions, and stage context sharing | [Continuous Integration (CI) FAQs](/docs/faqs/continuous-integration-ci-faqs/#what-is-the-timeout-limit-for-a-ci-pipeline) |
| **6. Security and Access Control** ||
| Understand RBAC with user groups, roles, role bindings, and service account considerations | [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) |
| Configure access and permissions, including tags and resource groups | [Permissions Reference](/docs/platform/role-based-access-control/permissions-reference) |
| Grasp the implications of anonymous Docker image pulls and other security considerations | [Docker Connector Settings Reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/) |
| **7. Authentication and User Management** ||
| Deep dive into OAuth, SAML, and SCIM integrations | [Authentication](/docs/category/authentication) |
| Set up and manage credentials, user and group permissions, and more | [Manage user groups](/docs/platform/role-based-access-control/add-user-groups) |
| Delve into debugging and troubleshooting techniques, including running pipeline steps locally | [Troubleshoot CI](/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci/) |
| **8. Policy-Based Governance and Compliance** ||
| Explore and configure policy as code with OPA and Rego | [Harness Policy As Code quickstart](/docs/platform/hovernance/Policy-as-code/harness-governance-quickstart) |
| Familiarize with account audit trails and their respective use cases | [View audit trail](/docs/platform/hovernance/audit-trail/audit-trail/) |
| **9. Enterprise Features and Dashboards** ||
| Delve into Enterprise dashboards, including custom options like Looker | [Best practices for building dashboards](/docs/platform/dashboards/dashboard-best-practices/) |
| Explore Pipeline Studio's execution history and other related features | [Run pipelines using input sets and overlays](/docs/platform/pipelines/run-pipelines-using-input-sets-and-overlays/) |
| Get a handle on pipeline templatization for scalable CI solutions | [Best practices and guidelines for templates](/docs/platform/templates/templates-best-practices/) |

