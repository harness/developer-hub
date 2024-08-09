When **Auto** is enabled for application instances, the step detects these values as follows: 
  - The target is based on the **Instance Domain** and **Path** defined in the step or runtime input, for example `https://qa.jpgr.org:3002/login/us`.
  - The variant is the UTC timestamp when the step scanned the instance.

Note the following:
- **Auto** is not available when the **Scan Mode** is Ingestion. 
- **Auto** is the default selection for new pipelines. **Manual** is the default for old pipelines, but you might find that neither radio button is selected in the UI.
- You should carefully consider the [baseline you want to specify](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines) for your instance target. Every target needs a baseline to enable the full suite of STO features. Here are a few options:

  - Specify a RegEx baseline that captures timestamps. This ensures that every new scan compares issues in the new scan vs. the previous scan. Then it updates the baseline to the current scan.

    You can use this RegEx to capture timestamps: `\d{2}/\d{2}/\d{4}\,\s\d{2}\:\d{2}\:\d{2}`
    
  - Specify a fixed baseline. 
    1. Scan the instance using a manual variant name.
    2. Select the baseline as a fixed value. 
    3. Update the step to use auto-detect for future scans. 
    
    This ensures that future scans get compared with one fixed baseline.





