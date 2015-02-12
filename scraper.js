var Spooky = require('spooky');

exports.scrapeKickstarterUrls = function() {
    var spooky = new Spooky({
        child: {
            // kickstarter uses https so we need to set phantomJS to utilise ssl
            'ignore-ssl-errors': 'yes',
            'ssl-protocol': 'any'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function(err) {
        function getLinks() {
            var links = this.evaluate(function() {
                // get all the links on a page
                var projectPreview = document.querySelectorAll('#projects_list > li > div > div.project-thumbnail > a');
                return Array.prototype.map.call(projectPreview, function(e) {
                    return e.getAttribute('href');
                });
            });
            // this sends the code to the listener
            this.emit("doSomethingWithLinks", links)
                // clicks on the 'show more button'
            this.click('#projects > div.container-flex.px2 > div > a');
            // limit the amount of links you want to scrape
            if (links.length < 200) {
                this.wait(2000, function() {
                    getLinks.call(this);
                })
            }
        }
        spooky.start("https://www.kickstarter.com/discover/advanced?sort=magic");
        spooky.then(getLinks);
        spooky.run();
    })
    spooky.on('doSomethingWithLinks', function(links) {
        // here you can add logic to save the links to a database
        console.log(links);
    });
    // logging
    spooky.on('console', function(line) {
        console.log(line);
    });
    spooky.on('error', function(e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });
};