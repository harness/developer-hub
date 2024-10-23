---
title: Unable to Deploy to a New Kubernetes Cluster to Spinnaker
---

## Issue
Customers may see a variety of errors when attempting to add a new Kubernetes Cluster into Spinnaker.
Exception ( Monitor Deploy )
 Failed to read [configMap] from IDM-staging: error: You must be logged in to the server (Unauthorized)
The cluster appears in the Spinnaker Console UI, but users cannot deploy to the cluster because of various errors.
 
 

## Cause
The reason for the situation and errors are likely to fall into one of the following situations: 
* kubeconfig file configuration * The token in the kubeconfig file does not match the token in the secrets* How does the role or cluster role configuration look like* How does the role/cluster role binding configuration look like* The path to the kubeconfig file in the SpinnakerService configuration * Spinnakerservice configuration typos/formatting

