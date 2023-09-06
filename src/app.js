const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mainRouter = require("./routes/mainRouter.js");
const productsRouter = require("./routes/productsRouter.js");



app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));


app.set('views', path.resolve(__dirname, 'views'));
app.set("view engine", "ejs")

app.use("/", mainRouter);
app.use('/products', productsRouter);



app.listen(3001, (req, res) => {

    console.log("Servidor corriendo en http://localhost:3001")
}) 