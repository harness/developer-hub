---
title: Manage Experiments
description: Organize, edit, export, and maintain your chaos experiment library effectively
sidebar_position: 5
redirect_from:
  - /docs/chaos-engineering/use-harness-ce/experiments/edit-chaos-experiment
  - /docs/chaos-engineering/use-harness-ce/experiments/export-chaos-experiments
  - /docs/chaos-engineering/use-harness-ce/experiments/halt-delete-experiments
---

# Manage Experiments

Learn how to effectively organize, maintain, and scale your chaos experiment library. This guide covers experiment lifecycle management, organization strategies, and collaboration best practices.

## Experiment Lifecycle Management

### Experiment States

Understanding experiment states helps you manage your chaos engineering program effectively:

| State | Description | Available Actions |
|-------|-------------|-------------------|
| **Draft** | Experiment created but not yet executed | Edit, Delete, Run, Clone |
| **Active** | Regularly executed experiments | Edit, Run, Schedule, Archive |
| **Archived** | Experiments no longer in regular use | View, Restore, Delete |
| **Template** | Reusable experiment patterns | Clone, Edit, Share |
| **Deprecated** | Outdated experiments marked for removal | View, Delete |



### Lifecycle Transitions

#### Draft → Active
- Complete experiment configuration
- Validate with successful test run
- Add to regular execution schedule
- Document purpose and expected outcomes

#### Active → Archived
- Experiment no longer relevant
- System architecture changed
- Replaced by improved version
- Compliance or policy changes

#### Active → Template
- Proven experiment pattern
- Reusable across environments
- Well-documented and standardized
- Approved for organization-wide use

---

## Organization Strategies

### Naming Conventions

#### Structured Naming
Implement consistent naming patterns for easy identification:

```
[Environment]-[Component]-[FaultType]-[Version]

Examples:
✅ prod-frontend-pod-delete-v2
✅ staging-database-network-latency-v1
✅ dev-microservices-resource-stress-v3

❌ test1
❌ my-experiment
❌ chaos-test-final-v2-copy
```

#### Naming Components
- **Environment**: prod, staging, dev, test
- **Component**: frontend, backend, database, cache, queue
- **Fault Type**: pod-delete, network-latency, cpu-stress, memory-leak
- **Version**: v1, v2, v3 (semantic versioning for complex experiments)

### Tagging Strategy

#### Hierarchical Tagging
```yaml
tags:
  # Environment classification
  environment: ["production", "staging", "development"]
  
  # Component targeting
  component: ["frontend", "backend", "database", "infrastructure"]
  
  # Fault categories
  fault-type: ["network", "resource", "application", "platform"]
  
  # Team ownership
  team: ["platform", "sre", "backend", "frontend", "qa"]
  
  # Criticality level
  criticality: ["high", "medium", "low"]
  
  # Execution frequency
  frequency: ["daily", "weekly", "monthly", "on-demand"]
  
  # Compliance requirements
  compliance: ["gdpr", "sox", "hipaa", "pci"]
```

#### Tag-Based Organization
Use tags for:
- **Filtering**: Find experiments by specific criteria
- **Automation**: Trigger experiments based on tags
- **Reporting**: Generate reports by tag categories
- **Access Control**: Restrict access based on tags



### Folder Structure

#### Hierarchical Organization
```
Experiments/
├── Production/
│   ├── Critical-Services/
│   │   ├── Frontend-Resilience/
│   │   ├── Backend-Failover/
│   │   └── Database-Recovery/
│   └── Infrastructure/
│       ├── Network-Faults/
│       ├── Resource-Stress/
│       └── Node-Failures/
├── Staging/
│   ├── Integration-Tests/
│   ├── Performance-Validation/
│   └── Security-Testing/
└── Development/
    ├── Feature-Testing/
    ├── Regression-Tests/
    └── Experimental/
```

#### Access-Based Organization
```
Experiments/
├── Public/ (Organization-wide access)
├── Team-Platform/ (Platform team only)
├── Team-Backend/ (Backend team only)
├── Team-Frontend/ (Frontend team only)
└── Restricted/ (Admin access only)
```

---

## Experiment Editing

### Version Control

#### Experiment Versioning
Track changes to experiments over time:

```yaml
# Experiment version history
experiment: "frontend-pod-delete"
versions:
  v1:
    created: "2024-01-15"
    author: "platform-team"
    changes: "Initial version"
    
  v2:
    created: "2024-02-01"
    author: "sre-team"
    changes: "Added HTTP probes, increased fault weight"
    
  v3:
    created: "2024-02-15"
    author: "platform-team"
    changes: "Enhanced probe configuration, added custom metrics"
```

#### Change Tracking
Monitor what changes between versions:

- **Configuration Changes**: Fault parameters, probe settings
- **Scope Changes**: Target applications, blast radius
- **Schedule Changes**: Execution frequency, timing
- **Team Changes**: Ownership, access permissions

### Bulk Operations

#### Mass Updates
Update multiple experiments simultaneously:

```yaml
# Bulk update example
bulkUpdate:
  selector:
    tags: ["environment:staging", "team:platform"]
  changes:
    schedule: "0 2 * * 1"  # Every Monday at 2 AM
    timeout: "30m"
    notifications:
      - "platform-team@company.com"
```

#### Template Application
Apply standardized configurations:

```yaml
# Apply security template to all production experiments
templateApplication:
  template: "production-security-standards"
  targets:
    environment: "production"
  changes:
    - addProbe: "security-validation"
    - setBlastRadius: "10%"
    - enableAuditLogging: true
```

---

## Collaboration Features

### Team Management

#### Ownership Model
```yaml
# Experiment ownership structure
ownership:
  primary: "platform-team"
  secondary: ["sre-team", "backend-team"]
  reviewers: ["security-team", "compliance-team"]
  
permissions:
  platform-team: ["read", "write", "execute", "delete"]
  sre-team: ["read", "write", "execute"]
  backend-team: ["read", "execute"]
  security-team: ["read", "review"]
```

#### Collaboration Workflows
- **Peer Review**: Require approval before experiment changes
- **Change Notifications**: Alert stakeholders of modifications
- **Execution Permissions**: Control who can run experiments
- **Result Sharing**: Distribute findings to relevant teams

### Sharing and Templates

#### Experiment Templates
Create reusable experiment patterns:

```yaml
# Template definition
template:
  name: "microservice-resilience-standard"
  description: "Standard resilience test for microservices"
  parameters:
    - name: "service_name"
      type: "string"
      required: true
    - name: "namespace"
      type: "string"
      default: "default"
    - name: "blast_radius"
      type: "percentage"
      default: "25%"
      
  faults:
    - type: "pod-delete"
      weight: 8
      duration: "60s"
    - type: "network-latency"
      weight: 6
      duration: "120s"
      
  probes:
    - type: "http"
      endpoint: "http://{{service_name}}:8080/health"
    - type: "k8s"
      resource: "pods"
      namespace: "{{namespace}}"
```

#### Template Library
Organize templates by:
- **Use Case**: Infrastructure, application, security testing
- **Complexity**: Basic, intermediate, advanced
- **Industry**: E-commerce, fintech, healthcare
- **Technology**: Kubernetes, serverless, microservices



### Review and Approval

#### Approval Workflows
```yaml
# Approval process configuration
approvalWorkflow:
  triggers:
    - environment: "production"
    - blastRadius: ">50%"
    - newExperiment: true
    
  approvers:
    - role: "sre-lead"
      required: true
    - role: "security-team"
      required: false
      condition: "security-related"
    - role: "compliance-team"
      required: true
      condition: "production"
      
  timeline:
    requestTimeout: "48h"
    reminderInterval: "12h"
    escalationAfter: "24h"
```

#### Review Checklist
- ✅ **Safety Validation**: Appropriate blast radius and rollback mechanisms
- ✅ **Target Verification**: Correct applications and environments
- ✅ **Probe Coverage**: Adequate health validation
- ✅ **Documentation**: Clear purpose and expected outcomes
- ✅ **Compliance**: Adherence to organizational policies

---

## Import and Export

### Export Capabilities

#### Individual Experiments
```bash
# Export single experiment
harness chaos export experiment \
  --name "frontend-pod-delete-v2" \
  --format yaml \
  --output experiment.yaml
```

#### Bulk Export
```bash
# Export experiments by tag
harness chaos export experiments \
  --tags "environment:production,team:platform" \
  --format json \
  --output production-experiments.json
```

#### Export Formats
- **YAML**: Human-readable, version control friendly
- **JSON**: Machine-readable, API integration
- **Terraform**: Infrastructure as code integration
- **Helm**: Kubernetes package management

### Import Capabilities

#### Single Import
```bash
# Import experiment from file
harness chaos import experiment \
  --file experiment.yaml \
  --validate \
  --dry-run
```

#### Bulk Import
```bash
# Import multiple experiments
harness chaos import experiments \
  --directory ./experiments/ \
  --recursive \
  --update-existing
```

#### Migration Support
- **Platform Migration**: Move from other chaos engineering tools
- **Environment Promotion**: Copy experiments between environments
- **Backup Restoration**: Restore from exported backups
- **Template Distribution**: Share templates across organizations

### GitOps Integration

#### Git Repository Structure
```
chaos-experiments/
├── environments/
│   ├── production/
│   ├── staging/
│   └── development/
├── templates/
│   ├── infrastructure/
│   ├── application/
│   └── security/
├── policies/
│   ├── approval-workflows.yaml
│   ├── safety-policies.yaml
│   └── compliance-rules.yaml
└── scripts/
    ├── deploy.sh
    ├── validate.sh
    └── rollback.sh
```

#### CI/CD Pipeline Integration
```yaml
# GitHub Actions example
name: Chaos Experiment Deployment
on:
  push:
    paths: ['experiments/**']
    
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate Experiments
        run: harness chaos validate --directory experiments/
        
  deploy:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: harness chaos deploy --environment staging
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: harness chaos deploy --environment production
```

---

## Maintenance and Cleanup

### Automated Maintenance

#### Cleanup Policies
```yaml
# Automated cleanup configuration
cleanupPolicies:
  - name: "archive-old-experiments"
    condition: "lastExecuted > 90 days AND status != active"
    action: "archive"
    
  - name: "delete-failed-drafts"
    condition: "status == draft AND created > 30 days AND lastModified > 7 days"
    action: "delete"
    
  - name: "cleanup-execution-logs"
    condition: "executionLogs.age > 180 days"
    action: "compress_and_archive"
```

#### Health Monitoring
Track experiment library health:

- **Execution Frequency**: Identify unused experiments
- **Success Rates**: Find consistently failing experiments
- **Resource Usage**: Monitor storage and compute consumption
- **Access Patterns**: Understand usage trends

### Performance Optimization

#### Storage Management
```yaml
# Storage optimization settings
storageOptimization:
  compression:
    enabled: true
    algorithm: "gzip"
    level: 6
    
  archival:
    enabled: true
    threshold: "6 months"
    storage: "cold-storage"
    
  cleanup:
    tempFiles: "24 hours"
    executionLogs: "90 days"
    archivedExperiments: "2 years"
```

#### Query Optimization
- **Indexing**: Optimize search and filtering performance
- **Caching**: Cache frequently accessed experiments
- **Pagination**: Handle large experiment libraries efficiently
- **Background Processing**: Async operations for bulk updates

---

## Monitoring and Analytics

### Usage Analytics

#### Experiment Metrics
Track key performance indicators:

```yaml
# Analytics dashboard metrics
metrics:
  execution:
    totalRuns: 1247
    successRate: 94.2%
    avgDuration: "8.5 minutes"
    
  library:
    totalExperiments: 156
    activeExperiments: 89
    templatesCreated: 23
    
  collaboration:
    teamsInvolved: 8
    avgReviewTime: "4.2 hours"
    approvalRate: 96.8%
    
  impact:
    issuesIdentified: 34
    improvementsImplemented: 28
    mttrReduction: "23%"
```

#### Trend Analysis
- **Growth Trends**: Library expansion over time
- **Usage Patterns**: Peak execution times and frequencies
- **Team Adoption**: Chaos engineering maturity by team
- **Success Metrics**: Resilience improvements achieved

### Health Dashboards

#### Library Health
Monitor the overall health of your experiment library:

- **Coverage**: Percentage of services with chaos experiments
- **Freshness**: How recently experiments were updated
- **Quality**: Success rates and probe coverage
- **Compliance**: Adherence to organizational standards

#### Operational Health
Track operational aspects:

- **Infrastructure Utilization**: Chaos infrastructure resource usage
- **Execution Queue**: Pending and running experiments
- **Error Rates**: Failed executions and common issues
- **Performance**: Execution times and resource consumption



---

## Best Practices

### Organization Excellence
- **Consistent Naming**: Use standardized naming conventions
- **Comprehensive Tagging**: Apply meaningful tags for organization
- **Regular Reviews**: Periodically assess experiment relevance
- **Documentation**: Maintain clear experiment descriptions and purposes

### Collaboration Success
- **Clear Ownership**: Define responsible teams and individuals
- **Review Processes**: Implement appropriate approval workflows
- **Knowledge Sharing**: Document learnings and best practices
- **Training Programs**: Educate teams on chaos engineering practices

### Maintenance Efficiency
- **Automated Cleanup**: Implement policies for library hygiene
- **Performance Monitoring**: Track and optimize system performance
- **Regular Audits**: Review experiment effectiveness and relevance
- **Continuous Improvement**: Evolve practices based on experience

## Troubleshooting

### Common Management Issues

#### Experiment Conflicts
**Problem**: Multiple experiments targeting the same resources
**Solution**: Implement resource locking and scheduling coordination

#### Permission Issues
**Problem**: Users unable to access or modify experiments
**Solution**: Review RBAC settings and team assignments

#### Performance Degradation
**Problem**: Slow experiment loading and execution
**Solution**: Optimize queries, implement caching, archive old experiments

#### Synchronization Problems
**Problem**: Experiments out of sync between environments
**Solution**: Implement GitOps workflows and automated synchronization

## Next Steps

After mastering experiment management:

1. **[Create Experiments](./create-experiments)** - Build new experiment scenarios
2. **[Gamedays](../gamedays)** - Expand chaos engineering across your organization
3. **[Actions](../actions)** - Automate responses to experiment results
4. **[Governance](../../security)** - Implement enterprise-grade controls and compliance

Effective experiment management is the foundation of a successful chaos engineering program. By implementing these practices, you'll build a scalable, maintainable, and collaborative chaos engineering capability that grows with your organization.
