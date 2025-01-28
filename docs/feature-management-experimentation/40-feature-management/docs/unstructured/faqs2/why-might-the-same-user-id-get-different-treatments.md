---
title: Why might the same user id get different treatments?
sidebar_label: Why might the same user id get different treatments?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360013215392-Why-might-the-same-user-id-get-different-treatments </button>
</p>

## Question

Why are impressions for the same user id showing different treatments? Shouldn't the same user id should always receive the same treatment throughout the same version of the experiment?

## Answer

The most likely explanation for this is that the definition of the feature flag has a targeting rule that checks an attribute value when assigning the treatment where if the value of the attribute _state_ passed to getTreatment is _CO_, then the off treatment is assigned, otherwise the default rule applies and the on treatment is assigned.

To see if this is indeed the case, make sure that on the Live tail tab you have elected to show the Targeting rule field of the impression (this is the case by default). Then it will be clear why a different treatment was assigned.

In this case, the attribute checked in the targeting rule is the deciding factor as to which treatment a user receives. If the value of that attribute is different between the two calls to getTreatment, a different treatment could be assigned.

Of course if the version showed for the impressions is different, that is another possibility: the definition of the feature flag changed from one version to another in a way that caused the user to be assigned a different treatment.