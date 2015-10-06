var check = require('check-types');
var verify = check.verify;
var semver = require('semver');

module.exports = function validate(update) {
  verify.object(update, 'expected JSON update info object');

  verify.unemptyString(update.name, 'missing name string ' +
    JSON.stringify(update, null, 2));
  if (update.name.length > 30) {
    throw new Error('invalid package name, too long',
    JSON.stringify(update, null, 2));
  }
  if (/\s/.test(update.name)) {
    throw new Error('package name cannot have white space',
      JSON.stringify(update, null, 2));
  }

  if (!semver.valid(update.from)) {
    throw new Error('invalid from version',
      JSON.stringify(update, null, 2));
  }
  if (!semver.valid(update.to)) {
    throw new Error('invalid to version',
      JSON.stringify(update, null, 2));
  }

  if (semver.gt(update.from, update.to)) {
    throw new Error('from version should be less than to version',
      JSON.stringify(update, null, 2));
  }

  if (!semver.lt(update.from, update.to)) {
    throw new Error('from version should be less than to version',
      JSON.stringify(update, null, 2));
  }
};
