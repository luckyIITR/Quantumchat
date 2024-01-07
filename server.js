const express = require('express');
const app = express();
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require("cors")
const cookieParser = require("cookie-parser");

const databaseConnect = require('./config/database')

dotenv.config({
     path : 'config/config.env'
})

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/messenger", require('./routes/authRoute'));

const PORT = process.env.PORT || 5000
app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})

databaseConnect();

app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})
