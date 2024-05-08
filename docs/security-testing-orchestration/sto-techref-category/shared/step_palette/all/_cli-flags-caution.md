:::caution

Passing additional CLI flags is an advanced feature. Harness recommends the following best practices:

- Test your flags and arguments thoroughly before you use them in your Harness pipelines. Some flags might not work in the context of STO. 

- Don't add flags that are already used in the default configuration of the scan step. 

  To check the default configuration, go to a pipeline execution where the scan step ran with no additional flags. Check the log output for the scan step. You should see a line like this: 

  `Command [ scancmd -f json -o /tmp/output.json ]`

  In this case, don't add `-f` or `-o` to **Additional CLI flags**. 

:::