---
title: Port Forwarding in Gitspaces
sidebar_position: 3
sidebar_label: Port Forward
---

## Explain about the port forwarding principles we are using

You can forward ports in your Gitspaces to test and debug your application. 

Port forwarding gives you access to TCP ports running within your Gitspace. For example, if you're running a web application on a particular port in your Gitspace, you can forward that port. This allows you to access the application from the browser on your local machine for testing and debugging.

When an application running inside a Gitspace prints output to the terminal that contains a localhost URL, such as `http://localhost:PORT` or `http://127.0.0.1:PORT`, the port is automatically forwarded. If you're using Gitspace in the browser or in Visual Studio Code, the URL string in the terminal is converted into a link that you can click to view the web page on your local machine.

## How to use port forwarding

1. First, you need to have a service you want to forward. If you don't have one yet but do have Node.js installed, you can run this command to start up a server on `port 3000`:

```sh
npx serve
```
2. Then, navigate to the **Ports** view in the Panel region (**Ports: Focus on Ports View**), and select **Forward a Port**.

3. If you are already **logged in** to your git provider, you'll be auto-forwarded to `port 3000`. 

4. Hovering over the **Forwarded Address**, you can use the inline actions copy the address, open it in your browser, or open an in-editor preview.


