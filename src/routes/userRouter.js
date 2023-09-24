const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/userController.js");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")


const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');



// Formulario de registro
router.get("/register", guestMiddleware, userController.register);

// Procesar el registro
router.post("/register",uploadFile.single("imageProfile"),validations, userController.processRegister);

// Formulario de login
router.get("/login", guestMiddleware, userController.login);


// Procesar el login
router.post('/login', userController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, userController.profile);


module.exports = router;