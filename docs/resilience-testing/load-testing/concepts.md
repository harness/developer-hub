---
title: Load Testing Concepts
sidebar_label: Concepts
sidebar_position: 2
description: Core concepts and terminology for Harness Load Testing
---

This page explains the key terms and concepts you will encounter when working with Harness Load Testing.

## Virtual Users

A **virtual user** (VU) simulates a real user interacting with your application. Each virtual user independently executes the scenario you define: sending HTTP requests, waiting for responses, and looping through the sequence for the duration of the test.

The **Number of Users** setting controls how many virtual users run concurrently at peak load. Higher concurrency means more simultaneous requests hitting your system.

## Load Profile

The **load profile** describes how virtual users are added over the course of a test. Harness Load Testing uses a ramp-up then steady-state model:

```
Users
  |         ___________________
  |        /
  |       /
  |______/
  |________________________________ Time
     ^          ^
  Ramp-Up    Steady State
```

### Ramp-Up Phase

Virtual users are added linearly from 0 to the target **Number of Users** over the **Ramp-Up Duration**. This gradual increase:

- Avoids sending a sudden spike that could overwhelm the system at the start
- Lets you observe how your system responds as load increases
- Models realistic traffic patterns where load builds over time

### Steady-State Phase

After ramp-up completes, the configured number of virtual users continues running for the remainder of the **Test Duration**. The steady-state duration is:

```
Steady-State Duration = Test Duration - Ramp-Up Duration
```

**Example**: 600s total duration with 120s ramp-up gives 480s at peak load.

## Load Test Frameworks

### Locust

[Locust](https://locust.io/) is a Python-based, open-source load testing framework. It is the currently supported framework in Harness Load Testing.

Locust models user behavior as Python classes, making it straightforward to script complex scenarios like authentication flows, session-based interactions, and conditional logic.

**JMeter** and **K6** are coming soon.

## Scenario Definition

A **scenario** defines the sequence of HTTP requests your virtual users execute. Each request in the scenario includes:

- **HTTP Method**: GET, POST, PUT, DELETE, PATCH, etc.
- **Endpoint URL**: The full URL for UI-defined tests, or a path relative to the Host URL for script-based tests
- **Request Name**: An optional label for identifying the request in results
- **Query Parameters**: URL query string parameters as key-value pairs
- **Headers**: HTTP request headers (e.g., `Authorization`, `Content-Type`)
- **Assertions**: Conditions that must be true for the request to count as a success
- **Extractions**: Values captured from responses and reused in later requests

### Assertions

Assertions define success criteria for each request. A failed assertion marks that request as an error in the test results.

| Assertion Type | What it checks |
|---|---|
| **Text** | The response body contains (or does not contain) a specific string |
| **Response Time** | The request completes within a specified time threshold (milliseconds) |

### Extract from Response

Response extraction captures a dynamic value from a response (such as a token returned after a login request) and makes it available as a variable in subsequent requests. This enables realistic multi-step flows like:

1. POST `/auth/login` - extract `access_token` from response body
2. GET `/api/user/profile` with `Authorization: Bearer {{access_token}}`

## Host URL

When uploading a Python script, the **Host URL** is the base URL of the application under test. Locust prepends this to all relative paths in your script. For example, with Host URL `https://api.example.com`, a request to `/users` becomes `https://api.example.com/users`.

## Test Definition Modes

### Define test via UI

Build HTTP scenarios visually without writing code. Harness generates the Locust script from your configuration at execution time. Best for straightforward API and web scenarios.

### Upload Python Script

Upload a custom `.py` Locust script for full control over user behavior. Best for complex flows, custom authentication, or reusing existing Locust scripts.

## Next Steps

- [Get Started with Load Testing](./get-started): Create and run your first load test
- [Analyze Results](./analyze-results): Understand and interpret load test execution results
- [Load Test Infrastructure](./infrastructure): Set up the agent that runs your tests
