'use strict';

require('babel-core/register');

require('babel-polyfill');

var _crawler = require('./crawler');

var _crawler2 = _interopRequireDefault(_crawler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var crawler, categories, paths;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          crawler = new _crawler2.default('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do');
          _context.next = 3;
          return crawler.init();

        case 3:
          _context.next = 5;
          return crawler.fetchCategories();

        case 5:
          categories = _context.sent;
          _context.next = 8;
          return crawler.fetchPaths(25);

        case 8:
          paths = _context.sent;
          _context.next = 11;
          return crawler.abort();

        case 11:

          console.log('#####################');
          console.log(categories.join('\n'));
          console.log('===' + categories.length + ' categories found');
          console.log();

          console.log('#####################');
          console.log(paths.join('\n'));
          console.log('===' + paths.length + ' entries found in category: ' + categories[25]);
          console.log();

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();