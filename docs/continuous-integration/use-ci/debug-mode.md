---
title: Debug with SSH
description: Use debug mode to troubleshoot remote builds
sidebar_position: 110
---

```mdx-code-block
import Debug from '/docs/continuous-integration/shared/debug-ai-partial.md';
```

:::note
This is an early access feature and is behind the feature flag `CI_REMOTE_DEBUG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

You can use the Harness CI **Re-run in Debug Mode** feature to quickly and securely troubleshoot remote builds by SSH-ing into a debug session on the build's remote host. With debug mode, you:

* Get temporary, secure access to the build environment without the need for permanent permission changes.
* Troubleshoot directly in the build environment, not a recreation on your local machine.
* Troubleshoot in real time, rather than waiting for logs to output after each build.

## Requirements

Debug mode is available if the following conditions are met:

* You have the feature flag `CI_REMOTE_DEBUG` enabled. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
* The build fails at a [Run step](./run-ci-scripts/run-step-settings.md) with a Bash or Shell script in a **Build** (`CI`) stage.
* The build runs on a Linux-based OS on Harness Cloud, a self-hosted VM, or a Kubernetes cluster [build infrastructure](./set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

Debug mode is never available for a pipeline's first build. You must run the pipeline at least once before you can run the build in debug mode.

If debug mode isn't available for your pipeline, try the Harness debug assistant.

<Debug />

## Enable debug mode

1. Create a [Harness personal access token (PAT)](/docs/platform/user-management/add-and-manage-api-keys/#create-personal-access-token) with `pipeline execution` permissions, if you do not have one already.
2. Navigate to the [**Builds**](./viewing-builds.md), **Execution**, or **Execution History** page.
3. Locate the build you want to troubleshoot, select **More Options** (&vellip;), and select **Re-run in Debug Mode**.

   <!-- ![Using the build's More Options menu to trigger debug mode.](./static/ci-rerun-build-in-debug-mode.png) -->

   <docimage path={require('./static/ci-rerun-build-in-debug-mode.png')} />

4. Wait while the build runs. If the Run step fails, the build stops and generates log output with an SSH command you can use to SSH into the session on the remote host.

   The SSH command is formatted as follows. Replace `{harness pat}` with your [Harness PAT](/docs/platform/user-management/add-and-manage-api-keys/#create-personal-access-token) that has `pipeline execution` permissions.

   ```
   ssh {harness pat}:<your-harness-account-ID>:<random-session-token>@tmate.harness.io
   ```

   <!-- ![](./static/debug-remote-build-links.png) -->

   <docimage path={require('./static/debug-remote-build-links.png')} />

5. While in the debug session, use the CLI to reproduce and troubleshoot the issue on the remote host.
6. To terminate the debug session, abort the build, and then run a new build to determine if the issue is resolved. Sessions automatically terminate after one hour or at the step timeout limit, whichever occurs first.

:::tip

You can force a build to fail if you need to troubleshoot pipelines that appear to build successfully but still need remote troubleshooting. To do this, add a [Run step](./run-ci-scripts/run-step-settings.md) with the command `exit 1`. This forces the build to fail so you can re-run it in debug mode.

:::
