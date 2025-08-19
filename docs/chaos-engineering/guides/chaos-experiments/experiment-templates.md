---
title: ChaosHub Templates for Experiments
description: Learn how to create, manage, and use fault, probe, and action templates in ChaosHub to standardize chaos experiments across your organization.
sidebar_position: 12
---

This topic describes how you can create, manage, and use individual component templates in ChaosHub that can be leveraged when creating chaos experiments. ChaosHub now supports storing fault templates, probe templates, and action templates that provide reusable, standardized components for building experiments.

These modular templates enable standardized chaos engineering practices by providing reusable components (faults, probes, actions) stored in ChaosHub repositories that can be selected and configured when creating experiments across teams, projects, and environments.

## Evolution of Chaos Engineering Components

### Traditional Approach (Before ChaosHub Templates)
Previously, when creating chaos experiments, users had to:

- Configure faults from scratch for each experiment
- Manually set up probes with custom validation criteria
- Create custom actions for each experiment workflow
- Duplicate similar configurations across multiple experiments
- Manually maintain consistency across related experiments

**Limitations:**
- High redundancy in fault, probe, and action configurations
- Difficult to maintain consistency across experiments
- Limited reusability of individual components
- Time-consuming experiment setup process
- No standardization across teams and projects

### Modern ChaosHub Component Template Architecture
Current Harness CE supports modular component templates stored in ChaosHub:

- **Fault Templates**: Pre-configured fault definitions that can be selected when creating experiments
- **Probe Templates**: Reusable probe definitions with predefined validation criteria
- **Action Templates**: Standardized action configurations for common orchestration needs
- **Component Reuse**: Templates can be used across multiple experiments and shared across teams

This modular approach enables component reuse, easier maintenance, and standardized chaos engineering practices without requiring separate experiment templates.

## Benefits of Using ChaosHub Component Templates

- **Consistency**: Ensure all experiments use standardized fault, probe, and action configurations
- **Efficiency**: Reduce time spent on experiment setup by selecting pre-configured components
- **Best Practices**: Embed proven fault patterns, validation criteria, and orchestration workflows
- **Governance**: Control and standardize chaos engineering components across the organization
- **Collaboration**: Share reusable components across teams and projects
- **Compliance**: Meet regulatory and security requirements through standardized templates
- **Reusability**: Use the same fault, probe, and action templates across multiple experiments
- **Maintenance**: Update component templates centrally to improve all dependent experiments

## ChaosHub Template Components

### 1. Fault Templates
Individual fault configurations stored in ChaosHub that define specific chaos injection behaviors:

**Infrastructure Fault Templates:**
- CPU stress configurations with tunable parameters
- Memory exhaustion patterns for different scenarios
- Network latency injection with customizable delays
- Disk I/O stress templates for storage testing

**Application Fault Templates:**
- HTTP error injection with configurable status codes
- Database connection failure simulation
- API timeout and latency templates
- Service dependency failure patterns

**Cloud Provider Fault Templates:**
- AWS service-specific fault templates (EC2, RDS, Lambda)
- GCP resource fault templates (Compute, Storage, Network)
- Azure service fault templates (VMs, Storage, Networking)
- Multi-cloud fault templates for hybrid environments

### 2. Probe Templates
Reusable probe definitions stored in ChaosHub for validation and monitoring:

**Health Check Probe Templates:**
- HTTP endpoint monitoring templates
- Database connectivity validation templates
- Service availability check templates
- Custom health check script templates

**Performance Probe Templates:**
- Response time monitoring templates
- Throughput measurement templates
- Resource utilization tracking templates
- SLA compliance validation templates

**Integration Probe Templates:**
- Prometheus metrics query templates
- APM tool integration templates (Datadog, New Relic, Dynatrace)
- Kubernetes resource state validation templates
- Custom command execution templates

### 3. Action Templates
Standardized action configurations for experiment orchestration:

**Pre-Experiment Action Templates:**
- Environment preparation scripts
- Baseline metric collection actions
- Security validation actions
- Dependency readiness checks

**Post-Experiment Action Templates:**
- Cleanup and restoration scripts
- Report generation actions
- Notification and alerting actions
- Audit trail creation actions



## Creating ChaosHub Templates

### Prerequisites

- **ChaosHub Access**: Access to custom ChaosHub repository for template storage
- **RBAC Permissions**: Template creation and ChaosHub management permissions
- **Git Repository**: Custom ChaosHub connected to Git repository for version control
- **Component Understanding**: Knowledge of fault, probe, and action configurations

### Template Creation Workflow

**Step 1: Create Individual Component Templates**

1. **Fault Template Creation**:
   - Navigate to **Chaos Engineering** → **ChaosHubs** → **[Custom Hub]**
   - Select **Add Fault Template** to create reusable fault configurations
   - Define fault parameters, tunables, and default values
   - Specify target infrastructure and application requirements
   - Save fault template to ChaosHub repository

2. **Probe Template Creation**:
   - Access **Resilience Probes** section in your ChaosHub
   - Create probe templates with predefined validation criteria
   - Configure probe execution modes and timing parameters
   - Define success/failure conditions and retry logic
   - Store probe template in ChaosHub for reuse

3. **Action Template Creation**:
   - Navigate to **Actions** section in ChaosHub
   - Define pre-experiment and post-experiment action templates
   - Configure script execution, notification, and cleanup actions
   - Set action timing and dependency requirements
   - Save action templates to ChaosHub repository

**Step 2: Use Templates in Experiments**

1. **Template Selection During Experiment Creation**:
   - When creating a new experiment, select fault templates from ChaosHub library
   - Choose appropriate probe templates for validation requirements
   - Include relevant action templates for experiment orchestration
   - Configure template parameters for specific experiment needs
   - Combine multiple component templates as needed for the experiment

**Step 3: Configure Template Metadata**

1. **Template Information**:
   - Provide descriptive template name and description
   - Add relevant tags for categorization and discovery
   - Set template version for tracking and compatibility
   - Define template scope (Organization, Account, or Project)

2. **Component References**:
   - Reference fault templates by name from ChaosHub
   - Link probe templates for validation requirements
   - Include action templates for orchestration needs
   - Define component execution order and dependencies

3. **Runtime Parameters**:
   - Specify which parameters should be configurable at runtime
   - Define default values for optional parameters
   - Set validation rules for input parameters
   - Configure parameter inheritance from component templates

**Step 4: Define Template Inheritance**

1. **Component Template Inheritance**:
   - Inherit default parameters from referenced fault templates
   - Override specific parameters while maintaining template structure
   - Combine multiple fault templates for complex scenarios
   - Merge probe templates for comprehensive validation

2. **Runtime Input Configuration**:
   - Define which parameters can be customized during experiment creation
   - Set parameter types, validation rules, and default values
   - Configure parameter dependencies between components
   - Enable environment-specific parameter overrides

**Step 5: Template Validation and Storage**

1. **Template Validation**:
   - Validate component template references exist in ChaosHub
   - Check parameter compatibility between components
   - Verify runtime input definitions and constraints
   - Ensure template follows organizational standards

2. **ChaosHub Storage**:
   - Commit template to ChaosHub Git repository
   - Create template version tags for tracking
   - Update template metadata and documentation
   - Sync template across ChaosHub instances

## Using ChaosHub Component Templates

### Creating Experiments with ChaosHub Templates

**Template Discovery and Selection:**

1. **Browse ChaosHub Component Templates**:
   - Navigate to **Chaos Engineering** → **ChaosHubs** → **[Custom Hub]**
   - Browse available fault templates by category or infrastructure type
   - Review probe templates for different validation scenarios
   - Explore action templates for common orchestration needs
   - Preview template configurations and parameters

2. **Experiment Creation with Templates**:
   - Start creating a new experiment in Chaos Studio
   - Select fault templates from ChaosHub when adding faults to the experiment
   - Choose probe templates when configuring validation for the experiment
   - Include action templates when setting up pre/post-experiment actions
   - Customize template parameters for your specific experiment requirements

**Component Template Integration:**

3. **Fault Template Integration**:
   - Experiment automatically inherits fault configurations from templates
   - Customize fault parameters while maintaining template structure
   - Override default values for environment-specific requirements
   - Add additional faults from other templates if needed

4. **Probe Template Integration**:
   - Validation probes are automatically configured from probe templates
   - Customize probe parameters for specific monitoring requirements
   - Add supplementary probes from other templates
   - Configure probe execution timing and failure handling

5. **Action Template Integration**:
   - Pre and post-experiment actions are inherited from action templates
   - Customize action parameters for specific orchestration needs
   - Add additional actions from other templates
   - Configure action dependencies and execution order

### Template Customization and Override

**Parameter Inheritance and Override:**

- **Fault Parameter Override**: Modify fault-specific parameters while maintaining template structure
- **Probe Configuration Override**: Customize probe validation criteria and execution parameters
- **Action Parameter Override**: Adjust action scripts and execution parameters
- **Target Specification Override**: Specify different infrastructure or application targets

**Component Addition and Modification:**

- **Additional Components**: Include extra faults, probes, or actions from other templates
- **Component Removal**: Remove unnecessary components from the template
- **Custom Components**: Add custom faults, probes, or actions not available in templates
- **Execution Customization**: Modify scheduling, notifications, and execution preferences

### ChaosHub Template Versioning

**Git-Based Version Control:**

- **Repository Versioning**: Templates are versioned through Git commits and tags
- **Branch Management**: Different template versions maintained in separate branches
- **Release Tagging**: Stable template versions tagged for production use
- **Change History**: Complete audit trail of template modifications through Git history

**Template Compatibility Management:**

- **Version Pinning**: Experiments can reference specific template versions
- **Compatibility Checking**: Automatic validation of template version compatibility
- **Migration Assistance**: Tools to help upgrade experiments to newer template versions
- **Deprecation Management**: Controlled deprecation of outdated template versions

## ChaosHub Template Management

### Template Organization in ChaosHub

**Repository Structure:**

- **Component Templates**: Organized in separate directories for faults, probes, and actions
- **Experiment Templates**: Stored in dedicated experiment template directories
- **Categorization**: Templates grouped by infrastructure type, use case, or team ownership
- **Metadata Files**: Template documentation and configuration stored alongside definitions

**Template Discovery and Navigation:**

- **ChaosHub Browser**: Navigate templates through organized directory structure
- **Tag-Based Filtering**: Filter templates by tags, categories, and metadata
- **Search Functionality**: Find templates by name, description, or component references
- **Template Relationships**: View dependencies between experiment and component templates

### ChaosHub Sharing and Collaboration

**Multi-Level Template Sharing:**

- **Organization ChaosHub**: Enterprise-wide template repository accessible across all accounts and projects
- **Account ChaosHub**: Account-specific template repository shared across projects within the account
- **Project ChaosHub**: Project-specific template repository for team-specific templates
- **Public ChaosHub**: Community-contributed templates available for public use

**Collaborative Template Development:**

- **Git-Based Collaboration**: Multiple contributors can work on templates using Git workflows
- **Pull Request Reviews**: Template changes reviewed before merging into main repository
- **Branch-Based Development**: Feature branches for developing new templates or modifications
- **Community Contributions**: External contributors can submit templates through pull requests

### ChaosHub Template Governance

**Access Control and Permissions:**

- **Repository Access**: Git-based access control for ChaosHub repositories
- **Template Visibility**: Control template visibility through repository permissions
- **Usage Permissions**: RBAC integration for template usage in experiments
- **Modification Rights**: Git branch protection and merge permissions for template changes

**Quality Assurance and Compliance:**

- **Template Validation**: Automated validation of template syntax and structure
- **Review Processes**: Mandatory code reviews for template changes
- **Compliance Checking**: Automated checks for organizational standards and security policies
- **Approval Workflows**: Multi-stage approval process for template publication

## Advanced ChaosHub Template Features

### Template Composition and Inheritance

**Multi-Template Composition:**

- **Template Layering**: Combine multiple component templates to create complex experiments
- **Inheritance Hierarchies**: Create template hierarchies with base templates and specialized variants
- **Mixin Templates**: Reusable template fragments that can be included in multiple templates
- **Template Dependencies**: Automatic resolution of template dependencies and references

**Conditional Template Logic:**

- **Environment-Based Selection**: Different template components based on target environment
- **Infrastructure-Specific Logic**: Template behavior varies based on infrastructure type
- **Parameter-Driven Conditions**: Template composition based on runtime parameters
- **Feature Flag Integration**: Template components enabled/disabled based on feature flags

### Cross-ChaosHub Template Integration

**Multi-Repository Template Usage:**

- **Cross-Hub References**: Reference templates from different ChaosHub repositories
- **Template Federation**: Combine templates from organization, account, and project ChaosHubs
- **Dependency Resolution**: Automatic resolution of templates across multiple repositories
- **Version Compatibility**: Ensure compatibility when using templates from different sources

**Template Synchronization:**

- **Hub Synchronization**: Keep templates synchronized across multiple ChaosHub instances
- **Upstream Integration**: Pull updates from upstream template repositories
- **Conflict Resolution**: Handle conflicts when templates exist in multiple repositories
- **Selective Synchronization**: Choose which templates to synchronize between repositories

### Dynamic Template Configuration

**Runtime Template Selection:**

- **Environment-Based Templates**: Automatically select appropriate templates based on target environment
- **Infrastructure-Aware Selection**: Choose templates based on detected infrastructure capabilities
- **Parameter-Driven Selection**: Select component templates based on experiment parameters
- **Conditional Template Loading**: Load different templates based on runtime conditions

**Dynamic Parameter Resolution:**

- **Environment Variable Integration**: Resolve template parameters from environment variables
- **Context-Aware Parameters**: Automatically populate parameters based on execution context
- **Cross-Template Parameter Sharing**: Share parameters between referenced component templates
- **Runtime Parameter Validation**: Validate parameter values against template constraints

## Best Practices

### Template Design

1. **Keep Templates Focused**: Create specific templates for distinct scenarios
2. **Use Meaningful Names**: Choose descriptive names that indicate purpose
3. **Document Thoroughly**: Provide clear descriptions and usage guidelines
4. **Parameterize Wisely**: Balance flexibility with simplicity
5. **Include Validation**: Add rules to prevent misuse

### Template Organization

1. **Consistent Naming**: Follow naming conventions across templates
2. **Logical Categorization**: Group related templates together
3. **Version Management**: Use semantic versioning for template releases
4. **Regular Reviews**: Periodically review and update templates
5. **Deprecation Strategy**: Plan for retiring outdated templates

### Security Considerations

1. **Least Privilege**: Templates should request minimal necessary permissions
2. **Input Validation**: Validate all runtime inputs to prevent injection attacks
3. **Sensitive Data**: Avoid hardcoding secrets or sensitive information
4. **Audit Logging**: Track template usage and modifications
5. **Compliance Alignment**: Ensure templates meet security requirements

## Troubleshooting

### Common Issues

#### Template Not Found
- **Cause**: Template may be deleted or access permissions insufficient
- **Solution**: Verify template exists and check RBAC permissions

#### Validation Errors
- **Cause**: Runtime inputs don't meet validation criteria
- **Solution**: Review validation rules and adjust input values

#### Template Version Conflicts
- **Cause**: Template version used by experiment no longer exists
- **Solution**: Update experiment to use available template version

#### Permission Denied
- **Cause**: Insufficient permissions to use template
- **Solution**: Request appropriate permissions from administrators

### Debugging Template Issues

1. **Check Template Syntax**: Validate YAML structure and expressions
2. **Test Runtime Inputs**: Verify all required inputs are provided
3. **Review Validation Rules**: Ensure input values meet criteria
4. **Examine Logs**: Check experiment execution logs for template-related errors
5. **Verify Permissions**: Confirm access to template and target resources

## ChaosHub Template Integration with CI/CD

### Pipeline-Based Template Usage

**Automated Template Selection:**
- **Pipeline-Driven Templates**: Select experiment templates based on pipeline stage or deployment target
- **Environment-Specific Templates**: Automatically choose appropriate templates for different environments
- **Application-Aware Templates**: Select templates based on application type or technology stack
- **Compliance-Driven Templates**: Use templates that meet specific compliance requirements for production deployments

**Template Parameter Integration:**
- **Pipeline Variable Integration**: Populate template parameters from CI/CD pipeline variables
- **Deployment Context Awareness**: Use deployment metadata to configure template parameters
- **Automated Parameter Resolution**: Resolve template parameters from deployment artifacts and configurations
- **Environment-Specific Overrides**: Override template parameters based on target environment characteristics

### GitOps Template Management

**Version-Controlled Templates:**
- **Git-Native Storage**: Templates stored and versioned in Git repositories alongside application code
- **Branch-Based Development**: Develop and test new templates in feature branches
- **Automated Synchronization**: Sync template changes across environments through GitOps workflows
- **Rollback Capabilities**: Rollback to previous template versions when issues are detected

**Template Deployment Automation:**
- **Automated Template Updates**: Deploy template updates through GitOps pipelines
- **Template Validation**: Validate template changes before deployment to target environments
- **Progressive Template Rollout**: Gradually roll out template changes across environments
- **Template Dependency Management**: Manage dependencies between templates and application deployments

## Conclusion

ChaosHub component templates represent a significant advancement in chaos engineering standardization and collaboration. The modular template architecture with separate fault, probe, and action templates enables:

**Enhanced Reusability:**
- Component templates can be reused across multiple experiments and scenarios
- Reduced duplication and improved consistency across chaos engineering practices
- Easier maintenance and updates through centralized component management

**Improved Collaboration:**
- Git-based template storage enables collaborative development and review processes
- Multi-level template sharing supports organization-wide standardization
- Community contributions and template sharing across teams and projects

**Better Governance:**
- Version-controlled templates with proper change management and approval workflows
- Compliance validation and automated quality assurance for template changes
- Centralized template management with appropriate access controls and permissions

**Operational Excellence:**
- Faster experiment creation through template-based component selection
- Consistent fault, probe, and action configurations across environments and teams
- Simplified template maintenance through modular component architecture

**Getting Started with ChaosHub Component Templates:**

1. **Start Small**: Begin by creating simple fault and probe templates for common scenarios
2. **Build Component Library**: Gradually build a comprehensive library of reusable fault, probe, and action templates
3. **Establish Governance**: Implement proper review processes and access controls for template management
4. **Enable Collaboration**: Set up shared ChaosHub repositories for team and organization-wide template sharing
5. **Integrate with Workflows**: Connect template usage with CI/CD pipelines and GitOps workflows

By adopting ChaosHub component templates, organizations can scale their chaos engineering practices while maintaining consistency, quality, and collaboration across all resilience testing activities. These templates provide the building blocks for creating standardized, reusable chaos engineering components without the need for separate experiment templates.
