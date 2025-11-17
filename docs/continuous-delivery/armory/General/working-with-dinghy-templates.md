---
title: Working with Dinghy Templates
---


Working with Dinghy TemplatesDinghy is powerful tool, but to enable its full potential we at Armory created a series of modules and Dinghy files for you to ramp up on Dinghy.This are hosted on Github and are public, any comments, pr with fixes, issues against it is welcomed.[https://github.com/armory/dinghyPipelines](https://github.com/armory/dinghyPipelines)[https://github.com/armory/dinghyTemplates](https://github.com/armory/dinghyTemplates)TLDR;Fork the repos.Create a Webhook for both repositories pointing to
```https:///webhooks/git/github``` (if you have a separate DNS name or port for Gate) ```https:///api/v1/webhooks/git/github ```(if you’re using a different path for Gate)
Open Whatever dinghyFiles uses a pipeline you like and change the variables necessary for your environment.On this tutorial we are going to use a dinghyFile that uses 2 modules to bake and deploy a Helm Template into K8sWe recommend usage of the Armory Dinghy CLI located at:[https://github.com/armory-io/arm](https://github.com/armory-io/arm)It's a helpful tool that will make your life easier.If you haven't read the dinghy usage documentation you can find it here.[https://docs.armory.io/docs/spinnaker/using-dinghy/](https://docs.armory.io/docs/spinnaker/using-dinghy/)Now, let's jump to the templates.[https://github.com/armory/dinghyPipelines/tree/master/bakeAndDeployManifest](https://github.com/armory/dinghyPipelines/tree/master/bakeAndDeployManifest)It uses 2 modules, let's check the first one.[https://github.com/armory/dinghyTemplates/blob/master/stage.bakeManifest.module](https://github.com/armory/dinghyTemplates/blob/master/stage.bakeManifest.module)
```
{
  "name": "{{ var "name" ?: "Bake (Manifest)" }}",  
  "type": "bakeManifest",
  "refId": "{{ var "refId" }}",
  "requisiteStageRefIds": {{ var "requisiteStageRefIds" ?: [] }},

  "templateRenderer": "{{ var "templateRenderer" ?: "HELM2" }}",
  "outputName": "{{ var "outputName" ?: "bake artifact output" }}",
  "namespace": "{{ var "namespace" }}",

  "inputArtifacts": {{ var "inputArtifacts" ?: [] }},

  "overrides": {{ var "overrides" ?: {} }},
  "evaluateOverrideExpressions": {{ var "evaluateOverrideExpressions" ?: false }},

  "expectedArtifacts": {{ var "expectedArtifacts" ?: [] }},

  {{ module "section.notifications.module" }}
  {{ module "section.executionOptions.module" }}

}
```

This module represents a Bake (manifest) stage. If we go to the Spinnaker UI we can see all the values from the module line up.The dinghyFile calls the module and set the variables we need.Initial configuration all modules share:
```
        {{ module "stage.bakeManifest.module"         // Call to the module
            "name" "bake manifest"                    // Set name for the stage
            "refId" 1                                 // Create a unique Id for the stage can be anything in [aZ0-9]
            "requisiteStageRefIds" []                 // The stages ids that go immediately before 
        // Here starts the configurations relative to this particular stage.
            "templateRenderer" "HELM2"                // We tell we are using helm charts 2
            "outputName" "bake-artifact-output"       // The name the output artifact is going to have
            "namespace" "karlo"                       // Namespace to use in the Helm template
  "inputArtifacts" [                                  // This is the helm chart in the form of an S3 artifact
                      {
                        "account": "s3artifact",
                        "artifact": null,
                        "id": "myChartFromS3"
                      }
                    ]
  "overrides" {                                       // Manual overrides for values in the helm chart.
                  "dasas": "adsa",
                  "dasdas": "sdasd"
                }

  "evaluateOverrideExpressions" false                 // This tells to ignore or not to ignore SpEl Expressions
  "expectedArtifacts" [                               // This is the output artifact. The baked manifest.
                     
                        {
                          "displayName": "friendly-cow-21",
                          "id": "helmBakedNginxId",
                          "matchArtifact": {
                            "id": "83a239d4-9c62-4a78-8cba-29db7e36da13",
                            "name": "bake-artifact-output",
                            "type": "embedded/base64"
                          },
                          "useDefaultArtifact": false,
                          "usePriorArtifact": false
                        }
                      ]
}},                                                   // Remember to close the module brakects, and since we haven't finished, 
                                                      // we add a "," in here (We need a valid JSON at the end.)           

The other module in here is similar. We set the name, ids and it's predecesor.
{{ module "stage.deployManifest.module" 
    "name" "deploy manifest"
    "refId" 2
    "requisiteStageRefIds" ["1"] 



    "account" "kubernetes"                            // K8s account name configured on spinnaker
    "cloudProvider" "kubernetes"                      // This could be removed and always have K8s (it's the default on the module)
    "applicationName" "training"                      // Your application name
    "namespaceOverride" "karlo"                       // If you are overriding the namespace of your manifest.
    "source" "artifact"                               // Either text or Artifact, in this case our source is an artifact
    "manifestArtifactId" "helmBakedNginxId"           // The id we setted up for our output artifact.
    "manifestArtifactAccount" "embedded-artifact"     // Default value since we baked the artifact

  }}
```

With this, you can grab whatever dinghyFile looks good for you copy the stages you need and go from there.

