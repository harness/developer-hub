---
title: Target FME Feature flags using Segment personas
sidebar_label: Target FME Feature flags using Segment personas
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033469612-Segment-Targeting-Split-feature-flags-using-Segment-personas </button>
</p>

<h2 id="h_01J9GT6DRAZ10THERQSV94RAS1">
  <strong>Overview</strong>
</h2>
<p>
  Split is a unified solution for feature flagging, monitoring, and experimentation that enables product owners and developers to control rollouts and make data-driven product decisions. Segment makes customer data simple by giving you a single point for collecting, cleaning, and controlling that data.
</p>
<p>
  If you are a customer of both Split and Segment, you are probably already integrating the two tools by sending events from Segment to Split, sending impression data from Split to Segment, or both. If you are not already using these integrations, please see our product documentation <a href="https://help.split.io/hc/en-us/articles/360020742532-Segment">here</a> for instructions on configuring these integrations.
</p>
<p>
  One additional way to leverage Segment data in Split is to use your customer data for targeting your feature rollouts. You can utilize Segment Personas to target particular customers with specific traits as you gradually rollout new functionality or create separate populations for an experiment.
</p>
<h3 id="h_01J9GT6DRAMKDCBE7TMPDZPBT4">
  <strong>Using a Segment trait as attribute for targeting</strong>
</h3>
<p>
  In this example, you may want to test the effectiveness of a new feature on a 50/50 mix of your customers located in Colorado.&nbsp;
</p>
<p>
  First, we define the targeting definition within Split. In the below definition, we can see that if the user attribute <em>state</em> is in the list <em>CO</em> then 50% of users in Colorado would see <em>on</em> and 50% would see <em>off</em>.&nbsp;&nbsp;
</p>
<p>
  The Split SDK call <em>getTreatment()</em> returns the treatment appropriate for a given user and feature flag name. The SDK determines the treatment according to configured targeting rules. In this example, the targeting rules are referencing the value of user attributes (equivalent to “traits” in Segment) and the developer must ensure that the “state” attribute gets included at the time the getTreatment call is made and the user is bucketed and shown a treatment.
</p>
<p>
  If your code maintains its own internal store of user attributes, then creating the list of key-value pairs to pass to getTreatment() is simple; retrieve the appropriate pairs from the internal database at runtime.&nbsp;
</p>
<p>
  If you are utilizing Segment Personas, then you can similarly use the <a href="https://segment.com/docs/personas/profile-api/">Profile API</a> to retrieve the user attributes by calling,
</p>
<pre>https://profiles.segment.com/v1/spaces/&lt;project_id&gt;/collections/users/profiles/user_id:&lt;user_id&gt;/traits</pre>
<p>
  The Profile API will return
</p>
<pre> \{ <br />    "traits": \{ <br />        "email": "marvinthomas@segment.com", <br />        "state": "CO", <br />        "firstname": "Marvin”, <br />        "Lastname": "Thomas" <br />    \}, <br />    "cursor": \{ <br />        "url": "", <br />        "has_more": false, <br />        "next": "", <br />        "limit": 10 <br />    \} <br />\}</pre>
<p>
  Using this response, you can then build an attribute map to be passed to Split’s getTreatment call using the meaningful keys and values returned in traits.&nbsp;
</p>
<p>
  Below is an example in Ruby, presuming a class including instance variables for the Segment project id and an initialized Split client:
</p>
<pre>&nbsp;<strong>def</strong> get_treatment_with_traits(user_id, split_name)<br /> &nbsp;&nbsp;&nbsp;url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/users/profiles/user_id:' + user_id + '/traits'<br />&nbsp;&nbsp;&nbsp;&nbsp;traits = HTTParty::get(url, <em>basic_auth</em>: @auth, <em>format</em>: <em>:json</em>)['traits']<br />&nbsp;&nbsp;&nbsp;&nbsp;@split_client.get_treatment(user_id, split_name, traits)<br />&nbsp;<strong>end</strong></pre>
<p>&nbsp;</p>
<h3 id="h_01J9GT6DRA44BYXJNN34NS0SWQ">
  <strong>Using a Segment trait as an id for targeting&nbsp;</strong>
</h3>
<p>
  Another case where you might want to use Segment data for targeting your Split feature flag is when your traffic type is something other than user, like account. In this example, you want to pass the user’s account, which is one of the traits stored in Segment Personas, as the id to Split’s getTreatment call.&nbsp;
</p>
<p>
  In the below example, you can retrieve a user’s trait with a given name and pass that trait’s value as the id to Split’s getTreatment call.
</p>
<pre><strong>def</strong> get_treatment_for_trait_value(user_id, targeting_trait, split_name)<br /> &nbsp;url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/users/profiles/user_id:' + user_id + '/traits'<br />&nbsp;&nbsp;traits = HTTParty::get(url, <em>basic_auth</em>: @auth, <em>format</em>: <em>:json</em>)['traits']<br />&nbsp;&nbsp;<strong>if</strong> !traits.nil?<br />&nbsp;&nbsp;&nbsp;&nbsp;targeting_id = traits[targeting_trait]<br />&nbsp;&nbsp;<strong>end</strong><br />&nbsp;&nbsp;<strong>if</strong> targeting_id.nil?&nbsp;<br />&nbsp;&nbsp;&nbsp;&nbsp;'control'<br />&nbsp;&nbsp;<strong>else</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;@split_client.get_treatment(targeting_id, split_name)<br />&nbsp;&nbsp;<strong>end<br /></strong><strong>end</strong></pre>
<p>
  An example call to this method to target based on a user’s account:
</p>
<pre>treatment = get_treatment_for_trait_value(the_user, 'account', 'account_feature')</pre>
<p>&nbsp;</p>
<h3 id="h_01J9GT6DRAS23FGWNC605R6AQX">
  <strong>Using a Segment group call to retrieve an id for targeting&nbsp;</strong>
</h3>
<p>
  If your team uses the Segment group call to associate an individual user with an account, you can retrieve the account id with the Persona’s links API call.
</p>
<p>
  By calling
</p>
<pre>https://profiles.segment.com/v1/spaces/&lt;project_id&gt;/collections/users/profiles/user_id:&lt;user_id&gt;/links</pre>
<p>
  You’ll get a return value,
</p>
<pre>\{<br />&nbsp;"data": [<br />&nbsp;&nbsp;&nbsp;\{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"to_collection": "accounts",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"external_ids": [<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "account0001",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type": "group_id",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"source_id": "zbhKeiAyLq",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"collection": "accounts",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at": "2019-09-09T20:06:56.172597879Z",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"encoding": "none"<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />&nbsp;&nbsp;&nbsp;\}<br />&nbsp;],<br />&nbsp;"cursor": \{<br />&nbsp;&nbsp;&nbsp;"url": "",<br />&nbsp;&nbsp;&nbsp;"has_more": false,<br />&nbsp;&nbsp;&nbsp;"next": ""<br />&nbsp;\}<br />\}</pre>
<p>
  From that you can extract the account id to pass to Split’s getTreatment call,
</p>
<pre>def get_treatment_for_users_account(user_id, split_name, with_traits = <em>false</em>)<br /> &nbsp;url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/users/profiles/user_id:' + user_id + '/links'<br />&nbsp;&nbsp;account_id = retrieve_account_id(HTTParty::get(url, <em>basic_auth</em>: @auth, <em>format</em>: <em>:json</em>)['data'])<br />&nbsp;&nbsp;if account_id.nil?<br />&nbsp;&nbsp;&nbsp;&nbsp;'control'<br />&nbsp;&nbsp;else<br />&nbsp;&nbsp;&nbsp;&nbsp;if with_traits<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/accounts/profiles/group_id:' + account_id + '/traits'<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;traits = HTTParty::get(url, <em>basic_auth</em>: @auth, <em>format</em>: <em>:json</em>)['traits']<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@split_client.get_treatment(account_id, split_name, traits)<br />&nbsp;&nbsp;&nbsp;&nbsp;else<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@split_client.get_treatment(account_id, split_name)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />    end<br />&nbsp;&nbsp;end<br />end&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />def retrieve_account_id(data_array)<br />&nbsp; puts data_array<br />&nbsp; data_array.each \{ |data_elt|<br />&nbsp;&nbsp;&nbsp; if data_elt['to_collection'] == 'accounts'<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return data_elt['external_ids'].at(0)['id']<br />&nbsp;&nbsp;&nbsp; end<br />&nbsp; \}<br />&nbsp; <em>nil</em><br />end</pre>
<p>
  If there are account attributes created by a group call which you wish to use in targeting, once you retrieve the account id you can retrieve the account’s traits the same way you retrieved a user’s traits and pass them to the getTreatment call. This is implemented in the above call if you pass the optional argument with_traits as true.
</p>
<h3 id="h_01J9GT6DRA4H90A3P7H4WC7MAC">
  <strong>Practical considerations</strong>
</h3>
<p>
  The combination of Segment data and Split targeting is a powerful tool for managing rollouts of your flagged features, but there are a few practical implications you should consider and plan for.
</p>
<ul>
  <li>
    <strong>Rate limiting on the Segment Profile API</strong>: By default, there is a rate limit of 60,000 requests/min. While this is per Access Secret, it is important to keep this in mind if you are making very frequent getTreatment calls incorporating Segment traits.
  </li>
  <li>
    <strong>Protect user data by implementing server-side</strong>: Because the Profiles API retrieves possibly sensitive user data, the techniques described here should only be implemented server-side, <strong><em>not</em></strong> on a web or mobile client.
  </li>
  <li>
    <strong>Introducing potential latency retrieving Split feature flags</strong>: On its own, a getTreatment call to the Split SDK makes no network calls; the appropriate treatment is calculated locally using cached rules. Retrieving an attribute list from Segment with the Profiles API is a network roundtrip. While in most cases this will not be a significant overhead, there is the potential to impact your application.
  </li>
  <li>
    <strong>Program defensively:</strong> Take care that your code accounts for all possible eventualities. For instance, with regards to the aforementioned potential latency of the Profiles API call, you might want to set a shorter than default timeout for the HTTP request.&nbsp;
  </li>
  <li>
    <strong>Segment trait limiting</strong>: The sample code provided is for demonstration purposes only and does not deal with all possibilities, such as a user id having more than ten traits, which is the limit for the number of traits returned in a single call. In that case, to fetch all of a user’s traits, you’ll have to iteratively call the Profiles API, using the cursor element in the returned data. Always make sure to account for the case where the data doesn’t exist or isn’t returned because the request timed out.
  </li>
</ul>
<p>&nbsp;</p>