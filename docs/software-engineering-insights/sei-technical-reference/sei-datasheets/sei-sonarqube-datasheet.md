---
title: Sonarqube Datasheet
description: A complete list of metadata ingested by SEI from Sonarqube
sidebar_label: Sonarqube Datasheet
sidebar_position: 20
---
SEI uses Rest APIs to connect to Sonarqube. Using these API calls SEI ingests
metadata for Sonar issues, analyses, projects, and quality gates. This metadata is
used to generate engineering metrics and insights. 

The full details of all the fields are
mentioned below.

- [Sonar analyses](#sonar-analyses)
- [Sonar branches](#sonar-branches)
- [Sonar pull request and issues](#sonar-pull-request-and-issues)
- [Sonar projects](#sonar-projects)
- [Sonar quality gates](#sonar-quality-gates)

### Sonar analyses

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
          <li>key</li>
          <li>data</li>
          <li>projectVersion</li>
          <li>buildString</li>
          <li>manualNewCodePeriodBaseline</li>
          <li>revision</li>
          <li>events</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Sonar branches

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
          <li>name</li>
          <li>isMain</li>
          <li>type</li>
          <li>analysisDate</li>
          <li>excludedFromPurge</li>
          <li>status</li>
            <ul>
                <li>qualityGateStatus</li>
                <li>bugs</li>
                <li>vulnerabilities</li>
                <li>codeSmells</li>
            </ul>
          <li>measures</li>
            <ul>
                <li>metric</li>
                <li>value</li>
                <li>data_type</li>
                <li>bestValue</li>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Sonar pull request and issues

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
          <li>key</li>
          <li>title</li>
          <li>branch</li>
          <li>base</li>
          <li>status</li>
            <ul>
                <li>qualityGateStatus</li>
                <li>bugs</li>
                <li>vulnerabilities</li>
                <li>codeSmells</li>
            </ul>
          <li>analysisDate</li>
          <li>url</li>
          <li>target</li>
          <li>measures</li>
            <ul>
                <li>metric</li>
                <li>value</li>
                <li>data_type</li>
                <li>bestValue</li>
            </ul>
          <li>issues</li>
            <ul>
                <li>key</li>
                <li>rule</li>
                <li>severity</li>
                <li>component</li>
                <li>pullRequest</li>
                <li>line</li>
                <li>textRange</li>
                <li>flows</li>
                <li>status</li>
                <li>message</li>
                <li>effort</li>
                <li>debt</li>
                <li>author</li>
                <li>tags</li>
                <li>comments</li>
                <li>creationDate</li>
                <li>updateDate</li>
                <li>type</li>
                <li>organization</li>
                <li>components</li>
                <li>transitions</li>
                <li>rules</li>
                <li>users</li>
                <li>actions</li>
            </ul>
        <li>analyses</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Sonar projects

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
          <li>organization</li>
          <li>key</li>
          <li>name</li>
          <li>qualifier</li>
          <li>visibility</li>
          <li>lastAnalysisDate</li>
          <li>revision</li>
          <li>uuid</li>
          <li>path</li>
          <li>longName</li>
          <li>enabled</li>
          <li>measures</li>
            <ul>
                <li>metric</li>
                <li>value</li>
                <li>data_type</li>
                <li>bestValue</li>
            </ul>
          <li>branches</li>
          <li>pullRequests</li>
          <li>analyses</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Sonar quality gates

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
          <li>name</li>
          <li>isDefault</li>
          <li>isBuiltIn</li>
          <li>actions</li>
          <ul>
            <li>rename</li>
            <li>setAsDefault</li>
            <li>copy</li>
            <li>associateProjectsdelete</li>
            <li>manageConditions</li>
            <li>create</li>
          </ul>
          <li>status</li>
          <li>statusFailing</li>
          <li>failing</li>
          </ul>
      </td>
    </tr>
  </tbody>
</table>