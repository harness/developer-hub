---
title: Add Notes for Pipeline Execution
description: This feature allows users to add notes for pipeline execution.
tags: 
- pipelines-notes
- pipelines-execution-notes
- add-notes-to-pipeline
- execution-notes
- execution-notes-filter
- execution-notes-search
- execution-notes-add
- execution-notes-edit
- notes-in-pipeline-execution
- notes-for-pipeline
- edit-execution-notes
- add-execution-notes
- edit-pipeline-execution-notes
- edit-pipeline-notes
- add-pipeline-notes
---

Harness brings a smarter, more contextual way to manage your pipeline executions. You can add or edit notes on any execution and search for that particular execution using those notes across pipeline executions. Whether you want to tag runs with ticket IDs, change request numbers, or deployment details, this update helps you **capture the why behind every execution** and easily find it later through execution notes filter.

![](./static/add-note-pipeline.png)

## Requirements

You must have **Execute pipeline permission** to be able to add or edit notes.  

## Add a note to a pipeline execution 

You can add a note to a pipeline execution while it is running and even after the execution is completed. 


<DocImage
  path={require('./static/note-testing-single-stage.png')}
  alt="notes for single stage"
  title="Click to view full size image"
/>

In order to add notes for a pipeline after it has completed execution, navigate to the Execution List ( history ) and click on the three dot menu next to the execution for which you want to add notes and select `Add Execution Notes`.


<DocImage
  path={require('./static/note-pipeline-execution.png')}
  alt="notes for three stages pipeline execution"
  title="Click to view full size image"
/>

 Alternatively, You can click on the execution and find the `Add a Note` in the pipeline studio. 
<DocImage
  path={require('./static/notes-testing-two-stages.png')}
  alt="notes for two stages pipeline execution"
  title="Click to view full size image"
/>


## Filter Executions by Notes

You can create filters based on text present in execution notes and search across executions using these filters.

:::info note
In order to create filters based on text present in execution notes and search across executions using the execution notes filters, the feature flag `CDS_EXECUTION_LIST_FILTERS` must be enabled. Please contact [Harness support](mailto:support@harness.io) to enable this feature. 
:::
In the [Add a note to a pipeline execution](#add-a-note-to-a-pipeline-execution) section, We added notes for pipeline executions and in the notes we mentioned whether the executed pipeline contained a single stage or multiple stages. This is an example of how we can utilize the execution notes. You can use any criteria like ticket number, change request number, deployment details, pipeline changes, or any other criteria as per your requirements to filter the execution notes. 

The example below shows filtering based on execution notes across multiple runs of a pipeline, where some executions include a single stage while others include two or three stages.

We filtered the executions by notes:

- using the keyword `single`

<DocImage
  path={require('./static/notes-filter-single.png')}
  alt="notes for filtering single stage pipeline execution"
  title="Click to view full size image"
/>

- using the keyword `two`

<DocImage
  path={require('./static/notes-filter-two.png')}
  alt="notes for filtering two stage pipeline execution"
  title="Click to view full size image"
/>

- using combination of keywords `single` , `two` and `three`

<DocImage
  path={require('./static/notes-filter-all.png')}
  alt="notes for filtering all stage pipeline execution"
  title="Click to view full size image"
/>