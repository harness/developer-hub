The following YAML pipeline includes example stages for scanning a repository (Bandit step), an image (AquaTrivy step), and an app (ZAP step). 

:::tip
If you want to set up scan steps programmatically using YAML, the best practice is to set up your step in a pipeline using the Visual Editor and then copy, paste, and edit the YAML definition.
:::  

```yaml
pipeline:
  name: sto-step-palette-example
  identifier: stosteppaletteexample
  projectIdentifier: my_sto_project
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: MY_GITHUB_CONNECTOR
        build: <+input>
  stages:
    - stage:
        name: runSecurityTestsStage
        identifier: runSecurityTestsStage
        type: SecurityTests
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Background
                  name: docker_dind
                  identifier: Background_1
                  spec:
                    connectorRef: MY_DOCKER_CONNECTOR
                    image: docker:dind
                    shell: Sh
                    privileged: true
              - step:
                  type: Bandit
                  name: banditScanRepo
                  identifier: banditScanRepo
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: dvpwa
                      type: repository
                      variant: <+codebase.branch>
                    advanced:
                      log:
                        level: info
                      fail_on_severity: none
              - step:
                  type: AquaTrivy
                  name: aquaTrivyScanContainerImage
                  identifier: aquaTrivyScanContainerImage
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: myAlphaService
                      type: container
                      variant: latest
                    advanced:
                      log:
                        level: info
                    privileged: true
                    image:
                      type: docker_v2
                      name: jsmith/myalphaservice
                      domain: docker.io
                      tag: latest
              - step:
                  type: Zap
                  name: zapScanInstance
                  identifier: zapScanInstance
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: my-gruyere
                      type: instance
                      variant: test
                    advanced:
                      log:
                        level: info
                    instance:
                      domain: https://google-gruyere.appspot.com/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/
                      protocol: https
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: MY_K8S_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run

```