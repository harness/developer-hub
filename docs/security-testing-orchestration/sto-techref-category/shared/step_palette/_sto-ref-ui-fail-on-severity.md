Every Security step has a **Fail on Severity** setting. If the scan finds any vulnerability with the specified severity or higher, the pipeline fails. It is good practice to include this setting in every Security step in an integrated pipeline. For more information, go to [Severity scores and levels](https://developer.harness.io/docs/security-testing-orchestration/onboard-sto/severities).

You can specify one of the following:
* **`CRITICAL`**
* **`HIGH`**
* **`MEDIUM`**
* **`LOW`**
* **`INFO`**
* **`NONE`**  — Do not fail on severity

The YAML definition looks like this: `fail_on_severity : medium  # critical | high | medium | low | info | none`
