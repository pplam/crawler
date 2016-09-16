import 'babel-core/register'
import 'babel-polyfill'
import Crawler from './crawler'

(async function () {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')

  await crawler.init()
  const categories = await crawler.fetchCategories()
  const paths = await crawler.fetchPaths(25)
  await crawler.abort()

  console.log('#####################')
  console.log(categories.join('\n'))
  console.log(`===${categories.length} categories found`)
  console.log()

  console.log('#####################')
  console.log(paths.join('\n'))
  console.log(`===${paths.length} entries found in category: ${categories[25]}`)
  console.log()
}())
