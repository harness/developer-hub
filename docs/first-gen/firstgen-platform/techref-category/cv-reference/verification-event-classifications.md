---
title: Verification Event Classifications
description: Learn about how Harness classifies verification events.
# sidebar_position: 2
helpdocs_topic_id: 339hy0kbnu
helpdocs_category_id: ugsf6ny1bk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic covers the following classifications of verification events, and related options:

* [Known Event](https://docs.harness.io/article/339hy0kbnu-verification-event-classifications#known_event)
* [Not a Risk](https://docs.harness.io/article/339hy0kbnu-verification-event-classifications#not_a_risk)
* [Anomalous Events](https://docs.harness.io/article/339hy0kbnu-verification-event-classifications#anomalous_events)
* [Priority Events](https://docs.harness.io/article/339hy0kbnu-verification-event-classifications#priority_events)
* [Auditing Event Prioritization](https://docs.harness.io/article/339hy0kbnu-verification-event-classifications#auditing_event_prioritization)

For an overview of verification feedback, and steps on applying and changing an event's classification, see:

* [Harness Verification Feedback Overview](/article/q1m740uwca-harness-verification-feedback-overview)
* [Refine 24/7 Service Guard Verification Analysis](https://harness.helpdocs.io/article/4r2a5nc6q0-refine-24-7-service-guard-verification-analysis)
* [Refine Deployment Verification Analysis](https://harness.helpdocs.io/article/gd9skrjb4g-refine-deployment-verification-analysis)
* [File Jira Tickets on Verification Events](/article/v4d4pd5lxi-jira-cv-ticket)

## Known Event

A Known Event is a non-anomalous event from your baseline execution, as opposed to a **Not a Risk** event, which is from the current execution.

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1620840127152/4-pmkj-hb-j-tjg-tz-f-0-tzo-bg-dhw-se-q-rxwi-8-i-zc-ok-s-7-zxh-7-hjkp-n-0-ne-hweio-uzl-7-lof-i-6-y-sgcoio-6-ltq-bywmdvnntnr-xxt-rqq-4-od-9-e-r-7-ydd-dmg-6-has-8-t-ll-pytk-z-7-ogko-us-5-m-xqlo-7-g)If you decide that a Known Event should fail deployments, you can remove the **Known Event** from the baseline and assign it a priority.

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1620840127545/tl-x-2-m-3-k-2-d-o-5-p-koxwez-rokqbkb-300-r-4-iq-afyrw-lcn-86-owfm-1-o-0-au-zrq-4-dgodx-uc-vp-pku-n-8-wao-znq-kt-0-x-zfz-hlj-6-h-5-ija-jr-vvywh-qckj-6-rzu-4-no-bg-sf-cp-e-2-qyfd-ll-5-qw-hlh-l)## Not a Risk

**Not a Risk** events are events from the current execution that are expected or that have been marked as **Not a Risk** so that they do not fail the deployment. 

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1620840127934/zgsq-s-fldsl-j-8-i-cl-kau-y-4-ij-xmzhu-21-e-xp-31-j-b-0-zrqhshl-3-r-4-wfwxu-5-ge-ca-yxkgsm-ix-mr-40-yivw-zczmy-yg-3-louypo-ocq-08-eiax-3-wm-aojc-82-h-28-the-4-zi-7-fb-tqjr-kpc-97-wz-9-s)**Not a Risk** means the event is in the baseline moving forward. A **Not a Risk** event from the current execution becomes a **Known Event** in subsequent executions.

In many cases, an event is labeled **Not a Risk** because a Jira ticket for the event has been created and it is being resolved.

For anticipated events that do not need a P# assignment, assign the **Not a Risk** priority to the event. The events are added to the baseline of the analysis.

You can also change a **Not a Risk** event to a P# to pull it out of the baseline for subsequent executions.

## Anomalous Events

Anomalous Events fail a deployment. Anomalous Events are events Harness has never seen before and are likely not good. You should assign a priority to the event.

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1620840128277/we-ee-5-t-uhrrdcmv-5-a-4-k-utgncf-64-blbe-tv-12-o-s-7-q-7-i-5-gwvf-ia-qyjtjo-7-tsfcpl-37-v-55-nu-s-0-t-7-mrg-1-e-73-se-cxm-0-ca-wnbojd-2-b-4-he-6-j-6-vd-nqjwcrsagfy-x-99-bymn-ehe-rwik-aye-hn-98)## Priority Events

Priority Events fail a deployment. They range in priority from P0 to P5. 

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1620840128694/xj-ju-esj-47-md-8-tp-5-xnpa-1-jn-1-c-36-cn-wai-85-a-v-9-p-crlnwp-frxmdb-3-vgb-zhj-st-5-hpxdw-fyg-k-9-mu-k-zslg-6-tmz-0-vvsnp-9-trkoi-t-0-bjatmf-glbwv-bq-doc-zwu-x-1-k-cu-ap-lo-7-ld-61-h-ve-fcy)Each priority number has a separate color associated with it:

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1574211119011/image.png)You can change priority levels to specify the priority of the event. When you mark an even with a priority, Harness will identify the event with that priority in future analysis and fail the deployment if the event occurs.

You can assign a Jira issue for any event that has a priority assigned to it. For more information, see [File Jira Tickets on Verification Events](/article/v4d4pd5lxi-jira-cv-ticket).If other matching events are discovered in future deployments, they will be assigned the same P#. The matching is performed by text matching with the event log data.

#### Priority Events in 24/7 Service Guard

While adding priority to events after a deployment is very useful (as described in [Refine Deployment Verification Analysis](https://harness.helpdocs.io/article/gd9skrjb4g-refine-deployment-verification-analysis)), priority events are especially useful in 24/7 Service Guard.

24/7 Service Guard monitors your live, production application or service. You can mark events that show up in the live monitoring as P0-P5 and assign Jira issues for them, thereby fixing issues as soon as they show up. This prevents issues from surfacing during your next deployment.

See:

* [Refine 24/7 Service Guard Verification Analysis](https://harness.helpdocs.io/article/4r2a5nc6q0-refine-24-7-service-guard-verification-analysis)
* [File Jira Tickets on Verification Events](/article/v4d4pd5lxi-jira-cv-ticket)

## Auditing Event Prioritization

Event prioritization is not currently recorded in the Harness [Audit Trail](https://docs.harness.io/article/kihlcbcnll-audit-trail), but when a Harness User changes the priority for an event, their name and the timestamp are recorded, and can be viewed by hovering over the priority.

![](https://files.helpdocs.io/kw8ldg1itf/articles/339hy0kbnu/1620840128988/laro-5-l-5-r-jo-dsys-o-0-h-ag-fs-5-fkfndnnur-98-p-m-6-ca-8-u-8-yvz-4-qxz-6-hw-bhym-k-zkm-lk-f-8-qfe-kf-hfchrg-at-hbr-gi-huef-gkv-o-vq-qdpukzs-lopzs-qt-p-0-m-ew-su-siov-8-lfb-hkt-qz-nuz)