:::note
It is good practice to specify a baseline for every target, for the following reasons. To define your baselines, go to **Security Tests** (left menu) > **Test Targets**. Each target has a **Baseline for Comparison** menu.

* For developers, it’s critical to distinguish between security issues in the baseline vs. issues in the variant you’re working on.  Thus if you’re working in a downstream branch, you want to detect and resolve issues in your branch (the variant) before merging, so you don’t introduce them into the main branch (the baseline). 

* When you scan a variant of a target with a baseline defined, the scan results make it easy to identify issues in the variant only (“your” issues) vs. issues also found in the baseline. 

* The [STO Overview](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/sto-overview) and [Security Testing Dashboard](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/security-testing-dashboard) show detected issues for targets with baselines defined. While individual scan results focus on variant issues, these views focus on baseline issues. These views enable security personnel and other non-developers to monitor, investigate, and address issues in production-ready targets and view vulnerability trends over time.  

* In short, defining a baseline makes it easy for developers to drill down into “shift-left” issues in downstream variants and security personnel to drill down into “shift-right” issues in  production targets. 
:::