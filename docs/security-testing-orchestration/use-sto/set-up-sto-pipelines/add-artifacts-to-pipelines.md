---
title: Adding Custom Certificates and Artifacts to STO Pipelines
description: This topic describes how to include SSL certificates and other types of artifacts in your STO pipelines. 
sidebar_position: 70
---

In some cases, a scanner might require additional files such as SSL certificates and license files. The workflow to include these files depends on your build infrastructure.

:::note important notes

- You must have **root access** to perform the [Kubernetes workflows](#kubernetes-workflows) documented below.

- Make sure that your certificates meet all requirements of the external scan tool. Your certificates must be valid, unexpired, and have a complete trust chain. 

- Harness STO does not support certificate bundles. Each certificate should be specified in its own file. If you have a bundle that you want to use with an external scanner, Harness recommends that you split the bundle into individual files.

- To troubleshoot SSL issues, go to [Troubleshooting tips](#troubleshooting-tips) below. 

:::


## Adding certificates to a Kubernetes delegate

The primary workflow for adding certificates to your Kubernetes delegate is described in the CI docs: [Configure a Kubernetes build farm to use self-signed certificates](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates).

You can add certificates to your delegate using this workflow with the following differences, based on the scanner you're setting up. 

* **Scanner template:**  If you're using a [scanner template](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#security-steps-and-scanner-templates) to set up your scan, note the following:

   * Make sure that you place your files in the correct location in the delegate workspace and that you set up the `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH` environment variables correctly.

   * STO supports certificates in PEM format as well as DER (Distinguished Encoding Rules).

* **Security step:** If you're using a [Security step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#security-steps-and-scanner-templates) to set up your scan, note the following:

   * You need to place the certificates in the folder `/shared/customer_artifacts/certificates/`

   * STO supports loading multiple certificates in PEM format as well as DER (Distinguished Encoding Rules).
  

* **Nexus IQ scan:** For Nexus IQ scans, follow the Security step workflow. The certificate must have the filename `certificate` and the path `/shared/customer_artifacts/certificates/certificate`. 

<details><summary>Security step setup example</summary>

```yaml
apiVersion: apps/v1  
kind: StatefulSet  
spec:  
  template:  
    spec:  
        env:  
        - name: ADDITIONAL_CERTS_PATH  
          value: /tmp/ca.bundle  
        - name: CI_MOUNT_VOLUMES  
          value: /tmp/ca.bundle:/shared/customer_artifacts/certificates/ca.bundle  
        volumeMounts:  
        - name: customercertvol  
          mountPath: /shared/customer_artifactss/certificates/ca.bundle  
          subPath:  ca.bundle 
       volumes:  
        - name: customercertvol  
          secret:  
            secretName: addcerts  
            items:  
            - key: ca.bundle  
              path: ca.bundle
```

</details>


<details><summary>Nexus IQ scan setup example</summary>

```yaml
apiVersion: apps/v1  
kind: StatefulSet  
spec:  
  template:  
    spec:  
        env:  
        - name: ADDITIONAL_CERTS_PATH  
          value: /tmp/ca.bundle  
        - name: CI_MOUNT_VOLUMES  
          value: /tmp/ca.bundle:/shared/customer_artifacts/certificates/certificate  
        volumeMounts:  
        - name: customercertvol  
          mountPath: /shared/customer_artifactss/certificates/certificate 
          subPath:  ca.bundle 
       volumes:  
        - name: customercertvol  
          secret:  
            secretName: addcerts  
            items:  
            - key: ca.bundle  
              path: ca.bundle
```

</details>







## Workflow description

This workflow applies to all [supported build infrastructures](/docs/security-testing-orchestration/whats-supported). It also applies to STO on SaaS, as well as Harness Self-Managed Platform.

1. For each artifact that contains sensitive information, such as an SSL certificate, create a Harness secret.

2. Go to the pipeline where you want to add the artifact.

3. In the stage where that will use the artifact, go to **Overview** > **Shared Paths** and create a folder under **/shared** such as **/shared/customer_artifacts**. 

4. Add a Run step to the stage that adds the artifacts to the shared folder. This step needs to run _before_ the scanner step that uses the artifact. 

:::info Important Notes

* You must include all required files in  **/shared/customer_artifacts/**. You can include any number of certificates or other files in this folder.

* If your scanners use SSL certificates such as PEM files, save each certificate to **/shared/customer_artifacts/certificates/`<certificate_name>`**. 

* If the scanner requires a license file, save the file to **/shared/customer_artifacts/`<license_file_name>`**.  

* If you're running a ZAP scan that uses context files such as auth scripts, context files, or URL files, specify the following shared folders and make sure that your Run step copies in the required files. 

  * **/shared/customer_artifacts/authScript/`<artifact_file_name>`**
  * **/shared/customer_artifacts/context/`<artifact_file_name>`**
  * **/shared/customer_artifacts/urlFile/`<artifact_file_name>`**
  * **/shared/customer_artifacts/hosts/`<artifact_file_name>`**

* The following example workflow uses a PEM file stored as a [Harness file secret](/docs/platform/Secrets/add-file-secrets). You can also use third-party managers such as HashiCorp Vault, Azure Key Vault, and AWS Secrets Manager. See [Harness Secrets Manager Overview](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview).

:::

  
### Example workflow
  
This example shows how to include a PEM file in a pipeline that runs a scan using a Security step. This workflow assumes that you have a valid PEM stored as a Harness File Secret. 

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

<details><summary>YAML pipeline example</summary>

```yaml 
pipeline:
  allowStageExecutions: false
  projectIdentifier: STO
  orgIdentifier: default
  identifier: jsmith_cloud_sq_mvn_with_pem_files
  name: "jsmith cloud - sq mvn with pem files "  tags: {}
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
                    connectorRef: mydocker
                    image: alpine
                    shell: Sh
                    command: |-
                      set -e
                      mkdir -p -v /shared/customer_artifacts/certificates

                      touch /shared/customer_artifacts/certificates/certificate1
                      printf "%s" "$NEWCERT" > /shared/customer_artifacts/certificates/certificate1

                      # touch /shared/customer_artifacts/certificates/certificate2
                      # printf "%s" "$NEWDUMMYCERT" > /shared/customer_artifacts/certificates/certificate2

                      ls -l /shared/customer_artifacts/certificates
                      cat /shared/customer_artifacts/certificates/certificate | base64
                    envVariables:
                      NEWCERT: <+secrets.getValue("sonarqube_self_signed_cert")>
                      NEWDUMMYCERT: <+secrets.getValue("my-dummy-pem")>
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
                      product_access_token: MY_PROD_TOKEN
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
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
        variables:
          - name: runner_tag
            type: String
            value: dev


```

</details>


## Troubleshooting tips

- To troubleshoot certificate issues, run your pipeline in Debug mode and check for log messages such as **`unable to get local issuer certificate`**.

- In some cases, a scan might report that a certificate is invalid when in fact the root cause is not related to SSL. For example, the certificates might have an invalid domain defined. To determine if the root cause is SSL-related, you might try running a scan with SSL verification disabled temporarily. 

  You'll need to disable verification in both the Harness pipeline and the external scanner. Note that not all scan tools support this option. 

  -  For information about disabling SSL verification in the scanner, go to the external scanner documentation. If the scanner includes a CLI option for this, you can use `tool_args` in your step to run a scan with this option turned off. For example, you can run a [Black Duck Hub](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference#settings) scan with this setting: `tool_args : --blackduck.trust.cert=TRUE`
 
  - If you're using a scanner-specific step with a scanner template, such as Aqua Trivy or Mend, uncheck **Enforce SSL** in the configuration palette. 

  - If you're using a Security step without a scanner template, add this setting to the step: `bypass_ssl_check : true`
