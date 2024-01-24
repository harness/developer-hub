#### Target name

A descriptive, unique identifier for the [target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines). STO can [auto-detect](#auto-detecting-the-target-and-variant) the target in some cases.

Descriptive target names make it much easier to navigate your scan results in the STO UI.

It is good practice to [specify a baseline](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines#why-you-should-define-a-baseline-for-every-sto-target) for every target. 

#### Variant 

This is usually the branch name, image tag, or another unique identifier such as a timestamp or version number. STO maintains a historical trend for each variant. STO can [auto-detect](#auto-detecting-the-target-and-variant) the variant in some cases. 

You can see all scanned variants for a target in **Test Targets**:

<DocImage path={require('../../static/variants-in-test-targets.png')} width="60%" height="60%" title="Click to view full size image" />


#### Auto-detecting the target and variant

Harness STO can auto-detect the target and variant for some orchestration and extraction scans. This option is not available for ingestion scans. 

<details>
<summary>How STO auto-detects the target and variant</summary>

- Code repositories 
  - To determine the target, STO runs `git config --get remote.origin.url`. 
  - To determine the variant, STO runs `git rev-parse --abbrev-ref HEAD`. The default assumption is that the `HEAD` branch is the one you want to scan.
- Container images  
  - The target and variant are based on the container image name and tag specified in the step or runtime input.  
- Application instances
  - The target is based on the domain specified in the step or runtime input, for example `https://qa.jpgr.org:3002/login/us`.
  - The variant is the timestamp when the instance got scanned.  

</details>