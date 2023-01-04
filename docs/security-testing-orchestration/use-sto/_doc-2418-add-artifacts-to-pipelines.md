---
title: Add Custom Artifacts to STO Pipelines
description: You can specify exemptions (ignore rules) for specific security issues. An ignore rule allows pipeline builds to proceed even if a security scan detects an issue. 
# sidebar_position: 60
---

In some cases, a scanner might require additional files such as SSL certificates and license files. The following steps describe the high-level workflow.

1) For each artifact that contains sensitive information, such as an SSL certificate, create a Harness secret.

2) Go to the pipeline where you want to add the artifact.

3) In the stage where you will use the artifact, go to **Overview** > **Shared Paths** and create a folder under **/shared** such as **shared/customer-artifacts**. 

:::note
To add a PEM file or other SSL certificate, the shared folder should be **shared/customer-artifacts/certificates**. You can include any number of certificates in this folder.
:::

4) Add a Run step to the stage that adds the artifacts to the shared folder. This step needs to run _before_ the scanner step that uses the artifact. 

### Important Notes

* If the scanner uses an SSL certificate such as a PEM file, save each certificate to **shared/customer-artifacts/certificates/`<certificate_name>`**. You can add any number of certificates to this folder.

* If the scanner requires a license file, save the file to **shared/customer-artifacts/license/`<license_file_name>`** as the shared folder and copy the license file to this folder.  

* If the pipeline runs a ZAP scan that uses context files such as auth scripts, context files, or URL files, specify the following shared folders. 

  * **shared/customer-artifacts/authScript/`<artifact_file_name>`**
  * **shared/customer-artifacts/context/`<artifact_file_name>`**
  * **shared/customer-artifacts/urlFile/`<artifact_file_name>`**
  * **shared/customer-artifacts/hosts/`<artifact_file_name>`**
  
### Example workflow
  
This example outlines the steps required to include two PEM files in a pipeline that runs a SonarQube scan. 

1. For each PEM file, create a secret 

### 


