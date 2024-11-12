const express = require('express');
const app = express();
const helmet = require("helmet");


// Apply various security middleware functions using helmet
app.use(

  // Hide the "X-Powered-By" header to prevent disclosing the server technology (e.g., Express)
  helmet.hidePoweredBy(),

//Sets the frame policy to prevent the site’s content from being displayed within an iframe on any site.
  
helmet.frameguard({

  // The 'deny' option blocks iframe use on all sites
    action: 'deny'
  }),

//Sanitizes input sent to the server
helmet.xssFilter(),

//It prevents the browser to alter the Content-Type Header
helmet.noSniff(),


// which prevents the browser from opening files of untrusted types
helmet.ieNoOpen(),

//Protect websites against protocol downgrade attacks and cookie hijacking
helmet.hsts({
  maxAge: 90*24*60*60,
  force: true
}),

//Checks if DNS prefetch is enable or disabled
helmet.dnsPrefetchControl(),

//Disables caching for allow users to use the latest website version, in case of it gets some updates.
helmet.noCache()


)




































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
