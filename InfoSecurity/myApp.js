const express = require('express');
const app = express();

const helmet = require('helmet');

/* 
app.use(helmet()) will automatically include all the middleware introduced below, except noCache(), and contentSecurityPolicy(), but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.
*/
//app.use(helmet.hidePoweredBy());

/* Sets "X-Frame-Options: DENY" */
//app.use(helmet.frameguard({ action: "deny" }));

/* Sets "X-XSS-Protection: 0" */
//app.use(helmet.xssFilter());

/* Sets "X-Content-Type-Options: nosniff" */
//app.use(helmet.noSniff());

/* Sets "X-Download-Options: noopen" */
//app.use(helmet.ieNoOpen());

/*
Configure helmet.hsts() to use HTTPS for the next 90 days. Pass the config object {maxAge: timeInSeconds, force: true}. You can create a variable ninetyDaysInSeconds = 90*24*60*60; to use for the timeInSeconds. Replit already has hsts enabled. To override its settings you need to set the field "force" to true in the config object. We will intercept and restore the Replit header, after inspecting it for testing.
*/
const ninetyDaysInSeconds = 90*24*60*60;
/* Sets "Strict-Transport-Security: max-age=123456; includeSubDomains; preload" */
// app.use(
//   helmet.hsts({
//     maxAge: ninetyDaysInSeconds,
//     preload: true,
//   })
// );

/*
To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people…), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.
*/

/* DNS prefetching, which can improve user privacy at the expense of performance. See [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control) for more. */
/* Sets "X-DNS-Prefetch-Control: off" */
// app.use(
//   helmet.dnsPrefetchControl({
//     allow: false,
//   })
// );

/*
If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.
*/
// app.use(helmet.noCache());

/*
use helmet.contentSecurityPolicy(). Configure it by adding a directives object. In the object, set the defaultSrc to ["'self'"] (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the scriptSrc directive so that you only allow scripts to be downloaded from your website ('self'), and from the domain 'trusted-cdn.com'
*/

// Sets "Content-Security-Policy: default-src 'self';script-src 'self' example.com;object-src 'none';upgrade-insecure-requests"
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'trusted-cdn.com'],
//     },
//   })
// );

/* parent helmet */
app.use(helmet({
  hidePoweredBy: { },
  frameguard: {        //configure
    action: "deny" 
  },
  xssFilter: { },
  noSniff: { },
  ieNoOpen: { },
  noCache: { },
  hsts: {
    maxAge: ninetyDaysInSeconds,
    preload: true,
  },
  dnsPrefetchControl: {
    allow: false,
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'],
    },
  },
  dnsPrefetchControl: false     // disable
}));


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
