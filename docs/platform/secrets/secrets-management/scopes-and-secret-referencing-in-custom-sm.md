---
title: Referencing Secret in Custom Secret Manager
description: Learn about referencing secrets within the Custom Secret Manager
sidebar_position: 11
---

This document provides a detailed explanation of guidelines on referencing secrets within the Custom Secret Manager, including specific examples and constraints.

### Scopes in Harness

Currently, we have three scopes: Account, Organization, and Project. These scopes are arranged in a hierarchical order:

- Account is the parent scope for Organization.

- Organization is the parent scope for Project.

This means that an Account can contain multiple Organizations, and each Organization can contain multiple Projects.

### Referencing Secrets

When referencing secrets in Harness, the following rules apply:

- **Account Scope**: Can reference secrets from its own scope.

- **Organization Scope**: Can reference secrets from both its own scope and its parent Account scope.

- **Project Scope**: Can reference secrets from its own scope, its parent Organization scope, and the Account scope.

### Referencing Secrets in Custom Secret Manager

When using the Custom Secret Manager, you need to specify the identifier of the secret along with the scope where it is available:

- **Account-Level Secret**: `account.secretIdentifier`

- **Organization-Level Secret**: `org.secretIdentifier`

- **Project-Level Secret**: `secretIdentifier` (No prefix is required for project-level secrets)

**Key Rule:**

Secrets from a child scope cannot be accessed from a parent scope. For example, a Project-level secret cannot be referenced from an Organization or Account-level entity.
