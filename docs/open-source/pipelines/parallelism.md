---
sidebar_position: 3
---

# Parallelism

Pipeline steps are executed sequentially by default. You can optionally run steps in parallel.

## Parallel steps

This pipeline executes `backend` and `frontend` steps in parallel, followed by a `notify` step.

```yaml {7} showLineNumbers
kind: pipeline
spec:
  stages:
    - type: ci
      spec:
        steps:
          - type: parallel
            spec:
              steps:
                - name: backend
                  type: run
                  spec:
                    container: golang
                    script: |-
                      go build
                      go test

                - name: frontend
                  type: run
                  spec:
                    container: node
                    script: |-
                      npm install
                      npm test

          - name: notify
            type: plugin
            spec:
              name: slack
              inputs:
                webhook: ${{ secrets.get("slack_webhook") }}
```
