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

    console.log("2-) server gelen -> ", req.body)
    // Assume `req.body` contains the protobuf as a utf8-encoded string
    const user = User.decode(new Buffer.from(req.body));

    console.log("3-) server giden -> ", User.encode(User.toObject(user)).finish())
    res.send(User.encode(User.toObject(user)).finish())
  });



  app.listen(3000);

  //let data = await axios.get('http://localhost:3000/user').then(res => res.data);

  // "Before POST User { name: 'Bill', age: 30 }"
  /*console.log('Before POST', data, User.decode(Buffer.from(data)));*/

  const postBody = User.encode({ username: 'Sefa Ün', password: "Tmm mı şifrem benim", status: 10 }).finish()
  /*console.log(postBody.toString())
  console.log(postBody)*/

  /*const user = User.decode(postBody)
  console.log(User.toObject(user))*/
  console.log("1-) client giden -> ", postBody)
  const response = await axios.post('http://localhost:3000/user', postBody)
  console.log("4-) client cevap -> ", response.data)

  //data = await axios.get('http://localhost:3000/user').then(res => res.data);
  // "After POST User { name: 'Joe', age: 27 }"
  //console.log('After POST', User.decode(Buffer.from(data)));
}

run().catch(err => console.log(err));