---
title: Snyk Open Source scanning
description: Use Harness STO to perform Snyk Open Source scan
sidebar_position: 14
# redirect_from:
---

The Snyk step in Harness STO identifies and fixes vulnerabilities in your project's dependencies, including both direct and transitive ones. This document will guide you through configuring the Snyk step in your pipeline for [Snyk Open Source](https://docs.snyk.io/scan-using-snyk/snyk-open-source) scanning, using either the orchestration or ingestion scan modes in STO.

- [**Orchestration mode**](#snyk-open-source-scan---orchestration-mode): In this mode, the Snyk step [runs the scan](/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto), then normalizes and deduplicates the results.
- [**Ingestion mode**](#snyk-open-source-scan---ingestion-mode): In this mode, the Snyk step [reads scan results](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline) from a data file, normalizes the data, and deduplicates it.

## Build requirements for Snyk Open Source scanning
To perform a Snyk Open Source scan, you need to execute the command `snyk test` on your project. In the case of Orchestration, the Snyk step does this automatically for you. For Ingestion, you’ll need to run this command through a Run step. The `snyk test` command attempts to autodetect your project type by searching for a manifest file. Depending on your project, this file might be `package-lock.json`, `yarn.lock`, `pom.xml`, or another type. For more details on the files Snyk uses to detect your project type, refer to the [Snyk documentation](https://docs.snyk.io/snyk-cli/scan-and-maintain-projects-using-the-cli/snyk-cli-for-open-source#files-snyk-uses-to-detect-the-project-type).

Depending on your project type and requirements, you may need to build your project before the pipeline executes the Snyk Open Source scan. You can use a Run step to build your project.

Refer to the table below to determine whether your project requires a build for successful scanning. For Orchestration mode, If a build is necessary, continue from the section [Build your project using the Run step](#build-your-project-using-run-step). If not, you can skip that section and proceed directly to [Configure the Snyk step for Open Source scanning](#configure-snyk-step-for-open-source-scanning).

<details open>


<summary>Build requirements for Snyk Open Source scanning</summary>

| Language | Project Type | Build Required | Notes |
|---|---|---|---|
| JavaScript | npm | No* | Build only required if no `package-lock.json` file present; run `npm install` to generate. |
| JavaScript | Yarn | No* | Build only required if no `yarn.lock` file present; run `yarn install` to generate. |
| Java | Maven | Yes | Run `mvn install` before testing. |
| Java | Gradle | No |  |
| .NET | NuGet | Yes | [Orchestration mode](#snyk-open-source-scan---orchestration-mode) is not supported at the moment. Please use [Ingestion mode](#snyk-open-source-scan---ingestion-mode) instead. |
| Python | Pip | Yes | [Orchestration mode](#snyk-open-source-scan---orchestration-mode) is not supported at the moment. Please use [Ingestion mode](#snyk-open-source-scan---ingestion-mode) instead. |
| Python | Setup.py | Yes | [Orchestration mode](#snyk-open-source-scan---orchestration-mode) is not supported at the moment. Please use [Ingestion mode](#snyk-open-source-scan---ingestion-mode) instead. |
| Python | Poetry | No* | Build only required if no `poetry.lock` file present; run `poetry lock` to generate. |
| Ruby | Bundler | No* | Build only required if no `Gemfile.lock` file present; run `bundle install` to generate. |
| PHP | Composer | No* | Build only required if no `composer.lock` file present; run `composer install` to generate. |
| Scala | SBT | Yes | [Orchestration mode](#snyk-open-source-scan---orchestration-mode) is not supported at the moment. Please use [Ingestion mode](#snyk-open-source-scan---ingestion-mode) instead. |
| Go | Go Modules | Yes | [Orchestration mode](#snyk-open-source-scan---orchestration-mode) is not supported at the moment. Please use [Ingestion mode](#snyk-open-source-scan---ingestion-mode) instead. |
| Swift/Objective-C | CocoaPods | No* | Build only required if no `Podfile.lock` file present; run `pod install` to generate.|

 **Notes:**

*  \* indicates languages where Snyk can typically infer dependencies without building the project, but a build might be necessary depending on specific project configurations.
* Refer to the official Snyk documentation for more details on language-specific [requirements and troubleshooting](https://docs.snyk.io/snyk-cli/scan-and-maintain-projects-using-the-cli/snyk-cli-for-open-source/open-source-projects-that-must-be-built-before-testing-with-the-snyk-cli).

</details>

## Snyk Open Source scan - Orchestration mode
The Snyk Open Source scan may require your project to be built beforehand. Check the [Build requirements for Snyk Open Source scan](#build-requirements-for-snyk-open-source-scanning) to see if a build is necessary. If your project doesn’t need a build, you can skip the [Build your project using the Run step](#build-your-project-using-run-step) section.

### Build your project using Run step
Depending on your project type, you can use a Run step to build your project. Refer to the [table](#build-requirements-for-snyk-open-source-scanning) for more details. Ensure this is configured before the Snyk step in your pipeline.

1. Add the **Run** step to your pipeline.
2. Set the **Shell** field to `sh`.
3. In the **Command** field, enter the command to build your project. This will vary based on your project type. For example, use `npm install` or `yarn install` for JavaScript projects.
4. Under **Optional Configuration**, configure your container registry and the image that facilitates your project build.
    1. Set the **Container Registry** using Harness connectors.
    2. Enter the **Image** name needed for the build process.
5. Apply the changes and save the pipeline.
6. You can now configure the **Snyk** step to perform the Snyk Open Source scan.

<DocImage path={require('./static/snyk-os-orchestration-build-with-run.png')} width="40%" height="40%" title="Click to view full size image" />


### Configure Snyk step for Open Source scanning

To perform Snyk Open Source scanning with orchestration scan mode, follow the below steps:

1. Search and add the **Snyk** step to your pipeline. You can use this step in **Build** stage or **Security** stage.
2. In the step configuration, set the following fields
    1. Set the [**Scan Mode**](./snyk-scanner-reference#scan-mode) to **Orchestration**
    2. Under [**Target**](./snyk-scanner-reference#target), set the **Type** to **Repository**
    3. Set the [**Scan Configuration**](./snyk-scanner-reference#scan-configuration) to **Snyk Open-Source**
    3. For [**Target and Variant Detection**](./snyk-scanner-reference#target-and-variant-detection) it's preferred to use **Auto** option or you can define them using the **Manual** option.
    5. Under [**Authentication**](./snyk-scanner-reference#authentication), pass your Snyk API as Harness secret, for example: `<+secrets.getValue("snyk_api_token")>`

<DocImage path={require('./static/snyk-os-orchestration-step.png')} width="40%" height="40%" title="Click to view full size image" />

Refer to [Snyk step configuration](./snyk-scanner-reference.md) document to learn more about all the fields and their configurations.

## Snyk Open Source scan - Ingestion mode

In the Ingestion scan mode, the Snyk step reads data from a file, normalizes it, and deduplicates it. To perform a Snyk Open Source scan using the Ingestion scan mode, we will use two steps:

1. **Run step**: Scan the repository with Snyk CLI and save the output to a shared folder. You can also install the dependencies if required.
2. **Snyk step**: To ingest the scan results from the output.

<DocImage path={require('./static/os-ingestion-overivew.png')} width="50%" height="50%" title="Click to view full size image" />

### Requirements

1. Configure your code repository in your stage, you can do it in the **Build** stage or **Security** stage
2. Go to the **Overview** tab of the stage. Under **Shared Paths**, enter the following path: `/shared/scan_results`, this will be the location where the Run step will save the scan results.


### Configure Run step
1. Add the **Run** step to the pipeline and open the step configuration.
2. In the **Container Registry** section, set your DockerHub connector. Snyk images will be pulled from their DockerHub account.
3. For **Image**, use a supported [Snyk image](https://hub.docker.com/r/snyk/snyk) based on your project type and language. For example, use `snyk/snyk:node` for a Node.js project.
4. Set the **Shell** field to `sh`
5. In the **Command** field, enter the following command.

        ```
        # Build the project
        npm install

        # Snyk Open Source scan

        snyk  --file=SubSolution.sln  test \   --sarif-file-output=/shared/scan_results/snyk_scan_results.sarif || true
        snyk monitor --all-projects | true
        ```
    Note: The command to build your project depends on its type. Refer to the [table](#build-requirements-for-snyk-open-source-scanning) to determine if your project requires a build.
6. In **Optional Configuration**, under **Environment Variables**, add a variable to access your Snyk API key: \
SNYK_TOKEN = `<+secrets.getValue("snyk_api_token")>`
7. In **Advanced** tab under **Failure Strategies**, set the Failure Strategy to **Mark as Success**. This step is required to ensure that the pipeline proceeds if Snyk finds a vulnerability. Otherwise, the build exits with an error code before STO can ingest the data.

<DocImage path={require('./static/snyk-os-Ingestion-build-and-scan.png')} width="50%" height="50%" title="Click to view full size image" />

### Configure Snyk step

1. Add the **Snyk** step and open the step configuration.
2. Set the [**Scan Mode**](./snyk-scanner-reference#scan-mode) to **Ingestion**.
3. Set the [**Target Type**](./snyk-scanner-reference#target) to **Repository**.
4. For [**Target and Variant Detection**](./snyk-scanner-reference#target-and-variant-detection), define them with the **Manual** option selected.
5. In the **Ingestion File** field, enter `/shared/scan_results/snyk_scan_results.sarif`.
6. Apply your changes, save the configuration, and run the pipeline.

<DocImage path={require('./static/snyk-os-Ingestion-step.png')} width="50%" height="50%" title="Click to view full size image" />

Refer to [Snyk step configuration](./snyk-scanner-reference.md) document to learn more about all the fields and their configurations.