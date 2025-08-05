## Using SSH Keys During Docker Builds

You can securely perform SSH-based operations in your Docker builds — such as cloning private Git repositories — by mounting an SSH key into the build using Docker BuildKit’s `--ssh` feature. The SSH key is mounted only during the build process and is never baked into the final image.

Below is a full working Harness CI pipeline example:

```yaml
pipeline:
  projectIdentifier: YOUR_PROJECT_ID
  orgIdentifier: YOUR_ORG_ID
  tags: {}
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Run
                  name: Create Dockerfile
                  identifier: Run
                  spec:
                    connectorRef: account.harnessImage
                    image: alpine
                    shell: Sh
                    command: |-
                      mkdir docker

                      cat > Dockerfile <<- "EOF"
                      FROM node:20-slim AS base
                      RUN apt-get update && apt-get install git -y
                      RUN mkdir -p ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
                      RUN --mount=type=ssh,id=sshkey git clone git@github.com:GITHUB_ORG/PRIVATE_REPO.git
                      RUN ls -lR PRIVATE_REPO
                      EOF

                      cat Dockerfile
                      mv Dockerfile docker/

                      ls -al /harness
                      # docker pull harness/buildkit:1.0.1
              - step:
                  type: Run
                  name: SSH Key Prep
                  identifier: SSH_Key_Prep
                  spec:
                    shell: Sh
                    command: |-
                      cat << EOF > /harness/id_ed25519
                      <+secrets.getValue("SSH_KEY")>
                      EOF
                      chmod 400 /harness/id_ed25519
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and Push Image
                  identifier: Build_and_Push_Image
                  spec:
                    connectorRef: DOCKER_CONNECTOR
                    repo: DOCKER_ORG/DOCKER_REPO
                    tags:
                      - multiarch
                    caching: true
                    dockerfile: docker/Dockerfile
                    resources:
                      limits:
                        memory: 1Gi
                        cpu: 750m
                    envVariables:
                      PLUGIN_BUILDX_OPTIONS: "--ssh=sshkey=/harness/id_ed25519"
                  when:
                    stageStatus: Success
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
        when:
          pipelineStatus: Success
        description: ""
  identifier: SSH_Dockerfile_Example
  name: SSH Dockerfile Example
```

### Key points:

- `--mount=type=ssh,id=sshkey` in the Dockerfile matches `--ssh=sshkey=/harness/id_ed25519` in `PLUGIN_BUILDX_OPTIONS`.

- The SSH key comes from the Harness Secrets Manager and is mounted only during the build.

- **cloneCodebase** is set to `false` because the repository is cloned directly in the Docker build.

