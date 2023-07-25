---
title:  Using Git Credentials from Codebase Connector in CI Pipeline's Run Step
---

## Introduction

Harness allows seamless integration with version control systems through the Codebase Connector. While most Git tasks are automated within the CI pipeline, there might be scenarios where you would need to manually execute Git commands in a run step. This article explains how to leverage Git credentials from the Codebase Connector in a CI pipeline's run step using a ```.netrc``` file.

## Instructions

- Configure Codebase for CI Pipeline:

   Set up the Codebase Connector in Harness with the necessary Git repository credentials.
- Create ```.netrc``` File in the Run Step:

  In scenarios where manual Git commands are required, create a .netrc file within the run step. Use the below content for the .netrc file
  ```
    cat <<EOF > ${HOME}/.netrc
    machine ${DRONE_NETRC_MACHINE}
    login ${DRONE_NETRC_USERNAME}
    password ${DRONE_NETRC_PASSWORD}
    EOF
  ```
- Execute Git Commands:
  
  With the .netrc file in place, you can now execute Git commands within your run step script. Git will automatically use the credentials from the .netrc file for authentication, enabling seamless manual Git operations.

## Example:

Below is a simple example of how the run step might look:

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
  