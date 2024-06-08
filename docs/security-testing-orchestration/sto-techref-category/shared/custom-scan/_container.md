<!-- details>
<summary>Container image scan settings</summary -->

These settings apply to Custom Scan steps when both of these conditions are true:
1. The `policy_type` is `orchestratedScan` or `dataLoad`.
2. The `scan_type` is `containerImage`.


<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Container type](#container-type)
- [Container domain](#container-domain)
- [Container project](#container-project)
- [Container tag](#container-tag)
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

The registry type where the image is stored. Specify one of the following:

Scan a local image built and stored within the context of the current stage (via `/var/run/docker.sock` registered as a stage level volume mount).
```
local_image
```

A registry that uses the Docker Registry v2 API such as [Docker Hub](https://docs.docker.com/registry/spec/api/), [Google Container Registry](https://cloud.google.com/container-registry), or [Google Artifact Registry](https://cloud.google.com/artifact-registry).
```
docker_v2
```

[JFrog Docker Registry](https://jfrog.com/container-registry/).
```
jfrog_artifactory
```

[Amazon Container Registry](https://aws.amazon.com/ecr/).
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

#### Container project

##### Key
```
container_project
```

##### Value

The image name. For non-local images, you also need to specify the image repository. Example: `jsmith/myalphaservice`


#### Container tag

##### Key
```
container_tag
```

##### Value

The image tag. Examples: `latest`, `1.2.3`


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

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

#### AWS region

##### Key
```
container_region
```

##### Value

The region where the image to scan is located, as defined by the cloud provider such as AWS.  
