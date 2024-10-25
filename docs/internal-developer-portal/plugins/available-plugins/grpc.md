---
title: gRPC Playground
description: A backstage plugin ported from BloomRPC which is an Electron application
---

| Plugin details |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Created by** | ZaloPay                                                      |
| **Category**   | API                                                                        |
| **Source**     | [GitHub](https://github.com/zalopay-oss/backstage-grpc-playground) |
| **Type**       | Open-source plugin                                                             |


## Configuration

The Plugin is Auto-Enabled now and you don't need to set any configuration, as the plugin isn't available under Marketplace. 

:::info

The Plugin doesn't work when tried on a Live Server. Read More on this [GitHub Issue](https://github.com/zalopay-oss/backstage-grpc-playground/issues/11)

:::

## Annotations

To configure the plugin for a service in the software catalog, set one of the following annotations in its `catalog-info.yaml` definition file.

### Unary

```YAML
spec:
  type: grpc
  lifecycle: production
  owner: zalopay-oss
  definition:
    $text: https://github.com/zalopay-oss/backstage-grpc-playground/blob/main/examples/unary/helloworld.proto
  files:
    - file_name: helloworld.proto
      file_path: examples/unary/helloworld.proto
      url: https://github.com/zalopay-oss/backstage-grpc-playground/blob/main/examples/unary/helloworld.proto
```

### Stream 

```YAML
spec:
  type: grpc
  lifecycle: production
  owner: zalopay-oss
  definition:
    $text: https://github.com/zalopay-oss/backstage-grpc-playground/blob/main/examples/stream/employee.proto
  files:
    - file_name: employee.proto
      file_path: examples/stream/employee.proto
      url: https://github.com/zalopay-oss/backstage-grpc-playground/blob/main/examples/stream/employee.proto

      imports:
        - file_name: common.proto
          file_path: examples/stream/common.proto
          url: https://github.com/zalopay-oss/backstage-grpc-playground/blob/main/examples/stream/common.proto
```

![](./static/call_stream.gif)

![](./static/missing_import_1.gif)

Read More on the [open-source docs](https://github.com/zalopay-oss/backstage-grpc-playground?tab=readme-ov-file#yaml-file-definition) 

## Support

The plugin is owned by ZaloPyy and managed in the [GitHub repository](https://github.com/zalopay-oss/backstage-grpc-playground) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
