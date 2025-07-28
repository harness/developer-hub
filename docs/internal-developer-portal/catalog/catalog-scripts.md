---
title: Service Onboarding using Scripts on Catalog
description: Detailed documentation of the Service Onboarding Scripts 
sidebar_label: Service Onboarding Scripts
sidebar_position: 11
---

## [IDP 2.0 – GitHub Multi-Repo Catalog Population Script](https://github.com/harness-community/idp-samples/blob/main/IDP-2.0-Samples/catalog-scripts/idp-catalog-population-multirepo-github.py)



In large engineering organizations, service sprawl across hundreds or even thousands of GitHub repositories is common. Manually onboarding each service into the Harness Software Catalog — either by creating catalog-info YAMLs individually or configuring one catalog location per repository — quickly becomes unmanageable. Moreover, using the default discovery plugins to register each repository as a location can lead to fragility; a single failure during sync can prevent the entire catalog from updating correctly.

This script provides a scalable and GitOps-friendly solution by automating the end-to-end onboarding process using the Harness IDP 2.0 **Entities API** and **Git Experience (GitX)**. It programmatically fetches all repositories from your GitHub organization, dynamically generates a valid `idp.yaml` for each service, and pushes that file into a centralized GitHub repository. Each YAML is committed to a unique path using the Git connector you've configured in Harness. This ensures that service metadata is not only standardized but also version-controlled in Git, promoting visibility and auditability.

#### Script Source

[Source Code](https://github.com/harness-community/idp-samples/blob/main/IDP-2.0-Samples/catalog-scripts/idp-catalog-population-multirepo-github.py)

```bash
curl -o idp-catalog-population-multirepo-github.py https://raw.githubusercontent.com/harness-community/idp-samples/main/IDP-2.0-Samples/catalog-scripts/idp-catalog-population-multirepo-github.py
```

#### Pre-Requisites

* [Python 3](https://www.python.org/downloads/) with [`requests`](https://pypi.org/project/requests/) and [`python-dotenv`](https://pypi.org/project/python-dotenv/) libraries installed.
* A `.env` file configured with the following:

```ini
GITHUB_TOKEN = '<github-token>'
HARNESS_API_KEY = '<harness-api-key>'
HARNESS_ACCOUNT_ID = '<harness-account-id>'
CONNECTOR_REF = '<harness-git-connector-ref>'
ORG_IDENTIFIER = '<harness-org-id>'
PROJECT_IDENTIFIER = '<harness-project-id>'
CENTRAL_REPO = '<name-of-central-repo-to-store-yamls>'
GITHUB_ORG = '<github-org-name>'
```

> `GITHUB_TOKEN` must have `repo` and `read:org` permissions.
> `HARNESS_API_KEY` must be a [User/API Key](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token) with write access to IDP entities.

#### Execution

After creating your `.env` file, run the script:

```bash
python3 idp-catalog-population-multirepo-github.py
```

This will:

1. Fetch all repositories from your GitHub org.
2. For each repo:

   * Sanitize the identifier.
   * Generate a valid `idp.yaml`.
   * Push it to the specified folder in `CENTRAL_REPO`.
   * Register the entity in Harness using the Entities API.

#### Output Structure

The catalog YAML files will be stored in the following pattern inside your central GitHub repository:

```
central-repo/
  ├── service-one/
  │   └── idp.yaml
  ├── service-two/
  │   └── idp.yaml
  └── ...
```

Each YAML will look like:

```yaml
apiVersion: harness.io/v1
kind: component
orgIdentifier: <your-org>
projectIdentifier: <your-project>
type: Service
identifier: sanitized_unique_id
name: repo-name
owner: group:account/IDP_Test
spec:
  lifecycle: production
metadata:
  description: "repo description from GitHub"
  annotations:
    backstage.io/source-location: url:https://github.com/<your-org>/<repo-name>
    backstage.io/techdocs-ref: dir:.
  tags:
    - auto-onboarded
```

#### Logs & Troubleshooting

* Script output includes a status message for each repo (success/failure).
* Failures are logged with full error messages from the Harness API.
* For personal GitHub accounts, change the GitHub API URL from:

```python
https://api.github.com/orgs/{GITHUB_ORG}/repos
```

to:

```python
https://api.github.com/users/{GITHUB_ORG}/repos
```


:::info
If you're interested to try out different request to work with entities, you can use the new [Entities APIs](https://apidocs.harness.io/tag/Entities).
:::

## IDP 1.0 - Scripts to create new services, register new services 

:::caution
The following scripts are **only valid for IDP 1.0**. 
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="Catalog-Scripts">
<TabItem value="github" label="GitHub">

- The GitHub Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.

### Pre-Requisites to Use the Script

- Harness API Key - [Docs](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token)
- GitHub Token - [Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- A Repository to store all the IDP Config YAML
- [Python 3](https://www.python.org/downloads/) installed on your machine where you're trying to execute the code along with [requests](https://pypi.org/project/requests/) library. 

### Download the Script

- A pregenerated/created repo (let's call it chosen_repo) is to be cloned. After opening it on your code editor and from chosen_repo, below commands can be run to first download and then generate and register `catalog-info.yaml` files of all the repos in your org. The `catalog-info.yaml` files will be in - `chosen_repo/services/{repos}/catalog-info.yaml` where repos will be all the repo in your org.

- Command to Download the [Script](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py)

- [**Script Source**](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py)

```sh
curl -o idp-catalog-wizard-github.py https://raw.githubusercontent.com/harness-community/idp-samples/main/catalog-scripts/idp-catalog-wizard-github.py
``` 

```sh
python3 idp-catalog-wizard-github.py --create-yamls --org YOUR_GITHUB_ORG --token YOUR_GITHUB_TOKEN --repo-pattern "regex_pattern"
```

- Case 1: Run command using `--create-yamls` args, then you'll have to manually push the files - `"services/" .....` after which you can run command using `--register-yamls` args to register all the YAML.

- Case 2: Run command using `--run-all` args, all actions will be performed - create, push and register in one go.

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py)

#### Register YAML files using X-API-Key and account name (all given args in command below are required)

```sh
python3 idp-catalog-wizard-github.py --register-yamls --org org_name --x_api_key your_x_api_key --account your_account

```

- `org` : GitHub Org name
- `x_api_key`: Refer https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token to generate one
- -`account` : This is your Harness Account ID. You can get it from the URL e.g. - `https://app.harness.io/ng/account/{Your account ID}/module/idp/overview`


#### Perform all actions: create YAML files, push changes, and register YAML files (all given args in command below are required)

```sh
python3 idp-catalog-wizard-github.py --run-all --org example-org --token your_token --x_api_key your_x_api_key --account your_account
```


### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github-monorepo.py) - For Monorepos

- Discover `catalog-info.yaml` matching the regex filter and register under the catalog provided in `apiurl`. This would separate locations for all the matching catalog-info.yaml files and hence would be synchronized separately.

- To use the script you need to add the appropriate flags and run it. 


### [Create Services](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/create_services.py)

- Generates a monorepo with the following file structure, assigning random English names.

```sh
repo
   - antronasal-service
      - catalog-info.yaml
   - cespititous-service
      - catalog-info.yaml
   - ....
   - geomaly-service
        - catalog-info.yaml
```

### [Delete Services](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/delete_services.py)

- Will clean up the services already created.

</TabItem>
<TabItem value="bitbucket" label="Bitbucket">

- Similar to GitHub, Bitbucket Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching `catalog-info.yaml` files and hence would be synchronised separately.


### Pre-Requisites to Use the Script

- Harness API Key - [Docs](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token)
- Bitbucket App Password - [Docs](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)
- A Repository to store all the IDP Config YAML
- [Python 3](https://www.python.org/downloads/) installed on your machine where you're trying to execute the code along with [requests](https://pypi.org/project/requests/) library. 

### Download the Script

- A pregenerated/created repo (let's call it chosen_repo) is to be cloned. After opening it on your code editor and from chosen_repo, below commands can be run to first download and then generate and register `catalog-info.yaml` files of all the repos in your org. The `catalog-info.yaml` files will be in - `chosen_repo/services/{repos}/catalog-info.yaml` where repos will be all the repo in your org.

- Command to Download the [Script](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py)

- [**Script Source**](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py)

```sh
curl -o idp-catalog-wizard-bitbucket.py https://raw.githubusercontent.com/harness-community/idp-samples/main/catalog-scripts/idp-catalog-wizard-bitbucket.py
```

```sh
python3 idp-catalog-wizard-bitbucket.py --create-yamls --workspace example_workspace --username bitbucket_username --password bitbucket --project_key bitbucket_project_key
```

- Case 1.a: Run command using `--create-yamls` args, then you'll have to manually push the files `- "services/" .....` after which you can run command using `--register-yamls` args to register all the YAML. Scope of this command is your **whole workspace**.

- Case 1.b: Add all args as given for case "1.a" example below with `--project_key` which will keep your **scope to project** instead of workspace.

- Case 2.a: Run command using `--run-all` args, all actions will be performed - create, push and register in one go.

- Case 2.b: Add all args as given for case "2.a" example below with `--project_key` which will keep your **scope to project** instead of workspace.

#### Example:

**Create YAML files for repositories in the organization "example-org" with the provided token (all given args in command below are required)**

:::info

Bitbucket `username` isn't same as your email address, rather follow these [docs](https://community.atlassian.com/t5/Bitbucket-questions/HOW-TO-FIND-MY-BIT-BUCKET-USERNAME/qaq-p/1081960), to find your username. 

:::

```sh
python3 idp-catalog-wizard-bitbucket.py --create-yamls --workspace example_workspace --username bitbucket_username --password bitbucket --project_key bitbucket_project_key
```

- `workspace`: Bitbucket workspace name
- `username` : [Bitbucket Username](https://community.atlassian.com/t5/Bitbucket-questions/HOW-TO-FIND-MY-BIT-BUCKET-USERNAME/qaq-p/1081960)
- `password` : [Bitbucket app password](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)
- `project_key` : (OPTIONAL) Bitbucket project key
- `repo-pattern` : (OPTIONAL) Your repo pattern 


### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket-monorepo.py) - For Monorepos

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py)

#### Register YAML files using X-API-Key and account name (all given args in command below are required)

```sh
python3 idp-catalog-wizard-bitbucket.py --register-yamls --workspace bitbucket_workspace --x_api_key your_x_api_key --account harness_account
```

- `workspace` : Bitbucket workspace name 
- `x_api_key` : Refer [docs](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token ) to generate one. 
- `account` : This is your Harness Account ID. You can get it from the URL e.g. - `https://app.harness.io/ng/account/{Your account ID}/module/idp/overview`


#### Perform all actions: create YAML files, push changes, and register YAML files (all given args in command below are required)

```sh
python3 idp-catalog-wizard-bitbucket.py --run-all --workspace example-workspace --password app_password --x_api_key your_x_api_key --account your_account --project_key (optional) project-key

Refer Create YAML and Register YAML for the arg details 
```

- Discover `catalog-info.yaml` matching the regex filter and register under the catalog provided in `apiurl`. This would separate locations for all the matching catalog-info.yaml files and hence would be synchronized separately.


</TabItem>
</Tabs>

## Troubleshooting

- Ensure you are using the correct credentials with the appropriate scope when running the scripts.
- If you are trying out the scripts with a personal account instead of an organization account, update the GitHub API endpoints as specified below.

### Using Personal GitHub Account 

If you're testing the above scripts on your personal GitHub account, make sure to update the repository listing endpoint to use [users](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user) instead of [org](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories).

Here's the difference between the endpoints:

```sh
# For organizations
/orgs/{org}/repos

# For personal accounts
/users/{username}/repos
```