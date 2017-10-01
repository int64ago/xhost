# xhost

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/xhost.svg?style=flat-square
[npm-url]: https://npmjs.org/package/xhost
[download-image]: https://img.shields.io/npm/dm/xhost.svg?style=flat-square
[download-url]: https://npmjs.org/package/xhost

[HostAdmin](https://addons.mozilla.org/en-US/firefox/addon/hostadmin/) implementation in Node CLI

*Tips: ONLY test on Node v8+*

## Usage

 - [Fix permissions](https://code.google.com/archive/p/fire-hostadmin/wikis/GAIN_HOSTS_WRITE_PERM.wiki)
 - Edit `hosts` based on [Group syntax](#group-syntax)
 - `npm i -g xhost`
 - `xhost`

## Screenshot

![](https://cdn.int64ago.org/m4vq42fj.gif)

## Group syntax

```bash
#==== GROUPNAME
[...]
#====
```

for example:
```bash
#==== Project 1
#127.0.0.1       localhost1
127.0.0.1       localhost2
127.0.0.1       localhost3
#====

#==== Project 2
#127.0.0.1       localhost1
#127.0.0.1       localhost2
#127.0.0.1       localhost3
#====
```

## License

MIT