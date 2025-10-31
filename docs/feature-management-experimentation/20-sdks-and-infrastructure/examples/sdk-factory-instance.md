---
title: Manage Multiple Web Components with a Single SDK Factory Instance
sidebar_position: 1
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdk-examples/using-split-with-multiple-web-components
---

## Overview

This [code example](https://github.com/kleinjoshuaa/Multiple-Web-Components), contributed by Joshua Klein, shows how to employ a shared SDK module injected into each of multiple micro frontend JS files. This approach allows for independent development and tooling without having multiple SDK factory instances running in the same browser.

### What are micro frontends?

Micro Frontends are a relatively new architectural style that involves extending the concept of microservices to the front end of an application. 

Essentially, in a micro frontend architecture, each UI module is developed, deployed, and maintained independently. This allows independent teams to move faster and have more control over their individual components. Similarly to microservices this requires well-defined interfaces and APIs to ensure that intercommunication between micro frontends scales and is maintainable.

In this [example](https://github.com/kleinjoshuaa/Multiple-Web-Components), we demonstrate how to use Split as a shared utility that is in scope for each micro frontend.