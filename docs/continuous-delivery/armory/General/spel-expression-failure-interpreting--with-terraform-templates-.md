---
title: SpEL expression failure interpreting dollar sign bracket with Terraform Templates 
---

## Issue
A SpEL expression failure appears while using Terraformer to serialize data from a ```Terraform Plan``` execution.  The execution creates a ```JSON object``` instead of to a ```JSON string```.The customer pipeline does the following:

* In the Terraformer Stage, a Terraform Plan outputs a binary object as a Spinnaker Artifact.
* Terraform shows passing through a ```plan file``` which causes Terraform to output a ```JSON plan file``` as an ```output``` of the stage.The outputted ```plan file``` is stored as an artifact that can be used as a ```tfvars object``` for the next Terraformer stage.
* The command ```toJson``` is used to ingest the JSON object and transform it into a string.  The string will be passed in via a ```tfvars``` object to the subsequent ```Terraform Apply Stage``` (with a static/defined by using a module that uploads the ```tfvars var``` to a bucket/object)
* Lastly, the pipeline calls ```kube``` to run a 3rd party API to download the object through the name passed to it.

The issue is that if the output has a ***SpEL escape*** in it ```${``` then it fails.

## Cause
The cause is that the ```SpEL processor``` in Spinnaker throws a ```null``` value if the SpEL expression has ```${``` in it, and is visible in Spinnaker's code [here](https://github.com/spinnaker/kork/blob/d895e2b820baadc0986dd4451e7b18f030a9a865/kork-expressions/src/main/java/com/netflix/spinnaker/kork/expressions/ExpressionsSupport.java#L198)
Also, if the users are using an older Terraform version (< 0.12), then it is also using the template provider from Terraform.The template provider exposes data sources to use templates to generate strings for other Terraform resources or outputs.

❗️ HashiCorp has deprecated the template provider since v0.12
* The announcement is [here](https://registry.terraform.io/providers/hashicorp/template/latest/docs)* Users should use the [template file](https://www.terraform.io/language/functions/templatefile?_ga=2.68579986.223689003.1655389310-554336950.1655389310) function instead

