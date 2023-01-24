---
title: Adding Custom Artifacts to STO Pipelines
description: This topic describes how to include SSL certificates and other types of artifacts in your STO pipelines. 
sidebar_position: 70
---

In some cases, a scanner might require additional files such as SSL certificates and license files. The following steps describe the high-level workflow.

1) For each artifact that contains sensitive information, such as an SSL certificate, create a Harness secret.

2) Go to the pipeline where you want to add the artifact.

3) In the stage where that will use the artifact, go to **Overview** > **Shared Paths** and create a folder under **/shared** such as **shared/customer-artifacts**. 

:::note
To add a PEM file or other SSL certificate, the shared folder should be **shared/customer-artifacts/certificates**. You can include any number of certificates in this folder.
:::

4) Add a Run step to the stage that adds the artifacts to the shared folder. This step needs to run _before_ the scanner step that uses the artifact. 

### Important Notes

* If the scanner uses an SSL certificate such as a PEM file, save each certificate to **shared/customer-artifacts/certificates/`<certificate_name>`**. 

* The following example workflow uses a PEM file stored as a [Harness file secret](/docs/platform/6_Security/3-add-file-secrets.md). You can also use third-party managers such as HashiCorp Vault, Azure Key Vault, and AWS Secrets Manager. See [Harness Secrets Manager Overview](/docs/platform/6_Security/1-harness-secret-manager-overview.md).

* If the scanner requires a license file, save the file to **shared/customer-artifacts/license/`<license_file_name>`**.  

* If the pipeline runs a ZAP scan that uses context files such as auth scripts, context files, or URL files, specify the following shared folders. 

  * **/shared/customer-artifacts/authScript/`<artifact_file_name>`**
  * **/shared/customer-artifacts/context/`<artifact_file_name>`**
  * **/shared/customer-artifacts/urlFile/`<artifact_file_name>`**
  * **/shared/customer-artifacts/hosts/`<artifact_file_name>`**
  
### Example workflow
  
This example shows how to include a PEM file in a pipeline that runs a SonarQube scan. This workflow assumes that you have a valid SonarQube PEM stored as a Harness File Secret. 

1. In your Harness pipeline, go to the Overview tab of the Security stage. Under **Shared Paths**, enter the following shared path: 

   `/shared/customer_artifacts/certificates`
   
   This is the default certificate location for Harness pipelines. You can copy any number of certificates to this folder.

2. Add a Run step that copies your PEM file to the certificates folder. Here's some example code that does this:

   ```
   set -e
   touch /shared/customer_artifacts/certificates/certificate
   printf "%s" "$NEWCERT" > /shared/customer_artifacts/certificates/certificate
   ```

3. Set up the remaining downstream steps in your pipeline. When the pipeline runs a SonarQube scan that requires a PEM, it looks in **/shared/customer_artifacts/certificates** and proceeds if it finds a valid certificate. 

### YAML pipeline example

The following illustrates an end-to-end pipeline that copies a PEM certificate to the default location, builds an image, and then scans the image using SonarQube (authorized using the certificate).

```yaml 
pipeline:
  allowStageExecutions: false
  projectIdentifier: STO
  orgIdentifier: default
  identifier: my_pipeline_clone_sq_mvn_with_pem_files
  name: sq mvn with pem files
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: dvja
        build: <+input>
  stages:
    - stage:
        name: build
        identifier: build
        type: SecurityTests
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: stodelegate
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
            - /shared/customer_artifacts
          serviceDependencies:
            - identifier: dind
              name: dind
              type: Service
              spec:
                connectorRef: account.harnessImage
                image: docker:dind
                privileged: true
                entrypoint:
                  - dockerd-entrypoint.sh
                resources:
                  limits:
                    memory: 4Gi
                    cpu: 1000m
          execution:
            steps:
              - step:
                  type: Run
                  name: export path
                  identifier: export_path
                  spec:
                    connectorRef: DockerNoAuth
                    image: alpine
                    shell: Sh
                    command: |-
                      pwd
                      harness_path=$(pwd)
                      export harness_path
                    outputVariables:
                      - name: harness_path
              - step:
                  type: Run
                  name: addcerts
                  identifier: addcert
                  spec:
                    connectorRef: dbothwelldocker
                    image: alpine
                    shell: Sh
                    command: |-
                      set -e
                      mkdir -p -v /shared/customer_artifacts/certificates
                      touch /shared/customer_artifacts/certificates/certificate1
                      printf "%s" "$NEWCERT" > /shared/customer_artifacts/certificates/certificate1
                    envVariables:
                      NEWCERT: <+secrets.getValue("sonarqube_self_signed_cert")>
                      NEWDUMMYCERT: <+secrets.getValue("dbothwell-dummy-pem")>
              - step:
                  type: Run
                  name: build
                  identifier: build
                  spec:
                    connectorRef: DockerNoAuth
                    image: maven:3.3-alpine
                    shell: Sh
                    command: |
                      mvn clean package
              - step:
                  type: Security
                  name: sonar
                  identifier: sonar
                  spec:
                    privileged: true
                    settings:
                      policy_type: orchestratedScan
                      scan_type: repository
                      product_domain: https://sonarqube-cert-test.myorg.dev/
                      product_name: sonarqube
                      product_config_name: sonarqube-agent
                      repository_project: dvja
                      repository_branch: <+codebase.branch>
                      product_access_token: $SQ_ACCESS_TOKEN
                      product_project_key: dvja
                      verify_ssl: true
                      bypass_ssl_check: true
                      workspace: <+pipeline.stages.build.spec.execution.steps.export_path.output.outputVariables.harness_path>/target
                    imagePullPolicy: Always
                    resources:
                      limits:
                        memory: 2Gi
                        cpu: 1000m
                  description: sonar
                  failureStrategies: []
        variables:
          - name: runner_tag
            type: String
            value: dev
```
