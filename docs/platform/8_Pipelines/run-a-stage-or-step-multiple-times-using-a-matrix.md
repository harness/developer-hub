---
title: Run a Stage or Step Multiple Times using a Matrix
description: A matrix enables you to run the same Stage or Step multiple times with different parameters.  Matrix strategies also make your Pipelines more readable, clean, and easy to maintain.
# sidebar_position: 2
helpdocs_topic_id: kay7z1bi01
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

A matrix enables you to run the same Stage or Step multiple times with different parameters. Matrix strategies eliminate the need to copy the same stage or step with different inputs for each variation. Matrix strategies also make your Pipelines more readable, clean, and easy to maintain. You can easily define matrix strategies to support workflows such as:

* A Run Step that load-tests a UI feature in 4 different browsers and 3 different platforms.
* A Build Stage that builds artifacts for 10 different JDK versions.
* A Deploy Stage that deploys 3 different services to 4 different environments.

### Before you begin

You can apply matrix strategies to both CI and CD workflows. This topic assumes that you are familiar with the following:

* [CD Pipeline Basics](https://docs.harness.io/article/cqgeblt4uh-cd-pipeline-basics) and [CI Pipeline Basics](../../continuous-integration/ci-quickstarts/ci-pipeline-basics.md)
* [Looping Strategies Overview](looping-strategies-matrix-repeat-and-parallelism.md)
* [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md)

### Important Notes

* There is no limit on the number of dimensions you can include in a matrix or the number of looping strategies you define in a Pipeline.
* You should avoid complex looping scenarios unless you clearly understand the resources that your scenario will require. See [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md).

### Add a Matrix Strategy to a Stage or Step

1. In the Pipeline Studio, go to the **Advanced** tab of the Stage or Step where you want to apply the Looping strategy.
2. Under Looping Strategies, select **Matrix**.You can also use a Loop strategy to iterate through a simple list. See [Looping Strategies Overview: Matrix, Repeat, and Parallelism](looping-strategies-matrix-repeat-and-parallelism.md).
3. Enter the YAML definition for your strategy as illustrated in the following examples.

### CI Example: Run an App in `[browser]` on `[os]`

Suppose you have a Pipeline that builds an app in Go. You want to test the app on three different platforms and three different browsers. In the Stage where you test the app, you can define a matrix like this. 


```
matrix:  
    browser: [chrome, safari, firefox ]  
    os: [ macos, windows, linux ]  
maxConcurrency: 3 
```
 

In this example, `os` and `browser` are user-defined tags. You can specify any tag in a matrix:  `jdk`, `platform`, `node-version`, and so on.

You can use the `maxConcurrency` keyword to run multiple jobs concurrently. In this case, the effective matrix has 9 combinations. With `maxConcurrency` set to 3, the Pipeline runs 3 Build Stages concurrently and load-balances the combinations between them.

### Excluding Combinations from a Matrix

You can use the `exclude` keyword to exclude certain combinations from being run. Suppose you don’t want to run the app in Safari on Windows. In this case, you can exclude this combination from the run matrix: 


```
matrix:  
    browser: [chrome, safari, firefox ]  
    os: [ macos, windows, linux ]  
    exclude:               
        - browser: safari  
          os: windows  
maxConcurrency: 3 # test the app across 3 Stages running concurrently
```
You can also exclude all combinations based on just one value. If you want to exclude all combinations with MacOS, for example, you can do the following: 


```
matrix:  
    browser: [chrome, safari, firefox ]  
    os: [ macos, windows, linux ]  
    exclude:               
      - os: macos  
maxConcurrency: 4 # test the app across 4 Stages running concurrently
```
### CD Matrix Example: Deploy `[service]` to  `[environment]`

You can easily set up a Deploy Stage to deploy multiple services to multiple environments by defining  a matrix like this:


```
matrix:  
  service:     [ svc1, svc2, svc3 ]  
  environment: [ env1, env2       ]  
  exclude:  
  - service: svc1  
    environment: env1  
maxConcurrency: 2
```
  

### Simple List Example: Build App `[items]`

You can also use the `repeat` and `items` keywords to iterate through a simple list. Suppose you want to build a Java app for multiple JDKs. Under Looping Strategy, select **For Loop** and  enter the following:


```
repeat:  
  items: [ "18", "17", "16", "15", "14", "13", "12", "11", "10", "9" ]  
maxConcurrency: 2
```
Note that a this example is simply an alternative way of defining a one-dimensional matrix with the `items` keyword as the key. You can define the same basic strategy like this:


```
matrix:  
    jdk: [ "18", "17", "16", "15", "14", "13", "12", "11", "10", "9" ]  
maxConcurrency: 2
```
### Using Matrix Variables in Your Pipeline

You can reference matrix values in your Stages and Steps using `<+matrix.`*`tag`*`>`. Here are some examples.

Given the CI example above, you can enter the following in a Run Step to output the current run:


```
echo “Testing app in <+matrix.browser> on <+matrix.os>”
```
 

Suppose you have a matrix in a Stage and another in a member Step. The Stage matrix has tags `browser` and `os`. The Step matrix has tags `browser` and `os`. You can reference both sets of tags from within the Step like this:


```
echo "stage values (parent):"  
echo "Current service for stage: <+stage.matrix.browser>"  
echo "Current os for stage: <+stage.matrix.os>"  
echo "step values (local):"  
echo "Current browser for step: <+matrix.browser>"  
echo "Current os for step: <+matrix.os>"
```
Given the CD example above, you can go to the Service tab of the Deploy Stage and specify the service using  `<+matrix.service>`.

![](./static/run-a-stage-or-step-multiple-times-using-a-matrix-40.png)
The following variables are also supported:

* `<+strategy.iteration>` — The current iteration.
* `<+strategy.iterations>` — The total number of iterations.
* `<+repeat.item>` - The value of the item when iterating through a list using the `repeat` and `items` keywords.

### YAML Pipeline Example

The following example illustrates how you can define matrix strategies in a pipeline.

matrix-pipeline-example.yml
```
    pipeline:  
    name: matrix-example-2  
    identifier: matrixexample2  
    projectIdentifier: myproject  
    orgIdentifier: myorg  
    tags: {}  
    stages:  
        - stage:  
              name: echoMatrixSettings  
              identifier: echoMatrixSettings  
              description: ""  
              type: Custom  
              spec:  
                  execution:  
                      steps:  
                          - step:  
                                type: ShellScript  
                                name: echo  
                                identifier: echo  
                                spec:  
                                    shell: Bash  
                                    onDelegate: true  
                                    source:  
                                        type: Inline  
                                        spec:  
                                            script: |-  
                                                echo "iteration index = <+strategy.iteration>"  
                                                echo "total iterations = <+strategy.iterations>"  
                                                echo "stage values (parent):"  
                                                echo "Current version for stage: <+stage.matrix.service>"  
                                                echo "Current environment for stage: <+stage.matrix.environment>"  
                                                echo "step values (local):"  
                                                echo "Current item (version): <+repeat.item>"  
                                    environmentVariables: []  
                                    outputVariables: []  
                                    executionTarget: {}  
                                timeout: 10m  
                                failureStrategies: []  
                                strategy:  
                                    repeat:  
                                        items:  
                                            - "18"  
                                            - "17"  
                                            - "16"  
                                            - "15"  
                                            - "14"  
                                            - "13"  
                                            - "12"  
                                            - "11"  
                                            - "10"  
                                            - "9"  
                                    maxConcurrency: 2  
              tags: {}  
              strategy:  
                  matrix:  
                      service:  
                          - svc1  
                          - svc2  
                          - svc3  
                      environment:  
                          - env1  
                          - env2  
                      exclude:  
                          - service: svc1  
                            environment: env1  
                  maxConcurrency: 2
```
### See also

* [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md)
* [Looping Strategies Overview: Matrix, Repeat, and Parallelism](looping-strategies-matrix-repeat-and-parallelism.md)
* [Speed Up CI Test Pipelines Using Parallelism](speed-up-ci-test-pipelines-using-parallelism.md)

