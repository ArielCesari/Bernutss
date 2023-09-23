const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/userController.js");


const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');



// Formulario de registro
router.get("/register",userController.register);

// Procesar el registro
router.post("/register",uploadFile.single("imageProfile"),validations, userController.processRegister);

// Formulario de login
router.get("/login", validations, userController.login);


// Procesar el login
router.post('/login', userController.loginProcess);

// Perfil de Usuario
router.get('/profile/', userController.profile);


module.exports = router;