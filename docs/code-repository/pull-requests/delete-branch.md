---
title: Delete Branch After PR Merge or Close
description: Delete source branches after pull requests are merged or closed in Harness Code.
sidebar_position: 45
---

Harness Code lets you easily delete the source branch of a pull request after it’s merged or closed, helping teams keep their repositories clean and reducing stale branches.

<DocImage path={require('/docs/code-repository/pull-requests/static/delete-branch-post-merge.png')} />

## When the Delete Branch option appears

After a pull request is **merged** or **closed**, a **Delete Branch** button appears on the PR page if the following conditions are met:

- The source branch has **not already been deleted**.
- The source branch has **not been updated** since the PR was created.
- The branch deletion is **allowed by the branch rule**, or the current user is in the **bypass list** for that rule.

## When the button is not shown

You won't see the **Delete Branch** button if:

- The source branch has already been deleted.
- The source branch has received new commits since the PR was opened (to prevent accidental deletion of ongoing work).
- A branch rule exists that **prevents deletion**, and you are **not listed in the bypass list** for that rule.

## How to delete a branch manually

If the delete button isn’t available, you can still delete the branch manually from the **Branches** tab of the repository—assuming you have permission and there’s no protection rule preventing it.
