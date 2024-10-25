---
title: Deploy manifest performs SpEL substitution even if Skip SpEL Evaluation is checked
---

## Issue
A pipeline can be created that ingests a manifest and deploys it using the ```Deploy (Manifest)``` stage. As a part of the process, the manifest has some dynamic pieces that will need to be evaluated at runtime, with the syntax ```${variable}```. However, even with having checked the ```Skip SpEL evaluation``` option, the variables still end up getting evaluated and replaced before being sent to Kubernetes.
Using a known workaround to escape the evaluator with syntax like ```${"${variable}"}``` yields the same results - the variable is still evaluated.

## Cause
This is a known issue, raised in:[https://github.com/spinnaker/spinnaker/issues/5910](https://github.com/spinnaker/spinnaker/issues/5910)...with target release of OSS 1.27 (mapping to Armory 2.27.2)
If SpEL expressions are instead evaluated for lines that have been commented out, see [Spinnaker Improperly Errors Even When SPEL Expressions Are Commented Out](https://support.armory.io/support?sys_kb_id=4ff1857d1b9dfc1013d4fe6fdc4bcb0b&id=kb_article_view&sysparm_rank=1&sysparm_tsqueryId=a67775581bb1c110ec88b8c2cc4bcb58).

