---
sidebar_position: 3
---

# Matrix

A matrix strategy can be used to test multiple versions of tools in a single pipeline step definition.

## Single-dimension

This pipeline runs two test steps with different versions of the `node` Docker image .

```yaml {12-13} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: script
        strategy:
          type: matrix
          spec:
            axis:
              node_version: [ "12", "14" ]
        spec:
          image: node:${{ matrix.node_version }}
          run: |-
            npm install
            npm test
```

## Multi-dimension

This pipeline runs four test steps with different versions of the `python` Docker image and `pytorch` package.

```yaml {12-14} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: script
        strategy:
          type: matrix
          spec:
            axis:
              python_version: [ "3.10", "3.11" ]
              pytorch_version: [ "1.13.1", "2.0.0" ]
        spec:
          image: python:${{ matrix.python_version }}
          run: |-
            pip3 install torch==${{ matrix.pytorch_version }}+cpu --index-url https://download.pytorch.org/whl/cpu
            pytest
```