---
title: gRPC 
description: A backstage plugin ported from grpc-docs which is like Swagger UI, but for gRPC APIs
---

| Plugin details |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Category**   | API                                                                        |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/api-docs-module-protoc-gen-doc) |
| **Type**       | Open-source plugin                                                             |


## Overview

This plugin contains `ApiDefinitionWidgets` for the [grpc-docs](https://github.com/gendocu-com/grpc-docs?tab=readme-ov-file#interactive-grpc-api-documentation) project, which renders gRPC API in the following format

![](./static/grpc-definition.png)

## Configuration

The Plugin is Auto-Enabled now, and you don't need to set any configuration, as the plugin isn't available under Marketplace. 

## Annotations

To configure the plugin for a service in the software catalog, set one of the following annotations in its `catalog-info.yaml` definition file.

[Example catalog-info.yaml](https://github.com/harness-community/idp-samples/blob/main/demo-prorto-api.yaml)

```YAML
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: grpc-docs-test
spec:
  type: grpc-docs
  lifecycle: production
  owner: group:engineering
  definition:
    $text: https://github.com/pseudomuto/protoc-gen-doc/blob/master/examples/doc/example.json
```

:::info

The plugin supports rendering gRPC documentation when the `type` is set to `grpc-doc` or `grpc` **and** the `definition` is provided in JSON format. 

:::

![](./static/grpc.gif)

Read More on the [open-source docs](https://github.com/backstage/backstage/tree/master/plugins/api-docs-module-protoc-gen-doc) 

## Support

The plugin is managed in the [GitHub repository](https://github.com/backstage/backstage/tree/master/plugins/api-docs-module-protoc-gen-doc) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
