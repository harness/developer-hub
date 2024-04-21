<!-- details>
<summary>Container image scan settings</summary -->

These settings apply to Custom Scan steps where both of these conditions are true:
1. The `policy_type` is `orchestratedScan` or `dataLoad`.
2. The `scan_type` is `containerImage`.


<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Container type](#container-type)
- [Container domain](#container-domain)
- [Local image settings](#local-image-settings)
- [Container access Id](#container-access-id)
- [Container access token](#container-access-token)
- [AWS region](#aws-region)

<!-- TOC end -->

#### Container type

##### Key
```
container_type
```

##### Value

One of the following:
```
local_image
```
```
docker_v2
```
```
jfrog_artifactory
```
```
aws_ecr
```

#### Container domain

##### Key
```
container_domain
```

##### Value

The URL of the registry that contains the image to scan. Examples include: 

```
docker.io
```
```
app.harness.io/registry
```
```
us-east1-docker.pkg.dev
```
```
us.gcr.io
```

#### Local image settings

No further settings required.

#### Container access Id

##### Key
```
container_access_id
```

##### Value

Your access Id to the image registry.

#### Container access token

##### Key
```
container_access_token
```

##### Value

The password or access token used to log in to the image registry. In most cases this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

#### AWS region

##### Key
```
container_region
```

##### Value

The region where the image to scan is located, as defined by the cloud provider such as AWS.  
