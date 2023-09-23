
const { body } = require("express-validator");
const path = require("path");



module.exports =  [

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