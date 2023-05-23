---
title: Debug with SSH
description: Use debug mode to troubleshoot remote builds
sidebar_position: 110
---

The Harness CI **Re-run in Debug Mode** feature can troubleshoot remote builds.

## Requirements

Debug mode is only available if the following conditions are met:

* You have the feature flag `CI_REMOTE_DEBUG` enabled. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
* The build infrastructure uses a Linux-based OS.
* The build fails at a Run step with a Bash or Shell script in a **Build** (`CI`) stage.
* The build runs in Harness Cloud, on a virtual machine, or in Kubernetes.

Debug mode is never available for a pipeline's first build. You must run the pipeline at least once before you can run the build in debug mode.

## Enable debug mode

1. Navigate to the [**Builds**](./viewing-builds.md), **Execution**, or **Execution History** page in the Harness UI.
2. Locate the build you want to troubleshoot, select **More Options** (&vellip;), and select **Re-run in Debug Mode**.

   <!-- ![Using the build's More Options menu to trigger debug mode.](./static/ci-rerun-build-in-debug-mode.png) -->

   <docimage path={require('./static/ci-rerun-build-in-debug-mode.png')} />

3. Wait while the build runs. If the Run step fails, the build stops and generates log output with an SSH command you can use to SSH into the session on the remote host.

   * The SSH command is formatted as `ssh {harness pat}:<your-harness-account-ID>:<random-session-token>@tmate.harness.io`
   * Replace `{harness pat}` with your own [Harness personal access token (PAT)](/docs/platform/user-management/add-and-manage-api-keys/#create-personal-access-token). Your Harness PAT must have `pipeline execution` permissions.

   <!-- ![](./static/debug-remote-build-links.png) -->

   <docimage path={require('./static/debug-remote-build-links.png')} />

4. When you're in the debug session, use the CLI to reproduce and troubleshoot the issue on the remote host.
5. To terminate the debug session, abort the build and then run a new build to determine if the issue is resolved. Sessions automatically terminate after one hour or at the step timeout limit, whichever occurs first.

:::tip

You can troubleshoot pipelines that appear to build successfully but still need remote troubleshooting. To do this, add a Run step with the CLI command `exit 1`. This forces the build to fail so you can re-run it in debug mode.

:::
