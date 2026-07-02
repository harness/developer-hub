---
title: TechDocs Plugins Overview
description: Learn about the MkDocs plugins available in TechDocs and how to use them effectively.
sidebar_position: 2
sidebar_label: TechDocs Plugins
redirect_from:
    - /docs/internal-developer-portal/catalog/integrate-tools/techdocs/techdocs-plugins-overview
---

TechDocs supports a variety of MkDocs plugins to enhance your documentation. This guide provides an overview of all supported plugins in Harness IDP.

---

## TechDocs Core Plugin

The `techdocs-core` plugin is an all-in-one solution that bundles multiple essential plugins for generating high-quality documentation. It eliminates the need to configure individual plugins separately.

### Included Plugins

The `techdocs-core` plugin includes:

- **`mkdocs-material`**: Material Design theme for MkDocs
- **`markdown_inline_graphviz_extension`**: Inline Graphviz diagram support
- **`mkdocs-monorepo-plugin`**: Multi-repository documentation support
- **`plantuml-markdown`**: PlantUML diagram rendering
- **`mdx_truly_sane_lists`**: Improved list formatting
- **`pymdown-extensions`**: Extended Markdown syntax
- **`pygments`**: Syntax highlighting for code blocks
- **`mkdocs-redirects`**: URL redirect management

:::warning Important
Do not configure the above plugins individually in your `mkdocs.yml` file. Using them separately will result in a "plugin not installed" error. Always use the `techdocs-core` plugin to access these features.
:::

**Configuration:**

```yaml
plugins:
  - techdocs-core
```

---

## Additional Supported Plugins

### mkdocs-video

Enables embedding videos directly in your Markdown documentation.

**Features:**
- Embed videos from external sources (YouTube, Vimeo, etc.)
- Support for self-hosted videos on custom domains
- Simple syntax for video integration

**Use Cases:**
- Tutorial videos and walkthroughs
- Product demonstrations
- Presentation recordings

**Examples:**

**Self-hosted video:**

```markdown
<video controls>
  <source src="https://www.example.com/path-to-video.mp4" type="video/mp4">
</video>
```

**YouTube video:**

```markdown
[youtube](https://www.youtube.com/watch?v=example_video_id)
```

---

### mkdocstrings

Auto-generates API documentation directly from docstrings in your source code.

**Supported Languages:**
- **Python**: Processes Python docstrings for classes, functions, and modules
- **Crystal**: Supports docstring extraction for Crystal projects
- **VBA**: Handles VBA (Visual Basic for Applications) docstrings

**Features:**
- Automatic API documentation generation
- Seamless MkDocs integration
- Support for multiple programming languages
- Preserves existing docstring formatting

**Use Cases:**
- API and library documentation
- Projects with well-maintained docstrings
- Automated reference documentation

**Example:**

**1. Write docstrings in your code:**

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

**2. Reference in Markdown:**

```markdown
::: my_package.my_module.greet
```

The plugin automatically generates formatted documentation from the docstring.

---

