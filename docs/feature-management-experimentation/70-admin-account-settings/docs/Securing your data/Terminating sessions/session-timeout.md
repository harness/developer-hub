---
title: Session timeout
sidebar_label: Session timeout
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020825732-Session-timeout </button>
</p>

Administrators can modify session timeout settings to ensure that a session closes when it is no longer in use. By default, sessions automatically time out after 30 minutes of inactivity, forcing users to re-authenticate for access. However, team administrators can customize this setting for their organization by specifying a timeout value.  Note that all sessions will timeout after 7 days regardless of your organization's setting, forcing users to re-authenticate.  

The timeout value represents the length of time after which the system logs out inactive users. The timeout is between 15 minutes and 7 days. We recommend maintaining a shorter timeout period to enforce stricter security.

Administrators can update session timeout settings as follows:

1. Go to **Admin settings** > **Security** > **Session settings**.
2. Select a timeout value.
3. Click **update**.
