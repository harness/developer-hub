---
title: Connector Configuration Reference
sidebar_label: Configuration Reference
description: Complete configuration examples for common connector types, including YAML definitions, Terraform HCL, and REST API endpoints.
sidebar_position: 4
---

Complete configuration examples for common connector types, including YAML definitions, Terraform HCL, and REST API endpoints.

---

## Credential reference

Connectors reference secrets stored in the Harness Secret Manager (or an external vault). Secret references follow a scoped naming convention that determines where the secret is resolved from.

### Secret reference format

| Format | Scope | Example |
|---|---|---|
| `account.SecretName` | Account-level secret | `account.github_pat` |
| `org.SecretName` | Organization-level secret | `org.aws_access_key` |
| `SecretName` | Project-level secret (default) | `docker_password` |

### Authentication methods

| Method | Description |
|---|---|
| Username and Token | A username paired with a personal access token or password, stored as separate secrets. |
| SSH Key | An SSH private key stored as a Harness SSH secret, used for Git SSH connections. |
| OAuth | OAuth 2.0 flow using a configured OAuth app. The platform manages token refresh automatically. |
| IAM Role (AWS) | Assume an IAM role using STS. Requires a trust relationship with the Harness delegate or cross-account role ARN. |
| Service Account Key (GCP) | A JSON key file for a GCP service account, stored as a Harness file secret. |
| Inherit from Delegate | Use the credentials available on the delegate host (e.g., instance profile, workload identity). |

### Delegate selectors

Delegate selectors route connector operations to specific delegates. This is required when the target service is in a private network or when specific delegates have the necessary network access or credentials.

```yaml title="delegate-selectors.yaml"
connector:
  name: Private K8s Cluster
  identifier: k8s_private
  type: K8sCluster
  spec:
    credential:
      type: InheritFromDelegate
      spec:
        delegateSelectors:
          - private-network-delegate
          - us-east-1-delegate
```

---

## GitHub connector examples

The following examples demonstrate GitHub connector configuration using both HTTP and SSH connection types.

### GitHub HTTP connector

```yaml title="github-http-connector.yaml"
connector:
  name: GitHub HTTP
  identifier: github_http
  type: Github
  spec:
    url: https://github.com/my-org
    authentication:
      type: Http
      spec:
        type: UsernameToken
        spec:
          username: my-github-username
          tokenRef: account.github_pat
    apiAccess:
      type: Token
      spec:
        tokenRef: account.github_pat
    delegateSelectors: []
    executeOnDelegate: false
    type: Account
```

### GitLab SSH connector

```yaml title="gitlab-ssh-connector.yaml"
connector:
  name: GitLab SSH
  identifier: gitlab_ssh
  type: Gitlab
  spec:
    url: git@gitlab.com:my-org
    authentication:
      type: Ssh
      spec:
        sshKeyRef: account.gitlab_ssh_key
    apiAccess:
      type: Token
      spec:
        tokenRef: account.gitlab_token
    delegateSelectors: []
    executeOnDelegate: true
    type: Account
```

:::info Account vs Repository URL Type
The `type: Account` field at the end of the spec indicates that the URL points to the organization or account level (e.g., `https://github.com/my-org`). Set this to `Repo` if the URL points to a specific repository. Account-level URLs are recommended because they allow a single connector to access all repositories in the organization.
:::

---

## AWS connector example

AWS connectors support multiple credential types including access keys, IAM roles, and delegate-inherited credentials. The following example uses IAM role-based authentication with cross-account access.

```yaml title="aws-connector.yaml"
connector:
  name: AWS Production
  identifier: aws_prod
  type: Aws
  spec:
    credential:
      type: ManualConfig
      spec:
        accessKey: <+secrets.getValue("account.aws_access_key")>
        secretKeyRef: account.aws_secret_key
      region: us-east-1
    crossAccountAccess:
      crossAccountRoleArn: arn:aws:iam::123456789012:role/HarnessCrossAccountRole
      externalId: harness-external-id
    delegateSelectors:
      - aws-delegate-us-east
```

### AWS IAM role (Inherit from Delegate)

```yaml title="aws-delegate-connector.yaml"
connector:
  name: AWS via Delegate
  identifier: aws_delegate
  type: Aws
  spec:
    credential:
      type: InheritFromDelegate
      spec:
        delegateSelectors:
          - aws-eks-delegate
    crossAccountAccess:
      crossAccountRoleArn: arn:aws:iam::987654321098:role/HarnessDeployRole
      externalId: harness-deploy-id
```

:::tip Use IAM Roles Over Access Keys
When running delegates on AWS (EC2 or EKS), prefer the "Inherit from Delegate" credential type. This uses the instance profile or IRSA (IAM Roles for Service Accounts) attached to the delegate, eliminating the need to store long-lived access keys as secrets.
:::

---

## Kubernetes connector example

Kubernetes connectors provide access to K8s clusters for deployment operations. The following example uses a service account token for authentication.

```yaml title="k8s-connector.yaml"
connector:
  name: Production K8s
  identifier: k8s_prod
  type: K8sCluster
  spec:
    credential:
      type: ManualConfig
      spec:
        masterUrl: https://k8s-api.example.com:6443
        auth:
          type: ServiceAccountToken
          spec:
            serviceAccountTokenRef: account.k8s_sa_token
            caCertRef: account.k8s_ca_cert
    delegateSelectors:
      - k8s-delegate-prod
```

### Kubernetes via Delegate (In-cluster)

```yaml title="k8s-in-cluster-connector.yaml"
connector:
  name: In-Cluster K8s
  identifier: k8s_in_cluster
  type: K8sCluster
  spec:
    credential:
      type: InheritFromDelegate
      spec:
        delegateSelectors:
          - in-cluster-delegate
```

:::info In-Cluster Authentication
When the Harness Delegate runs inside the target Kubernetes cluster, use the "Inherit from Delegate" credential type. The delegate uses its own service account token and the in-cluster API endpoint, so no additional credentials are needed. Ensure the delegate's service account has the necessary RBAC permissions for deployment operations.
:::

---

## HashiCorp Vault connector example

The Vault connector integrates with HashiCorp Vault for centralized secrets management. The following example configures Vault with token authentication and the KV v2 secrets engine.

```yaml title="vault-connector.yaml"
connector:
  name: HashiCorp Vault
  identifier: vault_prod
  type: Vault
  spec:
    authToken: account.vault_token
    basePath: /harness
    vaultUrl: https://vault.example.com:8200
    secretEngineManuallyConfigured: true
    secretEngineName: secret
    secretEngineVersion: 2
    renewalIntervalMinutes: 10
    secretId: null
    appRoleId: null
    isDefault: false
    isReadOnly: false
    delegateSelectors:
      - vault-delegate
```

### Vault with AppRole Authentication

```yaml title="vault-approle-connector.yaml"
connector:
  name: Vault AppRole
  identifier: vault_approle
  type: Vault
  spec:
    appRoleId: my-approle-id
    secretId: account.vault_secret_id
    basePath: /harness
    vaultUrl: https://vault.example.com:8200
    secretEngineManuallyConfigured: true
    secretEngineName: secret
    secretEngineVersion: 2
    renewalIntervalMinutes: 10
    isDefault: true
    isReadOnly: false
```

:::warning Vault Token Renewal
When using token authentication, ensure the token has a sufficient TTL and that `renewalIntervalMinutes` is set to a value less than the token's TTL. Harness will automatically renew the token at this interval. If the token expires, all secrets stored in Vault will become inaccessible until a new token is configured.
:::

---

## Terraform Provider

The Harness Terraform provider enables infrastructure-as-code management of connectors. The following examples create connectors using HCL.

```hcl title="github-connector.tf"
resource "harness_platform_connector_github" "example" {
  identifier  = "github_ci"
  name        = "GitHub CI"
  description = "GitHub connector for CI builds"
  org_id      = "default"
  project_id  = "my_project"
  url         = "https://github.com/my-org"
  connection_type = "Account"
  validation_repo = "my-repo"

  credentials {
    http {
      username  = "my-username"
      token_ref = "account.github_pat"
    }
  }

  api_authentication {
    token_ref = "account.github_pat"
  }
}
```

```hcl title="aws-connector.tf"
resource "harness_platform_connector_aws" "example" {
  identifier  = "aws_prod"
  name        = "AWS Production"
  description = "AWS connector for production deployments"
  org_id      = "default"

  manual {
    access_key_ref = "account.aws_access_key"
    secret_key_ref = "account.aws_secret_key"
  }

  cross_account_access {
    role_arn    = "arn:aws:iam::123456789012:role/HarnessRole"
    external_id = "harness-external-id"
  }
}
```

---

## API reference

Connectors can be managed programmatically through the Harness REST API. The following endpoints are available for connector CRUD operations.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/v1/connectors` | Create a new connector. |
| `GET` | `/v1/connectors` | List connectors with optional filters. |
| `GET` | `/v1/connectors/{identifier}` | Get a specific connector by identifier. |
| `PUT` | `/v1/connectors/{identifier}` | Update an existing connector. |
| `DELETE` | `/v1/connectors/{identifier}` | Delete a connector. |
| `POST` | `/v1/connectors/test-connection/{identifier}` | Test an existing connector's connectivity. |
| `POST` | `/v1/connectors/test-connection` | Test a connector configuration without saving. |

```bash title="create-connector.sh"
# Create a connector via API
curl -X POST 'https://app.harness.io/v1/connectors' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Harness-Account: YOUR_ACCOUNT_ID' \
  -H 'Content-Type: application/json' \
  -d '{
    "connector": {
      "name": "GitHub CI",
      "identifier": "github_ci",
      "type": "Github",
      "spec": {
        "url": "https://github.com/my-org",
        "type": "Account",
        "authentication": {
          "type": "Http",
          "spec": {
            "type": "UsernameToken",
            "spec": {
              "username": "my-username",
              "tokenRef": "account.github_pat"
            }
          }
        }
      }
    }
  }'
```

```bash title="test-and-list-connectors.sh"
# Test an existing connector
curl -X POST 'https://app.harness.io/v1/connectors/test-connection/github_ci' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Harness-Account: YOUR_ACCOUNT_ID' \
  -H 'Content-Type: application/json'

# List all connectors with filters
curl -X GET 'https://app.harness.io/v1/connectors?type=Github&status=SUCCESS' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Harness-Account: YOUR_ACCOUNT_ID'
```

:::info API Authentication
All API requests require an `x-api-key` header with a valid Harness API key and a `Harness-Account` header with your account identifier. For organization- or project-scoped connectors, include `org` and `project` query parameters.
:::