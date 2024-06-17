---
title:  Use codebase connector's Git credentials in a CI Run step
---

Harness CI supports seamless integration with version control systems through [codebase connectors](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase). While most Git tasks are automated within the CI pipeline, there can be scenarios where you need to manually execute Git commands in a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings), such as when you need to [Clone a subdirectory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory) or run [use Git Large File Storage](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/gitlfs).

To facilitate this process, you can use a `.netrc` file to pull Git credentials from your pipeline's codebase connector and use those credentials in your Run step's commands.

:::info What does the .netrc file do?

Creating a `.netrc` file in a CI Run step provides a mechanism for storing Git credentials required for manual Git operations. It ensures that the necessary authentication information is readily available when executing Git commands in the Run step.

By using the `.netrc` file, you can execute Git commands within the run step without having to provide credentials each time. Git automatically references the `.netrc` file to retrieve the necessary credentials.

:::

1. [Configure your CI pipeline's codebase.](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase)

   Make sure to select the code repo connector with the credentials that you want to use in the Run step.

2. Add a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings) that creates a `.netrc` file with the following content:

   ```
     cat <<EOF > ${HOME}/.netrc
     machine ${DRONE_NETRC_MACHINE}
     login ${DRONE_NETRC_USERNAME}
     password ${DRONE_NETRC_PASSWORD}
     EOF
   ```

   :::info

   These `DRONE_` variables are [CI environment variables](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/ci-env-var).

   :::

3. In the same Run step, add your Git commands. Git automatically uses the credentials from the `.netrc` file for authentication, enabling seamless manual Git operations.

   For example:

   ```
   # Create the .netrc file
   cat <<EOF > ${HOME}/.netrc
   machine ${DRONE_NETRC_MACHINE}
   login ${DRONE_NETRC_USERNAME}
   password ${DRONE_NETRC_PASSWORD}
   EOF

   # Run Git commands
   git clone https://github.com/your/repo.git
   git checkout master
   git pull origin master
   ```
