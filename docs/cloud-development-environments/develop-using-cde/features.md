---
title: Implementing "Features" in Gitspaces
description: Learn more about configuring Dev Container Features for your Gitspace. 
sidebar_position: 2
sidebar_label: Dev Container Features
---

This guide takes you through the detailed steps to implement **"Features"** in your Gitspaces. Let’s dive deeper into the process.

## What are "Features"?
**Features** are self-contained, modular units of installed code and configuration designed to enable new development capabilities in your development container. 

Implementing features enables you to add and automate the installation of additional tooling, runtime, or library "features" into your development container quickly and easily. These features are installed on top of your base image (as defined in your `devcontainer` metadata), providing added functionality.

## Structure of a Feature
A **Feature** is a self-contained entity located in a folder that includes:
- `devcontainer-feature.json`: Defines metadata about the feature.
- `install.sh`: The entrypoint script for the feature.

Additional files are allowed and packaged alongside these required files.

For more details on the properties supported in the `devcontainer-feature.json` file, refer [here](https://containers.dev/implementors/features/).

## Defining "Features" in your Gitspace
You can define a Feature in your Gitspace by referencing it in the `devcontainer.json` file under the top-level `“features”` object.

**Key considerations**:
- You can define multiple features.
- Features can be arranged in a specific installation order following the rules and implementation guidelines.

### Adding "Features" to `devcontainer.json`
A feature is defined as a **key-value pair**, where:
- **Key**: A unique feature identifier specifying how the feature will be located and downloaded.
- **Value**: An object containing options, which are passed as environment variables.

To reference a feature into your **devcontainer**, use the following key-value format:
```
"features": { "key": "value" }
```

The key must refer to either:
- A feature published to an **OCI registry**.
- A feature **Tarball**

The value can be a **string** or **boolean** and must align with what is expected in the ``devcontainer-feature.json`` file. If the features property value is a single string, it is mapped to an **option** called ``version``.

### Referencing Features
While referencing features, ensure that the feature originates only from the **following valid sources** and that the **feature ID** follows the specified format:
| **Source**    | **Type** | **Example** |
| -------- | ------- | ------- |
| Reference to Feature in OCI Registry | ```<oci-registry>/<namespace>/<feature>[:<semantic-version>]``` | ghcr.io/user/repo/go ghcr.io/user/repo/go:1 ghcr.io/user/repo/go:latest | 
| Direct HTTPS URI to a tarball | ```https://<uri-to-feature-tgz>``` |  https://github.com/user/repo/releases/devcontainer-feature-go.tgz | 

For more details on referencing features, refer to this [guide](https://containers.dev/implementors/features/#referencing-a-feature) here. 

## Example Feature Reference
Here's an example feature reference for your `devcontainer.json` file:

```
"features": {
  "ghcr.io/user/repo/go": {},
  "ghcr.io/user/repo1/go:1": {},
  "ghcr.io/user/repo2/go:latest": {},
 "https://github.com/user/repo/releases/devcontainer-feature-go.tgz": {
        "optionA": "value"
  }
}
```

:::info
**Note**:
- The **:latest** version annotation is added implicitly if omitted.
- To pin to a specific package version, append the version to the end of the feature identifier.

:::

## Feature Installation Order
**Features** are installed on top of a base image in a predefined order. If any of the following properties are provided in the Feature’s `devcontainer-feature.json` or the user’s `devcontainer.json`, the order indicated by these properties is respected:
- The **`dependsOn`** property defined in a Feature’s `devcontainer-feature.json`
- The **`installsAfter`** property defined in a Feature’s `devcontainer-feature.json`
- The **`overrideFeatureInstallOrder`** property in the user’s `devcontainer.json`

Users can control the order of execution of their features by using the `overrideFeatureInstallOrder` property in their devcontainer.json.

### Using `overrideFeatureInstallOrder` in `devcontainer.json`
The `overrideFeatureInstallOrder` property in `devcontainer.json` is an array of Feature IDs that are to be installed in a descending priority order. 

Here’s how you can add this property:
```
"overrideFeatureInstallOrder": [
  "ghcr.io/user/repo/feature1",
  "ghcr.io/user/repo/feature2"
]
```

## Authoring your Own Features
You can also create and author your own features by following the [detailed guide](https://containers.dev/implementors/features/).





