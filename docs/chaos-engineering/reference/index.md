---
title: Chaos Engineering Reference
description: API reference and technical documentation for chaos engineering
sidebar_position: 1
---

# Chaos Engineering Reference

This section provides comprehensive reference documentation for Harness Chaos Engineering APIs, configurations, and technical specifications.

## API Reference

### REST API
- **Experiments API**: Create, manage, and execute chaos experiments
- **Faults API**: Access available fault types and configurations
- **Results API**: Retrieve experiment results and metrics
- **Infrastructure API**: Manage target infrastructure and connections

### GraphQL API
- **Schema Documentation**: Complete GraphQL schema reference
- **Query Examples**: Common queries and mutations
- **Subscription Events**: Real-time experiment updates

## Configuration Reference

### Experiment Configuration
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosExperiment
metadata:
  name: example-experiment
spec:
  definition:
    scope: Cluster
    permissions:
      - apiGroups: [""]
        resources: ["pods"]
        verbs: ["create", "delete", "get", "list"]
```

### Fault Specifications
- **Infrastructure Faults**: CPU, memory, network, and disk fault configurations
- **Application Faults**: Service mesh and application-level fault specifications
- **Platform Faults**: Kubernetes and cloud provider-specific configurations

## Fault Library

### Infrastructure Faults
- **cpu-hog**: CPU stress testing
- **memory-hog**: Memory exhaustion testing
- **network-latency**: Network delay injection
- **disk-fill**: Disk space exhaustion

### Kubernetes Faults
- **pod-delete**: Pod termination testing
- **node-drain**: Node evacuation testing
- **container-kill**: Container failure simulation

### Cloud Provider Faults
- **ec2-terminate**: AWS EC2 instance termination
- **vm-stop**: Azure VM shutdown
- **gce-stop**: GCP Compute Engine instance stop

## SDK Reference

### Python SDK
```python
from harness_chaos import ChaosClient

client = ChaosClient(api_key="your-api-key")
experiment = client.create_experiment(
    name="my-experiment",
    faults=["cpu-hog"],
    targets=["my-service"]
)
```

### Go SDK
```go
import "github.com/harness/chaos-go-sdk"

client := chaos.NewClient("your-api-key")
experiment, err := client.CreateExperiment(ctx, &chaos.ExperimentRequest{
    Name: "my-experiment",
    Faults: []string{"cpu-hog"},
    Targets: []string{"my-service"},
})
```

### JavaScript SDK
```javascript
import { ChaosClient } from '@harness/chaos-js-sdk';

const client = new ChaosClient({ apiKey: 'your-api-key' });
const experiment = await client.createExperiment({
  name: 'my-experiment',
  faults: ['cpu-hog'],
  targets: ['my-service']
});
```

## CLI Reference

### Installation
```bash
# Install Harness Chaos CLI
curl -sSL https://get.harness.io/chaos | bash
```

### Common Commands
```bash
# List available experiments
harness chaos list experiments

# Create a new experiment
harness chaos create experiment --file experiment.yaml

# Run an experiment
harness chaos run experiment my-experiment

# Get experiment results
harness chaos get results my-experiment
```

## Webhook Reference

### Event Types
- **experiment.started**: Experiment execution started
- **experiment.completed**: Experiment execution completed
- **experiment.failed**: Experiment execution failed
- **fault.injected**: Fault injection started
- **fault.recovered**: Fault recovery completed

### Payload Structure
```json
{
  "event": "experiment.completed",
  "timestamp": "2023-06-27T10:30:00Z",
  "experiment": {
    "id": "exp-123",
    "name": "my-experiment",
    "status": "completed",
    "result": "passed"
  }
}
```

## Error Codes

### HTTP Status Codes
- **200**: Success
- **400**: Bad Request - Invalid parameters
- **401**: Unauthorized - Invalid API key
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **429**: Too Many Requests - Rate limit exceeded
- **500**: Internal Server Error

### Custom Error Codes
- **CE001**: Experiment validation failed
- **CE002**: Target infrastructure unreachable
- **CE003**: Insufficient permissions
- **CE004**: Fault injection failed
- **CE005**: Experiment timeout exceeded

## Limits and Quotas

### API Rate Limits
- **REST API**: 1000 requests per minute
- **GraphQL API**: 500 queries per minute
- **Webhook Delivery**: 100 events per minute

### Resource Limits
- **Concurrent Experiments**: 50 per account
- **Experiment Duration**: 24 hours maximum
- **Target Resources**: 1000 per experiment

## Version History

### API Versioning
- **v1**: Current stable version
- **v2**: Beta version with enhanced features
- **Legacy**: Deprecated versions (v0.x)

### Changelog
See our [Release Notes](/release-notes/chaos-engineering) for detailed version history and breaking changes.
