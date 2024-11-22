---
title: Overview of TechDocs Plugins
description: Learn about the MkDocs Plugins installed for TechDocs and how to use them.
sidebar_position: 4
---

TechDocs supports a variety of MkDocs plugins. Here's an overview of all the plugins supported in Harness IDP.

## Installed Plugins:

### 1. `mkdocs-glightbox`
A plugin that provides a responsive and lightweight image viewer for Markdown content.

Features:
- Adds a modern lightbox effect for images embedded in your documentation.
- Supports image galleries with thumbnails and fullscreen views.

Use Case:
- Great for showcasing multiple screenshots, design mockups, or visual assets in documentation.

To enable a lightbox for images, simply add images with links:

```markdown
### Image Gallery

![Image 1](https://via.placeholder.com/400 "Click to view larger"){: .glightbox}
![Image 2](https://via.placeholder.com/400 "Click to view larger"){: .glightbox}
```

### 2. `mkdocs-git-authors-plugin`

Displays the list of contributors for each page based on Git history.

Features:
- Uses Git commit history to determine authorship.
- Shows contributors' names and commit counts.

Use Case:

- Ideal for collaborative documentation to credit contributors or track accountability for changes.
- The plugin doesn’t require specific Markdown syntax. Once configured, it automatically displays contributors at the bottom of each page.

### 3. `mkdocs-git-revision-date-localized-plugin`

Adds the last revision date of each page to the footer, localized to the user's time zone.

Features:
- Retrieves the last modification date from Git.
- Supports localization for different time zones and date formats.

Use Case:
- Useful for indicating the freshness of content, especially in rapidly changing environments.
- This plugin also doesn’t need Markdown syntax. It automatically appends a “Last updated” date to the footer of each page.

Example footer display after plugin setup:

```plaintext
Last updated: November 22, 2024
```

### 4. `mkdocs-video`

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

### 5. `mkdocs-material-extensions`

Adds additional Markdown extensions and features to enhance MkDocs Material themes.

Features:
- Provides better typography, callouts, tabs, and grid layouts.
- Extends the functionality of mkdocs-material.

Use Case:
- Improves content formatting and visual appeal, particularly when using the Material theme.
- Add callouts, tabs, or grids:
- Callouts:

```markdown
!!! note
    This is a note.
```
- Tabs:

```markdown
=== "Python"
    ```python
    print("Hello, World!")
```

- Grid Layout

```markdown
{{< grid "2" >}}
**Column 1 Content**

**Column 2 Content**
{{< /grid >}}
```

### 6. `mkdocs-redirects`

Helps manage redirects when pages are renamed, moved, or deleted.

Features:
- Automatically redirects old URLs to new ones.
- Prevents broken links when restructuring documentation.

Use Case:
- Critical for maintaining a seamless user experience in large or evolving documentation sites.
- This plugin manages redirects without requiring Markdown changes. In the `redirects` section of `mkdocs.yml`, specify old-to-new paths:

```YAML
redirects:
  old-page.md: new-page.md
```
Users visiting `old-page.md` will be redirected to `new-page.md`.

### 7. `mkdocs-awesome-pages-plugin`

Simplifies page ordering and organization in navigation.

Features:
- Allows automatic generation of navigation structure based on file hierarchy.
- Provides `.pages` configuration for advanced custom ordering.

Use Case:
- Streamlines the creation and maintenance of navigation in large documentation projects.
- Use `.pages` files to organize navigation:

```plaintext
.pages
---
- Home: index.md
- Guide:
    - Getting Started: guide/start.md
    - Advanced Topics: guide/advanced.md
```
*No changes in Markdown are required.*

### 8. mkdocstrings[crystal,python,vba]:

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

### 9. `mkdocs-minify-plugin`

Minifies the output files (HTML, CSS, JS) to reduce size and improve performance.

Features:
- Optimizes documentation by reducing file sizes.
- Speeds up loading times for users.

Use Case:
- Helpful for public-facing documentation where performance and bandwidth savings matter.
- This plugin works silently during the build process and doesn’t affect Markdown. Once configured, it minimizes your generated HTML, CSS, and JS files.
