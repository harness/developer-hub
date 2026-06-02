---
title: SAST & SCA Workflow
description: Understand the SAST & SCA Workflow
sidebar_position: 4
---
# Deploy Harness SAST & SCA Templates

Deploy Harness SAST & SCA Templates provisions a suite of step group, stage,
and pipeline templates that give your teams out-of-the-box security scanning
capabilities. The goal is day-one operations — teams can start scanning
repositories for vulnerabilities immediately, even before a CI pipeline
is in place.

Once this workflow completes, it also creates a second workflow in IDP that
end users can run to register their own repositories for scanning.

## Prerequisites

- HSF is deployed and post-deployment configuration is complete.
- A build farm is configured. Run
  [Harness Central Build Farm Setup](../workflows/central-build-farm-workflow.md) first if you
  haven't already — every repository scan needs a build infrastructure to
  run on.
- You have been added to the **HSF Users** or **HSF Admins** group.

## Inputs

| Input | Description | Notes |
|---|---|---|
| Build infrastructure type | The infrastructure scans will run on | Must match your configured build farm |
| Scanner selection | Which security scanners to enable for repository scans | Order does not matter — scanners run in parallel |
| STO config manager repo | Where to host the config manager configuration | Bring your own repo or let HSF create one |


## Steps

### 1. Choose your build infrastructure

Every repository scan needs a build infrastructure to execute on. Select the
same infrastructure type you configured in Central Build Farm Setup to ensure
consistency across scans.

:::tip
For consistency, create a stage template with a defined build infrastructure
for all scans. This prevents individual teams from using different
infrastructure configurations for their scans.
:::

### 2. Set up the STO config manager

One of the biggest challenges in security scanning is handling the variation
between applications — different scanners, exclusion rules, and overrides
needed per repo or team. HSF solves this with a hierarchical config manager
approach.

The `harness-sto-config-manager` plugin (available as a public image on
DockerHub) lets a central DevSecOps team define scanner configurations and
overrides at multiple levels — account, org, project, or repo — and resolves
the hierarchy automatically at scan time.

When setting up the config manager, you can:

- **Bring your own repo** — point HSF at an existing repository where your
  config manager configuration lives.
- **Let HSF create a repo** — HSF will create and manage the config
  repository in Harness Code Repository.

:::note
`skipped` variables in the `STO_SCA_SAST_PRIMER` workspace are intentional.
They act as null placeholders that make future configuration easier — the
workspace knows how to handle them without errors. To make adjustments after
provisioning, navigate to the workspace and update the relevant variables.
:::

### 3. Choose your scanners

Select which security scanners you want enabled for repository scans. Scanners
run in parallel, so the order of selection does not affect execution time or
results.

## What gets created

| Resource | Details |
|---|---|
| Step group templates | Reusable step groups for security scanning stages |
| Stage templates | Pre-configured scan stages with defined build infrastructure |
| Pipeline templates | Full scanning pipelines teams can adopt immediately |
| IaCM workspace | `STO_SCA_SAST_PRIMER` in the Solutions Factory project |
| IDP workflow | A second workflow end users run to register their repositories for scanning |

### Expected output

After the workflow completes:

- [ ] Templates are visible in **Account** → **Templates**.
- [ ] The `STO_SCA_SAST_PRIMER` workspace appears in
      **IaCM** → **Workspaces**.
- [ ] A new **Register Repository for Scanning** workflow appears in
      **IDP** → **Workflows** for end users.
- [ ] An IDP catalog entry for the workspace is registered automatically.

## Making changes

To adjust scanner configuration or update the config manager settings after
provisioning, navigate to **IaCM** → **Workspaces** → `STO_SCA_SAST_PRIMER`,
update the relevant variable, and re-execute the workspace.