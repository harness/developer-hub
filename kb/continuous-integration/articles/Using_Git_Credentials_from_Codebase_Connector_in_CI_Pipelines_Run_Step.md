---
title:  Use codebase connector's Git credentials in a CI Run step
---

Harness CI supports seamless integration with version control systems through [codebase connectors](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase). While most Git tasks are automated within the CI pipeline, there can be scenarios where you need to manually execute Git commands in a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings).

This article explains how to use a `.netrc` file to leverage Git credentials from your pipeline's codebase connector in a CI Run step.

1. [Configure your CI pipeline's codebase.](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).

   Make sure to select the code repo connector with the credentials that you want to use in the Run step.

2. Add a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) that creates a `.netrc` file with the following content:

   ```
     cat <<EOF > ${HOME}/.netrc
     machine ${DRONE_NETRC_MACHINE}
     login ${DRONE_NETRC_USERNAME}
     password ${DRONE_NETRC_PASSWORD}
     EOF
   ```

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
