---
title: Module Code Structure
description: Learn about the required code structure for module registry.
sidebar_position: 10
sidebar_label: Module Code Structure
---

OpenTofu or Terraform modules are reusable units of infrastructure configuration that help standardize deployment patterns and improve maintainability. A well-structured module simplifies usage and promotes best practices. This guide outlines the essential components of a Terraform module and how to structure it effectively.

## Requirements
### Root Module
All OpenTofu or Terraform configurations consist of at least one module, known as the root module, which is **the only required element**. The most common name for this file is `main.tf`. This file serves as the entry point for [OpenTofu](https://opentofu.org/) or Terraform execution and contains all the necessary configurations to provision the desired infrastructure.

:::info modules folder
When using submodules, note that they are only recognized if they are placed within the `modules` folder at the root directory. 
Go to [submodule usage](/docs/infra-as-code-management/iacm-features/module-registry/root-sub-module-usage) for more information.
:::

---
## Module Layout
A typical OpenTofu or Terraform module consists of a set of configuration files that define resources, variables, outputs, and dependencies. Below is a recommended directory structure:

```
module-name/
├── main.tf      # Primary resource configurations
├── variables.tf # Input variable definitions
├── outputs.tf   # Output values
├── README.md    # Documentation for the module
├── provider.tf  # Provider configuration (if needed)
├── versions.tf  # Required Terraform and provider versions
├── modules/     # Nested submodules (if applicable)
├── examples/    # Usage examples for reference
└── tests/       # Automated tests for the module
```

## Other key components
### `variables.tf` (Input Variables)
- Declares configurable inputs for the module.
- Variables should include descriptions and, when applicable, default values.

Example:
```hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}
```
Also see [variable usage](/docs/infra-as-code-management/project-setup/input-variables) for more information.

---
### `outputs.tf` (Output Values)
- Defines values that the module will return upon execution.
- Helps users access relevant module data.

Example:
```hcl
output "instance_id" {
  description = "ID of the created EC2 instance"
  value       = aws_instance.example.id
}
```

---
### `README.md` (Module Documentation)
- Provides an overview of the module’s purpose and usage.
- Includes example configurations and descriptions of variables and outputs.

---
### `provider.tf` (Provider Configuration)
If a module requires provider settings, define them here. Avoid hardcoding provider settings within a module to allow flexibility.

Example:
```hcl
tofu {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
```

---
### `versions.tf` (Version Constraints)
- Specifies compatible OpenTofu or Terraform and provider versions.
- Ensures module stability by preventing incompatible updates.

Example:
```hcl
tofu {
  required_version = ">= 1.0.0"
}
```

---
### `modules/` (Nested Modules / Submodules)
If a module is composed of multiple submodules, organize them within this directory to improve modularity and reusability.

:::info module folder
Submodules are only recognized if they are placed within the `modules` folder. 
:::

---
### `examples/` (Usage Examples)
Provide working examples demonstrating how to use the module in different scenarios. This helps users understand its implementation.

---
### `tests/` (Automated Testing)
Testing ensures the module functions as expected. Use tools like `tofu test` or external frameworks such as `Terratest`.

Example test using `tofu test`:
```hcl
tofu {
  test {
    assert {
      condition     = resource.aws_instance.example.instance_type == "t2.micro"
      error_message = "Unexpected instance type"
    }
  }
}
```

---
## Best practices
To ensure your modules are well-structured and maintainable, follow these best practices:

**Root Module:** Always include a `main.tf` file at the root level of your repository. This file serves as the entry point for [OpenTofu](https://opentofu.org/docs/language/modules/) or Terraform execution.
**Modules Folder:** Place all submodules within a `modules/` folder. Submodules are only recognized if they are placed within this folder.
**Consistent Naming:** Use consistent naming conventions for files and directories to improve readability and maintainability.
**Documentation:** Provide comprehensive documentation in the README.md file, including an overview, usage instructions, and examples.
**Version Constraints:** Specify compatible OpenTofu or Terraform and provider versions in the `versions.tf` file to ensure module stability.
**Testing:** Include automated tests in the tests/ directory to verify the functionality of your module.

---
## Conclusion
A well-structured IaC module enhances reusability, maintainability, and collaboration. By following these guidelines, you can create reliable and scalable modules for your infrastructure needs.

For more details, refer to the following documentation:
- [Register a Module](/docs/infra-as-code-management/iacm-features/module-registry/)  
- [Root and Submodule Usage](/docs/infra-as-code-management/iacm-features/module-registry/root-sub-module-usage)