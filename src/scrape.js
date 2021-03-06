import 'babel-core/register'
import 'babel-polyfill'
import Crawler from './crawler'

(async function () {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')

  await crawler.init()
  const rets = await crawler.start()
  await crawler.stop()

  console.log(JSON.stringify(rets, null, 2))
}())
