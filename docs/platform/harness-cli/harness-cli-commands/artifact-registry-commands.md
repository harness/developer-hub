---
title: Artifact Registry
sidebar_label: Artifact Registry
description: Use the Harness CLI to manage the Artifact Registry module, including registries, artifact push and pull, version inspection, metadata management, security scans, and registry migrations.
sidebar_position: 3
keywords:
  - harness cli
  - artifact registry
  - push artifact
  - pull artifact
  - registry commands
  - har module
  - firewall scan
---

Harness Artifact Registry is a universal package store that hosts, proxies, and secures your build artifacts. The CLI (har module) lets you manage registries, push and pull packages in any supported format, inspect artifact versions, and trigger on-demand security scans without leaving your terminal.

This page covers every Artifact Registry resource and action available in the CLI.

---

## What will you learn in this topic?

By the end of this page, you will know how to:

- List and create registries for different package types.
- Push artifacts (Docker, Helm, Maven, npm, Go, Python, generic) to a registry.
- Pull artifacts back to your local machine.
- Inspect artifact metadata, versions, and files.
- Trigger firewall scans and copy artifacts between registries.
- Migrate external registries into Harness Artifact Registry.

---

## Before you begin

- **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.
- **Project scope configured:** Artifact Registry resources require `--org` and `--project`. Set them in your profile or pass them on each command.
- **Registry exists:** Most push and pull commands require a registry identifier. Create one first or use an existing registry.

---

## Registries

A registry is a named container that stores artifacts of a specific type (Docker, Helm, npm, Maven, Go, Python, or generic). Each registry belongs to a project and defines upstream proxies, cleanup policies, and access rules. You manage registries to organize artifacts by package format and control who can read or write packages.

### List registries

View all registries in your current project scope to find the one you need for push or pull operations.

```sh
harness list registry
harness list registry --all --format json
harness list registry --search "<registry_name>"
```

### Get registry details

Retrieve the full configuration of a specific registry, including its upstream sources, allowed actions, and cleanup rules.

```sh
harness get registry <registry>
harness get registry <registry> --format json
```

### Create a registry

Create a new registry to start storing a specific package type. Each registry targets one format and supports either virtual (aggregation) or upstream (proxy) modes.

```sh
harness create registry \
  --set identifier=<registry_identifier> \
  --set name="<registry_name>" \
  --set packageType=<package_type> \
  --set type=<registry_type>
```

### Delete a registry

Remove a registry and all artifacts stored within it. This action is irreversible.

```sh
harness delete registry <registry>
```

### Registry metadata

Registry metadata stores extended properties like descriptions, labels, and upstream proxy configurations. Update metadata to change how the registry behaves without recreating it.

```sh
harness get registry_metadata <registry>
harness update registry_metadata <registry> --set description="<description>"
```

---

## Push artifacts

The `push` action uploads a local artifact to a registry. Each package format has its own subcommand (`artifact:docker`, `artifact:helm`, `artifact:npm`, etc.) that handles format-specific upload logic. Use push commands to publish build outputs from CI pipelines or local development.

### Push a Docker image

Upload a tagged Docker image to a Docker-type registry. The first argument is `<registry>/<image_name>` and the second is the local image reference.

```sh
harness push artifact:docker <registry>/<image_name> <local_image>:<tag>
```

### Push a Helm chart

Upload a packaged Helm chart archive to a Helm-type registry.

```sh
harness push artifact:helm <registry>/<chart_name> <path_to_chart>.tgz
```

### Push a generic file

Upload any file type to a generic registry. Use this for build artifacts, binaries, or archives that do not fit a specific package format.

```sh
harness push artifact:generic <registry>/<artifact_name> <path_to_file>
```

### Push a Maven artifact

Upload a JAR or POM file with Maven coordinates to a Maven-type registry.

```sh
harness push artifact:maven <registry>/<artifact_name> <path_to_jar>
```

### Push an npm package

Upload a packed npm tarball to an npm-type registry.

```sh
harness push artifact:npm <registry>/<package_name> <path_to_tarball>.tgz
```

### Push a Python package

Upload a source distribution or wheel to a Python-type registry.

```sh
harness push artifact:python <registry>/<package_name> <path_to_dist>
```

---

## Pull artifacts

The `pull` action downloads an artifact from a registry to your local machine. Use this to retrieve specific versions for debugging, deployment, or local testing. Pass the full path as `<registry>/<artifact_name>/<version>`.

```sh
harness pull artifact <registry>/<artifact_name>/<version>
harness pull artifact <registry>/<artifact_name>/<version> -o <output_directory>
```

---

## Artifacts

An artifact represents a stored package within a registry. It groups all versions of a single logical package under one name. Use artifact commands to browse what exists in a registry, check metadata, or remove outdated packages.

### List artifacts in a registry

View all artifacts stored in a specific registry. Pass the registry identifier as a positional argument.

```sh
harness list artifact <registry>
harness list artifact <registry> --all --format json
harness list artifact <registry> --search "<artifact_name>"
```

### Get artifact details

Retrieve the full metadata for a specific artifact using the `<registry>/<artifact_name>` format.

```sh
harness get artifact <registry>/<artifact_name>
harness get artifact <registry>/<artifact_name> --format json
```

### Delete an artifact

Remove an artifact and all its versions from the registry. This action is irreversible and frees the associated storage.

```sh
harness delete artifact <registry>/<artifact_name>
```

### Artifact metadata

Artifact metadata stores labels, annotations, and custom properties. Update metadata to tag artifacts for tracking, filtering, or policy enforcement without modifying the artifact content.

```sh
harness get artifact_metadata <registry>/<artifact_name>
harness update artifact_metadata <registry>/<artifact_name> --set labels.team=platform
```

---

## Artifact versions

Each push to an artifact creates a new version. Versions are immutable records that track the exact content, digest, and upload timestamp. You use version commands to audit what was published, compare changes across releases, or clean up old builds.

### List versions

View all versions of a specific artifact to see the full release history. Pass the path as `<registry>/<artifact_name>`.

```sh
harness list artifact_version <registry>/<artifact_name>
harness list artifact_version <registry>/<artifact_name> --format json
```

### Get version details

Retrieve the full metadata for a specific version, including its content digest, size, and upload time.

```sh
harness get artifact_version <registry>/<artifact_name>/<version>
harness get artifact_version <registry>/<artifact_name>/<version> --format json
```

### Delete a version

Remove a specific version from an artifact. Other versions remain intact.

```sh
harness delete artifact_version <registry>/<artifact_name>/<version>
```

### Version metadata

Version metadata stores per-version labels and annotations. Use it to mark versions as verified, approved, or flagged for review without altering the immutable content.

```sh
harness get artifact_version_metadata <registry>/<artifact_name>/<version>
harness update artifact_version_metadata <registry>/<artifact_name>/<version> \
  --set labels.verified=true
```

---

## Copy an artifact version

Copy a specific version from one registry to another without re-uploading from your local machine. Use this to promote artifacts between staging and production registries.

```sh
harness execute artifact_version:copy <registry>/<artifact_name>/<version> \
  --set targetRegistry=<target_registry>
```

---

## List artifact files

View the individual files that make up an artifact version (layers for Docker, files for generic archives). Use this to inspect what a version contains without downloading the full artifact.

```sh
harness list artifact_file <registry>/<artifact_name>/<version>
```

---

## Security scans

Harness Artifact Registry includes a built-in firewall that scans artifacts for known vulnerabilities. Use on-demand scans to check packages before promoting them to production or after a new CVE is disclosed.

### Scan all artifacts in a registry

Trigger a full scan across every artifact and version in a registry.

```sh
harness execute registry:firewall_scan <registry>
```

### Scan a specific version

Trigger a targeted scan on a single artifact version when you need results fast.

```sh
harness execute artifact_version:firewall_scan <version> \
  --registry <registry> --artifact <artifact_name>
```

---

## Migrate a registry

Import artifacts from an external registry (Docker Hub, ECR, GCR, Artifactory) into Harness Artifact Registry. Use migration to consolidate scattered package stores into a single managed location.

```sh
harness execute registry:migrate <registry> \
  --set sourceType=<source_type> \
  --set sourceUrl=<source_url> \
  --set sourceImage=<source_image>
```

---

## Next steps

- Go to [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) to manage pipelines and deployment resources.
- Go to [Infrastructure as Code Management](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) to manage Terraform and OpenTofu workspaces.
- Go to [Code Repository](/docs/platform/harness-cli/harness-cli-commands/code-repository-commands) to manage repositories and pull requests.
