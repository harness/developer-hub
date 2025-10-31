
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="IDP 2.0" targetPage="/docs/internal-developer-portal/catalog/migrate-catalog-scripts/catalog-scripts" />

## Multi-Repo Catalog Population Script (GitHub)

In large engineering organizations, service sprawl across hundreds or even thousands of GitHub repositories is common. Manually onboarding each service into the Harness Software Catalog — either by creating catalog-info YAMLs individually or configuring one catalog location per repository — quickly becomes unmanageable. Moreover, using the default discovery plugins to register each repository as a location can lead to fragility; a single failure during sync can prevent the entire catalog from updating correctly.

This script provides a scalable and GitOps-friendly solution by automating the end-to-end onboarding process using the Harness IDP 2.0 **Entities API** and **Git Experience (GitX)**. It programmatically fetches all repositories from your GitHub organization, dynamically generates a valid `idp.yaml` for each service, and pushes that file into a centralized GitHub repository. Each YAML is committed to a unique path using the Git connector you've configured in Harness. This ensures that service metadata is not only standardized but also version-controlled in Git, promoting visibility and auditability.

### Script Source

[Source Code](https://github.com/harness-community/idp-samples/blob/main/IDP-2.0-Samples/catalog-scripts/idp-catalog-population-multirepo-github.py)

```bash
curl -o idp-catalog-population-multirepo-github.py https://raw.githubusercontent.com/harness-community/idp-samples/main/IDP-2.0-Samples/catalog-scripts/idp-catalog-population-multirepo-github.py
```

### Pre-Requisites

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

### Execution

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

### Output Structure

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

### Logs & Troubleshooting

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
