---
title: Fault template API
sidebar_position: 3
description: API to use fault templates.
---

This topic describes the Harness Chaos Engineering (HCE) fault template APIs and its usage.
Harness Chaos Engineering provides several APIs to facilitate template management, experiment creation, and execution. Some of them are discussed below.

### List templates

```bash
GET /api/v1/faults
```

Parameters:
accountIdentifier
orgIdentifier
projectIdentifier
Optional: hubIdentifier

### List templates revisions

```bash
GET /api/v1/fault/{faultName}/revisions
```

### Retrieve Latest Template Revision

```bash
GET /api/v1/fault/{faultName}
```

### List Variables

```bash
GET /api/v1/fault/{faultName}/variables
```

### Compare Template Revisions

```bash
GET /api/v1/fault/{faultName}/compare/{revision1}/{revision2}
```

