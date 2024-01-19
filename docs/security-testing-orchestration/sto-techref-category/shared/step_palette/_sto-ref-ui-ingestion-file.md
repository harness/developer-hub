The data file to ingest when running an [Ingestion scan](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline). 

- The data file must be in a [supported format](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#supported-ingestion-formats) for the scanner.

- The data file must be accessible to the scan step. If you ran the scan in a previous step, you can save the file in or under `/harness`. If you ran the scan outside the stage, you can add a [shared path for the stage](/docs/continuous-integration/get-started/key-concepts#stages) (go to **Shared Paths** in the stage overview) and save it there. 