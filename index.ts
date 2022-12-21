import { loadSync } from "@grpc/proto-loader"
import { loadPackageDefinition, Server, ServerCredentials } from "@grpc/grpc-js"

const loginGRPCObject = loadPackageDefinition(loadSync("./protos/login.proto"))
const login = loginGRPCObject.login as any

//Set Server
const server = new Server()
const port = 4000

//Login
server.addService(login.LoginController.service, {
  "login": authLogin
})

//Create Server
server.bindAsync(`localhost:${port}`, ServerCredentials.createInsecure(), (error, port) => {
  server.start()
  console.log(`Server is Running on Port ${port} !`)
})


function authLogin(call, callback) {
  console.log(call.request)
  callback(null, { success: true, token: "tokenin bu senin" })
}