---
title: Rotate delegate tokens and store in a 3P secret manager
sidebar_label: Rotate tokens and store in a secret manager
description: This topic explains how to rotate delegate tokens and store them in a 3P secret manager.
# sidebar_position: 70
---

You can rotate and store your delegate tokens in 3P secret manager and reference them as needed.

:::info note
If you rotate your delegate tokens, you must redeploy the delegate.
::

To rotate your tokens and store in them in a secret manager, do the following:

1. Create your delegate token through the [API](https://apidocs.harness.io/tag/Delegate-Token-Resource#operation/createDelegateToken). The delegate token API returns the token value.
2. Add the delegate token to a secret manager, such as Hashicorp Vault.
3. When you deploy the delegate pod, reference the delegate token from the secret manager.

To reference the delegate token stored in the Hashicorp Vault, do the following:

* Add the below annotations in the Helm chart:

   ```yaml
   vault.hashicorp.com/agent-inject: true
                 vault.hashicorp.com/agent-inject-secret-secret1: <delegate_token>
                 vault.hashicorp.com/agent-inject-status: injected
                 vault.hashicorp.com/agent-inject-template-secret1:
                   {{ with secret "<delegate_token>" }}
                   export DELEGATE_TOKEN="{{ .Data.data.DELEGATE_TOKEN }}"
                   {{ end }}
                 vault.hashicorp.com/auth-config-type: iam
                 vault.hashicorp.com/role: qa-cloudtrust-infrastructure
```
