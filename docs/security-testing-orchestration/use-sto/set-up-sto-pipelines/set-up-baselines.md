---
title: Set up target baselines
description: It is good practice to specify a baseline for every target
sidebar_position: 10
---

It is good practice to specify a baseline for every target. The baseline represents the root variant, such as the `main` branch or the `latest` tag. In some cases, you might want to use the name of the latest official release as the baseline. Baselines make it easy to identify issues in the baseline vs. issues in a downstream variant derived from that baseline. 

To view all targets in your account, and specify baselines for your targets, go to **Security Tests** (left menu) and then **Test Targets**.

<figure>

![](../../onboard-sto/static/targets-and-baselines.png)

<figcaption>Figure 1: <b>Test Targets</b> page</figcaption>

</figure>

## Specify a default baseline using regular expressions

In some cases, you might want to specify the name of the latest release for your target baseline. Suppose your organization publishes releases with names such as: 

* `3` (major release), `3.17` (minor release), `3.17.3` (hotfix), ... `3.18` (latest)

* `2023-02-29`, `2023-03-05`, `2023-03-12`, ... 2023-03-19 (latest)

:::info TBD

**Any other useful examples we might want to include?**

:::

With this cadence, the default baseline updates whenever a new release goes GA. In this case, you can use a regular expression (regex) to capture the latest release name and use it for the baseline. 

### Important notes

* When you specify a regex for the baseline, the scan step will determine the default based on the most recently created variant that matches the regex. 

* Use “Python syntax” for your expressions. This feature expects expressions based on the Python re module. 

* Defining regular expressions is outside the scope of this documentation. Harness recommends that you test any regular expressions thoroughly to ensure that the expression matches any variant name that might be used for the scan target.

### Regex examples

The following table shows a few simple examples of expressions for specific use cases.

<table>
    <tr>
        <th>Variant names</th>
        <th>Regular expression</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>code-v1.1 <br /> code-v1.2 <br /> code-v1.3 <br /> code-v2.1 <br /> code-v2.2 <br /> code-v20.31 </td>
        <td valign="top"><code>code\-v\d*\.\d*\</code></td>
        <td valign="top">
            <ul>
                <li><code><b>code\-v</b></code> start with <code>code</code>, dash, <code>v</code> </li>
                <li><code><b>\d*\.\d*\</b></code> follow with one or more digits, dot, one or more digits </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>3 <br /> 3.17 <br /> 3.17.3 <br /> 3.18 <br /> 3.18.12 <br /> 30.142.1 <br /> 30 </td>
        <td valign="top"><code>[\d.]+</code></td>
        <td valign="top">
            <ul>
                <li><code><b></b></code> any combination of digits and dots </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>2023-02-11 <br /> 2023-02-17 <br /> 2023-02-23  </td>
        <td valign="top"><code>\d\d\d\d-\d\d\-\d\d</code></td>
        <td valign="top">
            <ul>
                <li><code><b>\d\d\d\d-\d\d\-\d\d</b></code> four digits, dash, two digis, dash, two digits </li>
            </ul>
        </td>
    </tr>
</table>

