---
title: How to use Global Variables in Dinghy Conditionals
---

## Introduction
When defining pipeline as code, Dinghy allows both:
* Conditionals, which are conditions for when something should be rendered in the pipeline* Global variables ,which are variables defined in ```dinghyfiles``` typically used to pass information to/from modules.
These functionalities can be a cornerstone in replicating pipelines across multiple applications, environments, etc. This article will detail how to use global variables inside of dinghy conditionals to achieve a more dynamic and repeatable pipeline definition.

## Prerequisites
* Must have Dinghy installed and a repository connected.* (Optional) ```arm-cli``` to test syntax and formatting

## Instructions
Let's start off with a barebones dinghyfile and define a global variable inside of our dinghyfile so that we can use it later. In this example, we've defined the variable env.

````
{
  "application": "conditionals",
  "globals": {
    "env": "dev" 
````
Next, let's add the correct syntax for the conditional
````
{
    "application": "conditionals",
    "globals": {
        "env": "dev"
    },
    "pipelines": [
      {
        "application": "conditionals",
        "name": "my-pipeline-name",
        "stages": [
              {{ if eq (var "env") "dev" }} 
````
Here we can see that once we are inside the go template conditional denoted by the double curly braces ```{{ }}```, we can define variables using a parenthesis and call them with the above syntax.
Once the conditional has been set, all we need to do now is set what we want to render in our pipeline. In this example, we are rendering a simple wait stage with the name bar.
````
{
    "application": "conditionals",
    "globals": {
        "env": "dev"
    },
    "pipelines": [
      {
        "application": "conditionals",
        "name": "my-pipeline-name",
        "stages": [
              {{ if eq (var "env") "dev" }} 
````
We can add additional conditions, if we want to, such as below
````
{
    "application": "conditionals",
    "globals": {
        "env": "dev"
    },
    "pipelines": [
      {
        "application": "conditionals",
        "name": "my-pipeline-name",
        "stages": [
                {{ if eq (var "env") "dev" }} 
````
The rendered output after pushing the example provided in step 4's ```dinghyfile``` will be as such
````
{
  "application": "conditionals",
  "globals": {
    "env": "dev"
  },
  "pipelines": [
    {
      "application": "conditionals",
      "name": "my-pipeline-name",
      "stages": [
        {
          "type": "wait",
          "name": "bar"
        }
      ]
    }
  ]
}​
````

