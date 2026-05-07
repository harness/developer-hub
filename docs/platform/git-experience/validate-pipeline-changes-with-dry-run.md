---
title: Validate pipeline changes with dry run
description: Use the dry run validation endpoint to validate pipeline YAML before committing to Git.
sidebar_position: 9
---

The dry run validation endpoint allows you to validate pipeline YAML changes while editing files in Git. This helps catch configuration errors before you commit changes to your repository.

---

## What is dry run validation?

Dry run validation is an API endpoint that validates pipeline YAML without executing the pipeline. Use this endpoint to validate your pipeline changes while editing YAML files in Git before saving them.

The validation performs:

- **YAML schema validation** - Verifies the pipeline structure and syntax
- **Template expansion** - Validates template references and expands templates during validation
- **Policy evaluation** - Evaluates OPA policies for pipeline on save or on run

---

## Use the API endpoint

### Endpoint

```
POST /pipeline/api/v1/orgs/{org}/projects/{project}/dry-run
```

### Request parameters

```json
{
  "accountIdentifier": "string",
  "orgIdentifier": "string",
  "projectIdentifier": "string",
  "pipelineYaml": "string",
  "pipelineIdentifier": "string",
  "branch": "string"
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `pipelineYaml` | Yes | Complete pipeline YAML as a string |
| `pipelineIdentifier` | Yes | Unique identifier of the pipeline |
| `branch` | Yes | Git branch where the pipeline is stored |
| `accountIdentifier` | Yes | Harness account identifier |
| `orgIdentifier` | Yes | Organization identifier |
| `projectIdentifier` | Yes | Project identifier |

### Example request

```bash
curl --location 'https://app.harness.io/pipeline/api/v1/orgs/default/projects/MyProject/dry-run' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Harness-Account: <account-id>' \
--data '{
  "accountIdentifier": "<account-id>",
  "orgIdentifier": "default",
  "projectIdentifier": "MyProject",
  "pipelineYaml": "pipeline:\n  name: my-pipeline\n  identifier: mypipeline\n  ...",
  "pipelineIdentifier": "mypipeline",
  "branch": "main"
}'
```

---

## Response format

### Successful validation

When the pipeline YAML is valid, the endpoint returns a success response:

```json
{
  "validationIdentifier": "uuid",
  "valid": true,
  "validationResults": []
}
```

### Validation errors

When validation fails, the response includes specific error messages indicating what needs to be fixed:

```json
{
  "validationIdentifier": "uuid",
  "valid": false,
  "validationResults": [
    {
      "type": "SCHEMA",
      "severity": "ERROR",
      "message": "Invalid YAML syntax at line 15",
      "location": {
        "stageIdentifier": "deploy",
        "stepIdentifier": "deployStep",
        "yamlPath": "pipeline.stages[0].spec.service"
      }
    }
  ]
}
```

**Validation result types:**
- `SCHEMA` - YAML structure and syntax errors
- `ENTITY_REFERENCE` - Invalid or non-existent entity references
- `PERMISSION` - RBAC permission violations
- `OPA_POLICY` - Policy evaluation failures

**Severity levels:**
- `ERROR` - Validation failure that prevents pipeline execution
- `WARNING` - Issues that should be reviewed but don't block execution

:::note
YAML schema validation (`SCHEMA`) always runs and cannot be excluded. Multiple errors within the same stage may be returned in the `validationResults` array.
:::

---

## Limitations

The dry run validation cannot validate:

- **Expressions** - Pipeline expressions are not validated by the dry run endpoint
- **Delegate availability** - Whether delegates are available for execution
- **Cloud provider credentials** - Validity of credentials at execution time
- **Artifact connectivity** - Whether artifact sources are accessible
- **Service manifests** - Internal validity of Kubernetes manifests or other service definitions

---


## Next steps

Dry run validation helps you catch pipeline errors before they reach Git. Explore related topics to build on this workflow.

Go to [Pipeline YAML quickstart](/docs/platform/pipelines/harness-yaml-quickstart) to learn the pipeline YAML schema.

Go to [Input sets and overlays](/docs/platform/pipelines/input-sets) to manage runtime inputs for your pipelines.
