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
