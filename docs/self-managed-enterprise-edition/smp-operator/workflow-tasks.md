---
title: Workflow tasks
sidebar_label: Workflow Tasks
description: Run the pre-defined automation tasks the Installer UI executes.
sidebar_position: 5
keywords:
  - workflow tasks
  - automation
  - istio install
  - license update
  - feature flags
  - tls certificates
  - harness delegate
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

Workflow tasks are pre-defined automation units that the Installer UI executes. Each task is a YAML definition containing Helm releases, scripts, or namespace operations. You run a task from the Installer UI to install a component, generate certificates, or update a platform setting such as the license or feature flags.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Identify which task performs the operation you need from the [task list](#available-tasks).
- Upgrade the Helm release with [PlatformInstaller](#platforminstaller).
- Install the Istio stack with [IstioInstall](#istioinstall).
- Rotate self-signed certificates with [GenerateTlsCerts](#generatetlscerts).
- Update your license or feature flags with [LicenseUpdate](#licenseupdate) and [UpdateFeatureFlags](#updatefeatureflags).

---

## Before you begin

Before you run a workflow task, ensure you have the following:

- **A running installation**: A deployed SMP Operator that passes the verification checks. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>.
- **Installer UI access**: The admin email and password you supplied during installation.
- **Task inputs**: The values the task you run requires, listed in that task's section.

---

## Available Tasks

Each task in the following table has its own section that covers the inputs it accepts and the steps to run it.

| Task | Description |
| --- | --- |
| [PlatformInstaller](#platforminstaller) | Upgrades the Platform Installer Helm release |
| [IstioInstall](#istioinstall) | Installs Istio components (base, istiod, ingressgateway, gateway, virtualservice) |
| [GenerateTlsCerts](#generatetlscerts) | Generates self-signed TLS certificates and restarts services |
| [InstallHarnessDelegate](#installharnessdelegate) | Installs the Harness Delegate into the cluster |
| [LicenseUpdate](#licenseupdate) | Updates the Harness SMP license on ng-manager |
| [UpdateFeatureFlags](#updatefeatureflags) | Updates Harness feature flags configmap |

---

## PlatformInstaller

This component manages the `platform-installer` Helm release. You can view and edit Helm values, and trigger a Helm upgrade from the Installer UI.

### Usage

Edit the Helm values and apply them with an upgrade by following the steps below:

1. Click on **platform-installer**.
2. Edit values under **user/values.yaml** as needed.
3. Click **Helm Upgrade** to apply the changes.

---

## IstioInstall

This component installs the full Istio stack in sequence. The task combines Helm items that deploy Istio itself with script items that create the routing resources.

### Helm Items

The following Helm items deploy the Istio components.

| Item | Chart | Description |
| --- | --- | --- |
| `istio-base` | `istio/base` | Istio CRDs and base resources |
| `istiod` | `istio/istiod` | Istio control plane |
| `istio-ingressgateway` | `istio/gateway` | Istio ingress gateway |

### Script Items

The following script items create the Istio resources for the installer.

| Item | Description |
| --- | --- |
| `istio-gateway` | Creates an Istio `Gateway` resource with HTTPS/TLS configuration |
| `istio-virtualservice` | Creates a `VirtualService` routing `/pi` and `/pimgr` to installer services |

### Configurable Inputs

Set the following inputs when you target a Gateway other than the default.

| Input | Default | Description |
| --- | --- | --- |
| `istioGatewayName` | `public` | Name of the Istio Gateway resource |
| `istioGatewayNamespace` | Installer namespace | Namespace for the Gateway |

### Usage

You can set the ingress type to Istio, and run the task by following the steps below:

1. In the Installer UI, navigate to **Global Variables**.
2. Set `ingressType` to `istio`.
3. Set `istioInstall` to `true`.
4. If using an existing Gateway, set `istioGatewayName` and `istioGatewayNamespace` to match your existing Gateway, and enable only the **istio-virtualservice** step.
5. Go to **Tasks** and select **IstioInstall**.
6. Click **Start Execution** to apply the changes.

---

## GenerateTlsCerts

This component generates self-signed TLS certificates using the `generate-self-signed-certs.sh` script.

### Inputs

The following inputs supply the files the script needs and control whether the task replaces existing certificates.

| Input | Type | Description |
| --- | --- | --- |
| `root_ca_key` | file | Root CA private key (PEM) |
| `root_ca_cert` | file | Root CA certificate (PEM) |
| `csr_conf_file` | file | CSR configuration file |
| `overwrite` | string (`true`/`false`) | Overwrite existing server key, CSR, and cert. Default: `false` |

### Usage

You can upload the required files, and then run the task by following the steps below:

1. In the Installer UI, navigate to **Global Variables**.
2. Upload `root_ca_key`, `root_ca_cert`, and `csr_conf_file` if not already present.
3. Set `overwrite` to `true` if regenerating existing certs.
4. Go to **Tasks** and select **GenerateTlsCerts**.
5. Click **Start Execution** to apply the changes.

---

## InstallHarnessDelegate

This component installs the Harness Delegate via Helm chart from the platform's own chart repository.

### Inputs

The following inputs identify your account and name the delegate.

| Input | Default | Description |
| --- | --- | --- |
| `delegateToken` | - | Delegate access token (sensitive) |
| `delegateName` | `helm-delegate` | Name for the delegate |
| `accountId` | - | Harness account ID |

### Functionality

The task performs the following operations in order:

1. Adds the Helm repo from `https://<DNS>/storage/harness-download/delegate-helm-chart/`.
2. Creates the `harness-delegate` namespace.
3. Installs the `harness-delegate-ng` chart with the provided credentials.

### Usage

You can supply the delegate credentials, and then run the task by following the steps below:

1. In the Installer UI, navigate to **Global Variables**.
2. Set `delegateToken`, `delegateName`, and `accountId`.
3. Go to **Tasks** and select **InstallHarnessDelegate**.
4. Click **Start Execution** to apply the changes.

---

## LicenseUpdate

This component patches the `ng-manager` deployment with a new `SMP_LICENSE` environment variable and waits for rollout to complete (timeout: 10m).

### Usage

Replace the license string, and then run the task.

1. In the Installer UI, navigate to **Global Variables**.
2. Update the `harnessLicense` variable with the new license string.
3. Go to **Tasks** and select **LicenseUpdate**.
4. Click **Start Execution** to apply the changes.

---

## UpdateFeatureFlags

This component updates the Harness feature flags configmap by running the `update-features-cm.sh` script, then waits for the `harness-manager` deployment rollout (timeout: 10m).

The `additionalFeatureFlags` input accepts a newline-separated list of feature flags.

### Usage

You can set the feature flags you want, then run the task by following the steps below:

1. In the Installer UI, navigate to **Global Variables**.
2. Update the `additionalFeatureFlags` variable with the desired feature flags (newline-separated).
3. Go to **Tasks** and select **UpdateFeatureFlags**.
4. Click **Start Execution** to apply the changes.

---

## Related articles

- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>: Verify the deployment after a task completes.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/upgrade" target="_blank">Upgrade</a>: Upgrade the operator and the platform through the Installer UI.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/troubleshooting" target="_blank">Troubleshooting and support</a>: Resolve common issues.
