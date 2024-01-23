Harness STO can auto-detect the target and variant for some orchestration and extraction scans. This option is not available for ingestion scans. 

<details>
<summary>How STO auto-detects the target and variant</summary>

- Code repositories 
  - The target is based on the repository name in the codebase. 
  - To determine the variant, STO runs `git rev-parse --abbrev-ref HEAD`. The default assumption is that the `HEAD` branch is the one you want to scan.
- Container images  
  - For orchestration scans, STO uses the container image name and tag specified in the step or runtime input. 
  - Auto-detection is not available for ingestion scans. 
- Application instances
  - For orchestration scans, the target and variant are based on the domain specified in the step or runtime input. Suppose the domain is specified as `https://my.app.internal.com:3000/login/test`.
  - The target is based on the scheme, domain, and port: `https://my.appspot.com:447`
  - The variant is based on the remaining path: `/login/test`  

</details>