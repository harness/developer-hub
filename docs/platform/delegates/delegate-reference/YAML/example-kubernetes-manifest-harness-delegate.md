---
title: Example Kubernetes manifest and Helm chart for Harness Delegate
description: The following provides an example of a Kubernetes manifest and Helm chart used to configure Harness Delegate.
# sidebar_position: 2
helpdocs_topic_id: cjtk5rw8z4
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

Go to the following for an example of a Kubernetes manifest that you can use to configure Harness Delegate and the Helm chart default `values.yaml` file.

<details>
<summary>Sample Kubernetes manifest</summary>
<br />

[Harness Delegate Kubernetes manifest](https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml)

```yaml
# Create a namespace for the Harness delegate
apiVersion: v1
kind: Namespace
metadata:
  name: harness-delegate-ng

---

# Grant cluster-admin privileges to the delegate service account within the delegate namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: harness-delegate-cluster-admin
subjects:
  - kind: ServiceAccount
    name: default
    namespace: harness-delegate-ng
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io

---

# Create a secret to store the delegate token
apiVersion: v1
kind: Secret
metadata:
  name: PUT_YOUR_DELEGATE_NAME-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  DELEGATE_TOKEN: "PUT_YOUR_DELEGATE_TOKEN"

---

# Define a Deployment for the Harness delegate
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: PUT_YOUR_DELEGATE_NAME
  name: PUT_YOUR_DELEGATE_NAME
  namespace: harness-delegate-ng
spec:
  replicas: 1
  minReadySeconds: 120
  selector:
    matchLabels:
      harness.io/name: delegate
  template:
    metadata:
      labels:
        harness.io/name: delegate
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3460"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      containers:
      - image: PUT_YOUR_DELEGATE_IMAGE  # please do not use harness/delegate:latest
        imagePullPolicy: Always
        name: delegate
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
        ports:
          - containerPort: 8080
        resources:
          limits:
            memory: "2048Mi"
          requests:
            cpu: "0.5"
            memory: "2048Mi"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 60
          failureThreshold: 5
        startupProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 15
        envFrom:
        - secretRef:
            name: PUT_YOUR_DELEGATE_NAME-account-token
        env:
        - name: JAVA_OPTS
          value: "-Xms64M"
        # Add other environment variables as needed

---

# Define Horizontal Pod Autoscaler for the delegate
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
   name: PUT_YOUR_DELEGATE_NAME
   namespace: harness-delegate-ng
   labels:
       harness.io/name: PUT_YOUR_DELEGATE_NAME
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: PUT_YOUR_DELEGATE_NAME
  minReplicas: 1
  maxReplicas: 1
  targetCPUUtilizationPercentage: 99

---

# Define Role for the upgrader cron job
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: upgrader-cronjob
  namespace: harness-delegate-ng
rules:
  - apiGroups: ["batch", "apps", "extensions"]
    resources: ["cronjobs"]
    verbs: ["get", "list", "watch", "update", "patch"]
  - apiGroups: ["extensions", "apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]

---

# Define RoleBinding for the upgrader cron job
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: upgrader-cronjob
  namespace: harness-delegate-ng
subjects:
  - kind: ServiceAccount
    name: upgrader-cronjob-sa
    namespace: harness-delegate-ng
roleRef:
  kind: Role
  name: upgrader-cronjob
  apiGroup: ""

---

# Define ServiceAccount for the upgrader cron job
apiVersion: v1
kind: ServiceAccount
metadata:
  name: upgrader-cronjob-sa
  namespace: harness-delegate-ng

---

# Create a secret to store the upgrader token
apiVersion: v1
kind: Secret
metadata:
  name: PUT_YOUR_DELEGATE_NAME-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "PUT_YOUR_DELEGATE_TOKEN"

---

# Create a ConfigMap to store upgrader configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: PUT_YOUR_DELEGATE_NAME-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: |
    mode: Delegate
    dryRun: false
    workloadName: PUT_YOUR_DELEGATE_NAME
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: PUT_YOUR_ACCOUNT_ID
      managerHost: PUT_YOUR_MANAGER_ENDPOINT

---

# Define a CronJob for the upgrader job
apiVersion: batch/v1
kind: CronJob
metadata:
  labels:
    harness.io/name: upgrader-job
  name: PUT_YOUR_DELEGATE_NAME-upgrader-job
  namespace: harness-delegate-ng
spec:
  schedule: "0 */1 * * *"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 20
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: upgrader-cronjob-sa
          restartPolicy: Never
          containers:
          - image: harness/upgrader:latest
            name: upgrader
            imagePullPolicy: Always
            envFrom:
            - secretRef:
                name: PUT_YOUR_DELEGATE_NAME-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: PUT_YOUR_DELEGATE_NAME-upgrader-config

```

</details>

<details>
<summary>Helm chart default `values.yaml` file</summary>
<br />

For the newest references, please utilize the most up-to-date [Helm chart default `values.yaml` file example found in our repository](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml)

```yaml
# Default values for delegate-ng.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  pullPolicy: Always
  # Uncomment below lines to use a custom registry + repository, a different repository or a different tag, this will override the delegateDockerImage
  # registry: null
  # repository: null
  # tag: null

fullnameOverride: ""

mTLS:
  secretName: ""

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # Annotations to add to the service account
  annotations: {}
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name: ""

service:
  # type: ClusterIP
  port: 8080

# Edit this if you want to enable horizontal pod autoscaling
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  # targetMemoryUtilizationPercentage: 80

nodeSelector: {}

tolerations: []

affinity: {}

priorityClassName: ""

delegateName: harness-delegate-ng

deployMode: "KUBERNETES"

delegateDockerImage: harness/delegate:25.08.86503

commonAnnotations: {}  # Annotations that will be applied to all resources
delegateAnnotations: {}  # Annotations that will be applied to both pod and deployment spec for Delegate
# Annotations for delegate deployment, prometheus is added by default
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3460"
  prometheus.io/path: "/api/metrics"


commonLabels: {}  # Labels that will be applied to all resources
delegatePodLabels: {}  # Labels that will be applied to pod spec
delegateLabels: {}  # Labels that will be applied to both deployment and pod spec for Delegate

imagePullSecret: ""

# Endpoint that will point to harness platform. For accessing SAAS platform use the default value.
managerEndpoint: https://app.harness.io

# If socket connection is not supported, set this flag to true to poll tasks using rest API calls
pollForTasks: "false"

# Change this to alter startup probe and liveness probe settings
startupProbe:
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 40
  timeoutSeconds: 1

livenessProbe:
  initialDelaySeconds: 30
  periodSeconds: 20
  failureThreshold: 3
  timeoutSeconds: 1

# Add delegate description and tags
description: ""
tags: ""

# Permissions for installed delegate, could be CLUSTER_ADMIN, CLUSTER_VIEWER or NAMESPACE_ADMIN
# For using custom role: Create role in kubernetes cluster and refer role in k8sPermissionsType field.
# for example if your custom role name is custom-role, then you need to add
#k8sPermissionsType: "custom-role"
k8sPermissionsType: "CLUSTER_ADMIN"

# Number of pod replica running delegate image
replicas: 1

# The deployment strategy. Can be "RollingUpdate" or "Recreate". Can be usefull if a rolling update is not
# possible due to custom volumes or mounts that can only be attached to a single pod.
deploymentStrategy: "RollingUpdate"

# Rolling update configuration (only applies when deploymentStrategy is "RollingUpdate").
# By default, these are not set so Kubernetes uses its own defaults (currently 25%).
# Uncomment and set if you want to override the defaults. You may use integers or percentage strings (e.g., "25%")
# rollingUpdate:
#   # Maximum number of pods that can be created above the desired replica count during updates
#   maxSurge: "25%"
#   # Maximum number of pods that can be unavailable during the update process
#   maxUnavailable: "25%"

# Resource limits of container running delegate image in kubernetes
# If you want to set custom resource limits, uncomment the below line and set the values for cpu and memory request/limit
# resources:
#   limits:
#     cpu: 1
#     memory: 2048Mi
#   requests:
#     cpu: 1
#     memory: 2048Mi
cpu: 1
memory: 2048

# Script to run before delegate installation
initScript: ""

# This is a constant, don't change this.
delegateType: "HELM_DELEGATE"

javaOpts: "-Xms64M"

upgrader:
  enabled: true
  upgraderDockerImage: "harness/upgrader:latest"
  registryMirror: ""
  image:
    pullPolicy: Always
    # Uncomment below lines to use a custom registry + repository, a different repository or a different tag, this will override the upgraderDockerImage
    # registry: null
    # repository: null
    # tag: null
  
  # Schedule for the upgrader cronjob (cron format)
  schedule: "0 */1 * * *"

  imagePullSecret: ""

  cronJobServiceAccountName: "upgrader-cronjob-sa"
  # Use existing Secret which stores UPGRADER_TOKEN key instead of creating a new one. The value should be set with the `UPGRADER_TOKEN` key inside the secret.
  ## The use of external secrets allows you to manage credentials from external tools like Vault, 1Password, SealedSecrets, among other.
  ## If set, this parameter takes precedence over "upgraderToken"
  ## Recommendation:
  ## - Use different Secrets names for `existingUpgraderToken` and `existingDelegateToken`.
  ## - Do not use Secrets managed by other helm delpoyments.
  existingUpgraderToken: ""

  # Set security context for upgrader
  securityContext:

# This field is DEPRECATED, DON'T OVERRIDE/USE THIS!!
# To set root/non-root access and other security context use delegateSecurityContext field below.
# Not removing this field to maintain backward compatibility.
securityContext:
  runAsRoot: true

# Set security context for delegate
delegateSecurityContext:
  allowPrivilegeEscalation: false
  runAsUser: 0

nextGen: true

# Below are the required fields, no default values are populated for these.
# Please add values for delegate to work.

# Account Id to which the delegate will be connecting
accountId: ""
# Delegate Token
delegateToken: ""
# Use existing Secret which stores DELEGATE_TOKEN key instead of creating a new one. The value should be set with the `DELEGATE_TOKEN` key inside the secret.
## The use of external secrets allows you to manage credentials from external tools like Vault, 1Password, SealedSecrets, among other.
## If set, this parameter takes precedence over "delegateToken".
## Recommendations:
## - Use different Secrets names for `existingUpgraderToken` and `existingDelegateToken`.
## - Do not use Secrets managed by other helm delpoyments.
existingDelegateToken: ""

# Configure a Kubernetes build farm to use self-signed certificates
# https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
# CAUTION
# Make sure that the destination path is not same as the default CA certificate path of the corresponding container image.
#
# If you want to override the default certificate file, make sure the Kubernetes secret or config map (from step one) includes all certificates required by the pipelines that will use this build infrastructure.
# This is LEGACY way to adding cert, we recommend to use destinationCaPath, please follow the document:
# https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
shared_certificates:
  # Location in the delegate to which the ca_bundle will be mounted or a location in the custom delegate image to which the
  # CA chain has already been placed as part of creating the custom delegate image
  certs_path: /shared/customer-artifacts/certificates/ca.bundle
  # Example Certificate Chain (Multi-line files )
  # ca_bundle should be the text of the CA Bundle to include in a secret
  #
  # Note: when defined, the secret will be mounted to the certs_path location on the delegate
  ca_bundle: # |
  #   -----BEGIN CERTIFICATE-----
  #   XXXXXXXXXXXXXXXXXXXXXXXXXXX
  #   -----END CERTIFICATE-------
  #   -----BEGIN CERTIFICATE-----
  #   XXXXXXXXXXXXXXXXXXXXXXXXXXX
  #   -----END CERTIFICATE-------

  # CI Mount targets are the locations that the secrets should be mounted in the CI Images.  This will share any CA chain defined in the certs_path key to any CI image
  # configured in the pod.
  ci_mount_targets:
    # - /etc/ssl/certs/ca-bundle.crt
    # - /etc/ssl/certs/ca-certificates.crt
    # - /kaniko/ssl/certs/additional-ca-cert-bundle.crt

# additional init containers for the delegate pod
custom_init_containers:
  # - name: init-container
  #   image: busybox
  #   command: ['sh', '-c', 'echo "Hello from init container!"']

# additional sidecar containers for the delegate pod
custom_containers:
  # - name: sidecar
  #   image: busybox
  #   command: ['sh', '-c', 'echo "Hello from sidecar!"']

# additional environment variables for the delegate pod
custom_envs:
  # - name: DELEGATE_TASK_CAPACITY
  #   value: "10"

# mounts for the delegate pod
custom_mounts:
  # - name: certs
  #   mountPath: /shared/customer-artifacts/certificates/

# volumes to add to the delegate container
custom_volumes:
  # - name: certs
  #   persistentVolumeClaim:
  #     claimName: harness-delegate-ng-certs

# minimum number of seconds for which a newly created Pod should be ready without any of its containers crashing, for it to be considered available.
# This is set for improving stability during upgrade. It will tell kubernetes to wait at least this amount of seconds before removing the old pod after the new one becomes ready.
minReadySeconds: 120

# Enable the cluster role needed for CCM cost visibility
# Not needed if k8sPermissionsType: "CLUSTER_ADMIN" is specified
ccm:
  visibility: false

# Use this field to add additional labels
additionalLabels: {}
#  nologging: "true"

dnsConfig: {}
#  nameservers:
#    - 1.2.3.4
#  searches:
#    - ns1.svc.cluster-domain.example
#    - my.dns.search.suffix
#  options:
#    - name: ndots
#      value: "2"
#    - name: edns0

dnsPolicy: ""

upgraderCustomCa:
  secretName:

delegateCustomCa:
  secretName:

# This is recommended way of using custom certs with CI.
# Please refer: https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
destinationCaPath:
```

</details>

