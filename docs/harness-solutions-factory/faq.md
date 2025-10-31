---
title: HSF FAQs
description: Frequently asked questions about HSF.
sidebar_position: 100
sidebar_label: FAQs
---

The Harness Solutions Factory (HSF) FAQ covers common questions about how HSF works, what it deploys, and how to customize or manage it within your Harness account.

Use this guide to better understand setup requirements, supported versions, and how HSF fits into your existing Harness environment.

## HSF Overview
### What HSF is and how it works

<details>
<summary>What is HSF and how it works</summary>

HSF provides Terraform templates for managing the Harness Platform. It creates all resources needed to deploy the Harness Solutions Factory, along with example and best practice templates for platform usage. HSF leverages three key Harness components: Code Repository for code storage, Infrastructure as Code Management for Terraform administration, and Internal Developer Portal to host automated workflows.
</details>

<details>
<summary>Is HSF part of my PS package?</summary>

HSF is provided as a no-additional cost solution delivered as part of an existing Professional Services Package.
</details>

<details>
<summary>Do I have to purchase HSF? Is there a cost associated with HSF?</summary>

No, you do not need to purchase IaCM or IDP modules to use HSF, but you can only use the modules to manage the Harness Platform.
</details>

---

## Deployment & setup
### What's needed and what gets created
<details>
<summary>What is required to get HSF deployed?</summary>

An **active Harness account** and a **personal access token** are the only requirements. 

Your token will be used to create account-level resources, but can be deleted after deployment.
</details>

<details>
<summary>What is created in the deployment of HSF?</summary>

**Workspaces**, **connectors**, **a full pipeline**, **environments**, **user groups** and **RBAC** are created in your account. The codebase can also be cloned into your account.
</details>

---

## Customization & maintenance
### Manage and extend your HSF setup
<details>
<summary>Can I create my own templates?</summary>

Yes, you can add customization to the base project setup within the code itself. Once HSF is set up and built, when you need to do a standard update, you can reapply to everything, and it will revert to the ideal state because of the idempotent nature of Terraform.
</details>

<details>
<summary>Can I maintain the codebase?</summary>

Yes. To maintain the HSF codebase, you must choose the option to **clone the codebase into your account during deployment**. 

Once cloned, all code is fully replicated and **must be stored and executed from a Harness Code Repository**.
</details>

---

## Usage & integration
### Ways to operate and extend HSF
<details>
<summary>Is there a way to run HSF not through the GUI?</summary>

You can actually pass in the form data via the API to trigger the IDP workflow, or you can also go one step further and you can still use the terraform code itself to actually provision externally but the reason why there is a GUI experience is because HSF was created to be a self service marketplace for application developers to be able to get access to the resources they need. We want to be able to shift this left towards devs and remove the reliance on platform teams.
</details>

<details>
<summary>What versions of Terraform and OpenTofu does HSF support? </summary>

Harness Solutions Factory supports integration with all **OpenTofu** versions<HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (latest: v\(.))"'></HarnessApiData>.  
 
 Due to licensing and legal limitations all legacy Terraform versions under the MPL license are supported (up to **1.5.x**), any BSL versions (from 1.6.0) are not supported.
</details>