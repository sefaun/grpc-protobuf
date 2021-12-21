const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const jwt = require("jsonwebtoken")

//Get Packages
const loginPackageDefinition = protoLoader.loadSync("protos/login.proto", {})
const checkJWTPpackageDefinition = protoLoader.loadSync("protos/check-jwt.proto", {})

const loginGRPCObject = grpc.loadPackageDefinition(loginPackageDefinition)
const login = loginGRPCObject.login

const checkJWTGRPCObject = grpc.loadPackageDefinition(checkJWTPpackageDefinition)
const checkJwt = checkJWTGRPCObject.checkJwt

//Set Server
const server = new grpc.Server()
const port = 4000

//Login
server.addService(login.LoginController.service, {
  "login": authLogin
})

//Check JWT Token
server.addService(checkJwt.JWTController.service, {
  "checkJWTToken": checkJWTToken
})


//Create Server
server.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  console.log(`Server is Running on Port ${port} !`)
  server.start()
})



function authLogin(call, callback) {
  console.log(call.request)
  callback(null, { success: true, token: "tokenin bu senin" })
}

function checkJWTToken(call, callback) {
  console.log(call.request)
  callback(null, { success: true, userInfo: "sefa cevap" })
}