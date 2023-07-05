1. In **Continuous Verification Type**, one of the type below:
   
   - **Auto**: Harness automatically selects the best continuous verification type based on the deployment strategy.
   
   - **Rolling Update**: Rolling deployment is a deployment technique that gradually replaces old versions of a service with a new version by replacing the infrastructure on which the service runs. Rolling updates are useful in situations where a sudden changeover might cause downtime or errors.
   
   - **Canary**: A Canary deployment involves a two-phased deployment. In phase one, new pods and instances with the new service version are added to a single environment. In phase two, a rolling update is performed in the same environment. A Canary deployment helps detect issues with the new deployment before fully deploying it.
   
   - **Blue Green**: Blue-green deployment is a technique used to deploy services to a production environment by gradually shifting user traffic from an old version to a new one. The previous version is referred to as the blue environment, while the new version is known as the green environment. Upon completion of the transfer, the blue environment remains on standby in case of a need for rollback or can be removed from production and updated to serve as the template for future updates.
   
   - **Load Test**: Load testing is a strategy used in lower-level environments, such as quality assurance, where a consistent load is absent, and deployment validation is typically accomplished through the execution of load-generating scripts. This is useful to ensure that the application can handle the expected load and validate that the deployment is working as expected before releasing it to the production environment.

2. In **Sensitivity**, choose the sensitivity level. The available options are **High**, **Medium**, and **Low**. When the sensitivity is set to high, even minor anomalies are treated as verification failures. This ensures that even the slightest issue is detected and addressed before releasing the deployment to production.
   
3. In **Duration**, choose a duration. Harness uses the data points within this duration for analysis. For instance, if you select 10 minutes, Harness analyzes the first 10 minutes of your log or APM data. It is recommended to choose 10 minutes for logging providers and 15 minutes for APM and infrastructure providers. This helps you thoroughly analyze and detect issues before releasing the deployment to production.
   
4. In the **Artifact Tag** field, reference the primary artifact that you added in the **Artifacts** section of the Service tab. Use the Harness expression `<+serviceConfig.artifacts.primary.tag>` to reference this primary artifact. To learn about artifact expression, go to [Harness expression](..//..platform/../../../platform/12_Variables-and-Expressions/harness-variables.md).
   
5. Select **Fail On No Analysis** if you want the pipeline to fail if there is no data from the health source. This ensures that the deployment fails when there is no data for Harness to analyze.