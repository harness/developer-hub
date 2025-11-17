---
title: Where Does Spinnaker Begin and Jenkins End
---


### Question:
Where does Spinnaker begin and Jenkins end?
### Answer:
Spinnaker is not a build server. It was never designed that way. While in theory Spinnaker could implement its own service that acts as a build server, there is no need to do this. Spinnaker takes advantage of the existing Jenkins ecosystem and uses Jenkins behinds the scenes. Spinnaker was designed from the ground up to be a cloud deployment tool combining Continuous Integration and Continuous Delivery. This means that instead of just executing arbitrary tasks, it has first class support for cloud concepts.

