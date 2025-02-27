---
title: Code Structure
description: Learn about the required code structure for module registry.
sidebar_position: 10
sidebar_label: Module Code Structure
---

To ensure compatibility and ease of use within the Harness module registry, it is essential to follow a specific code structure when developing your modules. This structure helps maintain consistency and facilitates the integration of modules into your infrastructure as code workflows.

## Directory Layout

Each module should be organized into a directory that contains all the necessary files for the module to function. The recommended directory layout is as follows:

```
module-name/
├── main.tf
├── variables.tf
├── outputs.tf
├── README.md
```

### Main Configuration File (`main.tf`)

The `main.tf` file is the primary configuration file for the module. It should contain the core logic and resources that define the module's functionality. This file is the entry point for the module and should be well-organized and documented.

### Variables Definition File (`variables.tf`)

The `variables.tf` file defines the input variables for the module. These variables allow users to customize the module's behavior by providing different values. Each variable should have a clear description and, if applicable, a default value.

### Outputs Definition File (`outputs.tf`)

The `outputs.tf` file specifies the outputs of the module. Outputs are values that are exposed to the user after the module is applied. These values can be used to reference resources created by the module in other parts of your infrastructure.

### Module Documentation (`README.md`)

The `README.md` file provides documentation for the module. It should include an overview of the module, usage instructions, input variables, outputs, and examples. Clear and comprehensive documentation helps users understand how to use the module effectively.

### Examples Directory (`examples/`)

The `examples/` directory contains example configurations that demonstrate how to use the module. These examples should cover common use cases and provide a starting point for users. Each example should be a complete, working configuration that can be deployed independently.

### Nested Modules Directory (`modules/`)

The `modules/` directory is used to organize nested or submodules. Submodules are smaller modules that are used internally by the main module. This directory helps keep the main module directory clean and organized.

## Best Practices

- **Consistency:** Follow a consistent naming convention and structure across all your modules.
- **Documentation:** Provide clear and comprehensive documentation for each module, including usage instructions and examples.
- **Modularity:** Break down complex configurations into smaller, reusable modules.
- **Version Control:** Use version control to manage changes to your modules and track their history.

By adhering to this structure and best practices, you can create well-organized and maintainable modules that integrate seamlessly with the Harness module registry.
