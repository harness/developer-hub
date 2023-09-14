---
title: Create an integrated STO/CI pipeline
description: Learn how to include STO scans in CI and CD pipelines and stop builds when STO finds any "show-stopper" vulnerabilities.
sidebar_position: 20
helpdocs_topic_id: zy4h4ch6dh
helpdocs_category_id: 8nywcs2sa7
helpdocs_is_private: false
helpdocs_is_published: true
---

This tutorial builds on the [Create a standalone STO pipeline](/tutorials/security-tests/standalone-pipeline) tutorial. You need to complete the standalone STO pipeline, which  scans a test target and reports on the vulnerabilities, but doesn't do anything else.

In this tutorial, you'll learn how to integrate STO functionality into CI and CD pipelines. The core benefit of STO in an integrated pipeline is to fail the pipeline if a scanner finds any "show-stopper" vulnerabilities. The following sections describe the different failure strategies you can implement.

For the list of supported scanners, see [Security step settings reference](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference).

## Objectives

This tutorial guides you through the following workflows:

1. Set up a security step to fail automatically if it detects an issue with the specified severity or higher.
2. Request an exemption ("ignore rule") for a specific issue.
3. Approve the exception. Once approved, the exemption won't fail the pipeline even if it equals or exceeds the severity threshold.

<!-- 
<details open><summary> Review: Security Testing roles</summary>

Harness includes two RBAC roles specifically for STO users:

* **Developer** role — Permissions needed for developer workflows. Developers can request exemptions but can't approve them. 
* **SecOps** role — Permissions needed for Security Operations staff. Only SecOps users can approve exemption requests. 

For more information, go to [Add Security Testing roles](/docs/security-testing-orchestration/onboard-sto/set-up-harness-for-sto#add-security-testing-roles).

</details>

-->


### Fail pipelines on severity

<details open><summary> Key concept: fail_on_severity</summary> 

Every STO scan step has a `fail_on_severity` setting. If any vulnerability with the specified severity or higher is found, the pipeline fails. It is good practice to set `fail_on_severity` in every scan step in an integrated pipeline.

</details>

1. In the Pipeline Studio, open the pipeline that you created in the [Standalone pipeline](/tutorials/security-tests/standalone-pipeline) tutorial.
2. Open the Bandit step.
2. Set **Fail on Severity** to **Critical**. 
3. Click **Apply Changes**, save the updated pipeline, and run a new build with the **DEMO-001** branch.

   ![](./static/sto-integrated-workflows-00.png)

The pipeline now fails because the Bandit step is now configured to fail on any vulnerability with a severity of low or higher. The last log message in the bandit step log is:
```
Exited with message: fail_on_severity is set to critical and that threshold was reached.
```

### Exemptions for specific issues

<details open><summary> Key concept: Exemptions, requests, and approvals</summary>  

You can exempt known issues from  `fail_on_severity` so that they don't stop the pipeline even when a scan detects them. The following steps outline the workflow:

1. A developer requests an exemption to a rule and forwards the request to a SecOps user.

2. The SecOps user approves the request or rejects it. Developer users can request exemptions, but only SecOps users can approve them.

- For information about setting up your roles and permissions, go to [Add Security Testing roles](/docs/security-testing-orchestration/onboard-sto/set-up-harness-for-sto#add-security-testing-roles).

</details>

In this section, you'll create an exemption as a developer and then approve it as SecOps user. (In many real-world scenarios, two separate people will be performing the workflow.)

1. Make sure that you have the SecOps role assigned to yourself:
	1. Click **Account Settings** (left menu) > **Access Control**.
	2. In the **Users** table, click your user profile.
	3. Under Role Bindings, click **+Role**.
	4. Make sure that you have the **Security Testing SecOps** role assigned to yourself.
  
     ![](./static/sto-integrated-workflows-01.png)
     
2. Go to the Security Tests page for the build you ran previously: In the pipeline Studio, click **Execution History** (top right) and then click the last successful build you ran before the failed build.  

  In the following step, you will create an Ignore request for each of the two critical issues found: `subprocess_popen_with_shell_equals_true` (only in the current scan) and `haslib` (common to the baseline scan).

3. In the **Security Tests** tab, do the following steps for each critical issue:
	1. Select the critical issue in the issues table (bottom left) to open **Issue Details**.
	2. Select **Request Exemption**.
  
     ![](./static/sto-integrated-workflows-02.png)
     
	3. In **Request Exemption for Issue**, configure the exemption request as follows:
		1. Where do you want this issue to be exempted? **This pipeline** 
		2. For how long? **1 Day** (*if available*)
		3. Reason this issue should be exempted: **Other**
        4. Further describe the reason this issue should be exempted: **Tutorial example pipeline, not for use in QA or Prod environments**
		4. Click **Create Request**.
    
       ![](./static/sto-integrated-workflows-03.png)
       
4. Click **Security Tests** (left menu) and then **Exemptions** (second-from-left menu).

5. In the Security Review page, click the "thumbs-up" buttons to approve both exemptions.

   ![](./static/sto-integrated-workflows-04.png)
   
6. Go back to your pipeline and run another build with the **DEMO-001** branch. When the build finishes, go to the **Security Tests** page.

7. Click **Exempted** (far right, under **Security Executions**). Note that this button, like the Critical, High, and other buttons, acts as a toggle to show and hide specific issues in the issues table. If you select and unselect **Exempted**, the exempted issues switch between visible and hidden. 

   ![](./static/sto-integrated-workflows-05.png)


9. Go to **Security Tests** > **Exemptions**. Then click **Approved** to show the Ignore rules you created and approved.
10. Click the Delete (**X**) buttons on the right to delete both rules.

    ![](./static/sto-integrated-workflows-07.png)

### Next steps

You've now learned the core STO features and workflows. Here are the next steps you can take.

#### Add more scanner steps

STO supports an extensive set of external scanners for repos, images, and artifacts. See [Security steps reference](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference).

#### Add steps or stages for CI/CD workflows

You know how to implement pipelines when scanners detect security issues, and how to create Ignore Rules for specific issues. Once you set up your Security steps, baselines, and exemptions, you can add more stages and steps to implement your CI/CD workflows.

#### Add governance policies

You can use the [Harness Policy Engine](/docs/platform/governance/Policy-as-code/harness-governance-overview) to create policies based on the [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) standard. For example, you could create a rule like the following to ensure that all pipelines include a Security stage.


```
package pipeline_required  
  
# Deny pipelines that are missing required steps  
deny[sprintf("CI stage '%s' is missing required step '%s'", [stage.name, existing_steps])] {   
     stage = input.pipeline.stages[i].stage                                # Find all stages ...   
     stage.type == "CI"                                                    # ... that are CI stages  
     existing_steps := [ s | s = stage.spec.execution.steps[_].step.type ] # ... and create a list of all step types in use   
     required_step := required_steps[_]                                    # For each required step ...   
     not contains(existing_steps, required_step)                           # ... check if it's present in the existing steps  
}  
  
# steps that must be present in every CI stage - try to create a CI stage without a Security step to see the policy fail  
required_steps = ["Security"]  
  
contains(arr, elem) {   
    arr[_] = elem  
}
```
#### Add failure strategies to a CI/CD stage

You can implement [Failure Strategies](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps) to bypass the failure policies in previous Security steps. One use case for this would be to enable manual interventions when a Security step generates a failure. You could set up a workflow like this:

1. A Build step is downstream from the Security step. It has a failure strategy that's set to run on [All Errors](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings#error-types).
2. The scanner detects issues and the Security step generates an error.
3. The Failure Strategy in the Build step initiates a 30-minute pause before proceeding.
4. The developer and security team evaluate the issues and then abort the pipeline or allow it to proceed.

<!-- 
### Integrated STO/CI Workflow Example

The following pipeline provides a simple example of how you can implement STO into a CI workflow. This is an expanded version of the standalone STO stage we have been working with. The [YAML](#integrated-workflow-yaml) of this pipeline is provided below.

![](./static/sto-integrated-workflows-08.png)

This pipeline works as follows:

1. The **backgroundDinD** step runs Docker-in-Docker as a background service. This is required to run the Docker process that builds and pushes the image.
1. The **banditScan** step  scans a GitHub repo that includes the files required to build an image from the repository code. 
   In this case, `fail_on_severity` is set to `none`. We want to scan the repository, but we also want to build a local image. We'll implement `fail_on_severity` when we scan the built image.
2. The **buildImage** builds a local container image from the repository. It has a Failure Strategy that responds to any error in the previous step — such a failure due to a critical vulnerability — by ignoring it and proceeding with default values. 
3. The **aquaTrivyScan** step uses the open-source tool **Aqua Trivy** to scan the local image. It has `fail_on_severity` set to `critical`.
4. If the Aqua Trivy 


You can view all issues from all scanners in the **Security Tests** tab, and also filter the issue list by scanner.

![](./static/sto-integrated-workflows-09.png)

-->

### Congratulations!

In this tutorial, you learned how to:

1. Add a STO Security stage to your Harness pipelines.
2. Configure Security steps for different security scanners: one for code scanning and one for container scanning.
3. Run a pipeline and scan its codebase and the container image.
4. View the normalized and deduplicated security results in the Security dashboard.


<!-- 
### Integrated Workflow YAML

Here's the YAML of the integrated workflow example we examined in this tutorial.

<details>
  <summary>Integrated Workflow YAML</summary>


```
pipeline:  
    name: quickstart-integrated-pipeline  
    identifier: quickstartintegratedpipeline  
    projectIdentifier: STO  
    orgIdentifier: default  
    tags: {}  
    properties:  
        ci:  
            codebase:  
                connectorRef: $CODEBASE_CONNECTOR  
                build: <+input>  
    stages:  
        - stage:  
              name: Docker Build and Scan  
              identifier: Docker_Build_and_Scan  
              type: CI  
              spec:  
                  cloneCodebase: true  
                  infrastructure:  
                      type: KubernetesDirect  
                      spec:  
                          connectorRef: $K8S_CONNECTOR  
                          namespace: harness-delegate-ng  
                          automountServiceAccountToken: true  
                          nodeSelector: {}  
                          os: Linux  
                  sharedPaths:  
                      - /var/run  
                  execution:  
                      steps:  
                        - step:
                            type: Background
                            name: dind
                            identifier: dind
                            spec:
                              connectorRef: $DOCKER_CONNECTOR
                              image: docker:dind
                              shell: Sh
                              privileged: true
                              entrypoint:
                                - dockerd-entrypoint.sh
                          - step:  
                                type: Security  
                                name: owasp scan  
                                identifier: owasp_scan  
                                spec:  
                                    privileged: true  
                                    settings:  
                                        policy_type: orchestratedScan  
                                        scan_type: repository  
                                        repository_project: nodegoat  
                                        repository_branch: <+codebase.branch>  
                                        product_name: owasp  
                                        product_config_name: default  
                                        fail_on_severity: HIGH  
                                    imagePullPolicy: Always  
                                failureStrategies:  
                                    - onFailure:  
                                          errors:  
                                              - AllErrors  
                                          action:  
                                              type: Ignore  
                          - step:  
                                type: Run  
                                name: Build Image  
                                identifier: Build_Docker_Image  
                                spec:  
                                    connectorRef: $DOCKER_CONNECTOR  
                                    image: docker:latest  
                                    shell: Sh  
                                    command: |-  
                                        docker build .  -f Dockerfile.app -t nodegoat:local  
                                    privileged: true  
                                when:  
                                    stageStatus: All  
                                failureStrategies:  
                                    - onFailure:  
                                          errors:  
                                              - AllErrors  
                                          action:  
                                              type: ManualIntervention  
                                              spec:  
                                                  timeout: 20m  
                                                  onTimeout:  
                                                      action:  
                                                          type: Abort  
                          - step:  
                                type: Security  
                                name: aqua-trivy scan  
                                identifier: aqua_trivy_scan  
                                spec:  
                                    privileged: true  
                                    settings:  
                                        product_name: aqua-trivy  
                                        product_config_name: aqua-trivy  
                                        policy_type: orchestratedScan  
                                        scan_type: container  
                                        container_type: local_image  
                                        container_domain: docker.io  
                                        container_project: nodegoat  
                                        container_tag: local  
                                        fail_on_severity: HIGH  
                                    imagePullPolicy: Always  
                                failureStrategies: []  

```
</details>

-->
