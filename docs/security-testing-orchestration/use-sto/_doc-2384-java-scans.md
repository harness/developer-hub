---
title: Scanning Java Binaries
description: This is the recommended workflow for scanning Java binary (.jar, .class) files. 
# sidebar_position: 60
---

This topic describes the recommended workflow for scanning Java binary (.jar, .class) files. For some scanners, such as SonarQube and Checkmarx, you need to add one or more Run steps to build your Java binaries before you run the scanner. You also need to set up the Security step to specify the binary folder and files to scan. 


The following steps describe the high-level workflow.

1) Add the repository that contains the Java code for the binaries to your pipeline.

2) Set up your Build stage with the following:

   a) The codebase with the Java code to compile.
   
   b) A Run step with the commands to compile the .java source files to the binaries that you want to scan.
   
   c) If you want to store your binaries outside the local repo, go to the Build stage > Overview tab > Shared Paths and specify the folder -- for example, `java-binaries`.
      
      The step should compile or copy the binaries to a folder that does not contain any source files.

2) Add these settings to the Security step that scans the binaries: 

   a) `workspace` = The folder with the Java binaries to scan.
   
      When a Harness pipeline clones a repo, the root folder is at `/harness` on the local container for the Run step. Thus if you compiled your binaries to `<repo_root>/bin` then set `workspace` to `/harness/bin`.
      
   b) `product_java_binaries` = The Java binary to scan. To scan multiple binaries, use a comma-separated list such as `myservice.jar, subservice1.class, subservice2.class`.
   
   
## Example workflow