Auto-detection is not available for ingestion scans.

<details>
<summary>How does a step detect the target and variant?</summary>

The target type determines how a step detects these values:

- Code repositories 
  - To detect the target, STO runs `git config --get remote.origin.url`. 
  - To detect the variant, STO runs `git rev-parse --abbrev-ref HEAD`. The default assumption is that the `HEAD` branch is the one you want to scan.
- Container images  
  - The target and variant are based on the container image name and tag specified in the step or runtime input.  
- Application instances
  - The target is based on the domain specified in the step or runtime input, for example `https://qa.jpgr.org:3002/login/us`.
  - The variant is the timestamp when the instance got scanned.

</details>
