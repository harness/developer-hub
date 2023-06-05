---
title: Code coverage
description: Include code coverage in your CI pipelines.
sidebar_position: 40
---

You can add code coverage to a Harness CI pipeline by adding the relevant commands to your steps that run tests.

## Code coverage examples by language

### Go

```
go test -cover -coverprofile=c.out
go tool cover -html=c.out -o coverage.html



      - run: go build
      - run:
          name: "Create a temp directory for artifacts"
          command: |
            mkdir -p /tmp/artifacts
      - run:
          command: |
            go test -coverprofile=c.out
            go tool cover -html=c.out -o coverage.html
            mv coverage.html /tmp/artifacts

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### Java

[JaCoCo](https://github.com/jacoco/jacoco)

Include jacoco in pom.xml. when you run `mvn test`, code coverage is included (report written to an `exec` file).

```
command: |-
  mvn test

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### JavaScript

[Istanbul](https://github.com/gotwarlost/istanbul) by itself.

Istanbul in Jest.

```
      - run: npm install
      - run:
          name: "Run Jest and Collect Coverage Reports"
          command: jest --collectCoverage=true

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### PHP

[phpdbg](https://www.php.net/manual/en/book.phpdbg.php)

```
phpdbg -qrr vendor/bin/phpunit --coverage-html build/coverage-report


      - run:
          name: "Run tests"
          command: phpdbg -qrr vendor/bin/phpunit --coverage-html build/coverage-report
          environment:
            XDEBUG_MODE: coverage

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### Python

[Coverage.py](https://coverage.readthedocs.io/en/latest/)

```
pip install coverage ## install coverage.py (separate run step?)

## prefix commands with `coverage`:

coverage run -m pytest
coverage report
coverage html

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### Ruby

[SimpleCov](https://github.com/simplecov-ruby/simplecov)

```
## Add simplecov gem
gem 'simplecov', require: false, group: :test

Run script ex `bin/rails test` - https://github.com/simplecov-ruby/simplecov#getting-started

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

## Code coverage services

### CodeCov

To publish code coverage results to your CodeCov dashboard, follow this tutorial: [Code coverage with CodeCov in Harness CI](/tutorials/ci-pipelines/test/codecov).

### Coveralls

https://docs.coveralls.io/#integrate-coveralls-with-your-codebase

* Github action
* language integration

Drone supported w Coveralls Universal Reporter:
1. Set up in codebase https://docs.coveralls.io/index#integrate-coveralls-with-your-codebase
2. coveralls repo token env var on step: https://docs.coveralls.io/ci-services#the-coveralls-repo-token-required  
1. Or use .coveralls.yml (not rec for private repos)? https://docs.coveralls.io/ci-services#option-2-use-a-coverallsyml-file

Use a harness text secret for the token.

## Publish code coverage reports to the Artifacts tab

You can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish code coverage reports to the **Artifacts** tab on the [Build details page](../viewing-builds.md). Code coverage reports are not the only artifacts you can publish to the **Artifacts** tab, for example, you can [Publish an Allure Report to the Artifacts tab](/tutorials/ci-pipelines/test/allure-report).

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

To publish a code coverage report to the **Artifacts** tab, you must:

1. Include steps in your pipeline that run tests with code coverage and produce code coverage reports.
2. Include a step to upload the report artifact to cloud storage, such as [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md), [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md), or [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md).
3. Include a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `artifact-metadata-publisher` plugin. Configure the **Plugin** step settings as follows:

   * **Name:** Enter a name.
   * **Container Registry:** Select a Docker connector.
   * **Image:** Enter `plugins/artifact-metadata-publisher`.
   * **Settings:** Add the following two settings as key-value pairs.
      * `file_urls`: The URL to the code coverage artifact that was uploaded in the **Upload Artifacts** step.
      * `artifact_file`: `artifact.txt`

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

1. Include steps in your pipeline that run tests with code coverage and produce code coverage reports.
2. Include a step to upload the report artifact to cloud storage, such as [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md), [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md), or [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md).
3. Include a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `artifact-metadata-publisher` plugin, for example:

   ```yaml
                  - step:
                     type: Plugin
                     name: publish artifact metadata
                     identifier: publish_artifact_metadata
                     spec:
                       connectorRef: account.harnessImage
                       image: plugins/artifact-metadata-publisher
                       settings:
                         file_urls: ## Provide the URL to the code coverage artifact that was uploaded in the Upload Artifacts step.
                         artifact_file: artifact.txt
   ```

```mdx-code-block
  </TabItem>
</Tabs>
```
