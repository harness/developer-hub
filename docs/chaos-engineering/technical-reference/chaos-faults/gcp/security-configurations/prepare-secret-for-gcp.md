# Prepare Secret for GCP experiments

**Derive SA from GCP**

First, set your current project. Replace &lt;project-id&gt; with your project ID:

```bash
gcloud config set project <project-id>
```

Then, create a new service account. Replace &lt;service-account-name&gt; with the name you want to give to the service account:

```bash
gcloud iam service-accounts create <service-account-name>
```

After the service account is created, you can generate a new JSON key file. Replace &lt;service-account-name&gt; with the name of your service account and &lt;key-file&gt; with the path where you want to save the key file:

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
Prepare the secret YAML based on this JSON:

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
  private_key: "<private-key>"
  client_email: "<client-email>"
  client_id: "<client-id>"
  auth_uri: "<auth-uri>"
  token_uri: "<token-uri>"
  auth_provider_x509_cert_url: "<auth-provider-x509-cert-url>"
  client_x509_cert_url: "<client-x509-cert-url>"
```

Finally, create the secret yaml file in the chaos infra namespace using the command:

```bash
kubectl apply -f secret.yaml -n &lt;CHAOS-NAMESPACE&gt;
```
