---
title: Provide Logs from Pods to Armory Support for Troubleshooting Purposes
---

## Introduction
In the event that the customer's environment is Airgapped, or unable to [send logs to be monitored by Armory](https://kb.armory.io/s/article/Confirming-Environment-Logs-and-Environment-Debugging-ID-with-Armory-Support), users will need to extract the logs from the pods and provide them as attachments when opening tickets

## Prerequisites
Access to the pods via kubectl

## Instructions
It is possible to provide a snippet of the logs by accessing the pod and then copying and pasting the relevant sections 
```kubectl logs -n %namespace %podname -f```
If instead, a set of complete logs is required from the pod, the logs can also be extracted by using the following command
```kubectl logs -n %namespace %podname > %servicename.log```

