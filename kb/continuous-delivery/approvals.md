#### How can specific users be able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/#select-approvers)


#### When querying the Harness Approval API, the approval details are returning with the message, No approval found for execution.

The API will only return Approval details if there are any approval step pending for approval. If there are no such executions currently, then its expected to return No Approval found for execution


#### If we have multiple services using this same pipeline template, both within and outside the same project, does Harness differentiate each pipeline execution by service? If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step, would approving the service1 pipeline cause the service2 pipeline to be rejected?

The pipelines will run just fine, as you used the template and specified different services at the runtime , so it will run independently. 


#### How do I preserve my Manual approval step msg format in email body?

Emails are rendered in HTML, so different HTML tags can be added to approval steps message and these tag will be resolved as per HTML defination and same will be vivsible in email's body


#### What types of events can trigger notifications in Harness pipelines?
Notifications can be triggered for various events, such as pipeline starts, pipeline successes, pipeline failures, specific workflow steps, and manual approvals. You can customize the triggers based on your requirements.


#### Auto-Reject previous deployments paused in this step on approval

If you have multiple services using this same pipeline template, both within and outside the same project, If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step. 
As the template used here has been specified with different services at the runtime, so it will run independently. 


#### How can we provide more details in approval step for approver
You can use Include stage execution details in approval option so that approvers get the execution history for this Pipeline. This can help approvers make their decision.


#### Can I implement a custom approval step that runs a script, calls Jira, and fails if the issue count is greater than 0 ?

No, it is not yet introduced for Jira. It is only applicable for Harness Approvals at the moment


#### What is the time limit for a pipeline execution?

The maximum limits for a single pipeline run are 35 days for paid plans and 4 hour for free plans with a verified account.

These limits are applied because:
- There is a limit on the total number of concurrent and queued executions. If some pipelines run/wait for days/weeks, they consume valuable resources from other projects in the account and delay queues.
- Usually, very long running pipelines are waiting on something (approvals, test results, deployments) that took longer than expected. A quicker timeout makes it clear that something went wrong in the workflow, instead of indefinitely waiting.
- Long running pipelines impact the availablility of Harness resources.

For more information, go to [Deloyment logs and limitations](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations) and [Pipeline settings](https://developer.harness.io/docs/platform/pipelines/pipeline-settings).


#### Can we use Env/Infra etc variable as skip condition for approval stage
If approval is added as stage then these variables will not be available and only account/org/project or pipeline variables will be available, If you are using approval as step inside Deploy stage than you can access Env/Infra variables as well


#### How do I provide, the Jira project as an expression for the Jira approval step?
In the Jira approval step For the the Jira project field, we only support fixed and runtime input for now, Expressions are not supported.


#### In case of CD pipeline, the use case is like, we need to deploy multiple services via single pipeline, for which we can use multiservice select, and we can refer the artifact of previous stage to the next stage. However, is there any possible way by which I can refer to the single service of previous stage and its artifact.Use case if for approval stage where we need to run the stage once as only one approval should be required to deploy multiple services.

For using a single service of the previous stage and its artifact you can use the expressions from the previous stage service output variables, and you can use the expression in your next service artifact.


#### On Harness approval steps, when using expressions for the description, how can we add line breaks ?

One can try using the expression `\\` or `\u000a` to make an expression work.


#### If the approval step is timed out, Is there any way to continue deployment?

You can use the failure strategy to move the pipeline forward if the approval step is timeout.
On the approval step's advance section, go to failure strategy and use the mark as success to make the step successful and the pipeline will move to the next step.


#### How does Harness NG rollback if something goes wrong in Production. Will it be automatically done or do we need to trigger anything manually?

You can perform rollbacks manually, automatically, or use a hybrid option (triggering it automatically but requiring approval before it happens).
Post-deployment rollback: This can be considered a manual approach, allowing you to rollback deployments that succeeded on technical criteria but that you want to roll back for other reasons. 
Rollback as a failure strategy: This could be considered an automatic approach. Whenever something is deployed into your environment and an issue occurs during the execution, the failure strategy will trigger the rollback flow. This can be a custom flow or a pre-generated one by Harness.


#### How to mark the pipeline as success even the approval got rejected?

To configure a pipeline to be marked as successful even if an approval is rejected, follow these steps:
1. Navigate to the `Advanced` tab of your pipeline configuration.
2. Under this tab, locate the section labeled `Failure Strategy`.
3. In this section, select `Approval Rejection` from the dropdown `On Failure of type`.
4. Next, choose the `Perform Action` option.
5. From the available actions, select `Mark as Success`.


#### Can manual approval stages in Harness be configured to make approverInputs mandatory?

The approver inputs are optional by default. However, it is possible to enforce a policy that denies a pipeline from proceeding if the approver input is not provided. Below is an example of a policy that can be applied using the On Run/On Save event for a pipeline:

```
package pipeline

# Deny a pipeline if an Approval step is missing approver inputs
deny[msg] {
    stage := input.pipeline.stages[_].stage
    step := stage.spec.execution.steps[_].step
    step.type == "HarnessApproval"
    count(step.spec.approverInputs) == 0
    msg := sprintf("Approval step '%s' in stage '%s' is missing approver inputs", [step.name, stage.name])
}
```


#### Can you update Jira issues using Harness?
Yes, you can update Jira issues and add Jira approval stages and steps using Harness.


#### Does Harness provide Pause/Resume Pipeline functionality in NextGen ?

Yes, the Pause/Resume Pipeline functionality is provided behind the `FF: PIE_DEPRECATE_PAUSE_INTERRUPT_NG`. It is not planned to depricate the feature but due to feature complexity it is advisable to use the Harness Approval steps. 
Please read more on how to use Automated Harness Approval steps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#prevent-approval-by-pipeline-executor)


#### Will there be support for service account keys in the approval API?

At present, our authentication system exclusively accommodates user API Key-based authentication. However, it is pertinent to note that support for service account authentication is under development as feature request.


#### Is it possible to insert a hyperlink with markdown in the approval message?

In order to resolve this version as an hyperlink on slack you can use (`|`) symbol to seperate the link and text to creeate a hyperlink. This Slack formatting includes the link and the text you want to display, separated by a pipe (`|`) character. 

Replace the URL and version with your actual values, and enclose the link and the version text inside `<>`, such as `<https://github.com/harness/guestbook/blob/main/.harness/inputover.yaml | Version>`


#### How can I configure approval emails in child pipelines to direct recipients to the parent pipeline execution instead of the child?

Yes, the approval message links you to the child pipeline rather than the parent pipeline.


#### What pipeline statuses are considered when determining concurrent active pipeline executions ?

Concurrent active pipeline executions comprises of active and in-progress executions. This includes those that are paused temporarily by steps such as the wait step or approval step. Currently there are plans to exclude pipelines that are waiting for approval.


#### Is there a way to see which user acts on the wait step to mark it as a success or mark it as fail?

One can look at having Harness approval step in addition to wait step for this usecase, also can set a failure strategy in case it timeout
Please read more on Harness approval step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#add-approval-step)


#### How do I dynamically pass a single user group or multiple into an Approval Stage?

First, set the User Groups section in the approval stage to `combined`. This allows you to pass a list of User Groups. Harness expects the value to be a list so passing as a string won't work. Instead, pass an expression as shown below.
```
<+<+stage.variables.groups>.split(",")>
```

The variable `groups` mentioned above can be a list of groups or a single group. 

Both of these example values work for the `groups` variable.

- `groupA,groupB,groupC`
- `group1`


