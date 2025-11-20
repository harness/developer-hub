---
title: Getting the IP of an EC2 Instance With Pipeline Expressions
---


Question
How do I get the IP of an instance in an ASG through a Pipeline Expression in Spinnaker?
Answer
You can’t get the IP address of instance through pipeline expressions, however, you can get the Instance ID and pass it to something like Jenkins and script a job to get the IP Address. Generally speaking you should not be accessing an instance by IP address, because you never know when an IP address might change.
Example Of Getting Instance ID With A Pipeline Expression
```${#stage('stage name')['id']}```

