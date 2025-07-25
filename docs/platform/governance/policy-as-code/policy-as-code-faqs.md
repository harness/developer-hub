---
title: Policy as Code FAQs
description: See sample policies and when to use them.
sidebar_position: 200
---

This topic addresses some frequently asked questions about Policy as Code support in Harness.

<!--

- [Can we use our own Gatekeeper and have Harness manage Gatekeeper and policies?](#can-we-use-our-own-gatekeeper-and-have-harness-manage-gatekeeper-and-policies)
- [Can policies be managed in Git?](#can-policies-be-managed-in-git)
- [Can you reference Harness variables expressions in policies?](#can-you-reference-harness-variables-expressions-in-policies)
- [What can I write Policies against?](#what-can-i-write-policies-against)
- [Can Policy Sets be managed in Git?](#can-policy-sets-be-managed-in-git-)
- [When can Policies be evaluated?](#when-can-policies-be-evaluated)

-->

### Can we use our own Gatekeeper and have Harness manage Gatekeeper and policies?
 
No, Harness has an internal policy service that manages the policies and evaluates policies against Harness object payloads. 

### Can policies be managed in Git?

Yes, you can manage policies in Git. For more information, go to [Configure Git Experience for OPA](/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa). 

### Can you reference Harness variables expressions in policies?

No, you cannot reference Harness variable expressions such as `<+service.name>`  directly in a policy. You can map a Harness variable expression to a fixed JSON Key in the Governance Policy Step and then evaluate it against a policy. For more information, go to [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/). 


### What can I write policies against?

You can now write policies against:  
- Pipelines
- Templates
- Connectors
- Secrets
- Feature Flags
- Custom
- Service
 
Support for the following entities is on our long-term roadmap:
- Service
- Environments
- RBAC 


### Can policy sets be managed in Git?

No, you cannot manage policy sets in Git.


### When can policies be evaluated?

- **On Save:** Policies can be applied via a policy set to a specific object when a user is trying to update or create it. The following object types are supported:
   - Feature Flags
   - Connectors
   - Secrets 
   - Templates
   - Pipelines  
   - Service 

:::info note
Policies applied to the Service entity during **On Run** and **On Save** events is currently behind the feature flag `CDS_ENABLE_SERVICE_ON_RUN_OPA_EVAL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

- **On Run:** Policies can be applied when a pipeline is running and a value is computed.  The following object type is supported:
   - Pipelines
   - Service

:::info note
Policies applied to the Service entity during **On Run** and **On Save** events is currently behind the feature flag `CDS_ENABLE_SERVICE_ON_RUN_OPA_EVAL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

- **On Step:** When using the Governance Step, you can evaluate a policy against the JSON that is generated from the step. The following object type is supported:
   - Custom

### What version of the OPA library does Harness platform use?

Harness platform uses the Open Policy Agent (OPA) library version **0.62.0**.

For more details, you can refer to [OPA v0.62.0](https://github.com/open-policy-agent/opa/tree/v0.62.0).

### How can I tell what policy sets are using my policy?

Find a full list of your policies for your scope by going to the relevant settings page: **Project Settings**, **Organization Settings**, or **Account Settings**

Then, go to the **Security and Governance** section > **Policies**.

In the top right of this overview page, select **Policies**. 

Here you will see a full list of policies, the policy store, and the number of **Referenced Policy Sets**. You can click on the **View** button to open a modal with a full list of referenced policy sets.