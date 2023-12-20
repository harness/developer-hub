```bash
curl -LO harness.gateway.scarf.sh/v0.0.18-Preview/harness-v0.0.18-Preview-darwin-amd64.tar.gz
tar -xvf harness-v0.0.18-Preview-darwin-amd64.tar.gz 
export PATH="$(pwd):$PATH" 
echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile  
source ~/.bash_profile 
harness --version
```

<!---
Non Scarf cURL
curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.18-Preview/harness-v0.0.18-Preview-darwin-amd64.tar.gz 
-->