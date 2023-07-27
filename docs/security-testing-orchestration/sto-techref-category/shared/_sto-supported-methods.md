Harness Security Testing Orchestration integrates with multiple scanners and targets. Different types of scan approaches can be done on each scanner-target combination:

* **Orchestrated (`orchestratedScan`) Scans**  are fully orchestrated. A Security step in the Harness pipeline orchestrates a scan and then normalizes and compresses the results.
* **Extraction (`dataLoad`) Scans** are partially orchestrated. The Security step pulls scan results from an external SaaS service and then normalizes and compresses the data.
* **Ingestion (`ingestionOnly`) Scans**  are not orchestrated. The Security step ingests results from a previous scan (for a scan run in a previous step), and then normalizes and compresses the results. 