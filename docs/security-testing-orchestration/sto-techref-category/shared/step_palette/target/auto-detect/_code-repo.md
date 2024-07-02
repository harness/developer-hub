When **Auto** is enabled for code repositories, the step detects these values using `git`: 
  - To detect the target, the step runs `git config --get remote.origin.url`. 
  - To detect the variant, the step runs `git rev-parse --abbrev-ref HEAD`. The default assumption is that the `HEAD` branch is the one you want to scan.

