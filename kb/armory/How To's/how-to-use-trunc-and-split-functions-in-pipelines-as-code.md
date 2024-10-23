---
title: How to use Trunc and Split functions in Pipelines as Code
---

## Introduction
Using Pipelines as Code (PaC) is an important feature that helps create Spinnaker pipelines quickly and efficiently. By using ```Dinghyfiles``` strategically, Spinnaker users can use the same PaC code for different applications, saving a lot of development time and making Continuous Deployment workflows run smoother.

As pipelines get more complex, ```Dinghyfiles``` become more advanced, so advanced functions can help create consistency across different pipelines and their stages. This article shows users how to use ***Trunc and Split*** functions to set up pipelines in a detailed and effective way.

## Prerequisites
* Pipelines as Code plugin/service available in Spinnaker (Installation and configuration instructions available [here](https://docs.armory.io/plugins/pipelines-as-code/install/armory-cd/))* ARM-CLI used for debugging purposes and validation - [ARM-CLI](https://docs.armory.io/plugins/pipelines-as-code/arm-cli/)

## Instructions
In this example, we want to provision three different wait stages based on some string manipulation using ```trunc``` and ```split``` commands
```
{
  "application": "splitexample",
  "pipelines": [
    {   
      "application": "splitexample",
      "name": "my-pipeline-name",
       "stages": [
        {{ $count := 0 }}
        {{ $a := trunc 11 "foo$bar$baz  "}}
        {{ $b := split "$" $a }}
        {{ range $b }}
          {{
            module "dinghy-modules/wait.stage.module"
            "waitname" .
          }}
          {{ $count = add $count 1 }},
        {{ end }}
        {{
        module "dinghy-modules/wait.stage.module"
        "waitname" "Final Wait"
        }}
  ]
}]}
```

Starting from the ```"foo$bar$baz  "``` string, users need to truncate the whitespace.  This can be accomplished by using the ```trunc``` function as seen above.  After applying the function, the data will be appended to the ```"foo$bar$baz"``` string.  This string can be remapped into a list by using the ```split``` function with the ```"$"``` operator.
* Trunc accepts a numeric value as a parameter.  The value denotes the number of characters to be trimmed either from the start of the string (using positive integers) or from the end of the string (using negative integers).* Split splits a string into substrings based on a delimiter defined as a positional parameter.
The final pipeline JSON definition would look like this after all the logic has been applied: 
```
{
  "application": "splitexample",
  "pipelines": [
    {   
      "application": "splitexample",
      "name": "my-pipeline-name",
       "stages": [
        
        
        
        
          {
  "name": "foo",
  "type": "wait",
  "waitTime": 100
}
          ,
        
          {
  "name": "bar",
  "type": "wait",
  "waitTime": 100
}
          ,
        
          {
  "name": "ba",
  "type": "wait",
  "waitTime": 100
}
          ,
        
        {
  "name": "Final Wait",
  "type": "wait",
  "waitTime": 100
}
  ]
}]}
```
 
For more information on Sprig functions, please visit: [https://masterminds.github.io/sprig/strings.html](https://masterminds.github.io/sprig/strings.html)

