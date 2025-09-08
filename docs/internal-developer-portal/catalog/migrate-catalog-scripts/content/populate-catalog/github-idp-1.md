import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="IDP 1.0" targetPage="/docs/internal-developer-portal/catalog/migrate-catalog-scripts/catalog-scripts" />

## Scripts to Create and Register Services (GitHub)
 
:::caution
This script is for IDP 1.0. For IDP 2.0, please refer to the IDP 2.0 tab.
:::

- The GitHub Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching catalog-info.yaml files and hence would be synchronized separately.

These scripts allow you to automatically create catalog YAML files for all repositories in your GitHub organization or user account and register them with your Harness IDP instance.

### Pre-Requisites

- Harness API Key - [Docs](https://developer.harness.io/docs/platform/automation/api/api-quickstart/#create-a-harness-api-key-and-token)
- GitHub Token - [Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- A Repository to store all the IDP Config YAML
- [Python 3](https://www.python.org/downloads/) installed on your machine where you're trying to execute the code along with [requests](https://pypi.org/project/requests/) library. 

### Download the Script

```bash
curl -o idp-catalog-wizard-github.py https://raw.githubusercontent.com/harness-community/idp-samples/main/catalog-scripts/idp-catalog-wizard-github.py
```

### Execution Options

- Case 1: Run command using `--create-yamls` args, then you'll have to manually push the files - `"services/" .....` after which you can run command using `--register-yamls` args to register all the YAML.

- Case 2: Run command using `--run-all` args, all actions will be performed - create, push and register in one go.

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py)

#### Create YAML files for repositories in the organization "example-org" with the provided token (all given args in command below are required)

```bash
python3 idp-catalog-wizard-github.py --create-yamls --token github_token --org example-org
```

- `token` : GitHub token with necessary permissions to fetch repositories
- `org` : GitHub organization name

#### Push changes to a specific repository (all given args in command below are required)

```bash
python3 idp-catalog-wizard-github.py --push-yamls --token github_token --org example-org --repo repo-name-to-push-changes --author author-name --email author-email
```

- `repo` : Repository name to push the changes to
- `author` : Name of the author for git commit
- `email` : Email of the author for git commit

#### Register YAML files using X-API-Key and account name (all given args in command below are required)

```bash
python3 idp-catalog-wizard-github.py --register-yamls --org example-org --repo repo-name-where-yamls-are-pushed --x_api_key your_x_api_key --account harness_account
```

- `org` : GitHub organization name 
- `repo` : Repository name where YAMLs are pushed 
- `x_api_key` : Your Harness API key
- `account` : Your Harness account ID

#### Perform all actions: create YAML files, push changes, and register YAML files (all given args in command below are required)

```bash
python3 idp-catalog-wizard-github.py --run-all --token github_token --org example-org --repo repo-name-to-push-changes --author author-name --email author-email --x_api_key your_x_api_key --account harness_account
```

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github-monorepo.py) - For Monorepos

For organizations with monorepo structure, a different script is available that can discover and register catalog-info.yaml files within a monorepo:

```bash
curl -o idp-catalog-wizard-github-monorepo.py https://raw.githubusercontent.com/harness-community/idp-samples/main/catalog-scripts/idp-catalog-wizard-github-monorepo.py
```

- This script will discover `catalog-info.yaml` files matching the regex filter and register them under the catalog provided in `apiurl`.
- This registers separate locations for all the matching catalog-info.yaml files, allowing them to be synchronized separately.
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

### Using Personal GitHub Account 

If you're testing the above scripts on your personal GitHub account, make sure to update the repository listing endpoint to use [users](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user) instead of [org](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories).

Here's the difference between the endpoints:

```sh
# For organizations
/orgs/{org}/repos

# For personal accounts
/users/{username}/repos
```
