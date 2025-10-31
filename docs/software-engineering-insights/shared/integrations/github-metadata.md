Harness SEI uses Rest APIs to connect to GitHub. Using these API calls, SEI ingests metadata for GitHub commits, pull requests, issues, repositories, tags, and users. This metadata is used to generate engineering metrics and insights.

### GitHub commits

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
          <li>sha</li>
          <li>url</li>
          <li>author</li>
          <li>committer</li>
          <li>message</li>
          <li>timestamp</li>
        </ul>
        <ul>
          <li>git_author</li>
            <ul>
              <li>email</li>
              <li>name</li>
              <li>date</li>
            </ul>
        </ul>
        <ul>
          <li>git_committer</li>
            <ul>
              <li>email</li>
              <li>name</li>
              <li>date</li>
            </ul>
        </ul>
        <ul>
          <li>stats</li>
            <ul>
              <li>additions</li>
              <li>deletions</li>
              <li>total</li>
            </ul>
        </ul>
        <ul>
          <li>files</li>
            <ul>
              <li>additions</li>
              <li>deletions</li>
              <li>changes</li>
              <li>filename</li>
              <li>patch</li>
              <li>sha</li>
              <li>status</li>
            </ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### GitHub issues

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
          <li>number</li>
          <li>title</li>
          <li>user</li>
          <li>labels</li>
          <li>state</li>
          <li>assignee</li>
          <li>locked</li>
          <li>active_lock_reason</li>
          <li>assignees</li>
          <li>comments</li>
          <li>created_at</li>
          <li>updated_at</li>
          <li>closed_at</li>
          <li>author_association</li>
          <li>body</li>
          <li>milestone</li>
          <li>events</li>
          <li>issue_events</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### GitHub pull requests

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
          <li>number</li>
          <li>state</li>
          <li>locked</li>
          <li>title</li>
          <li>user</li>
          <li>body</li>
          <li>created_at</li>
          <li>updated_at</li>
          <li>closed_at</li>
          <li>merged_at</li>
          <li>merge_commit_sha</li>
          <li>assignee</li>
          <li>assignees</li>
          <li>requested_reviewers</li>
          <li>requested_teams</li>
          <li>labels</li>
          <li>milestone</li>
          <li>head</li>
          <li>base</li>
          <li>author_association</li>
          <li>reviews</li>
          <li>pr_commits</li>
          <li>merge_commit</li>
          <li>additions</li>
          <li>deletions</li>
          <li>change_files</li>
          <li>commits</li>
          <li>patches</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### GitHub repositories

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
          <li>full_name</li>
          <li>description</li>
          <li>owner</li>
            <ul>
              <li>type</li>
              <li>login</li>
              <li>orgVerifiedDomainEmails</li>
              <li>name</li>
              <li>email</li>
            </ul>
          <li>master_branch</li>
          <li>created_at</li>
          <li>pushed_at</li>
          <li>updated_at</li>
          <li>size</li>
          <li>is_private</li>
          <li>language</li>
          <li>languages</li>
          <li>events</li>
          <li>pull_requests</li>
          <li>tags</li>
          <li>issues</li>
          <li>issue_events</li>
          <li>id</li>
          <li>html_url</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### GitHub tags

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
          <li>commit</li>
            <ul>
              <li>sha</li>
              <li>url</li>
            </ul>
          <li>node_id</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### GitHub users

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
          <li>type</li>
          <li>login</li>
          <li>orgVerifiedDomainEmails</li>
          <li>name</li>
          <li>email (GitHub App)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### GitHub repository events

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
          <li>type</li>
          <li>is_public</li>
          <li>actor</li>
          <li>org</li>
          <li>created_at</li>
          <li>commits</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>