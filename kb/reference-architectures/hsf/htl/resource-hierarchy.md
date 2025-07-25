---
title: Resource Hierarchy
description: When creating flexible templates there may be resources you want to create that could exist at multiple scopes - Account, Organization, or Project. 
---

When creating flexible templates there may be resources you want to create that could exist at multiple scopes: Account, Organization, or Project. 

To do this, you must do three things:
* Have the user specify the location where the template should be placed
* Place the resource [using the terraform code] at the target location
* Dynamically give the users links to the created resources

We can achieve this using the following pattern in your catalog and terraform code.

## Specify Location 
You can use the following template section in your catalog to ask the user where the resource should be placed.
```
  parameters:
    - title: Template Location
      description: Where should we put it?
      required:
        - template_location
      properties:
        template_location:
          title: Template Location
          type: string
          description: Where should we place the template?
          enum:
            - Account
            - Organization
            - Project
      dependencies:
        template_location:           
          oneOf:
          - properties:
              template_location:
                enum:
                  - Account
          - properties:
              template_location:
                enum:
                  - Organization
              org_id:
                title: Org Identifier
                description: Harness Organization Identifier
                type: string
                ui:field: HarnessOrgPicker
            required:
              - org_id
          - properties:
              template_location:
                enum:
                  - Project
              project_id:
                title: Project Identifier
                description: Harness Project Identifier
                type: string
                ui:field: HarnessProjectPicker
              org_id:
                title: Org Identifier
                description: Harness Organization Identifier
                type: string
                ui:field: HarnessOrgPicker
            required:
              - project_id
              - org_id
```

You can then pass the org and project IDs to your terraform based on the values selected:

```
RESOURCE_VARS:  
  organization_id: ${{ parameters.org_id if parameters.project_id else ( parameters.org_id if parameters.org_id else "") }}
  project_id: ${{ parameters.project_id if parameters.project_id else "" }}
```

## Use Location
Now in your terraform, you need to define variables for the org and project IDs, and use them in your resource definition.
```
variable "organization_id" {
  type        = string
  description = "[Optional] The organization where the step template will live, leave blank for account level. Provide an existing organization reference ID.  Must exist before execution"
  default     = null
}

variable "project_id" {
  type        = string
  description = "[Optional] The project where the step template will live, leave blank for organization or account level. Provide an existing project reference ID.  Must exist before execution"
  default     = null
}
```
We use data sources to validate that the locations exist before we try and create them (plan failures vs apply failures).

```
data "harness_platform_organization" "this" {
  count      = var.organization_id == null ? 0 : 1
  identifier = var.organization_id
}

data "harness_platform_project" "this" {
  count      = var.project_id == null ? 0 : 1
  identifier = var.project_id
  org_id     = data.harness_platform_organization.template[0].id
}
```
Lastly we can use the data to place the resources we are creating at whatever level specified by the user.

```
resource "harness_platform_template" "this" {
  org_id     = var.template_organization_id == null ? null : data.harness_platform_organization.template[0].id
  project_id = var.template_project_id == null ? null : data.harness_platform_project.template[0].id
}
```

## Returning resource links
Finally we want to give the user handy links in their template so they can easily navigate to the created resource. We just ned to craft the resource URL based on the org or project specified. This may change based on the resource you are linking to, the following is an example for some of the common resources.

```
output:
  links:
    - title: Created Resource
      url: ${{ parameters.solutions_factory_details.harness_account_url }}/ng/account/${{ parameters.solutions_factory_details.harness_account_id }}/all${{ ("/orgs/" + parameters.org_id) if parameters.org_id else "" }}${{ ("/projects/" + parameters.project_id) if parameters.project_id else "" }}/settings/templates/${{ template_id }}
```