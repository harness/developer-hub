---
title: Best Practices for Looping Strategies
description: Review this topic before you implement a Matrix and Parallelism strategy in your pipeline.
# sidebar_position: 2
helpdocs_topic_id: q7i0saqgw4
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness recommends the following best practices for implementing Matrix and Parallelism strategies in your Pipelines.

### Complex Looping Scenarios Require Careful Planning

Harness supports complex looping strategies such as:

* A Matrix strategy with multiple dimensions.
* Multiple looping strategies in the same Stage. For example, you can define a Stage Matrix with three dimensions and then a Step Matrix with four dimensions within the same Stage.

Before you implement a complex looping scenario, you need to consider carefully the resource consumption of your Pipeline containers and the overall capacity of your build/deploy infrastructure. Too many Stages or Steps running concurrently can cause the Pipeline to fail, to time out, to consume too many resources, or to run successfully but incorrectly.  
  
A good general rule to follow is: **Your looping scenario is too complex if you cannot visualize how it will run and calculate the memory and CPU required for the Pipeline to run successfully.**

### How Pipelines Reserve Resources

When a Pipeline requests resources for a Step, it calculates the *maximum CPU and memory required at any point in the Stage*. Consider the following scenario:

* Your Build Stage has three Steps: the first builds an artifact for a web app; the second runs the artifact in a browser to confirm that it runs, the third pushes it to a registry.
* Each Step consumes up to 500M (memory) and 400m (CPU). Because the Steps run serially, not concurrently, the Pipeline reserves 500Mi memory and 400m CPU for the entire Stage.![](./static/best-practices-for-looping-strategies-06.png)
* Suppose you want to test the app on both Chrome and Firefox. You create a simple Matrix strategy for the Step:
```
matrix:  
  browser: [ chrome, firefox ]  
  maxConcurrency: 2 
```
* The Pipeline creates two copies of the Run Stage and runs them concurrently. This doubles the resource consumption for the overall Stage. When the Pipeline runs, it reserves double the resources (1000M memory, 800m CPU) for the overall Stage.![](./static/best-practices-for-looping-strategies-07.png)
* So far, so good. The Pipeline executes with no problem. But suppose you add another dimension to your matrix and increase the `maxConcurrency`to run all the Stages at once?
```
matrix:  
  os:      [ macos,  linux,    android ]  
  browser: [ chrome, firefox,  opera   ]  
  maxConcurrency: 9 
```
* In this case, the Stage requires 9 times the original resources to run. The Pipeline fails because the build infrastructure cannot reserve the resources to run all these Stages concurrently.

### How to Determine the Right `maxConcurrency`

Always consider the value you want to specify for the `maxConcurrency`. Your goal is to define a `maxConcurrency` that speeds up your Pipeline builds while staying within the capacity limits of your build infrastructure.

Harness recommends that you determine the `maxConcurrency` for a specific Stage or Step using an iterative workflow:

1. Start with a low `maxConcurrency` value of 2 or 3.
2. Run the Pipeline and monitor the resource consumption for the overall Pipeline.
3. Gradually increase the `maxConcurrency` based on each successive run until you reach a "happy medium" between your run times and resource consumption.

### How to use variables representing lists/arrays to loop and repeat for each item

You can use all Java String class built-in methods on Harness variable expressions.

With that in mind, you can define a Harness string variable containing a comma-separated list of items represented by other strings. You can even get this values list from inputs at runtime.  

For example, this Pipeline variable that contains a list of Jira Tickets:

```
# Variable: <+pipeline.variables.jiraTickets>
HD-29193,HD-29194,HD-29195

# YAML representation
pipeline:
  identifier: RepeatJiraTickets
  variables:
    - name: jiraTickets
      type: String
      value: HD-29193,HD-29194,HD-29195 // We have added the list of tickets to be comma separated
```

By using the `split()` method, you can split that variable string into an array of substrings:

```
<+pipeline.variables.jiraTickets.split(',')>
```

You can use this expression in your **repeat** Looping Strategy. For example:

```
repeat:
  items: <+stage.variables.jiraTickets.split(',')>
  maxConcurrency: 1
```

Finally, you refer to each item in the loop with the `<+repeat.item>` expression.

![Repeat with split()](./static/best-practices-for-looping-strategies-08.png)


**Extra:** You can also dynamically create an axis for your Matrix.

```
matrix:
  jira: <+stage.variables.jiraTickets.split(',')>
```

And use the `<+matrix.jira>` expression instead.


### See also

* [Optimizing CI Build Times](/docs/continuous-integration/troubleshoot/optimizing-ci-build-times/)
* [How to Run a Run a Stage or Step Multiple Times using a Matrix](run-a-stage-or-step-multiple-times-using-a-matrix.md)
* [Looping Strategies Overview: Matrix, Repeat, and Parallelism](looping-strategies-matrix-repeat-and-parallelism.md)
* [Speed Up CI Test Pipelines Using Parallelism](/docs/platform/Pipelines/speed-up-ci-test-pipelines-using-parallelism)

