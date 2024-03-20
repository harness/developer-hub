---
description: Sandbox to learn about MD and HDH Features, powered by Docusaurus
title: Get Creative with HDH and Docusaurus
tags:
  - contributing
redirect_from:
  - /sandbox
---

import harness_atl from './static/atlanta_light.png'

# Markdown Capabilities

Thanks for checking out the Harness Developer Hub and learning more how to contribute. The HDH is powered by [Docusaurus](https://docusaurus.io/). Can leverage this Markdown File to see the facets of what is possible with Docusaurus's Markdown capabilities in an HDH styled post. Feel free to take a look at this page in `raw` format on GitHub. We look forward to seeing your creativity!

## Headings

H2 Heading
Can see how different headings look.

### H3 Heading

H3 Heading

#### H4 Heading

H4 Heading

##### H5 Heading

H5 Heading

## Tables

| Column     | Column | Column |
| :--------- | :----- | :----- |
| **1. Row** |        |        |
|            | Row    | Row    |

## Details

Details are toggle elements.

<details>
<summary>Toggle Heading</summary>
  <div>
    <div>This is the detailed content</div>
    <br/>
<details>
<summary>
        Nested Toggle
      </summary>
      <div>
       This is the nested detailed content
      </div>
</details>
  </div>
</details>

### Notes

These are called [admonitions](https://docusaurus.io/docs/markdown-features/admonitions).

:::note

Note text.

:::

:::tip

Tip text.

:::

:::warning

Caution text.

:::

:::info

Information text.

:::

:::danger

Danger text.

:::

## Tabs

Tabs can also now have direct [query strings](https://docusaurus.io/docs/markdown-features/tabs?current-os=ios#query-string) in this example as of DS 2.4.3.

e.g deeper linking:

- https://developer.harness.io/docs/hdh/hdh-docusaurus-sandbox/?tab-number=1#tabs
- https://developer.harness.io/docs/hdh/hdh-docusaurus-sandbox/?tab-number=2#tabs
- https://developer.harness.io/docs/continuous-delivery/get-started/cd-tutorials/manifest?pipeline=cd-pipeline&cli-os=windows#getting-started-with-harness-cd

Can see what the tab value ='s then the anchor tab there in combination and for nested tabs can continue.
`?pipeline=cd-pipeline&cli-os=windows#getting-started-with-harness-cd`

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab-number">
<TabItem value="1" label="Tab One">

This is an `TabItem` 1.

</TabItem>
<TabItem value="2" label="Tab Two">

This is an `TabItem` 2.

</TabItem>
</Tabs>

## Code Formatting

Can enable syntax highlighting with these [common languages](https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts).

```js
console.log("Check out Harness, Today!");
```

## Diagram

Docusaurus supports [Mermaid Diagrams](https://mermaid.js.org/config/configuration.html).

```mermaid
sequenceDiagram
	Site->>mermaid: initialize
	Site->>mermaid: content loaded
	mermaid->>mermaidAPI: init
```

## Images

In HDH, we provide a few ways to include images. We support the standard Markdown format to include also additional control to re-size.

### Standard Include

![Harness Atlanta Background](static/atlanta_light.png)

### Formattable Include

Can apply what an `img` tag in HTML would apply.

```
import harness_atl from './static/atlanta_light.png'
<img src={harness_atl} alt="Harness Atlanta" height = "300" width = "600" />

```

<img src={harness_atl} alt="Harness Atlanta" height = "300" width = "600" />

### Lightbox / Image Expand

Can use the `DocImage` plugin for this.

```
<DocImage path={require('./static/atlanta_light.png')} />
```

<DocImage path={require('./static/atlanta_light.png')} />

## Videos

Videos are great tools to embed. You can embed a video in your Markdown.

```
<DocVideo src="https://www.youtube.com/watch?v=_Nj9EYYuSqY" />
```

<DocVideo src="https://www.youtube.com/watch?v=_Nj9EYYuSqY" />

## Quotes

> Software Delivery, made easy!
>
> — Harness

## Includes

Can include MD files as entire files. Import the asset as a tag then
leverage the tag.

```
import CISignupTip from '/docs/continuous-integration/shared/ci-signup-tip.md';
<CISignupTip />
```

import CISignupTip from '/docs/continuous-integration/shared/ci-signup-tip.md';

<CISignupTip />

## Buttons

Can leverage the button framework to add a button. Can give the Font Awesome Icon, text, Link, Tooltip,
and Size [small, medium, large].

```
<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/continuous-integration/rss.xml" tooltip=
"Subscribe to RSS" size="medium"/> />
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/continuous-integration/rss.xml" tooltip=
"Subscribe to RSS" size="medium"/>

## Pills

Similar to the Button Framework, the Pill Framework allows use to place pill tags in the MD. Buttons, unlike Pills, are designed to be
clicked and hoovered. Though pills can contain links also.

```
<DocsTag icon = "fa-solid fa-icons" text="Default" link="/docs/security-testing-orchestration" />
<DocsTag  text="Default without icon" link="/docs/security-testing-orchestration" />
<DocsTag  backgroundColor= "#ff8ac1" text="With out icon"  textColor="#ca136c"  />
<DocsTag icon = "fa-solid fa-hand-dots"  backgroundColor= "#cbe2f9"   textColor="#0b5cad" iconColor="#6938c0" text="Community" link="/docs/security-testing-orchestration"  />
```

<DocsTag icon = "fa-solid fa-icons" text="Default" link="/docs/security-testing-orchestration" />
<DocsTag  text="Default without icon" link="/docs/security-testing-orchestration" />
<DocsTag  backgroundColor= "#ff8ac1" text="With out icon"  textColor="#ca136c"  />
<DocsTag icon = "fa-solid fa-hand-dots"  backgroundColor= "#cbe2f9"   textColor="#0b5cad" iconColor="#6938c0" text="Community" link="/docs/security-testing-orchestration"  />
