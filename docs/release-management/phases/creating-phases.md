---
title: Creating Phases
slug: /release-orchestration/phases/creating-phases
description: Learn how to create and configure phases in release processes
sidebar_position: 2
---

This guide covers how to create and configure phases in your release processes.

## Creating a Phase

### Step 1: Define Phase Purpose
Before creating a phase, determine:
- What milestone does it represent?
- What activities belong in it?
- What must complete before it starts?
- What happens after it completes?

### Step 2: Add Phase to Process
Add the phase to your process:

**Example (YAML):**
```yaml
process:
  phases:
    - phase:
        id: build_phase
        name: Build Phase
        description: Responsible for source code compilation and validation, artifact generation and packaging, and security scanning and compliance checks.
        owners:
          - Development Team
        depends-on: []
        activities: []
```

### Step 3: Configure Dependencies

Phase dependencies control the execution order of phases in your release process. They define which phases must complete before another phase can start, ensuring correct execution order and that prerequisites are met.

#### Dependency Types

**Sequential Dependencies**

One phase must complete before another starts:

```yaml
process:
  phases:
    - phase:
        id: build_phase
        name: Build Phase
        depends-on: []
    - phase:
        id: test_phase
        name: Test Phase
        depends-on:
          - build_phase
    - phase:
        id: deploy_phase
        name: Deploy Phase
        depends-on:
          - test_phase
```

**Execution Flow:**
```
Build → Test → Deploy
```

**Multiple Dependencies**

One phase can depend on multiple phases:

```yaml
phase:
  id: final_phase
  name: Final Phase
  depends-on:
    - deploy_phase
    - validation_phase
    - test_phase
    - build_phase
```

The phase will start only when all dependencies are satisfied.

#### Common Dependency Patterns

**Linear Chain**: Sequential phases in a chain
```
Phase 1 → Phase 2 → Phase 3 → Phase 4
```

**Parallel Execution**: Phases with no dependencies execute concurrently
```
Phase A ─┐
         ├→ Integration Phase
Phase B ─┘
```

**Multiple Prerequisites**: One phase waiting for several completed phases
```
Phase A ─┐
Phase B ─┼→ Final Phase
Phase C ─┘
```

### Step 4: Add Activities
Add activities to the phase:
- Select activities (for example, from the Activity Store)
- Configure activity settings
- Set up activity dependencies

## Phase Configuration Options

### Custom phases
Create phases specific to your needs:
- Organization-specific milestones
- Compliance checkpoints
- Team-specific stages
- Tool-specific phases

## Validation

Before saving, validate:
- Phase name is unique within process
- Dependencies are valid
- Variables are properly scoped
- Activities are properly configured

## Best Practices

### Naming Conventions
- Use descriptive names
- Follow consistent patterns
- Include purpose in name
- Avoid generic names

### Phase Organization
- Group related activities
- Maintain logical flow
- Keep phases focused
- Avoid phase bloat

### Documentation
- Document phase purpose
- Explain dependencies
- Note special requirements
- Include examples

## Related Topics

- [Phases Overview](./phases-overview.md)
- [Activities Overview](../activities/activities-overview.md)

