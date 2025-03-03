Creating a test with interactive authoring is very simple and straightforward. In this no-code method the user navigates through their app and performs a certain set of tasks that constitue a workflow. Once created, users can add parameters, assertions to make the tests robust and work across environments.&#x20;

You need to start by clicking the `Create Test` button on the Test Listing page. You can see a quick demo of how to create a test using the interactive mode in the video below&#x20;

::embed[]{url="https://www.loom.com/embed/1b7da99dac25492d85fcc8859ca47f55?sid=419a3fe2-ae2d-421e-86df-d3ac28babbfb"}

### Getting Started

To create a test, you will have to click on the `Create test` button on the test. This opens the **Create test**  modal that accepts the following inputs&#x20;

- **Environment Name**: The user selects the target environment where they would create the test and also run it for the first time.&#x20;
- **Start URL**: This is the page where you would like to start creating the test. This is typically the home page of your application but it can also be any other page the user can navigate to.&#x20;
- **Tunnel**: This option is available to our Enterprise Customers who can use this option to select a Tunnel that can be used to access environments that are behind a firewall.&#x20;
- **Automatically login**: This option is unselected by default and if you want to use this please note that you will have to create an auto-login task and also update your test environment with the login credentials

:::hint{type="info"}
To learn more about adding environments visit the [Adding a new Test Environment](<./../TEST ENVIRONMENTS/Adding a new Test Environment.md>) page
:::



:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/40mA6GLQ9vSDkJ_AmbKKd_create-test-modal.png" size="84" width="543" height="423" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/40mA6GLQ9vSDkJ_AmbKKd_create-test-modal.png"}

:::

Once these inputs are provided, Relicx will deploy a test pod and you would be able to start creating the test. If your start URL points to a page that is behind a login page then you will have to record the login first.&#x20;

When the `create test` button is clicked, as In the screenshot below, we will be shown the following screen in our demo app to capture the login steps. When the test runs again on this environment the test will use the same credentials to log into the app.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/vOr9dq5Ecy_Pu6OtTkyg__login-page.png)

Once on your login page, the steps are the same to capture the test. As you interact with your application, Relicx will start capturing the steps which will be recorded on the left navigation bar.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/MEvSw8zl2x2DSG32BGuof_test-steps.png)

At this point, you can also select a [User Actions](<./Interactive Test Authoring/User Actions.md>) from the dropdown or add an [Assertions](<./Interactive Test Authoring/Assertions.md>) to the test. But you can also go back to one of the previous steps and make simple modifications. But be careful about the changes you make. Relicx will not revalidate those changes and you may end up with a test that will not successfully execute.&#x20;

If you make a change and you need to start recording the test again, you may click on the `Go Live` button to bring the browser back to the current state.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/-PgSjPOmAkLuTqH56kBpW_screenshot-2023-06-15-at-11307-pm.png)

In the next sections, we will go over the commands you can choose while creating a test.
