---
title: How to Iterate Complex Structures in Pipelines as Code - Dictionary or List Sprig functions
---

## Introduction
Pipelines as Code (PaC) is a pivotal feature, enabling intricate Spinnaker pipelines' rapid and efficient provisioning.  By strategically utilizing Dinghyfiles, we can apply the same PaC code across multiple applications, thereby significantly curtailing development timelines and bolstering the efficiency of Continuous Deployment workflows.
As complexity mounts, Dinghyfiles evolve into sophisticated constructs, warranting a comprehensive understanding of their potential.  This article exemplifies the extensive capabilities of iterating over intricate data types during pipeline provisioning.

## Prerequisites
* Pipelines as Code plugin/service available in Spinnaker (Installation and configuration instructions available [here](https://docs.armory.io/plugins/pipelines-as-code/install/armory-cd/))
* ARM-CLI used for debugging purposes and validation - [ARM-CLI](https://docs.armory.io/plugins/pipelines-as-code/arm-cli/)

## Instructions
In this example, we are configuring a pipeline with two distinct stages designated for the Development (Dev) and Quality Assurance (QA) environments.
Both stages share a common definition to optimize resource utilization. This is achieved by employing a ```wait module``` for stage provisioning. To maintain code abstraction and reduce the Dinghyfile's size, module parameters are provisioned from a parameter dictionary, which is iterated using a List aggregator.

For simplicity, we will utilize a wait module.

1. The wait module is defined as follows:

```
{
  "name": "{{ var "waitname" ?: "defaultname" }}",
  "type": "wait",
  "waitTime": {{ var "waitTime" ?: 100 }}
}
```

2. As depicted above, the module expects two variables: ```waitname``` and ```waitTime```. In the absence of these variables, ```defaultname``` is assumed for ```waitname```, and ```100``` for ```waitTime```.

3. Within the main Dinghyfile, the code appears as follows:

````
{
  "application": "dictrangeexample",
  "pipelines": [
    {
      "name": "Loop Example",
      "application": "dictrangeexample",
      "stages": [
        {{ $dictdev := dict "waitTime" "11" "name" "dev" }}
        {{ $dictqa := dict "waitTime" "21" "name" "qa" }}
        {{ $myenvs := list $dictdev $dictqa }}
        {{ $count := 1 }}
        {{ range $myenvs }}
            {{ module "dinghy-modules/wait.stage.module" "waitname"  ( get . "name" ) "waitTime" ( get . "waitTime" ) }}
            {{ if ne $count (len $myenvs) }}
                {{ $count = add $count 1 }}
                ,
            {{ end }}
        {{ end }}
      ]
    }
  ]
}
````

4. We initialize two dictionary variables, one holding parameters for the Dev environment stage and the other for the QA environment stage. Subsequently, we consolidate the two dictionaries into a new list variable for iterative processing.
We also establish a counter to track the current iteration index to maintain clarity. Once the dictionaries are unified into a list, we iterate over the list structure using the 'range' construct, as demonstrated above.

5. Within the loop, we dynamically render the wait module with the dictionary parameters, utilizing the syntax ```(get . "field")```. Here, ```.``` denotes the current iterated object, and ```get``` retrieves the specified field, in this case, ```name``` and ```waitTime```.


6. In this example, we have successfully generated a pipeline with customized parameters for two stages, targeting distinct environments.

Please note that while the ARM-CLI 2.3.0 may flag the above syntax as potentially problematic, Spinnaker successfully interprets the code and provisions the pipeline.

