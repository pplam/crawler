import 'babel-core/register'
import 'babel-polyfill'
import Crawler from './crawler'

(async function () {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')

  await crawler.init()
  const ret = await crawler.start()
  console.log(JSON.stringify(ret, null, 2))
  await crawler.stop()
}())
