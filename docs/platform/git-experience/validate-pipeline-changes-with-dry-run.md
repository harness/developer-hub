---
title: Validate pipeline changes with dry run
sidebar_label: Validate pipeline changes with dry run
description: Use the dry run validation endpoint to validate pipeline YAML before committing to Git.
sidebar_position: 9
---

The dry run validation endpoint allows you to validate pipeline YAML changes while editing files in Git. This helps catch configuration errors before you commit changes to your repository.

---

## What will you learn in this topic?

- How to [use the dry run validation endpoint](#use-the-api-endpoint) to validate pipeline YAML.
- How to [read the validation response](#response-format) for valid and invalid pipelines.
- How to recognize the [limitations](#limitations) of dry run validation.

---

## What is dry run validation?

Dry run validation is an API endpoint that validates pipeline YAML without executing the pipeline. Use this endpoint to validate your pipeline changes while editing YAML files in Git before saving them.

The validation performs:

- **YAML schema validation**: Verifies the pipeline structure and syntax.
- **Template expansion**: Validates template references and expands templates during validation.
- **Policy evaluation**: Evaluates OPA policies for pipeline on save or on run.

---

## Use the API endpoint

### Endpoint

```text
POST /pipeline/api/v1/orgs/{org}/projects/{project}/dry-run
```

### Request parameters

```json
{
  "pipeline_identifier": "string",
  "pipeline_yaml": "string",
  "branch": "string"
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `pipeline_yaml` | Yes | Complete pipeline YAML as a string |
| `pipeline_identifier` | Yes | Unique identifier of the pipeline |
| `branch` | No | Git branch where the pipeline is stored. Optional for an inline pipeline; include it for a Git-backed pipeline |

The account, organization, and project identifiers are supplied in the URL path (`org`, `project`) and the `Harness-Account` header, not in the request body.

### Example request

```bash
curl --location 'https://app.harness.io/pipeline/api/v1/orgs/default/projects/MyProject/dry-run' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Harness-Account: <account-id>' \
--data '{
  "pipeline_identifier": "mypipeline",
  "pipeline_yaml": "pipeline:\n  name: my-pipeline\n  identifier: mypipeline\n  ...",
  "branch": "main"
}'
```

---

## Response format

### Successful validation

When the pipeline YAML is valid, the endpoint returns a success response:

```json
{
  "is_valid": true,
  "validation": []
}
```

### Validation errors

When validation fails, the response includes specific error messages indicating what needs to be fixed:

```json
{
  "is_valid": false,
  "validation": [
    {
      "validation_type": "string",
      "entity_type": "string",
      "entity_identifier": "string",
      "error_message": "Following yaml paths could not be parsed: ...",
      "hint": "string"
    }
  ]
}
```

Each entry in the `validation` array describes one validation result. The endpoint returns a `validation_type` and `entity_type` for each entry.

---

## Limitations

The dry run validation cannot validate:

- **Expressions**: Pipeline expressions are not validated by the dry run endpoint.
- **Delegate availability**: Whether delegates are available for execution.
- **Cloud provider credentials**: Validity of credentials at execution time.
- **Artifact connectivity**: Whether artifact sources are accessible.
- **Service manifests**: Internal validity of Kubernetes manifests or other service definitions.

---

## Next steps

You have validated pipeline YAML with the dry run endpoint. Continue with the following:

- [Pipeline YAML quickstart](/docs/platform/pipelines/harness-yaml-quickstart): Learn the pipeline YAML schema.
- [Input sets and overlays](/docs/platform/pipelines/input-sets): Manage runtime inputs for your pipelines.
