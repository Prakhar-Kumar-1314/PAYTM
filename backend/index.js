const express = require("express");
const bodyParser  = require("body-parser");
const router = require("./routes/index");
const app = express();

app.use("/api/v1", router)


app.listen(3000, () => {
    console.log("Hey, this applications works");
})
