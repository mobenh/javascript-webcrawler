const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express()

const url = 'https://www.walgreens.com'
//const url = 'https://learnwebcode.github.io/practice-requests/'

//navigating from a “starting url” to a “listing page” on the website.
async function navigateToListing(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    url += '/store/c/productlist/N=20000910/1/ShopAll=20000910'
    await page.goto(url);
    //await page.click('.menu-trigger');
    //await page.click('#menu-shop-products');
    //await page.click('#Household Essentials');
    //const clickedMenu = await page.$eval('#menu-shop-products', el => el.textContent);

    console.log(url);
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