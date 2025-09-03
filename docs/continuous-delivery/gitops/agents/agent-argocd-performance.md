---
title: Performance Considerations
description: Learn how to improve perfomance with your Argo deployments
sidebar_position: 70
redirect_from:
  - /docs/continuous-delivery/gitops/use-gitops/agent-argocd-performance
---

Argo CD is a powerful tool for managing continuous deployments in Kubernetes environments. However, as deployments scale, users may encounter performance challenges, particularly with the **Application Controller** and **Repository Server** components. Understanding these common issues is crucial for maintaining optimal performance. 
Scaling issues can arise due to high resource consumption, slow application refresh rates, and challenges with monorepos. Many issues have been resolved with newer version of ArgoCD so it is recommended to keep the ArgoCD version up to date.
Nature of issues is totally dependent on the environment and the use case and it not possible to give general solution for all the issues. However by monitoring the ArgoCD components and the environment, and going below common issues and solutions can be helpful.

**Application Controller Performance Issues:**

1. **High CPU and Memory Usage:**
    - **Cause:** Managing a kubernetes cluster with large number of objects can lead to increased resource consumption. For instance, in environments with numerous applications, the Application Controller may experience elevated CPU usage, leading to performance degradation. 
    - **Solution:** Scaling up the Application Controller by increasing the number of replicas can help distribute the workload and improve performance. [Argo CD](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability). Each application pod can be dedicated to one cluster, that is called sharding. ([Kostis Argo CD](https://kostis-argo-cd.readthedocs.io/en/first-page/operations/scaling/#common-scaling-problems))
    - **Cause:** Having applications with self-heal turned on can cause high CPU usage if the application always have differences with the desired state.
    - **Solution:** 
      - Use exponentinal backoff for the application sync by editing 
        - `kubectl edit configmap argocd-cmd-params-cm -n argocd`
          ```yaml
          data:
            controller.self.heal.timeout.seconds: "2"          # Initial delay between self-heal attempts (in seconds)
            controller.self.heal.backoff.factor: "3"           # Multiplier for exponential backoff
            controller.self.heal.backoff.cap.seconds: "300"    # Maximum delay cap (in seconds)
          ```
      - Use diff customization to ignore diffs on certain fields https://argo-cd.readthedocs.io/en/latest/user-guide/diffing/


2. **Slow Application Sync Time:**
    - **Cause:** Large number of applications or resources can slow down the application sync process, leading to delays in reflecting changes.
    - **Solution:** 
      - Adjusting the `--status-processors` and `--operation-processors` settings allows for more concurrent processing, improving refresh rates. For example, increasing these values can enhance performance in large-scale deployments. [Argo CD](https://kostis-argo-cd.readthedocs.io/en/first-page/operations/scaling/#argocd-application-controller)
      - Enabling the `----kubectl-parallelism-limit` flag can also speed up the application sync process by allowing more concurrent operations.
      - Increase the `timeout.reconciliation` value to allow more time for reconciliation when having large number of applications. 
      - Change `ARGOCD_K8S_CLIENT_QPS` and `ARGOCD_K8S_CLIENT_BURST` to increase the k8s client qps and burst qps, ( default values are 50 and 100 respectively). When changing these values make sure to monitor the k8s api server to make sure it can handle the increased load.
      - ```yaml
        apiVersion: apps/v1
        kind: StatefulSet
        metadata:
          name: argocd-application-controller
        spec:
          template:
            spec:
              containers:
                - name: application-controller
                  env:
                    # Setting for changing the client qps
                    - name: ARGOCD_K8S_CLIENT_QPS
                      value: "50"
                    # Setting for changing the burst qps
                    - name: ARGOCD_K8S_CLIENT_BURST
                      value: "100"
        ```


**Repository Server Performance Issues:**

1. **Out-of-Memory (OOM) Errors:**
    - **Cause:** The Repository Server is responsible for cloning repositories and generating manifests. High concurrency during these operations can lead to excessive memory consumption, causing OOM errors.
    - **Solution:** Configuring the `--parallelismlimit` flag controls the number of concurrent manifest generations, preventing resource overuse. ([Argo CD](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability))

2. **Monorepo Challenges:**
    - **Cause:** 
    - **Solution:** Enabling concurrent processing by creating a `.argocd-allow-concurrency` file in the application directory allows for parallel manifest generation, mitigating delays. ([Argo CD](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability))

**HPA and Monitoring:**  
By default for argocd-repo-server and gitops-agent HPA is enabled. 

- ```yaml
   spec:
     maxReplicas: 5
     metrics:
     - resource:
         name: memory
         target:
           averageUtilization: 50
           type: Utilization
       type: Resource
     - resource:
         name: cpu
         target:
           averageUtilization: 50
           type: Utilization
       type: Resource
     minReplicas: 1
   ```
