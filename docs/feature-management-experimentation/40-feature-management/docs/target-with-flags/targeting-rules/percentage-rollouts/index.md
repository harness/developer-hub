---
title: Creating a rollout plan
sidebar_label: Creating a rollout plan
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9805284145549-Creating-a-rollout-plan <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  When you create a rollout plan, you are defining an audience for the code your
  feature flag gates access to. Targeting rules can be simple or sophisticated.
  The default definition consists of on and off treatments and serves the off treatment
  to 100% of users; it can be created in about five seconds with three mouse clicks.
  More sophisticated rollout plans can include lists of individually targeted users,
  if/else-if statements that use demographic data as attributes to assign treatments
  to users, dependencies to other features you manage in Split, and more.
</p>
<p>With a rollout plan, you can:</p>
<ul>
  <li>specify multiple treatments on and off</li>
  <li>attach dynamic configuration payloads to each treatment</li>
  <li>target customers individually into certain treatments</li>
  <li>create if/else targeting rules</li>
  <li>assign treatments based on percentages</li>
  <li>
    set a default treatment to be served when the feature flag is killed
  </li>
</ul>
<p>
  <strong>Define treatment names and descriptions</strong>
</p>
<p>
  Define the<a href="https://help.split.io/hc/en-us/articles/360020525112"> treatments</a>you
  want to serve your customer. ​​Every feature you release using Split has at least
  two treatments. By default these are <strong>on</strong> and
  <strong>off</strong>. You can edit the treatment's name and description as well
  as add additional treatments.
</p>
<p>To define a treatment name, do the following:</p>
<ol>
  <li>
    From the left navigation, select <strong>Feature flags</strong> and then
    your desired feature flag.
  </li>
  <li>
    In the Treatment area of the Definition tab, optionally rename your treatments.
  </li>
  <li>
    To add additional treatments, click the <strong>Add new treatment</strong>
    button.
  </li>
  <li>In the Name field, enter the desired name.</li>
</ol>
<p>
  <strong>Note: You can create up to 20 treatments per feature flag and per environment.</strong>
</p>
<h3 id="h_01JEQWHY9TZVNWY976Q1RQ3TYY">About reserved words when naming a treatment</h3>
<p>
  The following is a list of reserved words that you can't use when you name a
  treatment:
</p>
<p>
  all, and, between, contain, contains, control, datetime, does, end, ends, false,
  has, have, if, in, is, match, matches, not, number, set, split, start, starts,
  string, then, treatment, true, with
</p>
<h2 id="h_01JEQWHY9TC0HASM8Y68C7B5GN">
  <strong>Attaching dynamic configurations to treatments</strong>
</h2>
<p>
  In addition to giving each treatment a name, you can optionally attach configurations
  to your treatments to dynamically control components of your code. These configurations
  give you the ability to remotely change inputs or parameters in your code so
  you can experiment with different variations of a feature without the need for
  a code change and deployment. Examples of parameters you might want to vary through
  dynamic configuration include:
</p>
<ul>
  <li>Color, size and other visual components of your application</li>
  <li>The copy or text in different areas of your application</li>
  <li>
    Backend configurations such as weights set for search algorithms
  </li>
  <li>
    Number of retries and time until timeouts to handle failed connections
  </li>
  <li>Pagination limits for an API return</li>
  <li>Throughput and number of threads for performance thresholds</li>
</ul>
<p>
  You can edit configurations for your treatments in either a form-based or code-based
  interface:
</p>
<ul>
  <li>
    <strong>Form-based.</strong> Define any number of key-value pairs. Ideal
    for simpler configurations and cases where dynamic configurations will be
    maintained by team members who don’t normally write code.
  </li>
  <li>
    <strong>Code-based.</strong> Write or paste valid JSON code. Use the JSON
    interface for more advanced use cases, such as a need for nested objects,
    or because you prefer to work in code rather than in a form.
  </li>
</ul>
<h3 id="h_01JEQWHY9T3NN99A1WHNMX2JT3">Coding for dynamic configuration</h3>
<p>
  To use dynamic configuration, you need to enhance your code to expect the configuration
  parameters to be sent to it by Split. This includes calling the
  <em>getTreatmentWithConfig()</em> method instead of <em>getTreatment</em> and
  then parsing the configuration payload to populate local variables in your code.
  Refer to the Get treatments with configurations section of the<a href="https://help.split.io/hc/en-us/categories/360001534111-Install"> SDK</a>
  you use for dynamic configuration code samples for more information.
</p>
<h3 id="h_01JEQWHY9TEMKVPFWAX240V2F0">Editing configuration as key-value pairs</h3>
<p>
  To edit your configuration as key-value pairs, do the following:
</p>
<ol>
  <li>
    From the left navigation, select <strong>Feature flags</strong> and then
    your desired feature flag.
  </li>
  <li>
    In the Format field of the Dynamic configuration area, select
    <strong>Key-value pairs</strong> as your format. You can then attach one
    or more configurations to each of your treatments.
  </li>
  <li>
    Click the <strong>Add new pair</strong> button and enter a key that you want
    your code to check for (e.g., color, font size, message copy, image path).
  </li>
  <li>
    Enter values for each of your keys (e.g., green, size 16, Buy now!, /promo_images/svg/kermit.svg).
  </li>
  <li>
    Click the<strong> Add new pair button </strong>to add another pair or click the <strong>minus sign </strong>to remove a pair for each treatment. You can attach as many key-value pairs as necessary for each of your treatments.
  </li>
</ol>
<p class="wysiwyg-text-align-left wysiwyg-indent4">
  <img src="https://help.split.io/hc/article_attachments/15616803850893" alt="Screenshot_2023-05-09_at_13.35.00.png" />
</p>
<p>
  <strong>Note: All keys and values are interpreted as strings when configurations are saved in this format (e.g., 5 is stringified and sent as <em>5</em>) so you need to convert your code from that format at runtime.</strong>
</p>
<h3 id="h_01JEQWHY9TYWMTH82PNYAAK9XQ">Editing configurations with JSON</h3>
<p>
  To edit your configuration using the JSON form, do the following:
</p>
<ol>
  <li>
    From the left navigation, click <strong>Feature flags</strong> and then your
    desired feature flag.
  </li>
  <li>
    In the Format field of the Dynamic configuration area, select
    <strong>JSON </strong>as your format. You get a JSON editor for each of your
    treatments.<br />
    <br />
    <img src="https://help.split.io/hc/article_attachments/15616913414413" alt="Screenshot_2023-05-09_at_13.37.18.png" width="614" />
  </li>
  <li>
    Insert valid JSON into the editor. Basic JSON linting is done. Nested JSON
    objects are permitted.
  </li>
  <li>
    Click<strong> expand or collapse i</strong>f you have a large JSON object
    inserted as a configuration and you may need to expand or collapse it when
    editing.
  </li>
</ol>
<p>
  The Split platform stringifies the JSON you enter and provides it as a string
  to each of our SDKs. Be sure to change data type as needed when you parse the
  dynamic configuration payload into local variables in your code.
</p>
<h3 id="h_01JEQWHY9TP37TWK6VZSGZXHYA">Validating data and switching formats</h3>
<p>
  Split validates that the inputted configs are valid JSON and won’t let you save
  until you have inputted a valid JSON.
</p>
<p>
  You can also switch between key-value and JSON editing when configuring your
  plan. However, if moving from JSON to key-value pairs, make sure all keys and
  values in the JSON object are strings. Nested objects, arrays, numbers, or booleans
  are not accepted as key-value pairs, so the user interface prevents you from
  switching.
</p>
<h3 id="h_01JEQWHY9T9RF9YV7PBCRFBCDP">Configuration size limit</h3>
<p>
  Configurations are limited to 1 KB in size per treatment. If you need a larger
  set of configurations, contact<a href="https://help.split.io/hc/en-us/categories/360001538132-Getting-Started"> support@split.io</a>.
</p>
<h2 id="h_01JEQWHY9TZ10C8T0YZDS8R1F3">
  <strong>Targeting treatments</strong>
</h2>
<p>
  After you have defined your treatments, the rest of the Definition tab controls
  who gets which treatment (i.e. which user or other traffic key).
</p>
<h3 id="h_01JEQWHY9T8AW52B4327RHMYTB">About evaluation order</h3>
<p id="data-validation-and-switching-formats" class="header-anchor">
  Evaluation order mirrors the order that the options appear on the Definition
  tab. Once a user matches one of the below sections, no further evaluation is
  performed for that user. When a flag is killed, the default treatment is served
  in all cases until the flag is made active again through a restore or update.<br />
  <br />
</p>
<p>
  <br /><img src="https://help.split.io/hc/article_attachments/10162412922381" alt="Flag_Evaluation_Flow_Chart_v02.png" width="569" height="860" /><br /><br />
</p>
<p>Targeting is evaluated as follows:</p>
<ul>
  <li>
    <strong>Individual target section.</strong> Users and segments you explicitly
    assign to a specific treatment.
  </li>
  <li>
    <strong>Limit exposure.</strong> Users you want to include or exclude from
    your rules. If the percentage is set to 100%, then no limit is applied to
    the allocation. If limit exposure is &lt;100%, we allot the excluded percentage
    of your traffic to the default treatment you selected with the remaining
    users participating in the targeting rules you created.
  </li>
  <li>
    <strong>Targeting rules.</strong> Specific subsets of users targeted by attributes,
    dependencies, or segments. The conditions are structured as layered if/else
    statements and are meant to be readable in nature. They are evaluated in
    order and when a condition is met, then evaluation stops.
  </li>
  <li>
    <strong>Serve and distribute treatments.</strong> If there are no targeting
    rules, or the user doesn't fall into any of the conditions, then two options
    can be evaluated:
    <ul>
      <li>
        Serve: If there are no targeting rules set, or the user does not
        apply to any condition of the rules, then this treatment is served.
      </li>
      <li>
        Distribute treatments: If there are no targeting rules set, or the
        user does not apply to any condition of the rules, the traffic will
        be distributed across the treatments according to the percentages
        chosen.
      </li>
    </ul>
  </li>
  <li>
    <strong>Default treatment.</strong> Users who are excluded from rules by limiting their exposure or all users if the feature flag is killed.
  </li>
</ul>
<h3 id="h_01JEQWHY9VM00DJC24CKVBGAYE">Selecting individually targeted users</h3>
<p>
  If you want to ensure that a specific user always gets a particular treatment,
  you can specify that selecting users. Users are specified either by their unique
  traffic key, or by specifying a segment that the user belongs to. You can create
  multiple individually targeted lists (one for each treatment), but be aware that
  individually targeted evaluations are done in the order of the treatments and
  the first match prevails.
</p>
<p>
  If you’re targeting a segment, select from those segments currently configured
  in the environment and for that traffic type. If you want to target using a new
  segment, create that segment first.
</p>
<h3 id="h_01JEQWHY9VN4G913FFJV6HQM3P">Limiting exposure to your traffic</h3>
<p>
  Use limit exposure when you are running an experiment but want to initially limit
  the amount of users exposed to new treatments. The benefit of using this over
  simply changing percentages in the default rule is that limit exposure allows
  you to make later increases in the percentages exposed to new variants without
  causing users to switch from one new variant to another.
</p>
<p>
  <strong>Note: Experiments benefit from maximum power, which is dependent on the size of the population passing through it. For that reason, avoid limiting the exposure unless you have a good reason (like this canary test) to reduce the exposure of your treatments.</strong>
</p>
<p>
  Consider the situation where you want to canary test the new treatments on a
  small portion of your population before fully rolling out an experiment. In this
  example, you have a backend search engine and want to test out two new ranking
  algorithms and compare them to the status quo.
</p>
<ol>
  <li>Set the initial limit exposure to 10%.</li>
  <li>
    Set the default rule to split the traffic 34% to <em>status_quo</em>, 33%
    to <em>rank_by_price_with_shipping</em>, and 33% to
    <em>rank_by_profitability</em>.
  </li>
  <li>
    Set the default treatment to <em>status_quo</em>.
  </li>
</ol>
<p>
  With these settings, only 10% of the population is exposed to the targeting rules,
  while the rest get the default treatment. As a result, 3.3% of users are initially
  exposed to <em>rank_by_price_with_shipping</em>, 3.3% are exposed to
  <em>rank_by_profitability</em> and 90% + 3.4% are exposed to
  <em>status_quo</em>.
</p>
<p>
  Later, after you’ve proved that the two new variants are functioning as desired
  in the canary test phase, you can come back and change traffic allocation to
  100%. From that point onward, you have 34% / 33% / 33% and none of the initial
  <em>rank_by_price_with_shipping</em> or <em>rank_by_profitabilty</em> population
  have experienced a switch from one treatment to another.
</p>
<h3 id="h_01JEQWHY9VQ463Z4J6GDF35F59">Setting targeting rules</h3>
<p>
  The following describes the targeting rules that you can set.
</p>
<h4 id="h_01JEQWHY9VVN6KPFBJ3TVNR4MX">
  <strong>Setting custom attributes</strong>
</h4>
<p>
  Serve a treatment or percentage based on<a href="https://help.split.io/hc/en-us/articles/360020793231"> custom attributes</a>.
  Custom attributes allow you to create dynamic and targeted feature rollout plans
  using any criteria or dimension of your customers. Attributes are recommended
  when you need to target customers in real time, such as:
</p>
<ul>
  <li>
    Temporal or fast moving data (for example, time since last login, customer
    creation date, browser type, or machine)
  </li>
  <li>
    Sensitive information (for example, customer deal size or customer status)
  </li>
</ul>
<p>
  When deciding whether to use segments or attributes, segments are best when customers
  in a segment do not change often or the grouping of customers needs to be standardized
  across your organization (for example, key accounts, internal or outsourced QA
  teams, company employees).
</p>
<p>
  The instructions in this section explain the proper use of attributes when you
  create rollout plans in the Split user interface. To understand the proper syntax
  for using attributes with the SDK in your code base, refer to the relevant language-specific
  article in our<a href="https://help.split.io/hc/en-us/articles/360033557092-SDK-overview"> SDK Documentation</a>.
</p>
<ol>
  <li>
    In the Targeting section, click the attribute field. A list of attributes
    displays.
  </li>
  <li>
    Select or add an attribute. Split requires you to customize the attributes
    you use in your treatment evaluation. When you define your targeting rules,
    you can base your rules on any custom attribute you provide. To do this,
    add an attribute in the field provided. For more information, refer to the<a href="https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes"> custom attributes</a>
    guide.
  </li>
  <li>
    Select the matcher. When you have input a custom attribute, you are prompted
    to select a matcher. For more information about matchers, refer to the Types
    and matchers for custom attributes section below.
  </li>
  <li>
    Select the attribute values for the attribute that you want Split to match
    after you select a matcher. Below are some examples of usage for different
    types of attributes:
  </li>
</ol>
<ul>
  <li style={{listStyleType: 'none'}}>
    <ul>
      <li>
        Show the <strong>on</strong> treatment for users with custom attribute
        plan_type equal to premium.
      </li>
      <li>
        Show the <strong>on</strong> treatment for users with custom attribute
        registered_date on or after a specified date.
      </li>
      <li>
        Show the <strong>on</strong> treatment for users with custom attribute
        age greater than or equal to 20.
      </li>
      <li>
        Show the <strong>on</strong> treatment for users with custom attribute
        deal_size between 500,000 and 10,000,000.
      </li>
    </ul>
  </li>
</ul>
<h4 id="h_01JEQWHY9VJ0TC2801KPVZ15GR">
  <strong>Serving treatments using dependencies</strong>
</h4>
<p>
  Use Split's dependency matcher when you want one feature flag to depend on the
  evaluation of another feature flag.
</p>
<p>
  For example, you have two feature flags with the second depending on the evaluation
  of the first. In this example, we would like 20% of customers who receive the
  on treatment for the Split_API feature flag to evaluate to on for the advanced_news_feed
  feature flag while the other 80% should evaluate to off.
</p>
<p>
  Dependencies are managed as a matcher type, which means they can be in any of
  the IF or Else IF blocks in targeting rules, supporting your most granular targeting
  needs. To add a dependency, do the following:
</p>
<ol>
  <li>
    From the left navigation, click <strong>Feature flag</strong>, and select
    the desired flag.
  </li>
  <li>
    From the Definition tab, in the Targeting area, click the
    <strong>Add attribute based targeting rules </strong>button.
  </li>
  <li>
    Click the matcher type list, which is the second from the left.
  </li>
  <li>
    Select <strong>is in feature flag </strong>as the matcher type. Select
    the feature flag that appears in the next list.
  </li>
  <li>
    Click the <strong>Select feature flag…</strong> list and scroll or search
    to select the feature flag name.
  </li>
  <li>
    Click the <strong>Select treatments</strong> list. A list of valid treatments
    appears.
  </li>
  <li>Select the desired treatment or treatments.</li>
</ol>
<p>
  As you begin to utilize the dependency matcher, you see the following:
</p>
<ul>
  <li>
    <strong>Environments and traffic types.</strong> The dependency matcher does
    not allow you to depend on another environment's condition or target across
    traffic types.
  </li>
  <li>
    <strong>Circular dependencies.</strong> Split prevents you from creating
    a direct circular dependency by not displaying those feature flags that create
    a circular dependency.
  </li>
  <li>
    <strong>Attributes.</strong> If feature flag B has feature flag A as a dependency
    then the getTreatment call for flag B must pass all the customer attributes
    needed to evaluate flag A. Feature flag B's syntax modal displays all the
    attributes needed to make the evaluation successful.
  </li>
  <li>
    <strong>Deleting.</strong> You cannot remove a feature flag from an environment
    or delete a feature flag if additional feature flags depend on that
    feature flag for their evaluation.
  </li>
</ul>
<h5 id="h_01JEQWHY9VW6EJCD82CRGF6ZES">
  <strong>Things to keep in mind</strong>
</h5>
<p>
  <strong>The dependency matcher doesn’t count as 2+ evaluations.</strong> The
  evaluation is counted as one single evaluation for each child flag and does not
  fire off multiple calls or register multiple impressions.
</p>
<p>
  <strong>There is a warning in the user interface when I use a dependency matcher. </strong>The
  warning you see is to warn you that the dependent feature flag may require some
  additional attributes. You need to update the <em>getTreatment() </em>call to
  include those attribute values. The syntax modal displays all the attributes
  needed to make the evaluation successful.
</p>
<p>
  <strong>Parent feature flags know which child feature flags are using it in their evaluation.</strong>
  If a feature flag is being used as a dependent, Split's user interface informs
  you in the editor. You can't delete the flag, or delete or rename treatments.
</p>
<h4 id="h_01JEQWHY9V1H1VV5F402B7DHD9">
  <strong>Serving treatments to percentage using segment</strong>
</h4>
<p>
  Using segments in targeting rules, rather than individually targeting, serves
  a treatment to a percentage of that segment. Use segments for targeting relatively
  fixed or specific groups of users that you can identify, like a list of accounts.
  For example, you can gradually roll out a treatment to a segment of your beta
  users. To set up segments, refer to the<a href="https://help.split.io/hc/en-us/articles/360020407512"> Segments</a>
  guide.
</p>
<h3 id="h_01JEQWHY9VCP3RD0X18W5HM2R1">Selecting treatment to serve</h3>
<p>
  You can select a treatment to serve to all the users. In the Targeting rules
  section, select the Serve option, and then the treatment you want to set. You
  can also specify a percentage of the population that gets each treatment. If
  any of the users weren't assigned a treatment, you can place them into a treatment
  or randomly distribute these users between your treatments and variations based
  on percentages you decide.
</p>
<p>
  To select percentages, in the Distribute treatment as follows section, click
  the down arrow and select <strong>percentages</strong>. The percentage selections
  appear. Select the desired percentages.
</p>
<h3 id="h_01JEQWHY9VNQSB1BWX425C9K8Y">Setting the default treatment</h3>
<p>
  Set the<a href="https://help.split.io/hc/en-us/articles/360020528192"> default treatment</a>
  if the feature flag is killed or the customer has been limited from exposure
  to the flag. The default treatment is always one of the treatments defined for
  any feature flag in the targeting rules. The default treatment is returned by
  the SDK in following scenarios:
</p>
<ul>
  <li>
    <strong>Does not meet any defined conditions</strong>. The default treatment
    is shown to customers who are excluded from the targeting rules via the limit
    exposure functionality.
  </li>
  <li>
    <strong>The feature flag is killed.</strong> If a particular feature flag
    is killed, the default treatment overrides the existing targeting rules and
    is returned for <strong>all</strong> customers.
  </li>
</ul>
<p>
  Your default treatment should always be one that exposes fully tested and safe
  code. In an <strong>on/off</strong> feature flag, the default treatment is typically
  the <strong>off</strong> state. In a multivariate feature, the default might
  be <strong>off</strong>, or it might be defined as the treatment that is currently
  used by 100% of traffic.
</p>
<p>
  <strong>Note: You can set any of the treatments in your targeting rules as a default. We recommend selecting the safest treatment for your customers as the default treatment (that is, off, old version) when beginning the rollout. However, when you complete the rollout, you may want to make the new experience the default in the case that feature is accidentally killed before being removed.</strong>
</p>
<h2 id="h_01JEQWHY9V4KVSK7V9YD38NGW8">Setting the alert baseline treatment</h2>
<p>
  When you use a percentage based rollout or run an experiment using percentage-based
  targeting, Split can automatically monitor metric thresholds and alert you if
  they are exceeded. The alert baseline treatment is the status-quo or safe treatment
  that you want to compare other treatments to when deciding whether to alert.
  Refer to the
  <a href="https://help.split.io/hc/en-us/articles/360029566292-Set-the-alert-baseline-treatment-" target="_self">Set the alert baseline treatment</a>
  guide for more information about selecting a valid baseline treatment.
</p>
<h2 id="h_01JEQWHY9VQES2NAX3483PGGSF">Saving changes to a feature flag</h2>
<p>
  <strong>Note: If you make changes to your feature flag, it’s good practice to get them reviewed by submitting them for approval. To learn more about this, refer to the</strong><a href="https://help.split.io/hc/en-us/articles/360039250851"><strong> approval flows</strong></a> <strong>guide.</strong>
</p>
<p>
  To save changes you make to your feature flag, do the following:
</p>
<ol>
  <li>
    After making changes in your selected feature flag, click the
    <strong>Review changes</strong> button. The Change summary page appears.
    This displays a diff view that indicates what changed in the feature flag.
  </li>
  <li>
    You can optionally:<br />
    <ul>
      <li>In the Title field, add a title to your change.</li>
      <li>
        In the Comments field, add a description of the changes you made.
      </li>
      <li>
        In the Approvers field, add approvers to review your changes.
      </li>
      <li>In the Status field, change the status of the feature flag.</li>
    </ul>
  </li>
  <li>
    Click the <strong>Save</strong> button to save your changes.
  </li>
</ol>
<p>
  For any changes that you make, get them reviewed by submitting them for approval.
  Refer to the<a href="https://help.split.io/hc/en-us/articles/360039250851"> approval flows</a>
  guide for more information.
</p>
<h2 id="h_01JEQWHY9VKV3Z9AR9T1YZBRNN">Types and matchers for custom attributes</h2>
<p>
  As you design your rollout plans using custom attributes, be aware of the different
  types of attributes that we support and the matchers that can be used for each
  type.
</p>
<h3 id="h_01JEQWHY9VY9G9VDF9STVV9W3K">String literal attributes</h3>
<p>
  String literal attributes capture the concept of a character string. Use this
  attribute to do standard string to string comparisons, but also to target your
  customers with any list or picklist dimension that you track. Use this matcher
  type to target using a regular expression. Use string attributes with the following
  matchers:
</p>
<ul>
  <li>is in list</li>
  <li>is not in list</li>
  <li>starts with</li>
  <li>does not start with</li>
  <li>ends with</li>
  <li>does not end with</li>
  <li>contains</li>
  <li>does not contain</li>
  <li>matches (regular expression)</li>
  <li>does not match (regular expression)</li>
</ul>
<h3 id="h_01JEQWHY9W4TMN6P9SSMFE26TK">Set attributes</h3>
<p>
  Set attributes capture the concept of a list of strings. Use set attributes with
  the following matchers:
</p>
<ul>
  <li>is equal to</li>
  <li>is not equal to</li>
  <li>has any of</li>
  <li>does not have any of</li>
  <li>has all of</li>
  <li>does not have all of</li>
  <li>is part of</li>
  <li>is not part of</li>
</ul>
<h3 id="h_01JEQWHY9WGGFTG8AN944QVZ4H">Numeric attributes</h3>
<p>
  Numeric attributes capture the concept of signed integers. Negative numbers are
  allowed. Floating point numbers are not supported. Use numeric attributes with
  the following matchers:
</p>
<ul>
  <li>is =</li>
  <li>is &gt;=</li>
  <li>is &lt;=</li>
  <li>is between (inclusive)</li>
  <li>is not between (inclusive)</li>
</ul>
<h3 id="h_01JEQWHY9W7BA760QGW70EYJMX">DateTime attributes</h3>
<p>
  DateTime attributes capture the concept of a date, with optional time. Express
  the value of these attributes in milliseconds or seconds since epoch, depending
  on the SDK you use. Use DateTime attributes with the following matchers:
</p>
<ul>
  <li>is on</li>
  <li>is not on</li>
  <li>is on or after</li>
  <li>is on or before</li>
  <li>is between (inclusive)</li>
  <li>is not between (inclusive)</li>
</ul>
<h3 id="h_01JEQWHY9WBBRGQEXBMMVVQRK0">Boolean attributes</h3>
<p>
  Boolean attributes capture the concept of true or false. Use boolean attributes
  with the following matcher:
</p>
<ul>
  <li>is</li>
</ul>
<h2 id="h_01JEQWHY9W99H8V4EYFFP2J2BT">Additional essential guides</h2>
<p>
  The following are guides that walk you through additional capabilities of our
  Split application:
</p>
<p>
  Refer to our<a href="https://help.split.io/hc/en-us/articles/9648555765133-Foundational-concepts"> Foundational concepts</a>
  guide for more information about foundational concepts of the Split application.
</p>
<p>
  Refer to our<a href="https://help.split.io/hc/en-us/articles/9650375859597-Feature-flag-management"> Feature flag management</a>
  guide for more information about how to create and manage feature flags.
</p>
<p>
  Refer to our<a href="https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics"> Setting up and using metrics</a>
  guide for more information about how to set up and use metrics in the Split application.
</p>
<h3 id="selecting-individually-tarageted-users" class="header-anchor">
  <br />
  <br />
</h3>