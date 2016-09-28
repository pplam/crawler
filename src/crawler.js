import path from 'path'
import url from 'url'
import phantom from 'phantom'

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function takeCategories() {
  document.getElementById('sd').click()
  const selector = 'div#condition form div#sd3 ul li:not([style*="none"])'
  const list = document.querySelectorAll(selector)
  return Array.prototype.map.call(list, (item) => {
    return {
      name: item.innerText,
      id: item.querySelector('input').getAttribute('id'),
    }
  })
}

function filter(categoryId) {
  document.getElementById('sd').click()

  document.getElementById(categoryId).click()// check category

  const selector = '#main div.qd input.ok'
  document.querySelector(selector).click()// submit form
}

function unfilter(categoryId) {
  document.getElementById(categoryId).click()
}// optional

function takeEntries() {
  let selector = '#main div.bannerPage table td:nth-of-type(5)'
  let pageInfo = document.querySelector(selector).innerText
  const matches = pageInfo.match(/(\d+)\/(\d+)/)
  pageInfo = matches.slice(1, 3).map(e => {
    return parseInt(e, 10)
  })

  const site = 'http://zwdt.sh.gov.cn'
  selector = '#main div.detailsInfo'
  const divs = document.querySelectorAll(selector)
  const entries = Array.prototype.map.call(divs, node => {
    const item = node.querySelector('table input.back')
    const entryUrl = item ? site + item.getAttribute('onclick').match(/'(.+)'/)[1] : ''
    return {
      title: node.querySelector('p').innerText,
      url: entryUrl,
    }
  })

  // if (pageInfo[0] === pageInfo[1]) {
  //   document.getElementById(categoryId).click()// unclick current category
  // }

  return {
    pageInfo,
    entries,
  }
}

function nextPage() {
  document.getElementById('nextPage').click()
}

function takeContents() {
  const site = 'http://zwdt.sh.gov.cn'
  const selector = '#con_one_1 ul li'
  const list = document.querySelectorAll(selector)
  return Array.prototype.map.call(list, item => {
    // const term = item.innerText
    item.click()
    // const contentPath = document.querySelector('#con_one_1 iframe').getAttribute('src')
    return {
      term: item.innerText,
      url: site + document.querySelector('#con_one_1 iframe').getAttribute('src'),
    }
  })
}

export default class Crawler {
  constructor(url, workdir = '.') {
    this.url = url
    this.workdir = workdir
    this.depth = 0
  }

  async init() {
    this.phantom = await phantom.create([], {
      phantomPath: path.resolve(__dirname, '../node_modules/phantomjs-prebuilt/bin/phantomjs'),
    })
    this.page = await this.phantom.createPage()
  }

  async abort() {
    await this.phantom.exit()
  }

  async fetchCategories() {
    await this.page.open(this.url)
    // delay(30000)
    // await this.page.render('start.jpeg', { format: 'jpeg', quality: '100' })
    const categories = await this.page.evaluate(takeCategories)
    // console.log(categories)
    // await this.page.render('afterTakeCategories.jpeg', { format: 'jpeg', quality: '100' })
    await this.page.stop()
    for (const category of categories) {
      category.entries = await this.fetchEntries(category)
    //   await this.page.render(`${category.id}.jpeg`, { format: 'jpeg', quality: '100' })
    //   console.log(category)
      // delay(30000)
    }
    return categories
  }

  async fetchEntries(category) {
    await this.page.open(this.url)
    await this.page.evaluate(filter, category.id)

    await delay(30000)
    // await this.page.render(`${category.name}.jpeg`, { format: 'jpeg', quality: '100' })
    let obj = await this.page.evaluate(takeEntries)
    let entries = obj.entries
    // console.log(entries)

    while (obj.pageInfo[0] < obj.pageInfo[1]) {
      await this.page.evaluate(nextPage)
      await delay(30000)
      obj = await this.page.evaluate(takeEntries)
      entries = entries.concat(obj.entries)
    }
    await this.page.stop()

    for (const entry of entries) {
      entry.contents = entry.url ? (await this.fetchContents(entry)) : null
      // delay(30000)
    }
    return entries
    // entries.forEach()
    // return entries.map(async entry => {
      // const contents = await this.fetchContents(entry)
      // console.log(contents)
      // return {
      //   title: entry.title,
      //   url: entry.url,
      //   contents: await this.fetchContents(entry),
        // contents: entry.contents,
    //   }
    // })
  }

  async fetchContents(entry) {
    // const page = await this.phantom.createPage()
    // console.log(entry)
    await this.page.open(entry.url)
    // await this.page.render(`${entry.title}.jpeg`, { format: 'jpeg', quality: '100' })
    const contents = await this.page.evaluate(takeContents)
    // console.log(contents)
    // console.log()
    await this.page.stop()
    // await this.page.close()
    return contents
    // return [1, 2, 3]
    // const contents = await this.page.evaluate(takeContents)
    // return contents.map(content => {
    //   return {
    //     term: content.term,
    //     url: url.resolve(this.url, content.path),
    //   }
    // })
  }
}
