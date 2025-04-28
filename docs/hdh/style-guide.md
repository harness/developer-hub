---
title: Style Guide
description: Use this style guide to contribute to Harness Developer Hub.
sidebar_position: 10
---

This guide is your **primary resource** for Harness documentation style.

If you're new to technical writing, check out these resources:

-   MDN - [Creating effective technical documentation](https://developer.mozilla.org/en-US/blog/technical-writing/)

-   Write the Docs - [User-driven docs](https://www.writethedocs.org/videos/na/2015/user-story-driven-docs-jfernandes/) (Focus on what the user can do with the app, not what the UI does)

-   Appcues - [Writing release notes](https://www.appcues.com/blog/release-notes-examples) (Key section: [Make the intent of the changes clear](https://www.appcues.com/blog/release-notes-examples#:~:text=2.%20Make%20the%20intent%20of%20the%20changes%20clear))

For more advanced technical writing concepts, check out:

-   Write the Docs/MDN - [How we made MDN discoverable](https://youtu.be/02DYqMD1ihs?feature=shared) (SEO)

-   UX Booth - [Beginner's guide to information architecture](https://uxbooth.com/articles/complete-beginners-guide-to-information-architecture/)

## Language, Tone, and Voice

### Voice, tone, grammar

Use a casual, conversational tone. Keep sentences short and in the present tense.

Speak to the developers, not at them.

-   NO: The user can run Docker-in-Docker in a Background step.

-   YES: You can run Docker-in-Docker in a Background step.

Do not use please in documentation. We are an authority, and we can be friendly/informal without being overly polite. For example, your doctor probably doesn't say "Please take this medicine"; they simply tell you to take the medicine in an authoritative but (hopefully) approachable tone. This doesn't apply if you are talking to a customer in real time (such as on Community Slack); use normal conversational pleasantries when having direct conversations with customers.

-   NO: Please try running the pipeline again.

-   YES: Run the pipeline again.

### Present tense, active voice

In general, write in the present tense. Users following instructions in the docs are usually following along in the app; therefore, they do those steps and experience the results of those steps in real time.

Instruction example:

-   NO: You will need to install a delegate in your Kubernetes cluster.

-   YES: Install a delegate in your Kubernetes cluster.

Result example:

-   NO: The delegate will be added to the Delegates list.

-   YES: The delegate is added to the Delegates list.

The sentence from the second example is also passive voice, so we can further improve it by putting the user at the center of the action:

-   OK: The delegate is added to the Delegates list.

-   BETTER: You can find the delegate on the Delegates list.

If we are giving an instruction for the user to go find the delegate on the Delegates list, we can refine further by starting with the verb and using "[the understood you](https://www.grammarflip.com/curriculum/the-understood-you)".

-   Find the delegate on the Delegates list.

### Cultural sensitivity and inclusiveness

Avoid cultural or regional biases, such as references to specific holidays or religions. Avoid language that is:

- Ableist
    - Recommended: `Deploying improperly will disrupt the service and cause outages.`
    - Not Recommended: `Deploying improperly will cripple the service and cause outages.`
- Gendered
    - Recommended: `Make sure every person in charge of your devops platform is an admin.`
    - Not Recommended: `Make sure every man in charge of your devops platform is an admin.`
- Violent
    - Recommended: `Please make sure to end stalled deployments.`
    - Not Recommended: `Please make sure to kill stalled deployments.`

## Information architecture

It is important to structure content so that it is discoverable, cohesive, and useful while avoiding over-saturation (content split unnecessarily across multiple pages, too much content on one page, information overload). The appropriate balance can depend on the audience, the product, and the purpose for writing. Information architecture is a skill that is learned over time.

Here are some helpful guidelines when creating or editing content:

-   Include use cases and product usage details. Answer these questions:

    -   What can the feature do?

    -   Why would I want to use the feature?

    -   How do I enable/configure/use it?

-   Know *why* you're writing. What's the goal? What questions does/could a particular page answer? Why would a user visit that page? 

-   Use links to connect related topics rather than repeating large amounts of content in multiple places.

-   Use markdown partials to minimize upkeep in duplicated content.

-   Place content in thematically relevant locations. Consider the audience/persona (for example, beginner = get started). Consider the feature/use case.

-   Consider discoverability. Users can find content through manual browsing, search (site / google), AIDA/in-product links, or links from other webpages and other HDH pages. If a page "requires" information from another page, make sure they are connected by links. If a user lands on a similar page through search, are they able to find other related pages organically, or do they have to do another search?

-   Think "user journey" not "textbook". Rather than stepping through a module screen-by-screen, think about what it's like to experience a module as a user and the goals someone is trying to achieve by using that module. Walk through the user journey from opening the app for the first time, to setting up their first pipeline, to more advanced techniques.

#### Progressive disclosure

Progressive disclosure means structuring content in such a way that your progressively provide more and more detailed information to the user. The user gets to choose what content they see and when.

The primary example of this is the TOC where we use folders to create a hierarchy. At the top level are the modules as a whole, then there are high-level categories (ex. Get started/Usage/Troubleshooting), and then within those categories there are further divisions organizing the content.

On individual pages, you can use tabs, details (collapsible sections), and headings to facilitate progressive disclosure.

:::note

Use progressive disclosure judiciously. There is a balance between "burying" content and avoiding overwhelming the user by providing too much information at a single "level".

:::

Consider the following:

-   Subcategories (folders) are great for progressively disclosing layers of information in the TOC; however, creating a folder for a single topic introduces an extra layer in the TOC without any apparent organizational benefit.

-   Tabs look cool but they can be confusing when discovered through search (ctrl + F only searches the exposed tab, whereas search engines crawl all the tabs), and using Headings 2 or 3 in tabs can cause confusion in the mini-TOC. Try to keep tabbed information to a minimum.

-   Details blocks (collapsible accordions) can be used for supplemental information or to collapse long portions of complex pages. Use them carefully so that crucial information isn't hidden. Also consider that search engines crawl the details content, but ctrl+F only searches within opened (expanded) details containers.

-   Avoid setting details containers to default "open" unless you have a legitimate reason to do so. "Details" are, by their name, meant to contain extra details. If they contain required/critical information, that information shouldn't be in a "details".

## Docusaurus/Markdown Feature Usage

### Admonitions (Notes)

We use [Docusaurus' admonitions](https://docusaurus.io/docs/markdown-features/admonitions) within our docs. The admonition types used are, `Note`, `Tip`, `Info`, and `Warning`.

-   Note: A quick aside, or small piece of information outside the regular flow of information. EX:

    :::note 

    This feature requires node level permissions.

    :::

-   Tip: A small bit of helpful, but not necessary, information. EX:

    :::tip

    You can use expressions to reference secrets.

    :::

-   Warning: Something bad could happen if the user doesn't pay attention to this information. Use rarely. EX:

    :::warning

    Do not rename the cluster.

    :::

-   Info: Useful guidance, advice, or helpful or more important additional information. Do not use this to highlight regular information that should be part of an instruction or to highlight information that has no actual "weight" over the other information on the page. Do not use note blocks for style. The content in "Info" should, for some reason, need to stand out from the other information. Try to give the block a short, clear title, rather than using the default "Information" title.

    To change the title, format your note like ``:::info My Cool Title`
    The titles are in all caps and bold regardless of how you type them in markdown.

    Please mention feature flags under an `info` admonition.

    EX:

    :::info

    To install SMP in an air-gapped environment, go to [SMP in air-gapped environment](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment).

    :::


### Lists

-   Ensure parallelism in lists, starting each item with the same part of speech, insofar as possible.

-   Use an introductory sentence or statement before a list.

    -   If there is a heading immediately above a list, the heading can serve as the introduction if it is sufficiently clear (This list is an example - the heading "Lists" is immediately before the list, and it is sufficiently clear that this list is about writing lists).

-   Start each list item with a capital letter, unless it would make the item incorrect, for example if the item is a command.

-   Refer to the MS MOS for information about [punctuating lists](https://learn.microsoft.com/en-us/style-guide/scannable-content/lists#punctuation) (when to use periods).

### Numbered lists, steps

Use numbered lists for a series of items where the **order matters**, such as a list of steps (procedures).

For procedures:

-   Usually, each step starts with a command that is typically a verb phrase, such as "Select **Create Pipeline**" or "Install the delegate".

-   Exception: Optional or conditional steps can be introduced with a short "If" statement, such as "If you want to use a pipeline template, select **Start with Template**."

-   Add extra information after the command sentence.

-   If a procedure has only one step, you can use a single bullet (not a number) or just write it as a normal sentence. [Example: Add a run step with Git commands.](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory#add-a-run-step-with-git-commands)

-   Provide introduction or context before launching into the steps, if needed.

-   Break long procedures into multiple sections.

#### Bulleted lists

Use bulleted lists for a series of items where the **order doesn't matter**.

:::info What about a finite series of options?

A finite series of options is a bulleted list, even though you might introduce it with a number. This is because the **order doesn't matter**.

**NO:**

There are two types of layouts for webpages:

1.  Premade layouts

2.  Custom layouts

**YES:**

There are two types of layouts for webpages:

-   Premade layouts

-   Custom layouts

:::

### Commas

We use the Oxford comma.

-   NO: You need a Harness account, a GitHub account and an IDE.

-   YES: You need a Harness account, a GitHub account, and an IDE.


### Headings, titles

Headings and titles:

-   Orient users and facilitate scanning. They are brief but clear.

-   Address specific questions or indicate content that follows.

-   Help you decide if you want to read the contents of that page/section without knowing what the contents is. You don't need the information under the heading to understand the heading itself. The heading can be informed by preceding headings or the page title, but I shouldn't have to start reading the content itself to decide. Also consider that users might arrive directly at a heading from an anchored link or search result, so they might not have any preceding context.

    -   NO: Explore (Explore what?)

    -   YES: Explore dashboards (I can learn how to explore dashboards.)

    -   NO: Important notes (Why are they important?)

    -   YES: Requirements (These are things I need for something else.)

-   Use sentence-style capitalization.

-   Don't include ending punctuation (like periods or colons). There are some cases where it's ok to use a question mark, such as FAQs and marketing-oriented pages that have a Q & A format. Titles (the main page heading) never have ending punctuation.

-   Are direct and don't contain filler words like "How to", "Introduction to", "Review:", or "Step #".

    -   Older docs may include "Step #", "Review:", and "Option:" in headings. This was an old style guideline and it is no longer used.

    -   You can break procedures into separate sections, but don't number them. Do not use "Step #" in headings. If steps are numbered, they should be in a numbered list.

    -   One exception is for tutorials, for which the title *can* start with "Tutorial:".

    -   NO: How to Add API Docs:

    -   YES: Add API docs

    -   NO: Step 1: Create the pipeline.

    -   YES: Create a pipeline

-   Are unique (ex. don't have two pages with the same title).

-   Short noun phrases or verb phrases in simple present tense. Do not use gerunds (ing). Use as few words as possible.

    -   NO: Creating pipelines

    -   YES: Create pipelines

    -   NO: Harness IDP vs Self Managed Backstage - In-depth Feature Comparison

    -   Yes: Compare Harness IDP and self-managed Backstage

Keep in mind how headings render when published:

-   The title becomes the page's H1. All other headings should be H2 (##) or lower.

-   The mini-TOC (right side) only shows H2 and H3.

-   Don't use code notation/code blocks in headings. It doesn't always render correctly.

-   Don't use links in headings. Headings themselves are anchored links already. If you need to link to something, put it in the text under the heading.

Don't start the body of the page with a heading (like ## Introduction or ## Summary). This is not necessary as it is understood that the first paragraph(s) are the introduction.

In general, don't skip heading levels (eg. don't go from H2 down to H4 without an H3 between).

If your page has a lot of H5 or H6, you might be overusing headings (consider using a list or table or combining smaller sections) or you might need to break the page into separate, shorter pages. H5 and H6 are almost indistinguishable from regular bold text on HDH, so they are not easy to scan and they don't show up on the mini-TOC.

### Links

Use "go to" before a link instead of "see" or "refer to."

Use meaningful link text. Don't use things like [here](https://someurl.com) or [this doc](https://somelink.com)

For links to other markdown files, it is best to include the entire path from the top of the repo, eg `/docs/module/some/path/some/topic`.

This is because of the way the React Router handles link pathing on the live site. Including a partial relative path (such as ../some-folder/some-topic ) can cause links to break unexpectedly and with no build errors or flagging by the dead link checker. If you include a partial relative path, you must include .md for the most accurate rendering -however, some parts of HDH don't play well with .md (such as KB or release notes), therefore, it's best to get in the habit of using the entire path.

## Media

### Screenshots

-   Use screenshots sparingly.

-   Crop and use callouts to highlight specific areas. No need to show the entire screen.

-   Align screenshots with the left indentation of preceding text.

-   Add alt text for accessibility.

-   Avoid exposing sensitive information; replace it with fictional examples.

-   Place visual summaries within collapsible folds.

-   Resize large screenshots BEFORE adding them to the /static folder. HDH uses CSS to flex-resize images. Don't use in-line styling (like "width"/"height") to force-resize images. This can result in images that are overlarge on certain screens (like mobile) or skewed.

### Diagrams

-   Prefer Mermaid for diagrams.

    -   [Diagrams | Docusaurus](https://docusaurus.io/docs/markdown-features/diagrams)

    -   [Configuration | Mermaid](https://mermaid.js.org/config/configuration.html)

    -   [Mermaid Cheat Sheet](https://jojozhuang.github.io/tutorial/mermaid-cheat-sheet/)

-   Lucid chart is a free flowcharting tool. Useful for creating more complex diagrams that are difficult to configure with Mermaid.

### Videos

This simplified version includes the most important guidelines for a technical writer working on Harness documentation. Feel free to adapt it further to suit your specific needs.

If you're posting to the Harness youtube, please refer to the [Video Guidelines](https://harness.atlassian.net/wiki/spaces/HDH/pages/21474246759) for greater details.

### Tango

Use tango guides to illustrate simple product walkthroughs or guides. You can import them in using the `embed` link into the `<DocVideo>` plugin mentioned above. EX:

`<DocVideo src="https://app.tango.us/app/embed/7892f010-0f5b-4acd-8ad3-9de5426ba386" title="Build and Push Docker Images with Harness Artifact Registry" />`

If you are a Harness employee, reach out to the #docs-council channel to receive a license for Tango. 

## Harness Specific Style Elements

### UI elements and code

UI elements include screen names, fields, tabs, menus, buttons, and so on.

The following standards apply to UI elements:

-   Use bold for UI elements.

-   Don't use directions (left-side, right-side) unless its necessary.

-   If a UI element has no visible name, such as an icon, use the name given in code. Ex: If a trash can icon is named "Delete" in the code, give the instruction: "Select **Delete**". This is a best practice for accessibility as the name written in the docs will match what is announced by a screen reader or other assistive technology. If such an element has no coded name, or the coded name is inaccurate or not useful, it needs to be changed in the code.

For YAML and other code, use code notation/code blocks. Don't use bold, italics, quotes, or otherwise.

Use code notation (`some code`) for in-line code.

Use code blocks (``` ```) for multiple lines of code or long strings of code.

Don't use code in headings or titles.

### Early access (beta) features

How to document early access features:

-   Add an "early access feature" release note for the initial release and any subsequent updates/changes while still in beta.

-   Add the FF to your module's early access feature list (on your module's "What's supported" page).

-   If there is additional documentation for the FF, include the standard FF note. For example, take a look at [this feature note](/docs/continuous-integration/use-ci/run-tests/viewing-tests#test-report-dashboard) from CI.

-   When promoted to GA:

    -   Add a "new features and enhancements" release note about the feature. Treat it as if it were a new feature, and include a statement to the effect of "This feature was previously released in beta under a feature flag. It is now generally available."

    -   Remove the FF note from documentation. Recommended to search the entire workspace/codebase for the FF name to make sure you remove all instances of it. You do not need to remove the FF from historical release notes.

    -   Update your module's early access feature list (remove the promoted feature or update the feature's status).
