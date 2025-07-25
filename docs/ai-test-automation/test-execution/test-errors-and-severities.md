---
title: Test Errors and Severities
description: Test Errors and Severities
sidebar_position: 50
---
It's important to understand that a Test step can encounter failures for various reasons. These failures can arise from a wide range of factors, including but not limited to software bugs, system glitches, or data inconsistencies. Harness AI Test Automation (AIT) not only identifies the failures but also categorizes them based on their impact and significance. This assessment is crucial because it not only helps in understanding the nature of the issue but also plays a pivotal role in determining the overall status of the test run.

There are four distinct severity levels that Harness AIT uses to classify step errors: Critical, Significant, Minor, and Low. Each of these levels represents a different degree of impact on the application or system being tested:

1. **Critical**: This severity level is reserved for issues that have a severe and immediate impact on the test run. 
2. **Significant**: Errors categorized as significant are still impactful but may not necessarily result in complete test failure. If a test execution encounters two significant errors the test run is terminated 
3. **Minor**: Minor errors are those that have a relatively low impact on the overall functionality of the application. These issues may cause inconveniences or minor glitches but are unlikely to disrupt essential processes. Tests with Minor severity issues do not result in outright failure but are marked as validation failed. 
4. **Low**: This is the lowest severity level, indicating errors with the least impact. Low-severity errors are often cosmetic in nature, such as minor UI glitches or non-critical data display issues. They are usually tolerable and do not significantly hinder the user experience.

By categorizing errors into these severity levels, Harness AIT provides valuable insights into the criticality of issues encountered during testing. This information helps testing teams prioritize their efforts, focusing on critical and significant issues that require immediate attention while allowing minor and low-severity issues to be addressed in due course.

In the table below, we list the default severities of the errors that are often encountered during a test run 

| **Error Type**                      | **Description**                                                                                    | **Default Error Severity** |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------- |
| API invocation mismatch             | Discrepancy or misalignment between the way an API is called or invoked                            | Low                        |
| API status                          | When API execution returns an error code                                                           | Low                        |
| App freeze seen                     | Application freeze is reported when the main thread doesn’t respond for more than 3000 ms          | Minor                      |
| Assert URL                          | Checks whether the application URL navigated to during the test execution matches the expected URL | Significant                |
| Console error                       | Programmatic issues affecting functionality of the app                                             | Low                        |
| Console warning                     | Non-critical issues or potential concerns in your application                                      | Low                        |
| Custom Application Error            | Catches user defined or unexpected application states e.g. Something went wrong error              | Minor                      |
| Dead Link error                     | Indicates a broken link or URL that is no longer functional                                        | Minor                      |
| Disconnected target                 | The target defined for a step no longer exists                                                     | Critical                   |
| Framework Error                     | Harness AIT test executor failed due to a System issue                                                  | Critical                   |
| Locator Match Failure               | Test executor failed to find a matching target as defined in the test                              | Significant                |
| Login Failure                       | The Harness AIT test executor could not log into the application                                        | Critical                   |
| Navigation error                    | Error or Unable to navigate to the specified URL                                                   | Critical                   |
| Navigation timeout on static URL    | The navigation timed out on a static URL during test execution                                     | Minor                      |
| Navigation timeout pending requests | The navigation timeout on an external URL                                                          | Minor                      |
| User defined assertion              | A user defined assertion failed                                                                    | Significant                |
| Visual validation error             | Visual error detected when comparing against a baseline                                            | Low                        |

The severity of some of these errors can be adjusted based on the application’s needs. Please navigate to Application Settings → Configuration to adjust the severities if you want to change them. You can also contact the Harness AIT team if you want to adjust the severity of one of the error types that is not listed here. 
