---
title: Developer Environment Setup
description: This document will guide the user through the creation of new Terraform templates to be included in the Harness Template Library.
---

This document will guide the user through the creation of new Terraform templates to be included in the Harness Template Library. The goal will be to guide the user through adding a new local development branch and base scaffold necessary to build a new Terraform Template.

## Prerequisites

This document assumes that your local development environment has followed the steps outline in the [Developer Environment Setup](./developer-env-setup.md) guide.  Please review those requirements to ensure that you have all the tools necessary to proceed.

## Walk-thru

_*STOP*: Before you proceed, make sure you review the [Naming Standards](./naming-convention-standards.md) guide to ensure your new template will adhere to the project standards_

1. Open this repository in your local IDE tool
2. Open a terminal in this local path to this directory
3. Choose a new name for this template. _Don't forget to review [Naming Standards](./naming-convention-standards.md) guide_
4. Create a new branch for your enhancement using the pattern - `feature/<name-for-template>`
5. Run the command `make generate type=terraform name=<name-for-template>`
   _Replace `<name-for-template>` with the name for the resource_

## Next Steps
Once you add the new scaffold, it is time to start building the resources.  The scaffold adds the following files to the repository:
- **main.tf** - _Should contain core resource declarations and data resources used throughout the template. Additional `.tf` files can be added to further organize the resources by grouping them together._
- **locals.tf** - _Local variable declarations and configurations_
- **outputs.tf** - _All output variables should be declared along with their descriptions_
- **providers.tf** - _Contains the Harness provider configuration block and should include any other provider configuration blocks required_
- **terraform.tf** - _Terraform settings and provider version details_
- **terraform.tfvars.example** - _Example file leveraged by end-users to generate custom `terraform.tfvars` files_
- **variables.tf** - _All user-defined variables should be placed within this file_
- **templates (directory)** - _Any Terraform `template_file` source material - e.g. Yaml template files used to define a pipeline_
- **Makefile** - _Standard Makefile included which can be used to execute standard automation_
- **README.md** - _Fully documented user guide for the new template_

### README

To help generate the `resources`, `inputs`, and `outputs` section of the README you can use the [terraform-docs](https://terraform-docs.io/user-guide/installation/) tool to generate this for you: `terraform-docs markdown table --anchor=false . `

### terraform.tfvars.example

This file should include all the variables from your project, their description, and their defaults, so users can easily use this to bootstrap your template. You can again use [terraform-docs](https://terraform-docs.io/user-guide/installation/) to bootstrap this: `terraform-docs tfvars hcl .`
