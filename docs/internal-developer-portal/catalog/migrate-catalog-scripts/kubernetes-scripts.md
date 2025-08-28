---
title: Catalog Population from Kubernetes
description: Documentation for Kubernetes catalog population scripts
sidebar_label: Population from Kubernetes
sidebar_position: 13
---


In modern cloud-native environments, applications run across dozens of Kubernetes namespaces, each hosting multiple Deployments, Services, and other resources. Manually onboarding these Kubernetes workloads into the Harness Software Catalog quickly becomes error-prone and unsustainable.

This script helps you discover and add your Kubernetes resources to the Harness Internal Developer Portal catalog automatically. It's especially useful when you have many Kubernetes resources across multiple namespaces that would be time-consuming to add manually.

The script follows a comprehensive workflow:

1. Scans your Kubernetes cluster and finds all your resources
2. Generates IDP-compatible YAML files for each resource
3. Commits these files to a central Git repository (GitHub)
4. Registers them with Harness IDP through the Entities API

This workflow ensures you have version control for all your catalog entities and can track changes over time.

By automatically analyzing Deployments, Services, and their interdependencies, the script ensures the catalog reflects a near real-time view of your cluster without requiring manual intervention.

### Script Source

[Source Code](https://github.com/harness-community/idp-samples/blob/main/IDP-2.0-Samples/catalog-scripts/kubernetes-harness-idp-catalog-sync.py)

```bash
curl -o kubernetes-harness-idp-catalog-sync.py https://raw.githubusercontent.com/harness-community/idp-samples/refs/heads/main/IDP-2.0-Samples/catalog-scripts/kubernetes-harness-idp-catalog-sync.py
```

### Pre-Requisites

#### Local Environment

This script is designed to run on your local machine or in a CI/CD pipeline with access to both your Kubernetes cluster and GitHub. You'll need:

* [Python 3](https://www.python.org/downloads/) with the following libraries installed:

  ```bash
  pip install requests python-dotenv kubernetes
  ```

#### Kubernetes Access

* Access to your Kubernetes cluster via properly configured `kubectl` and kubeconfig
* Permissions to list and get deployments, services, and other resources
* For local use, make sure you're connected to the right cluster context:

  ```bash
  kubectl config current-context
  # If needed, switch context
  kubectl config use-context <your-context>
  ```
* A `.env` file configured with the following environment variables:

```ini
HARNESS_API_KEY = '<harness-api-key>'
HARNESS_ACCOUNT_ID = '<harness-account-id>'
ORG_IDENTIFIER = '<harness-org-id>'
PROJECT_IDENTIFIER = '<harness-project-id>'
CONNECTOR_REF = '<harness-git-connector-ref>'
CENTRAL_REPO = '<name-of-central-repo-to-store-yamls>'
GITHUB_TOKEN = '<github-token>'
GITHUB_ORG = '<github-org-name>'
```

> `HARNESS_API_KEY` must have write access to IDP entities.
> `GITHUB_TOKEN` requires `repo` and `read:org` scopes.
> `CONNECTOR_REF` is the Git connector reference in Harness pointing to your `CENTRAL_REPO`.

### Execution

Run the script with namespace and dependency analysis flags:

```bash
python3 kubernetes-harness-idp-catalog-sync.py --namespace <namespace-name> --analyze-dependencies
```

Options:

* `--namespace` (optional): Limit discovery to a specific namespace. Defaults to all namespaces.
* `--resource-kind` (optional): Filter by resource type (`Deployment`, `Service`, `Pod`). Defaults to Deployments and Services.
* `--analyze-dependencies` (flag): Enables detection of service-to-deployment dependencies based on selectors and environment variables.

### What the Script Does

1. Connects to your Kubernetes cluster using kubeconfig.
2. Discovers Deployments, Services (and optionally Pods).
3. Generates Harness-compatible `idp.yaml` for each resource, with fields like:

   * `identifier` (deterministic, based on namespace, kind, and name)
   * `metadata` (description, tags, annotations)
   * `spec.dependsOn` for detected dependencies
4. Pushes each YAML file into a GitHub central repo at a structured path.
5. Registers the entity in Harness IDP via the **Entities API**, ensuring it appears in the Software Catalog.

### Output Structure

The GitHub repo will store files in the following format:

```
central-repo/
  ├── <namespace>/
  │   ├── deployment/
  │   │   └── my-deployment/idp.yaml
  │   └── service/
  │       └── my-service/idp.yaml
```

Each YAML will look like:

```yaml
apiVersion: harness.io/v1
kind: component
orgIdentifier: default
projectIdentifier: sd2
type: Service
identifier: default_deployment_myapp
name: "myapp"
owner: group:account/IDP_Test
spec:
  dependsOn:
    - Component:my-service   # automatically detected
  lifecycle: production
  type: kubernetes
  subtype: Deployment
metadata:
  description: "Kubernetes Deployment myapp in namespace default"
  tags:
    - kubernetes
    - auto-onboarded
    - default
    - deployment
```

### Logs & Troubleshooting

* Logs are printed to stdout for each resource:

  * Discovery status (`Found N resources`)
  * Entity creation (`✓ Registered in Harness successfully`)
  * Dependency detection (`Detected dependency: ...`)
* Failures include Harness API error codes and response details.
* If entity already exists, the script automatically retries with **UPSERT** mode.
* If running on a personal GitHub account instead of an org, change the GitHub API call from:

```python
https://api.github.com/orgs/{GITHUB_ORG}/repos
```

to:

```python
https://api.github.com/users/{GITHUB_ORG}/repos
```
