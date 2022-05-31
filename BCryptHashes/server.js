'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';
const bcrypt = require('bcrypt');



//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt
  .hash(myPlaintextPassword, saltRounds)
  .then((hash) => {
    return bcrypt.compare(myPlaintextPassword, hash)
    .then((result) => {
      console.log("myPlaintextPassword:", result); // generic: true
    });
  })
  .catch((err) => {
    console.log(err);
  });
//END_ASYNC

//START_SYNC
bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  console.log(hash);
  // The hash returned, continue to compare
  bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    console.log("generic:", result); // generic: true
  });

  bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
    console.log("someOtherPlaintextPassword:", result); // falsy: false
  });
});
//END_SYNC



app.listen(process.env.PORT || 3000, () => {});

