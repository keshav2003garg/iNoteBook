const express = require('express')
const cors = require('cors')
const app = express()
const connectToMongo = require("./database/db")
connectToMongo()

app.use(cors())
app.use(express.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


const port = 80
app.listen(port, () => {
  console.log('Server listening at http://localhost')
})