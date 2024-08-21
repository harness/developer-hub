---
title: Service Onboarding using Scripts on Catalog
description: Detailed documentation of the Service Onboarding Scripts 
sidebar_label: Service Onboarding Scripts
sidebar_position: 11
---

## Scripts to create new services, register new services 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="Catalog-Scripts">
<TabItem value="github" label="GitHub">

- The GitHub Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.

### Pre-Requisites to Use the Script

- Harness API Key - [Docs](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token)
- GitHub Token - [Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- A Repository to store all the IDP Config YAMLs
- [Python 3](https://www.python.org/downloads/) installed on your machine where you're trying to execute the code along with [requests](https://pypi.org/project/requests/) library. 

### Download the Script

- A pregenerated/created repo (let's call it chosen_repo) is to be cloned. After opening it on your code editor and from chosen_repo, below commands can be run to first download and then generate and register `catalog-info.yaml` files of all the repos in your org. The `catalog-info.yaml` files will be in - `chosen_repo/services/{repos}/catalog-info.yaml` where repos will be all the repo in your org.

- Command to Download the Script

```sh
curl -o idp-catalog-wizard-github.py https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py
``` 

```sh
python3 idp-catalog-wizard-github.py [OPTIONS]
```

- Case 1: Run command using `--create-yamls` args, then you'll have to manually push the `files - "services/" .....` after which you can run command using `--register-yamls` args to register all the yamls.

- Case 2: Run command using `--run-all` args, all actions will be performed - create, push and register in one go.

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py)

#### Register YAML files using X-API-Key and account name (all given args in command below are required)

```sh
python3 idp-catalog-wizard-github.py --register-yamls --org org_name --x_api_key your_x_api_key --account your_account

```

- `org` : Github Org name
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

- Generates a monorepo with the following file structure, assigning random english names.

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
- A Repository to store all the IDP Config YAMLs
- [Python 3](https://www.python.org/downloads/) installed on your machine where you're trying to execute the code along with [requests](https://pypi.org/project/requests/) library. 

### Download the Script

- A pregenerated/created repo (let's call it chosen_repo) is to be cloned. After opening it on your code editor and from chosen_repo, below commands can be run to first download and then generate and register `catalog-info.yaml` files of all the repos in your org. The `catalog-info.yaml` files will be in - `chosen_repo/services/{repos}/catalog-info.yaml` where repos will be all the repo in your org.

- Command to Download the Script

```sh
curl -o idp-catalog-wizard-bitbucket.py https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py
```

```sh
python3 idp-catalog-wizard-bitbucket.py [OPTIONS]
```

- Case 1.a: Run command using `--create-yamls` args, then you'll have to manually push the files `- "services/" .....` after which you can run command using `--register-yamls` args to register all the yamls. Scope of this command is your **whole workspace**.

- Case 1.b: Add all args as given for case 1.a example below with `--project_key` which will keep your **scope to project** instead of workspace.

- Case 2.a: Run command using `--run-all` args, all actions will be performed - create, push and register in one go.

- Case 2.b: Add all args as given for case 2.a example below with `--project_key` which will keep your **scope to project** instead of workspace.

#### Example:

**Create YAML files for repositories in the organization "example-org" with the provided token (all given args in command below are required)**

:::info

Bitbucket `username` isn't same as your email address, rather follow this [docs](https://community.atlassian.com/t5/Bitbucket-questions/HOW-TO-FIND-MY-BIT-BUCKET-USERNAME/qaq-p/1081960), to find your username. 

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