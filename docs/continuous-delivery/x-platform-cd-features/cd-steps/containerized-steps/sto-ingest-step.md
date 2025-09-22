---
title: Custom Ingest Step
description: Custom Ingest step enables you to ingest results from any third-party scanner
sidebar_position: 7
---

import IngestStep from '/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference.md';

<IngestStep name="custom-ingest" />

## Sample Pipeline

Here is a sample pipeline for a custom ingest step:

<details>
<summary>Sample YAML</summary>

```yaml
pipeline:
  name: abc
  identifier: abc
  projectIdentifier: your_project_identifier
  orgIdentifier: your_org_identifier
  tags: {}
  stages:
    - stage:
        name: s1
        identifier: s1
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: your_service_identifier
          environment:
            environmentRef: your_environment_identifier
            deployToAll: false
            infrastructureDefinitions:
              - identifier: your_infrastructure_identifier
          execution:
            steps:
              - stepGroup:
                  name: sg1
                  identifier: sg1
                  steps:
                    - step:
                        type: Run
                        name: Run_1
                        identifier: Run_1
                        spec:
                          connectorRef: a
                          image: alpine
                          shell: Sh
                          command: |-
                            cat <<EOF >> example.json
                            {  
                               "meta":{  
                                  "key":[  
                                     "issueName",  
                                     "fileName"  
                                  ],  
                                  "subproduct":"MyCustomScanner"  
                               },  
                               "issues":[  
                                  {  
                                     "subproduct":"MyCustomScanTool",  
                                     "issueName":"Cross Site Scripting",  
                                     "issueDescription":"Lorem ipsum...",  
                                     "fileName":"homepage-jobs.php",  
                                     "remediationSteps":"Fix me fast.",  
                                     "risk":"high",  
                                     "severity":8,  
                                     "status":"open",  
                                     "referenceIdentifiers":[  
                                        {  
                                           "type":"cwe",  
                                           "id":"79"  
                                        }  
                                     ]  
                                  }  
                               ]  
                            }
                            EOF
                            ls
                            cat example.json
                    - step:
                        type: CustomIngest
                        name: CustomIngest_1
                        identifier: CustomIngest_1
                        spec:
                          mode: ingestion
                          config: default
                          target:
                            type: repository
                            detection: manual
                            name: external-scanner-test
                            variant: main
                          advanced:
                            log:
                              level: info
                          ingestion:
                            file: example.json
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: your_k8s_connector
            rollbackSteps: []
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```
</details>
