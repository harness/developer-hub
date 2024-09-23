---
sidebar_position: 1
description: Create a Pipeline with a Vault service dependency.
---

# Vault

This guide covers configuring continuous integration pipelines for projects that have a Vault dependency.

## Example

In the below example we demonstrate a pipeline that launches Vault as a background step. The vault server will be available at `vault:8200`, where the hostname matches the background step name.

```yaml {7-12} showLineNumbers
kind: pipeline
spec:
  stages:
  - spec:
    type: ci
      steps:
      - name: vault
        type: background
        container: vault:1.0.0-beta2
        spec:
          envs:
            VAULT_DEV_ROOT_TOKEN_ID: dummy

      - name: test
        type: run
        container: vault:1.0.0-beta2
        spec:
          envs:
            VAULT_ADDR: http://vault:8200
            VAULT_TOKEN: dummy
          script: |-
            sleep 5
            vault kv put secret/my-secret my-value=s3cr3t
            vault kv get secret/my-secret
```