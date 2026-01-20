---
title: Artifact Management
description: Learn how to manage your artifacts.
sidebar_position: 10
---

import DocImage from '@site/src/components/DocImage';


All artifact operations start with the **Setup Client** page found inside your registry at the top right. 

<DocImage path={require('./static/setup-client.png')} />

## Login to your registry

1. Click **Setup Client**.
2. Copy the login command shown.
3. Then, open a terminal window and paste the command.
4. When prompted, enter the login information given in the **Setup Client** tab.
5. If prompted for a password, click **Generate Token** in the **Setup Client** tab. Use this token as your password.

<DocImage path={require('./static/generate-token.png')} />

## Pull an artifact

1. Open the **Setup Client** tab in your registry.
2. Scroll to the bottom and find the **Pull** section.
3. Copy the pull command. It should look something like this: 
4. Run the command in terminal but replace `<IMAGE_NAME>` and `<TAG>` with the name and tag of the image you want to pull.

This first attempts to pull the image from your registry and then any upstream proxies if they exist. 

If you have multiple upstream proxies, the image will be pulled from the top most proxy that has the image in the list. 

## Push an artifact

1. Open the **Setup Client** tab in your registry.
2. Find the **Push** section.
3. Copy the push command. You will need to replace anything with brackets (`<>`) with the relevant artifact information. For example, replace `<TAG>` with the artifact version or tag that you want.
4. Run the command in terminal.

Now, you should see the artifact appear in your registry as well as the **Artifacts** tab in the left navigation panel.



## Quarantine an artifact


:::note
This feature is currently behind the feature flag `HAR_ARTIFACT_QUARANTINE_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

You can quarantine an artifact to prevent it from being used in your pipelines and block it from being pulled or downloaded by other users.

To quarantine an artifact:

1. Navigate to the **Artifacts** tab in the left navigation panel.

<DocImage path={require('./static/artifact-quarantine.png')} />

2. Select the artifact you want to quarantine.
3. Click the 3-dot menu next to the artifact name.
4. Select **Quarantine**.

You will be prompted to provide a reason for quarantining the artifact. Enter your reason and click **Quarantine** to confirm.

you can remove a quarantined artifact by selecting the artifact and clicking **Remove from Quarantine**.

## Download an artifact

You can download artifacts directly from the Harness Artifact Registry UI. Navigate to the desired level (registry, artifact, or version), click the options menu (**⋮**), and select **Download**. 
<DocImage path={require('./static/download.png')} />

The system prepares your download and displays a status indicator at the bottom center of the page. Once ready, a green checkmark appears with a **Download** button to save the compressed archive locally.

**Download levels:**

- **Package level** - Downloads all versions of a specific package (non-OCI packages only)
- **Version level** - Downloads a specific version only
- **Individual files** - In the **Artifact Details** tab under **Files**, click any file to download it directly (no preparation needed)

:::info Important Notes
- **Package type support**: Download is available for non-OCI package types only (Maven, npm, PyPI, Generic, etc.). OCI images (Docker) should be pulled using standard container tools.
- **Stay on the page**: Do not navigate to another tab or close the browser while the download is being prepared, as this will interrupt the process.
- **Download availability**: Once ready, downloads remain available for **24 hours** or until you close the notification.
:::

## See Also

For a more in depth guide on how to pull and push docker artifacts, go to the [Quickstart Guide](/docs/artifact-registry/get-started/quickstart)


