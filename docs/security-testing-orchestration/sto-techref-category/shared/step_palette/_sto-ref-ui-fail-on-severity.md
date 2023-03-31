Every Security step has a **Fail on Severity** setting. If the scan finds any vulnerability with the specified [severity level](/docs/security-testing-orchestration/onboard-sto/severities) or higher, the pipeline fails. It is good practice to include this setting in every Security step in an integrated pipeline. You can specify one of the following:
* **`CRITICAL`**
* **`HIGH`**
* **`MEDIUM`**
* **`LOW`**
* **`INFO`**
* **`NONE`** — Do not fail on severity

The YAML definition looks like this: `fail_on_severity : critical # | high | medium | low | info | none`