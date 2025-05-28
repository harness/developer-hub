---
title: Tasks
description: Tasks
sidebar_position: 40
---
Tasks are reusable functions designed to perform a series of commonly used steps. In AI Test Automation, there are two types of tasks: **Login tasks** and **General tasks**. Login tasks, the most frequently used, are designed to capture credentials and are automatically included in any test during its creation and execution. General tasks, on the other hand, are manually added by the test creator, who selects them from a list of available tasks.

Login tasks ([Create a login task](<./../../get-started/quickstart.md#create-a-login-task>) ) are created through interactive authoring, while General tasks are defined by selecting a series of consecutive steps in the test details page.&#x20;

Once a test is created and you think a set of consecutive steps will be reused in various other tests then you can simply select the steps and create a task. Once the task is created you can add the task to any new test in interactive authoring or during Editing.&#x20;


<DocImage
  path={require('./static/create-task.png')}
  alt="Create a task"
  title="Click to view full size image"
  width={400}
  height={400}
/>

## Adding a task to a test&#x20;

During test authoring, you can add a task to a test by selecting one from the list.&#x20;


<DocImage
  path={require('./static/add-task.png')}
  alt="Add a task"
  title="Click to view full size image"
  width={400}
  height={400}
/>


Once added, simply click on the `Continue` button at the top of the step panel to execute all the task steps and make it part of the test definition&#x20;



<DocImage
  path={require('./static/continue-task.png')}
  alt="Continue to execute"
  title="Click to view full size image"
  width={600}
  height={900}
/>

Here is a video explaining how tasks can be created

<iframe src="https://www.loom.com/embed/ed40cb4ed4854df79ddf44964fe5fd4e?sid=ce56db9e-9693-4806-92b6-93face064f3c" width="960" height="540" frameborder="0" allowfullscreen></iframe>


## Parameters in Tasks

It's common to have parameters within tasks, as users often need to run tests with varying values to cover different scenarios. In AI Test Automation, you can set runtime overrides when running a test in standalone mode through the run modal. However, manual overrides aren’t available when running multiple tests, or test suites, via CI/CD integration. To address this, AI Test Automation allows users to set parameter overrides at four levels in a hierarchical structure:

1. **Tasks**: Each parameter has a default value, typically set when the task is created. If no other overrides are applied, this default value is used in any test that includes the task.
2. **Environment**: This override lets you specify a unique value for a parameter when a task runs in a specific environment. For example, if you set an override for `Environment 1` but **not** for `Environment 2`, the task will use the override in `Environment 1` and the default in `Environment 2`.
3. **Test**: A test-level override supersedes the environment and task-level values. You can also define a parameter override for a specific combination of environment and test.
4. **Test Suites**: This is the highest level in the hierarchy. Parameter overrides set at the test suite level apply during test suite execution and take precedence over all other levels.

Here is a **short video ** explaining how to set overrides for a Task parameter.&#x20;

<iframe src="https://www.loom.com/embed/e9a34c116e254ad7b93f49f1744195d2?sid=5716f09d-cd35-4452-95ab-47671630f954" width="960" height="540" frameborder="0" allowfullscreen></iframe>


### Setting a Task Level Default

To set the task level default simply edit the value on the parameters modal as shown below.&#x20;



<DocImage
  path={require('./static/task-default.png')}
  alt="Continue to execute"
  title="Click to view full size image"
  width={600}
  height={500}
/>

