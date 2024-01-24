Harness STO can auto-detect the target and variant for some orchestration and extraction scans. This option is not available for ingestion scans. 

<details>
<summary>How STO auto-detects the target and variant</summary>

- Code repositories 
  - The target is based on the repository name in the codebase. 
  - To determine the variant, STO runs `git rev-parse --abbrev-ref HEAD`. The default assumption is that the `HEAD` branch is the one you want to scan.
- Container images  
  - The target and variant are based on the container image name and tag specified in the step or runtime input.  
- Application instances
  - The target and variant are based on the domain specified in the step or runtime input. Suppose the domain is `https://qa.jpgr.org:3002/login/us`.
  - The target is based on the scheme, domain, and port: `https://my.appspot.com:3002`
  - The variant is based on the remaining path: `/login/us`  

</details>
