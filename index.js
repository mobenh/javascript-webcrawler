const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express()

//const url = 'https://www.walgreens.com'
const url = 'https://learnwebcode.github.io/practice-requests/'

//navigating from a “starting url” to a “listing page” on the website.
async function navigateToListing(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.click('#inner-focus')
    const clickedMenu = await page.$eval('#dropdown dropdown__menu', el => el.textContent)
    console.log(clickedMenu)
    await browser.close();
}

navigateToListing(url);



// axios(url)
//     .then(response => {
//         const html = response.data
//         const $ = cheerio.load(html)
//         const articles = []
//         $('.fc-item__title', html).each(function() {
//             const title = $(this).text()
//             const url = $(this).find('a').attr('href')
//             articles.push({
//                 title,
//                 url
//             })
//         })
//         console.log({articles})
//     }).catch(err => console.log(err))



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))