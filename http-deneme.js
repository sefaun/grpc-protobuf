const axios = require('axios');
const express = require('express');
const protobuf = require('protobufjs');

const app = express();

async function run() {

  const root = await protobuf.load('./protos/login.proto');


  const doc = { username: 'Bill', password: "asfsf" };
  const User = root.lookupType('login.UserInfo');


  app.get('/user', (req, res) => {
    res.send(User.encode(doc).finish());
  });


  app.post('/user', express.text({ type: '*/*' }), (req, res) => {
    // Assume `req.body` contains the protobuf as a utf8-encoded string
    const user = User.decode(Buffer.from(req.body));
    Object.assign(doc, user);
    res.end();
  });



  app.listen(3000);

  //let data = await axios.get('http://localhost:3000/user').then(res => res.data);

  // "Before POST User { name: 'Bill', age: 30 }"
  /*console.log('Before POST', data, User.decode(Buffer.from(data)));*/
  const postBody = User.encode({ username: 'Bill', password: "asfsf" }).finish()
  console.log(postBody)
 /* const dedikoducuirem = await axios.post('http://localhost:3000/user', postBody)
  console.log(dedikoducuirem.data)*/

  //data = await axios.get('http://localhost:3000/user').then(res => res.data);
  // "After POST User { name: 'Joe', age: 27 }"
  //console.log('After POST', User.decode(Buffer.from(data)));
}

run().catch(err => console.log(err));