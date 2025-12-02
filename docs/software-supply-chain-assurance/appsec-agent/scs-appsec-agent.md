---
title: SCS AppSec Agent
description: Learn about the SCS Appsec Agent
sidebar_label: SCS AppSec Agent
sidebar_position: 116
---




The AppSec Agent in Harness SCS lets you explore SCS data using natural language. Instead of navigating multiple dashboards or applying several filters, you can simply ask questions like "*Show me all scanned artifacts and code repositories*".

The AppSec agent retrieves the relevant information from SCS and responds in an easy-to-read format.

## Scope

- The AppSec Agent in SCS is currently scoped to project level. Cross-project queries are currently not supported. Queries related to artifacts, code repositories, chain of custody, compliance results, SBOM, SLSA, and OPA policies are supported.

- If a question is not related to Harness, you’ll see the message: The query is not related to Harness, as it is outside the scope of Harness functionalities.

:::info prerequisites & support
- Make sure you enable the Harness AI at the account level settings.
- Currently, the AppSec Agent is not supported on SMP.
:::

## Sample Questions

The following are some examples of the types of questions you can ask the Agent along with sample responses:


- Help me identify whether the `chalk` and `xz-utils` components are present in any of the artifacts in this project.

- Show the chain of custody for artifact `artifact_name`.

- Tell me which artifacts using non-permissive licenses, such as GPL or AGPL, have been deployed in production.

- Provide a detailed risk summary for repository `repo_name`.

- Show all repositories that violate the compliance rule: `Auto-merge must be disabled`.

- Create an OPA policy to block GPL-3.0 licensed components from being deployed in production.

<DocImage path={require('./static/npm-package.png')} width="100%" height="100%" title="Click to view full size image" />


## Feedback Mechanism

Each response supports feedback so you can help improve the model:

**Thumbs Up** - Positive feedback.  
**Thumbs Down** - Opens a comment box where you can describe what went wrong or what you expected.


Feedback signals are used by Harness to enhance future model versions.