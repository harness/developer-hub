---
title: Harness Cloud VM Images
description: Reference for VM images on Harness Cloud Machines
sidebar_position: 4
---

Harness-hosted VM images are available for multiple operating systems and architectures, providing you with a clean, consistent environment for building, testing, and deploying your applications. Each job runs on a fresh virtual machine instance, ensuring isolation and preventing interference among builds.

For comprehensive details about what's included in each VM image, including installed software, tool versions, and system specifications, refer to [this repository](https://github.com/wings-software/harness-docs/tree/main/harness-cloud).

## Available VM images

Harness provides VM images for multiple operating systems and architectures:

| Virtual machine image | Image label | Notes |
|----------------------|-------------|-------|
| [Linux ARM Ubuntu 22.04](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-arm/Ubuntu2204-Readme.md) | `ubuntu-22.04` | Default Linux image for Linux ARM |
| [Linux AMD Ubuntu 22.04](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-amd/Ubuntu2204-Readme.md) | `ubuntu-22.04` | Default Linux image for Linux AMD |
| [macOS 14 (Sonoma)](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-14-Readme.md) | `macos-14` | Latest macOS |
| [Windows Server 2022](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2022-Readme.md) | `windows-2022` | Latest Windows 2022 Server Image |

### Using preinstalled software

Harness-hosted VM images include a comprehensive set of preinstalled software packages, development tools, and runtime environments. This eliminates the need to install common dependencies during your pipeline execution, significantly reducing build times.

**You can customize the Harness Cloud build environment.** In your pipelines, you can [select specific versions of pre-installed tools](#specify-versions), ensure that a step [uses a specific version every time](#lock-versions-or-install-additional-tools), or [install additional tools and versions](#lock-versions-or-install-additional-tools) that aren't preinstalled on the Harness Cloud images. You can run these steps on the host machine or as separate Docker containers.

## Pre-installed Software Version Management

### Specify versions

If a Harness Cloud image has multiple versions of a tool pre-installed, you can specify the version that you want to use in a step's **Command**. For example, with the Harness Cloud macOS build infrastructure, you could use the following command in a [Run step](/docs/continuous-integration/use-ci/run-step-settings) to select an Xcode version:

```
sudo xcode-select -switch /Applications/Xcode_15.1.0.app
```

:::warning

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, make sure you [lock versions](#lock-versions-or-install-additional-tools) to prevent your pipeline from failing when the image changes.

:::

### Lock versions or install additional tools

If your build requires a specific version of a tool or you need to use a version/tool that isn't pre-installed on the [Harness Cloud image](#platforms-and-image-specifications), you must add a step (such as a [Run step](/docs/continuous-integration/use-ci/run-step-settings) or [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci/)) to install the version/tool directly on the build machine or run a Docker image that has the required version/tool.

When installing additional tools, run `apt-get update` before installing new software that might not be in the packages list.

<details>
<summary>Example: Use an Action step to setup Java</summary>

In the following YAML example, an [Action step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step.md) runs the `actions/setup-java` GitHub Action to install a Java version, and then the **Run** step confirms the Java version.

```yaml
            steps:
              - step:
                  identifier: install_java
                  name: intall java version 17
                  type: Action
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      distribution: 'temurin'
                      java-version: '16'
              - step:
                  identifier: java_ver_check
                  name: java version check
                  type: Run
                  spec:
                    shell: Bash
                    command: |
                      JAVA_VER=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
                      if [[ $JAVA_VER == 16 ]]; then
                        echo successfully installed $JAVA_VER
                      else
                        exit 1
                      fi
```

:::tip

You can also use the [Bitrise step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-bitrise-plugin) to run Bitrise Workflow Steps in your CI pipelines.

:::

</details>

<details>
<summary>Example: Use a Docker image</summary>

The following YAML example demonstrates how a **Run** step can use a Docker image to leverage tools that are available on the image without having to install them on the build machine.

```yaml
    - stage:
        name: Print welcome message
        identifier: welcome_message
        type: CI
        spec:
          cloneCodebase: true
          platform: ## Platform properties describe the target machine required by this stage.
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud ## This build runs on Harness-provided infrastructure.
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Welcome
                  identifier: Welcome
                  spec:
                    connectorRef: my_docker_hub  ## Specify a Docker connector to pull an image from Docker.
                    image: alpine ## If no image is specified, the step runs on the host machine.
                    shell: Sh
                    command: Echo "Welcome to Harness CI"
```

</details>

### Verifying software versions

To see the exact versions of preinstalled software on each image, check the detailed specifications in the [Harness Cloud documentation](https://github.com/wings-software/harness-docs/tree/main/harness-cloud). Each image type has its own README file with current software versions and installation details.

Alternatively, if you prefer verifying software versions within your pipeline, refer to the following sample:

```yaml
pipeline:
  name: Check Software Version Pipeline
  identifier: check_software_version_pipeline
  stages:
    - stage:
        name: Check Software Version
        identifier: check_software_version
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  identifier: run_version_check_script
                  name: Check Software Versions
                  type: ShellScript
                  timeout: 10m
                  spec:
                    shell: Bash
                    source:
                      type: Inline
                      spec:
                        script: |-
                          echo "===== Software Version Check ====="
                          echo

                          # Node.js and NPM
                          echo "Node.js Version:"
                          node --version || echo "Node.js not installed"
                          echo

                          echo "NPM Version:"
                          npm --version || echo "NPM not installed"
                          echo

                          # Python
                          echo "Python Version:"
                          python --version || echo "Python not installed"
                          python3 --version || echo "Python3 not installed"
                          echo

                          # Java
                          echo "Java Version:"
                          java -version || echo "Java not installed"
                          echo

                          # Docker
                          echo "Docker Version:"
                          docker --version || echo "Docker not installed"
                          echo

                          # Git
                          echo "Git Version:"
                          git --version || echo "Git not installed"
                          echo

                          # Maven
                          echo "Maven Version:"
                          mvn --version || echo "Maven not installed"
                          echo

                          # Gradle
                          echo "Gradle Version:"
                          gradle --version || echo "Gradle not installed"
                          echo

                          # Go
                          echo "Go Version:"
                          go version || echo "Go not installed"
                          echo

                          # Ruby
                          echo "Ruby Version:"
                          ruby --version || echo "Ruby not installed"
                          echo

                          # Operating System
                          echo "Operating System:"
                          uname -a || echo "uname command not available"
                          cat /etc/os-release 2>/dev/null || echo "OS release info not available"
                          echo

                          echo "===== Version Check Complete ====="
            rollbackSteps: []
  description: This pipeline shows if specific tools are installed on the VM and their images (if available).
  projectIdentifier: YOUR_PROJECT_IDENTIFIER
  orgIdentifier: YOUR_ORG_IDENTIFIER
```

## Installing additional software

While Harness VM images come with many tools preinstalled, you may need to install additional software specific to your project.

### Using package managers

You can install additional packages using the system package manager during your pipeline:

```yaml
steps:
  - step:
      type: Run
      name: Install Dependencies
      identifier: install_deps
      spec:
        command: |
          # Ubuntu/Debian
          sudo apt-get update
          sudo apt-get install -y your-package-name
          
          # CentOS/RHEL
          sudo yum install -y your-package-name
          
          # macOS
          brew install your-package-name
```

### Installing language-specific packages

Install packages using language-specific package managers:

```yaml
steps:
  - step:
      type: Run
      name: Install Language Packages
      identifier: install_lang_packages
      spec:
        command: |
          # Node.js packages
          npm install -g your-package
          
          # Python packages
          pip3 install your-package
          
          # Ruby gems
          gem install your-gem
          
          # Go modules
          go install your-module
```

### Performance considerations

Installing software during pipeline execution increases build time. Consider these approaches for better performance:

- Use preinstalled software when possible
- Cache dependencies between builds when available
- Consider creating custom Docker images for complex dependencies
- Use specific tool versions that are already preinstalled

## Image Versioning and Best Practices

### Understanding Image Tags

Harness VM images use a versioning system to help you balance between getting the latest updates and maintaining build stability:

- **`latest`** - The most recent image with the newest tool versions and updates
- **`latest-1`** - The previous stable image version

### Recommended Pipeline Strategy

To ensure stable production deployments while still benefiting from the latest updates, we recommend the following approach:

Use the `latest` image tag for development, feature branches, and testing pipelines. Use `latest-1` for production pipelines to ensure stability.

To simplify the rollout and management of image tag updates across environments, define your image tag as [a variable at the Account, Org, Project, or Pipeline level](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable/) in Harness.

#### Migration Process

1. **Test with Latest**: Run your development and testing pipelines using the `latest` image
2. **Validate**: Ensure all tests pass and deployments are healthy
3. **Update Production**: Once validated, update your production pipelines from `latest-1` to `latest`
4. **Monitor**: Keep an eye on production builds after the update

:::warning
The `latest` image may contain breaking changes or updated tool versions that could affect your build. Always test thoroughly before updating production pipelines.
:::

## Image Updates and Maintenance

Harness regularly updates VM images to include:

- Security patches and OS updates
- Latest versions of popular development tools
- Runtime updates (Node.js, Python, Java, etc.)
- New tools and utilities based on community feedback

## Support and Feedback

For questions, issues, or feature requests related to Harness VM images, contact [Harness Support](https://support.harness.io).