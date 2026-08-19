---
title: Connector Configuration Reference
sidebar_label: Configuration Reference
description: Complete configuration examples for common connector types, including YAML definitions, Terraform HCL, and REST API endpoints.
keywords:
  - connector YAML
  - connector reference
  - Terraform provider
  - REST API
  - delegate selectors
  - secret reference
tags:
  - connectors
  - platform
  - reference
sidebar_position: 4
---

This reference collects complete configuration examples for the most common connector types, in YAML, Terraform HCL, and REST API form. Use it when you define connectors as code rather than through the UI, or when you need to confirm the exact field names and secret reference syntax that Harness expects.

---

## Credential reference

Connectors reference secrets stored in <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank">Harness Secret Manager</a> or an external vault. Secret references follow a scoped naming convention that determines where the secret is resolved from.

### Secret reference format

| Format | Scope | Example |
|---|---|---|
| `account.SecretName` | **Account**-level secret | `account.github_pat` |
| `org.SecretName` | **Organization**-level secret | `org.aws_access_key` |
| `SecretName` | **Project**-level secret (default) | `docker_password` |

### Authentication methods

The authentication method determines how credentials are presented to the external service.

| Method | Description |
|---|---|
| Username and token | A username paired with a personal access token or password, stored as separate secrets. |
| SSH key | An SSH private key stored as a Harness SSH secret, used for Git SSH connections. |
| OAuth | An <a href="https://oauth.net/2/" target="_blank">OAuth 2.0</a> flow that uses a configured OAuth app. The platform manages token refresh automatically. |
| IAM role (AWS) | Assume an Identity and Access Management (IAM) role using Security Token Service (STS). Requires a trust relationship with the Harness delegate or a cross-account role ARN. |
| Service account key (GCP) | A JSON key file for a GCP service account, stored as a Harness file secret. |
| Inherit from delegate | Use the credentials available on the delegate host, for example, an instance profile or workload identity. |

### Delegate selectors

Delegate selectors route connector operations to specific delegates. Use them when the target service is in a private network, or when only certain delegates have the required network access or credentials.

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

The following examples show Git provider connector configuration for both HTTP and SSH connection types.

### GitHub HTTP connector

```yaml title="github-http-connector.yaml" showLineNumbers {7-12}
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

```yaml title="gitlab-ssh-connector.yaml" showLineNumbers {7-10}
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

The `type: Account` field at the end of the spec indicates that the URL points to the organization or account level, for example, `https://github.com/my-org`. Set this field to `Repo` when the URL points to a specific repository. Use account-level URLs where possible, because a single connector can then access all repositories in the organization.

---

## AWS connector example

AWS connectors support multiple credential types, including access keys, IAM roles, and delegate-inherited credentials. The following example uses IAM role-based authentication with cross-account access.

```yaml title="aws-connector.yaml" showLineNumbers {6-10,12-14}
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

### AWS IAM role inherited from the delegate

```yaml title="aws-delegate-connector.yaml" showLineNumbers {6-7}
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

:::tip Use IAM roles over access keys
When delegates run on AWS (EC2 or EKS), prefer the **Inherit from Delegate** credential type. This uses the instance profile or IAM Roles for Service Accounts (IRSA) attached to the delegate, which removes the need to store long-lived access keys as secrets.
:::

---

## Kubernetes connector example

Kubernetes connectors provide access to clusters for deployment operations. The following example uses a service account token for authentication.

```yaml title="k8s-connector.yaml" showLineNumbers {9-14}
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

### Kubernetes via delegate (in-cluster)

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

When the <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Harness Delegate</a> runs inside the target Kubernetes cluster, use the **Inherit from Delegate** credential type. The delegate uses its own service account token and the in-cluster API endpoint, so no additional credentials are required. Confirm that the delegate's service account holds the <a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/" target="_blank">Kubernetes RBAC</a> permissions required for deployment operations.

---

## HashiCorp Vault connector example

The Vault connector integrates with HashiCorp Vault for centralized secrets management. The following example configures Vault with token authentication and the <a href="https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2" target="_blank">KV v2 secrets engine</a>.

```yaml title="vault-connector.yaml" showLineNumbers {6-8,10-11}
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

### Vault with AppRole authentication

```yaml title="vault-approle-connector.yaml" showLineNumbers {6-7,14}
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

For more information on generating the role ID and secret ID, see <a href="https://developer.hashicorp.com/vault/docs/auth/approle" target="_blank">AppRole authentication</a>.

:::warning
When you use token authentication, confirm that the token has a sufficient time to live (TTL) and that `renewalIntervalMinutes` is set to a value lower than the token TTL. Harness renews the token automatically at this interval. If the token expires, all secrets stored in Vault become inaccessible until you configure a new token.
:::

---

## Terraform provider

The <a href="https://registry.terraform.io/providers/harness/harness/latest/docs" target="_blank">Harness Terraform provider</a> enables infrastructure-as-code management of connectors. The following examples create connectors using HCL.

```hcl title="github-connector.tf" showLineNumbers {1,12-16}
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

Manage connectors programmatically through the Harness REST API when you automate onboarding or synchronize connectors from an external system. The following endpoints are available for connector CRUD operations.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/v1/connectors` | Create a new connector. |
| `GET` | `/v1/connectors` | List connectors with optional filters. |
| `GET` | `/v1/connectors/{identifier}` | Get a specific connector by identifier. |
| `PUT` | `/v1/connectors/{identifier}` | Update an existing connector. |
| `DELETE` | `/v1/connectors/{identifier}` | Delete a connector. |
| `POST` | `/v1/connectors/test-connection/{identifier}` | Test the connectivity of an existing connector. |
| `POST` | `/v1/connectors/test-connection` | Test a connector configuration without saving it. |

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

All API requests require an `x-api-key` header with a valid Harness API key and a `Harness-Account` header with your account identifier. For **Organization**-scoped or **Project**-scoped connectors, include the `org` and `project` query parameters.

---

## Related articles

- <a href="/3k-docs/platform/getting-started/connectors/manage" target="_blank">Manage connectors</a>: To test, edit, and audit connectors in the Harness UI.
- <a href="/3k-docs/platform/getting-started/connectors/troubleshooting" target="_blank">Connector troubleshooting</a>: To resolve authentication, network, and scope resolution failures.
- <a href="/3k-docs/platform/getting-started/pipeline" target="_blank">Pipeline YAML v1 overview</a>: To reference a connector from a pipeline stage.
