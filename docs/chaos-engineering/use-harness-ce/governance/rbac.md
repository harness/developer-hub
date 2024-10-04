---
title: Governance in Creation
sidebar_position: 1
---

This topic describes how Harness CE leverages RBAC to ensure that you have the right access to chaos engineering resources.

## User authentication

Harness platform is fully integrated with several public OAuth providers with support for two-factor authentication and domain-whitelisting.
Go to [Authentication Overview](/docs/platform/authentication/authentication-overview.md) to learn more.

### User authorization and role-based access control

The chaos module leverages [Harness access control](/docs/platform/role-based-access-control/rbac-in-harness) capabilities to restrict user action on chaos resources, which adhere to the same account-organization-project identification as the rest of the platform resources.

The foundational elements of the chaos engineering process, chaos infrastructure, chaos hubs, chaos experiments, and chaos GameDays are registered as the module resources, with permissions exercised against them. These resources are scoped at the project level.

If you (as a user) have administrative privileges on a project, you can create predefined role(s) pertaining to chaos resource access.

To view the permissions you have, go to **Project Settings**-> **Access Control** -> **Roles**. Click the role name and go to **Chaos** module. This will list the resources and the operations you can perform on them.

![User auth and RBAC](./static/rbac/user-auth-rbac.png)

## Conclusion

RBAC in Harness Chaos Engineering ensures that chaos experiments are executed in a controlled manner. Assigning roles with specific permissions improves security and ensures that chaos engineering practices align with governance and compliance standards.
