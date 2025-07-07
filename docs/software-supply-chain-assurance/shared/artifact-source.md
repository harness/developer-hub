import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>

<TabItem value="har" label="HAR" default>

* **Registry:** Select the Harness Registry configured for the Harness Artifact Registry where your artifact is stored.

* **Image:** Enter the name of your image with tag or digest, such as `imagename:tag` or `imagename:digest`.

</TabItem>


  <TabItem value="dockerhub" label="Docker Registry" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image using either a tag or a digest. For example: `my-docker-org/repo-name:tag` or `my-docker-org/repo-name@sha256:<digest>`

:::note

Unlike other artifact sources, JFrog Artifactory requires additional permissions for attestation. The connector’s user or token must have `Read`, `Annotate`, `Create/Deploy`, and `Delete` permissions.

:::


</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image with tag or digest for the image for which you're generating an SBOM, such as `my-docker-repo/my-artifact:latest` or `my-docker-repo/my-artifact@sha256:<digest>`.

* **Region:** The geographical location of your ECR repository.

* **Account ID:** The unique identifier associated with your AWS account.

</TabItem>

<TabItem value="gar" label="GAR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google artifact registry where the artifact is stored.

* **Image:** Enter the name of your image with tag or digest for which you're generating the SBOM, example `repository-name/image:tag` or `repository-name/image@sha256:<digest>`.

* **Host:** Enter your GAR Host name. The Host name is regional-based. For example, `us-east1-docker.pkg.dev`.

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`

</TabItem>

<TabItem value="acr" label="ACR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Azure container registry where the artifact is stored.

* **Image:** Enter your image details with a tag or digest in the format `<registry-login-server>/<repository>:<tag>` or `<registry-login-server>/<repository>@sha256:<digest>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where   `<registry-name>` is the name you have given to your container registry instance in Azure. Example input: `automate.azurecr.io/acr:test`

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription. 

</TabItem>
</Tabs>