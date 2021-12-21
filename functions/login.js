const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const loginPackageDefinition = protoLoader.loadSync("protos/login.proto", {})
const loginGRPCObject = grpc.loadPackageDefinition(loginPackageDefinition)
const login = loginGRPCObject.login

const client = new login.LoginController("localhost:4000", grpc.credentials.createInsecure())

client.login({ username: "sefa ün", password: "asodnsdınsf" }, (err, response) => {
  console.log(response)
})