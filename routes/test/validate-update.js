gt.module('update validation');
var validate = require('../validate-update');

gt.test('valid', function () {
  gt.func(validate, 'is a function');
  validate({
    name: 'lodash',
    from: '0.1.0',
    to: '0.2.0'
  });
});

gt.test('missing name', function () {
  gt.raises(function () {
    validate({
      from: '0.2.0',
      to: '2.0.0'
    });
  }, Error, 'missing name');
});

gt.test('long name', function () {
  gt.raises(function () {
    validate({
      name: 'this is very very long name, something is wrong',
      from: '0.2.0',
      to: '2.0.0'
    });
  }, Error, 'long name');
});

gt.test('name with space', function () {
  gt.raises(function () {
    validate({
      name: 'this has spaces',
      from: '0.2.0',
      to: '2.0.0'
    });
  }, Error, 'spaces in name');
});

gt.test('invalid from version', function () {
  gt.raises(function () {
    validate({
      name: 'something-here',
      from: 'latest',
      to: '2.0.0'
    });
  }, Error, 'invalid version');
});

gt.test('missing to version', function () {
  gt.raises(function () {
    validate({
      name: 'something-here',
      from: '2.0.0'
    });
  }, Error, 'missing to version');
});

gt.test('from version is after to', function () {
  gt.raises(function () {
    validate({
      name: 'something-here',
      from: '2.0.0',
      to: '1.0.0'
    });
  }, Error, 'version order');
});

gt.test('from version is same as to', function () {
  gt.raises(function () {
    validate({
      name: 'something-here',
      from: '2.0.0',
      to: '2.0.0'
    });
  }, Error, 'versions are equal');
});
