These settings apply to Custom Scan steps when both of these conditions are true:
1. The `policy_type` is `orchestratedScan` or `dataLoad`.
2. The `scan_type` is `repository`.

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Repository project](#repository-project)
- [Repository branch](#variant)

<!-- TOC end -->

#### Repository project

###### Key

```
repository_project
```
###### Value

The name of the repo to scan. To specify the repo URL, edit  the [Codebase Config object](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) in the Harness pipeline.  

In most cases, this should match the repo name used in your Git provider.

#### Repository branch


##### Key
```
repository_branch
```

##### Value

The branch that gets reported in STO for the ingested results. In most cases, this field should match the name of the Git branch that is getting scanned.

You can specify a hardcoded string or use a variable such as `<+codebase.branch>` to specify the branch at runtime. For more information, go to [CI codebase variables reference](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference).

