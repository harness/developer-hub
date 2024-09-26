---
title: Artifacts
sidebar_position: 3
---

Artifact management starts with **Setup Client**. To find it, do the following:

1. In your project, select **Artifact Registries** and choose your registry.
2. In your registry, select **Setup Client** in the top right.  

In **Setup Client**, you will find instructions on how to:

- Login to your registry
- Push an artifact.
- Pull an artifact. 

:::tip
You will need to login to your registry first before doing any push or pull operations. 
:::

## Artifact management

You can manage the artifacts individually once they have been pushed to the registry.

### Artifact details

Each artifact you upload has three layers. 

#### 1. The artifact

The artifact is the primary object that is being managed and distributed. A list of these artifacts can be found under the **Artifacts** tab in your registry. 

#### 2. The artifact version

Each artifact can have multiple versions indicated by their tag. 

Select your artifact to see all of its versions. 
- This is where you can find commands to [download individual versions](./artifacts.md#pull-a-specific-artifact) of your artifact. 
- The last artifact to be pushed will have the blue label **Latest** on it. 

#### 3. The artifact digest

A digest is a cryptographic hash (usually SHA-256) that uniquely identifies a specific version of the artifact. Unlike tags, which can be mutable (e.g., the latest tag might point to different versions over time), a digest is immutable and guarantees that you’re referencing the exact content as it was at the time of creation.

To see available digests, click the artifact version.
- This will bring up a list of digests for the artifacts that includes details about the artifact such as size or number of downloads. 
- Clicking the digest name will bring up further details about the artifact, including the manifest.

### Pull a specific artifact

If you want to pull a specific version of an artifact, do the following.

1. In your registry, select your artifact under the **Artifacts** tab. 
2. Choose your version. 
3. Copy the **Download Command** for your artifact.
4. Use the **Download Command** where you want to download your artifact. Make sure you are logged into the registry there first. 