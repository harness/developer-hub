---
title: Basic Configuration
description: Self-Managed Enterprise Edition Installation streamlines the setup of key components like resource profiles, load balancing, licensing, feature flags, autoscaling, and dashboards for enhanced performance and scalability.
sidebar_label: Basic Configuration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition brings a robust and flexible software delivery platform to organizations seeking control over their deployment infrastructure. This topic describes Resource profiles, Module Enablement, outlining the basic configuration, key components and best practices for implementing Harness Self-Managed Enterprise Edition.

## Resource Profiles  

Harness Self-Managed Enterprise Edition offers four environment profiles based on team size and execution capacity:  

| **Environment** | **Users**  | **Parallel Executions (CI)** | **Parallel Executions (CD)** |
|-----------------|------------|------------------------------|------------------------------|
| **Demo**        | Up to 10   | 2                            | 2                            |
| **Small**       | Up to 200  | 50                           | 50                           |
| **Medium**      | Up to 1000 | 250                          | 250                          |
| **Large**       | Up to 3000 | 500                          | 500                          |

## Module Enablement

To enable a module in Harness Self-Managed Enterprise Edition, you'll typically need to edit the `override.yaml` file. Override files are available in the Harness [Helm chart repo](https://github.com/harness/helm-charts/blob/main/src/harness/).

- Demo: `override-demo.yaml`
- Small: `override-small.yaml`
- Medium: `override-medium.yaml`
- Large: `override-large.yaml`

### Installation and Upgrade commands

You can use the following commands to upgrade/install via Helm for each profile. For complete Helm installation instructions, go to [Install using Helm](/docs/self-managed-enterprise-edition/install/install-using-helm).

As shown below, you can replace the file name `<OVERRIDE-FILE>` placeholder with one of the override files listed above.

<Tabs>
    <TabItem value="custom-install" label="Install">

    ```
    helm install my-release harness/harness-prod -n <namespace> -f your-override.yaml -f <OVERRIDE-FILE>.yaml
    ```
    </TabItem>
    <TabItem value="custom-upgrade" label="Upgrade">

    ```
    helm upgrade my-release harness/harness-prod -n <namespace> -f your-override -f <OVERRIDE-FILE>.yaml
    ```
    </TabItem>
    </Tabs>

    **For Example**, Let's use the **`Demo`** override file.

    <Tabs>
    <TabItem value="Demo install" label="Install">

    ```
    helm install my-release harness/harness-prod -n <namespace> -f your-override.yaml -f override-demo.yaml
    ```
    </TabItem>
    <TabItem value="Demo Upgrade" label="Upgrade">

    ```
    helm upgrade my-release harness/harness-prod -n <namespace> -f your-override -f override-demo.yaml
    ```
    </TabItem>
</Tabs>

## Load Balancer

### Amazon Elastic Kubernetes Service (EKS)

1. Create a namespace for your deployment.

   ```
   kubectl create namespace harness
   ```

2. Retrieve and extract the latest [Harness Helm charts](https://github.com/harness/helm-charts/releases). The harness charts will look like `harness-<version_number>`.

3. Open the `harness/values.yaml` file in any editor, and modify the following values.

   | Key                      | Value  |
   | ------------------------ | ------ |
   | `global.ingress.enabled` | `true` |
   | `global.loadbalancerURL` | `""`   |
   | `global.ingress.hosts`   | `""`   |

4. Install the Helm chart.

   ```
   helm install harness harness/ -f override-demo.yaml -n harness
   ```

   AWS EKS has the ability to create and attach Elastic Load Balancers as a Kubernetes Resource. For more information, go to [Application load balancing on Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) in the EKS documentation. For this tutorial, we'll take advantage of this functionality by creating our Load Balancer first manually.

5. Save the following reference `loadbalancer.yaml` file and apply it into your cluster.

   ```yaml
     ---
     # Source: networking/templates/nginx/controller.yaml
     apiVersion: v1
     kind: ServiceAccount
     metadata:
       name: harness-serviceaccount
       namespace: harness
     ---
     # Source: networking/templates/nginx/controller.yaml
     apiVersion: v1
     kind: ConfigMap
     metadata:
       name: harness-ingress-controller
       namespace: harness
       labels:
     data:
       proxy-body-size: 1024m
       proxy-read-timeout: "600"
       proxy-send-timeout: "600"
     ---
     # Source: networking/templates/nginx/controller.yaml
     apiVersion: rbac.authorization.k8s.io/v1
     kind: Role
     metadata:
       name: harness-role
       namespace: harness
     rules:
     - apiGroups:
       - ""
       resources:
       - namespaces
       verbs:
       - get
     - apiGroups:
       - ""
       resources:
       - configmaps
       - pods
       - secrets
       - endpoints
       verbs:
       - update
       - get
       - list
       - watch
     - apiGroups:
       - ""
       resources:
       - services
       verbs:
       - get
       - list
       - update
       - watch
     - apiGroups:
       - extensions
       - networking.k8s.io
       resources:
       - ingresses
      verbs:
       - get
       - list
       - watch
     - apiGroups:
       - extensions
       - networking.k8s.io
       resources:
       - ingresses/status
       verbs:
       - update
     - apiGroups:
       - ""
       resourceNames:
       - ingress-controller-leader-harness
       resources:
       - configmaps
       verbs:
       - get
       - update
     - apiGroups:
       - ""
       resources:
       - configmaps
       verbs:
       - create
     - apiGroups:
       - ""
       resources:
       - endpoints
       verbs:
       - create
       - get
       - update
     - apiGroups:
       - ""
       resources:
       - events
       verbs:
       - create
       - patch
     ---
     # Source: networking/templates/nginx/controller.yaml
     apiVersion: rbac.authorization.k8s.io/v1
     kind: RoleBinding
     metadata:
       name: harness-role-hsa-binding
       namespace: harness
     roleRef:
       apiGroup: rbac.authorization.k8s.io
       kind: Role
       name: harness-role
     subjects:
       - kind: ServiceAccount
         name: harness-serviceaccount
         namespace: harness
     ---
     # Source: networking/templates/nginx/controller.yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: harness-ingress-controller
       namespace: harness
       labels:
       annotations:
     spec:
       selector:
         app: harness-ingress-controller
       type: 'LoadBalancer'
       # externalTrafficPolicy: 'Cluster'
       ports:
       - name: health
         protocol: TCP
         port: 10254
         targetPort: 10254
       - name: http
         port: 80
         protocol: TCP
         targetPort: http
       - name: https
         port: 443
         protocol: TCP
         targetPort: https
     ---
     # Source: networking/templates/nginx/default-backend.yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: default-backend
       namespace: harness
       labels:
     spec:
       ports:
       - name: http
         port: 80
         protocol: TCP
         targetPort: 8080
       selector:
         app: default-backend
       type: ClusterIP
     ---
     # Source: networking/templates/nginx/controller.yaml
     kind: Deployment
     apiVersion: apps/v1
     metadata:
       name: harness-ingress-controller
       namespace: harness
       labels:
     spec:
       replicas: 1
       selector:
         matchLabels:
           app: harness-ingress-controller
       progressDeadlineSeconds: 300
       strategy:
         rollingUpdate:
           maxSurge: 1
           maxUnavailable: 1
         type: RollingUpdate
       template:
         metadata:
           labels:
             app: "harness-ingress-controller"
         spec:
           affinity:
             podAntiAffinity:
               requiredDuringSchedulingIgnoredDuringExecution:
                 - labelSelector:
                     matchLabels:
                       app: "harness-ingress-controller"
                   topologyKey: kubernetes.io/hostname
           serviceAccountName: harness-serviceaccount
           terminationGracePeriodSeconds: 60
           securityContext:
             runAsUser: 101
           containers:
           - image: us.gcr.io/k8s-artifacts-prod/ingress-nginx/controller:v1.0.0-alpha.2
             name: nginx-ingress-controller
             imagePullPolicy: IfNotPresent
             envFrom:
             - configMapRef:
                 name: harness-ingress-controller
             resources:
               limits:
                 memory: 512Mi
               requests:
                 cpu: "0.5"
                 memory: 512Mi
             ports:
               - name: http
                 containerPort: 8080
                 protocol: TCP
               - name: https
                 containerPort: 8443
                 protocol: TCP
             livenessProbe:
               httpGet:
                 path: /healthz
                 port: 10254
                 scheme: HTTP
               initialDelaySeconds: 30
               timeoutSeconds: 5
             securityContext:
               allowPrivilegeEscalation: false
             env:
             - name: POD_NAME
               valueFrom:
                 fieldRef:
                   apiVersion: v1
                   fieldPath: metadata.name
             - name: POD_NAMESPACE
               valueFrom:
                 fieldRef:
                   apiVersion: v1
                   fieldPath: metadata.namespace
             args:
             - /nginx-ingress-controller
             - --ingress-class=harness
             - --default-backend-service=$(POD_NAMESPACE)/default-backend
             - --election-id=ingress-controller-leader
             - --watch-namespace=$(POD_NAMESPACE)
             - --update-status=true
             - --configmap=$(POD_NAMESPACE)/harness-ingress-controller
             - --http-port=8080
             - --https-port=8443
             - --default-ssl-certificate=$(POD_NAMESPACE)/harness-cert
             - --publish-service=$(POD_NAMESPACE)/harness-ingress-controller
     ---
     # Source: networking/templates/nginx/default-backend.yaml
     kind: Deployment
     apiVersion: apps/v1
     metadata:
       name: default-backend
       namespace: harness
       labels:
     spec:
       replicas: 1
       selector:
         matchLabels:
           app: default-backend
       template:
         metadata:
           labels:
             app: default-backend
         spec:
           serviceAccountName: harness-serviceaccount
           terminationGracePeriodSeconds: 60
           containers:
           - name: default-http-backend
             image: registry.k8s.io/defaultbackend-amd64:1.5
             imagePullPolicy: IfNotPresent
             livenessProbe:
               httpGet:
                 path: /healthz
                 port: 8080
                 scheme: HTTP
               initialDelaySeconds: 30
               timeoutSeconds: 5
             resources:
               limits:
                 memory: 20Mi
               requests:
                 cpu: 10m
                 memory: 20Mi
             securityContext:
               runAsUser: 65534
             ports:
             - name: http
               containerPort: 8080
               protocol: TCP
   ```

   ```
   kubectl create -f loadbalancer.yaml -n harness
   ```

6. Get the ELB URL.

   ```
   kubectl get service -n harness
   ```

7. Make a note of the `EXTERNAL-IP` for the `harness-ingress-controller`. It should look like `<string>.us-east-2.elb.amazonaws.com`.

   ```
    NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)                                      AGE
    default-backend              ClusterIP      10.100.54.229    <none>                                                                    80/TCP                                       38s
    harness-ingress-controller   LoadBalancer   10.100.130.107   af5b132b743fb4318947b24581119f1b-1454307465.us-east-2.elb.amazonaws.com   10254:32709/TCP,80:32662/TCP,443:32419/TCP   38s
   ```

8. Open the `harness/values.yaml` file in any editor and modify the following values.

   | Key                      | Value                          |
   | ------------------------ | ------------------------------ |
   | `global.ingress.enabled` | `true`                         |
   | `global.loadbalancerURL` | `"https://<YOUR_ELB_ADDRESS>"` |
   | `global.ingress.hosts`   | `"<YOUR_ELB_ADDRESS>"`         |

9. Upgrade the Helm deployment, applying your new ELB as the load balancer to your configuration.

   ```
   helm upgrade harness harness/ -f override-demo.yaml -n harness
   ```
   
   kubectl destroy two pods to inherit the new configuration.

   - The ingress controller pod (for example, `harness-ingress-controller-7f8bc86bb8-mrj94`)
   - The gateway pod (for example, `gateway-59c47c595d-4fvt2`)

10. Navigate to the sign up UI at `https://<YOUR_ELB_ADDRESS>/auth/#/signup` to create your admin user.
11. Complete the [post-install](#-post-install-next-steps) next steps to proceed.

### Google Kubernetes Engine (GKE)

1. Create a new cluster or use an existing one.

2. Create a new namespace:

   1. Set your Kubernetes context to the GCP project you are using.

   2. Run the following

      ```
      kubectl create ns <namespace name>
      ```

3. Download the latest charts from the Harness Helm chart [repo](https://github.com/harness/helm-charts/releases).

    :::info
    Charts are located under **Assets**. The file name looks like `harness-0.15.0.tgz`.
    :::

4. Extract the `*.tgz` file.

5. Open the `override-demo.yaml` file in a file editor.

6. Add your external static IP address in the following fields.

   ```yaml
   loadbalancerURL: http://xx.xx.xx.xx
   ```

   ```yaml
   loadBalancerIP: xx.xx.xx.xx
   ```

7. Set the following fields.

   ```yaml
   loadbalancerURL: http://xx.xx.xx.xx
     ingress:
       # --- Enable Nginx ingress controller gateway
       enabled: true
       annotations: {}
       loadBalancerIP: 34.136.145.137
       className: "harness"
       loadBalancerEnabled: true
       useSelfSignedCert: false
       ingressGatewayServiceUrl: ''
       hosts:
         - ""
   ```

8. Search for "nginx:", and set `create:` to `true`.

   ```yaml
    nginx:
      create: true
   ```

9. Search for "defaultbackend:", and set `create:` to `true`.

   ```yaml
    defaultbackend:
      create: true
   ```

10. Save the file and exit.

11. Run the following from your terminal.

    ```
    helm install <YOUR_RELEASE_NAME> <path to Harness directory> -n <YOUR_NAMESPACE_NAME> -f override.demo.yaml
    ```

    For example:

    ```
    helm install test-release harness/ -n smp-test -f harness/override-demo.yaml
    ```

12. After the installation is complete, paste the `loadbalancerURL` in your browser's address bar, and then sign in to the Harness UI.
13. Complete the [post-install](#-post-install-next-steps) next steps to proceed.

### Post-install next steps

1. Deploy the Harness modules you want to use. For more information, go to [Deploy Harness modules](/docs/self-managed-enterprise-edition/install/install-using-helm/#deploy-harness-modules).
2. Add your Harness license. For more information, go to [Add a Harness license](/docs/self-managed-enterprise-edition/install/install-using-helm/#add-a-harness-license).
3. Configure SMTP to allow for additional user invitations. For more information, go to [Add SMTP configuration](https://developer.harness.io/docs/platform/notifications/add-smtp-configuration/).

## Licenses

License issues can occur even after you apply the license via a Helm values file. Use the following processes to identify and troubleshoot license issues.

### Next-Gen License

## Feature Flags

This topic describes how to manage Feature Flags for Harness Self-Managed Enterprise Edition. You can update Feature Flags using the `override.yaml` file for your base installation.

### View installed Feature Flags

Your base installation includes default Feature Flag settings. To view installed Feature Flags, do the following:

1. Open your global `override-prod.yaml` file in a text editor.

   :::info note
    This file is typically located in the following default path.

   ```
    /path/to/helm-charts/src/override-prod.yaml
   ```
   :::

2. Go to `platform`.

   Feature Flags included with the base installation are listed in this section.

### Add Feature Flags to your installation

To add Feature Flags, do the following:

1. Open your global `override-prod.yaml` file in a text editor.

   :::info note
    This file is typically located in the following default path.

   ```
    /path/to/helm-charts/src/override-prod.yaml
   ```
   :::

2. Go to the `platform` section for the `harness-manager` component.

   ```yaml
      harness-manager:
       external_graphql_rate_limit: "500"
       autoscaling:
         enabled: true
         minReplicas: 2
       # -- These flags are used by the helper function to create the FEATURES config value based off the global.<feature>.enabled boolean
       # -- Feature Flags
      featureFlags:
         # -- Base flags for all modules(enabled by Default)
         Base: "LDAP_SSO_PROVIDER,ASYNC_ARTIFACT_COLLECTION,JIRA_INTEGRATION,AUDIT_TRAIL_UI,GDS_TIME_SERIES_SAVE_PER_MINUTE,STACKDRIVER_SERVICEGUARD,BATCH_SECRET_DECRYPTION,TIME_SERIES_SERVICEGUARD_V2,TIME_SERIES_WORKFLOW_V2,CUSTOM_DASHBOARD,GRAPHQL,CV_FEEDBACKS,LOGS_V2_247,UPGRADE_JRE,LOG_STREAMING_INTEGRATION,NG_HARNESS_APPROVAL,GIT_SYNC_NG,NG_SHOW_DELEGATE,NG_CG_TASK_ASSIGNMENT_ISOLATION,AZURE_CLOUD_PROVIDER_VALIDATION_ON_DELEGATE,TERRAFORM_AWS_CP_AUTHENTICATION,NG_TEMPLATES,NEW_DEPLOYMENT_FREEZE,HELM_CHART_AS_ARTIFACT,RESOLVE_DEPLOYMENT_TAGS_BEFORE_EXECUTION,WEBHOOK_TRIGGER_AUTHORIZATION,GITHUB_WEBHOOK_AUTHENTICATION,CUSTOM_MANIFEST,GIT_ACCOUNT_SUPPORT,AZURE_WEBAPP,LDAP_GROUP_SYNC_JOB_ITERATOR,POLLING_INTERVAL_CONFIGURABLE,APPLICATION_DROPDOWN_MULTISELECT,USER_GROUP_AS_EXPRESSION,RESOURCE_CONSTRAINT_SCOPE_PIPELINE_ENABLED,NG_TEMPLATE_GITX,ELK_HEALTH_SOURCE,NG_ENABLE_LDAP_CHECK,CVNG_METRIC_THRESHOLD,SRM_HOST_SAMPLING_ENABLE,SRM_ENABLE_HEALTHSOURCE_CLOUDWATCH_METRICS,NG_SETTINGS"
         # -- NG Specific Feature Flags(activated when global.ng is enabled)
         NG: "ENABLE_DEFAULT_NG_EXPERIENCE_FOR_ONPREM,NEXT_GEN_ENABLED,NEW_LEFT_NAVBAR_SETTINGS,SPG_SIDENAV_COLLAPSE"
         # -- CD Feature Flags (activated when global.cd is enabled)
         CD: ""
         # -- CI Feature Flags (activated when global.ci is enabled)
         CI: "CING_ENABLED,CI_INDIRECT_LOG_UPLOAD"
         # -- STO Feature Flags (activated when global.sto is enabled)
         STO: "STO_BASELINE_REGEX,STO_STEP_PALETTE_BURP_ENTERPRISE,STO_STEP_PALETTE_CODEQL,STO_STEP_PALETTE_FOSSA,STO_STEP_PALETTE_GIT_LEAKS,STO_STEP_PALETTE_SEMGREP"
         # -- SRM Flags (activated when global.srm is enabled)
         SRM: "CVNG_ENABLED"
         # -- Custom Dashboard Flags (activated when global.dashboards is enabled)
         CDB: "NG_DASHBOARDS"
         # -- FF Feature Flags (activated when global.ff is enabled)
         FF: "CFNG_ENABLED"
         # -- CCM Feature Flags (activated when global.ccm is enabled)
         CCM: "CENG_ENABLED,CCM_MICRO_FRONTEND,NODE_RECOMMENDATION_AGGREGATE"
         # -- GitOps Feature Flags (activated when global.gitops is enabled)
         GitOps: "GITOPS_ONPREM_ENABLED,CUSTOM_ARTIFACT_NG,SERVICE_DASHBOARD_V2,ENV_GROUP,NG_SVC_ENV_REDESIGN"
         # -- OPA (activated when global.opa is enabled)
         OPA: ""
         # -- CHAOS Feature Flags (activated when global.chaos is enabled)
         CHAOS: "CHAOS_ENABLED"
         # -- Disables OLD_GIT_SYNC if .global.ngGitSync is enabled
         OLDGITSYNC : "USE_OLD_GIT_SYNC"
         # -- AutoAccept Feature Flags
         SAMLAutoAccept: "AUTO_ACCEPT_SAML_ACCOUNT_INVITES,PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES"
         # -- Additional Feature Flag (placeholder to add any other featureFlags)
         ADDITIONAL: ""
   ```

   You can add additional Feature Flags that are not included with the base configuration here.

3. Add the Feature Flag.

   For example, to add the next generation `CDS_OrgAccountLevelServiceEnvEnvGroup` flag, enter the following.

   ```yaml
     # ...
   platform:
     # ...
   harness-manager:
      external_graphql_rate_limit: "500"
      autoscaling:
         enabled: true
         minReplicas: 2
      featureFlags:
         ADDITIONAL: "CDS_OrgAccountLevelServiceEnvEnvGroup"
   ```

4. Run Helm upgrade against your current release installation, referencing your updated values.

   ```
   helm upgrade <my-release> . -n harness-ng -f ../override-prod.yaml
   ```

   :::info note
   For Feature Flags that affect `ng-manager`, you must restart the component(s) after the Helm upgrade is complete and the Harness Manager has restarted and is up and running. You can restart your pods or run the following rollout restart command on the Harness Manager deployment for your installation.

   ```
   kubectl rollout restart deployment ng-manager
   ```
   :::

   :::info note
   This example is the snapshot to update the Helm chart. You can also update the `values.yaml` file for your Kubernetes delegate.
   :::

## Auto Scaling 

:::info Note
This feature is available from Harness Helm Chart version 0.23.0. 

By default, autoscaling is enabled for all services in Harness Helm Chart now.
:::

You can set up autoscaling for harness workloads using [HorizontalPodAutoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/). 
Harness helm chart supports configuring HPA for either all services at once or for selective services.

### Autoscaling for all services

You can configure autoscaling for all services using the global override of helm chart.

```yaml
global:
  autoscaling:
    enabled: true      # Enables autoscaling for all services
    minReplicas: 1     # Set minimum replicas for all services
    maxReplicas: 5     # Set maximum replicas for all services
    targetCPU: 80      # Set target CPU for all services
    targetMemory: 80   # Set target Memory for all services
```

### Autoscaling for selective services

If you want to change the autoscaling spec such as `minReplicas` for selective services, you can configure it like below.

```yaml
global:
  autoscaling:
    enabled: true      # Disables autoscaling for all services
    minReplicas: 1     # Set minimum replicas for all services
    maxReplicas: 5     # Set maximum replicas for all services
    targetCPU: 80      # Set target CPU for all services
    targetMemory: 80   # Set target Memory for all services

platform:
  ng-manager:
    autoscaling:
      minReplicas: 3   # Takes precedence over global minReplicas     
```

The same applies for other spec fields `maxReplicas`, `targetCPU` and `targetMemory`.

### Autoscaling behaviour of selective services

You can set autoscaling behaviour of services through their individual overrides. For eg., to set the scaleDown policy of ng-manager, you can configure it like below.

```yaml
platform:
  ng-manager:
    autoscaling:
      behavior:
        scaleDown:
          policies:
          - type: Pods
            value: 4
            periodSeconds: 60
          - type: Percent
            value: 10
            periodSeconds: 60    
```

To learn more about the HPA behavior, you can refer to its [Official Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#configurable-scaling-behavior)
