---
title: User key dashboard
sidebar_label: User key dashboard
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 5
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360043245611-Review-customer-dashboard <br /> ✘ images still hosted on help.split.io </button>
</p>

The User key dashboard provides feature flag, segment, and attribute information on a particular [user key](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/keys/keys.md). This dashboard can be navigated to by clicking on a unique key when viewing impression data or using the search bar on the left navigation panel.

## Feature flags

The first tab shows the treatments that are served to that customer for each feature flag in your project. Note that attributes of a customer key remain private to our SDKs, feature flags which use attributes for targeting do not show an expected treatment. 

<p>
  <img src="https://help.split.io/hc/article_attachments/15843004057741" alt="customer-dashboard.png" width="586" />
</p>

## Segments 

The second tab shows the segments that a particular user belongs to or if that user is not part of any segments. Learn more about [creating segments](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment). 

## Attributes

The third tab shows the users's attribute data which is populated from the attribute data you send using Split's API. Learn more about [identifying customers](https://help.split.io/hc/en-us/articles/360020529772-Identifying-customers). 
