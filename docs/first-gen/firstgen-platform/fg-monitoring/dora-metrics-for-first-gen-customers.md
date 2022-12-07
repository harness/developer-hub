---
title: DORA Metrics for FirstGen Customers
description: This topic describes DORA metrics if you are a Harness FirstGen customer. If you are using the NextGen Platform, go to DORA Metrics. You can view DevOps Research and Assessment (DORA) metrics using t…
# sidebar_position: 2
helpdocs_topic_id: rml7n4hrkt
helpdocs_category_id: d53e6970ow
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes DORA metrics if you are a Harness FirstGen customer. If you are using the NextGen Platform, go to DORA Metrics.You can view DevOps Research and Assessment (DORA) metrics using the DORA Dashboard on the Harness Platform. DORA metrics are key for understanding the performance of software development teams. By understanding these metrics, you’re empowered to iterate and make improvements for your business. 

The DORA dashboard is available only for some FirstGen customers. If you would like access to this dashboard, contact your sales representative. 

### Available DORA metrics

Using the DORA Dashboard, you can view the following metrics: 

* Deployments Frequency
* Success and Failures
* Mean Time to Recovery (MTTR)
* Lead Time to Production

For each of these metrics you can choose to visualize the data by:

* Day
* Week
* Month
* Quarter
* Year

![Example of timeframe selection](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669972951419/v-2-f-83-sodk-0-tpxt-embji-paax-q-0-zay-j-26-cg-3-df-wpb-9-wlyu-mmzz-95-v-6-z-xen-34-i-h-1-epc-qd-26-foat-szrzv-ka-2-elt-6-sh-fes-qh-5-qa-ir-0-dc-r-gotk-j-1-el-nn-xl-uf-56-pm-1-i-kf-dr-3-suvchvu-0-m-bgwz-3-c-tl-hsxxuedxnw-rw-mmm-iu-16-l-qfen-xnt-vy-acddgtlnmt-div-q)#### Deployments Frequency

This metric shows the frequency of deployments. The data is displayed visually in two ways:

##### By status

![Example deployments frequency chart](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669972982873/k-0-d-3-hyqj-dmcg-or-6-vs-ebk-yb-0-q-whzwzwfzu-tw-fot-8-w-bsdia-ju-kty-nc-lw-esg-8-pb-o-2-t-dvlx-o-p-3-rwrdkf-1-t-hm-2-xyn-d-1-kiy-u-l-i-31-ako-p-8-y-vs-k-0-z-wj-0-b-7-e-92-yg-le-nls-xvf-xv-3-r-hf-dzjobcpuf-flqmt-sko-rj-0-nge-vxo-5-l-ate-xl-6-g-xn-k-2-i-eapr-hx-lq-8-jcai-a)The data is displayed per the following status: 

* ABORTED
* EXPIRED
* FAILED
* SUCCESS

##### By environment

![Example deployments frequency by status chart](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669973003713/a-7-giv-hdvtajpf-kyc-hvpglx-e-8-cth-ey-51-esv-po-deg-8-c-hzskp-3-mcbp-6-fbvx-lq-rth-0-zmme-pbdkq-6-y-5-kikxs-7-ovv-pe-qphf-nae-0-zows-i-1-sj-5-fa-6-e-oh-2-y-po-uw-m-5-w-plvabyd-yc-3-kzi-7-hpau-8-haxa-z-u-zxorb-s-5-dsg-sfrhs-yvv-vdb-n-ecg-a-0-oi-hdir-tgv-0-d-0-ca-ra)The data is displayed for production or non-production environments. 

#### Success and failures

![Example success and failures chart](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669973041675/7-oqer-qpl-bx-lpy-icx-00-nper-yjou-brve-ax-pko-9-vioju-5-thh-5-p-qs-ff-szlw-bfhu-glrhmtg-2-lrr-5-e-j-25-hg-2-qsh-0-nd-ig-r-2-xf-2-y-lvk-w-miwc-do-36-fbnemhu-hk-5-rr-y-87-wc-2-c-3-a-xmpao-45-43-v-4-h-h-gg-7-gr-o-9-k-8-w-9-ans-5-sed-smuwdy-dg-bfwsbe-v-7-l-vcygigg)This metric shows the following data:

* Success versus failure rates for all your deployments.
* The percentage failure rate.
* The top 10 service failures within your production or non-production environments.
* The total failures count per each service.

#### Mean Time to Recovery

![Example mean time to recovery chart](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669973092040/lzn-60-o-y-ye-ztdsanx-pj-jz-9-ovpnp-hmz-wjz-zcmr-gnw-8-c-atf-1-u-dz-kush-t-0-n-bpyej-j-1-t-3-ny-yrj-8-et-oz-9-h-8-ov-4-ody-mnmk-fjxag-41-j-3-xeadyrmbg-7-ndc-30-8-yz-a-8-hkz-jt-k-1-l-f-5-rrlydro-eadol-v-73-h-5-u-wh-v-5-uip-zv-pkf-xpplj-mis-plo-p-2-l-ylv-w-0-jl-qxd-ipgukm-2-a)This metric shows the duration of a rollback in seconds. 

#### Lead Time to Production

![Example lead time to production chart](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669973139103/2-qlr-ewl-3-k-1-o-khh-lso-eih-2-ms-30-iz-9-t-8-ce-ajvk-vxqql-sir-gqllpu-0-dy-eyr-2-n-4-fwapx-90-zi-keitvs-3-loq-a-5-gp-pma-h-71-d-8-n-7-aka-3-wjbc-x-3-nd-ar-loya-7-fqom-fcmni-4-one-nw-8-isnyj-effxg-t-5-sor-x-06-ibds-durb-qp-p-63-onhrx-mzq-w-1-sldp-ca-xxl-0-eh-pj-mq)This metric shows the mean duration of pipeline executions of your deployments. The data is displayed visually at a per service level within the timeframe you specified.

### How to view DORA metrics

DORA metrics are not available within the FirstGen platform, however, if you have been set up with access to them, you can view the DORA dashboard within the NextGen platform. To do this: 

1. Go to the Harness Platform.
2. On the top banner, select **Launch Harness Next Generation**.![The launch Harness next generation button](https://files.helpdocs.io/kw8ldg1itf/articles/rml7n4hrkt/1669973172232/mzf-fb-8-d-pw-6-ty-hm-aj-po-7-k-oydc-q-3-dcb-60-zcgbz-lu-vo-2-ww-5-rsdrsfl-qo-mtia-ux-pgbrao-9-a-but-on-e-h-g-2-vo-3-yl-5-tj-281-zr-dyt-wdn-nm-8-m-4-qukrlt-2-zdq-qr-qar-5-aj-rkfkzs-yox-iu-fq-itw-zq-ztpc-n-3-zidk-k-2-haxkg-8-ozi-pg-3-m-sdgy-n-0-ku-in-vagu-xn-va-fzr-rbz-0-g)
3. On the left-hand navigation, select **Dashboards**.
4. Click the **DORA Metrics (First Gen)** tile.

