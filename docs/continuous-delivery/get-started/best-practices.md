---
title: CD Best Practices
description: Best Practices for Harness CD & GitOps
sidebar_position: 9
---

This topic will detail best practices for using Harness CD and GitOps.

## Services

### Don't map one Harness Service to multiple micro services. 

A [Harness Service](/docs/continuous-delivery/get-started/key-concepts#service) is a logical construct used to represent a microservice or workload. Therefore, ensure that your Harness Service is associated with or represents exactly one microservice or workload. 

Do not be afraid to create more services. 