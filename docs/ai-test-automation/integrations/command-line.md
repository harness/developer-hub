---
title: Executing from command line
description: execute your test suite from command line
sidebar_position: 30
---
## Python CLI

## Setup

Please ensure the following pre-requisites are met before using the python cli

- python3
- Access to [*https://app.relicx.ai*](https://app.relicx.ai/)
- Alternatively you may have to install `urllib` package if you come across this error *ModuleNotFoundError: No module named 'urllib3'*

```none
pip install urllib3
```

Now install the Relicx package

```none
wget https://s3.us-west-1.amazonaws.com/apiclient.relicx.ai/prod/relicx.tar.gz
pip install relicx.tar.gz
```

Once the setup is complete, execute the test suite with the following commands. You can also generate the command from the product by navigating to **Settings** -> **Integrations** -> **CI/CD**
```none
export relicx_username= <credentials>
export relicx_password= <credentials>
python -m relicx.cli --app_id <app_id> run_test_suite --environment_id <env_id> --test_suite_id <test_suite_id> --wait true
```

Set wait to true to make the run blocking and false otherwise. A blocking run will make your CD wait until the test suite execution has finished.

