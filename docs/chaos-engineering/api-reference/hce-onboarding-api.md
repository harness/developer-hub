---
title: HCE Onboard CLI
sidebar_position: 2
description: Describes the HCE onboard CLI and its usage.

---
This section describes the Harness Chaos Engineering (HCE) onboard CLI and its usage.

## What is the HCE onboard CLI?

The `onboard_hce_aws` CLI streamlines and simplifies the HCE onboarding process. This tool also seamlessly integrates with your AWS account and executes HCE experiments. This CLI performs other tasks that streamline the onboarding process, such as:

1. **ChaosInfra Setup:** The CLI installs the chaos infrastructure in the given namespace of your cluster using Harness APIs and Kubernetes permissions. After installation, it tests the activation of the infrastructure for a given timeout (default is 180 s).

2. **Add OIDC Provider:** The CLI can be used to add the OIDC provider in the target account using the AWS credentials. If the given provider already exists, the CLI issues a warning and skips this step.

3. **AWS Roles:** Simplifies configuring HCE with AWS. If you wish to create a dedicated role for HCE, the CLI defines the required policies and permissions directly as CLI flags. Alternatively, if you already have a role, you can provide it as an input, and that role gets attached to the provider that you added previously. In addition, this CLI doesn't depend on other CLIs such as `aws` or `kubectl`.

4. **Annotate Service Account:** The CLI will annotate the experiment service account on the cluster with AWS roleARN after all the configuration is done.

5. **Compatibility:** It provides compatibility across various Windows and Linux versions.

6. **Flag support:** It supports a variety of flags thereby facilitating customization option for every step.

## How to install the onboard HCE AWS?

Onboard HCE AWS offers pre-compiled binaries that are available for download on our [releases page](https://github.com/harness/onboard_hce_aws/releases).

To install, follow these steps.
1. Download the appropriate binary for your platform from the **"Assets"** section.
2. Rename the downloaded file to `onboard_hce_aws` (or `onboard_hce_aws.exe` for Windows).
3. Move this file to your `$PATH` at your preferred binary installation directory.

### For Linux:

* For AMD64 / x86_64:

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./onboard_hce_aws https://github.com/harness/onboard_hce_aws/releases/download/0.0.3/cli-linux-amd64
```

* For Arm64:

```bash
[ $(uname -m) = aarch64 ] && curl -Lo ./onboard_hce_aws https://github.com/harness/onboard_hce_aws/releases/download/0.0.3/cli-linux-arm64
```

* After downloading, add the execution permissions and move it to your binary installation directory using the following commands:

```bash
chmod +x ./onboard_hce_aws
sudo mv ./onboard_hce_aws /usr/local/bin/onboard_hce_aws
```
### For MacOS:

* For Intel Macs:

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./onboard_hce_aws https://github.com/harness/onboard_hce_aws/releases/download/0.1.0/cli-darwin-amd64
```

* For M1 / ARM Macs:

```bash
[ $(uname -m) = arm64 ] && curl -Lo ./onboard_hce_aws https://github.com/harness/onboard_hce_aws/releases/download/0.2.0/cli-darwin-arm64
```

* After downloading, add the execution permissions and move it to your binary installation directory using the following commands:

```bash
chmod +x ./onboard_hce_aws
mv ./onboard_hce_aws /some-dir-in-your-PATH/onboard_hce_aws
```

