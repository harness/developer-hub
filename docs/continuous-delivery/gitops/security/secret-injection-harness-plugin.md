---
title: Secret injection in GitOps applications
description: Use Harness secrets and expressions directly in Argo CD manifests via the Config Management Plugin. No Delegate required.
sidebar_position: 6
keywords:
  - gitops
  - secrets
  - vault
  - secret injection
tags:
  - GitOps
  - Security
---

The Harness Argo CD Config Management Plugin resolves secret expressions in your manifests during Argo CD's rendering phase, before anything is applied to the cluster. No Harness Delegate required.

## What you will learn from this topic

- How the plugin [intercepts and resolves](#manifest-rendering-with-the-config-management-plugin) secret expressions during manifest rendering
- How to [set up and use](#configure-harness-secrets-in-gitops) secret injection in three steps
- What [secret sources](#supported-secret-sources) are supported (Harness, Vault, external managers)
- What the [security model](#security-model) is and how to harden your setup
- What [limitations](#limitations) exist with the plugin
- How to [troubleshoot](#troubleshooting) common secret resolution issues

:::info Expressions and tool detection
This topic covers secrets and security. For Helm and Kustomize detection, non-secret expression types, and the `HELM_ARGS` warning, go to <a href="/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications" target="_blank" rel="noopener noreferrer">Harness expressions in GitOps manifests</a>.
:::

---

## Before you begin

Before using secret injection, ensure you have:

- **GitOps Agent**: Agent with the plugin enabled. Go to <a href="/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications#configure-the-harness-argo-cd-plugin" target="_blank" rel="noopener noreferrer">Harness expressions in GitOps manifests</a> for installation steps.
- **Secrets configured**: Secrets in Harness Secret Manager, Vault, or another integrated secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank" rel="noopener noreferrer">Harness Secret Manager</a> to create secrets.
- **Kubernetes manifests**: A Git repository containing Kubernetes manifests where you want to inject secrets.

---

## Manifest rendering with the Config Management Plugin

Argo CD normally controls manifest rendering end-to-end. The Config Management Plugin (CMP) intercepts that phase and hands it to Harness, which:

1. Scans manifests for `<+secrets.getValue("ref")>` expressions
2. Resolves secret references against Harness Secret Manager (or Vault/external managers)
3. Injects actual values into the manifest
4. Returns the rendered manifest to Argo CD for deployment

Because resolution happens at render time, you do not need to manually sync after adding expressions; Argo CD re-renders on the next sync and the values are there.

### Delegate Requirements

The GitOps agent handles secret resolution directly via the CMP sidecar. This makes it viable for pure GitOps setups where you want only the Argo CD stack, without running a Delegate alongside it.

---

## Configure Harness secrets in GitOps

**Prerequisites:** Plugin enabled on your agent (see [setup guide](/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications#enable-the-plugin-on-an-existing-agent-or-byoa)) · Secret exists in Harness.

**Step 1.** Create a secret in Harness

Go to your project → **Secrets** → **New Secret** → Text secret. Note the identifier (e.g., `prodDbPassword`).

**Step 2.** Reference it in a `kind: Secret` manifest

```yaml title="secret.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: default
type: Opaque
stringData:
  db-password: <+secrets.getValue("prodDbPassword")>
```

Or using a service variable of type Secret:

```yaml title="secret.yaml"
stringData:
  db-password: <+serviceVariables.dbPassword>
  # Resolves: <+serviceVariables.dbPassword> → <+secrets.getValue("account.prodDbPassword")> → actual value
```

**Step 3.** Commit, push, sync

The plugin resolves the expression at render time. The deployed `Secret` in the cluster contains the actual value (base64-encoded as Kubernetes expects).

**Verify:**

```bash
kubectl get secret app-secrets -n default -o jsonpath='{.data.db-password}' | base64 -d
```

---

## Supported secret sources

| Source | Configuration |
|---|---|
| Harness Secret Manager | Built-in. Create a Text secret, reference by identifier. |
| HashiCorp Vault | Configure Vault connector in Harness; reference secrets via Harness secret entity pointing to Vault path |
| Other external managers | Any secret manager with a Harness connector |

### Reference syntax

| Scope | Syntax |
|---|---|
| Project | `<+secrets.getValue("secretIdentifier")>` |
| Account | `<+secrets.getValue("account.secretIdentifier")>` |
| Org | `<+secrets.getValue("org.secretIdentifier")>` |

### Using service/environment variables (two-stage resolution)

When a Harness variable is defined as type **Secret**, it resolves in two stages:

| Stage | What happens |
|---|---|
| Manifest generation | `<+serviceVariables.name>` → `<+secrets.getValue("account.ref")>` |
| Deployment time | `<+secrets.getValue(...)>` → actual secret value injected |

---

## Security model

### Secret Visibility and Access

:::warning Argo CD caches rendered manifests, including injected secret values, in Redis
The rendered manifests (with real secret values) are stored in Argo CD's Redis instance and also exposed via the repo-server gRPC API. Anyone with access to either can read the resolved values.
:::

| Component | What it can see |
|---|---|
| Argo CD Redis | Cached rendered manifests with injected values |
| Argo CD repo-server API | Same cached manifests via gRPC |
| Harness UI | Secret values are masked |
| Kubernetes cluster | Secrets stored base64-encoded; requires cluster RBAC to read |

### Hardening checklist

1. **Network policies**: block direct access to Argo CD's Redis and repo-server from workloads that do not need it. Verify your cluster enforces these policies.
2. **Dedicated Argo CD cluster**: run Argo CD on a cluster with no other tenant workloads; minimizes lateral movement risk.
3. **RBAC**: restrict who can read Kubernetes `Secret` resources and who can access Argo CD components.
4. **Audit logs**: monitor access to Argo CD components for unauthorized reads.

For more, see [Argo CD secret management: mitigating risks of injection plugins](https://argo-cd.readthedocs.io/en/stable/operator-manual/secret-management/#mitigating-risks-of-secret-injection-plugins).

### Best practices

- Define secrets in Harness before referencing them in manifests
- Test in non-production environments before relying on secret injection in production
- Use RBAC to control who can modify secret expressions in `Application` manifests
- Avoid `HELM_ARGS`: it passes unsanitized strings to the shell. See [HELM_ARGS warning](/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications#helm_args-environment-variable)

---

## Limitations

### Application source type is reported as Plugin

When the CMP is active, Argo CD reports source type as **Plugin** instead of Helm/Directory. Features that rely on source type detection (Helm chart path listing, auto-type detection) do not work. Go to the <a href="https://github.com/argoproj/argo-cd/issues/8949#issuecomment-1680739649" target="_blank" rel="noopener noreferrer">upstream issue</a> for details.

**Workaround:** Specify application source paths manually instead of relying on Argo CD's path discovery UI.

### Kustomize secretGenerator is unverified

Secret injection into `kind: Secret` objects produced by Kustomize's `secretGenerator` has not been verified. `secretGenerator` output is already base64-encoded before the plugin sees it, and the plugin does not re-encode substituted values. Use plain `Secret` manifests (not `secretGenerator`) until this is confirmed.

---

## Troubleshooting

### Secret not found

```
secret "secretIdentifier" not found
```

1. Confirm the secret exists in Harness (correct scope: project, org, or account).
2. Check the identifier in the expression matches exactly (case-sensitive, no extra spaces).
3. Confirm you have permission to read the secret at that scope.

### Expression not replaced

`<+secrets.getValue("ref")>` appears literally in the deployed pod:

1. Verify the plugin is installed: `kubectl get pods -n <agent-namespace>` should show `argocd-harness-plugin` as a running container on the repo-server pod.
2. Check sidecar logs: `kubectl logs -n <agent-namespace> <repo-server-pod> -c argocd-harness-plugin`
3. Confirm expression syntax: `<+secrets.getValue("identifier")>` with double quotes.

### Secret resolves to empty

1. Secret exists but has no value; check in Harness Secrets.
2. Access denied; verify RBAC permissions for the GitOps agent service account.

---

## Next steps

- <a href="/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications" target="_blank" rel="noopener noreferrer">Harness expressions in GitOps manifests</a>: Tool detection, non-secret expressions, and agent setup
- <a href="/docs/continuous-delivery/gitops/security/external-secrets-integration" target="_blank" rel="noopener noreferrer">External Secrets integration</a>: Integrate External Secrets Operator with Harness GitOps
- <a href="/docs/continuous-delivery/gitops/security/sops" target="_blank" rel="noopener noreferrer">SOPS integration</a>: Use Mozilla SOPS for encrypted secrets in Git
- <a href="/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart" target="_blank" rel="noopener noreferrer">Create a GitOps application</a>: Set up your first ArgoCD application in Harness
