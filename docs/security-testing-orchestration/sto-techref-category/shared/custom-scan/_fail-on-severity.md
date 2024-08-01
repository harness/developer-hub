If the scan finds any vulnerability with the specified [severity level](/docs/security-testing-orchestration/get-started/key-concepts/severities) or higher, the pipeline fails automatically. `NONE` means do not fail on severity.

For more information, go to: 

- [STO workflows for blocking builds and PRs](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/stop-pipelines-overview).
- [Exemptions to override Fail on Severity thresholds for specific issues in STO](/docs/security-testing-orchestration/exemptions/exemption-workflows)

###### Key
```
fail_on_severity
```
###### Value


```
CRITICAL
```
```
MEDIUM
```
```
LOW
```
```
INFO
```
```
NONE
```