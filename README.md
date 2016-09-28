# crawler
A crawler for scraping guide information from Shanghai government's site

## Installation
~~~
git clone https://github.com/pplam/crawler.git && cd crawler
npm install
~~~
## Usage

### Data structure:
~~~
category: {
  id,
  name,
  [entries],
}

entry: {
  title,
  [items],
}

item: {
  subtitle,
  url,
  [contents],
}

content: {
  term,
  url,
}
~~~
The url of content point to the final resource.

### Having a taste:
~~~
npm run transpile
npm run scrape
~~~

### Inviting it to your code:
~~~
import Crawler from '{path}/src/crawler'

async function func() {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')
  await crawler.init()
  const categories = await crawler.fetchCategories()  // Here you will get array of categories
  do something...
  const entries = await crawler.fetchEntries(category)  // The parameter category object must have an id property, and you will get array of entries here
  do somthing...
  const contents = await crawler.fetchContents(item)  // The parameter item object must have an url property, and you will get array of contents here
  do something...
  await crawler.abort()
}
~~~
