---
title: Dynamic Workflow Picker based on API Response
description: Learn to create a dynamic Workflow picker in IDP with API-based dropdown fields.
sidebar_position: 20
sidebar_label: Understand Dynamic Workflow Picker
---

It is quite common to create a UI field in [IDP Workflow](http://developer.harness.io/docs/internal-developer-portal/flows/service-onboarding-pipelines#specparameters---formstep--formstep) forms which shows a static list options to the user. For example -

```yaml
properties:
  repository_type:
    type: string
    title: Repository Type
    enum:
      - public
      - private
```

will generate the following

![](./static/repository-type-picker-static.png)

However, often times a static list does not provide much value to the user. Here are some of the use-cases -

- Choose your Repository
- Choose your Bitbucket Project
- Choose your Jenkins Pipeline
- Choose your Infrastructure Component
- Choose a Jira Project

As a creator of the workflow, you want to provide real-time options for these input fields for a better user experience. This would also allow you to expect the results in a consistent format and leave no room for user formatting errors.

This is where our Dynamic Workflow Picker comes into play. Let's see how it works.

![](./static/dynamic-picker-architecture-diagram.png)

The Workflow UI makes a request to our [Backend Proxy](https://developer.harness.io/docs/internal-developer-portal/plugins/delegate-proxy/) which you can configure as a way to securely make requests to third party APIs and get a response. The UI Picker allows you to customize the response a bit and present it as a list in the dropdown.

## Creating a Dynamic Workflow Picker

There are two steps to adding a dynamic workflow picker in Harness IDP.

1. **Define a Backend Proxy** so that requests from the UI can be populated with authorization headers and forwarded to the third party APIs.
2. **Create the dynamic field in the workflow form**, consuming the backend proxy and the API response.

### Step 1: Create a Backend Proxy

The first step is to declare a new Backend Proxy so that the Workflow forms UI can make authenticated requests to our third party provider. Let's assume you are trying to make requests to GitHub.

Go to IDP Admin -> Plugins. Find the plugin called "Configure Backend Proxies".

![](./static/config-backend-proxies-plugin.png)

Inside the plugin, you get three options (like any other [IDP plugin configuration](https://developer.harness.io/docs/internal-developer-portal/plugins/overview)).

1. Declare a Backend Proxy (HTTP Proxy) endpoint and headers
2. Configure necessary secrets
3. Configure Delegate Proxy (Delegate HTTP Proxy) (in case the API is not publicly accessible, or the secret is on your infrastructure)

In order to set up a HTTP proxy to connect with GitHub APIs, you can add the following in the configuration YAML

```yaml
proxy:
  endpoints:
    /github-api:
      target: https://api.github.com
      pathRewrite:
        /api/proxy/github-api/?: /
      headers:
        Authorization: token ${PROXY_GITHUB_TOKEN}
```

Here the `github-api` is the unique name of the endpoint of this Backend proxy. We will need it next.

The `target` should point to the API base URL of your 3rd party provider e.g. `api.github.com`, `https://api.bitbucket.org/2.0` etc.

The `pathRewrite` is field used by the system to ensure the API requests are correctly rerouted. It needs to be of the format `/api/proxy/<endpoint_name>/?: /` as shown above.

In the `headers` you can add an Authorization header. Ensure you use a unique token name here as variables are `GITHUB_TOKEN` or `BITBUCKET_TOKEN` are system defined. The token name does not matter, as long as a secret is set up for the corresponding variable.

![](./static/example-proxy-backend-config.png)

Configure a Delegate HTTP Proxy to route traffic through an HTTP proxy using Delegate. This is useful when we need to access private endpoints not publicly accessible. 

:::warning
Endpoints targeting the `harness.io` domain should **not** be configured behind a **Delegate HTTP Proxy**, as you are already in the Harness infrastructure. Using a Delegate HTTP Proxy in this case is unnecessary, as direct access is inherently available. 
:::

![](./static/delegate-proxy.png)

Hit "Save Configuration" and now our backend proxy is ready to use!

You can verify this endpoint by making requests to the `proxy` endpoint at `https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/proxy/`. For example in order to test the GitHub example above, you can make a request to

```
https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/proxy/github-api/user
```

Here `https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/proxy/github-api/` can be seen exactly as `https://api.github.com/`. So all the endpoint paths on the GitHub API can be used after the proxy endpoint URL. You can learn more about how to consume Harness IDP APIs on our [API Docs](/docs/internal-developer-portal/api-refernces/public-api).

### Step 2: Create the Dropdown Picker in Workflows Form

Now that our Backend proxy is ready, it is time to create that dropdown picker. Here is a small example to start with

```yaml
parameters:
  # ...
  properties:
    github_repo:
      type: string
      ui:field: SelectFieldFromApi
      ui:options:
        title: GitHub Repository
        description: Pick one of the GitHub Repositories
        placeholder: "Choose a Repository"
        path: proxy/github-api/users/OrkoHunter/repos
        valueSelector: full_name
```

![](./static/picker-example.png)

Let us understand these properties in detail -

- `ui:field` - This has to be set to `SelectFieldFromApi`. This is the name of the UI Field Component responsible for rendering the API response based picker.
- `title`, `description` and `placeholder` are text fields responsible for telling the user what this field is about. See screenshot.
- `path` - This is the most important field and has to be of the format `proxy/<endpoint-name>/<API-path>`. Here the `endpoint-name` is `github-api` as we have defined above. And `users/OrkoHunter/repos` is the API endpoint path on `api.github.com`.
- `valueSelector` - This is an optional field. If the response of the API is an array of strings, then you do not need this field. If the response is an array of objects/map, then `valueSelector` can be used to point to the key in the object/map that needs to be used for the dropdown.

And that's it! We now have a Workflow dropdown where results are coming from an external API response.

![](./static/dynamic-picker-example.png)

## Conditional API Requests

**Dynamic Pickers** allow users to interact with input form fields and receive real-time options, ensuring soft validation for workflow creators. Users can dynamically select input values, making workflows more interactive.

In the background, Dynamic Pickers make an **API request** to fetch relevant data. However, there was a limitation:
- The **API URL was fixed**, meaning no query parameters could be used to filter results dynamically.
- Some use cases require **user inputs** to refine results, which wasn't previously possible.

#### Introducing Conditional API Requests
Workflow Dynamic Pickers now support **conditional API requests**, where one field's values depend on another. This enables:
- ✔ **Interactive workflows** – Users can dynamically filter results based on prior inputs.
- ✔ **Customizable API requests** – API URLs can now include query parameters derived from user input.


### Without vs. With Conditional API Requests

#### Without Conditional API Requests
Since **query parameters** couldn't be used in the **API URL**, input fields were independent of each other.

**For example**, consider a GitHub repository picker in a Harness IDP workflow. The repository picker consists of:
- **UI Picker** – Displays the list of repositories.
- **Proxy Backend** – Provides authentication and API access.

If the proxy backend is configured with an API URL like http://api.github.com, without conditional API requests, the UI Picker would look like this:
```YAML
parameters:
 properties:
   github_repo:
     type: string
     ui:field: SelectFieldFromApi
     ui:options:
       title: GitHub Repository
       description: Pick one of the GitHub Repositories
       placeholder: "Choose a Repository"
       path: proxy/github-api/orgs/harness/repos
       valueSelector: full_name
```
**Limitations**

- The **``path``** field ``(proxy/github-api/orgs/harness/repos)`` is fixed to fetch repositories only from the **harness org**.
- Users **cannot filter** repositories based on **different organizations or projects**.

#### With Conditional API Requests
By enabling conditional API requests, users can create dependencies between input fields.
- API URLs can now include **dynamic query parameters** derived from user input.
- Users can **interactively** use Workflows. 

**For example**, if users need to specify their GitHub organization to fetch repositories dynamically, the UI Picker would be updated as follows:
```YAML
parameters:
  properties:
    github_org:
      type: string
      title: Provide GitHub Org
    github_repo:
      type: string
      ui:field: SelectFieldFromApi
      ui:options:
        title: GitHub Repository
        description: Pick one of the GitHub Repositories
        placeholder: "Choose a Repository"
        path: proxy/github-api/orgs/{{ parameters.github_org }}/repos
        valueSelector: full_name
```
**Benefits**

- ✔ The **``path``** field now **dynamically updates** based on the selected **github_org**.
- ✔ Users can **filter repositories dynamically** instead of being restricted to a fixed org.
- ✔ Enables **interactive and responsive workflows**.

Let's deep dive into the details of how this feature can be implemented.

### Form Context
When a user selects or provides input in a form field, the **Form Context** updates with the relevant data. Other fields, typically read-only, can subscribe to this context and automatically update based on the latest information.

#### Implementation
- With Dynamic Workflow UI Pickers, users can reference previously entered form data using the following format in the **``path``** field: 

  **``{{ parameters.[propertyId] }}``**

  Here, **`propertyId`** refers to the **ID of the input field** that you want to use as a dependency for the Dynamic Picker.

- This enables **dynamic values** in the ``path`` field of the Dynamic Picker, where variables retrieve values from other input fields.

### Example YAML
Let’s understand this with an example.
In a **Repository Picker** Workflow, the user provides their ``organization name``, and we want the workflow to:

- Fetch all ``projects`` under the **selected organization** and display them to the user.
- Fetch all ``repositories`` under the **selected project** based on the user’s selection.

To achieve this, we need two dynamic pickers. Below is the YAML configuration for this setup:

```YAML {23}
parameters:
  - title: Select Harness Project
    type: object
    properties:
      projectId:
        title: Harness Project ID
        description: Select the Harness Project ID
        type: string
        ui:field: HarnessProjectPicker
        ui:autofocus: true
      organizationId:
        title: Harness Organization ID
        description: Select the Harness Organization ID
        type: string
        ui:field: HarnessAutoOrgPicker
      pipelineId:
        type: string
        ui:field: SelectFieldFromApi
        ui:options:
          title: Harness Pipeline ID
          placeholder: Select the Harness Pipeline ID
          allowArbitraryValues: true
          path: proxy/harness-api/v1/orgs/{{ parameters.organizationId }}/projects/{{ parameters.projectId }}/pipelines
          valueSelector: identifier
          labelSelector: identifier
steps:
  - id: debug
    name: Debug
    action: debug:log
    input:
      message:
        "{ parameters.pipelineId }": null
```

#### YAML Breakdown


**Example API Path**  


Result

![](./static/parameters-refernce.gif)  

:::info
You can also use conditional API requests across **multiple pages**, and property references only work with values provided through Dynamic UI pickers. 
//Example
:::

## Supported Filters to parse API response

### `SelectFieldFromApi` Field

Here is an elaborate example of what all properties are possible with the `SelectFieldFromApi` field, showcasing how to parse values from an API response.

```YAML
properties:
  api-picker:
    type: string
    ui:field: SelectFieldFromApi

    ui:options:
      title: Title
      description: Description
      # (Optional) Mention about the type of API call POST/GET, GET is default if not mentioned
      request:
        method: POST
        headers:
          Content-Type: text/plain
        # Indicates the format of the request body being sent. 
        body: This is a simple plain text message
      # The Path on the Harness IDP backend API and the parameters to fetch the data for the dropdown
      path: "proxy/proxy-endpoint/api-path"
      params:
        urlparamkey: "urlparamvalue"

      # (Optional) Renders the provided text as a placeholder value into the select box.
      placeholder: "Select from options"

      # (Optional) This field is used to point to the Array element inside the API response. It can be nested as shown here. If the response itself is an array, you can skip this.
      arraySelector: "object1.key1"

      # (Optional) If the response array is not an array of strings but rather an array of objects, valueSelector can be used to set the value of each selected item.
      valueSelector: "id"

      # (Optional) In case you want to show the user something else rather than the value itself, you can use the labelSelector for it.
      labelSelector: "name"
```

You can find the detailed docs on the [project's README](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/scaffolder-field-extensions/scaffolder-frontend-module-http-request-field).

### POST Method Support

The **POST method** can be configured for Dynamic API Pickers, enabling users to interact with external APIs by sending data in the request body. This is particularly useful for fetching data via **GraphQL APIs**, invoking **Lambda functions**, etc. 

#### Key Elements:
- **`method` field** - Used to specify the **POST** request method.
- **`headers` field - `Content-Type`**: Specifies the request body's type. 
  - In case of structured data (e.g., JSON) - `application/json` is used. 
  - In case of plain text - `text/plain` is used. 
- **`body` field**: Contains the data sent to the API.

Here's how the POST method is used to fetch and populate dynamic pickers within forms, focusing on the GitHub Repos Multi picker (`customMulti`):

```YAML
customvalidate:
    title: GitHub Repos Single
    type: string
    description: Pick one of GitHub Repos
    ui:field: ValidateAndFetch
    ui:options:
      path: "catalog/entities/by-refs"
      request:
        method: POST
        headers:
          Content-Type: application/json
        body:
          entityRefs:
            - user:default/autouser1
          fields:
            - kind
            - metadata.name
        contextData:
          loginName: items[0].metadata.name
        button:
          title: Fetch Refs
```

- In this example, a POST request is made to the GitHub API to retrieve repositories for a specific user (`{{parameters.gitusername}}`).
- Using POST is particularly beneficial when transmitting complex or sensitive data, such as **API tokens, authentication headers, or data that triggers server-side actions** (e.g., filtering or updating records).

### Parsing API Response using filters

Let's look at some different types of API responses and how to create a picker based on that using the `arraySelector`, `valueSelector` and `labelSelector` filters.

#### Case 1: The response is an array

```json
["item1", "item2"]
```

This is the most straightforward case, and we do not need any of the additional filters here.

```yaml
properties:
  api-picker:
    type: string
    ui:field: SelectFieldFromApi
    ui:options:
      title: Title
      description: Description
      path: "proxy/proxy-endpoint/api-path"
```

#### Case 2: The response is an array of objects

```json
[
  {
    "id": "abc123",
    "name": "service A"
  },
  {
    "id": "abc124",
    "name": "service B"
  }
]
```

```yaml
properties:
  api-picker:
    type: string
    ui:field: SelectFieldFromApi
    ui:options:
      title: Title
      description: Description
      path: "proxy/proxy-endpoint/api-path"
      # We need to show `name` to the users
      valueSelector: "name"
```

If you want to show the user the names of the service here, but want to store the ID of the selected service to be used in the Pipeline execution later on, you can do this using

```yaml
properties:
  api-picker:
    type: string
    ui:field: SelectFieldFromApi
    ui:options:
      title: Title
      description: Description
      path: "proxy/proxy-endpoint/api-path"
      # We show the `name` to the users but store the `id` as the selected value
      valueSelector: "id"
      labelSelector: "name
```

#### Case 3: The response is a nested object of arrays

```json
"data": {
  "property": "cities",
  "array": [
    {
      "id": "city123",
      "name": "City A"
    },
    {
      "id": "city124",
      "name": "City B"
    }
  ]
}
```

```yaml
properties:
  api-picker:
    type: string
    ui:field: SelectFieldFromApi
    ui:options:
      title: Title
      description: Description
      path: "proxy/proxy-endpoint/api-path"
      # We need to point to the array inside the response
      arraySelector: "data.array"
      # We show the `name` to the users but store the `id` as the selected value
      valueSelector: "id"
      labelSelector: "name
```

## Notes

### Advanced processing the API response

If the filters here are not sufficient for your use case, and you require additional data processing of the response, then we recommend you setting up a Lambda function in your cloud provider or a lightweight backend to do this job. You can use your Backend Proxy and Delegate Proxy to communicate to your custom Lambda/Backend.

## Example Usage

### Fetch the list of Harness Services in Workflows

1. Configure the [Backend Proxy](#step-1-create-a-backend-proxy)

Set up a backend proxy in the plugin configuration to enable API calls to Harness. 

```YAML
proxy:
  endpoints:
    /harness-api-endpoint:
      target: https://app.harness.io
      pathRewrite:
        /api/proxy/harness-api-endpoint/?: /
      headers:
        x-api-key: ${PROXY_HARNESS_TOKEN}
```

- `/harness-api-endpoint`: Proxy path for the Harness API.
- `x-api-key`: Add your Harness Personal Access Token as an environment variable(covered in the next step).. 

2. Add the [Harness Personal Access Token](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens) as a variable. Save the token as an environment variable named `PROXY_HARNESS_TOKEN`.

3. Update your Workflow definition YAML to include a dropdown for fetching the list of services.

```YAML
## Example workflows.yaml
...
properties:
  service:
    type: string
    ui:field: SelectFieldFromApi
    ui:options:
      title: Choose the service
      description: Pick one of the service you want to deploy
      placeholder: "Choose a service"
      allowArbitraryValues: true
      path: proxy/harness-api-endpoint/ng/api/servicesV2?page=0&size=100&accountIdentifier=ACCOUNT_ID&orgIdentifier=ORG_ID&projectIdentifier=PROJECT_ID&includeAllServicesAccessibleAtScope=true
      valueSelector: 'service.name'
      arraySelector: 'data.content'
...
```
- `ui:field`: Configures the dropdown to fetch data from an API.
- `path`: API endpoint for fetching the list of services. You need to add the account identifier in place of `ACCOUNT_ID`, organization identifier in place of `ORG_ID` and project identifier in-place of `PROJECT_ID`.
- `valueSelector`: Extracts the service name for the dropdown values.
- `arraySelector`: Extracts the array containing the services

For a complete example, refer to the [sample Workflows YAML](https://github.com/harness-community/idp-samples/blob/main/tutorial-dynamic-picker-examples.yaml).

