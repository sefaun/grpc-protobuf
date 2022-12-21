import { loadSync } from "@grpc/proto-loader"
import { loadPackageDefinition, credentials } from "@grpc/grpc-js"

const loginGRPCObject = loadPackageDefinition(loadSync("./protos/login.proto"))
const registerGRPCObject = loadPackageDefinition(loadSync("./protos/register.proto"))
const login = loginGRPCObject.login as any
const register = registerGRPCObject.register as any

const login_client = new login.LoginController("localhost:4000", credentials.createInsecure())

login_client.login({ username: "sefa ün", password: "asodnsdınsf" }, (err, response) => {
  console.log(response)
})

const register_client = new register.RegisterController("localhost:4000", credentials.createInsecure())

register_client.register({ username: "sefa ün", password: "asodnsdınsf" }, (err, response) => {
  console.log(response)
})