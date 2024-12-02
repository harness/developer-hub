---
title: ServiceNow Datasheet
description: A complete list of metadata ingested by SEI from the ServiceNow platform
sidebar_label: Metadata
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
          <li>SysId</li>
          <li>Number</li>
          <li>Short Description</li>
          <li>Priority</li>
          <li>Urgency</li>
          <li>State</li>
          <li>SysCreatedOn</li>
          <li>SysUpdatedOn</li>
          <li>ClosedAt</li>
          <li>ParentId</li>
          <li>AssignedTo</li>
          <li>CreatedBy</li>
          <li>ClosedBy</li>
          <li>Scope</li>
          <li>Impact</li>
          <li>Type</li>
          <li>StartDate</li>
          <li>EndDate</li>
          <li>CloseCode</li>
          <li>BusinessService</li>
          <li>BusinessServiceDepartment</li>
          <li>RequestedByDepartment</li>
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
          <li>SysId</li>
          <li>Number</li>
          <li>Short Description</li>
          <li>Priority</li>
          <li>Urgency</li>
          <li>State</li>
          <li>Severity</li>
          <li>SysCreatedOn</li>
          <li>SysUpdatedOn</li>
          <li>ResolvedAt</li>
          <li>ParentId</li>
          <li>AssignedTo</li>
          <li>CreatedBy</li>
          <li>ResolvedBy</li>
          <li>Escalation</li>
          <li>Impact</li>
          <li>SlaDue</li>
          <li>Category</li>
          <li>CloseCode</li>
          <li>BusinessService</li>
          <li>BusinessServiceDepartment</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### ServiceNow custom fields

The system ingests all the custom fields as created by the user from the
ServiceNow platform.