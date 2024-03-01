---
title: Use Feature Flags for trunk-based development
description: Get started with trunk-based development.
sidebar_position: 5
redirect_from:
  - /tutorials/feature-flags/trunk-based
  - /tutorials/feature-flags/getting-started/trunk-based-development
  - /tutorials/category/getting-started-with-ff
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Feature Flags Certification today!"
  link="/university/certifications/feature-flags"
  closable={true}
  target="_self"
/>

Trunk-based development or TBD is one of a few different branching strategies that you and your team can use to quickly bring features into the main branch of your workflow. In order for your team to run like a well oiled machine, having a branching strategy at the forefront of your development practices is key to getting code out the door quickly. All branching strategies can achieve that, but trunk-based development (TBD) gives you extra leverage without messy and complex merge conflicts.

You may have heard the term "merge hell", and one of the catalysts for that is what I call the "rebase race". A rebase race is a rush to rebase changes pulled in from main in order to merge your changes, while having your fingers crossed that nothing breaks. We have ALL been there. It isn't fun. One benefit of trunk-based development is avoiding merge hell by making small, frequent commits to the main branch.

## The power of trunk-based development

To understand trunk-based development (TBD) best, it may be helpful to start with how most engineering teams work today:

1. Developers make a new feature branch for each initiative.
2. After some amount of time, when they deploy and test their feature in a specific environment, they will merge that into a lower env branch, such as dev or QA.
3. Most of the time, they will keep working on the feature branch, and merge at infrequent intervals going forward.
4. On fixed, recurring occasions, the lower level branches like dev and QA will get merged upward (i.e. dev into QA), until eventually one is merged into the repo's main branch to cut a new production release.

Sometimes, team use a variation of this approach with repo forks instead of feature branches. The specifics almost always vary a bit team by team, but this general approach tends to be the most common.

This is usually described as a branching strategy, and sometimes referred to as working with long-lived feature branches. It emerged from a working practice called, at the time, GitFlow.

On the surface, trunk-based development is not all that dissimilar to GitFlow. Developers will open their own branches, there may still be lower level environment branches, such as dev and QA, though it's less common, and production releases will be keyed against the repo's main branch.

So, how is trunk-based development different from GitFlow? Trunk-based development (TBD) differs from GitFlow in principle as much as in practice. Namely, TBD declares that:

- Feature branches should not be long lived.
- Changes should roll into the main trunk (branch) constantly, ideally daily or faster.

In trunk-based development, you will see teams working more like this:

1. Developers open up a feature branch for a new initiative.
2. At the end of the day, all work from all teams is merged back into the main branch (or, occasionally, a lower env branch like qa which itself is merged upwards constantly).

The source of truth is always the main branch. Feature branches are started over or recreated from main once the previous work has been merged.

The benefits of this are immediate:

* You'll have less merge complexity, as you won't be merging codebases that have drifted apart by days or weeks.
* As you build a new feature, you ensure that you're constantly running against the current version of your app. 
* You're pulling in other teams' changes every day, and avoiding the painful scenario of having to refactor based on a change made by another team days, weeks, or even months ago that you missed.

![Linting Rules](./static/overview.png)

Trunk-based development accelerates CI/CD because it means less complexity. Less complexity means more releases, faster releases, less time spent rebasing and refactoring, and higher quality code from catching conflicts and errors sooner.

<details>
<summary>Tutorial: Implementing TBD in a React app (without feature flags)</summary>

Follow along with this tutorial and learn how to implement TBD in a React app. This tutorial doesn't include Feature Flags.
<!-- There will be a follow up tutorial on implementing TBD with Feature Flags in a React app. -->

Let's start off by creating a React app. We are going to setup a project with [Create React App](https://create-react-app.dev/docs/getting-started) using `npx`.

1. Open a new terminal, navigate to the directory you want the project to live, and then run `npx create-react-app new-proj` to spin up a new React project. You can replace `new-proj` with whatever the name of your app will be.
2. Change directories into your new project using `cd new-proj`.
3. Kick off your project using `npm start` . Your project will most likely spin up in `localhost:3000`, but if you have another project running on that port, your terminal will prompt you to run it elsewhere, most likely in `3001`, if you want. You can always shut down whatever is running in `3000` and run it from there.
4. Open `localhost` to see a default React app page.

   ![Opening webpage from create react app](./static/tbd-before.png)

5. Open your project in a text editor or IDE, such as [VS Code](https://code.visualstudio.com/).
6. Create a branch off of `main` (your repo's *trunk* branch) and name it whatever you like. For example, your team might use a `tasknumber-feature` naming convention, such as`ISSUE-1234-adds-name-link`.

   To create a branch run `git checkout -b branch-name`. Your terminal automatically updates to your new branch.

7. Make changes however you see fit. They can be big or they can be small. If you are just starting off, edit the `App.js` file. For example, you could make some changes like:

   ```jsx
   <p>
     Trunk-Based Development Demo for my friends!
   </p>
   <a
     className="App-link"
     href="https://harness.io"
     target="_blank"
     rel="noopener noreferrer"
   >
     Head over to Harness's Website to learn more about Feature Flags!
   </a>
   ```

8. Before you run any git commands, run `git init` to initialize your repo. Once you do this you can start tracking changes (adding, committing, pulling, pulling, and so on).
9. You can now add, commit, and run a status on your files and directories. I encourage the use of `git status` all the time to make sure you know exactly what is happening in your project.
10. Run a `git status` to check you work. If all looks good, run `git add` than `git commit -m "initial commit"` . I choose "initial commit" for that very first commit, then, for every commit message after that, I keep it short and concise with present tense. Instead of "added this copy", it would be "adds this copy".

Remember, in the practice of trunk-based development, this branch isn't meant to be long lived. Once you are done with your feature, which might be behind a feature flag initially, make sure to submit a PR and get your branch merged in.

You can use feature flags to hide any features you are working on but also keep moving that branch back into main to relieve the headaches of merge hell. Throughout the course of the development process, the branch should look like this visually.

![Trunk based development visual](./static/tbd-diagram-v2.png)

You can see that the branches are small and are merged right back into main once the PR has been reviewed in merged. The branches shouldn't live longer than two days in my opinion.

Even if you haven't finished your work, this is where feature flags come into play. Hide the feature so when/if the main gets deployed, no one can see your changes. You want to keep these branches short lived to avoid messy merge conflicts.

</details>

## Common challenges of trunk-based development

Why don't all teams use trunk-based development? The short answer is, it's not always easy.

Merging into your main branch constantly and keeping all teams up-to-date on the latest changes as they work on new features sounds great, but the reality is that creates a lot of room for collisions.

And, what about releases? How can you cut a production release safely, maybe with an urgently-needed hotfix, if you have four feature teams shipping incomplete work into the only branch you use, with no ability to pick and choose features by branch anymore?

Because of these issues, a lot of teams continue using long-lived feature branches rather than trunk-based development. They do this knowing that this is creating added friction to their CI/CD process, impacting their velocity, and introducing risk.

## Achieving trunk-based development with Feature Flags

The missing piece here, often, is feature flags.

If you're not familiar with feature flags, you can learn more on our introductory blog post [What Are Feature Flags](https://www.harness.io/blog/what-are-feature-flags). Essentially, flags are a way of working where changes are served behind a conditional flag in your code. This allows you to serve different versions of the code based on certain criteria. Most critically for trunk-based development, feature flags keep changes that are not ready for production  from being used but still merging them into the code.

By adding feature flags to your trunk-based development workflow, you will find most of the risk removed, in addition to numerous other benefits of feature flags:

1. Developers open a feature branch for a new initiative.
2. Developers put all changes in this branch behind a feature flag by default. Harness has some recommendations for use cases for feature flags, if you need ideas.
3. As developers merge back into the main branch constantly, the work in progress is all served in an *off* or *false* state by the feature flag solution, so the work is disabled and at no risk.
4. The team can ship to production constantly - daily! hourly! - from the source of truth main branch. They don't have to care at all how much incomplete work is included; it will be safely dark behind a flag.

With feature flags, developers leverage trunk-based development to increase velocity, remove long-lived feature branches, and ship to production constantly. All without the risk of incomplete and untested work causing chaos.

This removes merge conflicts without adding risk, and it helps teams increase velocity without sacrificing quality or control.

It's safe to say that feature flags are a necessary part of trunk-based development. The closer any team gets to trunk-based development, the higher their impact and velocity will be.

## Trunk-based development best practices

Here are some important best practices for the trunk-based development branching strategy:

- You should have minimal or no merge conflicts. If merge conflicts are common or messy, consider how teams are working, such as which files receive the most merge conflicts, or whether some team members are not updating their branches from main frequently enough.
- Pulling in code from main should be 1:1 with your branch, or very close to it. Your feature branches should not fall far behind main.
- You should not have to rush to rebase feature branches before merging them.
- Feature branches are short lived.
- The main branch is always the source of truth.
