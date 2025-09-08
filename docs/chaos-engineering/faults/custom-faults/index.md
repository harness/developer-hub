---
title: Overview
sidebar_position: 1
description: Learn how to create and implement custom chaos faults for your specific use cases
---

# Custom Faults Overview

Custom faults allow you to extend Chaos beyond the built-in fault library to address specific testing scenarios unique to your applications and infrastructure.

:::info New Chaos Studio Feature
**Custom Faults** are part of the enhanced **New Chaos Studio** experience. If you're an existing customer and want access to new features, contact your Harness support representative. For more details, see [New Chaos Studio Features](/docs/chaos-engineering#new-chaos-studio-features).
:::

## Overview

While Harness Chaos provides a comprehensive library of pre-built faults, you can create custom faults that go beyond the pre-defined fault types provided by Chaos. Custom faults enable you to tailor chaos experiments to meet specific needs, configurations, or scenarios unique to your environment.

Custom faults are ideal for:

- **Application-specific failures**: Simulate failures unique to your business logic
- **Custom infrastructure**: Target specialized infrastructure components  
- **Complex scenarios**: Combine multiple failure modes in custom ways
- **Domain-specific testing**: Address industry-specific reliability requirements

## Ways to Create Custom Faults

Harness Chaos Engineering provides two approaches for creating custom faults:

### 1. Create Custom Faults

Build custom faults from scratch with complete control over configuration and behavior. This approach gives you maximum flexibility to implement fault injection logic tailored to your specific requirements.

[Learn more about creating custom faults →](./create-custom-faults)

### 2. Custom Fault Templates

Use pre-configured templates that can be customized for your specific needs. This approach provides a faster way to create faults using proven patterns and best practices.

[Learn more about custom fault templates →](./custom-fault-templates)
