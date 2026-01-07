---
title: Multi-Service Release Example
slug: /release-orchestration/examples-and-walkthroughs/multi-service-release-example
description: Walkthrough of a multi-service release scenario
sidebar_position: 1
---

This example demonstrates how to orchestrate a release involving multiple services with dependencies.

## Scenario

Release three services:
- **Service A**: Core service
- **Service B**: Depends on Service A
- **Service C**: Depends on Service A and B

## Process Design

### Phase 1: Preparation
- Code freeze
- Branch creation
- Dependency validation

### Phase 2: Build
Build all services in parallel:
- Build Service A
- Build Service B
- Build Service C

### Phase 3: Integration Testing
- Deploy to integration environment
- Run integration tests
- Validate dependencies

### Phase 4: Staging
- Deploy to staging
- User acceptance testing
- Approval required

### Phase 5: Production
- Production approval
- Deploy Service A
- Deploy Service B (after A)
- Deploy Service C (after A and B)
- Post-deployment validation

## Key Features

### Dependency Management
- Service B depends on Service A
- Service C depends on Service A and B
- Sequential deployment in production

### Parallel Execution
- Build phase: Parallel builds
- Testing: Parallel where possible
- Production: Sequential deployment

## Related Topics

- [End-to-End Release Walkthrough](./end-to-end-release-walkthrough.md)

