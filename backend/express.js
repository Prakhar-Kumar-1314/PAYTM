const express = require("express");
const bodyParser  = require("body-parser");
const rootRouter = require("./routes/index");
const { userRouter } = require("./routes/user");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

app.use("/api/v1", rootRouter)
app.use("/api/v1/user", userRouter)


app.listen(port, () => {
    console.log(`Hey, this applications works and is running on port ${port}`);
})
