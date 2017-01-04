import path from 'path'
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
  return Array.prototype.map.call(list, (li) => {
    return {
      name: li.innerText,
      id: li.querySelector('input').getAttribute('id'),
    }
  })
}

function filter(categoryId) {
  document.getElementById('sd').click()
  document.getElementById(categoryId).click()// check category
  const selector = '#main div.qd input.ok'
  document.querySelector(selector).click()// submit form
}

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
    const title = node.querySelector('p').textContent

    const trs = node.querySelectorAll('table tr:nth-of-type(3n+1)')
    const items = Array.prototype.map.call(trs, tr => {
      const input = tr.querySelector('input.back')
      const itemUrl = input ? site + input.getAttribute('onclick').match(/'(.+)'/)[1] : ''
      return {
        subtitle: tr.querySelector('td').textContent,
        url: itemUrl,
      }
    })

    return {
      title,
      items,
    }
  })

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
  return Array.prototype.map.call(list, li => {
    li.click()
    return {
      term: li.innerText,
      url: site + document.querySelector('#con_one_1 iframe').getAttribute('src'),
    }
  })
}

const extractContent = [
  () => {
    const selector = '.departInfo'
    const divs = document.querySelectorAll(selector)
    return Array.prototype.map.call(divs, div => {
      return div.textContent
    })
  },
  () => {
    const selector = 'body table tr'
    const trs = document.querySelectorAll(selector)
    return Array.prototype.map.call(trs, tr => {
      return tr.textContent
    })
  },
  () => {
    const selector = '#innerTable'
    const tds = document.querySelectorAll(selector)
    return Array.prototype.map.call(tds, td => {
      return td.textContent
    })
  },
  () => {
    const selector = 'td'
    const tds = document.querySelectorAll(selector)
    return Array.prototype.map.call(tds, td => {
      return td.textContent
    })
  },
  () => {
    const selector = 'td'
    const tds = document.querySelectorAll(selector)
    return Array.prototype.map.call(tds, td => {
      return td.textContent
    })
  },
  () => {
    const selector = 'body table tr'
    const trs = document.querySelectorAll(selector)
    const txts = Array.prototype.map.call(trs, tr => {
      return tr.textContent
    })

    return txts
  }
]

export default class Crawler {
  constructor(url) {
    this.url = url
  }

  async init() {
    this.phantom = await phantom.create([], {
      phantomPath: path.resolve(__dirname, '../node_modules/phantomjs-prebuilt/bin/phantomjs'),
    })
    this.page = await this.phantom.createPage()
  }

  async start() {
    const rets = []
    const categories = await this.fetchCategories()
    for (const c of categories) {
      const entries = await this.fetchEntries(c)
      for (const entry of entries) {
        const items = entry.items
        for (const item of items) {
          const contents = await this.fetchContents(item)
          const ret = {}

          ret['category'] = c.name
          ret['title'] = entry.title
          ret['subtitle'] = item.subtitle
          ret['mainUrl'] = item.url

          if (contents.length > 0) {
            ret['whenAndWhere'] = contents[0]['term']
            ret['whenAndWhereUrl'] = contents[0]['url']
            ret['whenAndWhereHtml'] = contents[0]['html']

            ret['requirements'] = contents[1]['term']
            ret['requirementsUrl'] = contents[1]['url']
            ret['requirementsHtml'] = contents[1]['html']

            ret['meterials'] = contents[2]['term']
            ret['meterialsUrl'] = contents[2]['url']
            ret['meterialsHtml'] = contents[2]['html']

            ret['accordingTo'] = contents[3]['term']
            ret['accordingToUrl'] = contents[3]['url']
            ret['accordingToHtml'] = contents[3]['html']

            ret['steps'] = contents[4]['term']
            ret['stepsUrl'] = contents[4]['url']
            ret['stepsHtml'] = contents[4]['html']

            ret['extra'] = contents[5]['term']
            ret['extraUrl'] = contents[5]['url']
            ret['extraHtml'] = contents[5]['html']
          }

          return ret;
          rets.push(ret)
        }
      }
    }

    return rets
  }

  async stop() {
    await this.phantom.exit()
  }

  async fetchCategories() {
    await this.page.open(this.url)
    const categories = await this.page.evaluate(takeCategories)
    await this.page.stop()
    return categories
  }

  async fetchEntries(category) {
    await this.page.open(this.url)
    await this.page.evaluate(filter, category.id)
    await delay(3000)

    let obj = await this.page.evaluate(takeEntries)
    let entries = obj.entries
    while (obj.pageInfo[0] < obj.pageInfo[1]) {
      await this.page.evaluate(nextPage)
      await delay(3000)
      obj = await this.page.evaluate(takeEntries)
      entries = entries.concat(obj.entries)
    }
    await this.page.stop()

    return entries
  }

  async fetchContents(item) {
    let contents = []
    if (item.url) {
      await this.page.open(item.url)
      contents = await this.page.evaluate(takeContents)
      await this.page.stop()
      for (let i = 0; i < contents.length; i++) {
        const content = contents[i]
        await this.page.open(content.url)
        // content.html = await this.page.evaluate(() => {
        //   return document.querySelector('body').textContent
        // })
        content.html = await this.page.property('plainText')
        await this.page.stop()
      }
    }
    return contents
  }
}
