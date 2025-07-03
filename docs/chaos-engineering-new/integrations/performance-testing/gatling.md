---
title: Load Testing with Gatling
description: Learn about load testing experiments using Gatling in Harness Chaos Engineering
sidebar_position: 41
---

Gatling is an open-source load testing framework designed for high-performance testing of web applications, APIs, and microservices. It helps you evaluate your system's performance and resilience under various load conditions by simulating thousands of concurrent users and generating detailed performance reports.

In the context of chaos engineering, Gatling-based load testing experiments help you:

- **Identify Performance Bottlenecks**: Discover where your system slows down under load
- **Test Scalability**: Understand how your system scales with increased demand
- **Validate SLA Compliance**: Ensure your system meets performance requirements
- **Improve Resilience**: Build confidence in your system's ability to handle traffic spikes
- **Generate Detailed Reports**: Get comprehensive performance analytics and visualizations

## Prerequisites

Before setting up your Gatling load test, ensure you have:

- Access to a Gatling Enterprise instance
- A configured Gatling simulation ready to run
- Appropriate permissions to create and execute pipelines in Harness

## Required Variables

The following table outlines the essential variables required to configure your Gatling load test:

| Variable | Description | Type | Required |
|----------|-------------|------|----------|
| `simulation_id` | Unique identifier for your Gatling simulation (found in your Gatling Enterprise dashboard under Simulations) | String | Yes |
| `token` | Authentication token for Gatling Enterprise API access (generated in your Gatling Enterprise user settings) | String | Yes |
| `gatling_url` | Base URL of your Gatling Enterprise instance (e.g., https://your-gatling-instance.com) | String | Yes |

### Interactive Setup Guide

Follow along with this interactive guide to learn how to set up Gatling load testing with chaos experiments:

<DocVideo src="https://app.tango.us/app/embed/add05677-5274-4f26-b342-b1331298d059?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Run Chaos Experiment in Harness" />

## Setting up a Chaos Experiment with Gatling Load Test

This integration allows you to run chaos experiments while your system is under load, providing realistic testing conditions to validate your system's resilience.

### 1. Set up your pipeline

Create a new pipeline or select an existing pipeline in your project.

<!-- ![Create pipeline](./static/load-testing-gatling/create-pipeline.png) -->

### 2. Create a new stage and add Gatling step

Add a new stage to your pipeline. For this example, we've chosen a custom stage. 

<!-- ![Create stage](./static/load-testing-gatling/create-stage.png) -->

Then click **Add Step** and choose **Use Template**.

<!-- ![Add step](./static/load-testing-gatling/add-step.png) -->

Select the Gatling step template from the Harness template library.

<!-- ![Choose template](./static/load-testing-gatling/choose-gatling-step-template.png) -->

Name your step template and click **Apply Changes**.

### 3. Run the pipeline to test your Gatling load setup

After saving your changes in the pipeline, run the pipeline to execute the Gatling load test and verify that everything is set up correctly. Then, click **Run**.

<!-- ![Run pipeline](./static/load-testing-gatling/run-pipeline.png) -->

Add your Gatling credentials in the next step and click **Run the Pipeline**.

<!-- ![Add Gatling credentials](./static/load-testing-gatling/add-gatling-credentials.png) -->

If the build is successful, your Gatling load test setup is complete.

<!-- ![Gatling load setup done](./static/load-testing-gatling/gatling-load-setup-done.png) --> 

### 4. Add chaos experiment to run in parallel

Go back to your pipeline and add a step parallel to your Gatling load test. This allows the chaos experiment to run simultaneously while your system is under load, creating realistic testing conditions.

Click **Add Step** parallel to the Gatling step.

Search for **Chaos** to add a new chaos experiment.

<!-- ![Choose chaos](./static/load-testing-gatling/choose-chaos.png) -->

Name your experiment and choose a chaos experiment. You can select an existing experiment or create a new one.

<!-- ![Choose chaos experiment](./static/load-testing-gatling/choose-experiment.png) -->

Click **Apply Changes**.

<!-- ![Click Apply changes](./static/load-testing-gatling/click-apply-changes.png) --> 

Now, run the pipeline again to execute the Gatling load test and the chaos experiment in parallel. This simulates real-world conditions where your system faces both traffic load and infrastructure failures.

<!-- ![See the results](./static/load-testing-gatling/see-the-results.png) -->

## How It Works

The Gatling integration in Harness Chaos Engineering follows this workflow:

### 1. Prerequisites Validation

- Ensures `jq` is installed (installs automatically if missing)
- Validates that all required variables are provided

### 2. Start Simulation

- Makes an API call to start your configured Gatling simulation
- Receives a unique run ID for tracking the execution

### 3. Monitor Execution

- Continuously monitors the simulation status through these phases:
  - **Building**: Preparing the simulation environment
  - **Deploying**: Setting up load generators  
  - **Deployed**: Ready to start traffic generation
  - **Injecting**: Actively running the load test
  - **Completed**: Load test finished

### 4. Parallel Chaos Execution

- While the load test runs, chaos experiments execute simultaneously
- This combination tests your system's behavior under both normal load and failure conditions
- Results from both tests help validate your system's overall resilience

### 5. Completion

- Both the load test and chaos experiment complete
- Combined results provide insights into system performance under realistic stress conditions
