---
title: Pipeline settings
description: This topic describes centralized pipeline settings.
sidebar_position: 3
---
If you are an account administrator, you can enforce limits on the usage of pipelines in your account. Possible and default values, along with other aspects of each setting (such as whether or not you can edit the setting), depend on the plan to which you are subscribed.

This article provides a detailed description of the pipeline settings in various categories.

:::info

For certain settings, the values in the Free plan also apply to the trial period of the Team and Enterprise plans. In such cases, the Free plan and trial period share a column in the settings table.

:::

## Pipeline Execution Concurrency

### Concurrent Active Pipeline Executions

Number of concurrent pipeline executions per execution API request. The setting considers only those executions that are in progress (including those that are paused temporarily in steps such as the wait step or approval step), not those that have executed to completion. Any executions that users trigger when the limit is reached are added to the execution queue.

The following table describes how this setting applies to each plan.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Free plan/Trial</th>
      <th>Team plan</th>
      <th>Enterprise plan</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top">
      <td>
        <strong>Default</strong>
      </td>
      <td>
        <p>2</p>
      </td>
      <td>
        <p>200</p>
      </td>
      <td>
        <p>500</p>
      </td>
    </tr>
    <tr valign="top">
      <td>
        <strong>Maximum</strong>
      </td>
      <td>
        <p>NA</p>
      </td>
      <td>
        <p>500</p>
      </td>
      <td>
        <p>1000</p>
      </td>
    </tr>
    <tr valign="top">
      <td>
        <strong>Editable</strong>  
      </td>
      <td>
        <p>No</p>
      </td>
      <td>
        <p>Yes</p>
      </td>
      <td>
        <p>Yes</p>
      </td>
    </tr>
    <tr valign="top">
      <td>
        <strong>Scope</strong>
      </td>
      <td>
        <p>Account</p>
      </td>
      <td>
        <p>Account</p>
      </td>
      <td>    
        <p>Account</p>
      </td>
    </tr>
  </tbody>
</table>

## Parallelism

### Parallelism Limit

Number of parallel steps or stages at a given level in a pipeline, regardless of whether you use a matrix, configure parallelism, or configure the steps or stages manually. For example, in the Free plan, you can add a maximum of 10 parallel stages at a level, and you can add a maximum of 10 parallel steps in each of those stages. 

This is a hard limit at the account scope; it is not made available to account administrators and users cannot configure this limit for their pipelines. Users who specify a value for their pipeline can save the pipeline but not execute it.

The following table shows the value of this setting on each plan.

<table>
  <thead>
    <tr>
      <th>Free plan/Trial</th>
      <th>Team plan</th>
      <th>Enterprise plan</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top">
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