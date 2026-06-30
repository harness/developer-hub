---
title: Create a Webhook
description: Step-by-step guide to creating webhooks in Harness AI SRE to receive alerts from any monitoring system.
sidebar_label: Create a Webhook
sidebar_position: 2
---

import DocImage from '@site/src/components/DocImage';

# Create a Webhook

Create webhooks to receive alerts from any monitoring system or custom application.

## Configuration Steps

### Step 1: Create a Webhook

1. Navigate to **Integrations** → **New Integration**
2. Enter a name and description
3. Choose from the **Select Template** section or leave it blank for Custom
4. Copy the generated webhook URL

### Step 2: Configure Payload Mapping

Map your webhook payload to Harness AI SRE fields by first choosing the values that you want to map from your webhook payload.

### Step 3: Map Values to Fields in the Alert (Normalization)

Fields parsed from the Payload Mapping step appear on the left and can be dragged to the fields in the Alert.

You can use advanced CEL expressions for field mapping including `regex.extract()` for pattern extraction, `.orValue()` for default values, and `.trim()` for string cleanup.

### Step 3a: Configure Advanced Mapping Conditions (Optional)

You can add CEL expression conditions to filter webhook payloads before creating alerts. 

<DocImage path={require('../static/webhook-field-mapping-advanced-cel.png')} width="100%" height="100%" title="Webhook field mapping with advanced CEL expressions" />

Go to [Use CEL in Webhooks](./use-cel-webhooks.md) for detailed filtering examples and patterns.

### Step 4: Test the Webhook

Send a test alert by copying the CURL command and pasting it into your terminal to verify the configuration:

```bash
curl -X POST 'https://example.com/api/v1/webhook/placeholder-id' \
-H 'Content-Type: application/json' \
-d '{
  "id": 123456,
  "repository": {
    "name": "sample-repo",
    "url": "https://github.com/placeholder-org/sample-repo"
  },
  "status": "success",
  "build_url": "https://ci.example.com/builds/123456",
  "commit": "abc123def456",
  "branch": "main",
  "author": "Jane Doe",
  "message": "Update test script"
}'
```

Go to [Use Mustache in Webhooks](./use-mustache-webhooks.md) for complete payload and field mapping examples.

---

## Best Practices

### Webhook Security

- Keep webhook URLs confidential
- Use HTTPS endpoints only
- Implement rate limiting
- Monitor webhook usage
- Rotate webhook URLs periodically

### Payload Design

- Include essential alert context
- Use consistent field names
- Include timestamps in UTC
- Add correlation IDs
- Keep payloads concise

### Error Handling

- Validate payload format
- Handle missing fields gracefully
- Set default values
- Log mapping errors
- Monitor webhook health

---

## Next Steps

- Go to [Use CEL in Webhooks](./use-cel-webhooks.md) to filter webhook payloads with conditional logic.
- Go to [Use Mustache in Webhooks](./use-mustache-webhooks.md) to map webhook fields to alert properties.
- Go to [Configure Alert Rules](../alert-rules/overview.md) to route and process incoming alerts.
