STO uses [CI build infrastructures](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md) to orchestrate scans and ingest issues. The following table shows the supported operating systems and architectures for each build infrastructure option.

<table>
    <tr>
        <th>Operating System</th>
        <th>Architecture</th>
        <th>Harness Cloud</th>
        <th>Self-managed local runner</th>
        <th>Self-managed AWS/GCP/Azure VMs</th>
        <th>Self-managed Kubernetes cluster</th>
    </tr>
    <tr>
        <td>Linux</td>
        <td>amd64</td>
        <td align="left">✅ Supported</td>
        <td align="left">✅ Supported</td>
        <td align="left">✅ Supported</td>
        <td align="left">✅ Supported</td>
    </tr>
    <tr>
        <td>Linux</td>
        <td>arm64</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
    </tr>
    <tr>
        <td>macOS</td>
        <td>arm64 (M1)</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
    <td align="left">❌ Not supported</td>
    </tr>
    <tr>
        <td>Windows</td>
        <td>amd64</td>
        <td align="left">Coming soon</td>
        <td align="left">❌ Not supported</td>
        <td align="left">Coming soon</td>
        <td align="left">❌ Not supported</td>
    </tr>
    <tr>
        <td>Windows</td>
        <td>arm64</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
        <td align="left">❌ Not supported</td>
    </tr>
</table>