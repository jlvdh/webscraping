var Spooky = require('spooky');

exports.scrapeKickstarterUrls = function() {
  var spooky = new Spooky({
      child: {
       'ignore-ssl-errors': 'yes',
       'ssl-protocol': 'any'
      },
      casper: {
        logLevel: 'debug',
        verbose: true
      }
    }, function(err) {

       spooky.start("https://www.kickstarter.com/discover/advanced?sort=magic");
       spooky.then(function() {
        var links = this.evaluate(function () {
        var projectPreview = document.querySelectorAll('#projects_list > li > div > div.project-thumbnail > a');
        return Array.prototype.map.call(projectPreview, function(e) {
          return e.getAttribute('href');
        });
      });
         this.emit("doSomethingWithLinks", links)
       });
      spooky.run();
    })
  spooky.on('doSomethingWithLinks', function(links) {
    // here you can add logic
    console.log(links);
  });
  // logging
  spooky.on('console', function(line) {
    console.log(line);
  });
  spooky.on('error', function (e, stack) {
   console.error(e);

    if (stack) {
        console.log(stack);
    }
  });
  };
