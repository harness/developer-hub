---
title: Best Practices
description: Learn how to name and structure artifact registries for clarity, consistency, and simpler governance.
sidebar_position: 10
---

Harness Artifact Registry provides centralized management for Docker, Helm, Maven, NPM, Python, and other artifact types. This guide outlines **naming conventions**, **scope selection**, and **governance strategies** to help you build a scalable registry structure.

## Why naming matters
Registry names must be globally unique across your Harness account—regardless of scope (account, org, or project). **Reusing names like `docker-dev` in multiple scopes is not allowed**.

:::tip naming and scoping benefits
Following consistent naming and scoping practices avoids registry sprawl and supports better collaboration, access control, and automation.
:::

---

## Before you create a registry
Use this checklist to guide naming, scope, and ownership decisions before creating a new artifact registry.

1. **Can you reuse an existing registry?**
2. **Do you need an upstream proxy?**
3. **Do you know what scope is appropriate for your use case?**
4. **Who will own and manage the registry?**

Once you've answered these questions, continue reading to define a registry name and scope that fits your needs.

---

## Recommended naming convention
Use this format to ensure global uniqueness and clarity: `<scope>-<team>-<package-type>-<environment>`

### Naming components
| Component                | Values / Examples                                                   | Description                             |
|--------------------------|----------------------------------------------------------------------|-----------------------------------------|
| **Scope Indicator**      | `acct`, `org`, `proj`                                               | Registry scope: account, org, or project. |
| **Team Indicator**       | `platform`, `mobile`, `backend`, `frontend`, `data`                | Indicates the owning or producing team. |
| **Package Type**         | `docker`, `helm`, `maven`, `npm`, `python`, `proxy`, `artifacts`   | Type of artifact the registry stores.   |
| **Environment (optional)** | `dev`, `test`, `prod`                                               | Indicates artifact lifecycle stage.     |

✅ **Good Examples**
- `acct-platform-docker-dev`
- `org-backend-maven-prod`
- `proj-mobile-npm-test`

❌ **Avoid**
- `docker-dev` (no scope/team context)
- `api`, `frontend`, `backend` (too generic)
- `proj-frontend-user-dashboard-components-npm-dev` (overly long)

:::tip registry name
Your registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`, and **must be unique to your Harness Account**.
:::

---

## Scope strategy
| Scope       | Use For                                           | Managed By            |
|-------------|---------------------------------------------------|---------------------|
| **Account**     | Shared tools, base images, proxies                | Platform/DevOps     |
| **Organization**| Team-shared libraries, internal components        | Team Leads          |
| **Project**     | Environment-specific or service-specific builds   | Dev Teams           |

---

## Registry URL format
- **Docker:** `pkg.harness.io/<account-id>/<registry-name>/<artifact>:<tag>`
- **Other types:** `pkg.harness.io/pkg/<account-id>/<registry-name>/<package-type>/`

> Ensure `<account-id>` is lowercase and matches the format used in your account settings.

---

## Upstream proxy best practices
Use upstream proxies at **account or org level** to:
- Cache external sources like Docker Hub, Maven Central, PyPI.
- Improve performance and reliability.
- Apply centralized scanning policies.

:::tip upstream proxy usage
The upstream proxy is essential for caching open-source dependencies. During a build, if a required dependency is not already cached, it is retrieved from a public repository and stored in the Upstream Proxy artifact tab. This ensures continuous availability, even if the source repository (e.g. Docker Hub or Maven Central) experiences downtime. Harness’s caching mechanism enhances reliability and efficiency by reducing dependency on external services and safeguarding access to critical artifacts.
:::

### Proxy registry name guidance 
- For account-wide proxies, a team name is **not** required in the registry name.
- Including `proxy` in the registry name (e.g., `acct-docker-proxy-dev`) is helpful for clarity and governance.
- You do **not** need a separate proxy for each environment.
- Example: `acct-docker-proxy-dev`

## Governance and ownership
Define roles and responsibilities:
- **Registry Admin**: Full access + user permissions.
- **Contributor**: Push/pull access.
- **Viewer**: Read-only access.

---

## Planning ahead
- Inventory teams and artifact types.
- Align naming with scope and lifecycle.
- Reserve namespace for known future needs.
- Set documentation and approval standards.

---

By following these best practices, you'll ensure your artifact registry is secure, organized, and ready to scale with your team's needs.

## Next steps
- [Get Started with Artifact Registry](/docs/artifact-registry/get-started/quickstart.md)
- [Integrate with your CD pipelines](/docs/artifact-registry/platform-integrations/cd-ar-integrations)
- [Learn about security integrations](/docs/artifact-registry/platform-integrations/security-integrations/ssd-ar-integrations)
- [Automate actions with Webhooks](/docs/artifact-registry/ar-webhooks)