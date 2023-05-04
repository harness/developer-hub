---
title: Troubleshoot Continuous Integration
description: Troubleshoot common CI issues.
sidebar_position: 40
helpdocs_topic_id: jx7ew69ypa
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic contains troubleshooting information for error messages and other issues that can arise with Harness CI. For more Harness troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

If you cannot find a resolution, please contact [Harness Support](mailto:support@harness.io) or visit the [Harness Community Forum](https://community.harness.io/).

## Git connector fails to connect to the SCM service

The following SCM service errors can occur with [Git connectors](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference).

### SCM request failed with: UNKNOWN

This error may occur if your Git connector uses **SSH** authentication. To resolve this error, make sure HTTPS is enabled on port 443. This is the protocol and port used by the Harness connection test for Git connectors.

### SCM connection errors when using self-signed certificates

If you have configured your build infrastructure to use self-signed certificates, your builds may fail when the Git connector attempts to connect to the SCM service. Build logs may contain the following error messages:

```
Connectivity Error while communicating with the scm service
Unable to connect to Git Provider, error while connecting to scm service
```

To resolve this issue, add `SCM_SKIP_SSL=true` to the `environment` section of the delegate YAML.

For example, here is the `environment` section of a `docker-compose.yml` file with the `SCM_SKIP_SSL` variable:

```yaml
environment:
      - ACCOUNT_ID=XXXX
      - DELEGATE_TOKEN=XXXX
      - MANAGER_HOST_AND_PORT=https://app.harness.io
      - LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/
      - DEPLOY_MODE=KUBERNETES
      - DELEGATE_NAME=test
      - NEXT_GEN=true
      - DELEGATE_TYPE=DOCKER
      - SCM_SKIP_SSL=true
```

For more information about self-signed certificates, delegates, and delegate environment variables, go to:

* [Delegate environment variables](../platform/2_Delegates/delegate-reference/delegate-environment-variables.md)
* [Docker delegate environment variables](../platform/2_Delegates/delegate-reference/docker-delegate-environment-variables.md)
* [Set up a local runner build infrastructure](./use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure.md)
* [Install delegates](https://developer.harness.io/docs/category/install-delegates)
* [Configure a Kubernetes build farm to use self-signed certificates](./use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

<!-- DOC-2692 removed -->

## Test suites incorrectly parsed

The parsed test report in the **Tests** tab comes strictly from the provided test reports. The reports must be in JUnit XML format. It is important to adhere to the standard [JUnit format](https://llg.cubic.org/docs/junit/) to improve test suite parsing.

## Test Intelligence isn't working

Test Intelligence may not work even if you select the **Run only selected tests** option in your [Run Tests step](./use-ci/set-up-test-intelligence/configure-run-tests-step-settings.md). One possible cause for this is that you're using **Maven** and your `**pom.xml**` contains `argLine`. In this case, you must update the Java Agent as follows:

**Before:**

```
<argLine> something  
</argLine>
```

**After:**

```
<argLine> something -javaagent:/addon/bin/java-agent.jar=/addon/tmp/config.ini  
</argLine>
```

## Truncated execution logs

Each CI step supports a maximum log size of 5MB. Harness truncates logs larger than 5MB.

## Step logs disappear

If step logs disappear from pipelines that are using a Kubernetes cluster build infrastructure, you must either allow outbound communication with `storage.googleapis.com` or contact [Harness Support](mailto:support@harness.io) to enable the `CI_INDIRECT_LOG_UPLOAD` feature flag.

For more information about configuring connectivity, go to:

* [Delegate system requirements - Network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements/#network-requirements)
* [Allowlist Harness Domains an IPs](/docs/platform/References/allowlist-harness-domains-and-ips)

## AKS builds timeout

Azure Kubernetes Service (AKS) security group restrictions can cause builds running on an AKS build infrastructure to timeout.

If you have a custom network security group, it must allow inbound traffic on port 8080, which the Delegate service uses.

For more information, refer to the following Microsoft Azure troubleshooting documentation: [A custom network security group blocks traffic](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-kubernetes/custom-nsg-blocks-traffic).

## CI pods appear to be evicted by Kubernetes autoscaling

 Harness CI pods shouldn't be evicted due to autoscaling of Kubernetes nodes because [Kubernetes doesn't evict pods that aren't backed by a controller object](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-types-of-pods-can-prevent-ca-from-removing-a-node). However, if you notice either sporadic pod evictions or failures in the Initialize step in your [Build logs](./use-ci/viewing-builds.md), add the following annotation to your [Kubernetes cluster build infrastructure settings](./use-ci/set-up-build-infrastructure/ci-stage-settings.md#infrastructure):

```
"cluster-autoscaler.kubernetes.io/safe-to-evict": "false"
```

## Delegate is not able to connect to the created build farm

If you get this error when using a Kubernetes cluster build infrastructure, and you have confirmed that the delegate is installed in the same cluster where the build is running, you may need to allow port 20001 in your network policy to allow pod-to-pod communication.

For more delegate and Kubernetes troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).
