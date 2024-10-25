---
title: Build custom delegate images using Dockerfile
sidebar_label: Build custom images using Dockerfile
description: This topic describes how to build custom delegate images using the Harness Delegate Dockerfile.
sidebar_position: 7
---

You can use the Harness Delegate Dockerfile to build custom delegate images. The [Dockerfile](https://docs.docker.com/engine/reference/builder/) is available in the [delegate Dockerfile repository](https://github.com/harness/delegate-dockerfile).

The repository includes the `Dockerfile-minimal` and `Dockerfile-ubuntu` versions.

:::info note
If you build and use custom images, you can choose to enable or disable automatic upgrades for Kubernetes delegates. To learn more about automatic upgrades with custom images, go to [Use automatic upgrade with custom delegate images](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#use-automatic-upgrade-with-custom-delegate-images).

For more information on delegate automatic upgrades and the delegate expiration policy, go to [Delegate automatic upgrades and expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration).
:::

## Dockerfile tools

You can include third party tools with your delegate when you use the delegate Dockerfile. The image includes default tools. For a list of default tools and their versions, go to the [delegate Dockerfile repository](https://github.com/harness/delegate-dockerfile).

:::info note
While building custom delegate if you are not using delegate as base image [example](https://github.com/harness/delegate-dockerfile/blob/main/Dockerfile) then please ensure that you always package scm binary like below

```
RUN mkdir -m 777 -p client-tools/scm/<SCM_VERSION> \
  && curl -f -s -L -o client-tools/scm/<SCM_VERSION>/scm https://app.harness.io/public/shared/tools/scm/release/<SCM_VERSION>/bin/linux/$TARGETARCH/scm
```
SCM_VERSION should be coming from our [delegate to scm version mapping](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-image-types/#third-party-tools-included-in-the-delegate-image-type)

Example: If you're using delegate version 24.08.83705 then you should use scm version a81c96813, which gives below command
```
mkdir -m 777 -p client-tools/scm/a81c96813 \
  && curl -f -s -L -o client-tools/scm/a81c96813/scm https://app.harness.io/public/shared/tools/scm/release/a81c96813/bin/linux/$TARGETARCH/scm 
 ```

:::

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

To learn about delegate version support expiration, go to [Delegate expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#delegate-expiration-policy).

Here is an example script to get the version, which uses `curl` to fetch and `jq` to parse:

```
latest_version=$(curl -X GET 'https://app.harness.io/gateway/ng/api/delegate-setup/latest-supported-version?accountIdentifier=<YOUR_ACCOUNT_IDENTIFIER>' -H 'x-api-key: <YOUR_API_KEY>')

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

## Build a custom image with non-root access that includes custom certificates

If the delegate cannot run the delegate container as a root user but requires a custom CA, you can add custom CA bundle files to the delegate image and run a `load_certificates.sh` script on the files.

The `load_certificates.sh` script ensures that your CA certificates are:

- Added to the delegate's Java truststore located at `$JAVA_HOME/lib/security/cacerts`.
- Added to the Red Hat OS trust store.
- Applied to Harness CI, STO, and delegate pipelines.

To build your custom delegate image, do the following:

1. Add all of your CA certificates to a local directory.

2. Add the lines below to your delegate Dockerfile after the `RUN curl -s -L -o delegate.jar $BASEURL/$DELEGATEVERSION/delegate.jar` line and before the `USER 1001` line because root access is required to run the script. Replace the directory paths with your local directory locations.

   ```yaml
   USER root

   RUN curl -s -L -o delegate.jar $BASEURL/$DELEGATEVERSION/delegate.jar

   COPY <PATH_TO_LOCAL_CERTS_DIRECTORY> <PATH_TO_DIRECTORY_OF_CERTS_IN_THE_CONTAINER>

   RUN bash -c "/opt/harness-delegate/load_certificates.sh <PATH_TO_DIRECTORY_OF_CERTS_IN_THE_CONTAINER>"

   USER 1001

   ```

   This copies all the certificates from the local `./my-custom-ca` directory to `/opt/harness-delegate/my-ca-bundle/` directory inside the container.

   :::info warning
   Don't copy your certificates to the folder `/opt/harness-delegate/ca-bundle` folder. This folder is reserved for storing additional certificates to install the delegate. For more information, go to [Install with custom certificates](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/#install-with-custom-certificates).

   Set the user to root before you run the `load_certificates.sh` script. Then set the user back to normal access after you run the script.

   :::

3. Run the `load_certificates.sh` script.

4. Build your custom image.

### Examples

You can use the released delegate image as your base image. You can also use OS images like UBI or Ubuntu as a base to build a delegate image with custom certs.

#### Use the released delegate image

```
FROM docker.io/harness/delegate:<IMAGE_TAG>

USER root

# This is only needed for running Harness CI module
ENV DESTINATION_CA_PATH=<PATH_TO_LIST_OF_PODS_IN_THE_BUILD_POD_WHERE_YOU_WANT_TO_MOUNT_THE_CERTS>


# Please take the source scripts from this GitHub repo
RUN curl -o load_certificates.sh https://raw.githubusercontent.com/harness/delegate-dockerfile/main/immutable-scripts/load_certificates.sh

COPY <PATH_TO_LOCAL_CERTS_DIRECTORY> <PATH_TO_DIRECTORY_OF_CERTS_IN_THE_CONTAINER>

RUN bash -c "/opt/harness-delegate/load_certificates.sh <PATH_TO_DIRECTORY_OF_CERTS_IN_THE_CONTAINER>"

USER 1001

CMD [ "./start.sh" ]

```

#### Use a UBI base image

```
# Copyright 2022 Harness Inc. All rights reserved.
# Use of this source code is governed by the PolyForm Free Trial 1.0.0 license
# that can be found in the licenses directory at the root of this repository, also available at
# https://polyformproject.org/wp-content/uploads/2020/05/PolyForm-Free-Trial-1.0.0.txt.

FROM redhat/ubi8-minimal:8.8

LABEL name="harness/delegate-minimal" \
      vendor="Harness" \
      maintainer="Harness"

RUN microdnf update --nodocs --setopt=install_weak_deps=0 \
  && microdnf install --nodocs \
    procps \
    hostname \
    lsof \
    findutils \
    tar \
    gzip \
    shadow-utils \
    glibc-langpack-en \
  && useradd -u 1001 -g 0 harness \
  && microdnf remove shadow-utils \
  && microdnf clean all \
  && rm -rf /var/cache/yum \
  && mkdir -p /opt/harness-delegate/

COPY immutable-scripts /opt/harness-delegate/

WORKDIR /opt/harness-delegate

ARG TARGETARCH
ARG BASEURL=https://app.harness.io/public/shared/delegates
ARG DELEGATEVERSION

COPY --from=eclipse-temurin:17.0.7_7-jre-ubi9-minimal /opt/java/openjdk/ /opt/java/openjdk/
ENV JAVA_HOME=/opt/java/openjdk/

RUN mkdir -m 777 -p client-tools/scm/93b3c9f1 \
  && curl -s -L -o client-tools/scm/93b3c9f1/scm https://app.harness.io/public/shared/tools/scm/release/93b3c9f1/bin/linux/$TARGETARCH/scm \
  && chmod -R 775 /opt/harness-delegate \
  && chown -R 1001 /opt/harness-delegate \
  && chown -R 1001 $JAVA_HOME/lib/security/cacerts
RUN mkdir -p /opt/harness-delegate/additional_certs_pem_split


ENV LANG=en_US.UTF-8
ENV HOME=/opt/harness-delegate
ENV CLIENT_TOOLS_DOWNLOAD_DISABLED=true
ENV INSTALL_CLIENT_TOOLS_IN_BACKGROUND=true
ENV PATH="$JAVA_HOME/bin:${PATH}"
ENV SHARED_CA_CERTS_PATH=/opt/harness-delegate/additional_certs_pem_split

RUN curl -s -L -o delegate.jar $BASEURL/$DELEGATEVERSION/delegate.jar

COPY <PATH_TO_LOCAL_CERTS_DIRECTORY> <PATH_TO_DIRECTORY_OF_CERTS_IN_THE_CONTAINER>

RUN bash -c "/opt/harness-delegate/load_certificates.sh <PATH_TO_DIRECTORY_OF_CERTS_IN_THE_CONTAINER>"

USER 1001

CMD [ "./start.sh" ]
```
