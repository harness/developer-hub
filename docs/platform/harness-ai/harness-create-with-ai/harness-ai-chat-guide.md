---
title: Harness AI Chat use cases
description: Explore common use cases for Harness AI Chat across DevOps, security, cost management, reliability, and knowledge assistance.
keywords:
  - harness ai
  - ai chat
  - use cases
  - pipeline generation
  - security testing
  - cost optimization
  - chaos engineering
  - idp
tags:
  - AI
  - DevOps
  - Security
  - FinOps
sidebar_position: 15
redirect_from:
  - /docs/platform/harness-aida/harness-ai-chat-guide
  - /docs/platform/harness-ai/harness-ai-chat-guide
---

Harness AI accelerates software delivery by generating pipelines, maintaining code, improving security, and reducing costs through natural language prompts. This topic provides example prompts you can try, organized by Harness product modules, with detailed explanations of their use cases and expected outcomes.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Generate pipelines and automate workflows](#generate-pipelines-and-automate-workflows) with DevOps prompts.
- [Integrate security controls](#integrate-security-controls) with STO and API security prompts.
- [Optimize cloud costs](#optimize-cloud-costs) with FinOps prompts.
- [Test system resilience](#test-system-resilience) with chaos engineering prompts.
- [Discover services and execute workflows](#discover-services-and-execute-workflows) with IDP prompts.

---

## Before you begin

Before you use Harness AI Chat, ensure you have the following:

- **Harness account access**: Permissions to create and manage pipelines, services, environments, connectors, and other resources at the **Account**, **Organization**, or **Project** level. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on roles and permissions.
- **Resource context**: Names of existing connectors, repositories, branches, services, environments, and clusters you want to reference in your prompts.
- **Module access**: Access to the Harness modules you want to use (CI, CD, STO, CCM, Chaos, IDP).

---

## Generate pipelines and automate workflows

Harness AI creates, enhances, and documents CI/CD pipelines for your applications. Use these prompts to generate complete pipeline configurations, add new stages, or understand existing workflows.

| Example Prompt | Use Case and Expected Outcome |
|----------------|-------------------------------|
| "Can you help me build a new pipeline for building a Gradle K8s application and deploying it to my dev cluster?" | **Pipeline Generation**: Creates a complete CI/CD pipeline with build stages (Gradle compilation, testing), containerization (Docker build), and deployment to Kubernetes. Includes proper resource definitions, environment variables, and deployment strategies. |
| "Deploy to dev, qa, and prod. After the dev deployment add the DAST scan template from our template library." | **Multi-Environment Pipeline**: Extends your pipeline to include multiple deployment environments with proper promotion gates. Integrates Dynamic Application Security Testing (DAST) after dev deployment to catch runtime security issues before production. |
| "Add a SAST security scan step to the CI stage." | **Security Integration**: Inserts Static Application Security Testing (SAST) into your existing continuous integration stage. Scans source code for vulnerabilities, security hotspots, and compliance issues early in the development cycle. |
| "Tell me what this End2End pipeline does and document it for me so I can share with my team." | **Documentation Generation**: Analyzes your existing pipeline configuration and generates comprehensive documentation including pipeline flow diagrams, stage descriptions, dependencies, and troubleshooting guides for team sharing. |
| "Scan my Docker image with Semgrep before deploying to staging." | **Container Security Testing**: Integrates container image vulnerability scanning into your pipeline. Identifies security issues, outdated dependencies, and compliance violations in container images before they reach staging environments. |

---

## Integrate security controls

Harness AI makes it easy to integrate security controls throughout your software delivery pipeline, implementing shift-left security practices.

| Example Prompt | Use Case and Expected Outcome |
|----------------|-------------------------------|
| "Add an open-source dependency scan step to my build stage." | **Dependency Vulnerability Scanning**: Integrates tools like Snyk, OWASP Dependency Check, or similar scanners to identify known vulnerabilities in third-party libraries. Provides remediation suggestions and can block deployments based on severity thresholds. |
| "Integrate an API security scan before deployment." | **API Security Testing**: Adds automated API security testing using tools like OWASP ZAP or custom security test suites. Validates authentication, authorization, input validation, and tests for common API vulnerabilities (OWASP API Top 10). |
| "Show me vulnerabilities detected in my last pipeline run and how to fix them." | **Vulnerability Analysis and Remediation**: Analyzes security scan results from recent pipeline executions, categorizes vulnerabilities by severity, provides detailed explanations of each issue, and suggests specific code changes or configuration updates to resolve them. |

---

## Optimize cloud costs

Harness AI provides insights and automation to optimize your cloud infrastructure costs and resource utilization.

| Example Prompt | Use Case and Expected Outcome |
|----------------|-------------------------------|
| "Create a cost perspective for my AWS accounts." | **Cost Visibility Dashboards**: Generates comprehensive cost tracking dashboards that break down spending by AWS account, service type, environment (dev/staging/prod), and time periods. Includes budget alerts and cost trend analysis. |
| "Analyze commitments and identify savings opportunities." | **Cost Optimization Analysis**: Examines your current AWS/cloud usage patterns and recommends cost-saving strategies such as Reserved Instances, Savings Plans, or Spot Instance opportunities. Provides ROI calculations and implementation timelines. |
| "Recommend ways to reduce Kubernetes cluster spend." | **Cluster Cost Optimization**: Analyzes Kubernetes resource usage and recommends optimizations like rightsizing pods, implementing Horizontal Pod Autoscaling (HPA), using node selectors efficiently, and identifying over-provisioned resources. |

---

## Test system resilience

Harness AI helps build more resilient systems through chaos engineering.

| Example Prompt | Use Case and Expected Outcome |
|----------------|-------------------------------|
| "Generate a Chaos experiment to test pod failures in my dev environment." | **Chaos Engineering**: Creates chaos experiments using tools like Litmus or Chaos Mesh to deliberately introduce failures (pod termination, network delays, resource exhaustion) and validate your system resilience and recovery capabilities. |

---

## Discover services and execute workflows

Harness AI connects developers with organizational knowledge, service catalogs, and automated workflows through the Internal Developer Portal.

| Example Prompt | Use Case and Expected Outcome |
|----------------|-------------------------------|
| "Tell me more about boutique-frontend at account scope." | **Service Discovery**: Retrieves comprehensive metadata about services in your catalog including ownership information, dependencies, deployment history, health status, documentation links, and related scorecards or compliance metrics. |
| "How can I improve my overall score?" | **Personalized Recommendations**: Analyzes your account scorecards, compliance metrics, and best practice adherence to provide specific, actionable recommendations for improving software delivery metrics, security posture, and operational excellence. |
| "Where are the docs for this?" | **Documentation Search**: Searches across Harness documentation, internal wikis, README files, and knowledge bases to surface relevant documentation, tutorials, and troubleshooting guides contextual to your current task or question. |
| "Execute the workflow 'Request Infrastructure - VM or K8s space' with Env=AWS, instance=t2.small." | **Infrastructure Provisioning**: Triggers predefined IDP workflows for infrastructure provisioning, automatically filling in specified parameters (environment, instance types) and handling the complete provisioning lifecycle including approvals and notifications. |

---

## Related articles

- <a href="/docs/platform/harness-ai/harness-create-with-ai/effective-prompting-ai" target="_blank">Effective prompting</a>: Learn how to write clear, specific prompts for better AI results.
- <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI overview</a>: Understand AI capabilities across all Harness modules.
- <a href="/docs/internal-developer-portal/get-started/overview" target="_blank">Internal Developer Portal overview</a>: Discover how IDP connects developers with services and workflows.