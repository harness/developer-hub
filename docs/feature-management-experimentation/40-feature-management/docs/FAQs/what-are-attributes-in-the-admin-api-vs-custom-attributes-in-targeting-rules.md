---
title: What are attributes in the Admin API vs custom attributes in targeting rules?
sidebar_label: What are attributes in the Admin API vs custom attributes in targeting rules?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016744791-What-are-attributes-in-the-Admin-API-vs-custom-attributes-in-targeting-rules <br /> ✘ images still hosted on help.split.io </button>
</p>

## Question

When using the [Admin API](https://docs.split.io/reference#identities-overview) that create attributes to assign a value (Identity) to client Ids, is this the same attribute used in the feature flag definition from the user interface?

<p>
  <img src="https://help.split.io/hc/article_attachments/27337626543501" alt="does_my_sdk_support_semver_menu.png" />
</p>

## Answer

The attributes and customer Identity in the Admin API is completely different from the feature flag definition attributes, they have no connection and do not affect each other.

The Admin API attributes are used to assign any existing customer ID with identities that show up when a user hovers the mouse on a customer id in the Result tab in the Split user interface. They are not involved in the targeting or deciding treatments.

On the other hand, the targeting rules attributes, are usually entered through the user interface, Split accepts any text used for attributes.

When the SDK calls `getTreatment` method, the code need to create the attribute object, insert the same attribute specified in the targeting rules with their corresponding values and pass the attribute object to the `getTreatment` method.