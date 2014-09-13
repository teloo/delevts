var path = require('path');
var fs = require('fs');

var execute = function(pluginName, configFilePathStr, callback) {
  if (!pluginName) {
    callback(new Error('Input the plugin name'));
    return;
  }
  if (!configFilePathStr) {
    callback(new Error('Input the config file path'));
    return;
  }

  var configFilePath = path.normalize(configFilePathStr);
  if (!fs.existsSync(configFilePath)) {
    callback(new Error('Not found "' + configFilePath + '"'));
    return;
  }

  var plugin;
  try {
    plugin = require('delevts-plugin-' + pluginName);
  } catch (err) {
    callback(new Error('Not found module "delevts-plugin-' + pluginName + '"'));
    return;
  }

  var config;
  try {
    config = JSON.parse(fs.readFileSync(configFilePath));
  } catch (err) {
    callback(new Error('Config file is invalid syntax'));
    return;
  }

  plugin.deleteEvents(config, callback);
};

exports.execute = execute;
