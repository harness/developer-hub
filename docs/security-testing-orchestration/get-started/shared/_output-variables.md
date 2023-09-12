When a scan step finishes successfully, it generates the following output variables for the number of issues detected for each severity level:
  - CRITICAL
  - HIGH
  - MEDIUM
  - LOW
  - IGNORED — The number of issues that were detected but ignored due to exemptions  
  - TOTAL 

Scan steps also generate a set of "new" variables you can use to determine the next stage of your pipeline. These variables show the number of new issues detected in the current scan compared to the last scan. If this is the first scan for the target, these variables reflect new issues compared to the baseline. You can use these variables to determine the next stage of your pipeline:
  - NEW_CRITICAL
  - NEW_HIGH
  - NEW_MEDIUM
  - NEW_LOW
  - NEW_UNASSIGNED (Reserved for future use)
  - NEW_TOTAL 