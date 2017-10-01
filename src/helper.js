const fs = require('fs-extra');
const ip = require('ip');

const isWin = process.platform === 'win32';

const EOL = isWin
  ? '\r\n'
  : '\n';

const HOSTS = isWin
  ? 'C:/Windows/System32/drivers/etc/hosts'
  : '/etc/hosts';

const readLine = line => {
  const enabled = !line.startsWith('#');
  if (!enabled) {
    line = line.substr(1);
  }
  const lineSplit = line.split(/\s+/);
  if (!lineSplit[0]
    || (!ip.isV4Format(lineSplit[0]) && !ip.isV6Format(lineSplit[0]))) {
    return null;
  }
  return {
    enabled,
    ip: lineSplit[0],
    others: lineSplit.slice(1).join(' '),
  };
};

const printLine = obj => {
  return `${obj.enabled ? '' : '#'}${obj.ip} ${obj.others}${EOL}`;
}

const isGroupEnd = line => {
  return line === '#====';
};

const isGroupStart = line => {
  if (!isGroupEnd(line) && line.startsWith('#====')) {
    return line.substr(5).trim();
  }
  return false;
};

exports.readHosts = () => {
  let group = 'common';
  const hostsObj = {};
  const hosts = fs.readFileSync(HOSTS, 'utf-8');
  const splits = hosts.split(EOL);
  splits.forEach(line => {
    line = line.trim();
    if (!line) return;
    const _g = isGroupStart(line);
    if (_g) {
      group = _g;
    } else if (isGroupEnd(line)) {
      group = 'common';
    } else {
      const host = readLine(line);
      if (host) {
        hostsObj[group] = hostsObj[group] || [];
        hostsObj[group].push(host);
      }
    }
  });
  return hostsObj;
}

exports.print = hostsObj => {
  let output = '';

  for(let [group, hosts] of Object.entries(hostsObj)) {
    if (group === 'common') {
      hosts.forEach(host => {
        output += printLine(host);
      });
    } else {
      output += `#==== ${group}${EOL}`;
      hosts.forEach(host => {
        output += printLine(host);
      });
      output += `#====${EOL}`;
    }
    output += EOL;
  }

  fs.writeFileSync(HOSTS, output, 'utf-8');
}

exports.isGroupEnabled = (hostsObj, group) => {
  const hosts = hostsObj[group];
  return hosts.every(host => host.enabled);
}

exports.toggleGroup = (hostsObj, group, enabled) => {
  const hosts = hostsObj[group];
  hosts.forEach(host => {
    host.enabled = enabled;
  });
}