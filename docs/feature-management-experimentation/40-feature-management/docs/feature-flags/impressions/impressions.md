---
title: Impressions
sidebar_label: Impressions
helpdocs_is_private: false
helpdocs_is_published: true
---
import Impressions from "@site/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/impressions.md";

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020585192-Impressions <br /> ✘ images still hosted on help.split.io </button>
</p>

## Overview

<Impressions />

You can export impressions based on query criteria in the Data hub's [Data export tab](https://help.split.io/hc/en-us/articles/360048120112-Export-data).

If you do not see incoming impressions in [Live tail](https://help.split.io/hc/en-us/articles/360044867032-Live-tail) within a feature flag's page or the Data hub, ensure that your SDK is installed and functioning as expected. Tips for this are included in the [Live tail](https://help.split.io/hc/en-us/articles/360044867032-Live-tail) article. Contact us at [support@split.io](mailto:support@split.io) if you have any issues. 

## Targeting rule label
 
Targeting rules can be robust within Split. For example, the following is a feature flag with two rules:

```
if user is in segment employees then split 100%:on,0%:off else
if user.location is in list ["california"] then split 100%:on,0%:off else
```

If a user is served the **on** treatment for this feature flag, the targeting rule label explains which of these rules the user matched. The targeting rule label is the summary of the rule that provides that explanation. The label is auto-generated and is valuable in understanding if your feature flag is working as expected. Here are the targeting rule labels for the feature flag shown above.

| **Rule** | **Targeting rule label** | 
| --- | --- | 
| `if user is in segment employees then split 100%:on, 0%:off` | `in segment employees` |
| `if user.location is in list ["california"] then split 100%:on,0%:off else` | `user.location in list ["california"]` |
 
Usually, a treatment is served because the customer matched a particular rule. In this case, the targeting rule label simply indicates the rule that matched. However, in other cases, the SDK serves a treatment even though no rule was matched. This table shows the *tarlabel* generated in those cases.
 
| **Special case** | **Treatment served** | **Targeting rule label** |
| --- | --- | --- |
| Feature flag was killed | [Default](https://help.split.io/hc/en-us/articles/360020528192) | `killed` |
| No rule matched | [Default](https://help.split.io/hc/en-us/articles/360020528192) | `no rule matched` |
| Feature flag was not found, for example, it may not have been downloaded by the SDK yet | [Control](https://help.split.io/hc/en-us/articles/360020528072) | `definition not found` |
| There was an exception while evaluating treatment | [Control](https://help.split.io/hc/en-us/articles/360020528072) | `exception`  |

If your impression tables are showing *not available*, consider upgrading your SDK and ensure that labels are enabled in the SDK configurations.

## Data security
 
*Labels* do not capture identifiable information about your customers. However, if you do not want the Split SDK to capture or send the label back to Split servers, set `labelsEnabled ` to `false` in the SDK advanced configuration.

Additionally, if you don’t want to send a customer UUID to Split as the key, you can hash that ID prior to calling getTreatment. If you decide to hash the ID, be sure to use a deterministic algorithm that results in the same hash value each time. In addition, if it’s important to identify the treatment received by specific users, you must have your own method to be able to associate the hashed value with the actual user ID.

## Integrations for impression data
Use our integrations to push Split feature flag impression data to your existing platforms or your data warehouse for a comprehensive view of user engagement and other key use metrics. Integration documentation is available for the following:
- [Amazon S3](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3)
- [Amplitude](https://help.split.io/hc/en-us/articles/360046658932-Amplitude)
- [Full Story](https://help.split.io/hc/en-us/articles/360045937831-FullStory)
- [Google Analytics](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics)
- [Heap](https://help.split.io/hc/en-us/articles/360035207311-Heap)
- [NewRelic](https://help.split.io/hc/en-us/articles/360020695432-New-Relic)
- [Mixpanel](https://help.split.io/hc/en-us/articles/360045503191-Mixpanel)
- [mParticle](https://help.split.io/hc/en-us/articles/360038306272-mParticle-)
- [Quantum-Metric](https://help.split.io/hc/en-us/articles/4423968122381-Quantum-Metric)
- [SmartBear Bugsnag](https://help.split.io/hc/en-us/articles/5709939011085-Bugsnag)
- [Segment](https://help.split.io/hc/en-us/articles/360020742532)
- [Webhook (outgoing)](https://help.split.io/hc/en-us/articles/360020700232)
