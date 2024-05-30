### VM state manipulation chaos

- VM poweroff
- VM process kill (provided the process itself is not running as root)
- VM disk loss

### VM resource stress chaos

- VM CPU hog
- VM memory hog
- VM disk I/O stress

:::tip
Assumes the vCenter user access for the experiments is equal to or greater than what is laid out [here](/docs/chaos-engineering/get-started/prerequisites/shared/vcenter-based-chaos-access-requirements).
:::