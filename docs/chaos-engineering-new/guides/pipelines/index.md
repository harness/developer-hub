---
title: Pipelines
description: Integrate chaos engineering into your CI/CD workflows and automation pipelines
sidebar_position: 1
---

# Pipelines

Integrating chaos engineering into your CI/CD pipelines enables continuous resilience testing, ensuring that every deployment is validated for fault tolerance. This approach shifts chaos testing left in the development lifecycle and builds resilience into your delivery process.

## Why Chaos in Pipelines?

### Continuous Validation
- **Every deployment tested**: Validate resilience with each release
- **Early failure detection**: Catch resilience issues before production
- **Regression prevention**: Ensure new code doesn't break fault tolerance
- **Confidence building**: Deploy with greater confidence in system resilience

### Shift-Left Approach
- **Development integration**: Test resilience during development
- **Staging validation**: Comprehensive testing in staging environments
- **Pre-production gates**: Block deployments that fail resilience tests
- **Production readiness**: Ensure systems are production-ready

### Automation Benefits
- **Consistent testing**: Standardized resilience validation across teams
- **Reduced manual effort**: Automated experiment execution and analysis
- **Faster feedback**: Quick identification of resilience issues
- **Scalable testing**: Test multiple services and environments simultaneously

## Pipeline Integration Patterns

### Pre-Deployment Testing
Run chaos experiments before deploying to production:

```yaml
# Example: GitHub Actions workflow
name: Chaos Testing Pipeline
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  chaos-testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Deploy to staging
        run: |
          kubectl apply -f k8s/staging/
          kubectl wait --for=condition=ready pod -l app=web-service
          
      - name: Run chaos experiments
        uses: harness/chaos-action@v1
        with:
          experiment-name: "pre-deployment-resilience"
          target-environment: "staging"
          chaos-config: ".chaos/pre-deployment.yaml"
          
      - name: Validate results
        run: |
          if [ "${{ steps.chaos.outputs.resilience-score }}" -lt "80" ]; then
            echo "Resilience score too low: ${{ steps.chaos.outputs.resilience-score }}"
            exit 1
          fi
```

### Post-Deployment Validation
Validate resilience after production deployment:

```yaml
# Example: Jenkins pipeline
pipeline {
    agent any
    
    stages {
        stage('Deploy to Production') {
            steps {
                script {
                    // Deploy application
                    sh 'helm upgrade --install app ./helm-chart'
                    
                    // Wait for deployment to stabilize
                    sh 'kubectl rollout status deployment/app'
                }
            }
        }
        
        stage('Post-Deployment Chaos Testing') {
            steps {
                script {
                    // Run lightweight chaos experiments
                    def chaosResult = sh(
                        script: 'harness-chaos run --experiment post-deploy-validation',
                        returnStatus: true
                    )
                    
                    if (chaosResult != 0) {
                        error("Post-deployment chaos testing failed")
                    }
                }
            }
        }
        
        stage('Production Health Check') {
            steps {
                script {
                    // Validate system health after chaos testing
                    sh 'curl -f https://api.example.com/health'
                }
            }
        }
    }
    
    post {
        failure {
            // Rollback on failure
            sh 'helm rollback app'
        }
    }
}
```

### Continuous Resilience Testing
Run ongoing chaos experiments in production:

```yaml
# Example: GitLab CI scheduled pipeline
chaos-continuous:
  stage: chaos-testing
  rules:
    - if: $CI_PIPELINE_SOURCE == "schedule"
  script:
    - |
      # Run daily chaos experiments
      harness-chaos run \
        --experiment daily-resilience-check \
        --environment production \
        --schedule "0 2 * * *"  # Run at 2 AM daily
        
    - |
      # Generate resilience report
      harness-chaos report \
        --format html \
        --output resilience-report.html
        
  artifacts:
    reports:
      junit: chaos-results.xml
    paths:
      - resilience-report.html
    expire_in: 30 days
```

## Pipeline Experiment Types

### Lightweight Experiments
Quick tests suitable for frequent execution:

```yaml
# Fast validation experiments
lightweight_experiments:
  - name: "pod-restart-test"
    duration: "2m"
    fault: "pod-delete"
    target: "single-pod"
    success_criteria:
      - "service-availability > 99%"
      - "response-time < 500ms"
      
  - name: "network-blip-test"
    duration: "30s"
    fault: "network-latency"
    parameters:
      latency: "100ms"
    success_criteria:
      - "error-rate < 1%"
      - "timeout-rate < 0.1%"
```

### Comprehensive Experiments
Thorough testing for major releases:

```yaml
# Comprehensive resilience validation
comprehensive_experiments:
  - name: "multi-service-failure"
    duration: "15m"
    faults:
      - type: "database-unavailability"
        duration: "5m"
      - type: "cache-failure"
        duration: "3m"
        delay: "2m"
    success_criteria:
      - "user-journey-completion > 95%"
      - "data-consistency maintained"
      - "recovery-time < 2m"
      
  - name: "resource-exhaustion"
    duration: "10m"
    faults:
      - type: "cpu-stress"
        intensity: "80%"
      - type: "memory-pressure"
        intensity: "90%"
    success_criteria:
      - "auto-scaling triggered"
      - "performance-degradation < 20%"
```

### Environment-Specific Tests
Tailored experiments for different environments:

```yaml
# Environment-specific configurations
environments:
  staging:
    experiments:
      - "full-service-failure"
      - "database-failover"
      - "network-partition"
    blast_radius: "100%"  # Can affect entire staging environment
    
  production:
    experiments:
      - "single-pod-failure"
      - "minor-network-delay"
      - "cache-eviction"
    blast_radius: "10%"   # Limit impact in production
    time_windows:
      - "02:00-04:00 UTC"  # Low traffic hours only
```

## Pipeline Configuration

### Harness Pipeline Integration
Native integration with Harness CI/CD:

```yaml
# Harness pipeline with chaos engineering stage
pipeline:
  name: "Application Deployment with Chaos Testing"
  identifier: "app-deploy-chaos"
  
  stages:
    - stage:
        name: "Build and Test"
        type: "CI"
        spec:
          steps:
            - step:
                name: "Build Application"
                type: "Run"
                spec:
                  command: "docker build -t app:${BUILD_NUMBER} ."
                  
    - stage:
        name: "Deploy to Staging"
        type: "Deployment"
        spec:
          service: "web-application"
          environment: "staging"
          
    - stage:
        name: "Chaos Engineering Validation"
        type: "Custom"
        spec:
          steps:
            - step:
                name: "Run Chaos Experiments"
                type: "ChaosEngineering"
                spec:
                  experiments:
                    - "staging-resilience-test"
                    - "dependency-failure-test"
                  success_criteria:
                    resilience_score: "> 85"
                    
    - stage:
        name: "Deploy to Production"
        type: "Deployment"
        spec:
          service: "web-application"
          environment: "production"
        when:
          condition: "chaos_tests_passed"
```

### External CI/CD Integration
Integration with popular CI/CD platforms:

#### **GitHub Actions**
```yaml
name: Chaos-Enhanced Deployment

on:
  push:
    branches: [main]

jobs:
  deploy-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy Application
        run: |
          # Your deployment commands
          kubectl apply -f k8s/
          
      - name: Chaos Engineering Tests
        uses: harness/chaos-github-action@v1
        with:
          api-key: ${{ secrets.HARNESS_API_KEY }}
          account-id: ${{ secrets.HARNESS_ACCOUNT_ID }}
          org-id: ${{ secrets.HARNESS_ORG_ID }}
          project-id: ${{ secrets.HARNESS_PROJECT_ID }}
          experiment-id: "deployment-validation"
          
      - name: Check Results
        run: |
          if [ "${{ steps.chaos.outputs.status }}" != "passed" ]; then
            echo "Chaos tests failed, rolling back deployment"
            kubectl rollout undo deployment/app
            exit 1
          fi
```

#### **Jenkins**
```groovy
pipeline {
    agent any
    
    environment {
        HARNESS_API_KEY = credentials('harness-api-key')
        HARNESS_ACCOUNT_ID = credentials('harness-account-id')
    }
    
    stages {
        stage('Deploy') {
            steps {
                script {
                    // Deployment logic
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
        
        stage('Chaos Testing') {
            steps {
                script {
                    def chaosResult = sh(
                        script: '''
                            curl -X POST \
                              -H "x-api-key: ${HARNESS_API_KEY}" \
                              -H "Content-Type: application/json" \
                              -d '{"experimentId": "jenkins-validation"}' \
                              "https://app.harness.io/gateway/chaos/manager/api/v1/experiments/run"
                        ''',
                        returnStdout: true
                    )
                    
                    // Parse and validate results
                    def result = readJSON text: chaosResult
                    if (result.status != 'passed') {
                        error("Chaos experiments failed")
                    }
                }
            }
        }
    }
}
```

#### **GitLab CI**
```yaml
stages:
  - build
  - deploy
  - chaos-test
  - promote

deploy-staging:
  stage: deploy
  script:
    - kubectl apply -f k8s/staging/
  environment:
    name: staging

chaos-validation:
  stage: chaos-test
  script:
    - |
      # Run chaos experiments
      response=$(curl -s -X POST \
        -H "x-api-key: $HARNESS_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{"experimentId": "gitlab-validation"}' \
        "$HARNESS_API_URL/experiments/run")
      
      # Check results
      status=$(echo $response | jq -r '.status')
      if [ "$status" != "passed" ]; then
        echo "Chaos experiments failed"
        exit 1
      fi
  dependencies:
    - deploy-staging

promote-production:
  stage: promote
  script:
    - kubectl apply -f k8s/production/
  when: manual
  dependencies:
    - chaos-validation
```

## Pipeline Best Practices

### Experiment Selection
Choose appropriate experiments for pipeline context:

```yaml
# Pipeline-appropriate experiments
pipeline_experiments:
  pr_validation:
    # Quick tests for pull requests
    experiments: ["pod-restart", "network-blip"]
    max_duration: "5m"
    
  staging_deployment:
    # Comprehensive tests for staging
    experiments: ["service-failure", "database-failover", "load-test"]
    max_duration: "15m"
    
  production_deployment:
    # Safe tests for production
    experiments: ["canary-failure", "single-replica-kill"]
    max_duration: "3m"
    blast_radius: "5%"
```

### Failure Handling
Define clear failure handling strategies:

```yaml
# Failure handling configuration
failure_handling:
  experiment_failure:
    action: "block_deployment"
    notification:
      - slack: "#chaos-engineering"
      - email: "team@example.com"
    rollback:
      automatic: true
      timeout: "5m"
      
  infrastructure_failure:
    action: "retry_once"
    delay: "2m"
    fallback: "manual_review"
    
  timeout:
    action: "fail_safe"
    cleanup: "automatic"
```

### Performance Optimization
Optimize pipeline performance:

```yaml
# Performance optimization
optimization:
  parallel_execution:
    enabled: true
    max_concurrent: 3
    
  caching:
    experiment_results: "24h"
    infrastructure_state: "1h"
    
  resource_limits:
    cpu: "500m"
    memory: "1Gi"
    timeout: "30m"
```

## Monitoring Pipeline Chaos

### Pipeline Metrics
Track chaos testing effectiveness in pipelines:
- **Experiment success rate**: Percentage of experiments that pass
- **Pipeline impact**: Time added to deployment pipeline
- **Issue detection rate**: How often chaos tests catch problems
- **False positive rate**: Unnecessary deployment blocks

### Integration with Observability
Connect pipeline chaos testing with monitoring:

```yaml
# Observability integration
observability:
  metrics:
    - name: "chaos_pipeline_duration"
      type: "histogram"
      labels: ["experiment", "environment", "result"]
      
    - name: "chaos_pipeline_success_rate"
      type: "gauge"
      labels: ["pipeline", "experiment_type"]
      
  alerts:
    - name: "chaos_pipeline_failure_rate_high"
      condition: "failure_rate > 20%"
      notification: "team-alerts"
      
  dashboards:
    - name: "Chaos Pipeline Overview"
      panels: ["success_rate", "duration_trends", "failure_analysis"]
```

### Reporting and Analytics
Generate insights from pipeline chaos testing:

```yaml
# Reporting configuration
reporting:
  daily_summary:
    recipients: ["team@example.com"]
    metrics: ["experiments_run", "issues_found", "deployments_blocked"]
    
  weekly_analysis:
    recipients: ["engineering-leads@example.com"]
    content: ["trend_analysis", "improvement_recommendations"]
    
  monthly_review:
    recipients: ["management@example.com"]
    content: ["resilience_score_trends", "business_impact"]
```

## Advanced Pipeline Patterns

### Canary Chaos Testing
Combine chaos testing with canary deployments:

```yaml
# Canary deployment with chaos validation
canary_chaos:
  deployment:
    strategy: "canary"
    traffic_split: "10%"
    
  chaos_validation:
    target: "canary_version"
    experiments: ["pod-failure", "network-delay"]
    success_criteria:
      - "canary_error_rate < baseline_error_rate * 1.1"
      - "canary_response_time < baseline_response_time * 1.2"
      
  promotion_criteria:
    chaos_tests_passed: true
    performance_acceptable: true
    error_rate_stable: true
```

### Multi-Environment Progression
Progressive chaos testing across environments:

```yaml
# Progressive environment testing
environment_progression:
  dev:
    experiments: ["basic-pod-failure"]
    required_pass_rate: "80%"
    
  staging:
    experiments: ["comprehensive-failure-suite"]
    required_pass_rate: "90%"
    depends_on: "dev"
    
  production:
    experiments: ["production-safe-tests"]
    required_pass_rate: "95%"
    depends_on: "staging"
    additional_approvals: ["team-lead", "sre-team"]
```

### Conditional Chaos Testing
Run different tests based on changes:

```yaml
# Conditional experiment execution
conditional_chaos:
  triggers:
    database_changes:
      file_patterns: ["migrations/*", "schema/*"]
      experiments: ["database-failover", "connection-pool-exhaustion"]
      
    api_changes:
      file_patterns: ["api/*", "handlers/*"]
      experiments: ["api-failure", "timeout-simulation"]
      
    infrastructure_changes:
      file_patterns: ["k8s/*", "terraform/*"]
      experiments: ["infrastructure-failure", "resource-constraints"]
```

## Getting Started

### Basic Pipeline Integration
1. **Start with staging**: Begin chaos testing in non-production environments
2. **Simple experiments**: Use lightweight, fast-running experiments
3. **Clear success criteria**: Define what constitutes a passing test
4. **Gradual rollout**: Introduce chaos testing to one pipeline at a time

### Progressive Enhancement
1. **Add more experiments**: Expand test coverage over time
2. **Production integration**: Carefully introduce production chaos testing
3. **Advanced patterns**: Implement canary testing and conditional execution
4. **Team training**: Educate teams on interpreting and acting on results

## Next Steps

Ready to integrate chaos engineering into your pipelines?

1. **[Design Chaos Experiments](./chaos-experiments)** - Create pipeline-appropriate experiments
2. **[Set up Probes & Actions](./probes-actions)** - Monitor pipeline experiment health
3. **[Organize GameDays](./gamedays)** - Practice pipeline failure scenarios
4. **[Explore Integrations](./integrations)** - Connect with your CI/CD tools

:::tip Start Small
Begin with simple experiments in staging environments. Focus on building confidence and understanding before expanding to production pipelines!
:::
