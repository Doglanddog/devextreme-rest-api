const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "password",
    database: "testapi",
  },
  listPerPage: 50,
};

module.exports = config;
