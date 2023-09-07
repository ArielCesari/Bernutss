/// ********* Require ´s  *********
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const pruebaMiddleware = require("./middlewares/global/pruebaMiddleware");

/// ********* Express  *********
const app = express();

/// ********* Middlewares globales  *********
app.use(express.static("public"));// Necesario para los archivos estáticos en el folder /public
app.use(methodOverride("_method"));  // Para poder usar los métodos PUT y DELETE
app.use(express.urlencoded({ extended: false })); // Para poder recibir y manejar el body de los formularios como objetos literales
app.use(express.json()); // Para poder recibir y manejar el body de los formularios como objetos literales

/// ********* Middlewares  propios **********


// ************ Template Engine  ************
app.set('views', path.resolve(__dirname, 'views')); // Define la ubicación de la carpeta de las Vistas
app.set("view engine", "ejs")// Define que el motor que utilizamos es EJS

// ************ Route System require and use()  ************
const mainRouter = require("./routes/mainRouter.js");
const productsRouter = require("./routes/productsRouter.js");

app.use("/", mainRouter);
app.use('/products', productsRouter);


// ************ Set the server to listen  ************
app.listen(3001, (req, res) => {

    console.log("Servidor corriendo en http://localhost:3001")
}) 