---
title: Format test reports
description: Test reports must be in JUnit XML format to appear on the Tests tab.
sidebar_position: 30
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/test-report-ref
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Results on the [Tests tab](./viewing-tests.md) are parsed from test reports specified in the **Report Paths** setting in **Run** and **Test** steps. Test reports must be in [JUnit XML format](https://llg.cubic.org/docs/junit/) to appear on the **Tests** tab, because Harness parses test reports that are in JUnit XML format only.

For optimal rendering in the Harness UI, there is a limit of 8,000 characters per field. If a field in your XML file contains more than 8,000 characters, the output might render incorrectly on the **Tests** tab.

## JUnit XML format resources

Use these resources to learn about JUnit XML formatting.

* [Common JUnit XML format and examples from Testmo](https://github.com/testmoapp/junitxml)
* [Examples of JUnit XML format mapping from IBM](https://www.ibm.com/docs/en/developer-for-zos/16.0?topic=formats-junit-xml-format)
* [Apache Ant JUnit schema](https://github.com/windyroad/JUnit-Schema)

## Tools with built-in JUnit XML output

Here are some Harness YAML examples for test tools that produce JUnit XML output by default.

### C, C++

<details>
<summary>CTest Output JUnit</summary>

You can use the [--output-junit](https://cmake.org/cmake/help/latest/manual/ctest.1.html#cmdoption-ctest-output-junit) command with CTest.

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      mkdir build
                      cmake -S . -B build
                      ctest --test-dir build --output-junit out.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/build/out.xml
```

</details>

### Java - Gradle

<details>
<summary>Gradle</summary>

Run step:

```yaml
              - step:
                  type: Run
                  ...
                  spec:
                    shell: Sh
                    command: |-
                     test --tests
                    ...
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "/harness/results.xml"
                      type: JUnit
```

Test step:

```yaml
              - step:
                  type: Test
                  name: Intelligent Tests
                  identifier: test
                  spec:
                    command: test --tests
                    shell: Sh
                    ...
                    reports:
                      - "/harness/results.xml"
```

</details>

### PHP

<details>
<summary>PHPUnit</summary>

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      mkdir -p /harness/phpunit
                      phpunit --log-junit /harness/phpunit/junit.xml tests
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/phpunit/junit.xml
```

</details>

### Python

For Python, use pytest or unittest. You can also [use pytest to run unittest](https://docs.pytest.org/en/latest/how-to/unittest.html).

<details>
<summary>Pytest in a Run step</summary>

This example runs pytest in a [Run step](../run-step-settings.md).

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      . venv/bin/activate
                      mkdir /harness/test-results
                      pytest --junitxml=harness/test-results/junit.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/test-results/junit.xml
```

:::info

If you use [test splitting](./speed-up-ci-test-pipelines-using-parallelism) with pytest in a Run step, you must set `junit_family=xunit1` in your code repo's `pytest.ini` file or include `-o junit_family="xunit1"` in the step's `command`.

:::

</details>

<details>
<summary>Pytest with Test Intelligence (Test step)</summary>

This example runs pytest with [Test Intelligence](./ti-overview.md).

```yaml
              - step:
                  type: Test
                  name: Intelligent Tests
                  identifier: test
                  spec:
                    command: |-
                      python3 -m venv .venv
                      . .venv/bin/activate

                      python3 -m pip install -r requirements/test.txt
                      python3 -m pip install -e .

                      pytest --junitxml=out_report.xml
                    shell: Python
                    ...
                    reports:
                      - out_report.xml*
```

</details>

### Ruby - Cucumber

<details>
<summary>Cucumber</summary>

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      bundle check || bundle install
                      mkdir -p /harness/cucumber
                      bundle exec cucumber --format junit --out /harness/cucumber/junit.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/cucumber/junit.xml
```

</details>

## JUnit converters, formatters, and plugins

If your test tool doesn't automatically produce test results in JUnit XML format, there are JUnit converters, formatters, and plugins available for all major languages. Some examples of conversion tools and corresponding Harness YAML are provided below.

### C# - .NET Core, NUnit

* [NUnit to JUnit](https://github.com/nunit/nunit-transforms/tree/master/nunit3-junit)
* [.NET trx2JUnit](https://github.com/gfoidl/trx2junit)

<details>
<summary>Example: NUnit to JUnit</summary>

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Powershell
                    command: |-
                      cd dotnet-agent/TestProject1
                      wget -UseBasicParsing https://dot.net/v1/dotnet-install.ps1 -o dotnet-install.ps1
                      .\dotnet-install.ps1
                      dotnet build

                      wget https://raw.githubusercontent.com/nunit/nunit-transforms/master/nunit3-junit/nunit3-junit.xslt -o nunit3-junit.xslt

                      "C:/Program Files (x86)/NUnit.org/nunit-console/nunit3-console.exe" dotnet-agent/TestProject1/bin/Debug/net48/TestProject1.dll --result="UnitTestResults.xml;transform=nunit3-junit.xslt"
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - UnitTestResults.xml
```

</details>

### Clojure

* [Kaocha JUnit Plugin](https://clojars.org/lambdaisland/kaocha-junit-xml)
* [Clojure.test JUnit Plugin](https://github.com/ruedigergad/test2junit)

### Go

<details>
<summary>Go Junit Report</summary>

You can use the [go-junit-report](https://github.com/jstemmer/go-junit-report) tool.

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | $HOME/go/bin/go-junit-report -set-exit-code > report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

</details>

### Java - Maven

<details>
<summary>Maven Surefire Plugin</summary>

This example uses the [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/).

Run step:

```yaml
              - step:
                  type: Run
                  ...
                  spec:
                    shell: Sh
                    command: |-
                     test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false
                    ...
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "target/surefire-reports/*.xml"
                      type: JUnit
```

Test step:

```yaml
              - step:
                  type: Test
                  name: Intelligent Tests
                  identifier: test
                  spec:
                    command: test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false
                    shell: Sh
                    ...
                    reports:
                      - "target/surefire-reports/*.xml"
```

</details>

### JavaScript

<details>
<summary>ESLint</summary>

[ESLint JUnit Formatter](https://eslint.org/docs/latest/use/formatters/#junit)

```yaml
  - step:
      type: Run
      name: Run ESLint Tests
      identifier: run_eslint_tests
      spec:
        shell: Sh
        command: |
          mkdir -p /harness/reports
          eslint ./src/ --format junit --output-file /harness/reports/eslint.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/reports/eslint.xml"
```

</details>

<details>
<summary>Jest</summary>

[Jest JUnit Reporter](https://www.npmjs.com/package/jest-junit)

```yaml
  - step:
      type: Run
      name: Run Jest Tests
      identifier: run_jest_tests
      spec:
        shell: Sh
        command: |
          yarn add --dev jest-junit
          jest --ci --runInBand --reporters=default --reporters=jest-junit
      envVariables:
         JEST_JUNIT_OUTPUT_DIR: "/harness/reports"
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/reports/*.xml"
```

</details>

<details>
<summary>Karma</summary>

[Karma JUnit Reporter](https://www.npmjs.com/package/karma-junit-reporter)

```yaml
  - step:
      type: Run
      name: Run Karma Tests
      identifier: run_karma_tests
      spec:
        shell: Sh
        command: |
          npm install
          mkdir /harness/junit
          karma start ./karma.conf.js
      envVariables:
        JUNIT_REPORT_PATH: /harness/junit/
        JUNIT_REPORT_NAME: test-results.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/junit/test-results.xml"
```

</details>

<details>
<summary>Mocha</summary>

[Mocha JUnit Reporter](https://www.npmjs.com/package/mocha-junit-reporter)

```yaml
  - step:
      type: Run
      name: Run Mocha Tests
      identifier: run_mocha_tests
      spec:
        shell: Sh
        command: |
          npm install
          mkdir /harness/junit
          mocha test --reporter mocha-junit-reporter --reporter-options mochaFile=./path_to_your/file.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/junit/test-results.xml"
```

</details>

### Ruby - Minitest, RSpec

<details>
<summary>Minitest</summary>

Add the [Minitest Junit Formatter](https://github.com/aespinosa/minitest-junit) to your Gemfile.

```yaml
  - step:
      type: Run
      name: Run Ruby Tests
      identifier: run_ruby_tests
      spec:
        shell: Sh
        command: |
          bundle check || bundle install
          bundle exec rake test --junit
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/report.xml"
```

</details>

<details>
<summary>RSpec</summary>

Add the [RSpec JUnit formatter](https://rubygems.org/gems/rspec_junit_formatter) to your Gemfile.

```yaml
  - step:
      type: Run
      name: Run RSpec Tests
      identifier: run_rspec_tests
      spec:
        shell: Sh
        command: |
          bundle check --path=vendor/bundle || bundle install --path=vendor/bundle --jobs=4 --retry=3
          mkdir /harness/rspec
          bundle exec rspec --format progress --format RspecJunitFormatter -o /harness/rspec/rspec.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/rspec/rspec.xml"
```

</details>

## Code coverage reports and test report artifacts

For information about code coverage reports and publishing report URLs to the **Artifacts** tab, go to [Code Coverage](./code-coverage.md).

## Troubleshoot test reports

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to test reports in Harness CI, including:

* [Test suites incorrectly parsed](/kb/continuous-integration/continuous-integration-faqs/#test-reports-missing-or-test-suites-incorrectly-parsed)
* [Test reports missing](/kb/continuous-integration/continuous-integration-faqs/#test-reports-missing-or-test-suites-incorrectly-parsed)
* [Test report truncated](/kb/continuous-integration/continuous-integration-faqs/#why-is-the-test-report-truncated-in-tests-tab)
* [Multiple test report paths](/kb/continuous-integration/continuous-integration-faqs/#can-i-specify-multiple-paths-for-test-reports-in-a-run-step)
* [Test Intelligence call graph is empty](/kb/continuous-integration/continuous-integration-faqs/#on-the-tests-tab-the-test-intelligence-call-graph-is-empty-and-says-no-call-graph-is-created-when-all-tests-are-run)
