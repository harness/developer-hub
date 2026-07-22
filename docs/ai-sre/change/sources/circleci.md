---
title: Configure CircleCI for Deploy Change Investigator
description: Send build and deployment webhooks from CircleCI workflows to track changes in Harness AI SRE
sidebar_label: CircleCI
sidebar_position: 3
keywords:
  - ai-sre
  - change detection
  - circleci
  - build webhooks
  - deployment tracking
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Send build and deployment data from CircleCI workflows to the Deploy Change Investigator using webhook steps.

## Before you begin

- **Deploy Change Investigator setup**: Build and deploy webhook integrations created in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to create webhook endpoints.
- **CircleCI project access**: Permission to edit `.circleci/config.yml` and manage environment variables.
- **Webhook URLs**: Build and deploy webhook URLs from AI SRE integrations page.

---

## Store webhook URLs as environment variables

Store webhook URLs securely in CircleCI project settings:

1. Navigate to project in CircleCI dashboard
2. Click **Project Settings**
3. Select **Environment Variables**
4. Click **Add Environment Variable**
5. Create build webhook variable:
   - **Name:** `AISRE_BUILD_WEBHOOK_URL`
   - **Value:** Build webhook URL from AI SRE
6. Click **Add Environment Variable**
7. Create deploy webhook variable:
   - **Name:** `AISRE_DEPLOY_WEBHOOK_URL`
   - **Value:** Deploy webhook URL from AI SRE

---

## Configure build webhooks

Add a webhook step to your build job after artifacts are published.

### Docker build workflow

```yaml
version: 2.1

orbs:
  docker: circleci/docker@2.4.0

jobs:
  build:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - setup_remote_docker:
          docker_layer_caching: true
      
      - run:
          name: Build Docker image
          command: |
            docker build -t registry.example.com/myapp:$CIRCLE_SHA1 .
      
      - run:
          name: Push Docker image
          command: |
            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin registry.example.com
            docker push registry.example.com/myapp:$CIRCLE_SHA1
      
      - run:
          name: Send build webhook to AI SRE
          when: on_success
          command: |
            curl -X POST "$AISRE_BUILD_WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              -d '{
                "artifact": {
                  "name": "registry.example.com/myapp",
                  "version": "'"$CIRCLE_SHA1"'"
                },
                "source": {
                  "commitSha": "'"$CIRCLE_SHA1"'",
                  "kind": "branch",
                  "value": "'"$CIRCLE_BRANCH"'",
                  "repository_url": "'"$CIRCLE_REPOSITORY_URL"'"
                },
                "service": {
                  "name": "'"$CIRCLE_PROJECT_REPONAME"'",
                  "version": "'"$CIRCLE_SHA1"'"
                },
                "buildId": "'"$CIRCLE_WORKFLOW_ID"'"
              }'

workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build:
          filters:
            branches:
              only:
                - main
                - develop
```

---

## CircleCI environment variables

CircleCI provides these environment variables automatically:

| Variable | Description | Example |
|----------|-------------|---------|
| `CIRCLE_SHA1` | Full commit SHA | `ffac537e6cbbf934b08745a378932722df287a53` |
| `CIRCLE_BRANCH` | Branch name | `main` |
| `CIRCLE_PROJECT_REPONAME` | Repository name | `myapp` |
| `CIRCLE_PROJECT_USERNAME` | GitHub or Bitbucket username | `myorg` |
| `CIRCLE_REPOSITORY_URL` | Git repository URL | `https://github.com/myorg/myapp` |
| `CIRCLE_WORKFLOW_ID` | Unique workflow identifier | `abc123-def456-ghi789` |
| `CIRCLE_BUILD_NUM` | Build number | `1234` |
| `CIRCLE_USERNAME` | User who triggered build | `username` |

Access variables using shell syntax: `$CIRCLE_SHA1`

---

## Configure deploy webhooks

Add webhook steps to deployment jobs after deployment completes.

### Kubernetes deployment workflow

```yaml
version: 2.1

orbs:
  kubernetes: circleci/kubernetes@1.3.1

jobs:
  deploy:
    docker:
      - image: cimg/base:stable
    parameters:
      environment:
        type: string
        default: production
    steps:
      - checkout
      
      - kubernetes/install-kubectl
      
      - run:
          name: Configure kubectl
          command: |
            echo $KUBE_CONFIG | base64 -d > kubeconfig.yaml
            export KUBECONFIG=kubeconfig.yaml
      
      - run:
          name: Deploy to Kubernetes
          command: |
            kubectl set image deployment/$CIRCLE_PROJECT_REPONAME \
              $CIRCLE_PROJECT_REPONAME=registry.example.com/$CIRCLE_PROJECT_REPONAME:$CIRCLE_SHA1 \
              -n << parameters.environment >>
            kubectl rollout status deployment/$CIRCLE_PROJECT_REPONAME \
              -n << parameters.environment >> \
              --timeout=5m
      
      - run:
          name: Send deploy webhook to AI SRE
          when: on_success
          command: |
            curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              -d '{
                "services": [{
                  "service": "'"$CIRCLE_PROJECT_REPONAME"'",
                  "version": "'"$CIRCLE_SHA1"'"
                }],
                "environments": ["<< parameters.environment >>"],
                "changeId": "'"$CIRCLE_WORKFLOW_ID"'",
                "status": "SUCCESS",
                "deployedBy": "'"$CIRCLE_USERNAME"'",
                "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
              }'
      
      - run:
          name: Send failure webhook to AI SRE
          when: on_fail
          command: |
            curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              -d '{
                "services": [{
                  "service": "'"$CIRCLE_PROJECT_REPONAME"'",
                  "version": "'"$CIRCLE_SHA1"'"
                }],
                "environments": ["<< parameters.environment >>"],
                "changeId": "'"$CIRCLE_WORKFLOW_ID"'",
                "status": "FAILURE",
                "deployedBy": "'"$CIRCLE_USERNAME"'",
                "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
              }'
```

:::note Deploy status is recorded as success
The stock Harness Deployment template records every deploy activity as `success`. Sending a `FAILURE` status is accepted but does not create a failed-deployment record. Keep the failure webhook if you want the deploy event captured, but do not rely on the status value to distinguish failed deploys.
:::

```yaml
workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build:
          filters:
            branches:
              only: main
      - deploy:
          environment: production
          requires:
            - build
          filters:
            branches:
              only: main
```

---

## Step execution conditions

Control when steps execute using `when` attribute:

| Condition | When it runs |
|-----------|--------------|
| `when: on_success` | Previous steps succeeded |
| `when: on_fail` | Previous steps failed |
| `when: always` | Runs regardless of status |

Example with conditions:

```yaml
- run:
    name: Notify always
    when: always
    command: echo "Job finished"

- run:
    name: Notify on success
    when: on_success
    command: curl -X POST $WEBHOOK_URL -d '{"status": "SUCCESS"}'

- run:
    name: Notify on failure
    when: on_fail
    command: curl -X POST $WEBHOOK_URL -d '{"status": "FAILURE"}'
```

---

## Multi-service deployments

For workflows that deploy multiple services, send all services in one webhook:

```yaml
- run:
    name: Send deploy webhook to AI SRE
    when: on_success
    command: |
      curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
          "services": [
            {"service": "frontend", "version": "'"$FRONTEND_VERSION"'"},
            {"service": "backend", "version": "'"$BACKEND_VERSION"'"},
            {"service": "worker", "version": "'"$WORKER_VERSION"'"}
          ],
          "environments": ["production"],
          "changeId": "'"$CIRCLE_WORKFLOW_ID"'",
          "status": "SUCCESS",
          "deployedBy": "'"$CIRCLE_USERNAME"'",
          "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
        }'
```

---

## Reusable commands

Create reusable commands to standardize webhook notifications:

```yaml
version: 2.1

commands:
  notify-build:
    parameters:
      service:
        type: string
      version:
        type: string
    steps:
      - run:
          name: Send build webhook to AI SRE
          command: |
            curl -X POST "$AISRE_BUILD_WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              -d '{
                "artifact": {
                  "name": "registry.example.com/<< parameters.service >>",
                  "version": "<< parameters.version >>"
                },
                "source": {
                  "commitSha": "'"$CIRCLE_SHA1"'",
                  "kind": "branch",
                  "value": "'"$CIRCLE_BRANCH"'",
                  "repository_url": "'"$CIRCLE_REPOSITORY_URL"'"
                },
                "service": {
                  "name": "<< parameters.service >>",
                  "version": "<< parameters.version >>"
                },
                "buildId": "'"$CIRCLE_WORKFLOW_ID"'"
              }'

  notify-deploy:
    parameters:
      service:
        type: string
      version:
        type: string
      environment:
        type: string
    steps:
      - run:
          name: Send deploy webhook to AI SRE
          when: on_success
          command: |
            curl -X POST "$AISRE_DEPLOY_WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              -d '{
                "services": [{
                  "service": "<< parameters.service >>",
                  "version": "<< parameters.version >>"
                }],
                "environments": ["<< parameters.environment >>"],
                "changeId": "'"$CIRCLE_WORKFLOW_ID"'",
                "status": "SUCCESS",
                "deployedBy": "'"$CIRCLE_USERNAME"'",
                "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
              }'

jobs:
  build:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run: docker build -t registry.example.com/myapp:$CIRCLE_SHA1 .
      - run: docker push registry.example.com/myapp:$CIRCLE_SHA1
      - notify-build:
          service: myapp
          version: $CIRCLE_SHA1

  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      # Deployment steps here
      - notify-deploy:
          service: myapp
          version: $CIRCLE_SHA1
          environment: production
```

---

## Workflow filters

Control which branches trigger jobs using filters:

```yaml
workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build:
          filters:
            branches:
              only:
                - main
                - develop
      
      - deploy-staging:
          requires:
            - build
          filters:
            branches:
              only: develop
      
      - deploy-production:
          requires:
            - build
          filters:
            branches:
              only: main
```

---

## Service and version mapping

The Deploy Change Investigator requires exact matches between build and deploy webhooks:

| Build webhook | Deploy webhook | Must match |
|---------------|----------------|------------|
| `service.name` | `services[].service` | ✅ Required |
| `artifact.version` or `service.version` | `services[].version` | ✅ Required |

Use the same variable (`$CIRCLE_SHA1`) in both build and deploy webhooks to ensure versions match.

---

## Testing webhooks

### Test build webhook

1. Push a commit to trigger build
2. Check build logs for webhook step
3. Verify curl command executed successfully
4. Navigate to **AI SRE** → **Integrations**
5. Click **...** menu on BUILD integration
6. Select **Debug**
7. Verify webhook appears with correct payload

### Test deploy webhook

1. Trigger deployment workflow
2. Check deployment job logs
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
  issue="CircleCI webhook not received in AI SRE"
  mode="docs"
  fallback="Confirm the environment variable AISRE_BUILD_WEBHOOK_URL or AISRE_DEPLOY_WEBHOOK_URL is configured, verify the curl command runs in the job logs, ensure CircleCI executors allow outbound HTTPS, and check the JSON payload for syntax errors. Test manually with curl -v -X POST against the webhook URL."
/>

<Troubleshoot
  issue="CircleCI deployments not linked to builds in AI SRE"
  mode="docs"
  fallback="Ensure services[].service in the deploy webhook exactly matches service.name in the build webhook, and services[].version exactly matches the build webhook version. Confirm both webhooks were sent successfully by checking the Debug view."
/>

<Troubleshoot
  issue="CircleCI shell variable interpolation issues in webhook JSON"
  mode="docs"
  fallback={"Shell variables may not expand in JSON. Use the quote pattern \"'\"$VARIABLE\"'\" for proper JSON escaping, for example \"service\": \"'\"$CIRCLE_PROJECT_REPONAME\"'\"."}
/>

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for complete setup instructions.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how the AI agent uses change detection during incidents.
- Go to [Configure Jenkins](/docs/ai-sre/change/sources/jenkins) for webhook setup in Jenkins pipelines.
