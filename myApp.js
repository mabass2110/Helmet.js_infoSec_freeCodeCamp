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
