---
title: How can I delete projects?
sidebar_label: How can I delete projects?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044809051-How-can-I-delete-projects <br /> ✘ images still hosted on help.split.io </button>
</p>

## Question

Is it possible to delete a project in Split user interface?

## Answer

Yes, the user interface allows deleting projects. Follow the steps below:

Make sure all feature flags, segments, and metrics are deleted from the project for all environments.

To delete a feature flag, delete all the definitions from its environments.

![](https://help.split.io/hc/article_attachments/30834559978381)

Then delete the feature flag.

![](https://help.split.io/hc/article_attachments/30834579439245)

To delete a segment, first select all its keys.

![](https://help.split.io/hc/article_attachments/30834579439501)

Then delete the keys.

![](https://help.split.io/hc/article_attachments/30834559979661)

Then delete the segment definition, repeat these steps for all environments.

![](https://help.split.io/hc/article_attachments/30834579440525)

Finally delete the segment.

![](https://help.split.io/hc/article_attachments/30834579441165)

To delete metrics, click on the upper top right (...) icon to delete it

![](https://help.split.io/hc/article_attachments/30834579441677)

In the Admin page, under **API keys** page, Make sure all Admin API and SDK keys are revoked for the project environments. For example the screenshot below shows the SDK API key for the "default" project.

how_can_I_delete_workspaces_008.png

In Admin settings, in the left menu, click **Projects**.
In the list of available projects, click the **View** link of the project you want to delete.

![](https://help.split.io/hc/article_attachments/30834559981709)

You will see a list of environments for the selected project, now you can delete each environment using the **Delete** link.
The user interface will allow you to delete all environments except the last one, as each project is required to have at least one environment.
Click the **Actions** button in the top right corner and choose the Delete project option, which will allow you to delete it.

![](https://help.split.io/hc/article_attachments/30834579443341)