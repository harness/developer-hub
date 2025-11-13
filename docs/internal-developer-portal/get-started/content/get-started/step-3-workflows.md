import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Step 3: Create Self-Service Workflows" targetPage="/docs/internal-developer-portal/get-started"/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Service and Infrastructure onboarding** in today's world is slow, manual and tedious. Developers often spend days—or even weeks—setting up new software and completing Day-2 operations. This inefficiency arises from either waiting for ticket resolutions (TicketOps) or manually handling repetitive tasks, which results in a poor developer experience and decreased productivity.

Harness IDP addresses these challenges with **Self-Service Workflows**.

Workflows enable developer self-service by automating manual tasks and processes. Using Workflows, platform engineering teams can:
- Automate new service onboarding.
- Simplify Day 2 operations for developers.
- Provide developers with **golden paths** to production that include guardrails and best practices.

This guide will take you through the journey of creating, configuring and executing a starter sample Workflow.

---

## Prerequisites

Before getting started with **Workflows** in IDP 2.0, ensure you have the following prerequisites: 
* You have reviewed the **[IDP 2.0 Overview](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path.md)** and **[Upgrading to IDP 2.0](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o.md)** guide. 
* **IDP 2.0** is enabled behind the `IDP_2_0` Feature Flag. Contact **[Harness Support](https://support.harness.io)** to enable it on your account.
* You should have a clear understanding of **[Managing Workflows](/docs/internal-developer-portal/flows/manage-workflow-2o.md)** and **[Workflow YAML](/docs/internal-developer-portal/flows/worflowyaml.md)** to effectively configure and use the components of a Workflow.
* It's recommended to have a **Harness Pipeline** in place, which acts as the orchestrator for Self-Service Workflows.
  Learn more about **[setting up Harness IDP Pipelines here](/docs/internal-developer-portal/flows/harness-pipeline.md)**.

---

## Create a Workflow

In this guide, you'll create a **"Hello World" Workflow** that:
- **Input**: Collects developer information through a simple form
- **Process**: Triggers a **Harness Pipeline** to process the information
- **Output**: Generates a personalized welcome message

This example showcases the fundamental workflow pattern: **Input → Process → Output** that can be applied to any automation use case.

---

### Step 1: Understanding Workflow Components

Before creating your workflow, it's important to understand the key components that make up a Self-Service Workflow. A Workflow is defined through a **YAML configuration file** that contains all the Workflow's metadata and logic. Go to [Workflow YAML](/docs/internal-developer-portal/flows/worflowyaml.md) to learn more.

This YAML has **three main components** that work together to facilitate Workflow automation:

#### **1. Workflow Frontend (Parameters)**
The **Workflow Frontend** serves as the entry point where users fill in necessary details to execute the Workflow. This component configures the **input fields** required for the Workflow. This includes form fields, validation rules, and user interface elements that collect information from users. 

**In our example**: We'll create a form to collect developer information with validation and default values. The `spec.parameters` field defines the input form structure, with each parameter representing a form page or section.

Go to [Workflow Frontend](/docs/internal-developer-portal/flows/worflowyaml#workflow-frontend) to learn more.


<details>
<summary>Example: Workflow Frontend YAML</summary>

```yaml
spec:
  parameters:
    - title: Developer Information
      description: Tell us about yourself
      type: object
      required:
        - developer_name
        - team_name
      properties:
        developer_name:
          title: Your Name
          type: string
          description: Enter your full name
        team_name:
          title: Your Team
          type: string
          description: Which team do you belong to?
        favorite_language:
          title: Favorite Programming Language
          type: string
          enum:
            - JavaScript
            - Python
            - Java
            - Go
            - Other
          default: JavaScript
```
</details>

#### **2. Workflow Backend (Steps)**
The **Workflow Backend** is the "brain" of your Workflow - it takes user inputs from the frontend and performs the desired automation tasks. This component configures the **actions** to be triggered and the **orchestration pipelines** to be executed. This includes the core execution units that define the Workflow logic.

**In our example**: We'll trigger a Harness Pipeline that processes the developer information and generates a welcome message. The `steps` field defines the automation actions, with each step having an `id`, `name`, `action`, and `input` configuration.

Go to [Workflow Backend](/docs/internal-developer-portal/flows/worflowyaml#workflow-backend) to learn more.

<details>
<summary>Example: Workflow Backend YAML</summary>

```yaml
steps:
  - id: trigger-pipeline
    name: Trigger Welcome Pipeline
    action: trigger:harness-custom-pipeline
    input:
      url: "YOUR_PIPELINE_URL_HERE"
      inputset:
        developer_name: ${{ parameters.developer_name }}
        team_name: ${{ parameters.team_name }}
        favorite_language: ${{ parameters.favorite_language }}
      apikey: ${{ parameters.token }}
```
</details>

#### **3. Workflow Outputs**
**Workflow Outputs** configure **output variables** to be used after backend execution. This includes links to created resources, status messages, and feedback for users.

**In our example**: We'll display a success message and provide a link to view the pipeline execution. The `output` field defines what users see after completion, with `links` for navigation and `text` for messages.

Go to [Workflow Outputs](/docs/internal-developer-portal/flows/worflowyaml#workflow-outputs) to learn more.

<details>
<summary>Example: Workflow Outputs YAML</summary>

```yaml
output:
  links:
    - title: View Pipeline Execution
      url: ${{ steps.trigger.output.PipelineUrl }}
  text:
    - title: Success!
      content: |
        Welcome! Your workflow completed successfully.
        
        This demonstrates how Self-Service Workflows can:
        - Collect input from developers
        - Process that input automatically
        - Provide immediate feedback
```
</details>

#### **Workflow Metadata**
**Workflow Metadata** provides **information** about the Workflow itself, including name, description, tags, and ownership details for catalog discovery.

**In our example**: We'll define basic metadata to make our workflow discoverable and understandable. The `metadata` section contains the workflow's identity, while the `spec` section defines ownership and type.

Go to [Workflow YAML Structure](/docs/internal-developer-portal/flows/worflowyaml) to learn more.

:::info
**Note:** When creating Workflows through the Harness IDP UI, this metadata can be automatically generated based on the information you provide in the creation form.
:::

<details>
<summary>Example: Workflow Metadata YAML</summary>

```yaml
apiVersion: harness.io/v1
kind: Workflow
type: service
identifier: helloworldworkflow
name: Hello World Workflow
owner: platform-team
metadata:
  description: A simple workflow to demonstrate self-service automation
  tags:
    - getting-started
    - demo
```
</details>

<details>
<summary>Example Workflow YAML</summary>

```yaml
apiVersion: harness.io/v1
kind: Workflow
type: service
identifier: helloworldworkflow
name: Hello World Workflow
owner: platform-team
spec:
  output:
    links:
      - title: View Pipeline Execution
        url: ${{ steps.trigger.output.PipelineUrl }}
    text:
      - title: Success!
        content: |
          Welcome! Your workflow completed successfully.

          This demonstrates how Self-Service Workflows can:
          - Collect input from developers
          - Process that input automatically
          - Provide immediate feedback
  parameters:
    - title: Developer Information
      description: Tell us about yourself
      type: object
      required:
        - developer_name
        - team_name
      properties:
        developer_name:
          title: Your Name
          type: string
          description: Enter your full name
        team_name:
          title: Your Team
          type: string
          description: Which team do you belong to?
        favorite_language:
          title: Favorite Programming Language
          type: string
          enum:
            - JavaScript
            - Python
            - Java
            - Go
            - Other
          default: JavaScript
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  steps:
    - id: trigger
      name: Trigger Welcome Pipeline
      action: trigger:harness-custom-pipeline
      input:
        url: YOUR_PIPELINE_URL_HERE
        inputset:
          developer_name: ${{ parameters.developer_name }}
          team_name: ${{ parameters.team_name }}
          favorite_language: ${{ parameters.favorite_language }}
        apikey: ${{ parameters.token }}
metadata:
  description: A simple workflow to demonstrate self-service automation
  tags:
    - getting-started
    - demo

```

</details>

### Step 2: Create the supporting Harness IDP Pipeline

Harness IDP Workflows can trigger Harness Pipelines to perform the actual automation. This is used to handle the backend orchestration of the Workflow. First, create a simple pipeline that will process your workflow inputs.

<details>
<summary>Example Pipeline YAML</summary>

```yaml
pipeline:
  name: hello-world-pipeline
  identifier: helloworldpipeline
  projectIdentifier: <PROJECT-IDENTIFIER>
  orgIdentifier: <ORG-IDENTIFIER>
  tags: {}
  stages:
    - stage:
        name: idp-hello-world
        identifier: idphelloworld
        type: IDP
        spec:
          execution:
            steps:
              - step:
                  type: Run
                  name: Hello-World
                  identifier: HelloWorld
                  spec:
                    connectorRef: account.harnessImage
                    image: node:18
                    shell: Sh
                    command: |-
                      echo "Welcome to Harness IDP, <+pipeline.variables.developer_name>!"
                      echo "Team: <+pipeline.variables.team_name>"
                      echo "Favorite Language: <+pipeline.variables.favorite_language>"
                      echo "Workflow completed successfully!"
          platform:
            os: Linux
            arch: Arm64
          runtime:
            type: Cloud
            spec: {}
        tags: {}
  variables:
    - name: developer_name
      type: String
      required: true
      value: <+input>
    - name: team_name
      type: String
      required: true
      value: <+input>
    - name: favorite_language
      type: String
      required: true
      value: <+input>

```
</details>

<Tabs>
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/f5770ad2-527c-4a02-a2ec-da4f1537a80a" title="Create the supporting Harness IDP Pipeline" />

</TabItem>
<TabItem value="Step-by-Step">

1. Navigate to **Pipelines** in your Harness IDP project.
2. Click **Create a Pipeline**.
3. Add a **Developer Portal Stage** with a **Run** step. This step will execute the given shell script that will generate the welcome message.

```yaml
echo "Welcome to Harness IDP, <+pipeline.variables.developer_name>!"
echo "Team: <+pipeline.variables.team_name>"
echo "Favorite Language: <+pipeline.variables.favorite_language>"
echo "Workflow completed successfully!"
```

4. Configure the pipeline with these **variables**:
   - `developer_name` (String, Runtime Input)
   - `team_name` (String, Runtime Input)
   - `favorite_language` (String, Runtime Input)

5. **Save** the pipeline and copy its **execution URL**. This URL will be used in the Workflow YAML to trigger the pipeline.

</TabItem>
</Tabs>

---

### Step 3: Create the Workflow

Now create the workflow that will collect user inputs and trigger your pipeline.

<Tabs>
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/2ee9d6bd-6041-4c46-abe0-ce7e33d9f936" title="Create Workflow in Harness IDP" />

</TabItem>
<TabItem value="Step-by-Step">

1. Navigate to **IDP** and click **Create** in the sidebar.
2. Select **Workflow** from the entity types.
3. **Fill in basic details**:
   - **Name**: `Hello World Workflow`
   - **Description**: `A simple workflow to demonstrate self-service automation`
   - **Tags**: `getting-started`, `demo`

4. **Define the scope**: Choose Account, Org, or Project level scope access. 

5. **Review the YAML**: Switch to the YAML view and paste your Workflow YAML here. Replace `YOUR_PIPELINE_URL_HERE` with your actual pipeline URL.

6. **Save** the Workflow and navigate to the Catalog to find your "Hello World Workflow". 

</TabItem>
</Tabs>

---

### Step 4: Execute your Workflow

Once created, execute your workflow to ensure it works correctly.

1. **Navigate to the Catalog** and find your "Hello World Workflow".
2. **Click on the workflow** to open its details page.
3. **Click Launch** to start the workflow execution.
4. **Fill out the form** with your information:
   - Enter your name
   - Specify your team
   - Select your favorite programming language
5. **Submit the form** and watch the pipeline execute.
6. **View the results** in the pipeline execution logs.

---

## Next Steps

Now that you've learned how to create and manage a Workflow, here's what to explore next:
1. Deep dive into the [Workflow YAML](/docs/internal-developer-portal/flows/worflowyaml.md)
2. Learn how to configure [Inputs](/docs/internal-developer-portal/flows/flows-input.md), [Actions](/docs/internal-developer-portal/flows/custom-actions.md) and [Outputs](/docs/internal-developer-portal/flows/outputs.md) in a Workflow. 
3. Explore how to [setup a Harness IDP Pipeline](/docs/internal-developer-portal/flows/harness-pipeline.md).
4. Learn how to [configure RBAC](/docs/internal-developer-portal/rbac/workflow-rbac.md) for Workflows.
