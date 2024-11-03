---
title: Azure Boards Datasheet
description: A complete list of metadata ingested by SEI from Azure Boards
sidebar_label: Boards Datasheet
sidebar_position: 52
---

SEI uses Rest APIs to connect to Azure Boards. Using these API calls SEI ingests metadata for WorkItems, Teams, Iterations and other metadata.
The full details of all the fields are mentioned below.

- [Azure boards iterations](#azure-boards-iterations)
- [Azure boards teams](#azure-boards-teams)
- [Azure boards workitem fields](#azure-boards-workitem-fields)
- [Others](#others)

### Azure boards iterations

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="1000px">
        <ul>
          <li>project</li>
          <li>repository</li>
          <li>definition</li>
          <li>releases</li>
          <li>id</li>
          <li>name</li>
          <li>path</li>
          <li>attributes</li>
            <ul>
              <li>startDate</li>
              <li>finishDate</li>
              <li>timeFrame</li>
            </ul>
          <li>url</li>
          <li>_links</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Azure boards teams

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="1000px">
        <ul>
          <li>id</li>
          <li>description</li>
          <li>identity</li>
          <li>identityUrl</li>
          <li>name</li>
          <li>projectId</li>
          <li>projectName</li>
          <li>url</li>
          <li>teamSetting</li>
            <ul>
              <li>field</li>
                <ul>
                    <li>referenceName</li>
                    <li>url</li>
                    <li>defaultValue</li>
                    <li>values</li>
                        <ul>
                            <li>value</li>
                            <li>includeChildrent</li>
                        </ul>
                </ul>
              <li>tags</li>
              <li>codeAreas</li>
                <ul>
                    <li>id</li>
                    <li>identifier</li>
                    <li>name</li>
                    <li>structureType</li>
                    <li>hasChildren</li>
                    <li>path</li>
                    <li>url</li>
                    <li>children</li>
                </ul>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Azure boards workitem fields

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="1000px">
        <ul>
          <li>id</li>
          <li>referenceName</li>
          <li>name</li>
          <li>type</li>
          <li>project</li>
          <li>definition</li>
          <li>releases</li>
          <li>workItems</li>
          <li>workItemHistories</li>
          <li>tags</li>
          <li>changesets</li>
          <li>branchs</li>
          <li>labels</li>
          <li>tags</li>
          <li>codeAreas</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Others

<table>
  <thead>
    <tr>
      <th width="1000px">Metadata</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="1000px">
        <ul>
          <li>workItemCategories</li>
            <ul>
                <li>defaultWorkItemType</li>
                    <ul>
                        <li>name</li>
                        <li>url</li>
                    </ul>
                <li>name</li>
                <li>referenceName</li>
                <li>url</li>
            </ul>
          <li>workItemTypes</li>
            <ul>
                <li>color</li>
                <li>description</li>
                <li>fieldInstances</li>
                <li>fields</li>
                <li>icon</li>
                <li>isDisabled</li>
                <li>name</li>
                <li>referenceName</li>
                <li>states</li>
                    <ul>
                        <li>category</li>
                        <li>color</li>
                        <li>name</li>
                    </ul>
                <li>transitions</li>
                <li>url</li>
            </ul>
          <li>workItemTypeStates</li>
            <ul>
                <li>category</li>
                <li>color</li>
                <li>name</li>
            </ul>
          <li>teams</li>
          <li>tags</li>
          <li>codeAreas</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
