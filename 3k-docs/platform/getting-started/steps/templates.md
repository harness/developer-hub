---
title: Step Template Guide
sidebar_label: Step Templates
description: A comprehensive guide for adding new step templates to the Harness Template Library — from non-technical overview to full technical schema reference.
sidebar_position: 7
---

A comprehensive guide for adding new step templates to the Harness Template Library. Covers everything from high-level concepts for non-technical stakeholders to the full technical schema reference for engineers, professional services, CX engineers, and sales engineers.

---

## Part 1: Non-technical guide

### What is a step template?

A step template is a reusable building block in Harness pipelines. Think of it like a recipe card: it defines a single action that a pipeline can perform, such as deploying to AWS, sending a Slack notification, or running a security scan. Each step template creates a form in the Harness UI where users fill in the required information, and the step handles the rest automatically.

### When to create a new step template

- You have a repeatable action that multiple teams or pipelines need to perform.
- You want to standardize how a specific tool or service is used across your organization.
- You need to wrap a container plugin into a user-friendly form.
- An existing step template doesn't cover your use case.

### What you need before starting

| Question | Example Answer |
|---|---|
| What does this step do? | "Deploys a container to Amazon ECS" |
| What information does the user need to provide? | AWS region, cluster name, task definition |
| Which fields are required vs. optional? | Region and cluster are required; log level is optional |
| What container image runs this step? | `harnessdev/ecs-deploy:1.0.0` |
| What category does this belong to? | Deployment (`cd`) or Build (`ci`) |
| What icon should represent it? | `aws`, `kubernetes`, `docker`, etc. |

### How to request a new step template

If you are a PM or non-technical stakeholder, provide the following to your engineering team:

```text title="template-request.txt"
Step Template Request
---------------------
Name:           [Human-readable name, e.g., "ECS Deploy Step"]
Purpose:        [What this step does in one sentence]
Module:         [cd (deployment) | ci (build) | iacm (infrastructure)]
Icon:           [See Appendix: Available Icons]
Required Inputs:
  - [Field name]: [Description] (Type: string/boolean/connector/array)
  - [Field name]: [Description]
Optional Inputs:
  - [Field name]: [Description] (Default: [value])
  - [Field name]: [Description] (Default: [value])
Container Image: [Image name and version, e.g., harnessdev/plugin:1.0.0]
```

---

## Part 2: Engineer guide

Step-by-step instructions for engineers to create a new step template from scratch.

**Prerequisites:** Access to the template-library Git repository, familiarity with YAML syntax, and knowledge of the container image your step will execute (image name, expected environment variables).

### Step 1: Create the directory structure

Every template lives in the `.harness/` directory with the following structure:

```text
.harness/
└── yourStepName/             # camelCase directory name
    ├── config.yaml           # Version tracking and metadata
    └── 1.0.0/                # Version directory
        └── template.yaml     # Template definition
```

The directory name must be camelCase (e.g., `ecsRunTaskStep`, `buildAndPushToDocker`, `slackNotificationStep`).

### Step 2: Create `config.yaml`

Create `config.yaml` in the template root directory. This file tracks versions and metadata.

```yaml title="config.yaml"
stable: 1.0.0
versions:
  prod1: 1.0.0
  prod0: 1.0.0
icon-name: slack
metadata:
  category:
    - step
```

| Field | Required | Description |
|---|---|---|
| `stable` | Yes | The current stable version number |
| `versions.prod1` | Yes | Version deployed to production environment 1 |
| `versions.prod0` | Yes | Version deployed to production environment 0 |
| `icon-name` | Yes | Icon identifier (lowercase). See Available Icons appendix |
| `module` | No | Module association (e.g., `- cd`). Only needed for service-type filtering |
| `metadata.category` | Yes | Always `- step` for step templates |

For specialized templates (e.g., Kubernetes-specific), add optional fields:

```yaml title="config.yaml (specialized)"
stable: 1.0.0
versions:
  prod1: 1.0.0
  prod0: 1.0.0
icon-name: kubernetes
module:
  - cd
metadata:
  serviceType:
    - kubernetes
  category:
    - step
```

### Step 3: Create `template.yaml`

Create `template.yaml` inside the version directory (e.g., `1.0.0/template.yaml`). The file has four top-level sections inside `template:`:

```yaml title="template.yaml (structure)"
template:
  inputs:     # 1. Input field definitions
    # ...
  layout:     # 2. UI form layout
    # ...
  # 3. Metadata fields (id, name, description, version, author, module, alias)
  id: yourStepName
  name: Your Step Name
  description: Brief description of what this step does.
  version: 1
  author: harness
  module:
    - cd
  alias: short-name
  step:       # 4. Step execution definition
    # ...
```

### Step 4: Define inputs

Inputs define the form fields that users interact with. Each input has a type, label, and UI configuration.

**String input:**

```yaml title="string-input.yaml"
region:
  type: string
  label: Region
  required: true
  ui:
    tooltip: Enter the AWS region where the service is located.
    placeholder: us-east-1
```

**String input with textarea:**

```yaml title="textarea-input.yaml"
message:
  type: string
  label: Message
  required: true
  ui:
    component: textarea
    tooltip: Enter the message content.
```

**Select input (dropdown):**

```yaml title="select-input.yaml"
log_level:
  type: string
  label: Log Level
  default: info
  options:
    - debug
    - info
    - warn
    - error
  ui:
    component: select
    tooltip: Select the log level for step execution.
```

**Boolean input (toggle):**

```yaml title="boolean-input.yaml"
verbose_logging:
  type: boolean
  label: Verbose Logging
  default: false
  ui:
    tooltip: Enable verbose logging for debugging.
```

:::warning Boolean Rules
Do **NOT** specify any `component:` value for booleans. Labels must **NOT** start with "Is".
:::

**Connector input:**

```yaml title="connector-input.yaml"
connector:
  type: connector
  label: AWS Connector
  required: true
  oneof:
    - Aws
  ui:
    tooltip: Select the Harness AWS Connector for authentication.
    placeholder: Select AWS Connector
```

**Array input:**

```yaml title="array-input.yaml"
tags:
  type: array
  label: Tags
  required: true
  ui:
    component: array
    input:
      inputType: text
    tooltip: Add one or more tags for the image.
```

**Key-value pairs input:**

```yaml title="key-value-input.yaml"
build_args:
  type: key-value-pairs
  label: Build Arguments
  ui:
    tooltip: Specify build-time variables as key-value pairs.
```

**Ghost input (hidden):**

```yaml title="ghost-input.yaml"
internal_cache:
  type: string
  ui:
    component: ghost
```

**Secret input:**

```yaml title="secret-input.yaml"
client_cert:
  type: string
  label: Client Certificate
  ui:
    component: secret-input
    tooltip: Enter the client certificate for authentication.
```

### Step 5: Organize the layout

The `layout` section controls how fields appear in the UI form.

```yaml title="layout.yaml"
layout:
  # 1. Required fields WITHOUT defaults (top level)
  - connector
  - region
  - cluster
  # 2. Optional Configuration section (everything else)
  - title: Optional Configuration
    items:
      # Non-boolean fields first
      - log_level
      - timeout
      - tags
      # Boolean fields grouped at the end
      - verbose_logging
      - skip_verification
```

Layout rules: required fields **without** defaults appear at the top level; fields **with** defaults go in "Optional Configuration" — even if marked `required: true`; use a single "Optional Configuration" accordion section; non-boolean fields come before boolean fields within the section; maximum one level of nesting; only create subsections when there are 4 or more related fields.

For complex templates with many optional fields:

```yaml title="nested-layout.yaml"
layout:
  - url
  - method
  - title: Optional Configuration
    items:
      - title: Basic Options
        items:
          - headers
          - body
          - body_file
      - title: Request Options
        items:
          - work_dir
          - proxy
          - disable_redirect
      - title: Response Processing
        items:
          - assertion
          - output_vars
      - log_level
```

### Step 6: Set template metadata

```yaml title="metadata"
  id: slackNotificationStep        # camelCase, unique identifier
  name: Slack Notification Step     # Human-readable, sentence case
  description: Sends a notification message to a Slack channel.
  version: 1                       # Internal version, always 1
  author: harness                  # Author name, lowercase
  module:
    - cd                           # cd | ci | iacm | custom
  alias: slack                     # Short alias for CLI usage
```

| Field | Convention | Example |
|---|---|---|
| `id` | camelCase | `ecsRunTaskStep` |
| `name` | Sentence case, human-readable | `ECS Run Task Step` |
| `description` | One sentence, plain language | `Runs a task on Amazon ECS.` |
| `version` | Always `1` | `1` |
| `author` | Lowercase | `harness` |
| `module` | Array of module codes | `- cd` |
| `alias` | Short, lowercase | `run-task` |

### Step 7: Define step execution

The `step:` section defines what actually runs when the step executes.

**Pattern A: Container-based execution (most common)**

```yaml title="pattern-a.yaml"
step:
  group:
    steps:
      - name: Send Slack Notification
        id: sendNotification
        run:
          container:
            image: harnessdev/slack-notification:1.0.0
            connector: account.harnessImage
          env:
            PLUGIN_WEBHOOK_URL: ${{inputs.webhook_url}}
            PLUGIN_MESSAGE: ${{inputs.message}}
            PLUGIN_CHANNEL: ${{inputs.channel}}
```

**Pattern B: Using `with` instead of `env`**

```yaml title="pattern-b.yaml"
step:
  group:
    steps:
      - name: Build Image
        id: buildImage
        run:
          container:
            image: plugins/buildx
          with:
            REGISTRY: ${{inputs.registry}}
            REPO: ${{inputs.repo}}
            TAGS: ${{inputs.tags}}
```

**Pattern C: Template reference (composable steps)**

```yaml title="pattern-c.yaml"
step:
  group:
    steps:
      - name: Apply Manifests
        id: applyManifests
        template:
          uses: k8sApplyAction@1.0.0
          with:
            connector: ${{inputs.connector}}
            namespace: ${{inputs.namespace}}
```

**Pattern D: Conditional execution**

```yaml title="pattern-d.yaml"
step:
  group:
    steps:
      - if: ${{inputs.caching == true}}
        name: Push with Caching
        id: pushWithCache
        run:
          container:
            image: plugins/buildx
          with:
            ENABLE_CACHE: true
            REPO: ${{inputs.repo}}
      - if: ${{inputs.caching == false}}
        name: Push without Caching
        id: pushWithoutCache
        run:
          container:
            image: plugins/kaniko
          with:
            REPO: ${{inputs.repo}}
```

**Pattern E: Direct run (simplified)**

```yaml title="pattern-e.yaml"
step:
  run:
    container:
      image: harnessdev/plugin:1.0.0
    env:
      PLUGIN_FIELD: ${{inputs.field_name}}
```

**Accessing connector properties:**

```yaml title="connector-properties.yaml"
env:
  PLUGIN_CONNECTOR_ID: ${{inputs.connector.id}}
  PLUGIN_USERNAME: ${{${{inputs.connector}}.username}}
  PLUGIN_PASSWORD: ${{${{inputs.connector}}.password}}
  PLUGIN_URL: ${{${{inputs.connector}}.url}}
```

### Step 8: Validate your template

Before submitting, verify:

- Directory name is camelCase
- `config.yaml` has `stable`, `versions`, `icon-name`, and `metadata.category`
- Template `id` is camelCase and `name` is sentence case
- Step `id` is camelCase and step `name` is sentence case
- `description` is one sentence maximum
- All required fields (without defaults) are at the layout top level
- Optional fields and fields with defaults are in "Optional Configuration"
- Non-boolean fields come before boolean fields in Optional Configuration
- Boolean inputs have **no** explicit `component:` specification
- Boolean labels do **not** start with "Is"
- All field names are `snake_case` and all labels are Title Case
- All tooltips start with action verbs (`Select`, `Enter`, `Enable`, `Specify`)
- Environment variables correctly reference inputs with `${{inputs.field_name}}`
- YAML syntax is valid (proper indentation, no tabs)

### Step 9: Version your template

When updating an existing template, create a new version folder, copy `template.yaml` from the previous version, make changes, and update `config.yaml`:

```yaml title="config.yaml (updated)"
stable: 1.0.1
versions:
  prod1: 1.0.1
  prod0: 1.0.1
icon-name: aws
metadata:
  category:
    - step
```

| Change Type | Version Bump | Example |
|---|---|---|
| Bug fixes, tooltip updates, minor UI changes | Patch (1.0.x) | `1.0.0 → 1.0.1` |
| New optional inputs, backward-compatible changes | Minor (1.x.0) | `1.0.0 → 1.1.0` |
| Breaking changes, removed inputs, schema changes | Major (x.0.0) | `1.0.0 → 2.0.0` |

---

## Part 3: Full schema reference

### `config.yaml` schema

```yaml title="config.yaml schema"
stable: <version>                    # Required. Current stable version (e.g., "1.0.0")
versions:                            # Required. Version mapping for environments
  prod1: <version>                   #   Production environment 1 version
  prod0: <version>                   #   Production environment 0 version
icon-name: <string>                  # Required. Icon identifier (lowercase)
module:                              # Optional. Module association
  - cd | ci | iacm | custom
metadata:                            # Required
  serviceType:                       # Optional. Service type filter
    - kubernetes
  category:                          # Required
    - step | strategy | pipeline
```

### `template.yaml` schema

```yaml title="template.yaml schema"
template:
  inputs:                            # Required. Input field definitions
    <field_name>:                    #   snake_case field name
      type: <type>                   #   Required. See "Input Field Types"
      label: <string>                #   Required. Title Case display label
      required: <boolean>            #   Optional. Default: false
      default: <value>               #   Optional. Default value
      options:                       #   Optional. For select dropdowns
        - <value>
      oneof:                         #   For connector type. Valid connector types
        - <ConnectorType>
      ui:                            #   Optional. UI configuration
        component: <component>       #     UI component type
        tooltip: <string>            #     Tooltip text (starts with action verb)
        placeholder: <string>        #     Placeholder text
        visible: <expression>        #     Conditional visibility expression
        allowedValueTypes:           #     Optional. Allowed value input modes
          - fixed
          - runtime
          - expression
  layout:                            # Required. UI form layout
    - <field_name>                   #   Top-level required field
    - title: <string>                #   Accordion section title
      items:                         #   Fields within accordion
        - <field_name>
  id: <camelCase>                    # Required. Unique template identifier
  name: <string>                     # Required. Human-readable display name
  description: <string>              # Required. One sentence max
  version: <integer>                 # Required. Internal version (always 1)
  author: <string>                   # Required. Author name (lowercase)
  module:                            # Required. Module categories
    - cd | ci | iacm | custom
  alias: <string>                    # Optional. Short CLI alias
  step:                              # Required. Step execution definition
    group:                           #   Step group wrapper
      steps:                         #   Array of steps
        - if: <expression>           #     Optional. Conditional execution
          name: <string>             #     Sentence case step name
          id: <camelCase>            #     Step identifier
          run:                       #     Container execution
            container:
              image: <string>        #       Container image
              connector: <string>    #       Image pull connector
            env:                     #     Environment variable mapping
              <VAR>: <expression>
            with:                    #     Alternative to env
              <VAR>: <expression>
          template:                  #     OR template reference
            uses: <template@version>
            with:
              <param>: <expression>
```

### Input field types

| Type | Description | UI Component |
|---|---|---|
| `string` | Text input | `string` (default), `textarea`, `select`, `secret-input`, `ghost` |
| `boolean` | Toggle switch | Default (no component specified) |
| `connector` | Harness connector selector | Connector picker |
| `array` | List of values | `array` |
| `key-value-pairs` | Key-value map | `key-value-pairs` |
| `list` | Complex structured list | `list` with `layout: grid` |
| `number` | Numeric input | `number` |
| `secret` | Sensitive value | Secret input |

### UI components

| Component | Used With | Description |
|---|---|---|
| `string` | `type: string` | Single-line text input (default) |
| `textarea` | `type: string` | Multi-line text input |
| `select` | `type: string` + `options` | Dropdown selection |
| `array` | `type: array` | List builder |
| `list` | `type: array` or `type: list` | Grid-based structured list |
| `key-value-pairs` | `type: key-value-pairs` | Key-value pair editor |
| `number` | `type: number` | Numeric input field |
| `secret-input` | `type: string` | Masked sensitive input |
| `secret-select` | `type: string` | Masked sensitive dropdown |
| `ghost` | `type: string` | Hidden field (not rendered in UI) |
| `radio` | `type: string` | Radio button selection |
| `display` | `type: string` | Read-only display field |

:::warning Prohibited Components
`boolean-card-select` and `boolean-card-switch` must **NOT** be used.
:::

### Connector types

Use these values in the `oneof` field for connector inputs:

| Connector Type | Description |
|---|---|
| `Aws` | Amazon Web Services |
| `Azure` | Microsoft Azure |
| `Gcp` | Google Cloud Platform |
| `docker` | Docker registry |
| `DockerRegistry` | Docker registry (alternative) |
| `Jira` | Jira project management |
| `Bamboo` | Bamboo CI server |
| `GitHubConnector` | GitHub |
| `GitlabConnector` | GitLab |
| `kubernetes` | Kubernetes cluster |

### Step execution patterns

| Pattern | When to Use | Key Fields |
|---|---|---|
| Container with `env` | Standard plugin execution | `run.container.image`, `env` |
| Container with `with` | Alternative variable passing | `run.container.image`, `with` |
| Template reference | Composing from existing templates | `template.uses`, `template.with` |
| Conditional (`if`) | Different behavior based on inputs | `if` expression on step |
| Direct run | Simple single-step execution | `step.run` without `group` |

### Conditional visibility

Fields can be shown or hidden based on other field values:

```yaml title="conditional-visibility.yaml"
field_name:
  type: string
  label: Conditional Field
  ui:
    visible: ${{other_field == 'specific_value'}}
```

| Operator | Example |
|---|---|
| Equals | `${{field == 'value'}}` |
| Not equals | `${{field != 'value'}}` |
| Boolean check | `${{field == true}}` |

### Expression syntax

| Syntax | Usage | Example |
|---|---|---|
| `${{inputs.field_name}}` | Reference input values in `env`/`with` | `${{inputs.region}}` |
| `<+inputs.field_name>` | Alternative reference syntax | `<+inputs.target>` |
| `${{inputs.connector.id}}` | Access connector properties | `${{inputs.connector.id}}` |
| `${{infra.region}}` | Reference infrastructure values | `${{infra.region}}` |
| `${{service.identifier}}` | Reference service values | `${{service.identifier}}` |
| `${{runtime.workspace}}` | Reference runtime values | `${{runtime.workspace}}` |

---

## Part 4: Rules and standards

### Naming conventions

| Element | Convention | Correct | Incorrect |
|---|---|---|---|
| Template directory | camelCase | `ecsRunTaskStep` | `ecs-run-task-step` |
| Template ID | camelCase | `ecsRunTaskStep` | `ECSRunTaskStep` |
| Template Name | Sentence case | `ECS Run Task Step` | `ecsRunTaskStep` |
| Step ID | camelCase | `runTask` | `run-task` |
| Step Name | Sentence case | `Execute Custom Action` | `executeCustomAction` |
| Field names | snake_case | `log_level` | `logLevel` |
| Labels | Title Case | `Log Level` | `log level` |
| Boolean labels | No "Is" prefix | `OpenShift Mode` | `Is OpenShift` |
| Author | Lowercase | `harness` | `Harness` |
| Icon name | Lowercase | `kubernetes` | `Kubernetes` |
| Alias | Lowercase, short | `run-task` | `RunTask` |

### Technology name standards

Write Kubernetes not k8s, Elastic Container Service not just ECS, Elastic Compute Cloud not just EC2, Auto Scaling Group not just ASG.

### Boolean input rules

:::warning Boolean Rules
Never use `component: boolean-card-select` or `component: boolean-card-switch`. Boolean inputs use the default component — do not specify any `component` value. Labels must **NOT** start with "Is".
:::

```yaml title="correct-boolean.yaml"
# Correct
skip_verification:
  type: boolean
  label: Skip Verification
  default: false
  ui:
    tooltip: Enable this option to skip the verification step.
```

```yaml title="incorrect-boolean.yaml"
# Incorrect
is_openshift:
  type: boolean
  label: Is OpenShift Deployment
  default: false
  ui:
    component: boolean-card-select  # WRONG
    tooltip: Flag to mark if this is OpenShift deployment
```

### Tooltip standards

All tooltips must start with an action verb: `Select`, `Enter`, `Enable`, `Specify`, `Add`, `Set`, `Configure`, `Provide`. Use complete sentences with proper punctuation, spell out acronyms, and keep them concise (1–2 sentences).

| Input Type | Correct Tooltip |
|---|---|
| Connector | `"Select the Harness AWS Connector for authentication."` |
| Region | `"Enter the AWS region where the service is located."` |
| Boolean | `"Enable this option to skip the steady state check."` |
| Select | `"Select the log level for step execution."` |
| Array | `"Add one or more tags for the Docker image."` |
| File path | `"Specify the path to the file containing the task definition."` |

### Description standards

Descriptions must be a maximum of one sentence, use plain language that non-technical users can understand, and spell out technology names in full.

---

## Part 5: Complete examples

Four complete, production-ready step template examples demonstrating different patterns.

### Example 1: Simple step template (Email notification)

A minimal step template with basic string and select inputs.

```yaml title="emailNotificationStep/config.yaml"
# .harness/emailNotificationStep/config.yaml
stable: 1.0.0
versions:
  prod1: 1.0.0
  prod0: 1.0.0
icon-name: email
metadata:
  category:
    - step
```

```yaml title="emailNotificationStep/1.0.0/template.yaml"
# .harness/emailNotificationStep/1.0.0/template.yaml
template:
  inputs:
    recipient:
      type: string
      label: Recipient Email
      required: true
      ui:
        tooltip: Enter the email address of the recipient.
        placeholder: user@example.com
    subject:
      type: string
      label: Subject
      required: true
      ui:
        tooltip: Enter the email subject line.
        placeholder: Pipeline Notification
    body:
      type: string
      label: Body
      required: true
      ui:
        component: textarea
        tooltip: Enter the email body content.
    log_level:
      type: string
      label: Log Level
      default: info
      options:
        - debug
        - info
        - warn
        - error
      ui:
        component: select
        tooltip: Select the log level for step execution.
  layout:
    - recipient
    - subject
    - body
    - title: Optional Configuration
      items:
        - log_level
  id: emailNotificationStep
  name: Email Notification Step
  description: Sends an email notification to a specified recipient.
  version: 1
  author: harness
  module:
    - cd
  alias: email-notify
  step:
    group:
      steps:
        - name: Send Email
          id: sendEmail
          run:
            container:
              image: harnessdev/email-notification:1.0.0
              connector: account.harnessImage
            env:
              PLUGIN_RECIPIENT: ${{inputs.recipient}}
              PLUGIN_SUBJECT: ${{inputs.subject}}
              PLUGIN_BODY: ${{inputs.body}}
              PLUGIN_LOG_LEVEL: ${{inputs.log_level}}
```

### Example 2: Step template with connector (S3 Upload)

A template that uses a connector input for authentication.

```yaml title="s3UploadStep/config.yaml"
# .harness/s3UploadStep/config.yaml
stable: 1.0.0
versions:
  prod1: 1.0.0
  prod0: 1.0.0
icon-name: aws
metadata:
  category:
    - step
```

```yaml title="s3UploadStep/1.0.0/template.yaml"
# .harness/s3UploadStep/1.0.0/template.yaml
template:
  inputs:
    connector:
      type: connector
      label: AWS Connector
      required: true
      oneof:
        - Aws
      ui:
        tooltip: Select the Harness AWS Connector for authentication.
        placeholder: Select AWS Connector
    bucket:
      type: string
      label: Bucket Name
      required: true
      ui:
        tooltip: Enter the name of the S3 bucket.
        placeholder: my-bucket
    source_path:
      type: string
      label: Source Path
      required: true
      ui:
        tooltip: Specify the local file or directory path to upload.
        placeholder: /path/to/files
    region:
      type: string
      label: Region
      default: us-east-1
      ui:
        tooltip: Enter the AWS region where the S3 bucket is located.
        placeholder: us-east-1
    target_path:
      type: string
      label: Target Path
      ui:
        tooltip: Specify the destination path within the S3 bucket.
        placeholder: artifacts/
    overwrite:
      type: boolean
      label: Overwrite Existing Files
      default: false
      ui:
        tooltip: Enable this option to overwrite existing files in the bucket.
    log_level:
      type: string
      label: Log Level
      default: info
      options:
        - debug
        - info
        - warn
        - error
      ui:
        component: select
        tooltip: Select the log level for step execution.
  layout:
    - connector
    - bucket
    - source_path
    - title: Optional Configuration
      items:
        - region
        - target_path
        - log_level
        - overwrite
  id: s3UploadStep
  name: S3 Upload Step
  description: Uploads files to an Amazon S3 bucket.
  version: 1
  author: harness
  module:
    - cd
  alias: s3-upload
  step:
    group:
      steps:
        - name: Upload to S3
          id: uploadToS3
          run:
            container:
              image: harnessdev/s3-upload:1.0.0
              connector: account.harnessImage
            env:
              PLUGIN_CONNECTOR: ${{inputs.connector.id}}
              PLUGIN_BUCKET: ${{inputs.bucket}}
              PLUGIN_SOURCE: ${{inputs.source_path}}
              PLUGIN_REGION: ${{inputs.region}}
              PLUGIN_TARGET: ${{inputs.target_path}}
              PLUGIN_OVERWRITE: ${{inputs.overwrite}}
              PLUGIN_LOG_LEVEL: ${{inputs.log_level}}
```

### Example 3: Step template with conditional fields (Terraform)

A template where certain fields appear or hide based on another field's value.

```yaml title="terraformActionStep/1.0.0/template.yaml"
# .harness/terraformActionStep/1.0.0/template.yaml
template:
  inputs:
    command:
      type: string
      label: Command
      required: true
      options:
        - init
        - plan
        - apply
        - destroy
      ui:
        component: select
        tooltip: Select the Terraform command to execute.
    target:
      type: array
      label: Targets
      ui:
        visible: ${{command == 'plan'}}
        component: array
        input:
          inputType: text
        tooltip: Add specific resource targets for the plan command.
    auto_approve:
      type: boolean
      label: Auto Approve
      default: false
      ui:
        visible: ${{command == 'apply'}}
        tooltip: Enable this option to auto-approve the apply command.
    log_level:
      type: string
      label: Log Level
      default: info
      options:
        - debug
        - info
        - warn
        - error
      ui:
        component: select
        tooltip: Select the log level for step execution.
  layout:
    - command
    - title: Optional Configuration
      items:
        - target
        - log_level
        - auto_approve
  id: terraformActionStep
  name: Terraform Action Step
  description: Executes a Terraform command against your infrastructure.
  version: 1
  author: harness
  module:
    - iacm
  alias: tf-action
  step:
    group:
      steps:
        - name: Run Terraform
          id: runTerraform
          run:
            container:
              image: harnessdev/terraform-plugin:1.0.0
              connector: account.harnessImage
            env:
              PLUGIN_COMMAND: ${{inputs.command}}
              PLUGIN_TARGET: ${{inputs.target}}
              PLUGIN_AUTO_APPROVE: ${{inputs.auto_approve}}
              PLUGIN_LOG_LEVEL: ${{inputs.log_level}}
```

### Example 4: Step template with nested layout (API request)

A template with grouped optional fields using nested subsections.

```yaml title="apiRequestStep/1.0.0/template.yaml (layout section)"
# .harness/apiRequestStep/1.0.0/template.yaml (layout section)
  layout:
    - url
    - method
    - title: Optional Configuration
      items:
        - title: Request Options
          items:
            - headers
            - body
            - proxy
            - disable_redirect
        - title: Response Processing
          items:
            - assertion
            - output_vars
        - title: SSL/TLS Configuration
          items:
            - client_cert
            - client_key
            - skip_verify
        - log_level
  id: apiRequestStep
  name: API Request Step
  description: Executes HTTP requests with custom headers, response validation, and proxy support.
  version: 1
  author: harness
  module:
    - cd
    - custom
  alias: api-request
```

---

## Part 6: Validation checklist

Use this checklist before submitting a pull request with a new or updated step template.

**File Structure**

- ✓ Template directory is inside `.harness/`
- ✓ Directory name is camelCase (e.g., `myNewStep`)
- ✓ `config.yaml` exists at the template root
- ✓ Version directory exists (e.g., `1.0.0/`)
- ✓ `template.yaml` exists inside the version directory

**config.yaml**

- ✓ `stable` field is set to the current version
- ✓ `versions.prod1` and `versions.prod0` are set
- ✓ `icon-name` is a valid, lowercase icon name
- ✓ `metadata.category` contains `- step`

**Template Metadata**

- ✓ `id` is camelCase
- ✓ `name` is sentence case and human-readable
- ✓ `description` is one sentence maximum
- ✓ `version` is set to `1`
- ✓ `author` is lowercase
- ✓ `module` is specified (`cd`, `ci`, `iacm`, or `custom`)

**Input Fields**

- ✓ All field names are `snake_case`
- ✓ All labels are Title Case
- ✓ All required fields without defaults have `required: true`
- ✓ All tooltips start with action verbs (`Select`, `Enter`, `Enable`, `Specify`)
- ✓ All tooltips are complete sentences with proper punctuation
- ✓ No acronyms without full spelling
- ✓ Select inputs use `type: string` with `component: select` and `options`
- ✓ Boolean inputs have **NO** `component:` specified
- ✓ Boolean labels do **NOT** start with "Is"
- ✓ Connector inputs have valid `oneof` values

**Layout**

- ✓ Required fields without defaults appear at the top level
- ✓ All optional fields and fields with defaults are in "Optional Configuration"
- ✓ Non-boolean fields come before boolean fields in Optional Configuration
- ✓ Nested subsections only used when there are 4+ related fields
- ✓ Maximum one level of nesting under Optional Configuration

**Step Execution**

- ✓ Step name is sentence case and human-readable
- ✓ Step `id` is camelCase
- ✓ Container image is specified with version tag
- ✓ Environment variables correctly use `${{inputs.field_name}}` syntax
- ✓ All input fields are mapped to environment variables or `with` parameters

**YAML Validity**

- ✓ Indentation uses spaces (not tabs)
- ✓ All strings with special characters are properly quoted
- ✓ No trailing whitespace
- ✓ File ends with a newline

---

## Appendix: Available icons

These icon names have been used in existing templates. Use lowercase values for the `icon-name` field.

| Icon Name | Description |
|---|---|
| `ai-verify` | AI verification |
| `aws` | Amazon Web Services (general) |
| `aws-cdk` | AWS Cloud Development Kit |
| `aws-sam` | AWS Serverless Application Model |
| `azure-functions` | Azure Functions |
| `bamboo-build` | Bamboo CI builds |
| `bandit` | Bandit security scanner |
| `docker` | Docker containers |
| `ecs` | Amazon Elastic Container Service |
| `email` | Email notifications |
| `git` | Git operations |
| `google` | Google Cloud (general) |
| `google-cloud-run` | Google Cloud Run |
| `harness` | Harness platform |
| `helm` | Helm charts |
| `http-step` | HTTP requests |
| `jenkins-build` | Jenkins CI builds |
| `jfrog` | JFrog Artifactory |
| `jira` | Jira integration |
| `kubernetes` | Kubernetes |
| `open-tofu` | OpenTofu (Terraform alternative) |
| `serverless` | Serverless Framework |
| `servicenow-approval` | ServiceNow approvals |
| `servicenow-create` | ServiceNow record creation |
| `servicenow-importset` | ServiceNow import sets |
| `servicenow-update` | ServiceNow updates |
| `ssh` | SSH connections |
| `ssca-orchestrate` | Software supply chain assurance |
| `terraform` | Terraform |
| `winrm` | Windows Remote Management |

---

## Appendix: Available modules

| Module | Description | Examples |
|---|---|---|
| `cd` | Continuous Deployment | ECS deploy, Kubernetes deploy, Helm deploy |
| `ci` | Continuous Integration | Build and push, cache management, artifact upload |
| `iacm` | Infrastructure as Code Management | Terraform, OpenTofu |
| `custom` | Custom/General purpose | HTTP steps, notifications |