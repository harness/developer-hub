# Github action step

GitHub Actions let you create custom actions that can perform predefined tasks. These predefined tasks range from cloning a codebase to building a Docker image and security scanning images. Previously-created actions are present on the [GitHub marketplace](https://github.com/marketplace?type=actions), with a rich support of over 10k actions.

Harness CI has added a native `Action` step type for running GitHub Actions.

:::note

The Action step is supported in Harness Cloud build infrastructures only.

:::

## Examples

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
<TabItem value="Go" label="Setup Golang" default>
```
This step sets up a go environment for the following steps in the stage to use.

```yaml
              - step:
                  type: Action
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: actions/setup-go@v3
                    with:
                      go-version: '1.17'
```

```mdx-code-block
</TabItem>
<TabItem value="Java" label="Setup Java">
```

This step sets up a java environment for the following steps in the stage to use.

```yaml
              - step:
                  type: Action
                  name: setup java
                  identifier: setup_java
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      java-version: '17'
```

```mdx-code-block
</TabItem>
<TabItem value="Ruby" label="Setup Ruby">
```

This step sets up a Ruby environment for the following steps in the stage to use.

```yaml
              - step:
                  type: Action
                  name: setup ruby
                  identifier: setup_ruby
                  spec:
                    uses: shubham149/setup-ruby@v1
                    with:
                      ruby-version: '2.7.2'
```

```mdx-code-block
</TabItem>
</Tabs>
```

## `spec` parameter reference

1. `uses`: The GitHub repository of the action along with the branch or tag.
2. `with`: A map with a key and value as string. These are action inputs.
3. `env`: Environment variables passed to the action.

### Action step yaml in Github action vs Harness CI

To create action step in harnessCI, copy the `uses`, `with` and `env` attributes from the GitHub action YAML and paste it in spec section of harness action step yaml

<table>
<tr>
<td> Github action yaml </td> <td> Harness CI Action step yaml </td>
</tr>
<tr>
<td>

```yaml
- name: hello-world
  uses: actions/hello-world-javascript-action@main
  with:
    who-to-greet: 'Mona the Octocat'
  env:
    hello: world
```

</td>
<td>

```yaml
- step:
    type: Action
    name: hello world
    identifier: hello_world
    spec:
      uses: actions/hello-world-javascript-action@main
      with:
        who-to-greet: 'Mona the Octocat'
      env:
        hello: world
```

</td>
</tr>
</table>

## Example pipeline

This pipeline installs golang version 1.19.5 using an Action step, compiles the golang application, and runs the tests.

```yaml
pipeline:
  name: Build and test golang application
  identifier: Build_test_golang
  projectIdentifier: defaul
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: Github_connector
        build: <+input>
  stages:
    - stage:
        name: Build golang application
        identifier: Build_golang_application
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Action
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: actions/setup-go@v3
                    with:
                      go-version: 1.19.5
              - step:
                  type: Run
                  name: Build and test
                  identifier: Build_and_test
                  spec:
                    shell: Bash
                    command: |-
                      go build .
                      go test -v ./...
```