---
title: Connect to Harness Container Image Registry Using Docker Connector
description: This topic explains how to set up the account-level Docker Connector to connect to the Harness Container Image Registry.
# sidebar_position: 2
helpdocs_topic_id: my8n93rxnw
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

By default, at CIE Pipeline runtime, Harness pulls certain images from public Docker Hub repos. These images are only used for backend processes. At runtime, the Harness Delegate makes an outbound connection to the public repo and pulls the images.

The Harness Container Image Registry is dedicated exclusively to Harness-supported images. You might want to override the default behavior and download your build images from this repo instead. To view the list of images in this registry, enter the following command.


```
curl -X  GET https://app.harness.io/registry/_catalog
```
You can override the default behavior at the Account level and the Stage level:

* **Account-level override:** If you do not want the Harness Delegate to pull images from a public repo for security reasons, you can add a special Harness Connector to your Harness account, and the Delegate will pull these images from the Harness Container Image Registry only.
* **Stage-level override:** You can configure a Build Stage to override the default Delegate and use a dedicated Connector that downloads build images from the Harness Container Image Registry. This is useful when the Delegate cannot access the public repo (for example, if the build infrastructure is running in a private cloud).

Since you and the Harness Delegate are already connected to Harness securely, there are no additional connections to worry about.

If you choose to override the `harnessImageConnector`, you may also avoid triggering any rate limiting or throttling.This topic explains how to set up the Docker Connector to connect to the Harness Container Image Registry.

### Before You Begin

* [CI Enterprise Concept](https://ngdocs.harness.io/article/rch2t8j1ay-ci-enterprise-concepts)
* [Harness Delegate Overview](https://ngdocs.harness.io/article/2k7lnc7lvl-delegates-overview)
* [Docker Connector Settings Reference](/article/u9bsd77g5a-docker-registry-connector-settings-reference)

### Review: Allowlist app.harness.io

Since you and the Harness Delegate are already connected to Harness securely, app.harness.io should already be allowlisted and there are no additional connections to worry about.

In the case that app.harness.io is not allowlisted, please allowlist it before proceeding.

In general, and as a Best Practice, you should allowlist Harness Domains and IPs. See **Allowlist Harness Domains and IPs** in [Delegate Requirements and Limitations](/article/k7sbhe419w-delegate-requirements-and-limitations).### Step 1: Create a Docker Connector in Harness

You must create the Harness Docker Connector at the Account level. Make sure that you have the **Account** > **Connectors** > **Create/Edit/View** permission for Harness Platform. See [Permission Reference](/article/yaornnqh0z-permissions-reference#platform) for details on the list of permissions.1. In **Account Settings**, **Account Resources**, click **Connectors**.![](https://files.helpdocs.io/i5nl071jo5/articles/my8n93rxnw/1638257179493/j-0-csvzl-btz-1-u-pl-ki-2-cpgu-9-r-4-utaxka-y-6-c-kpw-ty-zy-8-esxl-9-n-dceqwmy-riaz-gyv-ijk-4-rs-sq-dgvty-8-y-anbicw-w-g-gr-v-3-hiq-w-4-a-3-guaf-lra-yfv-fbnn-wy-p-4-k-drc-4-j-b-4-p-gyk-6-vow-6-ao)

1. Click **New Connector**, and under **Artifact Repositories** click **Docker Registry**. ![](https://files.helpdocs.io/i5nl071jo5/articles/my8n93rxnw/1638257205545/3-o-vzks-vl-2-v-tonq-jb-dosfc-45-byvn-amtf-gid-km-ke-4-vks-tjvxl-egim-kh-on-2-fdiv-ao-uei-c-13-7-wsp-41-zq-4-c-7-xgv-vq-3-o-nguv-ji-3-y-e-5-gwb-a-2-jmi-cl-jukly-iy-ho-6-tct-725-paj-u-6-n-m)The Docker Registry Connector settings appear.![](https://files.helpdocs.io/i5nl071jo5/articles/my8n93rxnw/1638257214322/0-c-p-t-204-vvf-q-26-tov-4-o-jck-1-u-mb-qi-lw-l-4-u-5-76-nuierfl-bn-n-9-y-2-o-qpx-6-gaod-tsle-px-fe-npbrup-5-xv-dad-0-uhr-wqh-zgg-kua-9-kwzir-d-w-2-ek-dvi-8-wu-84-dv-cpb-1-lg-atv-s-t-1-us-60-l-as)
2. In **Name**, enter a name for this connector.  
Harness automatically generates the corresponding ID ([entity identifier](https://ngdocs.harness.io/article/li0my8tcz3-entity-identifier-reference)).  
If you want to override the Account-level Connector, modify the ID and set it to `harnessImage`. You must use the Id `harnessImage`.  
Harness gives precedence to the Connector with the `harnessImage` identifier, and uses it to pull from the Harness Container Image Registry, as opposed to pulling from DockerHub directly.
3. Click **Continue**.

### Step 2: Enter Credentials

Select or enter the following options:



|  |  |
| --- | --- |
| **Docker Registry URL** | Enter `https://app.harness.io/registry` |
| **Provider Type** | Select **Other (Docker V2 compliant)** |
| **Authentication** | Select **Anonymous (no credentials required)** |

Click **Continue**.

### Step 3: Set Up Delegates

Harness uses Docker Registry Connectors at Pipeline runtime to pull images and perform operations. You can select Any Available Harness Delegate and Harness will select the best Delegate at runtime. For a description of how Harness picks Delegates, see [Delegates Overview](https://ngdocs.harness.io/article/2k7lnc7lvl-delegates-overview).

You can use Delegate Tags to select one or more Delegates. For details on Delegate Tags, see [Select Delegates with Tags](https://ngdocs.harness.io/article/nnuf8yv13o-select-delegates-with-selectors).

If you need to install a Delegate, see [Delegate Installation Overview](https://ngdocs.harness.io/article/re8kk0ex4k-delegate-installation-overview).

Click **Save and Continue**.

### Step 4: Verify Test Connection

Harness tests the credentials you provided using the Delegates you selected.

![](https://files.helpdocs.io/i5nl071jo5/articles/my8n93rxnw/1638257525035/s-rk-6-rws-w-q-tp-9-v-sk-k-j-etctiu-jclqw-eszh-4-e-3-g-3-v-n-s-uxhf-88-sgbtja-9-axhqiz-6-m-ee-35-w-z-e-b-1-xmevwwxx-ijt-898-a-0-rt-sp-gew-izfjj-zn-wq-ab-3-g-3-n-5-py-6-aj-9-fdfcfx-l-8-op-a-8-ye-y)If the credentials fail, you'll see an error. Click **Edit Credentials** to modify your credentials.

Click **Finish**.

### Step 5: Override the Connector in the Build Stage (*Optional*)

This step is only applicable when you want to override the default Delegate and download build images using the Connector you just created. 

In the Build Stage, go to the Infrastructure tab and specify your build-image Connector in the **Override Image Connector** field. The Delegate will use this Connector to download images from the Harness repository. 

![](https://files.helpdocs.io/i5nl071jo5/articles/my8n93rxnw/1654003062198/override-image-connector.png)### Step 6: Run the Pipeline

You can now run your Pipeline. Harness will now pull images from the Harness Registry at Pipeline runtime using the configured Connector.

If a connector with`harnessImage` identifier already exists on your **Account**, you need to update the connector instead of creating a new connector.### See Also

* [Permission Reference](https://ngdocs.harness.io/article/yaornnqh0z-permissions-reference#continuous_integration_ci)
* [Harness CI Image List](https://ngdocs.harness.io/article/275bcj03j4)
* [CI Build Image Updates](https://ngdocs.harness.io/article/1h724b6txn)

