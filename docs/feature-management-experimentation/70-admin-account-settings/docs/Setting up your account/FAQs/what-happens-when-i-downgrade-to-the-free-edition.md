---
title: What happens when I downgrade to the Free Edition?
sidebar_label: What happens when I downgrade to the Free Edition?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020399652-What-happens-when-I-downgrade-to-the-Free-Edition </button>
</p>

New users to Split get to try out all the capabilities for 30 days to help determine which package makes the most sense for their needs.  The correct package depends on the importance of features such as enterprise-level security and control, the need for more sophisticated functionality such as dynamic configuration or measurement, and/or basic flag and user management provided by the rollout board and SSO authentication.  Of course, for some teams, the Developer package fits their needs.  

When your trial ends, you will automatically be downgraded to the free product.  Upon downgrade, your organization limits will be lowered to the default service limits for Split's Developer Edition.  Don’t worry, if your trial or paid subscription is re-enabled, any configurations set before the downgrade will be reconfigured including permission settings, event data, etc. 

If the Developer package is all you need and you’ve experimented with any of the paid-for features there are a few things to be aware of when the trial ends.  If you have an issue with any of the below when you transition, feel free to contact Split support at support@split.io for assistance.

* There is access to one workspace, and by default, the workspace that comes first alphabetically will be visible while any others you may have created will be inaccessible.  That means, of course, that you’ll want to rename your workspaces so the one to keep is first.  

* There are two Environments.  If you’ve created more, you will lose access to the most recently created environments.

* Flags can have a max of two treatments.  Any flags you’ve created with more than two will continue to work as expected. You will not be able to create new multivariant flags or add treatments to existing flags.

* Segments are limited to 10,000 keys.  Again, any segments you’ve created that have more than 10,000 keys will continue to work.

* Flags with dynamic configurations existing will stay the same and the configuration on the treatment can be modified, but no more configurations can be added to those flags or new flags.

* Existing flags with Limit Exposure will continue to work as they were set and can be modified, but new flags will not be able to use Limit Exposure.

* Flags with dependencies will continue to work and the dependency can be modified, but new flag dependencies cannot be set.

* SSO is disabled, you must switch to username and password logins.

* Editing permissions go away.

* Existing groups are maintained, but no new groups can be created and you cannot add users to existing groups

* Approvals will no longer be available so be sure to have no outstanding flags awaiting approval. 

* Users don’t automatically get removed, but you are expected to comply with the license level that is currently in place and reduce the number of users, if appropriate.

There are a few more features that will become unavailable, but most won’t cause any issues or confusion when your trial ends. 