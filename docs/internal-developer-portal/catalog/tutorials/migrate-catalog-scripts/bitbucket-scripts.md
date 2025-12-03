---
title:  Import from Bitbucket
description: Documentation for Bitbucket catalog population scripts
sidebar_label: Import from Bitbucket 
sidebar_position: 12
keywords:
  - bitbucket repository discovery
  - harness catalog population
  - software catalog automation
  - bitbucket integration scripts
  - entity registration
  - catalog population script
  - catalog migration
tags:
  - bitbucket
  - catalog
  - automation
  - idp
  - migration
  - population
redirects:
  - /internal-developer-portal/catalog/bitbucket-scripts
---

## Populate Your Catalog from Bitbucket

- Similar to GitHub, Bitbucket Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching `catalog-info.yaml` files and hence would be synchronised separately.

### Pre-Requisites to Use the Script

- Harness API Key - [Docs](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token)
- Bitbucket Username and Password - Follow these [docs](https://community.atlassian.com/t5/Bitbucket-questions/HOW-TO-FIND-MY-BIT-BUCKET-USERNAME/qaq-p/1081960) to find your username
- A Repository to store all the IDP Config YAML
- [Python 3](https://www.python.org/downloads/) installed on your machine where you're trying to execute the code along with [requests](https://pypi.org/project/requests/) library. 

### Download the Script

- A pregenerated/created repo (let's call it chosen_repo) is to be cloned. After opening it on your code editor and from chosen_repo, below commands can be run to first download and then generate and register `catalog-info.yaml` files of all the repos in your org. The `catalog-info.yaml` files will be in - `chosen_repo/services/{repos}/catalog-info.yaml` where repos will be all the repo in your org.

- Command to Download the [Script](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py)

- [**Script Source**](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py)

```sh
curl -o idp-catalog-wizard-bitbucket.py https://raw.githubusercontent.com/harness-community/idp-samples/main/catalog-scripts/idp-catalog-wizard-bitbucket.py
```

### Execution Options

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

## Troubleshooting

- Ensure you are using the correct credentials with the appropriate scope when running the scripts.
- For Bitbucket, make sure you're using the correct username (not email address) and app password.
