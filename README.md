# docker-limits

Simple application that monitors docker containers, and enforces resources limits

## Configuration

repository contains `config.yaml` file at the root, for configuring the application

Example

```yaml
# default behaviour
defaults:
  service:
    max-memory: 4G # if set, service container will be killed, if limit is breached
override:
  service:
    - name: accounting-v3 # name of service in D2C
      max-memory: 1G
```

## Architecture overview

Application watches containers, after container start, it will attach resources limitations on a container.

## Install & run

Make sure you have appropriate node version (specified in .nvmrc file)

You cannot configure docker socket custom path for now.

### Local development

```
npm install
node main.js
```

### Production

repo contains install & update scripts

- install.sh - will create systemd service, enable it to run on startup and starts it
- update.sh - fetches the latest update from repository and restarts service

to install service run
```shell
curl -s https://raw.githubusercontent.com/rollun-com/docker-limits/master/install.sh | bash
```

to update service run
```shell
curl -s https://raw.githubusercontent.com/rollun-com/docker-limits/master/update.sh | bash
```

## TODO

Add auto-deploy
