const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { raw } = require('body-parser');
const basicAuth = require("express-basic-auth");
const app = express();

const userRoutes = require('./routes/user')

app
  .use(
    basicAuth({
      authorizer: myAuthorizer,
      challenge: true,
      authorizeAsync: true,
      realm: "My Application",
    })
  );
//  log in feature
function myAuthorizer(username, password, callback) {
  const users = fs.readFileSync('users.json', 'utf-8', async (err, data)=> {
    if (err) {
      throw err
    }
    return await data
  });

  let parsed = JSON.parse(users);

  let user = parsed.users.filter((user)=>user.username ===username);
  if(user[0].username === username && user[0].password === password) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
}



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);


app.listen(3030, () => {
    console.log("Server started on port 3030")
})