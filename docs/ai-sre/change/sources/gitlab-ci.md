---
title: Configure GitLab CI for Deploy Change Investigator
description: Send build and deployment webhooks from GitLab CI/CD pipelines to track changes in Harness AI SRE
sidebar_label: GitLab CI
sidebar_position: 6
keywords:
  - ai-sre
  - change detection
  - gitlab ci
  - build webhooks
  - deployment tracking
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Send build and deployment data from GitLab CI/CD pipelines to the Deploy Change Investigator using webhook jobs.

## Before you begin

- **Deploy Change Investigator setup**: Build and deploy webhook integrations created in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to create webhook endpoints.
- **GitLab project access**: Maintainer role to edit `.gitlab-ci.yml` and configure CI/CD variables.
- **Webhook URLs**: Build and deploy webhook URLs from AI SRE integrations page.

---

## Store webhook URLs as CI/CD variables

Store webhook URLs securely in GitLab CI/CD variables:

1. Navigate to project **Settings** → **CI/CD**
2. Expand **Variables** section
3. Click **Add variable**
4. Configure build webhook:
   - **Key:** `AISRE_BUILD_WEBHOOK_URL`
   - **Value:** Build webhook URL from AI SRE
   - **Type:** Variable
   - **Flags:** Protect variable, Mask variable
5. Click **Add variable**
6. Repeat for deploy webhook:
   - **Key:** `AISRE_DEPLOY_WEBHOOK_URL`
   - **Value:** Deploy webhook URL from AI SRE

---

## Configure build webhooks

Add a webhook notification job to your pipeline after build completes.

### Docker build pipeline

```yaml
stages:
  - build
  - notify

variables:
  REGISTRY: registry.gitlab.com
  IMAGE_NAME: $CI_PROJECT_PATH

build:
  stage: build
  image: docker:24.0.5
  services:
    - docker:24.0.5-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $REGISTRY/$IMAGE_NAME:$CI_COMMIT_SHORT_SHA .
    - docker push $REGISTRY/$IMAGE_NAME:$CI_COMMIT_SHORT_SHA
  only:
    - main
    - develop

notify-build:
  stage: notify
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "$AISRE_BUILD_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "artifact": {
            "name": "'"$REGISTRY/$IMAGE_NAME"'",
            "version": "'"$CI_COMMIT_SHORT_SHA"'"
          },
          "source": {
            "commitSha": "'"$CI_COMMIT_SHA"'",
            "kind": "branch",
            "value": "'"$CI_COMMIT_REF_NAME"'",
            "repository_url": "'"$CI_PROJECT_URL"'"
          },
          "service": {
            "name": "'"$CI_PROJECT_NAME"'",
            "version": "'"$CI_COMMIT_SHORT_SHA"'"
          },
          "buildId": "'"$CI_PIPELINE_ID"'"
        }'
  dependencies:
    - build
  only:
    - main
    - develop
  when: on_success
```

---

## GitLab CI predefined variables

GitLab CI provides these predefined variables automatically:

| Variable | Description | Example |
|----------|-------------|---------|
| `CI_COMMIT_SHA` | Full commit SHA | `1ecfd275763eff1d6b4844ea3168962458c9f27a` |
| `CI_COMMIT_SHORT_SHA` | Short commit SHA (first 8 characters) | `1ecfd275` |
| `CI_COMMIT_REF_NAME` | Branch or tag name | `main` |
| `CI_PROJECT_PATH` | Project path with namespace | `group/project` |
| `CI_PROJECT_NAME` | Project name only | `project` |
| `CI_PROJECT_URL` | Full project URL | `https://gitlab.com/group/project` |
| `CI_PIPELINE_ID` | Unique pipeline ID | `1234567` |
| `CI_REGISTRY` | GitLab Container Registry URL | `registry.gitlab.com` |

Access variables using shell syntax: `$CI_COMMIT_SHA` or `${CI_COMMIT_SHA}`

---

## Configure deploy webhooks

Add webhook notification jobs to deployment pipelines after deployment completes.

### Kubernetes deployment pipeline

```yaml
stages:
  - build
  - deploy
  - notify

variables:
  KUBE_NAMESPACE: production
  SERVICE_NAME: myapp

deploy-production:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context $KUBE_CONTEXT
    - kubectl set image deployment/$SERVICE_NAME 
        $SERVICE_NAME=$REGISTRY/$IMAGE_NAME:$CI_COMMIT_SHORT_SHA 
        -n $KUBE_NAMESPACE
    - kubectl rollout status deployment/$SERVICE_NAME 
        -n $KUBE_NAMESPACE 
        --timeout=5m
  environment:
    name: production
  only:
    - main

notify-deploy-success:
  stage: notify
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "services": [{
            "service": "'"$SERVICE_NAME"'",
            "version": "'"$CI_COMMIT_SHORT_SHA"'"
          }],
          "environments": ["production"],
          "changeId": "'"$CI_PIPELINE_ID"'",
          "status": "SUCCESS",
          "deployedBy": "'"$GITLAB_USER_LOGIN"'",
          "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
        }'
  dependencies:
    - deploy-production
  environment:
    name: production
  only:
    - main
  when: on_success

notify-deploy-failure:
  stage: notify
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "services": [{
            "service": "'"$SERVICE_NAME"'",
            "version": "'"$CI_COMMIT_SHORT_SHA"'"
          }],
          "environments": ["production"],
          "changeId": "'"$CI_PIPELINE_ID"'",
          "status": "FAILURE",
          "deployedBy": "'"$GITLAB_USER_LOGIN"'",
          "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
        }'
  dependencies:
    - deploy-production
  environment:
    name: production
  only:
    - main
  when: on_failure
```

:::note Deploy status is recorded as success
The stock Harness Deployment template records every deploy activity as `success`. Sending a `FAILURE` status is accepted but does not create a failed-deployment record. Keep the failure job if you want the deploy event captured, but do not rely on the status value to distinguish failed deploys.
:::

---

## Job execution conditions

Control when jobs execute using `when` and `only` keywords:

| Keyword | Purpose |
|---------|---------|
| `when: on_success` | Run if previous jobs succeeded |
| `when: on_failure` | Run if previous jobs failed |
| `when: always` | Run regardless of previous job status |
| `when: manual` | Require manual trigger |
| `only: [main]` | Run only on specified branches |
| `except: [develop]` | Skip on specified branches |

Example with conditions:

```yaml
notify-always:
  stage: notify
  script:
    - echo "Pipeline finished"
  when: always

notify-success:
  stage: notify
  script:
    - curl -X POST $WEBHOOK_URL -d '{"status": "SUCCESS"}'
  when: on_success

notify-failure:
  stage: notify
  script:
    - curl -X POST $WEBHOOK_URL -d '{"status": "FAILURE"}'
  when: on_failure
```

---

## Multi-service deployments

For pipelines that deploy multiple services, send all services in one webhook:

```yaml
notify-deploy:
  stage: notify
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "services": [
            {"service": "frontend", "version": "'"$FRONTEND_VERSION"'"},
            {"service": "backend", "version": "'"$BACKEND_VERSION"'"},
            {"service": "worker", "version": "'"$WORKER_VERSION"'"}
          ],
          "environments": ["production"],
          "changeId": "'"$CI_PIPELINE_ID"'",
          "status": "SUCCESS",
          "deployedBy": "'"$GITLAB_USER_LOGIN"'",
          "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
        }'
  when: on_success
```

---

## Reusable templates

Create reusable webhook notification templates using `include`:

### Create template file

Create `.gitlab/ci/webhook-notify.yml`:

```yaml
.notify-build:
  stage: notify
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "$AISRE_BUILD_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "artifact": {"name": "'"$REGISTRY/$IMAGE_NAME"'", "version": "'"$VERSION"'"},
          "source": {
            "commitSha": "'"$CI_COMMIT_SHA"'",
            "kind": "branch",
            "value": "'"$CI_COMMIT_REF_NAME"'",
            "repository_url": "'"$CI_PROJECT_URL"'"
          },
          "service": {"name": "'"$SERVICE_NAME"'", "version": "'"$VERSION"'"},
          "buildId": "'"$CI_PIPELINE_ID"'"
        }'
  when: on_success

.notify-deploy:
  stage: notify
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "services": [{"service": "'"$SERVICE_NAME"'", "version": "'"$VERSION"'"}],
          "environments": ["'"$ENVIRONMENT"'"],
          "changeId": "'"$CI_PIPELINE_ID"'",
          "status": "SUCCESS",
          "deployedBy": "'"$GITLAB_USER_LOGIN"'",
          "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
        }'
  when: on_success
```

### Use templates

Include and extend templates in main pipeline:

```yaml
include:
  - local: '.gitlab/ci/webhook-notify.yml'

notify-build:
  extends: .notify-build
  variables:
    SERVICE_NAME: $CI_PROJECT_NAME
    VERSION: $CI_COMMIT_SHORT_SHA

notify-deploy:
  extends: .notify-deploy
  variables:
    SERVICE_NAME: $CI_PROJECT_NAME
    VERSION: $CI_COMMIT_SHORT_SHA
    ENVIRONMENT: production
```

---

## Service and version mapping

The Deploy Change Investigator requires exact matches between build and deploy webhooks:

| Build webhook | Deploy webhook | Must match |
|---------------|----------------|------------|
| `service.name` | `services[].service` | ✅ Required |
| `artifact.version` or `service.version` | `services[].version` | ✅ Required |

Use the same variable (`$CI_COMMIT_SHORT_SHA`) in both build and deploy webhooks to ensure versions match.

---

## Testing webhooks

### Test build webhook

1. Push a commit or create merge request
2. Check pipeline job logs for `notify-build` job
3. Verify curl command executed successfully
4. Navigate to **AI SRE** → **Integrations**
5. Click **...** menu on BUILD integration
6. Select **Debug**
7. Verify webhook appears with correct payload

### Test deploy webhook

1. Trigger deployment pipeline
2. Check `notify-deploy` job logs
3. Navigate to **AI SRE** → **Integrations**
4. Click **...** menu on DEPLOY integration
5. Select **Debug**
6. Verify webhook appears

### Verify correlation

After sending both webhooks:

1. Navigate to **AI SRE** → **Change Management**
2. Deployments should appear linked to builds
3. Click a deployment to see artifact versions and commit information

---

## Troubleshooting

<Troubleshoot
  issue="GitLab CI webhook not received in AI SRE"
  mode="docs"
  fallback="Confirm the CI/CD variable AISRE_BUILD_WEBHOOK_URL or AISRE_DEPLOY_WEBHOOK_URL is configured, verify the curl command runs in the job logs, ensure GitLab runners allow outbound HTTPS, and check the JSON payload for syntax errors. Test manually with curl -v -X POST against the webhook URL."
/>

<Troubleshoot
  issue="GitLab CI deployments not linked to builds in AI SRE"
  mode="docs"
  fallback="Ensure services[].service in the deploy webhook exactly matches service.name in the build webhook, and services[].version exactly matches the build webhook version. Confirm both webhooks were sent successfully by checking the Debug view."
/>

<Troubleshoot
  issue="GitLab CI shell variable interpolation issues in webhook JSON"
  mode="docs"
  fallback={"Shell variables may not expand in JSON. Use the quote pattern \"'\"$VARIABLE\"'\" for proper JSON escaping, for example \"service\": \"'\"$CI_PROJECT_NAME\"'\"."}
/>

<Troubleshoot
  issue="GitLab CI job fails with a protected variable when sending webhooks"
  mode="docs"
  fallback={"Protected variables are only available on protected branches. Either unprotect the variable or restrict webhook jobs to protected branches using an only clause such as main or /^release\\/.*$/."}
/>

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for complete setup instructions.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how the AI agent uses change detection during incidents.
- Go to [Configure Jenkins](/docs/ai-sre/change/sources/jenkins) for webhook setup in Jenkins pipelines.
