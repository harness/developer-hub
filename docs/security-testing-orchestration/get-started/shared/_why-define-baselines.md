
[Every target needs a baseline](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines) to enable the full suite of STO features. Here's why:

  - For developers, it’s critical to distinguish between security issues in the baseline vs. issues in the variant you’re working on.  Thus if you’re working in a downstream branch, you want to detect and resolve issues in your branch (the variant) before merging, so you don’t introduce them into the main branch (the baseline). 

 - When you scan a variant of a target with a baseline defined, the scan results make it easy to identify issues in the variant only (“your” issues) vs. issues also found in the baseline. The [Security Tests tab](/docs/security-testing-orchestration/dashboards/view-scan-results) divides these issues into two lists:

    - **Only in \<_target_>:\<_variant_>** Issues found in the scanned variant only.

    - **Common to \<_target_>:\<_baseline_>** Issues also found in the target baseline.

  - The [STO Overview](/docs/security-testing-orchestration/dashboards/sto-overview) and [Security Testing Dashboard](/docs/security-testing-orchestration/dashboards/security-testing-dashboard) show detected issues for targets with baselines defined. While individual scan results focus on variant issues, these views focus on baseline issues. These views enable security personnel and other non-developers to monitor, investigate, and address issues in production-ready targets and view vulnerability trends over time.  

  - In short, baselines make it easy for developers to drill down into “shift-left” issues in downstream variants and security personnel to drill down into “shift-right” issues in  production targets. 

<!-- 
You can specify dynamic baselines using regular expressions for different target types. When you scan a variant that matches the regex for that target type — i.e. `^(main|master)$` for a code repo — the target baseline updates automatically. 

Harness STO includes predefined default regexes for code repositories and container images.
-->
