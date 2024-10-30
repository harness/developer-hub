---
title: Spinnaker only supports unique account names across both AWS and ECS
---

## Issue
When the same account name is provided in AWS and ECS, some issues can arise such as incorrect credentials being used by the Lambda plugin, as it cannot distinguish between accounts defined with the same name in both resources in the manifest.
As an example, in Operator, if ```example-account``` is defined in both AWS and ECS as below, it will cause issues when being referred to in Lambda stages
spec:  spinnakerConfig:    config:      providers:        aws:
          enabled: true
          accounts:
          - name: example-account
            providerVersion: V1
            accountId: '1234567890'
            regions:
            - name: us-east-2
            assumeRole: role/some-assumeRole
            lifecycleHooks: []
          primaryAccount: example-account
        ecs:
          enabled: true
          accounts:
          - name: example-account
            awsAccount: example-account
          primaryAccount: example-account

## Cause
Conflict in reference from other services about which account and access credentials should be used.

