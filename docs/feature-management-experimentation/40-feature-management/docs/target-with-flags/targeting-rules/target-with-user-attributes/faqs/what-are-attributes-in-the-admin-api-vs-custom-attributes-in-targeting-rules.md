---
title: What are attributes in the Admin API vs custom attributes in targeting rules?
sidebar_label: What are attributes in the Admin API vs custom attributes in targeting rules?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016744791-What-are-attributes-in-the-Admin-API-vs-custom-attributes-in-targeting-rules <br /> ✘ images still hosted on help.split.io </button>
</p>

## Question

When using the [Split API](https://docs.split.io/reference#identities-overview) that create attributes to assign a value (identity) to client IDs, is this the same attribute used in the feature flag definition from the user interface?

## Answer

The attributes and user ID in the Split API is completely different from the feature flag definition attributes, they have no connection and do not affect each other.

The Split API attributes are used to assign any existing user ID with identities that show up when a user hovers the mouse on a user ID in the Result tab in the Split user interface. They are not involved in the targeting or deciding treatments.

On the other hand, the targeting rules attributes, are usually entered through the user interface, Split accepts any text used for attributes.

When the SDK calls `getTreatment` method, the code need to create the attribute object, insert the same attribute specified in the targeting rules with their corresponding values and pass the attribute object to the `getTreatment` method.