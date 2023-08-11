:::info DinD/Docker daemon

Error messages like `cannot connect to the Docker daemon` indicate that you might have multiple steps attempting to run Docker at the same time. This can occur when running GitHub Actions in stages that have [Docker-in-Docker (DinD) Background steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

**Actions that launch DinD:** You can't use GitHub Actions that launch DinD in the same stage where DinD is already running in a Background step. If possible, run the GitHub Action in a separate stage, or try to find a GitHub Action that doesn't use DinD.

**Actions that launch the Docker daemon:** If your Action is attempting to launch the Docker daemon, and you are have a DinD Background step in the same stage, you must add the stage variable `PLUGIN_DAEMON_OFF: true`, for example:

```yaml
        variables:
          - name: PLUGIN_DAEMON_OFF
            type: String
            description: ""
            required: false
            value: "false"
```

:::