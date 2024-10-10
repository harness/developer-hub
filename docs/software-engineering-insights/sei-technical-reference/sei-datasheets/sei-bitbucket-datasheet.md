---
title: BitBucket Datasheet
description: A complete list of metadata ingested by SEI from BitBucket
sidebar_label: BitBucket Datasheet
sidebar_position: 90
---

SEI uses Rest APIs to connect to BitBucket. Using these API calls SEI ingests metadata for commits and pull requests from BitBucket. This metadata is used to generate engineering metrics and insights.

The full details of all the fields are mentioned below.

- [BitBucket commits](#bitbucket-commits)
- [BitBucket pull requests](#bitbucket-pull-requests)
- [BitBucket repositories](#bitbucket-repositories)
- [BitBucket tags](#bitbucket-tags)

### BitBucket commits

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
          <li>displayId</li>
          <li>author</li>
          <li>author</li>
            <ul>
              <li>name</li>
              <li>emailAddress</li>
              <li>id</li>
              <li>displayName</li>
              <li>active</li>
              <li>slug</li>
              <li>type</li>
            </ul>
          <li>authorTimestamp</li>
          <li>committer</li>
            <ul>
              <li>name</li>
              <li>emailAddress</li>
              <li>id</li>
              <li>displayName</li>
              <li>active</li>
              <li>slug</li>
              <li>type</li>
            </ul>
          <li>committerTimestamp</li>
          <li>message</li>
          <li>projectName</li>
          <li>repoName</li>
          <li>commitUrl</li>
          <li>additions</li>
          <li>deletions</li>
          <li>files</li>
            <ul>
              <li>fileName</li>
              <li>source</li>
                <ul>
                    <li>components</li>
                    <li>parent</li>
                    <li>name</li>
                    <li>extension</li>
                    <li>toString</li>
                </ul>
              <li>destination</li>
                <ul>
                    <li>components</li>
                    <li>parent</li>
                    <li>name</li>
                    <li>extension</li>
                    <li>toString</li>
                </ul>
              <li>linesRemoved</li>
              <li>linesAdded</li>
            </ul>
          <li>parents</li>
            <ul>
                <li>id</li>
                <li>displayId</li>
            </ul>
          <li>pullRequests</li>
          <li>tags</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


### BitBucket pull requests

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
          <li>version</li>
          <li>title</li>
          <li>description</li>
          <li>state</li>
          <li>open</li>
          <li>closed</li>
          <li>creationDate</li>
          <li>updatedDate</li>
          <li>fromRef</li>
            <ul>
              <li>id</li>
              <li>displayId</li>
              <li>latestCommit</li>
              <li>repository</li>
            </ul>
          <li>toRef</li>
            <ul>
              <li>id</li>
              <li>displayId</li>
              <li>latestCommit</li>
              <li>repository</li>
            </ul>   
          <li>author</li>
            <ul>
              <li>user</li>
              <li>role</li>
              <li>approved</li>
              <li>status</li>
              <li>lastReviewCommit</li>
              <li>slug</li>
              <li>type</li>
            </ul>
          <li>reviewers</li>
          <li>participants</li>
            <ul>
              <li>user</li>
              <li>role</li>
              <li>approved</li>
              <li>status</li>
              <li>lastReviewCommit</li>
            </ul>
          <li>links</li>
          <li>properties</li>
            <ul>
              <li>mergeResult</li>
              <ul>
                    <li>outcome</li>
                    <li>current</li>
              </ul>
              <li>resolvedTaskCount</li>
              <li>openTaskCount</li>
            </ul>
          <li>commits</li>
          <li>activities</li>
            <ul>
              <li>id</li>
              <li>createdDate</li>
              <li>user</li>
              <li>action</li>
              <li>commit</li>
            </ul>
          <li>additions</li>
          <li>deletions</li>
          <li>files_ct</li>
          <li>merge_commit</li>
          <li>tags</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### BitBucket repositories

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
          <li>slug</li>
          <li>id</li>
          <li>name</li>
          <li>description</li>
          <li>hierarchyId</li>
          <li>scmId</li>
          <li>state</li>
          <li>statusMessage</li>
          <li>forkable</li>
          <li>project</li>
            <ul>
              <li>key</li>
              <li>id</li>
              <li>name</li>
              <li>description</li>
              <li>public</li>
              <li>type</li>
              <li>links</li>
            </ul>
          <li>public</li>
          <li>links</li>
          <li>defaultBranch</li>
          <li>commits</li>
          <li>pullRequests</li>
          <li>properties</li>
          <li>tags</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### BitBucket tags

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
          <li>displayId</li>
          <li>type</li>
          <li>latestCommit</li>
          <li>latestChangeSet</li>
          <li>hash</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>