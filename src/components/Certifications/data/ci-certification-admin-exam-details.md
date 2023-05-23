** (BETA Coming Soon) ** The Continuous Integration Administrator exam tests your knowledge and skills of the Harness Continuous Integration module.  

## Prerequisites

- Intermediate terminal skills
- Basic understanding of on-premise or cloud architecture
- This exam builds upon the [CI Developer Exam](/certifications/continuous-integration?lvl=developer)

## Exam Details
| Exam Type                               | Duration         |
| ----------------------------------- | --------------- |
| **Knowledge Exam** | 90 minutes |
| **Hands On Exam** | 90 minutes |

| Covered Domain                                | Coverage         |
| ----------------------------------- | --------------- |
| **Harness Basics, Platform Entities, and Key Concepts** | 60% |
| **Harness CI Pipelines and its Features** | 20% |
| **RBAC, Best Practices, and Small Config Tasks** | 10% |
| **Enterprise - Policy-based Governance (OPA), Dashboards, and Pipeline Templatization** | 10% |


<br />

## Exam Objectives 

<details>
<summary>List of Objectives</summary>

The following is a detailed list of exam objectives:

|#   |Objectives                                                                                           |
|----|-----------------------------------------------------------------------------------------------------|
| **1** | **Harness Basics, Platform Entities, and Key Concepts** |
|1.1 |Describe continuous integration fundamentals (important stages or steps)                             |
|1.2 |Describe Artifacts and Packages (from jar to container image, helm, etc)                             |
|1.3 |Describe and explain the "Pipeline, Stages, Step Groups, Steps" schema                               |
|1.4 |Describe Harness hierarchy "Account, Organizations, Projects"                                        |
|1.5 |Trigger the build pipeline via API - With or without inputset                                        |
|1.6 |Configure Artifact Repos                   |
|1.7 |Describe Build Infrastructures and Platforms                                                         |
|1.8 |Configure Build Infrastructures and Platforms                                                        |
|1.9 |CI Build Infrastructures & Different Options Available                                               |
|1.10|Harness Cloud - Describe Supported platform and OS (Linux, Mac, Windows)                             |
|1.11|Describe Ephemeral Environments                                                                      |
|1.12|Describe Harness Cloud Build Infrastructure                                                          |
|1.13|Describe Connectors (you can use Source Providers, Artifact Repos, Cloud Providers, etc)             |
|1.14|Configure a Git Connector                                                                            |
|1.15|Configure a DockerHub Connector                                                                      |
|1.16|Describe Harness Delegate role for the CI capability                                                 |
|1.17|Secrets Management - How to retrieve and render secrets using Harness Expressions                    |
|1.18|Configure and use Variables and Expressions - JEXL String methods                                    |
|1.19|Describe built-in variables                                                                          |
|1.20|Describe built-in CI codebase variables.                                                             |
|1.21|Describe the Harness Manager                                                                         |
|1.22|Install a Harness Delegate                                                                           |
|1.23|Describe Delegate Task Selection                                                                     |
|1.24|Describe what's required for a K8s Build environment                                                 |
|1.25|Describe what Stage and Step represents in a K8s build env                                           |
|1.26|Describe how Stage steps share network context and workdir (via volumes and shared paths)            |
|1.27|Project Variables                                                                                    |
|1.28|Install software on the delegate with initialization scripts (INIT_SCRIPT) or build your own Delegate|
| **2** | **Harness CI Pipelines and its Features** |
|2.1 |Perform Codebase configuration                                                                       |
|2.2 |Describe Shared Paths in depth (what is, how Harness does via volumes)                               |
|2.3 |Configure Shared Paths                                                                               |
|2.4 |Step Library - Configure a Plugin Step                                                               |
|2.5 |Describe Caching and Caching Intelligence                                                            |
|2.6 |Configure Caching and Caching Intelligence (Save and Restore in a Stage, probably)                   |
|2.7 |Describe Harness Test Intelligence                                                                   |
|2.8 |Configure Harness Test Intelligence                                                                  |
|2.9 |Configure Triggers for CI (git-based, etc) including elaborating on Trigger Conditions               |
|2.10|Configure custom webhook triggers                                                                    |
|2.11|Configure Input Sets and Overlays                                                                    |
|2.12|Configure Failure Strategies                                                                         |
|2.13|Perform a Conditional Execution                                                                       |
|2.14|Describe Looping Strategies (Matrix, Repeat, Parallelism)                                            |
|2.15|Configure Looping Strategies (Matrix, Repeat, Parallelism)                                           |
|2.16|Describe Flow Control and Barriers                                                                   |
|2.17|Configure Flow Control and Barriers                                                                  |
|2.18|Advanced Options - Describe Timeout Settings                                                         |
|2.19|Advanced Options - Describe selective stage(s) executions                                            |
|2.20|Configure Notifications - Based on Pipeline Events                                                   |
|2.21|Describe how to run Steps on Host vs Containers (can use Harness Cloud to make it simpler)           |
|2.22|Configure to send PR Status updates                                                                  |
|2.23|Configure outputs from one step to another                                                           |
|2.24|Step Library - Describe Save and Restore Cache in the Pipeline                                       |
|2.25|Step Library - Configure Save and Restore Cache in the Pipeline                                      |
|2.26|Step Library - Describe Background Steps                                                             |
|2.27|Step Library - Configure a Background Step) - adding steps to a stage                                |
|2.28|Step Library - Describe Git Clone Step (versus the Codebase one)                                     |
|2.29|Step Library - Configure a Git Clone Step                                                            |
|2.30|Perform Integration test from Host versus from a Container                                           |
|2.31|Describe Chained Pipelines                                                                           |
|2.32|Configure Chained Pipelines                                                                          |
|2.33|Describe GitHub Actions support                                                                      |
|2.34|Configure a GitHub Actions Step                                                                      |
|2.35|Understand How to Parallel Steps in a Stage - K8s infra - Describe Limit vs Requests                 |
| **3** | **RBAC, Best Practices, and Small Configuration Tasks** |
|3.1 |Elaborate on Anonymous Docker Image pulls and its risks.                                             |
|3.2 |Debug a Pipeline step by running the step locally (troubleshooting)                                  |
|3.3 |Configure Git Experience for CI (pipeline)                                                           |
|3.4 |Credentials and Permissions - Configure or Elaborate on User and Groups for Acc, Org, Project levels |
|3.5 |Describe Set Container Resources​ - Limit Memory and Limit CPU                                       |
|3.6 |Descibe What Security Actions Are Available                                                          |
|3.7 |Describe OAuth and SAML Integrations                                                                 |
|3.8 |Describe SAML + SCIM (automatic provisioning)                                                        |
|3.9 |Describe RBAC in User Groups X Roles (Role Bindings)                                                 |
|3.10|Describe RBAC and Role Bindings for Service Account                                                  |
|3.11|Describe Resource Groups                                                                             |
|3.12|Configure Resource Groups                                                                            |
|3.13|RBAC - Describe Roles                                                                                |
|3.14|RBAC - Configure Roles                                                                               |
|3.15|Describe and Configure Tags (use it to filter entities in the UI and API)                            |
|3.16|Pipeline Studio - Describe the Execution History Tab                                                 |
| **4** | **Policy-based Governance (OPA), Dashboards, and Pipeline Templatization** |
|4.1 |Describe Templates for Harness CI                                                                    |
|4.2 |Configure Templates for Harness CI                                                                   |
|4.3 |Describe Policy as Code (OPA, Rego)                                                                  |
|4.4 |Configure Policy as Code - Apply in any common use case (OPA, Rego)                                  |
|4.5 |Enforce Gov in a Pipeline with a Step (OPA)                                                          |
|4.6 |Account Audit Trail - Describe Use Cases                                                             |
|4.7 |Describe Custom Dashboards (Looker, Enterprise)                                                      |

</details>

<br />

## Next Steps

The Continuous Integration Administrator exam can start immediately after registering. Please allow 90 mins for the knowledge exam and approximately 90 minutes for the hands on exam.

1. Create an account in Harness University
2. Register for an exams 
3. Review the [instructions for the Hands On Exam](/certifications/instructions)
4. Take the exams
    1. There will be a knowledge and hands on portion.	

