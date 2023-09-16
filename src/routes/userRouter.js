const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");
const userController = require("../controllers/userController.js");


/*** Multer config  ***/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))

    }
    
})


const upload = multer({ storage: storage });

const validations = [

    body("name").notEmpty().withMessage("Esta campo no puede estar vacio"),
    body("email").isEmail().withMessage("Debe ingresar un email válido").notEmpty().withMessage("Esta campo no puede estar vacio"),
    body("password").isLength({min:8}).withMessage("La contraseña debe tener 8 carácteres").notEmpty().withMessage("Esta campo no puede estar vacio"),
    body("imageProfile").custom((value, { req }) => {

        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif"];


        if (!file) {
            throw new Error("Por favor, subir una imagen");
        } else {
            let fileExtension = path.extname(file.originalname)

            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error("Las extensiones de archivo permitadas son .jpg .png .gif");
            }
        }

        return true;
    })



]

router.get("/register",userController.register);
router.post("/register",upload.single("imageProfile"),validations, userController.processRegister);

router.get("/login",userController.login);
//router.post("/login",validations,userController.processLogin);


module.exports = router;

