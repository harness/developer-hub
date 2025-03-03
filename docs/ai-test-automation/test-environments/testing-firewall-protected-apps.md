:::hint{type="info"}
This feature is available in the Enterprise Tier Plan
:::

Relicx executes tests from cloud locations. However, if the applications being tested are not accessible over the public internet, Relicx provides support for private locations. To enable this feature, customers can install a dockerized Relicx agent (based on the <a href="https://github.com/jpillora/chisel" target="_blank">Open Source Chisel project</a>) within their network. This creates a secure outbound connection to the Relicx cloud endpoint (proxy.relicx.ai). The connection is established through a TCP tunnel that is transported over HTTPS and runs a socks proxy server, which is locally exposed via a reverse port forward. Each agent/location has a unique set of credentials generated for authentication purposes, which allows the Relicx test execution service in the cloud to access the private location securely. The agent is automatically disconnected when the private location is deleted.

### Creating and installing a Tunnel

To create a private location, click on “**Tunnels**” on the navigation bar and the “**Create Tunnel**” button on the top of the Tunnels page.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/vo5txmhhVuriJ2hHJXBcd_tunnel-1.png)

Enter the **name** of the Tunnel and click on save

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/HtXDd7GJJJuNAb-dLT29a_tunnel-3.png)

Once the Tunnel is saved, you will be prompted to **copy the docker command** or download it as a script.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/Wrtf-UZd9MF352ehaunxd_tunnel-4.png)

Copy this command and execute it on a Terminal window to initiate the container. Docker will download the image from the repository and run this container. Make sure to run this command on a machine that can communicate to the internet ( i.e. Relicx Cloud) and is also not shutdown frequently. The connection will be lost once container is shutdown or it is no longer running.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/v497LZex91ERvdUYOG6Nc_tunnel-5.png)

Once the container is running, you can refresh the Tunnels page and see the g**reen** status icon next to it.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/lSj1wYeNTrlY2AmkvwpTI_tunnel-6.png)

## Watch a video demo of Tunnels

<iframe src="https://www.loom.com/embed/faf0f78098be4a47881699a4fcf1138e" width="960" height="540" frameborder="0" allowfullscreen></iframe>
