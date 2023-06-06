---
title: Code coverage
description: Include code coverage in your CI pipelines.
sidebar_position: 40
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

You can add code coverage to a Harness CI pipeline by configuring code coverage tools in your codebase and adding code coverage commands to steps that run tests.

For more information about running tests in Harness CI, go to [Run tests in CI pipelines](./run-tests-in-ci.md).

## Code coverage by language

The following examples show how to include code coverage in a Harness CI pipeline for different languages.

For information about available code coverage tools, configuring specific tools, or code coverage for languages not described here, refer to the documentation for that tool or language.

### Go

Go has built-in code coverage functionality.

1. Add the following commands to the **Run** step where you run your tests:

   ```
   go test -cover -coverprofile=c.out
   go tool cover -html=c.out -o coverage.html
   ```

2. Add a step to upload your code coverage report to cloud storage.

   * [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
   * [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
   * [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)

3. Optional: Add a step to [publish your code coverage report to the Artifacts tab](#publish-code-coverage-reports-to-the-artifacts-tab).

### Java

1. Set up a Java code coverage tool, such as [JaCoCo](https://github.com/jacoco/jacoco).
2. Run your tests in a **Run** or **Run Tests** step.

   By including JaCoCo in `pom.xml`, the `mnv test` command automatically writes a code coverage report to an `exec` file.

3. Add a step to upload your code coverage report to cloud storage.

   * [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
   * [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
   * [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)

4. Optional: Add a step to [publish your code coverage report to the Artifacts tab](#publish-code-coverage-reports-to-the-artifacts-tab).

:::tip JaCoCo Drone plugin

As an alternative to steps three and four, you can use the [JaCoCo Drone plugin](https://github.com/harness-community/drone-jacoco-s3). Instead of two separate steps, you use one [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) to run the JaCoCo Drone plugin, which uploads the JaCoCo code coverage report to S3 and publishes it to the **Artifacts** tab.

:::

### JavaScript

1. If necessary, set up a JavaScript code coverage tool, such as [Istanbul](https://github.com/gotwarlost/istanbul). Your test tool may already include code coverage; for example, [Istanbul is included with Jest](https://jestjs.io/docs/configuration/#collectcoverage-boolean).
2. Add code coverage arguments or commands to the relevant **Run** step. For example, with Jest, add `--collectCoverage=true` to your `jest` command.

```yaml
              - step:
                  type: Run
                  name: Run Jest Tests
                  identifier: run_jest_tests
                  spec:
                    shell: Sh
                    command: |-
                      yarn add --dev jest-junit
                      jest --ci --runInBand --reporters=default --reporters=jest-junit --collectCoverage=true
                    envVariables:
                      JEST_JUNIT_OUTPUT_DIR: "/harness/reports"
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "/harness/reports/*.xml"
```

3. Add a step to upload your code coverage report to cloud storage.

   * [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
   * [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
   * [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)

4. Optional: Add a step to [publish your code coverage report to the Artifacts tab](#publish-code-coverage-reports-to-the-artifacts-tab).

### PHP

The built-in [phpdbg](https://www.php.net/manual/en/book.phpdbg.php) tool can generate code coverage reports.

1. Add the following command to the **Run** step where your run your tests:

   ```
   phpdbg -qrr vendor/bin/phpunit --coverage-html build/coverage-report
   ```

2. Add a step to upload your code coverage report to cloud storage.

   * [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
   * [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
   * [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)

3. Optional: Add a step to [publish your code coverage report to the Artifacts tab](#publish-code-coverage-reports-to-the-artifacts-tab).

### Python

1. Install a Python code coverage tool, such as [Coverage.py](https://coverage.readthedocs.io/en/latest/). Depending on your build infrastructure, you can install this directly on the host machine or use a **Run** step to set up the test environment at runtime.

   ```yaml
                - step:
                 type: Run
                 identifier: installdependencies
                 name: Install dependencies
                 spec:
                   connectorRef: account.harnessImage
                   image: python:3.12.0b1-alpine3.18
                   command: |
                     python3 -m pip install --upgrade pip
                     pip install -r requirements.txt
                     pip install pytest
                     python3 -m pip install coverage
   ```

2. Add code coverage commands to the relevant **Run** or **Run Tests** step.

   ```yaml
             - step:
                 type: Run
                 identifier: runtests
                 name: Run Tests
                 spec:
                   connectorRef: account.harnessImage
                   image: python:3.12.0b1-alpine3.18
                   command: |
                     coverage run -m pytest --junit-xml=report.xml
                     coverage report
                     coverage html
   ```

   :::info Coverage.py usage

   With Coverage.py, replace the initial `python` or `pytest` in your usual test commands with `coverage run`.

   For more information, refer to the [Coverage.py quick start guide](https://coverage.readthedocs.io/en/latest/#quick-start).

   :::

3. Add a step to upload your code coverage report to cloud storage.

   * [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
   * [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
   * [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)

4. Optional: Add a step to [publish your code coverage report to the Artifacts tab](#publish-code-coverage-reports-to-the-artifacts-tab).

### Ruby

1. Set up a Ruby code coverage tool, such as [SimpleCov](https://github.com/simplecov-ruby/simplecov).
2. Run your tests in a **Run** step.

   SimpleCov doesn't require additional commands in the **Run** step since it is loaded in `test/test_helper.rb`.

3. Add a step to upload your code coverage report to cloud storage.

   * [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
   * [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
   * [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)

4. Optional: Add a step to [publish your code coverage report to the Artifacts tab](#publish-code-coverage-reports-to-the-artifacts-tab).

## Code coverage services

You can use code coverage services with Harness.

### CodeCov

To publish code coverage results to your CodeCov dashboard, use this tutorial: [Code coverage with CodeCov in Harness CI](/tutorials/ci-pipelines/test/codecov).

### Coveralls

To integrate Coveralls in your Harness CI pipelines, follow the Coveralls documentation to [Integrate Coveralls with your codebase](https://docs.coveralls.io/index#integrate-coveralls-with-your-codebase). Note the following:

* For **Step 2: Choose an integration**, use the **Universal Coverage Reporter**.
* For **Step 3: Configure your project to send coverage to Coveralls**:
  * Create a [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) for your `COVERALLS_REPO_TOKEN`.
  * Add the `COVERALLS_REPO_TOKEN` environment variable to steps in your CI pipelines that run tests with code coverage.
  * For the environment variable value, use a Harness expression to [reference the encrypted text secret](/docs/platform/secrets/add-use-text-secrets/#step-3-reference-the-encrypted-text-by-identifier), such as `<+secrets.getValue("YOUR_COVERALLS_SECRET_ID")>`.

<details>
<summary>Add an environment variable to a step</summary>

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In Harness, edit the step that runs your tests with code coverage.
2. Under **Environment Variables**, select **Add**.
3. Set the key to `COVERALLS_REPO_TOKEN`.
4. Set the value to `<+secrets.getValue("YOUR_COVERALLS_SECRET_ID")>`

![Adding the Coveralls Repo Token environment variable to a step in Harness.](./static/codecoverage_coveralls_env_var_visual.png)

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add `envVariables` to the `step.spec` for the relevant `Run` or `RunTests` step.

```yaml
              - step:
                  type: Run
                  name: npm test
                  identifier: npm_test
                  spec:
                    shell: Sh
                    command: |-
                      npm install
                      npm run build --if-present
                      npm test
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
                    envVariables:
                      COVERALLS_REPO_TOKEN: <+secrets.getValue("YOUR_COVERALLS_SECRET_ID")>
```

```mdx-code-block
  </TabItem>
</Tabs>
```

</details>

## Publish code coverage reports to the Artifacts tab

You can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish code coverage reports to the **Artifacts** tab on the [Build details page](../viewing-builds.md).

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

:::tip

Code coverage reports are not the only artifacts you can publish to the **Artifacts** tab, for example, you can [Publish an Allure Report to the Artifacts tab](/tutorials/ci-pipelines/test/allure-report).

:::
