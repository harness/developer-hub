---
title: Add Your Build and Deploy Pipeline Artifacts
description: Add a Harness Service and Artifact Source to identify the artifacts you want to build.
# sidebar_position: 2
helpdocs_topic_id: xhh8oi4bkh
helpdocs_category_id: j1q21aler1
helpdocs_is_private: false
helpdocs_is_published: true
---

The first step in Artifact Build and Deploy pipeline is to create a Harness Service. Harness Service connects to the Artifact Server you added in [Harness Account Setup](/article/xiys9djs0h-1-harness-account-setup) and identifies the artifact to deploy. The Service also contains the scripts used to install and run the build on the target nodes.

This Service is used by the **Artifact Collection** command in [Create the Deploy Workflow for Build and Deploy Pipelines](/article/q6rtl33634-5-deploy-workflow), the Environment's [target infrastructure](/article/fav3v3jx3d-4-environment), and in the set up of the [Deploy Workflow](/article/q6rtl33634-5-deploy-workflow).

In this document, Shell Script Service and a Jenkins job artifact is used as an example but Harness supports all the common [artifact source](/article/7dghbx1dbl-configuring-artifact-server) and [custom sources](/article/jizsp5tsms-custom-artifact-source).### Before You Begin

* [CI/CD with the Build Workflow](/article/wqytbv2bfd-ci-cd-with-the-build-workflow)

### Step 1: Create a Service

Harness Services represent your microservices/apps. You define where the artifacts for those microservices/apps come from, the container specs, configuration variables, and files for those microservices.

To create the Service, perform the following steps:

1. In your Harness Application, click **Services**. To create a Harness Application, see [Application Components](https://docs.harness.io/article/bucothemly-application-configuration).
2. Click **Add Service**. The **Add Services** settings appear.
3. In **Name**, enter a name for your Service. In this example, **ToDo List WAR** is used because ToDo List app is built and packaged it in a WAR file.
4. In **Deployment Type**, select **Secure Shell (SSH)**.
5. In **Artifact Type**, select **Web Archive (WAR)**.
6. In **Application Stack**, select **Standard Tomcat 8**.
7. Click **Submit**.

The new Service is created. There are several installations and start scripts added by default. When your application is deployed, these scripts run on the target host(s).

For more information about the default scripts in a Secure Shell (SSH) Service, see [Traditional Deployments Overview](/article/6pwni5f9el-traditional-deployments-overview).Next, Artifact Source is added.

### Step 2: Add an Artifact Source

The Artifact Source defines where the Artifact Collection step looks for the built artifact during the Build Workflow. Also, the Service is used in the Deploy Workflow to install the artifact on the target host(s).

To add an Artifact Source, perform the following steps:

1. In your Service, click **Add Artifact Source**, and select **Jenkins**. The **Jenkins** settings appear.
2. In **Source Server**, select the Jenkins Artifact Server you set up in [Harness Account Setup](/article/xiys9djs0h-1-harness-account-setup). Once you select the Source Server, the **Job Name** field loads all of the Jenkins jobs from the Source Server.
3. In **Job Name**, select the job you want to run to build your artifact. Harness also supports [Jenkins Multibranch Pipelines](/article/5fzq9w0pq7-using-the-jenkins-command#multibranch_pipeline_support).
4. Select the **Meta-data Only** setting. Typically, metadata is sufficient as it contains enough information for the target host(s) to obtain the artifact. Harness stores the metadata and, during runtime, the Harness Delegate passes the metadata to the target host(s) where it is used to obtain the artifact(s) from the source repo. Ensure that the target host has network connectivity to the Artifact Server.
5. In **Artifact Path**, select the path and name of the artifact. In this example, **target/todolist.war** is used.  
  
When you are done, the **Jenkins Artifact Source** will look something like this:![](https://files.helpdocs.io/kw8ldg1itf/articles/xhh8oi4bkh/1620840173417/8-q-x-4-gdc-p-4-tumwb-hlur-cg-yt-sv-pfkq-xt-8-ixdg-k-9-iazr-mcl-b-5-soz-sl-845-kzds-8-w-i-6-3-em-ay-7-kw-1-sz-mnezk-9-zxp-i-6-adb-2-kge-ug-xzw-t-79-kb-2-kax-bel-vq-qfp-wf-eys-3-u-phm-5-p-5-k-pg-uc)
6. Click **Submit**.  
  
The Artifact Source is added to the Service.![](https://files.helpdocs.io/kw8ldg1itf/articles/xhh8oi4bkh/1620840173670/tvec-vadx-nlz-wt-h-4-q-7398-oms-lkyh-ozi-1-nd-fz-yhqnk-elj-2-uzlq-xyd-xxo-4-k-40-sduec-ca-6-xh-go-04-mkw-segv-3-cgb-bz-rs-l-5-hqq-brrf-oei-wg-2-az-7-yf-t-3-gdw-zb-5-yceih-v-pxzxsxw-1-yhmq)

#### Step: View Artifact History

Next, let's see the artifact history that Harness can pull from Jenkins.

1. Click **Artifact History**.
2. Click **Manually pull artifact**. The **Manually Select An Artifact** dialog appears.![](https://files.helpdocs.io/kw8ldg1itf/articles/xhh8oi4bkh/1620840173900/g-4-d-m-vhb-6-t-2-daxjyxn-lskn-zw-sp-1-tp-54-fs-z-d-f-gxbcan-ikg-o-3-i-7-e-6-mh-glk-auc-yi-byat-ok-at-yc-n-b-7-h-h-0-oi-df-jfi-xqic-tq-m-7-cpx-wb-zkgr-ra-5-x-5-agwjinp-pt-5-w-87-fl-0-us-ee-qg-y)
3. In **Artifact Stream**, select the artifact source you just added.
4. In **Artifact**, select the build for which you want to view history.
5. Click **Submit**.
6. Click **Artifact History** again. The history for the build you specified is displayed.![](https://files.helpdocs.io/kw8ldg1itf/articles/xhh8oi4bkh/1620840174126/6-eaw-xlxx-iohuiw-ew-n-4-ww-7-tj-uys-1-rur-1-ny-hd-lnjc-7-cih-psip-7-jt-qsh-s-5-p-ddh-7-nb-0-fm-ih-zptkm-qsu-s-2-fxnrm-1-r-0-pux-mssoe-5-e-0-w-2-vd-ke-wf-tbf-2-yiqygpgf-2-x-1-t-0-q-sg-50-mrl-hw-o)

 For more information on Service settings, see [Services](/article/eb3kfl8uls-service-configuration).

Now, that the Service is complete, we can create the Build Workflow to build the next version of the artifact.

### Use the Same Artifact Build/Tag Across Multiple Workflows in a Pipeline

When using a Build Workflow followed by multiple Workflows in a Pipeline, you can now pass the same artifact from the first Build Workflow to rest of the Workflows in the Pipeline that deploy the same Harness Service.

Execution of each Workflow will use the artifact collected by the last run Build Workflow in the Pipeline that has collected the artifact from the same Service.

In the first Build Workflow's **Artifact Collection** step's **Build/Tag** setting (described in [Create the Deploy Workflow for Build and Deploy Pipelines](/article/q6rtl33634-5-deploy-workflow)), you specify the artifact to collect. For subsequent **Artifact Collection** steps in the same and subsequent Workflows in the Pipeline deploying the same Service, you can leave the **Artifact Collection** step's **Build/Tag** setting empty and Harness will use the artifact collected by the last Build Workflow in the Pipeline.

This functionality requires the Feature Flag `SORT_ARTIFACTS_IN_UPDATED_ORDER`.

### Next Step

* [Create the Build Workflow for Build and Deploy Pipelines](/article/obqhjaabnl-3-build-workflow)

