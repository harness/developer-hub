---
title: Experiment scope
sidebar_position: 10
---

Harness FME lets anyone roll out features and experiment with a target group of users across the full stack: from deep in the back end to client-facing JavaScript and mobile applications. Features can be released to a small subset of users to gather usability feedback or measure performance, then rolled out to everyone, or rolled back with the click of a button if bugs appear.

This methodology is called feature experimentation.

## Maintain stickiness of randomization

Harness FME provides out-of-the box SDKs for 10 different languages. (The documentation for each SDK is [here](../../sdks-and-infrastructure/).) These SDKs can be imported into a project within minutes, and are designed to deterministically bucket customers so that, given a rollout plan, a user will receive a consistent experience across all of FME SDKs.

In each supported language, the SDK client is designed to be a fully contained decision engine. This means the Harness FME back end is not involved in making the choice of treatment a customer will be served. Rather, the SDK simply polls Harness FME servers on a regular basis to store the most up-to-date rollout plans you set in Harness FME.

The FME SDK is making that decision at runtime with the most up to date targeting information. For example, you might want to show a feature only to someone who logged in at least 10 times. Since this is a dynamically changing count, you’ll want to make a decision in your code at runtime rather than pass the login count to Harness servers and have to wait for a decision to come back.

This decision engine is architected so that when you use FME to randomly assign customers into 50%-on and 50%-off buckets it can perform the randomization without needing to call back to Harness servers. Harness FME built the same deterministic hashing algorithm across all of our SDKs to maintain the same sticky bucketing across any language.