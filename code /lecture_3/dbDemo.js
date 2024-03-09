const dotenv = require("dotenv");
dotenv.config();
const {DB_USER,DB_PASSWORD}=process.env;
console.log(DB_USER,DB_PASSWORD);
// const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;