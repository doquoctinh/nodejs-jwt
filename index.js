const cors = require("cors");
const low = require("lowdb");
const app = require('./app');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write();

app.db = db;

app.use(cors());

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
