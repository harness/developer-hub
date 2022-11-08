---
title: Optimizing CI Build Times
description: You can use the following methods to speed up your CI builds. Test Intelligence. Testing is an important part of Continuous Integration. Testing safeguards the quality of your product before shipping…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: g3m7pjq79y
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the following methods to speed up your CI builds.

### Test Intelligence

Testing is an important part of Continuous Integration. Testing safeguards the quality of your product before shipping. But testing can also take a lot of time because a test cycle involves multiple tests. Often, the tests run are irrelevant to the code changes that triggered the build.

[Test Intelligence](../ci-quickstarts/test-intelligence-concepts.md) dramatically improves test times by running only the tests required to confirm the quality of the code changes that triggered the CI Pipeline. 

### Looping Strategies

[Looping strategies](https://docs.harness.io/article/eh4azj73m4) enable you to run a Stage or Step multiple times with different inputs. This eliminates the need to copy the same Stage or Step for each variation you need. It also makes the Pipeline more readable, clean, and easy to maintain. Looping strategies enable use cases such as:

* You want to test a UI feature in multiple browsers and platforms. You can define a matrix that specifies the browsers and platforms to test.
* You want to build artifacts for multiple JDK versions in the same Build Stage.
* You have a Build Pipeline with 20 unit tests. To speed up execution, you want to run the tests in parallel across 4 jobs that run 5 tests each.

### Optimize Docker Images to Reduce Build Times

The following practices can reduce your build times significantly: 

* Pre-build images that include all required dependencies. If most of the build time is spent downloading dependencies, you sh ould pre-build an image with all required dependencies in a separate pipeline. Set up a periodic pipeline that builds the image with all the latest dependencies and pushes it to the registry. This image will be used by all the build pipelines.  
Pre-building images with all required dependencies is more efficient than downloading them to a baseline image as part of the Build setup. This is especially true if you update your images often to ensure that they include all the latest updates.
* Exclude unnecessary files and packages from your images. In addition to reducing build times, this makes the resulting images smaller, simpler, and more portable. You can use [dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file) files to exclude unnecessary files and folders from your images.
* Sort multi-line arguments in your Dockerfile alphabetically. This makes it easier to update and avoid duplicate packages.

For more best practices, see [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) in the Docker documentation.

### Enable Docker Layer Caching in Build Steps

Remote Docker Layer Caching can dramatically improve build times by sharing layers across Pipelines, Stages, and Steps. You can set up Docker Layer Caching in the following Build Steps:

* [Build and Push to Docker Registry](../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md)
* [Build and Push to ECR](../ci-technical-reference/build-and-push-to-ecr-step-settings.md)
* [Build and Push to GCR](../ci-technical-reference/build-and-push-to-gcr-step-settings.md)

### Optimize your Build Tests

The following practices can reduce your testing and resulting build times:

* Use mock services in your unit tests, rather than setting up and connecting to third-party services. Mockups can often test your code as well as fully-running services but with fewer resources.
* Avoid integration tests in your build pipelines when possible. You might want to move these to a separate Pipeline.
* Look for obsolete tests that you can delete.
* Look for unnecessary `sleep` statements in your unit test code.
* Order your tests so that the tests most likely to fail come first.

### Cache and Reuse the Data for Your Fetch Operations

Caching and reusing can be useful for data that your builds need to fetch, but that you cannot include in an optimized image as described above. Caching ensures faster job execution by reusing the expensive fetch operation data from previous jobs. See the following for end-to-end-workflow descriptions:  

* [Harness CI for UI Builds](https://harness.io/blog/continuous-integration/harness-cie-ui-builds/)
* [Save and Restore Cache from S3](../use-ci/caching-ci-data/saving-cache.md)
* [Save and Restore Cache from GCS](../use-ci/caching-ci-data/save-cache-in-gcs.md)

### Increase Step Resources

If you still find that your builds are taking too long, check your infrastructure monitoring tools for potential bottlenecks during the time windows when your builds are running. Increasing memory or CPU capacity in your Build Steps might help speed up your builds. 

