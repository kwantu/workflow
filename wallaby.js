module.exports = function () {
  return {
    files: [
      'index.js',
      'lib/**/*.js'
    ],

    tests: [
      'test/server/**/*.js',
      'test/**/*.json'
    ],

    env: {
      type: 'node',
      runner: 'node'
    }
  };
};
