---
title: Ingest Artifacts Data
description: API to ingest artifacts data into SEI
sidebar_label: Ingest Artifacts Data
sidebar_position: 20
---

This topic provides a guide for ingesting CI/CD artifacts data into Harness SEI.

Harness SEI provides robust support for users to push CI/CD artifacts data into the module using a specific API endpoint. This is useful for aggregating and analyzing artifacts data from any CI/CD workflow, with the help of SEI CI/CD reports.

## API Details

The endpoint for pushing artifacts data in SEI is in the below format:

```bash
<BASE_URL>/v1/cicd/push_artifacts
```

Users must replace `<BASE_URL>` with the base API URL of Harness SEI, which varies based on the environment. For example: `https://app.harness.io/gateway/sei/api/v1/` or `https://app.harness.io/gratis/sei/api/`

### Usage Instructions

1. To use this endpoint, users must have a valid API key with permissions appropriate for ingesting artifacts. This key is included in the request header for authentication and authorization.
2. The base cURL command for pushing artifacts data is:

```bash
curl '<BASE_URL>/v1/cicd/push_artifacts' \
-H 'accept:application/json' -H 'authorization:Apikey <API_KEY>' \
-H 'content-type:application/json' --data-raw '<PAYLOAD>' --compressed --globoff
```

Customize the command with the following parameters:

- **`<BASE_URL>`:** The SEI platform's URL.
- **`<API_KEY>`:** The API key obtained from the SEI platform.
- **`<PAYLOAD>`:** A JSON payload containing the details of the artifacts, such as integration ID, repository name, job name, job run number, and artifact specifics (name, location, tag, digest, etc.).

3. Execute the cURL command in a command-line environment. Successful execution results in the artifacts being pushed to the SEI platform.

### Troubleshooting

- Ensure the SEI endpoint URL and network connectivity are correct.
- Confirm the validity and permissions of the API key.
- Check the payload for correct formatting and data accuracy.
