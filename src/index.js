require('dotenv').config({ path: '../.env' });
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET);
const express = require('express');
const cors = require('cors');
const routes = require("./routes");
const app = express();
require("./connectionDB");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes(app);
app.listen(3001, async () => {
    console.log("Server chạy tại http://localhost:3001");
});
