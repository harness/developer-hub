---
title: Infrastructure & Runtimes
sidebar_label: Infrastructure & Runtimes
description: Configure the compute resources where Harness 3.0 pipeline stages execute — Cloud, Kubernetes, Shell, and VM runtimes with platform and machine size options.
---

Infrastructure defines the compute resources where pipeline stages execute. Harness 3.0 supports multiple runtime types — Cloud (Harness-hosted), Kubernetes, Shell (bare-metal or VM), and VM runtimes. The runtime determines how steps are isolated, what resources are available, and how networking is configured.

```typescript title="infrastructure-schema.ts"
interface Runtime {
  // Runtime type
  type: "cloud" | "kubernetes" | "shell" | "vm"
  // Runtime-specific configuration
  spec: RuntimeCloud | RuntimeKubernetes | RuntimeShell | RuntimeVM
}

interface Platform {
  // Operating system
  os: "linux" | "macos" | "windows"
  // CPU architecture
  arch: "amd64" | "arm64"
  // OS variant (e.g., alpine, debian)
  variant: string
  // OS version
  version: string
  // Feature flags
  features: string[]
}
```

---

## Cloud Runtime

The Cloud runtime uses Harness-hosted infrastructure. No delegate or cluster configuration is required — Harness manages compute, scaling, and cleanup automatically.

### Short Configuration

```yaml title="cloud-short.yaml"
stages:
  - name: build
    runtime: cloud
    steps:
      - run: npm ci
      - run: npm run build
```

### Full Configuration

```yaml title="cloud-full.yaml"
stages:
  - name: build
    runtime:
      type: cloud
      spec:
        size: large
        platform:
          os: linux
          arch: amd64
    steps:
      - run: npm ci
      - run: npm run build
      - run: npm test
```

:::info Cloud Runtime Default
When no runtime is specified, Harness defaults to Cloud runtime with `size: flex` and Linux AMD64 platform. This is sufficient for most CI workloads.
:::

---

## Kubernetes Runtime

The Kubernetes runtime executes pipeline stages as pods in your own Kubernetes cluster. This provides full control over the execution environment, network access, and resource allocation.

```yaml title="k8s-runtime.yaml"
stages:
  - name: build
    runtime:
      type: kubernetes
      spec:
        connector: k8s-build-cluster
        namespace: harness-builds
        service_account: harness-builder
        resources:
          requests:
            cpu: "2"
            memory: 4Gi
          limits:
            cpu: "4"
            memory: 8Gi
        node_selector:
          workload: ci
        tolerations:
          - key: dedicated
            operator: Equal
            value: ci
            effect: NoSchedule
    steps:
      - run: npm ci
      - run: npm run build
```

:::warning Resource Management
Set resource requests and limits to ensure consistent performance and prevent noisy-neighbor issues in shared clusters. Without limits, pods may be evicted by the Kubernetes scheduler during memory pressure.
:::

---

## Shell Runtime

The Shell runtime executes steps directly on the host machine where the Harness delegate is running. No containerization is involved. This is useful for on-premise environments, legacy systems, or workloads that require direct access to host resources.

```yaml title="shell-runtime.yaml"
stages:
  - name: deploy-on-prem
    runtime:
      type: shell
    delegate:
      tags:
        - on-prem
        - linux
    steps:
      - run: |
          echo "Running directly on host"
          whoami
          uname -a
          ./deploy-local.sh
```

:::warning Security Consideration
Shell runtime steps execute with the same permissions as the Harness delegate process. Ensure proper access controls and isolation are in place, especially when running untrusted code or on shared hosts.
:::

---

## VM Runtime

The VM runtime provisions a dedicated virtual machine for each stage execution. This provides full machine isolation, root access, and the ability to install arbitrary software. VMs are provisioned on demand and destroyed after the stage completes.

```yaml title="vm-runtime.yaml"
stages:
  - name: build
    runtime:
      type: vm
      spec:
        image: ubuntu-22.04
        size: large
        pool: build-pool
        disk:
          size: 100Gi
          type: ssd
    steps:
      - run: |
          sudo apt-get update
          sudo apt-get install -y build-essential
          make all
```

---

## Platform Configuration

The platform configuration specifies the operating system, CPU architecture, variant, version, and feature requirements for the runtime environment.

| Property | Type | Description |
|---|---|---|
| `os` | `string` | Operating system: `linux`, `macos`, `windows` |
| `arch` | `string` | CPU architecture: `amd64`, `arm64` |
| `variant` | `string` | OS variant, e.g., `alpine`, `debian`, `ubuntu-22.04` |
| `version` | `string` | Specific OS version string |
| `features` | `string[]` | Feature flags such as `docker`, `gpu`, `nested-virtualization` |

```yaml title="platform-config.yaml"
stages:
  - name: build-linux
    runtime:
      type: cloud
      spec:
        size: medium
        platform:
          os: linux
          arch: amd64
          features:
            - docker
    steps:
      - run: docker build -t my-app .
  - name: build-macos
    runtime:
      type: cloud
      spec:
        size: large
        platform:
          os: macos
          arch: arm64
    steps:
      - run: xcodebuild -scheme MyApp
```

---

## Machine Sizes

Machine sizes control the CPU and memory allocated to Cloud and VM runtimes.

| Size | vCPU | Memory | Typical Use Case |
|---|---|---|---|
| `flex` | Auto | Auto | Default. Harness auto-scales based on workload. Best for most CI tasks. |
| `small` | 1 | 2 GB | Lightweight scripts, linting, notifications. |
| `medium` | 2 | 4 GB | Standard builds, unit tests, moderate compilation. |
| `large` | 4 | 8 GB | Large builds, integration tests, Docker image builds. |
| `xlarge` | 8 | 16 GB | Heavy compilation (C++, Rust), large monorepos, ML workloads. |
| `xxlarge` | 16 | 32 GB | Enterprise-scale builds, large test suites, resource-intensive operations. |

:::tip Cost Optimization
Use `flex` size for most workloads. Harness Cloud automatically scales resources to match demand, so you only pay for what you use. Reserve fixed sizes for workloads with specific resource requirements.
:::

---

## Multi-Platform Build Example

Build the same application on multiple platforms simultaneously using matrix strategy with platform configuration.

```yaml title="multi-platform-build.yaml"
pipeline:
  stages:
    - name: build
      strategy:
        matrix:
          platform:
            - os: linux
              arch: amd64
            - os: linux
              arch: arm64
            - os: macos
              arch: arm64
            - os: windows
              arch: amd64
      runtime:
        type: cloud
        spec:
          size: large
          platform:
            os: ${{ matrix.platform.os }}
            arch: ${{ matrix.platform.arch }}
      steps:
        - run: |
            echo "Building on ${{ matrix.platform.os }}/${{ matrix.platform.arch }}"
            make build GOOS=${{ matrix.platform.os }} GOARCH=${{ matrix.platform.arch }}
```