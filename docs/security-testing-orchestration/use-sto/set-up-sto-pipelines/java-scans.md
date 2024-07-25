---
title: Scanning Java Binaries in STO
description: How to scan Java binary (.jar, .class) files. 
sidebar_position: 100
sidebar_label: Scan Java binaries
redirect_from: 
  - /docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/java-scans
---

This topic describes the recommended workflow for scanning Java binary (.jar, .class) files. For some scanners, such as SonarQube and Checkmarx, you need to add one or more Run steps to build your Java binaries before you run the scanner. You also need to set up the security step to specify the Java binaries you want to scan. 

:::note
This workflow requires a [Continuous Integration](/docs/continuous-integration) license in addition to an STO license.
:::

The following steps describe the high-level workflow.

1. Set up your CI Build stage with the following:

   1. The codebase with the Java code to compile.
   
   2. A Run step with the commands to compile the .java source files to the binaries that you want to scan.

      - If your codebase is large, you might want to increase the [**memory and CPU resources**](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings/#set-container-resources) reserved for your Run step. 
      - To configure your Java runtime environment, go to **Environment Attributes** in the Run step and add a [`JAVA_TOOL_ARGUMENTS`](https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/envvars002.html) setting. 

         Suppose you want to specify the heap size of your environment. You can add an attribute like this:

         * Key = `JAVA_TOOL_OPTIONS`
         * Value = `-Xmx2g -Xms1g`
   
   3. If you want to store your binaries outside the local repo, go to the **Build** stage > **Overview** tab > **Shared Paths** and specify the folder -- for example, `java-binaries`.
      
      The step should compile or copy the binaries to a folder that does not contain any source files.

2. Add these settings to the Security step that scans the binaries: 

   1. `workspace` = The folder with the Java binaries to scan.
   
      When a Harness pipeline clones a repo, the root folder is at `/harness` on the local container for the Run step. Thus if you compiled your binaries to `<repo_root>/bin`, then set `workspace` to `/harness/bin`.
      
   2. `product_java_binaries` (_SonarQube scans only_) = The Java binary or binaries to scan. To scan multiple binaries, use a comma-separated list such as `myservice.jar, subservice1.class, subservice2.class`.

   3. `JAVA_TOOL_OPTIONS` You can run the step with specific Java tool options. For example, you can add a setting to [access an external Checkmarx server](/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference#settings) through a proxy.
   