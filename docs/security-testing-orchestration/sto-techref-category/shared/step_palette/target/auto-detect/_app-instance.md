When auto-detect is enabled for application instances, the step detects these values as follows: 
  - The target is based on the **Instance Domain** and **Path** defined in the step or runtime input, for example `https://qa.jpgr.org:3002/login/us`.
  - The variant is the timestamp when the step scanned the instance.

Note the following:
- This option is behind the Feature Flag `STO_AUTO_TARGET_NAME_VARIANT`. Contact [Harness Support](mailto:support@harness.io) to enable it. <!-- (STO-6704) -->
- Auto-detection is not available when the **Scan Mode** is Ingestion. 
- This option might be visible but unavailable (grayed out) in older pipelines that were created before this feature was introduced.
- You should carefully consider the [baseline you want to specify](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines) for your instance target. Every target needs a baseline so you can identify issues in the scanned variant only vs. issues also found in the baseline. You have a few options:

  - Specify a RegEx baseline that captures timestamps. This ensures that every new scan compares issues in the new scan vs. the previous scan. Then it updates the baseline to the current scan.

    You can use this RegEx to capture timestamps: `\d{2}/\d{2}/\d{4}\,\s\d{2}\:\d{2}\:\d{2}`

  - Scan the baseline app using a manual variant name, then specify a fixed baseline for the target, and then enable auto-detect for future scans. This ensures that future scans get compared with the fixed baseline.

