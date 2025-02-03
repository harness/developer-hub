---
title: Automate Github Onboarding via IDP Workflows
description: Onboard your Github repositories via APIs and IDP Workflows
sidebar_position: 20
---

# Automate Github Onboarding via IDP Workflows

Onboarding Github repositories across multiple Harness projects can be a time-consuming and tedious task, especially for large organizations with thousands of repositories.

Instead of configuring GitHub connectors for each project.With Harness APIs and the Internal Developer Portal (IDP) workflow.you can now use a single GitHub connector at the account level and selectively onboard repositories to the project of your choice and automatically create scan pipelines to scan those repositories.


**Pre-requisite:**

1) Make sure you already created the connector at the account level.
2) Create the [Personal access token](/docs/platform/automation/api/add-and-manage-api-keys.md) for your personal Harness account.

Follow the below steps to configure the APIs to onboard the Github repositories.

### Create Integration

Use the below sample `Create Integration` API, to create an integration to onboard the repositories within a specific project

**Sample API Request:**

```
curl --request POST \
  --url https://app.harness.io/gateway/ssca-manager/v1/orgs/{org}/projects/{project}/integration \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Harness-Account: ' \
  --header 'x-api-key: 123' \
  --data '{
  "connector_id": "string",
  "type": "GITHUB"
}'

```

**Response Body:**

```

{
    "connector_id": "account.harness",
    "type": "GITHUB",
    "status": "ACTIVE",
    "last_scan_at": 0,
    "org": "https://github.com/harness",
    "id": "-CPoZ1NnTBaECFqIjdwd8JA"
}

```

:::note

The id generated in the above response is the `integration_id` needs to be provided as input to the `Configure Repositories` API

:::

### Configure Repositories

The `Create Integration` API sets up the integration,while the `Configure Repositories` API lets you configure which repositories to onboard and scan.

**Sample API Request:**

```

curl --request POST \
  --url https://app.harness.io/gateway/ssca-manager/v1/orgs/{org}/projects/{project}/integration/{integration_id}/repos \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Harness-Account: ' \
  --header 'x-api-key: 123' \
  --data '{
  "include_all_repos": false,
  "repositories": [
    {
      "name": "string"
    },
    {
      "name": "string"
    }
  ]
}'

```

**Response Body:**

```
{
    "all_repos_configured": true,
    "missing_repos": null
}

```

<details>


<summary>Bash Script Incorporating the above 2 APIs </summary>

```

#!/bin/bash
org="{org}"
project="{project}"
account_id="{account_id}"
harness_api_key="{harness_api_key}"
connector_id="{connector_id}"
REPOS="{repo1,repo2...repox}

response=$(curl --silent --request POST \
--url "https://app.harness.io/v1/orgs/$org/projects/$project/integration" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--header "harness-account: $account_id" \
--header "x-api-key: $harness_api_key" \
--data "{
\"connector_id\": \"$connector_id\",
\"type\": \"GITHUB\"
}")

integration_id=$(echo "$response" | jq -r '.id')
echo "Integration ID extracted: $integration_id"
# Convert the REPOS variable into an array using a comma as the delimiter
IFS=',' read -r -a repo_array <<< "$REPOS"
# Build the repositories JSON dynamically
REPO_JSON=""
for repo in "${repo_array[@]}"; do
REPO_JSON+="{\"name\": \"$repo\"},"
done

# Remove the trailing comma
REPO_JSON="${REPO_JSON%,}"
# API2: Configure repositories dynamically
curl "https://app.harness.io/v1/orgs/$org/projects/$project/integration/$integration_id/repos" \
--header "x-api-key: $harness_api_key" \

--header "content-type: application/json" \
--header "harness-account: $account_id" \
--data "{
\"include_all_repos\": false,
\"repositories\": [$REPO_JSON]
}"

```


</details>

### Delete Integration

To remove the integration, you can use the below `Delete Integration` API. This action is irreversible, so make sure you don’t need the integration any longer before you delete it.

**Sample API Request:**

```
curl --request DELETE \
  --url https://app.harness.io/gateway/ssca-manager/v1/orgs/{org}/projects/{project}/integration/{integration_id} \
  --header 'Harness-Account: ' \
  --header 'x-api-key: 123'

```

**Response Body:**

```
{
  "status" : 200
}

```
<!-- 
### Update Integration

If you need to update the repositories which are included in an existing integration, you can re-run the [Configure Repositories API](/docs/software-supply-chain-assurance/automate-github-onboarding-with-idp-workflows#configure-repositories) with the following options:

**Add new repositories:** Include the new repositories in the repositories array in a subsequent API call.

**Remove repositories:** Omit them from the repositories array and set include_all_repos to false.

**Include all repositories:** Set include_all_repos to true if you want to manage all repositories under the integration. -->


You can use the below sample IDP Workflow to onboard the GitHub Repositories

<details>

<summary> Sample IDP Workflow to onboard Github repos for automated scanning process </summary>
```
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: scs-rspm
  title: Onboard github repos for SCS RSPM
  description: A workflow to onboard github repos for automated scanning
  tags:
    - scs
    - github
    - compliance
spec:
  owner: dummy@harness.io
  type: service
  parameters:
    - title: Harness Org, Project and Github Repos
      required:
        - org_name
        - project_name
        - github_repo
      properties:
        org_name:
          title: Organization Identifier
          type: string
          description: Enter value of existing org identifier      
        project_name:
          title: Project Identifier
          type: string
          description: Enter value of existing project identifier     
        github_repo:
          title: Name of the GitHub repositories to be scanned
          type: string
          description: Enter Repo names comma seperated
    - title: Fetch Harness Token
      properties:
        # This field is hidden but needed to authenticate the request to trigger the pipeline
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  steps:
    - id: trigger
      name: Onboarding Github Repos and running RSPM scans
      action: trigger:harness-custom-pipeline
      input:
        url: "<+URL+>"
        inputset:
          project_name: ${{ parameters.project_name }}
          github_repo: ${{ parameters.github_repo }}
          org_name: ${{ parameters.org_name }}
        apikey: ${{ parameters.token }}
    # The final step is to register our new component in the catalog.


  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}


```

</details>