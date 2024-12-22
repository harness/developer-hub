---
title: Using flag sets to boost SDK performance
sidebar_label: Using flag sets to boost SDK performance
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22256278916621-Using-flag-sets-to-boost-SDK-performance <br /> ✘ images still hosted on help.split.io </button>
</p>

Flag sets allow you to group Split feature flag definitions that logically belong together. You can configure Split SDK to download a flag set (the subset of your feature flag definitions that you need to evaluate on your client) rather than all of your flags defined in a Split Environment. Flag sets allow you to minimize bandwidth and memory usage, boost app responsiveness, and effectively reduce latency and CPU demands.

To use flag sets you need to:

1. Manage flag sets

 Before you can see flag sets in Split UI and associate flag definitions with them, you first need to create them via [Split API](https://docs.split.io/reference/create-flag-set).

2. Associate flag definitions with flag sets in Split UI

   On the Definition tab of a feature flag, you will see the **Flag Sets** button. This button will bring up the Flag Sets modal. The dropdown list shows the flag sets that can be associated with the feature flag definition. Select one or more flag sets, click **Apply** in the Flag Sets modal, and click **Review changes** to save the flag set association for the feature flag definition in the selected Environment.

   For example, given three flags named `experiment_1`, `experiment_2` and `experiment_3`, the flag definition scoped to the Production environment for `experiment_1` can be associated with the flag set `backend`, while the definitions scoped to the Production environment for `experiment_2` and `experiment_3` can be associated with the flag set `frontend`.

   <p class="wysiwyg-indent4">
      <img src="https://help.split.io/hc/article_attachments/30744719369229" alt="using_flag_sets_to_boost_sdk_performance.png" width="646" />
   </p>

3. Configure your SDK to filter by flag set

 Minimize the size of the payload downloaded from Split cloud by configuring the Split SDK to download only feature flag definitions that belong to specific flag set(s). The SDK will only fetch the segment data needed by the list of feature flags it fetches. When flag sets reduce the number of flags fetched, the appropriate subset of segment data is automatically reduced as well.

   All SDKs and the Split Evaluator support flag sets. To find out how to use flag sets in your code, look through the documentation for the language of your project:

    * Android [docs](https://help.split.io/hc/en-us/articles/360020343291-Android-SDK#flag-sets) 
    * GO [docs](https://help.split.io/hc/en-us/articles/360020093652#flag-sets) 
    * iOS [docs](https://help.split.io/hc/en-us/articles/360020401491#flag-sets)
    * Java [docs](https://help.split.io/hc/en-us/articles/360020405151#flag-sets)
    * JavaScript [docs](https://help.split.io/hc/en-us/articles/360020448791#flag-sets)
    * .NET [docs](https://help.split.io/hc/en-us/articles/360020240172#flag-sets)
    * Node.js [docs](https://help.split.io/hc/en-us/articles/360020564931#flag-sets)
    * PHP [docs](https://help.split.io/hc/en-us/articles/360020350372#flag-sets)
    * Python [docs](https://help.split.io/hc/en-us/articles/360020359652#flag-sets)
    * Ruby [docs](https://help.split.io/hc/en-us/articles/360020673251#flag-sets) 
    * Split Evaluator [docs](https://help.split.io/hc/en-us/articles/360020037072#flag-sets)

4. Stay within the limits of your tier

   | **Max number of flag sets ...** | **Limit type** | **Developer** | **Team** | **Business** | **Enterprise** | **Trial** |
| --- | --- | --- |
| per Account | Billing | 15 | 15 | 50 | unlimited | unlimited |
| per Project | Service | 3 | 3 | 15 | 100 | 100 |
| per feature flag definition * | Service | 3 | 3 | 5 | 5 | 5 |
| filtered by a single SDK instance | Service | 10 | 10 | 10 | 10 | 10 |

* A Split feature flag can have a definition for each Environment in your Project. For more information see [Create a feature flag](https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag).

