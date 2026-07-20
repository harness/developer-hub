## June 2026

### GitOps Service 1.61.0, GitOps Agent 0.121.0

#### New features and enhancements

- You can now roll back a GitOps application to a previous deployment directly from the Harness UI. A new **History & Rollback** tab on the application details page shows the deployment history and lets you select a version to roll back to. Rollback is also available as a pipeline step. (**CDS-124453**, **CDS-124458**)

- GitOps now supports Applications in Any Namespace. When you configure a cluster-scoped agent, you can specify `applicationNamespaces` to allow ArgoCD Application resources to be created in namespaces other than the agent's install namespace. Namespace-scoped agents are not supported for this feature. (**CDS-125046**, **CDS-125047**, **CDS-125053**, **CDS-125054**)

- You can now force-delete a GitOps application from Harness when the underlying ArgoCD application is unreachable, for example when the agent or ArgoCD project has been deleted. The **Delete from Harness** option removes the application record without requiring connectivity to the agent. (**CDS-125317**)

- GitOps now enforces finer-grained RBAC for application resource actions. A new permission separates access to application-level operations (create, edit, delete) from Kubernetes resource actions (sync, restart, delete pod). The ArgoCD RBAC engine in the agent can also be enabled via a feature flag for users who want ArgoCD project-level RBAC enforcement. (**CDS-124556**, **CDS-124557**)

- The GitOps agent now supports the Zero Trust Service (ZTS) for agent-to-SaaS communication, sending task parameters through the ZTS validation flow for enhanced security. (**CDS-126136**)

#### Fixed issues

- Fixed an issue where newly deployed GitOps applications never received utilization snapshots when the cluster state remained stable, causing them to be excluded from license counting and the Subscriptions usage view. (**CDS-123210**)
- Fixed an issue where the redeploy button on the GitOps application UI page attempted to redeploy to the HEAD of the branch instead of the commit used for the original deployment. Also fixed an inconsistency where multi-source applications sometimes displayed a single source in the sync dialog. (**CDS-126340**)

### GitOps Service 1.60.0, GitOps Agent 0.120.0

#### New features and enhancements

- The GitOps agent now bundles ArgoCD 3.3.10. (**CDS-125193**)

### GitOps Service 1.59.0, GitOps Agent 0.119.0

#### New features and enhancements

- You can now select repository templates from different scopes (account, organization, or project) when you configure GitOps repositories. (**CDS-123545**)

- The resource status in the application resource tree detail view now updates in real time when you open a resource. You see the current health status without a page reload. (**CDS-116119**)

#### Fixed issues

- Fixed an issue where the recently created count on the GitOps overview page displayed a significantly inflated number. The count now accurately reflects the number of recently created applications. (**CDS-121154**)
- Fixed an issue where pod logs did not appear in the GitOps UI for resources in an unhealthy state, and log downloads returned empty content. (**CDS-115348**)

## May 2026

### GitOps Service 1.58.0, GitOps Agent 0.118.0

#### New features and enhancements
- The GitOps agent now bundles ArgoCD 3.3.9. (**CDS-123262**)

#### Fixed issues
- Fixed an issue where the GitOps agent WebSocket dialer did not respect the `HTTPS_PROXY` environment variable, causing pod log streaming to fail in environments with an outbound proxy configured. Log streaming now correctly routes through proxy settings. (**CDS-123202**)
- Fixed a panic in the GitOps agent that occurred during ApplicationSet validation and generation when the repository credentials database interface was not fully implemented. (**CDS-123150**)
- Fixed an issue where GitOps applications were not visible in the application list for users with label-scoped resource groups. The application list now correctly filters results based on label-based RBAC permissions, so users can see the applications they have access to. (**CDS-122075**)

### GitOps Service 1.57.0, GitOps Agent 0.117.0

#### New features and enhancements

- GitOps licensing now uses service-based licensing when GitOps applications are linked to Harness services, instead of application-based licensing. (**CDS-122212**)

#### Fixed issues

- Fixed an issue where integer fields in GitOps ApplicationSet definitions were converted to strings during editing and validation, causing validation errors on the ApplicationSet details page. (**CDS-121781**, **ZD-101656**, **ZD-109107**)
- Fixed an issue where the GitOps applications list unexpectedly toggled between list and tile view when applying filters. (**CDS-122964**, **ZD-112484**)
- Fixed an issue where deleting a GitOps agent did not automatically remove the cluster-to-environment links for clusters belonging to that agent. Clusters are now automatically unlinked from environments when their agent is deleted. (**CDS-119831**)
- Fixed an issue where duplicate ArgoCD project mappings could be created when multiple Harness projects used the same account-level or org-level GitOps agent. The system now validates that an ArgoCD project name is not already mapped to a different Harness project before creating a new mapping. (**CDS-121055**)
- Fixed an issue where GitOps application repository linking became permanently broken after an application was deleted and recreated, preventing re-linking even after correcting the repository URL. (**CDS-122270**)
- Fixed an issue where repositories with empty or whitespace-only `repoUrl` values were ingested into the system, causing problems with multi-source GitOps applications. A validation check in `ReconcileRepositories` now skips repositories with empty `repoUrl` and logs a warning. (**CDS-120193**)
- Fixed an issue where the GitOps application manifest view displayed truncated YAML on page refresh. The full manifest appeared only intermittently, while most refreshes showed incomplete YAML content. (**CDS-122688**)

### GitOps Service 1.56.1, GitOps Agent 0.116.1

#### Fixed issues

- Fixed an issue where repositories with empty or whitespace-only `repoUrl` values were ingested into the system, causing problems with multi-source GitOps applications. A validation check in `ReconcileRepositories` now skips repositories with empty `repoUrl` and logs a warning. (**CDS-120193**)
- Fixed an issue where a GitOps application repository connector binding was lost, causing authentication failures and preventing users from selecting repositories in the UI. (**CDS-121077**, **ZD-110634**)
- Fixed an issue where the App Details page displayed a `Failed loading charts` error for GitOps applications using OCI Helm repositories. The UI attempted to fetch `index.yaml` via HTTP, which OCI registries do not serve. The chart loading logic now correctly identifies OCI repositories using `helm.IsHelmOciRepo` and skips the index fetch. (**CDS-122214**, **ZD-111562**)
- Fixed an issue where authenticating a GitOps cluster via IRSA in the Harness UI failed when Certificate Authority Data was not provided. The UI payload did not include `"insecure": true`, causing the connection to fail. The payload now correctly sets `"insecure": true` when no CA data is provided. (**CDS-122266**, **ZD-111657**)

## April 2026

### GitOps Service 1.55.7, GitOps Agent 0.115.0

#### New features and enhancements

- ApplicationSet TemplatePatch is now supported in the Manifest Edit panel. Previously, TemplatePatch configuration disappeared from the UI after being set. (**CDS-120408**)

#### Fixed issues

- Fixed an issue where multi-source GitOps applications had incorrect repository identifier mapping. The reconciler filtered out empty strings when generating the repository list, causing the source-to-repository mapping to shift and link sources to the wrong metadata. A separate logic error allowed both single-source and multi-source identifier fields to be populated at the same time. The reconciler now preserves positional alignment by keeping empty placeholders and uses strict conditional logic so only the relevant identifier field is updated. (**CDS-120193**)
- Fixed an issue where the App Details page displayed a `Failed loading charts` error for GitOps applications using OCI Helm repositories. The UI attempted to fetch `index.yaml` via HTTP, which OCI registries do not serve. The chart loading logic now correctly identifies OCI repositories and skips the index fetch. (**CDS-122214**, **ZD-111562**)
- Fixed an issue where events in the application Events panel were listed oldest-first instead of newest-first, and the heading section scrolled out of view. Events are now sorted newest-first, and the tab header remains fixed while scrolling. (**CDS-113750**)
- Fixed an issue where a JSONNET object was intermittently added during GitOps application creation, causing manifest errors. (**CDS-115693**)
- Fixed an issue where the OutOfSync resource filter in the UI incorrectly mapped to SyncFailed, preventing OutOfSync resources from appearing in filtered results. (**CDS-121310**)

### GitOps Service 1.54.3, GitOps Agent 0.114.2

#### Fixed issues

- Fixed an issue where editing an ApplicationSet's Git generator or template in the UI caused the progressive sync configuration (`spec.strategy`) to be set to `null`, effectively removing it from the manifest. Users could set progressive sync settings on initial creation, but any subsequent edit through the UI would silently strip them. The ApplicationSet editor now preserves progressive sync configuration when editing other fields. (**CDS-119828**, **ZD-109107**)
- Fixed an infinite loop during Helm deployments when using SOPS with curated ArgoCD images (for example, `harness/argocd:x.x.x-ubi9-curated`). The Helm wrapper mount corrupted the real Helm binary due to a hard link at `/usr/local/sbin/helm`. Users on curated images using SOPS who are upgrading must apply manual migration steps to their `argocd-repo-server` deployment — refer to the [SOPS documentation](https://github.com/getsops/sops) for details. Users not using SOPS or on standard ArgoCD images are unaffected and require no action. (**CDS-120154**)
- Fixed a panic in the GitOps Agent that caused it to crash when a WebSocket connection was closed. This could lead to intermittent agent restarts and deployment stalls in environments with many concurrent connections or unstable network conditions. (**CDS-120157**, **ZD-109767**)
- Fixed an issue where a panic-induced GitOps Agent restart during an application sync caused the sync status to remain stuck in `Progressing` indefinitely, even after all resources had synced successfully. This caused the GitOps Sync pipeline step to time out and fail. (**CDS-119949**, **ZD-109423**)

## March 2026

### GitOps Service 1.53.2, GitOps Agent 0.112.0

#### Fixed issues

- Fixed an issue where the Helm wrapper mount in the GitOps Agent corrupted the Helm binary on curated/STIG ArgoCD images (for example, `harness/argocd:x.x.x-ubi9-curated`) due to a hard link at `/usr/local/sbin/helm`, causing an infinite loop during Helm deployments when using SOPS. Users on curated images using SOPS who are upgrading must apply manual migration steps to their `argocd-repo-server` deployment — refer to the SOPS documentation for details. Users not using SOPS or on standard ArgoCD images are unaffected and require no action. (**CDS-120154**)
- Fixed an issue where AI-powered GitOps operations (AIDA/MCP) failed with permission errors. The GenAI service token was forwarded directly to the access control service, which could not validate it. Permission checks now use principal-based authorization, consistent with other Harness services. (**CDS-119578**)
- Fixed a UI issue where GitOps cluster creation with TLS authentication did not validate the **Client Key** and **Client Certificate** input fields. Users could submit the form with blank values without receiving error messages. Additionally, the `insecure` flag was not included in the API payload, and the base64 encoding guidance for certificate fields was inconsistent. (**CDS-119558**)
- Fixed an issue with incorrect redirection when accessing GitOps project mapping pages. (**CDS-119150**)
- Fixed an issue where loading an account-scope repository triggered an incorrect `appprojectmapping` API request. (**CDS-118739**)
- Fixed a UI issue where switching the source type of a GitOps application from Git to Helm did not behave correctly. (**CDS-116805**)

### GitOps Service 1.52.1, GitOps Agent 0.111.1

#### New features and enhancements

- Harness AI now supports GitOps entities and pipeline stages. When creating or troubleshooting GitOps Applications or ApplicationSets, it can diagnose common setup errors and suggest remediations — including manifest syntax errors, incorrect service or environment types, missing GitOps clusters on linked environments, incomplete Application or ApplicationSet manifests, and connectivity issues with Git or infrastructure connectors. (**CDS-115902**)

#### Fixed issues

- Fixed an issue where Harness secret expressions resolved inside non-secret Kubernetes manifests (such as ConfigMaps) exposed secret values in plain text. When an environment or service variable was typed as a Secret and referenced via a Harness expression in a Helm values file, the resolved secret content appeared unmasked in the rendered manifest during GitOps app sync. Secret values are now masked in non-secret manifest types. (**CDS-119065**)
- Fixed an issue where GitOps links in **Project Settings** returned a 404 error when accessed from **Admin Settings**. (**CDS-118353**)
- Fixed an issue where the GitOps Rollout step failed to fetch rollout status when an Argo Rollout had more than two active ReplicaSets. (**CDS-118750**, **ZD-104383**)
- Fixed an issue where the Argo CD application project was linked to a different organization than the one selected in the UI. (**CDS-118859**, **ZD-104476**)
- Fixed an issue where the GitOps Rollout step failed with an unmarshalling error when processing Argo Rollouts that use custom traffic routing plugins. (**CDS-118893**, **ZD-104434**)
- Fixed an issue where auto-created GitOps services defaulted to a GitHub connector regardless of the actual Git provider. GitOps auto-created services now detect and assign the correct Git provider type from the repository URL, ensuring proper connector selection in the Harness UI. Additionally, source repository details were incorrectly populated in the **Deployment Repo** fields instead of the **Release Repo** field; they are now correctly populated in the **Release Repo** field. (**CDS-119249**, **ZD-105458**)
- Fixed an issue where Harness Support Group users authenticated via OKTA SSO received 403 Permission Denied errors when accessing GitOps resources. Support user tokens are now properly forwarded to the Access Control Service for elevated-access detection. (**CDS-116751**)

## February 2026

### GitOps Service 1.51.2, GitOps Agent 0.110.0

#### Breaking changes and upgrade considerations

This release includes an Argo CD version bump with the following breaking changes. Review these carefully before upgrading:

- **ApplicationSet CRD size limitation:** The ApplicationSet CRD layout now exceeds the Kubernetes client-side apply size limit. You must perform upgrades using Server-Side Apply (SSA) (for example, `kubectl apply --server-side --force-conflicts`) or via a self-managed Argo CD Application with `ServerSideApply=true`. Custom field modifications in manifests may be overwritten when using SSA.

- **Hydrator behavior change:** The source hydrator now tracks hydrated state using git notes rather than hydrated commits, improving repository cleanliness and reducing unnecessary commits.

- **Settings API change:** Anonymous calls to the Settings API return fewer fields (for example, sensitive data like `resourceOverrides` is hidden).

- **New environment variable:** `ARGOCD_K8S_SERVER_SIDE_TIMEOUT` has been introduced to control Kubernetes server-side API request timeouts separately from TCP timeouts.

- **Deprecated flags:** The `--self-heal-backoff-cooldown-seconds` flag in the application controller has been deprecated and will be removed in a future release.

<details>
<summary>Upgrade instructions</summary>

Follow the official upgrade guide when applying this version bump.

For non-HA environments:

```bash
kubectl apply -n argocd --server-side --force-conflicts \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.0/manifests/install.yaml
```

For HA environments:

```bash
kubectl apply -n argocd --server-side --force-conflicts \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.0/manifests/ha/install.yaml
```

If you have an Argo CD Application that manages Argo CD itself, ensure it includes Server-Side Apply in the sync options:

```yaml
syncPolicy:
  syncOptions:
  - ServerSideApply=true
```

For the full upgrade guide, go to [Upgrading from v3.2 to v3.3](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/3.2-3.3/).

</details>

#### Fixed Issues

- Fixed an issue where deleting an ApplicationSet from the resource tree context menu incorrectly called the delete application API instead of the delete ApplicationSet API, causing the deletion to fail. (**CDS-115910**)
- Fixed an issue where ApplicationSets could not be deleted if the associated agent no longer existed, returning a "Permission denied: agent identifier incorrect or agent does not exist" error. Cleanup of ApplicationSets now works correctly when deleting account-level agents. (**CDS-118171**)

### GitOps Service 1.50.3, GitOps Agent 0.109.0

#### New Features and Enhancements

- GitOps service now integrates with Open Policy Agent (OPA) for applications, enabling policy-based governance and validation for GitOps applications. (**CDS-117468**)

#### Fixed Issues

- Fixed an issue in the GitOps UI where ApplicationSet validation was not functioning correctly. Users can no longer create ApplicationSets with invalid YAML configurations, preventing deployment errors. (**CDS-117861**, **ZD-101656**)
- Fixed an issue in the GitOps AppSet details view where the manifest status and progressive sync strategy data were not displayed. Users can now view the correct status and progressive sync strategy information for their AppSets. (**CDS-117172**)

### GitOps Service 1.49.1, GitOps Agent 0.108.0

#### Fixed issues
- Improved user experience for GitOps applications updated through ApplicationSets. Setup usage events are now sent when applications are updated through ApplicationSets, providing better tracking and visibility into application lifecycle events. (**CDS-117821**, **ZD-101609**)
- Fixed an issue where Harness Support Group users authenticated via OKTA SSO received 403 Permission Denied errors when accessing GitOps resources. The fix ensures support user tokens are properly forwarded to the Access Control Service for elevated access detection. (**CDS-116751**)
- The resource view now sorts by date by default, providing a more intuitive view of resources with the most recent items appearing first. (**CDS-117862**)

## January 2026

### GitOps Service 1.48.5, GitOps Agent 0.107.2

#### New Features and Enhancements

- GitOps services with multiple environments now execute in separate stages per service and environment combination, matching the behavior of CD multi-environment execution. This prevents variable clashes between services and environments when using overrides, eliminating unexpected behavior that could occur when aggregating cluster details from each environment in a single stage. (**CDS-114264**, **ZD-91288**)

- The GitOps sync step now supports server-side apply, which helps prevent errors when dealing with large manifests. The step also respects ignore-diff configurations, providing more control over how resources are synchronized. (**CDS-117361**)

### GitOps Service 1.47.3, GitOps Agent 0.106.0

#### New Features and Enhancements

- **ArgoCD Upgraded to 3.1.8**  
  Harness GitOps has upgraded to ArgoCD 3.1.8 (from 2.x), bringing significant security improvements, enhanced functionality, and updated tooling. This major version upgrade includes:
  
  **Security Enhancements:**
  - **Symlink Protection:** The API server's `--staticassets` directory is now protected against out-of-bounds symlinks to prevent symlink attacks
  - **Sanitized Project API Response:** Project API responses have been sanitized to remove sensitive information (addresses GHSA-786q-9hcg-v9ff)
  - **Enhanced OpenID Connect Flow:** The authorization code flow with PKCE is now handled server-side instead of in the UI, improving security and consistency
  
  **Tool Updates:**
  - **Helm:** Upgraded to version 3.18.4 (from previous version)
  - **Kustomize:** Upgraded to version 5.7.0 (from previous version)
  
  **API Changes:**
  - The `/api/v1/applications/{name}/resource/actions` endpoint is deprecated in favor of `/api/v1/applications/{name}/resource/actions/v2`. Users should migrate to the new v2 endpoint
  
  For complete details on the ArgoCD upgrade, refer to the official ArgoCD upgrade documentation:
  - [Upgrading from v2.14 to v3.0](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/2.14-3.0/)
  - [Upgrading from v3.0 to v3.1](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/3.0-3.1/)

- **ArgoCD Helm Chart Upgraded to 9.0.0**  
  The GitOps Helm chart has been upgraded from version 7.x to 9.0.0 to align with the ArgoCD 3.1.8 release. This update incorporates necessary configuration changes and improvements for the new ArgoCD version. For detailed information on the Helm chart changes, see the [argo-cd Helm chart release notes](https://github.com/argoproj/argo-helm/releases). 

For more information about this major ArgoCD upgrade, including breaking changes and compatibility considerations, see [ArgoCD 3.1.8 upgrade](/docs/continuous-delivery/gitops/gitops-entities/agents/argocd-3-upgrade).

#### Fixed issues

- Fixed an issue where application parameters were not appearing in the GitOps UI for organization-level agents. This occurred because the system was incorrectly prefixing *org.* to the agent ID when fetching agent details, resulting in a 404 error and preventing subsequent API calls from completing. The parameters existed in the manifest and sync operations worked correctly, but the UI failed to render them. The agent ID handling has been corrected to work properly for organization-level scopes. (**CDS-117296, ZD-99840**)

#### Fixed issues

- Fixed an issue where the Update Release Repo step was incorrectly wrapping all YAML values, including command fields, in double quotes, causing deployments to break. The step now preserves existing values without modifying them. (**CDS-114900**)
- Fixed an issue where the Fetch Linked Apps step, when filtering by service environment and cluster, did not provide sufficient logging to explain why applications were filtered out. Now, the logs include details when applications are filtered out due to agent identifier mismatches between the linked service and the application, providing better visibility into the filtering process. (**CDS-117383**)
- Fixed an issue in GitOps project settings where users were incorrectly redirected when attempting to access GnuPG keys and repository certificates. Users are now directed to the correct locations for managing these settings. (**CDS-117513**)
- Fixed an issue where pagination controls were not visible in the Applications list view, making it difficult to navigate through large numbers of applications. Users can now properly navigate through all applications using the pagination controls. (**CDS-117553**)

### GitOps Service 1.46.2, GitOps Agent 0.105.0

#### Fixed Issues

- Fixed an issue where the GitOps UI incorrectly displayed deployment activities as *Running* even after they had completed. This occurred in multi-source applications with multiple revisions, where the sync history was showing incorrect status. The UI now accurately reflects the completed state of deployments. (**CDS-115737, ZD-96501**)
- Fixed an issue where users were unable to delete a GitOps agent from the UI. This occurred when the agent had tags configured, causing the delete operation to fail due to a tags field decoding error. The agent would remain stuck in a *deleting* state. Agents with tags can now be deleted successfully. (**CDS-116263, ZD-97644**)
- Fixed the following security vulnerabilities in GitOps components:
  - Fixed a high-severity vulnerability in the gitops-agent-installer-helper component. The vulnerability **CVE-2025-22874** in the crypto/x509 package (Go 1.24.2) has been resolved by upgrading to Go 1.24.4. This fix is included in gitops-agent-installer-helper v0.0.7.
  - Fixed multiple high-severity vulnerabilities in the Redis component. The vulnerabilities **CVE-2022-30632** (path/filepath), **CVE-2023-29403** (runtime), and **CVE-2022-30630** (io/fs) affecting Go 1.18.2 in Redis images 7.4.1-alpine and 6.2.14-alpine have been resolved. Harness has rebuilt a custom Redis image harness/redis:7.4.7-alpine with the latest fixes.
  - Fixed a high-severity vulnerability in the gitops-service component. The vulnerability **CVE-2024-25621** in containerd v1.7.28 has been resolved by upgrading to containerd v1.7.29. This fix is included in gitops-service-signed:1.45.2.
  - Fixed critical and high-severity vulnerabilities in the harness/argocd component. The vulnerabilities **CVE-2024-24790** (critical, net/netip) and **CVE-2024-45338** (high, golang.org/x/net/html) have been addressed in argocd v2.14.16. 
  - Fixed multiple high-severity vulnerabilities in the gitops-agent component. The vulnerabilities **CVE-2025-59531**, **CVE-2025-59537**, and **CVE-2025-59538** affecting github.com/argoproj/argo-cd/v2 have been addressed in gitops-agent v0.102.0 with argo-cd v2.14.16.
