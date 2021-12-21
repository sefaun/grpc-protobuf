const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync("protos/check-jwt.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const checkJwt = grpcObject.checkJwt

const client = new checkJwt.JWTController("localhost:4000", grpc.credentials.createInsecure())

client.checkJWTToken({ token: "bir" }, (err, response) => {
  console.log(response)
})


/*const call = client.checkJWT({ jwtToken: "iki" })

call.on("data", (item) => {
  console.log(item)
})

call.on("end", (item) => {
  console.log("connection closed")
})*/