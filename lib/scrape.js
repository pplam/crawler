'use strict';

require('babel-core/register');

require('babel-polyfill');

var _crawler = require('./crawler');

var _crawler2 = _interopRequireDefault(_crawler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var crawler, ret;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          crawler = new _crawler2.default('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do');
          _context.next = 3;
          return crawler.init();

        case 3:
          _context.next = 5;
          return crawler.start();

        case 5:
          ret = _context.sent;


          // const categories = await crawler.fetchCategories()
          //
          // const c = categories[1]
          // const entries = await crawler.fetchEntries(c)
          // const items = entries[0].items
          // const item = items[0]
          // const content = await crawler.fetchContents(item)
          // console.log('++')
          // console.log(c)
          // console.log('++---')
          // console.log(JSON.stringify(entries, null, 2))
          // console.log('++---')
          // console.log('++')
          console.log(JSON.stringify(ret, null, 2));
          // console.log('++')


          _context.next = 9;
          return crawler.abort();

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();

// [ { term: '办理地点及时间',
//     url: 'http://zwdt.sh.gov.cn/zwdtSW/zwdt/approval/itemOTInfo.do?ST_ID=51507' },
//   { term: '申请条件',
//       url: 'http://zwdt.sh.gov.cn/zwdtSW/zwdt/approval/itemAttInfo.do?ST_ID=51507&ST_CL_NAME=APPROVAL_CONDITIONS' },
//   { term: '申请材料',
//       url: 'http://zwdt.sh.gov.cn/zwdtSW/zwdt/approval/itemSheetInfo.do?ST_ID=51507&ST_CL_NAME=STUFF' },
//   { term: '设定依据',
//       url: 'http://zwdt.sh.gov.cn/zwdtSW/zwdt/approval/itemAttInfo.do?ST_ID=51507&ST_CL_NAME=APPROVAL_BASIS' },
//   { term: '办理流程',
//       url: 'http://zwdt.sh.gov.cn/zwdtSW/zwdt/approval/itemAttInfo.do?ST_ID=51507&ST_CL_NAME=FLOW_CHART' },
//   { term: '其他',
//       url: 'http://zwdt.sh.gov.cn/zwdtSW/zwdt/approval/otherInfo.do?ST_ID=51507' } ]