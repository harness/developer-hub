This workflow applies to scanner integrations that support Ingestion mode.

1. Add a Build or Security stage to your pipeline.

2. Add a Run step and set it up to save your scan results to a shared folder. 

   For more information, go to [Run an ingestion scan in an STO Pipeline](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline).

3. Add a [Custom Scan](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) step.

4. Review the [Important notes for Custom Scan steps](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference#important-notes-for-custom-scan-steps) for additional requirements and relevant information. 

5. Add the relevant `key:value` pairs to **Settings**.