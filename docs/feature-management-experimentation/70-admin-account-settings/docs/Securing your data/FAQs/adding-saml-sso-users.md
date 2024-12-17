---
title: Adding SAML/SSO users
sidebar_label: Adding SAML/SSO users
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360037289472-Adding-SAML-SSO-users </button>
</p>

<p>
  There are two primary options to consider when adding SAML users: SAML Strict Mode and Just-in-Time Provisioning. The following describes each and the options for inviting users with the four potential configurations.
</p>
<p>
  <strong>Strict Mode</strong>
</p>
<p>
  When enabled, users will only be able to log into your Split account through your company’s SSO. As an alternative to Split’s shortcut in your company’s IdP, users may follow the <strong>Single Sign-on URL</strong> found on the SAML tab in the Admin panel. Any user may still set up a password, either through <strong>My Settings</strong> or after creating an account through an invite link, but will get the following message when attempting to log into Split using username and password:<br /><br /><img src="https://help.split.io/hc/article_attachments/15625329902605" alt="auth.png" /><br />
</p>
<p>
  <strong>Just in Time Provisioning</strong>
</p>
<p>
  When enabled, if a user successfully authenticates through SSO but doesn’t yet exist in Split, it will be automatically provisioned and logged into Split. Note that new users can still be added through invites via the admin panel, but in such cases, the user must first complete registration through the invite link before logging into Split through SSO. We recommend not sending invites for users that have Split available through SSO when JIT is enabled, and especially if Strict mode is also enabled.
</p>
<h3 id="h_01HY0ZKT7G08ZH1WPERJXMKHFK">
  <strong>Inviting Users</strong>
</h3>
<p>
  <strong>BOTH StrictMode and JIT areNOT<br />checked</strong>
</p>
<ul>
  <li>
    Invite users via the <em>Invite</em> tab under <em>Users</em> in <em>Admin</em> Settings. This will send an email to users with a link, which they can then follow to complete their registration.
  </li>
  <li>
    Since the user can establish login credentials with Split they will be able to create a password and log in either via username/password or SSO.
  </li>
</ul>
<p>
  <strong>StrictMode only checked</strong> 
</p>
<ul>
  <li>
    You will invite users via the Invite tab.Users will need to log in one time via username and password. 
  </li>
  <li>
    After that, users will need to log in via the SSO portal. 
    <ul>
      <li>
        As an alternative, the user can connect using the<strong>Single Sign-on URL</strong>found
        on the SAML tab.
      </li>
    </ul>
  </li>
</ul>
<p>
  <strong><br />JIT only checked</strong>
</p>
<ul>
  <li>
    Add a user via the SSO portal. You can add a user via an invite, in which case the first login must be through the invite. 
  </li>
  <li>
    If the user does not accept the invite when you subsequently try to add via the portal an error will be thrown and you’ll need to contact support. 
  </li>
  <li>
    If added through the portal, the first time they log in must be via the portal, which will create a user in Split and log them in. 
  </li>
  <li>
    Once logged in they can create a password in My Settings. If added via an invite they will create a password when they respond to the invite. 
  </li>
  <li>
    They can log in either via SSO or username/password.
  </li>
</ul>
<p>
  <strong><br />StrictMode and JIT checked</strong>
</p>
<ul>
  <li>
    The best practice is to add via the portal. If added via the portal the first time they log in must be via the portal, which will create a user in Split and log them in. 
  </li>
  <li>
    You can add a user via an invite, in which case the first login must be through the invite. That will be the only time they log in using username and password. 
  </li>
  <li>
    If the user does not accept the invite if you subsequently try to add via the portal an error will be thrown and you’ll need to contact support. 
  </li>
  <li>
    All subsequent logins must be via the portal or the Single Sign-on URL. Or they can put in just their email address on the login page to get redirected and logged in via most SSO implementations.
  </li>
</ul>
<p>
  <strong>Using SCIM</strong>
</p>
<ul>
  <li>
    If SCIM is enabled to work with your SSO-strict mode account user provisioning
    to create, update, and deactivate members in Split is done directly via your
    IdP.
  </li>
  <li>
    You must add new users in the IdP to give them access to Split. You can't
    invite new users using Split.
  </li>
  <li>Any existing open invites are revoked.</li>
  <li>
    User management actions such as deactivate and activate are disabled in Split.
    IdP administrators control user management.
  </li>
  <li>
    Groups that are synced from the selected IdP are uneditable in Split. If
    you want to change the members in a group, the administrators must push them
    over.
  </li>
</ul>