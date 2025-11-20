---
title: Spring Expression Language (SpEL) samples
---

## Introduction
Spring Expression Language (SpEL) is a powerful tool that can help customers with a variety of tasks around pipelines.  This can include passing information to subsequent stages and transforming information that was provided from previous stages.
Customers wanting to see some larger examples of how SpEL can be leveraged, can take a look at the following KB articles that provide some real-life situations where SpEL helps solve some common issues from customers:

* Passing Rosco-Packer information to subsequent stages: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010305](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010305)

* Using SpEL to add Target Groups in a Deployment Pipeline for AWS CloudFormation: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010280](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010280)
 
Below are some common usage examples of using in Evaluate Variables stage and Check Preconditions stages

## Prerequisites
Spinnaker is configured.

## Instructions
### Sample 1: Evaluate a Job stage's status
Pipeline sample: a job stage followed by an evaluate stage 
Evaluate Variables Configuration, provides the ```status``` value of the stage as the output


```${#stage('Job 4390')['status']}​```

### Sample 2: Capture Job Stage Output Value
Evaluate Variables Configuration, provides the particular output from the previous stage. Outputs the sample named ```a``` from the stage.



```${#stage("Job 4390").outputs.a}```


 

### Sample 3: Call parameter value
Evaluate Variables Configuration. Pulls the parameters called ```a1``` from the stage


```${parameters.a1}```
 
### Sample 4: Call parameter all values
Evaluate Variables Configuration. Pulls the parameter all values from the stage


```${parameters.values()}```
 
### Sample 5: Use java class 
Evaluate Variables Configuration.  Implementing ```Java class``` for evaluations. 


```${new java.lang.String(parameters.a1).contains("a")}```


```${new java.lang.String(a).indexOf(':')}```


```${new java.lang.String(a).substring(1,8)}```

### Sample 6: Use Helper functions


Evaluate Variables Configuration. Simple values output transformations.
```alphanumerical``` command returns only A-z and 0-9 values from the parameter ```a1```.

```${#alphanumerical('a1')}```


 
```Map01``` example shows how to make equivalent value maps.  ```readJson``` inputs a JSON string into a Map so that it can be processed further.  In this example, it is reading it from the ```map01``` values.
 

 
````

{"a":1,"b":2}

${#readJson(map01)}​

 
```deployedServerGroups``` command takes the name of the deploy stage and then returns the Server Group created by the stage
```deployedServerGroups[0].serverGroup``` command returns the first value in the list.


${#deployedServerGroups()}
${deployedServerGroup[0].serverGroup}

 ````

### Sample 7: Capture Webhook Stage Output Values
Pipeline sample: a webhook stage followed by an evaluate stage 
Evaluate Variables Configuration captures the webhook stage values specified.  In the example, it is the ```WebhookBefore``` stage and the output values.


```${#stage("WebhookBefore").context.webhook.body}​```

### Sample 8: Capture the Size of Map of JSON



Evaluate Variables Configuration.  Size evaluates the size of the list and returns the count on the size.


``````${alreadyDeployedBeforeRun.size()}​``````



### Sample 9: Use toString().contains()


Evaluate Variables Configuration. Checks to see if the string is contained within the value. 


```${alreadyDeployedBeforeRun.toString().contains(deployedServerGroupName)}```

 

### Sample 10: Perform Calculations
Evaluate Variables Configuration. 

````

afterDeployServerGroup.size()
sizeOfAfter-sizeOfAlready
delta > 0
````

###  
### Sample 11: Use expression in Check Preconditions stage
Pipeline sample: an evaluate stage followed by a Check Preconditions stage 
Define Check Preconditions

Edit Precondition to use Expression:

````
Expression:
errorCreated

````
 
### Reference:
[Use the Spring Expression Language (SpEL) in Spinnaker Pipelines](https://docs.armory.io/armory-enterprise/spinnaker-user-guides/expression-language/)
[Pipeline Expressions Guide](https://spinnaker.io/docs/guides/user/pipeline/expressions/)
[Pipeline Expression Reference](https://spinnaker.io/docs/reference/pipeline/expressions/)