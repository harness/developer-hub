---
title: Create the Build and Deploy Pipeline
description: Create a Pipeline to run your Build and Deploy Workflows.
# sidebar_position: 2
helpdocs_topic_id: slkhuejdkw
helpdocs_category_id: j1q21aler1
helpdocs_is_private: false
helpdocs_is_published: true
---

Pipelines define your release process using multiple Workflows and approvals in sequential and/or parallel stages. 

An Artifact Build and Deploy Pipeline simply runs your Build Workflow followed by your Deploy Workflow. The Deploy Workflow uses the Harness Service you set up to get the new build number.

![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840169896/su-mg-mj-gxrbxp-lwx-cuvar-u-15-gx-ywdekkrz-cesw-8-qy-jxcy-eyb-ky-3-b-ni-16-icx-pbdrg-no-8-o-x-vw-n-1-t-4-mxy-72-zzftyfdz-7-myw-pj-lyo-2-f-0-fd-10-0-jmd-bphg-do-4-wwvgd-wn-tyb-2-h-dxpfo-wh)In this topic:

* [Review: Use Build Workflows in a Pipeline](https://docs.harness.io/article/slkhuejdkw-6-artifact-build-and-deploy-pipelines#review_use_build_workflows_in_a_pipeline)
* [Step: Create the Build and Deploy Pipeline](https://docs.harness.io/article/slkhuejdkw-6-artifact-build-and-deploy-pipelines#step_create_the_build_and_deploy_pipeline)
* [Step: Add the Build Workflow](https://docs.harness.io/article/slkhuejdkw-6-artifact-build-and-deploy-pipelines#step_add_the_build_workflow)
* [See Also](https://docs.harness.io/article/slkhuejdkw-6-artifact-build-and-deploy-pipelines#see_also)

### Before You Begin

* [CI/CD with the Build Workflow](/article/wqytbv2bfd-ci-cd-with-the-build-workflow)

### Review: Use Build Workflows in a Pipeline

Here are some important things to remember when using a Build Workflow in a Pipeline:

* **No Artifact Selection** — If you use a Build Workflow in a Pipeline, you cannot select an artifact when you deploy the Pipeline. A Build Workflow tells Harness you will be building and collecting the artifact for the Pipeline. Harness will use that artifact for the Pipeline deployment.
* **Don't Execute in Parallel** — Do not execute a Build Workflow in a Pipeline in parallel with a Workflow that deploys the artifact built by the Build Workflow. The Build Workflow must complete before another Workflow in the Pipeline can deploy the artifact.
* **Always Put Build Workflow First** — The Build Workflow should always be the first stage in the Pipeline. This enables the rest of the Pipeline to use the artifact it builds and collects.

### Step: Create the Build and Deploy Pipeline

To create the Artifact Build and Deploy Pipeline, do the following:

1. In your Harness Application, click **Pipelines**, and then click **Add Pipeline**. The **Add Pipeline** settings appear.
2. In **Name**, enter a name for your Pipeline, such as **Artifact Build and Deploy**.
3. Click **Submit**. The new Pipeline is created.

### Step: Add the Build Workflow

Add the Build Workflow as the first stage in the Pipeline:

1. In **Pipeline Stages**, click the **plus** button. The **Pipeline Stage** settings appear.![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840170023/u-7-mhdfl-cq-cla-3-k-1-a-xnmc-aofga-o-68-n-0-xg-fz-zi-vs-rpk-0-ov-gnl-5-wp-9-m-otim-h-7-em-fbwqp-3-gfc-nxh-cbp-2-eq-4-zu-hgw-0-t-bz-t-mai-pg-vetm-rwzx-x-1-s-kdua-35-k-qkt-6-zh-bkpifq-wp-sgung)
2. In **Step Name**, enter a name for the Build Stage, such as **Build Artifact**.
3. In **Execute Workflow**, select the Build Workflow you created. When you are done, it will look something like this:![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840170184/s-dsbpayel-o-9-oi-hvvb-64-u-2-bu-p-6-t-1-lzrdhjd-ork-9-nkfeka-bfy-4-orgh-qp-5-ha-8-n-d-7-m-5-f-ss-1-jyqfmgecxx-hpfrzdjsxb-poed-gu-3-ntmc-2-tl-9-hwduvuvmsjn-jwrk-1-zir-ged-t-h-2-i-t-1-pe-o)
4. Click **Submit**. The stage is added to the Pipeline.
5. Use the same steps to add the Deploy Workflow to the Pipeline. When you are done, it will look something like this.![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840170496/hr-jn-hdp-2-g-pwpd-oi-6-at-lwuix-f-5-uu-trmiact-2-s-qld-4-y-pi-6-b-1-px-6-zyj-jq-nx-jgrjba-kay-a-7-nyk-b-hs-nhg-eo-x-0-r-1-e-3-er-nsqm-lpz-vfd-erxi-9-umi-1-ve-vkpsc-14-x-3-vq-j-6-h-3-k-ru-5-u-1)
6. Click **Deploy** to run the Pipeline. Note that you do not need to select an artifact build number as the Deploy Workflow will obtain the latest build.
7. Click **Submit**.  
  
The Workflows are run in succession. First, the Build Workflow is run. Click the **Artifact Collection** step to see the metadata collected by Harness, including the build number.![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840170854/s-hrvq-3-pcr-9-vblg-7-c-or-yqwcj-sih-gz-gg-dsxg-wx-n-ypybo-ril-iwx-bnx-r-40-u-qw-agt-mih-v-6-j-4-qi-ej-3-o-1-wv-7-e-5-shym-mo-s-3-u-6-qt-gmxe-zi-ftksr-grv-hf-s-7-q-gm-e-3-bk-ot-1-zay-fcndki-l-1-t)You can see the same build number in Jenkins.  
In this document, Jenkins job artifact is used as an example but Harness supports all the common [artifact source](/article/7dghbx1dbl-configuring-artifact-server) and [custom sources](/article/jizsp5tsms-custom-artifact-source).![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840171288/mq-0-ez-zc-uxqdiie-tcylgdi-hs-wna-ylo-4-foot-qsk-j-9-rcal-dqi-vi-k-0-b-ak-15-t-0-wk-2-yxl-nlh-qrq-svru-5-y-2-qg-3-u-1-e-jszbm-p-4-uisa-xamkp-57-hrm-35-o-s-zy-h-8-b-zm-u-g-9-yx-yuczro-ivc-tl-ex)Next, the Deploy Workflow is run. Click the **Artifact Check** step to see the same build number that was collected by the **Artifact Collection** step. You can also see the build number next to the **Artifacts** heading.![](https://files.helpdocs.io/kw8ldg1itf/articles/slkhuejdkw/1620840171670/xyq-b-7-cdb-gt-ln-uqooxn-btkrj-6-q-qk-omg-iyv-1291-yeeg-ucza-6-l-obcfiwe-jqwke-lbb-qd-0-hh-ciifa-smbr-aeut-yyrxl-7-mgw-bpb-m-81-kvgf-ne-0-m-9-mqcf-j-3-zhe-q-9-n-0-dd-35-w-ii-moqw-ok)The Pipeline has run successfully. You can now build and deploy artifacts by running a single Pipeline.

### See Also

[Trigger Workflows and Pipelines](/article/xerirloz9a-add-a-trigger-2) — Triggers automate deployments using a variety of conditions, such as Git events, new artifacts, schedules, and the success of other Pipelines.

Now that you have an Artifact Build and Deploy Pipeline, you can create a Harness Trigger that runs the Pipeline in response to a Git push to the source repo. The Trigger provides a Webhook URL you can add to your Git repo.

When the push event happens, Git sends a HTTP POST payload to the Webhook's configured URL. The Trigger then executes Artifact Build and Deploy Pipeline.

Do not use **On New Artifact** Trigger to trigger a Build and Deploy Pipeline because you need to Build Workflow to build a new artifact.