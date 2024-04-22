If the scan finds any vulnerability with the specified [severity level](/docs/security-testing-orchestration/get-started/key-concepts/severities) or higher, the pipeline fails automatically. `NONE` means do not fail on severity.

For more information, go to [Stop builds based on scan results](/docs/category/stop-builds-based-on-scan-results).

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