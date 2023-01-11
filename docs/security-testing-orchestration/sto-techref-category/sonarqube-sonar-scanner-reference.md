---
title: SonarQube SonarScanner Reference
description: This topic describes how to configure a step to scan a repository using SonarQube. STO supports all languages supported by SonarScanner.
sidebar_position: 60
helpdocs_topic_id: 4qe4h3cl28
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

You can set up a Security step with [SonarQube SonarScanner](https://docs.sonarqube.org/latest/) to analyze your code repos and ensure that they are secure, reliable, readable, and modular, among other key attributes.

### Important Notes

* STO supports repository scanning only for SonarScanner.
* STO supports all languages supported by SonarScanner.
* Before you scan your repo, make sure that you perform any prerequisites for the language used in your repo. If you are scanning a Java repo with more than one Java file, for example, you must compile `.class` files before you run the scan.  
Go to the [SonarQube language reference](https://docs.sonarqube.org/latest/analysis/languages/overview/) for details about specific language requirements.

### Scan types

STO supports the following scan types for SonarQube:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
* `dataLoad`  — The pipeline downloads scan results using the [SonarScanner API](https://docs.sonarqube.org/latest/extend/web-api/).
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](../use-sto/ingest-scan-results-into-an-sto-pipeline.md).

### Required settings

* `product_name` = `sonarqube`
* `scan_type` = `repository`
* `product_config_name` = `default` — Runs a SonarQube scan with default settings.
* `policy_type` — Enter one of the following:
	+ `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
	+ `dataLoad`  — The pipeline downloads scan results using the [SonarScanner API](https://docs.sonarqube.org/latest/extend/web-api/).
	+ `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](/docs/security-testing-orchestration/use-sto/ingest-scan-results-into-an-sto-pipeline).
* `repository_project` — The repository name. If you want to scan `https://github.com/my-github-account/codebaseAlpha`, for example, you would set this to `codebaseAlpha`.
* `repository_branch` — The git branch to scan. You can specify a hardcoded string or use the runtime variable [`<+codebase.branch>`](../../continuous-integration/ci-technical-reference/built-in-cie-codebase-variables-reference.md#manual-branch-build). This sets the branch based on the user input or trigger payload at runtime.

### `ingestionOnly` settings

For information about setting up an ingestionOnly scan, go to [Ingest scan results into an STO pipeline](../use-sto/ingest-scan-results-into-an-sto-pipeline.md).

###  `orchestratedScan` and `dataLoad` settings

* `product_domain` — The URL of the SonarQube server.
* `product_access_token` — The access token to communicate with the SonarQube server. You must create a secret for the token and use the format `<+secrets.getValue("secret_name")>` to reference the secret. See [Use Encrypted Text Secrets](../../first-gen/firstgen-platform/security/secrets-management/use-encrypted-text-secrets.md).  
Go to the [SonarQube docs](https://docs.sonarqube.org/latest/user-guide/user-token/) for information about creating tokens.
* `product_project_name`—The name of the SonarQube project. This is the also the target name in the Harness UI (Security Tests > Test Targets).
* `product_project_key` — The unique identifier of the SonarQube project you want to scan. Look for `sonar.projectKey` in the **sonar-project.properties** file.
* `product_exclude` — If you want to exclude some files from a scan, you can set the sonar.exclusions key in your SonarQube project. See [Narrowing the Focus](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/) in the SonarQube docs.
* `product_java_binaries` — When scanning Java, you need to set the `sonar.java.binaries` key in SonarQube. This is a list of comma-separated paths with the compiled bytecode that correspond to your source files. See [Java](https://docs.sonarqube.org/latest/analysis/languages/java/) in the SonarQube docs.
* `product_java_libraries` — `sonar.java.binaries` is a comma-separated list of paths to files with third-party libraries (JAR or Zip files) used by your project. See [Java](https://docs.sonarqube.org/latest/analysis/languages/java/) in the SonarQube docs.

