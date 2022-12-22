const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express()

const url = 'https://www.walgreens.com'
let url2 = ''
const attributes = []

//navigating from a “starting url” to a “listing page” on the website.
async function navigateToListing(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    url2 = url + '/store/c/productlist/N=20000910/1/ShopAll=20000910'
    await page.goto(url2);
    scrapePage(url2);
    await browser.close();
}

//collecting a small number of specified attributes on the page.
function scrapePage(url){
        axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
        
            $('.product-container', html).each(function () {
                const productNames = $(this).text()
                const prices = $(this).find('.product__price-contain').text()
                const imgURL = $(this).find('a').attr('href')
                const url = $(this).find('img').attr('src')
                attributes.push({
                    productNames,
                    prices,
                    imgURL,
                    url
                })
            })
            console.log(attributes)
        }).catch(err => console.log(err))
}

navigateToListing(url);
console.log('Please wait, scraping in progress')