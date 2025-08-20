---
title: Harness Cloud VM Images
description: Reference for VM images on Harness Cloud Machines
sidebar_position: 4
---


Harness provides preconfigured virtual machine (VM) images to run your CI jobs in Harness Cloud. These images come with common build tools and dependencies preinstalled, so you can focus on building and testing your code without worrying about setup.

Every CI job runs on a fresh VM, ensuring clean, isolated builds.

To see what’s included in each image, visit the [Harness Cloud VM image repository](https://github.com/wings-software/harness-docs/tree/main/harness-cloud).

## Cloud VM Images



### Available VM Images Image Tags


Harness provides VM images for multiple operating systems and architectures:

| Virtual machine image | Image label | Notes | Rollout Status|
|----------------------|-------------|-------|-----|
| [Linux AMD Ubuntu 22.04](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-amd/Ubuntu2204-Readme.md) | `ubuntu-latest` or `ubuntu-22.04` | Default Linux image for Linux AMD | GA |
| [Linux AMD Ubuntu 24.04](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-amd/Ubuntu2204-Readme.md) | `ubuntu-24.04` | Default Linux image for Linux AMD | GA |
| [Linux ARM Ubuntu 22.04](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-arm/Ubuntu2204-Readme.md) | `ubuntu-latest` or `ubuntu-22.04` | Default Linux image for Linux ARM | GA |
| [Linux ARM Ubuntu 24.04](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-arm/Ubuntu2204-Readme.md) | `ubuntu-24.04` | Default Linux image for Linux ARM | GA |
| [macOS 14 (Sonoma)](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-14-Readme.md) | `macos-latest` or `macos-14` | Latest macOS | GA |
| macOS 14 (Sonoma) with Xcode 16.3| `macos_sonoma_xcode_16.3` | macOS 14 (Sonoma) with Xcode 16.3 | GA |
| [Windows Server 2022](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2022-Readme.md) | `windows-latest` or `windows-2022` | Latest Windows 2022 Server Image |GA |

:::info
**Currently, `ubuntu-latest` points to Ubuntu 22.04**.
To switch latest to Ubuntu 24.04 ahead of the general rollout, contact Harness Support to enable the `CI_ENABLE_HOSTED_BETA_IMAGES` feature flag for your account.
:::


### Choosing an image version 

Harness VM images use a versioning system to help you balance between getting the latest updates and maintaining build stability.

You can:
- Pin to a specific version — e.g., `ubuntu-22.04`, to ensure a consistent environment across builds.
- Use the latest tag — e.g., `ubuntu-latest`, to automatically get the newest tool versions and updates.

To select an the image tag to use, simply provide it in the `imageName` property of the cloud infrastructure `runtime` section.

```yaml
    runtime:
      type: Cloud
      spec:
        size: xxlarge
        imageName: latest # specify image tag
```


### Best Practice: Pin Image Versions in Production

Since using the `latest` tag may contain breaking changes or updated tool versions that could affect your build. Always test thoroughly before updating production pipelines.

To ensure stable production deployments while still benefiting from the latest updates, we recommend the following approach:

1. **Test in Dev**: **Use latest in non-prod** pipelines and confirm everything works with the new image.
2. **Update Prod**: Switch production pipelines to the new image, and **pin image name to a specific version**.


To simplify the rollout and management of image tag updates across environments, we recommend defining the image name as [a variable at the Account, Org, Project, or Pipeline level](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable/) in Harness. This will ensure you can pin your pipeline to a new version globally.


:::warning
The `latest` image may contain breaking changes or updated tool versions that could affect your build. Always test thoroughly before updating production pipelines.
:::

### Image Updates and Maintenance

Harness regularly updates VM images to include:

- Security patches and OS updates.
- Latest versions of popular development tools.
- Runtime updates (Node.js, Python, Java, etc.).
- New tools and utilities based on community feedback.


## Pre-installed Software Version Management

### Using preinstalled software

Harness-hosted VM images include a comprehensive set of preinstalled software packages, development tools, and runtime environments. This eliminates the need to install common dependencies during your pipeline execution, significantly reducing build times.

**You can customize the Harness Cloud build environment.** In your pipelines, you can [select specific versions of pre-installed tools](#specify-versions), ensure that a step [uses a specific version every time](#lock-versions-or-install-additional-tools), or [install additional tools and versions](#lock-versions-or-install-additional-tools) that aren't preinstalled on the Harness Cloud images. You can run these steps on the host machine or as separate Docker containers.


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


## Support and Feedback

For questions, issues, or feature requests related to Harness VM images, contact [Harness Support](https://support.harness.io).