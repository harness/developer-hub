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

### Use Cases

BYOC is particularly useful for:

- **Application-specific failure scenarios**: Test unique failure modes in your applications
- **Complex multi-step chaos experiments**: Create sophisticated fault sequences
- **Industry-specific compliance testing**: Meet regulatory requirements with custom scenarios
- **Custom disaster recovery validation**: Test your specific recovery procedures
- **Integration testing**: Validate resilience of service dependencies

### Getting Started

To create custom faults with BYOC:

1. **Define your fault logic**: Create the business logic for your custom chaos experiment
2. **Package as container**: Build your fault logic into a container image
3. **Create experiment definition**: Define the ChaosExperiment resource with your custom parameters
4. **Execute and monitor**: Run your custom fault as part of chaos experiments

For detailed implementation guidance, examples, and best practices, explore the BYOC documentation in this section.

## Next Steps

- **Explore BYOC Examples**: Review the available BYOC fault implementations
- **Start Simple**: Begin with basic custom fault scenarios
- **Test Thoroughly**: Validate your custom faults in controlled environments
- **Document Well**: Maintain clear documentation for your custom fault implementations
