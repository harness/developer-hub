---
title: Versioning in Blueprints
description: Learn how to manage blueprint versions in Harness IDP Environment Management
sidebar_position: 2
sidebar_label: Versioning
---

Proper versioning of blueprints and templates is essential for systematically rolling out improvements across your development lifecycle. Version control enables you to track changes resulting from organisational policy updates, migrations, or patch fixes. Harness IDP Environment Management provides comprehensive versioning capabilities, allowing you to introduce new blueprint versions, deprecate outdated ones, and empower developers to select from active versions when creating environments.

## Understanding blueprint versioning

Blueprint versioning provides a structured approach to managing infrastructure templates over time. Each version represents a specific configuration state, enabling teams to:

- Track and document changes systematically
- Roll out improvements incrementally
- Maintain backwards compatibility for existing environments
- Provide developers with stable, tested configurations

<!-- When you publish a new stable version, environments running on older versions are automatically notified, encouraging teams to adopt the latest improvements whilst maintaining control over when updates occur. -->

## Creating a new blueprint version

When you create a new blueprint version, environments running on older versions receive notifications about the availability of updates, prompting teams to consider upgrading.

To create a new version:

1. Navigate to **Environments > Environment Blueprints**
2. Select the existing blueprint you wish to version

    <DocVideo src="https://app.tango.us/app/embed/bf57cad5-882c-4b2e-855d-93091fe02ef5? 
      skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Save 
        Stable Environment Blueprint Version" />

3. Choose the version you want to modify and make the necessary changes to the blueprint YAML
4. Select **Save as new version** to preserve the changes as a distinct version
5. Provide the new version number, along with an optional description.
6. Mark the version as **stable** if you wish to recommend it for new environment creation

<!-- :::info Stable version notifications
Whenever a new stable version is published, all environments running older versions of that blueprint receive notifications, ensuring teams remain informed about available updates.
::: -->

## Editing an existing blueprint version

You can modify any existing blueprint version by following the steps above (1-3) and selecting **Save** to update the version in place. This approach is useful for correcting minor issues without creating a new version number.

## Viewing all blueprint versions

All versions of a blueprint are accessible through the **Versions** tab within each blueprint view. This centralised location provides an overview of the version history, including version numbers, descriptions, stability status, and creation dates.

## Deprecating or deleting blueprint versions

Version lifecycle management allows you to control which versions remain available for new environment creation:

- **Deprecation** removes a version from the list of options available when creating new environments, whilst maintaining a copy for reference. Deprecated versions are hidden from the blueprint selection interface but remain in the system.
- **Deletion** permanently removes a version from the system. This action is irreversible and should be used with caution.

To deprecate or delete a version:

1. Navigate to the blueprint and select the **Versions** tab
2. Locate the version you wish to manage
3. Open the **Actions** menu and choose either **Deprecate** or **Delete**

## Comparing blueprint versions

<DocImage
  path={require("./static/compare-version.png")}
  alt="Compare Versions"
  caption="Compare Versions"
/>

Version comparison helps you understand the differences between blueprint iterations, making it easier to assess the impact of changes before upgrading environments.

To compare versions:

1. Navigate to the blueprint you wish to examine
2. Select the **Versions** tab
3. Click **Compare Versions** and choose the two versions you want to compare

The comparison view highlights differences in the YAML configuration, helping you make informed decisions about version adoption.

## Creating environments with specific blueprint versions

When creating a new environment, you can select any active (non-deprecated) version of a blueprint, providing flexibility to use either the latest stable version or a specific earlier version that meets your requirements.

To create an environment with a specific blueprint version:

1. Navigate to the **Environments** section and select **Create > Environment**
2. Browse the available blueprints

   <DocImage path={require("./static/env-from-blueprints.png")} alt="Environment from Blueprints" caption="Environment from Blueprints"/>

3. On the blueprint card, open the dropdown menu next to **Use this blueprint** and select your desired version
4. You can also modify the version selection on the subsequent page whilst defining environment details
5. Complete the remaining steps to finalise environment creation

This version selection capability ensures that teams can adopt new blueprint versions at their own pace, balancing innovation with stability requirements.
