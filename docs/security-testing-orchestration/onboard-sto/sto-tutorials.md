---
title: Get started with STO
description: Get started with STO
sidebar_position: 100
---


The following workflows and tutorials are available. Harness recommends you do them in this order. 

  1. [Set up Harness for STO](/docs/security-testing-orchestration/onboard-sto/set-up-harness-for-sto) This is a good primer if you're new to Harness. It guides you through the process of setting up your connectors, delegate, and build infrastructure. Then it guides you through the process of setting up a simple standalone STO pipeline. 
   
  2. [Create a standalone STO pipeline](/tutorials/orchestrate-security-tests/sto-standalone-workflows) This tutorial covers the basic concepts of STO. You'll set up a standalone pipeline with one scanner, run scans, analyze the results, and learn how to investigate and fix detected vulnerabilities.

  3. [Create an integrated STO/CI pipeline](/tutorials/orchestrate-security-tests/sto-integrated-workflows) This tutorial shows how to add a scan step to a CI pipeline and configure it to stop any builds automatically if the scanner finds any "show-stopper" vulnerabilities.

  4. [Scanning a NodeJS application](/tutorials/orchestrate-security-tests/nodejs-firstscan) This tutorial describes how to scan a Node application automatically using STO and the [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) scanner.