const express = require("express");
const app = express();
const path = require("path");
const homeRouter = require("./routes/home.routes");
const cartRouter = require("./routes/cart.routes");
const session = require("express-session");

app.use(session({
    secret: "xyR12mt10XZaL",
    cookie: {maxAge: 6000000},
    resave: false,
    saveUninitialized: true
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/home", homeRouter);
app.use("/cart", cartRouter);

app.listen(3000, () =>{
    console.log("app runing on port 3000");
})
