---
title: Harness AI Chat Use Cases
description: Common Uses cases for Harness AI Chat
sidebar_position: 14
---

# Harness AI Chat Use Cases

Harness AI helps you accelerate software delivery by generating pipelines, maintaining code, improving security, and reducing costs—all through natural language prompts. This comprehensive guide provides **example prompts** you can try, organized by **Harness product modules**, along with detailed explanations of their **use cases** and **expected outcomes**.

## Table of Contents

- [DevOps (Pipelines, Code, and Automation)](#devops-pipelines-code-and-automation)
- [Security (STO & API Security)](#security-sto--api-security)
- [Efficiency (FinOps & Cost Management)](#efficiency-finops--cost-management)
- [Reliability (Chaos)](#reliability--incident-management-sre--chaos)
- [Knowledge Assistant (IDP)](#knowledge-assistant-idp)
- [Best Practices for Prompting](#best-practices-for-prompting)

---

## DevOps (Pipelines, CI, CD, and Automation)

Harness AI can create, enhance, and document CI/CD pipelines for your applications. Use these prompts to generate complete pipeline configurations, add new stages, or understand existing workflows.

| Example Prompt | Use Case & Expected Outcome |
|----------------|----------------------------|
| "Can you help me build a new pipeline for building a Gradle K8s application and deploying it to my dev cluster?" | **Pipeline Generation**: Creates a complete CI/CD pipeline with build stages (Gradle compilation, testing), containerization (Docker build), and deployment to Kubernetes. Includes proper resource definitions, environment variables, and deployment strategies. |
| "Deploy to dev, qa, and prod. After the dev deployment add the DAST scan template from our template library." | **Multi-Environment Pipeline**: Extends your pipeline to include multiple deployment environments with proper promotion gates. Integrates Dynamic Application Security Testing (DAST) after dev deployment to catch runtime security issues before production. |
| "Add a SAST security scan step to the CI stage." | **Security Integration**: Inserts Static Application Security Testing (SAST) into your existing continuous integration stage. Scans source code for vulnerabilities, security hotspots, and compliance issues early in the development cycle. |
| "Tell me what this End2End pipeline does and document it for me so I can share with my team." | **Documentation Generation**: Analyzes your existing pipeline configuration and generates comprehensive documentation including: pipeline flow diagrams, stage descriptions, dependencies, and troubleshooting guides for team sharing. |
| "Scan my Docker image with Semgrep before deploying to staging." | **Container Security Testing**: Integrates container image vulnerability scanning into your pipeline. Identifies security issues, outdated dependencies, and compliance violations in container images before they reach staging environments. |

---

## Security (STO & API Security)

Harness AI makes it easy to integrate security controls throughout your software delivery pipeline, implementing shift-left security practices.

| Example Prompt | Use Case & Expected Outcome |
|----------------|----------------------------|
| "Add an open-source dependency scan step to my build stage." | **Dependency Vulnerability Scanning**: Integrates tools like Snyk, OWASP Dependency Check, or similar scanners to identify known vulnerabilities in third-party libraries. Provides remediation suggestions and can block deployments based on severity thresholds. |
| "Integrate an API security scan before deployment." | **API Security Testing**: Adds automated API security testing using tools like OWASP ZAP or custom security test suites. Validates authentication, authorization, input validation, and tests for common API vulnerabilities (OWASP API Top 10). |
| "Show me vulnerabilities detected in my last pipeline run and how to fix them." | **Vulnerability Analysis & Remediation**: Analyzes security scan results from recent pipeline executions, categorizes vulnerabilities by severity, provides detailed explanations of each issue, and suggests specific code changes or configuration updates to resolve them. |

---

## Efficiency (FinOps & Cost Management)

Harness AI provides insights and automation to optimize your cloud infrastructure costs and resource utilization.

| Example Prompt | Use Case & Expected Outcome |
|----------------|----------------------------|
| "Create a cost perspective for my AWS accounts." | **Cost Visibility Dashboards**: Generates comprehensive cost tracking dashboards that break down spending by AWS account, service type, environment (dev/staging/prod), and time periods. Includes budget alerts and cost trend analysis. |
| "Analyze commitments and identify savings opportunities." | **Cost Optimization Analysis**: Examines your current AWS/cloud usage patterns and recommends cost-saving strategies such as Reserved Instances, Savings Plans, or Spot Instance opportunities. Provides ROI calculations and implementation timelines. |
| "Recommend ways to reduce Kubernetes cluster spend." | **Cluster Cost Optimization**: Analyzes Kubernetes resource usage and recommends optimizations like rightsizing pods, implementing Horizontal Pod Autoscaling (HPA), using node selectors efficiently, and identifying over-provisioned resources. |

---

## Reliability (Chaos)

Harness AI helps build more resilient systems through chaos engineering.

| Example Prompt | Use Case & Expected Outcome |
|----------------|----------------------------|
| "Generate a Chaos experiment to test pod failures in my dev environment." | **Chaos Engineering**: Creates chaos experiments using tools like Litmus or Chaos Mesh to deliberately introduce failures (pod termination, network delays, resource exhaustion) and validate your system's resilience and recovery capabilities. |

---



## Knowledge Assistant (IDP)

Harness AI connects developers with organizational knowledge, service catalogs, and automated workflows through the Internal Developer Portal.

| Example Prompt | Use Case & Expected Outcome |
|----------------|----------------------------|
| "Tell me more about boutique-frontend at account scope." | **Service Discovery**: Retrieves comprehensive metadata about services in your catalog including ownership information, dependencies, deployment history, health status, documentation links, and related scorecards or compliance metrics. |
| "How can I improve my overall score?" | **Personalized Recommendations**: Analyzes your account's scorecards, compliance metrics, and best practice adherence to provide specific, actionable recommendations for improving software delivery metrics, security posture, and operational excellence. |
| "Where are the docs for this?" | **Documentation Search**: Searches across Harness documentation, internal wikis, README files, and knowledge bases to surface relevant documentation, tutorials, and troubleshooting guides contextual to your current task or question. |
| "Execute the workflow 'Request Infrastructure - VM or K8s space' with Env=AWS, instance=t2.small." | **Infrastructure Provisioning**: Triggers predefined IDP workflows for infrastructure provisioning, automatically filling in specified parameters (environment, instance types) and handling the complete provisioning lifecycle including approvals and notifications. |

