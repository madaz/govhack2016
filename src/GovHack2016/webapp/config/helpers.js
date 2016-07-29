const path = require('path');


const _root = path.resolve(__dirname, '..');

exports.rootDir = _root;
exports.root = (...args) => path.join.apply(path, [_root, ...args]);