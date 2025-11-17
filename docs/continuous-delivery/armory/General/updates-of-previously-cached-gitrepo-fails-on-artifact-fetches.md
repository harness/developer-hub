---
title: Updates of Previously Cached gitrepo Fails on Artifact Fetches
---

## Issue
Git binary is used for the git clone operations in Spinnaker.If you have caching turned on in Spinnaker, Git will reject updates to a previously cloned repo with the following error message: 
`error.message:[sh, -c, git pull] failed. Error: 
hint: You have divergent branches and need to specify how to reconcile them. 
hint: You can do so by running one of the following commands sometime before
hint: your next pull: hint: hint: git config pull.rebase false # merge 
hint: git config pull.rebase true # rebase 
hint: git config pull.ff only # fast-forward only hint: 
hint: You can replace "git config" with "git config --global" to set a default 
hint: preference for all repositories. You can also pass --rebase, --no-rebase, 
hint: or --ff-only on the command line to override the configured default per 
hint: invocation. fatal: Need to specify how to reconcile divergent branches.
Note that the Git Repo Caching option requires a change to the configuration to be enabled and is not on by default. 

## Cause
As indicated in the error message, once caching is turned on, it is a requirement for divergent branches to have pre-defined specifications for reconciling them.  

