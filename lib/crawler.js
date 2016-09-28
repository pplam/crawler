'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

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
  return Array.prototype.map.call(list, function (li) {
    return {
      name: li.innerText,
      id: li.querySelector('input').getAttribute('id')
    };
  });
}

function filter(categoryId) {
  document.getElementById('sd').click();

  document.getElementById(categoryId).click(); // check category

  var selector = '#main div.qd input.ok';
  document.querySelector(selector).click(); // submit form
}

// function unfilter(categoryId) {
//   document.getElementById(categoryId).click()
// }

function takeEntries() {
  var selector = '#main div.bannerPage table td:nth-of-type(5)';
  var pageInfo = document.querySelector(selector).innerText;
  var matches = pageInfo.match(/(\d+)\/(\d+)/);
  pageInfo = matches.slice(1, 3).map(function (e) {
    return parseInt(e, 10);
  });

  var site = 'http://zwdt.sh.gov.cn';
  selector = '#main div.detailsInfo';
  var divs = document.querySelectorAll(selector);
  var entries = Array.prototype.map.call(divs, function (node) {
    var title = node.querySelector('p').innerText;

    var trs = node.querySelectorAll('table tr:nth-of-type(3n+1)');
    var items = Array.prototype.map.call(trs, function (tr) {
      var input = tr.querySelector('input.back');
      var itemUrl = input ? site + input.getAttribute('onclick').match(/'(.+)'/)[1] : '';
      return {
        subtitle: tr.querySelector('td').innerText,
        url: itemUrl
      };
    });
    return {
      title: title,
      items: items
    };
  });

  // if (pageInfo[0] === pageInfo[1]) {
  //   document.getElementById(categoryId).click()// unclick current category
  // }

  return {
    pageInfo: pageInfo,
    entries: entries
  };
}

function nextPage() {
  document.getElementById('nextPage').click();
}

function takeContents() {
  var site = 'http://zwdt.sh.gov.cn';
  var selector = '#con_one_1 ul li';
  var list = document.querySelectorAll(selector);
  return Array.prototype.map.call(list, function (li) {
    // const term = item.innerText
    li.click();
    // const contentPath = document.querySelector('#con_one_1 iframe').getAttribute('src')
    return {
      term: li.innerText,
      url: site + document.querySelector('#con_one_1 iframe').getAttribute('src')
    };
  });
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
        var categories, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, category;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.page.open(this.url);

              case 2:
                _context3.next = 4;
                return this.page.evaluate(takeCategories);

              case 4:
                categories = _context3.sent;
                _context3.next = 7;
                return this.page.stop();

              case 7:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 10;
                _iterator = categories[Symbol.iterator]();

              case 12:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 20;
                  break;
                }

                category = _step.value;
                _context3.next = 16;
                return this.fetchEntries(category);

              case 16:
                category.entries = _context3.sent;

              case 17:
                _iteratorNormalCompletion = true;
                _context3.next = 12;
                break;

              case 20:
                _context3.next = 26;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3['catch'](10);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 26:
                _context3.prev = 26;
                _context3.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 29:
                _context3.prev = 29;

                if (!_didIteratorError) {
                  _context3.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context3.finish(29);

              case 33:
                return _context3.finish(26);

              case 34:
                return _context3.abrupt('return', categories);

              case 35:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 22, 26, 34], [27,, 29, 33]]);
      }));

      function fetchCategories() {
        return _ref3.apply(this, arguments);
      }

      return fetchCategories;
    }()
  }, {
    key: 'fetchEntries',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(category) {
        var obj, entries, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, entry, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.page.open(this.url);

              case 2:
                _context4.next = 4;
                return this.page.evaluate(filter, category.id);

              case 4:
                _context4.next = 6;
                return delay(10000);

              case 6:
                _context4.next = 8;
                return this.page.evaluate(takeEntries);

              case 8:
                obj = _context4.sent;
                entries = obj.entries;
                // console.log(entries)

              case 10:
                if (!(obj.pageInfo[0] < obj.pageInfo[1])) {
                  _context4.next = 21;
                  break;
                }

                _context4.next = 13;
                return this.page.evaluate(nextPage);

              case 13:
                _context4.next = 15;
                return delay(10000);

              case 15:
                _context4.next = 17;
                return this.page.evaluate(takeEntries);

              case 17:
                obj = _context4.sent;

                entries = entries.concat(obj.entries);
                _context4.next = 10;
                break;

              case 21:
                _context4.next = 23;
                return this.page.stop();

              case 23:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 26;
                _iterator2 = entries[Symbol.iterator]();

              case 28:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context4.next = 65;
                  break;
                }

                entry = _step2.value;
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 33;
                _iterator3 = entry.items[Symbol.iterator]();

              case 35:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context4.next = 48;
                  break;
                }

                item = _step3.value;

                if (!item.url) {
                  _context4.next = 43;
                  break;
                }

                _context4.next = 40;
                return this.fetchContents(item);

              case 40:
                _context4.t0 = _context4.sent;
                _context4.next = 44;
                break;

              case 43:
                _context4.t0 = null;

              case 44:
                item.contents = _context4.t0;

              case 45:
                _iteratorNormalCompletion3 = true;
                _context4.next = 35;
                break;

              case 48:
                _context4.next = 54;
                break;

              case 50:
                _context4.prev = 50;
                _context4.t1 = _context4['catch'](33);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t1;

              case 54:
                _context4.prev = 54;
                _context4.prev = 55;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 57:
                _context4.prev = 57;

                if (!_didIteratorError3) {
                  _context4.next = 60;
                  break;
                }

                throw _iteratorError3;

              case 60:
                return _context4.finish(57);

              case 61:
                return _context4.finish(54);

              case 62:
                _iteratorNormalCompletion2 = true;
                _context4.next = 28;
                break;

              case 65:
                _context4.next = 71;
                break;

              case 67:
                _context4.prev = 67;
                _context4.t2 = _context4['catch'](26);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t2;

              case 71:
                _context4.prev = 71;
                _context4.prev = 72;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 74:
                _context4.prev = 74;

                if (!_didIteratorError2) {
                  _context4.next = 77;
                  break;
                }

                throw _iteratorError2;

              case 77:
                return _context4.finish(74);

              case 78:
                return _context4.finish(71);

              case 79:
                return _context4.abrupt('return', entries);

              case 80:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[26, 67, 71, 79], [33, 50, 54, 62], [55,, 57, 61], [72,, 74, 78]]);
      }));

      function fetchEntries(_x2) {
        return _ref4.apply(this, arguments);
      }

      return fetchEntries;
    }()
  }, {
    key: 'fetchContents',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(item) {
        var contents;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.page.open(item.url);

              case 2:
                _context5.next = 4;
                return this.page.evaluate(takeContents);

              case 4:
                contents = _context5.sent;
                _context5.next = 7;
                return this.page.stop();

              case 7:
                return _context5.abrupt('return', contents);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchContents(_x3) {
        return _ref5.apply(this, arguments);
      }

      return fetchContents;
    }()
  }]);

  return Crawler;
}();

exports.default = Crawler;