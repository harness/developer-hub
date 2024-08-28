---
title: Scopes and Secret Referencing in Custom Secret Manager
description: Learn about the hierarchical scopes in Harness and the rules for referencing secrets within the Custom Secret Manager
sidebar_position: 11
---

This document provides a detailed explanation of the hierarchical scopes in Harness and guidelines on referencing secrets within the Custom Secret Manager, including specific examples and constraints.

### Scopes in Harness

Harness operates with a hierarchical structure composed of three distinct scopes:

1. **Account Scope**

    - The top-level scope.

    - Parent to all Organizations within the Account.

2. **Organization Scope**

    - Intermediate scope under an Account.

    - Parent to Projects within the Organization.

3. **Project Scope**

    - The most granular scope.

    - Exists within an Organization.

#### Hierarchy Summary:

- Account Scope contains multiple Organizations.

- Organization Scope contains multiple Projects.

### Referencing Secrets

When referencing secrets in Harness, the following rules apply:

- **Account Scope**: Can reference secrets from its own scope.

- **Organization Scope**: Can reference secrets from both its own scope and its parent Account scope.

- **Project Scope**: Can reference secrets from its own scope, its parent Organization scope, and the Account scope.

#### Important Constraint:

- **Child Scope Restriction**: Entities at a higher scope (Account or Organization) cannot reference secrets from a lower scope (Project or Organization).

#### Examples:

- **Organization-Level Connector**:

    - Can use secrets from the Organization or Account scope.

    - **Invalid Reference**: A Project-level secret cannot be referenced.

- **Project-Level Connector**:

    - Can use secrets from the Project, Organization, or Account scope.

### Referencing Secrets in Custom Secret Manager

When using the Custom Secret Manager, you need to specify the identifier of the secret along with the scope where it is available:

- **Account-Level Secret**: `account.secretIdentifier`

- **Organization-Level Secret**: `org.secretIdentifier`

- **Project-Level Secret**: secretIdentifier (No prefix is required for project-level secrets)

**Key Rule:**

Secrets from a child scope cannot be accessed from a parent scope. For example, a Project-level secret cannot be referenced from an Organization or Account-level entity.
