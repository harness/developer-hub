---
title: Creating, editing, and deleting feature flags using Admin API
sidebar_label: Creating, editing, and deleting feature flags using Admin API
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9148451816205-Creating-editing-and-deleting-feature-flags-using-Admin-API <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  Use the Split administration API is a tool to create, edit, and delete feature flags via HTTP based API calls. This allows you to manage feature flags and control their rollout from an external system instead of using the user interface.
</p>
<p>
  You may want to do this if you are building a management console for internal product SME users to do their own configuration and management of feature flags, or possibly some simple automation of feature flags for a workflow.
</p>
<h1 id="h_01J9GSSS5TB3CJ0RCCRDJN10YA">
  Prerequisites
</h1>
<p>
  To run these API calls, there are a few pieces of information that will be needed.&nbsp;
</p>
<ul>
  <li>
    Download <a href="https://curl.se/">cURL</a>. This application is a free HTTP API client that we will use to make API calls in this document. It should be installed already if you are on a Mac or a Linux machine. If you are more comfortable with other ways to call HTTP endpoints or other HTTP clients, you should be able to follow along. It is a command line tool, so you need to have basic familiarity with the CMD.exe command prompt on Windows or Terminal emulators on Mac or Linux machines.
  </li>
  <li>
    Get the acount ID of your Split account. You can retrieve that from the first string that comes after split.io/org/ in the URL you see in your url bar once you are logged in to Split.
  </li>
</ul>
<p class="wysiwyg-indent4">
  <img src="https://help.split.io/guide-media/01GW8TNKYPE5P9GTF2W3VSM5R9" alt="org_id.png" width="646" /><br />The
  account ID is what’s in the blue box. Keep this handy as you will need it to
  drill down to the data in the projects and environments that will be used for
  creating, editing, and deleting feature flags in this document.&nbsp;
</p>
<ul>
  <li>
    You need to create an Admin API key. You can create this by navigating to <strong>Admin settings</strong><strong>&nbsp;</strong>and
    then <strong>API keys. </strong>Click the Action button and from the menu list, select <strong>Create API key</strong> in the top right. The following page displays:
  </li>
</ul>
<p class="wysiwyg-indent2">
  <img src="https://help.split.io/guide-media/01H0FXV7J5NVTME0PK7TT4NMCH" alt="select-admin-api-key.png" width="547" />
</p>
<p>
  Select <strong>Admin</strong> as this tutorial’s API key needs to be for the Admin API. Give it a name and optionally restrict it to environments and projects that you are using the API key for. Once you click <strong>Create</strong> an API key is available for use:
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0FXXJ4NBYZ5WNWQRRC9RNQ8" alt="new-admin-api-key-list.png" width="614" />
</p>
<p>
  Now that you’ve gotten an API key and the account ID, let’s get to creating, editing, and deleting feature flags.
</p>
<p>
  <strong>Note: For this document, we are using $orgId and $apiKey to replace the actual API key and account ID that we gathered previously. Please replace these with what you have copied down from this Prerequisites section as the account ID and API key.</strong>
</p>
<h1 id="h_01J9GSSS5TRTM55Z8HTGDTFWAR">
  Creating a feature flag
</h1>
<p>
  Creating a feature flag is fundamental to using Split. There are a few steps to doing this via the Admin API. Feature flags exist in a single project and have targeting rules that can be modified on a per environment basis. So to create a feature flag, you need to first determine which project within your account you are creating the feature flag in. To get your list of projects, you can use cURL with this command:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/workspaces' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey</pre>
<p>
  This returns a list of projects and their corresponding project IDs:&nbsp;
</p>
<pre>\{<br />"objects": [<br /> \{<br />  "name": "Default",<br />  "type": "workspace",<br />  "id": "id-default-project-UUID",<br />  "requiresTitleAndComments": <strong>false</strong><br /> &nbsp;\},<br /> &nbsp;\{<br />   "name": "client-team",<br />   "type": "workspace",<br />   "id": "id-client-project-UUID",<br />   "requiresTitleAndComments": <strong>false</strong><br /> &nbsp;&nbsp;\},<br /> &nbsp;&nbsp;\{<br />    "name": "server-team",<br />    "type": "workspace",<br />    "id": "id-server–project-UUID",<br />    "requiresTitleAndComments": <strong>false</strong><br /> &nbsp;&nbsp;\}<br /> ],<br /> "offset": 0,<br /> "limit": 10,<br /> "totalCount": 3<br />\}</pre>
<p>
  Let’s say you want to create a feature flag in the Default project. So store the id for that project, <em>id-default-project-UUID</em>.&nbsp;Now, to create your feature flag , you can call the POST api for creating feature flags.&nbsp;
</p>
<p>
  Start by creating a feature flag <em>our_new_split_name</em> and we can give it a description as <em>description of what this new split does. </em>This feature flag is using the <em>trafficType</em> of <em>user</em>.&nbsp;
</p>
<p>
  The following curl command creates this feature flag:
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/splits/ws/<strong>id-default-project-UUID</strong>/trafficTypes/<strong>user</strong>/' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>' \<br />--data-raw '\{<br />  "name": "our_new_split_name",<br />  "description": "Description of what this new split does"<br />\}'</pre>
<p>
  <strong>Note: </strong><strong>The name and description are part of the JSON body of the curl command. The string </strong><strong><em>user</em></strong><strong> that defines the trafficType is part of the endpoint being called out to.&nbsp;</strong>
</p>
<p>
  The return value from calling this command is the following:
</p>
<pre>\{<br /> "id": "id-split-UUID",<br /> "name": "our_new_split_name",<br /> "description": "Description of what this new split does",<br /> "trafficType": \{<br />  "id": "id-user-trafficType-UUID",<br />  "name": "user"<br />\},<br /> "creationTime": 1645214274838,<br /> "rolloutStatus": \{<br />   "id": "id-preprod–rolloutStatus-UUID",<br />   "name": "Pre-Production"<br />\},<br /> "rolloutStatusTimestamp": 1645214274838,<br /> "tags": <strong>null</strong><br />\}<br /></pre>
<p>
  <strong>Note: You need the feature flag’s id, </strong><strong><em>id-split-UUID,</em></strong><strong> in order to make modifications to the feature flag, so keep track of this id as we move to the next section.</strong>
</p>
<p>
  The default rolloutStatus for a feature flag is <em>Pre-Production. </em>Also note that this feature flag has no targeting rules in any environment as we have not defined any.&nbsp;
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0FYCQNMJPKM29PNZFC3JH02" alt="feature-flag-using-admin-api.png" width="483" />
</p>
<h1 id="h_01J9GSSS5T66JJ980HXVVM6EBA">
  Editing a feature flag
</h1>
<p>
  If you are managing configuration of feature flags from your own tool, or programmatically through automation you inevitably need to edit feature flags. In this section, we discuss what is included in the API to edit and make modifications to feature flags.
</p>
<p>
  Our feature flag in the last section was created in the proper project, but without targeting rules, it can’t be used. Targeting rules exist only in a single environment so you need to get the list of environments for the project. To get the list of environments, run the following curl command:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/environments/ws/<strong>id-default-project-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey</pre>
<p>
  The response is&nbsp; similar to the following:
</p>
<pre>[<br /> \{<br />  "name": "Prod-Default",<br />  "id": "id-prodEnv-UUID",<br />   "production": <strong>true</strong><br /> \},<br /> \{<br />  "name": "Staging-Default",<br />  "id": "id-stgEnv-UUID",<br />  "production": <strong>false</strong><br /> \}<br />]</pre>
<p>
  <strong>Note: This response is a JSON array at the root level of the response body, not an object containing an array.</strong>
</p>
<p>
  For example, let’s say we want to create targeting rules in the staging environment. So we need to store the <em>id-stgEnv-UUID</em>for later processing. Let’s get the configuration of our existing feature flag to see what the configuration currently looks like from the API perspective.&nbsp;
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/splits/ws/<strong>id-default-project-UUID</strong>/<strong>id-split-UUID</strong>/environments/<strong>id-stgEnv-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey' \<br />--data-raw ''</pre>
<p>
  We get a 404 response, stating the feature flag definition does not exist in the environment.&nbsp;
</p>
<pre>\{<br /> "code": 404,<br /> "message": "Could not find splitmetadata id-split-UUID",<br /> "details": "",<br /> "transactionId": "22f0rxo8uno"<br />\}</pre>
<p>
  This is an important item to note. Feature flags exist at a project level but their definition, including targeting rules, exist individually in each feature flag environment. Colloquially, the environment level feature flag is referred to as a <em>meta- feature flag.</em> The rollout status, feature flag name, traffic type, tags, description, and feature flag owners exist at the project level. The rest of the feature flag&nbsp; is defined per environment.&nbsp;
</p>
<p>
  So now let’s talk about the configuration we want to add to our feature flag. The feature flag configuration is passed via the API in the body of the HTTP API request. To build this, we need the UUID identifiers for the feature flag, the environment, and the traffic type. These are bolded below. Additionally, we have given this feature flag two treatments: <em>On</em>, and <em>Off</em>. It is rolled out 100%. The <em>employees</em> segment gets the <em>On</em> treatment, all other users get 50/50 randomized on or off.&nbsp;
</p>
<pre>\{<br /> "id": "<strong>id-split-UUID</strong>",<br /> "name": "our_new_split_name",<br /> "environment": \{<br />  "id": "<strong>id-stgEnv-UUID</strong>",<br />  "name": "Staging-Default"<br /> \},<br />  "trafficType": \{<br />   "id": "<strong>id-user-trafficType-UUID</strong>",<br />   "name": "user"<br /> \},<br /> "killed": <strong>false</strong>,<br /> "treatments": [<br /> &nbsp;&nbsp;&nbsp;\{<br />     "name": "on",<br />     "description": "feature is on"<br /> &nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;\{<br />     "name": "off",<br />     "description": "feature is off"<br /> &nbsp;  \}<br /> &nbsp;],<br />  "defaultTreatment": "off",<br />  "baselineTreatment": "off",<br />  "trafficAllocation": 100,<br />  "rules": [<br /> &nbsp;&nbsp;&nbsp;\{<br />     "buckets": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />         "treatment": "on",<br />         "size": 100<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \}<br /> &nbsp;&nbsp;&nbsp;  ],<br />      "condition": \{<br />        "combiner": "AND",<br />        "matchers": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />           "type": "IN_SEGMENT",<br />           "string": "employees"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;&nbsp;&nbsp; \}<br /> &nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;],<br />  "defaultRule": [<br /> &nbsp;&nbsp;&nbsp;\{<br />      "treatment": "on",<br />      "size": 50<br /> &nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;\{<br />     "treatment": "off",<br />      "size": 50<br /> &nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;]<br /> &nbsp;\}</pre>
<p>
  We can send this configuration to Split using cURL in this way, with the configuration passed in as raw data:
</p>
<p>
  <strong>Note: The body of the message in the </strong><strong><em>–data-raw </em></strong><strong>parameter must be enclosed in single straight quotes.</strong>
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/splits/ws/<strong>id-default-project-UUID</strong>/our_new_split_name/environments/<strong>id-stgEnv-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey \<br />--data-raw ' \{<br />     "id": "<strong>id-split-UUID</strong>",<br />     "name": "our_new_split_name",<br />     "environment": \{<br />       "id": "<strong>id-stgEnv-UUID</strong>",<br />       "name": "Staging-Default"<br /> &nbsp;&nbsp;&nbsp;&nbsp;\},<br />     "trafficType": \{<br />       "id": "<strong>id-user-trafficType-UUID</strong>",<br />       "name": "user"<br /> &nbsp;&nbsp;&nbsp;&nbsp;\},<br />     "killed": <strong>false</strong>,<br />     "treatments": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />         "name": "on",<br />         "description": "feature is on"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />         "name": "off",<br />         "description": "feature is off"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;],<br />     "defaultTreatment": "off",<br />     "baselineTreatment": "off",<br />     "trafficAllocation": 100,<br />     "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />         "buckets": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />            "treatment": "on",<br />            "size": 100<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br />         "condition": \{<br />           "combiner": "AND",<br />           "matchers": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />              "type": "IN_SEGMENT",<br />              "string": "employees"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;],<br />    "defaultRule": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "treatment": "on",<br />       "size": 50<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "treatment": "off",<br />        "size": 50<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp; &nbsp;]<br />  \}<br />'</pre>
<p>
  You should get a response confirming the response successfully was accepted by the endpoint. It mirrors back the configuration that you sent with 2 additional pieces of information at the end, a <em>creationTime</em> and a <em>lastUpdateTime</em>.&nbsp;
</p>
<pre>\{<br />  "id": "id-split-UUID",<br />  "name": "our_new_split_name",<br />  "environment": \{<br />   "id": "id-stgEnv-UUID",<br />   "name": "Staging-Default"<br />\},<br />  "trafficType": \{<br />   "id": "id-user-trafficType-UUID",<br />   "name": "user"<br />\},<br />  "killed": <strong>false</strong>,<br />  "treatments": [<br /> &nbsp;&nbsp; \{<br />     "name": "on",<br />     "description": "feature is on"<br /> &nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;\{<br />     "name": "off",<br />     "description": "feature is off"<br /> &nbsp;&nbsp;&nbsp;\}<br /> ],<br /> "defaultTreatment": "off",<br /> "baselineTreatment": "off",<br /> "trafficAllocation": 100,<br /> "rules": [<br /> &nbsp; \{<br />    "buckets": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "treatment": "on",<br />       "size": 100<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> ],<br /> "condition": \{<br />   "combiner": "AND",<br />   "matchers": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "type": "IN_SEGMENT",<br />       "string": "employees"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;\}<br /> &nbsp;\}<br /> ],<br /> "defaultRule": [<br /> &nbsp;&nbsp;\{<br />     "treatment": "on",<br />     "size": 50<br /> &nbsp;&nbsp;\},<br /> &nbsp;&nbsp;\{<br />     "treatment": "off",<br />     "size": 50<br /> &nbsp;&nbsp;&nbsp;\}<br /> ],<br /> "creationTime": 1645220815555,<br /> "lastUpdateTime": 1645220815555<br />\}</pre>
<p>
  Now if you go into the Split user interface, you should see the feature flag definition.&nbsp;
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0GDD0KZH7B584B1KCJ1WBRK" alt="set-treatments.png" width="577" />
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0GE3C5STN56Q8Q179JHX5CA" alt="target-specific-subset.png" width="535" />
</p>
<p>
  After we’ve added that to the feature flag definition, let’s say we want to increase the randomization from 50/50 on/off to 80/20 on off, as we’re fairly confident in the feature.&nbsp;
</p>
<p>
  <strong>Note: More information on the components of a Split’s JSON definition can be found : </strong><a href="https://docs.split.io/reference/split-definition"><strong>https://docs.split.io/reference/split-definition</strong></a><strong>.</strong>
</p>
<p>
  We do not have to build that JSON definition again. We can call the <strong>feature flags</strong>&nbsp;endpoint with a <strong>PATCH</strong> request to just update what we want to. Review the following command. Note that we are defining an <strong>op</strong> (operation) to perform. It can be either <strong>replace</strong><em>, </em><strong>add</strong><em>, </em>or <strong>remove</strong><em>. </em>We are also defining a path in the JSON of the feature flag to perform the operation. In this case we are replacing the <em>defaultRule</em> with one that defines an 80/20 randomization as opposed to a 50/50 one.
</p>
<p>
  &nbsp;
</p>
<pre>curl --location --request PATCH 'https://api.split.io/internal/api/v2/splits/ws/<strong>id-default-project-UUID</strong>/our_new_split_name/environments/<strong>id-stgEnv-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey \<br />--data-raw '[\{"op": "replace", "path": "/defaultRule", "value":[<br /> &nbsp;&nbsp;\{<br />     "treatment": "on",<br />     "size": 80<br /> &nbsp;&nbsp;\},<br /> &nbsp;&nbsp;\{<br />    "treatment": "off",<br />    "size": 20<br /> &nbsp;&nbsp;\}<br />&nbsp;&nbsp;&nbsp;]\}]'<br /></pre>
<p>
  If we log in to the Split user interface, we can see the rollout updated.&nbsp;
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0GENRX6N71KF12B4G1SAJSR" alt="default-rule.png" width="554" />
</p>
<p>
  Updating the description, tags, or rollout status requires a different endpoint. Let’s say we want to update this to have the status Ramping now because you’re working on ramping up the feature rollout percentage. Currently it is in Pre-Release<strong>.&nbsp;</strong>
</p>
<p>
  First we have to get the list of rollout statuses. You can do that with this command:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/rolloutStatuses?wsId=id-default-project-UUID' \<br />--header 'Authorization: Bearer $apiKey<br /></pre>
<p>
  The response shows the list of all rollout statuses in a JSON array:
</p>
<pre>[<br /> ……<br /> &nbsp;\{<br />   "id": "id-ramping-UUID",<br />   "name": "Ramping",<br />   "description": "Splits that are turned on for a small percentage of users to make sure no performance issues or larger issues come up"<br /> &nbsp;\},<br /> &nbsp;\{<br />   "id": "id-experimenting-UUID",<br />   "name": "Experimenting",<br />   "description": "Splits that have are ramped for max power in an experiment to get results as quickly as possible"<br /> &nbsp;\},<br /> &nbsp;…<br />]</pre>
<p>
  With this, now we have the id for the ramping rollout status, and can call a command to update your feature flag. This is a patch command as well, so note that you are replacing the <em>rolloutStatus/id</em> from the project-wide feature flag JSON that was created in the previous section, Creating
  a Feature Flag.&nbsp;
</p>
<pre>curl --location --request PATCH 'https://api.split.io/internal/api/v2/splits/ws/id-default-project-UUID/our_new_split_name' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey \<br />--data-raw '[<br /> &nbsp;&nbsp;\{<br />     "op":"replace",<br />     "path":"/rolloutStatus/id",<br />     "value":"id-ramping-UUID"<br /> &nbsp;&nbsp;\}<br />]'</pre>
<pre>The result should be the following:<br />\{<br /> "id": "id-split-UUID",<br /> "name": "our_new_split_name",<br /> "description": "Description of what this new split does",<br /> "trafficType": \{<br />   "id": "id-user-trafficType-UUID",<br />   "name": "user"<br /> \},<br /> "creationTime": 1645214274838,<br /> "rolloutStatus": \{<br />   "id": "id-ramping-UUID",<br />   "name": "Ramping"<br /> \},<br /> "rolloutStatusTimestamp": 1645223192008,<br /> "tags": <strong>null</strong><br />\}</pre>
<p>
  You can see the updated rollout status upon logging in to the user interface:&nbsp;
</p>
<p>
  <img src="https://help.split.io/guide-media/01GW915RC0B1ADBGB4FGK42HER" alt="updated_status.png" />
</p>
<p>
  <strong>Note: </strong><strong>Killing a feature flag is more than just updating the rollout status. To kill a feature flag, you have to call the specific Kill endpoint. For more information, refer to the <a href="https://docs.split.io/reference/kill-split-in-environment" target="_self">Kill a split in environment API.&nbsp;</a></strong>
</p>
<h1 id="h_01J9GSSS5VPZA4P2AAVAJS62JW">
  Deleting a feature flag
</h1>
<p>
  Finally, let’s say you’ve moved the feature flag up to rollout at 100% and have removed it from your codebase. You’ve successfully rolled out a new feature. Congratulations! Now it’s time to remove the feature flag from the Split user interface. Individual feature flag definitions can be deleted on an environment by environment basis using this endpoint:
</p>
<pre>curl --location --request DELETE 'https://api.split.io/internal/api/v2/splits/ws/<strong>id-default-project-UUID</strong>/our_new_split_name/environments/<strong>id-stgEnv-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey \<br />--data-raw ''<br /></pre>
<p>
  The request returns true with no other information to denote a successful deletion
</p>
<p>
  You can also delete the project-wide feature flag using the following endpoint. For most cases this should be sufficient, as it will also remove the feature flag definitions in the project environments.&nbsp;
</p>
<pre>curl --location --request DELETE 'https://api.split.io/internal/api/v2/splits/ws/<strong>id-default-project-UUID</strong>/our_new_split_name' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey \<br />--data-raw ''</pre>
<p>
  Similarly, this request also returns <strong>true</strong> when a feature flag is successfully deleted.
</p>
<p>
  If you try to navigate to your feature flag in the Split user interface, you get an error message because this feature flag no longer exists.&nbsp;
</p>
<h1 id="h_01J9GSSS5V9B19SV05TDCNSJ3B">
  External references
</h1>
<p>
  For more information, refer to the the <a href="https://docs.split.io/reference/splits-overview" target="_self">Splits</a> section of the API Guide .
</p>
<p>
  There are also wrappers for multiple programming languages that have already been built for your convenience. Refer to the <a href="https://help.split.io/hc/en-us/sections/360004020552-Admin-API-Examples" target="_self">API wrappers examples</a> for more information. 
</p>
<p>
  A Postman <a href="https://github.com/splitio/public-api-postman">API collection</a> for the public Admin API endpoints is available for those who are interested in using the free <a href="https://www.postman.com">Postman</a> tool for API testing and development.
</p>