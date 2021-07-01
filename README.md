# docker-limits

Simple application that monitors docker containers, for memory consumption, and kills containers that are taking more
memory than VM has

## Configuration

repository contains `config.yaml` file at the root, for configuring the application

Example

```yaml
# default behaviour
defaults:
  vm:
    max-memory: 95% # if memory consumption reaches this limit, delete container, that consumes most of memory.
  service:
    max-memory: 4G # if set, service container will be killed, if limit is breached
override:
  vm:
    - name: hetzner-first # name of VM in D2C
      max-memory: 15G
  service:
    - name: accounting-v3 # name of service in D2C
      max-memory: 1G
```

## Architecture overview

After start, application will listen on output of `docker stats` command of docker.

Depending on containers resources consumption application can stop containers -

if container breaches specified limit (in override or defaults section) - container will be stopped.
if overall memory consumption will breach limit (in override or defaults section) - top container by memory consumption will be stopped.
