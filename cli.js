#!/usr/bin/env node

const main = require('./src/index');
const updateNotifier = require('update-notifier');
const pkg = require('./package');

updateNotifier({ pkg }).notify();

const args = process.argv.slice(2);
if (args[0] && args[0] === '-v' || args[0] === '--version') {
  console.log(pkg.version);
  process.exit();
}

main();