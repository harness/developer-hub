
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Learn how to **create a Hugging Face Artifact Registry**, **configure the client**, and **publish or resolve Hugging Face models and datasets** using the CLI.

## Prerequisites
- Install the **Hugging Face CLI** (`pip install -U huggingface_hub` gives you the `hf` command).  
- Access to a Harness account with permissions to create registries and generate identity tokens.

---

## Create a Hugging Face artifact registry
Start by creating a new Hugging Face registry in your Harness project.

1. Under **Registries**, click **New Artifact Registry**.
2. Select **Hugging Face** as the registry type.
3. Provide a **Registry Name**.
   
:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

4. (Optional) Add a Description and Labels.
5. Click **Create Registry**.

:::info private registry
This registry will serve as your private Hugging Face registry within Harness.
:::

:::warning No upstream proxy
Hugging Face registries do not proxy to the public Hub. If content is not present in your Harness registry, it will not automatically resolve from `huggingface.co`. Teams can switch endpoints when needed or pre-populate the registry with required artifacts. Client-side caching still applies.
:::

---

## Configure client

### Configure environment variables
1. Set up environment variables to connect to Harness Artifact Registry.
```bash
# Recommended timeouts for model/dataset resolution.
export HF_HUB_ETAG_TIMEOUT=86400
export HF_HUB_DOWNLOAD_TIMEOUT=86400

# Point the client at your Harness registry endpoint (example shown).
export HF_ENDPOINT="https://pkg.<env>.harness.io/pkg/<HARNESS_ACCOUNT_ID>/<REGISTRY_NAME>/huggingface"
```

:::info Client version
For Hugging Face client version 0.19.0 and above, this timeout setting enables model resolution via pipelines and tokenizer libraries.
:::

### Configure authentication
2. Click **Generate token** to generate an identity token.
3. Copy the token.
4. Set the token as an environment variable with the following command:
```bash
export HF_TOKEN="<token from step 2>"
```

### Deploy models and datasets
<Tabs groupId="models-datasets">
<TabItem value="models" label="Models">

Upload a model to Artifact Registry using the huggingface_hub library:
```bash
from huggingface_hub import HfApi
api = HfApi()
api.upload_folder(
    folder_path="<folder_name>", # local folder containing model files
    repo_id="<ARTIFACT_NAME>", # name for the model in the registry
    revision="<VERSION>", # model version (defaults to 'main')
    repo_type="model"
)
```
</TabItem>
<TabItem value="datasets" label="Datasets">

Upload a dataset to Artifact Registry using the huggingface_hub library:
```bash
from huggingface_hub import HfApi
api = HfApi()
api.upload_folder(
    folder_path="<folder_name>", # local folder containing dataset files
    repo_id="<ARTIFACT_NAME>", # name for the dataset in the registry
    revision="<VERSION>", # dataset version (defaults to 'main')
    repo_type="dataset"
)
```
</TabItem>
</Tabs>

### Resolve models and datasets
<Tabs groupId="models-datasets">
<TabItem value="models" label="Models">

Download a model from Artifact Registry:
```bash
from huggingface_hub import snapshot_download
snapshot_download(
    repo_id="<ARTIFACT_NAME>", revision="<VERSION>", etag_timeout=86400
)
```

:::info model resolution
With Hugging Face client version 0.19.0+ and HF_HUB_ETAG_TIMEOUT set, you can resolve models with transformers, diffusers, and other libraries.
:::

</TabItem>
<TabItem value="datasets" label="Datasets">

Artifact Registry supports resolving models using Hugging Face dataset libraries:
```bash
from datasets import load_dataset
dataset = load_dataset("<ARTIFACT_NAME>")
```

Or download an entire dataset repository using the snapshot_download API:
```bash
from huggingface_hub import snapshot_download
snapshot_download(
    repo_id="<ARTIFACT_NAME>", revision="<VERSION>", repo_type="dataset", etag_timeout=86400
)
```

:::warning dataset caching
Artifact Registry fully caches only datasets hosted directly on Hugging Face, not those referencing external sources.
:::
</TabItem>
</Tabs>

## Troubleshooting
- 401 or auth prompts. Re-run `hf login --token "$HF_TOKEN"` and verify **HF_ENDPOINT** is set in the current shell.
- Slow downloads or timeouts. Increase **HF_HUB_ETAG_TIMEOUT** and **HF_HUB_DOWNLOAD_TIMEOUT**. Verify network egress to the Harness endpoint.
- File too large. Ensure Git LFS is used automatically by the CLI; confirm the LFS filter in your repo and re-try the upload.