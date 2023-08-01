# Prepare Secret for GCP experiments

**Derive SA from GCP**

First, set your current project. Replace &lt;project-id&gt; with your project ID:

```bash
gcloud config set project &lt;project-id&gt;
```

Then, create a new service account. Replace &lt;service-account-name&gt; with the name you want to give to the service account:

```bash
gcloud iam service-accounts create &lt;service-account-name&gt;
```

After the service account is created, you can generate a new JSON key file. Replace &lt;service-account-name&gt; with the name of your service account and &lt;key-file&gt; with the path where you want to save the key file:

```bash
gcloud iam service-accounts keys create &lt;key-file&gt; \
--iam-account &lt;service-account-name&gt;@&lt;project-id&gt;.iam.gserviceaccount.com
```

The generated JSON key file will contain the fields you mentioned, and it looks something like this:

```json
{
    "type": "service_account",
    "project_id": "&lt;project-id&gt;",
    "private_key_id": "&lt;private-key-id&gt;",
    "private_key": "&lt;private-key&gt;",
    "client_email": "&lt;service-account-name&gt;@&lt;project-id&gt;.iam.gserviceaccount.com",
    "client_id": "&lt;client-id&gt;",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/&lt;service-account-name&gt;%40&lt;project-id&gt;.iam.gserviceaccount.com"
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
  type: "&lt;type&gt;"
  project_id: "&lt;project-id&gt;"
  private_key_id: "&lt;private-key-id&gt;"
  private_key: "&lt;private-key&gt;"
  client_email: "&lt;client-email&gt;"
  client_id: "&lt;client-id&gt;"
  auth_uri: "&lt;auth-uri&gt;"
  token_uri: "&lt;token-uri&gt;"
  auth_provider_x509_cert_url: "&lt;auth-provider-x509-cert-url&gt;"
  client_x509_cert_url: "&lt;client-x509-cert-url&gt;"
```

Finally, create the secret yaml file in the chaos infra namespace using the command:

```bash
kubectl apply -f secret.yaml -n &lt;CHAOS-NAMESPACE&gt;
```
