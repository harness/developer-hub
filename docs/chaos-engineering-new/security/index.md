---
title: Overview
description: Comprehensive security controls and best practices for chaos engineering
sidebar_position: 1
---

# Security Overview

Harness provides comprehensive security controls to ensure the safe execution of chaos experiments on your infrastructure. This section covers security considerations and features across administrative and runtime environments, including authentication, authorization, network security, and blast radius control.

Chaos engineering security operates on multiple layers to protect your infrastructure while enabling effective resilience testing:

### Core Security Principles
- **Least Privilege Access**: Minimal permissions required for experiment execution
- **Defense in Depth**: Multiple security layers and controls
- **Secure by Default**: Safe configurations and automatic rollback mechanisms
- **Audit and Compliance**: Complete visibility into chaos activities
- **Blast Radius Control**: Containment of experiment impact

### Security Architecture Components
- **Control Plane Security**: Authentication, authorization, and API security
- **Execution Plane Security**: Isolated experiment execution with RBAC
- **Network Security**: Encrypted communication and network isolation
- **Data Protection**: Secure secrets management and data handling
- **Monitoring & Auditing**: Complete activity logging and compliance reporting

---

## Connectivity and Authentication

### Secure Infrastructure Connection

Your Kubernetes infrastructure connects to Harness Chaos Engineering through a secure, outbound-only communication model:

**Connection Architecture:**
- **Outbound HTTPS**: Chaos infrastructure makes outbound requests over HTTPS (port 443)
- **No Inbound Rules**: No inbound traffic rules required on your infrastructure
- **Unique Authentication**: Each infrastructure has a unique cluster ID and access key
- **Encrypted Communication**: All data transmission is encrypted in transit

![Security Overview](./static/overview/overview.png)

**Authentication Flow:**
1. Chaos infrastructure generates unique cluster ID and access key during installation
2. All API requests include these identifiers for authentication
3. Control plane validates credentials before processing requests
4. Secure token refresh and rotation mechanisms

### Multi-Environment Support

Harness can leverage the same cluster to inject chaos into various targets:
- **Kubernetes Resources**: Pods, services, deployments within the cluster
- **Infrastructure Targets**: VMs, cloud resources accessible from the cluster
- **External Services**: APIs and services reachable from the execution environment

:::info Cloud Integration
For cloud resource chaos injection, Harness securely manages cloud credentials through Kubernetes secrets, ensuring sensitive information never leaves your environment.
:::

---

## Kubernetes Security Model

### Service Account Architecture

Chaos infrastructure deployments use dedicated service accounts with carefully scoped permissions:

**Installation Modes:**
- **Cluster-wide Scope**: Full cluster access for comprehensive testing
- **Namespace-only Scope**: Restricted access to specific namespaces
- **Custom Scope**: Fine-tuned permissions for specific use cases

### Permission Management

The default permissions enable comprehensive chaos testing while maintaining security:

**Core Permissions:**
- **Pod Management**: Create, delete, monitor experiment and helper pods
- **Resource Access**: Read deployments, services, and configuration data
- **Event Logging**: Create and update experiment events and results
- **Network Control**: Manage network policies for network chaos

**Advanced Permissions:**
- **Custom Resource Management**: Handle Litmus chaos resources
- **Job Execution**: Create and manage batch jobs for experiments
- **Metric Collection**: Access monitoring data for validation

:::note Permission Tuning
Permissions can be fine-tuned based on your environment and experiment requirements. See [Blast Radius Control](#blast-radius-control) for detailed guidance.
:::

### Namespace Isolation

Implement namespace-level security controls:

**Benefits:**
- **Reduced Blast Radius**: Limit chaos impact to specific namespaces
- **Environment Separation**: Isolate development, staging, and production
- **Team Boundaries**: Align chaos permissions with team responsibilities
- **Compliance Requirements**: Meet regulatory isolation requirements

**Implementation Steps:**
1. Install chaos infrastructure in cluster mode
2. Delete default ClusterRole and ClusterRoleBinding
3. Create namespace-specific Roles and RoleBindings
4. Verify isolation through testing

[Learn more about namespace considerations →](./namespace-considerations)

---

## User Authentication and Authorization

### Authentication Methods

**Harness Platform Integration:**
- **Single Sign-On (SSO)**: SAML, OAuth, OpenID Connect
- **LDAP Integration**: Active Directory and enterprise directories
- **Multi-Factor Authentication**: Enhanced security for sensitive operations
- **API Keys**: Programmatic access with proper scoping

### Role-Based Access Control (RBAC)

**Built-in Roles:**
- **Chaos Engineering Admin**: Full platform administration
- **Chaos Engineering Editor**: Create and manage experiments
- **Chaos Engineering Viewer**: Read-only access to experiments and results
- **Custom Roles**: Tailored permissions for specific needs

**Permission Granularity:**
- **Environment-level**: Control access to specific environments
- **Infrastructure-level**: Manage chaos infrastructure permissions
- **Experiment-level**: Fine-grained experiment execution controls
- **Resource-level**: Specific resource type permissions

### Access Control Best Practices

**Principle of Least Privilege:**
- Grant minimum permissions required for job functions
- Regular review and cleanup of unused permissions
- Time-bound access for temporary requirements
- Separation of duties for critical operations

**Audit and Monitoring:**
- Complete audit trail of all user actions
- Real-time alerts for suspicious activities
- Regular access reviews and compliance reporting
- Integration with SIEM systems

---

## Secrets Management

### Control Plane Secrets

Harness leverages the native Harness Secret Manager for administrative secrets:

**ChaosHub Connectivity:**
- **Git Repository Access**: Personal Access Tokens (PAT) or SSH keys
- **Secure Storage**: Encrypted storage in Harness Secret Manager
- **Scope Management**: Proper permissions for repository operations
- **Rotation Support**: Automated secret rotation capabilities

![Control Plane Secrets](./static/overview/control-plane-secrets.png)

### Runtime Secrets

Experiment execution secrets are managed within your Kubernetes clusters:

**Cloud Provider Access:**
- **AWS Credentials**: IAM roles, access keys, session tokens
- **Azure Credentials**: Service principals, managed identities
- **GCP Credentials**: Service account keys, workload identity
- **Custom Providers**: API keys and authentication tokens

![Experiment Secrets](./static/overview/experiment-secrets.png)

**Secret Management Best Practices:**
- **Kubernetes Secrets**: Store sensitive data as Kubernetes secrets
- **Secret References**: Experiments reference secret names, not values
- **Lifecycle Management**: You control secret creation, rotation, and deletion
- **Encryption**: Secrets encrypted at rest and in transit

### Example: AWS Chaos Experiment Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-secret
  namespace: litmus
type: Opaque
data:
  cloud_config.yml: |
    # AWS credentials for chaos experiments
    [default]
    aws_access_key_id = <access-key>
    aws_secret_access_key = <secret-key>
    aws_session_token = <session-token>
    region = us-east-1
```

:::info Secret Security
Experiment artifacts only reference secret names. The actual secret values remain fully under your control within your Kubernetes clusters.
:::

---

## Blast Radius Control

### Permission-Based Controls

Fine-tune permissions to reduce blast radius and security impact:

**Kubernetes Chaos Controls:**
- **Custom Service Accounts**: Replace default accounts with restricted ones
- **Namespace Boundaries**: Limit chaos to specific namespaces
- **Resource Quotas**: Prevent resource exhaustion
- **Network Policies**: Control network access during experiments

**Cloud Chaos Controls:**
- **IAM Role Restrictions**: Minimal cloud permissions for specific faults
- **Resource Tagging**: Target only tagged resources
- **Region Limitations**: Restrict chaos to specific regions
- **Service Boundaries**: Limit access to specific cloud services

### Fault-Specific Permissions

Every fault in the Enterprise ChaosHub publishes required permissions:

**Permission Documentation:**
- **Minimum Required**: Essential permissions for fault execution
- **Optional Permissions**: Additional capabilities for enhanced functionality
- **Security Impact**: Risk assessment for each permission
- **Alternatives**: Lower-privilege alternatives where available

**Common Permission Templates:**
- **[AWS Resource Faults](../faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults)**: Comprehensive AWS permissions
- **Kubernetes Pod Faults**: Container and pod-level permissions
- **Network Faults**: Network policy and connectivity permissions
- **Resource Stress Faults**: System resource access permissions

### Dynamic Blast Radius Management

**Runtime Controls:**
- **Percentage Limits**: Limit affected resources by percentage
- **Count Limits**: Maximum number of resources to impact
- **Time Boundaries**: Automatic experiment timeouts
- **Health Thresholds**: Stop experiments based on system health

**Monitoring and Alerts:**
- **Real-time Monitoring**: Track experiment impact in real-time
- **Automatic Rollback**: Trigger rollback on threshold breaches
- **Alert Integration**: Notify teams of experiment status changes
- **Incident Response**: Automated incident creation for failures

---

## Security Templates and Policies

### Kubernetes Security Policies

**Pod Security Policies (PSP):**
- Restrict privileged containers
- Control volume types and access
- Enforce security contexts
- Limit network access

**Pod Security Standards:**
- **Privileged**: Unrestricted policy (development only)
- **Baseline**: Minimally restrictive policy
- **Restricted**: Heavily restricted policy (production)

### Policy Enforcement Tools

**Open Policy Agent (OPA):**
- Custom policy definitions
- Runtime policy enforcement
- Compliance validation
- Audit and reporting

**Kyverno Policies:**
- Kubernetes-native policy management
- Validation, mutation, and generation rules
- GitOps-friendly policy deployment
- Rich policy library

**OpenShift Security Context Constraints (SCC):**
- OpenShift-specific security controls
- Fine-grained permission management
- Integration with RBAC
- Compliance reporting

[Explore Security Templates →](./security-templates)

---

## Internal Security Controls

Harness implements comprehensive internal security controls:

### Build and Deployment Security

**Secure Development:**
- **Base Images**: Hardened, regularly updated base images
- **Vulnerability Scanning**: Continuous scanning of all components
- **Dependency Management**: Regular updates and security patches
- **Code Reviews**: Security-focused code review processes

**Penetration Testing:**
- **Regular Testing**: Quarterly penetration testing
- **Third-party Audits**: Independent security assessments
- **Vulnerability Disclosure**: Responsible disclosure program
- **Compliance Certifications**: SOC 2, ISO 27001, and other standards

### Runtime Security

**Platform Security:**
- **Encryption**: Data encrypted at rest and in transit
- **Network Isolation**: Secure network segmentation
- **Access Monitoring**: Real-time access monitoring and alerting
- **Incident Response**: 24/7 security incident response

**Compliance and Auditing:**
- **Audit Logs**: Comprehensive activity logging
- **Compliance Reporting**: Automated compliance reports
- **Data Residency**: Control over data location and processing
- **Privacy Controls**: GDPR and privacy regulation compliance

---

## Security Best Practices

### Development Environment

**Initial Setup:**
- Start with dedicated test clusters
- Implement RBAC from day one
- Use namespace isolation for team boundaries
- Regular security training for team members

**Experiment Design:**
- Begin with low-impact experiments
- Gradually increase blast radius
- Implement comprehensive monitoring
- Document security considerations

### Production Environment

**Deployment Strategy:**
- Phased rollout with increasing scope
- Comprehensive pre-flight checks
- Real-time monitoring and alerting
- Automated rollback mechanisms

**Operational Security:**
- Regular permission audits
- Incident response procedures
- Security metrics and KPIs
- Continuous improvement processes

### Organizational Security

**Governance:**
- Security policies and procedures
- Regular training and awareness programs
- Compliance monitoring and reporting
- Third-party security assessments

**Culture:**
- Security-first mindset
- Shared responsibility model
- Continuous learning and improvement
- Open communication about security issues

---

## Getting Started with Security

### Quick Security Checklist

**Before First Experiment:**
- [ ] Configure proper RBAC permissions
- [ ] Set up namespace isolation if required
- [ ] Implement monitoring and alerting
- [ ] Define incident response procedures
- [ ] Review and approve experiment scope

**Ongoing Security:**
- [ ] Regular permission audits
- [ ] Security training for team members
- [ ] Compliance reporting and reviews
- [ ] Continuous monitoring and improvement

### Next Steps

1. **[Namespace Considerations](./namespace-considerations)** - Implement namespace-level security
2. **[Security Templates](./security-templates)** - Use pre-built security policies
3. **[OpenShift Security](./security-templates/openshift-scc)** - OpenShift-specific controls
4. **[Pod Security Policies](./security-templates/psp)** - Kubernetes pod security
5. **[Kyverno Policies](./security-templates/kyverno-policies)** - Policy-as-code implementation

Security is not a one-time setup but an ongoing process. Regular reviews, updates, and improvements ensure your chaos engineering practices remain secure and compliant as your infrastructure evolves.
