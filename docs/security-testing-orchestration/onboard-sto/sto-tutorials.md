---
title: STO tutorials
description: Get started with STO
sidebar_position: 10
---


The following workflows and [tutorials](/tutorials/security-tests) are available. Harness recommends you do them in this order. 

  1. [Set up Harness for STO](/docs/security-testing-orchestration/onboard-sto/set-up-harness-for-sto) This is a good primer if you're new to Harness. It guides you through the process of setting up your connectors, delegate, and build infrastructure. Then it guides you through the process of setting up a simple standalone STO pipeline. 
   
  2. [Create a standalone STO pipeline](/tutorials/security-tests/standalone-pipeline) This tutorial covers the basic concepts of STO. You'll set up a standalone pipeline with one scanner, run scans, analyze the results, and learn how to investigate and fix detected vulnerabilities.

  3. [Create an integrated STO/CI pipeline](/tutorials/security-tests/cicd-integrated-pipeline) This tutorial shows how to add a scan step to a CI pipeline and configure it to stop any builds automatically if the scanner finds any "show-stopper" vulnerabilities.

  4. [Scanning a NodeJS application](/tutorials/security-tests/nodejs-owasp) This tutorial describes how to scan a Node application automatically using STO and the [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) scanner.