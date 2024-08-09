---
title: BrowserStack
description: User BrowserStack in Harness CI pipelines.
sidebar_position: 2
---

[BrowserStack](https://www.browserstack.com/) is a cloud web and mobile testing platform that provides developers with the ability to test their websites and mobile applications across on-demand browsers, operating systems and real mobile devices.

## BrowserStack Automate

[BrowserStack Automate](https://www.browserstack.com/automate-product) runs your Selenium tests on an extensive list of browsers and mobile devices, with support for CI and Local Testing.

The [Integrate BrowserStack Automate with Harness](https://www.browserstack.com/docs/automate/selenium/harness) guide from BrowserStack covers the following topics:

1. Set up a pipeline in Harness
2. Integrate existing test cases
3. Integrate test cases for locally hosted websites

:::note

When running BrowserStack tests on [Kubernetes infrastructure](../../use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md), set the appropriate [resource limits](../../use-ci/set-up-build-infrastructure/resource-limits.md) required by your steps.

:::

Here is an example of a BrowserStack Automate step in a Harness pipeline, where the access key has been added to the project as a [text secret](../../../platform/secrets/add-use-text-secrets.md) named `browserstack_access_key`.

```yaml {} showLineNumbers
              - step:
                  type: Run
                  name: BrowserStack Automate
                  identifier: browserstack_automate
                  spec:
                    shell: Sh
                    command: |
                      wget "https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip"
                      unzip BrowserStackLocal-linux-x64.zip
                      ./BrowserStackLocal --key $BROWSERSTACK_ACCESS_KEY --daemon start
                      <your-test-command>
                      ./BrowserStackLocal --key $BROWSERSTACK_ACCESS_KEY --daemon stop
                    envVariables:
                      BROWSERSTACK_USERNAME: browserstack_username
                      BROWSERSTACK_ACCESS_KEY: <+secrets.getValue("browserstack_access_key")>
```