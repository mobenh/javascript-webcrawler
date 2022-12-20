const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express()

const url = 'https://www.walgreens.com'

//navigating from a “starting url” to a “listing page” on the website.
async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newpage();
    page.goto(url);

}

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        //const artText = articles.jsonValue();
        console.log({articles})
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))