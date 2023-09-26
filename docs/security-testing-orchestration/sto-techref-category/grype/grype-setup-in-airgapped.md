---
title: Set up Grype in air-gapped environments
description: Set up Grype in air-gapped environments
sidebar_label: Set up Grype in air-gapped environments
sidebar_position: 20
---

This topic describes how to set up Anchore Grype in an air-gapped environment. It is provided as a supplement to [Offline and air-gapped environments](https://github.com/anchore/grype#offline-and-air-gapped-environments) in the Grype documentation. 

## Before you begin

To run Grype scans in an air-gapped environment, you need do the following:

1. Set up a private registry or local file server in your air-gapped environment. You need for your Harness pipelines to access your local container images, Grype databases, support files, and other artifacts. You need a local web server so that the Grype step can request local artifacts via HTTP and HTTPS.

  Documentation about setting up a private registry is outside the scope of this topic. For more information, go to the documentation for the artifact tool you want to use. One popular tool for air-gapped environments is JFrog Artifactory; [this blog post](https://jfrog.com/blog/using-artifactory-with-an-air-gap/) provides a comprehensive overview. 

  <!-- TBD any other external tools we want to mention? I googled around for information about the other artifact repositories we support, or at least have connectors for...Bamboo, Azure Artifacts, Nexus, etc....I didn't find a lot of info about running these tools in air-gapped environments  -->

2. Load local copies of your Harness container images to your private registry. For more information, go to [Configure STO to download Images from a private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

3. Install Grype and set it up to run in your air-gapped environment. For more information, go to the following sections in the Grype documentation: 
   - [Installation](https://github.com/anchore/grype#installation)
   - [Offline and air-gapped environments](https://github.com/anchore/grype#offline-and-air-gapped-environments) 

## Initial setup

Anchore maintains a Grype database of known vulnerabilities and updates it regularly. The Grype scanner uses this database to detect issues when it scans a target. By default, the scanner downloads the latest database from a public URL when it runs a scan. If the local database is stale, the scan fails.  

The Grype container image provided by Harness includes the latest database at the time the image was built. As part of the initial setup, you will configure Grype to use the local database and override (temporarily) the default stale-database check.

To to verify that Grype runs as intended in your air-gapped environment, do the following:

1. Add a CI Build or Security Tests stage to your Harness pipeline.

2. Set up a [Grype step](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference) in the stage. 

3. Add the following settings to the Grype step:

   1. **`GRYPE_DB_AUTO_UPDATE`** = **`FALSE`** Disables downloading a new database.
   2. **`GRYPE_DB_VALIDATE_AGE`** = **`FALSE`** Disables the staleness check for the database.

   ![](../static/grype-airgap-workflow-00.png)

4. Run the pipeline and verify that the local Grype scanner runs correctly.

## Production setup

To run Grype in a production environment, you need to set up a mechanism to transfer the latest Grype  database to your local registry. 

The following steps outline the basic workflow: 
   
1. Add a copy of the latest Grype database to your local registry: 
      1. Download a JSON of the latest databases from this URL:

         ```http
         https://toolbox-data.anchore.io/grype/databases/listing.json
         ```  

         Each database entry in the JSON includes the build date/time, version number, URL, and checksum. 

      2. Download the latest database and upload it to your local registry.    
   
   2. Set up a copy of `listing.json` in your local registry. This file specifies the local Grype databases available for running scans.
      1. Download a copy of the [`listing.json`](https://github.com/anchore/grype/blob/main/grype/db/test-fixtures/listing.json) file from the Grype repository.  
      2. Edit the local file so that it has one entry with the `"built"`, `"version"`, `"url"`, and `"checksum"` values for the database you just uploaded. 

         Here's an example of a local `listing.json`. Note that the `url` now points to a local registry (Artifactory in this example), not the remote URL that you'd use in an online environment. 

         ```json
         {
         "available": {
            "1": [
               {
               "built": "2023-09-24T01:25:55Z",
               "checksum": "sha256:a676908681232596b549934651e65109b11dce1c6a86c034a32110653fd95e71",
               "url": "https://artifactory.myorg.internal:443/artifactory/example-repo-local/grype/vulnerability-db_v1_2023-09-24T01:25:55Z_c1e349e7e8023eb909f4.tar.gz",
               "version": 1
               }
               ]
            }
         }
         ```

      3. Upload the updated `listing.json` to your local registry. 

      For more information about Grype databases, go to [Grype's databases](https://github.com/anchore/grype#grypes-database) in the Grype documentation.
   
   3. Add this setting to the Grype step in your Harness pipeline: 

      - **`GRYPE_DB_UPDATE_URL`** The URL to the `listing.json` in your local registry. For example, `https://artifactory.myorg.internal:443/artifactory/example-repo-local/grype/listing.json`

   4. Run the pipeline again and verify that the Grype step runs as intended.     

2. Before your Grype step is production-ready, you need to configure the Grype scanner to check the database build time and fail the scan if the database is stale. To enable the staleness check, set the following settings in the Grype step as follows:

   1. **`GRYPE_DB_VALIDATE_AGE`** Change this from `FALSE` to `TRUE` to enable the staleness check for the database. (You added this setting as part of the [initial setup](#initial-setup).)
   2. **`GRYPE_DB_MAX_ALLOWED_BUILT_AGE`** The maximum allowable age of a database before it is considered stale and the Grype scan fails. Specify the age using [golang's time duration syntax](https://pkg.go.dev/time#ParseDuration). Valid examples include `24h` (one day) and `120h` (five days). 

<!-- 
TBD 1 When you run a scan with this setup, does Grype use the most recent database specified in `listing.json`?
TBD 2 Any specific guidance for a good max-allowed time? It looks like Grype updates their databases more-or-less daily.
-->

## Update the database (ongoing)

When you run Grype in an air-gapped environment, you must update the database regularly to ensure that your scans check for the latest vulnerabilities. 

To update your system to use the latest database:

   1. Add a copy of the latest Grype database to your local registry: 
      1. Download a JSON of the latest databases from this URL:

         ```http
         https://toolbox-data.anchore.io/grype/databases/listing.json
         ```  

      2. Download the latest archive and transfer it to your local registry.
   2. Update the `listing.json` file in your local registry: add a new entry with the `"built"`, `"version"`, `"url"`, and `"checksum"` values for the database you just added. 
      Make sure you update the `"url"` to point to your local registry. 
 
