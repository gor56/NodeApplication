const zendesk = require('node-zendesk');

function zenCreate() {
  const zenDeskUser = {
    "user": {
      "name": String,
      "email": String
    }
  };

  zendesk.createClient(zenDeskUser, function (err, req, result) {
    if (err) {
      console.log(err)
    }
    console.log(JSON.stringify(result, null, 2, true))
  });
}


module.exportes = zenCreate;
// const zenDeskUser = {
//   "user": {
//     "name": String,
//     "email": String
//   }
// };
//
// client.users.create(zenDeskUser, function (err, req, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(JSON.stringify(result, null, 2, true));
// });


