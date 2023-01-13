# Integrating Synk and OWASP Scan for NodeJS Application
Integrating testing and security scanning into your business can be a daunting task. However, with the right approach, you can unlock various benefits to help your business grow, gain a competitive advantage, and protect your customers’ data. Testing and security scanning can help you identify weak spots in your systems and applications, improve the functionality of your products and services, and ensure data is protected from malicious actors. When done correctly, these scans can give your business an edge in the marketplace and can even help you save money by preventing costly security breaches. With the right approach, integrating testing and security scanning into your business can help you unlock the full potential of your business.

It is important to automate security testing within your CI/CD pipeline using an automated way to run security scans against your code. To integrate security tools, suites and frameworks of your choice into your continuous integration and delivery (CI/CD) pipeline, you can use a platform like Harness, which integrates with over 40 application security scanners. In this tutorial, we will show you how to integrate and automate security scanning tools into your CI/CD pipeline using Harness. 

## Prerequisites
- [Harness cloud](https://app.harness.io/auth/#/signup/?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started) free trial
- Free [Snyk](https://snyk.io/) account 

## Tutorial
Start by forking this code repository: https://github.com/OWASP/NodeGoat

Next, signup for the [Harness platform](https://app.harness.io/auth/#/signup/?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started) free trial and select the [CI module](https://harness.io/products/continuous-integration) and create a project. 

![description](./static/snyk-owasp-scan/start_ci_first_image.png)

Create your first pipeline. Click ‘Get Started’.
![description](./static/snyk-owasp-scan/get_started_ci_second_image.png)

Once you click on ‘Get Started’, the next step is to connect your repository. Since our code is on GitHub, we will authenticate with GitHub. 

![description](./static/snyk-owasp-scan/scm_tools_third_image.png)

Once the GitHub authentication is done, you should see all your GitHub repositories listed.
Select your repository and continue with ‘Configure Pipeline’.
![description](./static/snyk-owasp-scan/repo_list_fourth_image.png)

Since it is a Node.js project, we will select Node.js and continue with building the pipeline.
![description](./static/snyk-owasp-scan/configure_pipeline_fifth_image.png)

Once you click on ‘Create Pipeline’, you should see the skeleton of your CI pipeline.
Hover over the tab ‘Overview’, and you will see the screen below,
![description](./static/snyk-owasp-scan/overview_stage_details_sixth_image.png)

It will show you the stage name and code base you cloned.

Click continue to go to the ‘Infrastructure’ tab. Here, you will see the infrastructure needed to run your application.
![description](./static/snyk-owasp-scan/infrastructure_linux_amd.png)

Click continue and go to the next tab, ‘Execution’. 
![description](./static/snyk-owasp-scan/execution_build_node_app.png)

You can click on the step ‘Build NodeJS’ and modify the name accordingly. 
Click on the ‘Execution’ tab and then on ‘Build Node App’. You should see the ‘Run’ step configured for you automatically. 
![description](./static/snyk-owasp-scan/configure_run_step_all_four.png)

Now, you can modify the commands. Since we don’t want the first three lines in this project, we will remove them and just keep the ‘npm test’ command. Apply changes and save the pipeline.

Let’s edit and configure the ‘Run Step’.
![description](./static/snyk-owasp-scan/configure_run_step_npm_test.png)

Apply changes and save the pipeline.
Let’s configure security scanning tools with Harness using the Security step. 

## Snyk Security Test and Scanning
Snyk scan is a powerful tool that helps developers and organizations to detect and fix vulnerabilities in their applications. It scans applications for known security threats and provides detailed reports with recommendations on how to fix them. With the help of Snyk scan, developers can easily identify any potential issues in their code, which helps them ensure that their applications are secure and compliant with industry standards. Furthermore, Snyk scan can be used to monitor the security of third-party components used in an application so that developers can be sure that they are not introducing any new vulnerabilities into their codebase.

You will need to create a [Snyk account](https://app.snyk.io/login?cta=sign-up&loc=nav&page=homepage) and get the SNYK_TOKEN.

You need to authenticate your repos for the Snyk configuration. While signing up, it will ask you to authenticate with your SCM tool where your repos are residing [The application code that you would like to run test against] 
![description](./static/snyk-owasp-scan/where_is_code.png)

Complete the signup process and get the Snyk token.

You can see your SNYK_TOKEN by going to your account settings.
![description](./static/snyk-owasp-scan/snyk_account_settings.png)

Let’s configure Snyk security testing in our CI pipeline. This can be done using the security step.

Note: Security scanning can be used as a Stage using the STO module and as well as a Step.

Add a step and select ‘Security’ and start configuring your security scanning frameworks.

![description](./static/snyk-owasp-scan/security_step.png)

You need to provide a name and setup stage.
![description](./static/snyk-owasp-scan/set_up_stage.png)

The next step is to define the infrastructure and the execution steps.
![description](./static/snyk-owasp-scan/infrastructure_use_new_infra.png)

You have two options to choose from - Kubernetes or VMs. Choose VMs in this example and go to the next step to adding service dependency. 

![description](./static/snyk-owasp-scan/service_dependency_optional.png)

We need to add Service Dependency here to run our security scanning steps. A Service Dependency is a detached service that's accessible to all Steps in a Stage. Service dependencies support workflows such as
- Integration testing: You can set up a service and then run tests against this service.
- Running Docker-in-Docker: You can set up a [dind service](https://ngdocs.harness.io/article/ajehk588p4) to process Docker commands in Run Steps.

Click on ‘Add Service Dependency’ and add the following details.
![description](./static/snyk-owasp-scan/configure_service_dependency.png)

Dependency name = dind

Image = docker:dind

Add your container registry

Let’s move on to add a step and choose security scan from the options.
![description](./static/snyk-owasp-scan/execution_add_step.png)

![description](./static/snyk-owasp-scan/security_step_library.png)

Let’s configure the security step with Snyk security settings. 
![description](./static/snyk-owasp-scan/configure_security_scan_snyk.png)

**Add the following settings** 

scan_type = repository

policy_type = orchestratedScan

product_name = snyk

product_config_name = default

repository_project = NodeGoat

repository_branch = <+codebase.branch>

SNYK_TOKEN = Add your token

## OWASP Scanning for Vulnerabilities
OWASP Scan is a powerful tool that helps organizations identify and fix security vulnerabilities in their web applications. It uses static and dynamic analysis to detect common security issues such as cross-site scripting, SQL injection, and remote file inclusion. OWASP Scan also provides detailed reports on the detected vulnerabilities, which can be used to prioritize remediation efforts. Additionally, it can be used to monitor an application's security posture over time by regularly scanning for new vulnerabilities. With its easy-to-use interface and comprehensive set of features, OWASP Scan is an essential tool for keeping web applications secure.

We can add one more step using security for OWASP scanning. Add it just below the 1st security step. 
![description](./static/snyk-owasp-scan/security_step_library.png)

Add the following settings for the OWASP security step.
![description](./static/snyk-owasp-scan/owasp_scan.png)

scan_type = repository

policy_type = orchestratedScan

product_name = owasp

product_config_name = default

repository_project = NodeGoat

repository_branch = <+codebase.branch>

Your Snyk and OWASP security scanning steps should be as shown below,
![description](./static/snyk-owasp-scan/snyk_owasp_parallel_image.png)

At this point, your whole pipeline should look like this,
![description](./static/snyk-owasp-scan/execution_overview.png)

Now, save everything and run your pipeline.
![description](./static/snyk-owasp-scan/run_pipeline.png)

You can see the pipeline getting executed successfully step by step.
![description](./static/snyk-owasp-scan/security_scanning_all_passing.png)

You can click on the ‘Security Tests’ tab for a more detailed vulnerability report.
![description](./static/snyk-owasp-scan/security_steps_all_tests.png)

If you click on any vulnerability, you can get a full report on it.
![description](./static/snyk-owasp-scan/high_issue_details.png)

Let’s extend the tutorial to understand how these automated security tests and scanning helps in the real world. Let’s take a scenario where the pipeline should fail and not continue to the next step if any HIGH severity vulnerability is found. We need to add just one more detail in any of the security step. Let’s take owasp scanning, for example. We need to add one more detail as below

fail_on_severity = HIGH
![description](./static/snyk-owasp-scan/owasp_fail_on_severity_step.png)

Assume we want to push the image to our preferred container registry once all the security scanning steps are done. Now, if any HIGH vulnerability is found, it should not continue but fail instead. 
![description](./static/snyk-owasp-scan/execution_node_owasp_push.png)

Now, we have configured the pipeline with a simple Node Test and owasp scanning, and when these two steps succeed, the build image should be pushed to our Amazon ECR.
Let’s save and run the pipeline.
![description](./static/snyk-owasp-scan/owasp_fail.png)

You can see that the pipeline found a vulnerability with HIGH severity and hence did not continue with the next step of pushing the build image to our Amazon ECR. 
Get more insights on your security vulnerabilities and dashboard through our Security Testing Orchestration (STO) module.

**Request for [STO](https://www.harness.io/demo/sto?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started) demo today!**