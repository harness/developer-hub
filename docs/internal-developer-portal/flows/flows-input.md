---
title: Workflow Inputs
description: Instructions to build the UI of individual workflows and all the types of inputs possible in Workflows
sidebar_position: 4
sidebar_label: Workflow Inputs
redirect_from:
  - /docs/internal-developer-portal/flows/custom-extensions
---

Workflows allow users to provide input parameters that drive the execution of templates. A well-designed form ensures a smooth user experience by offering the right input types and validation mechanisms. Inputs can be categorized into static inputs, where users manually enter values, and dynamic inputs, which fetch or derive values based on context.


## Input Types
There are different types of Inputs as explained below:

#### Static Inputs

These inputs require users to enter predefined values manually.

- `string` – Single-line text input
- `textarea` – Multi-line text input
- `number` – Numeric input
- `boolean` – Checkbox (true/false)
- `enum` – Dropdown selection from a predefined list
- `array` – List of values (e.g., strings, numbers)
- `object` – Key-value pair inputs
- `password` – Masked input for sensitive values

#### Dynamic Inputs

These inputs fetch values dynamically based on external data sources or runtime context.

1. [Standard Workflow UI Picker](/docs/internal-developer-portal/flows/flows-input#workflow-ui-pickers)
    - `Entity Picker` – Select an entity from the catalog
    - `Owner Picker` – Select a user or group
    - `Repository Picker` – Choose a repository from a version control provider

2. [API Based Dynamic Workflow UI Picker](/docs/internal-developer-portal/flows/dynamic-picker)

    - `Dynamic API Picker` – Fetch options dynamically via an API request
    - `Autocomplete Fields` – Suggestions based on previous inputs or external data fetched using Dynamic API Picker. 



## Input Examples

### Simple text input

#### Simple input with basic validations

Basic form inputs allow users to provide structured data while ensuring it meets specific requirements. You can define constraints such as character limits, patterns, and UI hints to guide users effectively.

Example [`workflows.yaml`](https://github.com/harness-community/idp-samples/blob/main/workflow-examples/text-input-pattern.yaml)

This example demonstrates a simple text input field with:

- A `title` and `description` for clarity.
- A **maximum length constraint** (`maxLength: 8`).
- A r**egex pattern validation** (`pattern`) to enforce naming rules.
- **UI enhancements** like autofocus and helper text.

<details>
<summary>Example YAML</summary>

```YAML
parameters:
  - title: Fill in some steps
    properties:
      name:
        title: Simple text input
        type: string
        description: Description about input
        maxLength: 8
        pattern: "^([a-zA-Z][a-zA-Z0-9]*)(-[a-zA-Z0-9]+)*$"
        ui:autofocus: true
        ui:help: "Hint: additional description..."
```

</details>

![](./static/workflows-pattern.png)

#### Multi-line text input

Multi-line text inputs are useful for capturing larger blocks of text, such as descriptions, configuration snippets, or scripts. This example demonstrates how to use a textarea widget to enable multi-line input, with additional UI options for better usability.

Example [`workflows.yaml`](https://github.com/harness-community/idp-samples/blob/main/workflow-examples/multi-line-input.yaml)

This configuration includes:

- A textarea widget (`ui:widget: textarea`) for multi-line input.
- Custom row height (`ui:options: rows: 10`) for better visibility.
- A **placeholder example** showcasing a shell script.
- **Helper text** (`ui:help`) to guide users.

<details>
<summary>Example YAML</summary>

```YAMl
parameters:
  - title: Fill in some steps
    properties:
      multiline:
        title: Text area input
        type: string
        description: Insert your multi line string
        ui:widget: textarea
        ui:options:
          rows: 10
        ui:help: 'Hint: Make it strong!'
        ui:placeholder: |
          a=50
          b=60
          sh << word
          > echo "Equation: a + b = 110"
          > echo $(($a + $b))
          > echo ""
          > echo "Inside Here Tag, Assignment c=110"
          > c=`expr $a + $b`
          > echo $c
          > word
```

</details>

![](./static/workflows-multiline.png)


### Array options

Array inputs allow users to provide multiple values, either as strings, numbers, or complex objects. These can be structured to ensure uniqueness, predefined options, or flexible custom objects.

#### Array with strings

Example [`workflows.yaml`](https://github.com/harness-community/idp-samples/blob/main/workflow-examples/arrays.yaml)

#### Array with distinct values

Values mentioned under `enum` needs to be distinct, duplicate values aren't allowed under `enum`.

<details>
<summary>Example YAML</summary>

```YAML
parameters:
  - title: Fill in some steps
    required:
      - name
    properties:
      name:
        title: Name
        type: string
        description: Unique name of the component
      volume:
        title: Volume Type
        type: string
        description: The volume type to be used
        default: 'Cold HDD'
        enum:
          - 'Provisioned IOPS'
          - 'Cold HDD'
          - 'Throughput Optimized HDD'
          - 'Magnetic'
```

</details>

![Arrays With Distinct Values](./static/arrays-distinct-values.png)

#### Array with duplicate values

Allows multiple values, including duplicates, by using `enumNames` to provide user-friendly labels.

<details>
<summary>Example YAML</summary>

```YAML
parameters:
  - title: Fill in some steps
    properties:
      volume_type:
        title: Volume Type
        type: string
        description: The volume type to be used
        default: gp2
        enum:
          - gp2
          - gp3
          - io1
          - io2
          - sc1
          - st1
          - standard
        enumNames:
          - 'General Purpose SSD (gp2)'
          - 'General Purpose SSD (gp3)'
          - 'Provisioned IOPS (io1)'
          - 'Provisioned IOPS (io2)'
          - 'Cold HDD (sc1)'
          - 'Throughput Optimized HDD (st1)'
          - 'Magnetic (standard)'
```

</details>

![Arrays With Duplicate Values](./static/arrays-duplicate-values.png)

#### A multiple choices list with checkboxes

Users can select multiple predefined values from checkboxes.

Key Features:
- Supports **multiple selections**
- Uses **checkbox UI** for easy selection
- Ensures **unique selections** with `uniqueItems: true`

Example [`workflows.yaml`](https://github.com/harness-community/idp-samples/blob/5140ef7993a3c932c49af9162562a99e16428080/workflow-examples/multi-choice-list.yaml#L24-L34)

<details>
<summary>Example YAML</summary>

```yaml
parameters:
  - title: Fill in some steps
    properties:
      name:
        title: Select environments
        type: array
        items:
          type: string
          enum:
            - production
            - staging
            - development
        uniqueItems: true
        ui:widget: checkboxes
```

</details>

![](./static/multi-option-arrays.png)

#### Array with Custom Objects

This allows users to enter an **array of complex objects**, each containing multiple fields. It supports adding, removing, and reordering objects dynamically.

Example [`workflows.yaml`](https://github.com/harness-community/idp-samples/blob/5140ef7993a3c932c49af9162562a99e16428080/workflow-examples/multi-choice-list.yaml#L24-L34)

A user needs to provide a list of configurations, each containing:

- A dropdown selection (`array`)
- A boolean flag (`flag`)
- A free-text input (`someInput`)

<details>
<summary>Example YAML</summary>

```yaml
parameters:
  - title: Fill in some steps
    properties:
      arrayObjects:
        title: Array with custom objects
        type: array
        minItems: 0
        ui:options:
          addable: true
          orderable: true
          removable: true
        items:
          type: object
          properties:
            array:
              title: Array string with default value
              type: string
              default: value3
              enum:
                - value1
                - value2
                - value3
            flag:
              title: Boolean flag
              type: boolean
              ui:widget: radio
            someInput:
              title: Simple text input
              type: string
```

</details>

![](./static/template-arrays-multipleobjects.png)


### Comparison Table of Array Input Types  

| Feature | Distinct Values | Duplicate Values | Multiple Choice List | Custom Object Array |
|---------|----------------|------------------|----------------------|---------------------|
| **Dropdown Selection** | ✅ | ✅ | ❌ | ❌ |
| **Checkbox UI** | ❌ | ❌ | ✅ | ❌ |
| **Allows Multiple Selections** | ❌ | ❌ | ✅ | ✅ |
| **Supports Complex Objects** | ❌ | ❌ | ❌ | ✅ |
| **User-friendly Labels** (`enumNames`) | ❌ | ✅ | ❌ | ✅ |



#### Pass an Array of Inputs to a Harness Pipeline 

Harness Pipelines only support three variable types:

- String
- Number
- Secret

This means that arrays cannot be directly passed as pipeline inputs. Instead, if you need to pass multiple values, you should convert the array into a comma-separated string using [join](https://mozilla.github.io/nunjucks/templating.html#join) in Nunjucks.

- Use Case: 
You want users to select multiple values from a `enum` list, and then pass those values as a single comma-separated string into the Harness Pipeline’s `inputset`.

- How It Works: 
1. User selects multiple options from an enum list (`Option1`, `Option2`, `Option3`).
2. The selected options are joined into a single string using `parameters.exampleVar.join(',')`.
3. The pipeline **receives the values as a single string**, ensuring compatibility with Harness’ input format.

```YAML
    - title: Pass Variables Here      
      properties:
        exampleVar:
          title: Select an option
          type: array
          items:
            type: string
            enum:
              - Option1
              - Option2
              - Option3
          default: 
            - Option1
      ui:
        exampleVar:
          title: Select Options
          multi: true
  steps:
    - id: trigger
      name: Call a harness pipeline, and pass the variables from above
      action: trigger:harness-custom-pipeline
      input:
        url: 'https://app.harness.io/ng/account/*********/home/orgs/default/projects/*************/pipelines/*************/pipeline-studio/?storeType=INLINE'
        inputset:
          exampleVar: ${{ parameters.exampleVar.join(',') }}
          owner: ${{ parameters.owner }}
        apikey: ${{ parameters.token }}
```


### Boolean options

Boolean inputs allow users to select between true/false or yes/no values in forms. These inputs are useful for enabling/disabling features, selecting configuration options, and making binary choices.

#### Basic Boolean (Checkbox Input)

A simple **checkbox** allows users to toggle a setting on/off.

```YAML
parameters:
  - title: Fill in some steps
    properties:
      name:
        title: Checkbox boolean
        type: boolean
```

![](./static/template-checkbox-boolean.png)

#### Boolean Yes or No options (Radio Button)

Instead of a checkbox, you can use radio buttons for a clearer Yes/No selection.

```YAML
parameters:
  - title: Fill in some steps
    properties:
      name:
        title: Yes or No options
        type: boolean
        ui:widget: radio
```

![](./static/template-boolean-radio.png)

#### Boolean multiple options

For cases where **multiple boolean choices** are needed, you can use an array of checkboxes.

<details>
<summary>Example YAML</summary>

```yaml
parameters:
  - title: Fill in some steps
    properties:
      name:
        title: Select features
        type: array
        items:
          type: boolean
          enum:
            - "Enable scraping"
            - "Enable HPA"
            - "Enable cache"
        uniqueItems: true
        ui:widget: checkboxes
```

</details>

![](./static/template-boolean-multiselect.png)

#### When to Use Each Boolean Input Type

| **Input Type**            | **Best Use Case**           | **Example Scenario**                |
|---------------------------|----------------------------|--------------------------------------|
| **Checkbox Boolean**       | Single feature toggle      | Enable/Disable Dark Mode            |
| **Radio Button Boolean**   | Explicit Yes/No choice     | Confirming a deletion               |
| **Multi-Select Boolean**   | Selecting multiple options | Enable multiple monitoring features |


## Advanced Input Configurations

### Upload a file using Workflows

Workflow supports a limited form of file types as input, in the sense that it will parse the file contents to Workflow inputs as [data-urls](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data).

There are 3 types of file upload.

1. Single File: There are two formats available `data-url` and `file`. 
2. Multiple Files: Multiple files selectors are supported by defining an `array` of strings having `data-url` as a format. 
3. Single File with Accept Attribute: You can use the `accept` attribute to specify a filter for what file types the user can upload.

<details>
<summary>Example YAML</summary>

```YAML
#Example
title: Files
type: object
properties:
  file:
    type: string
    format: data-url
    title: Single file
  files:
    type: array
    title: Multiple files
    items:
      type: string
      format: data-url
  filesAccept:
    type: string
    format: data-url
    title: Single File with Accept attribute
    ui:enableMarkdownInDescription: true
    ui:description: Provide the Json File
    ui:options:
      accept: .json
```
</details>


### Hide the uploaded file contents in Workflow review page

When you upload a file in Workflows, you can see the base-64 encoded content of the file on the review page, to hide them you can use `ui:backstage`. 

```YAML
...
properties:
  uploaded_file:
    title: Upload File
    type: string
    format: data-url
    description: Upload a file that will be processed in the workflow
    ui:backstage:
      review:
        show: false
        mask: true
...
```
[Example workflow.yaml](https://github.com/Debanitrkl/backstage-test/blob/main/upload-file-prod.yaml)

![](./static/file-upload-hide-content.png)

### How to use the contents of the file uploaded

Files uploaded to workflows are automatically encoded in **base64** format. To use the contents of an uploaded file, the **base64-encoded data** must first be decoded. This can be achieved using the Run Step in IDP stage.

1. Start with a Run Step in IDP stage, write a script in the step to: 
  - Extract the base64-encoded content from the uploaded file.
  - Decode the content back to its original format.
2. Process or utilize the decoded content as needed in the steps that follow.

**Without decoding, the uploaded file contents cannot be directly used.** 

Here's an [example](https://github.com/Debanitrkl/backstage-test/blob/main/pipeline-to-parse-json.yaml) harness pipeline that uses [PowerShell](https://github.com/Debanitrkl/backstage-test/blob/b420528f309ef2a84e5190689912a929d53bc90a/pipeline-to-parse-json.yaml#L29-L84) in run step to decode the content of the file uploaded to Workflows. 

![](./static/demo-pwsh-process-json.png)

### Using Secrets

You may want to mark things as secret and make sure that these values are protected and not available through REST endpoints. You can do this by using the built-in `ui:field: Secret` and `ui:widget: password`.

:::info
`ui:widget: password` needs to be mentioned under the first `page` in-case you have multiple pages.

```YAML {14}
# example workflow.yaml
...
parameters:
  - title: <PAGE-1 TITLE>
    properties:
      property-1:
        title: title-1
        type: string
      property-2:
        title: title-2
    token:
      title: Harness Token
      type: string
      ui:widget: password
      ui:field: HarnessAuthToken
  - title: <PAGE-2 TITLE>
    properties:
      property-1:
        title: title-1
        type: string
      property-2:
        title: title-2
  - title: <PAGE-n TITLE>
...
```

:::

You can define this property as any normal parameter, however the consumption of this parameter will not be available through `${{ parameters.myKey }}` you will instead need to use `${{ secrets.myKey }}` in your `workflow.yaml`.

Parameters will be automatically masked in the review step.

<details>
<summary>Example YAML</summary>

```YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: v1beta3-demo
  title: Test Action Workflow
  description: Workflows Demo
spec:
  owner: backstage/techdocs-core
  type: service

  parameters:
    - title: Authentication
      description: Provide authentication for the resource
      required:
        - username
        - password
      properties:
        username:
          type: string
          # use the built in Secret field extension
          ui:field: Secret
        password:
          type: string
          ui:field: Secret

  steps:
    - id: setupAuthentication
      action: auth:create
      input:
        # make sure to use ${{ secrets.parameterName }} to reference these values
        username: ${{ secrets.username }}
        password: ${{ secrets.password }}
```

</details>

### Pre-fill workflows with URL Params

We can now automatically load IDP Workflow forms pre-filled using the `formData` URL query parameter. e.g.: `https://app.harness.io/ng/account/account_id/module/idp/create/templates/default/a-python-lambda?formData=%7B%22project_name%22%3A%22auto%20filled%22%7D`

The query parameters `?formData=%7B%22project_name%22%3A%22auto%20filled%22%7` in the end of the URL allow you to automatically fill in values of the form. Please see the below table for explanation of individual tokens in the query param.

| Item                | Example Value                           | Explanation                                                                                      |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `formData`          | `formData`                              | Key of the query param.`formData` object is used to fill out IDP Workflow forms.                 |
| `{"key"%3A"value"}` | `{"title"%3A"Title from query params"}` | Value of the query param. A JSON object with invalid URL characters encoded.`:` encodes to `%3A` |

### Add Read only Fields

Using automatically filled out values is handy when wanting to direct users to use IDP Workflows with known good values. This also allows automation to be constructed around the Workflows, where the automation can provide fully constructed IDP URLs to the user. You can also prevent user from modifying the form values inserted from query params by making the form fields `readonly`. See below example of a minimal form which would be filled using query params defined in the above explanation.

<details>
<summary>Example YAML</summary>

```YAML {15}
## Example Workflow
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: test-workflow-pipeline
  title: Test pipeline using Workflows
spec:
  owner: name.owner
  type: service
  parameters:
    - title: Repository Name
      properties:
        project_name:
          title: Name your project
          ui:readonly: true
          type: string
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  steps:
    - id: trigger
      name: Creating your github repository
      action: trigger:harness-custom-pipeline
      input:
        url: PIPELINE_URL
        inputset:
          github_org: ${{ parameters.project_name }}
        apikey: ${{ parameters.token }}
  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}

```

</details>

## Workflow UI Pickers

Collecting input from the user is a very large part of the Workflows as a whole. Sometimes the built-in components and fields just aren't good enough, and sometimes you want to enrich the form that the users sees with better inputs that fit better.

This is where Workflow UI Pickers come in.

### Harness Specific UI Pickers

### 1. `EntityFieldPicker` (Fetch values from catalog)

The `EntityFieldPicker` can be used to fetch information for workflows that are already defined in the catalog, such as data under `metadata.annotations`. 

:::info

Only **string** data `type` is supported for the `EntityPicker`.

:::

The input props that can be specified under `ui:options` for the `EntityFieldPicker` field extension.

#### `displayField`

This is used to fetch the value from catalog dynamically, corresponding to the key mentioned.

```YAML
jiraprojectID:
    title: Jira Project Key
    type: string
    description: The key for your JIRA project
    ui:field: EntityFieldPicker
    ui:displayField: metadata.jiraProjectId
    ui:options:
    catalogFilter:
        kind:
        - Component
        - Service
```

In the above example it will fetch all the `jiraProjectId` for the software components `kind` mentioned under `catalogFilter`.

#### `allowArbitraryValues`

Whether to allow arbitrary user input. Defaults to true.

`allowArbitraryValues` provides input validation when selecting an entity as the values you enter will correspond to a valid entity.

- Adding a valid entity with `allowArbitraryValues` as `false`

```yaml
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityFieldPicker
  ui:options:
    allowArbitraryValues: false
```

- Adding an arbitrary entity with `allowArbitraryValues` as `true` (default value)

```yaml
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityFieldPicker
  ui:options:
    allowArbitraryValues: true
```

#### `catalogFilter`

`catalogFilter` supports filtering options by any field(s) of an entity.

- Get all entities of kind `Group`

```yaml
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityFieldPicker
  ui:options:
    catalogFilter:
      - kind: Group
```

- Get entities of kind `Group` and spec.type `team`

```yaml
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityFieldPicker
  ui:options:
    catalogFilter:
      - kind: Group
        spec.type: team
```

#### `defaultKind`

The default entity kind.

```yaml
system:
  title: System
  type: string
  description: System of the component
  ui:field: EntityFieldPicker
  ui:options:
    catalogFilter:
      kind: System
    defaultKind: System
```

#### `defaultNamespace`

The ID of a namespace that the entity belongs to. The default value is `default`.

- Listing all entities in the `default` namespace (default value)

```yaml
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityFieldPicker
  ui:options:
    defaultNamespace: default
```

### 2. `HarnessOrgPicker`

Fetches all the org ID dynamically.

```YAML
#Example
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: your-workflow
  ...
spec:
  ...
  parameters:
    - title: Details
       properties:
         projectId:
           title: Project Identifier
           description: Harness Project Identifier
           type: string
           ui:field: HarnessProjectPicker
         orgId:
            title: Org Identifier
            type: string
            ui:field: HarnessOrgPicker
    ...
```

### 3. `HarnessProjectPicker`

Fetches all the project ID dynamically.

```YAML
# Example workflow.yaml file
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: your-workflow
  ...
spec:
  ...
  parameters:
    - title: Details
       properties:
         projectId:
           title: Project Identifier
           description: Harness Project Identifier
           type: string
           ui:field: HarnessProjectPicker
```

### 4. `HarnessAutoOrgPicker`

It autopopulates org ID on project selection. So now when you select a project ID as an input the org ID gets selected automatically if required as an input.

1. For `HarnessAutoOrgPicker` to work, it is suggested to name the Project Identifier under Properties as `projectId` and using the `HarnessProjectPicker`.

```YAML
# Example workflow.yaml file
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: your-workflow
  ...
spec:
  ...
  parameters:
    - title: Details
       properties:
         projectId:
           title: Project Identifier
           description: Harness Project Identifier
           type: string
           ui:field: HarnessProjectPicker
         orgId:
           title: Org Identifier
           description: Harness org Identifier
           type: string
           ui:field: HarnessAutoOrgPicker

```

2. In case the properties Project Identifier is named something else other than `projectId` in that case for the Workflow action to function as desired we need to add it as a dependency under `projectPickerRef`

```YAML
# Example workflow.yaml file
properties:
    <ANY NAME OTHER THAN projectId>:
        title: Project Identifier
        description: Harness Project Identifier
        type: string
        ui:field: HarnessProjectPicker
    orgId:
        title: Org Identifier
        description: Harness org Identifier
        type: string
        ui:field: HarnessAutoOrgPicker
        dependencies:
          projectPickerRef:
            - 'project_name'
```

### Other UI Pickers

### 1. `OwnerPicker`

`OwnerPicker` is used for developers to pick a User Group from the list of Groups that exist in the account.

![](./static/owner-custompicker.png)

#### `allowArbitraryValues`

Whether to allow arbitrary user input. Defaults to true.

`allowArbitraryValues` provides input validation when selecting an owner as the values you enter will correspond to a valid owner.

- Adding a valid owner with `allowArbitraryValues` as `false`

```YAML
owner:
  title: Owner
  type: string
  description: Owner of the component
  ui:field: OwnerPicker
  ui:options:
    allowArbitraryValues: false
```

- Adding an arbitrary owner with `allowArbitraryValues` as `true` (default value)

```YAML
owner:
  title: Owner
  type: string
  description: Owner of the component
  ui:field: OwnerPicker
  ui:options:
    allowArbitraryValues: true
```

#### `catalogFilter`

`catalogFilter` supports filtering options by any field(s) of an entity.

- Get all entities of kind `Group`

```YAML
owner:
  title: Owner
  type: string
  description: Owner of the component
  ui:field: OwnerPicker
  ui:options:
    catalogFilter:
      - kind: Group
```

- Get entities of kind `Group` and spec.type `team`

```YAML
owner:
  title: Owner
  type: string
  description: Owner of the component
  ui:field: OwnerPicker
  ui:options:
    catalogFilter:
      - kind: Group
        spec.type: team
```

#### `defaultNamespace`

The ID of a namespace that the owner belongs to. The default value is `default`.

- Listing owners in the `default` namespace (default value)

```YAML
owner:
  title: Owner
  type: string
  description: Owner of the component
  ui:field: OwnerPicker
  ui:options:
    catalogFilter:
      - kind: Group
    defaultNamespace: default
```

- Listing owners in the `payment` namespace

```YAML
owner:
  title: Owner
  type: string
  description: Owner of the component
  ui:field: OwnerPicker
  ui:options:
    catalogFilter:
      - kind: Group
    defaultNamespace: payment
```

### 2. `EntityPicker`

:::info

Only **string** data `type` is supported for the `EntityPicker`.

:::

The input props that can be specified under `ui:options` for the `EntityPicker` field extension.

#### `allowArbitraryValues`

Whether to allow arbitrary user input. Defaults to true.

`allowArbitraryValues` provides input validation when selecting an entity as the values you enter will correspond to a valid entity.

- Adding a valid entity with `allowArbitraryValues` as `false`

```YAML
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityPicker
  ui:options:
    allowArbitraryValues: false
```

- Adding an arbitrary entity with `allowArbitraryValues` as `true` (default value)

```YAML
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityPicker
  ui:options:
    allowArbitraryValues: true
```

#### `catalogFilter`

`catalogFilter` supports filtering options by any field(s) of an entity.

- Get all entities of kind `Group`

```YAML
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityPicker
  ui:options:
    catalogFilter:
      - kind: Group
```

- Get entities of kind `Group` and spec.type `team`

```YAML
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityPicker
  ui:options:
    catalogFilter:
      - kind: Group
        spec.type: team
```

#### `defaultKind`

The default entity kind.

```yaml
system:
  title: System
  type: string
  description: System of the component
  ui:field: EntityPicker
  ui:options:
    catalogFilter:
      kind: System
    defaultKind: System
```

#### `defaultNamespace`

The ID of a namespace that the entity belongs to. The default value is `default`.

- Listing all entities in the `default` namespace (default value)

```YAML
entity:
  title: Entity
  type: string
  description: Entity of the component
  ui:field: EntityPicker
  ui:options:
    defaultNamespace: default
```

### 3. `MultiEntityPicker`

The input props that can be specified under `ui:options` for the `MultiEntityPicker` field extension.

#### `allowArbitraryValues`

Whether to allow arbitrary user input. Defaults to true.

`allowArbitraryValues` provides input validation when selecting an entity as the values you enter will correspond to a valid entity.

- Adding a valid entity with `allowArbitraryValues` as `false`

```yaml
entity:
  title: Entities
  type: array
  description: Entities of the component
  ui:field: MultiEntityPicker
  ui:options:
    allowArbitraryValues: false
```

- Adding an arbitrary entity with `allowArbitraryValues` as `true` (default value)

```yaml
entity:
  title: Entities
  type: array
  description: Entities of the component
  ui:field: MultiEntityPicker
  ui:options:
    allowArbitraryValues: true
```

#### `catalogFilter`

`catalogFilter` supports filtering options by any field(s) of an entity.

- Get all entities of kind `Group`

```yaml
entity:
  title: Entities
  type: array
  description: Entities of the component
  ui:field: MultiEntityPicker
  ui:options:
    catalogFilter:
      - kind: Group
```

- Get entities of kind `Group` and spec.type `team`

```yaml
entity:
  title: Entities
  type: array
  description: Entities of the component
  ui:field: MultiEntityPicker
  ui:options:
    catalogFilter:
      - kind: Group
        spec.type: team
```

#### `defaultKind`

The default entity kind.

```yaml
system:
  title: System
  type: array
  description: Systems of the component
  ui:field: MultiEntityPicker
  ui:options:
    catalogFilter:
      kind: System
    defaultKind: System
```

#### `defaultNamespace`

The ID of a namespace that the entity belongs to. The default value is `default`.

- Listing all entities in the `default` namespace (default value)

```yaml
entity:
  title: Entity
  type: array
  description: Entities of the component
  ui:field: MultiEntityPicker
  ui:options:
    defaultNamespace: default
```

- Listing all entities in the `payment` namespace

```yaml
entity:
  title: Entity
  type: array
  description: Entities of the component
  ui:field: MultiEntityPicker
  ui:options:
    defaultNamespace: payment
```

### The Repository Picker

In order to make working with repository providers easier, we've built a custom
picker that can be used by overriding the `ui:field` option in the `uiSchema`
for a `string` field. Instead of displaying a text input block it will render
our custom component that we've built which makes it easy to select a repository
provider, and insert a project or owner, and repository name.

You can see it in the above full example which is a separate step and it looks a
little like this:

```yaml
- title: Choose a location
  required:
    - repoUrl
  properties:
    repoUrl:
      title: Repository Location
      type: string
      ui:field: RepoUrlPicker
      ui:options:
        allowedHosts:
          - github.com
```

The `allowedHosts` part should be set to where you wish to enable this Workflow
to publish to. And it can be any host that is listed in your `integrations`
config in `app-config.yaml`.

Besides specifying `allowedHosts` you can also restrict the Workflow to publish to
repositories owned by specific users/groups/namespaces by setting the `allowedOwners`
option. With the `allowedRepos` option you are able to narrow it down further to a
specific set of repository names. A full example could look like this:

```yaml
- title: Choose a location
  required:
    - repoUrl
  properties:
    repoUrl:
      title: Repository Location
      type: string
      ui:field: RepoUrlPicker
      ui:options:
        allowedHosts:
          - github.com
        allowedOwners:
          - backstage
          - someGithubUser
        allowedRepos:
          - backstage
```

For a list of all possible `ui:options` input props for `RepoUrlPicker`, please visit [here](https://backstage.io/docs/features/software-templates/ui-options-examples/).

#### Using the Users `oauth` token

There's a little extra magic that you get out of the box when using the
`RepoUrlPicker` as a field input. You can provide some additional options under
`ui:options` to allow the `RepoUrlPicker` to grab a `oauth` token for the user
for the required `repository`.

This is great for when you are wanting to create a new repository, or wanting to
perform operations on top of an existing repository.

A sample Workflow that takes advantage of this is like so:

<details>
<summary>Example YAML</summary>

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: v1beta3-demo
  title: Test Action Workflow
  description: Workflows Demo
spec:
  owner: backstage/techdocs-core
  type: service

  parameters:
    ...

    - title: Choose a location
      required:
        - repoUrl
      properties:
        repoUrl:
          title: Repository Location
          type: string
          ui:field: RepoUrlPicker
          ui:options:
            # Here's the option you can pass to the RepoUrlPicker
            requestUserCredentials:
              secretsKey: USER_OAUTH_TOKEN
              additionalScopes:
                github:
                  - workflow
            allowedHosts:
              - github.com
    ...

  steps:
    ...

    - id: publish
      name: Publish
      action: publish:github
      input:
        allowedHosts: ['github.com']
        description: This is ${{ parameters.name }}
        repoUrl: ${{ parameters.repoUrl }}
        # here's where the secret can be used
        token: ${{ secrets.USER_OAUTH_TOKEN }}

    ...
```

</details>

You will see from above that there is an additional `requestUserCredentials`
object that is passed to the `RepoUrlPicker`. This object defines what the
returned `secret` should be stored as when accessing using
`${{ secrets.secretName }}`, in this case it is `USER_OAUTH_TOKEN`. And then you
will see that there is an additional `input` field into the `publish:github`
action called `token`, in which you can use the `secret` like so:
`token: ${{ secrets.USER_OAUTH_TOKEN }}`.

There's also the ability to pass additional scopes when requesting the `oauth`
token from the user, which you can do on a per-provider basis, in case your Workflow can be published to multiple providers.

Note, that you will need to configure a **connector** for your source code management (SCM) service to make this feature work.

## Dynamic API Picker

Using dynamic API picker, users can make API calls from workflows UI and fetch values dynamically and use them as an input for the workflows. Detailed information on the usage can be found [here](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker).


## For Use-Cases you don't find here

It is suggested to use the [react-jsonschema-form playground](https://rjsf-team.github.io/react-jsonschema-form/) to build the frontend(UI for Inputs) for use-cases that are not listed here. [Nunjucks](https://mozilla.github.io/nunjucks/) is templating engine for the Self Service Workflows.