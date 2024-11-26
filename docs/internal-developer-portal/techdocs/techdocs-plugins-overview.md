---
title: Overview of TechDocs Plugins
description: Learn about the MkDocs Plugins installed for TechDocs and how to use them.
sidebar_position: 3
---

TechDocs supports a variety of MkDocs plugins. Here's an overview of all the plugins supported in Harness IDP.

## TechDocs Core PLugins:

The `techdocs-core` plugin serves as an all-in-one solution for generating high-quality documentation using MkDocs within Harness IDP. It integrates several key plugins to provide enhanced functionality, eliminating the need to configure them individually.

### Plugins Included in techdocs-core
- `mkdocs-material`
- `markdown_inline_graphviz_extension` 
- `mkdocs-monorepo-plugin` 
- `plantuml-markdown`
- `mdx_truly_sane_lists` 
- `pymdown-extensions` 
- `pygments` 
- `mkdocs-redirects` 

:::info

Using any of the above plugins individually under the `mkdocs.yml` plugins section will result in an error: *plugin not installed* It is recommended to use the `techdocs-core` plugin to access the features of the listed plugins.

:::


## Other Plugins Supported

### 1. `mkdocs-video`

Allows embedding videos directly in Markdown content.

Features:
- Simplifies embedding videos from external sources (e.g., YouTube, Vimeo).
- Supports videos hosted on custom domains.

Use Case:
- Helpful for embedding tutorials, walkthroughs, or presentations in documentation.
- Embed videos with ease by using the video shortcode:

```markdown
### Embedded Video

<video controls>
  <source src="https://www.example.com/path-to-video.mp4" type="video/mp4">
</video>
```

- For YouTube videos:

```markdown
### YouTube Video

[youtube](https://www.youtube.com/watch?v=example_video_id)

```

### 2. mkdocstrings[crystal,python,vba]:

Auto-generates documentation for code directly from docstrings in your source files.This specifies additional language-specific parsers:
- Crystal: Supports docstring extraction for Crystal projects.
- Python: Processes Python docstrings for classes, functions, and modules.
- VBA: Handles VBA (Visual Basic for Applications) docstrings.

Features:
- Supports multiple programming languages (e.g., Python, Crystal, VBA).
- Integrates well with MkDocs to provide API documentation.

Use Case:
- Ideal for documenting APIs or libraries where docstrings are already maintained in the source code.
- Write docstrings in your code:

```python
def greet(name: str) -> str:
    """
    Greets the user.

    Args:
        name (str): Name of the user.

    Returns:
        str: A greeting message.
    """
    return f"Hello, {name}!"
```

The plugin automatically generates documentation for such functions/classes. In Markdown, you can add placeholders to display the generated content:

```markdown
::: my_package.my_module.greet
```

