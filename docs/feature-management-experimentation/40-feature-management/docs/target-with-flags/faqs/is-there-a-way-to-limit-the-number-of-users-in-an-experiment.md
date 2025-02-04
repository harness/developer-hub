---
title: Is there a way to limit the number of users in an experiment?
sidebar_label: Is there a way to limit the number of users in an experiment?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020304832-Is-there-a-way-to-cap-the-users-participating-in-a-Split-experiment </button>
</p>

### Answer

Within the feature flag definition, there is no cap feature, however, it's possible to limit the number of user in approximate way using the Limit exposure feature.

For example, if the total unique users in the site or page used in the experiment are 1 million, then it's possible to limit the exposure to 15%, which will allow only 150k of the unique users into the experiment.