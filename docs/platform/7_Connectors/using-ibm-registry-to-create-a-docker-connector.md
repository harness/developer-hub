---
title: Connect to IBM Cloud Container Registry
description: This topic explains how to set up the Docker Connector that uses IBM Registry.
# sidebar_position: 2
helpdocs_topic_id: fjwm9xs5qv
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

You can connect Harness to IBM Cloud Container Registry using a Harness Docker Registry Connector. The Connector uses your credentials to your IBM Cloud Container Registry and allows you to push and pull images.

This topic explains how to use the Harness Docker Registry Connector to connect Harness to the IBM Cloud Container Registry.

In this topic:

* [Before You Begin](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#before_you_begin)
* [Review: Managing IAM Policies in IBM Cloud](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#review_managing_iam_policies_in_ibm_cloud)
* [Supported Platforms and Technologies](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#supported_platforms_and_technologies)
* [Step 1: Generate an API Key in IBM Cloud Console](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#step_1_generate_an_api_key_in_ibm_cloud_console)
* [Step 2: Create a Docker Connector in Harness with IBM Cloud API Key](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#step_2_create_a_docker_connector_in_harness_with_ibm_cloud_api_key)
* [Step 3: Enter Credentials](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#step_3_enter_credentials)
* [Step 4: Set Up Delegates](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#step_4_set_up_delegates)
* [Step 5: Verify Test Connection](https://ngdocs.harness.io/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#step_5_verify_test_connection)

### Before You Begin

* [CI Enterprise Concepts](/article/rch2t8j1ay-ci-enterprise-concepts)
* [Harness Delegate Overview](https://ngdocs.harness.io/article/2k7lnc7lvl-delegates-overview)

### Review: Managing IAM Policies in IBM Cloud

If the IBM Cloud IAM role used by your Docker Registry Connector does not have the policies required by the IBM service you want to access, you can modify or switch the role.

To set up and manage IAM policies, see [Defining access role policies](https://cloud.ibm.com/docs/Registry?topic=Registry-user#user).

When you switch or modify the IAM role, it might take up to 5 minutes to take effect.

### Supported Platforms and Technologies

For a list of the platforms and technologies supported by Harness, see [Supported Platforms and Technologies](https://ngdocs.harness.io/article/1e536z41av-supported-platforms-and-technologies).

### Step 1: Generate an API Key in IBM Cloud Console

Follow the instructions outlined in [Creating an API Key](https://cloud.ibm.com/docs/account?topic=account-userapikey&interface=ui#create_user_key) from IBM.

![](https://files.helpdocs.io/i5nl071jo5/articles/fjwm9xs5qv/1635838489269/wb-ntkbi-2-m-hax-mi-55-var-sz-ucmcc-lm-8-pt-1-wp-i-3-re-njhdy-ganc-poy-8-edgnd-ymfc-72-a-wk-wpe-2-tzpdu-05-n-kq-0-s-oy-h-9-d-hfmop-snm-qih-0-c-ntb-tukv-cvb-2-xgn-9-ep-sci-k-p-6-f-8-kb-3-ns-s-1600)Once the API key is successfully generated, click **Copy** or **Download the API key.**

### Step 2: Create a Docker Registry Connector in Harness

You can create the Docker Registry Connector at the Harness **Account**, **Organisation**, or **Project** level. In this example, we'll use a **Project**.

Open a Harness **Project**.

In **Project Setup**, click **Connectors**.

Click **New Connector**, and under **Artifact Repositories** click **Docker Registry**. 

![](https://files.helpdocs.io/i5nl071jo5/articles/fjwm9xs5qv/1635838479693/djubb-gqpn-syjuvzocy-8-sfed-xptv-xv-zb-f-0-z-wvkf-m-5-x-us-81-n-mjkfavb-l-4-x-0-a-pprveg-boiy-6-u-km-djj-94-cd-3-mf-1-tve-je-1-a-n-ccxh-wdu-rs-ge-1-o-1-qoy-98-c-ryqim-ud-mmsi-zvwa-x-1-yno-8-c-s-1600)The Docker Registry Connector settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/fjwm9xs5qv/1635838468117/pq-0-i-9-jfaf-nbf-byvmty-5-g-gnvp-zw-lwqch-19-ibe-kzvy-e-5-n-qf-74-oo-0-mjh-zi-ka-uxis-98-yvp-d-3-d-6-ywb-7-opk-ta-hea-6-mag-9-p-jqvrb-omp-ay-n-5-j-2-un-gghv-uherhl-j-v-5-z-9-cu-sdxoq-ge-y-s-1600)In **Name**, enter a name for this connector.

Harness automatically creates the corresponding Id ([entity identifier](https://ngdocs.harness.io/article/li0my8tcz3-entity-identifier-reference)).

Click **Continue**.

### Step 3: Enter Credentials

Here is where you'll use the API key you generated in IBM Cloud.

![](https://files.helpdocs.io/i5nl071jo5/articles/fjwm9xs5qv/1635838456816/j-s-53-vt-5-dqiggu-cqoz-68-j-4-yice-vkbf-p-6-df-3-fsuw-to-3-xl-7-o-fce-wlf-xt-xv-rkjpxoj-pj-xi-wddg-qrlib-dk-3-kmo-5-q-ge-9-c-rvs-sdwb-qql-sypgs-l-81-c-ws-tx-ggjsciw-3-n-9-j-wgu-1-t-g-qht-hxi-m-s-1600)Select or enter the following options:



|  |  |
| --- | --- |
| **Docker Registry URL** | Enter the IBM Cloud Container Registry API endpoint URL. For example:`https://us.icr.io`See [IBM Cloud Container Registry](https://cloud.ibm.com/apidocs/container-registry#endpoint-url) from IBM. |
| **Provider Type** | Select **Other (Docker V2 compliant)** |
| **Authentication** | Select **Username and Password** |
| **Username** | `iamapikey`See [Authentication](https://cloud.ibm.com/docs/Registry?topic=Registry-registry_access&mhsrc=ibmsearch_a&mhq=iamapikey#registry_access_apikey_auth) from IBM. |
| **Password** | In **Password**, click **Create** or **Select a Secret**.In the new Secret in **Secret Value**, enter the API key generated in [Step 1](/article/fjwm9xs5qv-using-ibm-registry-to-create-a-docker-connector#step_1_generate_an_api_key_in_ibm_cloud_console). |

![](https://files.helpdocs.io/i5nl071jo5/articles/fjwm9xs5qv/1635838446600/i-zn-kg-dufgm-uwcm-zw-jbonvv-tu-gz-xecq-q-5-u-6-b-296-guf-hv-si-nia-2-qzbdeeproi-jv-3-l-kf-5-vr-5-sj-5-gz-u-1-ia-zc-80-c-n-3-t-bx-qe-4-p-5-lpm-ghll-jlc-wvzvw-joo-6-b-4-d-lyiq-3-ch-p-3-upq-dz-co-s-1600)Click **Save**, and **Continue**.

### Step 4: Set Up Delegates

Harness uses Docker Registry Connectors at Pipeline runtime to authenticate and perform operations with IBM Cloud Registry. Authentications and operations are performed by Harness Delegates.

You can select Any Available Harness Delegate and Harness will select the Delegate. For a description of how Harness picks Delegates, see [Delegates Overview](https://ngdocs.harness.io/article/2k7lnc7lvl-delegates-overview).

You can use Delegate Tags to select one or more Delegates. For details on Delegate Tags, see [Select Delegates with Tags](https://ngdocs.harness.io/article/nnuf8yv13o-select-delegates-with-selectors).

If you need to install a Delegate, see [Delegate Installation Overview](https://ngdocs.harness.io/article/re8kk0ex4k-delegate-installation-overview).

The Delegate(s) you use must have networking connectivity to the IBM Cloud Container Registry.

Click **Save** and **Continue**.

### Step 5: Verify Test Connection

Harness tests the credentials you provided using the Delegates you selected.

![](https://files.helpdocs.io/i5nl071jo5/articles/fjwm9xs5qv/1635838434773/qipa-zl-2-rpbg-voju-3-m-1-xt-7-dph-9-fkeei-vh-xtt-azic-3-zdulho-soh-ywx-y-1-w-oorl-6-g-86-toaer-4-nsu-ec-8-ozg-g-4-jvv-x-yyhm-xub-yx-xyg-jlhs-5-kta-pnl-vxv-k-5-xkw-xn-x-oh-2-j-zcy-6-n-la-a-1-8-s-1600)If the credentials fail, you'll see an error. Click **Edit Credentials** to modify your credentials.

Click **Finish**.

