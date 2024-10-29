---
title: Jira Datasheet
description: A complete list of metadata ingested by SEI from Jira
sidebar_label: Datasheet
sidebar_position: 20
---

SEI uses Rest APIs to connect to Jira. Using these API calls SEI ingests metadata for
Jira Issues, Projects, Users, Status, and Sprints. By default, all the standard fields for
Issues, Projects, Users, Status, and Sprints are ingested. In addition, if a customer
specifies custom fields, SEI will ingest those custom fields too. This metadata is used
to generate engineering metrics and insights. 

The full details of all the fields are
mentioned below.

- [Jira issues](#jira-issues)
- [Jira sprints](#jira-sprints)
- [Jira statuses](#jira-statuses)
- [Jira projects](#jira-projects)
- [Jira users](#jira-users)
- [Jira custom fields](#jira-custom-fields)

### Jira issues

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr width="1000px">
      <td>
        <ul>
          <li>id</li>
          <li>key</li>
          <li>changelog</li>
          <li>issuetype</li>
            <ul>
                <li>name</li>
                <li>description</li>
                <li>subtask</li>
            </ul>
          <li>project</li>
            <ul>
                <li>id</li>
                <li>key</li>
                <li>name</li>
                <li>projectTypeKey</li>
                <li>simplified</li>
            </ul>
          <li>fixVersions</li>
          <li>resolution</li>
          <li>resolutiondate</li>
          <li>created</li>
          <li>priority</li>
            <ul>
                <li>name</li>
                <li>id</li>
            </ul>
          <li>labels</li>
          <li>versions</li>
          <li>issuelinks</li>
          <li>assignee</li>
          <li>updated</li>
          <li>status</li>
            <ul>
                <li>description</li>
                <li>name</li>
                <li>id</li>
                <li>statusCategory</li>
                    <ul>
                        <li>id</li>
                        <li>key</li>
                        <li>name</li>
                        <li>colorName</li>
                    </ul>
            </ul>
          <li>components</li>
          <li>description</li>
          <li>summary</li>
          <li>creator</li>
            <ul>
                <li>accountId</li>
                <li>accountType</li>
                <li>name</li>
                <li>key</li>
                <li>displayName</li>
                <li>active</li>
                <li>emailAddress</li>
            </ul>
          <li>duedate</li>
          <li>progress</li>
          <li>total</li>
          <li>votes</li>
            <ul>
                <li>votes</li>
                <li>hasVoted</li>
            </ul>
          <li>comment</li>
          <li>comments</li>
          <li>description_length</li>
          <li>description_text</li>
          <li>statuscategorychangedate</li>
          <li>watches</li>
          <li>issuerestriction</li>
          <li>aggregateprogress</li>
            <ul>
                <li>progress</li>
                <li>total</li>
            </ul>
          <li>timetracking</li>
          <li>workratio</li>
          <li>worklog</li>
            <ul>
                <li>startAt</li>
                <li>maxResults</li>
                <li>total</li>
                <li>worklogs</li>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Jira sprints

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr width="1000px">
      <td>
        <ul>
          <li>id</li>
          <li>state</li>
          <li>name</li>
          <li>startDate</li>
          <li>endDate</li>
          <li>completeDate</li>
          <li>activateDate</li>
          <li>originBoardId</li>
          <li>goal</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Jira statuses

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr width="1000px">
      <td>
        <ul>
          <li>description</li>
          <li>name</li>
          <li>id</li>
          <li>statusCategory</li>
            <ul>
                <li>id</li>
                <li>key</li>
                <li>name</li>
                <li>colorName</li>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Jira projects

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr width="1000px">
      <td>
        <ul>
          <li>id</li>
          <li>key</li>
          <li>description</li>
          <li>lead</li>
          <li>components</li>
          <li>issueTypes</li>
          <li>assigneeType</li>
          <li>versions</li>
          <li>name</li>
          <li>roles</li>
          <li>projectTypeKey</li>
          <li>simplified</li>
          <li>style</li>
          <li>isPrivate</li>
          <li>projectKeys</li>
          <li>priority_scheme</li>
          <li>default_priorities</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Jira users

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr width="1000px">
      <td>
        <ul>
          <li>accountId</li>
          <li>accountType</li>
          <li>name (Jira connect app)</li>
          <li>key</li>
          <li>displayName</li>
          <li>active</li>
          <li>emailAddress (Jira connect app)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Jira custom fields

The system ingests all the custom fields as specified by the user.