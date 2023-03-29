Every Security step has a **Fail on Severity** (**`fail_on_severity`**) setting. If the scan finds any vulnerability with the specified severity or higher, the pipeline fails. It is good practice to include this setting in every Security step in an integrated pipeline. You can specify one of the following:
* **`CRITICAL`**
* **`HIGH`**
* **`MEDIUM`**
* **`LOW`**
* **`INFO`**