In interactive authoring of tests, as the user interacts with their application, Relicx automatically records each user action and creates a sequence of steps that represent the user activity. While the user actions are captured as is, the user can also add assertions to ensure test steps are executed as expected.&#x20;

In the following section, we will provide an overview of all the supported user actions. For Assertions please review the [Assertions](./Assertions.md) section

## Click

| Description       | This is the most widely used command in all tests. The user can click on any place on the viewport and it will be registered as a click command as a test step. No action is necessary on the user side |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | None                                                                                                                                                                                                    |
| Advanced options  | None                                                                                                                                                                                                    |
| Return value      | None                                                                                                                                                                                                    |

## Write

| Description       | This command is used to write to any input fields                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Parameter options | It is possible to parameterize the input text. You will have to set a parameter first using the `Set Parameter` command |
| Advanced options  | None                                                                                                                    |
| Return value      | None                                                                                                                    |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/1J5V6445GRVXT5dtLphLy_write-commands.png" size="50" width="730" height="408" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/1J5V6445GRVXT5dtLphLy_write-commands.png"}

:::

## Select

| Description       | This command is used to select a value from a list |
| ----------------- | -------------------------------------------------- |
| Parameter options | No                                                 |
| Advanced options  | None                                               |
| Return value      | None                                               |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/bkiQ6jOjS29U2xm_ZCC96_screenshot-2023-06-15-at-41954-pm.png" size="50" width="333" height="336" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/bkiQ6jOjS29U2xm_ZCC96_screenshot-2023-06-15-at-41954-pm.png"}

:::

:::hint{type="info"}
The three commands Click, Write and Select are automatically detected by Relicx and the user doesn't need to select the command from the list
:::

## Navigate

| Description       | This command is used to navigate to a specific URL                                                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | No                                                                                                                                                                                                                                 |
| Advanced options  | Yes. `BASE_URL` translation can be set to `True` or `False`. Users can decide to set this option depending on the nature of the URL. If the test navigates to an external URL, then `BASE_URL` translation should be set to False. |
| Return value      | None                                                                                                                                                                                                                               |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/Oo4HjL1XneoZ60H0W6k0b_screenshot-2023-06-15-at-42256-pm.png" size="50" width="332" height="394" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/Oo4HjL1XneoZ60H0W6k0b_screenshot-2023-06-15-at-42256-pm.png"}

:::

## Wait for time

| Description       | This command adds the ability to wait for a specified period of time |
| ----------------- | -------------------------------------------------------------------- |
| Parameter options | Time in ms to wait                                                   |
| Advanced options  | No                                                                   |
| Return value      | None                                                                 |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HbDNDbU6pAAsDDQargHEw_screenshot-2023-06-15-at-52144-pm.png" size="50" width="350" height="255" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HbDNDbU6pAAsDDQargHEw_screenshot-2023-06-15-at-52144-pm.png"}

:::

## Reload

| Description       | This command is used to reload or refresh the page. The command is not frequently used.  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Parameter options | No                                                                                       |
| Advanced options  | No                                                                                       |
| Return value      | None                                                                                     |

## Viewport

| Description       | This command allows the user to set the width and height of their screens. You can use this option to emulate different size screens for your app. |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | width ( 1440 px), height (900 px)                                                                                                                  |
| Advanced options  | No                                                                                                                                                 |
| Return value      | None                                                                                                                                               |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/ylRF-4Uem_Npw00v_azbv_screenshot-2023-06-15-at-44445-pm.png" size="50" width="354" height="359" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/ylRF-4Uem_Npw00v_azbv_screenshot-2023-06-15-at-44445-pm.png"}

:::

## Key press

| Description       | This sets the type of key press to perform. A common example would be to send an `Enter` command while writing to a text field. |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | Command to be sent                                                                                                              |
| Advanced options  | No                                                                                                                              |
| Return value      | None                                                                                                                            |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/E8ku1ubUKNJjX2lJArB8z_screenshot-2023-06-15-at-44747-pm.png" size="50" width="378" height="347" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/E8ku1ubUKNJjX2lJArB8z_screenshot-2023-06-15-at-44747-pm.png"}

:::

## Mouse over

| Description       | This command adds the ability to point the mouse to a specific target. if a menu is displayed on the mouse over this command can be used to take the mouse pointer to the specific location to display the specific menu. |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | None                                                                                                                                                                                                                      |
| Advanced options  | No                                                                                                                                                                                                                        |
| Return value      | None                                                                                                                                                                                                                      |



:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HbDNDbU6pAAsDDQargHEw_screenshot-2023-06-15-at-52144-pm.png" size="50" width="350" height="255" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HbDNDbU6pAAsDDQargHEw_screenshot-2023-06-15-at-52144-pm.png"}

:::

## Double Click

| Description       | This command adds a double click on a target. You will use this command if the app  |
| ----------------- | ----------------------------------------------------------------------------------- |
| Parameter options | None                                                                                |
| Advanced options  | No                                                                                  |
| Return value      | None                                                                                |

## Right Click

| Description       | This command adds a right-click on a target.  |
| ----------------- | --------------------------------------------- |
| Parameter options | None                                          |
| Advanced options  | No                                            |
| Return value      | None                                          |

## Set Parameter

| Description       | This command allows the user to set a parameter during the execution of the test. Often we have a requirement to use the value of a certain element as the input in another step. Parameters can be used to address such requirements |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | Name of the parameter Value of the parameter. You may select an option from the list.The custom script option often comes in handy for the example in the description                                                                 |
| Advanced options  | Set the context as `Run time`, `App`, and `Test Suite`                                                                                                                                                                                |
| Return value      | None                                                                                                                                                                                                                                  |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HcSGeR1AbU7u1d7-UYJYL_screenshot-2023-06-15-at-54617-pm.png" size="50" width="332" height="503" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HcSGeR1AbU7u1d7-UYJYL_screenshot-2023-06-15-at-54617-pm.png"}

:::

