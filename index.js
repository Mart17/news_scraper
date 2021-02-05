const pup = require('puppeteer')

async function scrapeNews(url) {
  const browser = await pup.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('/html/body/div[4]/div/section[2]/div/div/div[1]/ul/li[1]/div/div/div[2]/div[1]/h3/a/span[2]/span')
  const headline = await page.evaluate(el => el.textContent, el)

  const [el2] = await page.$x('//*[@id="headlines"]/div/div/div[1]/ul/li[1]/div/div/div[2]/div[2]/div[1]/text()')
  const desc = await page.evaluate(el2 => el2.textContent, el2)

  const [el3] = await page.$x('//*[@id="headlines"]/div/div/div[1]/ul/li[1]/div/div/div[1]/div/picture/img')
  const imgSrc = await page.evaluate(el3 => el3.src, el3)

  const scrapedData = { headline, desc, imgSrc }

  console.log(scrapedData)

  browser.close()
}

scrapeNews('https://www.theguardian.com/us')
