---
title: Git Large File Storage (LFS)
description: Configure Git Large File Storage.
sidebar_position: 60
---

Harness Code supports [Git Large File Storage (LFS)](https://git-lfs.com/), enabling efficient management of large files such as audio, video, and high-resolution images by storing them outside the main Git repository.

## Enabling or Disabling Git LFS

By default, Git LFS is enabled for all repositories in Harness Code. The Git LFS feature in Harness Code is controlled by the feature flag `CODE_GIT_LFS_ENABLED`.

To disable Git LFS for a specific repository:

1. Navigate to the repository's **Manage Repository** --> **Settings** page.
2. Locate the **Features** section.
3. Toggle the setting **Git Large File Storage (LFS)** to disable Git LFS.

You can enable the feature in the same way.

:::note
Object locking is not yet supported.
:::

## Getting Started with Git LFS

To start using Git LFS with your Harness Code repository:

1. **Install Git LFS**: Download and install Git LFS from the [official website](https://git-lfs.com/).

2. **Track Large Files**: Specify which file types to track with Git LFS. For example, to track all `.mp4` files:

   ```bash
   git lfs track "*.mp4"
   ```

This command adds an entry to your `.gitattributes` file. Commit this file to your repository:

```bash
git add .gitattributes
git commit -m "Track .mp4 files with Git LFS"
```

3. **Add and Commit Files**: Add and commit your large files as usual:

   ```bash
   git add path/to/large-file.mp4
   git commit -m "Add large video file"
   ```

5. **Push to Repository**: Push your commits to the Harness Code repository:

   ```bash
   git push origin main
   ```

Git LFS will handle uploading the large files to the LFS object store.

## Viewing LFS Files in Harness Code

In Harness Code UI, LFS files are rendered directly in the file view page (not in the file listing page) if they are of a supported type (e.g., images) and are less than or equal to 10MB in size. Files tracked by Git LFS are marked as **Stored with Git LFS**. 

<DocImage path={require('/docs/code-repository/work-in-repos/static/git-lfs-view.png')} />

For unsupported file types or files larger than 10MB, a download option is provided.

## Authentication and Protocol Support

Harness Code supports Git LFS operations over HTTPS only.

:::note

If you clone a repository via SSH, Git LFS operations will happen over HTTPS seamlessly as pure Git LFS SSH-based transfer is not supported. 

:::
