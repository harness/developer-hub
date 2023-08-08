<!-- details><summary>Instance scan settings</summary -->

The following settings apply to Security steps where the `scan_type` is `instance`.

* `instance_domain`
* `instance_path`
* `instance_protocol`
* `instance_port`
* `instance_username` The username for authenticating with the external scanner.
* `instance_password` You should create a Harness text secret with your encrypted password and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and reference text secrets](/docs/platform/Secrets/add-use-text-secrets).
<!-- * `instance_type` = `website` -->

<!-- /details -->