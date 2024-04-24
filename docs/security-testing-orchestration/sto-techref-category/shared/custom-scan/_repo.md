These settings apply to Custom Scan steps when both of these conditions are true:
1. The `policy_type` is `orchestratedScan` or `dataLoad`.
2. The `scan_type` is `repository`.

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Repository name](#repository-name)
- [Variant](#variant)

<!-- TOC end -->

#### Repository Project

###### Key

```
repository_project
```
###### Value

The name of the repo to scan. To specify the repo URL, edit  the [Codebase Config object](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) in the Harness pipeline.  

In most cases, this should match the repo name used in your Git provider.

#### Repository Branch


##### Key
```
repository_branch
```

##### Value

The branch that gets reported in STO for the ingested results. You can specify a hardcoded string or use the runtime variable [`<+codebase.branch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference#manual-branch-build-expressions). This sets the branch based on the user input or trigger payload at runtime.  
     
In most cases, this field should match the name of the Git branch that is getting scanned.
