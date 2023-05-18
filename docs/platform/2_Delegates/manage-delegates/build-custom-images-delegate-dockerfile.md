---
title: Build custom delegate images using Dockerfile
description: This topic describes how to build custom delegate images using the Harness Delegate Dockerfile.
sidebar_position: 7
---

You can use the Harness Delegate Dockerfile to build custom delegate images. The [Dockerfile](https://docs.docker.com/engine/reference/builder/) is available in the [delegate Dockerfile repository](https://github.com/harness/delegate-dockerfile). 

The repository includes the `Dockerfile-minimal` and `Dockerfile-ubuntu` versions. 

:::info note
If you build and use custom images, you can choose to enable or disable automatic upgrades for Kubernetes delegates. To learn more about automatic upgrades with custom images, go to [Use automatic upgrade with custom delegate images](https://developer.harness.io/docs/platform/Delegates/install-delegates/delegate-upgrades-and-expiration#use-automatic-upgrade-with-custom-delegate-images).

For more information on delegate automatic upgrades and the delegate expiration policy, go to [Delegate automatic upgrades and expiration policy](https://developer.harness.io/docs/platform/Delegates/install-delegates/delegate-upgrades-and-expiration).
:::

## Dockerfile tools

You can include third party tools with your delegate when you use the delegate Dockerfile. The image includes default tools. For a list of default tools and their versions, go to the [delegate Dockerfile repository](https://github.com/harness/delegate-dockerfile).

## Dockerfile-minimal

Use `Dockerfile-minimal` to create delegate images without tools. This image includes only the SCM client tool.

## Dockerfile-ubuntu
Use `Dockerfile-ubuntu` to create Ubuntu-based delegate images. This image includes all the same tools as the default Dockerfile.

:::info note
You can also replace the existing tools with your preferred CI/CD tools.
:::

## Build the image
To build the image, you need two arguments:

1. TARGETARCH (amd64/arm64)
2. The delegate build version

The build version to use for your account is available in the [Harness API documentation](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/publishedDelegateVersion).

To learn about delegate version support expiration, go to [Delegate expiration policy](https://developer.harness.io/docs/platform/Delegates/install-delegates/delegate-upgrades-and-expiration#delegate-expiration-policy).

Here is an example script to get the version, which uses `curl` to fetch and `jq` to parse:

```
latest_version=$(curl -X GET 'https://app.harness.io/gateway/ng/api/delegate-setup/latest-supported-version?accountIdentifier=<replace_with_account_ideentifier>' -H 'x-api-key: <replace_with_api_key>')

# Extract the build version using jq and string manipulation
build_version=$(echo $latest_version | jq -r '.resource.latestSupportedVersion' | cut -d '.' -f 3)

# Print the build version
echo $build_version
```

To build your custom image, use the `build_version` from above and the applicable command below:

### Dockerfile

```
docker build -t {TAG} -f Dockerfile --build-arg TARGETARCH=amd64 --build-arg DELEGATEVERSION=<version_from_previous_step>
```

### Dockerfile-minimal

```
docker build -t {TAG} -f Dockerfile-minimal --build-arg TARGETARCH=amd64 --build-arg DELEGATEVERSION=<version_from_previous_step>
```
