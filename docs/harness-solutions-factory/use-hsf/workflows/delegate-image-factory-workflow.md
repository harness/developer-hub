---
title: Delegate Image Factory Workflow
description: Understand the Delegate Image Factory Workflow
sidebar_position: 5
---
# Harness Delegate Image Factory

Harness Delegate Image Factory helps teams create and manage custom delegate
images when the default Harness delegate doesn't meet enterprise requirements.
It provides a controlled, repeatable process for building, versioning, and
releasing custom delegates — with a pre-optimized Dockerfile and
configuration included out of the box.

## When to use this workflow

Use Delegate Image Factory when your enterprise environment requires delegates
that the default Harness delegate image doesn't support. Common scenarios
include:

- **Adding tools not bundled with the default delegate** — for example,
  AWS CLI, Azure CLI, or custom internal utilities required by your CD
  or pipeline workloads.
- **Embedding enterprise CA certificates and Java trust stores** — avoids
  x509 certificate errors in environments with internal PKI.
- **Installing custom utilities** — any tooling your pipelines depend on
  that isn't available in the default delegate image.

If the default Harness delegate meets your needs, you don't need this workflow.

## Prerequisites

- HSF is deployed and post-deployment configuration is complete.
- You have the certificates, tools, or utilities you want to bake into the
  delegate image ready to reference.
- A container registry is configured and accessible. If you haven't set one
  up yet, run [Harness Central Build Farm Setup](../workflows/central-build-farm-workflow.md) first.
- You have been added to the **HSF Users** or **HSF Admins** group.

## Inputs

| Input | Description |
|---|---|
| Delegate image name | The name for your custom delegate image |
| Container registry | Where the built image will be pushed |
| Tools to install | Additional tools or utilities to include in the image |
| Certificates | Enterprise CA certificates or Java trust stores to embed |

## What gets created

| Resource | Details |
|---|---|
| Pipeline | A build pipeline that builds, versions, and pushes your custom delegate image |
| Repository | `harness-delegate-factory` — contains a pre-optimized Dockerfile and configuration files for embedding certificates and trust stores |
| IaCM workspace | In the Solutions Factory project |

### Expected output

After the workflow completes:

- [ ] The `harness-delegate-factory` repository is visible in
      **Harness Code Repository** (or your configured SCM).
- [ ] A delegate build pipeline is visible in the Solutions Factory project.
- [ ] The IaCM workspace appears in **IaCM** → **Workspaces**.
- [ ] An IDP catalog entry for the workspace is registered automatically.

## Post setup: build and deploy your delegate

Once the workflow completes, run the delegate build pipeline to produce your
first custom delegate image. After the image is built and pushed to your
container registry:

1. Create a new delegate in Harness using the custom image. See
   [Install a delegate](https://developer.harness.io/docs/platform/delegates/install-delegates/overview)
   for instructions.
2. Verify the delegate is connected and healthy in
   **Account Settings** → **Delegates**.

## Making changes

To update the delegate configuration — for example, to add a new tool or
rotate certificates — navigate to the workspace in
**IaCM** → **Workspaces**, update the relevant variable, re-execute the
workspace, and then re-run the build pipeline to produce an updated image.

:::tip
Pin your custom delegate images to specific version tags in your pipelines
rather than using `latest`. This ensures a certificate rotation or tooling
update doesn't automatically roll out to running pipelines until you're
ready.
:::