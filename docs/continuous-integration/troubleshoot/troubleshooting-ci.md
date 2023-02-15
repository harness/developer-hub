---
title: Troubleshoot Continuous Integration
description: Troubleshoot common CI issues.
sidebar_position: 10
helpdocs_topic_id: jx7ew69ypa
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic contains general troubleshooting information for error messages and other issues that can arise.

If you cannot find a resolution, please contact [Harness Support](mailto:support@harness.io) or visit the [Harness Community Forum](https://community.harness.io/).


### Use debug mode to troubleshoot remote builds

The Harness CI **Re-run in Debug Mode** feature can troubleshoot remote builds. This command is available for builds in remote infrastructures: Harness Cloud, Kubernetes, or VMs on remote hosts. Additionally, the build must have failed at a Run step within a CI stage.

Debug mode is not available on a pipeline's first build. You must run the pipeline at least once before you can run the build in debug mode.

To trigger debug mode:

1. Navigate to the **Builds**, **Execution**, or **Execution History** page in the Harness UI.
2. Locate the build you want to troubleshoot, select **More Options** (&vellip;), and select **Re-run in Debug Mode**.

   ![Using the build's More Options menu to trigger debug mode.](./static/ci-rerun-build-in-debug-mode.png)

3. Wait while the build runs. When the Run step fails, the build stops and generates log output with links to web and SSH sessions on the remote host. Follow one of these links to troubleshoot the build.

   ![](./static/debug-remote-build-links.png)

4. When you're in the debug session, use the CLI to reproduce and troubleshoot the issue on the remote host.
5. To terminate the debug session, abort the build and then run a new build to determine if the issue is resolved.

:::tip

You can troubleshoot pipelines that appear to build successfully but still needs remote troubleshooting. To do this, add a Run step with the CLI command `exit 1`. This forces the build to fail so you can re-run it in Debug mode.

:::

### Test suites wrongly parsed

The parsed test report in the **Tests** tab comes strictly from the provided test reports. The reports must be in JUnit XML format. It is important to adhere to the standard [JUnit format](https://llg.cubic.org/docs/junit/) to improve test suite parsing.

### Truncated execution logs

Each CI step supports a maximum log size of 5MB. Harness truncates logs larger than 5MB.
