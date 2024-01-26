---
title: Creating secrets for GCP experiments
---

This section describes the steps you can follow to create a secret to execute GCP chaos experiments. 


### Step 1: Create a service account

Create a service account to derive the authentication secret to run experiments on GCP. To create the service account and secret:

1. Set your current project. Replace &lt;project-id&gt; with your project ID:

  ```bash
  gcloud config set project <project-id>
  ```

2. Create a new service account. Replace &lt;service-account-name&gt; with the name you want to give to the service account:

  ```bash
  gcloud iam service-accounts create <service-account-name>
  ```
### Step 2: Generate new JSON key file

3. After you create a new service account, generate a new JSON key file. Replace &lt;service-account-name&gt; with the name of your service account and &lt;key-file&gt; with the path where you want to save the key file:

  ```bash
  gcloud iam service-accounts keys create <key-file> \
  --iam-account <service-account-name>@<project-id>.iam.gserviceaccount.com
  ```

The generated JSON key file will contain the fields you mentioned, and it looks something like this:

```json
  {
      "type": "service_account",
      "project_id": "<project-id>",
      "private_key_id": "<private-key-id>",
      "private_key": "<private-key>",
      "client_email": "<service-account-name>@<project-id>.iam.gserviceaccount.com",
      "client_id": "<client-id>",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<service-account-name>%40<project-id>.iam.gserviceaccount.com"
  }
```

### Step 3: Prepare the secret YAML
4. Based on the JSON key file you created earlier, prepare the secret YAML:

```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: cloud-secret
  type: Opaque
  stringData:
    type: "<type>"
    project_id: "<project-id>"
    private_key_id: "<private-key-id>"
    private_key: <private-key>
    client_email: "<client-email>"
    client_id: "<client-id>"
    auth_uri: "<auth-uri>"
    token_uri: "<token-uri>"
    auth_provider_x509_cert_url: "<auth-provider-x509-cert-url>"
    client_x509_cert_url: "<client-x509-cert-url>"
```

:::warning
Newline (\n) characters within the private key are crucial. Avoid using double quotes to prevent their loss.
:::

### Step 4: Apply the secret YAML in desired namespace
5. Apply the secret YAML file you created earlier in the chaos infrastructure namespace using the command:

  ```bash
  kubectl apply -f secret.yaml -n <CHAOS-NAMESPACE>
  ```
