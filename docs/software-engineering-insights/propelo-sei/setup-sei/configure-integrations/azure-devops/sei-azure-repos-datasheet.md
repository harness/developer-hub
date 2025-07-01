---
title: Azure Repos Datasheet
description: A complete list of metadata ingested by SEI from Azure Repos
sidebar_label: Repos Metadata
sidebar_position: 50
---

SEI uses Rest APIs to connect to Azure Repos. Using these API calls SEI ingests metadata for commits and pull requests from Azure Repos service.
The full details of all the fields are mentioned below.

- [Azure repos commits](#azure-repos-commits)
- [Azure repos pull requests](#azure-repos-pull-requests)

### Azure repos commits

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
          <li>commitId</li>
          <li>author</li>
            <ul>
              <li>name</li>
              <li>email</li>
              <li>date</li>
            </ul>
          <li>committer</li>
            <ul>
              <li>name</li>
              <li>email</li>
              <li>date</li>
            </ul>
          <li>comment</li>
          <li>commentTruncated</li>
          <li>changeCounts</li>
            <ul>
              <li>Add</li>
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          <li>url</li>
          <li>remoteUrl</li>
          <li>changes</li>
            <ul>
              <li>objectId</li>
              <li>gitObjectType</li>
              <li>commitId</li>
              <li>path</li>
              <li>url</li>
              <li>changeType</li>
            </ul>
          <li>pullRequests</li>
          <li>workItems</li>
          <li>changesets</li>
          <li>branches</li>
          <li>labels</li>
          <li>iterations</li>
          <li>metadata</li>
          <li>teams</li>
          <li>tags</li>
          <li>codeAreas</li>
          <li>definition</li>
          <li>releases</li>
          <li>pipeline</li>
          <li>builds</li>
          <li>runs</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


### Azure repos pull requests

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
            <ul>
                <li>id</li>
                <li>name</li>
                <li>url</li>
                <li>defaultBranch</li>
                <li>size</li>
                <li>remoteUrl</li>
                <li>sshUrl</li>
                <li>webUrl</li>
                <li>isDisabled</li>
            </ul>
          <li>labels</li>
          <li>commits</li>
            <ul>
              <li>commitId</li>
              <li>url</li>
              <li>committer</li>
            </ul>
          <li>pullRequestId</li>
          <li>codeReviewId</li>
          <li>status</li>
          <li>createdBy</li>
          <li>closedBy</li>
          <li>creationDate</li>
          <li>title</li>
          <li>description</li>
          <li>sourceRefName</li>
          <li>targetRefName</li>
          <li>mergeStatus</li>
          <li>mergeId</li>
          <li>lastMergeSourceCommit</li>
          <li>lastMergeTargetCommit</li>
          <li>lastMergeCommit</li>
          <li>reviewers</li>
          <li>pullRequestThread</li>
          <li>workItems</li>
          <li>workItemHistories</li>
          <li>workItemFields</li>
          <li>changesets</li>
          <li>branchs</li>
          <li>labels</li>
          <li>iterations</li>
          <li>metadata</li>
          <li>teams</li>
          <li>tags</li>
          <li>codeAreas</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


