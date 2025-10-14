---
title: Save Cache to S3 doesn't work with Windows and cross-account roles.
description: The Save Cache to S3 step doesn't work with Windows platforms using cross-account roles.
sidebar_position: 85
---

The [Save Cache to S3 step](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache) doesn't work on Windows platforms using AWS cross-account roles. [This is an AWS limitation.](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/windows_task_IAM_roles.html)

As a work around, you can run an upload script in a [Run step], for example:

```yaml
              - step:
                  identifier: Run_1
                  type: Run
                  name: Run_1
                  spec:
                    connectorRef: DOCKER_CONNECTOR
                    image: REGISTRY_NAME/python-awscli:latest # Specify a container image and tag that can run your script's commands.
                    shell: Powershell
                    command: |-
                      $gateway = (Get-NetRoute | Where { $_.DestinationPrefix -eq '0.0.0.0/0' } | Sort-Object RouteMetric | Select NextHop).NextHop
                      $ifIndex = (Get-NetAdapter -InterfaceDescription "Hyper-V Virtual Ethernet*" | Sort-Object | Select ifIndex).ifIndex
                      New-NetRoute -DestinationPrefix 000.000.00.0/32 -InterfaceIndex $ifIndex -NextHop $gateway -PolicyStore ActiveStore
                      New-NetRoute -DestinationPrefix 000.000.000.000/32 -InterfaceIndex $ifIndex -NextHop $gateway -PolicyStore ActiveStore

                      #Verify aws meta-data api
                      Invoke-WebRequest -Uri http://000.000.00.00/latest/meta-data/ -UseBasicParsing

                      $temp_creds=aws sts assume-role --role-arn arn:aws:iam::123456:role/s3-full-access --role-session-name RoleChainSessionS3
                      echo $temp_creds

                      $access_key = ($temp_creds | ConvertFrom-Json).Credentials.AccessKeyId
                      $secret_key = ($temp_creds | ConvertFrom-Json).Credentials.SecretAccessKey
                      $session_token = ($temp_creds | ConvertFrom-Json).Credentials.SessionToken

                      aws configure set aws_access_key_id $access_key
                      aws configure set aws_secret_access_key $secret_key
                      aws configure set aws_session_token $session_token

                      aws s3 cp test.txt s3://folder/test.txt
```
