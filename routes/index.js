const routes = require("express").Router();

// routes.get("/", (req, res) => {
//   res.send("Database");
// });

routes.use("/users", require("./users"));

module.exports = routes;
