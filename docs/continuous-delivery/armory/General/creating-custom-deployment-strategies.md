---
title: Creating Custom Deployment Strategies
---

## Introduction
Custom deployment strategies allow users to create their own set of strategies with regards to deploying their systems. By creating a strategy, it can be re used for other deployments when necessary.  
Deployment strategies can be thought of as a set of "mini-stages" that are run to execute the strategy

## Prerequisites
N/A

## Instructions
The principle behind a deployment strategy is to create series of "mini-stages" to perform a particular roll out. In an example such as a **blue/green** or **red/black strategy**, it would potentially involve
* standing up a new AWS Auto Scaling Group* waiting for the ASG to become healthy* update the target groups/load balancer and other functions* potentially scale down the old ASG* potentially delete the old ASG
In essence, each of these individual stages are available in Spinnaker, so the deployment strategy would be to implement and orchestrate every one of these stages.To create the strategy, in the Pipelines section of Spinnaker, choose **Strategy** instead of **Pipeline** from the dropdown list when creating a new pipeline. 

From there, lay out the stages of the strategy, including a needed **deploy** stage and then save.  The strategy will then be available for use

