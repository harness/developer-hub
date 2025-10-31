---
title: Develop a Node.js project with React Redux using the FME JavaScript SDK
sidebar_position: 3
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdk-examples/nodejs-with-react-redux-using-javascript-sdk
---

## Overview

This example demonstrates how to integrate the Harness Feature Management Experimentation (FME) JavaScript SDK within a Node.js project that uses React and Redux. The sample project illustrates how to configure the SDK to manage feature flags, evaluate features, and respond to flag changes in a React Redux environment.

Whether you’re building a new app or adding feature flagging capabilities to an existing React Redux project, this example provides a straightforward starting point. It covers setup, configuration, and usage patterns to help platform and release engineering teams speed up development and enforce governance using Harness FME.

## Environment

- React 16.4.2  
- Redux 4.0.0  
- React-Redux 5.0.7  
- Node.js (npm) 5.6.0  

## Getting Started

:::danger
This project uses React and Redux to manage application state, incorporating feature flag evaluations into the Redux store for consistent state management across components.

Make sure your authorization key and client keys are securely managed and not exposed publicly.
:::

### 1. Install Dependencies

1. Run the following command to install the necessary dependencies: `npm install`.

### 2. Configure the SDK

1. Open the `./src/Split.js` file.
1. Replace the placeholders for the authorization key, client keys, and traffic types with your Harness FME environment details.

### 3. Define Features

1. Open the `./src/constants/features.js` file.
1. List the feature flags you want your application to evaluate and manage.

### 4. Start the Application

1. Run this command to launch the app locally: `npm start`.
1. The application will be accessible at http://localhost:4200/.

For advanced usage and configuration options, refer to the FME [JavaScript SDK documentation](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk).