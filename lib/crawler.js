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
    li.click();
    return {
      term: li.innerText,
      url: site + document.querySelector('#con_one_1 iframe').getAttribute('src')
    };
  });
}

var Crawler = function () {
  function Crawler(url) {
    _classCallCheck(this, Crawler);

    this.url = url;
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
    key: 'start',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var rets, categories, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, c, entries, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, entry, items, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, contents, ret;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rets = [];
                _context2.next = 3;
                return this.fetchCategories();

              case 3:
                categories = _context2.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 7;
                _iterator = categories[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 76;
                  break;
                }

                c = _step.value;
                _context2.next = 13;
                return this.fetchEntries(c);

              case 13:
                entries = _context2.sent;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 17;
                _iterator2 = entries[Symbol.iterator]();

              case 19:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 59;
                  break;
                }

                entry = _step2.value;
                items = entry.items;
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context2.prev = 25;
                _iterator3 = items[Symbol.iterator]();

              case 27:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context2.next = 42;
                  break;
                }

                item = _step3.value;
                _context2.next = 31;
                return this.fetchContents(item);

              case 31:
                contents = _context2.sent;
                ret = {};


                ret['category'] = c.name;
                ret['title'] = entry.title;
                ret['subtitle'] = item.subtitle;
                ret['mainUrl'] = item.url;

                if (contents.length > 0) {
                  ret['whenAndWhere'] = contents[0]['term'];
                  ret['whenAndWhereUrl'] = contents[0]['url'];
                  ret['whenAndWhereHtml'] = contents[0]['html'];

                  ret['requirements'] = contents[1]['term'];
                  ret['requirementsUrl'] = contents[1]['url'];
                  ret['requirementsHtml'] = contents[1]['html'];

                  ret['meterials'] = contents[2]['term'];
                  ret['meterialsUrl'] = contents[2]['url'];
                  ret['meterialsHtml'] = contents[2]['html'];

                  ret['accordingTo'] = contents[3]['term'];
                  ret['accordingToUrl'] = contents[3]['url'];
                  ret['accordingToHtml'] = contents[3]['html'];

                  ret['steps'] = contents[4]['term'];
                  ret['stepsUrl'] = contents[4]['url'];
                  ret['stepsHtml'] = contents[4]['html'];

                  ret['extra'] = contents[5]['term'];
                  ret['extraUrl'] = contents[5]['url'];
                  ret['extraHtml'] = contents[5]['html'];
                }

                rets.push(ret);

              case 39:
                _iteratorNormalCompletion3 = true;
                _context2.next = 27;
                break;

              case 42:
                _context2.next = 48;
                break;

              case 44:
                _context2.prev = 44;
                _context2.t0 = _context2['catch'](25);
                _didIteratorError3 = true;
                _iteratorError3 = _context2.t0;

              case 48:
                _context2.prev = 48;
                _context2.prev = 49;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 51:
                _context2.prev = 51;

                if (!_didIteratorError3) {
                  _context2.next = 54;
                  break;
                }

                throw _iteratorError3;

              case 54:
                return _context2.finish(51);

              case 55:
                return _context2.finish(48);

              case 56:
                _iteratorNormalCompletion2 = true;
                _context2.next = 19;
                break;

              case 59:
                _context2.next = 65;
                break;

              case 61:
                _context2.prev = 61;
                _context2.t1 = _context2['catch'](17);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t1;

              case 65:
                _context2.prev = 65;
                _context2.prev = 66;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 68:
                _context2.prev = 68;

                if (!_didIteratorError2) {
                  _context2.next = 71;
                  break;
                }

                throw _iteratorError2;

              case 71:
                return _context2.finish(68);

              case 72:
                return _context2.finish(65);

              case 73:
                _iteratorNormalCompletion = true;
                _context2.next = 9;
                break;

              case 76:
                _context2.next = 82;
                break;

              case 78:
                _context2.prev = 78;
                _context2.t2 = _context2['catch'](7);
                _didIteratorError = true;
                _iteratorError = _context2.t2;

              case 82:
                _context2.prev = 82;
                _context2.prev = 83;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 85:
                _context2.prev = 85;

                if (!_didIteratorError) {
                  _context2.next = 88;
                  break;
                }

                throw _iteratorError;

              case 88:
                return _context2.finish(85);

              case 89:
                return _context2.finish(82);

              case 90:
                return _context2.abrupt('return', rets);

              case 91:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 78, 82, 90], [17, 61, 65, 73], [25, 44, 48, 56], [49,, 51, 55], [66,, 68, 72], [83,, 85, 89]]);
      }));

      function start() {
        return _ref2.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'stop',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.phantom.exit();

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop() {
        return _ref3.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: 'fetchCategories',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var categories;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.page.open(this.url);

              case 2:
                _context4.next = 4;
                return this.page.evaluate(takeCategories);

              case 4:
                categories = _context4.sent;
                _context4.next = 7;
                return this.page.stop();

              case 7:
                return _context4.abrupt('return', categories);

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchCategories() {
        return _ref4.apply(this, arguments);
      }

      return fetchCategories;
    }()
  }, {
    key: 'fetchEntries',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(category) {
        var obj, entries;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.page.open(this.url);

              case 2:
                _context5.next = 4;
                return this.page.evaluate(filter, category.id);

              case 4:
                _context5.next = 6;
                return delay(3000);

              case 6:
                _context5.next = 8;
                return this.page.evaluate(takeEntries);

              case 8:
                obj = _context5.sent;
                entries = obj.entries;

              case 10:
                if (!(obj.pageInfo[0] < obj.pageInfo[1])) {
                  _context5.next = 21;
                  break;
                }

                _context5.next = 13;
                return this.page.evaluate(nextPage);

              case 13:
                _context5.next = 15;
                return delay(3000);

              case 15:
                _context5.next = 17;
                return this.page.evaluate(takeEntries);

              case 17:
                obj = _context5.sent;

                entries = entries.concat(obj.entries);
                _context5.next = 10;
                break;

              case 21:
                _context5.next = 23;
                return this.page.stop();

              case 23:
                return _context5.abrupt('return', entries);

              case 24:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchEntries(_x) {
        return _ref5.apply(this, arguments);
      }

      return fetchEntries;
    }()
  }, {
    key: 'fetchContents',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(item) {
        var contents, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, content;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                contents = [];

                if (!item.url) {
                  _context6.next = 40;
                  break;
                }

                _context6.next = 4;
                return this.page.open(item.url);

              case 4:
                _context6.next = 6;
                return this.page.evaluate(takeContents);

              case 6:
                contents = _context6.sent;
                _context6.next = 9;
                return this.page.stop();

              case 9:
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context6.prev = 12;
                _iterator4 = contents[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context6.next = 26;
                  break;
                }

                content = _step4.value;
                _context6.next = 18;
                return this.page.open(content.url);

              case 18:
                _context6.next = 20;
                return this.page.property('content');

              case 20:
                content.html = _context6.sent;
                _context6.next = 23;
                return this.page.stop();

              case 23:
                _iteratorNormalCompletion4 = true;
                _context6.next = 14;
                break;

              case 26:
                _context6.next = 32;
                break;

              case 28:
                _context6.prev = 28;
                _context6.t0 = _context6['catch'](12);
                _didIteratorError4 = true;
                _iteratorError4 = _context6.t0;

              case 32:
                _context6.prev = 32;
                _context6.prev = 33;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 35:
                _context6.prev = 35;

                if (!_didIteratorError4) {
                  _context6.next = 38;
                  break;
                }

                throw _iteratorError4;

              case 38:
                return _context6.finish(35);

              case 39:
                return _context6.finish(32);

              case 40:
                return _context6.abrupt('return', contents);

              case 41:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[12, 28, 32, 40], [33,, 35, 39]]);
      }));

      function fetchContents(_x2) {
        return _ref6.apply(this, arguments);
      }

      return fetchContents;
    }()
  }]);

  return Crawler;
}();

exports.default = Crawler;