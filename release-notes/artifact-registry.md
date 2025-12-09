---
title: Artifact Registry Release Notes
sidebar_label: Artifact Registry
date: 2025-11-26T16:00
sidebar_position: 1
# toc_max_heading_level: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/artifact-registry/rss.xml" />

The release notes describe recent changes to Harness Artifact Registry.


:::info About Harness Release Notes

- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, and Self-Managed Enterprise Edition release notes.

:::

## 📌 Release Deployment Status by Cluster

**Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.

## November 2025

<!-- ### 2025.11.v2

#### New Features -->


<!-- 
**Metadata Support for Artifacts and Registries**

Now enhance your artifact management with custom metadata! You can now attach key-value pairs to registries, artifacts, and packages, enabling better organization, searchability, and governance across your artifact ecosystem.

**Key capabilities:**
- **Multi-level metadata**: Add metadata at registry, artifact, and package (version) levels
- **Flexible filtering**: Search and filter artifacts using custom metadata attributes
- **Custom attributes**: Track ownership, environment tags, build information, security classifications, and more
- **Enhanced governance**: Maintain audit trails and compliance information with version-specific metadata


:::note
This feature is currently behind the feature flag `HAR_CUSTOM_METADATA_ENABLED`. Contact Harness Support to enable it.
::: -->

### 2025.11.v1

#### New Features

**Artifact Registry management via CLI**

We're thrilled to introduce comprehensive CLI support for Artifact Registry management through the new Harness CLI v1.0.0 (`hc`)! This powerful addition brings the full capabilities of Artifact Registry directly to your terminal, enabling seamless automation and developer-friendly workflows.

<DocImage
  path={require('./static/artifact-registry/reg-list.png')}
  alt="Registry List"
  title="Click to view full size image"
  width="80%"
/>

**What's new:**
- **Registry Management**: List, view, and manage your registries with intuitive commands like `hc registry list` and `hc registry get`
- **Artifact Operations**: Push, pull, and list artifacts across all your registries using `hc artifact` commands
- **Developer-Friendly Aliases**: Save time with short commands - use `hc reg` instead of `hc registry` and `hc art` instead of `hc artifact`
- **Flexible Output Formats**: Get results in JSON, YAML, or table format for easy parsing in scripts and automation pipelines
- **Cross-Project Support**: Work seamlessly across multiple projects with global flags like `--project` and `--org`

Install the new Harness CLI v1.0.0 (`hc`) and authenticate to your account to start managing your registries and artifacts from the command line. Check out our [CLI documentation](https://developer.harness.io/docs/artifact-registry/artifact-registry-cli/manage-artifacts-registries) for detailed examples and best practices.

**Conda Registry Support**

We have added a new registry type, Conda Registry support, for Python and R package management. 

**Key capabilities:**
- **Native Conda client support**: Works with `conda` and `mamba` out of the box
- **Bioconda upstream proxy**: Automatically configured to fall back to Bioconda's public repository, giving you access to thousands of packages
- **Hybrid package management**: Host your private packages while proxying public ones from Bioconda
- **Channel organization**: Organize packages into channels for better version control and distribution

Configure your Conda client to point to your Harness registry, and you're ready to go - private packages are served directly while public packages are fetched from Bioconda automatically (If some custom source is not configured).

Do refer to [Conda Registry Quickstart](https://developer.harness.io/docs/artifact-registry/get-started/quickstart#conda) for more details.


#### Enhancements & Fixes

**Upstream Proxy to aggregate multiple Artifact Registries**

We have enhanced our Artifact Registry experience by allowing it to be configured as an upstream proxy, enabling you to aggregate multiple registries into a single, unified access point. Use any Harness Artifact Registry as an upstream proxy for their respective registry.

When adding an Artifact Registry as an upstream proxy, ensure that registry doesn't have its own upstream proxies configured to avoid circular dependencies.

:::note
This feature is currently behind the feature flag `HAR_SUPPORT_LOCAL_REGISTRY_AS_UPSTREAM_PROXY`. Contact Harness Support to enable it.
:::

To know more about [Set Proxy for Registry](/docs/artifact-registry/manage-registries/configure-registry#set-proxy-for-registry)








## October 2025

### 2025.10.v1

#### Enhancements and Fixes

**Public Registry**

Users can now define the visibility of an artifact registry as **Private** or **Public**. This enhancement allows better control over access to registry contents and image pulls. 
>By default, all registries are created as **Private**.

* **Public registries** make the registry contents and images accessible to all users external to your organization.
* **Private registries** restrict both visibility and image pulls to authorized users or service accounts with valid permissions or tokens.

:::note
To enable public artifact registries, the feature flag **`PL_ALLOW_TO_SET_PUBLIC_ACCESS`** must be activated. Contact **Harness Support** to enable it. After activation, navigate to **Account Settings > Authentication** and enable **Allow public resources** to make your registry publicly accessible.
:::

<DocImage
  path={require('./static/artifact-registry/public-registry.png')}
  alt="Public Registry"
  title="Click to view full size image"
  width="80%"
/>

Check out our documentation to know more about [Creating an Artifact Registry](https://developer.harness.io/docs/artifact-registry/manage-registries/create-registry)


## September 2025

### 2025.09.v2


#### New Features

**Artifact Quarantine**

Protect your software supply chain with **Artifact Quarantine**! You can now quarantine artifacts to prevent them from being used in pipelines or pulled by users. This powerful security feature works hand-in-hand with built-in container scanning and policy enforcement.

<DocImage
  path={require('./static/artifact-registry/quarantine.png')}
  alt="Artifact Quarantine"
  title="Click to view full size image"
  width="80%"
/>

**Key Capabilities:**
* **Manual Quarantine**: Quarantine any artifact with a documented reason via the 3-dot menu
* **Automated Quarantine**: When integrated with Harness Supply Chain Security, artifacts are automatically scanned using AquaTrivy, and Security Tests policy sets can automatically quarantine artifacts based on vulnerability severity
* **Easy Management**: Remove artifacts from quarantine when they're safe to use again

This feature is available for Docker and Helm registries and provides an essential layer of protection to ensure only secure, compliant artifacts make it into your production environments.

:::note
This feature requires the feature flag **`HAR_ARTIFACT_QUARANTINE_ENABLED`**. Contact Harness Support to enable it.
:::

Learn more: [Artifact Quarantine](https://developer.harness.io/docs/artifact-registry/manage-artifacts/artifact-management#quarantine-an-artifact)

**Digest Viewing / Image Referencing**

Harness Artifact Registry now provides complete visibility into all your container images with **digest-based viewing** and flexible **tag selection**, giving you more control over how you reference and manage images.

<DocImage
  path={require('./static/artifact-registry/untagged.png')}
  alt="Untagged Images"
  title="Click to view full size image"
  width="80%"
/>

**Untagged Images Made Visible**:
Images without tags now appear clearly in the UI with an **“N/A”** label next to their digest. They remain fully pullable via their digest, so even untagged or cleaned-up images are easy to track and verify. Multi-architecture Docker and OCI images are also grouped neatly by platform, making navigation effortless.


**Flexible Tag and Digest Selection**:
You can now select a **tag or version** for all artifact types directly from the header selector. For Docker and OCI images, you can also select by **digest** to reference an immutable version.

* **Use Tags** to browse familiar labels such as `latest` or `1.25.2`.
* **Use Digests** to pinpoint a specific, unchanging image for verification or debugging.

>Deployment details appear only when a tag is selected.

This enhancement offers a clearer, more dependable way to browse, reference, and inspect your images—whether tagged, untagged, or multi-architecture.

Learn more: [Selecting by Tag](https://developer.harness.io/docs/artifact-registry/manage-artifacts/artifact-details#selecting-by-tag) | [Image Referencing](https://developer.harness.io/docs/artifact-registry/manage-artifacts/find-artifacts#image-referencing)



#### Enhancements and Fixes




**NuGet Visual Studio Integration**

We're excited to provide **Visual Studio integration** for NuGet package management! .NET developers can now configure Harness Artifact Registry as a package source directly within Visual Studio, enabling native IDE integration with secure token-based authentication. 

Configure your registry in Visual Studio and start pulling packages from Harness registries with ease.

Learn more: [Install and Use NuGet Packages](https://developer.harness.io/docs/artifact-registry/get-started/quickstart/#nuget--install-and-use-nuget-packages)


### 2025.09.v1

#### Enhancements and Fixes

- **Delete Version API**: Improved error handling for invalid non-OCI versions. Instead of returning a confusing **500 Internal Server Error**, the API now responds with a clear **404 Not Found**. This makes debugging easier and ensures a more consistent developer experience. *[AH-1302]*

- **List Versions API**: Fixed an issue where requests for unavailable images incorrectly triggered a **500 Internal Server Error**. The API now returns a proper **404 Not Found**, giving developers accurate feedback and reducing troubleshooting time. *[AH-1829]*



