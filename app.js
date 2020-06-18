const expressApp = require("./api").app;
const socket = require("./socket");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 4000;
const server = expressApp.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

socket.init(server);
