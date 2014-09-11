var path = require('path');
var fs = require('fs');

var execute = function(pluginName, configFilePathStr) {
  validateParams(pluginName, configFilePathStr);

  var configFilePath = path.normalize(configFilePathStr);
  if (!fs.existsSync(configFilePath)) {
    throw new Error('Not found "' + configFilePath + '".');
  }

  var plugin = require('delevts-plugin-' + pluginName);

  var config = JSON.parse(fs.readFileSync(configFilePath));

  plugin.deleteEvents(config);
};

var validateParams = function(pluginName, configFilePathStr) {
  if (!pluginName) {
    throw new Error('"pluginName" is needed.');
  }
  if (!configFilePathStr) {
    throw new Error('"configFilePathStr" is needed.');
  }
};

exports.execute = execute;
