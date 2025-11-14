---
title: Docker Engine v29 Compatibility Notice for Harness CI
sidebar_label: Docker 29 Compatibility Notice
redirect_from:
  - /kb/platform/articles/docker-29-version-compatibility
---

# Docker Engine v29 — Compatibility Notice for Harness CI

Docker Engine **v29** introduces significant API changes that are **not backward-compatible** with older Docker clients or tooling. These changes can impact CI pipelines running on:

- Harness **VM Runner**
- Harness **Local Runner**
- **Docker-in-Docker (DinD)** workflows

This page summarizes the impact and required actions to ensure your pipelines continue to run successfully.


## What Changed in Docker Engine v29

Docker 29 introduces foundational API updates and removes support for older API versions. As a result:

- Older Docker clients (for example, clients using **API v1.24 or lower**) cannot communicate with a Docker 29 daemon.  
- Several operations may fail with errors such as:
    - client is too old
    - Error response from daemon: unsupported API version
    - Error response from daemon: client version 1.xx is too old.
    - Minimum supported API version is 1.44. Please upgrade your client.

These errors typically occur when the Docker daemon upgrades but the Docker client or embedded tooling cannot negotiate the newer API version.

## Official Documentation

- **Docker Engine v29 Release Notes**  
[Docker Release Notes](https://www.docs.docker.com/engine/release-notes/29/)
- **Docker Blog: Engine v29 Overview**  
[Docker Blog: Engine v29 Overview](https://www.docker.com/blog/docker-engine-version-29/)

## Impact on Harness CI VM Runner

Docker 29 is **not compatible** with the **Moby client** bundled with the Harness CI VM Runner.  
If a VM Runner environment upgrades to Docker 29, Docker-related steps may begin to fail.

### Required Action

- If you install Docker manually (for example through user-data scripts), **pin Docker CE to version 28.x or earlier**.
- Harness’s default VM Runner installation already pins Docker CE to **28.x** to avoid compatibility issues.
- Upgrade your VM Runner to the following version, which contains safe defaults:

`drone-runners/drone-runner-aws: v1.0.0-rc.221`

## Impact on Harness CI Local Runner

If your build VM automatically updates packages, it may pull Docker 29, which is **incompatible** with the Docker client bundled with the Local Runner.

### Required Action

- If your Docker version is **29.x or higher**, downgrade back to **28.x**.  
- **Pin** the Docker package to prevent future auto-upgrades until a fully compatible version of the Local Runner is available.

Reference issue for similar API mismatch:

- *“client version 1.24 is too old”* — traefik/traefik Issue #12253


## Docker-in-Docker (DinD) Compatibility Guidelines

If your CI pipeline uses Docker-in-Docker, you must prevent your DinD container from upgrading to Docker 29.

### Required Actions

1. **Pin your DinD image** to a supported version such as:

   ```yaml
   docker:24-dind

or any stable version in the 24.x series.

2. Ensure the Docker client and daemon versions match (for example both using 24.x).

3. Avoid unpinned tags, including:

    docker:dind
    docker:latest

