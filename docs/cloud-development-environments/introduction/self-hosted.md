---
title: Self Hosted Gitspaces
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 3
sidebar_label: Self Hosted Gitspaces
---

## Everything about Self Hosted Gitspaces
### Self Hosted & Harness Hosted Gitspaces 
### Challenges with Hosted Gitspaces 
Hosted Cloud Development Environments (CDEs) — like GitHub Codespaces, Gitpod Cloud, and Replit — promise fast onboarding, consistent workspaces, and reduced local setup. However, as organizations scale or operate under stricter security, compliance, and performance needs, several **critical challenges emerge** with relying on hosted CDEs.

---

### 🔐 1. **Security & Data Sovereignty**

One of the most pressing concerns is **loss of control over source code and developer data**.

* **Source Code Exposure**: Hosted CDEs typically clone the codebase into vendor-controlled containers. This creates potential risk for intellectual property (IP) leaks or unauthorized access.
* **Secrets Management**: Developers often work with sensitive API keys, tokens, and credentials. Hosted platforms might not support secure secret injection or enterprise-grade vault integrations.
* **Third-Party Infrastructure**: Code, logs, and user actions are stored on infrastructure you don't manage, which can be a deal-breaker for sectors like finance, defense, or healthcare.
* **Data Residency**: Enterprises with data residency requirements (e.g., GDPR, HIPAA, FedRAMP) may not be able to choose or control the region where their data and development sessions are stored.

---

### 🛡️ 2. **Compliance and Audit Gaps**

Hosted platforms often fall short in supporting internal audits, forensics, and compliance workflows.

* **Limited Observability**: Enterprises may not get access to detailed logs of developer activities like file access, command execution, or network usage.
* **No Custom Logging Pipelines**: Hosted services may not allow integration with internal observability tools like Splunk, Datadog, or Prometheus.
* **Lack of Role-Based Controls**: Fine-grained permissions (e.g., who can run which environments or access certain files) are often limited or predefined.

---

### ⚙️ 3. **Limited Customization and Tooling Flexibility**

Hosted CDEs are designed to serve the general developer audience. For specialized teams, this can be limiting.

* **Unsupported Toolchains**: Certain legacy tools, hardware-specific SDKs, or heavy runtimes (e.g., CUDA for GPUs) may not be supported.
* **Restricted Images**: You often cannot modify the base image beyond a point — limiting the ability to preinstall enterprise-grade testing tools, linters, or licensed software.
* **Network Restrictions**: Hosted environments may not connect to internal APIs, databases, or services behind firewalls or VPNs.

---

### 🌐 4. **Latency and Performance Issues**

While hosted CDEs provide consistent environments, performance is often unpredictable.

* **Cold Starts**: Environments may take several minutes to start after being idle, breaking developer flow.
* **Location-based Latency**: Teams located far from the hosted environment’s data centers (e.g., India, LATAM, Africa) may face noticeable lag.
* **Limited Compute Configs**: You can’t always choose CPU, memory, or GPU profiles based on workload needs.

---

### 👥 5. **Vendor Lock-In**

Adopting a hosted CDE often means aligning with the vendor's tools, ecosystem, and workflow.

* **Proprietary Configuration Files**: Each provider has its own setup conventions (e.g., `.devcontainer.json` for Codespaces, `.gitpod.yml` for Gitpod).
* **API Lock-In**: Integrations may require vendor-specific APIs and webhooks that are hard to migrate later.
* **Hard to Migrate**: Moving off a hosted CDE later involves rebuilding infra, templates, and workflows — a significant lift.

---

### 💸 6. **Unpredictable or Rising Costs**

For large teams or long-running dev sessions, hosted pricing models can escalate rapidly.

* **Pay-per-hour Models**: Developers leaving sessions open or reusing large environments can run up unexpected costs.
* **No Cost Optimization Tools**: Most vendors offer limited cost visibility or auto-shutdown rules.
* **Multi-region Workflows**: Hosting dev environments close to globally distributed teams often costs extra or isn’t supported at all.


### Self Hosted vs Hosted Gitspaces 
### Architecture of Self Hosted GitspaceS

## Getting Started with Self Hosted Gitspaces
### Prerequisites
### Key Concepts
### Get Started 

## Recommendations for Hosted vs Self Hosted Gitspaces 
## Next Steps

