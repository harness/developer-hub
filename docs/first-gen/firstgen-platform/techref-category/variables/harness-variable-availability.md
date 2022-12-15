---
title: Availability and Scope of Harness Variables
description: Variables used in Harness have a naming convention and scope depending on their type.
sidebar_position: 30
helpdocs_topic_id: d15of30a2i
helpdocs_category_id: 9lw749jubn
helpdocs_is_private: false
helpdocs_is_published: true
---

The variables used in Harness follow a naming convention that describes where they can be used. When you select a variable, it helps to understand the naming convention, as there might be numerous variables from which to choose.

For example, an account-level variable created in **Account Defaults** begins with the namespace **account.defaults** followed by the variable name. The reference for an Account Defaults variable named **productName** is `${account.defaults.productName}`.

Whenever you have a Harness field that permits variables, begin by typing `${` and the variables available to that entity are displayed.


### Naming Conventions

The following table lists the naming conventions for the different variable namespaces.



|  |  |  |
| --- | --- | --- |
| **Entity** | **Prefix** **Namespace** | **Examples** |
| Account Defaults | account.defaults | `${account.defaults.productName}` |
| Application Defaults | app.defaults | `${app.defaults.MyApp}` |
| Application | app | `${app.name}` |
| Artifact | artifact | `${artifact.displayName}` |
| Service | service | `${service.name}`, `${serviceVariable.``*variable\_name*``}` |
| Environment | env | `${env.description}` |
| Workflow | workflow | `${workflow.lastGoodDeploymentDisplayName}` |
| Infrastructure Definition | infra | `${infra.name}`,`${infra.route}`, `${infra.kubernetes.namespace}`, `${infra.pcf.route}` |
| Instance | instance | `${instance.hostName}` |
| Approval | published\_name, published\_name.variables | `${published_name.approvedBy.email}`, ​`${published_name.variables.signoff}` |
| Email | NA | `${toAddress}`, `${ccAddress}`, `${subject}`, `${body}` |
| Pivotal Cloud Foundry | pcf | `${infra.pcf.route}` |
| Kubernetes | kubernetes | `${infra.kubernetes.namespace}` |

### Multi-Phase Workflows and Variable Availability

If you are using a multi-phase Workflow, such as a Canary Workflow, certain expressions will only return results within the Phases in which their targets are set up and used.

For example, when you set up a Canary Workflow's Phase, you select an Infrastructure Definition and a Service. Expressions that refer to the Infrastructure Definition and Service, such as `${infra.name}` and `${serviceVariable.foo}`, will not return results outside of that Phase.

Using `${infra.name}` and `${serviceVariable.foo}` in the **Pre-deployment Steps** of the Workflow, which is before the Phases, will result in a `bad substitution` error.

### Scope of Variables

Depending on the type of the variable, the scope and availability of variables can be defines as follows.

* **Service variables**—Available wherever the Service is used. For example, in a multi-phase Workflow, the Service is selected when you set up the Phase, and therefore the Service variables are only available in the Phase.
* **Environment variables**—Available in the Workflow and any Pipeline using that Workflow.
* **Infrastructure Definition variables**—Available in the Workflow. For multi-phase Workflows, the Infrastructure Definition is selected when you set up the Phase, and therefore the Infrastructure Def variables are only available in the Phase.
* **Workflow variables**—In the Workflow and Pipeline running the Workflow.

### Related Reference Material

* [What is a Harness Variable Expression?](variables.md)

