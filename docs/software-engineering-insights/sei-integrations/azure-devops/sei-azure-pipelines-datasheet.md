---
title: Azure Pipelines Datasheet
description: A complete list of metadata ingested by SEI from Azure Pipelines
sidebar_label: Pipelines Metadata
sidebar_position: 56
---

SEI uses Rest APIs to connect to Azure Pipelines. Using these API calls SEI ingests metadata for builds, pipelines and releases data.
The full details of all the fields are mentioned below.

- [Azure pipeline builds](#azure-pipeline-builds)
- [Azure pipelines](#azure-pipelines)
- [Azure releases](#azure-releases)

### Azure pipeline builds

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
          <li>_links</li>
          <li>properties</li>
            <ul>
                <li>count</li>
                <li>item</li>
                <li>keys</li>
                <li>values</li>
                <li>CodeReviewThreadType</li>
                <li>CodeReviewVoteResult</li>
                <li>CodeReviewVotedByInitiatorIdentity</li>
                <li>CodeReviewVotedByIdentity</li>
            </ul>
          <li>tags</li>
          <li>validationResults</li>
            <ul>
                <li>message</li>
                <li>result</li>
            </ul>
          <li>plans</li>
            <ul>
                <li>planId</li>
                <li>orchestrationType</li>
            </ul>
          <li>triggerInfo</li>
            <ul>
                <li>ci.sourceBranch</li>
                <li>ci.sourceSha</li>
                <li>ci.message</li>
                <li>ci.triggerRepository</li>
            </ul>
          <li>id</li>
          <li>buildNumber</li>
          <li>status</li>
          <li>result</li>
          <li>queueTime</li>
          <li>startTime</li>
          <li>finishTime</li>
          <li>url</li>
          <li>definition</li>
          <li>buildNumberRevision</li>
          <li>project</li>
          <li>uri</li>
          <li>sourceBranch</li>
          <li>sourceVersion</li>
          <li>queue</li>
          <li>priority</li>
          <li>reason</li>
          <li>requestedFor</li>
          <li>requestedBy</li>
          <li>lastChangedDate</li>
          <li>lastChangedBy</li>
          <li>orchestrationPlan</li>
          <li>logs</li>
          <li>repository</li>
          <li>keepForever</li>
          <li>retainedByRelease</li>
          <li>triggeredByBuild</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Azure pipelines

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
          <li>_links</li>
          <li>configuration</li>
            <ul>
                <li>designerJson</li>
                <li>variables</li>
                <li>path</li>
                <li>repository</li>
                    <ul>
                        <li>fullName</li>
                        <li>connection</li>
                        <li>type</li>
                        <li>id</li>
                    </ul>
                <li>type</li>
                <li>url</li>
                <li>id</li>
                <li>revision</li>
                <li>name</li>
                <li>folder</li>
                <li>project</li>
            </ul>
          <li>runs</li>
            <ul>
                <li>pipeline</li>
                <li>state</li>
                <li>result</li>
                <li>createdDate</li>
                <li>finishedDate</li>
                <li>url</li>
                <li>resources</li>
                <li>id</li>
                <li>commit_ids</li>
                <li>name</li>
                <li>variables</li>
                <li>stages</li>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Azure releases

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
          <li>name</li>
          <li>status</li>
          <li>createdOn</li>
          <li>modifiedOn</li>
          <li>createdBy</li>
          <li>start_time</li>
          <li>finish_time</li>
          <li>releaseDefinition</li>
          <li>description</li>
          <li>reason</li>
          <li>logsContainerUrl</li>
          <li>url</li>
          <li>owner</li>
          <li>tags</li>
          <li>environments</li>
          <li>variables</li>
          <li>variableGroups</li>
            <ul>
                <li>type</li>
                <li>id</li>
                <li>name</li>
                <li>description</li>
                <li>isShared</li>
            </ul>
          <li>artifacts</li>
            <ul>
                <li>sourceId</li>
                <li>type</li>
                <li>alias</li>
                <li>definitionReference</li>
                <li>isPrimary</li>
                <li>isRetained</li>
            </ul>
          <li>stages</li>
            <ul>
                <li>id</li>
                <li>releaseId</li>
                <li>name</li>
                <li>status</li>
                <li>createdOn</li>
                <li>modifiedOn</li>
                <li>timeToDeploy</li>
                <li>variables</li>
                <li>variableGroups</li>
                <li>deploySteps</li>
                <li>rank</li>
                <li>steps</li>
                    <ul>
                        <li>id</li>
                        <li>name</li>
                        <li>dateStarted</li>
                        <li>dateEnded</li>
                        <li>startTime</li>
                        <li>finishTime</li>
                        <li>status</li>
                        <li>agentName</li>
                        <li>logUrl</li>
                        <li>stepLogs</li>
                    </ul>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>