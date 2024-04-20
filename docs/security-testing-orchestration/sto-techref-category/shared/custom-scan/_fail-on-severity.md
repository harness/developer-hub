#### Fail on severity

If the scan finds any vulnerability with the specified [severity level](/docs/security-testing-orchestration/get-started/key-concepts/severities) or higher, the pipeline fails automatically. `NONE` means do not fail on severity.

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