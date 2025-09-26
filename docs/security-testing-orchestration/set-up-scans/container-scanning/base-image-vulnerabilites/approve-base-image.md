---
title: Approve Base Image
description: Set up container image scanning to identify vulnerabilities in base images.
sidebar_label: Approve Base Image
sidebar_position: 5
--- 

In many organizations, security teams vet and approve specific base images for developers to use. Even if these images contain known vulnerabilities, they are considered acceptable. STO's **Base Image Approval** feature helps you implement this process and enforce policies on it. 
This document details about:
- [What is Base Image Approval?](#what-is-base-image-approval)
- [How to Approve a Base Image?](#how-to-approve-a-base-image)
- [Policies for Vulnerabilities from Application and Base Images](#policies-for-vulnerabilities-from-application-and-base-images)

:::note

This feature is behind the feature flag `STO_BASE_IMAGE_DETECTION`. Contact [Harness Support](mailto:support@harness.io) to enable this flag.

:::

### What is Base Image Approval?

Base Image Approval is a manual process where you explicitly approve one or more tags of a base image target in STO. This action signals that the selected base image tags are trusted for use in your pipelines. When you scan an application image built on an approved base image tag, you will find the scan results with the following indicators:

*   **UI Indicator**: Vulnerabilities originating from the approved base image are marked with a [**green** `base image` label](#how-to-view-vulnerabilities-from-approved-base-image) in the **Vulnerabilities tab**. Vulnerabilities from unapproved base images are marked in **blue**.
    <!-- <DocImage path={require('../static/label-table.png')} width="70%" height="70%"/> -->
*   **Step Output Variable**: The `BASE_IMAGE_APPROVED` output variable in the scanner step is set to `true`. This variable allows you to create policies to ignore vulnerabilities from approved base images.

<DocImage path={require('../static/approve-base-image-overview.png')} width="100%" height="100%"/>

### How to Approve a Base Image

Before approving a base image, make sure you’ve reviewed [What is Base Image Approval?](#what-is-base-image-approval) and understood the process. To approve a base image, you must have the **Approve / Reject** permission for **Test Targets** in the project where you want to approve the base image. Or you must have the **Security Testing AppSec** role assigned. Refer to the [RBAC documentation](/docs/security-testing-orchestration/rbac) for more information.

:::warning
Approving a base image in a project is applied across the **entire account**. Once approved, the base image is considered trusted throughout the account, including all organizations and projects even those you may not have direct access to. Be aware that the approval will be applied at the account level.
:::

A base image can only be approved in the project where it was last scanned. If you try to approve it elsewhere, the approval will not take effect.  

<details>
    <summary>Identify the Correct Project to Approve</summary>

To identify the correct project:  
1. Go to your pipeline execution window.  
2. Switch to **Vulnerabilities** tab.  
3. Open the issue details of a vulnerability labeled with `Base`.  
4. Check the **Base Origin** field. This field displays the project name where the base image was last scanned.  

For example, the **Base Origin** might appear as: `Base_Image_testing_2/baseimagescan/openjdk` This aligns with the format `OrgName/ProjectName/TargetName`. So you can approve the base image in `Base_Image_testing_2` project.

<DocImage path={require('../static/view-base-origin.png')} width="80%" height="80%" />  

</details>


To approve a base image, follow the steps:  

1. Go to **Test Targets** page from left navigation.  
2. Find your base image(target) in the list. (for example, `library/debian`).  
3. Click the ellipsis menu on the right and select **Approve Base Image**.  
   <DocImage path={require('../static/approve-base-image.png')} width="80%" />  
4. In the dialog, select one or more tags of the base image to approve (for example, `bookworm-slim`).  
   <DocImage path={require('../static/approve-base-image-dialog.png')} width="60%" />  
6. Click **Submit**.  

To unapprove a base image, you can follow the same steps and deselect the tags you want to unapprove and click **Confirm**. The approval or unapproval takes effect from the next pipeline execution.  


### How to view Vulnerabilities from Approved Base Image

To view the vulnerabilities associated with the approved base image, follow these steps:

:::note
Before proceeding, make sure that:  
- You have completed all the [prerequisites for base image detection](/docs/security-testing-orchestration/set-up-scans/container-scanning/base-image-vulnerabilites/base-image-detection#prerequisites).  
- You approved the image by following the steps in [How to Approve a Base Image](#how-to-approve-a-base-image). Once approved, the approval will take place from the next pipeline execution after the approval.
:::

1. Go to **Security Testing Orchestration** module.
2. Go to **Execution** page from the left navigation.
3. Find the pipeline execution with your container image scanning and open it.
4. Go to **Vulnerabilities** tab.
5. You will see the vulnerabilities from approved base image marked with a **green** `Base Image` label.


<DocImage path={require('../static/issues-from-approved-base-image.png')} width="90%" height="90%"/>

### Policies for Vulnerabilities from Application and Base Images

You can enforce policies on vulnerabilities from both application layers and base images by using the step output variables of your scanner step. Refer to [Step Output Variables for App and Base Image Vulnerabilities](/docs/security-testing-orchestration/set-up-scans/container-scanning/base-image-vulnerabilites/base-image-detection#step-output-variables-for-app-and-base-image-vulnerabilities) for details.

Depending on your use case, you can apply the following sample policies:  
- [Warn or Block Vulnerabilities from Application Layer](/docs/security-testing-orchestration/policies/create-opa-policies#warn-or-block-vulnerabilities-from-application-layers-of-your-container-image): Use this policy to enforce actions on vulnerabilities originating from the application layers of the container image.  
- [Warn or Block Vulnerabilities from Base Image](/docs/security-testing-orchestration/policies/create-opa-policies#warn-or-block-vulnerabilities-from-base-image-of-your-container-image): Use this policy to check if the base image is approved. If it is not approved, you can configure the policy to warn or block vulnerabilities from the base image.  

