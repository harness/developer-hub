---
title: Security Templates
sidebar_position: 1
description: Security policies and templates for chaos engineering environments
---

# Security Templates

This section introduces you to various security policies you can use with Harness Chaos Engineering.

Security management is a continuous process that is essential to keep businesses safe. Providing dynamic security controls without hindering the developer's productivity helps businesses control, defend, and extend their application. Providing access to service accounts with the right security policy is important, and Harness recommends PSP, OpenShift SCC, and Kyverno security policy templates.

The deployments that comprise the chaos infrastructure and the transient experiment pods launched to inject faults use the [in-cluster configuration](https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/) to make Kubernetes API calls, and thereby auto-mount service token secrets. The execution happens through non-root users with containers running secure base images.

Pod network fault and stress faults require container-runtime-specific operations like entering the network and pid namespaces. The operations require privilege escalation, manipulating the cgroup, and so on. In these cases, some of the pods are designed to run with privileged containers and root users. These pods also mount the runtime-specific socket files from the underlying host. However, note that such pods are short-lived (they exist for the duration of chaos) and can be run only if the users equip the service accounts with access to the right security policy.

## Available Security Policies

### Pod Security Policies (PSP)
Legacy Kubernetes security mechanism for controlling pod security contexts. Suitable for Kubernetes clusters prior to v1.21 and legacy environments requiring PSP support.

**Key Features:**
- Container privilege restrictions
- Volume type controls
- Security context enforcement
- Capability management

### Kyverno Policies
Kubernetes-native policy management using YAML for validation, mutation, and generation of resources.

**Key Features:**
- No new language to learn (uses YAML)
- Real-time policy enforcement
- Comprehensive reporting and monitoring
- GitOps-friendly policy deployment

### Open Policy Agent (OPA)
Flexible policy engine for complex security requirements using the Rego language.

**Key Features:**
- Custom policy definitions
- Runtime policy enforcement
- Compliance validation and reporting
- Integration with external data sources

### OpenShift Security Context Constraints (SCC)
OpenShift-specific security controls with fine-grained permission management.

**Key Features:**
- Integration with OpenShift RBAC
- Container security context enforcement
- Built-in security profiles
- Enterprise security compliance

## Policy Selection Guide

| Environment | Recommended Policy | Security Level |
|-------------|-------------------|----------------|
| **Development** | Baseline Pod Security Standards | Low |
| **Testing** | Kyverno Policies | Medium |
| **Staging** | Restricted Pod Security + OPA | High |
| **Production** | OPA + SCC (OpenShift) | Maximum |

## Implementation Best Practices

### Gradual Rollout
1. Start with permissive policies in development
2. Gradually increase restrictions in staging
3. Implement maximum security in production
4. Monitor and adjust based on feedback

### Security Considerations
- Use least privilege access principles
- Implement defense in depth strategies
- Enable comprehensive audit logging
- Regular security policy reviews
- Automated compliance monitoring

### Common Use Cases

**Development Environment:**
- Minimal restrictions for rapid development
- Basic security controls
- Easy debugging and troubleshooting

**Production Environment:**
- Maximum security restrictions
- Comprehensive audit logging
- Strict compliance enforcement
- Automated policy validation

## Next Steps

Choose the appropriate security policy based on your environment and requirements:

- **[Pod Security Policies](./psp)** - For legacy Kubernetes environments
- **[Kyverno Policies](./kyverno-policies)** - For YAML-based policy management
- **[OpenShift Security Context Constraints](./openshift-scc)** - For OpenShift environments
- **[Open Policy Agent](./opa)** - For advanced policy requirements

Start with basic policies and gradually enhance security as your chaos engineering practices mature.
