The workspace path on the pod running the scan step. The workspace path is `/harness` by default. 

You can override this if you want to scan only a subset of the workspace. For example, suppose the pipeline publishes artifacts to a subfolder `/tmp/artifacts` and you want to scan these artifacts only. In this case, you can specify the workspace path as `/harness/tmp/artifacts`.

Additionally, you can specify individual files to scan as well. For instance, if you only want to scan a specific file like `/tmp/iac/infra.tf`, you can specify the workspace path as `/harness/tmp/iac/infra.tf`