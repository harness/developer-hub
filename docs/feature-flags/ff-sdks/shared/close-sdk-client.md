In most applications, you won't need to close the SDK client.

However, you should close the SDK client if:

- your application is about to terminate, to ensure that all associated resources are released.
- you have determined that you do not need to evaluate flags again in your application lifecycle.

:::info important
Important: attempting to evaluate flags after the Client is closed will result in undefined behavior.
:::

To close the SDK client:

* Run the following command.

    ```
    client.close()
    ```
