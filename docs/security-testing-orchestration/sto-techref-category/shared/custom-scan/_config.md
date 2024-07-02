The following settings apply to  scanners where the `scan_type` is `configuration`. 


#### Configuration type

##### Key
```
configuration_type
```
##### Value
```
aws_account
```

#### Configuration access

You can use these settings to access your configuration. 

You should create [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) with your encrypted access token and access it using the format `<+secrets.getValue("my-secret")>`. 

```
configuration_region
```

```
configuration_environment
```
```
configuration_access_id
```
```
configuration_access_token
```
