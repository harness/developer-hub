The following setting is required for Security steps where the `policy_type` is `ingestionOnly`.

* `ingestion_file`  The results data file to use when running an Ingestion scan. You should specify the full path to the data file in your workspace, such as `/shared/customer_artifacts/my_scan_results.json`. STO steps can ingest scan data in [SARIF](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) and [Harness Custom JSON](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners) format. 

The following steps outline the general workflow for ingesting scan data into your pipeline:

   1. Specify a shared folder for your scan results, such as `/shared/customer_artifacts`. You can do this in the Overview tab of the Security stage where you're ingesting your data.

   2. Create a Run step that copies your scan results to the shared folder. You can run your scan externally, before you run the build, or set up the Run step to run the scan and then copy the results.

   3. Add a Security step after the Run step and add the `target name`, `variant`, and `ingestion_file` settings as described above. 

For a complete workflow description and example, go to [Ingest Scan Results into an STO Pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).