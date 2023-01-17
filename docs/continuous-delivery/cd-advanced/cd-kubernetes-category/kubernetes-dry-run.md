## Kubernetes Dry Run Step


- Harness can Fetch your Kubernetes Service Kubernetes Manifests or Helm Chart and perform a dry run of those resources. 
- When Harness Runs a Dry Run, the step executes the command `kubectl apply --f --dry-run`
- That would output a response from Kubernetes like below:

```Sh
Validating manifests with Dry Run
kubectl --kubeconfig=config apply --filename=manifests-dry-run.yaml --dry-run
namespace/dev created (dry run)
configmap/nginx-k8s-config created (dry run)
service/nginx-k8s-svc created (dry run)
deployment.apps/nginx-k8s-deployment created (dry run)

Done.
```

- The Manifests will be available as a variable to be used in subsequent steps like the `policy step` , `shell script` , `approval` , etc. 


### Limitations

- There is a storage limit because the resolved the manifests will be stored on Harness, we can only store up to 5MB



