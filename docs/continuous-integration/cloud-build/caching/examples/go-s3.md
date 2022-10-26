# S3 caching example for golang project

The below pipeline first clones `caddyserver/caddy` golang repository. First step in the pipeline restore the cache if already present. Then, it runs build and test on cloned project. Finally, it saves the cache to S3 store if not already present.
```yaml
pipeline:
  name: Caching example with golang
  identifier: golangCaching
  projectIdentifier: default        # update project identifier
  orgIdentifier: default            # update org identifier
  tags: {}
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  identifier: restoreCache
                  name: restore cache
                  type: RestoreCacheS3
                  spec:
                    connectorRef: s3
                    key: go-ci-{{ checksum "go.mod" }}-{{ checksum "go.sum" }}
                    bucket: docsciecache
                    region: us-east-2
                    archiveFormat: Tar
              - step:
                  type: Run
                  name: Build and test
                  identifier: Run
                  spec:
                    image: golang:1.19.1
                    connectorRef: account.harnessImage
                    command: |
                      go build .
                      go test -v ./...
              - step:
                  identifier: saveCache
                  name: save cache
                  type: SaveCacheS3
                  spec:
                    connectorRef: s3
                    key: go-ci-{{ checksum "go.mod" }}-{{ checksum "go.sum" }}
                    bucket: docsciecache
                    region: us-west-2
                    sourcePaths:
                      - /root/go/pkg/mod
                      - /root/.cache/go-build
                    archiveFormat: Gzip
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          sharedPaths:
            - /root/go/pkg/mod
            - /root/.cache/go-build
  properties:
    ci:
      codebase:
        connectorRef: <+input>
        repoName: caddyserver/caddy
        build: <+input>
```

