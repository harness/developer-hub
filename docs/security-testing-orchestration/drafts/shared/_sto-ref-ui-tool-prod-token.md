The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases this is a password or an API key. You should [create a secret](/docs/platform/security/add-file-secrets) with your encrypted ID and reference the secret using the format `<+secrets.getValue(project.product-access-token>`.  

