---
title: Code Repositories View
description: A centralized view of all the code repositories with details from SSCA steps results
sidebar_position: 70
---

The "Code Repositories" view in SSCA centralizes and displays critical information about the code repositories involved in SSCA steps. This view provides users with detailed insights into the repositories, including the associated SBOM files, their scores, and the components within the repositories. Importantly, it highlights the allow list and deny list items derived from applying [SBOM Policy Enforcement](./sbom-policies/enforce-sbom-policies.md) to each repository. 

Here’s what it offers:

* **Repository Overview**: Presents a summary of each code repository part of the SSCA steps
* **SBOM File Details**: Provides the option to download the SBOM of the repository. 
* **SBOM Score**: Presents the [score of the SBOM](./sbom/sbom-score.md), providing an assessment of the SBOM quality.
* **Component Listing**: For a given repository, it lists all components included with advanced filters and search capabilities.
* **Policy Enforcement Results**: Highlights the allow list and deny list items which are resulted from the [SBOM Policy Enforcement step](./sbom-policies/enforce-sbom-policies.md).

<DocImage path={require('./static/code-repo-view-home.png')} />

## Filter Features

The view offers three filters to help users quickly and efficiently locate specific data within their code repositories. These filters are based on components, licenses, and policy violations.


### Component-Based Filter

Users can apply a filter based on the component's name and version. By defining the component name and specifying its version, this filter narrows down the repositories to display only those containing the specified component. This is useful for users looking to assess or manage repositories that include certain critical components.

<DocImage path={require('./static/code-repo-filter-component.png')} />

### License-Based Filter

This filter allows users to define conditions based on license details. By inputting the relevant license information, users can filter repositories to display only those that comply with the specified licenses. This feature is essential for ensuring that all code repositories adhere to the organization's licensing policies and for identifying repositories that might require license review or remediation.

<DocImage path={require('./static/code-repo-filter-license.png')} />

### Policy Violations Filter

The policy violations filter helps users identify repositories with SBOM Policy violations. Users can set this filter to show only repositories that have policy violations in either the allow list or deny list of the SBOM Policy Enforcement. This filter is crucial for compliance and security, allowing users to quickly identify and address repositories that do not meet the organization's policy standards.

<DocImage path={require('./static/code-repo-filter-policy.png')} />

## Repository Details Page

Repository details page is accessed by selecting a specific repository within the "Code Repositories" view. This page provides an in-depth overview of the selected repository, including detailed information about the associated SBOM, its score, and the build pipeline from which the SBOM was generated. Importantly, this page highlights all the dependencies/components that are part of the repository.

<DocImage path={require('./static/code-repo-view-details.png')} />

### Components details

This feature provides users with a detailed list of all components that are part of a repository. This gives the user a clear visibility into each component, including the details:



* **Component Name:** Displays the name of each component included in the repository.
* **Version:** Shows the specific version of each component, allowing users can track and manage versioning accurately.
* **License Information:** Provides the license details for each component, helping users ensure compliance with licensing policies.
* **Package Manager:** Indicates the package manager used for each component.
* **PURL and Supplier Details:** Lists the Package URL (PURL) and supplier information.


#### Filter and Search Capabilities:

* **Component-based:** Users can filter components based on their name and version.
* **License-based:** Users can define conditions based on license details to display only components that meet specific licensing criteria.
* **Search by Package Manager:** Enables users to search for components managed by specific package managers.
* **Search by Supplier:** Allows users to search for components based on supplier information.