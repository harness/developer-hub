---
title: Configure Terraform for Deploy Change Investigator
description: Send Terraform infrastructure changes as deployment webhooks to track in Harness AI SRE
sidebar_label: Terraform
sidebar_position: 11
keywords:
  - ai-sre
  - change detection
  - terraform
  - build webhooks
  - deployment tracking
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Track Terraform infrastructure changes by sending deployment webhooks when `terraform apply` completes.

## Before you begin

- **Deploy Change Investigator setup**: Deploy webhook integration created in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to create webhook endpoint.
- **Terraform access**: Permission to modify Terraform configurations or CI/CD pipelines that run Terraform.
- **Deploy webhook URL**: Deploy webhook URL from AI SRE integrations page.

---

## Integration approaches

Send Terraform deployment webhooks using one of these methods:

1. **CI/CD wrapper** (recommended) - Send webhooks from CI/CD pipeline after `terraform apply`
2. **Local provisioner** - Use `local-exec` provisioner in Terraform configuration
3. **Terraform Cloud** - Use run notifications

---

## Option 1: CI/CD wrapper (recommended)

Send webhooks from your CI/CD pipeline after Terraform completes.

### GitHub Actions

```yaml
name: Terraform Deploy

on:
  push:
    branches: [main]

env:
  TF_WORKSPACE: production

jobs:
  terraform:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.9.0

      - name: Terraform Init
        run: terraform init

      - name: Terraform Apply
        run: terraform apply -auto-approve

      - name: Send deploy webhook to AI SRE
        if: success()
        run: |
          curl -X POST "${{ secrets.AISRE_DEPLOY_WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{
              "services": [{
                "service": "infrastructure-${{ env.TF_WORKSPACE }}",
                "version": "${{ github.sha }}"
              }],
              "environments": ["${{ env.TF_WORKSPACE }}"],
              "changeId": "${{ github.run_id }}",
              "status": "SUCCESS",
              "deployedBy": "${{ github.actor }}",
              "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
              "metadata": {
                "tool": "terraform",
                "workspace": "${{ env.TF_WORKSPACE }}"
              }
            }'

      - name: Send failure webhook
        if: failure()
        run: |
          curl -X POST "${{ secrets.AISRE_DEPLOY_WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{
              "services": [{
                "service": "infrastructure-${{ env.TF_WORKSPACE }}",
                "version": "${{ github.sha }}"
              }],
              "environments": ["${{ env.TF_WORKSPACE }}"],
              "changeId": "${{ github.run_id }}",
              "status": "FAILURE",
              "deployedBy": "${{ github.actor }}",
              "deployTimestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
              "metadata": {
                "tool": "terraform"
              }
            }'
```

---

## Option 2: Local provisioner

Use a `null_resource` with `local-exec` provisioner to send webhooks from Terraform.

### Create webhook notification resource

```hcl
variable "deploy_webhook_url" {
  description = "AI SRE deploy webhook URL"
  type        = string
  sensitive   = true
}

variable "services" {
  description = "List of services deployed"
  type = list(object({
    service = string
    version = string
  }))
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

resource "null_resource" "deploy_webhook" {
  # Trigger webhook only when deployed resources actually change
  triggers = {
    services_changed = jsonencode(var.services)
  }

  provisioner "local-exec" {
    when    = create
    command = <<-EOT
      curl -X POST "${var.deploy_webhook_url}" \
        -H "Content-Type: application/json" \
        -d '{
          "services": ${jsonencode(var.services)},
          "environments": ["${var.environment}"],
          "changeId": "${formatdate("YYYY-MM-DD'T'hh:mm:ssZ", timestamp())}",
          "status": "SUCCESS",
          "deployedBy": "terraform",
          "deployTimestamp": "${formatdate("YYYY-MM-DD'T'hh:mm:ssZ", timestamp())}"
        }'
    EOT
  }

  depends_on = [
    # List resources that must complete first
  ]
}
```

### Use webhook notification

```hcl
resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name    = "app-server"
    Version = "1.2.3"
  }
}

resource "null_resource" "deploy_webhook" {
  triggers = {
    instance_id = aws_instance.app.id
  }

  provisioner "local-exec" {
    command = <<-EOT
      curl -X POST "${var.deploy_webhook_url}" \
        -H "Content-Type: application/json" \
        -d '{
          "services": [{
            "service": "app-server",
            "version": "${aws_instance.app.tags["Version"]}"
          }],
          "environments": ["${terraform.workspace}"],
          "changeId": "${timestamp()}",
          "status": "SUCCESS",
          "deployedBy": "terraform",
          "deployTimestamp": "${timestamp()}"
        }'
    EOT
  }

  depends_on = [aws_instance.app]
}
```

---

## Set webhook URL securely

### Using environment variable

```bash
export TF_VAR_deploy_webhook_url="https://app.harness.io/..."
terraform apply
```

### Using terraform.tfvars (add to .gitignore)

```hcl
deploy_webhook_url = "https://app.harness.io/..."
```

### Using Terraform Cloud variables

1. Navigate to workspace **Settings** → **Variables**
2. Add variable:
   - **Key:** `deploy_webhook_url`
   - **Value:** Webhook URL
   - **Category:** Terraform variable
   - **Sensitive:** Yes

---

## Extract service information

### From outputs

Define outputs to list deployed services:

```hcl
output "deployed_services" {
  description = "Services deployed by this configuration"
  value = [
    {
      service = "frontend"
      version = var.frontend_version
    },
    {
      service = "backend"
      version = var.backend_version
    }
  ]
}
```

### From resource tags

```hcl
locals {
  deployed_services = [
    {
      service = aws_instance.app.tags["Service"]
      version = aws_instance.app.tags["Version"]
    }
  ]
}

resource "null_resource" "webhook" {
  provisioner "local-exec" {
    command = "curl ... -d '{\"services\": ${jsonencode(local.deployed_services)}}'"
  }
}
```

---

## Provisioner considerations

### Run only on create

```hcl
provisioner "local-exec" {
  when    = create
  command = "curl ..."
}
```

### Error handling

```hcl
provisioner "local-exec" {
  command = <<-EOT
    set -e
    response=$(curl -s -w "\n%{http_code}" ... -d '...')
    http_code=$(echo "$response" | tail -n1)
    if [ "$http_code" -ne 200 ]; then
      echo "Webhook failed with status $http_code"
      exit 1
    fi
  EOT
}
```

---

## Testing webhooks

### Test from CI/CD

1. Run Terraform apply in CI/CD
2. Check pipeline logs for webhook execution
3. Navigate to **AI SRE** → **Integrations**
4. Click **...** menu on DEPLOY integration
5. Select **Debug**
6. Verify webhook appears

### Test local provisioner

1. Run `terraform apply` locally
2. Check console output for curl execution
3. Verify webhook in AI SRE Debug view

---

## Troubleshooting

<Troubleshoot
  issue="Terraform local-exec provisioner fails silently when sending AI SRE webhooks"
  mode="docs"
  fallback="A local-exec provisioner does not fail the apply when curl fails. Add error checking in the provisioner command, for example capture the HTTP status code and exit 1 when it is not 200."
/>

<Troubleshoot
  issue="Terraform webhook sent on destroy to AI SRE"
  mode="docs"
  fallback="The provisioner was configured with when = destroy, so it runs during terraform destroy. Remove the when = destroy argument. A local-exec provisioner runs at create time by default, and create is not a valid value for when in current Terraform."
/>

<Troubleshoot
  issue="Terraform variable interpolation errors in AI SRE webhook commands"
  mode="docs"
  fallback={"Variables may not expand in the provisioner command. Use proper HCL string interpolation, for example command = <<-EOT curl ... -d '{\"service\": \"${var.service_name}\"}' EOT."}
/>

---

## Best practices

- **Store webhook URLs securely**: Use environment variables, Terraform Cloud sensitive variables, or CI/CD secrets
- **Use CI/CD wrapper**: More reliable than provisioners for webhook notifications
- **Separate infrastructure changes**: Track infrastructure deployments separately from application deployments
- **Version consistently**: Use commit SHA or timestamp for infrastructure change versions

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for complete setup instructions.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how the AI agent uses change detection during incidents.
- Go to [Configure Jenkins](/docs/ai-sre/change/sources/jenkins) for webhook setup in Jenkins pipelines.
