var express = require('express'),
    app = express(),
    scrape = require('./scraper.js');

scrape.scrapeKickstarterUrls();

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

