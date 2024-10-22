---
title: App Engine Deployments
---


To deploy to App Engine using different repositories for code and ```app.yaml``` file you need to configure the Git Repository Url pointing to your code repository.
## Using Artifacts:
Then for config files you need to create a new artifact using for example the github artifact file type. Point it to your ```app.yaml``` file with the configuration of your application and click Done. Then make sure to click Save. 
## **Using Text:**
Click the ```Add Config File``` button and paste your configuration in the text box.**Notes:** On Armory 2.21.2, Artifact visuals on this UI is really buggy, when clicking the Server Group to edit it, it will not show any previous Artifacts saved. You can see them for edit purposes on the JSON view of the stage.
A stage JSON looks like:
```
{
  "clusters": [
    {
      "account": "my-appengine-account",
      "application": "appenginetest",
      "branch": "master",
      "cloudProvider": "appengine",
      "configArtifacts": [
        {
          "artifact": {
            "artifactAccount": "github-for-terraform",
            "id": "ab4aac91-af2e-4fdf-b15f-e9c79cbe569a",
            "name": "app.yaml",
            "reference": "https://api.github.com/repos/armory-io/redblue/contents/app.yaml"",
            "type": "github/file",
            "version": "master"
          }
        }
      ],
      "configFiles": [],
      "fromArtifact": false,
      "gitCredentialType": "HTTPS_GITHUB_OAUTH_TOKEN",
      "interestingHealthProviderNames": [],
      "promote": true,
      "provider": "appengine",
      "region": "us-central",
      "repositoryUrl": "https://github.com/karlomendozaarmory/appengine.git"",
      "sourceType": "git",
      "stack": "nginx"
    }
  ],
  "name": "Deploy",
  "type": "deploy"
}
```