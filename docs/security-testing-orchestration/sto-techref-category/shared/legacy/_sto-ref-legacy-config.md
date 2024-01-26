<!-- details>
<summary>Configuration scan settings</summary -->

The following settings apply to all scanners where the `scan_type` is `configuration`. You should create [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) with your encrypted access ID and token and access them using the format `<+secrets.getValue("project.my-secret")>`. 

* `configuration_type`
	+ accepted value(s)s: `aws_account`
* `configuration_region`
* `configuration_environment`
* `configuration_access_id`
* `configuration_access_token`

<!-- /details -->