---
title: Overview
sidebar_position: 1
description: Learn how to create and implement custom chaos faults for your specific use cases
---

# Custom Faults Overview

Custom faults allow you to extend Harness Chaos Engineering beyond the built-in fault library to address specific testing scenarios unique to your applications and infrastructure.

## Overview

While Harness Chaos Engineering provides a comprehensive library of pre-built faults, you can create custom faults that go beyond the pre-defined fault types provided by Harness. Custom faults enable you to tailor chaos experiments to meet specific needs, configurations, or scenarios unique to your environment.

Custom faults are ideal for:

- **Application-specific failures**: Simulate failures unique to your business logic
- **Custom infrastructure**: Target specialized infrastructure components  
- **Complex scenarios**: Combine multiple failure modes in custom ways
- **Domain-specific testing**: Address industry-specific reliability requirements

## BYOC (Bring Your Own Chaos)

BYOC is the primary method for creating custom faults in Harness Chaos Engineering. It provides a flexible framework that allows you to define your own chaos experiments using simple YAML specifications.

### Key Features

- **Custom Fault Logic**: Define your own chaos experiments with complete control over fault behavior
- **Flexible Execution**: Execute custom faults using the Harness Chaos Engineering platform infrastructure
- **Integration Ready**: Seamlessly integrate with existing Harness Chaos Engineering workflows and monitoring
- **Simple Configuration**: Use familiar YAML specifications to define fault parameters
