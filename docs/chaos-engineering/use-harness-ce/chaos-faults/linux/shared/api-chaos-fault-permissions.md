### Fault permissions
- The fault uses the `root` Linux user and `root` user group.
- `/tmp` dir should be exec permissible i.e. it shouldn't be mounted as `noexec`. To check, you may execute: `findmnt -l | grep noexec | grep /tmp`. To remount `/tmp` dir with exec permissions, you can execute: `sudo mount /tmp -o remount,exec`.