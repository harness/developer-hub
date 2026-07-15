---
title: Services & Environments
sidebar_label: Services & Environments
description: Services define what you are deploying; environments define where. Together they configure the deployment target for a Harness 3.0 pipeline stage.
sidebar_position: 4
---

Services and Environments are core deployment concepts in Harness 3.0. A Service defines what you are deploying (application, container, function), and an Environment defines where you are deploying (dev, staging, production). Together they configure the deployment target for a pipeline stage.

---

## Services

A Service represents the application or workload being deployed. It includes artifact references, manifests, configuration files, and variables that define the deployment payload.

### Service schema

```typescript title="service-schema.ts"
interface Service {
  // Reference to a defined service entity
  ref: string
  // Inline service definition
  name: string
  // Service description
  description: string
  // Deployment type (kubernetes, native-helm, serverless, etc.)
  deployment_type: string
  // Artifact configuration
  artifacts: ArtifactConfig
  // Manifest configuration
  manifests: ManifestConfig[]
  // Config files
  config_files: ConfigFile[]
  // Service-level variables
  variables: Record<string, string>
}
```

### Service definition

Define a service inline within the pipeline or reference a pre-configured service entity.

```yaml title="service-inline.yaml"
# Inline service definition
stages:
  - name: deploy
    service:
      name: my-web-app
      deployment_type: kubernetes
      artifacts:
        primary:
          type: docker
          spec:
            connector: docker-hub
            image: my-org/web-app
            tag: ${{ inputs.version }}
      manifests:
        - type: k8s
          spec:
            store:
              type: git
              spec:
                connector: github
                paths:
                  - k8s/deployment.yaml
                  - k8s/service.yaml
    steps:
      - run: echo "Deploying ${{ service.name }}"
```

### Single service reference

Reference a service defined at the project, organization, or account level. Service and environment can be specified at either the pipeline level or the stage level.

```yaml title="service-ref.yaml"
# pipeline-level service and environment
# NOTE: service and environment are also supported
# at the stage level.
pipeline:
  service: my-web-app
  environment: production
  stages:
  - steps:
    - run: echo "Deploying service"
```

### Multiple service references

Deploy multiple services in a single pipeline. By default, services are deployed in parallel.

```yaml title="service-multiple.yaml"
pipeline:
  service:
    items:
    - frontend-app
    - backend-api
    - worker-service
  environment: staging
  stages:
  - steps:
    - run: echo "Deploying ${{ service.name }}"
```

### Sequential service deployment

Deploy services one at a time in a defined order using the `sequential` flag.

```yaml title="service-sequential.yaml"
pipeline:
  service:
    sequential: true
    items:
    - database-migration
    - backend-api
    - frontend-app
  environment: production
  stages:
  - steps:
    - run: echo "Deploying ${{ service.name }}"
```

:::info Service Variables
Each service can define its own variables accessible within the stage using `${{ service.variables.<name> }}`. Service variables override pipeline-level environment variables with the same name.
:::

---

## Environments

An Environment represents a deployment target such as development, staging, or production. Environments define infrastructure mappings, overrides, and governance policies.

### Environment schema

```typescript title="environment-schema.ts"
interface Environment {
  // Reference to a defined environment entity
  ref: string
  // Inline environment name
  name: string
  // Environment description
  description: string
  // Environment type
  type: "production" | "non-production"
  // Infrastructure definitions
  infrastructures: InfrastructureRef[]
  // Environment-level overrides
  overrides:
    | { manifests: ManifestOverride[] }
    | { config_files: ConfigFileOverride[] }
    | { variables: Record<string, string> }
  // Service-specific overrides
  service_overrides: Record<string, OverrideConfig>
}
```

### Environment types

| Type | Description | Governance |
|---|---|---|
| `production` | Live customer-facing environments. Requires approvals and freeze window compliance. | Approval gates, freeze windows, audit logging enforced. |
| `non-production` | Development, testing, and staging environments. Lighter governance requirements. | Optional approvals, no freeze window enforcement by default. |

### Environment definition

Reference an environment by name and specify the infrastructure to deploy to using the `deploy-to` field.

```yaml title="environment-definition.yaml"
pipeline:
  stages:
  - name: deploy
    service: my-app
    environment:
      name: staging
      deploy-to: k8s-staging-cluster
    steps:
    - run: echo "Deploying to ${{ environment.name }}"
```

---

## Multi-service deployment

Deploy multiple services to the same environment in a single stage. Services can be deployed in parallel (default) or sequentially.

### Parallel service deployment

All services deploy simultaneously, reducing total deployment time. This is the default behavior when using `items`.

```yaml title="multi-service-parallel.yaml"
pipeline:
  service:
    items:
    - user-service
    - order-service
    - payment-service
    - notification-service
  environment: staging
  stages:
  - steps:
    - run: |
        echo "Deploying ${{ service.name }}"
        kubectl apply -f k8s/${{ service.name }}/
```

:::info Service Iteration
When multiple services are specified, the stage steps execute once for each service. Use `${{ service.name }}` and `${{ service.ref }}` to reference the current service in expressions.
:::

### Sequential service deployment

Deploy services one after another, useful when services have startup order dependencies.

```yaml title="multi-service-sequential.yaml"
pipeline:
  service:
    sequential: true
    items:
    - database-migration
    - cache-service
    - backend-api
    - frontend-app
  environment: production
  stages:
  - steps:
    - run: |
        echo "Deploying ${{ service.name }}"
        ./deploy.sh ${{ service.name }}
```

---

## Multi-environment deployment

Deploy the same service across multiple environments, such as promoting a release from staging to production through a sequence of environment targets.

### Sequential environment deployment

Promote a release through multiple environments sequentially. Use `sequential: true` on the environment and the `deploy-to` field to specify infrastructure targets per environment.

```yaml title="multi-env-sequential.yaml"
pipeline:
  service: my-app
  environment:
    sequential: true
    items:
    - name: dev
      deploy-to: k8s-dev
    - name: staging
      deploy-to: k8s-staging
    - name: production
      deploy-to:
      - k8s-prod-us-east
      - k8s-prod-us-west
  stages:
  - steps:
    - run: ./deploy.sh ${{ environment.name }}
```

### Complete multi-service, multi-environment deployment

A comprehensive example combining multiple services and environments in a single pipeline.

```yaml title="complete-deployment.yaml"
pipeline:
  service:
    items:
    - backend-api
    - frontend-app
  environment:
    sequential: true
    items:
    - name: dev
      deploy-to: k8s-dev
    - name: staging
      deploy-to:
      - k8s-staging-1
      - k8s-staging-2
    - name: production
      deploy-to: all
  stages:
  - steps:
    - run: |
        echo "Deploying ${{ service.name }} to ${{ environment.name }}"
        ./deploy.sh ${{ service.name }}
```

:::info Infrastructure Targeting
Use `deploy-to: all` to deploy to all infrastructures defined in the environment. You can also specify a single infrastructure as a string or a list of specific infrastructure targets.
:::