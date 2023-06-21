The access ID used to look up a specific product in the  scanner. This is required for some product suites such as Prisma Cloud. 
You might want to create a Harness text secret with your encrypted Id and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

