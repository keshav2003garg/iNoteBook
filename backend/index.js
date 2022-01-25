const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const app = express()
dotenv.config({ path: ".env" });
const connectToMongo = require("./database/db")
connectToMongo()

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use(cors())
app.use(express.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(80)