---
title: The Role of HELM and Spinnaker
---


Question:
*This is a Q&A pulled from the Spinnaker Community Slack team, which [we encourage you to join here](http://join.spinnaker.io/).*
Thank you for helping me understand the roles of Helm and Spinnaker.
As you might have guessed, I am very new to Helm. Currently, we are running our services in ```Docker Swarm``` and we’re doing a POC on ```Kubernetes + Spinnaker + Helm```. Each of our service GitHub repo has a ```Dockerfile``` which has ```CMD```s and ```RUN```s tasks, how can I translate those in ```HELM Charts``` ?
Example:
FROM nginx

COPY build /usr/share/nginx/html
COPY entrypoint.sh /
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

RUN apt-get update && apt-get install -y curl 

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -fkL http://localhost:8080/health || exit 1

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
EXPOSE 443
How and where can I write this in HELM Charts?

Answer:
You may be getting the role of the Dockerfile and the Helm chart confused. Your Dockerfile is supposed to define the way you application runs and the environment required for it to run. When built, the Dockerfile produces a Docker image which is then run on Kubernetes. A Helm chart defines all of the Kubernetes resources needed to run your application. For example, a ```Deployment``` is used to take your Docker image, run it (w/ multiple replicas) and make sure it stays available. You would then use a Helm chart to template this ```Deployment``` so that it makes it easier to deploy the same thing across multiple environments.
We made a video explaining how it all fits together


