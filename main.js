const yaml = require('js-yaml');
const fs = require('fs/promises');
const monitor = require('node-docker-monitor');
const bytes = require('bytes');
const path = require('path');

const configPath = path.join(__dirname, './config.yaml');

let config;

async function setupConfig() {
  const loadConfig = async () => {
    config = yaml.load(await fs.readFile(configPath, 'utf8'));
  }

  loadConfig();

  const watcher = fs.watch(configPath);
  for await (const { eventType } of watcher) {
    if (eventType === 'change') {
      await loadConfig();
    }
  }
}

async function updateResourcesLimits(id, docker, limits) {
  console.log('update', id, limits);

  const maxMemory = bytes(limits['max-memory']);
  try {
    await docker.getContainer(id).update({ Memory: maxMemory, MemorySwap: maxMemory });
  } catch (e) {
    console.warn('Unable to update container memory', e);
  }
}

async function handleContainerStart({ Id, Names }, docker) {
  console.log(Id, Names);
  const name = Names[0].slice(1);
  const limits = config.override.services[name] || config.defaults.services;
  await updateResourcesLimits(Id, docker, limits);
}

async function main() {
  setupConfig();

  let docker;
  const m = monitor({
    onContainerUp: container => handleContainerStart(container, docker),
    onContainerDown: () => {}
  });
  docker = m.docker;
}

main();
