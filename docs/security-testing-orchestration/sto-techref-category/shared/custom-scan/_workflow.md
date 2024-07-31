This workflow applies to scanner integrations that support [`orchestratedScan`](/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto) or [`dataLoad`](/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans) scan modes.

1. Add a **Build** or **Security** stage to your pipeline.

1. If you're scanning a code repository, set up your [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/).

2. Add a [Custom Scan](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) step.

3. Review the [Important notes for Custom Scan steps](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference#important-notes-for-custom-scan-steps) for additional requirements and relevant information.

   If you're setting up a scan on a Kubernetes or Docker build infrastructure, you need to add a [Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#docker-in-docker-requirements-for-sto) to the stage. 

4. Add the relevant `key:value` pairs to **Settings**.