---
title: Configure Jenkins for Deploy Change Investigator
description: Configure Jenkins pipelines to send build and deployment webhooks to Harness AI SRE
sidebar_label: Jenkins
sidebar_position: 2
---

Configure Jenkins pipelines to send build and deployment data to the Deploy Change Investigator using shell scripts.

## Before you begin

- **Deploy Change Investigator setup**: Create build and deploy webhook integrations in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for setup instructions.
- **Jenkins pipeline access**: Permission to edit Jenkinsfile or add build steps.
- **Webhook URLs**: Copy the build and deploy webhook URLs from your AI SRE integrations.
- **Git plugin**: Ensure Jenkins Git plugin is installed for commit SHA access.

:::info Why Jenkins needs scripts
Jenkins does not have native webhook notification support like GitHub Actions or GitLab CI. Use shell scripts with `curl` to send webhook POST requests at the end of build and deploy stages.
:::

---

## Configure build webhooks

Add a shell script step to your Jenkins build pipeline that runs **after** the artifact is published.

### Declarative pipeline

Add this step to your `post` section or as the last step in your build stage:

```groovy
pipeline {
    agent any
    
    environment {
        BUILD_WEBHOOK_URL = credentials('aisre-build-webhook-url')
        ARTIFACT_REGISTRY = 'docker.example.com'
        SERVICE_NAME = 'myapp'
    }
    
    stages {
        stage('Build') {
            steps {
                // Your build steps here
                sh 'docker build -t ${ARTIFACT_REGISTRY}/${SERVICE_NAME}:${BUILD_NUMBER} .'
                sh 'docker push ${ARTIFACT_REGISTRY}/${SERVICE_NAME}:${BUILD_NUMBER}'
            }
        }
    }
    
    post {
        success {
            script {
                sh '''#!/bin/bash
                    json_payload="{\
                    \\"artifact\\": {\\"name\\": \\"${ARTIFACT_REGISTRY}/${SERVICE_NAME}\\", \\"version\\": \\"${BUILD_NUMBER}\\"},\
                    \\"source\\": {\
                    \\"commitSha\\": \\"${GIT_COMMIT}\\",\
                    \\"kind\\": \\"branch\\",\
                    \\"value\\": \\"${GIT_BRANCH}\\",\
                    \\"repository_url\\": \\"${GIT_URL}\\"},\
                    \\"service\\": {\\"name\\": \\"${SERVICE_NAME}\\", \\"version\\": \\"${BUILD_NUMBER}\\"},\
                    \\"buildId\\": \\"${BUILD_ID}\\"}"
                    
                    curl "${BUILD_WEBHOOK_URL}" \\
                      -s \\
                      -H "Content-Type: application/json" \\
                      -d "${json_payload}"
                '''
            }
        }
    }
}
```

### Scripted pipeline

```groovy
node {
    def artifactRegistry = 'docker.example.com'
    def serviceName = 'myapp'
    def buildWebhookUrl = env.BUILD_WEBHOOK_URL
    
    stage('Build') {
        // Your build steps
        sh "docker build -t ${artifactRegistry}/${serviceName}:${BUILD_NUMBER} ."
        sh "docker push ${artifactRegistry}/${serviceName}:${BUILD_NUMBER}"
    }
    
    stage('Notify Build Complete') {
        sh """#!/bin/bash
            json_payload="{\
            \\"artifact\\": {\\"name\\": \\"${artifactRegistry}/${serviceName}\\", \\"version\\": \\"${BUILD_NUMBER}\\"},\
            \\"source\\": {\
            \\"commitSha\\": \\"${GIT_COMMIT}\\",\
            \\"kind\\": \\"branch\\",\
            \\"value\\": \\"${GIT_BRANCH}\\",\
            \\"repository_url\\": \\"${GIT_URL}\\"},\
            \\"service\\": {\\"name\\": \\"${serviceName}\\", \\"version\\": \\"${BUILD_NUMBER}\\"},\
            \\"buildId\\": \\"${BUILD_ID}\\"}"
            
            curl "${buildWebhookUrl}" \\
              -s \\
              -H "Content-Type: application/json" \\
              -d "\${json_payload}"
        """
    }
}
```

### Environment variables reference

Jenkins provides these environment variables automatically:

- **GIT_COMMIT** - Full SHA of the commit being built
- **GIT_BRANCH** - Branch name (e.g., `origin/main`)
- **GIT_URL** - Git repository URL
- **BUILD_ID** - Unique Jenkins build ID
- **BUILD_NUMBER** - Sequential build number

**Custom variables to set:**

- **BUILD_WEBHOOK_URL** - Store as Jenkins credential (Secret text)
- **ARTIFACT_REGISTRY** - Your Docker/artifact registry URL
- **SERVICE_NAME** - Service identifier

---

## Configure deploy webhooks

Add a shell script step to your Jenkins deployment pipeline that runs **after** the deployment completes.

### Declarative pipeline

```groovy
pipeline {
    agent any
    
    environment {
        DEPLOY_WEBHOOK_URL = credentials('aisre-deploy-webhook-url')
        SERVICE_NAME = 'myapp'
        SERVICE_VERSION = '1.2.3'  // Pass from build job
        DEPLOY_ENV = 'production'
    }
    
    stages {
        stage('Deploy') {
            steps {
                // Your deployment steps here
                sh 'kubectl set image deployment/${SERVICE_NAME} ${SERVICE_NAME}=${ARTIFACT_REGISTRY}/${SERVICE_NAME}:${SERVICE_VERSION}'
            }
        }
    }
    
    post {
        success {
            script {
                sh '''#!/bin/bash
                    json_payload="{\
                    \\"services\\": [{\\"service\\": \\"${SERVICE_NAME}\\", \\"version\\": \\"${SERVICE_VERSION}\\"}],\
                    \\"environments\\": [\\"${DEPLOY_ENV}\\"],\
                    \\"changeId\\": \\"${BUILD_ID}\\",\
                    \\"status\\": \\"SUCCESS\\",\
                    \\"deployedBy\\": \\"${BUILD_USER}\\",\
                    \\"deployTimestamp\\": \\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\\"}"
                    
                    curl "${DEPLOY_WEBHOOK_URL}" \\
                      -s \\
                      -H "Content-Type: application/json" \\
                      -d "${json_payload}"
                '''
            }
        }
        failure {
            script {
                sh '''#!/bin/bash
                    json_payload="{\
                    \\"services\\": [{\\"service\\": \\"${SERVICE_NAME}\\", \\"version\\": \\"${SERVICE_VERSION}\\"}],\
                    \\"environments\\": [\\"${DEPLOY_ENV}\\"],\
                    \\"changeId\\": \\"${BUILD_ID}\\",\
                    \\"status\\": \\"FAILURE\\",\
                    \\"deployedBy\\": \\"${BUILD_USER}\\",\
                    \\"deployTimestamp\\": \\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\\"}"
                    
                    curl "${DEPLOY_WEBHOOK_URL}" \\
                      -s \\
                      -H "Content-Type: application/json" \\
                      -d "${json_payload}"
                '''
            }
        }
    }
}
```

### Multi-service deployments

For deployments that update multiple services:

```groovy
post {
    success {
        script {
            sh '''#!/bin/bash
                json_payload="{\
                \\"services\\": [\
                {\\"service\\": \\"frontend\\", \\"version\\": \\"${FRONTEND_VERSION}\\"},\
                {\\"service\\": \\"backend\\", \\"version\\": \\"${BACKEND_VERSION}\\"},\
                {\\"service\\": \\"worker\\", \\"version\\": \\"${WORKER_VERSION}\\"}\
                ],\
                \\"environments\\": [\\"${DEPLOY_ENV}\\"],\
                \\"changeId\\": \\"${BUILD_ID}\\",\
                \\"status\\": \\"SUCCESS\\",\
                \\"deployedBy\\": \\"${BUILD_USER}\\",\
                \\"deployTimestamp\\": \\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\\"}"
                
                curl "${DEPLOY_WEBHOOK_URL}" \\
                  -s \\
                  -H "Content-Type: application/json" \\
                  -d "${json_payload}"
            '''
        }
    }
}
```

---

## Store webhook URLs as credentials

Store webhook URLs securely in Jenkins:

1. Navigate to **Manage Jenkins** → **Credentials**
2. Select the appropriate domain (usually `(global)`)
3. Click **Add Credentials**
4. Configure:
   - **Kind:** Secret text
   - **Secret:** Paste your build or deploy webhook URL
   - **ID:** `aisre-build-webhook-url` or `aisre-deploy-webhook-url`
   - **Description:** "AI SRE Build Webhook URL" or "AI SRE Deploy Webhook URL"
5. Click **OK**

Reference credentials in Jenkinsfile:

```groovy
environment {
    BUILD_WEBHOOK_URL = credentials('aisre-build-webhook-url')
    DEPLOY_WEBHOOK_URL = credentials('aisre-deploy-webhook-url')
}
```

---

## Critical mapping requirements

The Deploy Change Investigator requires exact matches between build and deploy data:

| Build webhook field | Deploy webhook field | Must match |
|---------------------|---------------------|------------|
| `service.name` | `services[].service` | ✅ Yes |
| `artifact.version` or `service.version` | `services[].version` | ✅ Yes |

:::danger Common mistakes
- **Version mismatch**: Build sends `1.2.3`, deploy sends `v1.2.3` → No match
- **Service name mismatch**: Build sends `myapp`, deploy sends `my-app` → No match
- **Using different identifiers**: Ensure BUILD_NUMBER or version tag is consistent across both webhooks
:::

---

## Testing webhooks

### Test build webhook

1. Trigger a Jenkins build that includes the webhook script
2. Check Jenkins console output for curl command execution
3. Navigate to **AI SRE** → **Integrations**
4. Click the three-dot menu (**...**) on the BUILD integration
5. Select **Debug** to view received webhook events

### Test deploy webhook

1. Trigger a deployment pipeline
2. Verify curl command runs in console output
3. Check **AI SRE** → **Integrations** → DEPLOY → **Debug**

### Verify the connection

After sending both build and deploy webhooks:

1. Navigate to **AI SRE** → **Change Management**
2. You should see deployment records linked to builds
3. Click into a deployment to see:
   - Artifact versions
   - Commit SHAs
   - Linked PRs

---

## Troubleshooting

### Build webhook not received

**Check:**
- Curl command is executed (visible in Jenkins console log)
- Webhook URL is correct (check credentials)
- Network connectivity allows outbound HTTPS from Jenkins agents
- JSON payload has no syntax errors (test with `-v` flag on curl)

### Deploy webhook received but changes not showing

**Verify:**
- `services[].service` in deploy webhook exactly matches `service.name` in build webhook
- `services[].version` in deploy webhook exactly matches `artifact.version` or `service.version` in build webhook
- Both webhooks have been sent (check Debug view for both integrations)

### Getting BUILD_USER variable

Jenkins does not provide `BUILD_USER` by default. Install the [Build User Vars Plugin](https://plugins.jenkins.io/build-user-vars-plugin/) to get:

- **BUILD_USER** - Username of build initiator
- **BUILD_USER_EMAIL** - Email of build initiator
- **BUILD_USER_ID** - User ID

Alternatively, use `${BUILD_CAUSE}` or hardcode a service account name.

---

## Example: Complete Jenkins pipeline

Here's a complete example with both build and deploy webhooks:

```groovy
pipeline {
    agent any
    
    environment {
        BUILD_WEBHOOK_URL = credentials('aisre-build-webhook-url')
        DEPLOY_WEBHOOK_URL = credentials('aisre-deploy-webhook-url')
        ARTIFACT_REGISTRY = 'docker.example.com'
        SERVICE_NAME = 'myapp'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t ${ARTIFACT_REGISTRY}/${SERVICE_NAME}:${BUILD_NUMBER} .'
                sh 'docker push ${ARTIFACT_REGISTRY}/${SERVICE_NAME}:${BUILD_NUMBER}'
            }
            post {
                success {
                    sh '''#!/bin/bash
                        json_payload="{\
                        \\"artifact\\": {\\"name\\": \\"${ARTIFACT_REGISTRY}/${SERVICE_NAME}\\", \\"version\\": \\"${BUILD_NUMBER}\\"},\
                        \\"source\\": {\
                        \\"commitSha\\": \\"${GIT_COMMIT}\\",\
                        \\"kind\\": \\"branch\\",\
                        \\"value\\": \\"${GIT_BRANCH}\\",\
                        \\"repository_url\\": \\"${GIT_URL}\\"},\
                        \\"service\\": {\\"name\\": \\"${SERVICE_NAME}\\", \\"version\\": \\"${BUILD_NUMBER}\\"},\
                        \\"buildId\\": \\"${BUILD_ID}\\"}"
                        
                        curl "${BUILD_WEBHOOK_URL}" -s -H "Content-Type: application/json" -d "${json_payload}"
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'kubectl set image deployment/${SERVICE_NAME} ${SERVICE_NAME}=${ARTIFACT_REGISTRY}/${SERVICE_NAME}:${BUILD_NUMBER}'
            }
            post {
                always {
                    script {
                        def status = currentBuild.currentResult == 'SUCCESS' ? 'SUCCESS' : 'FAILURE'
                        sh """#!/bin/bash
                            json_payload="{\
                            \\"services\\": [{\\"service\\": \\"${SERVICE_NAME}\\", \\"version\\": \\"${BUILD_NUMBER}\\"}],\
                            \\"environments\\": [\\"production\\"],\
                            \\"changeId\\": \\"${BUILD_ID}\\",\
                            \\"status\\": \\"${status}\\",\
                            \\"deployedBy\\": \\"jenkins\\",\
                            \\"deployTimestamp\\": \\"\$(date -u +%Y-%m-%dT%H:%M:%SZ)\\"}"
                            
                            curl "${DEPLOY_WEBHOOK_URL}" -s -H "Content-Type: application/json" -d "\${json_payload}"
                        """
                    }
                }
            }
        }
    }
}
```

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for the complete setup guide.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how change detection works during incidents.
- Go to [Configure GitHub Actions](#) for webhook setup in GitHub Actions workflows.
