---
title: Kubernetes Patch step
description: Make changes to specific workloads in a Kubernetes cluster without affecting other fields.
sidebar_position: 7
---

This topic describes the settings for the Kubernetes Patch step.

The Patch step allows you to make changes to specific resources or workloads in a Kubernetes cluster without affecting other fields. This step prevents downtime by making specific changes to the deployed service YAML. 

Here're some of the advantages of using a Patch step in your Kubernetes deployments:  

- Efficiency: Instead of sending the entire resource specification for an update, you can send the specific fields to be modified. This reduces the amount of data transferred over the network and improves the efficiency of resource updates, especially for large resources.
- Granular control: The Patch command allows you to make precise changes to the Kubernetes resources by specifying which fields you want to modify. This level of granularity gives you more control over the update process and helps prevent unintended changes to other fields of the resource.
- Atomic updates: Kubernetes applies patches atomically, ensuring that either all changes are applied successfully or none of them are. This atomicity helps maintain consistency and integrity of resources in the cluster, especially when making multiple modifications simultaneously.
- Concurrency: Kubernetes applies patches atomically, ensuring that either all changes are applied successfully or none of them are. This atomicity helps maintain the consistency and integrity of resources in the cluster, especially when making multiple modifications simultaneously.
- Compatibility: The patch command is compatible with various Kubernetes client libraries and API versions, allowing you to perform updates programmatically from different environments and programming languages.

## Prerequisites

- This feature requires Harness Delegate version 24.04.82804 or later.

## Limitations

- You will not be able to roll back your deployments with patched resources. Rollback will only roll back your original deployment. 

## Adding a Patch step

In your Kubernetes deployment pipeline's **Execution** tab, decide where you want to apply the patch and select **Add Step** > **Patch** to add a Patch step. 

## Step parameters

### Name

Name of the step.

### Workload

Specify the resource or workload to which you want to make changes in the format, `[namespace/]Kind/Name`. 

### Merge Strategy Type

The following merge strategy types are supported for the Patch step.

- **Strategic**
  This strategy allows you to apply changes to specific fields in a resource while keeping the existing values for other fields intact. You can use this option to replace a particular value in your deployment or service YAML. 

  Let's look at the following deployment YAML: 

    ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: nginx-deployment
    labels:
      app: nginx
  spec:
    replicas: 2
    selector:
      matchLabels:
        app: nginx
    template:
      metadata:
        labels:
          app: nginx
      spec:
        containers:
        - name: nginx
          image: nginx:latest
          ports:
          - containerPort: 80
  ```

  Use the following command to apply a patch, `nginx_patch.yaml` to the deployment YAML: 

  `kubectl patch deployment my-deployment --type strategic --patch-file nginx_patch.yaml`   

  Here's the `nginx_patch.yaml` file:  

  ```yaml
  spec:
    template:
      spec:
        containers:
        - name: nginx
          image: nginx:1.23.0-alpine
  ```
  
  Here's the output deployment YAML:   
  
  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: nginx-deployment
    labels:
      app: nginx
  spec:
    replicas: 2
    selector:
      matchLabels:
        app: nginx
    template:
      metadata:
        labels:
          app: nginx
      spec:
        containers:
        - name: nginx
          image: nginx:1.23.0-alpine
          ports:
          - containerPort: 80
  ```
  - **Merge**
    The merge patch is a light weight patch format that allows you to specify the changes you want to make to a resource. It replaces the entire resource with a JSON patch you provide.

    Assume, you want to add Redis to your deployment. Here's a file, `nginx_merge_patch.yaml` with a Redis container in the containers list: 
    
    ```yaml
    spec:
      template:
        spec:
          containers:
          - name: redis
            image: redis:latest
            ports:
            - containerPort: 6379
    ```
    
    Using the command, `kubectl patch deployment my-deployment --type merge --patch-file nginx_merge_patch.yaml`, the JSON merge option removes the existing configuration from the container list.

    
    ```
    kubectl patch deployment nginx-deployment --type merge --patch-file nginx_merge_patch.yaml
    deployment.apps/nginx-deployment patched
    % kubectl get pods -owide
    NAME                                READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
    nginx-deployment-7c99566855-4t5g7   1/1     Running   0          12s   172.17.0.5   minikube   <none>           <none>
    nginx-deployment-7c99566855-f2s2c   1/1     Running   0          15s   172.17.0.6   minikube   <none>           <none>
    % kubectl get pods -o jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}' |grep nginx
    nginx-deployment-7c99566855-4t5g7:    redis:latest,
    nginx-deployment-7c99566855-f2s2c:    redis:latest,
    ```
    
    Now, if you reapply the `nginx_patch.yaml` mentioned in the **Strategic** option, you will get nginx containers with Redis:  

    
    ```
    kubectl patch deployment nginx-deployment --patch-file nginx_patch.yaml
    deployment.apps/nginx-deployment patched

    kubectl get pods -owide
    NAME                                READY   STATUS        RESTARTS   AGE     IP           NODE       NOMINATED NODE   READINESS GATES
    nginx-deployment-86c4594d8-ht4zv    2/2     Running       0          2s      172.17.0.6   minikube   <none>           <none>
    nginx-deployment-86c4594d8-jmlnx    2/2     Running       0          4s      172.17.0.7   minikube   <none>           <none>

    kubectl get pods --all-namespaces -o jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}' |grep nginx
    nginx-deployment-86c4594d8-ht4zv: nginx:1.23.0-alpine, redis:latest,
    nginx-deployment-86c4594d8-jmlnx: nginx:1.23.0-alpine, redis:latest,
    % kubectl get pod nginx-deployment-86c4594d8-jmlnx -o yaml |less
    spec:
      containers:
      - image: nginx:1.23.0-alpine
        imagePullPolicy: IfNotPresent
        name: nginx
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-4flnp
          readOnly: true
     - image: redis:latest
       imagePullPolicy: Always
       name: redis
       ports:
       - containerPort: 6379
         protocol: TCP
    ```

    - **JSON**
      You can make changes to JSON files including adding, updating, amd deleting the files using this option. Instead of supplying `kubectl` with configuration information, you can provide a list of directives if you're using this option.
      
      In this example, let’s roll the nginx containers back to the latest image. This code tells `kubectl` to find the node at `/spec/template/spec/containers/0/image` and replace its value with the new image tag. That JSON path will take us to the image node in the first item in the containers list.

      
      ```json
      - op: replace
        path: "/spec/template/spec/containers/0/image"
        value: nginx:latest
      ```

      Here's the sample output after applying the JSON patch:  

      ```
      kubectl patch deployment nginx-deployment --type JSON --patch-file nginx_json_patch.yaml
      deployment.apps/nginx-deployment patched

      kubectl get pods -o jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}' |grep nginx
      nginx-deployment-9b7747f45-4svqm:    nginx:latest, redis:latest,
      nginx-deployment-9b7747f45-hqjgh:    nginx:latest, redis:latest,
      ```
### Select Source

Specify the source from where you want to access the patch file. Currently, we support Harness store, Git, and Inline sources. 

### Record Change Cause

Select this option to record the patched operation including the patched content on the patched resource as the `kubernetes.io/change-cause` annotation. 

### Skip Steady State Check

By default, Harness checks to see if a deployed workload has reached steady state. If you select this option, Harness will not check that the workload has reached steady state.      

## Kubernetes patch YAML      

Here's a sample Patch step YAML:  

```yaml
              - step:
                  type: K8sPatch
                  name: K8sPatch_1
                  identifier: K8sPatch_1
                  spec:
                    workload: tarun-ng/Deployment/<+name_of_resource>
                    source:
                      type: Inline | Harness Store | GIT
                      spec:
                        content: dsadas (considering Inline type)
                    recordChangeCause: true
                    mergeStrategyType: strategic | json | merge
                    skipSteadyStateCheck: false
                    commandFlags: 
                      - commandType: Patch
                        flag: sample
                  failureStrategies:[]
                  strategy:[]
                  timeout: 10m
```
## Video

Here's a video demo of how to add a Patch step:  

<!-- Video:
https://www.loom.com/share/492afdbb9cb8484980b6d1617830a399?sid=90c41fc9-a556-44e0-82e4-59206bbf493e-->
<DocVideo src="https://www.loom.com/share/97465b4bcbe04f5dbc5f608279ef986f" />

## Advanced Settings

See the following:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Command Flags](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/k8s-command-flags/)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

## See also

- [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes)
