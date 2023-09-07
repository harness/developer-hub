Every scan step has a `fail_on_severity` setting that takes a specific severity level as its value: critical, high, low, and so on. If the scanner detects any issue at the specified level or higher, the pipeline fails with an error.

In some cases, developers might want to create exemptions ("ignore rules") that override the `fail_on_severity` setting. If an issue is marked as Ignored, it will not fail the Pipeline. Developer users cannot create exemptions; only SecOps users have this permission.

Harness provides two pre-defined roles for STO:

* **Developer** role — Permissions for developers. A Developer can set up security pipelines, run scans, and view results. A Developer can also request (but not approve) exemptions for specific issues.
* **SecOps** role — Permissions for Security Operations staff. This role includes all Developer permissions. In addition, SecOps users can approve exemptions. 