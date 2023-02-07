---
title: Pipeline Settings
description: This topic describes centralized pipeline settings.
# sidebar_position: 3
---
If you are an account administrator, you can enforce limits on the usage of pipelines in your account. Possible and default values, along with other aspects of each setting (such as whether or not you can edit the setting), depends on the plan to which you are subscribed.

The following table describes what each setting means and how it applies to the various plans.

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Setting</th>
      <th>Description</th>
      <th>Free Plan</th>
      <th>Team Plan</th>
      <th>Enterprise Plan</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top">
      <td>
        <strong>Pipeline Execution Concurrency</strong>
      </td>
      <td>
        <p>Concurrent Active Pipeline Executions</p>
      </td>
      <td>
        <p>Number of concurrent pipeline executions per execution API request. The setting considers only those executions that are in progress (including those that are paused temporarily in steps such as the wait step or approval step), not those that have executed to completion. Any executions that users trigger when the limit is reached are added to the execution queue.</p>
      </td>
      <td>
        <ul>
          <li>Default: 2</li>
          <li>Editable: No</li>
          <li>Scope: Account </li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Default: 200</li>
          <li>Default: 500</li>
          <li>Editable: Yes</li>
          <li>Scope: Account </li>
        </ul>
      </td>
            <td>
        <ul>
          <li>Default: 500</li>
          <li>Default: 1000</li>
          <li>Editable: Yes</li>
          <li>Scope: Account </li>
        </ul>
      </td>
    </tr>
    <tr valign="top">
      <td>
        <strong>Parallelism</strong>
      </td>
      <td>
        <p>Parallelism Limit</p>
      </td>
      <td>
        <p>Number of parallel steps at a single level in a pipeline, regardless of whether you use a matrix, configure parallelism, or configure the steps manually. This is a hard limit at the account scope; it is not made available to account administrators and users cannot configure this limit for a pipeline. If users specify a value for a pipeline, they can save the pipeline can but not execute it.</p>
      </td>
      <td>
        <p>10</p>
      </td>
      <td>
        <p>256</p>
      </td>
            <td>
        <p>256</p>
      </td>
    </tr>
  </tbody>
</table>
