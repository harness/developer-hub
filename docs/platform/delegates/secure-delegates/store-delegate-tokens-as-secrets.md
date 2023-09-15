---
title: Store delegate tokens as Kubernetes secrets
description: How to store delegate tokens as Kubernetes secrets
# sidebar_position: 20
---

You can store your delegate tokens as a Kubernetes secret instead of a ConfigMap. 

To store the delegate token as a Kubernetes secret, do the following:

1. Create a Kubernetes secret. For details, go to the Kubernetes documentation: [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).
2. Create a `delegate-token.yaml` file.

   ```yaml
   apiVersion: v1
   kind: Secret
     metadata:
     name: token-secret
     namespace: harness-delegate-ng
     type: Opaque
   stringData:
   DELEGATE_TOKEN: <Delegate-token-value>
   ```

3. Run the following to apply the YAML file.

   ```
   kubectl -f delegate-token.yaml
   ```

4. Modify the `delegate.yaml` file to provide the reference to the secret you created.

   ```yaml
   - name: DELEGATE_TOKEN
     valueFrom:
       secretKeyRef:
         name: token-secret
         key: DELEGATE_TOKEN
   ```
