---
title: DORA CI/CD Correlation
description: How SEI correlates data between CI and CD stages for measuring Lead Time
sidebar_position: 15
sidebar_label: CI/CD Correlation

---

SEI can connect to one or more CI/CD integrations. The jobs and executions are normalized and can be correlated across multiple sources. For example, you could be using Jenkins as your CI platform and Harness as the CD.

This topic explains how SEI correlates CI and CD stages in the Lead Time workflow for different tool combinations.

The correlation between CI & CD execution is built on generated artifacts (by CI execution) and consumed artifacts (by CD execution). At this time, only container image-type artifacts are supported.

## Requirements

The CI/CD correlation on SEI completely depends upon the artifact information. It is important to ensure SEI receives the artifact data as part of the CI/CD pipeline executions in your software delivery lifecycle. SEI primarily supports correlation for container image-based artifacts. For other artifact types, ensure unique creation of artifact names.

To set up correct correlation between CI and CD stages in SEI when measuring Lead Time, the following information is needed:

* **Artifact Location: ->** Where the artifact is stored (e.g., a Docker repository) (Repository Name)
* **Artifact Name: ->** The name or path of the artifact (Artifact Path) 
* **Artifact Qualifier: ->** A unique identifier for the artifact (often a tag or version number)

:::info
Note that for accurate correlation, every CI and CD execution must have a unique combination of artifact name and qualifier.
:::

## Supported integrations mapping

Please refer to the table below for the complete list of CI/CD mapping across different tools that are currently supported in the Lead Time workflow.

<table>
  <thead>
    <tr>
      <th width="300px">CI Tool</th>
      <th width="300px">CD Tool</th>
      <th width="300px">Effort Involved</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="300px">Jenkins</td>
      <td width="300px">Jenkins</td>
      <td width="300px">Requires Custom Scripts in all Jenkins Pipelines</td>
    </tr>
    <tr>
      <td width="300px">Jenkins</td>
      <td width="300px">Harness CD</td>
      <td width="300px">Requires Custom Scripts in all Jenkins Pipelines + Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Harness CI</td>
      <td width="300px">Harness CD</td>
      <td width="300px">Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Github Actions</td>
      <td width="300px">Harness CD</td>
      <td width="300px">GHA workflow configuration + Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Custom CI</td>
      <td width="300px">Harness CD</td>
      <td width="300px">Requires the Custom CI tool to send artifact information using the custom CI/CD integration + Harness CD artifact configuration</td>
    </tr>
    <tr>
      <td width="300px">Custom CI</td>
      <td width="300px">Custom CD</td>
      <td width="300px">Requires the Custom CI tool to send artifact information using the custom CI/CD integration + Custom CD tool to send the same artifact information that is being deployed</td>
    </tr>
  </tbody>
</table>

## Jenkins CI with Jenkins CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when both the CI and CD tool used is Jenkins.

SEI offers two primary methods for integrating Jenkins into your DORA CI/CD correlation workflow:

* [SEI Jenkins Plugin](/docs/software-engineering-insights/sei-integrations/semi-automated-integrations/jenkins-plugin) 
* [Jenkins plugin with a Custom CI/CD webhook.](#jenkins-ci-with-harness-cd)

Understanding when and how to use each method is crucial for effective implementation of DORA metrics in your development process.

:::info
Note that using Jenkins Plugin with a Custom CI/CD integration is is an alternative approach for when you're using Jenkins as your CI tool and a different CD tool, using a custom webhook configurations.
:::

### SEI Jenkins Plugin

The SEI Jenkins Plugin is designed for straightforward integration when Jenkins serves as your primary CI/CD tool. It supports Lead Time, Deployment Frequency and Change Failure Rate configuration. It's ideal for teams who are comfortable with a single-stage configuration for both CI and CD processes and don't require separate metrics for these stages.

To use the plugin, simply install it from the Jenkins plugin store and configure it within your Jenkins environment. Once set up, the plugin automatically sends pipeline execution data for all CI/CD pipelines to SEI. In your SEI workflow profile, you'll need to configure a single stage that represents both CI and CD.

While the plugin offers ease of use, it comes with limitations.

* It doesn't distinguish between CI and CD stages, which may not fit all workflow needs. 
* It's best suited for setups where Jenkins handles both CI and CD and where granular separation of these stages in the DORA profile isn't a priority.

## Jenkins CI with Harness CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when the CI tool is Jenkins and CD tool used is Harness CD.

### Jenkins with Custom CI/CD webhook

For more complex setups, particularly those involving multiple tools or requiring distinct CI and CD metrics, the custom integration approach is the way to go. This approach is especially useful when you're using Jenkins for CI but a different tool, such as Harness, for CD.

Implementing this involves creating a Custom CI/CD integration in SEI and adding custom script logic to your Jenkins pipeline. This script sends build artifact information to SEI via a POST request. 

Here's an example of how you might implement this in your Jenkins pipeline:

```bash
pipeline {
    agent any

    tools {
        // Reference the Docker installation configured in Jenkins Global Tool Configuration
        dockerTool 'docker-latest'
    }
    stages {
        stage ('Git checkout') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'github_pass', url: 'https://github.com/levelops/GHA-Test'
                    echo 'checkout jenkins-rnd repo'
                }
            }
        }
        stage ('Login to Docker Image') {
            steps {
                sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                echo 'Logged into docker successfully'
            }
        }
        stage ('Build Docker Image') {
            steps {
                echo 'Building docker image...'
                sh "docker build -f python-jenkins/Dockerfile -t py-sample-image-dp ."
                echo 'Docker image is built'
            }
        }
        stage ('Run Docker Image') {
            steps {
                echo 'Running docker image...'
                sh "docker run py-sample-image-dp"
            }
        }
        stage ('Tag Docker Image') {
            steps {
                echo 'Tagging docker image...'
                sh "docker tag py-sample-image-dp:latest ${DOCKER_USER}/jenkins-poc-declarative-pipeline:${BUILD_NUMBER}"
                echo 'Provided tag to docker image'
            }
        }
        stage ('Publish Docker image') {
            steps {
                echo 'Publishing docker image to hub...'
                sh "docker push ${DOCKER_USER}/jenkins-poc-declarative-pipeline:${BUILD_NUMBER}"
                echo 'Docker image is successfully published to docker hub'
            }
        }
        
        stage ('List Shas') {
            steps {
                 script {
                    def GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    echo  GIT_COMMIT_HASH  
                 }
            }
        }
        
        stage ('Submit Execution to SEI') {
            steps {
                script {
                    def apiUrl = "https://app.harness.io/gratis/sei/api/v1/custom-cicd"
                    def repoUrl = "<SCM_REPOSITORY_URL>"
                    def instanceUrl = "<JENKINS_INSTANCE_URL>"
                    def location = "registry.hub.docker.com/<DOCKER_HUB_REPOSITORY>"
                    def instanceId = '<SEI_CICD_INSTANCE_ID>'
                    def apiKey = 'Apikey <YOUR_OWN_SEI_API_KEY>'
                    def buildNumber = env.BUILD_NUMBER
                    def b_number = buildNumber.toLong()
                    def GIT_COMMIT_SHAS = <LIST_OF_COMMIT_SHAS_BETWEEN_CURRENT_AND_LAST_SUCCESSFULL_BUILD>
                    def startTime = <BUILD_START_TIME>
                    
                    def payload = '{ \"pipeline\": \"jenkins-declarative-pipeline\", \"user_id\": \"nishith\", \"repo_url\": \"'+repoUrl+'\", \"start_time\": '+ startTime +', \"result\": \"success\", \"duration\": 77000, \"build_number\": '+b_number+', \"instance_guid\": \"'+instanceId+'\", \"instance_name\": \"jenkins-integration-13\", \"instance_url\": \"'+inUrl+'\", \"job_run\": null, \"job_full_name\": \"jenkins-declarative-pipeline\", \"qualified_name\": \"jenkins-declarative-pipeline\", \"branch_name\": \"main\", \"module_name\": null, \"scm_commit_ids\": [ <GIT_COMMIT_SHAS_AS_LIST> ], \"job_run_params\": [ { \"type\": \"StringParameterValue\", \"name\": \"version\", \"value\": 1 }, { \"type\": \"StringParameterValue\", \"name\": \"revision\", \"value\": 1 } ], \"ci\": true, \"cd\": false, \"artifacts\": [ { \"input\": false, \"output\": true, \"type\": \"container\", \"location\": \"'+location+'\", \"name\": \"jenkins-poc-declarative-pipeline\", \"qualifier\": \"'+b_number+'\" } ] }'
                    
                    sh "curl -X POST ${apiUrl} --header 'Accept: application/json, text/plain, */*' --header 'Referer: https://app.harness.io/gratis/sei/api' --header 'sec-ch-ua-mobile: ?0' --header 'authorization: ${apiKey}' --header 'Content-Type: application/json' --data '${payload}'"
                
                    echo 'Pushed execution detail to SEI...'
                }
            }
        }
    }
}
```

After setting up this custom integration, you'll need to configure Harness CD to consume the artifact information you've sent to SEI. The following details are required to be met in order to set the correlation between Harness CI and Harness CD.

* In your pipeline ensure that you’re using the Deploy stage in Harness CD for artifact deployment
* Configure the correct artifact source for the service. 
* Refer to the same artifact source that is configured in the pipeline service while deploying the artifact. Deploying an artifact for which the artifact source is not configured will result in failure while correlating the CI/CD stage in SEI

Note that SEI natively supports correlation for container image based artifacts. For other artifact types some changes might be required in the Jenkins shell script to ensure unique creation of artifact names.

In your SEI workflow profile, you can then set up separate stages for CI and CD, ensuring correct correlation between the two.

The primary advantage of this approach is flexibility. It allows for distinct CI and CD stages in your metrics and enables more detailed control over artifact information. However, it does require more setup and maintenance compared to the plugin approach.

:::info
Note that for correct correlation of CI and CD it is important to for every CI and CD execution to have unique combination of artifact name and qualifier.
:::

## Harness CI with Harness CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when the CI tool is Harness CI and CD tool used is Harness CD.

In this scenario it is important to ensure both pipelines are using the same artifact source. The following details are required to be met in order to set the correlation between Harness CI and Harness CD.

* In your Harness CD pipeline ensure that you’re using the Deploy stage to perform the artifact deployment
* Configure the correct artifact source for the service.
* Refer to the same artifact source that is configured in the pipeline service while deploying the artifact. Deploying an artifact for which the artifact source is not configured will result in failure while correlating the CI/CD stage in SEI

:::info
Note that SEI natively supports correlation for container image based artifacts. For other artifact types some changes might be required to ensure unique creation of artifact names.
:::

## Github Actions with Harness CD

This section explains how SEI correlates CI and CD stages in the Lead Time workflow when the CI tool is Github Actions and CD tool used is Harness CD.

You can set up a GitHub Actions workflow to allow SEI to ingest the data for the artifacts and environment variables from GitHub Actions. To learn more, go to Github Actions integration.

In this scenario it is important to ensure both pipelines are using the same artifact source. The following details are required to be met in order to set the correlation between Harness CI and Harness CD.

* In your pipeline ensure that you’re using the Deploy stage in Harness CD for artifact deployment
* Configure the correct artifact source for the service. 
* Refer to the same artifact source that is configured in the pipeline service while deploying the artifact. Deploying an artifact for which the artifact source is not configured will result in failure while correlating the CI/CD stage in SEI

:::
Note that SEI natively supports correlation for container image based artifacts. For other artifact types some changes might be required to ensure unique creation of artifact names.
:::

## Others

If you use custom CI tools, custom CD tools, or both, you can use custom CI/CD integrations to send artifact details to SEI and set up correct correlation between the CI and CD stages.

Refer to the documentation on setting up custom CI/CD integration. It is recommended to configure the custom CI/CD integration with assistance from Harness Support to ensure the configuration meets the requirements for CI/CD correlation in lead time.

:::info IMPORTANT NOTE
* SEI natively supports correlation for container image-based artifacts. For other artifact types, modifications may be necessary to ensure unique creation of artifact names.
* For correct correlation of CI and CD, it is crucial that every CI and CD execution has a unique combination of artifact name and qualifier.
:::
