```
Invoke-WebRequest -Uri https://github.com/harness/harness-cli/releases/download/v0.0.21-Preview/harness-v0.0.21-Preview-windows-amd64.zip -OutFile ./harness.zip
```

<!---
Potential Scarf cURL
Invoke-WebRequest -Uri 'http://harness.gateway.scarf.sh/v0.0.21-Preview/harness-v0.0.21-Preview-linux-amd64.tar.gz' -MaximumRedirection 10 -OutFile './harness-v0.0.21-Preview-linux-amd64.tar.gz' -PassThru -ErrorAction SilentlyContinue
-->
