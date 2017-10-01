const inquirer = require('inquirer');
const chalk = require('chalk');
const co = require('co');

const helper = require('./helper');

function* main() {
  const hostsObj = helper.readHosts();
  const choices = [];

  for(let [group, hosts] of Object.entries(hostsObj)) {
    if (group !== 'common') {
      choices.push({
        name: group,
        checked: helper.isGroupEnabled(hostsObj, group),
      });
    }
  }

  const results = yield inquirer.prompt({
    type: 'checkbox',
    message: 'Please choose hosts groups:',
    name: 'groups',
    choices,
  });

  for(let [group, hosts] of Object.entries(hostsObj)) {
    if (group !== 'common') {
      helper.toggleGroup(hostsObj, group, !!~results.groups.indexOf(group));
    }
  }

  helper.print(hostsObj)
}

module.exports = function() {
  co(main).then(result => {
    result && console.log(`${chalk.green(result)}`);
  }).catch(err => {
    console.error(`${chalk.red(err)}`);
    process.exit();
  });
}