---
title: Quickstart
description: Get started with your first chaos experiment in minutes
sidebar_position: 5
unlisted: true
---

# Quickstart

Get up and running with Harness Chaos Engineering in just a few minutes. This quickstart guide will help you run your first chaos experiment and understand the basics of the platform.

## Prerequisites

Before you begin, ensure you have:

- **Harness Account**: [Sign up for free](https://app.harness.io/auth/#/signup) if you don't have one
- **Target Infrastructure**: A Kubernetes cluster, Linux machine, or cloud account to run experiments on
- **Basic Permissions**: Admin access to your target infrastructure

## Step 1: Access Chaos Engineering

1. **Log in** to your Harness account
2. **Navigate** to the Chaos Engineering module from the left sidebar
3. **Select** your project or create a new one

## Step 2: Set Up Chaos Infrastructure

Choose your infrastructure type and follow the setup:

### For Kubernetes
```bash
# Install chaos infrastructure using Helm
helm repo add harness https://harness.github.io/helm-charts
helm install chaos-infra harness/harness-chaos-infra \
  --namespace harness-chaos-infra --create-namespace \
  --set infraId=<YOUR_INFRA_ID> \
  --set accessKey=<YOUR_ACCESS_KEY>
```

### For Linux
```bash
# Download and install chaos agent
curl -O https://app.harness.io/chaos/linux-agent
chmod +x linux-agent
sudo ./linux-agent --install --infra-id=<YOUR_INFRA_ID> --access-key=<YOUR_ACCESS_KEY>
```

### For Cloud (AWS/Azure/GCP)
1. **Configure** cloud credentials in Harness
2. **Select** your cloud provider and region
3. **Deploy** chaos infrastructure using provided templates

## Step 3: Create Your First Experiment

1. **Click** "New Experiment" in the Chaos Engineering dashboard
2. **Choose** a template or start from scratch:
   - **Pod Delete** (Kubernetes) - Terminates random pods
   - **CPU Stress** (Linux) - Consumes CPU resources
   - **Network Latency** (Any) - Adds network delays

3. **Configure** the experiment:
   - **Name**: "My First Chaos Experiment"
   - **Target**: Select your infrastructure
   - **Duration**: Start with 2 minutes
   - **Blast Radius**: Limit to 1 target initially

## Step 4: Define Success Criteria

Set up monitoring to validate your hypothesis:

1. **Add Probes** to monitor system health:
   - **HTTP Probe**: Check application availability
   - **Command Probe**: Verify specific system states
   - **Prometheus Probe**: Monitor custom metrics

2. **Set Thresholds**:
   - Response time < 500ms
   - Error rate < 1%
   - System availability > 99%

## Step 5: Run the Experiment

1. **Review** your experiment configuration
2. **Click** "Run Experiment"
3. **Monitor** the experiment in real-time:
   - Watch the experiment timeline
   - Observe probe results
   - Check system metrics

## Step 6: Analyze Results

After the experiment completes:

1. **Review** the experiment report:
   - **Resilience Score**: Overall system resilience rating
   - **Probe Results**: Success/failure of health checks
   - **Timeline**: Detailed experiment execution flow

2. **Identify** areas for improvement:
   - Failed probes indicate potential weaknesses
   - Slow recovery times suggest optimization opportunities
   - Unexpected behaviors reveal system dependencies

## What's Next?

Now that you've run your first experiment, explore more advanced features:

### 🔄 Automate Experiments
- **Schedule** regular chaos testing
- **Integrate** with CI/CD pipelines
- **Set up** automated rollback conditions

### 📊 Advanced Monitoring
- **Connect** monitoring tools (Prometheus, Datadog, New Relic)
- **Create** custom dashboards
- **Set up** alerting for experiment failures

### 🎯 Expand Experiment Scope
- **Try** different fault types (network, disk, memory)
- **Target** multiple services simultaneously
- **Test** disaster recovery scenarios

### 👥 Team Collaboration
- **Invite** team members to your project
- **Set up** role-based access control
- **Share** experiment results and insights

## Common First Experiments

### Kubernetes Pod Resilience
Test how your application handles pod failures:
- **Fault**: Pod Delete
- **Target**: Application pods
- **Success Criteria**: Service remains available, new pods start quickly

### Network Resilience
Validate application behavior under network stress:
- **Fault**: Network Latency (100ms)
- **Target**: Service-to-service communication
- **Success Criteria**: Timeouts handled gracefully, user experience maintained

### Resource Stress Testing
Ensure applications handle resource constraints:
- **Fault**: CPU Stress (80% utilization)
- **Target**: Application nodes
- **Success Criteria**: Auto-scaling triggers, performance degrades gracefully

## Troubleshooting

### Experiment Won't Start
- **Check** infrastructure connectivity
- **Verify** permissions and access keys
- **Ensure** target resources are available

### Probes Failing
- **Validate** probe configurations
- **Check** network connectivity to probe targets
- **Review** success criteria thresholds

### Unexpected Results
- **Review** experiment logs
- **Check** system dependencies
- **Verify** baseline system health

## Need Help?

- **Documentation**: Explore our comprehensive [guides](./tutorials)
- **Community**: Join our [Slack community](https://harnesscommunity.slack.com)
- **Support**: Contact [Harness Support](https://support.harness.io)
- **Professional Services**: Get expert help with implementation

## Next Steps

Ready to dive deeper? Check out these resources:

1. **[Key Concepts](./key-concepts)** - Understand chaos engineering fundamentals
2. **[Tutorials](./tutorials)** - Follow detailed step-by-step guides
3. **[Integrations](./integrations)** - Connect with your existing tools
4. **[Best Practices](./concepts)** - Learn industry best practices

:::tip Congratulations! 🎉
You've successfully run your first chaos experiment! You're now on your way to building more resilient systems. Keep experimenting and learning!
:::
