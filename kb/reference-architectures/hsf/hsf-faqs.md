---
title: FAQs
description: Get answers to some frequently asked questions about HSF.
sidebar_position: 8
---

### How does it work?

HSF provides Terraform templates for managing the Harness Platform. It creates all resources needed to deploy the Harness Solutions Factory, along with example and best practice templates for platform usage. HSF leverages three key Harness components: Code Repository for code storage, Infrastructure as Code Management for Terraform administration, and Internal Developer Portal to host automated workflows.

### Is HSF part of my PS package?

HSF is provided as a no-additional cost solution delivered as part of an existing Professional Services Package.

### Do I have to purchase HSF? Is there a cost associated with HSF?

No, you do not need to purchase IaCM or IDP modules to use HSF but you can only use the modules to manage the Harness Platform.

### What is required to get HSF deployed?

An active Harness account and a personal access token are the only things required. This token will be used to create account level resources but can be deleted after deployment.

### What is created in the deployment of HSF?

Workspaces, connectors, a full pipeline, environments, user groups and RBAC are created in your account. The codebase can also be cloned into your account.

### Can I create my own templates?

Yes you can add customization to the base project setup within the code itself. Once HSF is setup and built, when you need to do a standard update, you can reapply to everything and it will revert to the ideal state because of the idempotent nature of Terraform.

### Can I - as the customer - maintain the codebase?

When you deploy HSF there is an option to clone the code base into your account. If you choose to do so all the code is replicated but it needs to be stored and run from Harness Code Repository. 

### Is there a way to run HSF not through the GUI?

You can actually pass in the form data via the API to trigger the IDP workflow, or you can also go one step further and you can still use the terraform code itself to actually provision externally but the reason why there is a GUI experience is because HSF was created to be a self service marketplace for application developers to be able to get access to the resources they need. We want to be able to shift this left towards devs and remove the reliance on platform teams.

### What versions of Terraform and OpenTofu does HSF support? 

Due to licensing and legal limitations HSF supports up to version 1.5x for Terraform. For OpenTofu, HSF is supported up to version 1.8.