---
title: Feature flag management
sidebar_label: Feature flag management
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9650375859597-Feature-flag-management <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  A feature flag (also known as a split) allows you to choose between different code paths in your system at runtime. Feature flags are an integral part of continuous delivery allowing you to decouple deployment from release. They also enable teams to safely merge new features, bug fixes, or other code changes to one central branch in the version control system, which avoids long-lived feature branches and merge issues by integrating code changes frequently.
</p>
<p>
  <strong>Note: For additional information about feature flags, refer to </strong><a href="https://try.split.io/hubfs/pdfs/oreilly-feature-flag-best-practices/OReilly_and_Split_Feature_Flag_Best_Practices.pdf"><strong>Feature flag best practices</strong></a><strong>. It explains how to implement feature-flagged software successfully, and offers tips on how to configure and manage a growing set of feature flags within your product, maintain them over time, manage infrastructure migrations, etc.</strong>
</p>
<h2 id="creating-a-feature-flag" class="header-anchor">Creating a feature flag</h2>
<p>
  When you create your feature flag, you can specify information for it, which
  includes a name, a description, owners, and tags. This information helps you
  and your team manage your feature flags and customize them to your team's workflow.
  To create a feature flag, do the following:
</p>
<ol>
  <li>
    From the left navigation, click <strong>Feature flags</strong>. The feature
    flags page displays.
  </li>
  <li>
    Click<strong> Create feature flag</strong> to create a new feature flag.
    The Create a feature flag panel appears.<br />
    <br />
    <img src="https://help.split.io/hc/article_attachments/30833091413389" /><br />
    <br />
  </li>
  <li>
    Enter the following information for your new feature flag. This information
    can help you and your team manage your feature flags and customize them to
    your team's workflow.
  </li>
  <li>
    Click <strong>Create feature flag</strong> to create your feature flag. Your
    new flag displays.
  </li>
  <li>
    To configure your feature flag for a particular environment, select the environment
    on the left panel, and click the Initiative environment button within the
    Definition tab.&nbsp;
    <p>
      From here, you can now create a rollout plan. This is also known as setting
      targeting rules. Refer to the<a href="https://help.split.io/hc/en-us/articles/9805284145549-Creating-a-rollout-plan">Create a rollout plan</a>
      guide for next steps in setting up your feature flag.
    </p>
    <p>
      <strong>Note: When you set up an account, two environments are automatically created. If you want to create additional environments, refer to the</strong><a href="https://help.split.io/hc/en-us/articles/360019915771-Environments"> <strong>Environments</strong></a><strong> guide for more information.</strong>
    </p>
    <h2 id="h_01J9G7FAZVSBT8EHX9HXB2W4VT">
      <strong>Deleting a feature flag</strong>
    </h2>
    <p>
      To delete a feature flag, you first need to delete all targeting rules
      for that flag within all environments. To delete a feature flag, do the
      following:
    </p>
    <ol>
      <li>Select the feature flag you want to delete.</li>
      <li>
        Access the desired environment and click the <strong>(...) </strong>icon
        next to the KILL button and click
        <strong>Delete targeting rules</strong>. The Delete rules page appears.
      </li>
      <li>
        Type <strong>DELETE</strong> in the warning page field and then,
        in the Add approvers fields, optionally start typing users or groups.<br />
        <strong>Note: If you don’t add approvers, the feature flag is deleted immediately.&nbsp;</strong>
      </li>
      <li>
        Click the <strong>Delete</strong> button. If you haven’t selected
        approvers, the targeting rules are deleted.
      </li>
      <li>
        Repeat the same action for all environments that the feature flag
        is added to.&nbsp;
      </li>
      <li>
        Once you delete definitions, delete the feature flag by clicking
        the gear icon adjacent to the flag name.
      </li>
    </ol>
    <h2 id="h_01J9G7FAZVQSA4EVM72KTB4H4C">
      <strong>Using the kill switch</strong>
    </h2>
    <p>
      If a feature flag negatively impacts performance or your user’s experience,
      you can kill it without changing targeting rules or performing a redeployment.
      When you kill a feature, all traffic is sent to the default treatment
      selected for that feature flag. To kill a feature flag, do the following:
    </p>
    <ol>
      <li>
        From the left navigation, click <strong>Feature flags</strong>. A
        list of feature flags appear.
      </li>
      <li>
        Select the desired feature flag and click <strong>Kill</strong> on
        the page. The Kill feature flag warning page opens.
      </li>
      <li>
        Type<strong> KILL</strong> in the warning page field.
      </li>
      <li>Optionally add a title, comment, or approver.</li>
      <li>
        Click the <strong>Kill</strong> button. The feature flag is now killed.
      </li>
    </ol>
    <h2 id="h_01J9G7FAZV1GBT2QHD66PG2S7H">
      <strong>Using traffic types</strong>
    </h2>
    <p>
      When you create a feature flag, you must specify a traffic type. Use
      traffic types to identify the type of key you are using to split traffic.
      A traffic type is a particular identifier type for any hierarchy of your
      customer base. Traffic types in Split are customizable and can be any
      key you choose to send to Split, e.g., a user ID, account ID, device,
      persistent cookie, etc. The traffic type denotes the nature of the keys
      that is passed to <em>getTreatment</em> for that feature flag.&nbsp;
    </p>
    <p>
      You can customize traffic types in Split to your particular use cases.
      You must have a traffic type for each type of key you plan to pass to
      getTreatment. The most commonly used traffic types are:
    </p>
    <ul>
      <li>
        user. The key uniquely identifies a known, logged-in user. To protect
        personally identifiable information (PII), never use email address
        or login name here. Instead, consider using either a numeric identifier
        that is the primary key in the table you use to store user information,
        or a hash of that primary key.&nbsp;
      </li>
      <li>
        anonymous. The key is a randomly generated identifier, like a uuid,
        that identifies a visitor using a particular mobile device or browser,
        where it is typically stored as a cookie.
      </li>
      <li>
        account. The key identifies the customer account to which the (logged-in)
        user belongs. This traffic type is often used to maintain consistency
        of behavior for all visitors from a given company or account.
      </li>
    </ul>
    <h3 id="h_01J9G7FAZV6QYZCM2CHXH5Z30F">
      <strong>Creating traffic types</strong>
    </h3>
    <p>
      You can create traffic types as needed at any time, but it’s a best practice
      to do so during your initial account setup, taking into account your
      anticipated needs. Once you create a feature flag with a given traffic
      type, that traffic type cannot be changed, so it is important to get
      it right the first time.
    </p>
    <p>
      <strong>Note: Only administrators can create traffic types.&nbsp;</strong>
    </p>
    <p>
      Split allows you to have up to ten traffic types per project. All environments
      within a project share the same set of traffic types. By default, a project
      has one traffic type named user when you first sign up for your account.
      You can customize your traffic types as needed during your setup.
    </p>
    <p>To add your traffic types, do the following:</p>
    <ol>
      <li>
        From the left navigation pane, click the
        <strong>user's initials</strong> at the bottom and select
        <strong>Admin settings</strong>. The Projects page appears.
      </li>
      <li>
        Find the project to which you would like to add traffic types, and
        click <strong>View</strong>.
      </li>
      <li>
        Click the <strong>Actions</strong> button and select
        <strong>Create traffic type</strong>. The Create traffic type page
        appears.
      </li>
      <li>
        Enter a name for the traffic type and click <strong>Save</strong>.&nbsp;
        Be aware that once a traffic type is created, it cannot be edited.
      </li>
      <li>
        To delete a traffic type, in the <strong>Actions</strong> column,
        click the <strong>Delete</strong> link. You can only delete a traffic
        type if it is no longer used by any feature flag or metric definition.
      </li>
    </ol>
    <p>
      If you need assistance with traffic types, contact
      support@split.io.
    </p>
    <h3 id="h_01J9G7FAZV52GW1W3VXVVJ9Q47">
      <strong>Other traffic types</strong>
    </h3>
    <p>
      It is also possible for a traffic type to identify something other than
      a visitor. For instance, a realty site might use <em>listing</em> as
      a traffic type if they wanted to explore the possibility of having a
      single visitor see different appearances for different property listings.
      For that traffic type, the code would pass to getTreatment the id of
      the listing being displayed.
    </p>
    <p>
      Another example of a less common but useful traffic type is <em>pair</em>,
      which represents a unique match of two users engaged in a dialog.&nbsp;
    </p>
    <h2 id="h_01J9G7FAZWPXDSJ68Y7BMKJ6KX">
      <strong>Using tags</strong>
    </h2>
    <p>
      Use tags to organize and manage feature flags, segments, and metrics
      across the Split user interface. Tags can filter the display to focus
      on a particular team, feature release, portion of your app, or other
      organizational unit you use. We recommend creating tags that are specific
      to your workflow, for example:
    </p>
    <ul>
      <li>
        <strong>By team. </strong>Identify the responsible team using tags
        such as front end, infrastructure, web, or mobile.
      </li>
      <li>
        <strong>By feature release. </strong>Identify all of the feature
        flags associated with a particular release using tags such as reporting,
        new permissioning, or contact database migration.
      </li>
      <li>
        <strong>By feature flag type. </strong>Identify all the feature flags
        associated with paywalls or those that are permanent versus temporary,
        using tags such as paywall, permanent, or temporary.
      </li>
    </ul>
    <p>
      <strong>Notes: Be aware that:</strong>
    </p>
    <ul>
      <li>
        <strong>Tag names of tags are case sensitive.</strong>
      </li>
      <li>
        <strong>Tags are shared across projects, so avoid giving them sensitive names you don't want all users in all projects to see.</strong>
      </li>
    </ul>
    <h3 id="h_01J9G7FAZW7JHQVEFFCHVY3GCR">
      Adding tags
    </h3>
    <p>To tag feature flags, segments, or metrics:</p>
    <ol>
      <li>Select what you want to tag.</li>
      <li>
        Click the gear icon next to the feature flag title and select<strong> Edit details</strong>.
        The Details panel appears.&nbsp;
      </li>
      <li>
        Select the desired tags and click the <strong>Save</strong> button.
      </li>
    </ol>
  </li>
</ol>
<p>
  Now that you've completed your first feature flag, you can <a href="https://help.split.io/hc/en-us/articles/9805284145549-Creating-a-rollout-plan" target="_self">set up your rollout plan</a>.
</p>
<h2 id="additional-essential-guides" class="header-anchor">Additional essential guides</h2>
<p>
  The following are guides that walk you through additional capabilities of our
  Split application:
</p>
<p>
  Refer to our
  <a href="https://help.split.io/hc/en-us/articles/9648555765133-Foundational-concepts" target="_self">Foundational concepts</a>
  guide for more information about foundational concepts of the Split application..
</p>
<p>
  Refer to our
  <a href="https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics" target="_self">Setting up and using metrics</a>
  guide to learn more about creating and using metrics in the Split application.
</p>