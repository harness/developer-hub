---
title: Managing users and groups using Admin API
sidebar_label: Managing users and groups using Admin API
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9147078784653-Managing-users-and-groups-using-Admin-API <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  The Split Administration API is used to create, edit and delete users, and groups via HTTP based API calls. This allows you to manage from an external system instead of using the user interface.&nbsp;
</p>
<p>
  Managing users and groups allows you to automate&nbsp; adding and removing users from Split and&nbsp; assigning users to groups.&nbsp;
</p>
<h1 id="h_01J9GBYKH9X8AJ04PB462VV660">
  Prerequisites
</h1>
<p>
  To run these API calls, you need the following&nbsp; information.&nbsp;
</p>
<ul>
  <li>
    Download <a href="https://curl.se/">cURL</a>. This application is a free HTTP API client that we use to make API calls in this document. It should be installed already if you are on a Mac or a Linux machine. If you are more comfortable with other ways to call HTTP endpoints or other HTTP clients, you should be able to follow along. It is a command line tool, so you need to have basic familiarity with the CMD.exe command prompt on Windows or Terminal emulators on Mac or Linux machines.
  </li>
  <li>
    Create an Admin API key. You can create an API key in the Split UI by clicking the <strong>user's initials</strong> at the bottom of the left navigation pane, select <strong>Admin settings</strong>, and&nbsp;click <strong>API keys</strong>.<strong>&nbsp;</strong>Click the <strong>Action</strong> button at the top right and select <strong>Create API key</strong>. The following page displays:
  </li>
</ul>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833518288269" alt="managing_users_and_groups_using_admin_api_create_admin_api_key.png" />
</p>
<p>
  Select <strong>Admin</strong> as this tutorial’s API key needs to be for the Admin API. Give it a name, and optionally restrict it to environments and projects that you are using the API key for.&nbsp;
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833507203085" alt="managing_users_and_groups_using_admin_api_api_keys.png" />
</p>
<p>
  <strong>Note: For this document, we are using $apiKey to replace the actual API key that we gathered previously.&nbsp;</strong>
</p>
<h1 id="h_01J9GBYKH97HJ3CPA2XQQ2ZEHQ">
  Managing users
</h1>
<p>
  Users have accounts that are associated with an email address, a Split account, and zero or more groups. It’s important to note&nbsp; that you cannot create users&nbsp; with the Admin API. You can invite them to join via email, whereafter the user has to click the link in their email and create an account with a password.
</p>
<p>
  To invite a user to our account, we can call this cURL command:
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/users' \<br />--header 'Authorization: Bearer $apiKey \<br />--header 'Content-Type: application/json' \<br />--data-raw '\{<br />  "email": "email@address.com",<br />  "groups":\[\]<br />\}'</pre>
<p>
  We then receive the following response:
</p>
<pre>\{<br />  "id": "a2e7fb00-9668-11ec-834a-1212d10271b3",<br />  "type": "user",<br />  "name": "email",<br />  "email": "email@address.com",<br />  "status": "PENDING",<br />  "2fa": <strong>false</strong>,<br />  "groups": \[\]<br />\}</pre>
<p>
  Note that the returned value for <strong>status</strong> is <strong>PENDING</strong>. The user doesn’t exist until they log in and finish creating their account.&nbsp;
</p>
<p>
  Meanwhile, the user should receive an email at their email address telling then that they are invited to join their team on Split.
</p>
<p>
  The user should be able to click <strong>create your new account</strong> link and then log in. We can now get the user and see that they were created successfully:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/users' \<br />--header 'Authorization: Bearer $apiKey<br /></pre>
<p>
  The above command gets all users that the admin api key has access over.
</p>
<pre>\{<br />"data": [<br /> \{<br />   "id": "id-user-UUID",<br />   "type": "user",<br />   "name": "email",<br />   "email": "email@address.com",<br />   "status": "ACTIVE",<br />   "2fa": <strong>false</strong><br /> &nbsp;\},<br /> &nbsp;\{<br />   "id": "id-user2-UUID",<br />   "type": "user",<br />   "name": “user2",<br />   "email": "user2@demo.com",<br />   "status": "ACTIVE",<br />   "2fa": <strong>false</strong>,<br />   "groups": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "id": "id-group-UUID”,<br />       "type": "group"<br /> &nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;]<br /> &nbsp; \}<br /> &nbsp;],<br /> "nextMarker": <strong>null</strong>,<br /> "previousMarker": <strong>null</strong>,<br /> "limit": 20,<br /> "count": 2<br />\}</pre>
<p>
  Above, you can see the response with the listing of users, their ids, statuses, email addresses, usernames, 2fa setting, and group membership. This can be filtered down using query parameters to users in a specific status (?status=&lt;status&gt;) or group (?group_id=&lt;group uuid&gt;) if necessary.&nbsp;
</p>
<p>
  The returned JSON here is paginated. The default limit is 20 returned user records. Use the <strong>After</strong> query parameter to retrieve the next page of results. Use the <strong>limit </strong>query parameter to increase the number of results returned to 200. For example, if you are using default pagination settings and have more than 20 users, you’ll see something like this:
</p>
<pre>\{<br />  "data": [<br />           \{<br />             ……userdata…….<br />           \}<br />],<br />"nextMarker": "bmV4dF9fMTY0MzgyNTk0M……yMTAtODQ1NC0xMWVjLTgzNDAtODY3Y2FhZjE3ZGI2",<br />"previousMarker": <strong>null</strong>,<br />"limit": 20,<br />"count": 20<br />\}</pre>
<p>
  To retrieve the next page of user data, the cURL command looks like this:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/users?after=bmV4dF9fMTY0MzgyNTk0M……yMTAtODQ1NC0xMWVjLTgzNDAtODY3Y2FhZjE3ZGI2 \<br />--header 'Authorization: Bearer $apiKey</pre>
<p>
  And the response below has a <strong>previousMarker</strong> and <strong>nextMarker </strong>showing that there are still records that have not been retrieved:&nbsp;
</p>
<pre>\{<br />  "data": [<br />          \{<br />            ……userdata…….<br />          \}<br /> &nbsp;&nbsp;],<br />   "nextMarker": "bmV4dF9fMTYzNjQ2OTA0……xMWVjLTg0ZGMtODZhNTdjNjFmODhh",<br />   "previousMarker": cHJldl9fMTY0MzgxOTE4NTY……YzUtN2FmNDE2OWJlM2Q4<br />  ,<br />    "limit": 20,<br />    "count": 20<br />\}</pre>
<p>
  API calls to the users endpoint can be continued until the previousMarker
  is null, indicating that there are no more users to retrieve.&nbsp;
</p>
<p>
  Alternatively, if we just want to retrieve the data for a single user, we can call the API with the user id as part of the endpoint:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/users/id-user-UUID' \<br />--header 'Authorization: Bearer $apiKey</pre>
<p>
  And we then&nbsp; retrieve the user’s information:&nbsp;
</p>
<pre>\{<br /> "id": "id-user-UUID",<br /> "type": "user",<br /> "name": "email",<br /> "email": "email@address.com",<br /> "status": "ACTIVE",<br /> "2fa": <strong>false</strong><br />\}</pre>
<p>
  Let’s say we want to change the user’s information. Let’s say their email address
  and name are updated as part of a name change. We can use this PUT command on
  the users endpoint. However,&nbsp; note that we do need to send all of the object
  properties, as this is not a PATCH partial update.
</p>
<pre>curl --location --request PUT 'https://api.split.io/internal/api/v2/users/id-user-UUID' \<br />--header 'Authorization: Bearer $apiKey \<br />--header 'Content-Type: application/json' \<br />--data-raw '\{<br />  "email":"new.email@address.com",<br />  "name":"new_name",<br />  "status":"ACTIVE",<br />  "2fa": false,<br />  "type": "user"<br />\}'</pre>
<p>
  We get an affirmative response showing the user’s new record.&nbsp;
</p>
<pre>\{<br /> "id": "id-user-UUID",<br /> "type": "user",<br /> "name": "new_name",<br /> "email": "new.email@address.com",<br /> "status": "ACTIVE",<br /> "2fa": <strong>false</strong><br />\}<br /></pre>
<p>
  You cannot enable 2FA using the API. You can delete pending users using the HTTP
  DELETE method to the users endpoint, but once the user has been activated, you
  can only deactivate using the PUT command, setting the status to DEACTIVATED.&nbsp;
</p>
<p>
  A <strong>DELETE</strong> looks like this:
</p>
<pre>curl --location --request DELETE 'https://api.split.io/internal/api/v2/users/id-user-UUID' \<br />--header 'Authorization: Bearer $apiKey’</pre>
<p>
  However, if we try to delete our active user, we would get this response:
</p>
<pre>\{<br /> "code": 400,<br /> "message": "Active users cannot be deleted from your org. You can use a PUT request to deactivate the user",<br /> "details": "",<br /> "transactionId": "22syjubq6de"<br />\}</pre>
<h1 id="h_01J9GBYKHARQHX30BP3H5PWVT0">
  Managing groups
</h1>
<p>
  Now, let’s say you want to add this user to a group. The first thing we do is see what groups exist.&nbsp; Calling this command returns all of the groups.
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/groups' \<br />--header 'Authorization: Bearer $apiKey'</pre>
<p>
  In our account, we just have an administrators group, as shown below:
</p>
<pre>\{<br />"objects": [<br /> &nbsp;\{<br />   "id": "id-groupAdmin-uuid",<br />   "name": "Administrators",<br />   "description": "Grants access to advanced administrative features",<br />   "type": "group"<br /> &nbsp;\}<br />],<br />"offset": 0,<br />"limit": 50,<br />"totalCount": 1<br />\}</pre>
<p>
  Note the totalCount value of 1 here. There is only one group in this account.
  For accounts with more than 50 groups, you can use the ?offset= query parameter
  added to the endpoint URL in order to get all of the groups up to the totalCount
  value. For example, in this scenario, if we set the offset to 1, we get no groups
  returned as we are returning a list of groups starting with the second group:&nbsp;
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/groups?offset=1' \<br />--header 'Authorization: Bearer $apiKey'</pre>
<p>
  We get this as a response, showing no groups:&nbsp;
</p>
<pre>\{<br />  "objects": \[\],<br />  "offset": 1,<br />  "limit": 50,<br />  "totalCount": 1<br />\}</pre>
<p>
  <strong>Note: You can also use the ?limit=&lt;limit&gt; query parameter on the HTTP endpoint to increase the limit of groups returned up to 200.</strong>
</p>
<p>
  Now let’s say we want to add a group. We can use the HTTP POST method such as the below:
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/groups' \<br />--header 'Authorization: Bearer $apiKey \<br />--header 'Content-Type: application/json' \<br />--data-raw '\{<br />  "name":"Group2",<br />  "description":"New Group 2"<br />\}'</pre>
<p>
  The above command creates a group called Group2
  with a description of New Group 2. &nbsp;Group names are the primary keys, so
  an account can only have a single group with a single name.&nbsp;
</p>
<p>
  The message returned from the endpoint will be like the below, showing the group
  was created and returning the group id:
</p>
<pre>\{<br />  "id": "id-group2-UUID",<br />  "name": "Group2",<br />  "description": "New Group 2",<br />  "type": "group"<br />\}</pre>
<p>
  Logging in to the Split user interface shows the following groups:
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/9147079754381" alt="displayed_groups.png" />
</p>
<p>
  Now to give this group a better description, we can use the PUT command to update the name and description to something more descriptive:&nbsp;
</p>
<pre>curl --location --request PUT 'https://api.split.io/internal/api/v2/groups/id-group2-UUID' \<br />--header 'Authorization: Bearer $apiKey’ \<br />--header 'Content-Type: application/json' \<br />--data-raw ' \{<br />    "id": "id-group2-UUID",<br />    "name": "MySecondGroup",<br />    "description": "Group for Admin API demonstration",<br />    "type": "group"<br /> \}'</pre>
<p>
  The returned values display as updated:&nbsp;
</p>
<pre>\{<br /> "id": "id-group2-UUID",<br /> "name": "MySecondGroup",<br /> "description": "Group for Admin API demonstration",<br /> "type": "group"<br />\}</pre>
<p>
  The results is seen in the Split user interface:
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/9147153437069" alt="group_description.png" />
</p>
<p>
  Now, to add our user to the group, we use this PATCH command as below. We are
  making a call to the users endpoint for the specific user we are updating, and
  patching that user entity with an op (operation) value of add and setting the
  value to be the id of our group. To remove users from the group, the op would
  be remove:
</p>
<pre>curl --location --request PATCH 'https://api.split.io/internal/api/v2/users/<strong>id-user-UUID'</strong> \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong> \<br />--data-raw '[<br /> &nbsp;\{<br />   "op": "add",<br />   "path": "/groups/0",<br />   "value": \{"id" : "<strong>id-group2-UUID</strong>", "type":"group"\}<br /> &nbsp;\}<br />]'</pre>
<p>
  The value returned is the full user object, displaying&nbsp; the new group the user is a member of.
</p>
<pre>\{<br /> "id": "id-user-UUID",<br /> "type": "user",<br /> "name": "new_name",<br /> "email": "new.email@address.com",<br /> "status": "ACTIVE",<br /> "groups": [<br />   \{<br />   "id": "id-group2-UUID",<br />   "type": "group"<br /> &nbsp;\}<br /> ]<br />\}</pre>
<p>
  Now you can see below the user added to the group:&nbsp;
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/9147252758669" alt="user_added_to_group.png" width="502" />
</p>
<p>
  As our last group related action, we can delete a group using the DELETE HTTP verb:&nbsp;
</p>
<pre>curl --location --request DELETE 'https://api.split.io/internal/api/v2/groups/<strong>id-group2-UUID</strong>' \<br />--header 'Authorization: Bearer $apiKey'</pre>
<p>
  The API endpoint returns <strong>true </strong>to denote a successful deletion of the group.
</p>
<p>
  Congratulations! You’ve completed this tutorial including the whole lifecycle of users and groups from creation to deletion.&nbsp;
</p>
<h1 id="h_01J9GBYKHA2ZKAJQWFE0S3NXKH">
  External references
</h1>
<p>
  For more information, refer to the <a href="https://docs.split.io/reference" target="_self">Admin API Guide</a>.
</p>
<p>
  There are also wrappers for multiple programming languages that have already been built for your convenience. Refer to the <a href="https://help.split.io/hc/en-us/sections/360004020552-Admin-API-Examples" target="_self">Python API wrappers </a>for more information
</p>
<p>
  A Postman <a href="https://github.com/splitio/public-api-postman">API collection</a> for the public Admin API endpoints is available for those who are interested in using the free <a href="https://www.postman.com">Postman</a> tool for API testing and development.
</p>