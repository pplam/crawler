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
  return Array.prototype.map.call(list, (item) => {
    return item.innerText
  })
}

function submit(categoryId) {
  document.getElementById('sd').click()

  document.getElementById(categoryId).click()// check category

  const selector = '#main div.qd input.ok'
  document.querySelector(selector).click()// submit form
}

function takePaths(categoryId) {
  let selector = '#main div.bannerPage table td:nth-of-type(5)'
  let pageInfo = document.querySelector(selector).innerText
  const matches = pageInfo.match(/(\d+)\/(\d+)/)
  pageInfo = matches.slice(1,3).map(e => {
    return parseInt(e)
  })

  selector = '#main div.detailsInfo table input.back'
  const nodes = document.querySelectorAll(selector)
  const paths = Array.prototype.map.call(nodes, node => {
    return node.getAttribute('onclick').match(/'(.+)'/)[1]
  })

  if (pageInfo[0] === pageInfo[1]) {
    document.getElementById(categoryId).click()// unclick current category
  }

  return {
    pageInfo,
    paths,
  }
}

function nextPage() {
  document.getElementById('nextPage').click()
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
    let categories = null
    try {
      await this.page.open(this.url)
      categories = await this.page.evaluate(takeCategories)
    } catch (error) {
      console.log(error)
    }
    return categories
  }

  async fetchPaths(categoryIndex) {
    const categoryId = (111 + categoryIndex).toString()
    await this.page.open(this.url)
    await this.page.evaluate(submit, categoryId)

    await delay(3000)
    let obj = await this.page.evaluate(takePaths, categoryId)
    let paths = obj.paths

    while (obj.pageInfo[0] < obj.pageInfo[1]) {
      await this.page.evaluate(nextPage)
      await delay(3000)
      obj = await this.page.evaluate(takePaths, categoryId)
      paths = paths.concat(obj.paths)
    }
    return paths
  }
}
