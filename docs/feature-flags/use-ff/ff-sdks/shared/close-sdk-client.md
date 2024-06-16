In most applications, you won't need to close the SDK client.

However, you should close the SDK client if:

- Your application is about to terminate. Closing the client ensures that all associated resources are released.
- You have determined that you do not need to evaluate flags again in your application lifecycle.

:::info important
The SDK does not evaluate flags after the client is closed.
:::

