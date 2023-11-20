### Access control

Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. To do this, a Harness account administrator assigns resource-related permissions to members of user groups.

- [Role-based access control (RBAC) in Harness](/docs/platform/role-based-access-control/rbac-in-harness)

### Secrets management

import Secretmgmtsup from '/docs/get-started/shared/secret-management-supported.md'

<Secretmgmtsup />

### Delegates

import Delimagetypes from '/docs/platform/shared/delegate-image-types-intro-table.md'

<Delimagetypes />

- [Deploy delegate on Kubernetes](/docs/platform/Delegates/install-delegates/overview)

- [Deploy delegate on Docker](/docs/platform/Delegates/install-delegates/overview)

- Install delegate minimal image without SDKs

- [Install delegate maximal image without certified SDKs](/docs/get-started/supported-platforms-and-technologies/#sdks-installed-with-harness-delegate)

### AuthN

import Authsup from '/docs/get-started/shared/auth-supported.md'

<Authsup />

### Notifications

- [Slack](/docs/platform/notifications/send-notifications-using-slack/)
- [Email](/docs/platform/notifications/add-smtp-configuration)
- [Microsoft Teams](/docs/platform/notifications/send-notifications-to-microsoft-teams).
- [PagerDuty](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events)
- [Webhook](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events)


### Git experience

import Gitxsup from '/docs/get-started/shared/gitx-whats-supported.md'

<Gitxsup />

### Accounts, orgs, projects

The following table lists the resources that are available at various scopes in Harness:

| **Resources** | **Account** | **Org** | **Project** |
| --- | --- | --- | --- |
| **Pipeline** | No | No | Yes |
| **Services** | Yes | Yes | Yes |
| **Environments** | Yes | Yes | Yes |
| **Git Management** | No | No | Yes |
| **Connectors** | Yes | Yes | Yes |
| **Secrets** | Yes | Yes | Yes |
| **SMTP Configuration** | Yes | No | No |
| **Templates** | Yes | Yes | Yes |
| **Audit Trail** | Yes | Yes | Yes |
| **Delegates** | Yes | Yes | Yes |
| **Governance** | Yes | Yes | Yes |