var expect = require('expect.js');
var proxyquire = require('proxyquire');

var testPlugin = {
  deleteEvents: function(config, callback) {
    expect(config.key).to.be('value');
    callback(null, 1);
  },
  '@noCallThru': true
};
var delevts = proxyquire('../lib', {'delevts-plugin-test': testPlugin});

var TEST_PLUGIN_NAME = 'test';
var CONFIG_FILE_PATH = __dirname + '/valid-config.json';
var INVALID_CONFIG_FILE_PATH = __dirname + '/invalid-config.json';

describe('execute', function() {
  it('execute', function(done) {
    delevts.execute(TEST_PLUGIN_NAME, CONFIG_FILE_PATH, function(err, count) {
      expect(err).to.be(null);
      expect(count).to.be(1);
      done();
    });
  });

  it('cause error when plugin name is undefined', function(done) {
    delevts.execute(undefined, CONFIG_FILE_PATH, function(err, count) {
      expect(err.message).to.be('Input the plugin name');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when plugin name is null', function(done) {
    delevts.execute(null, CONFIG_FILE_PATH, function(err, count) {
      expect(err.message).to.be('Input the plugin name');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when plugin name is invalid', function(done) {
    delevts.execute('invalid', CONFIG_FILE_PATH, function(err, count) {
      expect(err.message).to.be('Not found module "delevts-plugin-invalid"');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when config file path string is undefined', function(done) {
    delevts.execute(TEST_PLUGIN_NAME, undefined, function(err, count) {
      expect(err.message).to.be('Input the config file path');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when config file path string is null', function(done) {
    delevts.execute(TEST_PLUGIN_NAME, null, function(err, count) {
      expect(err.message).to.be('Input the config file path');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when config file path string is invalid', function(done) {
    delevts.execute(TEST_PLUGIN_NAME, 'invalid', function(err, count) {
      expect(err.message).to.be('Not found "invalid"');
      expect(count).to.be(undefined);
      done();
    });
  });

  it('cause error when config file content is invalid', function(done) {
    delevts.execute(TEST_PLUGIN_NAME, INVALID_CONFIG_FILE_PATH, function(err, count) {
      expect(err.message).to.be('Config file is invalid syntax');
      expect(count).to.be(undefined);
      done();
    });
  });
});
