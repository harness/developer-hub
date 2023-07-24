<!-- details><summary>Container image scan settings</summary -->

The following settings apply to all scanners where the `scan_type` is `containerImage`.

* `container_type`
	+ accepted value(s): `local_image`, `docker_v2`, `jfrog_artifactory`, `aws_ecr`
		- for `container_type` set to `local`
			* `None`
		- for `container_type` set to `docker_v2`
			* `container_access_id`: Username
			* `container_access_token`: Password/Token
		- for `container_type` set to `jfrog_artifactory`
			* `container_access_id`: Username
			* `container_access_token`: Password/Token
		- for `container_type` set to `aws_ecr`
			* `container_access_id`: Username
			* `container_access_token`: Password/Token
			* `container_region`: AWS default region
* `container_domain`

<!-- 
|  |  |
| --- | --- |
| **Target Name** | **Target Type** |
| local\_image | container |
| docker\_v2 | container |
| jfrog\_artifactory | container |
| aws\_ecr | container |
| website | instance |

-->

<!-- /details -->