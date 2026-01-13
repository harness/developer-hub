---
title: ArgoCD 3.1.8 upgrade
description: Information about the ArgoCD 3.1.8 upgrade in Harness GitOps
sidebar_position: 8
---

Harness GitOps Agent version 0.106.0 includes ArgoCD 3.1.8, marking a major version upgrade from the previous 2.x releases. This page walks you through what's changed, what's improved, and what you need to consider when working with this new version.

## What's included

- **ArgoCD version**: 3.1.8
- **Helm chart version**: 9.0.0 (from 7.x)
- **Bundled Helm version**: 3.18.4
- **Bundled Kustomize version**: 5.7.0
- **Redis version**: 7.4.1-alpine
- **HAProxy version**: 2.9.4-alpine

## Key improvements in ArgoCD 3.1.8

### Security enhancements

Security has always been a priority for ArgoCD, and version 3.1.8 takes it up a notch with several critical improvements. These changes address real-world attack vectors and harden the system against potential threats.

The API server's `--staticassets` directory now has protection against out-of-bounds symlinks, preventing attacks that could expose sensitive files outside the intended directory. This might sound esoteric, but symlink attacks are a legitimate concern in containerized environments where directory boundaries matter.

Project API responses have been sanitized to address CVE GHSA-786q-9hcg-v9ff. Previously, certain API calls could inadvertently leak sensitive configuration details. The sanitization ensures that only the information you explicitly intend to expose makes it into the response payload.

Perhaps the most significant architectural change is how OpenID Connect authentication works. The authorization code flow with PKCE now happens server-side rather than in the browser. This shift reduces the attack surface considerably and makes authentication flows more reliable, especially in environments with strict content security policies.

### Tool upgrades

Both Helm and Kustomize have received substantial updates in this release. Helm 3.18.4 brings the latest features and security patches, along with better compatibility when working with recent Kubernetes versions. If you've been managing complex chart dependencies, you'll appreciate the improvements here.

Kustomize 5.7.0 focuses on performance and reliability. Manifest generation is noticeably faster, and the handling of complex overlays and patches has been refined. These aren't just incremental tweaks—they make a real difference when you're working with large, multi-environment deployments.

## Breaking changes and deprecations

### API endpoint deprecation

The `/api/v1/applications/{name}/resource/actions` endpoint is being phased out. If you're calling this endpoint from custom scripts, CI/CD pipelines, or integration code, you'll need to migrate to the v2 version at `/api/v1/applications/{name}/resource/actions/v2`.

The v1 endpoint still works for now to maintain backward compatibility, but don't rely on it indefinitely. Future releases will likely remove it entirely. Take inventory of where you're using this endpoint and plan your migration accordingly.

### Helm chart upgrade

The jump from Helm chart version 7.x to 9.0.0 represents a major version change with potential configuration differences. Some values in your `values.yaml` file might need adjusting. Before upgrading production environments, review the [argo-cd Helm chart releases](https://github.com/argoproj/argo-helm/releases) for specific changes that might affect your setup.

## Understanding the upgrade path

Moving from ArgoCD 2.x to 3.x isn't a simple point release—it's a major version upgrade with architectural changes that touch security, APIs, and core functionality. ArgoCD's maintainers have split the migration documentation into two parts to make the transition clearer.

The first part covers [upgrading from v2.14 to v3.0](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/2.14-3.0/), which includes the major breaking changes and architectural shifts. The second part handles [upgrading from v3.0 to v3.1](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/3.0-3.1/), covering the incremental refinements added in the 3.1 release. If you're coming from 2.x, read both guides.

:::info
Harness continues to support ArgoCD 2.8.2 alongside 3.1.8, giving you flexibility in when and how you upgrade. See [version compatibility](/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent#what-version-of-gitops-agent-supports-what-version-of-repo-server-and-redis-cache) for the full matrix.
:::

## What else changed in ArgoCD 3.x

### Application controller improvements

The application controller got smarter about tracking resources and reconciling state. Large deployments with hundreds of applications will see performance improvements, and CRD handling is more robust. State detection is more accurate, and reconciliation loops complete faster, which means quicker feedback when something drifts from your desired state.

### RBAC enhancements

Role-based access control now offers finer-grained permissions, which is particularly useful in multi-tenant environments. Project-level security has been enhanced, and there's better separation of concerns between teams and roles. If you're running ArgoCD in a shared environment, these improvements help you enforce access boundaries more precisely.

## Compatibility and performance notes

### What works with ArgoCD 3.1.8

ArgoCD 3.1.8 requires Kubernetes 1.20 or later. If you're still running older clusters, you'll need to upgrade them first. All major Git providers (GitHub, GitLab, Bitbucket, and others) continue to work, and both OAuth and SSH authentication remain supported.

Manifest types haven't changed—Helm charts, Kustomize, and plain YAML all work as expected. Kustomize users will notice improved handling of complex configurations, which was a common pain point in earlier versions.

### Performance gains

Performance improvements are scattered throughout the codebase. Manifest generation and rendering are faster, memory usage for large applications has been reduced, and repository caching is more efficient. If you're using ApplicationSets to manage multiple applications, sync operations will feel snappier.

### Better observability

Metrics and monitoring capabilities have been expanded, logging provides better diagnostic information, and event reporting gives you more detail about application state changes. These improvements make debugging issues considerably easier.

## Things to watch out for

### Custom plugins

If you've built custom config management plugins, review the [ArgoCD plugin documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/config-management-plugins/) for interface changes. Test your plugins in a non-production environment before rolling out the upgrade. Plugin interfaces can shift between major versions, and it's better to catch incompatibilities early.

### Webhooks and SSO

Webhook configurations remain compatible, though secret validation has been enhanced. Your existing webhook integrations will continue working without modification. The same goes for SSO—whether you're using OIDC, SAML, or LDAP, your current setup will keep working. The OIDC flow improvements happen transparently on the server side, so end users won't notice any changes in their authentication experience.

## How this affects Harness users

### Agent compatibility

GitOps Agent version 0.106.0 supports both ArgoCD 2.8.2 and 3.1.8, giving you control over upgrade timing. You can test 3.1.8 in development environments while keeping production on 2.8.2, or upgrade everything at once if that fits your workflow better. For the complete compatibility matrix, check [GitOps Agent version compatibility](/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent#what-version-of-gitops-agent-supports-what-version-of-repo-server-and-redis-cache).

### Feature compatibility

All Harness GitOps features work with ArgoCD 3.1.8 without modification. ApplicationSets, PR Pipelines, multi-source applications, secret expressions in manifests, and the GitOps sync step in CD pipelines all continue to function exactly as they did before.

### No workflow disruption

We designed this upgrade to be transparent to your existing workflows. Your GitOps applications continue running without changes, pipeline configurations remain the same, and repository and cluster connections work as-is. The upgrade shouldn't interrupt your deployment processes or require reconfiguring your integrations.

## Additional resources

### Official ArgoCD documentation

- [ArgoCD 3.1.8 release notes](https://github.com/argoproj/argo-cd/releases/tag/v3.1.8)
- [ArgoCD upgrade guide overview](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/)
- [ArgoCD 3.x documentation](https://argo-cd.readthedocs.io/en/stable/)

### Helm chart resources

- [argo-cd Helm chart releases](https://github.com/argoproj/argo-helm/releases)
- [Helm chart version 9.0.0 changes](https://github.com/argoproj/argo-helm/releases/tag/argo-cd-9.0.0)

### Harness resources

- [GitOps Agent installation](/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent)
- [GitOps architecture](/docs/continuous-delivery/gitops/get-started/gitops-architecture)
- [GitOps troubleshooting](/docs/continuous-delivery/gitops/resources/troubleshooting)
- [Supported CD integrations](/docs/continuous-delivery/cd-integrations)

## Related release information

For the complete release announcement including this ArgoCD upgrade, see the [January 2026 GitOps release notes](/release-notes/continuous-delivery#gitops-service-1470-gitops-agent-01060).
