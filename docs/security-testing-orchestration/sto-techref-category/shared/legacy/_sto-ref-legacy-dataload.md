<!-- details><summary>Dataload scan settings</summary -->

The following settings are required for Security steps where the `policy_type` is `dataLoad`.

* `product_site_id` The access ID used to look up a specific product in the scanner. For Burp scans, for example, this is the Burp enterprise site identifier.

   You should create a Harness text secret with your encrypted Id and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

* `product_domain` Domain of the application instance to scan. You can include the full path to the app in this field, or split the full path between the **Domain** and the **Path** fields. Example: `https://myapp.io/portal/us`

* `product_access_token` The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases this is a password or an API key. 

  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-token")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).


<!-- /details -->