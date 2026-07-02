---
title: Configure GitHub Actions for Deploy Change Investigator
description: Configure GitHub Actions workflows to send build and deployment webhooks to Harness AI SRE
sidebar_label: GitHub Actions
sidebar_position: 3
---


Configure GitHub Actions workflows to send build and deployment data to the Deploy Change Investigator.

## Before you begin

- **Deploy Change Investigator setup**: Create build and deploy webhook integrations in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for setup instructions.
- **GitHub repository access**: Permission to edit workflows and add secrets.
- **Webhook URLs**: Copy the build and deploy webhook URLs from your AI SRE integrations.

---

## Store webhook URLs as secrets

Store webhook URLs securely in GitHub:

1. Navigate to your repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Create two secrets:
   - **Name:** `AISRE_BUILD_WEBHOOK_URL`
   - **Value:** Your build webhook URL from AI SRE
4. Click **Add secret**
5. Repeat for deploy webhook:
   - **Name:** `AISRE_DEPLOY_WEBHOOK_URL`
   - **Value:** Your deploy webhook URL from AI SRE

---

## Configure build webhooks

Add a webhook step to your build workflow **after** the artifact is published.

### Example: Docker build workflow

```yaml
name: Build and Push

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=sha,prefix={{branch}}-

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: Send build webhook to AI SRE
        if: success()
        run: |
          curl "${{ secrets.AISRE_BUILD_WEBHOOK_URL }}" \
            -s \
            -H "Content-Type: application/json" \
            -d '{
              "artifact": {
                "name": "${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}",
                "version": "${{ github.sha }}"
              },
              "source": {
                "commitSha": "${{ github.sha }}",
                "kind": "branch",
                "value": "${{ github.ref_name }}",
                "repository_url": "${{ github.server_url }}/${{ github.repository }}"
              },
              "service": {
                "name": "${{ github.event.repository.name }}",
                "version": "${{ github.sha }}"
              },
              "buildId": "${{ github.run_id }}"
            }'
```

### GitHub context variables

GitHub Actions provides these context variables automatically:

| Variable | Description | Example |
|----------|-------------|---------|
| `github.sha` | Full commit SHA | `ffac537e6cbbf934b08745a378932722df287a53` |
| `github.ref_name` | Branch or tag name | `main` |
| `github.repository` | Repository name | `org/repo` |
| `github.server_url` | GitHub server URL | `https://github.com` |
| `github.run_id` | Unique workflow run ID | `1234567890` |
| `github.actor` | User who triggered the workflow | `username` |
| `github.event.repository.name` | Repository name without org | `repo` |

---

## Configure deploy webhooks

Add a webhook step to your deployment workflow **after** the deployment completes.

### Example: Kubernetes deployment workflow

```yaml
name: Deploy to Production

on:
  workflow_run:
    workflows: ["Build and Push"]
    types: [completed]
    branches: [main]

env:
  KUBE_NAMESPACE: production
  SERVICE_NAME: myapp

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure kubectl
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG }}

      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/${{ env.SERVICE_NAME }} \
            ${{ env.SERVICE_NAME }}=ghcr.io/${{ github.repository }}:${{ github.sha }} \
            -n ${{ env.KUBE_NAMESPACE }}
          
          kubectl rollout status deployment/${{ env.SERVICE_NAME }} \
            -n ${{ env.KUBE_NAMESPACE }} \
            --timeout=5m

      - name: Send deploy webhook to AI SRE
        if: success()
        run: |
          curl "${{ secrets.AISRE_DEPLOY_WEBHOOK_URL }}" \
            -s \
            -H "Content-Type: application/json" \
            -d '{
              "services": [{
                "service": "${{ env.SERVICE_NAME }}",
                "version": "${{ github.sha }}"
              }],
              "environments": ["production"],
              "changeId": "${{ github.run_id }}",
              "status": "SUCCESS",
              "deployedBy": "${{ github.actor }}",
              "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
            }'

      - name: Send failure webhook to AI SRE
        if: failure()
        run: |
          curl "${{ secrets.AISRE_DEPLOY_WEBHOOK_URL }}" \
            -s \
            -H "Content-Type: application/json" \
            -d '{
              "services": [{
                "service": "${{ env.SERVICE_NAME }}",
                "version": "${{ github.sha }}"
              }],
              "environments": ["production"],
              "changeId": "${{ github.run_id }}",
              "status": "FAILURE",
              "deployedBy": "${{ github.actor }}",
              "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
            }'
```

### Multi-service deployments

For workflows that deploy multiple services:

```yaml
- name: Send deploy webhook to AI SRE
  if: success()
  run: |
    curl "${{ secrets.AISRE_DEPLOY_WEBHOOK_URL }}" \
      -s \
      -H "Content-Type: application/json" \
      -d '{
        "services": [
          {
            "service": "frontend",
            "version": "${{ needs.build-frontend.outputs.version }}"
          },
          {
            "service": "backend",
            "version": "${{ needs.build-backend.outputs.version }}"
          },
          {
            "service": "worker",
            "version": "${{ needs.build-worker.outputs.version }}"
          }
        ],
        "environments": ["production"],
        "changeId": "${{ github.run_id }}",
        "status": "SUCCESS",
        "deployedBy": "${{ github.actor }}",
        "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
      }'
```

---

## Using semantic versions

If you use semantic versioning instead of commit SHAs:

### With Docker metadata action

```yaml
- name: Extract metadata
  id: meta
  uses: docker/metadata-action@v5
  with:
    images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
    tags: |
      type=semver,pattern={{version}}
      type=semver,pattern={{major}}.{{minor}}

- name: Send build webhook to AI SRE
  if: success()
  env:
    VERSION: ${{ steps.meta.outputs.version }}
  run: |
    curl "${{ secrets.AISRE_BUILD_WEBHOOK_URL }}" \
      -s \
      -H "Content-Type: application/json" \
      -d '{
        "artifact": {
          "name": "${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}",
          "version": "'$VERSION'"
        },
        "source": {
          "commitSha": "${{ github.sha }}",
          "kind": "tag",
          "value": "${{ github.ref_name }}",
          "repository_url": "${{ github.server_url }}/${{ github.repository }}"
        },
        "service": {
          "name": "${{ github.event.repository.name }}",
          "version": "'$VERSION'"
        },
        "buildId": "${{ github.run_id }}"
      }'
```

---

## Critical mapping requirements

The Deploy Change Investigator requires exact matches between build and deploy data:

| Build webhook field | Deploy webhook field | Must match |
|---------------------|---------------------|------------|
| `service.name` | `services[].service` | ✅ Yes |
| `artifact.version` or `service.version` | `services[].version` | ✅ Yes |

:::danger Common mistakes
- **Version mismatch**: Build sends commit SHA, deploy sends semantic version → No match
- **Service name mismatch**: Build sends full repository name `org/repo`, deploy sends just `repo` → No match
- Use `${{ github.sha }}` in **both** build and deploy webhooks for consistency
:::

---

## Testing webhooks

### Test build webhook

1. Push a commit or create a PR to trigger your build workflow
2. Check the workflow run logs for the webhook curl command
3. Navigate to **AI SRE** → **Integrations**
4. Click the three-dot menu (**...**) on the BUILD integration
5. Select **Debug** to view received webhook events

### Test deploy webhook

1. Trigger a deployment workflow
2. Check the workflow logs for webhook execution
3. Navigate to **AI SRE** → **Integrations** → DEPLOY → **Debug**
4. Verify the deploy webhook appears with correct payload

### Verify the connection

After sending both build and deploy webhooks:

1. Navigate to **AI SRE** → **Change Management**
2. You should see deployment records linked to builds
3. Click into a deployment to see:
   - Artifact versions
   - Commit SHAs
   - Linked PRs

---

## Reusable workflow example

Create a reusable workflow to standardize webhook notifications across repositories:

### `.github/workflows/notify-aisre.yml`

```yaml
name: Notify AI SRE

on:
  workflow_call:
    inputs:
      webhook_type:
        required: true
        type: string
        description: 'build or deploy'
      service_name:
        required: true
        type: string
      service_version:
        required: true
        type: string
      environment:
        required: false
        type: string
        default: 'production'
    secrets:
      WEBHOOK_URL:
        required: true

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send build webhook
        if: inputs.webhook_type == 'build'
        run: |
          curl "${{ secrets.WEBHOOK_URL }}" \
            -s \
            -H "Content-Type: application/json" \
            -d '{
              "artifact": {
                "name": "ghcr.io/${{ github.repository }}",
                "version": "${{ inputs.service_version }}"
              },
              "source": {
                "commitSha": "${{ github.sha }}",
                "kind": "branch",
                "value": "${{ github.ref_name }}",
                "repository_url": "${{ github.server_url }}/${{ github.repository }}"
              },
              "service": {
                "name": "${{ inputs.service_name }}",
                "version": "${{ inputs.service_version }}"
              },
              "buildId": "${{ github.run_id }}"
            }'

      - name: Send deploy webhook
        if: inputs.webhook_type == 'deploy'
        run: |
          curl "${{ secrets.WEBHOOK_URL }}" \
            -s \
            -H "Content-Type: application/json" \
            -d '{
              "services": [{
                "service": "${{ inputs.service_name }}",
                "version": "${{ inputs.service_version }}"
              }],
              "environments": ["${{ inputs.environment }}"],
              "changeId": "${{ github.run_id }}",
              "status": "SUCCESS",
              "deployedBy": "${{ github.actor }}",
              "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
            }'
```

### Call the reusable workflow

```yaml
jobs:
  build:
    # ... build steps ...
    
  notify-build:
    needs: build
    uses: ./.github/workflows/notify-aisre.yml
    with:
      webhook_type: build
      service_name: myapp
      service_version: ${{ github.sha }}
    secrets:
      WEBHOOK_URL: ${{ secrets.AISRE_BUILD_WEBHOOK_URL }}
```

---

## Troubleshooting

### Build webhook not received

**Check:**
- Webhook URL secret is correctly configured in repository settings
- Curl command is executed (check workflow logs)
- Network connectivity allows outbound HTTPS from GitHub Actions runners
- JSON payload has no syntax errors

### Deploy webhook received but changes not showing

**Verify:**
- `services[].service` in deploy webhook exactly matches `service.name` in build webhook
- `services[].version` in deploy webhook exactly matches `artifact.version` or `service.version` in build webhook
- Both webhooks have been sent (check Debug view for both integrations)

### Workflow fails at webhook step

**Common causes:**
- Secret not configured or misspelled
- JSON syntax error in curl payload
- Date command not available (use `date -u +%Y-%m-%dT%H:%M:%SZ`)

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for the complete setup guide.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how change detection works during incidents.
- Go to [Configure Jenkins](#) for webhook setup in Jenkins pipelines.
