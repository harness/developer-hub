In tests or tasks, it's common to use parameters to account for varying scenarios. In AI Test Automation, you can apply runtime overrides when running a test in standalone mode via the run modal.&#x20;





![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/M_fW_MvP3j3Ze4t_IdKL__2025-01-23-13-32-30.png)



However, this flexibility isn't available when executing multiple tests or test suites through CI/CD integration. To solve this limitation, the AI Test Automation uses a  hierarchical parameter overrides across four levels:

1. **Task-Level Overrides**: Each parameter has a default value, usually set during task creation. If no other overrides are specified, this default value is used in any test that includes the task.
2. **Environment-Level Overrides**: These allow you to assign unique parameter values for specific environments. For instance, if you set an override for Environment A but not for Environment B, the task will use the override in Environment A and fall back to the default value in Environment B.
3. **Test-Level Overrides**: These take precedence over task and environment-level values. You can also define overrides specific to a combination of a test and an environment.
4. **Test Suite-Level Overrides**: At the top of the hierarchy, overrides set at the test suite level are applied during test suite execution and override values from all other levels.

**How do I set these overrides ? **

Here is a short video explaining how to set up the parameter overrides&#x20;

::embed[/video]{url="https://www.loom.com/embed/a1c91fdb46384284b494167e670ac161?sid=51a1eb56-bd2d-45c3-ae07-d82f82ca3ed9"}

