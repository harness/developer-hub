---
title: Fix issues using AI-enhanced remediation steps
description: Enhanced remediation using Harness AI Development Assistant (AIDA)
sidebar_position: 5
---

:::note

Currently, AIDA for STO is a beta feature that is behind the feature flag `STO_AI_ENHANCED_REMEDIATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

<!-- style>

.green {
    color: green;
    font-weight:700;
    font-size: 30px;
}

.hidden {
   display: none;
}
</style -->

```mdx-code-block
import remediation_issue from '../static/ai-remediation-issue.png'
import remediate_indiv_occurrences from '../static/ai-remediation-occurrences.png'
import remediate_occurrence_three from '../static/ai-remediation-occurrence-3.png'
import remediate_issue_refine from '../static/ai-remediation-issue-refine.png'
```

Harness AI Development Assistant (AIDA) uses state-of-the-art AI technology to streamline the process of triaging and fixing security vulnerabilities. For every vulnerability detected by STO, Harness AIDA explains the issue precisely and provides detailed advice  — including code changes and package upgrades — on how to fix it. Harness AIDA is based on large, well-trained language models. It learns continuously based on feedback and the latest public knowledge. Optionally, you can regenerate advice with additional context and thereby optimize your results. 

Harness AIDA reduces developer toil by streamlining and simplifying the process of fixing vulnerabilities. It enables developers and security personnel to manage security-issue backlogs and address critical issues promptly. Harness AIDA can dramatically reduce your TTR, speed up your software development lifecycle, and improve the security posture of your applications and services.

![](../static/ai-remediation-issue.png)


## Important notes

* Before you can use Harness AIDA, you must read the [AIDA Data Privacy Overview](https://www.harness.io/legal/aida-privacy) and sign an [End-user license agreenment](https://www.harness.io/legal/aida-terms) with Harness. 

* Before you implement an AI-generated suggestion, consider carefully the reliability and extent of the publicly-known information about that issue. The accuracy, reliability, and completeness of a suggestion depends on the publicly-known information about the detected issue. An AI-generated suggestion is not guaranteed to remediate the issue and could possibly introduce other issues. 

* You should also consider the suggestion's applicability to your specific target and use case. An issue might have no known remediation, especially if it was recently discovered. An issue might have multiple suggested remediations that are contradictory or applicable only to specific use cases. 

* A specific remediation might involve installing components with usage and license requirements. Check any requirements in advance. 

* The workflow description below shows how you can refine a suggestion by providing more information, such as additional context or code snippets, to Harness AIDA.

## Workflow description

1. When you go to **Security Tests** and then select an issue, an initial **AI enhanced remediation** appears in **Issue Details**. 

   This suggested remediation is based on public information about the CVE or CWE and the first detected occurrence (**Occurrence 1**) in the target. If the scanner captures the code snippet where the vulnerability is occurring, the query to Harness AIDA includes this snippet as well.    

      ```mdx-code-block
      <img src={remediation_issue} alt="Generate a new remediation using additional information." height="50%" width="50%" />
      ```

2. If you want to optimize the advice with additional information or context, do the following: 

   1. Select **Edit Input**. 

   2. Specify the occurrence, reference ID, and language (if you've scanned a codebase). 
   
     Harness AIDA can often auto-detect the language of a code snippet, but it's good practice to confirm that the language setting is correct. 

   3. Add any additional context in the text pane. For example, you might want to include relevant code immediately before the snippet where the vulnerability was identified, in addition to the snippet itself. Then select **Generate**.   

       ```mdx-code-block
      <img src={remediate_issue_refine} alt="Generate a new remediation using additional information." height="50%" width="50%" />
      ```

3. To generate remediations for another occurrence, do the following:

   1. In **Issue Details**, scroll down to the occurrence of interest and then select **Unsure how to remediate? Ask AI**. (You might need to wait a few seconds for the remediation to appear.)

      ```mdx-code-block
      <img src={remediate_indiv_occurrences} alt="Generate AI-enhanced remediations for individual occurrences." height="50%" width="50%" />
      ```

   2. To further refine the suggested remediation with an additional code snippet, select **Edit Snippet** and then re-generate.

      ```mdx-code-block
      <img src={remediate_occurrence_three} alt="Generate AI-enhanced remediations for a specific occurrence." height="50%" width="50%" />
      ```
      
