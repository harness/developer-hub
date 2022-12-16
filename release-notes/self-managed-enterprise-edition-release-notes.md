---
title: Self-Managed Enterprise Edition release notes
tags: [NextGen, "self-managed-ee"]
slug: self-managed-enterprise-edition-release-notes
date: 2022-12-15T10:00
sidebar_position: 11
---

Harness Self-Managed Enterprise Edition is updated regularly. Review the notes below for details about recent changes.

## October 31, 2022, version 77117

### New features and enhancements

This release introduces the following features and enhancements.

CDS-40386

You can now optionally configure Rolling, Rolling Rollback, and BlueGreen deployments. This option can be implemented in YAML.

CDS-4313

You can now use an ECS Run Task step from an ECS swimlane.

CI-5653

The UI was changed to support the selection of build tools based on Scala and Kotlin. The selection of Kotlin allows the use of maven, gradle and bazel build tools. The selection of Scala allows maven, gradle, bazel and sbt.

CI-568

Added a Docker infrastructure option to CI . The functionality is hidden behind a feature flag.

CI-5737

The Infrastructure tab in Build steps has been updated to show only supported options when a Hosted build infrastructure is selected.

DEL-4836

Changed the UI to support the option for Harness Delegate to run as root. By default, the runAsRoot option is set to true.

DEL-4840

The functionality of the delegate auto-upgrade components was enhanced. On installation, the AutoUpgrade feature displays a status message of Synchronizing. If the component does not receive an API call from the upgrader within 90 minutes, the status message changes to OFF. This affects delegates that are installed with upgrader components.

For more information about delegate auto-upgrade, see Delegate Auto-Update.

PIE-4369

The RGB colors that are used in the console were updated to conform with accessibility standards. The specifications for orange, yellow and red were changed for contrast and readability.

PL-24491

You can now use a read-only vault as your default Secrets Manager. This applies to Hashicorp Vault.

PL-28352

Support was added to allow pre-existing secrets in Vault to be referenced with an expression that contains a fully qualified path. For example:

`<scope_of_secret_manager_connector>`.hashicorpvault://`<secret_manager_connector_identifier>`/path/to/secret#keye.g.: org.hashicorpvault://myVault/harness/testpath/test#key

PL-28573

Feature flag NG_TEMPLATE_GITX_ACCOUNT_ORG was removed to decrease complexity. This means that the functionality used to create templates on gitx primarily depends on the NG_TEMPLATE_GITX feature flag.

### Fixed issues

This release introduces the following fixes.

CDB-390

Resolved a feature flag issue that interfered with the behavior of certain dashboard that were incorrectly hidden or displayed.

CDS-42637

Improving the error message that is shown when imagepath is a null value.

CDS-46662 T

he API (https://apidocs.harness.io/tag/Approvals#operation/addHarnessApprovalActivity ) did not provide details of Json Processing errors. ()Also with incorrect value of Harness Approval Action (https://apidocs.harness.io/tag/Approvals#operation/addHarnessApprovalActivity!ct=application/json&path=action&t=request ) appropriate details were not showing . This has been because of inappropriate error handling for enum and also error details not bubbling up correctly for JsonProcessingException.This issue has been resolved. The error details are shown up correctly

CDS-43002

Updated the UI to hide the count of template input values.

CDS-43091, ZD-34422

The template list screen did not display the account level templates created inline when git experience is enabled.There was a criteria in the query which was filtering out inline templates.This issue has been resolved. The template list screen now displays the account level templates created inline when git experience is enabled.

CDS-43350, ZD-34558

The old connector’s delegate selector has a delegate that is no longer available. Hence it would never delete the old instances.Once the connector is deleted, we have written a migration to cleanup all instances of deleted connectors. This would cleanup instances for old connector and prevent it from looking for running instances (as it still points to same cluster/namespace)

CDS-43430, ZD-34745

Clarified the error message that is sent when delegate execution halts unexpectedly.

CDS-43714

Corrected an issue that interfered with the update of the secrets variable in the shell script. it was not added in the map of variables so i added it in the map to generate autosuggestion

CDS-43757

Expression to get the connector name is available now. Please use "<+infra.connector.name>" in the pipeline

CDS-43778

To support backward compatibility for Nexus docker yaml, we didn't remove the older field "artifactPath" but didn't marked the field as not mandatory which was root cause of the issue.Removing the annotation `NotNull` from field resolved the issue.

CDS-43787

Fixed an issue with theGET approvals/{approvalID} API not updating Window spec details. This occurred because wrapper classes that return the persistent entity were omitted.

CDS-43802

Added some extra checks to insure custom deployment event listener does not affect the updation other than templates.

CDS-43841

Changed code to add validation for an empty string. This fixed a null pointer exception that occurred on creation of a delegate task. Before empty string validation was added, the validation was checked for a null script for purposes of backward compatibility.

CDS-43891

Fixed the display of PDC connection details. Host information was difficult to read.

CDS-43892

Fixed the inconsistent layout of WinRM credentials.

CDS-43898

Added APIs for repository and artifact path information.

CDS-43935

Added a button to clear the status field.

CDS-43970

Changed code to check for support for an earlier spec version.

CDS-44008

Changed code to obtain the default value from the service manifest. This corrected an issue that occurred based on a default value that was an empty string.

CDS-44058

Released the NG_CUSTOM_REMOTE_MANIFEST feature flag.

CDS-44066, ZD-34808

Added a fix to add or update template variables from variable panels.

CDS-44067

After this change, we will stop making bucket list API call, if region or connectorRef are runtime inputs

CDS-44071

Changed code to forbid bucketName being an empty string.

CDS-44072

Fixed the NPE. If bucketName or filePath/Regex is null or empty, the pipeline will throw appropriate exception.

CDS-44146

Added additional criteria to return files with undefined file usage

CDS-44213

Added support for an "infrastructure" key in the pipeline YAML expansion for OPA policies. This affects new services and environments that the pipeline references.

CDS-44233

This issue was happening in edit flow as "EventConditions" were getting added to "Pipeline" artifact and manifest data.This issue has been resolved. The edit flow of "Artifact" and "Manifest" in triggers now works as expected.

CDS-44246

Earlier `<service.name>` and similar service expressions were not resolved when fetching tags for artifact.This is now fixed

CDS-44346

Rolled back the changes related to the recaster alias to avoid the creation of a hard dependency between services.

CDS-44362

Added support for Service V2

CDS-44427

Fetched task definition instead of service definition for the harness file storeSingle line change fix

CDS-44518

The link updated the component only on permission change whereas it should have updated on account, org, project change as wellThis happened because of the dependencies for the link not updating. This has been resolved now

CI-4634

Resolved an issue with a type mismatch that occurred during pipeline execution in CI Manager. The expected type was OSType; the type received was String.

CI-5305,

ZD-33652 Fixed an issue in which tags for a Build and Push Artifact step would resolve to NULL because the tag string had a dash (-) rather than an underscore (\_).

CI-5411, ZD-33910, ZD-34304, ZD-34547, ZD-35359

Fixed an issue where the PR build status was not consistently updated in GitHub.

CI-5509

Fixed the UI by changing the width of the Repository Name field in the Build Stage setup wizard.

CI-5628

Run as user, Privileged, Resource Limits do not show for Service Dependency when Cloud or AWS VMs infra

CI-5657

Earlier we added the Actor UUID in Sender for PR Comment webhook event for Bitbucket. We're extending this info in the other webhooks events as well. Now that the UUID is added, CI Manager can make use of this.

CI-5664

Fixed an issue that could cause CI builds to stall if the build process could not access the binary /usr/local/bin/split_tests.

CI-5691

Reverted a previous code change to ensure that a build on a VM infrastructures deletes the VM if the build gets aborted

CI-5722

Fixed losing onFocus in setting env variables in input set page

CI-5736

Fixed an issue where artifacts would not get listed in the Artifacts tab

CI-5744

Corrected a problem that caused the incorrect rendering of the repository name width when used as a runtime input.

DEL-4813

Introduced a new way for the Docker delegate to provide a proxy configuration.

DEL-4833

Fixed the UI to make use of correct API.

FFM-4672

Extra navigation configuration added to links to FF module.

PIE-5188

Fixed the parallel nodes data construct in case of looping strategies for stages and updated the UI for looping strategy nodes to a more readable format.

PIE-5398

Previously, step connectors/lines were not rendered for the currently running parallel steps.This issue has been resolved. Now the left connectors/lines will render for the currently running parallel steps and both (left and right) connectors/lines will render when parallel steps are no longer in progress and when there's a node next to them.

PIE-5617

Fixed an issue with race conditions developing when template and formik paths were not in sync.

PIE-5621

Added edit functionality for a barrier name in the pipeline's flow control section

PL-26764, ZD-32596

We will not store any dummy secret from now on in case of vault approle if feature flag DO_NOT_RENEW_APPROLE_TOKEN is enabled.

PL-27364, ZD-35444

While update/editing a resource group on its details page; the resource scope dropdown at time would reset back to previously selected scope when it'd be changed from _Account Only_ to _All_ and vice versa. It'd usually take two attempts to get it right.With this change, this bug has been fixed and resource scope dropdown works as user expect it while making selection.

PL-27555

PPT for readOnly vaults will return success without trying to create a dummy secret in remote vault

PL-27587, ZD-33846

Updated the exceptions for account/org/project name fetch APIs.

PL-27887

Previously when switching the auth mechanism from LDAP to username/password, the confirmation modal would show the wrong type of current auth mechanism as SAML. It is fixed now to show the correct auth mechanism type.

PL-28208, ZD-34454

SMTP config of NG and CG is now independent of each other.

PL-28403, ZD-34883, ZD-35135

The hard delete for environment was not working as expected as it was still getting soft deleted and recreation of entity was failing which has now been fixed.

PL-28533

Fixed File URL in git experience when user uses account level Bitbucket server connector to manage files on git.

PL-28613

NgEncrypted Record data for the corresponding secrets will also be deleted from now on.

PL-28739

Add a check to ensure that If authMechanism=UsernamePassword,that takes precedence on FF PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES=ON.

## October 7, 2022, version 76918

### New features and enhancements

This release introduces the following features and enhancements.

CDS-39619

Audit Trails support for service override and Infra Def.

CDS-40803

You can now migrate GCP connector from CG to NG.

CDS-41507

We have added the functionality to retain fixed values provided for template inputs when a new version of the template is linked

CDS-42951

After this change, user can use ECS Blue Green related steps while working with ECS swim-lane.

CDS-43077

Earlier deployments having InfrastructureIdentifier as null were not considered for getActiveServiceDeployments API.

Now Deployment with Infrastructure Identifier as null will appear if there is no other deployment using same Environment having not null Infrastructure details.

CDS-43785

Users/Customers now have an option of ignoring failures in helm history command o/p and continue with installing/upgrading.

DEL-4328

The method that the log streaming task client uses to create threadpools was modified. Threadpools are now created one time in the client's lifetime instead of being created for each task the Delegate receives.

DEL-4338

The versioning scheme for the Immutable Delegate was changed from 1.0.`<build_number>` to year.month.`<buildNumber>`.

DEL-4377

Expiration was added for Immutable Delegate images. These images will now expire after three months.

PIE-5281

Add ability to see unsaved changes as a diff by clicking on "unsaved changes" text in pipeline studio

PL-26145

We are removing following Role Bindings directly assigned to user when adding to any scope for accounts having ACCOUNT_BASIC_ROLE turned ON.

At Account Scope, Account Basic/Account Viewer -All Account Resources.

At Organization scope, Organization Viewer - All Organization Resources.

At Project Scope, Project Viewer - All Project Resources.

PL-27167

The Feature Flag: GIT_SYNC_PROJECT_CLEANUP has been removed, without this FF, upon deletion of git sync project, all the git entities will be deleted.

PL-27954

When NG LDAP authorization is 'disabled', all LDAP SSO linked Harness User Group will not be synced in NG. They will be synced with users from LDAP when the LDAP settings have authorization enabled.

PL-28048

As part of this story we have changed the label for the audits for NG Auth Settings from Login Settings to Authentication Settings, for better visibility for the customer.

PL-28284

he migration will run to remove following Role Bindings directly assigned to users for accounts having ACCOUNT_BASIC_ROLE turned ON.

At Account Scope, Account Basic/Account Viewer -All Account Resources.

At Organization scope, Organization Viewer - All Organization Resources.

At Project Scope, Project Viewer - All Project Resources.

### Fixed issues

This release introduces the following fixes.

CDB-359

Applied fix for dashboards that fail to load.

CDS-36661

Updated the provisioner ID to conform to other steps.

CDS-40897 A

dded serviceHeader API refresh on save and update activity.

CDS-41461

Changed UI label text and made cosmetic changes to the layout of CD edit screens.

CDS-41492 A

dded caching to the API call to list repositories in Artifactory.

CDS-41532, ZD-3324

The issueType in approval was always optional and was only needed to bring the dropdown values in UI. It was not stored in YAML and was not validated it. Because this can be confusing for customers, we changed the behavior. Now we store it as part of YAML and validate the issue type provided by customers.

Please note issueType is still an optional field and older approvals without it will continue to work as it is.

CDS-41810

Added runtime and studio formik validation.

CDS-4194

Test connection issue with custom port.

CDS-42007

Fixed a problem that disabled a Copy button for ServiceV2 and the copying of a path from the serviceV1 variable when disabled.

CDS-42172

Added artifact details i.e. artifact path and tag/version on hover of the existing artifact versions.

CDS-42253

Multiple small fixes made for AWS and testing as part of an AWS code review.

CDS-42313

Error thrown if matrix or parallelism strategy used for for command step or step group which has a command step.

CDS-42396

Uploading PDC connectorJSON issue fix.

CDS-42410, ZD-33295

For the capability check for the Docker registry connector, we use endpoint `/v2` endpoint to validate.

Per the Docker documentations, /v2 is the only endpoint to validate the accessibility for Docker registry version 2.

To handle the scenario we are appending /v2 to connector URL if it doesn't exist.

CDS-42445

YAML path for templates was not handled.

CDS-42448

Unselecting infra as a runtime wasn't handled when infra have runtime inputs

CDS-42458

Fixed an issue that prevented a selected secret from showing in the WinRM connector edit flow.

CDS-42639

Fixed an issue that prevented iteration through all the configuration files during the step in which the configuration is copied.

CDS-42707

Any change in step group in rollback view was not persisting and UI was not saving those changes to the BE.

After the fix, step group in rollback view should work as expected.

CDS-42709

Added additional execution logs.

CDS-42756

Improved execution logs and exception handling.

CDS-42769

In the past month, we noted the entitySetupUsages redis topic being accumulated and consumers unable to consume references at the rate of production.

On debugging we found that on each execution related to a service step, we were producing unnecessary setup usages. This was causing redis stream to accumulate.

We fixed this by not producing setup usages on service step execution.

CDS-42790, ZD-34237

Fixed a scoping problem that resulted from the incorrect mapping of NextGen clusters to gitops clusters.

CDS-42875

Tested the PDC hosts error message.

CDS-42886

Added regions API.

CDS-42891

AWS tags component implementation.

CDS-42922

Copy command for Jenkins artifact had issues with Kerberos authentication. This is now resolved.

CDS-42924

Added new capability check which includes credentials when making connection with WinRM machine.

CDS-42988

Fixed NPE for Kerberos no TGT.

CDS-43082

ZD-34448, ZD-34525

The user was unable to create a template when the scope was ORG/ACCOUNT. This was happening because an incorrect validation function was preventing the form from submitting. This issue was fixed by conditionally running that validation.

CDS-43107

This fix Improves error messaging and provides information when a shell script executing on a remote host encounters FileNotFoundException.

CDS-43180

Fixed an issue that prevented the proper behavior of the version dropdown in the template selector.

CDS-43195

Connector ref visible in artifact summary.

CDS-43254

Services in the older pipeline were being identified as new services if they were being propagated. This was fixed by correctly identifying the older services.

CDS-43266

Fixed a problem that caused the option to select other file types besides secrets when username/sshKey is selected.

CDS-43268

Delete Resource step is getting failed even the resource is present, fixed that by reverting the changes

CDS-43293

We were not adding the metadata to artifact outcome and few customer use <+artifact.url> for deployment.To address the issue, we have added the URL to outcome and can be fetch using <+artifact.metadata.url> .

CDS-43301

hostConnectionType added to Azure/AWS infrastructure.

CDS-43471

Upon clicking Save button, we did not see the loading icon for INLINE templates.It was happening due to the new git flow, since a check for determining whether the template was INLINE/REMOTE/OLD_GIT_SYNC was obsolete. Updated the condition for the scenario.Now the user is able to see the Loading icon

CDS-43493

ZD-34752

Users/Customers now have an option of ignoring failures in helm history command o/p and continue with installing/upgrading.

CDS-43500

Small bugs found in testing.

CDS-43527

The validation for name did not prevent submit as the validation promise resolved instead of rejecting. This has been temporarily fixed by handling this resolution in case of the name id form, thereby resolving the issue.

CDS-43606

We had a 10kB limit on exported environment variable length in case of execute on host kind of shell scripts. We have now increased the limit to 200kB.

CI-4518

Fixed a UI issue to ensure that a hint appears in a Git Clone step if there is a connectivity issue with the Delegate.

CI-4581

ZD-34734

Fixed an issue in the Run Tests step that could cause a manual build to fail if a Git branch was not specified.

CI-4705

Improved the error message that appears when a connection test fails because an account-level resource is trying to use a project-level secret.

CI-4788

Fixed a back-end pipeline issue in which the namespace field that was undefined in an infrastructure definition might be undetected and result in a Null Pointer Exception.

CI-4884

Added logic to prevent a Null Pointer Exception if a user adds a AWS_ACCESS_KEY_ID variable with no value to a pipeline.

CI-5251

Improved handling of GitHub registration requests and responses, which prevents trigger webhook creation failures in hosted build infrastructures.

CI-5305

ZD-33652

Fixed an issue in which tags for a Build and Push Artifact step would resolve to NULL because the tag string had a dash (-) rather than an underscore (\_).

CI-5315

Added a validation to ensure that a user provides a repo name when setting up a trigger with an account-level Git connector. Without this validation, the UI would allow users to click Save without a repo name but the trigger would not get created.

CI-5323

Changed the “exit x” button that appears when creating a connector to make it more visible.

CI-5377

Added a force-kill flag to ensure that CI pods are deleted during a build cleanup. This ensures that pods get cleaned up even if they are in an Unknown or Not-Ready state.

CI-5411

ZD-33910, ZD-34304, ZD-34547, ZD-35359

Added execution capability in CI send status task.

CI=5463

Added UI validation to ensure the Limit Memory and Limit CPU fields have the required formats. Previously, incorrect values for these fields were flagged during a build, which would cause the build to fail.

CI-5467

We have now start consuming date from webhook data for gitlab.

CI-5473

Git clone will be done using branch refs rather than pull-request refs.

CI-5504

ZD-34241

Added back-end validation to ensure that a user cannot create a Bitbucket connector with different usernames for standard and API Authentication access.

CI-5523

During save/update of CI steps, strategy section of the step yaml was getting removed, hence it was not rendering it on the UI.

CI-5556

Fixed an issue in which CRUD events were not getting processed and acknowledged.

CI-5579

Fixed a UI issue when adding a new build stage to a new pipeline: when the user enters a name in the Repository Name field, the UI should show the repo URL getting generated under the field.

DEL-4826

Updated UI after feedback.

DEL-4898

ZD-34654

if a user runs `set -e` in init script it can change the behavior of harness script steps. This change resets the behavior change.

FFM-4481

When users are making a patch request to add/remove Targets to a Target Group or add/remove a rule within Target Groups, they will now see a user-friendly version of that log within the Activity tab.

PIE-4981

When we click on “Run” button in pipeline studio, if the pipeline has runtime inputs, we have the option to create an input set on the fly while running the pipeline. Currently, a user can save the input set into a separate branch from the pipeline. This creates a bad UX in that while running the pipeline, if input set is in a different branch, it’ll fail.- To resolve this issue, we have decided to disable “Commit to a new branch” for input sets.Note: This is only from the “Run Pipeline” dialog and not the “Input Sets” tab at the header. From there, user can commit in any branch they like.

PIE-5018

ZD-33844

Loading of parallel stages and expanding/collapsing of parallel stages gets triggered on zoom actions and drag events, enabling to load all the parallel steps without moving execution pane.

PIE-5242

The pipeline variables were being added to the runtime variables and were having their value reset. This has been fixed by filtering out the fixed pipeline variables.

PIE-5266

ZD-34311

Updated the documentation links for looping strategies.

PIE-5285

ZD-34331

Observer disabled for stepsGraph.

PIE-5292

Git management tab was not coming for FF module.This was because it was using another project level flag and in the recent template gitx parity, we had replaced all the project level flags.The issue has been resolved by using the previous flag and the tab is now visible in the FF module.

PIE-5320

Restricted visible "SELECTIVE STAGE EXECUTION" names to 3 currently rest will be shown in a popover.

PIE-5434

The error experience should never have been there in the first place. Ideally, after successful clone, the new pipeline should have been opened. This has been fixed and we show the newly cloned pipeline from now on.

PL-20197

Added Cancel button to Create Via Yaml Builder page in Connectors.

PL-22435

ZD-26366

Added a check on whether the user is part of the NG user list.

PL-27065

Code fix.

PL-27952

Changed the handling of soft-deleted vaults; they are no longer subject to renewal.

## September 15, 2022, version 76620

### New Features and Enhancements

This release introduces the following features and enhancements.

CDS-40812

Serverless Expression Change for Sidecars (CDS-40812). For information on serverless, see Serverless Tutorial.

You can select multiple artifacts for serverless. Previously, you could only select a single artifact for a sidecar.

CDS-40921

Changes were made to require the specification of a connector and namespace when creating a Kubernetes service and environment. Valid entries are now required before the configuration can be saved.

CDS-42106

Azure Connector, ACR Artifact and Microsoft Azure Infrastructure are now enabled by default. The functionality no longer requires you to enable the NG_AZURE feature flag.

CI-4692

Added support to save a pipeline by using Git clone functionality.

CI-4828

You can now use a hosted delegate for Docker, Artifactory, AWS, GCP, and Azure connectors.

CI-4980

Made changes to support connection tests via Harness Manager for cloud platforms including AWS, GCP, and Azure. By default, theexecuteOnDelegate value is set to true for existing connectors and will remain backward compatible.

DEL-4632

Added version and expiration for Immutable Delegate at Delegate and group level.

PIE-4903

Changes were made to add sort capabilities to certain table columns in Pipeline view.

PL-25545

Support was added for a Custom Secret Manager behind the feature flag CUSTOM_SECRET_MANAGER_NG. This feature enables users to onboard any secret manager with Harness and reference their secrets in Harness using APIs in a shell script.

PL-25663

Support was added for Simplified Git Experience behind the feature flag: GIT_SIMPLIFICATION.

PL-26339

We have added support for Simplified Git Experience behind the feature flag: GIT_SIMPLIFICATION.

PL-27237

Removed the feature flags CUSTOM_RESOURCEGROUP_SCOPE and INHERITED_USER_GROUP.

### Fixed issues

CDS-35685

Updated to ignore the leading slash in application manifests.

CDS-38676

ZD-30391, ZD-31418

Changes were made to ensure that instances are deleted with their environment.

CDS-38940

Fixed a problem that led to successful executions appearing with IGNOREFAILED status in Harness Manager.

CDS-39968

Added artifact_path to the response of getActiveServiceDeployments and getActiveServiceInstances API.

CDS-40114

ZD-32183

Once the delegate task completes we are explicitly pushing all logs to be captured as they were earlier being pushed in a fixed interval. We have added a small delay on our end before we close the log stream to provide enough time for the delegate to push all the relevant logs from Delegate.

CDS-40643

Support was added to accept Jenkins job parameters as run-time values and allow JobName to be set to an empty string. This resolves an issue with failures of pipelines for which no job name was specified.

CDS-40870

Updated GIT SYNC DISABLED tests to display the status messages that are returned by the pipelineSave API.

CDS-41000

Added aborted and expired counts to the pipelineExecution API. These had been included in failure counts.

CDS-41322

ZD-33057

Changes were made to ensure that templates for which references exist cannot be deleted.

CDS-41367

ZD-31794

Modified the handling of date-time information to calculate the data in UTC. Earlier there was a mismatch between the epoch value sent from BE, which pointed to the start of the day in UTC, and the date as calculated in the user time zone.

CDS-41374

Fix merged to develop. Will be available in QA post next deployment.This was happening because UI was returning null, if no services were present.

CDS-41392

Mouse-up on left side of clone pipeline popup edit box closes window and puts you in edit.

CDS-41491

Added support to specify an artifact directory as a dot (".").

CDS-41532

ZD-33249

Behavior was changed to store and validate the issueType field in YAML. The issueType field remains optional, however; older approvals that lack the field will continue to work in the same manner.

CDS-41572

Updated the observer for resizing to group node to be triggered on scale change as well, letting the nodes be collapsed on zoom actions.

CDS-41607

Made a change to allow the template step to be displayed in full width on the screen.

CDS-41650

Fixed UI issues affecting field errors including (1) the misalignment of text box and delete icon, (2) column titles, and (3) field error text.

CDS-41685

Corrected YAML snippets generated for rolling and canary builds during pipeline creation. These snippets now include the maxConcurrency field with the value set to 1.

CDS-41701

Made the customize YAML path optional.

CDS-41714

A change was made to the Terraform Apply operation to use the commitID instead of the branch when the commitID is inherited from a Terraform Plan step.

CDS-41725

Added module filter for Help panels. This makes panels that have the 'cd' module for stages visible.

CDS-41738

Changed behavior to gracefully handle the case in which an active service that is eligible for license usage calculation was recently deleted.

CDS-41742

Added support for "IN" and 'Not IN" options providing approval and rejection criteria for snow and Jira steps. This issue was fixed in development.

CDS-41785

Added conditional rendering of preview host button based on the required input field. This works in and out of run time.

CDS-41790

Corrected the full-width rendering of the steps in templates on the screen.

CDS-41819

Changed the validation process used for the PDC connector connectivity. The earlier process used the default port 22 and did not work for WinRM.

CDS-41820

Resolved a problem that occurred because there was no check for a null value.

CDS-41821

Infrastructure mapping is made unique per account, organization, and project.

CDS-41870

Fixed an issue with invalid YAML structure in the runtime flow.

CDS-41895

Coding issue, exception handling now done properly.

CDS-41907

Support has been added to restrict lengthy label text and show it on hover.

CDS-41920

Allowed skipped test with error messages to be clickable.

CDS-41963

ZD-33624, ZD-34370

Corrected an issue with a null pointer that occurred when a shell script was executed on a remote host using username and password. The issue was specific to this authentication type.

CDS-41988

Made a change to ensure the proper YAML is visible; when selecting on the Delegate, the executionTarget field should not be present.

CDS-42009

Modified looping behavior to prevent changes from the default selected Repeat strategy to any other looping strategy.

CDS-42128

ZD-33782

A change was made to remove the requirement for Orgidentifier and Projectidentifier in the API. For the Account template, the project and organization identifiers are not provided. .This change eliminates a validation error.

CDS-42133

Added handling for combined parallel and series stages for EXPORT_TF_PLAN_JSON_NG.

CDS-42175

NPE was seen in UI when looping strategy input is invalid. This is now handled on the BE side and is previewed as an error with an explanation.

CDS-42189

Added a run-time check on tooltips.

CDS-42226

Terraform Var File File Path inputs did not allow selecting the content of the input field and instead started dragging the input field upon trying to select the content. The content could be selected only by double clicking on it.The issue has been resolved and content of the input field can be selected without causing the element to start dragging upon selecting the content of the input field.

CDS-42233

This was not a genuine exception. We use this exception to decide whether to delete an entity or not. Updated it to a warning log.

CDS-42234

This was a problem with the spring-data-mongodb:2.2.7.RELEASE library being used. When creating query with multiple ‘and’ operators, it interprets the constructed as invalid.

CDS-42258

Updated the function to handle nested stepGroup data parsing recursively to render the graph.

CDS-42291

We did not support expressions for environment and infrastructure at project level. This has now been removed from org and account as well.

CDS-42338

Copy Artifact command unit assumed that artifact is copied into the same folder as the folder of the artifact from the Artifactory, keeping the folder structure from the Artifactory. This lead to error in case no such folder is created in advance on the target. Now, this is not the case any more, the file is copied into the folder specified by target directory.

CDS-42344

Changed behavior to ensure the Tags API call is made if imagePath is an expression. This means that every time the value of the expression changes, new tags are fetched based on the value in the run pipeline form.

CDS-42394

Clarified an error message received by the validateHosts method.

CDS-42410

ZD-33295

For the Capability check for docker registry connector, we use endpoint `/v2` endpoint to validate.As per the Docker documentation, /v2 is the only endpoint to validate the accessibility for Docker registry version 2.To handle the scenario we are appending /v2 to connector URL if it doesn't exist.

CDS-42420

ZD-33839, ZD-33986

Changed code to fix a null pointer exception that occurred when a pipeline was run.

CDS-42481

Logging command units request by pipeline service and response from delegate is now improved.

CDS-42634

Fixed an issue that exposed WinRM credentials in YAML.

CDS-42643

Added a check which checks for old git sync and if old gitsync is enabled git details will be shown on the pipeline list. This is completely a new change and doesn’t affect any existing flows

CI-5235

Added validation to ensure that the Bitbucket Account URL has the correct syntax when setting up a connector.

CI-5242

Fixed an issue that could result in an NPE when fetching trigger status and updating webhook registration status when processing older triggers.

CI-5258

Made a change to allow Clone Codebase Depth to accept a value of 0.

CI-5298

Fixed an issue Restore from GCS didn't work if a step was in a step group.

CI-5309

Fixed an issue where some users did not see existing Git connectors when setting up a pipeline in a hosted build infrastructure.

CI-5319

ZD-33837

Changed behavior to initiate PR triggers in the correct conditions.

CI-5322

Fixed the Overview page refresh rate to ensure that the page fully loads with each refresh.

CI-5324

Added the feature flag CI_TI_DASHBOARDS_ENABLED back after it was deleted previously.

PIE-4727

The resource constraint endpoint returns an empty response when the pipeline service throws an exception. Now the case is handled and the response is returned as expected.

PIE-4757

Fixed issue with Help panel width for git connectors.

PIE-4827

ZD-33190

Fixed eventing for BitBucket push webhooks.

PIE-4829

Loading indicator is not shown when filters are applied. This is fixed.

PIE-4855

Changed a label from "Save as Input Set" to "Save as New Input Set" to indicate the correct behavior.

PIE-4880

Corrected a problem that affected the function of the discard button.

PIE-4905

Corrected a problem that caused some Pipeline values to be discarded on error.

PIE-5008

Corrected a problem that caused the `Add Stage/Step` button to be hidden for read-only permissions.

PIE-5019

Multiple error toasts occurred when there was network failure because the error toast condition was at the component level, hence getting re-rendered every time. Moved it to an useEffect instead

PIE-5108

Corrected a layout problem that caused the Edit YAML button to overlap with the Invalid tag when viewing pipeline YAML.

PL-26169 Issue was with common component which displays name, desc,tags used across many places in UI, this component was getting the edited data when pressed back button, to correct this did a code fix to supply the newly edited data when a back button is pressed.

PL-26288 Changed the behavior used to assign account admin to a project to implicitly assign view permissions based on the scope when a resource group selects any resource inside that scope.

PL-26457, ZD-32444 Support was added to allow Scim group names to contain the hyphen ("-." ) character.

PL-27086 Fixed a typographical error in the labeling of the ABAC for Environment resource type. The label was corrected from "Non-Production" to "Pre-Production".

PL-27363 Fixed the formatting used to display an error message.

PL-27383 Fixed vault connector creation in the presence of namespaces.

PL-27395 Fixed the mongo update method call used to create lastUpdatedTemplate.

## September 6, 2022

### What's New

You can now install and maintain Continuous Delivery, Continuous Integration and Security Testing Orchestration using Helm package manager in a self-managed environment.

For more information, see Install Self-Managed Enterprise Edition Using Helm.

## August 31, 2022, minor release 76324

Delegate version 76324

### New Features and Enhancements

This release introduces the following features and enhancements.

CCM-7649 Harness API now includes a REST method you can use to list the BI dashboards specific to CCM.

CDS-39449 A feature was added for deployments of type ServerlessAwsLambda to allow the addition of Amazon S3 as a primary artifact or a sidecar. You can also add both as Amazon S3 artifacts. (CDS-39449)

CDS-40651 Entry of the Kustomize YAML Folder path that is used to fetch the Kustomize manifest has been simplified. Enable the NG_OPTIMIZE_FETCH_FILES_KUSTOMIZE feature flag to reveal a checkbox (Optimized Kustomize Manifest Collection) in the Advanced section of Manifest details. Select the checkbox to render the input required for the Kustomize YAML Folder path.

CDS-41025 There were changes to the YAML specified in the Kustomize application manifest for the Harness file store. These include the following:

The base path must be configured inside the store element, as follows:

Example store

```
    store:
    type: Harness
    spec:
      files:
          -account:/kustomize
```

The relative Kustomization YAML path must be configured as part of the spec:

Example spec

```
spec:
    overlayConfiguration:
        kustomizeYamlFolderPath: multipleEnv/environments/production
```

PL-21667 Accounts list with greater speed during transitions from one to another.

### Fixed issues

- The RDS inventory dashboards did not reflect the updated DBInstanceClass when RDS instance class was updated. The RDS Inventory dashboard now displays the updated instance-class as expected. A data discrepancy that occurred because of an error in the join condition of the looker query was fixed. (CCM-8484, ZD-33142)

- The Perspective Preview section was changed to ensure that the correct table is queried. A check was added, on whether it's a cluster perspective, before the query is issued. (CCM-8484)

- Code was changed to add a check for a null value when converting conditions values to filter values. This resolves an issue in which 'label.key IN {""]' -> Empty Array is set to null. (CCM-8558)

- The Select Manifest modal now has the same width when moving from Select a Manifest Reference to Configure Manifest Runtime Inputs. (CDS-37913)

- Fixed the start and end time for Approval steps. (CDS-38899)

- Added scope information to allow for the comparison of the YAML in an updated template. (CDS-38936)

- Fixed step iteration logic for update/save step based on `Steps/RollbackSteps` state allowing same identifiers. (CDS-39753)

- Infrastructure was not getting updated on change of environment. This was because the environment value was not discarded and dependencies were not updated. (CDS-39946)

- Added validation to run-time input when executing a pipeline. (CDS-40040)

- Earlier different versions of template were allowed to be on different template types and child types. For example, t1, v1 template could be a stage template while t1, v2 could be a step template. This scenario should no longer occur. (CDS-40077)

- Corrected the deployment type for the Apply step values.yaml file. (CDS-40140)

- Fixed the incorrect specification of a variable name. Changed the type for "Canary Deployment." (CDS-40177)

- Infrastructure as runtime was not being honored when the environment was runtime (CDS-401188)

- Fixed a path error that affected the workload field in the Scale step. (CDS-40198)

- Improved the user experience for long cluster names. (CDS-40393)

- Resolved a problem with missing environment group access permissions. There was an RBAC issue that did not allow users to execute a pipeline with environment groups. (CDS-40440)

- Modified error messages to provide better information in cases where an artifact cannot be selected in the trigger creation screen. (CDS-40499)

- Removed an old condition in the code for `Execution` tab check because this is being checked by !serviceDefinition check and no longer prevents pipeline templates strategies. (CDS-40559)

- The default deployment type for Azure Web Apps has been set to canary. (CDS-40560)

- Set the pipeline executionId to be the same as the ID of previous instances instead of being set to AUTO_SCALED. (CDS-40562)

- Corrected an issue to ensure counting approval rejected pipeline execution as failed. (CDS-40563)

- Added a delay on API response. (CDS-40858)

- The infrastructure tab now shows the correct Help panel and provides information. (CDS-40879)

- You can now save WinRm Credentials without adding a port; it saves to default NTLM, Kerberos port. (CDS-40955)

- Additional Safety checks added if someone still reaches on the triggers page in service v2 . (CDS-41133)

- Fixed stage selection pop-up for pipeline templates. (CDS-41193)

- When stages are in parallel, and imagePath is an expression, tags were not coming up. This issue is fixed. (CDS-41612)

- Added a minor text change on the get started with CIE page. (CI-4748)

- On NG task failures, if descriptions are available for the errors that are generated, the appropriate description is displayed instead of a generic message. It's usually set when there are no eligible delegates to execute task. (DEL-3933)

- INSTALL_CLIENT_TOOLS_IN_BACKGROUND environment variable was preventing from client tools to be detected when their download is disabled. This is now fixed. (DEL-4246)

- Fixed an issue with the upgrader not running because of missing permissions. Also corrected an issue that caused the upgrader to fetch latest mutable delegate version when ran, this latest mutable version replaced immutable delegate running installed using Helm. No changes should be required on the user side since the Helm Delegate was not yet released. (DEL-4472)

- Any Feature Flag saved within a pipeline step should now be selected and available in the list of available flags, including if the flag is not located in the first 15 flags retrieved from the server. (FFM-3716)

- Fixed a line-break issue. Long nonbreaking strings will now break onto a new line instead of overflowing in the flag variation value. (FFM-4010)

- Fixed an issue that caused the display of a no-environment tool tip. (FFM-4094)

- The user should no longer be able to name and/or describe a ff stage when creating a template. This should only happen when they create a pipeline stage using the template. (FFM-4098)

- The timeout field did not fill with a default value when it is left empty when a fixed value is not set during design time. (PIE-3687)

- Updated tabs retention condition based on user selected tab information stored in query params (PIE-3977)

- Padding of the listed sections was nested one level under the root which should not have been the case. The padding has now been updated. (PIE-4588)

- Environment templates did not read the right values in the run pipeline form / input set views. (PIE-4596)

- Fixed issue with Gitlab connectors not being able to be used within the yaml as they had a casing issue. Gitlab changed to GitLab. (PIE-4618, ZD-32734)

\*Unsaved changes warning will not appear after this change. Save button will not be enabled if no changes are made to ShellScript step fields. (PIE-4623)

- Formik values is wrapped with pipeline key for Tags api call. (PIE-4631)

- Removed the even propagation stop and updated the dimensions function (PIE-4644)

- Fixed polling on execution of the list view. (PIE-4751)

- Fixed a typographic error. Changed the first letter of the error message to be capitalized. (PL-21354)

- Layout component was implemented incorrectly. Fixed by updating the height calculation.Now the pages will take their min-height from the larger of two values: the height of the nav and the height of the screen. (PL-24388)

- Added error handling with more verbose statements when any CRUD operation fails in AWS secret manager. (PL-24942)

- Bug was arising since the latest status was not being considered by the component and showing default red status (PL-25666)

- Sometimes user was redirected back to login page after a successful login. This used to happen when the user got logged out due to an expired token.This issue is fixed now, and login should work in one go, no matter how you got logged out. (PL-26302)

- The additional field "K8s Auth endpoint" was coming in all types of vault and this issue is resolved in this ticket .The problem was we added this field and set the default value as a constant. When we were mapping the Vault object to DTO, we missed an if condition to specify that this field should appear only in case of k8s auth.This issue has been resolved. Now we will not see this field in other auth methods of vault. (PL-26600, ZD-32625)

- TooltipProp which is present is removed and a new HarnessDocTooltip is passed which makes the Alignment proper. And also the information icon is aligned centre. (PL-26644)

- The Input set error experience did not show the error response that we received from the BE. We were not sending error prop to the error page. Simply passing that prop resolved the issue. (PL-26686)

- Repo details is showing in background ,when run pipeline using inputset selection (PL-26706)

- We were not sending the namespace as header when we are trying to login using the k8s Auth. Added this field in as a header when calling vault. (PL-26919, ZD-32763)

- Corrected code to ensure that a green container registry connector remained green when selected in the pipeline. (PL-26951)

- Fixed Vault connector creation at the organization level when no account level delegate are present. (PL-27140, ZD-32981)

- For existing Vault Sm's, the field useK8sAuth will not be present. Issue occurred here when we are using this field directly rather than using a getter function to handle that null check. Modified the use case and used the getter function there. Also added a UT to handle this case when this field is having null. (PL-27259)

- The sequence in which services are deleted when project is deleted was incorrect.Now while deleting the project we can see both Monitored service and SLO audits. (SRM-11140)

- The request body for custom log source was not getting serialised properly due to the treatment of numbers in Gson library which we use. By upgrading the version of the library, we now have support to customise this behaviour. Now we have defined how a number will be deserialised. This issue is now resolved. (SRM-11217)
