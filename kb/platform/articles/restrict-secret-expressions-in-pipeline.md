---
description: KB - Article on restricting secrets in input values
title: How to restrict harness expressions for secrets in runtime input
---

### Open Policy Agent (OPA) Policy Overview

Open Policy Agent (OPA) is an open-source, general-purpose policy engine that enables users to enforce policies across various systems and applications. OPA allows you to decouple policy from application code, providing a unified approach to manage policies in a microservices architecture. 
To know more about usage of OPA policies in harness - [Click here](https://developer.harness.io/docs/category/policy-as-code)

### Policy Language

OPA uses a high-level declarative language called Rego. Rego enables you to write policies that are easy to read and maintain, allowing for sophisticated rule definitions and queries. 

For more information on OPA and Rego, you can visit the official documentation: [Open Policy Agent Documentation](https://www.openpolicyagent.org/docs/latest/)

### Security Policy Implementation

Due to security considerations, certain users require the ability to restrict the passing of expressions that can access and display secret values during execution. To address this need, we can implement an Open Policy Agent (OPA) policy to limit the capability of utilizing secret-fetching expressions in the pipeline at runtime.

Below is an example of an OPA policy designed to prohibit the use of expressions that fetch secret values within various components of the pipeline:

```package pipeline

# Deny expressions in environment input variables within stages
deny[msg] {
  stage := input.pipeline.stages[_]
  environment_variable := stage.spec.environment.environmentInputs.variables[_]
  startswith(environment_variable.value, "<+secrets.getValue(")
  msg := sprintf("Environment input variable %v in stage %v is using a secret, which is not allowed", [environment_variable.name, stage.identifier])
}

# Deny expressions in environment input variables within parallel stages
deny[msg] {
  parallel_stage := input.pipeline.stages[_].parallel[_].stage
  environment_variable := parallel_stage.spec.environment.environmentInputs.variables[_]
  startswith(environment_variable.value, "<+secrets.getValue(")
  msg := sprintf("Environment input variable %v in parallel stage %v is using a secret, which is not allowed", [environment_variable.name, parallel_stage.identifier])
}

# Deny expressions in pipeline variables
deny[msg] {
    some i
    startswith(input.pipeline.variables[i].value, "<+secrets.getValue")
    msg := sprintf("Pipeline variable '%s' value is using a secret, which is not allowed", [input.pipeline.variables[i].name])
}

# Deny expressions in stage variables
deny[msg] {
    some i, j
    startswith(input.pipeline.stages[i].stage.variables[j].value, "<+secrets.getValue")
    msg := sprintf("Stage variable '%s' in stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].stage.variables[j].name, 
                     input.pipeline.stages[i].stage.identifier])
}

# Deny expressions in environment variables within execution steps of stages
deny[msg] {
    some i, j, k
    startswith(input.pipeline.stages[i].stage.spec.execution.steps[j].step.spec.environmentVariables[k].value, "<+secrets.getValue")
    msg := sprintf("Environment variable '%s' in step '%s' within stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].stage.spec.execution.steps[j].step.spec.environmentVariables[k].name, 
                     input.pipeline.stages[i].stage.spec.execution.steps[j].step.identifier,
                     input.pipeline.stages[i].stage.identifier])
}

# Deny expressions in environment variables within step groups in stages
deny[msg] {
    some i, j, k, l
    startswith(input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.steps[k].step.spec.environmentVariables[l].value, "<+secrets.getValue")
    msg := sprintf("Environment variable '%s' in step '%s' within stepGroup '%s' in stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.steps[k].step.spec.environmentVariables[l].name, 
                     input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.steps[k].step.identifier,
                     input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.identifier,
                     input.pipeline.stages[i].stage.identifier])
}

# Deny expressions in step group variables within stages
deny[msg] {
    some i, j, k
    startswith(input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.variables[k].value, "<+secrets.getValue")
    msg := sprintf("StepGroup variable '%s' in stepGroup '%s' within stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.variables[k].name,
                     input.pipeline.stages[i].stage.spec.execution.steps[j].stepGroup.identifier,
                     input.pipeline.stages[i].stage.identifier])
}

# Deny expressions in variables of parallel stages
deny[msg] {
    some i, j, k
    startswith(input.pipeline.stages[i].parallel[j].stage.variables[k].value, "<+secrets.getValue")
    msg := sprintf("Parallel stage variable '%s' in parallel stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].parallel[j].stage.variables[k].name, 
                     input.pipeline.stages[i].parallel[j].stage.identifier])
}

# Deny expressions in environment variables within execution steps of parallel stages
deny[msg] {
    some i, j, k, l
    startswith(input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].step.spec.environmentVariables[l].value, "<+secrets.getValue")
    msg := sprintf("Environment variable '%s' in step '%s' within parallel stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].step.spec.environmentVariables[l].name, 
                     input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].step.identifier,
                     input.pipeline.stages[i].parallel[j].stage.identifier])
}

# Deny expressions in environment variables within step groups in parallel stages
deny[msg] {
    some i, j, k, l, m
    startswith(input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.steps[l].step.spec.environmentVariables[m].value, "<+secrets.getValue")
    msg := sprintf("Environment variable '%s' in step '%s' within stepGroup '%s' in parallel stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.steps[l].step.spec.environmentVariables[m].name, 
                     input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.steps[l].step.identifier,
                     input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.identifier,
                     input.pipeline.stages[i].parallel[j].stage.identifier])
}

# Deny expressions in step group variables within parallel stages
deny[msg] {
    some i, j, k, l
    startswith(input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.variables[l].value, "<+secrets.getValue")
    msg := sprintf("StepGroup variable '%s' in stepGroup '%s' within parallel stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.variables[l].name,
                     input.pipeline.stages[i].parallel[j].stage.spec.execution.steps[k].stepGroup.identifier,
                     input.pipeline.stages[i].parallel[j].stage.identifier])
}

# Deny expressions in environment variables within execution steps of non-parallel stages
deny[msg] {
    some i, j, k
    startswith(input.pipeline.stages[i].stage.spec.execution.steps[j].step.spec.environmentVariables[k].value, "<+secrets.getValue")
    msg := sprintf("Environment variable '%s' in step '%s' within non-parallel stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].stage.spec.execution.steps[j].step.spec.environmentVariables[k].name, 
                     input.pipeline.stages[i].stage.spec.execution.steps[j].step.identifier,
                     input.pipeline.stages[i].stage.identifier])
}

# Deny expressions in step variables within stages
deny[msg] {
    some i, j, k
    startswith(input.pipeline.stages[i].stage.spec.execution.steps[j].step.spec.variables[k].value, "<+secrets.getValue")
    msg := sprintf("Step variable '%s' in step '%s' within stage '%s' is using a secret, which is not allowed", 
                    [input.pipeline.stages[i].stage.spec.execution.steps[j].step.spec.variables[k].name, 
                     input.pipeline.stages[i].stage.spec.execution.steps[j].step.identifier,
                     input.pipeline.stages[i].stage.identifier])
}
```

This policy establishes comprehensive rules to ensure that secret values are not inadvertently accessed or exposed during pipeline execution, thereby enhancing security measures across the system. 

For further details about OPA and its policy language, please refer to the: [Open Policy Agent Documentation](https://www.openpolicyagent.org/docs/latest/).
