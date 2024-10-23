---
title: Create Kubernetes Configmaps and Secrets from Artifact Files
---


Inject Artifact File into Pipeline Context
Spinnaker has the concept of [artifacts](https://www.spinnaker.io/reference/artifacts/), making it possible to reference files stored in GitHub, Bitbucket, S3, GCS and others in the pipeline. You need to have [enabled and configured](https://www.spinnaker.io/setup/artifacts/) first the artifact type you need. For example for fetching files from GitHub you need to add a GitHub account to Spinnaker configuration, where you provide access credentials.

We can use a Webhook stage to make generic HTTP requests and inject the response into the pipeline context to be referenced later, and we can leverage internal Spinnaker endpoints to make these requests for downloading artifact contents. Clouddriver is in this case the service used to download artifacts in Spinnaker, so if we want to download a file from GitHub this would be the example configuration in Webhook stage:
```
Webhook URL: http://spin-clouddriver:7002/artifacts/fetch
Method: PUT
Payload: {
           "artifactAccount": "",
           "reference": "https://api.github.com/repos///contents/",
           "type": "github/file",
           "version": ""
         }
```

```artifactAccount```: This is the name of the account that was configured in Spinnaker through Halyard, that has the credentials needed to connect to the artifact source.
```reference```: Location of the artifact. The example shows the url format for a file in GitHub, for S3 artifacts this would be the S3 url location.
```type```: One of the supported artifact types. If unsure of the exact value, you can always go to ```Expected Artifacts``` section, add one artifact of the desired type and then go to ```Edit as JSON``` to see the type values for different artifact types.
```version```: This also depends on the artifact type. In the case of GitHub files this is the branch name. As in the previous case you can add the artifact you want to ```Expected Artifacts``` and then see in ```Edit as JSON``` the actual value for the version field, depending on the artifact type you want to use.
We can see that most of the configuration is static. We can create a [custom webhook stage](https://www.spinnaker.io/guides/operator/custom-webhook-stages/), which is a way to abstract away common configuration and only expose the fields that need to be changed, and this would be a far more user friendly experience. For the sample webhook configuration above to be converted into a stage ```Read GitHub file``` this would be the custom webhook configuration to add to ```profiles/orca-local.yml``` file:
```
webhook:
 preconfigured:
 - label: Read GitHub file
   type: readGithubFile
   enabled: true
   description: Reads a file from GitHub and stores its content in pipeline context under ${#stage("Stage Name")["context"]["webhook"]["body"]}
   method: PUT
   url: http://spin-clouddriver:7002/artifacts/fetch
   customHeaders:
     Content-Type: 
     - application/json
   payload: |-
     { 
       "artifactAccount": "", 
       "reference": "https://api.github.com/repos/${parameterValues['org']}/${parameterValues['repo']}/contents/${parameterValues['filePath']}", 
       "type": "github/file", 
       "version": "${parameterValues['branch']}" 
     }
   parameters:
   - label: Organization
     name: org
     description: 'GitHub organization name'
     defaultValue: ''
     type: string
   - label: Repository
     name: repo
     description: 'GitHub repository name'
     defaultValue: ''
     type: string
   - label: File
     name: filePath
     description: 'Path to the file, relative to repository root'
     defaultValue: ''
     type: string
   - label: Branch
     name: branch
     description: 'Branch to use'
     defaultValue: ''
     type: string
```

Create and Deploy ConfigMap or Secret
Once we have the file contents in the pipeline context, we can use a ```Deploy (Manifest)``` stage to deploy the Kubernetes ConfigMap or Secret. This would be an example yaml for a Secret:
```
apiVersion: v1
data:
  secretFile.txt: '${#toBase64(#stage("Read GitHub file")["context"]["webhook"]["body"])}'
kind: Secret
metadata:
  name: mysecret
  namespace: staging
type: Opaque
```

Remember that [Spinnaker automatically versions](https://www.spinnaker.io/reference/artifacts/in-kubernetes-v2/#versioned-kubernetes-objects) all ConfigMaps and Secrets it deploys to be able to perform rollbacks, so this example will create a secret named ```mysecret-v000``` the first time it runs. Other deployment manifest stages down the pipeline that reference the secret, will get the correct version automatically.

