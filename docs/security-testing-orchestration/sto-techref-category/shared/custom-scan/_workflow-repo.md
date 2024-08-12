1. Add a Build or Security stage to your pipeline.

1. If you're setting up an [`orchestratedScan`](/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto) or a [`dataLoad`](/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans) scan of a code repository, set up your [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/).

1. If you're setting up an [`ingestionOnly`](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline) scan, add a Run step and set it up to save your scan results to a shared folder. 

   The step might run the scan locally, download results from an external source, or copy results from another location in the workspace into the shared folder.

2. Add a [Custom Scan](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) step.

3. Review the [Important notes for Custom Scan steps](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference#important-notes-for-custom-scan-steps) for additional requirements and relevant information.

   If you're running an orchestrated or extraction scan on a Kubernetes or Docker build infrastructure, you need to add a [Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#docker-in-docker-requirements-for-sto) to the stage. 

4. Add the following `key:value` pairs to **Settings**.