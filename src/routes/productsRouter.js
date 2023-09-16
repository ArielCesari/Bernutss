const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");
const productsController = require("../controllers/productsController.js");

/*** Multer config  ***/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))

    }
})

const upload = multer({ storage: storage });

const validations = [

    body("name").notEmpty().withMessage("Por favor, completar el campo nombre"),
    body("price").notEmpty().withMessage("Por favor, completar el campo precio"),
    body("discount").notEmpty().withMessage("Por favor, completar el campo descuento"),
    body("category").notEmpty().withMessage("Debes elegir una categoria"),
    body("description").notEmpty().withMessage("Por favor, completar el campo descripción"),
    body("productImage").custom((value, { req }) => {

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

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index);

/*** CREATE ONE PRODUCT  ***/
router.get("/create", productsController.create);
router.post("/", upload.single("productImage"), validations, productsController.store)

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail)

/*** EDIT ONE PRODUCT  ***/
router.get("/edit/:id", productsController.edit);
router.patch("/edit/:id", upload.single("productImage"), validations, productsController.update);

/*** EDIT ONE PRODUCT  ***/
router.delete("/delete/:id", productsController.destroy);


module.exports = router;