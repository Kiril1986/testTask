require("@babel/register");
require("dotenv").config();

const serverConfig = require("./config/serverConfig");
const express = require("express");

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const app = express();
serverConfig(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
