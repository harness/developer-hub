

The Harness Policy Library includes the following [policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case) that make it easy to [create security test policies](/docs/security-testing-orchestration/policies/create-opa-policies#workflow-description) and enforce them against your scan results. 


<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

<!-- NOTE: FOR ANY UPDATES TO THIS LIST, YOU MUST ALSO UPDATE THE TOC IN POLICY DOCS HERE:

    https://developer.harness.io/docs/platform/governance/policy-as-code/sample-policy-use-case

 -->

- [Exclude vulnerabilities by severity](#exclude-vulnerabilities-by-severity)
- [Exclude vulnerabilities by reference ID](#exclude-vulnerabilities-by-reference-id)
- [Exclude vulnerabilities by title](#exclude-vulnerabilities-by-title)
- [Exclude vulnerabilities by number of occurrences](#exclude-vulnerabilities-by-number-of-occurrences)
- [Exclude vulnerabilities by CVE age](#exclude-vulnerabilities-by-cve-age)
- [Exclude vulnerabilities using STO output variables](#exclude-vulnerabilities-using-sto-output-variables)
- [Block the pipeline based on the code coverage results](#block-the-pipeline-based-on-the-code-coverage-results)

<!-- TOC end -->


#### Exclude vulnerabilities by severity

Apply a policy to a scan step to warn or block on any vulnerabilities with the specified severity. 

You must copy the entire sample code from the OPA policy library, as described in [Create a new Security Tests OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#create-a-new-security-tests-opa-policy).

Here is a sample policy that you can evaluate using the **On Step** event for a scan step. 

:::note

This policy sample supports the following vulnerabilities only: `Critical`, `High`, `Medium`, `Low`, and `Info`. To create policies based on output variables such as `NEW_CRITICAL`, go to [Exclude vulnerabilities using STO output variables](#exclude-vulnerabilities-using-sto-output-variables).

:::

```json

package securityTests

import future.keywords.in
import future.keywords.if

# Define a set of severities that are denied (Critical, High, Medium, Low, Info)
# The following example denies if the scan results include any issue with a severity of Critical or High.

deny_list := fill_defaults([
  {
    "severity": {"value": "Critical", "operator": "=="}
  },
  {
    "severity": {"value": "High", "operator": "=="}
  }
])

```

#### Exclude vulnerabilities by reference ID

Apply a policy to a scan step to warn or block on any vulnerabilities in a specific list of CVEs or CWEs. 

You must copy the entire sample code from the OPA policy library, as described in [Create a new Security Tests OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#create-a-new-security-tests-opa-policy).

Here is a sample policy that you can evaluate using the **On Step** event for a scan step.

```json

package securityTests

import future.keywords.in
import future.keywords.if

# Define a set of reference-identifiers that are denied
# The following policy denies if the scan results include any occurrence of 
#  - cwe-772
#  - cve-2019-14250
#  - CWE-772
#  - CVE-2019-14250

deny_list := fill_defaults([
  {
    "refId": {"value": "772", "operator": "=="},
    "refType": {"value": "cwe", "operator": "=="}
  },
     {
    "refId": {"value": "772", "operator": "=="},
    "refType": {"value": "CWE", "operator": "=="}
  },
  {
    "refId": {"value": "2019-14250", "operator": "=="},
    "refType": {"value": "cve", "operator": "=="}
  },
 {
    "refId": {"value": "2019-14250", "operator": "=="},
    "refType": {"value": "CVE", "operator": "=="}
  }
])

```

#### Exclude vulnerabilities by title

Apply a policy to a scan step to warn or block on any vulnerabilities in a specific list of issue titles. 

You must copy the entire sample code from the OPA policy library, as described in [Create a new Security Tests OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#create-a-new-security-tests-opa-policy).

You can use the `~` operator to find titles based on [Python regular expressions](https://docs.python.org/3/library/re.html). 

Here is a sample policy that you can evaluate using the **On Step** event for a scan step.

```json

package securityTests

import future.keywords.in
import future.keywords.if

# Define a set of titles that are denied
# The following example denies if the scan results include any issues related to `tar@1.34` or `libsqlite3`

deny_list := fill_defaults([
  {
    "title": {"value": "tar@1.34", "operator": "~"}
  },
  {
    "title": {"value": "libsqlite3", "operator": "~"}
  }
])

```

#### Exclude vulnerabilities by number of occurrences

Apply a policy to a scan step to warn or block vulnerabilities based on a set of titles and the maximum allowed number of occurrences for each vulnerability. 

You must copy the entire sample code from the OPA policy library, as described in [Create a new Security Tests OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#create-a-new-security-tests-opa-policy).

You can use the `~` operator to find titles based on [Python regular expressions](https://docs.python.org/3/library/re.html). 

Here is a sample policy that you can evaluate using the **On Step** event for a scan step.

```json

package securityTests

import future.keywords.in
import future.keywords.if

# Define a set of titles and maximum occurrences that are denied
# The following example denies on scan results with more than 25 occurrences of TAR- or cURL-related issues

deny_list := fill_defaults([
  {
    "title": {"value": ".*tar.*", "operator": "~"},
    "maxOccurrences": {"value": 25, "operator": ">="},
  },
  {
    "title": {"value": ".*curl.*", "operator": "~"},
    "maxOccurrences": {"value": 25, "operator": ">="},
  }
])

```

#### Exclude vulnerabilities by CVE age

Apply a policy to a scan step to warn or block vulnerabilities based on CVEs by severity and age. 

You must copy the entire sample code from the OPA policy library, as described in [Create a new Security Tests OPA policy](/docs/security-testing-orchestration/policies/create-opa-policies#create-a-new-security-tests-opa-policy).

Here is a sample policy that you can evaluate using the **On Step** event for a scan step.

```json

package securityTests

import future.keywords.in
import future.keywords.if

# Define a set of CVE ages (as old/older than given year) and severities (equal/greater than) that are denied
# This example denies CVEs for any of the following filters:
#   - Critical severities, new (2021 or earlier)
#   - High severities, old (2018 or earlier)
#   - Medium severities, very old (2015 or earlier)

deny_list := fill_defaults([
  {
    "year": {"value": 2023, "operator": "<="},
    "severity": {"value": "Critical", "operator": "=="}
  },
    {
    "year": {"value": 2018, "operator": ">="},
    "severity": {"value": "High", "operator": "=="}
  },
  {
    "year": {"value": 214, "operator": "<="},
    "severity": {"value": "Medium", "operator": "=="}
  }
])

```

#### Exclude vulnerabilities using STO output variables

You can create policies based on the [output variables](/docs/security-testing-orchestration/get-started/key-concepts/output-variables) generated by an STO scan step. 

For example, suppose you want a policy to warn or block if a scan step finds any new vulnerabilities with severities of Critical or High. In this case, you can [create a policy](#create-a-new-opa-policy) with the following OPA code: 

   ```
    package pipeline_environment

    # Warn or block if the scan step detects any NEW_CRITICAL or NEW_HIGH vulnerabilities 

   deny[sprintf("Scan can't contain any NEW_CRITICAL vulnerability '%s'", [input[_].outcome.outputVariables.NEW_CRITICAL])] {
       input[_].outcome.outputVariables.NEW_CRITICAL != "0"
   }

   deny[sprintf("Scan can't contain any high vulnerability '%s'", [input[_].outcome.outputVariables.NEW_HIGH])] {
       input[_].outcome.outputVariables.NEW_HIGH != "0"
   }
   ```

#### Block the pipeline based on the code coverage results

Apply a policy to the scan step to either warn or block the pipeline based on the code coverage value. You can use the sample policy **Security Test - Code Coverage**. Below is a sample policy for reference:

```
package securityTests

import future.keywords.in
import future.keywords.if

# Define a set of Output Variables that are denied
deny_list :=([
# Fail if CODE_COVERAGE is less than 50.0
  {
    "name": "CODE_COVERAGE", "value": 50.0, "operator": "<"
  },
# Optionally define more Output Variables here
#  {
#    "name": "HIGH", "value": 0, "operator": ">"
#  }
])
```