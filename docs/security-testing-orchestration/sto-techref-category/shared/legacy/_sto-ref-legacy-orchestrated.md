<!-- details><summary>Orchestrated scan settings</summary -->

The following settings are required for Security steps where the `policy_type` is `orchestratedScan`.

<!-- 
* `product_site_id` The access ID used to look up a specific product in the scanner. 

   You might want to create a Harness text secret with your encrypted Id and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

-->

* `product_domain` Domain of the application instance to scan. You can include the full path to the app in this field, or split the full path between the **Domain** and the **Path** fields. Example: `https://myapp.io/portal/us`

* `product_access_token` The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases this is a password or an API key. 

  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

For a complete workflow description and example, go to [Run an Orchestrated Scan in an STO Pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto).


<!-- /details -->