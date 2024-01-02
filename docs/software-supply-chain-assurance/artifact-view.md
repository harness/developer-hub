---
title: Artifact View
description: Track the deployment of your open-source components
sidebar_position: 70
---

Artifact View in SSCA provides a centralized interface for tracking the usage of open-source components in your artifacts from build to deployment. When SBOM is generated for an artifact, SSCA module normalizes the SBOM data and associates it with the specific artifact tag to give a detailed view of all the components used in the artifact. Artifact View also provides you the deployment data for each artifact to help you track the usage of components till the environments where they are deployed.

## Landing Page

The landing page displays a list of all artifacts, including their versions, associated SBOM, deployment environments, and detected policy violations. This list view offers a snapshot of each artifact's current state in the software supply chain.

<DocImage path={require('./static/artifact-landing-page.png')} />

### Filters

DocImage
Filters on the landing page allow users to quickly find specific artifacts based on various criteria such as component name and version, license, deployment status, and policy violations. These filters enhance the efficiency of tracking and managing artifacts.

## Artifact Details Page

Click on any artifact version to view the Artifact Details page. The Artifact Details Page provides in-depth information about a selected artifact version. It's a detailed view that includes tabs for different aspects of the artifact, offering a deeper dive into its composition and deployment

### Component View

This tab provides detailed information about the components that make up the artifact. It lists each component, its version, associated licenses, package manager, purl, and supplier. This tab is crucial for understanding the artifact's makeup and identifying potential security or compliance issues.

<DocImage path={require('./static/artifact-details-page.png')} />

### Deployment View

The Artifact Deployment Tab shows where and how the artifact is currently deployed across different environments. Deployment View also provides with the information about the pipeline that used to deploy the artifact and any policy violations that we detected during the enforcement step

<DocImage path={require('./static/artifact-deployment-view.png')} />
DocImageDocImage
