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

:::info note
This feature is available at the account scope. Currently, this feature is behind the feature flag `PIE_PIPELINE_SETTINGS_ENFORCEMENT_LIMIT`.

:::

Number of concurrent pipeline executions per execution API request. The setting considers only those executions that are in progress (including those that are paused temporarily in steps such as the wait step or approval step), not those that have executed to completion.

Any executions that are triggered when the limit is reached are added to the execution queue. **These executions and their deployments are not failed by Harness.**

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



## Pipeline Execution Time Limits 

The maximum allowable time a stage or pipeline can run. These are the maximum allowable values, but smaller values can be set within the pipeline using the **Timeout** field.

If a timeout is configured within a pipeline or stage larger than these system limits, the limit is still enforced.

The following table lists the limits for each plan. You can only edit all of these items to be *less* within the Account.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Free plan</th>
      <th>Trial plan</th>
      <th>Team plan</th>
      <th>Enterprise plan</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top">
      <td>
        
		<strong>Pipeline Timeout</strong>
      </td>
      <td>
        <p>2 hours</p>
      </td>
      <td>
        <p>4 hours</p>
      </td>
      <td>
        <p>30 days</p>
      </td>
      <td>
        <p>35 days</p>
      </td>
    </tr>
    <tr valign="top">
      <td>
        
		<strong>Stage Timeout</strong>
      </td>
      <td>
        <p>1 hour</p>
      </td>
      <td>
        <p>1 hour</p>
      </td>
      <td>
        <p>30 days</p>
      </td>
      <td>
        <p>35 days</p>
      </td>
    </tr>
    <tr valign="top">
      <td>
        
		<strong>Editable</strong>  
      </td>
      <td>
        <p>Yes</p>
      </td>
      <td>
        <p>Yes</p>
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
        <p>Account/Organization/Project</p>
      </td>
      <td>
        <p>Account/Organization/Project</p>
      </td>
      <td>
        <p>Account/Organization/Project</p>
      </td>
      <td>
        <p>Account/Organization/Project</p>
      </td>
    </tr>
  </tbody>
</table>
