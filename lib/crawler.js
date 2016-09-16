'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

function takeCategories() {
  document.getElementById('sd').click();
  var selector = 'div#condition form div#sd3 ul li:not([style*="none"])';
  var list = document.querySelectorAll(selector);
  return Array.prototype.map.call(list, function (item) {
    return item.innerText;
  });
}

function submit(categoryId) {
  document.getElementById('sd').click();

  document.getElementById(categoryId).click(); // check category

  var selector = '#main div.qd input.ok';
  document.querySelector(selector).click(); // submit form
}

function takePaths(categoryId) {
  var selector = '#main div.bannerPage table td:nth-of-type(5)';
  var pageInfo = document.querySelector(selector).innerText;
  var matches = pageInfo.match(/(\d+)\/(\d+)/);
  pageInfo = matches.slice(1, 3).map(function (e) {
    return parseInt(e);
  });

  selector = '#main div.detailsInfo table input.back';
  var nodes = document.querySelectorAll(selector);
  var paths = Array.prototype.map.call(nodes, function (node) {
    return node.getAttribute('onclick').match(/'(.+)'/)[1];
  });

  if (pageInfo[0] === pageInfo[1]) {
    document.getElementById(categoryId).click(); // unclick current category
  }

  return {
    pageInfo: pageInfo,
    paths: paths
  };
}

function nextPage() {
  document.getElementById('nextPage').click();
}

var Crawler = function () {
  function Crawler(url) {
    var workdir = arguments.length <= 1 || arguments[1] === undefined ? '.' : arguments[1];

    _classCallCheck(this, Crawler);

    this.url = url;
    this.workdir = workdir;
    this.depth = 0;
  }

  _createClass(Crawler, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _phantom2.default.create([], {
                  phantomPath: _path2.default.resolve(__dirname, '../node_modules/phantomjs-prebuilt/bin/phantomjs')
                });

              case 2:
                this.phantom = _context.sent;
                _context.next = 5;
                return this.phantom.createPage();

              case 5:
                this.page = _context.sent;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'abort',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.phantom.exit();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function abort() {
        return _ref2.apply(this, arguments);
      }

      return abort;
    }()
  }, {
    key: 'fetchCategories',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var categories;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                categories = null;
                _context3.prev = 1;
                _context3.next = 4;
                return this.page.open(this.url);

              case 4:
                _context3.next = 6;
                return this.page.evaluate(takeCategories);

              case 6:
                categories = _context3.sent;
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](1);

                console.log(_context3.t0);

              case 12:
                return _context3.abrupt('return', categories);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 9]]);
      }));

      function fetchCategories() {
        return _ref3.apply(this, arguments);
      }

      return fetchCategories;
    }()
  }, {
    key: 'fetchPaths',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(categoryIndex) {
        var categoryId, obj, paths;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                categoryId = (111 + categoryIndex).toString();
                _context4.next = 3;
                return this.page.open(this.url);

              case 3:
                _context4.next = 5;
                return this.page.evaluate(submit, categoryId);

              case 5:
                _context4.next = 7;
                return delay(3000);

              case 7:
                _context4.next = 9;
                return this.page.evaluate(takePaths, categoryId);

              case 9:
                obj = _context4.sent;
                paths = obj.paths;

              case 11:
                if (!(obj.pageInfo[0] < obj.pageInfo[1])) {
                  _context4.next = 22;
                  break;
                }

                _context4.next = 14;
                return this.page.evaluate(nextPage);

              case 14:
                _context4.next = 16;
                return delay(3000);

              case 16:
                _context4.next = 18;
                return this.page.evaluate(takePaths, categoryId);

              case 18:
                obj = _context4.sent;

                paths = paths.concat(obj.paths);
                _context4.next = 11;
                break;

              case 22:
                return _context4.abrupt('return', paths);

              case 23:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchPaths(_x2) {
        return _ref4.apply(this, arguments);
      }

      return fetchPaths;
    }()
  }]);

  return Crawler;
}();

exports.default = Crawler;