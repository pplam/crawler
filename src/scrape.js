import 'babel-core/register'
import 'babel-polyfill'
import Crawler from './crawler'

(async function () {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')

  await crawler.init()
  const categories = await crawler.fetchCategories()
  console.log(categories)
  // for (const category of categories) {
  //   const entries = await crawler.fetchEntries(category)
  //   console.log(entries)
  // }
  // const contents = await crawler.fetchContents(entries[0])
  console.log()

  // categories.forEach(async category => {
  //   const entries = await crawler.fetchEntries(category)
  //   console.log(entries)
    // entries.forEach(e => {
    //   console.log(e.title)
    //   console.log(e.url)
    //   console.log(e.contents)
    //   console.log()
    // })
  // })
  // console.log(entries)
  await crawler.abort()

  // console.log('#####################')
  // categories.forEach(c => console.log(`${c.id}: ${c.name}`))
  // console.log(`===${categories.length} categories found`)
  // console.log()
  //
  // console.log('#####################')
  // entries.forEach(e => console.log(`${e.title}: ${e.url}, ${e.contents}`))
  // console.log(`===${entries.length} entries found in category: ${categories[25].name}`)
  // console.log()
  //
  // console.log('#####################')
  // contents.forEach(cont => console.log(`${cont.term}: ${cont.url}`))
  // console.log(`===contents of entry ${entries[0].title}`)
  // console.log(entries)
}())
