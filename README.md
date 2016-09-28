# crawler
A crawler for scraping guide information from Shanghai government's site

## Installation
~~~
git clone https://github.com/pplam/crawler.git && cd crawler
npm install
~~~
## Usage

### Data structure:
~~~javascript
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
The urls of contents point to the final resources.

### Having a taste:
~~~
npm run transpile
npm run scrape
~~~
Please be patient, it will take 10~20 minutes.

### Inviting it to your code:
~~~javascript
import Crawler from '{path}/src/crawler'  // The {path} is the path to this library

async function func() {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')
  await crawler.init()
  const categories = await crawler.fetchCategories()  // Here you will get array of categories
  // do something...
  const entries = await crawler.fetchEntries(category)  // The parameter category object must have an id property, and you will get array of entries here
  // do somthing...
  const contents = await crawler.fetchContents(item)  // The parameter item object must have an url property, and you will get array of contents here
  // do something...
  await crawler.abort()
}
~~~
