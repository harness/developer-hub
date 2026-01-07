---
title: Process Modeling
slug: /release-orchestration/processes/process-modeling
description: Learn how to model release processes using phases, activities, and dependencies
sidebar_position: 2
---

import DocImage from '@site/src/components/DocImage';

Process modeling in Release Orchestration allows you to define your release workflows using phases, activities, dependencies, and variables. You can create processes using AI-based generation or manual configuration to match your team's specific requirements.


## AI-based process creation 

Harness supports creation of processes using Harness AI. Most of the time, release processes are available in a textual fashion, documented in different sources. Release Orchestration enables users to provide that process documentation and create the process as an entity in Harness Release Orchestration.

To create a process using Harness AI , navigate to processes --> Click on Create Process ( as shown below )

<DocImage path={require('../static/create-process-ai.png')} title="Click to view full size image" />

Provide the instructions to define your release process through the prompt. An example of the same has been provided below: 

**Example prompt:**
```
Create a multi-service release process starting from release planning and coordination up until monitoring in production. The process includes the following phases:
- Release planning and coordination (Owner: Release Manager)
- Build and artifact creation
- Testing and validation
- Feature flag enablement
- Production deployment
- Monitoring and rollback
```
Once you provide the above prompt and ask Harness AI to create the process, it automatically:

- **Creates phases**: Identifies logical groups of activities as phases (e.g., Release Planning and Coordination, Testing Validation, Feature Flag Enablement, Deployment, Monitoring, Rollback and Documentation).
- **Assigns owners**: Automatically assigns owners for individual phases based on the documentation provided in the prompt or ask you to provide the relevant owners.
- **Creates activities**: Generates activities within each phase.
- **Infers dependencies**: Determines execution order and dependencies.


<DocImage path={require('../static/harness-ai-process-creation.png')} title="Click to view full size image" />


As soon as you shared the above prompt with Harness AI for process creation, It asks us to provide the relevant owners for each phase. Once we chose the owners , Harness AI starts creating the YAML for the release process. The same YAML can be visualised as a step by step release process as shown below: 

<DocImage path={require('../static/harness-ai-process-created.png')} title="Click to view full size image" />




You can also manually define phases, activities, and dependencies to match your team's software release process. Even though Manual Modelling allows you to create all the essential components for your release process manually , we still recommend to leverage Harness AI for your release orchestration process creation. 

## Process Structure

### Basic Structure

A process consists of:
1. **Metadata**: Name and description
2. **Inputs**: Required parameters (captured using an Input Store when executing)
3. **Variables**: Process-wide variables
4. **Phases**: Major stages
5. **Activities**: Tasks within phases
6. **Dependencies**: Execution order rules

### Example (YAML)
The following example uses the same YAML shape as a real process created in Release Orchestration (nested `phase` and `activity` blocks, `depends-on`, `owners`, and optional `if` and `data` fields).

```yaml
process:
  name: Comprehensive Release Process
  description: A structured release process covering build, test, and deployment phases
  id: comprehensive_release_process
  phases:
    - phase:
        id: build_phase
        name: Build Phase
        description: Build and validate artifacts before testing.
        owners:
          - Development Team
        depends-on: []
        activities:
          - activity: AutoPipe
            id: AutoPipe
            name: AutoPipe90
            description: ""
            depends-on: []
          - activity: AutoPipe
            id: AutoPipe12
            name: AutoPipe12
            description: ""
            depends-on:
              - AutoPipe
          - activity: AutoPipe
            id: TestActivity00
            name: TestActivity00
            description: ""
            depends-on:
              - AutoPipe12
            if: <+90>
          - activity: ManualTest
            id: AutoIioo
            name: Auto_deploy
            description: doc
            depends-on:
              - AutoPipe12
    - phase:
        id: test_phase
        name: Test Phase
        description: Execute tests and quality gates before deployment.
        owners:
          - QA Team
        depends-on:
          - build_phase
        activities:
          - activity: TestActivity
            id: TestActivity
            name: TestActivity
            depends-on: []
    - phase:
        id: deploy_phase
        name: Deploy to Staging1 Phase
        owners:
          - DevOps Team
        depends-on:
          - test_phase
        activities:
          - activity: WaitingActivity
            id: WaitingActivity
            name: WaitingActivity
            depends-on: []
            data:
              pipeline:
                pipeline: default/MyProject/MyPipeline
                inputSet: {}
```

## Modeling Complex Release Processes

You can model complex release processes with different sequences of execution in terms of parallel and sequential execution.

### Common Execution Patterns

#### Sequential Execution
Activities execute one after another:
```
Activity A → Activity B → Activity C
```

#### Parallel Execution
Activities execute simultaneously:
```
Activity A ─┐
            ├→ Activity D
Activity B ─┤
            └→ Activity E
Activity C ─┘
```

#### Conditional Execution
Activities execute based on conditions:
```
Activity A → [Condition] → Activity B (if true)
                      └→ Activity C (if false)
```

### Phase Dependencies

Phases can have dependencies preconfigured. For example:
- The **test phase** has dependencies on the **build phase**
- The **validation phase** has dependencies on the **build phase**
- Phases execute in the order defined by their dependencies

### Activity Dependencies

Activities within each phase can also have dependencies. For example:
- **Activity 3** (a manual pipeline or automated activity) and **Activity 3.1** (a manual activity) are dependent on **Activity 2** (an automated pipeline activity)
- Activities execute in the order defined by their dependencies
- Dependencies can be configured to support both parallel and sequential execution

### Example: Complex Process Structure

A pre-built, preconfigured process might have:
- **Build Phase**: Contains build activities
- **Test Phase**: Depends on Build Phase, contains test activities
- **Validation Phase**: Depends on Build Phase, contains validation activities
- **Activities with dependencies**: Activities within phases that depend on other activities

With this structure, it is possible to model complex release processes and execute them using a release.

## Process blueprints

Start with blueprints for common scenarios:
- Standard production release
- Hotfix release
- Multi-service release
- Scheduled release

Customize a blueprint to fit your needs.

## Related Topics

- [Phases](../phases/phases-overview.md)
- [Activities](../activities/activities-overview.md)
- [Activity Dependencies](../activities/activity-dependencies.md)
- [Modeling complex processes](./process-modeling.md#modeling-complex-release-processes)

