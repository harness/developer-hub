---
title: HSF FAQs
description: Frequently asked questions about HSF.
keywords:
  - hsf faq
  - hsf deployment requirements
  - hsf terraform opentofu support
tags:
  - hsf
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
<summary>What modules do I need for HSF?</summary>

HSF leverages Harness Internal Developer Portal, Infrastructure as Code Management and Harness Code Repository. You do not need to purchase additional modules specifically for HSF. If you do not have IDP, IaCM or HCR licensed, we will provide you a limited license in order to use HSF and manage Harness entities.
</details>

---

## Deployment & setup
### What is needed and what gets created
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

Yes. You can pass the form data through the API to trigger the IDP workflow directly, or use the Terraform code itself to provision resources outside the GUI. HSF provides a GUI experience because it is designed as a self-service marketplace where application developers can get access to the resources they need, shifting provisioning left and reducing the reliance on platform teams.
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

<details>
<summary>Can HSF manage cloud resources, not just Harness entities? </summary>

Yes. Because HSF is built on OpenTofu and IaCM, it can provision any resource that has a Terraform provider, such as AWS, Azure, or GCP. However, you will need a paid enterprise license for IDP and IaCM if provisioning non-Harness entities.
</details>