---
title: OpenShift- How to supply the complete certificate chain
---

## Issue
Validator error when attempting to apply changes:
```certificate signed by unknown authority```

## Cause
OpenShift is not supplying the full certificate chain for verifying the certificate from the server.The issue occurs when a user's certificate originates from Kubernetes in the ```kubeconfig``` file (base64 encoded PEM format certs).The **OpenShift cluster** includes the **leaf cert**, which is used by the API server. A number of supporting certs in the ```kubeconfig``` file are also provided, but not the certificates needed to verify the **leaf cert**.

