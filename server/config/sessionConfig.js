const session = require("express-session");
const sessionFileStore = require("session-file-store");
const FileStore = sessionFileStore(session);

const sessionConfig = {
  store: new FileStore(),
  name: "user_sid",
  // eslint-disable-next-line no-undef
  secret: `${process.env.SECRET_WORD}` ?? "test",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

module.exports = sessionConfig;
