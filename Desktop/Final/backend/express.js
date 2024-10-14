const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const {userRouter} = require("./routes/user");
const app = express();
const port = 3000;

// app.use(cors());
app.use(bodyParser.json());

app.use("/stake", userRouter);

app.listen(port, () => {
    console.log(`Hey, this application works and is runnuing on port ${port}`);
})