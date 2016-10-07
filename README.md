# crawler
A crawler for scraping guide information from Shanghai government's site

## Installation
~~~shell
git clone https://github.com/pplam/crawler.git && cd crawler
npm install
~~~
## Usage

### Having a taste:
~~~shell
npm run scrape
~~~
Please be patient, it will take 10~20 minutes to finish.

### Inviting it to your code:
~~~javascript
import Crawler from '{path}/src/crawler'  // The {path} is the path to this library

async function func() {
  const crawler = new Crawler('http://zwdt.sh.gov.cn/zwdtSW/bsfw/personalWork.do')
  await crawler.init()
  const res = await crawler.start()
  await crawler.stop()
}
~~~
