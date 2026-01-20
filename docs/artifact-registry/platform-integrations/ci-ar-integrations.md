---
title: Artifact Registry and Continuous Integrations
description: Deep dive into the native integrations between the Artifact Registry and the Continuous Integration module.
sidebar_position: 20
sidebar_label: Continuous Integrations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Learn how to use Artifact Registry with the Continuous Integration (CI) module.

## Build and push to Docker with Artifact Registry
Harness CI offers a [Build and push to Docker](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry) step that allows you to build and push a docker image to any registry. Usually, this requires a connector to the registry you want, but with AR you can connect to a registry directly, within the platform, without any complicated setup. 

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/7892f010-0f5b-4acd-8ad3-9de5426ba386" title="Build and Push Docker Images with Harness Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">
To do so, follow these steps:

1. Navigate to your pipeline, and enter your `Build` stage. 
2. Create a new `Build and Push an image to Docker Registry` step. 
3. `Harness Artifact Registry` is the default registry type. Ensure that it is selected, and move to the next step. 
4. Select your registry under `Registry`. Clicking the field will show a list of available registries. 
5. Once your registry is selected, a list of images will populate under `Image Name`. Choose one, or type the name of a new image that you are building the first time. 
6. Enter any image tags you wish under `Tags`.
7. Click `Apply Changes` at the top right, and you are done! No connectors needed. 
</TabItem>
</Tabs>

## Upload Artifacts to Harness Artifact Registry

Harness CI provides a native **Upload Artifacts to Harness Artifact Registry** step that simplifies the process of publishing artifacts directly to your Harness Artifact Registry. This dedicated step supports multiple package types and eliminates the need for complex scripting or external connectors.

<DocImage path={require('./static/ci-upload-artifact.png')} alt="CI Upload Artifact" title="CI Upload Artifact"  />

The Upload Artifacts step allows you to configure artifact uploads through a simple interface. You can specify the package type, target registry, and source path for your artifacts. The source path typically points to artifacts generated from a previous step in your pipeline, such as a Run step that builds, creates, or downloads packages.

:::info Source Path Configuration
Enter the **Source Path** where your artifact is located:
   - This path typically references the output from a previous step, such as:
     - `/harness/target/*.jar` for Maven artifacts
     - `/harness/example.tar.gz` for npm tarballs
     - `/harness/build/` for Python wheels
   - You can use expressions to reference outputs from earlier steps

**Package-specific requirements:**
- **Generic packages**: Requires explicit package name and version
- **Go packages**: Requires explicit version specification
:::

:::note
The Upload Artifacts step uses Harness CLI internally to upload artifacts to Harness Artifact Registry, ensuring consistent behavior and authentication across all package types.
:::

<details>
<summary>Example YAML</summary>

```yaml
pipeline:
  name: Upload Conda Package to Artifact Registry
  identifier: conda_upload_pipeline
  projectIdentifier: default_project
  orgIdentifier: default
  stages:
    - stage:
        name: Build and Upload
        identifier: build_upload_stage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Download Conda Package
                  identifier: download_conda_package
                  spec:
                    shell: Sh
                    command: |-
                      #!/bin/sh
                      set -e

                      # Configuration
                      PACKAGE_NAME="docutils-stubs"
                      CHANNEL="conda-forge"

                      echo "Fetching metadata for ${PACKAGE_NAME} from ${CHANNEL}"

                      # Fetch package metadata
                      JSON_DATA=$(curl -s "https://api.anaconda.org/package/${CHANNEL}/${PACKAGE_NAME}/files")

                      # Extract the first download URL
                      LATEST_URL=$(echo "${JSON_DATA}" \
                        | grep -o '"download_url": "[^"]*"' \
                        | head -n 1 \
                        | cut -d'"' -f4)

                      # Validate URL
                      if [ -z "${LATEST_URL}" ]; then
                        echo "Failed to retrieve download URL"
                        exit 1
                      fi

                      # Normalise protocol if required
                      case "${LATEST_URL}" in
                        //* ) LATEST_URL="https:${LATEST_URL}" ;;
                      esac

                      FILE_NAME=$(basename "${LATEST_URL}")

                      echo "Downloading ${FILE_NAME}"

                      # Download artifact
                      curl -L "${LATEST_URL}" -o "${FILE_NAME}"

                      # Resolve absolute path
                      FILE_PATH="$(pwd)/${FILE_NAME}"

                      echo "Resolved artifact path: ${FILE_PATH}"

                      # Write output using Harness supported contract
                      echo "FILE_PATH=${FILE_PATH}" >> "${DRONE_OUTPUT}"
              
              - step:
                  type: HarUpload
                  name: Upload to Artifact Registry
                  identifier: upload_to_registry
                  spec:
                    registryRef: my_conda_registry
                    packageType: CONDA
                    sourcePath: <+steps.download_conda_package.output.outputVariables.FILE_PATH>
          platform:
            os: Linux
            arch: Arm64
          runtime:
            type: Cloud
            spec: {}
```
</details>

**Key Points:**

1. **Step 1 (Run):** Downloads a Conda package from conda-forge and outputs the file path using `DRONE_OUTPUT`
2. **Step 2 (HarUpload):** References the output variable from Step 1 using `<+steps.download_conda_package.output.outputVariables.FILE_PATH>` and uploads to the specified registry
3. **Package Type:** Set to `CONDA` to ensure proper indexing in Artifact Registry
4. **Source Path:** Dynamically references the downloaded artifact location from the previous step



## Add a Run or Plugin Step to Your CI Pipeline

Seamlessly reference artifacts stored in Harness Artifact Registry within your CI Run and Plugin steps. This functionality eliminates the need for an external connector, providing a streamlined and user-friendly experience, while enabling efficient and simplified workflows.

<Tabs>
<TabItem value="Interactive guide">
<iframe
    src="https://app.tango.us/app/embed/0e1d0ea7-149b-4ad2-be28-6e63f4114a5f"
    title="Add a run step against a registered artifact in your CI pipeline."
    style={{ minHeight: '640px' }}
    width="100%"
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true">
</iframe>
</TabItem>
<TabItem value="Step-by-step">
To do so, follow these steps:

1. Navigate to your pipeline, and enter your `Build` stage. 
2. Create a new `Run` step. 
3. `Harness Artifact Registry` is the default registry type. Ensure that it is selected, and move to the next step. 
4. Select your registry under `Registry`. Clicking the field will show a list of available registries. 
5. Enter your artifact's `imageName:version`.
6. Add your run command, e.g. `echo "Run step completed".
7. Click `Apply Changes`.

To verify the Run or Plugin step executes as expected, run the pipeline.
</TabItem>
</Tabs>