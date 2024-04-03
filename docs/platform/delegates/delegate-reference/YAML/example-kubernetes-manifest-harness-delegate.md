---
title: Example Kubernetes manifest and Helm chart for Harness Delegate
description: The following provides an example of a Kubernetes manifest and Helm chart used to configure Harness Delegate.
# sidebar_position: 2
helpdocs_topic_id: cjtk5rw8z4
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

Go to the following for an example of a Kubernetes manifest you can use to configure Harness Delegate and the Helm chart default `values.yaml` file.

<details>
<summary>Sample Kubernetes manifest</summary>
<br />

[Harness Delegate Kubernetes manifest](https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml)

```yaml
# Default configuration values for the Harness Delegate NextGen.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  pullPolicy: Always

fullnameOverride: ""

serviceAccount:
  # Specifies whether a service account should be created.
  create: true
  # Annotations to add to the service account.
  annotations: {}
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template.
  name: ""

service:
 # type: ClusterIP
  port: 8080

# Edit this if you want to enable horizontal pod autoscaling.
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

delegateDockerImage: harness/delegate:24.01.82108

# Annotations for delegate deployment; Prometheus is added by default.
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3460"
  prometheus.io/path: "/api/metrics"

imagePullSecret: ""

# Endpoint that will point to the Harness Platform. For accessing SaaS platform use the default value.
managerEndpoint: https://app.harness.io

# If socket connection is not supported, set this flag to true to poll tasks using REST API calls.
pollForTasks: "false"

# Change this to alter startup probe and liveness probe settings.
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

# Add delegate description and tags.
description: ""
tags: ""

# Permissions for the installed delegate, could be CLUSTER_ADMIN, CLUSTER_VIEWER, or NAMESPACE_ADMIN.
# For using a custom role: Create a role in the Kubernetes cluster and refer to the role in the k8sPermissionsType field.
# For example, if your custom role name is custom-role, then you need to add k8sPermissionsType: "custom-role".
k8sPermissionsType: "CLUSTER_ADMIN"

# Number of pod replicas running the delegate image.
replicas: 1

# The deployment strategy. Can be "RollingUpdate" or "Recreate". Can be useful if a rolling update is not
# possible due to custom volumes or mounts that can only be attached to a single pod.
deploymentStrategy: "RollingUpdate"

# Resource limits of the container running the delegate image in Kubernetes.
cpu: 1
memory: 2048

# Script to run before delegate installation.
initScript: ""

# This is a constant, don't change this.
delegateType: "HELM_DELEGATE"

javaOpts: "-Xms64M"

upgrader:
  enabled: true
  upgraderDockerImage: "harness/upgrader:latest"
  cronJobServiceAccountName: "upgrader-cronjob-sa"
  # Use an existing Secret which stores the UPGRADER_TOKEN key instead of creating a new one. The value should be set with the `UPGRADER_TOKEN` key inside the secret.
  ## The use of external secrets allows you to manage credentials from external tools like Vault, 1Password, SealedSecrets, among others.
  ## If set, this parameter takes precedence over "upgraderToken".
  ## Recommendations:
  ## - Use different Secrets names for `existingUpgraderToken` and `existingDelegateToken`.
  ## - Do not use Secrets managed by other Helm deployments.
  existingUpgraderToken: ""

# This field is DEPRECATED, DON'T OVERRIDE/USE THIS!!
# To set root/non-root access and other security context, use the delegateSecurityContext field below.
# Not removing this field to maintain backward compatibility.
securityContext:
  runAsRoot: true

# Set security context for delegate.
delegateSecurityContext:
  allowPrivilegeEscalation: false
  runAsUser: 0

nextGen: true

# Below are the required fields, no default values are populated for these.
# Please add values for the delegate to work.

# Account Id to which the delegate will be connecting.
accountId: ""
# Delegate Token.
delegateToken: ""
# Use an existing Secret which stores the DELEGATE_TOKEN key instead of creating a new one. The value should be set with the `DELEGATE_TOKEN` key inside the secret.
## The use of external secrets allows you to manage credentials from external tools like Vault, 1Password, SealedSecrets, among others.
## If set, this parameter takes precedence over "delegateToken".
## Recommendations:
## - Use different Secrets names for `existingUpgraderToken` and `existingDelegateToken`.
## - Do not use Secrets managed by other Helm deployments.
existingDelegateToken: ""

# Configure a Kubernetes build farm to use self-signed certificates.
# https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
# CAUTION
# Make sure that the destination path is not the same as the default CA certificate path of the corresponding container image.
#
# If you want to override the default certificate file, make sure the Kubernetes secret or config map (from step one) includes all certificates required by the pipelines that will use this build infrastructure.
# This is the LEGACY way to add a cert; we recommend using destinationCaPath. Please follow the document:
# https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
shared_certificates:
  # Location in the delegate to which the ca_bundle will be mounted or a location in the custom delegate image to which the
  # CA chain has already been placed as part of creating the custom delegate image.
  certs_path: /shared/customer-artifacts/certificates/ca.bundle
  # Example Certificate Chain (Multi-line files).
  # ca_bundle should be the text of the CA Bundle to include in a secret.
  #
  # Note: when defined, the secret will be mounted to the certs_path location on the delegate.
  ca_bundle: # |
  #   -----BEGIN CERTIFICATE-----
  #   XXXXXXXXXXXXXXXXXXXXXXXXXXX
  #   -----END CERTIFICATE-------
  #   -----BEGIN CERTIFICATE-----
  #   XXXXXXXXXXXXXXXXXXXXXXXXXXX
  #   -----END CERTIFICATE-------

  # CI Mount targets are the locations that the secrets should be mounted in the CI Images. This will share any CA chain defined in the certs_path key to any CI image
  # configured in the pod.
  ci_mount_targets:
    # - /etc/ssl/certs/ca-bundle.crt
    # - /etc/ssl/certs/ca-certificates.crt
    # - /kaniko/ssl/certs/additional-ca-cert-bundle.crt

# Additional environment variables for the delegate pod.
custom_envs:
  # - name: DELEGATE_TASK_CAPACITY
  #   value: "10"

# Mounts for the delegate pod.
custom_mounts:
  # - name: certs
  #   mountPath: /shared/customer-artifacts/certificates/

# Volumes to add to the delegate container.
custom_volumes:
  # - name: certs
  #   persistentVolumeClaim:
  #     claimName: harness-delegate-ng-certs

# Minimum number of seconds for which a newly created Pod should be ready without any of its containers crashing, for it to be considered available.
# This is set for improving stability during upgrade. It will tell Kubernetes to wait at least this amount of seconds before removing the old pod after the new one becomes ready.
minReadySeconds: 120

# Enable the cluster role needed for CCM cost visibility.
# Not needed if k8sPermissionsType: "CLUSTER_ADMIN" is specified.
ccm:
  visibility: false

# Use this field to add additional labels.
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

# This is the recommended way of using custom certs with CI.
# Please refer: https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
destinationCaPath:
```

</details>

<details>
<summary>Helm chart default `values.yaml` file</summary>
<br />

[Helm chart default `values.yaml` file](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml)

```yaml
# Default configuration values for the Harness Delegate NextGen.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  pullPolicy: Always

fullnameOverride: ""

serviceAccount:
  # Specifies whether a service account should be created.
  create: true
  # Annotations to add to the service account.
  annotations: {}
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template.
  name: ""

service:
 # type: ClusterIP
  port: 8080

# Edit this if you want to enable horizontal pod autoscaling.
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

delegateDockerImage: harness/delegate:24.01.82108

# Annotations for delegate deployment; Prometheus is added by default.
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3460"
  prometheus.io/path: "/api/metrics"

imagePullSecret: ""

# Endpoint that will point to the Harness platform. For accessing SaaS platform use the default value.
managerEndpoint: https://app.harness.io

# If socket connection is not supported, set this flag to true to poll tasks using REST API calls.
pollForTasks: "false"

# Change this to alter startup probe and liveness probe settings.
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

# Add delegate description and tags.
description: ""
tags: ""

# Permissions for the installed delegate, could be CLUSTER_ADMIN, CLUSTER_VIEWER, or NAMESPACE_ADMIN.
# For using a custom role: Create a role in the Kubernetes cluster and refer to the role in the k8sPermissionsType field.
# For example, if your custom role name is custom-role, then you need to add k8sPermissionsType: "custom-role".
k8sPermissionsType: "CLUSTER_ADMIN"

# Number of pod replicas running the delegate image.
replicas: 1

# The deployment strategy. Can be "RollingUpdate" or "Recreate". Can be useful if a rolling update is not
# possible due to custom volumes or mounts that can only be attached to a single pod.
deploymentStrategy: "RollingUpdate"

# Resource limits of the container running the delegate image in Kubernetes.
cpu: 1
memory: 2048

# Script to run before delegate installation.
initScript: ""

# This is a constant, don't change this.
delegateType: "HELM_DELEGATE"

javaOpts: "-Xms64M"

upgrader:
  enabled: true
  upgraderDockerImage: "harness/upgrader:latest"
  cronJobServiceAccountName: "upgrader-cronjob-sa"
  # Use an existing Secret which stores the UPGRADER_TOKEN key instead of creating a new one. The value should be set with the `UPGRADER_TOKEN` key inside the secret.
  ## The use of external secrets allows you to manage credentials from external tools like Vault, 1Password, SealedSecrets, among others.
  ## If set, this parameter takes precedence over "upgraderToken".
  ## Recommendations:
  ## - Use different Secrets names for `existingUpgraderToken` and `existingDelegateToken`.
  ## - Do not use Secrets managed by other Helm deployments.
  existingUpgraderToken: ""

# This field is DEPRECATED, DON'T OVERRIDE/USE THIS!!
# To set root/non-root access and other security context, use the delegateSecurityContext field below.
# Not removing this field to maintain backward compatibility.
securityContext:
  runAsRoot: true

# Set security context for delegate.
delegateSecurityContext:
  allowPrivilegeEscalation: false
  runAsUser: 0

nextGen: true

# Below are the required fields, no default values are populated for these.
# Please add values for the delegate to work.

# Account Id to which the delegate will be connecting.
accountId: ""
# Delegate Token.
delegateToken: ""
# Use an existing Secret which stores the DELEGATE_TOKEN key instead of creating a new one. The value should be set with the `DELEGATE_TOKEN` key inside the secret.
## The use of external secrets allows you to manage credentials from external tools like Vault, 1Password, SealedSecrets, among others.
## If set, this parameter takes precedence over "delegateToken".
## Recommendations:
## - Use different Secrets names for `existingUpgraderToken` and `existingDelegateToken`.
## - Do not use Secrets managed by other Helm deployments.
existingDelegateToken: ""

# Configure a Kubernetes build farm to use self-signed certificates.
# https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
# CAUTION
# Make sure that the destination path is not the same as the default CA certificate path of the corresponding container image.
#
# If you want to override the default certificate file, make sure the Kubernetes secret or config map (from step one) includes all certificates required by the pipelines that will use this build infrastructure.
# This is the LEGACY way to add a cert; we recommend using destinationCaPath. Please follow the document:
# https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
shared_certificates:
  # Location in the delegate to which the ca_bundle will be mounted or a location in the custom delegate image to which the
  # CA chain has already been placed as part of creating the custom delegate image.
  certs_path: /shared/customer-artifacts/certificates/ca.bundle
  # Example Certificate Chain (Multi-line files).
  # ca_bundle should be the text of the CA Bundle to include in a secret.
  #
  # Note: when defined, the secret will be mounted to the certs_path location on the delegate.
  ca_bundle: # |
  #   -----BEGIN CERTIFICATE-----
  #   XXXXXXXXXXXXXXXXXXXXXXXXXXX
  #   -----END CERTIFICATE-------
  #   -----BEGIN CERTIFICATE-----
  #   XXXXXXXXXXXXXXXXXXXXXXXXXXX
  #   -----END CERTIFICATE-------

  # CI Mount targets are the locations that the secrets should be mounted in the CI Images. This will share any CA chain defined in the certs_path key to any CI image
  # configured in the pod.
  ci_mount_targets:
    # - /etc/ssl/certs/ca-bundle.crt
    # - /etc/ssl/certs/ca-certificates.crt
    # - /kaniko/ssl/certs/additional-ca-cert-bundle.crt

# Additional environment variables for the delegate pod.
custom_envs:
  # - name: DELEGATE_TASK_CAPACITY
  #   value: "10"

# Mounts for the delegate pod.
custom_mounts:
  # - name: certs
  #   mountPath: /shared/customer-artifacts/certificates/

# Volumes to add to the delegate container.
custom_volumes:
  # - name: certs
  #   persistentVolumeClaim:
  #     claimName: harness-delegate-ng-certs

# Minimum number of seconds for which a newly-created Pod should be ready without any of its containers crashing, for it to be considered available.
# This is set for improving stability during upgrade. It will tell Kubernetes to wait at least this amount of seconds before removing the old pod after the new one becomes ready.
minReadySeconds: 120

# Enable the cluster role needed for CCM cost visibility.
# Not needed if k8sPermissionsType: "CLUSTER_ADMIN" is specified.
ccm:
  visibility: false

# Use this field to add additional labels.
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

# This is the recommended way of using custom certs with CI.
# Refer to: https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/
destinationCaPath:

```

</details>

