---
title: Changes to a ConfigMap not reflected in new deployment
---

## Issue
Certain applications that use a ***readable hot config for dynamic configuration*** are improperly configured failing or failing when using a ConfigMap to drive the dynamic deployment strategy.
This is commonly used when teams want to make changes to configuration properties **only** (ie. the ConfigMap), without applying a complete artifact re-deployment.
Performing a rolling restart of the pods yields the same result, with the ConfigMap in question seems to not pick up any new updates to it.

## Cause
Restarting deployments do **not** automatically take the changes of an updated ConfigMap. To demonstrate this, consider the following scenario - with a basic two-stage deployment pipeline:
```Deploy (Manifest) stage``` in which we define a ConfigMap, called ```configmaptest```, which contains a text file with the following text in it:
apiVersion: v1
data:
  some-file.txt: |
    testing this file-spin-testing-12345566
kind: ConfigMap
metadata:
  name: configmaptest
  namespace: spinnaker01​
Deploy (Manifest) stage in which we define a basic nginx deployment: [https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)...which has the above-mentioned ConfigMap "configmaptest" mounted:
volumes:
  - configMap:
      defaultMode: 420
      name: configmaptest
    name: some-volume-name​
...to the following path on the nginx container:
volumeMounts:
  - mountPath: /testing/file.txt
    name: some-volume-name
    subPath: some-file.txt
*  After running this pipeline for the first time, we make a change to the ConfigMap to change the contents of the testing text file. Then, we re-run the pipeline to see if the deployment would pick up the new ConfigMap, which it didn't. We can also perform a ```rollout restart deployment``` but still doesn't take in the changes

