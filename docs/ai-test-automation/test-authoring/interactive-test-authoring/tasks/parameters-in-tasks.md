It's common to have parameters within tasks, as users often need to run tests with varying values to cover different scenarios. In AI Test Automation, you can set runtime overrides when running a test in standalone mode through the run modal. However, manual overrides aren’t available when running multiple tests, or test suites, via CI/CD integration. To address this, AI Test Automation allows users to set parameter overrides at four levels in a hierarchical structure:

1. **Tasks**: Each parameter has a default value, typically set when the task is created. If no other overrides are applied, this default value is used in any test that includes the task.
2. **Environment**: This override lets you specify a unique value for a parameter when a task runs in a specific environment. For example, if you set an override for `Environment 1` but **not** for `Environment 2`, the task will use the override in `Environment 1` and the default in `Environment 2`.
3. **Test**: A test-level override supersedes the environment and task-level values. You can also define a parameter override for a specific combination of environment and test.
4. **Test Suites**: This is the highest level in the hierarchy. Parameter overrides set at the test suite level apply during test suite execution and take precedence over all other levels.

Here is a **short video ** explaining how to set overrides for a Task parameter.&#x20;

<iframe src="https://www.loom.com/embed/e9a34c116e254ad7b93f49f1744195d2?sid=5716f09d-cd35-4452-95ab-47671630f954" width="960" height="540" frameborder="0" allowfullscreen></iframe>


### Setting a Task Level Default

To set the task level default simply edit the value on the parameters modal as shown below.&#x20;



:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/6p6looCiuTFh43QWk_NPK_image-20241114-001857.png" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/6p6looCiuTFh43QWk_NPK_image-20241114-001857.png" size="64" width="645" height="447" position="center" caption}

:::

