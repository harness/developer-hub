---
title: Github Actions
description: Integrating with Github Actions
sidebar_position: 20
---
You can integrate Harness AI Test Automation  with your CI/CD pipeline using GitHub Actions or CLI.

## Github Actions

Repo: [https://github.com/relicx-ai/relicx-githubaction](https://github.com/relicx-ai/relicx-githubaction)

```Text
    uses: relicx-ai/relicx-githubaction@v1.2
    with:
      username: ${{ secrets.USERNAME }}
      password: ${{ secrets.PASSWORD }}
      app_id: <app_id>
      command: run_test_suite
      test_suite_id:<test_suite_id? 
      environment_id: <env_id>
      wait: false
```

To generate the Github Actions code navigate to **Settings** -> **Integrations** -> **CI/CD**

<iframe src="https://www.loom.com/embed/0edf13469f2b49c09b2556a553bcffe3" width="960" height="540" frameborder="0" allowfullscreen></iframe>