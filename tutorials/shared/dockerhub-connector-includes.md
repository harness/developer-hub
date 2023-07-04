1. From the left pane, expand the **Project Setup**, and then select **Connectors**.
2. Select **+ New Connector**, and then select **Docker Registry**.
3. In the **Name** field, enter **Docker Hub**, and then select **Continue**.
4. In the **Docker Registry URL** field, enter `https://index.docker.io/v2/`.
5. For **Provider Type**, select **Docker Hub**.
6. In the **Username** field, enter your Docker Hub username.
7. In the **Password** field, select **Create or Select a Secret**. Follow the prompts to add your Docker Hub access token, and then click **Continue**.
8. At the next screen, select **Connect through Harness Platform**, and then select **Save and Continue**.
9. After Harness performs a validation test, select **Finish**.
10. In your list of connectors, note the ID of the connector that you just created. If you named the connector `Docker Hub`, the ID should be `Docker_Hub`.