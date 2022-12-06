---
title: Looping Strategies Overview -- Matrix, Repeat, and Parallelism
description: Looping strategies enable you to run a Stage or Step multiple times with different inputs. Looping speeds up your pipelines and makes them easier to read and maintain.
# sidebar_position: 2
helpdocs_topic_id: eh4azj73m4
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind a Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.Looping strategies enable you to run a Stage or Step multiple times with different inputs. This eliminates the need to copy the same Stage or Step for each variation you need. It also makes the Pipeline more readable, clean, and easy to maintain. Looping strategies enable use cases such as:

* You want to test a UI feature in multiple browsers and platforms. You can define a matrix that specifies the browsers and platforms to test.
* You want to build artifacts for multiple JDK versions in the same Build Stage.
* You have a Build Pipeline with 20 unit tests. To speed up execution, you want to run the tests in parallel across 4 jobs that run 5 tests each.

### Looping Strategy Types

Harness supports the following strategies.

#### Matrix

Matrix strategies are highly flexible and applicable for both CD and CI Pipelines.

First you define a matrix of configurations that you want the Stage or Step to run. Each axis has a user-defined tag — `env`, `service`, `platform`, `browser`, `jdk`, etc. — and a list of values.  You can use variables such as `<+matrix.jdk>` in a Build and Push Step or `<+matrix.env>` and `<+matrix.service>` in a Deploy Stage.

When a Pipeline runs, it creates multiple copies of the Stage or Step and runs them in parallel. You can use the`exclude` keyword to filter out some combinations. You can also use the `maxConcurrency` keyword to limit the number of parallel runs.


```
matrix:   
  service: [svc1, svc2, svc3]  
  env: [env1, env2]  
  exclude: # don’t run [svc1, env1] or [svc3, env3]  
   - service: svc1   
     env: env1   
   - service: svc3   
     env: env2   
  maxConcurrency: 2 # run up to 2 jobs in parallel based on your resources  
# example run:  
# testgroup0 -> testgroup2  
# testgroup1 -> testgroup3 
```
#### Parallelism

Parallelism strategies are useful for CI Build Stages that include a lot of tests. Suppose your Stage includes over 100 tests. You can specify the following to split your tests into 10 groups and test 5 groups at a time.


```
parallelism: 10  
  maxConcurrency: 5  
# example run:  
# testgroup0 -> testgroup5  
# testgroup1 -> testgroup6  
# testgroup2 -> testgroup7  
# testgroup3 -> testgroup8  
# testgroup4 -> testgroup9
```
#### Repeat

Repeat strategies are alternative methods for defining Matrix or Parallelism or one-dimensional Matrix strategies.

For example, you can define a Parallelism strategy as follows:


```
repeat:   
  times: 6  
  maxConcurrency: 3  
  
# this is functionally equivalent to  
# parallelism: 6  
#    maxConcurrency: 3
```
You can iterate through a list of values with the keyword `items` . You can then use the variable `<+repeat.item>` to access each value in the list.


```
repeat:   
  items: [ "18", "17", "16", "15", "14", "13", "12", "11", "10", "9" ]  
  maxConcurrency: 5
```
##### Running steps on multiple target hosts

To run steps on multiple target hosts, such as in a CD stage that performs a Deployment Template or SSH/WinRM deployment, you must use the `<+stage.output.hosts>` expression to reference all of the hosts/pods/instances:


```
repeat:  
  items: <+stage.output.hosts>
```
For more information, go to [Run a step on multiple target instances](https://docs.harness.io/article/c5mcm36cp8-run-a-script-on-multiple-target-instances).

### See also

* [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md)
* [Run a Stage or Step Multiple Times using a Matrix](run-a-stage-or-step-multiple-times-using-a-matrix.md)
* [Speed Up CI Test Pipelines Using Parallelism](https://harness.helpdocs.io/article/kce8mgionj)
* [Optimizing CI Build Times](https://harness.helpdocs.io/article/g3m7pjq79y)

