---
title: Onboarding guide
description: Set up your permissions, infrastructure, delegate, and connectors.
sidebar_position: 20
helpdocs_topic_id: rlbw5luj4h
helpdocs_category_id: 8nywcs2sa7
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/security-testing-orchestration/onboard-sto/set-up-harness-for-sto
---


import set_up_harness_20 from './static/set-up-harness-for-sto-20.png'
import set_up_harness_20_NEW from './static/set_up_harness_20_NEW.png'
import set_up_harness_21 from './static/set-up-harness-for-sto-21.png'
import set_up_harness_22 from './static/set-up-harness-for-sto-22.png'
import set_up_harness_23 from './static/set-up-harness-for-sto-23.png'
import set_up_harness_24 from './static/set-up-harness-for-sto-23_NEW.png'
import set_up_harness_25 from './static/set-up-harness-for-sto-25.png'

<!-- -->


This topic describes the steps you need to do to set up STO in your pipeline.

The entire setup should take about 30 minutes.

## STO requirements 

Make sure you meet the following requirements before you do the [STO Setup Procedures](#sto-setup-procedures) steps described below.

### External requirements

Before you create your first Harness pipeline, you must have the following:

* Git account and Personal Access Token — If you are scanning a repo, you need an account and access token with the Git provider.
* Docker Hub account — STO uses Docker-in-Docker to run scans. The Pipeline needs to pull the **docker:dind** image from Docker Hub.
* A [build infrastructure](#set-up-a-build-infrastructure-for-sto) for executing pipelines and scanning targets.

### Harness user permissions
* Developers need a Security Testing Developer role to run tests and view results.
* Security Operations staff need a Security Testing SecOps role to run tests, view results, and approve security exemptions.
* To assign these roles, you need an Account Admin role. Project Admin permissions aren't enough. 

### Harness account requirements

Harness recommends you create the following resources at the Account level. This enables you to use them across all projects and pipelines in the account.

* Harness Delegate — Required to run builds in your Kubernetes infrastructure.
* Secret for Git access credentials — Required to set up a codebase connector.
* Git codebase connector — Required if you want to scan a codebase in your pipeline.
* Docker Hub connector — Required to download images needed to run the pipeline.

## STO setup procedures

The following sections describe the workflow for setting up STO. Once you complete this workflow, you'll have the build infrastructure and connectors required to build a pipeline and run security scans. You'll also have an STO-enabled pipeline that you can clone and configure based on your security requirements.

### Add Security Testing roles

Harness includes two [RBAC roles](/docs/platform/role-based-access-control/rbac-in-harness/) specifically for STO users:

* **Security Testing Developer** role — Permissions for developer workflows: 

  - Configure and run scans
  - Set baselines (such as the `main` branch of `latest` tag) for scan targets
  - View scan results and troubleshoot detected issues
  - Configure scan steps to fail the pipeline if any "show-stopper" vulnerabilities are found
  - Request exemptions ("ignore rules") to allow a pipeline to proceed even if a scan detects vulnerabilities with a specific severity or higher (Critical, High, Medium, etc.)

   
* **Security Testing SecOps** role — Permissions for Security Operations staff. SecOps users have all Developer permissions, but only SecOps users can approve exemption requests. 

These workflows are covered in [Your first STO pipeline](/docs/security-testing-orchestration/get-started/your-first-sto-pipeline).

:::note
You need Administrative privileges at the Account level (Account Admin role) to assign these roles.
:::

<details>
<summary>Assign Security Testing roles: default workflow</summary>


1. Select **Account Settings** (left menu) > **Access Control**.
2. In the **Users** table, select the user profile.
3. Under Role Bindings, select **+Role**.
4. Assign the **Security Testing Developer** role or the **Security Testing SecOps** role to the user profile.

![](./static/set-up-harness-for-sto-16.png)



</details>

### Set up a build infrastructure for STO

You need a Harness build infrastructure to run scans in STO. First, review [Operating systems and architectures supported by STO](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#supported-operating-systems-and-architectures). Then select the infrastructure you want to use: 

- [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) 

  This is the simplest option. Not initial setup is required. Run your pipelines on Harness-managed VMs preconfigured with tools, packages, and settings commonly used in CI pipelines. 

- [Self-managed Kubernetes cluster build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure/) 

   Recommended when you want to run ephemeral builds-at-scale in your own infrastructure.

- [Local Docker runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) 

   Recommended for small, limited builds, such as a one-off build on your local machine.

:::note

Kubernetes cluster and local runner infrastructures might also require a Docker-in-Docker background step in your pipeline. For more information, go to [Docker-in-Docker requirements for STO](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#docker-in-docker-requirements-for-sto).

:::

<!-- 

#### Install a Kubernetes delegate for STO

Executing builds in a Kubernetes cluster is useful when you want to run ephemeral builds-at-scale in your own infrastructure. When running builds in a Kubernetes cluster, each stage executes in a pod, and the stage's steps share the pod's resources.

<details>
<summary>Kubernetes Delegate Requirements</summary>

* Number of pods: 3 (two pods for the Harness Delegate, the remaining pod for scanning infrastructure).
* Machine type: 4vCPU.
* Memory: 16GB RAM. The scanning infrastructure and Delegate requirements are low but the remaining memory is for Kubernetes, the Docker container, and other default services.
* Networking: outbound HTTPS for the Harness connection, and to connect to Docker Hub. Allow TCP port 22 for SSH.
* Namespace: when you install the Harness Delegate, it will create the **harness-delegate-ng** namespace. You'll use the same namespace for the scanning infrastructure.
* A Kubernetes service account with permission to create entities in the target namespace is required. The set of permissions should include **list**, **get**, **create**, and **delete permissions**. In general, the **cluster-admin** role or a namespace *admin* permission is enough. For more information, go to [User-Facing Roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) from Kubernetes.

:::note
Google Kubernetes Engine (GKE) [Autopilot](https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview) is not supported at this time.
:::

</details>

To set up the build infrastructure, you add a connector to your Kubernetes cluster and then install a Harness Delegate.

<details>
<summary>Install a Kubernetes Delegate: Default Workflow</summary>

<ol>
	<li>Select <strong>Account Settings</strong> &gt; <strong>Account Resources</strong> &gt; <strong>Connector</strong>, then <strong>New Connector</strong>.</li>
	<li>Under Cloud Providers, choose <strong>Kubernetes cluster</strong>.</li>
	<li>Enter the following settings in the wizard.<ol>
			<li>In Overview, Name = <strong>STO delegate</strong></li>
			<li>In Details, select <strong>Use the credentials of a specific Harness Delegate</strong>.<br/>If you already have a Delegate set up in your Harness account, you can use the <strong>Specify master URL and credentials</strong> option.<br/>This workflow assumes you are new to Harness.</li>
			<li>Delegate setup: Select <strong>Install new Delegate</strong>.</li>
			<li>Delegate type: select <strong>Kubernetes</strong>.</li>
			<li>Kubernetes setup:<br/>You might need to scroll up/down to set all options.<ul>
					<li><strong>Delegate Name:</strong> sto.</li>
					<li><strong>Delegate Size:</strong> Small.</li>
					<li><strong>What installer do you want to use?</strong> Kubernetes</li>
					<li><strong>Delegate permissions:</strong> Install Delegate with cluster-wide read/write access</li>
					<li><strong>Delegate Configurations:</strong> Primary Configuration</li>
					<li><strong>Delegate Tokens:</strong> default_token</li>
				</ul>
			</li>
			<li>Download the YAML file.</li>
			<li>In a terminal, navigate to the location of the file.</li>
			<li>In the same Terminal, log into your cluster and run the following:<br/><code>kubectl apply -f harness-delegate.yml</code><br/>Once you apply the YAML file, you&#39;ll see an output like this:<pre>% kubectl apply -f harness-delegate.yml<br/>namespace/harness-delegate-ng created<br/>clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-ng-cluster-admin created<br/>secret/sto-proxy created<br/>statefulset.apps/sto created<br/>service/delegate-service created</pre>In the Harness Delegate setup, you'll see the Delegate register with Harness. This might take a few minutes.<div class="note-callout">If you encounter errors, ensure your cluster can connect outbound to <strong>app.harness.io</strong>. See <a href="https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips">Allowlist Harness Domains and IPs</a>.</div>
			</li>
		</ol>
	</li>
	<li>Select <strong>Done</strong> to close the delegate wizard and return to the connector setup.</li>
	<li>In <strong>Delegates Setup</strong>, select <strong>Only use Delegates with all of the following tags</strong>, select the new delegate, and then select <strong>Save and Continue</strong>.</li>
	<li>In <strong>Connection Test</strong>, wait for &#34;Verification successful&#34; and then select <strong>Finish</strong>.</li>
</ol>


</details>

#### Install a local Docker delegate for STO

A local runner build infrastructure is recommended for small, limited builds, such as a one-off build on your local machine. 

For more information, go to [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) in the CI documentation. 

-->


### Create secrets for your Git and DockerHub access credentials

Harness includes a built-in Secrets Manager that enables you to store encrypted secrets, such as access keys, and use them in your Harness account. Secrets are always stored in encrypted form and are not accessible by Harness. Only the delegate, which runs in your infrastructure, can access them.

In this step, you'll create a secret for your GitHub and DockerHub access tokens. Then you'll use the secret when you set up the connector to your GitHub repo.

<details>
<summary>Create a Secret for your GitHub access token: default workflow</summary>

1. In your Github account, a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has the following scopes:
	* repo
	* admin:repo\_hook
	* user
2. Go to **Account Settings** > **Account Resources** and select **Secrets**.
3. Select **New Secret** > **Text**.

  ![](./static/set-up-harness-for-sto-17.png)
  
4. Specify the **Secret Name** and **Secret Value** (your GitHub access token). It's good practice to indicate the scope of the secret in the name, as shown in this example.
    
    ![](./static/set-up-harness-for-sto-18.png)
    
5. Repeat this procedure to create a secret for your [DockerHub access token](https://docs.docker.com/docker-hub/access-tokens/).

</details>


### Create a Docker Hub connector

A Docker Hub connector is required to run a Docker-in-Docker service as described in [Set up the Security stage](#set-up-security-tests-stage) below. It is also required for any pipeline that scans or uploads a built image.

<details>
<summary>Create a Docker Hub Connector: Default Workflow</summary>


1. If you want to upload images to your Docker Hub repo, you'll need an access token. To do this:
	1. Create a token: log in to your Docker Hub account and go to [https://hub.docker.com/settings/security](https://hub.docker.com/settings/security).
	2. [Create a secret](#create-a-secret) for your token.
2. Go to the **Account Settings** > **Account Resources** page and select **Connectors**.
3. Select **New Connector**. Under Artifact Repositories, select **Docker Registry**.
4. In the connector setup wizard, specify the following:
	1. Docker Registry URL = **https://index.docker.io/v2/**
	2. Provider Type = **DockerHub**
	3. Username = Your Docker Hub username
	4. Password = The secret you created for your Docker Hub access token.
5. In Delegates Setup, select **Use any available Delegate** and then select **Save and Continue**.
6. Wait for "Verification successful" and then select **Finish**.

</details>

### Create a Codebase connector

You'll need a GitHub account to do the [STO Tutorials](./tutorials). 

You also need a Git repo connector for any STO pipeline that scans a codebase. You can create codebase connectors for the following SCMs:
 - [Azure](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector)
 - [Bitbucket](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
 - [Git](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference) (platform-agnostic)
 - [GitHub](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
 - [GitLab](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference)

To do the STO tutorials, point the connector at the following repo: [https://github.com/williamwissemann/dvpwa](https://github.com/williamwissemann/dvpwa)

<details>
<summary>Create a Codebase connector: default workflow</summary>

1. Go to the **Account Settings** > **Account Resources** page and select **Connectors**.
2. Under Code Repositories, choose **GitHub**.
3. Specify the following in the setup wizard:
	1. Overview:  
	   Name = **GitHub STO tutorial**.
	2. Details:  
	   **URL Type:** Repository  
	   **Connection Type:** HTTP  
	   **GitHub Repository URL:** https://github.com/williamwissemann/dvpwa
	3. Credentials:  
	   **Username:** Your GitHub username.  
	   **Personal Access Token:** Your [GitHub Personal Access Token secret](#create-secrets-for-your-git-and-dockerhub-access-credentials).  
	   **Enable API Access:** Select this checkbox and select the same secret.
	4. Connect to the provider:  
	   Select **Connect through Harness Platform**.
4. When you're done, select **Save and Continue**. Harness will test the connection and credentials. Select **Finish**.

</details>

## Next steps

Now that you've set up Harness, you're ready to start using STO.

A good next step is to go through [Your first STO pipeline](/docs/security-testing-orchestration/get-started/your-first-sto-pipeline). This tutorial covers the basic concepts of STO. You'll set up a standalone pipeline with one scanner, run scans, analyze the results, and learn how to investigate and fix detected vulnerabilities.

The [STO tutorials](./tutorials) also include a set of quickstarts and end-to-end workflows that show you how to create pipelines that you can apply to a wide variety of security-related use cases. 

Happy scanning! 

<!-- 

## Create a base pipeline for STO

The following procedure creates a pipeline with the STO functionality required to run scans on your repos, images, and instances. This pipeline uses [Bandit](https://github.com/PyCQA/bandit), an open-source tool designed to find common security issues in Python code.  Once you set up this pipeline, you can clone it to a new pipeline and update the pipeline to set up your scans. 

This workflow is covered in [Your first STO pipeline](./sto-tutorials/your-first-sto-pipeline).

### Add a Security Test stage

1. In the Pipeline Studio, go to the project where you want to create the pipeline.
	 
2. Select **Security Testing Orchestration** (top left) > **Pipelines** > **Create a Pipeline**.

  
   <img src={set_up_harness_20_NEW} alt="Choose the STO module" height="50%" width="50%" />
  

	 
3. In Create New Pipeline:
	1. For Name, enter **sto-pipeline-base**.
	3. Select **Start**.
	
  
   <img src={set_up_harness_21} alt="Create the pipeline" height="75%" width="75%" />
  
		 
4. In About your Stage:
	1. Select **Add Stage** and then **Security**.
	2. Stage Name = **securityTestStage**
	3. Configure Codebase:
	   1. Select **Third-party Git provider** (if this option is available)
	   2. Connector = The connector you created in [Create a Codebase Connector](#create-a-codebase-connector) 
	   3. Repository Name = **dvpwa**
	
  
   <img src={set_up_harness_22} alt="Set up the stage" height="50%" width="50%" />
  


### Set up the Security stage

1. In the **Overview** tab, under **Shared Paths**, select **Add** and enter the path `/var/run`.

  
   <img src={set_up_harness_23} alt="Enter the shared path" height="75%" width="75%" />
  
	 
2. In the **Infrastructure** tab, select the infrastructure and specify the options based on the infrastructure type. 
	
  
   <img src={set_up_harness_24} alt="Define the build infrastructure" height="50%" width="50%" />
  

<!-- 		 
#### Add a Docker-in-Docker background service		 

In the **Execution** tab, do the following:

1. Select **Add Step** and then choose **Background**.
2. Configure the Background step as follows:
2. Dependency Name = `dind`
3. Container Registry = The image connector you specified in [Create a Docker Hub connector](#create-a-docker-hub-connector).
4. Image = `docker:dind`
5. Under Optional Configuration, select the **Privileged** checkbox.
   
    
     <img src={set_up_harness_25} alt="Configure the background step" height="75%" width="75%" />
    


### Add a Bandit scanner step


import set_up_harness_tut_select_variant_field_type from './static/sto-basics-tut-select-variant-field-type.png'
import set_up_harness_26 from './static/configure-bandit-step.png'



1. In the Execution tab, select **Add Step** > **Bandit**.
2. Configure the step as follows:
	1. Scan Mode = **`Orchestration`**
	2. Target Name = `**dvpwa**`
	3. Target Variant — Select the tack button on the right, select **Expression** as the value type, and enter the expression **`<+codebase.branch>`**. 
	
	   With this setting, you will specify the variant — in this case, the branch name — when you execute the pipeline. 

	   
	   <img src={set_up_harness_tut_select_variant_field_type} alt="Configure the background step" height="75%" width="75%" />
	   
	
3. Apply your changes, return to the Stage, and **Save** the pipeline.
    
	  
	   <img src={set_up_harness_26} alt="Configure the background step" height="50%" width="50%" />
	   


## Run the pipeline (optional)

1. Select **Run**.
2. Select Git Branch, enter **master** for the branch name, and then select **Run Pipeline**.
3. When the pipeline finishes, select the **Security Tests** tab to see the dashboard.



# Congratulations!

You now have the build infrastructure, connectors, and pipeline required to build a pipeline and run security scans. You can simply clone the pipeline you just created and configure new pipelines based on your security requirements.

![](./static/set-up-harness-for-sto-27.png)

-->
