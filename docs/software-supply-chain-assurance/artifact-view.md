---
title: Artifact view
description: Track the deployment of your open-source components
sidebar_position: 70
---

Artifact view in SSCA provides a centralized interface for tracking the usage of open-source components in your artifacts from build to deployment. When SBOM is generated for an artifact, SSCA module normalizes the SBOM data and associates it with the specific artifact tag to give a detailed view of all the components used in the artifact. Artifact View also provides you the deployment data for each artifact to help you track the usage of components till the environments where they are deployed.

## Landing page

The landing page displays a list of all artifacts, including their versions, associated SBOM, deployment environments, and detected policy violations. This list view offers a snapshot of each artifact's current state in the software supply chain.

Artifacts originating from container images are organized under the **Container** tab, while artifacts associated with code repositories are similarly displayed within the **Repository** tab.

<DocImage path={require('./static/artifact-landing-page.png')} />

### Filters

Filters on the landing page allow users to quickly find specific artifacts based on various criteria such as component name and version, license, deployment status, and policy violations. These filters enhance the efficiency of tracking and managing artifacts.

## Artifact details page

By selecting any artifact version, you are taken to the Artifact details page. This page provides a thorough overview of the chosen version, encompassing deployment details, SBOM, its score, the build pipeline, and any security vulnerabilities identified during scans. Importantly, the page offers a detailed view of its components and deployments, providing details on artifact's composition and deployment history.

### Component view

This tab provides information about the components that make up the artifact. It lists each component, its version, associated licenses, package manager, purl, and supplier. This tab is crucial for understanding the artifact's makeup and identifying potential security or compliance issues.

<DocImage path={require('./static/artifact-view-components-tab.png')} />

### Deployment view 

This tab offers details into the environments where the artifact has been deployed and the pipeline utilized for deployment. It also includes details about policy violations and the status of SLSA verification.

<DocImage path={require('./static/artifact-view-deployments-tab.png')} />