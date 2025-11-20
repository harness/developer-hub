---
title: Use case for AWS Sticky Sessions
---

## Issue
When using a **Red/Black (Blue/Green) deployment strategy **all new AWS EC2 instances are added to the same load balancer target group and traffic equally distributes across new and old versions, then the old version deletes as expected.Then the following happens:
* An instance from the new Auto Scaling Group (ASG) becomes healthy.* The load balancer sends traffic to it.* It responds with the link to a JavaScript file.* The load balancer chooses an instance from the old ASG and sends traffic to it, but this instance does not have this script.* Users get ```404 errors``` in their browser.

## Cause
The sessions on the load balancer drop, causing the errors.

