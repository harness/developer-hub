---
title: Install in an air-gapped environment
description: Install Harness SMP in an air-gapped environment. Start with the quick path for chart 0.41+, or follow four steps (download bundles, push images, push the Helm chart, install). Only the bundle download step varies by chart version.
sidebar_position: 4
redirect_from:
  - /docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-an-air-gapped-environment/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

<DocsTag  backgroundColor= "#4279fd" text="Harness Paid Plan Feature"  textColor="#ffffff"/>

---

Install **Harness Self-Managed Platform (SMP)** in an **air-gapped** network by staging image bundles and a Helm chart, pushing both to **private** registries, then running `helm install`.

## Workstation requirements

- A minimum of 150GB of free disk space to download and extract the Harness air gap bundle

- ECR/GCR/private registry details to tag and push images

- **Kubernetes:** A supported cluster. Go to [Supported Kubernetes versions](/docs/self-managed-enterprise-edition/smp-supported-platforms#supported-kubernetes-versions) to confirm compatibility with Harness SMP.

- Latest version of Helm

- **Helm charts:** Go to the [Harness `helm-charts` releases](https://github.com/harness/helm-charts/releases) to download charts locally when you cannot use a public Helm repo. Image bundle sources differ by chart line; go to [Choose your Helm chart line](#choose-your-helm-chart-line) to match your version.

---

## Choose your Helm chart line

Harness SMP uses three different image bundle delivery methods depending on your chart version. Each change reflects a deliberate improvement in how images are packaged, distributed, or secured.

| Versions | How you get image bundles | Why this method |
| :---- | :---- | :---- |
| **0.41.0+** | Support **manifest.yaml** (signed **downloadUrl** per module; no public bundle URLs) | Harness now ships [Rapidfort](https://www.rapidfort.com/)-hardened images, which are distributed as private images only. The signed `manifest.yaml` provides per-module download URLs tied to your support entitlement instead of a public bucket. |
| **0.38.0 to 0.40.x** | Public [GCP bucket](https://console.cloud.google.com/storage/browser/smp-airgap-bundles) and **Script** or **Manual** in [Step 1](#step-1-download-image-bundles) | Adds the `harness-airgap-images.sh` helper script on top of the per-module bundles, so you can automate loading and pushing images instead of running each step by hand. |
| **0.37.x and earlier** | GCS ***.tgz** per module from the [bundle bucket](https://console.cloud.google.com/storage/browser/smp-airgap-bundles) | Bundles were split per module starting in this line so you only download images for the modules you deploy, instead of pulling one bundle that contains every Harness image. |

---

## Harness installation workflow

1. [Step 1: Download image bundles](#step-1-download-image-bundles) (version-specific; transfer into the air gap if needed)
2. [Step 2: Push images](#step-2-push-images-to-your-private-registry) to your private container registry
3. [Step 3: Download and push the Helm chart](#step-3-download-and-push-the-helm-chart-to-your-private-registry)
4. [Step 4: Install with Helm](#step-4-install-with-helm) with your private registry in `override.yaml`

---

## Step 1: Download image bundles {#step-1-download-image-bundles}

Open the tab for the chart version you want to deploy.

<Tabs defaultValue="0.41">
  <TabItem value="0.37" label="Version 0.37.x and earlier">

### Step 1.1: Download required files

To begin your installation, download the following files:

- **Air gap image bundles:** Go to the [Harness air gap bundle bucket](https://console.cloud.google.com/storage/browser/smp-airgap-bundles) to download module `*.tgz` files for the modules you deploy. For example, if you only deploy Harness Platform, download `platform_images.tgz`. Available image files are:

  - **Chaos Engineering:** `ce_images.tgz`
  - **Cloud Cost Management:** `ccm_images.tgz`
  - **Continuous Delivery & GitOps NextGen:** `cdng_images.tgz`
  - **Continuous Integration:** `ci_images.tgz`
  - **Feature Flags:** `ff_images.tgz`
  - **Harness Platform:** `platform_images.tgz`
  - **Security Testing Orchestration:** `sto_images.tgz`
  - **Software Supply Chain Assurance:** `ssca_images.tgz`

  :::note
  The `platform_images.tgz` file includes NextGen dashboards and policy management enabled by default. The `cdng_images.tgz` file includes GitOps by default.
  :::

- **Push script:** Download [`harness-airgap-images.sh`](https://storage.googleapis.com/smp-airgap-bundles/harness-airgap-images.sh) from the public bundle bucket.

When your bundle `*.tgz` files and `harness-airgap-images.sh` are in place, go to [Step 2: Push images to your private registry](#step-2-push-images-to-your-private-registry). For chart **0.37.x and earlier**, use the **Push individual bundle files** subsection in that step.

  </TabItem>
  <TabItem value="0.38-0.40" label="Version 0.38.0 - 0.40.x">

Use the download flow in this tab for **Helm chart 0.38.0 through 0.40.x** only. For **0.41.0 and later**, public air gap bundles are not published. Open the **Version 0.41.0 and later** tab in [Step 1](#step-1-download-image-bundles) on this page.

### Step 1.1: Download the air gap scripts

Before you start the installation workflow, download the required scripts:

```bash
# Download the download-airgap-bundles.sh and harness-airgap-images.sh scripts
curl -f -s -L -o download-airgap-bundles.sh https://raw.githubusercontent.com/harness/helm-charts/refs/heads/main/src/airgap/download-airgap-bundles.sh
curl -f -s -L -o harness-airgap-images.sh https://raw.githubusercontent.com/harness/helm-charts/refs/heads/main/src/airgap/harness-airgap-images.sh

# Make the scripts executable
chmod +x download-airgap-bundles.sh
chmod +x harness-airgap-images.sh
```

### Step 1.2: Download air gap bundle files

Harness groups air gap components into core modules (like the platform itself) and execution components (like delegates and plugins). This lets you download exactly what you need.

- **Modules:** Core platform services (like `platform`, `ci`, `sto`). Packaged as single `.tgz` files. The download tool automatically resolves dependencies between them.
- **Plugins:** Optional add-ons for specific tasks (like `ci-plugins`).
- **Agents:** Standalone execution components (like `delegate` or `upgrader`).
- **Scanners:** Security scanners for the STO module (like `grype-job-runner`).

Use the `download-airgap-bundles.sh` script to fetch these components. You can run it interactively, pass flags for automation, or download files manually.

### Step 1.3: Choose a download method

<Tabs groupId="smp-airgap-038-bundle-download" defaultValue="script">
<TabItem value="script" label="Script">

#### Step 1.3.1: Interactive mode (recommended)

If this is your first time, run the script without specifying any bundles to use the interactive menu.

```bash
./download-airgap-bundles.sh -v 0.38.0 -o ./airgap-bundles
```

1. **Select modules:** Choose the modules you need (such as `cd` or `ci`). The script automatically selects any required dependencies.
2. **Select plugins, agents, and scanners:** Choose the optional components you want to include. The menu only shows options relevant to the modules you selected in the previous step.

:::tip
**Save selections for automation:** Run the script with the `-g` flag to generate a configuration file:
`./download-airgap-bundles.sh -v 0.38.0 -g my-selection.conf`

Reuse that file later (or in automation) with the `-s` flag:
`./download-airgap-bundles.sh -v 0.38.0 -o ./bundles -s my-selection.conf`
:::

#### Step 1.3.2: Non-interactive mode (automation)

For automated setups, use the `-b` (or `--bundles`) flag to pass a comma-separated list of the exact components you want. This is useful if you only need to update a specific agent or plugin without downloading the entire platform.

**Example: Download the CI module, CI plugins, and delegate**

```bash
./download-airgap-bundles.sh -v 0.38.0 -o ./bundles -b ci,ci-plugins,delegate -n
```

**Example: Download only the delegate**

```bash
./download-airgap-bundles.sh -v 0.38.0 -o ./bundles -b delegate -n
```

</TabItem>
<TabItem value="manual" label="Manual">

If you can't use the download script, manually download the bundles using `gsutil` or `curl`. Go to the [Harness air gap bundle directory](https://console.cloud.google.com/storage/browser/smp-airgap-bundles) to browse objects in the bucket.

**Bundle URL structure:** `https://app.harness.io/public/harness-airgap-bundle/harness-<VERSION>/<PATH>/<MODULE>/[<PLUGIN>|<AGENT>|<SCANNERS>]/<bundle-name>_images.tgz`

- **Modules:** `<MODULE>/<bundle-name>_images.tgz`
  - Example: `https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/platform/platform_images.tgz`
- **Plugins:** `<module>/plugins/<plugin-bundle>_images.tgz`
  - Example: `https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/ci/plugins/ci-plugins_images.tgz`
- **Agents:** `<module>/agents/<agent>.tgz`
  - Example: `https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/platform/agents/delegate.tgz`
- **Scanners:** `sto/scanners/<scanner>.tgz`
  - Example: `https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/sto/scanners/grype-job-runner.tgz`

<details>
  <summary>Option 1: Using `gsutil`</summary>
    <p>
      Go to [Install gsutil](https://cloud.google.com/storage/docs/gsutil_install) in the Google Cloud documentation to install `gsutil`.
      ```bash
      gsutil -m cp \
        "gs://smp-airgap-bundles/harness-0.38.0/platform/platform_images.tgz" \
        "gs://smp-airgap-bundles/harness-0.38.0/ci/plugins/ci-plugins_images.tgz" \
        "gs://smp-airgap-bundles/harness-0.38.0/platform/agents/delegate.tgz" \
        "gs://smp-airgap-bundles/harness-0.38.0/sto/scanners/grype-job-runner.tgz" \
        .
      ```
    </p>
</details>

<details>
  <summary>Option 2: Using `curl`</summary>
    <p>
        Download the images with `curl`:
        ```bash
        curl -f -s -L -o smp-airgap-bundles/platform_images.tgz https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/platform/platform_images.tgz
        curl -f -s -L -o smp-airgap-bundles/ci-plugins_images.tgz https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/ci/plugins/ci-plugins_images.tgz
        curl -f -s -L -o smp-airgap-bundles/delegate.tgz https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/platform/agents/delegate.tgz
        curl -f -s -L -o smp-airgap-bundles/grype-job-runner.tgz https://app.harness.io/public/harness-airgap-bundle/harness-0.38.0/sto/scanners/grype-job-runner.tgz
      ```
    </p>
</details>

For the full **bundle path** table, **STO scanner** file names, and path patterns for manual URLs, go to [Bundle path reference (0.38.0 to 0.40.x)](#reference-bundle-paths) at the end of this page. Go to [`download-airgap-bundles.sh` (0.38.0 to 0.40.x)](#download-airgap-bundles-038) for flag details.

:::info Create output directory first
Create the `smp-airgap-bundles/` directory before you run the `curl` commands.
:::

</TabItem>
</Tabs>

<details>
  <summary>Optional: verify download layout and image lists</summary>

The download script organizes files into a module-based folder tree.

**Example directory structure:**

```text
airgap-bundles/
├── platform/
│   └── platform_images.tgz          # Core Platform Module
├── platform/agents/
│   ├── delegate.tgz                 # Delegate Agent
│   └── upgrader.tgz                 # Upgrader Agent
├── ci/
│   └── ci_images.tgz                # CI Module
├── ci/plugins/
│   └── ci-plugins_images.tgz        # CI Plugins
├── sto/
│   └── sto_images.tgz               # STO Module
├── sto/scanners/
│   ├── grype-job-runner.tgz         # Grype Scanner
│   └── ...
└── ...
```

If you need the exact image list per module, use the `images.txt` asset for your chart when the release publishes it. Go to [Harness `helm-charts` releases](https://github.com/harness/helm-charts/releases) to download it. Headers follow the same module layout as the bundles.
</details>

Continue with [Step 2: Push images to your private registry](#step-2-push-images-to-your-private-registry). For chart **0.38.0 and later**, use the **Push using a bundle directory** path you passed to `-o` (often `./airgap-bundles` or `./bundles`).

  </TabItem>
  <TabItem value="0.41" label="Version 0.41.0 and later">

For **Helm chart 0.41.0 and later**, Harness no longer provides public air gap image bundles. You use a private, Support-provided manifest file with signed `downloadUrl` values per module.

### Step 1.1: Get private manifest from Harness Support

Request the air gap bundle manifest for your target Helm chart version before you begin.

1. Open a case with [Harness Support](https://www.harness.io/support) and request the **air gap bundle manifest** for your **Helm chart version**.
2. Ask for a signed URL validity window that covers your maintenance window.
3. Keep the file off public source control and treat signed URLs as secrets until they expire.

Use this support checklist in your request:

- **Harness account ID:** The account that the manifest is issued for. Find your account ID in any Harness UI URL (`https://app.harness.io/ng/account/<account_id>/...`).
- **Chart version:** Exact Helm chart version (example: `0.41.2`).
- **Signed URL validity window:** Expiry duration that matches your maintenance window.
- **Delivery contact:** Team or alias that receives the manifest file.
- **Retry context:** Mention if this is a refreshed manifest for expired links.

#### Manifest filename

Support delivers the manifest as a YAML file named for your account and chart version:

```text
smp-bundle-manifest-<account_id>-<chart_version>.yaml
```

For example, an account with ID `Y-UFocCmSPynCt0NCxhebg` on chart `0.39.1` receives:

```text
smp-bundle-manifest-Y-UFocCmSPynCt0NCxhebg-0.39.1.yaml
```

:::info Manifest filename in examples
The rest of this page refers to the file as `manifest.yaml` for brevity. When you run the commands below, substitute the actual `smp-bundle-manifest-<account_id>-<chart_version>.yaml` filename Support sent you, or rename the file to `manifest.yaml` locally.
:::

The manifest lists all required modules and their signed URLs. Only the `downloadUrl` values are needed to retrieve bundle archives.

<details>
  <summary>Example manifest shape (redacted)</summary>

```yaml
version: "1.0"
modules:
  platform:
    description: "Core Platform Services"
    bucket_path: "platform"
    downloadUrl: "https://storage.googleapis.com/.../platform_images.tgz?X-Goog-Algorithm=..."
  ci:
    description: "Continuous Integration"
    bucket_path: "ci"
    downloadUrl: "https://storage.googleapis.com/.../ci_images.tgz?X-Goog-Algorithm=..."
```

</details>

### Step 1.2: Download air gap scripts

Use the same helper scripts as in chart 0.38.0 through 0.40.x. Download them from the [Harness `helm-charts` repository](https://github.com/harness/helm-charts):

```bash
curl -f -s -L -o download-airgap-bundles.sh https://raw.githubusercontent.com/harness/helm-charts/refs/heads/main/src/airgap/download-airgap-bundles.sh
curl -f -s -L -o harness-airgap-images.sh https://raw.githubusercontent.com/harness/helm-charts/refs/heads/main/src/airgap/harness-airgap-images.sh

chmod +x download-airgap-bundles.sh
chmod +x harness-airgap-images.sh
```

### Step 1.3: Download module bundles with the private manifest

#### Choose a download method

:::warning
If download URLs return HTTP `403` during this step, they are often expired. Request a refreshed `manifest.yaml` from Support, then retry.
:::

<Tabs groupId="smp-airgap-041-bundle-download" defaultValue="script">
<TabItem value="script" label="Script">

Run `download-airgap-bundles.sh` and pass the path to your manifest with **`-m`**. The script downloads each module's `*.tgz` and preserves the same directory layout that `harness-airgap-images.sh` expects (aligned with the 0.38.0 to 0.40.x public layout).

```bash
./download-airgap-bundles.sh -m /path/to/manifest.yaml -o ./airgap-bundles
```

When your chart version supports them, you can also use the same **interactive** menu, **non-interactive** `-b` and `-n` flags, and **saved** `-g` / `-s` selection files as in the **Version 0.38.0 - 0.40.x** tab. The new input is the manifest file path; there are no other new flags for this flow.

<details>
  <summary>Example script output</summary>

```text
Reading manifest: /path/to/manifest.yaml
Downloading platform_images.tgz ...
Downloading ci_images.tgz ...
Download completed. Bundles saved under ./airgap-bundles
```

</details>

</TabItem>
<TabItem value="manual" label="Manual">

1. Install [yq](https://github.com/mikefarah/yq).
2. Print every signed bundle download URL from the manifest:

   ```bash
   yq '.modules | to_entries | .[] | .value | select(has("downloadUrl")) | .downloadUrl' manifest.yaml
   ```

3. Download each URL with `curl` (or your organization's supported transfer process). Place each `*.tgz` under the same **module folder layout** the script would create (for example `platform/platform_images.tgz`, `ci/ci_images.tgz`), so a later `harness-airgap-images.sh -d` run can find the files. If you are unsure of the expected paths, switch to the **Script** tab and run the download on a connected machine, then copy the resulting directory.

<details>
  <summary>Example file layout after manual download</summary>

```text
platform/platform_images.tgz
ci/ci_images.tgz
sto/sto_images.tgz
```

</details>

</TabItem>
</Tabs>

<details>
  <summary>Optional: verify private bundle layout and checksums</summary>

Confirm that your output directory looks like a typical bundle tree, for example:

```text
airgap-bundles/
├── platform/
│   └── platform_images.tgz
├── platform/agents/
│   ├── delegate.tgz
│   └── upgrader.tgz
├── ci/
│   └── ci_images.tgz
└── ...
```

Optional integrity check:

```bash
find ./airgap-bundles -name "*.tgz" -type f -exec sha256sum {} \;
```

Store the checksum output with your deployment artifacts so you can validate copied files in disconnected environments.
</details>

For `download-airgap-bundles.sh` flags in this flow, go to [`download-airgap-bundles.sh` (0.41.0 and later)](#download-airgap-bundles-041) in the [Reference](#reference). For signed URL errors, go to [Troubleshooting](#troubleshooting-air-gap-downloads).

When downloads are complete, continue with [Step 2: Push images to your private registry](#step-2-push-images-to-your-private-registry). Use **Push using a bundle directory**. Pass the same path to `harness-airgap-images.sh` `-d` that you used for `download-airgap-bundles.sh` `-o` (for example `./airgap-bundles`).

  </TabItem>
</Tabs>

---

## Step 2: Push images to your private registry {#step-2-push-images-to-your-private-registry}

After you download the module bundle `*.tgz` files, use `harness-airgap-images.sh` to load and push images to your private container registry. Pick the tab that matches your chart line.

### Step 2.1: Set Docker architecture

Air gap installation uses amd64 container images. Set the platform on the host that runs the script.

```bash
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

### Step 2.2: Sign in to your private registry

```bash
# Authenticate with Docker for Docker Registry
docker login <registry-url>

# Authenticate with Google Cloud Platform for GCR
gcloud auth login

# Authenticate with AWS for ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin
```

When you work with the public GCS download flow, bundle objects also appear in the [Harness air gap bundles](https://console.cloud.google.com/storage/browser/smp-airgap-bundles) bucket for reference.

<details>
  <summary>Pre-flight check before you push</summary>

- **Registry authentication:** `docker login` (or your cloud provider registry login) succeeds.
- **Bundle path:** The directory that contains your `*.tgz` tree (from your download output path) is the path you will pass to `-d`. Common values include `./airgap-bundles` and `./bundles`, but use your own output directory.
- **Disk capacity:** The host has enough free space to unpack and push the images.
- **Runtime tools:** `skopeo` and `jq` are installed if you use Skopeo mode.

</details>

### Step 2.3: Push images

<Tabs groupId="smp-airgap-push" defaultValue="0.38-plus">
  <TabItem value="0.38-plus" label="Version 0.38.0 and later">

Point `-d` at the same directory that contains the module layout from the download step (the folder that includes `platform/`, `ci/`, and other subfolders, not the top-level `*.tgz` only).

Use Skopeo mode when you can. Skopeo copies images between registries without a Docker daemon and can reduce push times by up to 50%.

#### Skopeo (recommended)

**Prerequisites:** `skopeo` and `jq` are installed on the host that runs the script.

Add the `-s` flag. Set `-r` to your registry, and set `-d` to your download output directory.

```bash
./harness-airgap-images.sh -r my-registry.com/harness -d ./airgap-bundles -s
```

#### Docker (fallback)

If you cannot use Skopeo, run the script without `-s` to use `docker load` and `docker push`. Add the `-c` flag to clean up local Docker images after a successful push.

```bash
./harness-airgap-images.sh -r my-registry.com/harness -d ./airgap-bundles -c
```

  </TabItem>
  <TabItem value="0.37" label="Version 0.37.x and earlier">

For the legacy 0.37.x flow, copy the `*.tgz` you need, then run the script once for each file with the `-f` flag.

```bash
./harness-airgap-images.sh -r REGISTRY.YOURDOMAIN.COM:PORT -f <moduleName-images.tgz>
```

Repeat for each module bundle you want to push (for example `platform_images.tgz`, `ci_images.tgz`).

  </TabItem>
</Tabs>

<details>
  <summary>Looker (`ng-dashboard`) image</summary>

The `ng-dashboard` (Looker) image is not in the standard air gap bundle archives. The script can prompt for Docker Hub credentials, or you can use `-n` to skip the image. If you need access for Looker, contact [Harness Support](https://www.harness.io/support).
</details>

`harness-airgap-images.sh` flag reference: [harness-airgap-images.sh](#harness-airgap-images-reference) in [Reference](#reference).

---

## Step 3: Download and push the Helm chart to your private registry {#step-3-download-and-push-the-helm-chart-to-your-private-registry}

After you push images in [Step 2](#step-2-push-images-to-your-private-registry), download the Harness Helm chart and push it to a repository your air-gapped environment can use (for example a private OCI registry for charts).

- **Helm pull and push:** If your host can reach the public Helm index from a controlled path, add the repo, pull the chart, and push to your private registry in one sequence:

```bash
helm repo add harness https://harness.github.io/helm-charts
helm pull harness/harness
helm push harness-*.tgz oci://private-repo
```

- **Direct download:** Go to the [Harness helm-charts releases](https://github.com/harness/helm-charts/releases) to download the chart package, then copy it into your air-gapped network and push to your private registry with your standard process.

---

## Step 4: Install with Helm {#step-4-install-with-helm}

Install the chart into your cluster and set `override.yaml` so the deployment uses your private image registry and air gap settings.

To install via Helm, do the following:

1. Update the `override.yaml` file with your private registry information.

    ```yaml
    global:
      airgap: true
      imageRegistry: "private-123.com"
    ```

2. Run the Helm install command.

    ```bash
    helm install my-release harness/harness -n <namespace> -f override.yaml
    ```

---

## Troubleshooting {#troubleshooting-air-gap-downloads}

If you hit issues during download or install, expand the topic that matches your symptom.

<Troubleshoot
  issue="Signed air gap bundle downloadUrl in manifest.yaml returns HTTP 403 or the link is expired"
  mode="docs"
  fallback="Signed URLs stop working after the configured validity period. Open a case with Harness Support, request a new manifest.yaml for the same chart release, and state how long the next signed URLs must stay valid. Replace the old file, then download the bundles and push the images again."
/>

---

## Reference {#reference}

### Bundle path reference (0.38.0 to 0.40.x) {#reference-bundle-paths}

When you construct manual download URLs for **0.38.0 through 0.40.x**, replace `<bundle-name>` with the bundle key (for example `platform`, `cdng`). This table lists `bucket_path` style paths for modules and components.

| Bundle | Type | Full Path |
| :--- | :--- | :--- |
| **Platform** | Module | `harness-<VERSION>/platform/platform_images.tgz` |
| **Platform Agents** | Agent | `harness-<VERSION>/platform/agents/`[`<agent>.tgz`](#available-single-bundles) |
| **Dashboard** | Module | `harness-<VERSION>/dashboard/dashboard_images.tgz` |
| **Continuous Deployment (cdng)** | Module | `harness-<VERSION>/cdng/cdng_images.tgz` |
| **CD Agents** | Agent | `harness-<VERSION>/cdng/agents/cdng-agents_images.tgz` |
| **Continuous Integration (ci)** | Module | `harness-<VERSION>/ci/ci_images.tgz` |
| **CI Plugins** | Plugin | `harness-<VERSION>/ci/plugins/ci-plugins_images.tgz` |
| **Security Testing Orchestration (sto)** | Module | `harness-<VERSION>/sto/sto_images.tgz` |
| **STO Scanners** | Scanner | `harness-<VERSION>/sto/scanners/`[`<scanner>.tgz`](#available-single-bundles) |
| **Feature Flags (ff)** | Module | `harness-<VERSION>/ff/ff_images.tgz` |
| **Cloud Cost Management (ccm)** | Module | `harness-<VERSION>/ccm/ccm_images.tgz` |
| **Chaos Engineering (ce)** | Module | `harness-<VERSION>/ce/ce_images.tgz` |
| **Chaos Plugins** | Plugin | `harness-<VERSION>/ce/plugins/ce-plugins_images.tgz` |
| **Supply Chain Security (ssca)** | Module | `harness-<VERSION>/ssca/ssca_images.tgz` |
| **SCS Plugins** | Plugin | `harness-<VERSION>/ssca/plugins/ssca-plugins_images.tgz` |
| **Database DevOps (dbdevops)** | Module | `harness-<VERSION>/dbdevops/dbdevops_images.tgz` |
| **Code Repository (code)** | Module | `harness-<VERSION>/code/code_images.tgz` |
| **Infrastructure as Code Management (iacm)** | Module | `harness-<VERSION>/iacm/iacm_images.tgz` |
| **IACM Plugins** | Plugin | `harness-<VERSION>/iacm/plugins/iacm-plugins_images.tgz` |
| **Internal Developer Portal (idp)** | Module | `harness-<VERSION>/idp/idp_images.tgz` |
| **IDP Plugins** | Plugin | `harness-<VERSION>/idp/plugins/idp-plugins_images.tgz` |

#### Available single bundles {#available-single-bundles}

The following components are packaged as individual single bundles (`.tgz`), rather than a combined bundle:

**Platform Agents:**

- `delegate.tgz`
- `upgrader.tgz`

**STO Scanners:**

- `anchore-job-runner.tgz`
- `aqua-security-job-runner.tgz`
- `aqua-trivy-job-runner.tgz`
- `aws-ecr-job-runner.tgz`
- `aws-security-hub-job-runner.tgz`
- `bandit-job-runner.tgz`
- `blackduckhub-job-runner.tgz`
- `brakeman-job-runner.tgz`
- `burp-job-runner.tgz`
- `checkmarx-job-runner.tgz`
- `checkov-job-runner.tgz`
- `docker-content-trust-job-runner.tgz`
- `fossa-job-runner.tgz`
- `github-advanced-security-job-runner.tgz`
- `gitleaks-job-runner.tgz`
- `grype-job-runner.tgz`
- `modelscan-job-runner.tgz`
- `nexusiq-job-runner.tgz`
- `nikto-job-runner.tgz`
- `nmap-job-runner.tgz`
- `osv-job-runner.tgz`
- `owasp-dependency-check-job-runner.tgz`
- `prowler-job-runner.tgz`
- `semgrep-job-runner.tgz`
- `snyk-job-runner.tgz`
- `sonarqube-agent-job-runner.tgz`
- `sysdig-job-runner.tgz`
- `traceable-job-runner.tgz`
- `twistlock-job-runner.tgz`
- `veracode-agent-job-runner.tgz`
- `whitesource-agent-job-runner.tgz`
- `wiz-job-runner.tgz`
- `zap-job-runner.tgz`

### `download-airgap-bundles.sh` (0.38.0 to 0.40.x) {#download-airgap-bundles-038}

Use this script to fetch air gap bundles from public bundle locations for chart **0.38.0 through 0.40.x**.

| Flag | Description |
| :--- | :--- |
| `-v` | Harness version to download (for example `0.38.0`). |
| `-o` | Output directory for the downloaded bundles. |
| `-b` / `--bundles` | Comma-separated list of bundles to download (for example `ci,delegate`). |
| `-g` | Generate a configuration file with your interactive selections. |
| `-s` | Use a previously generated configuration file. |
| `-n` | Run in non-interactive mode. |

Helm chart **0.41.0 and later** uses a Support-provided `manifest.yaml` and the **`-m`** flag instead of public bundle URLs. Go to [Step 1](#step-1-download-image-bundles) and open the **Version 0.41.0 and later** tab on this page.

### `download-airgap-bundles.sh` (0.41.0 and later) {#download-airgap-bundles-041}

Use this script to download module `*.tgz` files using a Support-provided `manifest.yaml`.

| Flag | Description |
| :--- | :--- |
| `-m` | Path to `manifest.yaml` from [Harness Support](https://www.harness.io/support). The manifest lists every module for the chart release; each module entry includes a `downloadUrl` to its `*.tgz` bundle. |
| `-o` | Output directory for downloaded bundles. |
| `-b` / `--bundles` | Comma-separated list of components to download, when this flag is supported for your chart. |
| `-g` | Generate a configuration file with your interactive selections. |
| `-s` | Use a previously generated selection configuration file. |
| `-n` | Run in non-interactive mode. |

For chart 0.41.0 and later, **do not** use public GCS or `app.harness.io` URLs, and do not rely on **`-v`** to resolve public `harness-airgap` paths. Bundle locations come from the `downloadUrl` values in the manifest.

### `harness-airgap-images.sh` {#harness-airgap-images-reference}

| Flag | Description |
| :--- | :--- |
| `-r` | Target private container registry URL. |
| `-d` | Directory that contains the downloaded bundle `*.tgz` files (for chart 0.38.0 and later, typical download output layout). |
| `-f` | Single bundle `*.tgz` (for chart 0.37.x and earlier, per-file push). |
| `-s` | Enable Skopeo mode for faster transfers without a local Docker daemon. |
| `-c` | When Skopeo is not enabled, clean up local Docker images after a successful push to save disk. |
| `-n` | Run in non-interactive mode (for example, skip the Looker image prompt). |
