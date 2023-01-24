---
title: Preprocess Tanzu Artifacts to Match Supported Types
description: Currently, this feature is behind the Feature Flag CF_CUSTOM_EXTRACTION. Contact Harness Support to enable the feature.. Harness supports the most common Tanzu Application Services (formerly PCF) art…
sidebar_position: 180 
helpdocs_topic_id: xpeb2raihj
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `CF_CUSTOM_EXTRACTION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. Harness supports the most common Tanzu Application Services (formerly PCF) artifact package types.

If your artifact doesn't match the supported types, you can run a script to preprocess the artifact (unzip, untar, etc). Preprocessing occurs when setting up the app during deployment.

### Before You Begin

* [Add Container Images for Tanzu Deployments](add-container-images-for-pcf-deployments.md)
* [Create a Basic Tanzu Deployment](create-a-basic-pcf-deployment.md)
* [Pivotal Cloud Foundry Quickstart](https://docs.harness.io/article/hy819vmsux-pivotal-cloud-foundry-quickstart)

### Limitations

* Preprocessing is for non-Docker artifacts.

### Review: Supported Artifact Types

Harness supports the following TAS artifact servers/types.

Metadata-only Sources:

* Jenkins
* AWS (Amazon Web Services) S3
* Artifactory (includes Docker)
* Nexus
* Bamboo

File-based Sources:

* Docker Registry
* Artifactory (Tgz files)
* Nexus (Tgz files)
* Google Container Service (GCS)
* AWS Elastic Container Registry (ECR)
* SMB
* SFTP
* Custom Repository

Harness supports any single file (non-folder) deployed using `cf push`. TAR, WAR, JAR, ZIP, and Docker are supported.

### Step 1: Select Preprocessing in App Setup Step

This step assumes you've created a TAS Workflow before. If not, see:

* [Create a Basic Tanzu Deployment](create-a-basic-pcf-deployment.md)
* [Create a Canary Tanzu Deployment](create-a-canary-pcf-deployment.md)
* [Create a Blue/Green Tanzu Deployment](create-a-blue-green-pcf-deployment.md)

Open the **App Setup** step in the Workflow.

Select **Pre-Process Package for TAS Deployment**. The script option appears.

### Step 2: Add Preprocessing Script

Enter a script to perform preprocessing on the downloaded artifact before deployment.

Reference the downloaded artifact using the expression `${downloadedArtifact}`.

For example:


```
tar -xvf ${downloadedArtifact}
```
Copy the processed artifact to a directory using `${processedArtifactDir}`.

For example:


```
cp myfolder/helloworld.war ${processedArtifactDir}
```
The entire preprocessing script might look like this:


```
tar -xvf ${downloadedArtifact}  
  
cp myfolder/helloworld.war ${processedArtifactDir}
```
Let's look at another example:

Let's say you have a zip archive that contains a folder named **myArtifact**. Inside the myArtifact folder is an artifact named **myArtifact.war**.

You unzip the archive:


```
unzip ${downloadedArtifact}
```
Once you unzip the archive the result is **myArtifact/myArtifact.war**.

Next, you need to copy myArtifact.war to a directory. The directory is identified using the expression `${processedArtifactDir}`.

For example:


```
cp myArtifact/myArtifact.war ${processedArtifactDir}
```
### Step 3: View the Preprocessing in the Deployment Logs

When you deploy the Workflow the preprocessing is shown in the logs for the **App Setup** step.

Here's an example:


```
# Executing artifact processing script:   
._package2  
package2/  
package2/._index.js  
package2/index.js  
package2/._package.json  
package2/package.json  
SUCCESS
```
### See Also

* [Add Container Images for Tanzu Deployments](add-container-images-for-pcf-deployments.md)

