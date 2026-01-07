---
title: AI-Based Process Creation
slug: /release-orchestration/processes/ai-based-process-creation
description: Use AI to automatically generate release processes from natural language descriptions
sidebar_position: 3
unlisted: true
---

AI-based process creation allows you to generate release processes by describing them in natural language. The AI analyzes your description and creates a structured process with phases, activities, and dependencies.

## How It Works

Harness supports creation of processes using Harness AI, which is an AI-based approach. Most of the time, release processes are available in a textual fashion documented in different sources. Release Orchestration enables users to provide that process documentation and create the process as an entity in Harness Release Orchestration.

### 1. Provide Process Documentation
Provide a natural language description or documentation of your release process. This can be:
- Textual documentation from existing sources
- Process descriptions from organizational documentation
- Multi-service release processes with planning, building, validation, deployment, and monitoring phases

**Example:**
```
"Multi-service release process starting from planning of the release up until building 
and doing other functions, different heterogeneous functions under one umbrella, using 
a process up until releasing and monitoring in production. The process includes:
- Release planning and coordination (Owner: Release Manager)
- Build and artifact creation
- Testing and validation
- Feature flag enablement
- Production deployment
- Monitoring and rollback"
```

### 2. AI Analysis and Generation
Once you provide the prompt and ask the AI agent to create the process, it automatically:


### 3. Process Visualization
The process is visualized in a graphical view, showing:
- All phases that have been created (from release planning and coordination up until rollback and documentation)
- Activities within each phase
- Dependencies between phases and activities
- Owner assignments

### 4. Review and Save
After AI generation, you can:
- Review the generated phases and activities
- Verify owner assignments
- See a summary of what the process is enabling (modeling the entire process as an entity and enabling orchestration using activities)
- Save the process

## Best Practices for AI Process Creation

### Be Specific
Provide detailed descriptions:
- **Recommended:** "Deploy to staging, run smoke tests, wait for QA approval"
- **Avoid:** "Deploy and test"

### Include Dependencies
Mention what must happen before other steps:
- **Recommended:** "After deployment completes, run integration tests"
- **Avoid:** "Deploy and test"

### Specify Activity Types
Indicate what should be automated vs manual:
- **Recommended:** "Automatically run unit tests, manually review security scan results"
- **Avoid:** "Run tests and review"

### Include Approval Points
Mention where approvals are needed:
- **Recommended:** "Require production deployment approval from release manager"
- **Avoid:** "Deploy to production"

## Refining AI-Generated Processes

After the AI generates a process:

1. **Review the structure**: Ensure phases and activities make sense
2. **Check dependencies**: Verify execution order is correct
3. **Validate activities**: Confirm activity types and configurations
4. **Add details**: Enhance with specific configurations
5. **Save**: Save the process and start adding reusable activities

## Example Workflow

### Input Description
```
"Multi-service release process:
1. Code freeze and branch creation
2. Build all services in parallel
3. Deploy to integration environment
4. Run integration tests
5. Deploy to staging
6. User acceptance testing with sign-off
7. Production deployment with approval
8. Post-deployment validation"
```

### AI-Generated Process
The AI creates:
- **Phase 1: Preparation**
  - Code freeze activity
  - Branch creation activity
- **Phase 2: Build**
  - Build Service A (automated)
  - Build Service B (automated)
  - Build Service C (automated)
- **Phase 3: Integration Testing**
  - Deploy to integration (automated)
  - Run integration tests (automated)
- **Phase 4: Staging**
  - Deploy to staging (automated)
  - UAT (manual)
  - UAT sign-off (approval)
- **Phase 5: Production**
  - Production approval (approval)
  - Deploy to production (automated)
  - Post-deployment validation (automated)

## Limitations

AI-generated processes are a starting point:
- May require refinement for complex scenarios
- May not capture all organizational nuances
- Should be reviewed by subject matter experts
- May need customization for specific tools and integrations

## Related Topics

- [Process Modeling](./process-modeling.md)
- [Modeling complex processes](./process-modeling.md#modeling-complex-release-processes)

