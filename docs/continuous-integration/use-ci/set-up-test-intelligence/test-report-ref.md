---
title: Format test reports
description: Test reports must be in JUnit XML format to appear on the Tests tab.
sidebar_position: 50
---

Results on the [Tests tab](./viewing-tests.md) are parsed from test reports specified in the **Report Paths** setting in **Run** and **Run Tests** steps. Test reports must be in [JUnit XML format](https://llg.cubic.org/docs/junit/) to appear on the **Tests** tab, because Harness parses test reports that are in JUnit XML format only.

## JUnit XML format resources

Use these resources to learn about JUnit XML formatting.

* [Common JUnit XML format and examples from Testmo](https://github.com/testmoapp/junitxml)
* [Examples of JUnit XML format mapping from IBM](https://www.ibm.com/docs/en/developer-for-zos/16.0?topic=formats-junit-xml-format)
* [Apache Ant JUnit schema](https://github.com/windyroad/JUnit-Schema)

## JUnit converters, formatters, and plugins

If your test tool doesn't automatically produce test results in JUnit XML format, JUnit converters, formatters, and plugins are available for all major languages. Some examples are provided below.

### C, C++

* [CTest --output-junit](https://cmake.org/cmake/help/latest/manual/ctest.1.html#cmdoption-ctest-output-junit)
### C#, .NET, NUnit

* [NUnit to JUnit](https://github.com/nunit/nunit-transforms/tree/master/nunit3-junit)
* [.NET trx2JUnit](https://github.com/gfoidl/trx2junit)

### Clojure

* [Kaocha JUnit Plugin](https://clojars.org/lambdaisland/kaocha-junit-xml)
* [Clojure.test JUnit Plugin](https://github.com/ruedigergad/test2junit)

### Java

* [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)

### JavaScript

* [ESLint JUnit Formatter](https://eslint.org/docs/latest/use/formatters/#junit)
* [Jest JUnit Reporter](https://www.npmjs.com/package/jest-junit)
* [Karma JUnit Reporter](https://www.npmjs.com/package/karma-junit-reporter)
* [Mocha JUnit Reporter](https://www.npmjs.com/package/mocha-junit-reporter)

### Ruby

* [RSpec JUnit Formatter](https://rubygems.org/gems/rspec_junit_formatter)
* [Minitest Junit Formatter](https://github.com/aespinosa/minitest-junit)
