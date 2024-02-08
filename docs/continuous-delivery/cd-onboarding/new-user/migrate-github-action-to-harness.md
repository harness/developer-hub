---
title: Migrating from GitHub Actions to Harness Continuous Delivery
description: A step-by-step tutorial on how you can migrate from GitHub Actions to Harness CD.
sidebar_position: 9
---

Migrating from GitHub Actions to Harness Continuous Delivery (CD) can be beneficial due to Harness’s powerful deployment strategies and streamlined CD pipelines. 

Here's a step-by-step tutorial on how you can migrate from GitHub Actions to Harness CD.

## High level guidance

### Step 1: Preparation

- Review and document your current GitHub Actions workflows and configurations.
- Identify and list all the required environment variables, secrets, and deployment scripts.
- Ensure you have access to a Harness account. If not, create one. 
  
### Step 2: Harness delegate installation

- Download and install the Harness Delegate to your Kubernetes cluster or a VM within your network.
- The Delegate will connect your Harness account to your infrastructure. 
  
### Step 3: Project configuration

- In the Harness platform, navigate to **Projects** and create a new project.
- Set up your environment and infrastructure definitions in Harness. This will include specifying your Kubernetes clusters and any other necessary infrastructure.
  
### Step 4: Pipeline creation

- Under your project, create a new pipeline.
- Design your pipeline using the Harness visual editor, mirroring the steps from your GitHub Actions pipeline such as building, testing, and deploying. 
 
### Step 5: Pipeline translation

- Manually translate each step of your GitHub Actions pipeline into corresponding steps in your Harness workflow.
- Harness has native steps for common tasks, and you can use shell script steps for custom actions.

### Step 6: Secrets management

- Import or add your secrets (for example, Docker Hub credentials, SSH keys, etc.) into the Harness Secrets Manager.
- Update your workflow steps to use these secrets where necessary.

### Step 7: Trigger setup

- Set up triggers in Harness to initiate the workflow. This can be based on different conditions like new commits to your GitHub repository.
- This replaces the event triggers you had in GitHub Actions.
 
### Step 8: Testing

- Execute your new Harness workflows in a non-production environment to ensure they operate as expected.
- Debug and refine your Harness workflows as necessary.

### Step 9: Deployment

- Once satisfied, update your deployment configurations to point to your production environment.
- Run your Harness workflows to deploy to production.
 
### Step 10: Monitoring and optimization

- Set up monitoring and alerting within Harness to stay informed about the state of your deployments.
- Utilize Harness’s Continuous Verification to automatically verify deployments and rollback when necessary.

### Step  11: Documentation and training

- Document your new Harness CD setup and train your team on the new process.
- Ensure everyone is comfortable with Harness and knows how to use it for deployments.**

## Analyzing the Github Actions YAML and mapping it to Harness Pipeline YAML

This migration process will require a thorough understanding of both GitHub Actions and Harness CD. Take advantage of Harness’s documentation, support channels, and community forums to assist with the migration.

In GitHub Actions, you create pipelines using a YAML file within your repository. In Harness, configurations are typically done via the UI, but you can export them as YAML.

Here is a simple example to show the differences.

**GitHub Actions:**

Here's a simple Kubernetes deployment GitHub Actions pipeline:

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches:
      - main

env:
  KUBECONFIG_FILE: kubeconfig.yaml

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2
      
    - name: Set up Kubectl
      uses: azure/setup-kubectl@v1
      with:
        version: '1.20.0'
        
    - name: Configure kubeconfig
      run: echo "${{ secrets.KUBECONFIG }}" > $KUBECONFIG_FILE
    
    - name: Deploy to Kubernetes
      run: |
        kubectl apply -f deployment.yaml
        kubectl rollout status deployment/my-deployment
```

**Harness CD:**

In Harness, configurations are done through the UI, API, or YAML.

Below is a simplified representation of how a Kubernetes deployment might look in YAML in Harness:

```yaml
pipeline:
  name: Kubernetes Deployment
  identifier: Kubernetes_Deployment
  projectIdentifier: Platform_Engineering
  orgIdentifier: Product_Engineering
  tags: {}
  stages:
    - stage:
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: nginx
          environment:
            environmentRef: dev
            deployToAll: false
            infrastructureDefinitions:
              - identifier: devk8s
          execution:
            steps:
              - step:
                  name: Rollout Deployment
                  identifier: rolloutDeployment
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false
              - step:
                  type: K8sDelete
                  name: Clean up
                  identifier: Clean_up
                  spec:
                    deleteResources:
                      type: ReleaseName
                      spec:
                        deleteNamespace: false
                  timeout: 10m
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        name: Deploy
        identifier: Deploy
        tags: {}
```

## Comparison

1. Triggering:
   - In GitHub Actions, the workflow is triggered by a push to the main branch, specified under `on`.
   - In Harness, similarly, the trigger is defined with an `onPush` trigger.
2. Environment Setup:
   - In GitHub Actions, you need to set up kubectl and kubeconfig in the workflow.
   - In Harness, environment setup is handled outside the pipeline in the environment and infrastructure configurations.
3. Deployment:
   - In GitHub Actions, the deployment steps are defined inline using `run` and shell commands.
   - In Harness, the deployment steps are defined using built-in step types like `KubectlApply`, which abstracts away some of the lower-level details.
4. Clarity and Abstraction:
   - Harness YAML is more high-level and abstracted, aimed at simplifying the deployment process.
   - GitHub Actions YAML is more verbose and requires manual setup of environment and deployment commands.
5. Configuration Management:
   - In GitHub Actions, kubeconfig and other secrets are managed within the workflow file.
   - In Harness, secrets and configurations are managed centrally outside the pipeline, providing better organization and security.

The migration from GitHub Actions to Harness would involve translating detailed command-line operations into higher-level Harness pipeline steps and configuring environments and secrets within the Harness platform.