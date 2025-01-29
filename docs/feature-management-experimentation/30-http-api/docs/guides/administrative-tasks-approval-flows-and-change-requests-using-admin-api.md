---
title: "Administrative tasks: Approval flows and change requests using Admin API"
sidebar_label: "Administrative tasks: Approval flows and change requests using Admin API"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9147078784653-Managing-users-and-groups-using-Admin-API <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  Change control is critical to the success of any ongoing project and especially fundamental to software development. It is used to ensure that changes are introduced in a controlled and coordinated manner, reducing the risk of unnecessary changes and ensuring minimal disruption to services.
</p>
<p>
  Currently, Split supports change control on segment and feature flags objects. If change control is enabled in your environment, then API calls to modify these objects directly without creating a change request returns a 403 stating that Approvals are required, for example:
</p>
<pre>\{<br />   "code": 403,<br />   "message": "Approvals are required. orgId=id-org-UUID envId=id-envronment-UUID",<br />   "details": "",<br />   "transactionId": "22ugt6f5igp"<br />\}</pre>
<h1 id="h_01J9GET8YQ3VT13S420BZN7WQ9">
  Prerequisites
</h1>
<ul>
  <li>
    Download <a href="https://curl.se/">cURL</a>. This application is a free HTTP API client that we will use to make API calls in this document. It should be installed already if you are on a Mac or a Linux machine. If you are more comfortable with other ways to call HTTP endpoints or other HTTP clients, you should be able to follow along. It is a command line tool, so you need to have basic familiarity with the CMD.exe command prompt on Windows or Terminal emulators on Mac or Linux machines.
  </li>
  <li>
    Create an Admin API key. You can create an API key in the Split UI by clicking
    the <strong>user's initials</strong> at the bottom of the left navigation
    pane, select <strong>Admin settings</strong>, and&nbsp;click
    <strong>API keys</strong>.<br /> Click the <strong>Action</strong> button at the top right and select <strong><br />Create API key</strong>. The following page displays:
  </li>
</ul>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833875473677" alt="administrative_tasks_one.png" />
</p>
<p>
  Select <strong>Admin</strong> to create an API key for the Admin API. Give it a name, and optionally restrict the API key to environments and projects that you are using the key for. Once you click <strong>Create, </strong>an API key is available for your use:
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833875473933" alt="administrative_tasks_two.png" />
</p>
<p>
  <strong>Note: For this document, we are using $apiKey to replace the actual API key that we gathered previously.</strong>
</p>
<p>
  To use this key for approving change requests, you need to first set this API Key as an approver by following these steps:
</p>
<ol>
  <li>
    In <strong>Admin settings</strong>,<strong>&nbsp;</strong>click&nbsp;<strong>Projects.</strong><br />
  </li>
  <li>
    Find the project in which you want to set the API key as an approver. Click the <strong>View</strong>
    link in the <strong>Actions</strong> column.<br /><img src="https://help.split.io/hc/article_attachments/30833847942413" alt="administrative_tasks_three.png" /><br />
  </li>
  <li>
    Find the environment in which you want to set the key as an approver.
    Click the <strong>Edit</strong> link in the <strong>Actions</strong> column.<br />
  </li>
  <li>
    <p>
      On the Edit Environment
      page, select <strong>Require approval for changes.<br /><img src="https://help.split.io/hc/article_attachments/30833847942797" alt="administrative_tasks_four.png" /><br /></strong><strong><br /></strong>
    </p>
    <p>
      If you select:
    </p>
    <ul>
      <li>
        <p>
          <strong>Let submitters choose their own approvers,</strong> the API cannot be used to approve change requests, but it can still create them and set user account email addresses as approvers.
        </p>
      </li>
      <li>
        <p>
          <strong>Restrict who can approve,</strong> you must explicitly select the API key as an approver.<strong><br /></strong>
        </p>
      </li>
    </ul>
  </li>
  <li>
    Click <strong>Save</strong>. The next screen shows that the environment requires approvals.
  </li>
</ol>
<p>
  For both of the following sections, we also need the project ID and environment ID. Those can be collected from the Split user interface or from API calls. Using our API key we can call to the <strong>workspaces </strong>endpoint (used for projects) as follows:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/workspaces' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>‘</pre>
<p>
  To retrieve our list of projects and their ids:
</p>
<pre>\{<br />"objects": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />        &nbsp; "name": "Default",<br />        &nbsp; "type": "workspace",<br />        &nbsp; "id": "id-defaultProject-UUID",<br />           "requiresTitleAndComments": <strong>false</strong><br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\},<br />………<br /> &nbsp;&nbsp;],<br />    "offset": 0,<br />  &nbsp; "limit": 10,<br />  &nbsp; "totalCount": 3<br />\}</pre>
<p>
  Then, using that project id, we can get the environments:
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/environments/ws/<strong>id-defaultProject-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>‘</pre>
<p>
  This returns the following data:
</p>
<pre>[<br /> &nbsp;&nbsp;\{<br />    &nbsp; "name": "Prod-Default",<br />    &nbsp; "id": "id-prodEnv-UUID",<br />      "production": <strong>true</strong><br /> &nbsp;&nbsp;\},<br /> &nbsp;&nbsp;\{<br />       "name": "Staging-Default",<br />       "id": "id-stgEnv-UUID",<br />      &nbsp;"production": <strong>false</strong><br /> &nbsp;&nbsp;\}<br />]<br /></pre>
<p>
  To do this using the user interface, go to <strong>Admin settings </strong>and<strong>&nbsp;</strong>select<strong> Projects</strong> to see the project names and IDs.&nbsp;
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833875475341" alt="administrative_tasks_five.png" />Click the <strong>View</strong> link in the <strong>Actions </strong>column to see a project's environment names and IDs.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833847943437" alt="administrative_tasks_six.png" />
</p>
<h1 id="h_01J9GET8YRCR0PWDSQ3ETRJ9VV">
  Change requests with segments
</h1>
<p>
  <strong>Note: Some of the actions listed below, like updating owners and tags, cannot be done with the Admin API.</strong>
</p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
  <tbody>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          <strong>What requires a change request</strong>
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          <strong>What does NOT require a change request</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          Adding keys to a segment
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          Creating a segment in a project
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          Removing keys from a segment
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          Adding an initial empty segment definition to an environment
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          &nbsp;
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          Updating segment tags
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          &nbsp;
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          Updating segment owners
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          &nbsp;
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          Updating segment descriptions
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>
        <p>
          &nbsp;
        </p>
      </td>
      <td style={{width: '55.8571%'}}>
        <p>
          Removing an empty segment definition from an environment
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '44%'}}>&nbsp;</td>
      <td style={{width: '55.8571%'}}>
        <p>
          Deleting a segment
        </p>
      </td>
    </tr>
  </tbody>
</table>
<p>
  Creating or deleting segment keys via the Admin API both require a HTTP POST request. All change requests go to the changeRequest endpoint. Before submitting the change request, you must gather the data required.&nbsp;
</p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
  <tbody>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          <strong>Object property</strong>
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          <strong>Description</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          segment.name
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          The name of the segment being updated
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          segment.keys
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          The segment keys to use as part of the operation
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          operationType
        </p>
      </td>
      <td style={{width: '50%'}}>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <p>
                  <strong>CREATE</strong>
                </p>
              </td>
              <td>
                <p>
                  Add the keys to the segment
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <strong>ARCHIVE</strong>
                </p>
              </td>
              <td>
                <p>
                  Remove the keys from the segment
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          title
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          The title of the change request
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          comment
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          Any change request comments
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          approvers
        </p>
      </td>
      <td style={{width: '50%'}}>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <p>
                  <strong>Environment Setting</strong>
                </p>
              </td>
              <td>
                <p>
                  <strong>Rule</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  Let submitters choose approvers
                </p>
              </td>
              <td>
                <p>
                  Should be populated with the email address(es) of the approver(s) desired.&nbsp;
                </p>
                <br />
                <p>
                  This cannot be the API key.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  Restrict who can approve
                </p>
              </td>
              <td>
                <p>
                  This array should be empty as the change request approvers for the environment are already set.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<p>
  In the following scenario, we plan on adding the segments <em>San Francisco</em>&nbsp;and <em>Clark's Mountain</em>&nbsp;to our segment <em>beta_accounts</em>. This object will look like the following:
</p>
<pre>\{<br />  "segment":\{"name":"beta_accounts", "keys":["San Francisco","Clark's Mountain"]\},<br />  "operationType":"CREATE",<br />  "title":"Adding new beta accounts",<br />  "comment":"Processed via Admin API",<br />  "approvers":[]<br />\}</pre>
<p>
  Then to make the call to create the change request will look like this.&nbsp;
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/changeRequests/ws/<strong>id-defaultProject-UUID</strong>/environments/<strong>id-prodEnv-UUID</strong>' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>' \<br />--data-raw '\{<br />   "segment":\{"name":"beta_accounts", "keys":["San Francisco","Clark'\''s Mountain"]\},<br />   "operationType":"CREATE",<br />   "title":"Adding new beta accounts",<br />   "comment":"Processed via Admin API",<br />   "approvers":[]<br />\}<br />'</pre>
<p>
  The result shows the successful creation of the change request:
</p>
<pre>\{<br />   "split": <strong>null</strong>,<br />   "segment": \{<br />     "name": "beta_accounts",<br />     "keys": [<br />       "San Francisco",<br />       "Clark's Mountain"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;\},<br />    "id": "id-cr-UUID",<br />    "status": "REQUESTED",<br />    "title": "Adding new beta accounts",<br />    "comment": <strong>null</strong>,<br />    "workspace": \{<br />       "id": "id-defaultProject-UUID",<br />       "type": "workspace"<br /> &nbsp;&nbsp;\},<br />    "approvers": [<br />      "admin-api-key"<br /> &nbsp;&nbsp;],<br />    "operationType": "CREATE",<br />    "comments": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />         "comment": "Processed via Admin API",<br />         "user": "admin-api-key",<br />         "role": "SUBMITTER",<br />         "timestamp": 1646219795355<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;],<br />    "rolloutStatus": <strong>null</strong>,<br />    "rolloutStatusTimestamp": <strong>null</strong><br />\}</pre>
<p>
  To confirm this change request, we can call the GET on the <em>changeRequests</em> endpoint:&nbsp;
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/changeRequests' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>’‘</pre>
<p>
  We then see the REQUESTED
  status change request:
</p>
<pre>\{<br />  "data": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "split": <strong>null</strong>,<br />       "segment": \{<br />          "name": "beta_accounts",<br />          "keys": [<br />             "San Francisco",<br />             "Clark's Mountain"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\},<br />          "id": "id-cr-UUID",<br />          "status": "REQUESTED",<br />          "title": "Adding new beta accounts",<br />          "comment": <strong>null</strong>,<br />          "workspace": \{<br />            "id": "id-defaultProject-UUID",<br />            "type": "workspace"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\},<br />         "approvers": [<br />           "admin-api-key"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br />         "operationType": "CREATE",<br />         "comments": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />             "comment": "Processed via Admin API",<br />             "user": "admin-api-key",<br />             "role": "SUBMITTER",<br />             "timestamp": 1646219795355<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br />        "rolloutStatus": <strong>null</strong>,<br />        "rolloutStatusTimestamp": <strong>null</strong><br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;],<br />    "nextMarker": <strong>null</strong>,<br />    "previousMarker": <strong>null</strong>,<br />    "limit": 20,<br />    "count": 1<br />\}</pre>
<p>
  The GET supports pagination using the nextMarker and previousMarker as optional query parameters. It also is possible to also get APPROVED, REJECTED, WITHDRAWN, and PUBLISHED change requests using the status query parameter.&nbsp;
</p>
<p>
  In the Split user interface, we can also confirm the pending change request exists when you see the message <em>This segment has pending change. View the change.</em>&nbsp;
</p>
<p>
  At this point, if the API key is not set as an approver, the only other thing we can do with it is withdraw the change request.&nbsp;
</p>
<pre>curl --location --request PUT 'https://api.split.io/internal/api/v2/changeRequests/id-cr-UUID' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey‘ \<br />--data-raw '\{<br />   "status":"WITHDRAWN",<br />   "comment":"CR withdrawn via Admin API"<br />\}<br />'</pre>
<p>
  Now if we call the GET like we did previously, you won’t see the change request.&nbsp;
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/changeRequests' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>‘</pre>
<p>
  This call returns the following.:
</p>
<pre>​​\{<br />  "data": [],<br />   "nextMarker": <strong>null</strong>,<br />   "previousMarker": <strong>null</strong>,<br />   "limit": 20,<br />   "count": 0<br />\}</pre>
<p>
  To see a withdrawn change request, use this endpoint to see a single change request. To do this, we need to put the change request id into the endpoint url:&nbsp;
</p>
<pre>curl --location --request GET '<a href="https://api.split.io/internal/api/v2/changeRequests/id-cr-UUID%5C">https://api.split.io/internal/api/v2/changeRequests/<strong>id-cr-UUID’ </strong>\\</a><br />--header 'Authorization: Bearer <strong>$apiKey</strong>’</pre>
<p>
  This returns the change request showing the WITHDRAWN status. Notice the comments objects at the bottom also showing the history of comments as well. In the case of change request management, it is helpful to have meaningful comments.&nbsp;
</p>
<pre>\{<br />  "split": <strong>null</strong>,<br />  "segment": \{<br />    "name": "beta_accounts",<br />    "keys": [<br />      "San Francisco",<br />      "Clark's Mountain"<br /> &nbsp;&nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;\},<br />  "id": "id-cr-UUID",<br />  "status": "WITHDRAWN",<br />  "title": "Adding new beta accounts",<br />  "comment": <strong>null</strong>,<br />  "workspace": \{<br />    "id": "id-",<br />    "type": "workspace"<br /> &nbsp;&nbsp;\},<br />  "approvers": [<br />    "admin-api-key"<br /> &nbsp;],<br />  "operationType": "CREATE",<br />  "comments": [<br /> &nbsp;&nbsp;&nbsp;\{<br />      "comment": "Processed via Admin API",<br />      "user": "admin-api-key",<br />      "role": "SUBMITTER",<br />      "timestamp": 1646219795355<br /> &nbsp;&nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />      "comment": "CR withdrawn via Admin API",<br />      "user": "admin-api-key",<br />      "role": "SUBMITTER",<br />      "timestamp": 1646221275904<br /> &nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;],<br />  "rolloutStatus": <strong>null</strong>,<br />  "rolloutStatusTimestamp": <strong>null</strong><br />\}</pre>
<p>
  <strong>Note: Another way to see this is to explicitly call to list all WITHDRAWN change requests.&nbsp;</strong>
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/changeRequests?status=WITHDRAWN' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>‘</pre>
<p>
  If the Admin API is set as an approver, you can approve the change request by setting the status to APPROVED instead of WITHDRAWN as shown below:&nbsp;
</p>
<pre>curl --location --request PUT 'https://api.split.io/internal/api/v2/changeRequests/id-cr-UUID' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey‘ \<br />--data-raw '\{<br />  "status":"APPROVED",<br />  "comment":"CR approved via Admin API"<br />\}<br />'</pre>
<p>
  The status changes to PUBLISHED if the change request is successfully approved.
</p>
<pre>\{<br />  "split": <strong>null</strong>,<br />  "segment": \{<br />    "name": "beta_accounts",<br />    "keys": [<br />      "San Francisco",<br />      "Clark's Mountain"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br /> &nbsp;&nbsp;\},<br />   "id": "id-cr-UUID",<br />   "status": "PUBLISHED",<br />   "title": "Adding new beta accounts",<br />   "comment": <strong>null</strong>,<br /> …..<br />\}</pre>
<p>
  It is important to note that you cannot use the same API key to submit and approve the same request. In that scenario you would need two API keys. One API key to submit requests and the other set up as an approver.
</p>
<h1 id="h_01J9GET8YS9JQC0FDTRKRM0X3K">
  Change requests with feature flags
</h1>
<p>
  Change requests with feature flags have a few more options than change requests with segments.&nbsp;
</p>
<p>
  <strong>Note: Some of the actions listed below, like updating owners, cannot be done with the Admin API.</strong>
</p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
  <tbody>
    <tr>
      <td style={{width: '51.1429%'}}>
        <p>
          <strong>What requires a change request</strong>
        </p>
      </td>
      <td style={{width: '48.7143%'}}>
        <p>
          <strong>What does NOT require a change request</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '51.1429%'}}>
        <p>
          Changing a feature flag definition in an environment
        </p>
      </td>
      <td style={{width: '48.7143%'}}>
        <p>
          Creating a new feature flag in a project
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '51.1429%'}}>
        <p>
          Adding a feature flag definition to an environment
        </p>
      </td>
      <td style={{width: '48.7143%'}}>
        <p>
          Updating feature flag tags
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '51.1429%'}}>
        <p>
          Removing a feature flag definition from an environment
        </p>
      </td>
      <td style={{width: '48.7143%'}}>
        <p>
          Updating feature flag owners
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '51.1429%'}}>
        <p>
          Killing or reactivating a feature flag
        </p>
      </td>
      <td style={{width: '48.7143%'}}>
        <p>
          Updating a feature flag description
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '51.1429%'}}>&nbsp;</td>
      <td style={{width: '48.7143%'}}>
        <p>
          Updating a feature flag rollout status
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '51.1429%'}}>&nbsp;</td>
      <td style={{width: '48.7143%'}}>
        <p>
          Deleting a feature flag with no targeting rules
        </p>
      </td>
    </tr>
  </tbody>
</table>
<p>
  The same changeRequest endpoint is used for feature flag change requests. However, the object sent in the body of the request is different. We need to gather the following information to build the object to send:
</p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
  <tbody>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          <strong>Object property</strong>
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          <strong>Description</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          split
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          The feature flag definition object. The existing definition for a feature flag can be retrieved by using a HTTP GET
          call on the feature flags endpoint.&nbsp;
        </p>
        <br />
        <p>
          For convenience the only object property required for KILL,
          RESTORE, or ARCHIVE
          operations is the split.name object and property. UPDATE
          and CREATE operations require the entire new feature flag definition to use.
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          operationType
        </p>
      </td>
      <td style={{width: '50%'}}>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <p>
                  <strong>KILL</strong>
                </p>
              </td>
              <td>
                <p>
                  Kill the feature flag, resulting in only the default treatment being served
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <strong>RESTORE</strong>
                </p>
              </td>
              <td>
                <p>
                  Restore a killed feature flag
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <strong>UPDATE</strong>
                </p>
              </td>
              <td>
                <p>
                  Update the treatment definition of the feature flag
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <strong>CREATE</strong>
                </p>
              </td>
              <td>
                <p>
                  Create a new feature flag
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <strong>ARCHIVE</strong>
                </p>
              </td>
              <td>
                <p>
                  Remove the feature flag definition from the environment
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          title
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          The title of the change request
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          comment
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          Any change request comments
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          rolloutStatus.id
        </p>
      </td>
      <td style={{width: '50%'}}>
        <p>
          The ID of the rollout status. This is not needed for <strong>KILL</strong> operations
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '50%'}}>
        <p>
          approvers
        </p>
      </td>
      <td style={{width: '50%'}}>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <p>
                  <strong>Environment Setting</strong>
                </p>
              </td>
              <td>
                <p>
                  <strong>Rule</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  Let submitters choose approvers
                </p>
              </td>
              <td>
                <p>
                  Should be populated with the email address(es) of the approver(s) desired.&nbsp;
                </p>
                <br />
                <p>
                  This cannot be the API key.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  Restrict who can approve
                </p>
              </td>
              <td>
                <p>
                  This array should be empty as the change request approvers for the environment are already set.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<p>
  For this exercise, you are going to take an existing feature flag definition and create a new, different feature flag called copy_of_onboarding_flow with the rollout percentage changed from 50/50 to 80/20 on/off.
</p>
<p>
  The feature flag we are using is called new_onboarding_flow<strong>. </strong>In the Split user interface, the default rule shows a 50/50 rollout:
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/30834130013453" alt="administrative_tasks_007.png" />
</p>
<p>
  The first thing we need to do is to create the project level feature flag in order to add a feature flag definition to our environment. This call creates the new feature flag with a simple description.&nbsp;
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/splits/ws/557c90d0-7c44-11ec-97df-eafbc0e90433/trafficTypes/user/' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer bbka4th38dlfh1cmn3ron8s36a7s2r3jpp9q' \<br />--data-raw '\{<br />"name": "copy_of_onboarding_flow",<br />"description": "New Split"<br />\}'<br /></pre>
<p>
  You don’t need the feature flag id here so just having a successful result of the API call will be sufficient.&nbsp;
</p>
<p>
  Rather than trying to create the feature flag definition object we want from scratch, it’s much easier to retrieve the existing feature flag object and make the necessary modifications.&nbsp;
</p>
<p>
  As such, we first get the feature flag definition.
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/splits/ws/id-defaultProject-UUID/new_onboarding_flow/environments/id-prodEnv-UUID' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey'<br /></pre>
<p>
  The returned value is the full feature flag definition with id, name, environment, and trafficType along with the treatment definitions. However, for what you need, you can ignore that. The properties we need are the ones below that are returned.&nbsp;
</p>
<pre>\{<br />…..<br /> "name": "new_onboarding_flow",<br />….<br /> "treatments": [<br /> &nbsp;&nbsp;\{<br />    "name": "on",<br />    "description": ""<br /> &nbsp;&nbsp;\},<br />  &nbsp;\{<br />    "name": "off",<br />    "description": ""<br /> &nbsp;&nbsp;&nbsp;\}<br /> &nbsp;],<br />  "defaultTreatment": "off",<br />  "trafficAllocation": 100,<br />  "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "buckets": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />           "treatment": "on",<br />           "size": 100<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br />        "condition": \{<br />          "combiner": "AND",<br />          "matchers": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br /><br />               "type": "IN_SEGMENT",<br />               "string": "employees"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;],<br />  "defaultRule": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "treatment": "on",<br />       "size": 50<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\},<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />        "treatment": "off",<br />        "size": 50<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;],<br />….<br />\}</pre>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1" data-mce-id="__mce">
  <tbody>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          <strong>Feature flag property</strong>
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          <strong>Description</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          name
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          Feature flag name
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          treatments
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          Name and description of treatments
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          defaultTreatment
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          Name of default treatment
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          trafficAllocation
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          0-100, percentage of traffic allocated to the feature flag
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          rules
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          Targeting rule objects
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '27%'}}>
        <p>
          defaultRule
        </p>
      </td>
      <td style={{width: '72.8571%'}}>
        <p>
          Default targeting rule
        </p>
      </td>
    </tr>
  </tbody>
</table>
<p>
  Now that we have our feature flag object,
  we are going to change the defaultRule object to give the on treatment a size
  of 80 and the off treatment a size of 20.
  &nbsp;The object now looks like the following:
</p>
<pre>\{<br />  "name": "copy_of_onboarding_flow",<br />  "treatments": [ \{"name": "on", "description": ""\}, \{"name": "off", "description": ""\} ],<br />  "defaultTreatment": "off",<br />  "trafficAllocation": 100,<br />  "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />      "buckets": [ \{"treatment": "on", "size": 100\} ],<br />      "condition": \{<br />        "combiner": "AND",<br />         "matchers": [ \{"type": "IN_SEGMENT", "string": "employees"\} ]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;],<br />  "defaultRule": [ \{"treatment": "on", "size": 80\}, \{"treatment": "off", "size": 20\} ]<br />\}</pre>
<p>
  The other piece of information that we need is the rollout status we want to use. Getting the rollout status ids can be done with this HTTP GET request.&nbsp;
</p>
<pre>curl --location --request GET 'https://api.split.io/internal/api/v2/rolloutStatuses?wsId=id-defaultProject-UUID' \<br />--header 'Authorization: Bearer $apiKey‘</pre>
<p>
  This returns the rollout statuses. In our case, we are interested in the <em>Ramping</em> status.&nbsp;
</p>
<pre>[<br />……<br /> \{<br />   "id": "id-ramping-UUID",<br />   "name": "Ramping",<br />   "description": "Splits that are turned on for a small percentage of users to make sure no performance issues or larger issues come up"<br /> \},<br /> \{<br />   "id": "id-experimenting-UUID",<br />   "name": "Experimenting",<br />   "description": "Splits that have are ramped for max power in an experiment to get results as quickly as possible"<br /> \},<br />……<br />]</pre>
<p>
  Putting this object into our change request would look like the following:
</p>
<pre>\{<br />  "split": \{<br />  "name": "copy_of_onboarding_flow",<br />  "treatments": [ \{"name": "on", "description": ""\}, \{"name": "off", "description": ""\} ],<br />  "defaultTreatment": "off",<br />  "trafficAllocation": 100,<br />  "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />      "buckets": [ \{"treatment": "on", "size": 100\} ],<br />      "condition": \{<br />        "combiner": "AND",<br />        "matchers": [ \{"type": "IN_SEGMENT", "string": "employees"\} ]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;\}<br />  &nbsp;],<br />   "defaultRule": [ \{"treatment": "on", "size": 80\}, \{"treatment": "off", "size": 20\} ]<br /> &nbsp;\},<br />   "operationType": "CREATE",<br />   "title": "New rollout split copy",<br />   "comment": "Copy of the new_onboarding_split with updated rollout percentage",<br />   "rolloutStatus": \{"id": "id-ramping-UUID"\},<br />   "approvers": []<br />\}</pre>
<p>
  With our object created and information gathered,&nbsp; now you can submit this as a CREATE
  change request.&nbsp;
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/changeRequests/ws/id-defaultProject-UUID/environments/id-defaultEnvironment-UUID' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey‘ \<br />--data-raw '\{<br /> "split": \{<br />  "name": "copy_of_onboarding_flow",<br />  "treatments": [ \{"name": "on", "description": ""\}, \{"name": "off", "description": ""\} ],  <br />  "defaultTreatment": "off",<br />  "trafficAllocation": 100,<br />  "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;\{<br />      "buckets": [ \{"treatment": "on", "size": 100\} ],<br />      "condition": \{<br />        "combiner": "AND",<br />        "matchers": [ \{"type": "IN_SEGMENT", "string": "employees"\} ]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;\}<br /> &nbsp;],<br />  "defaultRule": [ \{"treatment": "on", "size": 80\}, \{"treatment": "off", "size": 20\} ]<br /> \},<br /> "operationType": "CREATE",<br /> "title": "New rollout split copy",<br /> "comment": "Copy of the new_onboarding_split with updated rollout percentage",<br /> "rolloutStatus": \{"id": "id-ramping-UUID"\},<br /> "approvers": []<br />\}'</pre>
<p>
  The returned value shows the change request and the change request id.&nbsp;
</p>
<pre>\{<br />  "split": \{<br /> &nbsp;&nbsp;……<br />    "name": "copy_of_onboarding_flow",<br />……<br />    "killed": <strong>false</strong>,<br />    "treatments": [ \{"name": "on", "description": ""\}, \{"name": "off", "description": ""\} ],<br />    "defaultTreatment": "off",<br />    "trafficAllocation": 100,<br />    "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "buckets": [ \{"treatment": "on", "size": 100\} ],<br />       "condition": \{<br />         "combiner": "AND",<br />         "matchers": [ \{"type": "IN_SEGMENT", "string": "employees"\} ]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;],<br />  "defaultRule": [ \{"treatment": "on", "size": 80\}, \{"treatment": "off", "size": 20\} ],<br />  "openChangeRequestId": "id-cr-UUID"<br /> \},<br /> "segment": <strong>null</strong>,<br /> "id": "id-cr-UUID",<br /> "status": "REQUESTED",<br /> "title": "New rollout split copy",<br />……..<br /> "operationType": "CREATE",<br />……..<br /> "rolloutStatusTimestamp": <strong>null</strong><br />\}</pre>
<p>
  As with segments change requests, Split doesn’t allow for the same API key or user to approve a change request that it submitted. This can be approved either by a different Admin API Key or by a user manually.&nbsp;
</p>
<p>
  Once approved, let’s say we want to update the
  feature flag to a 90/10 rollout. You need
  to create a change request of operationType UPDATE. The only difference between
  UPDATE and CREATE is that UPDATE operations act upon existing
  feature flag definitions.&nbsp;
</p>
<p>
  For example, this is an UPDATE call to update the existing feature flag we created to a new rollout percentage.&nbsp;
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/changeRequests/ws/id-defaultProject-UUID/environments/id-defaultEnvironment-UUID' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer $apiKey‘ \<br />--data-raw '\{<br />  "split": \{<br />    "name": "copy_of_onboarding_flow",<br />    "treatments": [ \{"name": "on", "description": ""\}, \{"name": "off", "description": ""\} ],<br />    "defaultTreatment": "off",<br />    "trafficAllocation": 100,<br />    "rules": [<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\{<br />       "buckets": [ \{"treatment": "on", "size": 100\} ],<br />       "condition": \{<br />         "combiner": "AND",<br />         "matchers": [ \{"type": "IN_SEGMENT", "string": "employees"\} ]<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;],<br />   "defaultRule": [ \{"treatment": "on", "size": 90\}, \{"treatment": "off", "size": 10\} ]<br /> \},<br /> "operationType": "UPDATE",<br /> "title": "New rollout split percentage",<br /> "comment": "updated rollout percentage",<br /> "rolloutStatus": \{"id": "id-ramping-UUID"\},<br /> "approvers": []<br />\}'</pre>
<p>
  The Admin API can also be used for creating change requests to kill a feature flag. For this, you don’t need the feature flag definition, only the feature flag name. You would kill the feature flag in the case of alerts showing performance problems, for example.
</p>
<pre>curl --location --request POST 'https://api.split.io/internal/api/v2/changeRequests/ws/id-defaultProject-UUID/environments/id-prodEnv-UUID' \<br />--header 'Content-Type: application/json' \<br />--header 'Authorization: Bearer <strong>$apiKey</strong>' \<br />--data-raw '\{<br />  "split": \{"name":"new_onboarding_flow"\},<br />  "operationType":"KILL",<br />  "title":"Killed Split",<br />  "comment":"Seeing some performance problems",<br />  "approvers":[]<br />\}'</pre>
<p>
  The response shows the proposed
  feature flag definition with a split.killed
  property equal to true.&nbsp;
</p>
<p>
  This same API call can be used to create a change request to RESTORE the killed
  feature flag to its state before the kill or ARCHIVE the feature flag to remove
  it from the environment entirely just by changing the operationType object property.&nbsp;
</p>
<p>
  You’ve learned all about change requests via the Admin API in Split.
</p>
<h1 id="h_01J9GET8YVR0HV0MJKKDTQ8QNX">
  External references
</h1>
<p>
  For more information, refer to the Admin API Guide section on <a href="https://docs.split.io/reference/change-request-overview" target="_self">Change Requests.</a>
</p>
<p>
  There are also wrappers for multiple programming languages that have already been built for your convenience. Refer to <a href="https://help.split.io/hc/en-us/sections/360004020552-Admin-API-Examples" target="_self">API wrappers</a> examples for more information.&nbsp;
</p>
<p>
  A Postman <a href="https://github.com/splitio/public-api-postman">API collection</a> for the public Admin API endpoints is available if you would like to use the free <a href="https://www.postman.com">Postman</a> tool for API testing and development.
</p>