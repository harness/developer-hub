#### Access Token (`product_access_token`)

The access token to log in to the scanner. In most cases this is a password or an API key. You should [create a secret](/docs/platform/security/add-file-secrets) with your encrypted token and reference the secret using the format `<+secrets.getValue(project.container-access-id>`.  