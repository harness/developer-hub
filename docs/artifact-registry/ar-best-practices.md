---
title: Best Practices
description: Learn how to name and structure artifact registries to avoid conflicts and simplify governance.
sidebar_position: 10
---

Harness Artifact Registry provides centralized management for Docker, Helm, Maven, NPM, Python, and other artifact types. This guide outlines **naming conventions**, **scope selection**, and **governance strategies** to help you build a scalable registry structure.

## Why Naming Matters
Registry names must be globally unique across your Harness account—regardless of scope (account, org, or project). Reusing names like `docker-dev` in multiple scopes will cause conflicts.

:::tip naming and scoping benefits
Following consistent naming and scoping practices avoids registry sprawl and supports better collaboration, access control, and automation.
:::

## Before You Create a Registry
Use this checklist to guide naming, scope, and ownership decisions before creating a new artifact registry.

1. **Can you reuse an existing registry?**
2. **Do you need an upstream proxy instead?**
3. **Does the name follow the naming convention?**
4. **Is the name globally unique across your account?**
5. **Is the chosen scope appropriate for your use case?**
6. **Who will own and manage the registry?**

Once you've answered these questions, continue reading to define a registry name and scope that fits your needs.

## Recommended Naming Convention
Use this format to ensure global uniqueness and clarity: `<scope>-<team>-<package-type>-<environment>`

### Naming Components

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

## Scope Strategy
| Scope       | Use For                                           | Owned By            |
|-------------|---------------------------------------------------|---------------------|
| **Account**     | Shared tools, base images, proxies                | Platform/DevOps     |
| **Organization**| Team-shared libraries, internal components        | Team Leads          |
| **Project**     | Environment-specific or service-specific builds   | Dev Teams           |

## Registry URL Format
- **Docker:** `pkg.harness.io/<account-id>/<registry-name>/<artifact>:<tag>`
- **Other types:** `pkg.harness.io/pkg/<account-id>/<registry-name>/<package-type>/`

> Ensure `<account-id>` is lowercase and matches the format used in your account settings.

## Upstream Proxy Best Practices
Use upstream proxies at **account or org level** to:
- Cache external sources like Docker Hub, Maven Central, PyPI.
- Improve performance and reliability.
- Apply centralized scanning policies.

### Examples
- `acct-proxy-dockerhub`
- `acct-proxy-npmjs`
- `org-proxy-private-registry`

## Governance and Ownership
Define roles and responsibilities:
- **Registry Admin**: Full access + user permissions.
- **Contributor**: Push/pull access.
- **Viewer**: Read-only access.

### Registry Request Checklist
Before creating a new registry:
1. Is there an existing registry that fits?
2. Do you need an upstream proxy instead?
3. Does the name follow the naming convention?
4. Is the name unique?
5. Is the scope appropriate?
6. Who owns the registry?

## Planning Tips
- Inventory teams and artifact types.
- Align naming with scope and lifecycle.
- Reserve namespace for known future needs.
- Set documentation and approval standards.


## Next Steps
- [Create an Artifact Registry](./create-registry.md)
- [Configure Upstream Proxies](./proxy-setup.md)
- [View Your Registries](./view-registries.md)