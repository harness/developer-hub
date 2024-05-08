#### Is there a method to modify permissions for write access to the `/tmp` directory in order to mitigate the risk of a team unintentionally or intentionally deleting it, thereby avoiding potential disruptions for other teams that rely on it without restrictions ?

No, we don't have such feature availibility now.
Although one can simply use containerized step groups instead of having teams work out of `/tmp`.
Please refer more on containerized step group in this [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/)


#### Do common containerized steps like "run" and "git clone" require a CI license to be available in CD step groups?

No, you do not need a CI license to use the "run" and "git clone" steps in a CD step group, even though they are typically listed under the "build" section.


#### Can I use Plugin or Git Clone steps in Deploy or Custom stages?

Yes, you can add these steps in containerized step groups in Deploy or Custom stages.


#### Can I use any CI steps in a containerized step group?

No. Only some step types are available in containerized step groups.


#### Where are steps in containerized step groups executed?

They are executed on a separate pod created at runtime.

The pod is cleaned up after step group execution ends.


