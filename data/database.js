const dotenv = require("dotenv");
dotenv.config();

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0yjao.mongodb.net/`;

const MongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initd");
    return callback(null, database);
  }
  MongoClient.connect(process.env.uri)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database is already initd");
  }

  return database;
};

module.exports = { initDb, getDatabase };
