# Harness Developer Hub

![CI](static/img/icon_ci.svg)
![CD](static/img/icon_cd.svg)
![FF](static/img/icon_ff.svg)
![CCM](static/img/icon_ccm.svg)
![SRM](static/img/icon_srm.svg)
![STO](static/img/icon_sto.svg)
![CE](static/img/icon_ce.svg)

Repository for the Harness Developer Hub [HDH].
Learn intelligent software delivery skills at your own paceand in once place. Step-by-step tutorials, videos, and referencedocs to help you create and deliver software.

### Local Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
