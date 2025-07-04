---
title: Jenkins Integration
description: Run chaos experiments as Jenkins pipeline steps
sidebar_position: 4
---

# Jenkins Integration

This guide explains how to integrate Harness Chaos Engineering with Jenkins to run chaos experiments as part of your CI/CD pipelines.

## Overview

Jenkins integration enables you to:
- **Pipeline Integration**: Add chaos experiments as pipeline stages
- **Automated Testing**: Run experiments on every build or deployment
- **Conditional Execution**: Run experiments based on branch, environment, or other conditions
- **Result-Based Actions**: Trigger rollbacks or notifications based on resilience scores

## Prerequisites

Before you begin, ensure you have:
- A Jenkins instance with pipeline capabilities
- A Harness Chaos Engineering account with appropriate permissions
- A chaos experiment created and tested in Harness CE
- Harness API key for authentication
- Jenkins plugins: Pipeline, Credentials Binding (recommended)

## Setup Instructions

### Step 1: Get Required Information

Extract the following details from your Harness session URL:
```
https://app.harness.io/ng/#/account/**ACCOUNT_ID**/chaos/orgs/default/projects/**PROJECT_ID**/experiments/**EXPERIMENT_ID**
```

The strings marked with asterisks are your account ID, project ID, and chaos experiment ID respectively.

### Step 2: Configure Jenkins Credentials

Set up the following credentials in Jenkins (Manage Jenkins > Manage Credentials):

1. **Secret Text** for `HARNESS_API_KEY`: Your Harness API key
2. **String Parameters** for other configuration values (or use environment variables)

### Step 3: Create Launch Script

Create a `scripts/launch-chaos.sh` file in your repository:

```bash
#!/bin/bash
set -e

# Download and setup HCE CLI
curl -sL https://storage.googleapis.com/hce-api/hce-api-linux-amd64 -o hce-cli
chmod +x hce-cli

# Launch chaos experiment and capture notification ID
output=$(./hce-cli generate --api launch-experiment \
  --account-id=${HARNESS_ACCOUNT_ID} \
  --project-id=${HARNESS_PROJECT_ID} \
  --workflow-id=${HARNESS_EXPERIMENT_ID} \
  --api-key=${HARNESS_API_KEY} \
  --file-name hce-api.sh | jq -r '.data.runChaosExperiment.notifyID')

echo ${output}
```

### Step 4: Create Monitoring Script

Create a `scripts/monitor-chaos.sh` file:

```bash
#!/bin/bash
set -e

NOTIFY_ID=$1
if [ -z "$NOTIFY_ID" ]; then
  echo "Error: Notification ID is required"
  exit 1
fi

echo "Monitoring chaos experiment with ID: $NOTIFY_ID"

# Wait for experiment completion (implement your monitoring logic)
# This is a simplified example - you may want to add more sophisticated monitoring
sleep 60

echo "Chaos experiment monitoring completed"
```

### Step 5: Create Resilience Score Verification Script

Create a `scripts/verify-resilience-score.sh` file:

```bash
#!/bin/bash
set -e

NOTIFY_ID=$1
if [ -z "$NOTIFY_ID" ]; then
  echo "Error: Notification ID is required"
  exit 1
fi

# Download HCE CLI if not already available
if [ ! -f "./hce-cli" ]; then
  curl -sL https://storage.googleapis.com/hce-api/hce-api-linux-amd64 -o hce-cli
  chmod +x hce-cli
fi

# Get resilience score
resiliencyScore=$(./hce-cli generate --api validate-resilience-score \
  --account-id=${HARNESS_ACCOUNT_ID} \
  --project-id=${HARNESS_PROJECT_ID} \
  --notifyID=${NOTIFY_ID} \
  --api-key=${HARNESS_API_KEY} \
  --file-name hce-api.sh)

echo "${resiliencyScore}"
```

### Step 6: Configure Jenkins Pipeline

Create a Jenkinsfile in your repository:

```groovy
pipeline {
    agent any
    
    environment {
        HARNESS_ACCOUNT_ID = 'your-account-id'
        HARNESS_PROJECT_ID = 'your-project-id'
        HARNESS_EXPERIMENT_ID = 'your-experiment-id'
        EXPECTED_RESILIENCE_SCORE = '100'
    }
    
    stages {
        stage('Build') {
            steps {
                echo 'Building application...'
                // Add your build steps here
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add your test steps here
            }
        }
        
        stage('Launch Chaos Experiment') {
            steps {
                withCredentials([string(credentialsId: 'harness-api-key', variable: 'HARNESS_API_KEY')]) {
                    script {
                        // Make scripts executable
                        sh 'chmod +x scripts/*.sh'
                        
                        // Launch chaos experiment
                        def notifyId = sh(
                            script: 'sh scripts/launch-chaos.sh',
                            returnStdout: true
                        ).trim()
                        
                        echo "Chaos experiment launched with ID: ${notifyId}"
                        env.CHAOS_NOTIFY_ID = notifyId
                    }
                }
            }
        }
        
        stage('Monitor Chaos Experiment') {
            steps {
                withCredentials([string(credentialsId: 'harness-api-key', variable: 'HARNESS_API_KEY')]) {
                    script {
                        sh "sh scripts/monitor-chaos.sh ${env.CHAOS_NOTIFY_ID}"
                    }
                }
            }
        }
        
        stage('Verify Resilience Score') {
            steps {
                withCredentials([string(credentialsId: 'harness-api-key', variable: 'HARNESS_API_KEY')]) {
                    script {
                        def resilienceScore = sh(
                            script: "sh scripts/verify-resilience-score.sh ${env.CHAOS_NOTIFY_ID}",
                            returnStdout: true
                        ).trim().replaceAll('"', '')
                        
                        echo "Obtained Resilience Score: ${resilienceScore}"
                        env.ACTUAL_RESILIENCE_SCORE = resilienceScore
                        
                        // Compare with expected score
                        if (resilienceScore.toInteger() < env.EXPECTED_RESILIENCE_SCORE.toInteger()) {
                            error("Resilience score ${resilienceScore} is below expected ${env.EXPECTED_RESILIENCE_SCORE}")
                        } else {
                            echo "Resilience score meets expectations"
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                expression { 
                    return env.ACTUAL_RESILIENCE_SCORE?.toInteger() >= env.EXPECTED_RESILIENCE_SCORE.toInteger()
                }
            }
            steps {
                echo 'Deploying application...'
                // Add your deployment steps here
            }
        }
    }
    
    post {
        failure {
            script {
                if (env.ACTUAL_RESILIENCE_SCORE?.toInteger() < env.EXPECTED_RESILIENCE_SCORE.toInteger()) {
                    echo 'Chaos experiment failed - initiating rollback...'
                    sh 'sh scripts/rollback-deploy.sh ${ACTUAL_RESILIENCE_SCORE}'
                }
            }
        }
        always {
            // Archive chaos experiment results
            archiveArtifacts artifacts: 'chaos-results.log', allowEmptyArchive: true
            
            // Clean up temporary files
            sh 'rm -f hce-cli hce-api.sh'
        }
    }
}
```

## Advanced Pipeline Configurations

### Declarative Pipeline with Parameters

```groovy
pipeline {
    agent any
    
    parameters {
        choice(
            name: 'CHAOS_EXPERIMENT',
            choices: ['pod-delete', 'network-latency', 'cpu-stress'],
            description: 'Select chaos experiment to run'
        )
        string(
            name: 'EXPECTED_SCORE',
            defaultValue: '100',
            description: 'Expected resilience score'
        )
        booleanParam(
            name: 'SKIP_CHAOS',
            defaultValue: false,
            description: 'Skip chaos testing'
        )
    }
    
    stages {
        stage('Chaos Testing') {
            when {
                not { params.SKIP_CHAOS }
            }
            steps {
                script {
                    def experimentId = getExperimentId(params.CHAOS_EXPERIMENT)
                    runChaosExperiment(experimentId, params.EXPECTED_SCORE)
                }
            }
        }
    }
}

def getExperimentId(experimentType) {
    def experimentIds = [
        'pod-delete': 'exp-pod-delete-123',
        'network-latency': 'exp-network-latency-456',
        'cpu-stress': 'exp-cpu-stress-789'
    ]
    return experimentIds[experimentType]
}

def runChaosExperiment(experimentId, expectedScore) {
    withCredentials([string(credentialsId: 'harness-api-key', variable: 'HARNESS_API_KEY')]) {
        env.HARNESS_EXPERIMENT_ID = experimentId
        env.EXPECTED_RESILIENCE_SCORE = expectedScore
        
        sh 'sh scripts/launch-chaos.sh > notify_id.txt'
        def notifyId = readFile('notify_id.txt').trim()
        
        sh "sh scripts/monitor-chaos.sh ${notifyId}"
        
        sh "sh scripts/verify-resilience-score.sh ${notifyId} > resilience_score.txt"
        def score = readFile('resilience_score.txt').trim().replaceAll('"', '')
        
        if (score.toInteger() < expectedScore.toInteger()) {
            error("Resilience score ${score} below expected ${expectedScore}")
        }
    }
}
```

### Multi-Branch Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Chaos Testing') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    branch 'PR-*'
                }
            }
            steps {
                script {
                    def experimentConfig = getChaosConfig(env.BRANCH_NAME)
                    runChaosExperiment(experimentConfig)
                }
            }
        }
    }
}

def getChaosConfig(branchName) {
    switch(branchName) {
        case 'main':
            return [
                experimentId: 'production-experiment',
                expectedScore: 95,
                timeout: 600
            ]
        case 'develop':
            return [
                experimentId: 'staging-experiment',
                expectedScore: 85,
                timeout: 300
            ]
        case ~/PR-.*/:
            return [
                experimentId: 'pr-validation-experiment',
                expectedScore: 80,
                timeout: 180
            ]
        default:
            return null
    }
}
```

### Parallel Chaos Testing

```groovy
pipeline {
    agent any
    
    stages {
        stage('Parallel Chaos Tests') {
            parallel {
                stage('Network Chaos') {
                    steps {
                        script {
                            runChaosExperiment('network-latency-exp', '90')
                        }
                    }
                }
                stage('CPU Chaos') {
                    steps {
                        script {
                            runChaosExperiment('cpu-stress-exp', '85')
                        }
                    }
                }
                stage('Memory Chaos') {
                    steps {
                        script {
                            runChaosExperiment('memory-stress-exp', '80')
                        }
                    }
                }
            }
        }
    }
}
```

## Integration with Jenkins Plugins

### Blue Ocean Integration

```groovy
pipeline {
    agent any
    
    stages {
        stage('Chaos Testing') {
            steps {
                script {
                    // Blue Ocean compatible step
                    def result = runChaosExperiment()
                    
                    // Add Blue Ocean specific annotations
                    if (result.success) {
                        echo "✅ Chaos experiment passed with score: ${result.score}"
                    } else {
                        echo "❌ Chaos experiment failed with score: ${result.score}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
```

### Email Notifications

```groovy
post {
    failure {
        emailext (
            subject: "Chaos Experiment Failed - ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            body: """
                Chaos experiment failed for build ${env.BUILD_NUMBER}.
                
                Resilience Score: ${env.ACTUAL_RESILIENCE_SCORE}
                Expected Score: ${env.EXPECTED_RESILIENCE_SCORE}
                
                Build URL: ${env.BUILD_URL}
            """,
            to: "${env.CHANGE_AUTHOR_EMAIL}",
            attachLog: true
        )
    }
}
```

### Slack Notifications

```groovy
post {
    always {
        script {
            def color = currentBuild.result == 'SUCCESS' ? 'good' : 'danger'
            def message = """
                Chaos Experiment Result: ${currentBuild.result}
                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}
                Resilience Score: ${env.ACTUAL_RESILIENCE_SCORE}/${env.EXPECTED_RESILIENCE_SCORE}
            """
            
            slackSend(
                color: color,
                message: message,
                channel: '#chaos-engineering'
            )
        }
    }
}
```

## Best Practices

### Security
- **Use Jenkins Credentials** for sensitive information
- Limit credential scope to specific jobs
- Regularly rotate API keys
- Use least privilege principle for Jenkins service accounts

### Performance
- **Cache CLI downloads** between builds
- Use appropriate timeouts for experiments
- Run experiments in parallel when possible
- Consider using Jenkins agents with sufficient resources

### Reliability
- **Implement retry logic** for transient failures
- Set appropriate experiment timeouts
- Use conditional execution for different branches
- Monitor pipeline success rates

### Monitoring
- **Archive experiment results** for analysis
- Set up notifications for failed experiments
- Track resilience scores over time
- Integrate with monitoring systems

## Troubleshooting

### Common Issues

#### Credentials Not Found
```
Error: Could not find credentials with ID 'harness-api-key'
```
**Solution**: Ensure credentials are properly configured in Jenkins

#### Script Permission Denied
```
Error: Permission denied: scripts/launch-chaos.sh
```
**Solution**: Make scripts executable in pipeline:
```groovy
sh 'chmod +x scripts/*.sh'
```

#### Build Timeout
```
Error: Build timed out (after 10 minutes)
```
**Solution**: Increase build timeout or optimize experiment duration

#### JSON Parsing Error
```
Error: Expecting value: line 1 column 1 (char 0)
```
**Solution**: Ensure API responses are valid JSON and jq is available

### Debugging Tips

1. **Enable verbose logging**:
   ```groovy
   sh 'set -x; sh scripts/launch-chaos.sh'
   ```

2. **Add debug output**:
   ```groovy
   echo "Debug: HARNESS_EXPERIMENT_ID = ${env.HARNESS_EXPERIMENT_ID}"
   echo "Debug: API Response = ${apiResponse}"
   ```

3. **Use try-catch blocks**:
   ```groovy
   try {
       runChaosExperiment()
   } catch (Exception e) {
       echo "Chaos experiment failed: ${e.getMessage()}"
       currentBuild.result = 'FAILURE'
   }
   ```

## Demo Repository

For a complete example, check out the [Jenkins demo repository](https://github.com/ksatchit/hce-jenkins-integration-demo) which includes:
- Complete Jenkinsfile configuration
- All necessary scripts
- Example chaos experiments
- Best practices implementation

## Next Steps

- Explore Jenkins advanced features like shared libraries
- Integrate with other Jenkins plugins (SonarQube, Artifactory, etc.)
- Set up comprehensive monitoring and alerting
- Implement chaos testing in your release process
- Consider using Jenkins Configuration as Code (JCasC)

For more information, see the [Jenkins Pipeline documentation](https://www.jenkins.io/doc/book/pipeline/) and [Harness CE CLI reference](/docs/chaos-engineering-new/reference/cli-reference).
