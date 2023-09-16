const { validationResult } = require("express-validator");

const Users = require("../data/users.json")

const userController = {

    register: (req, res) => {
        res.render("register");
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        else {
            return res.send("todo ok")
        }
    },
    login: (req, res) => {
        res.render("login");

    }


}



module.exports = userController;

