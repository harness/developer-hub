The next step is to create a monitored service for the Verify step. Harness CV uses a monitored service to monitor health trend deviations, using logs and metrics obtained from the health source, such as APM and logging tools.


:::info note
If you've set up a service or environment as runtime values, the auto-create option for monitored services won't be available. When you run the pipeline, Harness combines the service and environment values to create a monitored service. If a monitored service with the same name already exists, it will be assigned to the pipeline. If not, Harness skips the Verification step.

For instance, when you run the pipeline, if you input the service as `todolist` and the environment as `dev`, Harness creates a monitored service with the name `todolist_dev`. If a monitored service with that name exists, Harness assigns it to the pipeline. If not, Harness skips the Verification step.
:::


To create a monitored service:

1. In the **Monitored Service Name** section, select **Click to autocreate a monitored service**.

      Harness automatically generates a monitored service name by combining the service and environment names. The generated name appears in the **Monitored Service Name** field. Note that you cannot edit the monitored service name.

      If a monitored service with the same name and environment already exists, the **Click to autocreate a monitored service** option is hidden, and the existing monitored service is assigned to the Verify step by Harness.