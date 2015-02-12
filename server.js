var express = require('express'),
    app = express(),
    scrape = require('./scraper.js');

// start scraping the Kickstarter urls
scrape.scrapeKickstarterUrls();

