---
title: ServiceNow Datasheet
description: A complete list of metadata ingested by SEI from the ServiceNow platform
sidebar_label: ServiceNow Datasheet
sidebar_position: 40
---

SEI uses Rest APIs to connect to the ServiceNow platform. Using these API calls SEI
ingests metadata for ServiceNow Change Requests, Incidents and Custom Fields.
This metadata is used to generate engineering metrics and insights. 

The full details of all the fields are mentioned below.

- [ServiceNow change requests](#servicenow-change-requests)
- [ServiceNow incidents](#servicenow-incidents)
- [ServiceNow custom fields](#servicenow-custom-fields)

### ServiceNow change requests

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
          <li>parent</li>
          <li>number</li>
          <li>state</li>
          <li>state_value</li>
          <li>sys_created_by</li>
          <li>created_by_user</li>
          <li>impact</li>
          <li>impact_value</li>
          <li>active</li>
          <li>priority</li>
          <li>priority_value</li>
          <li>short_description</li>
          <li>closed_by</li>
          <li>closed_by_user</li>
          <li>requested_by</li>
          <li>requested_by_user</li>
            <ul>
                <li>sys_id</li>
                <li>name</li>
                <li>user_name</li>
                <li>email</li>
                <li>timezone</li>
            </ul>
          <li>assigned_to</li>
          <li>assignee</li>
          <li>correlation_id</li>
          <li>task_effective_number</li>
          <li>sys_updated_by</li>
          <li>sys_updated_by_user</li>
          <li>opened_by</li>
          <li>opened_by_user</li>
          <li>sys_created_on</li>
          <li>sys_updated_on</li>
          <li>closed_at</li>
          <li>opened_at</li>
          <li>close_code</li>
          <li>description</li>
          <li>urgency</li>
          <li>sys_id</li>
          <li>approval</li>
          <li>due_date</li>
          <li>category</li>
          <li>reason</li>
          <li>type</li>
          <li>phase_state</li>
          <li>start_date</li>
          <li>end_date</li>
          <li>requested_by_date</li>
          <li>risk</li>
          <li>scope</li>
          <li>business_service</li>
          <li>business_service_info</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### ServiceNow incidents

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
          <li>parent</li>
          <li>number</li>
          <li>state</li>
          <li>state_value</li>
          <li>sys_created_by</li>
          <li>created_by_user</li>
          <li>impact</li>
          <li>impact_value</li>
          <li>active</li>
          <li>priority</li>
          <li>priority_value</li>
          <li>short_description</li>
          <li>closed_by</li>
          <li>closed_by_user</li>
          <li>reopened_by</li>
          <li>reopened_by_user</li>
          <li>sys_updated_by</li>
          <li>opened_by</li>
          <li>opened_by_user</li>
          <li>closed_at</li>
          <li>sys_created_on</li>
          <li>sys_updated_on</li>
          <li>rfc</li>
          <li>opened_at</li>
          <li>resolved_at</li>
          <li>close_code</li>
          <li>description</li>
          <li>sys_id</li>
          <li>urgency</li>
          <li>urgency_value</li>
          <li>severity</li>
          <li>severity_value</li>
          <li>approval</li>
          <li>due_date</li>
          <li>category</li>
          <li>sla_due</li>
          <li>escalation</li>
          <li>escalation_value</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### ServiceNow custom fields

The system ingests all the custom fields as created by the user from the
ServiceNow platform.