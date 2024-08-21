---
description: KB - Template Management
title: Managing git-synced template versions
---

# How can I develop and publish new versions of a git-synced template?

[Harness templates](https://developer.harness.io/docs/platform/templates/template/) are a powerful tool for managing deployment patterns across your organizations. You can develop and store templates using the Harness UI, creating new versions and releasing stable tags after validation is complete, but this workflow can be complex when storing your templates in a git repository

## Example workflow

Let's say you have a current template "Deploy to Kubernetes" that encompass how developers should deploy to bespoke clusters across your organization. After initial development you create a new Harness template and version it `0.0.1` and set it as stable. You decide to store your templates in git. For this example we will say your "main" git branch is called `main`.

### Making changes

If you need to make changes to a template, you can use the Harness UI to change your template, as save your changes to the same `0.0.1` version, which will make a commit to git to update the template YAML. You could also have made these changes directly in git.

What if your change needs to be tested first? Or your change introduces a new template input, which would be considered a "breaking change"?

### Creating new versions

When editing a template in the Harness UI, you have the option to `Save as new version` rather than saving over the current. When you use git to store you template this will create a new file in your repo with the version number appended.

Let's say you make a change, adding a new input to your template. You could save your change as a new version `0.0.2` and push directly to the `main` branch. This would create a new version immediately available to all consumers to leverage in their pipelines.

### Feature branches

Let's say you have another change, but need to do some testing before you release the new version to your users, or your git repository does not support pushing directly to the `main` branch.

In this scenario you make your changes in the Harness UI, save your change as a new version `0.0.3`, and push it to a new branch `feat/0.0.3`.

When a consumer of your template goes to check out new versions, they will see a `0.0.3` version in the dropdown, but when selecting it they will get a `not found` error. This is because your version lives on a feature branch, and not the main branch of your template.

#### Testing changes

As the template developer, if you need to test your `0.0.3` version in a pipeline, you can accomplish this by create a pipeline that is synced to the same git repository as your template. Then by switching your pipeline to the `feat/0.0.3` branch, you will be able to choose the `0.0.3` version of your template.

From here you can test and iterate on your `0.0.3` version.

#### Trunk based development

If another developer on your team also needs to make changes to the template, they can make their changes in the Harness UI and save them to the same `0.0.3` version and `feat/0.0.3` branch. This is not best practice as you are combining multiple workstreams into a single branch.

Instead the developer should save their changes as a `0.0.4` version on a new branch called `feat/0.0.4`. They can test their changes by using a pipeline synced to the same branch, as described above.

#### Rebasing

At some point a new version on a feature branch will be merged into `main`, let's say your branch `feat/0.0.3` is merged to `main`, and now the `0.0.3` version is available for consumers.

Now the developer working on `0.0.4` can merge (or rebase) the `main` branch into the `feat/0.0.4` branch. This will being the `0.0.3` versioned template yaml into their branch.

At this point they can compare their `0.0.4` template yaml with the new `0.0.3` yaml and apply the changes as needed. When complete, they can merge their `feat/0.0.4` branch into `main` to release the version to consumers.
