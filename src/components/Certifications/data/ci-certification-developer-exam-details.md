The Continuous Integration Developer exam tests your knowledge and skills of the Harness Integration Delivery module.  

## Prerequisites

- Basic terminal skills
- Basic understanding of on premise or cloud architecture

## Exam Details - Coming Soon

Exam Duration: 90 minutes <br/>
Question Type: Multiple choice

| Covered Domain                                | Coverage         |
| ----------------------------------- | --------------- |
| **CI Domain** | 100% |

<br />

## Exam Objectives - Coming Soon

<details>
<summary>List of Objectives</summary>

The following is a detailed list of exam objectives:

| # | Objectives |
| --- | --- |
| **1** | **Harness Basics, Platform Entities, and Key Concepts** |
| 1.1 | Describe continuous integration fundamentals (important stages or steps) |
| 1.2 | Describe Artifacts and Packages (from jar to container image, helm, etc) |
| 1.3 | Describe and explain the "Pipeline, Stages, _Step Groups_, Steps" schema |
| 1.4 | Describe Harness hierarchy "Account, Organizations, Projects" |
| 1.5 | Describe Artifact Repos |
| 1.6 | Configure Artifact Repos |
| 1.7 | Describe Build Infrastructures and Platforms |
| 1.8 | Configure Build Infrastructures and Platforms |
| 1.9 | CI Build Infrastructures - Describe different options: Harness Cloud Hosted (VMs Hosted by Harness), Local Hosted (Customer's local machines - Docker or Host), Kubernetes Self-Hosted, VMs Self-Hosted (Cloud Providers) |
| 1.10 | Harness Cloud - Describe Supported platform and OS (Linux, Mac, Windows) |
| 1.11 | Harness Cloud - Test on Harness Cloud build infrastructure - Where an each Stage is an ephemeral VMDescribe ephemeral environments (Part of the CI process to spin up environments to run tests) |
| 1.12 | Describe Connectors (you can use Source Providers, Artifact Repos, Cloud Providers, etc) |
| 1.13 | Configure a Git Connector |
| 1.14 | Configure a DockerHub Connector |
| 1.15 | Describe Harness Delegate role for the CI capability |
| 1.16 | Pipeline Studio vs YAML Structure (TBD, but that's important) |
| 1.17 | Secrets Management - Describe possible usages for Harness CI |
| 1.18 | Secrets Management - How to retrieve and render secrets using Harness Expressions |
| 1.19 | Describe Harness Variables and Expressions |
| 1.20 | Configure and use Variables and Expressions |
| 1.21 | Describe built-in variables |
| 1.22 | Describe built-in CI codebase variables. |
| 1.23 | Describe Default Settings |
| 1.24 | Configure Default Settings |
| 1.25 | Identify types of artifacts (i.e., helm chart, library to Artifactory, npm library, docker image, and other use cases) |
| 1.26 | Identify Scanning options (not including STO) |
| 1.27 | Describe the Harness Manager |
| 1.28 | Describe the Harness Delegate |
| **2** | **Harness CI Pipelines and its Features** |
| 2.1 | Describe Harness Step Library for CI Stages |
| 2.2 | Describe Codebase configuration |
| 2.3 | Perform Codebase configuration |
| 2.4 | Describe Shared Paths |
| 2.5 | Configure Shared Paths |
| 2.6 | Describe Drone/CI Plugins |
| 2.7 | Identify common Drone/CI Plugins |
| 2.8 | Step Library - Configure a Plugin Step |
| 2.9 | Describe Caching and Caching Intelligence |
| 2.10 | Configure Caching and Caching Intelligence (Save and Restore in a Stage, probably) |
| 2.11 | Describe Remote Docker Layer Caching |
| 2.12 | Configure Remote Docker Layer Caching |
| 2.13 | Describe Harness Test Intelligence |
| 2.14 | Configure Harness Test Intelligence |
| 2.15 | Describe Triggers for CI (git-based, etc) |
| 2.16 | Configure Triggers for CI (git-based, etc) including elaborating on Trigger Conditions |
| 2.17 | Configure custom webhook triggers |
| 2.18 | Describe Input Sets and Overlays |
| 2.19 | Configure Input Sets and Overlays |
| 2.20 | Describe Failure Strategies |
| 2.21 | Configure Failure Strategies |
| 2.22 | Describe Conditional Execution |
| 2.23 | Perform a Conditional Execution |
| 2.24 | Describe Looping Strategies (Matrix, Repeat, Parallelism) |
| 2.25 | Configure Looping Strategies (Matrix, Repeat, Parallelism) |
| 2.26 | Advanced Options - Describe Timeout Settings |
| 2.27 | Advanced Options - Describe selective stage(s) executions |
| 2.28 | Describe Notifications - Based on Pipeline Events |
| 2.29 | Configure Notifications - Based on Pipeline Events |
| 2.30 | Describe how to run Steps on Host vs Containers (can use Harness Cloud to make it simpler) |
| 2.31 | Configure to send PR Status updates |
| 2.32 | Describe how to **test** for Swimlanes (probably Java) with Harness Run Test Step (just unit test) |
| 2.33 | Configure Run Tests Step - Java with Maven is suggested (test report, pre post commands) - just unit tests |
| 2.34 | Configure outputs from one step to another |
| 2.35 | Step Library - Describe Save and Restore Cache in the Pipeline |
| 2.36 | Step Library - Configure Save and Restore Cache in the Pipeline |
| 2.37 | Step Library - Describe Background Steps |
| 2.38 | Step Library - Configure a Background StepConfigure service dependencies (SQL instances, Elasticsearch, DIND, etc.) - adding steps to a stage |
| 2.39 | Step Library - Describe Git Clone Step (versus the Codebase one) |
| 2.40 | Step Library - Configure a Git Clone Step |
| 2.41 | Build an Artifact and send to an Artifact Repo |
| 2.42 | Build a Container Image and send it to a Container Registry (such as DockerHub) |
| 2.43 | Perform Integration test from Host versus from a Container - You can use the background step to start and expose your app |
| 2.44 | Describe Chained Pipelines |
| 2.45 | Configure Chained Pipelines |
| 2.46 | Describe GitHub Actions support |
| 2.47 | Configure a GitHub Actions Step |
| **3** | **Harness User Interface Features for CI** |
| 3.1 | Describe the Overview Tab |
| 3.2 | Describe the Build and Pipelines Tabs |
| 3.3 | Describe and Configure Tags (use it to filter entities in the UI and API) |
| 3.4 | Pipeline Studio - Describe the Execution History Tab |
| 3.5 | Step - Describe Details, Inputs, Outputs |
| **4** | **RBAC, best practices, and small configuration tasks** |
| 4.1 | Elaborate on Anonymous Docker Image pulls and its risks. |
| 4.2 | Work with images with not all shells available |
| 4.3 | Debug a Pipeline step by running the step locally (troubleshooting) |
| 4.4 | Describe Harness Cloud characteristics and its advantages |
| 4.5 | Configure Git Experience for CI (pipeline) |
| 4.6 | Credentials and Permissions - Configure or Elaborate on User and Groups for Acc, Org, Project levels |
| 4.7 | Do a basic Delegate installation |
| 4.8 | Set Container Resources​ - Limit Memory and Limit CPU |                                

</details>

<br />

## Next Steps

The Continuous Integration Developer exam can start immediatly after registering. Please allow 90 mins for the exam.

1. Create an account in Harness University
2. Register for an exam 
3. Take the exam
