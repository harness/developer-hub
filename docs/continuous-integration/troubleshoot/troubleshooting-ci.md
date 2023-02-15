---
title: Troubleshooting Continuous Integration (CI)
description: Troubleshoot common CI issues. 
# sidebar_position: 2
helpdocs_topic_id: jx7ew69ypa
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic contains general troubleshooting information for error messages and other issues that can arise.

If you cannot find a resolution, please contact [Harness Support](mailto:support@harness.io) or [Harness Community Forum](https://community.harness.io/).


### Troubleshooting remote builds

The Harness CI **Re-run in Debug Mode** feature can troubleshoot remote builds. This command is available only for the following build types:

* This feature is available only for builds in remote infrastructures: Harness Cloud, Kubernetes, or VMs on remote hosts.

* The build must have failed at a Run step within a CI stage. You must build a pipeline at least once before you can run the build in Debug mode. 
  
  To troubleshoot a pipeline that builds successfully but still needs remote troubleshooting, add a Run step with the CLI command `exit 1` and re-run in Debug mode.

The following steps describe the workflow.
  
1. Navigate to the **Builds**, **Execution**, or **Execution History** page in the Harness UI.

2. Choose **Re-run in Debug Mode** in the options menu (**&vellip;**) for the build you want to troubleshoot.

   ![](./static/ci-rerun-build-in-debug-mode.png) 

3. When the Run step fails, the build stops and generates log output with links to web and SSH sessions on the remote host. Follow one of these links to troubleshoot the build.

   ![](./static/debug-remote-build-links.png) 

4. When you're in the debug session, use the CLI to reproduce and troubleshoot the issue on the remote host. 

5. To terminate the debug session, abort the build and then run a new build to determine if the issue is resolved. 


### Troubleshooting test suites

The following issues can occur when parsing test suites in Harness CI.

#### Test suites wrongly parsed

The parsed Test report in the Test tab comes strictly from the JUnit reports provided. It is important to adhere to the standard format to improve test suite parsing. 

Refer to the standard [JUnit format](https://llg.cubic.org/docs/junit/).


### Truncated execution logs

Currently we support only upto 5 MB for each CI step. If the log size is exceeding 5 MB, logs will be truncated.


